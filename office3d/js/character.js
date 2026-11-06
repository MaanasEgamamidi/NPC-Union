// Builds one articulated 3D figure per specialist. Colours are sampled from the
// specialist's own portrait so each figure matches its avatar as closely as a
// low-poly body allows. Also exposes a small pose system used by the office.
import * as THREE from "three";

export const STAND_Y = 0.98; // hip height of a standing figure (feet on the floor)
export const SEAT_Y = STAND_Y - 0.42; // hip height while seated on a chair

const paletteCache = new Map();
const textureCache = new Map();
const loader = new THREE.TextureLoader();

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rgb(r, g, b) {
  return new THREE.Color(r / 255, g / 255, b / 255);
}

// Reads the portrait into a small canvas and derives shirt / hair / skin colours.
export function getPalette(name, url) {
  if (paletteCache.has(name)) return paletteCache.get(name);
  const p = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const S = 40;
        const c = document.createElement("canvas");
        c.width = c.height = S;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, S, S);
        const d = ctx.getImageData(0, 0, S, S).data;
        const acc = { shirt: [0, 0, 0, 0], hair: [0, 0, 0, 0], skin: [0, 0, 0, 0] };
        const hairPix = [];
        for (let y = 0; y < S; y++) {
          for (let x = 0; x < S; x++) {
            const i = (y * S + x) * 4;
            const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
            if (a < 128) continue;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const sat = max === 0 ? 0 : (max - min) / max;
            if (y >= 28) { // lower third: clothing
              const w = 0.3 + sat;
              acc.shirt[0] += r * w; acc.shirt[1] += g * w; acc.shirt[2] += b * w; acc.shirt[3] += w;
            }
            if (y < 13) hairPix.push([r + g + b, r, g, b]);
            if (y >= 14 && y <= 24 && x >= 12 && x <= 28 && sat < 0.55) {
              acc.skin[0] += r; acc.skin[1] += g; acc.skin[2] += b; acc.skin[3] += 1;
            }
          }
        }
        const avg = (a, fallback) => (a[3] > 0 ? rgb(a[0] / a[3], a[1] / a[3], a[2] / a[3]) : fallback);
        hairPix.sort((a, b) => a[0] - b[0]);
        const dark = hairPix.slice(0, Math.max(1, Math.floor(hairPix.length * 0.2)));
        const hr = dark.reduce((s, p) => s + p[1], 0) / dark.length;
        const hg = dark.reduce((s, p) => s + p[2], 0) / dark.length;
        const hb = dark.reduce((s, p) => s + p[3], 0) / dark.length;
        const h = hash(name);
        resolve({
          shirt: avg(acc.shirt, new THREE.Color().setHSL((h % 360) / 360, 0.55, 0.45)),
          hair: rgb(hr, hg, hb),
          skin: avg(acc.skin, new THREE.Color().setHSL(0.07, 0.45, 0.68)),
        });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
  paletteCache.set(name, p);
  return p;
}

export function getPortraitTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url);
  const t = loader.load(url);
  t.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(url, t);
  return t;
}

// Build a figure. Local +Z is the direction the figure faces.
export function buildCharacter(spec, palette) {
  const h = hash(spec.name);
  const shirt = palette?.shirt ?? new THREE.Color().setHSL((h % 360) / 360, 0.55, 0.45);
  const hair = palette?.hair ?? new THREE.Color(0x2a1d14);
  const skin = palette?.skin ?? new THREE.Color(0xe0b08c);
  const pants = new THREE.Color().setHSL(0.6, 0.12, 0.22 + ((h >> 8) % 10) / 100);
  const shoes = new THREE.Color(0x1a1d24);
  const accent = spec.isMaster ? new THREE.Color(0xf5b93a) : shirt.clone().offsetHSL(0, 0.1, -0.12);

  const mat = (c, rough = 0.7) => new THREE.MeshStandardMaterial({ color: c, roughness: rough, metalness: 0.02 });
  const matShirt = mat(shirt, 0.6);
  const matPants = mat(pants, 0.8);
  const matSkin = mat(skin, 0.55);
  const matHair = mat(hair, 0.9);
  const matShoes = mat(shoes, 0.6);
  const matAccent = mat(accent, 0.5);

  const root = new THREE.Group();
  root.name = spec.name;

  // Body group (bobs up/down with walking and typing)
  const body = new THREE.Group();
  body.position.y = STAND_Y;
  root.add(body);

  // Hips
  const hips = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.12, 4, 10), matPants);
  hips.position.y = 0;
  body.add(hips);

  // Torso (capsule, scaled to look like a chest)
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.38, 6, 12), matShirt);
  torso.scale.set(1.3, 1, 0.85);
  torso.position.y = 0.44;
  body.add(torso);

  // neck joins the torso to the head
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.24, 10), matSkin);
  neck.position.y = 0.94;
  body.add(neck);

  if (spec.isMaster || spec.division === "leadership") {
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.34, 0.03), matAccent);
    tie.position.set(0, 0.46, 0.18);
    body.add(tie);
  } else {
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 6, 14), matAccent);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.7, 0.07);
    body.add(collar);
  }

  // Arms (pivot at shoulder)
  function makeArm(side) {
    const pivot = new THREE.Group();
    pivot.position.set(0.3 * side, 0.66, 0);
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.26, 4, 8), matShirt);
    upper.position.y = -0.22;
    pivot.add(upper);
    const fore = new THREE.Group();
    fore.position.y = -0.42;
    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.22, 4, 8), matShirt);
    forearm.position.y = -0.15;
    fore.add(forearm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), matSkin);
    hand.position.y = -0.33;
    fore.add(hand);
    pivot.add(fore);
    body.add(pivot);
    return { pivot, fore };
  }
  const armL = makeArm(-1);
  const armR = makeArm(1);

  // Legs (thigh pivot at hip, shin child)
  function makeLeg(side) {
    const pivot = new THREE.Group();
    pivot.position.set(0.1 * side, -0.05, 0);
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.095, 0.26, 4, 8), matPants);
    thigh.position.y = -0.22;
    pivot.add(thigh);
    const shin = new THREE.Group();
    shin.position.y = -0.46;
    const calf = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.26, 4, 8), matPants);
    calf.position.y = -0.2;
    shin.add(calf);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.26), matShoes);
    shoe.position.set(0, -0.44, 0.05);
    shin.add(shoe);
    pivot.add(shin);
    body.add(pivot); // legs ride on the hips so they lower onto the chair when sitting
    return { pivot, shin };
  }
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  // Head group
  const head = new THREE.Group();
  head.position.y = 1.2;
  body.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 16), matSkin);
  skull.scale.set(1, 1.05, 0.96);
  head.add(skull);
  // ears
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), matSkin);
    ear.position.set(0.25 * s, 0, 0);
    head.add(ear);
  }
  // eyes + smile
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x111418, roughness: 0.3 });
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), eyeMat);
    eye.position.set(0.09 * s, 0.03, 0.22);
    head.add(eye);
  }
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 12, Math.PI), eyeMat);
  smile.rotation.z = Math.PI;
  smile.position.set(0, -0.08, 0.23);
  head.add(smile);

  // Hair styles (chosen per specialist)
  const style = h % 5;
  if (style === 0) { // short cap
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), matHair);
    cap.position.y = 0.02;
    head.add(cap);
  } else if (style === 1) { // bun
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), matHair);
    cap.position.y = 0.02;
    head.add(cap);
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 10), matHair);
    bun.position.set(0, 0.2, -0.2);
    head.add(bun);
  } else if (style === 2) { // long hair
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.6), matHair);
    cap.position.y = 0.02;
    head.add(cap);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.5, 0.14), matHair);
    back.position.set(0, -0.2, -0.16);
    head.add(back);
  } else if (style === 3) { // spiky
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 6), matHair);
      const a = -0.9 + i * 0.45;
      spike.position.set(Math.sin(a) * 0.18, 0.27, Math.cos(a) * 0.05 - 0.02);
      spike.rotation.z = -Math.sin(a) * 0.5;
      head.add(spike);
    }
  } else { // bald-ish with glasses
    const rim = new THREE.MeshStandardMaterial({ color: 0x222831, roughness: 0.3, metalness: 0.4 });
    for (const s of [-1, 1]) {
      const lens = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.012, 6, 14), rim);
      lens.position.set(0.09 * s, 0.03, 0.235);
      head.add(lens);
    }
  }

  // Portrait badge floating above the head: the specialist's own avatar.
  const badgeMat = new THREE.SpriteMaterial({ map: getPortraitTexture(spec.avatar), transparent: true, depthWrite: false });
  const badge = new THREE.Sprite(badgeMat);
  badge.scale.set(0.62, 0.62, 1);
  badge.position.y = 1.8;
  body.add(badge);

  root.userData = { spec, parts: { body, hips, torso, armL, armR, legL, legR, head }, badge };
  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return root;
}

// ---------- posing ----------
// pose: 'stand' | 'walk' | 'sit' | 'type' | 'talk' | 'think' | 'report' | 'idle'
// sitting: true lowers the hips onto a chair and bends the legs.
export function animateCharacter(root, pose, t, dt, opts = {}) {
  const { body, armL, armR, legL, legR, head } = root.userData.parts;
  const lerp = (a, b, k) => a + (b - a) * Math.min(1, k);
  const k = Math.min(1, dt * 10);

  const target = {
    bodyY: STAND_Y, legsSit: 0, armLx: 0.05, armRx: 0.05, armLz: 0, armRz: 0,
    legSwing: 0, headY: 0, headX: 0, bodyBob: 0,
  };

  if (pose === "walk") {
    const s = Math.sin(t * 9);
    target.legSwing = s * 0.7;
    target.armLx = -s * 0.65;
    target.armRx = s * 0.65;
    target.bodyBob = Math.abs(Math.cos(t * 9)) * 0.03;
  } else if (pose === "sit" || pose === "type" || pose === "talk" || pose === "think" || pose === "idle") {
    target.legsSit = 1;
    target.bodyY = STAND_Y - 0.42; // lower onto the chair (seat top is ~0.5)
    if (pose === "type") {
      target.armLx = -1.2 + Math.sin(t * 22) * 0.08;
      target.armRx = -1.2 + Math.cos(t * 19) * 0.08;
      target.armLz = 0.22;
      target.armRz = -0.22;
      target.bodyBob = Math.sin(t * 6) * 0.01;
      target.headX = 0.25;
    } else if (pose === "talk") {
      target.armLx = -0.4 + Math.sin(t * 3) * 0.1;
      target.armRx = -0.9 + Math.sin(t * 4.2) * 0.45;
      target.armRz = -0.25;
      target.headY = opts.lookYaw ?? Math.sin(t * 0.9) * 0.25;
      target.headX = -0.06 + Math.sin(t * 4.2) * 0.04;
      target.bodyBob = Math.sin(t * 4) * 0.01;
    } else if (pose === "think") {
      target.armRx = -2.1;
      target.armRz = -0.6;
      target.armLx = -0.1;
      target.headX = 0.2;
      target.headY = Math.sin(t * 0.7) * 0.15;
    } else { // idle
      target.armLx = 0.1 + Math.sin(t * 1.3) * 0.02;
      target.armRx = 0.1 + Math.cos(t * 1.1) * 0.02;
      target.headY = Math.sin(t * 0.5) * 0.2;
      target.bodyBob = Math.sin(t * 1.4) * 0.004;
    }
  } else if (pose === "report") {
    target.armRx = -2.6 + Math.sin(t * 6) * 0.3;
    target.armRz = -0.1;
    target.armLx = -0.1;
    target.headX = -0.15;
    target.bodyBob = Math.abs(Math.sin(t * 6)) * 0.03;
  } else { // stand
    target.armLx = 0.05 + Math.sin(t * 1.2) * 0.02;
    target.armRx = 0.05 - Math.sin(t * 1.2) * 0.02;
    target.bodyBob = Math.sin(t * 1.6) * 0.004;
  }

  body.position.y = lerp(body.position.y, target.bodyY + target.bodyBob, k);
  const sit = target.legsSit;
  legL.pivot.rotation.x = lerp(legL.pivot.rotation.x, sit ? -1.5 : target.legSwing, k);
  legR.pivot.rotation.x = lerp(legR.pivot.rotation.x, sit ? -1.5 : -target.legSwing, k);
  legL.shin.rotation.x = lerp(legL.shin.rotation.x, sit ? 1.45 : Math.max(0, -target.legSwing) * 1.1, k);
  legR.shin.rotation.x = lerp(legR.shin.rotation.x, sit ? 1.45 : Math.max(0, target.legSwing) * 1.1, k);

  armL.pivot.rotation.x = lerp(armL.pivot.rotation.x, target.armLx, k);
  armR.pivot.rotation.x = lerp(armR.pivot.rotation.x, target.armRx, k);
  armL.pivot.rotation.z = lerp(armL.pivot.rotation.z, -0.08 + target.armLz, k);
  armR.pivot.rotation.z = lerp(armR.pivot.rotation.z, 0.08 + target.armRz, k);
  armL.fore.rotation.x = lerp(armL.fore.rotation.x, pose === "type" ? -0.6 : pose === "walk" ? -0.3 : 0, k);
  armR.fore.rotation.x = lerp(armR.fore.rotation.x, pose === "type" ? -0.6 : pose === "walk" ? -0.3 : 0, k);

  head.rotation.y = lerp(head.rotation.y, target.headY, k);
  head.rotation.x = lerp(head.rotation.x, target.headX, k);

  if (opts.yaw !== undefined) root.rotation.y = lerp(root.rotation.y, opts.yaw, k);
}

// Face a world point (used for talking partners and the master's desk).
export function faceToward(root, x, z) {
  const dx = x - root.position.x;
  const dz = z - root.position.z;
  root.rotation.y = Math.atan2(dx, dz);
}
