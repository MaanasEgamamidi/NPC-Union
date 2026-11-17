#!/usr/bin/env node
// Manages the user's assembled team: which NPC Union specialists the Shop Steward may use.
// Node only, no dependencies, no network, no model calls.
//
// Usage: node scripts/team.mjs <command> [args] [--file <path>]
//   show                       print the active team (default)
//   set <a,b,c | a b c>        replace the team
//   add <names...>             add members
//   remove <names...>          remove members
//   preset <id>                load a starter team from catalog/teams.json ("presets" lists them)
//   clear                      remove the team file and any pending approvals; every agent is available again
//   check <agent>              exit 0 if allowed ("in-team" or "no-team"), exit 3 if "outside-team" (read-only)
//   allow <names...>           record the user's one-time yes for agents outside the team
//   revoke <names...>          drop pending approvals for those agents
//   brief                      print the constraint paragraph to paste into a lead's brief
//
// The team lives in the USER'S project at .npc-union/team.json (not inside the plugin folder).
// Override with --file or NPC_UNION_TEAM_FILE. The Assemble Team tab in office3d/ exports the same format.
//
// Approvals: `allow` writes one file per yes into .npc-union/approvals/ next to the team file. The plugin
// hook (scripts/team-guard.mjs) and scripts/run-agent.mjs delete one such file when they let an outside
// agent run, so each yes covers one run. Deleting is the claim: if two parallel runs race for the same file,
// only one unlink succeeds. Approvals expire after APPROVAL_TTL_MS so a yes that was never used does not linger.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ALWAYS_ALLOWED = new Set(["shop-steward"]); // the orchestrator itself is never "outside" the team
export const DEFAULT_FILE = join(".npc-union", "team.json");
export const PLUGIN_PREFIX = "npc-union:";
export const APPROVAL_TTL_MS = 60 * 60 * 1000; // one hour

// One rule for where the team file is, shared by this CLI, the hook and run-agent.mjs:
// NPC_UNION_TEAM_FILE, then $CLAUDE_PROJECT_DIR/.npc-union/team.json, then <cwd>/.npc-union/team.json.
export function resolveTeamFile({ env = process.env, cwd = process.cwd() } = {}) {
  if (env.NPC_UNION_TEAM_FILE) return resolve(cwd, env.NPC_UNION_TEAM_FILE);
  if (env.CLAUDE_PROJECT_DIR) return resolve(env.CLAUDE_PROJECT_DIR, DEFAULT_FILE);
  return resolve(cwd, DEFAULT_FILE);
}

export function loadCatalog(root = ROOT) {
  return JSON.parse(readFileSync(join(root, "catalog", "agents.json"), "utf8")).agents.filter((a) => a.status !== "planned");
}

export function loadPresets(root = ROOT) {
  return JSON.parse(readFileSync(join(root, "catalog", "teams.json"), "utf8")).presets;
}

export function readTeam(file) {
  if (!existsSync(file)) return null;
  const data = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(data.members)) throw new Error(`${file}: "members" must be an array`);
  return { version: 1, name: "My team", policy: "strict", ...data };
}

export function writeTeam(file, team) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify({ version: 1, name: team.name ?? "My team", policy: "strict", members: team.members }, null, 2) + "\n");
}

// Names may be given as agent name, persona name, or plugin id. Returns { names, unknown }.
export function resolveNames(inputs, catalog) {
  const names = [];
  const unknown = [];
  for (const raw of inputs) {
    const q = raw.trim().toLowerCase();
    if (!q) continue;
    const hit = catalog.find((a) => a.name === q || a.id.toLowerCase() === q || (a.persona_name || "").toLowerCase() === q);
    if (hit) { if (!names.includes(hit.name)) names.push(hit.name); }
    else unknown.push(raw.trim());
  }
  return { names, unknown };
}

function suggest(word, catalog) {
  const w = word.toLowerCase();
  return catalog.filter((a) => a.name.includes(w) || w.includes(a.name) || (a.persona_name || "").toLowerCase().includes(w)).slice(0, 3).map((a) => a.name);
}

export function checkAgent(file, agent, catalog) {
  const { names } = resolveNames([agent], catalog);
  const name = names[0] ?? agent;
  if (ALWAYS_ALLOWED.has(name)) return "in-team";
  const team = readTeam(file);
  if (!team || team.members.length === 0) return "no-team";
  return team.members.includes(name) ? "in-team" : "outside-team";
}

// Is this Agent-tool subagent type an NPC Union agent? Returns its agent name, or null for anything else
// (built-ins such as Explore, other plugins' "plugin:agent" ids, the user's own agents).
// Plugin installs report "npc-union:<folders>:<name>"; the script installer registers bare names.
// Only exact names count: no persona or case-insensitive matching here, so "Plan" or "Explore" never match.
export function npcUnionAgentName(subagentType, catalog) {
  if (typeof subagentType !== "string" || !subagentType) return null;
  if (subagentType.includes(":")) {
    if (!subagentType.startsWith(PLUGIN_PREFIX)) return null;
    return subagentType.split(":").pop() || null;
  }
  return catalog.some((a) => a.name === subagentType) ? subagentType : null;
}

export function approvalsDir(teamFile) {
  return join(dirname(teamFile), "approvals");
}

// Pending, unexpired approvals. Expired or unreadable files are removed on the way.
export function listApprovals(teamFile, now = Date.now()) {
  const dir = approvalsDir(teamFile);
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".json")).sort()) {
    const path = join(dir, f);
    let data = null;
    try { data = JSON.parse(readFileSync(path, "utf8")); } catch { data = null; }
    if (!data || typeof data.agent !== "string" || !(Date.parse(data.expires) > now)) {
      try { unlinkSync(path); } catch { /* already gone */ }
      continue;
    }
    out.push({ ...data, path });
  }
  return out;
}

export function grantApproval(teamFile, name, now = Date.now(), ttlMs = APPROVAL_TTL_MS) {
  const dir = approvalsDir(teamFile);
  mkdirSync(dir, { recursive: true });
  const record = { agent: name, granted: new Date(now).toISOString(), expires: new Date(now + ttlMs).toISOString() };
  const path = join(dir, `${name}.${now}.${Math.random().toString(36).slice(2, 8)}.json`);
  writeFileSync(path, JSON.stringify(record, null, 2) + "\n", { flag: "wx" });
  return { ...record, path };
}

// Claims one approval for `name` by deleting its file. Returns the record, or null if none was left.
export function consumeApproval(teamFile, name, now = Date.now()) {
  for (const a of listApprovals(teamFile, now).filter((x) => x.agent === name)) {
    try { unlinkSync(a.path); return a; } catch (e) { if (e.code !== "ENOENT") throw e; }
  }
  return null;
}

export function revokeApprovals(teamFile, name) {
  let n = 0;
  for (const a of listApprovals(teamFile).filter((x) => x.agent === name)) {
    try { unlinkSync(a.path); n++; } catch { /* already gone */ }
  }
  return n;
}

// The enforcement step shared by the hook and run-agent.mjs. Team members, the Steward and "no team" pass
// without touching approvals; an agent outside the team passes only by consuming one approval.
// Returns { verdict: "no-team" | "in-team" | "approved" | "outside-team", name, team }.
export function gateAgent(teamFile, name, catalog, now = Date.now()) {
  const verdict = checkAgent(teamFile, name, catalog);
  const team = readTeam(teamFile);
  if (verdict !== "outside-team") return { verdict, name, team };
  if (consumeApproval(teamFile, name, now)) return { verdict: "approved", name, team };
  return { verdict: "outside-team", name, team };
}

export function briefText(team) {
  return [
    `TEAM CONSTRAINT: the user assembled this team: ${team.members.join(", ")}.`,
    "Use only these specialists. Do not spawn, call, or run any other NPC Union agent.",
    'If the work needs someone outside the team, do not use them. Stop and return a line: "NEED <agent-name> (outside team): <one-sentence reason>".',
    "The Steward will ask the user; you cannot.",
  ].join("\n");
}

function parseArgs(argv) {
  const args = [];
  let file = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--file") file = argv[++i];
    else args.push(argv[i]);
  }
  return { args, file: file ? resolve(file) : resolveTeamFile() };
}

function main(argv) {
  const { args, file } = parseArgs(argv);
  const [cmd = "show", ...rest] = args;
  const catalog = loadCatalog();
  const inputs = rest.flatMap((s) => s.split(","));
  const out = (s) => console.log(s);
  const fail = (s, code = 1) => { console.error(s); process.exit(code); };

  const need = (list) => {
    const { names, unknown } = resolveNames(list, catalog);
    if (unknown.length) {
      fail(unknown.map((u) => `Unknown agent "${u}"${suggest(u, catalog).length ? `. Did you mean: ${suggest(u, catalog).join(", ")}?` : "."}`).join("\n"));
    }
    return names;
  };

  switch (cmd) {
    case "show": {
      const team = readTeam(file);
      if (!team || !team.members.length) return out("No team active. Every agent is available.");
      out(`Team "${team.name}" (${team.members.length}), file: ${file}`);
      for (const n of team.members) {
        const a = catalog.find((x) => x.name === n);
        out(`  ${n}${a ? `  (${a.persona_name}, ${a.runtime})` : "  (not in this catalog version)"}`);
      }
      const pending = listApprovals(file);
      if (pending.length) out(`One-time approvals pending: ${pending.map((p) => `${p.agent} (until ${p.expires})`).join(", ")}`);
      return;
    }
    case "set": {
      const names = need(inputs);
      if (!names.length) fail("Give at least one agent. Use `clear` to remove the team.");
      writeTeam(file, { members: names });
      return out(`Team set: ${names.length} specialists. File: ${file}`);
    }
    case "add": {
      const names = need(inputs);
      const team = readTeam(file) ?? { members: [] };
      const members = [...new Set([...team.members, ...names])];
      writeTeam(file, { ...team, members });
      return out(`Team now has ${members.length} specialists.`);
    }
    case "remove": {
      const names = need(inputs);
      const team = readTeam(file);
      if (!team) fail("No team active.");
      const members = team.members.filter((m) => !names.includes(m));
      writeTeam(file, { ...team, members });
      return out(`Team now has ${members.length} specialists.`);
    }
    case "presets": {
      for (const p of loadPresets()) out(`${p.id.padEnd(22)} ${String(p.members.length).padStart(2)}  ${p.blurb}`);
      return;
    }
    case "preset": {
      const p = loadPresets().find((x) => x.id === rest[0]);
      if (!p) fail(`Unknown preset "${rest[0] ?? ""}". Run: node scripts/team.mjs presets`);
      writeTeam(file, { name: p.label, members: p.members });
      return out(`Preset "${p.label}" loaded: ${p.members.length} specialists. File: ${file}`);
    }
    case "clear": {
      rmSync(file, { force: true });
      rmSync(approvalsDir(file), { recursive: true, force: true });
      return out("Team cleared. Every agent is available again.");
    }
    case "check": {
      if (!rest[0]) fail("Usage: check <agent>");
      const verdict = checkAgent(file, rest[0], catalog);
      out(verdict);
      process.exit(verdict === "outside-team" ? 3 : 0);
      return;
    }
    case "allow": {
      const names = need(inputs);
      if (!names.length) fail("Usage: allow <agent> [more agents]");
      const team = readTeam(file);
      if (!team || !team.members.length) return out("No team active. Every agent is available; nothing to approve.");
      for (const n of names) {
        if (ALWAYS_ALLOWED.has(n) || team.members.includes(n)) { out(`${n} is on the team; no approval needed.`); continue; }
        const a = grantApproval(file, n);
        out(`Approved ${n} for one run, until ${a.expires}. The run after that needs a new yes.`);
      }
      return;
    }
    case "revoke": {
      const names = need(inputs);
      if (!names.length) fail("Usage: revoke <agent> [more agents]");
      for (const n of names) out(`${n}: ${revokeApprovals(file, n)} pending approval(s) removed.`);
      return;
    }
    case "brief": {
      const team = readTeam(file);
      if (!team || !team.members.length) return out("No team active. No constraint to pass on.");
      return out(briefText(team));
    }
    default:
      fail(`Unknown command "${cmd}". See the header of scripts/team.mjs.`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
