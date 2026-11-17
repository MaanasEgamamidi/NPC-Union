// Tests scripts/install-hook.mjs, which registers the team-rule hook in a settings file for script installs
// (settings.local.json for a project, settings.json for ~/.claude). Uses temp folders only, never a real ~/.claude.
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

test("CLI --also: registering moves an older install's entry out of settings.json and keeps its other keys", () => {
  const { guard, npc } = installedCopy();
  const claude = dirname(npc);
  const local = join(claude, "settings.local.json");
  const shared = join(claude, "settings.json");
  // An older install wrote the hook into the committed settings.json, beside the team's own keys.
  writeFileSync(shared, JSON.stringify({ model: "opus", hooks: { Stop: [{ hooks: [{ type: "command", command: "say hi" }] }] } }, null, 2) + "\n");
  assert.equal(runCli(shared, "--script", guard).status, 0);
  assert.equal(countOurHandlers(readJson(shared)), 1);
  writeFileSync(local, JSON.stringify({ permissions: { allow: ["Bash(ls)"] } }));
  const r = runCli(local, "--also", shared, "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /old entry\) removed from .*settings\.json/);
  assert.match(r.stdout, /registered in .*settings\.local\.json/);
  assert.equal(countOurHandlers(readJson(local)), 1);
  assert.deepEqual(readJson(local).permissions, { allow: ["Bash(ls)"] }, "Claude Code's own entries in the local file stay");
  assert.deepEqual(readJson(shared), { model: "opus", hooks: { Stop: [{ hooks: [{ type: "command", command: "say hi" }] }] } });
  // Running again changes nothing and adds no second entry.
  const again = runCli(local, "--also", shared, "--script", guard);
  assert.match(again.stdout, /already registered/);
  assert.equal(countOurHandlers(readJson(local)), 1);
  assert.equal(countOurHandlers(readJson(shared)), 0);
});

test("CLI --also: a settings.json that held only the old entry is removed; --remove clears both files", () => {
  const { guard, npc } = installedCopy();
  const local = join(dirname(npc), "settings.local.json");
  const shared = join(dirname(npc), "settings.json");
  assert.equal(runCli(shared, "--script", guard).status, 0);
  assert.equal(runCli(local, "--also", shared, "--script", guard).status, 0);
  assert.equal(existsSync(shared), false);
  assert.equal(countOurHandlers(readJson(local)), 1);
  // Uninstall over a mixed state: both files carry an entry.
  writeFileSync(shared, JSON.stringify({ env: { A: "1" }, ...addHook({}, guard) }));
  const r = runCli(local, "--also", shared, "--remove", "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(existsSync(local), false, "local file held only our hook");
  assert.deepEqual(readJson(shared), { env: { A: "1" } });
  const none = runCli(local, "--also", shared, "--remove", "--script", guard);
  assert.equal(none.status, 0);
  assert.match(none.stdout, /not registered/);
});

test("CLI --also: a bad file anywhere leaves every file unchanged", () => {
  const { guard, npc } = installedCopy();
  const local = join(dirname(npc), "settings.local.json");
  const shared = join(dirname(npc), "settings.json");
  const bad = '{ "model": "opus", }\n';
  writeFileSync(shared, bad);
  const r = runCli(local, "--also", shared, "--script", guard);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /not valid JSON.*no settings file was changed/);
  assert.equal(existsSync(local), false);
  assert.equal(readFileSync(shared, "utf8"), bad);
  assert.equal(runCli(local, "--also").status, 2, "--also needs a path");
});

// git with no global or system config, so the developer's own excludes file (where Claude Code may already have
// added settings.local.json) does not decide the result.
function isolatedGit() {
  const home = tmp();
  const empty = join(home, "gitconfig");
  writeFileSync(empty, "");
  const env = { ...process.env, HOME: home, USERPROFILE: home, XDG_CONFIG_HOME: join(home, "xdg"), GIT_CONFIG_GLOBAL: empty, GIT_CONFIG_NOSYSTEM: "1" };
  const git = (cwd, ...args) => spawnSync("git", args, { cwd, env, encoding: "utf8" });
  return { env, git };
}

test("gitignore note: printed for a repo that does not ignore settings.local.json, silent otherwise", (t) => {
  const { env, git } = isolatedGit();
  if (git(tmp(), "--version").error) return t.skip("git not installed");
  const { guard } = installedCopy();
  const project = tmp(); // outside this checkout, which is itself a git repository
  assert.equal(git(project, "init", "-q").status, 0);
  const local = join(project, ".claude", "settings.local.json");
  const shared = join(project, ".claude", "settings.json");
  const cli = (...args) => spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8", env });

  let r = cli(local, "--also", shared, "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^Note: .*settings\.local\.json is not ignored by git; add \*\*\/\.claude\/settings\.local\.json to \.gitignore/m);
  assert.equal(r.stdout.trim().split("\n").length, 2, "one line for the registration, one for the note");
  assert.equal(existsSync(join(project, ".gitignore")), false, "the user's .gitignore is never edited");

  writeFileSync(join(project, ".gitignore"), ".claude/settings.local.json\n");
  r = cli(local, "--also", shared, "--script", guard);
  assert.doesNotMatch(r.stdout, /Note:/);

  const plain = tmp(); // not a repository
  r = cli(join(plain, ".claude", "settings.local.json"), "--script", guard);
  assert.equal(r.status, 0, r.stderr);
  assert.doesNotMatch(r.stdout, /Note:/);

  // A user install registers in settings.json, which never gets the note.
  r = cli(shared, "--also", local, "--script", guard);
  assert.doesNotMatch(r.stdout, /Note:/);
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
