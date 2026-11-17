import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { analyzeFiles, buildReport, checkUrl, checkLinks, exitCodeFor, main, parseDate } from "../scripts/kb-stale.mjs";

function makeRoot(files) {
  const root = mkdtempSync(join(tmpdir(), "kb-stale-"));
  for (const [rel, text] of Object.entries(files)) { const p = join(root, "knowledge", rel); mkdirSync(join(p, ".."), { recursive: true }); writeFileSync(p, text); }
  return root;
}
const doc = (date, sources = [], body = "body") => `---\ntitle: T\ntags: [a]\nsources:\n${sources.map((s) => `  - ${s}`).join("\n")}\n${date === null ? "" : `last_verified: ${date}\n`}---\n${body}\n`;
const res = (status) => ({ status, body: null });
const run = async (argv, opts = {}) => { let out = "", err = ""; const code = await main(argv, { out: (s) => (out += s), err: (s) => (err += s), ...opts }); return { code, out, err }; };

test("classifies fresh, stale and missing dates against --today", () => {
  const root = makeRoot({
    "a/fresh.md": doc("2026-11-01"), "a/old.md": doc("2026-01-01"), "a/oldest.md": doc("2025-06-01"),
    "a/none.md": doc(null), "a/bad.md": doc("2026-13-45"), "a/words.md": doc("last spring"), "README.md": "# readme, no frontmatter",
  });
  try {
    const files = Object.fromEntries(analyzeFiles(root, "2026-11-16", 180).map((f) => [f.path, f]));
    assert.equal(Object.keys(files).length, 6, "README is skipped");
    assert.equal(files["knowledge/a/fresh.md"].status, "fresh");
    assert.equal(files["knowledge/a/old.md"].status, "stale");
    assert.equal(files["knowledge/a/old.md"].age, 319);
    for (const n of ["none", "bad", "words"]) assert.equal(files[`knowledge/a/${n}.md`].status, "missing");
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("max-age boundary: exactly max-age days old is not stale", async () => {
  const root = makeRoot({ "a.md": doc("2026-05-20") }); // 180 days before 2026-11-16
  try {
    assert.equal(analyzeFiles(root, "2026-11-16", 180)[0].age, 180);
    assert.equal(analyzeFiles(root, "2026-11-16", 180)[0].status, "fresh");
    assert.equal(analyzeFiles(root, "2026-11-17", 180)[0].status, "stale");
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("--today override changes the result and the report lists oldest first", async () => {
  const root = makeRoot({ "a.md": doc("2026-01-01", [], "x UNVERIFIED y UNVERIFIED"), "b.md": doc("2025-12-01"), "c.md": doc("2026-04-01") });
  try {
    const early = await run(["--root", root, "--today", "2026-02-01", "--json"]);
    assert.equal(JSON.parse(early.out).summary.stale, 0);
    const late = JSON.parse((await run(["--root", root, "--today", "2026-11-16", "--json"])).out);
    assert.deepEqual(late.stale.map((f) => f.path), ["knowledge/b.md", "knowledge/a.md", "knowledge/c.md"]);
    assert.equal(late.summary.oldest, "2025-12-01");
    assert.deepEqual(late.unverified, [{ path: "knowledge/a.md", count: 2 }]);
    const text = (await run(["--root", root, "--today", "2026-11-16"])).out;
    assert.match(text, /Files: 3, stale: 3, missing or bad date: 0, oldest last_verified: 2025-12-01/);
    assert.ok(text.indexOf("knowledge/b.md") < text.indexOf("knowledge/a.md"));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("without --today the clock is used", async () => {
  const root = makeRoot({ "a.md": doc("2026-01-01") });
  try {
    const r = JSON.parse((await run(["--root", root, "--json"], { now: () => new Date("2026-03-01T12:00:00Z") })).out);
    assert.equal(r.today, "2026-03-01");
    assert.equal(r.summary.stale, 0);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("exit codes: 0 without --strict, 1 with --strict when stale or missing, 0 when clean, 2 on bad args", async () => {
  const stale = makeRoot({ "a.md": doc("2025-01-01") });
  const missing = makeRoot({ "a.md": doc(null) });
  const clean = makeRoot({ "a.md": doc("2026-11-01") });
  try {
    assert.equal((await run(["--root", stale, "--today", "2026-11-16"])).code, 0);
    assert.equal((await run(["--root", stale, "--today", "2026-11-16", "--strict"])).code, 1);
    assert.equal((await run(["--root", missing, "--today", "2026-11-16", "--strict"])).code, 1);
    assert.equal((await run(["--root", clean, "--today", "2026-11-16", "--strict"])).code, 0);
    assert.equal((await run(["--bogus"])).code, 2);
    assert.equal((await run(["--today", "2026-02-30"])).code, 2);
    assert.equal((await run(["--max-age"])).code, 2);
  } finally { for (const r of [stale, missing, clean]) rmSync(r, { recursive: true, force: true }); }
});

test("parseDate rejects impossible dates", () => {
  assert.equal(parseDate("2026-02-29"), null);
  assert.notEqual(parseDate("2028-02-29"), null);
  assert.equal(parseDate("2026-1-1"), null);
});

test("HEAD that fails falls back to GET, so a HEAD-only 404 is not called dead", async () => {
  for (const refused of [403, 404, 405, 500, 501]) {
    const calls = [];
    const fake = async (url, init) => { calls.push(init.method); return res(init.method === "HEAD" ? refused : 200); };
    assert.deepEqual(await checkUrl("https://x.test/", fake), { url: "https://x.test/", state: "ok", code: 200 });
    assert.deepEqual(calls, ["HEAD", "GET"]);
  }
});

test("a HEAD that works is not repeated, and the request carries a plain browser User-Agent", async () => {
  const seen = [];
  const fake = async (url, init) => { seen.push(init); return res(301); };
  assert.equal((await checkUrl("https://x.test/", fake)).state, "ok");
  assert.equal(seen.length, 1);
  assert.match(seen[0].headers["User-Agent"], /^Mozilla\/5\.0 .*Chrome/);
  assert.ok(!/npc|union|claude|studious/i.test(seen[0].headers["User-Agent"]));
  assert.ok(seen[0].signal, "a timeout signal is passed");
});

test("a 429 on HEAD is not retried", async () => {
  const calls = [];
  const fake = async (url, init) => { calls.push(init.method); return res(429); };
  assert.equal((await checkUrl("https://x.test/", fake)).state, "blocked");
  assert.deepEqual(calls, ["HEAD"]);
});

test("401, 403 and 429 are blocked, 404 and 500 are dead, a thrown error is dead", async () => {
  const statusOnly = (code) => async () => res(code);
  assert.equal((await checkUrl("https://x.test/", statusOnly(401))).state, "blocked");
  assert.equal((await checkUrl("https://x.test/", statusOnly(403))).state, "blocked"); // HEAD 403, GET 403
  assert.equal((await checkUrl("https://x.test/", statusOnly(429))).state, "blocked");
  assert.deepEqual(await checkUrl("https://x.test/", statusOnly(404)), { url: "https://x.test/", state: "dead", code: 404, error: "" });
  assert.equal((await checkUrl("https://x.test/", statusOnly(500))).state, "dead");
  const boom = async () => { throw new Error("getaddrinfo ENOTFOUND"); };
  const r = await checkUrl("https://x.test/", boom);
  assert.equal(r.state, "dead"); assert.equal(r.code, null); assert.match(r.error, /ENOTFOUND/);
});

test("checkLinks respects the concurrency limit", async () => {
  let active = 0, peak = 0;
  const fake = async () => { active++; peak = Math.max(peak, active); await new Promise((r) => setTimeout(r, 5)); active--; return res(200); };
  const urls = Array.from({ length: 20 }, (_, i) => `https://x.test/${i}`);
  const out = await checkLinks(urls, fake, { concurrency: 3 });
  assert.equal(out.length, 20);
  assert.ok(peak <= 3 && peak > 1, `peak was ${peak}`);
});

test("--check-links dedupes URLs, reports citing files, and separates blocked from dead", async () => {
  const root = makeRoot({
    "a.md": doc("2026-11-01", ["https://ok.test/", "https://gone.test/", "https://wall.test/"]),
    "b.md": doc("2026-11-01", ["https://gone.test/", "https://ok.test/"]),
  });
  const hits = [];
  const fake = async (url, init) => { hits.push(`${init.method} ${url}`); return res(url.includes("gone") ? 404 : url.includes("wall") ? 403 : 200); };
  try {
    const report = await buildReport({ root, today: "2026-11-16", links: true, fetchFn: fake });
    assert.equal(report.links.checked, 3);
    assert.equal(report.links.ok, 1);
    assert.deepEqual(report.links.dead.map((d) => [d.url, d.files]), [["https://gone.test/", ["knowledge/a.md", "knowledge/b.md"]]]);
    assert.deepEqual(report.links.blocked.map((d) => [d.url, d.code]), [["https://wall.test/", 403]]);
    assert.equal(hits.filter((h) => h.endsWith("ok.test/")).length, 1, "each distinct URL is fetched once");
    // dead link fails --strict, blocked alone does not
    assert.equal(exitCodeFor(report, true), 1);
    assert.equal(exitCodeFor(report, false), 0);
    const onlyBlocked = { ...report, links: { ...report.links, dead: [] } };
    assert.equal(exitCodeFor(onlyBlocked, true), 0);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("CLI with --check-links --strict uses the injected fetch and exits 1 on a dead link", async () => {
  const root = makeRoot({ "a.md": doc("2026-11-01", ["https://gone.test/"]) });
  try {
    const r = await run(["--root", root, "--today", "2026-11-16", "--check-links", "--strict"], { fetchFn: async () => res(404) });
    assert.equal(r.code, 1);
    assert.match(r.out, /Dead links:/);
    assert.match(r.out, /cited by knowledge\/a\.md/);
    const ok = await run(["--root", root, "--today", "2026-11-16", "--check-links", "--strict"], { fetchFn: async () => res(200) });
    assert.equal(ok.code, 0);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
