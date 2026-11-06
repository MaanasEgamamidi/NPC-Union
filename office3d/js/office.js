// The 3D office: builds the floor plan from the specialist roster, runs the
// work simulation (pairs talk across desks, a reporter walks to Quorum and
// reports back), and handles camera focus, picking and labels.
import * as THREE from "three";
import { buildCharacter, getPalette, animateCharacter, faceToward } from "./character.js";
import { recentWinners, citation } from "./eotm.js";

const CELL = 0.5;            // pathfinding grid size (world units)
const POD_W = 2.2;           // horizontal spacing of desk pods
const POD_D = 4.4;           // vertical spacing of pod rows (pod depth + aisle)
const MARGIN = 1.0;          // inner margin of each zone
const ZONE_GAP = 3.0;        // walkable street between zones
const MAX_ROW_W = 62;        // wrap zones into rows after this width
const MAX_JOBS = 3;
const WALK_SPEED = 4.6;       // world units per second (was 2.2)
const STRIDE = 2.1;           // distance covered by one full leg cycle, so feet match the ground speed
const WALL_H = 4.0;

const ACCENTS = [
  0xf5b93a, 0x2ec4b6, 0x9d7bff, 0xff6b8a, 0x7fb8ff, 0x8bd450, 0xffa15c, 0x4fd1ff,
  0xd28bff, 0xffd166, 0x6ee7b7, 0xf472b6, 0x60a5fa, 0xa3e635, 0xfb923c, 0x22d3ee,
];

const TOPICS = [
  "research pass", "draft review", "spec update", "quality sweep",
  "asset check", "summary write-up", "risk review", "option comparison",
];

const STATUS = {
  type: { label: "Working", cls: "s-working" },
  talk: { label: "Talking", cls: "s-talking" },
  think: { label: "Thinking", cls: "s-thinking" },
  walk: { label: "Walking", cls: "s-walking" },
  report: { label: "Reporting", cls: "s-reporting" },
  idle: { label: "Idle", cls: "s-idle" },
};

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const pick = (arr, seed) => arr[seed % arr.length];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function prettyLabel(dept) {
  if (dept.startsWith("leadership")) return "Headquarters";
  const last = dept.split("/").pop();
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ---------------------------------------------------------------------------
export function createOffice({ container, labelsEl, feedEl, panel, specialists, onStats, onTeam, onSelect, onProfile, random, initialTeam }) {
  const rand = random ?? Math.random; // a seeded generator makes recordings repeatable
  // ----- renderer / scene -----
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1017);
  scene.fog = new THREE.Fog(0x0b1017, 110, 260);

  // A near plane of 1 (not 0.1) keeps depth precision high enough that thin
  // layers such as rugs, plaques and window glass never z-fight at overview range.
  const camera = new THREE.PerspectiveCamera(42, 1, 1, 500);

  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x2a2118, 1.25));
  const sun = new THREE.DirectionalLight(0xffe2b8, 1.7);
  sun.position.set(40, 80, 30);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0008;
  scene.add(sun);
  scene.add(sun.target);

  // ----- layout -----
  const zones = [];                 // { key, label, accent, x0, z0, w, h, members[], pods[] }
  const agents = [];                // runtime agent records
  const byName = new Map();
  const obstacles = [];             // {x0,x1,z0,z1} footprints for pathfinding
  const workstations = [];          // meshes to toggle monitor glow

  const groups = new Map();
  for (const s of specialists) {
    const key = s.division === "leadership" ? "leadership" : s.department;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }

  // Headquarters first, then departments sorted by size (largest first).
  const hqKey = "leadership";
  const deptKeys = [...groups.keys()].filter((k) => k !== hqKey).sort((a, b) => groups.get(b).length - groups.get(a).length);
  const orderedKeys = [hqKey, ...deptKeys];

  // Compute each zone's rectangle.
  const shapes = orderedKeys.map((key, i) => {
    const members = groups.get(key);
    if (key === hqKey) return { key, members, w: 14, h: 8, pods: 0, cols: 0, rows: 0, accent: 0xf5b93a, label: "Headquarters" };
    const pods = Math.ceil(members.length / 2);
    const cols = clamp(Math.ceil(Math.sqrt(pods)), 1, 5);
    const rows = Math.ceil(pods / cols);
    const w = cols * POD_W + MARGIN * 2;
    const h = (rows - 1) * POD_D + 3.4 + MARGIN * 2;
    return { key, members, w, h, pods, cols, rows, accent: ACCENTS[(i * 5) % ACCENTS.length], label: prettyLabel(key) };
  });

  // Shelf-pack the departments into rows, then drop Headquarters into the middle
  // row at the point that balances the row, so the Steward sits at the heart of
  // the floor and every reporter has roughly the same walk.
  const hqShape = shapes.find((s) => s.key === hqKey);
  const rowsOfShapes = [];
  {
    let row = { items: [], w: 0 };
    for (const sh of shapes) {
      if (sh === hqShape) continue;
      if (row.items.length && row.w + sh.w > MAX_ROW_W) { rowsOfShapes.push(row); row = { items: [], w: 0 }; }
      row.items.push(sh);
      row.w += sh.w + ZONE_GAP;
    }
    rowsOfShapes.push(row);
  }
  const midRow = rowsOfShapes[Math.floor((rowsOfShapes.length - 1) / 2)];
  {
    let best = 0, bestGap = Infinity;
    for (let i = 0; i <= midRow.items.length; i++) {
      const left = midRow.items.slice(0, i).reduce((s, z) => s + z.w + ZONE_GAP, 0);
      const right = midRow.items.slice(i).reduce((s, z) => s + z.w + ZONE_GAP, 0);
      const gap = Math.abs(left - right);
      if (gap < bestGap) { bestGap = gap; best = i; }
    }
    midRow.items.splice(best, 0, hqShape);
    midRow.w += hqShape.w + ZONE_GAP;
  }
  let packZ = 0;
  for (const row of rowsOfShapes) {
    const rowH = Math.max(...row.items.map((s) => s.h));
    let x = -(row.w - ZONE_GAP) / 2;
    for (const sh of row.items) {
      // Headquarters is centred vertically in its row; departments hang from the top.
      const z0 = sh === hqShape ? packZ + (rowH - sh.h) / 2 : packZ;
      zones.push({ ...sh, x0: x, z0 });
      x += sh.w + ZONE_GAP;
    }
    packZ += rowH + ZONE_GAP;
  }
  {
    const minX = Math.min(...zones.map((z) => z.x0)), maxX = Math.max(...zones.map((z) => z.x0 + z.w));
    const minZ = Math.min(...zones.map((z) => z.z0)), maxZ = Math.max(...zones.map((z) => z.z0 + z.h));
    const ox = (minX + maxX) / 2, oz = (minZ + maxZ) / 2;
    for (const z of zones) { z.x0 -= ox; z.z0 -= oz; }
  }
  const spanX = Math.max(...zones.map((z) => z.x0 + z.w)) - Math.min(...zones.map((z) => z.x0));
  const spanZ = Math.max(...zones.map((z) => z.z0 + z.h)) - Math.min(...zones.map((z) => z.z0));
  const plan = { minX: -spanX / 2 - 4, maxX: spanX / 2 + 4, minZ: -spanZ / 2 - 4, maxZ: spanZ / 2 + 4 };

  // ----- floor & decor -----
  // One continuous plank floor. No grid helper: its lines sat 2 mm above the
  // floor and flickered into black-and-white squares at overview distance.
  const plankTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d");
    const rows = 8;
    for (let r = 0; r < rows; r++) {
      const shade = 52 + ((r * 37) % 9) * 2;
      g.fillStyle = `rgb(${shade + 8},${shade - 2},${shade - 14})`;
      g.fillRect(0, (r * 512) / rows, 512, 512 / rows);
      g.fillStyle = "rgba(0,0,0,0.28)";
      g.fillRect(0, (r * 512) / rows, 512, 2);
      const off = (r * 173) % 512;
      g.fillRect(off, (r * 512) / rows, 2, 512 / rows);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.repeat.set((plan.maxX - plan.minX) / 6, (plan.maxZ - plan.minZ) / 6);
    return t;
  })();
  const floorMat = new THREE.MeshStandardMaterial({ map: plankTex, roughness: 0.9 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(plan.maxX - plan.minX, plan.maxZ - plan.minZ), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set((plan.minX + plan.maxX) / 2, 0, (plan.minZ + plan.maxZ) / 2);
  floor.receiveShadow = true;
  scene.add(floor);

  const boxMat = (c, r = 0.7, m = 0.05) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const woodMat = boxMat(0x6b4a2e, 0.55);
  const metalMat = boxMat(0x2a3140, 0.4, 0.4);
  const screenMatOff = boxMat(0x0c1119, 0.2, 0.2);
  const chairMat = boxMat(0x1f2633, 0.8);

  for (const z of zones) {
    // zone floor tint
    const tile = new THREE.Mesh(
      new THREE.PlaneGeometry(z.w, z.h),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(z.accent).multiplyScalar(0.2), roughness: 1, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
    );
    tile.rotation.x = -Math.PI / 2;
    tile.position.set(z.x0 + z.w / 2, 0.04, z.z0 + z.h / 2);
    tile.receiveShadow = true;
    scene.add(tile);
    // Zone names are HTML overlays (see updateLabels), so they stay sharp and
    // readable from any camera angle instead of being painted on the floor.

    // low planters in the zone corners for character
    const planter = (x, zz) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.6, 12), boxMat(0x3a2a20, 0.9));
      p.position.set(x, 0.3, zz);
      p.castShadow = true;
      scene.add(p);
      const leaves = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), boxMat(0x2f7d4e, 0.8));
      leaves.position.set(x, 1.0, zz);
      leaves.castShadow = true;
      scene.add(leaves);
    };
    planter(z.x0 + z.w - 0.5, z.z0 + z.h - 0.5);
  }

  // ----- furniture helpers -----
  function addBox(w, h, d, x, y, z, mat, { cast = true } = {}) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = true;
    scene.add(m);
    return m;
  }

  function addChair(x, z, side) {
    // side: -1 means the sitter is on the -z side of the desk (faces +z)
    const seatZ = z;
    addBox(0.5, 0.08, 0.5, x, 0.46, seatZ, chairMat);
    addBox(0.5, 0.6, 0.07, x, 0.8, seatZ + side * 0.25, chairMat);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 8), metalMat);
    stem.position.set(x, 0.22, seatZ);
    scene.add(stem);
  }

  function addDesk(x, zDesk, width, side) {
    // desk top
    addBox(width, 0.06, 0.78, x, 0.74, zDesk, woodMat);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      addBox(0.05, 0.72, 0.05, x + sx * (width / 2 - 0.1), 0.36, zDesk + sz * 0.32, metalMat, { cast: false });
    }
    // monitor on the far side from the sitter, plus keyboard and mug
    const monitor = new THREE.Group();
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.38, 0.04), screenMatOff.clone());
    screen.position.set(0, 0.98, 0);
    monitor.add(screen);
    const stand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.06), metalMat);
    stand.position.set(0, 0.8, 0);
    monitor.add(stand);
    monitor.position.set(x, 0, zDesk - side * 0.22);
    scene.add(monitor);
    workstations.push(screen);
    addBox(0.42, 0.02, 0.14, x, 0.78, zDesk + side * 0.14, boxMat(0x2b3240, 0.5));
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 10), boxMat(0xf0f3f8, 0.4));
    mug.position.set(x + width / 2 - 0.25, 0.8, zDesk + side * 0.2);
    scene.add(mug);
    obstacles.push({ x0: x - width / 2 - 0.1, x1: x + width / 2 + 0.1, z0: zDesk - 0.45, z1: zDesk + 0.45 });
  }

  // ----- headquarters -----
  const hq = zones.find((z) => z.key === hqKey);
  const hqCx = hq.x0 + hq.w / 2;
  const hqCz = hq.z0 + hq.h / 2;
  const masterDeskZ = hqCz - 1.2;
  addDesk(hqCx, masterDeskZ, 3.2, -1);
  // the desk is wider; extend obstacle for the big executive desk
  obstacles[obstacles.length - 1] = { x0: hqCx - 1.7, x1: hqCx + 1.7, z0: masterDeskZ - 0.5, z1: masterDeskZ + 0.5 };
  const reportSpot = { x: hqCx, z: masterDeskZ + 1.9 };
  const masterSeat = { x: hqCx, z: masterDeskZ - 0.95, yaw: 0 };
  addChair(masterSeat.x, masterSeat.z, -1);

  // round meeting table with four chairs
  const tableX = hqCx + 4.2, tableZ = hqCz + 0.4;
  const table = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.08, 24), boxMat(0x5a3d25, 0.45));
  table.position.set(tableX, 0.74, tableZ);
  table.castShadow = true;
  scene.add(table);
  const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.7, 10), metalMat);
  tableLeg.position.set(tableX, 0.36, tableZ);
  scene.add(tableLeg);
  obstacles.push({ x0: tableX - 1.1, x1: tableX + 1.1, z0: tableZ - 1.1, z1: tableZ + 1.1 });
  const meetingSeats = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const x = tableX + Math.sin(a) * 1.65, z = tableZ + Math.cos(a) * 1.65;
    meetingSeats.push({ x, z, yaw: Math.atan2(tableX - x, tableZ - z) });
    addChair(x, z, 0);
  }

  // ----- department pods -----
  for (const z of zones) {
    if (z.key === hqKey) continue;
    z.seats = [];
    const members = z.members.slice();
    for (let p = 0; p < z.pods; p++) {
      const col = p % z.cols, row = Math.floor(p / z.cols);
      const podX = z.x0 + MARGIN + POD_W / 2 + col * POD_W;
      const podZ = z.z0 + MARGIN + 1.7 + row * POD_D;
      // desk A (north, sitter on -z side), desk B (south, sitter on +z side)
      const a = members[p * 2], b = members[p * 2 + 1];
      const deskA = podZ - 0.45, deskB = podZ + 0.45;
      if (a) {
        addDesk(podX, deskA, 1.3, -1);
        addChair(podX, deskA - 0.8, -1);
        const seat = { x: podX, z: deskA - 0.8, yaw: 0, desk: { x: podX, z: deskA } };
        z.seats.push({ spec: a, seat, pod: p });
      }
      if (b) {
        addDesk(podX, deskB, 1.3, 1);
        addChair(podX, deskB + 0.8, 1);
        const seat = { x: podX, z: deskB + 0.8, yaw: Math.PI, desk: { x: podX, z: deskB } };
        z.seats.push({ spec: b, seat, pod: p });
      }
    }
    z.workstations = z.seats.length;
  }

  // ----- office dressing: walls, windows, props, break area -----
  const wallH = WALL_H, wallT = 0.3;
  const wallMat = boxMat(0xd8d2c4, 0.9);
  const trimMat = boxMat(0x6b5843, 0.6);
  const frameMat = boxMat(0x2d2a26, 0.5);
  const bookColors = [0xc0392b, 0x2e86c1, 0xf1c40f, 0x27ae60, 0x8e44ad, 0xe67e22];

  // Rotation that turns a plane (normal +z) to face into the room from each wall.
  const FACING_YAW = { north: 0, south: Math.PI, west: Math.PI / 2, east: -Math.PI / 2 };
  const FACING_DIR = { north: [0, 1], south: [0, -1], west: [1, 0], east: [-1, 0] };

  // A window is ONE solid frame box with the glass set clearly in front of its
  // face, so there are never two surfaces at the same depth.
  const glassMat = new THREE.MeshBasicMaterial({ color: 0xa8dcff, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  function windowAt(px, pz, facing) {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.8, 0.16), frameMat);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.5), glassMat);
    glass.position.z = 0.085;
    g.add(frame, glass);
    g.position.set(px, 2.2, pz);
    g.rotation.y = FACING_YAW[facing];
    scene.add(g);
  }

  function wall(x, z, sx, sz, facing, { windows = true } = {}) {
    addBox(sx, wallH, sz, x, wallH / 2, z, wallMat);
    addBox(sx + 0.06, 0.12, sz + 0.06, x, 0.9, z, trimMat, { cast: false }); // wainscot cap rail
    if (!windows) return;
    const long = Math.max(sx, sz);
    const alongX = sx >= sz;
    const dir = FACING_DIR[facing];
    for (let s = -long / 2 + 3; s < long / 2 - 2; s += 7) {
      windowAt(alongX ? x + s : x + dir[0] * 0.15, alongX ? z + dir[1] * 0.15 : z + s, facing);
    }
  }
  const wallsW = plan.maxX - plan.minX, wallsD = plan.maxZ - plan.minZ;
  const pcx2 = (plan.minX + plan.maxX) / 2, pcz2 = (plan.minZ + plan.maxZ) / 2;
  wall(pcx2, plan.minZ, wallsW, wallT, "north", { windows: false }); // the north wall hosts the Hall of Fame
  wall(pcx2, plan.maxZ, wallsW, wallT, "south");
  wall(plan.minX, pcz2, wallT, wallsD, "west");
  wall(plan.maxX, pcz2, wallT, wallsD, "east");

  // ----- Employee of the Month hall of fame -----
  // Thirteen framed portraits along the north wall: this month's winner in the
  // centre (bigger, gold), the twelve previous winners either side. Click one to
  // open that specialist's profile.
  const plaques = [];
  const winners = recentWinners(specialists);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xc9962b, roughness: 0.35, metalness: 0.75 });
  const goldGlowMat = new THREE.MeshStandardMaterial({ color: 0xf5b93a, roughness: 0.3, metalness: 0.7, emissive: 0x7a5410, emissiveIntensity: 0.8 });

  function plaqueTexture(w, spec, label, current) {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 640;
    const g = c.getContext("2d");
    const paint = (img) => {
      g.clearRect(0, 0, c.width, c.height);
      const grad = g.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, "#16233a"); grad.addColorStop(1, "#0b1220");
      g.fillStyle = grad; g.fillRect(0, 0, c.width, c.height);
      // portrait
      g.fillStyle = "#0e1520"; g.fillRect(36, 96, 440, 380);
      if (img) {
        const s = Math.min(img.width, img.height);
        g.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 36, 96, 440, 380);
      }
      g.strokeStyle = "#f5b93a"; g.lineWidth = 6; g.strokeRect(36, 96, 440, 380);
      // header ribbon
      g.fillStyle = current ? "#f5b93a" : "#c9962b";
      g.fillRect(0, 0, c.width, 76);
      g.fillStyle = "#1a1405"; g.textAlign = "center"; g.textBaseline = "middle";
      g.font = "700 38px Space Grotesk, Inter, sans-serif";
      g.fillText("EMPLOYEE OF THE MONTH", c.width / 2, 40);
      // name plate
      g.fillStyle = "#f4f7fb";
      g.font = "700 60px Space Grotesk, Inter, sans-serif";
      let size = 60;
      while (g.measureText(spec.persona).width > 460 && size > 30) { size -= 4; g.font = `700 ${size}px Space Grotesk, Inter, sans-serif`; }
      g.fillText(spec.persona, c.width / 2, 524);
      g.fillStyle = "#f5b93a";
      g.font = "600 34px Inter, sans-serif";
      g.fillText(label.toUpperCase() + (current ? "  ·  NOW" : ""), c.width / 2, 590);
    };
    paint(null);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    const img = new Image();
    img.onload = () => { paint(img); tex.needsUpdate = true; };
    img.src = spec.avatar;
    // Webfonts may still be loading at build time; repaint once they are ready.
    document.fonts?.ready.then(() => { paint(img.complete && img.naturalWidth ? img : null); tex.needsUpdate = true; });
    return tex;
  }

  {
    const n = winners.length;                      // 13, oldest first, current last
    const order = [];                              // current in the middle, others fanned out
    const cur = winners[n - 1];
    const past = winners.slice(0, n - 1);
    const half = past.length / 2;
    order.push(...past.slice(0, half), cur, ...past.slice(half));
    const span = Math.min(wallsW - 12, 74);
    const step = span / (n - 1);
    const mid = (n - 1) / 2;
    order.forEach((win, i) => {
      const big = win.current;
      const pw = big ? 3.5 : 2.4, ph = pw * 1.25;
      const px = pcx2 + (i - mid) * step;
      const pz = plan.minZ + 0.15 + 0.08; // back of the frame sinks 0.02 into the wall
      const g = new THREE.Group();
      const frame = new THREE.Mesh(new THREE.BoxGeometry(pw + 0.34, ph + 0.34, 0.2), big ? goldGlowMat : goldMat);
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(pw, ph),
        new THREE.MeshBasicMaterial({ map: plaqueTexture(pw, win.spec, win.label, big), polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
      );
      face.position.z = 0.108;
      face.userData.plaque = { name: win.spec.name, label: win.label, current: big };
      g.add(frame, face);
      g.position.set(px, big ? 2.15 : 2.35, pz);
      frame.castShadow = true;
      scene.add(g);
      plaques.push({ group: g, face, win });
    });
  }

  // bookshelf with coloured spines (blocks the walkway it stands on)
  function bookshelf(x, z, alongZ) {
    const w = alongZ ? 0.45 : 1.6, d = alongZ ? 1.6 : 0.45;
    addBox(w, 2.0, d, x, 1.0, z, woodMat);
    const face = alongZ ? (x < 0 ? 1 : -1) : 1;
    for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) {
      const bc = bookColors[(i + row * 2) % bookColors.length];
      const bw = alongZ ? 0.02 : 0.1, bh = 0.26, bd = alongZ ? 0.1 : 0.02;
      const bx = alongZ ? x + face * (w / 2 + 0.01) : x - d / 2 + 0.25 + i * 0.22;
      const bz = alongZ ? z - d / 2 + 0.25 + i * 0.22 : z + face * (d / 2 + 0.01);
      addBox(bw + (alongZ ? 0.0 : 0.0), bh, bd + (alongZ ? 0.0 : 0.0), bx, 0.4 + row * 0.6, bz, boxMat(bc, 0.6), { cast: false });
    }
    obstacles.push({ x0: x - w / 2 - 0.05, x1: x + w / 2 + 0.05, z0: z - d / 2 - 0.05, z1: z + d / 2 + 0.05 });
  }

  function whiteboard(x, z, alongZ) {
    const w = alongZ ? 0.08 : 2.2, d = alongZ ? 2.2 : 0.08;
    addBox(w + 0.06, 1.3, d + 0.06, x, 1.6, z, boxMat(0x9aa3ad, 0.4, 0.4), { cast: false });
    addBox(w, 1.2, d, x, 1.6, z, boxMat(0xf5f7fa, 0.3), { cast: false });
    // scribbles
    addBox(alongZ ? 0.12 : 1.2, 0.04, alongZ ? 0.9 : 0.12, x, 1.9, z, boxMat(0x2e86c1, 0.5), { cast: false });
    addBox(alongZ ? 0.12 : 0.7, 0.04, alongZ ? 0.5 : 0.12, x, 1.45, z, boxMat(0xc0392b, 0.5), { cast: false });
  }

  function waterCooler(x, z) {
    addBox(0.4, 0.9, 0.4, x, 0.45, z, boxMat(0xe8edf3, 0.5));
    const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.6, 14), boxMat(0x7fd6ff, 0.1, 0.0));
    bottle.material.transparent = true; bottle.material.opacity = 0.7;
    bottle.position.set(x, 1.2, z);
    scene.add(bottle);
    obstacles.push({ x0: x - 0.25, x1: x + 0.25, z0: z - 0.25, z1: z + 0.25 });
  }

  function plant(x, z, s = 1) {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.35 * s, 0.28 * s, 0.6 * s, 12), boxMat(0x9a5b3c, 0.9));
    pot.position.set(x, 0.3 * s, z);
    pot.castShadow = true;
    scene.add(pot);
    for (let i = 0; i < 3; i++) {
      const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42 * s, 0), boxMat(i % 2 ? 0x2f8f56 : 0x3fa866, 0.8));
      leaf.position.set(x + (i - 1) * 0.12 * s, (0.95 + i * 0.22) * s, z + (i % 2 ? 0.1 : -0.1) * s);
      leaf.castShadow = true;
      scene.add(leaf);
    }
    obstacles.push({ x0: x - 0.3 * s, x1: x + 0.3 * s, z0: z - 0.3 * s, z1: z + 0.3 * s });
  }

  // Each department gets a bookshelf, whiteboard, plants and sometimes a cooler,
  // placed in the margins between the pods so the walkways stay open.
  zones.forEach((z, i) => {
    if (z.key === hqKey) return;
    const cols = z.cols;
    const podsRight = z.x0 + MARGIN + cols * POD_W;
    const rightStrip = z.x0 + z.w - 0.55;
    if (z.w - (cols * POD_W) >= 2.4) {
      bookshelf(rightStrip, z.z0 + z.h * 0.35, true);
      whiteboard(z.x0 + 0.25, z.z0 + z.h * 0.65, true);
    }
    plant(z.x0 + z.w - 0.5, z.z0 + z.h - 0.5, 1.0);
    plant(z.x0 + 0.5, z.z0 + z.h - 0.5, 0.8);
    if (i % 3 === 0) waterCooler(podsRight + 0.45 > z.x0 + z.w - 0.6 ? z.x0 + 0.6 : z.x0 + z.w - 0.8, z.z0 + z.h - 1.3);
  });

  // Break area in the headquarters' left wing: sofa, coffee machine, plants.
  const sofaX = hqCx - 5.3, sofaZ = hqCz + 0.8;
  addBox(2.4, 0.42, 0.95, sofaX, 0.36, sofaZ, boxMat(0x3c6e8f, 0.9));
  addBox(2.4, 0.6, 0.2, sofaX, 0.8, sofaZ - 0.38, boxMat(0x3c6e8f, 0.9));
  addBox(0.2, 0.5, 0.95, sofaX - 1.1, 0.6, sofaZ, boxMat(0x35607a, 0.9));
  addBox(0.2, 0.5, 0.95, sofaX + 1.1, 0.6, sofaZ, boxMat(0x35607a, 0.9));
  obstacles.push({ x0: sofaX - 1.3, x1: sofaX + 1.3, z0: sofaZ - 0.5, z1: sofaZ + 0.5 });
  addBox(1.1, 0.5, 0.6, hqCx - 5.5, 0.25, hqCz - 2.6, woodMat);
  addBox(0.55, 0.45, 0.45, hqCx - 5.5, 0.72, hqCz - 2.6, boxMat(0x2a2f38, 0.4, 0.3));
  obstacles.push({ x0: hqCx - 6.1, x1: hqCx - 4.9, z0: hqCz - 2.9, z1: hqCz - 2.3 });
  plant(hqCx + 6.2, hqCz - 2.4, 1.2);
  plant(hqCx - 6.3, hqCz - 2.4, 1.0);
  plant(hqCx + 6.3, hqCz + 2.6, 0.9);

  // ----- walkable grid & A* -----
  const W = Math.ceil((plan.maxX - plan.minX) / CELL) + 1;
  const H = Math.ceil((plan.maxZ - plan.minZ) / CELL) + 1;
  const blocked = new Uint8Array(W * H);
  const cellOf = (x, z) => [Math.round((x - plan.minX) / CELL), Math.round((z - plan.minZ) / CELL)];
  const worldOf = (i, j) => ({ x: plan.minX + i * CELL, z: plan.minZ + j * CELL });
  for (const o of obstacles) {
    const [i0, j0] = cellOf(o.x0 - 0.05, o.z0 - 0.05), [i1, j1] = cellOf(o.x1 + 0.05, o.z1 + 0.05);
    for (let j = Math.max(0, j0); j <= Math.min(H - 1, j1); j++) for (let i = Math.max(0, i0); i <= Math.min(W - 1, i1); i++) blocked[j * W + i] = 1;
  }

  function findPath(sx, sz, tx, tz) {
    let [si, sj] = cellOf(sx, sz);
    let [ti, tj] = cellOf(tx, tz);
    si = clamp(si, 0, W - 1); sj = clamp(sj, 0, H - 1);
    ti = clamp(ti, 0, W - 1); tj = clamp(tj, 0, H - 1);
    const start = sj * W + si, goal = tj * W + ti;
    const goalWas = blocked[goal], startWas = blocked[start];
    blocked[goal] = 0; blocked[start] = 0;
    const gScore = new Map([[start, 0]]);
    const came = new Map();
    const open = new MinHeap();
    const h = (i, j) => { const dx = Math.abs(i - ti), dz = Math.abs(j - tj); return Math.max(dx, dz) + (Math.SQRT2 - 1) * Math.min(dx, dz); };
    open.push(h(si, sj), start);
    const closed = new Set();
    const dirs = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]];
    let found = false, guard = 0;
    while (open.size() && guard++ < 60000) {
      const cur = open.pop();
      if (cur === goal) { found = true; break; }
      if (closed.has(cur)) continue;
      closed.add(cur);
      const ci = cur % W, cj = (cur - ci) / W;
      for (const [di, dj, cost] of dirs) {
        const ni = ci + di, nj = cj + dj;
        if (ni < 0 || nj < 0 || ni >= W || nj >= H) continue;
        const n = nj * W + ni;
        if (blocked[n] || closed.has(n)) continue;
        if (di && dj && (blocked[cj * W + ni] || blocked[nj * W + ci])) continue; // no corner cutting
        const g = gScore.get(cur) + cost;
        if (g < (gScore.get(n) ?? Infinity)) {
          gScore.set(n, g);
          came.set(n, cur);
          open.push(g + h(ni, nj), n);
        }
      }
    }
    blocked[goal] = goalWas;
    blocked[start] = startWas;
    if (!found) return null;
    const cells = [];
    let c = goal;
    while (c !== undefined && c !== start) { cells.push(c); c = came.get(c); }
    cells.reverse();
    // drop intermediate points that lie on straight lines to keep motion smooth
    const pts = cells.map((k) => worldOf(k % W, Math.floor(k / W)));
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const prev = out[out.length - 1] ?? { x: sx, z: sz };
      const next = pts[i + 1];
      if (next && Math.abs((pts[i].x - prev.x) * (next.z - pts[i].z) - (pts[i].z - prev.z) * (next.x - pts[i].x)) < 1e-6) continue;
      out.push(pts[i]);
    }
    out.push({ x: tx, z: tz });
    return out;
  }

  // ----- characters -----
  const agentByName = new Map();
  const characterGroup = new THREE.Group();
  scene.add(characterGroup);

  function registerAgent(spec, seat, zone, accent) {
    const root = buildCharacter(spec, null);
    root.position.set(seat.x, 0, seat.z);
    root.rotation.y = seat.yaw;
    characterGroup.add(root);
    animateCharacter(root, "idle", 0, 1); // start seated, not mid-lerp
    const rec = {
      spec, root, seat, zone, accent,
      pose: "idle", status: "idle", busy: false, job: null,
      path: [], onArrive: null, speech: "", speechUntil: 0,
      log: [], lookYaw: null, nextThink: 2 + rand() * 12, phase: rand() * 10,
    };
    agentByName.set(spec.name, rec);
    byName.set(spec.name, rec);
    agents.push(rec);
    // colours from the portrait, applied after the image has loaded
    getPalette(spec.name, spec.avatar).then((pal) => {
      if (!pal) return;
      const fresh = buildCharacter(spec, pal);
      characterGroup.remove(root);
      root.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose?.(); });
      characterGroup.add(fresh);
      fresh.position.copy(root.position);
      fresh.rotation.copy(root.rotation);
      animateCharacter(fresh, "idle", 0, 1);
      rec.root = fresh;
    });
    return rec;
  }

  for (const z of zones) {
    if (z.key === hqKey) continue;
    for (const s of z.seats) {
      const rec = registerAgent(s.spec, s.seat, z, z.accent);
      rec.desk = s.seat.desk;
      rec.podIndex = s.pod;
      z.members.length; // keep reference
    }
    // pair partners share a pod
    for (const r of z.seats) {
      r.rec = agentByName.get(r.spec.name);
    }
  }
  // headquarters: master + leads
  const hqSpecs = groups.get(hqKey);
  const master = hqSpecs.find((s) => s.isMaster) ?? hqSpecs[0];
  const masterRec = registerAgent(master, masterSeat, hq, hq.accent);
  masterRec.isMaster = true;
  masterRec.desk = { x: hqCx, z: masterDeskZ };
  const leads = hqSpecs.filter((s) => s !== master);
  leads.forEach((s, i) => {
    const seat = meetingSeats[i % meetingSeats.length];
    registerAgent(s, seat, hq, hq.accent);
  });

  // pod partners: agents in the same pod face each other across the desks
  const podsByKey = new Map();
  for (const a of agents) {
    if (a.isMaster || a.podIndex === undefined) continue;
    const k = a.zone.key + "#" + a.podIndex;
    if (!podsByKey.has(k)) podsByKey.set(k, []);
    podsByKey.get(k).push(a);
  }
  for (const list of podsByKey.values()) {
    for (const a of list) a.partners = list.filter((b) => b !== a);
  }

  // ----- camera -----
  const camState = { target: new THREE.Vector3(0, 0, 0), yaw: 0.0, pitch: 0.95, dist: 90 };
  const overviewState = () => {
    const span = Math.max(plan.maxX - plan.minX, plan.maxZ - plan.minZ);
    // Headquarters now sits at the plan's centre, so the overview looks straight at it.
    return { target: new THREE.Vector3((plan.minX + plan.maxX) / 2, 0, (plan.minZ + plan.maxZ) / 2 + 2), yaw: 0.0, pitch: 0.95, dist: span * 0.92 };
  };
  let anim = null;       // tween between two camera states
  let followAgent = null; // agent the camera tracks when focused
  let focusedAgent = null;
  let hoverAgent = null;

  function applyCam() {
    const { target, yaw, pitch, dist } = camState;
    camera.position.set(
      target.x + dist * Math.cos(pitch) * Math.sin(yaw),
      target.y + dist * Math.sin(pitch),
      target.z + dist * Math.cos(pitch) * Math.cos(yaw),
    );
    camera.lookAt(target);
  }

  function tweenTo(state, dur = 1.1) {
    anim = {
      t: 0, dur,
      from: { target: camState.target.clone(), yaw: camState.yaw, pitch: camState.pitch, dist: camState.dist },
      to: { target: state.target.clone(), yaw: state.yaw, pitch: state.pitch, dist: state.dist },
    };
  }

  function overview() {
    followAgent = null;
    focusedAgent = null;
    tweenTo(overviewState(), 1.2);
    panel.classList.remove("open");
    onSelect?.(null);
  }

  function focus(rec) {
    if (!rec) return;
    focusedAgent = rec;
    followAgent = rec;
    const pos = rec.root.position;
    const yaw = rec.root.rotation.y;
    // Sitters face their desks, so a straight-on camera would look through the
    // desk. Swing the camera about 50 degrees to one side and a little above.
    tweenTo({
      target: new THREE.Vector3(pos.x, 1.35, pos.z),
      yaw: yaw + 0.9,
      pitch: 0.42,
      dist: 5.2,
    }, 1.1);
    openPanel(rec);
    onSelect?.(rec.spec.name);
  }

  // ----- simulation -----
  const jobs = [];
  let jobSeq = 0;
  let reportCount = 0;
  let clock = 0;

  const hhmm = () => {
    const d = new Date();
    return d.toTimeString().slice(0, 5);
  };
  function note(rec, text) {
    rec.log.unshift({ t: hhmm(), text });
    if (rec.log.length > 30) rec.log.length = 30;
    if (focusedAgent === rec) renderLog(rec);
  }
  function feed(html) {
    const el = document.createElement("div");
    el.className = "msg";
    el.innerHTML = html;
    feedEl.prepend(el);
    while (feedEl.children.length > 5) feedEl.lastChild.remove();
    feedItems.push({ el, until: clock + 9 }); // expires on simulation time, so recordings stay in step
  }
  const feedItems = [];

  function walkTo(rec, x, z, onArrive) {
    const path = findPath(rec.root.position.x, rec.root.position.z, x, z);
    if (!path) { onArrive?.(); return false; }
    rec.path = path;
    rec.onArrive = onArrive;
    rec.pose = "walk";
    return true;
  }

  // The user's assembled team. When set, only these specialists are given work,
  // mirroring how the Steward behaves when a team is active.
  let team = null; // Set<string> | null
  function startJob() {
    let zone, crew, reporter, partner;
    if (team && team.size) {
      const pool = agents.filter((a) => team.has(a.spec.name) && !a.busy && !a.isMaster);
      if (!pool.length) return;
      const shuffled = pool.slice().sort(() => rand() - 0.5);
      crew = shuffled.slice(0, Math.min(shuffled.length, 2 + Math.floor(rand() * 2)));
      reporter = crew[0];
      partner = crew[1];
      zone = reporter.zone;
    } else {
      const candidates = zones.filter((z) => z.key !== hqKey && z.seats?.some((s) => !s.rec?.busy && !s.rec?.isMaster));
      if (!candidates.length) return;
      zone = candidates[Math.floor(rand() * candidates.length)];
      const free = zone.seats.map((s) => agentByName.get(s.spec.name)).filter((r) => r && !r.busy);
      if (free.length < 2) return;
      reporter = free[Math.floor(rand() * free.length)];
      partner = reporter.partners.find((p) => !p.busy) ?? free.find((r) => r !== reporter);
      const others = free.filter((r) => r !== reporter && r !== partner).sort(() => rand() - 0.5).slice(0, rand() < 0.5 ? 1 : 2);
      crew = [reporter, partner, ...others].filter(Boolean);
    }
    const topic = `${zone.label} · ${pick(TOPICS, hashStr(zone.key) + jobSeq)}`;
    const job = {
      id: ++jobSeq, zone, topic, crew, reporter, partner,
      phase: "work", t: 0, workDur: 5 + rand() * 3, talkTimer: 0, speaker: 0,
    };
    crew.forEach((r) => { r.busy = true; r.job = job; });
    jobs.push(job);
    feed(`<b>${master.persona}</b> assigned <b>${topic}</b> to ${crew.map((r) => r.spec.persona).join(", ")}`);
    crew.forEach((r) => note(r, `Assigned: ${topic}`));
  }

  function finishJob(job) {
    job.crew.forEach((r) => { r.busy = false; r.job = null; r.speech = ""; r.pose = "idle"; });
    jobs.splice(jobs.indexOf(job), 1);
    reportCount++;
    feed(`<b>${job.reporter.spec.persona}</b> reported to ${master.persona}: ${job.topic} done`);
    job.crew.forEach((r) => note(r, "Job complete"));
  }

  function updateJob(job, dt) {
    job.t += dt;
    const rep = job.reporter;
    if (job.phase === "work") {
      // partners talk across the desks
      job.talkTimer += dt;
      if (job.partner && job.talkTimer > 2.6) {
        job.talkTimer = 0;
        job.speaker = 1 - job.speaker;
        const speaker = job.speaker ? job.partner : job.reporter;
        const other = job.speaker ? job.reporter : job.partner;
        const lines = ["Can you check the spec?", "Looks good, one more pass.", "Sending the draft now.", "Agreed, I'll update it.", "Found a gap in the brief.", "Nice, that reads clearly."];
        speaker.speech = lines[Math.floor(rand() * lines.length)];
        speaker.speechUntil = clock + 2.4;
        note(speaker, `Talking with ${other.spec.persona}`);
      }
      if (job.t > job.workDur) {
        job.phase = "toHQ";
        rep.speech = `Report ready`;
        rep.speechUntil = clock + 3;
        note(rep, `Walking to ${master.persona} to report`);
        const ok = walkTo(rep, reportSpot.x, reportSpot.z, () => {
          job.phase = "report";
          job.t = 0;
          rep.pose = "report";
          rep.speech = `${job.topic}: done`;
          rep.speechUntil = clock + 2.8;
          faceToward(rep.root, masterSeat.x, masterSeat.z);
        });
        if (!ok) { job.phase = "report"; job.t = 0; }
      }
    } else if (job.phase === "report") {
      if (job.t > 2.8) {
        job.phase = "back";
        walkTo(rep, rep.seat.x, rep.seat.z, () => { rep.pose = "type"; rep.root.rotation.y = rep.seat.yaw; finishJob(job); });
      }
    }
  }

  function updateAgent(a, dt, t) {
    const root = a.root;
    if (a.path.length) {
      const next = a.path[0];
      const dx = next.x - root.position.x, dz = next.z - root.position.z;
      const d = Math.hypot(dx, dz);
      const step = WALK_SPEED * dt;
      a.walkDist = (a.walkDist ?? 0) + Math.min(d, step); // drives the leg cycle, so feet never skate
      if (d <= step) {
        root.position.x = next.x; root.position.z = next.z;
        a.path.shift();
        if (!a.path.length) {
          const cb = a.onArrive; a.onArrive = null;
          cb?.();
        }
      } else {
        root.position.x += (dx / d) * step;
        root.position.z += (dz / d) * step;
        const targetYaw = Math.atan2(dx, dz);
        let diff = targetYaw - root.rotation.y;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        root.rotation.y += diff * Math.min(1, dt * 12);
      }
      a.pose = "walk";
      animateCharacter(root, "walk", (a.walkDist * (Math.PI * 2)) / STRIDE / 9, dt);
      return;
    }

    // seated behaviour
    let pose = a.pose;
    if (a.busy) {
      if (a.job && a.job.phase === "work") {
        const inTalk = a.job.partner && (a === a.job.reporter || a === a.job.partner) && a.job.crew.length >= 2 && a.job.partner !== a;
        pose = inTalk && a.speechUntil > clock ? "talk" : "type";
        if (a.job.partner && a === a.job.partner && !(a.speechUntil > clock)) pose = "type";
      } else if (a.job && a.job.phase === "report" && a === a.job.reporter) {
        pose = "report";
      }
      if (a.job && a.job.phase === "back" && a === a.job.reporter) pose = "walk";
    } else if (a.isMaster && jobs.length) {
      pose = "type"; // Quorum keeps an eye on the board while jobs run
    } else {
      pose = "idle";
      if (clock > a.nextThink) {
        a.nextThink = clock + 8 + rand() * 14;
        if (rand() < 0.35) { a.thinkUntil = clock + 3.5; }
      }
      if (a.thinkUntil > clock) pose = "think";
    }
    a.pose = pose;
    // sitting agents turn to their seat yaw
    if (!a.isMaster && pose !== "report") {
      const desired = a.seat.yaw;
      let diff = desired - root.rotation.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      if (a.job?.phase !== "work" || a.job.partner !== a) root.rotation.y += diff * Math.min(1, dt * 5);
    }
    const speakingPartner = pose === "talk" && a.job?.partner ? a.job.partner : null;
    const lookYaw = speakingPartner ? Math.atan2(speakingPartner.root.position.x - root.position.x, speakingPartner.root.position.z - root.position.z) - root.rotation.y : undefined;
    animateCharacter(root, pose === "talk" ? "talk" : pose, t + a.phase, dt, { lookYaw: lookYaw && Math.abs(lookYaw) < 2 ? lookYaw : undefined });
    if (a.isMaster) {
      // Quorum sits at the executive desk; reporters approach from the south side
      if (pose !== "report") root.rotation.y += (0 - root.rotation.y) * Math.min(1, dt * 4);
    }
  }

  // ----- labels / team list -----
  const labelPool = new Map();
  function getLabel(rec) {
    let el = labelPool.get(rec.spec.name);
    if (!el) {
      el = document.createElement("div");
      el.className = "label";
      el.style.setProperty("--c", "#" + rec.accent.toString(16).padStart(6, "0"));
      labelsEl.appendChild(el);
      labelPool.set(rec.spec.name, el);
    }
    return el;
  }

  // Zone names: HTML overlays pinned to the top edge of each zone.
  const zoneLabels = zones.map((z) => {
    const el = document.createElement("div");
    el.className = "zone-label";
    el.style.setProperty("--c", "#" + z.accent.toString(16).padStart(6, "0"));
    el.textContent = z.label;
    labelsEl.appendChild(el);
    return { z, el };
  });

  function updateLabels() {
    const w = container.clientWidth, h = container.clientHeight;
    const v = new THREE.Vector3();
    const showing = new Set();

    for (const { z, el } of zoneLabels) {
      v.set(z.x0 + z.w / 2, 0.2, z.z0 - 0.5).project(camera);
      const sx = (v.x * 0.5 + 0.5) * w, sy = (-v.y * 0.5 + 0.5) * h;
      const hidden = v.z > 1 || sx < -120 || sx > w + 120 || sy < -30 || sy > h + 30 || camState.dist < 18;
      el.style.display = hidden ? "none" : "";
      if (!hidden) { el.style.left = sx + "px"; el.style.top = sy + "px"; }
    }

    // Agent labels: most important first; a label that would overlap one already
    // placed is skipped, so clusters of busy agents stay legible.
    const rank = (a) => (a === focusedAgent ? 0 : a === hoverAgent ? 1 : a.isMaster ? 2 : a.job?.reporter === a ? 3 : a.pose === "talk" ? 4 : 5);
    const candidates = agents.filter((a) => a.busy || a.isMaster || a === focusedAgent || a === hoverAgent).sort((a, b) => rank(a) - rank(b));
    const placed = [];
    for (const a of candidates) {
      v.set(a.root.position.x, a.root.position.y + 2.15, a.root.position.z).project(camera);
      if (v.z > 1 || v.z < -1) continue;
      const sx = (v.x * 0.5 + 0.5) * w, sy = (-v.y * 0.5 + 0.5) * h;
      if (sx < -80 || sx > w + 80 || sy < -40 || sy > h + 40) continue;
      const st = STATUS[a.pose] ?? STATUS.idle;
      const speaking = a.speechUntil > clock && a.speech;
      const boxW = (a.spec.persona.length + st.label.length) * 8.2 + 34, boxH = speaking ? 52 : 28;
      const rect = { x0: sx - boxW / 2 - 4, x1: sx + boxW / 2 + 4, y0: sy - boxH - 4, y1: sy + 4 };
      if (rank(a) > 1 && placed.some((p) => rect.x0 < p.x1 && rect.x1 > p.x0 && rect.y0 < p.y1 && rect.y1 > p.y0)) continue;
      placed.push(rect);
      const el = getLabel(a);
      const speech = speaking ? `<div class="say">${escapeHtml(a.speech)}</div>` : "";
      const html = `${escapeHtml(a.spec.persona)} <small>${st.label}</small>${speech}`;
      if (el.dataset.html !== html) { el.innerHTML = html; el.dataset.html = html; }
      el.style.left = sx + "px";
      el.style.top = sy + "px";
      el.style.display = "";
      showing.add(a.spec.name);
    }
    for (const [name, el] of labelPool) if (!showing.has(name)) el.style.display = "none";
  }

  let teamTick = 0;
  let teamSig = "";
  function renderTeam() {
    const list = [...agents].sort((a, b) => (b.busy - a.busy) || a.spec.persona.localeCompare(b.spec.persona));
    // only rebuild the DOM when a row actually changes (keeps clicks stable)
    const sig = list.map((a) => a.spec.name + (STATUS[a.pose] ?? STATUS.idle).label + (a === focusedAgent ? "*" : "")).join("|");
    if (sig === teamSig) return;
    teamSig = sig;
    const html = list.map((a) => {
      const st = STATUS[a.pose] ?? STATUS.idle;
      const sel = a === focusedAgent ? " sel" : "";
      return `<button class="team-row${sel}" data-name="${escapeAttr(a.spec.name)}">
        <img src="${a.spec.avatar}" alt="" loading="lazy" />
        <span class="n">${escapeHtml(a.spec.persona)}<small>${escapeHtml(a.spec.name)}</small></span>
        <span class="pill ${st.cls}">${st.label}</span></button>`;
    }).join("");
    onTeam?.(html);
  }

  function renderLog(rec) {
    panel.querySelector("#p-log").innerHTML = rec.log.slice(0, 12).map((l) =>
      `<li><time>${l.t}</time><span>${escapeHtml(l.text)}</span></li>`).join("") || `<li><span>No activity yet.</span></li>`;
  }

  function openPanel(rec) {
    const st = STATUS[rec.pose] ?? STATUS.idle;
    panel.querySelector("#p-img").src = rec.spec.avatar;
    panel.querySelector("#p-persona").textContent = rec.spec.persona;
    panel.querySelector("#p-name").textContent = rec.spec.name;
    const pill = panel.querySelector("#p-status");
    pill.textContent = st.label;
    pill.className = "pill " + st.cls;
    panel.querySelector("#p-task").textContent = rec.job ? `${rec.job.topic}` : "Idle. Waiting for the next assignment from " + master.persona + ".";
    panel.querySelector("#p-div").textContent = rec.spec.division;
    panel.querySelector("#p-dept").textContent = rec.spec.department;
    panel.querySelector("#p-model").textContent = rec.spec.model + (rec.spec.reasoning ? ` · ${rec.spec.reasoning} reasoning` : "");
    panel.querySelector("#p-runtime").textContent = rec.spec.runtime;
    panel.querySelector("#p-desc").textContent = rec.spec.description;
    panel.querySelector("#p-caps").innerHTML = (rec.spec.capabilities || []).map((c) => `<span class="tag">${escapeHtml(c)}</span>`).join("");
    renderLog(rec);
    panel.classList.add("open");
  }

  // Refresh the open panel's status text while the agent changes state.
  function refreshPanel() {
    if (!focusedAgent) return;
    const st = STATUS[focusedAgent.pose] ?? STATUS.idle;
    const pill = panel.querySelector("#p-status");
    if (pill.textContent !== st.label) { pill.textContent = st.label; pill.className = "pill " + st.cls; }
    panel.querySelector("#p-task").textContent = focusedAgent.job ? focusedAgent.job.topic : "Idle. Waiting for the next assignment from " + master.persona + ".";
  }

  // ----- input -----
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let drag = null;
  const el = renderer.domElement;

  el.addEventListener("pointerdown", (e) => {
    drag = { x: e.clientX, y: e.clientY, moved: false, lastX: e.clientX, lastY: e.clientY };
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (drag) {
      const dx = e.clientX - drag.lastX, dy = e.clientY - drag.lastY;
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 4) drag.moved = true;
      if (drag.moved) {
        camState.yaw -= dx * 0.006;
        camState.pitch = clamp(camState.pitch + dy * 0.004, 0.18, 1.45);
        anim = null;
      }
      drag.lastX = e.clientX; drag.lastY = e.clientY;
      return;
    }
    hoverAgent = pickAt(e);
    hoverPlaque = hoverAgent ? null : pickPlaque(e);
    el.style.cursor = hoverAgent || hoverPlaque ? "pointer" : "grab";
  });
  el.addEventListener("pointerup", (e) => {
    if (drag && !drag.moved) {
      const rec = pickAt(e);
      const plaque = rec ? null : pickPlaque(e);
      if (rec) focus(rec);
      else if (plaque) onProfile?.(plaque.name, plaque.label);
      else if (focusedAgent) overview();
    }
    drag = null;
  });
  el.addEventListener("wheel", (e) => {
    e.preventDefault();
    camState.dist = clamp(camState.dist * (1 + e.deltaY * 0.0012), 3.5, 200);
    anim = null;
  }, { passive: false });

  let hoverPlaque = null;
  function pickPlaque(e) {
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(plaques.map((p) => p.face), false)[0];
    return hit ? hit.object.userData.plaque : null;
  }

  function pickAt(e) {
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(agents.map((a) => a.root), true);
    if (!hits.length) return null;
    let o = hits[0].object;
    while (o && !o.userData?.spec) o = o.parent;
    return o ? agentByName.get(o.userData.spec.name) ?? null : (agents.find((a) => a.root === o) ?? null);
  }

  // ----- loop -----
  let running = false, last = 0, raf = 0, nextJobAt = 1.5, statsAt = 0, sizeKey = "";
  function resize() {
    const w = Math.max(1, container.clientWidth), h = Math.max(1, container.clientHeight);
    const key = w + "x" + h;
    if (key === sizeKey) return;
    sizeKey = key;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function frame(now) {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    advance(dt);
  }

  // One simulation + render step. The live loop calls it with real frame times;
  // the recorder calls it with a fixed dt so a GIF is identical on every run.
  function advance(dt) {
    clock += dt;
    resize();

    // scheduler
    nextJobAt -= dt;
    if (nextJobAt <= 0 && jobs.length < MAX_JOBS) {
      startJob();
      nextJobAt = 2.2 + rand() * 2.6;
    }
    for (let i = feedItems.length - 1; i >= 0; i--) if (feedItems[i].until < clock) { feedItems[i].el.remove(); feedItems.splice(i, 1); }
    for (const job of [...jobs]) updateJob(job, dt);
    for (const a of agents) {
      updateAgent(a, dt, clock);
      if (a.ring?.visible) a.ring.position.set(a.root.position.x, 0.07, a.root.position.z);
    }

    // camera tween / follow
    if (anim) {
      anim.t += dt;
      const k = easeInOut(clamp(anim.t / anim.dur, 0, 1));
      camState.target.lerpVectors(anim.from.target, anim.to.target, k);
      camState.yaw = anim.from.yaw + (anim.to.yaw - anim.from.yaw) * k;
      camState.pitch = anim.from.pitch + (anim.to.pitch - anim.from.pitch) * k;
      camState.dist = anim.from.dist + (anim.to.dist - anim.from.dist) * k;
      if (anim.t >= anim.dur) anim = null;
    } else if (followAgent) {
      const p = followAgent.root.position;
      camState.target.lerp(new THREE.Vector3(p.x, 1.35, p.z), Math.min(1, dt * 6));
    }
    applyCam();

    updateLabels();
    refreshPanel();
    teamTick += dt;
    if (teamTick > 0.35) { teamTick = 0; renderTeam(); }
    statsAt += dt;
    if (statsAt > 0.5) {
      statsAt = 0;
      const working = agents.filter((a) => a.pose !== "idle" && a.pose !== "think").length;
      onStats?.({ working, jobs: jobs.length, reports: reportCount, total: agents.length });
    }

    // sun shadow follows the plan centre
    sun.target.position.set((plan.minX + plan.maxX) / 2, 0, (plan.minZ + plan.maxZ) / 2);
    sun.position.set(sun.target.position.x + 40, 80, sun.target.position.z + 30);
    const span = Math.max(plan.maxX - plan.minX, plan.maxZ - plan.minZ) / 2;
    sun.shadow.camera.left = -span; sun.shadow.camera.right = span;
    sun.shadow.camera.top = span; sun.shadow.camera.bottom = -span;
    sun.shadow.camera.near = 1; sun.shadow.camera.far = 220;
    sun.shadow.camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }

  // Start with the overview camera.
  const ov = overviewState();
  camState.target.copy(ov.target); camState.yaw = ov.yaw; camState.pitch = ov.pitch; camState.dist = ov.dist;
  applyCam();

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  // Restrict work to an assembled team (names), or pass null / [] for everyone.
  function setTeam(names) {
    team = names && names.length ? new Set(names) : null;
    for (const a of agents) {
      a.ring ??= (() => {
        const m = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.52, 32), new THREE.MeshBasicMaterial({ color: 0xf5b93a, transparent: true, opacity: 0.9, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
        m.rotation.x = -Math.PI / 2;
        m.visible = false;
        scene.add(m);
        return m;
      })();
      a.ring.visible = !!team?.has(a.spec.name);
    }
  }
  setTeam(initialTeam); // before the priming jobs below, so even the first assignments respect the team

  // Prime the board so the office is not empty on first view.
  for (let i = 0; i < 2; i++) startJob();

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  return {
    start,
    stop,
    overview,
    zoom(factor) {
      camState.dist = clamp(camState.dist * factor, 3.5, 200);
      anim = null;
    },
    focusByName(name) {
      const rec = agentByName.get(name);
      if (rec) focus(rec);
    },
    stats: () => ({ total: agents.length, zones: zones.length, jobs: jobs.length }),
    resize,
    // Restrict work to an assembled team (names), or pass null / [] for everyone.
    setTeam,
    // Deterministic stepping for the recorder (see scripts/record-office.mjs).
    step: advance,
    handles: () => ({ agents, jobs, masterRec, zones, plan, camState, plaques, tweenTo, THREE }),
  };
}

// Tiny binary min-heap for A*.
class MinHeap {
  constructor() { this.a = []; }
  size() { return this.a.length; }
  push(f, v) {
    const a = this.a;
    a.push([f, v]);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p][0] <= a[i][0]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1, r = l + 1;
        let m = i;
        if (l < a.length && a[l][0] < a[m][0]) m = l;
        if (r < a.length && a[r][0] < a[m][0]) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top[1];
  }
}
