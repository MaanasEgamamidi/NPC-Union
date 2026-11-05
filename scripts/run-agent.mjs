#!/usr/bin/env node
// Runs one NPC Union agent on its declared runtime. Node only, no dependencies.
// Usage: node scripts/run-agent.mjs <agent-name|plugin-id> "<task>" [--dry-run] [--runtime claude|codex] [--which]
//   codex runtime + codex on PATH: codex --search exec -m <model> -c model_reasoning_effort="<r>" -s workspace-write --skip-git-repo-check -o <file> <prompt>
//   codex runtime, codex missing:   falls back to `claude -p` with a notice on stderr
//   claude runtime:                 claude -p --model <model> --append-system-prompt <body> <task>
// Commands are always spawned with an argument array, never a shell string.
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_CODEX_MODEL = "gpt-6.1-terra";

function parseFrontmatter(text) {
  const m = text.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[") && v.endsWith("]")) v = v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    else v = v.replace(/^["']|["']$/g, "");
    fields[kv[1]] = v;
  }
  return { fields, body: m[2] };
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (e.endsWith(".md")) out.push(full);
  }
  return out;
}

export function findAgent(ref, root = ROOT) {
  const name = ref.split(":").pop();
  for (const path of walk(join(root, "agents"))) {
    if (!path.endsWith(`${name}.md`)) continue;
    const parsed = parseFrontmatter(readFileSync(path, "utf8"));
    if (parsed && parsed.fields.name === name) return { path, ...parsed };
  }
  return null;
}

export function onPath(cmd, env = process.env) {
  const exts = process.platform === "win32" ? (env.PATHEXT || ".EXE;.CMD;.BAT").split(";") : [""];
  for (const dir of (env.PATH || "").split(delimiter)) {
    for (const ext of exts) {
      const full = join(dir, cmd + ext.toLowerCase());
      const fullUpper = join(dir, cmd + ext);
      if (dir && existsSync(full)) return full;
      if (dir && existsSync(fullUpper)) return fullUpper;
    }
  }
  return null;
}

export function buildPlan(agent, task, opts = {}, env = process.env) {
  const f = agent.fields;
  const body = agent.body.replaceAll("${CLAUDE_PLUGIN_ROOT}", opts.root || ROOT).trim();
  const runtime = opts.runtime || f.runtime || "claude";
  const codexModel = env.NPC_UNION_CODEX_MODEL || DEFAULT_CODEX_MODEL;
  if (!/^[\w.:-]+$/.test(codexModel)) throw new Error(`NPC_UNION_CODEX_MODEL has unexpected characters: ${codexModel}`);
  const reasoning = ["low", "medium", "high"].includes(f.reasoning) ? f.reasoning : "medium";
  const notices = [];
  if (runtime === "codex") {
    const codex = onPath("codex", env);
    if (codex) {
      const outFile = join(opts.outDir || mkdtempSync(join(tmpdir(), "npc-union-")), "answer.md");
      const prompt = `${body}\n\n# Task\n\n${task}\n`;
      const args = ["--search", "exec", "-m", codexModel, "-c", `model_reasoning_effort="${reasoning}"`, "-s", "workspace-write", "--skip-git-repo-check", "-o", outFile, prompt];
      return { runtime: "codex", command: codex, args, outFile, notices };
    }
    notices.push(`npc-union: Codex CLI not found on PATH, so ${f.name} runs on Claude instead. Live web search and image generation may be limited; the agent will mark what it could not check as UNVERIFIED.`);
  }
  const claude = onPath("claude", env) || "claude";
  const tools = Array.isArray(f.tools) ? f.tools : String(f.tools || "").split(",").map((s) => s.trim()).filter(Boolean);
  const args = ["-p", "--model", f.model && f.model !== "inherit" ? f.model : "sonnet", "--append-system-prompt", body];
  if (tools.length) args.push("--allowedTools", tools.join(","));
  args.push(task);
  return { runtime: "claude", command: claude, args, notices };
}

function main(argv) {
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  const rtIdx = argv.indexOf("--runtime");
  const runtime = rtIdx !== -1 ? argv[rtIdx + 1] : undefined;
  const positional = argv.filter((a, i) => !a.startsWith("--") && !(rtIdx !== -1 && i === rtIdx + 1));
  const [ref, ...taskParts] = positional;
  const task = taskParts.join(" ");
  if (!ref || (!task && !flags.has("--which"))) {
    console.error('Usage: node scripts/run-agent.mjs <agent> "<task>" [--dry-run] [--which] [--runtime claude|codex]');
    return 2;
  }
  const agent = findAgent(ref);
  if (!agent) { console.error(`npc-union: no agent named ${ref} under agents/`); return 2; }
  const plan = buildPlan(agent, task || "(none)", { runtime });
  if (flags.has("--which")) { console.log(plan.runtime); return 0; }
  for (const n of plan.notices) console.error(n);
  if (flags.has("--dry-run")) {
    const shown = plan.args.map((a) => (a.length > 120 ? `<${a.length} chars>` : a));
    console.log(JSON.stringify({ agent: agent.fields.name, runtime: plan.runtime, command: plan.command, args: shown, outFile: plan.outFile }, null, 2));
    return 0;
  }
  const res = spawnSync(plan.command, plan.args, { stdio: plan.runtime === "codex" ? ["ignore", "inherit", "inherit"] : "inherit", maxBuffer: 64 * 1024 * 1024 });
  if (res.error) { console.error(`npc-union: failed to start ${plan.command}: ${res.error.message}`); return 1; }
  if (plan.runtime === "codex") {
    if (!existsSync(plan.outFile)) { console.error("npc-union: Codex finished without writing an answer file"); return res.status || 1; }
    process.stdout.write(readFileSync(plan.outFile, "utf8"));
  }
  return res.status ?? 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv.slice(2)));
