#!/usr/bin/env node
// Builds knowledge/index.json from knowledge/**/*.md. Usage: node scripts/build-index.mjs [--check]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildChunks } from "./lib/kb.mjs";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(ROOT, "knowledge/index.json");
const content = JSON.stringify({ _generated: "by scripts/build-index.mjs; do not edit", chunks: buildChunks(ROOT) }) + "\n";
if (process.argv.includes("--check")) {
  if (!existsSync(out) || readFileSync(out, "utf8") !== content) { console.log("knowledge/index.json is stale. Run node scripts/build-index.mjs"); process.exit(1); }
  console.log("Index is fresh"); process.exit(0);
}
mkdirSync(dirname(out), { recursive: true }); writeFileSync(out, content);
console.log(`Wrote knowledge/index.json (${JSON.parse(content).chunks.length} chunks)`);
