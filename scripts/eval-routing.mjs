#!/usr/bin/env node
// Scores routing against evals/routing/cases.json. Node only, no dependencies.
// Usage: node scripts/eval-routing.mjs [--router keyword|claude|codex] [--k 8] [--model <m>] [--batch 10]
//                                      [--case <id>] [--min-pass 0.8] [--json] [--out <file>]
//   keyword (default): scripts/route.mjs shortlist. Free and deterministic, so CI runs it.
//   claude | codex:    asks the model to route with the rules in skills/route/SKILL.md. Uses quota, so run it by hand.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildEntries, loadAgents, shortlist } from "./route.mjs";
import { findAgent, onPath } from "./run-agent.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LEADERSHIP = "leadership";

export function loadCases(root = ROOT) {
  return JSON.parse(readFileSync(join(root, "evals", "routing", "cases.json"), "utf8")).cases;
}

export function validateCases(cases, agents) {
  const names = new Set(agents.map((a) => a.name));
  const errors = []; const ids = new Set();
  for (const c of cases) {
    const where = `case ${c.id || "(no id)"}`;
    if (!c.id || ids.has(c.id)) errors.push(`${where}: id missing or repeated`);
    ids.add(c.id);
    if (!c.request || c.request.length < 15) errors.push(`${where}: request missing or too short`);
    if (!(c.must || []).length && !(c.any || []).length) errors.push(`${where}: needs must or any`);
    if (c.any && c.any.length < 2) errors.push(`${where}: any needs two or more agents; use must for one`);
    const seen = new Set();
    for (const field of ["must", "any", "accept", "avoid"]) for (const n of c[field] || []) {
      if (!names.has(n)) errors.push(`${where}: ${field} names unknown agent ${n}`);
      if (seen.has(n)) errors.push(`${where}: ${n} is listed twice`);
      seen.add(n);
    }
    if (c.via && c.via !== "direct" && !names.has(c.via)) errors.push(`${where}: via must be direct or an agent name`);
  }
  return errors;
}

// The hand-off the route skill's step 3 asks for, worked out from where the must agents sit.
// Returns null when the case leaves it open (an "any" pick could change the answer).
export function expectedVia(c, agents) {
  if (c.via) return c.via;
  if (!(c.must || []).length || (c.any || []).length) return null;
  const byName = new Map(agents.map((a) => [a.name, a]));
  const picked = c.must.map((n) => byName.get(n));
  const divisions = new Set(picked.map((a) => a.division));
  if (divisions.size > 1) return "shop-steward";
  const [division] = divisions;
  const departments = new Set(picked.map((a) => a.department));
  return departments.size > 1 && division !== LEADERSHIP ? `${division}-lead` : "direct";
}

export function scoreCase(c, picks, via) {
  const got = new Set(picks);
  const must = c.must || []; const any = c.any || [];
  const missing = must.filter((n) => !got.has(n));
  const anyOk = !any.length || any.some((n) => got.has(n));
  const required = must.length + (any.length ? 1 : 0);
  const recall = (must.length - missing.length + (any.length && anyOk ? 1 : 0)) / required;
  const wanted = new Set([...must, ...any, ...(c.accept || [])]);
  const extras = picks.filter((n) => !wanted.has(n));
  const avoided = (c.avoid || []).filter((n) => got.has(n));
  const precision = picks.length ? (picks.length - extras.length) / picks.length : 0;
  const out = { id: c.id, picks, missing, anyOk, extras, avoided, recall, precision, pass: recall === 1 && avoided.length === 0 };
  if (via !== undefined) { out.via = via; out.viaExpected = c.viaExpected ?? null; out.viaOk = out.viaExpected === null ? null : via === out.viaExpected; }
  return out;
}

export function summarize(results) {
  const n = results.length || 1;
  const mean = (f) => results.reduce((s, r) => s + f(r), 0) / n;
  const viaScored = results.filter((r) => r.viaOk === true || r.viaOk === false);
  return {
    cases: results.length,
    passed: results.filter((r) => r.pass).length,
    passRate: mean((r) => (r.pass ? 1 : 0)),
    meanRecall: mean((r) => r.recall),
    meanPrecision: mean((r) => r.precision),
    avoidViolations: results.reduce((s, r) => s + r.avoided.length, 0),
    viaAccuracy: viaScored.length ? viaScored.filter((r) => r.viaOk).length / viaScored.length : null,
    viaScored: viaScored.length,
  };
}

export function routeSteps(root = ROOT) {
  const skill = readFileSync(join(root, "skills", "route", "SKILL.md"), "utf8").replace(/\r\n/g, "\n");
  return (skill.match(/## Steps\n([\s\S]*?)\n## /) || [])[1]?.trim() || "";
}

export function buildPrompt(batch, agents, steps) {
  const catalog = agents.map((a) => `${a.name} | ${a.folder} | ${a.description}`).join("\n");
  const requests = batch.map((c) => `${c.id}: ${c.request}`).join("\n");
  return `You are routing requests for NPC Union, a library of game-development agents. Do not use any tools and do not read any files: everything you need is below.

# Routing rules (the Steps of skills/route/SKILL.md)

${steps}

For this run no team is active, so skip step 4. Skip step 5. The catalog in step 1 is given below as "name | division/department | description".

# Catalog

${catalog}

# Requests

${requests}

# Output

Reply with one JSON array and nothing else, one object per request, in the same order:
[{"id": "<request id>", "specialists": ["<agent name>", ...], "via": "direct" | "<division>-lead" | "shop-steward"}]

"specialists" are the agents who do the work, by name from the catalog. Pick as few as fully cover the request. Do not list a lead or shop-steward here.
"via" is who the request is handed to first under step 3: "direct" when the specialists share one department, that division's lead when they span departments in one division, "shop-steward" when they span divisions.
`;
}

export function parseReply(text) {
  const start = text.indexOf("["); const end = text.lastIndexOf("]");
  if (start === -1 || end <= start) throw new Error("no JSON array in the model's reply");
  const rows = JSON.parse(text.slice(start, end + 1));
  if (!Array.isArray(rows)) throw new Error("the model's reply is not an array");
  return rows;
}

function askModel(router, model, prompt) {
  const opts = { input: prompt, encoding: "utf8", cwd: tmpdir(), maxBuffer: 64 * 1024 * 1024, timeout: 10 * 60 * 1000 };
  if (router === "claude") {
    const res = spawnSync(onPath("claude") || "claude", ["-p", "--model", model], opts);
    if (res.error || res.status !== 0) throw new Error(`claude failed: ${res.error?.message || res.stderr || `exit ${res.status}`}`);
    return res.stdout;
  }
  const codex = onPath("codex");
  if (!codex) throw new Error("Codex CLI not found on PATH");
  const outFile = join(mkdtempSync(join(tmpdir(), "npc-union-eval-")), "answer.md");
  const res = spawnSync(codex, ["exec", "-m", model, "-s", "read-only", "--skip-git-repo-check", "-o", outFile, "-"], opts);
  if (res.error || !existsSync(outFile)) throw new Error(`codex failed: ${res.error?.message || res.stderr || "no answer file"}`);
  return readFileSync(outFile, "utf8");
}

function runModel(router, model, cases, agents, batchSize, log) {
  const names = new Set(agents.map((a) => a.name)); const steps = routeSteps(); const results = [];
  for (let i = 0; i < cases.length; i += batchSize) {
    const batch = cases.slice(i, i + batchSize);
    log(`${router} ${model}: cases ${i + 1}-${i + batch.length} of ${cases.length}`);
    const rows = new Map(parseReply(askModel(router, model, buildPrompt(batch, agents, steps))).map((r) => [r.id, r]));
    for (const c of batch) {
      const row = rows.get(c.id) || {};
      const raw = Array.isArray(row.specialists) ? row.specialists.map(String) : [];
      const r = scoreCase(c, raw.filter((n) => names.has(n)), typeof row.via === "string" ? row.via : "");
      r.unknown = raw.filter((n) => !names.has(n));
      if (!rows.has(c.id)) r.note = "the model returned no row for this case";
      results.push(r);
    }
  }
  return results;
}

function main(argv) {
  const opt = (name, fallback) => { const i = argv.indexOf(name); return i !== -1 ? argv[i + 1] : fallback; };
  const router = opt("--router", "keyword"); const k = Number(opt("--k", 8)); const batchSize = Number(opt("--batch", 10));
  const minPass = opt("--min-pass"); const only = opt("--case"); const json = argv.includes("--json");
  if (!["keyword", "claude", "codex"].includes(router) || !(k >= 1) || !(batchSize >= 1)) {
    console.error("Usage: node scripts/eval-routing.mjs [--router keyword|claude|codex] [--k 8] [--model <m>] [--batch 10] [--case <id>] [--min-pass 0.8] [--json] [--out <file>]");
    return 2;
  }
  const agents = loadAgents(); let cases = loadCases();
  const errors = validateCases(cases, agents);
  if (errors.length) { for (const e of errors) console.error(e); return 2; }
  cases = cases.map((c) => ({ ...c, viaExpected: expectedVia(c, agents) }));
  if (only) cases = cases.filter((c) => c.id === only);
  if (!cases.length) { console.error(`No case with id ${only}`); return 2; }

  let results; let label;
  if (router === "keyword") {
    const entries = buildEntries(agents); label = `keyword shortlist, top ${k}`;
    // A shortlist is not a decision, so a confusable agent appearing in it is not a failure: avoid is dropped here.
    results = cases.map((c) => scoreCase({ ...c, avoid: [] }, shortlist(c.request, k, entries).map((h) => h.name)));
  } else {
    const model = opt("--model") || (router === "claude" ? findAgent("shop-steward")?.fields.model || "opus" : process.env.NPC_UNION_CODEX_MODEL || "gpt-6.1-terra");
    label = `${router} ${model}`;
    try { results = runModel(router, model, cases, agents, batchSize, (m) => console.error(m)); }
    catch (e) { console.error(`npc-union: ${e.message}`); return 1; }
  }
  const summary = { router: label, ...summarize(results) };
  const out = opt("--out");
  if (out) writeFileSync(out, `${JSON.stringify({ summary, results }, null, 2)}\n`);
  if (json) console.log(JSON.stringify({ summary, results }, null, 2));
  else {
    const pct = (x) => `${(x * 100).toFixed(1)}%`;
    for (const r of results.filter((x) => !x.pass || x.viaOk === false)) {
      const why = [r.missing.length && `missing ${r.missing.join(", ")}`, !r.anyOk && "none of the any group", r.avoided.length && `picked avoided ${r.avoided.join(", ")}`, r.viaOk === false && `via ${r.via || "(none)"}, expected ${r.viaExpected}`, r.note].filter(Boolean).join("; ");
      console.log(`${r.pass ? "VIA " : "FAIL"} ${r.id}: ${why}${router === "keyword" ? "" : `  [picked ${r.picks.join(", ") || "nobody"}]`}`);
    }
    console.log(`\nRouter: ${label}`);
    console.log(`Passed ${summary.passed}/${summary.cases} (${pct(summary.passRate)}), mean recall ${pct(summary.meanRecall)}`);
    // A shortlist always returns k names, so precision and hand-off only mean something for a model.
    if (router !== "keyword") console.log(`Avoid violations ${summary.avoidViolations}, mean precision ${pct(summary.meanPrecision)}, hand-off (via) correct ${summary.viaAccuracy === null ? "n/a" : pct(summary.viaAccuracy)} of ${summary.viaScored}`);
  }
  if (minPass !== undefined && summary.passRate < Number(minPass)) { console.error(`Pass rate ${summary.passRate.toFixed(3)} is below --min-pass ${minPass}`); return 1; }
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv.slice(2)));
