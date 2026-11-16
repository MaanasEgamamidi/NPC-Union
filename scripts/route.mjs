#!/usr/bin/env node
// Keyword shortlist of agents for a request. BM25 over catalog/agents.json. Node only, no dependencies.
// Usage: node scripts/route.mjs "<request>" [--k 8] [--json]
// This is a shortlist for the Steward to judge, not a decision. It knows words, not meaning.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { search, tokenize } from "./lib/kb.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Light plural folding so "shaders" finds "shader". Kept here so knowledge-base search is unchanged.
const fold = (t) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);
export const routeTokens = (s) => tokenize(String(s).replace(/[-/_:]/g, " ")).map(fold);

const NAME_BOOST = 1.5;
const ROLE_WORDS = new Set("specialist expert engineer designer artist programmer lead director stylist scout architect keeper manager game".split(" "));

export function loadAgents(root = ROOT) {
  return JSON.parse(readFileSync(join(root, "catalog", "agents.json"), "utf8")).agents;
}

// One searchable entry per agent. The name counts three times and skills twice, so a request
// that says "godot" ranks godot-specialist above agents that only mention Godot in passing.
export function buildEntries(agents) {
  return agents.map((a) => {
    const text = `${`${a.name} `.repeat(3)}${(a.skills || []).join(" ")} ${(a.skills || []).join(" ")} ${a.department} ${a.description}`;
    const toks = routeTokens(text);
    const tf = {};
    for (const t of toks) tf[t] = (tf[t] || 0) + 1;
    return { name: a.name, id: a.id, folder: a.folder, runtime: a.runtime, description: a.description, len: toks.length, tf };
  });
}

export function shortlist(request, k = 8, entries = buildEntries(loadAgents())) {
  const tokens = routeTokens(request);
  const asked = new Set(tokens);
  // BM25 alone lets common words ("set up", "project") outvote the one word that names the subject,
  // so an agent whose own name carries a request word ("godot" in godot-specialist) gets a boost.
  const named = (e) => routeTokens(e.name).some((t) => !ROLE_WORDS.has(t) && asked.has(t));
  return search(entries, tokens.join(" "), entries.length)
    .map((e) => ({ ...e, score: e.score * (named(e) ? NAME_BOOST : 1) }))
    .sort((x, y) => y.score - x.score).slice(0, k).map(({ name, id, folder, runtime, description, score }) => ({ name, id, folder, runtime, description, score: Number(score.toFixed(3)) }));
}

function main(argv) {
  const kIdx = argv.indexOf("--k");
  const k = kIdx !== -1 ? Number(argv[kIdx + 1]) : 8;
  const request = argv.filter((a, i) => !a.startsWith("--") && !(kIdx !== -1 && i === kIdx + 1)).join(" ");
  if (!request || !Number.isInteger(k) || k < 1) { console.error('Usage: node scripts/route.mjs "<request>" [--k 8] [--json]'); return 2; }
  const hits = shortlist(request, k);
  if (argv.includes("--json")) { console.log(JSON.stringify(hits, null, 2)); return 0; }
  if (!hits.length) { console.log("No keyword match. Read the catalog instead."); return 0; }
  console.log("Keyword shortlist (judge it, do not trust it):");
  for (const h of hits) console.log(`${String(h.score).padStart(7)}  ${h.name.padEnd(32)} ${h.folder.padEnd(28)} ${h.runtime}`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv.slice(2)));
