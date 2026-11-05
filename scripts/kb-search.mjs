#!/usr/bin/env node
// BM25 keyword search over the knowledge base. Usage: node scripts/kb-search.mjs "<query>" [--k 5] [--json]
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildChunks, search } from "./lib/kb.mjs";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const kIdx = args.indexOf("--k"); const k = kIdx !== -1 ? Number(args[kIdx + 1]) : 5;
const query = args.filter((a, i) => !a.startsWith("--") && i !== kIdx + 1 || (kIdx === -1 && !a.startsWith("--"))).join(" ");
if (!query) { console.error('Usage: node scripts/kb-search.mjs "<query>" [--k 5] [--json]'); process.exit(2); }
const idx = join(ROOT, "knowledge/index.json");
const chunks = existsSync(idx) ? JSON.parse(readFileSync(idx, "utf8")).chunks : buildChunks(ROOT);
const hits = search(chunks, query, k);
if (args.includes("--json")) { console.log(JSON.stringify(hits.map(({ tf, ...h }) => h), null, 2)); process.exit(0); }
if (!hits.length) { console.log("No matches."); process.exit(0); }
const now = Date.now();
for (const h of hits) {
  const age = h.last_verified ? Math.floor((now - Date.parse(h.last_verified)) / 864e5) : null;
  const stale = age === null ? " [no last_verified]" : age > 180 ? ` [stale: ${age} days]` : "";
  console.log(`${h.score.toFixed(2)}  ${h.path} > ${h.heading}  (verified ${h.last_verified || "?"})${stale}\n      ${h.snippet}\n`);
}
