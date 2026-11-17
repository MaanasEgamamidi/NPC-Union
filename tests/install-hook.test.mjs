// Tests scripts/install-hook.mjs, which registers the team-rule hook in a settings.json for script installs.
// Uses temp folders only, never a real ~/.claude.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { addHook, removeHook, isOurHandler, countOurHandlers, hookHandler, MATCHER } from "../scripts/install-hook.mjs";
import { writeTeam } from "../scripts/team.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(ROOT, "scripts/install-hook.mjs");
const GUARD = "/home/me/.claude/npc-union/scripts/team-guard.mjs";
const GUARD_SPACES = "C:/Users/Jo Smith/My Projects/game/.claude/npc-union/scripts/team-guard.mjs";

const tmp = () => mkdtempSync(join(tmpdir(), "npc-hook-"));
const runCli = (...args) => spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" });
const readJson = (f) => JSON.parse(readFileSync(f, "utf8"));

// A copy of the installed layout (<dir with spaces>/npc-union/{scripts,catalog}) so the guard runs as installed.
function installedCopy() {
  const npc = join(tmp(), "with space", ".claude", "npc-union");
  cpSync(join(ROOT, "scripts"), join(npc, "scripts"), { recursive: true });
  cpSync(join(ROOT, "catalog"), join(npc, "catalog"), { recursive: true });
  return { npc, guard: join(npc, "scripts", "team-guard.mjs"), settings: join(dirname(npc), "settings.json") };
}

test("adds the hook to an empty settings object", () => {
  const out = addHook({}, GUARD);
  assert.deepEqual(out, { hooks: { PreToolUse: [{ matcher: MATCHER, hooks: [hookHandler(GUARD)] }] } });
  assert.deepEqual(out.hooks.PreToolUse[0].hooks[0], { type: "command", command: "node", args: [GUARD], timeout: 15 });
});

test("adds alongside unrelated hooks and keys without touching them", () => {
  const original = {
    model: "opus",
    permissions: { allow: ["Bash(npm test)"] },
    hooks: {
      PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "./check.sh" }] }],
      Stop: [{ hooks: [{ type: "command", command: "say done" }] }],
    },
  };
  const snapshot = structuredClone(original);
  const out = addHook(original, GUARD);
  assert.deepEqual(original, snapshot, "input is not mutated");
  assert.equal(out.model, "opus");
  assert.deepEqual(out.permissions, original.permissions);
  assert.deepEqual(out.hooks.Stop, original.hooks.Stop);
  assert.deepEqual(out.hooks.PreToolUse[0], original.hooks.PreToolUse[0]);
  assert.equal(out.hooks.PreToolUse.length, 2);
  assert.equal(countOurHandlers(out), 1);
});

test("adding twice leaves one entry, and a moved install replaces the old path", () => {
  const once = addHook({ a: 1 }, GUARD);
  assert.deepEqual(addHook(once, GUARD), once);
  const moved = addHook(once, GUARD_SPACES);
  assert.equal(countOurHandlers(moved), 1);
  assert.deepEqual(moved.hooks.PreToolUse[0].hooks[0].args, [GUARD_SPACES]);
});

test("remove restores the original object exactly", () => {
  const cases = [
    {},
    { model: "sonnet" },
    { hooks: { PreToolUse: [{ matcher: "Bash", hooks: [{ type: "command", command: "x" }] }] }, env: { A: "1" } },
    { hooks: { PostToolUse: [{ matcher: "Edit", hooks: [{ type: "command", command: "fmt" }] }] } },
  ];
  for (const original of cases) {
    assert.deepEqual(removeHook(addHook(original, GUARD)), original);
    assert.equal(JSON.stringify(removeHook(addHook(original, GUARD_SPACES))), JSON.stringify(original), "key order kept too");
  }
});

test("remove keeps other handlers that share a group with ours, and ignores a user's own guard script", () => {
  const userGuard = { type: "command", command: "node", args: ["/home/me/tools/team-guard.mjs"] };
  const s = { hooks: { PreToolUse: [{ matcher: "Agent|Task", hooks: [hookHandler(GUARD), userGuard] }] } };
  assert.deepEqual(removeHook(s), { hooks: { PreToolUse: [{ matcher: "Agent|Task", hooks: [userGuard] }] } });
  assert.equal(isOurHandler(userGuard), false);
  assert.equal(isOurHandler({ type: "command", command: `node "${GUARD_SPACES}"` }), true, "shell form with quotes");
  assert.equal(isOurHandler({ type: "command", command: "node", args: [GUARD_SPACES.replace(/\//g, "\\")] }), true, "backslashes");
});

test("refuses a hooks section of the wrong shape", () => {
  assert.throws(() => addHook([], GUARD));
  assert.throws(() => addHook({ hooks: [] }, GUARD));
  assert.throws(() => addHook({ hooks: { PreToolUse: {} } }, GUARD));
  assert.throws(() => removeHook({ hooks: { PreToolUse: [{ hooks: "x" }] } }));
});

test("CLI: creates a missing file, is idempotent, and --remove deletes the file it created", () => {
  const dir = tmp();
  const file = join(dir, "nested", "settings.json");
  const guard = join(ROOT, "scripts", "team-guard.mjs");
  let r = runCli(file, "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /registered in/);
  const first = readFileSync(file, "utf8");
  r = runCli(file, "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /already registered/);
  assert.equal(readFileSync(file, "utf8"), first);
  assert.equal(countOurHandlers(readJson(file), guard), 1, "a --script path outside npc-union/ is still recognised");
  r = runCli(file, "--remove", "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(existsSync(file), false);
});

test("CLI: round trip on an existing file keeps everything else and the indentation", () => {
  const { guard } = installedCopy();
  const file = join(tmp(), "settings.json");
  const original = { model: "opus", hooks: { Stop: [{ hooks: [{ type: "command", command: "say hi" }] }] } };
  const text = JSON.stringify(original, null, 4) + "\n";
  writeFileSync(file, text);
  let r = runCli(file, "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  const added = readJson(file);
  assert.equal(countOurHandlers(added), 1);
  assert.deepEqual(added.hooks.Stop, original.hooks.Stop);
  assert.match(readFileSync(file, "utf8"), /^ {4}"model"/m);
  r = runCli(file, "--remove");
  assert.equal(r.status, 0, r.stderr);
  assert.equal(readFileSync(file, "utf8"), text);
});

test("CLI: --remove deletes a file that held only our hook, and is a no-op when the file is missing", () => {
  const { guard, settings } = installedCopy();
  assert.equal(runCli(settings, "--script", guard).status, 0);
  assert.ok(existsSync(settings));
  assert.equal(runCli(settings, "--remove").status, 0);
  assert.equal(existsSync(settings), false);
  const r = runCli(settings, "--remove");
  assert.equal(r.status, 0);
  assert.equal(existsSync(settings), false);
});

test("CLI: invalid JSON is refused and the file is left byte for byte", () => {
  const file = join(tmp(), "settings.json");
  const bad = '{ "model": "opus", }\n';
  writeFileSync(file, bad);
  for (const args of [[file, "--script", join(ROOT, "scripts/team-guard.mjs")], [file, "--remove"]]) {
    const r = runCli(...args);
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /not valid JSON/);
    assert.equal(readFileSync(file, "utf8"), bad);
  }
  writeFileSync(file, '{"hooks": []}');
  const r = runCli(file, "--script", join(ROOT, "scripts/team-guard.mjs"));
  assert.notEqual(r.status, 0);
  assert.equal(readFileSync(file, "utf8"), '{"hooks": []}');
});

test("CLI: accepts a settings.json with a UTF-8 BOM", () => {
  const { guard } = installedCopy();
  const file = join(tmp(), "settings.json");
  writeFileSync(file, '\uFEFF{"model":"opus"}');
  assert.equal(runCli(file, "--script", guard).status, 0);
  assert.equal(readJson(file).model, "opus");
});

test("the registered command, spawned as Claude Code does (exec form, no shell), denies an out-of-team agent", () => {
  const { guard, settings } = installedCopy();
  assert.match(guard, / /, "install path has a space");
  assert.equal(runCli(settings, "--script", guard).status, 0);
  const handler = readJson(settings).hooks.PreToolUse.find((g) => g.matcher === MATCHER).hooks[0];
  assert.equal(handler.command, "node");
  const project = tmp();
  writeTeam(join(project, ".npc-union", "team.json"), { members: ["game-designer"] });
  const input = JSON.stringify({
    session_id: "t", cwd: project, hook_event_name: "PreToolUse", tool_name: "Agent",
    tool_input: { subagent_type: "creative-lead", description: "d", prompt: "p" },
  });
  const env = { ...process.env };
  delete env.CLAUDE_PROJECT_DIR;
  delete env.NPC_UNION_TEAM_FILE;
  const r = spawnSync(handler.command, handler.args, { input, encoding: "utf8", env, shell: false });
  assert.equal(r.status, 0, r.stderr);
  const out = JSON.parse(r.stdout);
  assert.equal(out.hookSpecificOutput.permissionDecision, "deny");
  assert.match(out.hookSpecificOutput.permissionDecisionReason, /creative-lead is outside the active team/);
});
