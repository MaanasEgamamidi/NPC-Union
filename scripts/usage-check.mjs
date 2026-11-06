#!/usr/bin/env node
// Prints a numbers-only usage snapshot from local logs. Node only, no dependencies, no network, no model calls.
// Usage: node scripts/usage-check.mjs [--hours 5] [--json] [--watch <minutes>] [--codex-dir <dir>] [--claude-dir <dir>]
//   --watch N: print one snapshot, then a compact line every N minutes (N >= 1) with ALERT lines, until Ctrl+C.
//   Codex:  last token_count event in the newest ~/.codex/sessions/**/rollout-*.jsonl (plan windows, used_percent, resets_at).
//   Claude: sums assistant `usage` fields from ~/.claude/projects/**/*.jsonl for the last N hours, per model.
// Claude's plan-percentage bars are NOT in the transcripts. Run /usage in Claude Code for those.
// Prompt text is never printed.
import { existsSync, openSync, closeSync, readSync, readFileSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const TAIL_BYTES = 512 * 1024;

function walk(dir, test, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, test, out);
    else if (test(entry.name)) out.push(full);
  }
  return out;
}

function tail(path, bytes = TAIL_BYTES) {
  const size = statSync(path).size;
  const start = Math.max(0, size - bytes);
  const fd = openSync(path, "r");
  try {
    const buf = Buffer.alloc(size - start);
    readSync(fd, buf, 0, buf.length, start);
    return buf.toString("utf8");
  } finally { closeSync(fd); }
}

export function codexSnapshot(codexDir, now = Date.now()) {
  const files = walk(join(codexDir, "sessions"), (n) => n.startsWith("rollout-") && n.endsWith(".jsonl"))
    .map((p) => ({ p, m: statSync(p).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  for (const { p } of files.slice(0, 15)) {
    const lines = tail(p).split("\n");
    for (let i = lines.length - 1; i >= 0; i--) {
      if (!lines[i].includes('"rate_limits"')) continue;
      let ev;
      try { ev = JSON.parse(lines[i]); } catch { continue; }
      const rl = ev?.payload?.rate_limits;
      if (!rl || (!rl.primary && !rl.secondary)) continue;
      const win = (w) => w ? {
        used_percent: w.used_percent,
        window_minutes: w.window_minutes,
        resets_at: w.resets_at ? new Date(w.resets_at * 1000).toISOString() : null,
        already_reset: w.resets_at ? w.resets_at * 1000 <= now : null,
      } : null;
      return {
        found: true,
        recorded_at: ev.timestamp ?? null,
        age_minutes: ev.timestamp ? Math.round((now - Date.parse(ev.timestamp)) / 60000) : null,
        plan_type: rl.plan_type ?? null,
        five_hour: win(rl.primary),
        weekly: win(rl.secondary),
        credits: rl.credits ? { has_credits: rl.credits.has_credits, unlimited: rl.credits.unlimited, balance: rl.credits.balance } : null,
        limit_reached: rl.rate_limit_reached_type ?? null,
        context_window: ev.payload.info?.model_context_window ?? null,
      };
    }
  }
  return { found: false };
}

export function claudeSnapshot(claudeDir, hours = 5, now = Date.now()) {
  const since = now - hours * 3600 * 1000;
  const files = walk(join(claudeDir, "projects"), (n) => n.endsWith(".jsonl")).filter((p) => statSync(p).mtimeMs >= since);
  const seen = new Set();
  const models = {};
  let messages = 0, sidechain = 0;
  for (const p of files) {
    for (const line of readFileSync(p, "utf8").split("\n")) {
      if (!line.includes('"usage"')) continue;
      let ev;
      try { ev = JSON.parse(line); } catch { continue; }
      const u = ev?.message?.usage;
      if (!u || ev.type !== "assistant") continue;
      const ts = Date.parse(ev.timestamp);
      if (!(ts >= since)) continue;
      const key = ev.message.id ? `${ev.message.id}:${ev.requestId ?? ""}` : null;
      if (key) { if (seen.has(key)) continue; seen.add(key); }
      const model = ev.message.model ?? "unknown";
      const m = (models[model] ||= { requests: 0, input: 0, cache_read: 0, cache_write: 0, output: 0 });
      m.requests++; messages++;
      if (ev.isSidechain) sidechain++;
      m.input += u.input_tokens || 0;
      m.cache_read += u.cache_read_input_tokens || 0;
      m.cache_write += u.cache_creation_input_tokens || 0;
      m.output += u.output_tokens || 0;
    }
  }
  const total = { requests: messages, input: 0, cache_read: 0, cache_write: 0, output: 0 };
  for (const m of Object.values(models)) for (const k of ["input", "cache_read", "cache_write", "output"]) total[k] += m[k];
  const inputSide = total.input + total.cache_read + total.cache_write;
  return {
    hours, files_scanned: files.length, subagent_requests: sidechain, models, total,
    cache_hit_percent: inputSide ? Math.round((1000 * total.cache_read) / inputSide) / 10 : null,
  };
}

// Budget keeper policy, not vendor numbers: green under 60% used, yellow 60-84%, red 85% or more.
export function grade(percent) {
  if (typeof percent !== "number" || Number.isNaN(percent)) return "unknown";
  return percent >= 85 ? "red" : percent >= 60 ? "yellow" : "green";
}

// One compact line for --watch, plus alert text when a live Codex window is yellow or red or a limit was hit.
export function watchLine(snap) {
  const time = new Date(snap.generated).toLocaleTimeString();
  const c = snap.codex;
  const alerts = [];
  const parts = [];
  if (c.found) {
    for (const [label, w] of [["5h", c.five_hour], ["wk", c.weekly]]) {
      if (!w) continue;
      const g = w.already_reset ? "stale" : grade(w.used_percent);
      parts.push(`codex ${label} ${w.used_percent}% ${g}`);
      if (g === "yellow" || g === "red") alerts.push(`ALERT codex ${label} window is ${g} (${w.used_percent}% used, resets ${local(w.resets_at)})`);
    }
    if (c.limit_reached) alerts.push(`ALERT codex limit reached: ${c.limit_reached}`);
  } else parts.push("codex n/a");
  const k = snap.claude;
  parts.push(`claude ${k.total.requests} req, cache ${k.cache_hit_percent ?? "n/a"}%`);
  return { line: `${time}  ${parts.join("  |  ")}`, alerts };
}

const fmt = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}k` : String(n));
const local = (iso) => (iso ? new Date(iso).toLocaleString() : "unknown");

export function render(snap) {
  const out = [`NPC Union usage snapshot (${new Date(snap.generated).toLocaleString()})`, ""];
  const c = snap.codex;
  out.push("Codex (from the newest local session log)");
  if (!c.found) out.push("  No Codex rate-limit data found. Codex may not be installed, or has not run on this machine.");
  else {
    out.push(`  plan: ${c.plan_type ?? "unknown"}   recorded: ${local(c.recorded_at)} (${c.age_minutes} min ago)`);
    for (const [label, w] of [["5-hour window", c.five_hour], ["weekly window", c.weekly]]) {
      if (!w) { out.push(`  ${label}: not reported`); continue; }
      out.push(`  ${label}: ${w.used_percent}% used (${w.already_reset ? "stale" : grade(w.used_percent)}), resets ${local(w.resets_at)}${w.already_reset ? "  (already reset: figure is stale)" : ""}`);
    }
    if (c.credits) out.push(`  credits: ${c.credits.unlimited ? "unlimited" : c.credits.has_credits ? `balance ${c.credits.balance}` : "none"}`);
    if (c.limit_reached) out.push(`  LIMIT REACHED: ${c.limit_reached}`);
  }
  const k = snap.claude;
  out.push("", `Claude Code (local transcripts, last ${k.hours} h; ${k.files_scanned} files)`);
  if (!k.total.requests) out.push("  No Claude requests found in this window.");
  else {
    for (const [model, m] of Object.entries(k.models)) out.push(`  ${model}: ${m.requests} requests, in ${fmt(m.input)}, cache read ${fmt(m.cache_read)}, cache write ${fmt(m.cache_write)}, out ${fmt(m.output)}`);
    out.push(`  total: ${k.total.requests} requests (${k.subagent_requests} from subagents), cache hit ${k.cache_hit_percent}% of input tokens`);
  }
  out.push("  Plan-percentage bars are not in the logs. Run /usage in Claude Code for those.");
  return out.join("\n");
}

function main(argv) {
  const opt = (name, fallback) => { const i = argv.indexOf(name); return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback; };
  const hours = Number(opt("--hours", 5));
  if (!(hours > 0)) { console.error("usage-check: --hours must be a positive number"); return 2; }
  const codexDir = opt("--codex-dir", process.env.CODEX_HOME || join(homedir(), ".codex"));
  const claudeDir = opt("--claude-dir", process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude"));
  const take = () => ({ generated: new Date().toISOString(), codex: codexSnapshot(codexDir), claude: claudeSnapshot(claudeDir, hours) });
  if (argv.includes("--watch")) {
    const minutes = Number(opt("--watch", NaN));
    if (!(minutes >= 1)) { console.error("usage-check: --watch needs a number of minutes, 1 or more"); return 2; }
    console.log(render(take()));
    console.log(`\nWatching every ${minutes} min. Press Ctrl+C to stop. Costs no model tokens.`);
    console.log("Only Codex windows and Claude token burn can raise an alert. The Claude plan percentage still needs /usage.\n");
    setInterval(() => { const { line, alerts } = watchLine(take()); console.log(line); for (const a of alerts) console.log(a); }, minutes * 60000);
    return null; // keep the process alive
  }
  const snap = take();
  console.log(argv.includes("--json") ? JSON.stringify(snap, null, 2) : render(snap));
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const code = main(process.argv.slice(2));
  if (code !== null) process.exit(code);
}
