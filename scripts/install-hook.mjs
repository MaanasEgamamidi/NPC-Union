#!/usr/bin/env node
// Registers or removes the NPC Union team-rule hook (scripts/team-guard.mjs) in a Claude Code settings file.
// The plugin gets this hook from hooks/hooks.json; install.sh and install.ps1 call this script instead,
// because a script install has no plugin hooks. Node only, no dependencies, no network.
//
// Usage: node scripts/install-hook.mjs <settings file> [--also <settings file>]... [--script <team-guard.mjs>] [--remove]
//   --script  path to the team-guard.mjs the hook should run (default: the one beside this script)
//   --also    another settings file that must not hold our entry: registering removes it from there
//             (an older install wrote it there), and --remove removes it from there too. Repeatable.
//   --remove  delete our entry and any hooks/PreToolUse containers that become empty because of it
// Every file is read and checked before any is written, so a bad file leaves all of them unchanged.
// The installers register in <project>/.claude/settings.local.json for a project install (the entry holds an
// absolute path on this machine, so it must not land in the committed settings.json) and in ~/.claude/settings.json
// for a user install, passing the other file with --also. When the file registered in is a settings.local.json
// inside a git repository that does not ignore it, a one-line note says to add it to .gitignore.
//
// The entry it writes, in exec form (no shell, so paths with spaces need no quoting):
//   "hooks": { "PreToolUse": [ { "matcher": "Agent|Task",
//     "hooks": [ { "type": "command", "command": "node", "args": ["<abs>/npc-union/scripts/team-guard.mjs"], "timeout": 15 } ] } ] }
// Our entry is any command handler whose command or args name a path ending in npc-union/scripts/team-guard.mjs,
// or exactly the --script path (default: the team-guard.mjs beside this script), compared without case or slash style.
// Every other key and hook is left as it is. Running it twice leaves one entry. A file that is not valid JSON,
// or whose "hooks" is not shaped the way Claude Code expects, is refused and left unchanged (exit 1).
// Writes go to a temp file that is then renamed over the target.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync, renameSync, unlinkSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const MATCHER = "Agent|Task";
export const TIMEOUT = 15;
const GUARD_SUFFIX = "npc-union/scripts/team-guard.mjs";

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const norm = (p) => String(p).replace(/\\/g, "/").toLowerCase();

// The handler we write, for a given absolute team-guard.mjs path.
export function hookHandler(guardPath) {
  return { type: "command", command: "node", args: [String(guardPath).replace(/\\/g, "/")], timeout: TIMEOUT };
}

// True for a handler that runs an NPC Union team-guard.mjs (exec form or shell form), or runs guardPath.
export function isOurHandler(handler, guardPath) {
  if (!isObject(handler)) return false;
  const parts = [handler.command, ...(Array.isArray(handler.args) ? handler.args : [])].filter((p) => typeof p === "string");
  const exact = guardPath ? norm(guardPath) : null;
  return parts.some((p) => {
    const unquoted = norm(p).replace(/["']/g, "");
    if (exact && (unquoted === exact || unquoted.endsWith(` ${exact}`))) return true;
    return unquoted.split(/\s+/).some((tok) => tok.endsWith(GUARD_SUFFIX));
  });
}

// Throws if settings has a hooks section Claude Code would not accept, so we never rewrite something we misread.
export function checkShape(settings) {
  if (!isObject(settings)) throw new Error("settings is not a JSON object");
  if (settings.hooks === undefined) return;
  if (!isObject(settings.hooks)) throw new Error('"hooks" is not an object');
  const pre = settings.hooks.PreToolUse;
  if (pre === undefined) return;
  if (!Array.isArray(pre)) throw new Error('"hooks.PreToolUse" is not an array');
  for (const group of pre) {
    if (!isObject(group)) throw new Error('"hooks.PreToolUse" has an entry that is not an object');
    if (group.hooks !== undefined && !Array.isArray(group.hooks)) throw new Error('a "hooks.PreToolUse" entry has "hooks" that is not an array');
  }
}

// Returns a copy of settings without our handler. Groups, the PreToolUse array and the hooks object are
// dropped only when our removal is what emptied them; containers that were already empty stay.
export function removeHook(settings, guardPath) {
  checkShape(settings);
  const out = structuredClone(settings);
  const pre = out.hooks?.PreToolUse;
  if (!Array.isArray(pre)) return out;
  let changed = false;
  const groups = [];
  for (const group of pre) {
    if (!Array.isArray(group.hooks)) { groups.push(group); continue; }
    const kept = group.hooks.filter((h) => !isOurHandler(h, guardPath));
    if (kept.length === group.hooks.length) { groups.push(group); continue; }
    changed = true;
    if (kept.length) groups.push({ ...group, hooks: kept });
  }
  if (!changed) return out;
  if (groups.length) out.hooks.PreToolUse = groups;
  else {
    delete out.hooks.PreToolUse;
    if (Object.keys(out.hooks).length === 0) delete out.hooks;
  }
  return out;
}

// Returns a copy of settings with exactly one handler of ours, running guardPath. An existing entry for the
// same path is left in place; an entry for another path (an older install) is replaced.
export function addHook(settings, guardPath) {
  checkShape(settings);
  const want = hookHandler(guardPath);
  const ours = (settings.hooks?.PreToolUse ?? []).flatMap((g) => (Array.isArray(g.hooks) ? g.hooks : []).filter((h) => isOurHandler(h, guardPath)));
  if (ours.length === 1 && JSON.stringify(ours[0]) === JSON.stringify(want)) return structuredClone(settings);
  const out = removeHook(settings, guardPath);
  out.hooks ??= {};
  out.hooks.PreToolUse ??= [];
  out.hooks.PreToolUse.push({ matcher: MATCHER, hooks: [want] });
  return out;
}

export function countOurHandlers(settings, guardPath) {
  const pre = settings?.hooks?.PreToolUse;
  if (!Array.isArray(pre)) return 0;
  return pre.reduce((n, g) => n + (Array.isArray(g?.hooks) ? g.hooks.filter((h) => isOurHandler(h, guardPath)).length : 0), 0);
}

// Reads a settings file. Missing or blank -> {}. Invalid JSON -> throws, file untouched.
export function readSettings(file) {
  if (!existsSync(file)) return { settings: {}, existed: false, indent: 2 };
  const raw = readFileSync(file, "utf8").replace(/^﻿/, "");
  if (!raw.trim()) return { settings: {}, existed: true, indent: 2 };
  let settings;
  try { settings = JSON.parse(raw); } catch (e) { throw new Error(`${file} is not valid JSON (${e.message})`); }
  const m = raw.match(/^([ \t]+)"/m);
  return { settings, existed: true, indent: m ? m[1] : 2 };
}

export function writeSettingsAtomic(file, settings, indent = 2) {
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(settings, null, indent) + "\n");
  try { renameSync(tmp, file); } catch (e) { try { unlinkSync(tmp); } catch {} throw e; }
}

// Resolve the guard path the way Node will when Claude Code runs it, so team-guard.mjs's own
// "am I the main module" check matches (long names instead of 8.3 short names on Windows).
export function canonicalGuardPath(p) {
  const abs = resolve(p);
  let real = abs;
  try { real = realpathSync(abs); } catch {}
  return real.replace(/\\/g, "/");
}

// The note to print when file (a settings.local.json) sits in a git work tree that does not ignore it, else null.
// git check-ignore exits 0 when ignored, 1 when not (a tracked file also gives 1), 128 outside a repository.
// Anything but 1, including git not being installed, prints nothing.
export function gitignoreNote(file, env = process.env) {
  if (!/(^|[\\/])settings\.local\.json$/.test(file)) return null;
  const r = spawnSync("git", ["-C", dirname(file), "check-ignore", "-q", file], { env, stdio: "ignore" });
  if (r.error || r.status !== 1) return null;
  return `Note: ${file} is not ignored by git; add .claude/settings.local.json to .gitignore so this machine's path is not committed.`;
}

// Removes our handler from a file already read. Returns a message, or null when the file had none.
// If our hook was all the file held, it was ours to begin with: the file is removed rather than left as "{}".
function removeFrom(file, read, guard, label) {
  if (!read.existed || !countOurHandlers(read.settings, guard)) return null;
  const next = removeHook(read.settings, guard);
  if (Object.keys(next).length === 0 && Object.keys(read.settings).length === 1) unlinkSync(file);
  else writeSettingsAtomic(file, next, read.indent);
  return `NPC Union team hook ${label} ${file}`;
}

const USAGE = "Usage: node scripts/install-hook.mjs <settings file> [--also <settings file>]... [--script <team-guard.mjs>] [--remove]";

// Returns { code, message }; never throws.
export function run(argv, env = process.env) {
  const args = [...argv];
  const remove = args.includes("--remove");
  let script = join(HERE, "team-guard.mjs");
  const also = [];
  for (let i = args.indexOf("--script"); i >= 0; i = args.indexOf("--script")) {
    if (!args[i + 1]) return { code: 2, message: "--script needs a path" };
    script = args[i + 1];
    args.splice(i, 2);
  }
  for (let i = args.indexOf("--also"); i >= 0; i = args.indexOf("--also")) {
    if (!args[i + 1] || args[i + 1].startsWith("--")) return { code: 2, message: "--also needs a path" };
    also.push(args[i + 1]);
    args.splice(i, 2);
  }
  const files = args.filter((a) => a !== "--remove");
  if (files.length !== 1 || files[0].startsWith("--")) return { code: 2, message: USAGE };
  const file = resolve(files[0]);
  const others = also.map((f) => resolve(f)).filter((f) => norm(f) !== norm(file));
  const all = [file, ...others];
  // Read and check every file before writing any, so one bad file cannot leave the hook in two places or none.
  const reads = new Map();
  for (const f of all) {
    try {
      const read = readSettings(f);
      checkShape(read.settings);
      reads.set(f, read);
    } catch (e) {
      const msg = e.message.includes(f) ? e.message : `${f}: ${e.message}`;
      return { code: 1, message: `NPC Union hook: ${msg}; no settings file was changed` };
    }
  }
  const guard = canonicalGuardPath(script);
  try {
    if (remove) {
      const lines = all.map((f) => removeFrom(f, reads.get(f), guard, "removed from")).filter(Boolean);
      if (lines.length) return { code: 0, message: lines.join("\n") };
      return { code: 0, message: `NPC Union team hook: not registered in ${all.join(" or ")}` };
    }
    if (!existsSync(guard)) return { code: 1, message: `NPC Union hook: ${guard} not found; no settings file was changed` };
    // Clear stale entries first: if the write below then fails, no guard runs and the installer warns,
    // which is better than two guards competing for the same one-time approval.
    const lines = others.map((f) => removeFrom(f, reads.get(f), guard, "(old entry) removed from")).filter(Boolean);
    const read = reads.get(file);
    const next = addHook(read.settings, guard);
    if (read.existed && JSON.stringify(next) === JSON.stringify(read.settings)) {
      lines.push(`NPC Union team hook already registered in ${file}`);
    } else {
      writeSettingsAtomic(file, next, read.indent);
      lines.push(`NPC Union team hook registered in ${file}`);
    }
    const note = gitignoreNote(file, env);
    if (note) lines.push(note);
    return { code: 0, message: lines.join("\n") };
  } catch (e) {
    return { code: 1, message: `NPC Union hook: ${e.message}` };
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const r = run(process.argv.slice(2));
  (r.code ? process.stderr : process.stdout).write(r.message + "\n");
  process.exitCode = r.code;
}
