// Shared knowledge-base helpers: frontmatter parsing, chunking, tokenising, BM25. No dependencies.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export function parseKnowledge(text) {
  const m = text.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {}; let body = text;
  if (m) {
    body = m[2]; let key = null;
    for (const line of m[1].split("\n")) {
      const item = line.match(/^\s+-\s+(.*)$/);
      if (item && key) { (meta[key] = Array.isArray(meta[key]) ? meta[key] : []).push(item[1].trim()); continue; }
      const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/); if (!kv) continue;
      key = kv[1]; let v = kv[2].trim();
      meta[key] = v.startsWith("[") && v.endsWith("]") ? v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean) : v === "" ? [] : v.replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body };
}

export const tokenize = (s) => (s.toLowerCase().match(/[a-z0-9][a-z0-9.+#-]*/g) || []).map((t) => t.replace(/[.-]+$/, "")).filter((t) => t.length > 1 && !STOP.has(t));
const STOP = new Set("the and for with that this from are was were you your our not but can will its into has have had any all one two use used using via per than then them they what when where which who how also out more most only such some each other".split(" "));

export function walkMd(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir).sort()) { const p = join(dir, e); if (statSync(p).isDirectory()) walkMd(p, out); else if (e.endsWith(".md") && e !== "README.md") out.push(p); }
  return out;
}

export function buildChunks(root) {
  const chunks = [];
  for (const path of walkMd(join(root, "knowledge"))) {
    const { meta, body } = parseKnowledge(readFileSync(path, "utf8"));
    const rel = relative(root, path).replace(/\\/g, "/");
    const parts = body.split(/^(?=## )/m);
    for (const part of parts) {
      const heading = (part.match(/^## (.+)$/m) || [])[1] || meta.title || rel;
      const text = part.trim(); if (!text) continue;
      const tf = {}; const toks = tokenize(`${meta.title || ""} ${heading} ${heading} ${(meta.tags || []).join(" ")} ${text}`);
      for (const t of toks) tf[t] = (tf[t] || 0) + 1;
      chunks.push({ path: rel, title: meta.title || rel, heading, tags: meta.tags || [], last_verified: meta.last_verified || "", sources: meta.sources || [], len: toks.length, tf, snippet: text.replace(/\s+/g, " ").slice(0, 240) });
    }
  }
  return chunks;
}

export function search(chunks, query, k = 5, k1 = 1.2, b = 0.75) {
  const q = [...new Set(tokenize(query))]; const N = chunks.length || 1;
  const avg = chunks.reduce((s, c) => s + c.len, 0) / N || 1;
  const df = Object.fromEntries(q.map((t) => [t, chunks.filter((c) => c.tf[t]).length]));
  return chunks.map((c) => {
    let score = 0;
    for (const t of q) { const f = c.tf[t] || 0; if (!f) continue; const idf = Math.log(1 + (N - df[t] + 0.5) / (df[t] + 0.5)); score += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * c.len / avg)); }
    return { ...c, score };
  }).filter((c) => c.score > 0).sort((a, b) => b.score - a.score).slice(0, k);
}
