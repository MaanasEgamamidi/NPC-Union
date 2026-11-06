// Employee of the Month: a deterministic rotation through the roster.
// The same month always crowns the same specialist, for every visitor, with no
// server and no storage. The step (53) is coprime with the roster size, so any
// 13 consecutive months name 13 different winners.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const STEP = 53;

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// First sentence of the description, without the "Use for..." tail.
export function citation(spec) {
  const first = (spec.description || "").split(/(?<=[.!?])\s+/)[0] || "";
  return first.replace(/\.$/, "");
}

// Winners for the current month and the twelve before it, oldest first.
export function recentWinners(specialists, now = new Date()) {
  const order = [...specialists].sort((a, b) => hash(a.name + ":eotm") - hash(b.name + ":eotm") || a.name.localeCompare(b.name));
  const n = order.length;
  const out = [];
  for (let back = 12; back >= 0; back--) {
    const d = new Date(now.getFullYear(), now.getMonth() - back, 1);
    const index = d.getFullYear() * 12 + d.getMonth();
    out.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
      spec: order[(index * STEP) % n],
      current: back === 0,
    });
  }
  return out;
}

export const currentWinner = (specialists, now = new Date()) => recentWinners(specialists, now).at(-1);
