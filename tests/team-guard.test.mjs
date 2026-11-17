// Tests the team hook (scripts/team-guard.mjs), one-time approvals in scripts/team.mjs, and the team gate in
// scripts/run-agent.mjs. Uses temp folders only, never the real .npc-union/.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadCatalog, writeTeam, grantApproval, listApprovals, consumeApproval, gateAgent, npcUnionAgentName, resolveTeamFile, approvalsDir,
} from "../scripts/team.mjs";
import { decide } from "../scripts/team-guard.mjs";
import { teamGate } from "../scripts/run-agent.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GUARD = join(ROOT, "scripts/team-guard.mjs");
const TEAM = join(ROOT, "scripts/team.mjs");
const RUN_AGENT = join(ROOT, "scripts/run-agent.mjs");
const catalog = loadCatalog();

// A temp project with a team of game-designer and creative-lead. Returns its folder and team file.
function project(members = ["game-designer", "creative-lead"]) {
  const dir = mkdtempSync(join(tmpdir(), "npc-guard-"));
  const file = join(dir, ".npc-union", "team.json");
  if (members) writeTeam(file, { members });
  return { dir, file };
}

// The test itself may run inside Claude Code, so never inherit a real project dir or team file.
function cleanEnv(extra = {}) {
  const env = { ...process.env, ...extra };
  if (!("CLAUDE_PROJECT_DIR" in extra)) delete env.CLAUDE_PROJECT_DIR;
  if (!("NPC_UNION_TEAM_FILE" in extra)) delete env.NPC_UNION_TEAM_FILE;
  return env;
}

const hookInput = (subagentType, dir, extra = {}) => ({
  session_id: "test", cwd: dir, hook_event_name: "PreToolUse", tool_name: "Agent",
  tool_input: { subagent_type: subagentType, description: "d", prompt: "p" }, ...extra,
});

function runHook(input, dir, env = {}) {
  const stdin = typeof input === "string" ? input : JSON.stringify(input);
  const r = spawnSync(process.execPath, [GUARD], { input: stdin, encoding: "utf8", cwd: dir, env: cleanEnv(env) });
  const out = r.stdout.trim();
  return { ...r, json: out ? JSON.parse(out) : null };
}

const isDeny = (r) => r.json?.hookSpecificOutput?.permissionDecision === "deny";

test("subagent types are recognised as NPC Union agents only by exact name or the npc-union: prefix", () => {
  assert.equal(npcUnionAgentName("npc-union:creative:sound:composer", catalog), "composer");
  assert.equal(npcUnionAgentName("composer", catalog), "composer");
  assert.equal(npcUnionAgentName("other-plugin:composer", catalog), null);
  for (const builtIn of ["Explore", "Plan", "general-purpose", "", undefined]) assert.equal(npcUnionAgentName(builtIn, catalog), null);
  const persona = catalog.find((a) => a.persona_name)?.persona_name;
  assert.equal(npcUnionAgentName(persona, catalog), null, "persona names are not subagent types");
});

test("team file location: env override, then CLAUDE_PROJECT_DIR, then cwd", () => {
  const cwd = mkdtempSync(join(tmpdir(), "npc-loc-"));
  assert.equal(resolveTeamFile({ env: {}, cwd }), join(cwd, ".npc-union", "team.json"));
  assert.equal(resolveTeamFile({ env: { CLAUDE_PROJECT_DIR: join(cwd, "p") }, cwd }), join(cwd, "p", ".npc-union", "team.json"));
  assert.equal(resolveTeamFile({ env: { NPC_UNION_TEAM_FILE: "x.json", CLAUDE_PROJECT_DIR: join(cwd, "p") }, cwd }), join(cwd, "x.json"));
});

test("hook allows everything when no team file exists", () => {
  const { dir } = project(null);
  const r = runHook(hookInput("npc-union:creative:sound:composer", dir), dir);
  assert.equal(r.status, 0);
  assert.equal(r.stdout, "", "allow prints nothing, so the normal permission flow is unchanged");
});

test("hook allows built-in agents and other plugins' agents with a team active", () => {
  const { dir } = project();
  for (const t of ["Explore", "Plan", "general-purpose", "other-plugin:composer", "other-plugin:game-designer"]) {
    const r = runHook(hookInput(t, dir), dir);
    assert.equal(r.status, 0, t);
    assert.equal(r.stdout, "", t);
  }
});

test("hook allows team members and the Steward, by plugin id or bare name", () => {
  const { dir } = project();
  for (const t of ["npc-union:creative:design:game-designer", "game-designer", "npc-union:leadership:creative-lead", "npc-union:leadership:shop-steward"]) {
    const r = runHook(hookInput(t, dir), dir);
    assert.equal(r.status, 0, t);
    assert.equal(r.stdout, "", t);
  }
});

test("hook denies an NPC Union agent outside the team and tells the Steward how to record a yes", () => {
  const { dir, file } = project();
  const r = runHook(hookInput("npc-union:creative:sound:composer", dir), dir);
  assert.equal(r.status, 0);
  assert.ok(isDeny(r), r.stdout);
  assert.equal(r.json.hookSpecificOutput.hookEventName, "PreToolUse");
  const reason = r.json.hookSpecificOutput.permissionDecisionReason;
  assert.match(reason, /composer is outside the active team/);
  assert.match(reason, /Ask the user/);
  assert.ok(reason.includes(`allow composer --file "${file}"`), reason);
  // The bare name, as the script installer registers it, is blocked the same way.
  assert.ok(isDeny(runHook(hookInput("composer", dir), dir)));
});

test("hook also matches the old Task tool name and ignores other tools", () => {
  const { dir } = project();
  assert.ok(isDeny(runHook(hookInput("composer", dir, { tool_name: "Task" }), dir)));
  assert.equal(runHook(hookInput("composer", dir, { tool_name: "Bash" }), dir).stdout, "");
});

test("inside a subagent the deny tells it to report NEED to the Steward instead of asking", () => {
  const { dir } = project();
  const r = runHook(hookInput("composer", dir, { agent_id: "agent-1", agent_type: "npc-union:leadership:creative-lead" }), dir);
  assert.ok(isDeny(r));
  const reason = r.json.hookSpecificOutput.permissionDecisionReason;
  assert.match(reason, /NEED composer \(outside team\)/);
  assert.match(reason, /cannot ask the user/);
});

test("hook finds the team through CLAUDE_PROJECT_DIR when cwd is elsewhere", () => {
  const { dir } = project();
  const elsewhere = mkdtempSync(join(tmpdir(), "npc-elsewhere-"));
  const r = runHook(hookInput("composer", elsewhere), elsewhere, { CLAUDE_PROJECT_DIR: dir });
  assert.ok(isDeny(r));
});

test("an approval lets one spawn through, then the next is denied again", () => {
  const { dir, file } = project();
  const allow = spawnSync(process.execPath, [TEAM, "allow", "composer", "--file", file], { encoding: "utf8", env: cleanEnv() });
  assert.equal(allow.status, 0, allow.stderr);
  assert.match(allow.stdout, /Approved composer for one run/);
  assert.equal(listApprovals(file).length, 1);
  const first = runHook(hookInput("npc-union:creative:sound:composer", dir), dir);
  assert.equal(first.stdout, "", "approved spawn is allowed");
  assert.equal(listApprovals(file).length, 0, "the approval was used up");
  assert.ok(isDeny(runHook(hookInput("npc-union:creative:sound:composer", dir), dir)), "second spawn needs a new yes");
});

test("two approvals cover two runs; an approval for one agent does not cover another", () => {
  const { file } = project();
  grantApproval(file, "composer");
  grantApproval(file, "composer");
  assert.equal(gateAgent(file, "sprite-artist", catalog).verdict, "outside-team");
  assert.equal(gateAgent(file, "composer", catalog).verdict, "approved");
  assert.equal(gateAgent(file, "composer", catalog).verdict, "approved");
  assert.equal(gateAgent(file, "composer", catalog).verdict, "outside-team");
});

test("team members never use up an approval", () => {
  const { file } = project();
  grantApproval(file, "composer");
  assert.equal(gateAgent(file, "game-designer", catalog).verdict, "in-team");
  assert.equal(gateAgent(file, "shop-steward", catalog).verdict, "in-team");
  assert.equal(listApprovals(file).length, 1);
});

test("expired approvals do not count and are cleaned up", () => {
  const { file } = project();
  const t0 = Date.parse("2026-01-01T00:00:00Z");
  grantApproval(file, "composer", t0, 1000);
  assert.equal(consumeApproval(file, "composer", t0 + 2000), null);
  assert.equal(readdirSync(approvalsDir(file)).length, 0);
});

test("a corrupt approval file is ignored, not fatal", () => {
  const { file } = project();
  mkdirSync(approvalsDir(file), { recursive: true });
  writeFileSync(join(approvalsDir(file), "composer.1.x.json"), "{not json");
  assert.equal(gateAgent(file, "composer", catalog).verdict, "outside-team");
});

test("allow writes nothing for a team member, with no team, or for an unknown name", () => {
  const { file } = project();
  const onTeam = spawnSync(process.execPath, [TEAM, "allow", "game-designer", "--file", file], { encoding: "utf8", env: cleanEnv() });
  assert.match(onTeam.stdout, /on the team; no approval needed/);
  assert.equal(existsSync(approvalsDir(file)), false);
  const none = project(null);
  const noTeam = spawnSync(process.execPath, [TEAM, "allow", "composer", "--file", none.file], { encoding: "utf8", env: cleanEnv() });
  assert.match(noTeam.stdout, /No team active/);
  assert.equal(existsSync(approvalsDir(none.file)), false);
  const typo = spawnSync(process.execPath, [TEAM, "allow", "composr", "--file", file], { encoding: "utf8", env: cleanEnv() });
  assert.equal(typo.status, 1);
});

test("show lists pending approvals; revoke and clear remove them", () => {
  const { file } = project();
  const run = (...a) => spawnSync(process.execPath, [TEAM, ...a, "--file", file], { encoding: "utf8", env: cleanEnv() });
  run("allow", "composer");
  assert.match(run("show").stdout, /approvals pending: composer/);
  assert.match(run("revoke", "composer").stdout, /1 pending approval/);
  assert.equal(listApprovals(file).length, 0);
  run("allow", "composer");
  run("clear");
  assert.equal(existsSync(approvalsDir(file)), false);
});

test("hook fails open on bad stdin and on a corrupt team file, with a warning", () => {
  const { dir } = project(null);
  const bad = runHook("this is not json", dir);
  assert.equal(bad.status, 0);
  assert.ok(!isDeny(bad));
  assert.match(bad.stderr, /could not check/);

  const file = join(dir, ".npc-union", "team.json");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, "{ broken");
  const corrupt = runHook(hookInput("composer", dir), dir);
  assert.equal(corrupt.status, 0);
  assert.ok(!isDeny(corrupt));
  assert.match(corrupt.stderr, /could not check/);
});

test("decide() is usable directly and reports why it allowed", () => {
  const { dir } = project();
  assert.equal(decide(hookInput("Explore", dir), { env: {} }).why, "not an NPC Union agent");
  assert.equal(decide(hookInput("game-designer", dir), { env: {} }).why, "in-team");
  assert.equal(decide(hookInput("composer", dir), { env: {} }).action, "deny");
});

test("run-agent refuses an agent outside the team with exit 3 and runs nothing", () => {
  const { dir } = project();
  // PATH points at an empty folder, so even a regression could not start a real claude or codex.
  const env = cleanEnv();
  for (const k of Object.keys(env)) if (k.toLowerCase() === "path") delete env[k];
  env.PATH = mkdtempSync(join(tmpdir(), "npc-nopath-"));
  const r = spawnSync(process.execPath, [RUN_AGENT, "composer", "write a theme"], { encoding: "utf8", cwd: dir, env });
  assert.equal(r.status, 3, r.stderr);
  assert.match(r.stderr, /composer is outside the active team/);
  assert.match(r.stderr, /allow composer/);
});

test("run-agent --dry-run and --which skip the team check and keep approvals", () => {
  const { dir, file } = project();
  grantApproval(file, "composer");
  const dry = spawnSync(process.execPath, [RUN_AGENT, "composer", "x", "--dry-run"], { encoding: "utf8", cwd: dir, env: cleanEnv() });
  assert.equal(dry.status, 0, dry.stderr);
  const which = spawnSync(process.execPath, [RUN_AGENT, "composer", "--which"], { encoding: "utf8", cwd: dir, env: cleanEnv() });
  assert.equal(which.status, 0, which.stderr);
  assert.equal(listApprovals(file).length, 1);
});

test("run-agent's gate uses one approval per run and lets team members through", () => {
  const { dir, file } = project();
  const env = {};
  assert.equal(teamGate("game-designer", { env, cwd: dir }).ok, true);
  assert.equal(teamGate("composer", { env, cwd: dir }).ok, false);
  grantApproval(file, "composer");
  const approved = teamGate("composer", { env, cwd: dir });
  assert.equal(approved.ok, true);
  assert.match(approved.message, /one-time approval/);
  assert.equal(teamGate("composer", { env, cwd: dir }).ok, false);
  assert.equal(teamGate("composer", { env, cwd: project(null).dir }).ok, true, "no team, no check");
});
