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
//   clear                      remove the team file; every agent is available again
//   check <agent>              exit 0 if allowed ("in-team" or "no-team"), exit 3 if "outside-team"
//   brief                      print the constraint paragraph to paste into a lead's brief
//
// The team lives in the USER'S project at .npc-union/team.json (not inside the plugin folder).
// Override with --file or NPC_UNION_TEAM_FILE. The Assemble Team tab in office3d/ exports the same format.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ALWAYS_ALLOWED = new Set(["shop-steward"]); // the orchestrator itself is never "outside" the team
export const DEFAULT_FILE = join(".npc-union", "team.json");

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
  let file = process.env.NPC_UNION_TEAM_FILE || DEFAULT_FILE;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--file") file = argv[++i];
    else args.push(argv[i]);
  }
  return { args, file: resolve(file) };
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
      return out("Team cleared. Every agent is available again.");
    }
    case "check": {
      if (!rest[0]) fail("Usage: check <agent>");
      const verdict = checkAgent(file, rest[0], catalog);
      out(verdict);
      process.exit(verdict === "outside-team" ? 3 : 0);
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
