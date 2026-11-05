// Tests scripts/run-agent.mjs with stub codex/claude executables on PATH.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = join(ROOT, "scripts/run-agent.mjs");
const AGENT = "shop-steward";

function stubDir(withCodex) {
  const dir = mkdtempSync(join(tmpdir(), "npc-stub-"));
  const log = join(dir, "calls.log");
  if (withCodex) {
    writeFileSync(join(dir, "codex"), `#!/usr/bin/env node
const fs=require("fs");const a=process.argv.slice(2);fs.writeFileSync(${JSON.stringify(log)},JSON.stringify(a));
const o=a[a.indexOf("-o")+1];fs.writeFileSync(o,"STUB CODEX ANSWER\\n");`);
    chmodSync(join(dir, "codex"), 0o755);
  }
  writeFileSync(join(dir, "claude"), `#!/usr/bin/env node
require("fs").writeFileSync(${JSON.stringify(log)},JSON.stringify(process.argv.slice(2)));console.log("STUB CLAUDE ANSWER");`);
  chmodSync(join(dir, "claude"), 0o755);
  return { dir, log };
}

const run = (args, dir, extraEnv = {}) =>
  spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8", env: { ...process.env, PATH: `${dir}:${dirname(process.execPath)}`, ...extraEnv } });

test("codex runtime uses the verified codex invocation", { skip: process.platform === "win32" }, () => {
  const { dir, log } = stubDir(true);
  const r = run([AGENT, "plan a jam game", "--runtime", "codex"], dir, { NPC_UNION_CODEX_MODEL: "test-model" });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /STUB CODEX ANSWER/);
  const args = JSON.parse(readFileSync(log, "utf8"));
  assert.deepEqual(args.slice(0, 9), ["--search", "exec", "-m", "test-model", "-c", 'model_reasoning_effort="high"', "-s", "workspace-write", "--skip-git-repo-check"]);
  assert.equal(args[9], "-o");
  assert.match(args[11], /# Task\n\nplan a jam game/);
  assert.ok(!args[11].includes("${CLAUDE_PLUGIN_ROOT}"), "plugin root is substituted");
});

test("default codex model is gpt-6.1-terra", { skip: process.platform === "win32" }, () => {
  const { dir } = stubDir(true);
  const env = { NPC_UNION_CODEX_MODEL: "" };
  const r = run([AGENT, "x", "--runtime", "codex", "--dry-run"], dir, env);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(JSON.parse(r.stdout).args.includes("gpt-6.1-terra"));
});

test("codex missing falls back to claude -p with a notice", { skip: process.platform === "win32" }, () => {
  const { dir, log } = stubDir(false);
  const r = run([AGENT, "hello", "--runtime", "codex"], dir);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stderr, /Codex CLI not found/);
  assert.match(r.stdout, /STUB CLAUDE ANSWER/);
  const args = JSON.parse(readFileSync(log, "utf8"));
  assert.equal(args[0], "-p");
  assert.equal(args.at(-1), "hello");
});

test("dry run prints the plan and runs nothing", { skip: process.platform === "win32" }, () => {
  const { dir } = stubDir(true);
  const r = run([AGENT, "x", "--dry-run"], dir);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(JSON.parse(r.stdout).runtime, "claude");
});

test("unknown agent exits 2", () => {
  const r = spawnSync(process.execPath, [SCRIPT, "no-such-agent", "x"], { encoding: "utf8" });
  assert.equal(r.status, 2);
});
