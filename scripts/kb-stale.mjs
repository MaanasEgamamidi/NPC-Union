#!/usr/bin/env node
// Knowledge-base freshness check. Node only, no dependencies.
// Usage: node scripts/kb-stale.mjs [--max-age 180] [--today YYYY-MM-DD] [--check-links] [--json] [--strict] [--root <dir>]
//   Lists knowledge files whose last_verified is older than --max-age days (oldest first) and files with a
//   missing or malformed date. Counts UNVERIFIED markers per file.
//   --check-links also fetches every distinct source URL (HEAD, then GET if HEAD is refused).
//     2xx/3xx = alive. 401/403/429 = "blocked, check by hand". Anything else = dead.
//   --strict exits 1 when anything is stale, missing a date, or (with --check-links) dead. Blocked links do not fail it.
import { readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseKnowledge, walkMd } from "./lib/kb.mjs";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const DAY = 86400000;
const USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const BLOCKED = new Set([401, 403, 429]);
const HEAD_REFUSED = new Set([403, 405, 501]);

// Parses a strict YYYY-MM-DD calendar date to a UTC midnight timestamp, or null.
export function parseDate(s) {
  const m = typeof s === "string" && s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
  const d = new Date(t);
  return d.getUTCFullYear() === +m[1] && d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3] ? t : null;
}

export const isoDate = (t) => new Date(t).toISOString().slice(0, 10);

// Reads every knowledge file and classifies its last_verified date.
export function analyzeFiles(root, today, maxAge = 180) {
  const todayMs = parseDate(today);
  if (todayMs === null) throw new Error(`bad --today value: ${today}`);
  return walkMd(join(root, "knowledge")).map((path) => {
    const { meta, body } = parseKnowledge(readFileSync(path, "utf8"));
    const raw = typeof meta.last_verified === "string" ? meta.last_verified : "";
    const t = parseDate(raw);
    const age = t === null ? null : Math.floor((todayMs - t) / DAY);
    const status = t === null ? "missing" : age > maxAge ? "stale" : "fresh";
    const sources = (Array.isArray(meta.sources) ? meta.sources : []).filter((u) => /^https?:\/\//i.test(u));
    return {
      path: relative(root, path).replace(/\\/g, "/"), last_verified: raw, age, status, sources,
      unverified: (body.match(/\bUNVERIFIED\b/g) || []).length,
    };
  });
}

// Checks one URL. fetchFn has the same shape as global fetch.
export async function checkUrl(url, fetchFn = fetch, { timeoutMs = 15000 } = {}) {
  const attempt = async (method) => {
    const res = await fetchFn(url, { method, redirect: "follow", headers: { "User-Agent": USER_AGENT, Accept: "*/*" }, signal: AbortSignal.timeout(timeoutMs) });
    try { await res.body?.cancel(); } catch { /* body already closed */ }
    return res.status;
  };
  let code, error = "";
  try {
    code = await attempt("HEAD");
    if (HEAD_REFUSED.has(code)) code = await attempt("GET");
  } catch (e) {
    // Some servers drop HEAD requests; try GET once before calling it dead.
    try { code = await attempt("GET"); } catch (e2) { code = null; error = String(e2?.cause?.code || e2?.name === "TimeoutError" && "timeout" || e2?.message || e2); }
  }
  if (code !== null && code >= 200 && code < 400) return { url, state: "ok", code };
  if (code !== null && BLOCKED.has(code)) return { url, state: "blocked", code };
  return { url, state: "dead", code, error };
}

// Checks all URLs with limited concurrency. Returns results in input order.
export async function checkLinks(urls, fetchFn = fetch, { concurrency = 8, timeoutMs = 15000 } = {}) {
  const results = new Array(urls.length); let next = 0;
  const worker = async () => { while (next < urls.length) { const i = next++; results[i] = await checkUrl(urls[i], fetchFn, { timeoutMs }); } };
  await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker));
  return results;
}

export async function buildReport({ root = ROOT, today, maxAge = 180, links = false, fetchFn = fetch, concurrency = 8, timeoutMs = 15000 } = {}) {
  const files = analyzeFiles(root, today, maxAge);
  const stale = files.filter((f) => f.status === "stale").sort((a, b) => b.age - a.age || a.path.localeCompare(b.path));
  const missing = files.filter((f) => f.status === "missing");
  const dated = files.filter((f) => f.status !== "missing").map((f) => f.last_verified).sort();
  const withUnverified = files.filter((f) => f.unverified > 0).sort((a, b) => b.unverified - a.unverified || a.path.localeCompare(b.path));
  const report = {
    today, maxAge,
    summary: {
      total: files.length, stale: stale.length, missing: missing.length, oldest: dated[0] || null,
      unverified: withUnverified.reduce((n, f) => n + f.unverified, 0), unverifiedFiles: withUnverified.length,
    },
    stale: stale.map(({ path, last_verified, age }) => ({ path, last_verified, age })),
    missing: missing.map(({ path, last_verified }) => ({ path, last_verified })),
    unverified: withUnverified.map(({ path, unverified }) => ({ path, count: unverified })),
  };
  if (links) {
    const citedBy = new Map();
    for (const f of files) for (const u of new Set(f.sources)) { if (!citedBy.has(u)) citedBy.set(u, []); citedBy.get(u).push(f.path); }
    const results = await checkLinks([...citedBy.keys()], fetchFn, { concurrency, timeoutMs });
    const pick = (state) => results.filter((r) => r.state === state).map((r) => ({ url: r.url, code: r.code, ...(r.error ? { error: r.error } : {}), files: citedBy.get(r.url) }));
    report.links = { checked: results.length, ok: results.filter((r) => r.state === "ok").length, dead: pick("dead"), blocked: pick("blocked") };
  }
  return report;
}

export function formatText(r) {
  const s = r.summary; const out = [];
  out.push(`Knowledge base freshness (today ${r.today}, max age ${r.maxAge} days)`);
  out.push(`Files: ${s.total}, stale: ${s.stale}, missing or bad date: ${s.missing}, oldest last_verified: ${s.oldest || "none"}, UNVERIFIED markers: ${s.unverified} in ${s.unverifiedFiles} files`);
  if (r.stale.length) { out.push("", "Stale, oldest first:"); for (const f of r.stale) out.push(`- ${f.path}  ${f.last_verified}  (${f.age} days)`); }
  if (r.missing.length) { out.push("", "Missing or malformed last_verified:"); for (const f of r.missing) out.push(`- ${f.path}  (${f.last_verified ? `"${f.last_verified}"` : "no value"})`); }
  if (r.unverified.length) { out.push("", "UNVERIFIED markers per file:"); for (const f of r.unverified) out.push(`- ${f.path}  ${f.count}`); }
  if (r.links) {
    const l = r.links;
    out.push("", `Links: ${l.checked} distinct URLs checked, ${l.ok} alive, ${l.dead.length} dead, ${l.blocked.length} blocked`);
    const list = (title, items) => { if (!items.length) return; out.push("", title); for (const i of items) { out.push(`- ${i.url}  (${i.code ?? i.error ?? "no response"})`); for (const f of i.files) out.push(`  - cited by ${f}`); } };
    list("Dead links:", l.dead);
    list("Blocked, check by hand (401, 403 or 429, many sites refuse scripts):", l.blocked);
  }
  return out.join("\n") + "\n";
}

export function exitCodeFor(report, strict) {
  if (!strict) return 0;
  const bad = report.summary.stale + report.summary.missing + (report.links ? report.links.dead.length : 0);
  return bad > 0 ? 1 : 0;
}

export function parseArgs(argv) {
  const o = { maxAge: 180, today: null, links: false, json: false, strict: false, root: ROOT };
  const need = (i, flag) => { if (i + 1 >= argv.length) throw new Error(`${flag} needs a value`); return argv[i + 1]; };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--max-age") { o.maxAge = Number(need(i++, a)); if (!Number.isInteger(o.maxAge) || o.maxAge < 0) throw new Error("--max-age must be a whole number of days"); }
    else if (a === "--today") o.today = need(i++, a);
    else if (a === "--root") o.root = resolve(need(i++, a));
    else if (a === "--check-links") o.links = true;
    else if (a === "--json") o.json = true;
    else if (a === "--strict") o.strict = true;
    else throw new Error(`unknown argument: ${a}`);
  }
  if (o.today !== null && parseDate(o.today) === null) throw new Error("--today must be a valid YYYY-MM-DD date");
  return o;
}

// Runs the CLI. Returns the exit code; writes to io.out / io.err. fetchFn and now are injectable for tests.
export async function main(argv, { out = (s) => process.stdout.write(s), err = (s) => process.stderr.write(s), fetchFn = fetch, now = () => new Date() } = {}) {
  let o;
  try { o = parseArgs(argv); } catch (e) { err(`kb-stale: ${e.message}\n`); return 2; }
  const today = o.today || isoDate(now().getTime());
  const report = await buildReport({ root: o.root, today, maxAge: o.maxAge, links: o.links, fetchFn });
  out(o.json ? JSON.stringify(report, null, 2) + "\n" : formatText(report));
  return exitCodeFor(report, o.strict);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; });
}
