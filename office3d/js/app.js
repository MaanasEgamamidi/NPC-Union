// Site shell: switches between the specialist gallery and the 3D office,
// filters the roster, and shows a turntable 3D preview for each specialist.
import * as THREE from "three";
import { buildCharacter, getPalette, animateCharacter } from "./character.js";
import { createOffice } from "./office.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let specialists = [];
let office = null;
let activeDivision = "all";
let query = "";

// ---------- data ----------
const res = await fetch("./specialists.json");
specialists = (await res.json()).specialists;
const byName = new Map(specialists.map((s) => [s.name, s]));

const divisions = [...new Set(specialists.map((s) => s.division))].sort();
const divSelect = $("#division");
divSelect.innerHTML = `<option value="all">All divisions (${specialists.length})</option>` +
  divisions.map((d) => `<option value="${esc(d)}">${esc(prettyDiv(d))} (${specialists.filter((s) => s.division === d).length})</option>`).join("");
$("#conn").textContent = `${specialists.length} specialists online`;
$("#st-total").textContent = specialists.length;

function prettyDiv(d) {
  return d.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------- gallery ----------
function renderChips() {
  const chips = [["all", "All"], ...divisions.map((d) => [d, prettyDiv(d)])];
  $("#chips").innerHTML = chips.map(([k, label]) =>
    `<button class="chip ${activeDivision === k ? "on" : ""}" data-div="${esc(k)}">${esc(label)}</button>`).join("");
}

function renderGrid() {
  const q = query.trim().toLowerCase();
  const list = specialists.filter((s) => {
    if (activeDivision !== "all" && s.division !== activeDivision) return false;
    if (!q) return true;
    return [s.name, s.persona, s.description, s.department, ...s.capabilities].join(" ").toLowerCase().includes(q);
  });
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
        <button class="btn primary" data-action="office" data-name="${esc(s.name)}">In the office</button>
      </div>
    </article>`).join("") || `<p style="color:var(--muted)">No specialists match that search.</p>`;
}

$("#search").addEventListener("input", (e) => { query = e.target.value; renderGrid(); });
divSelect.addEventListener("change", (e) => { activeDivision = e.target.value; renderChips(); renderGrid(); });
$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-div]");
  if (!b) return;
  activeDivision = b.dataset.div;
  divSelect.value = activeDivision;
  renderChips(); renderGrid();
});
$("#grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-action]");
  if (!b) return;
  const name = b.dataset.name;
  if (b.dataset.action === "view") openModal(name);
  else goToOffice(name);
});

// ---------- tabs / routing ----------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.screen === id));
  if (id === "office") {
    ensureOffice();
    office.start();
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
  });
  $("#team-list").addEventListener("click", (e) => {
    const row = e.target.closest(".team-row");
    if (row) office.focusByName(row.dataset.name);
  });
  $("#btn-zoom-in").onclick = () => office.zoom?.(0.8);
  $("#btn-zoom-out").onclick = () => office.zoom?.(1.25);
  $("#btn-overview").onclick = () => office.overview();
  $("#p-close").onclick = () => office.overview();
  $("#p-profile").onclick = () => openModal($("#p-persona").textContent ? currentPanelName() : null);
  window.addEventListener("resize", () => office?.resize());
}

function currentPanelName() {
  return $("#p-name").textContent || null;
}

// ---------- detail modal with turntable ----------
let preview = null;
function openModal(name) {
  const s = byName.get(name);
  if (!s) return;
  $("#m-persona").textContent = s.persona;
  $("#m-name").textContent = s.name;
  $("#m-desc").textContent = s.description;
  $("#m-meta").innerHTML = [
    `<span class="tag">${esc(prettyDiv(s.division))}</span>`,
    `<span class="tag">${esc(s.department)}</span>`,
    `<span class="tag model">${esc(s.model)}</span>`,
    `<span class="tag">${esc(s.runtime)}</span>`,
    s.reasoning ? `<span class="tag">${esc(s.reasoning)} reasoning</span>` : "",
  ].join("");
  $("#m-caps").innerHTML = s.capabilities.map((c) => `<span class="tag">${esc(c)}</span>`).join("");
  $("#m-office").onclick = () => goToOffice(s.name);
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
  ring.position.y = 0.005;
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

  const state = { yaw: 0.6, pitch: 0.12, dist: 6.8, dragging: false, lx: 0, ly: 0, spin: true, running: true, figure, canvas };
  const fit = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  };
  const place = () => {
    const tgt = new THREE.Vector3(0, 1.25, 0);
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
renderChips();
renderGrid();
const start = (location.hash || "#gallery").slice(1);
showScreen(start === "office" ? "office" : "gallery");
