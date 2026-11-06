// Site shell: switches between the specialist gallery, the team builder and the
// 3D office, filters the roster, and shows a turntable 3D preview per specialist.
import * as THREE from "three";
import { buildCharacter, getPalette, animateCharacter } from "./character.js";
import { createOffice } from "./office.js";
import { currentWinner, citation } from "./eotm.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let specialists = [];
let office = null;
let activeDivision = "all";
let query = "";

// A portrait that fails to load (a new agent has no art yet) gets a neutral placeholder instead of a broken-image icon.
const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2ec4b6"/><stop offset="1" stop-color="#9d7bff"/></linearGradient></defs><rect width="64" height="64" rx="12" fill="url(#g)"/><rect x="16" y="20" width="32" height="26" rx="7" fill="#0b1016" opacity=".85"/><circle cx="26" cy="32" r="3.5" fill="#f5b93a"/><circle cx="38" cy="32" r="3.5" fill="#f5b93a"/><rect x="26" y="39" width="12" height="2.5" rx="1.2" fill="#f5b93a"/></svg>');
document.addEventListener("error", (e) => {
  const img = e.target;
  if (img instanceof HTMLImageElement && !img.dataset.fallback) { img.dataset.fallback = "1"; img.src = PLACEHOLDER; }
}, true);

// ---------- data ----------
const res = await fetch("./specialists.json");
specialists = (await res.json()).specialists;
const byName = new Map(specialists.map((s) => [s.name, s]));
let presets = [];
try { presets = (await (await fetch("../catalog/teams.json")).json()).presets ?? []; } catch { /* presets are optional */ }

const divisions = [...new Set(specialists.map((s) => s.division))].sort();
function prettyDiv(d) {
  return d.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
const divOptions = `<option value="all">All divisions (${specialists.length})</option>` +
  divisions.map((d) => `<option value="${esc(d)}">${esc(prettyDiv(d))} (${specialists.filter((s) => s.division === d).length})</option>`).join("");
$("#division").innerHTML = divOptions;
$("#asm-division").innerHTML = divOptions;
$("#conn").textContent = `${specialists.length} specialists online`;
$("#st-total").textContent = specialists.length;

// ---------- the assembled team ----------
// Kept in localStorage so it survives reloads. The page cannot write into a
// project folder, so the team leaves through a copyable command or team.json.
const TEAM_KEY = "npc-union:team";
let team = new Set();
try { team = new Set(JSON.parse(localStorage.getItem(TEAM_KEY) || "[]").filter((n) => byName.has(n))); } catch { /* private mode */ }

function saveTeam() {
  try { localStorage.setItem(TEAM_KEY, JSON.stringify([...team])); } catch { /* ignore */ }
  const badge = $("#team-badge");
  badge.textContent = team.size;
  badge.classList.toggle("zero", team.size === 0);
  office?.setTeam([...team]);
  renderTeamPanel();
  syncPickStates();
}
function toggleTeam(name, force) {
  const on = force ?? !team.has(name);
  on ? team.add(name) : team.delete(name);
  saveTeam();
}
const teamCommand = () => (team.size ? `/npc-union:team set ${[...team].join(",")}` : "/npc-union:team clear");
function toast(text) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ---------- gallery ----------
function renderChips(target, current) {
  const chips = [["all", "All"], ...divisions.map((d) => [d, prettyDiv(d)])];
  target.innerHTML = chips.map(([k, label]) =>
    `<button class="chip ${current === k ? "on" : ""}" data-div="${esc(k)}">${esc(label)}</button>`).join("");
}

const matches = (s, q, div) => {
  if (div !== "all" && s.division !== div) return false;
  if (!q) return true;
  return [s.name, s.persona, s.description, s.department, ...s.capabilities].join(" ").toLowerCase().includes(q);
};

function renderGrid() {
  const q = query.trim().toLowerCase();
  const list = specialists.filter((s) => matches(s, q, activeDivision));
  $("#grid").innerHTML = list.map((s) => `
    <article class="card">
      <div class="card-top">
        <img class="avatar" src="${esc(s.avatar)}" alt="${esc(s.persona)} portrait" loading="lazy" />
        <div style="min-width:0">
          <h3>${esc(s.persona)}</h3>
          <div class="id">${esc(s.name)}</div>
        </div>
      </div>
      <p class="desc">${esc(s.description)}</p>
      <div class="meta">
        <span class="tag">${esc(prettyDiv(s.division))}</span>
        <span class="tag">${esc(s.department.split("/").pop())}</span>
        <span class="tag model">${esc(s.model)}</span>
        <span class="tag">${esc(s.runtime)}</span>
      </div>
      <div class="card-actions">
        <button class="btn" data-action="view" data-name="${esc(s.name)}">View 3D</button>
        <button class="btn primary" data-action="office" data-name="${esc(s.name)}">Office</button>
        <button class="btn add" data-action="team" data-name="${esc(s.name)}" title="Add to your team">${team.has(s.name) ? "✓ On team" : "+ Team"}</button>
      </div>
    </article>`).join("") || `<p style="color:var(--muted)">No specialists match that search.</p>`;
}

$("#search").addEventListener("input", (e) => { query = e.target.value; renderGrid(); });
$("#division").addEventListener("change", (e) => { activeDivision = e.target.value; renderChips($("#chips"), activeDivision); renderGrid(); });
$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-div]");
  if (!b) return;
  activeDivision = b.dataset.div;
  $("#division").value = activeDivision;
  renderChips($("#chips"), activeDivision); renderGrid();
});
$("#grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  const name = b.dataset.name;
  if (b.dataset.action === "view") openModal(name);
  else if (b.dataset.action === "team") { toggleTeam(name); b.textContent = team.has(name) ? "✓ On team" : "+ Team"; }
  else goToOffice(name);
});

// ---------- employee of the month banner ----------
const winner = currentWinner(specialists);
$("#eotm").innerHTML = `
  <img src="${esc(winner.spec.avatar)}" alt="${esc(winner.spec.persona)} portrait" />
  <div>
    <div class="kicker">Employee of the Month · ${esc(winner.label)}</div>
    <h3>${esc(winner.spec.persona)}</h3>
    <p>Cited for: ${esc(citation(winner.spec))}.</p>
  </div>
  <span class="go">Meet ${esc(winner.spec.persona)} →</span>`;
$("#eotm").addEventListener("click", () => openModal(winner.spec.name, winner.label));

// ---------- assemble team ----------
let asmDivision = "all";
let asmQuery = "";
let asmOnly = false;

function renderPresets() {
  $("#presets").innerHTML = presets.map((p) =>
    `<button class="preset" data-preset="${esc(p.id)}"><b>${esc(p.label)} · ${p.members.length}</b><small>${esc(p.blurb)}</small></button>`).join("");
}

function renderPickGrid() {
  const q = asmQuery.trim().toLowerCase();
  const list = specialists.filter((s) => matches(s, q, asmDivision) && (!asmOnly || team.has(s.name)));
  $("#asm-grid").innerHTML = list.map((s) => `
    <button class="pick ${team.has(s.name) ? "on" : ""}" data-name="${esc(s.name)}" title="${esc(s.description)}">
      <img src="${esc(s.avatar)}" alt="" loading="lazy" />
      <span class="t"><b>${esc(s.persona)}</b><small>${esc(s.name)}</small></span>
      <span class="tick">✓</span>
    </button>`).join("") || `<p style="color:var(--muted)">No specialists match.</p>`;
}

function syncPickStates() {
  if (asmOnly) { renderPickGrid(); return; }
  document.querySelectorAll("#asm-grid .pick").forEach((el) => el.classList.toggle("on", team.has(el.dataset.name)));
}

function renderTeamPanel() {
  $("#tp-count").textContent = team.size;
  const members = [...team].map((n) => byName.get(n)).filter(Boolean);
  $("#tp-members").innerHTML = members.length
    ? members.map((s) => `
      <div class="member">
        <img src="${esc(s.avatar)}" alt="" />
        <span class="n">${esc(s.persona)}<small>${esc(s.name)}</small></span>
        <button data-remove="${esc(s.name)}" title="Remove from team" aria-label="Remove ${esc(s.persona)}">✕</button>
      </div>`).join("")
    : `<div class="empty">Nobody yet. Pick specialists on the left, or start from a preset above.</div>`;
  const claude = members.filter((s) => s.runtime === "claude").length;
  const codex = members.length - claude;
  $("#tp-mix").innerHTML = members.length
    ? `<span class="tag">${claude} on Claude</span><span class="tag">${codex} on Codex</span>`
    : "";
  $("#tp-cmd").textContent = teamCommand();
}

$("#asm-search").addEventListener("input", (e) => { asmQuery = e.target.value; renderPickGrid(); });
$("#asm-division").addEventListener("change", (e) => { asmDivision = e.target.value; renderChips($("#asm-chips"), asmDivision); renderPickGrid(); });
$("#asm-chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-div]");
  if (!b) return;
  asmDivision = b.dataset.div;
  $("#asm-division").value = asmDivision;
  renderChips($("#asm-chips"), asmDivision); renderPickGrid();
});
$("#asm-only").addEventListener("click", (e) => {
  asmOnly = !asmOnly;
  e.currentTarget.classList.toggle("primary", asmOnly);
  renderPickGrid();
});
$("#asm-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".pick");
  if (b) toggleTeam(b.dataset.name);
});
$("#presets").addEventListener("click", (e) => {
  const b = e.target.closest("[data-preset]");
  if (!b) return;
  const p = presets.find((x) => x.id === b.dataset.preset);
  if (!p) return;
  team = new Set(p.members.filter((n) => byName.has(n)));
  saveTeam();
  toast(`${p.label}: ${team.size} specialists on your team`);
});
$("#tp-members").addEventListener("click", (e) => {
  const b = e.target.closest("[data-remove]");
  if (b) toggleTeam(b.dataset.remove, false);
});
$("#tp-clear").addEventListener("click", () => { team.clear(); saveTeam(); });
$("#tp-copy").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(teamCommand()); toast("Command copied. Paste it into Claude Code."); }
  catch { toast("Copy failed. Select the command and copy it by hand."); }
});
$("#tp-download").addEventListener("click", () => {
  const body = JSON.stringify({ version: 1, name: "My team", policy: "strict", members: [...team] }, null, 2) + "\n";
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([body], { type: "application/json" }));
  a.download = "team.json";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("Saved. Put it at .npc-union/team.json in your project.");
});
$("#tp-office").addEventListener("click", () => showScreen("office"));

// ---------- tabs / routing ----------
const SCREENS = ["gallery", "assemble", "office"];
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.screen === id));
  if (id === "office") {
    ensureOffice();
    // ?record hands the clock to scripts/record-office.mjs, which steps the simulation itself.
    if (!new URLSearchParams(location.search).has("record")) office.start();
    requestAnimationFrame(() => office.resize());
  } else if (office) {
    office.stop();
  }
  history.replaceState(null, "", "#" + id);
}
document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => showScreen(t.dataset.screen)));

function goToOffice(name) {
  closeModal();
  showScreen("office");
  setTimeout(() => office.focusByName(name), 350);
}

// ---------- 3D office ----------
function ensureOffice() {
  if (office) return;
  office = createOffice({
    container: $("#scene"),
    labelsEl: $("#labels"),
    feedEl: $("#feed"),
    panel: $("#panel"),
    specialists,
    random: new URLSearchParams(location.search).has("seed") ? seeded(Number(new URLSearchParams(location.search).get("seed")) || 1) : undefined,
    onStats: ({ working, jobs, reports, total }) => {
      $("#st-working").textContent = working;
      $("#st-jobs").textContent = jobs;
      $("#st-reports").textContent = reports;
      $("#st-total").textContent = total;
    },
    onTeam: (html) => {
      const list = $("#team-list");
      list.innerHTML = html;
      $("#team-count").textContent = `${list.children.length}`;
    },
    onSelect: (name) => {
      document.querySelectorAll(".team-row").forEach((r) => r.classList.toggle("sel", r.dataset.name === name));
    },
    onProfile: (name, label) => openModal(name, label),
    initialTeam: [...team],
  });
  window.__office = office; // used by scripts/record-office.mjs
  $("#team-toggle").addEventListener("click", () => document.querySelector(".hud-team").classList.toggle("collapsed"));
  $("#team-list").addEventListener("click", (e) => {
    const row = e.target.closest(".team-row");
    if (row) office.focusByName(row.dataset.name);
  });
  $("#btn-zoom-in").onclick = () => office.zoom?.(0.8);
  $("#btn-zoom-out").onclick = () => office.zoom?.(1.25);
  $("#btn-overview").onclick = () => office.overview();
  $("#p-close").onclick = () => office.overview();
  $("#p-profile").onclick = () => openModal(currentPanelName());
  window.addEventListener("resize", () => office?.resize());
}

// Small seeded generator so ?seed=N gives the same office day every time.
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function currentPanelName() {
  return $("#p-name").textContent || null;
}

// ---------- detail modal with turntable ----------
let preview = null;
function openModal(name, awardLabel) {
  const s = byName.get(name);
  if (!s) return;
  $("#m-persona").textContent = s.persona;
  $("#m-name").textContent = s.name;
  $("#m-desc").textContent = s.description;
  const badge = $("#m-badge");
  badge.hidden = !awardLabel;
  badge.textContent = awardLabel ? `★ Employee of the Month · ${awardLabel}` : "";
  $("#m-meta").innerHTML = [
    `<span class="tag">${esc(prettyDiv(s.division))}</span>`,
    `<span class="tag">${esc(s.department)}</span>`,
    `<span class="tag model">${esc(s.model)}</span>`,
    `<span class="tag">${esc(s.runtime)}</span>`,
    s.reasoning ? `<span class="tag">${esc(s.reasoning)} reasoning</span>` : "",
  ].join("");
  $("#m-caps").innerHTML = s.capabilities.map((c) => `<span class="tag">${esc(c)}</span>`).join("");
  $("#m-office").onclick = () => goToOffice(s.name);
  const teamBtn = $("#m-team");
  const paint = () => { teamBtn.textContent = team.has(s.name) ? "✓ On your team" : "Add to team"; };
  teamBtn.onclick = () => { toggleTeam(s.name); paint(); renderGrid(); };
  paint();
  $("#modal").classList.add("open");
  startPreview(s);
}
function closeModal() {
  $("#modal").classList.remove("open");
  if (preview) { preview.stop(); preview = null; }
}
$("#m-close").onclick = closeModal;
$("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if ($("#modal").classList.contains("open")) closeModal();
    else if (office && $("#panel").classList.contains("open")) office.overview();
  }
});

function startPreview(s) {
  const host = $("#m-view");
  if (preview) preview.stop();
  const canvas = document.createElement("canvas");
  host.querySelectorAll("canvas").forEach((c) => c.remove());
  host.prepend(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  scene.add(new THREE.HemisphereLight(0xdfe9ff, 0x221a14, 1.0));
  const key = new THREE.DirectionalLight(0xfff1dc, 1.6);
  key.position.set(3, 6, 4);
  key.castShadow = true;
  scene.add(key);

  const disc = new THREE.Mesh(new THREE.CircleGeometry(1.2, 48), new THREE.MeshStandardMaterial({ color: 0x1b2638, roughness: 1 }));
  disc.rotation.x = -Math.PI / 2;
  disc.receiveShadow = true;
  scene.add(disc);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.18, 1.22, 64), new THREE.MeshBasicMaterial({ color: 0xf5b93a, transparent: true, opacity: 0.6 }));
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.02;
  scene.add(ring);

  const figure = buildCharacter(s, null);
  figure.position.y = 0;
  scene.add(figure);
  getPalette(s.name, s.avatar).then((pal) => {
    if (!pal || !preview || preview.canvas !== canvas) return;
    scene.remove(figure);
    figure.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose?.(); });
    const fresh = buildCharacter(s, pal);
    scene.add(fresh);
    preview.figure = fresh;
  });

  const state = { yaw: 0.6, pitch: 0.12, dist: 7.6, dragging: false, lx: 0, ly: 0, spin: true, running: true, figure, canvas };
  const fit = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  };
  const place = () => {
    const tgt = new THREE.Vector3(0, 1.5, 0);
    cam.position.set(
      tgt.x + state.dist * Math.cos(state.pitch) * Math.sin(state.yaw),
      tgt.y + state.dist * Math.sin(state.pitch),
      tgt.z + state.dist * Math.cos(state.pitch) * Math.cos(state.yaw),
    );
    cam.lookAt(tgt);
  };
  canvas.addEventListener("pointerdown", (e) => { state.dragging = true; state.lx = e.clientX; state.ly = e.clientY; state.spin = false; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", (e) => {
    if (!state.dragging) return;
    state.yaw -= (e.clientX - state.lx) * 0.01;
    state.pitch = Math.max(-0.2, Math.min(0.9, state.pitch + (e.clientY - state.ly) * 0.005));
    state.lx = e.clientX; state.ly = e.clientY;
  });
  canvas.addEventListener("pointerup", () => { state.dragging = false; });
  canvas.addEventListener("wheel", (e) => { e.preventDefault(); state.dist = Math.max(2.4, Math.min(9, state.dist * (1 + e.deltaY * 0.001))); }, { passive: false });

  const clock = new THREE.Clock();
  let t = 0;
  const loop = () => {
    if (!state.running) return;
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, clock.getDelta());
    t += dt;
    if (state.spin) state.yaw += dt * 0.5;
    if (preview?.figure) animateCharacter(preview.figure, "stand", t, dt);
    place();
    renderer.render(scene, cam);
  };
  const onResize = () => fit();
  window.addEventListener("resize", onResize);
  fit();
  preview = {
    canvas, figure,
    stop() {
      state.running = false;
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    },
  };
  loop();
}

// ---------- boot ----------
renderChips($("#chips"), activeDivision);
renderChips($("#asm-chips"), asmDivision);
renderGrid();
renderPresets();
renderPickGrid();
saveTeam();
await document.fonts?.ready; // plaques and labels are drawn with the web fonts
const start = (location.hash || "#gallery").slice(1);
showScreen(SCREENS.includes(start) ? start : "gallery");
