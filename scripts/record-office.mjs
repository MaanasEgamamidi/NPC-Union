#!/usr/bin/env node
// Records the 3D office to a GIF and captures README screenshots. Node 22+, no npm dependencies.
// It needs Chrome or Edge (any recent version) and ffmpeg on your PATH.
//
//   node scripts/record-office.mjs                 GIF + stills into docs/media/
//   node scripts/record-office.mjs --gif-only      just the GIF
//   node scripts/record-office.mjs --stills-only   just the screenshots
//   --seconds 14  --fps 12  --width 800  --hold 40  --seed 7  --browser <path-to-chrome-or-edge>  --out docs/media
//
// How it stays repeatable: the page is opened with ?record&seed=N, which hands the simulation clock to this
// script. Each frame it advances the office by a fixed 1/fps seconds, moves a scripted camera, and takes a
// screenshot through the Chrome DevTools Protocol. Labels, speech bubbles and the activity feed are part of
// the page, so they are in the picture.
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const opt = (name, fallback) => (argv.includes(`--${name}`) ? argv[argv.indexOf(`--${name}`) + 1] : fallback);
const flag = (name) => argv.includes(`--${name}`);

const SECONDS = Number(opt("seconds", 14));
const FPS = Number(opt("fps", 12));
const GIF_W = Number(opt("width", 800));
const SEED = Number(opt("seed", 7));
const WARMUP = Number(opt("warmup", 6.5)); // simulated seconds before frame 0, so work is already under way
const OUT = resolve(ROOT, opt("out", "docs/media"));
const GIF_VIEW = { width: 960, height: 540 };   // small viewport so on-screen text stays readable in a small GIF
const STILL_VIEW = { width: 1440, height: 810 };
const doGif = !flag("stills-only");
const doStills = !flag("gif-only");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- static file server for the repo ----------
const MIME = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".css": "text/css", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  const file = join(ROOT, path);
  if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

// ---------- browser ----------
function findBrowser() {
  const given = opt("browser", process.env.BROWSER);
  const candidates = [
    given,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const hit = candidates.find((p) => existsSync(p));
  if (!hit) throw new Error("No Chrome or Edge found. Pass --browser <path>.");
  return hit;
}
const profile = mkdtempSync(join(tmpdir(), "npc-rec-"));
const port = 9222 + Math.floor(Math.random() * 500);
const browser = spawn(findBrowser(), [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  `--window-size=${STILL_VIEW.width},${STILL_VIEW.height}`, "--hide-scrollbars", "--mute-audio", "--force-device-scale-factor=1",
  "--ignore-gpu-blocklist", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--no-first-run", "about:blank",
], { stdio: "ignore" });

let ws, nextId = 1;
const pending = new Map();
async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); break; }
    } catch { /* browser still starting */ }
    await sleep(250);
  }
  if (!ws) throw new Error("Could not reach the browser's debugging port.");
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { const { ok, fail } = pending.get(msg.id); pending.delete(msg.id); msg.error ? fail(new Error(msg.error.message)) : ok(msg.result); }
  };
}
const send = (method, params = {}) => new Promise((ok, fail) => { const id = nextId++; pending.set(id, { ok, fail }); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
  return r.result.value;
};
const shot = async (file) => { const r = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(file, Buffer.from(r.data, "base64")); };
async function open(url, ready) {
  await send("Page.navigate", { url });
  for (let i = 0; i < 120; i++) { if (await evaluate(ready).catch(() => false)) return; await sleep(250); }
  throw new Error(`Timed out waiting for ${url}`);
}

// ---------- scripted camera, runs inside the page ----------
const HOLD_DIST = Number(opt("hold", 40));
const DIRECTOR = `
window.__direct = (t, total, dt) => {
  const o = window.__office, h = o.handles(), cs = h.camState, T = h.THREE;
  const ease = (x) => x * x * (3 - 2 * x);
  const span = Math.max(h.plan.maxX - h.plan.minX, h.plan.maxZ - h.plan.minZ);
  const hq = h.masterRec.root.position;
  const centre = new T.Vector3((h.plan.minX + h.plan.maxX) / 2, 0, (h.plan.minZ + h.plan.maxZ) / 2 + 2);
  // Open on the whole floor, glide in to a steady shot centred on Headquarters, then hold.
  // A still camera is deliberate: it keeps the GIF small and lets the eye follow the agents.
  const k = ease(Math.min(1, t / (total * 0.2)));
  const from = { target: centre, dist: span * 0.92, pitch: 0.95, yaw: 0 };
  const to = { target: new T.Vector3(hq.x, 0, hq.z + 1), dist: ${HOLD_DIST}, pitch: 0.82, yaw: 0.16 };
  cs.target.lerpVectors(from.target, to.target, k);
  cs.dist = from.dist + (to.dist - from.dist) * k;
  cs.pitch = from.pitch + (to.pitch - from.pitch) * k;
  cs.yaw = from.yaw + (to.yaw - from.yaw) * k;
  o.step(dt);
};
window.__first = true;
true;
`;

// ---------- main ----------
mkdirSync(OUT, { recursive: true });
try {
  await connect();
  await send("Page.enable");
  const setView = (v) => send("Emulation.setDeviceMetricsOverride", { width: v.width, height: v.height, deviceScaleFactor: 1, mobile: false });

  if (doGif) {
    console.log("Recording the office…");
    await setView(GIF_VIEW);
    await open(`${BASE}/office3d/index.html?record&seed=${SEED}#office`, "!!window.__office && document.fonts.status !== 'loading'");
    await sleep(2500); // let portraits and textures arrive
    await evaluate(`document.querySelector('.hud-team').classList.add('collapsed'); document.querySelector('.hud-hint').style.display='none'; true`);
    await evaluate(DIRECTOR);
    const dt = 1 / FPS;
    for (let t = 0; t < WARMUP; t += dt) await evaluate(`window.__office.step(${dt})`); // jobs get under way off camera
    const keep = opt("frames", null); // --frames <dir> keeps the PNGs, handy for tuning the encoder
    const frames = keep ? resolve(keep) : join(tmpdir(), `npc-frames-${Date.now()}`);
    mkdirSync(frames, { recursive: true });
    const total = Math.round(SECONDS * FPS);
    for (let i = 0; i < total; i++) {
      await evaluate(`window.__direct(${i * dt}, ${SECONDS}, ${dt})`);
      await shot(join(frames, `f${String(i).padStart(4, "0")}.png`));
      if (i % 30 === 0) console.log(`  frame ${i}/${total}`);
    }
    const gif = join(OUT, "office.gif");
    const vf = `scale=${GIF_W}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle`;
    const ff = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", join(frames, "f%04d.png"), "-vf", vf, "-loop", "0", gif], { stdio: "inherit" });
    if (ff.status !== 0) throw new Error("ffmpeg failed. Is it on your PATH?");
    if (!keep) rmSync(frames, { recursive: true, force: true });
    console.log(`Wrote ${gif} (${(statSync(gif).size / 1048576).toFixed(1)} MB)`);
  }

  if (doStills) {
    console.log("Capturing screenshots…");
    await setView(STILL_VIEW);
    await open(`${BASE}/office3d/index.html#gallery`, "document.querySelectorAll('#grid .card').length > 0 && document.fonts.status !== 'loading'");
    await sleep(1800);
    await shot(join(OUT, "gallery.png"));

    await evaluate(`document.querySelector('[data-preset="pixel-platformer"]')?.click(); document.querySelector('[data-screen="assemble"]').click(); true`);
    await sleep(1500);
    await shot(join(OUT, "assemble.png"));

    await open(`${BASE}/office3d/index.html?record&seed=${SEED}#office`, "!!window.__office && document.fonts.status !== 'loading'");
    await sleep(2500);
    await evaluate(`document.querySelector('.hud-team').classList.add('collapsed'); true`);
    for (let i = 0; i < 90; i++) await evaluate(`window.__office.step(${1 / 15})`);

    // Hall of fame close-up
    await evaluate(`(() => { const h = window.__office.handles(); const p = h.plaques.find((q) => q.win.current).group.position;
      h.camState.target.set(p.x - 3, 2.2, p.z); h.camState.dist = 15; h.camState.yaw = 0.12; h.camState.pitch = 0.18; window.__office.step(0.02); return true; })()`);
    await sleep(600);
    await shot(join(OUT, "hall-of-fame.png"));
  }
  console.log("Done.");
} finally {
  try { ws?.close(); } catch { /* ignore */ }
  browser.kill();
  server.close();
  setTimeout(() => { try { rmSync(profile, { recursive: true, force: true }); } catch { /* ignore */ } process.exit(0); }, 800);
}
