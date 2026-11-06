// Tests scripts/usage-check.mjs against fixture log folders. No real logs are read.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { claudeSnapshot, codexSnapshot, grade, watchLine } from "../scripts/usage-check.mjs";

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), "../scripts/usage-check.mjs");
const NOW = Date.parse("2026-11-05T20:00:00Z");

function fixtures() {
  const root = mkdtempSync(join(tmpdir(), "npc-usage-"));
  const codex = join(root, "codex");
  const claude = join(root, "claude");
  mkdirSync(join(codex, "sessions/2026/11/05"), { recursive: true });
  mkdirSync(join(claude, "projects/p1"), { recursive: true });
  const rl = (used, secondary, resets) => JSON.stringify({
    timestamp: "2026-11-05T19:50:00Z", type: "event_msg",
    payload: { type: "token_count", info: { model_context_window: 475000 }, rate_limits: {
      primary: { used_percent: used, window_minutes: 300, resets_at: resets },
      secondary: { used_percent: secondary, window_minutes: 10080, resets_at: resets + 86400 },
      credits: { has_credits: false, unlimited: false, balance: "0" }, plan_type: "plus", rate_limit_reached_type: null } },
  });
  writeFileSync(join(codex, "sessions/2026/11/05/rollout-a.jsonl"),
    [rl(10, 5, NOW / 1000 + 3600), '{"type":"noise"}', rl(42, 7, NOW / 1000 + 3600)].join("\n") + "\n");
  const msg = (id, model, ts, extra = {}) => JSON.stringify({
    type: "assistant", timestamp: ts, requestId: `r-${id}`, ...extra,
    message: { id, model, usage: { input_tokens: 10, cache_read_input_tokens: 900, cache_creation_input_tokens: 90, output_tokens: 50 }, content: [{ type: "text", text: "SECRET PROMPT TEXT" }] },
  });
  writeFileSync(join(claude, "projects/p1/s.jsonl"), [
    msg("m1", "claude-sonnet-5-5", "2026-11-05T19:00:00Z"),
    msg("m1", "claude-sonnet-5-5", "2026-11-05T19:00:01Z"), // duplicate id: counted once
    msg("m2", "claude-haiku-5-5", "2026-11-05T19:30:00Z", { isSidechain: true }),
    msg("m3", "claude-sonnet-5-5", "2026-11-05T01:00:00Z"), // outside the window
    "not json with usage",
  ].join("\n") + "\n");
  return { codex, claude };
}

test("codexSnapshot reads the latest rate-limit event", () => {
  const { codex } = fixtures();
  const s = codexSnapshot(codex, NOW);
  assert.equal(s.found, true);
  assert.equal(s.plan_type, "plus");
  assert.equal(s.five_hour.used_percent, 42);
  assert.equal(s.weekly.used_percent, 7);
  assert.equal(s.five_hour.already_reset, false);
});

test("codexSnapshot marks a past reset as stale and handles a missing folder", () => {
  const { codex } = fixtures();
  assert.equal(codexSnapshot(codex, NOW + 7200 * 1000).five_hour.already_reset, true);
  assert.equal(codexSnapshot(join(codex, "nope"), NOW).found, false);
});

test("claudeSnapshot dedupes by message id, honours the window, and counts subagents", () => {
  const { claude } = fixtures();
  const s = claudeSnapshot(claude, 5, NOW);
  assert.equal(s.total.requests, 2);
  assert.equal(s.subagent_requests, 1);
  assert.equal(s.models["claude-sonnet-5-5"].requests, 1);
  assert.equal(s.total.cache_read, 1800);
  assert.equal(s.cache_hit_percent, 90);
});

test("CLI prints numbers only and never prompt text", () => {
  const { codex, claude } = fixtures();
  const res = spawnSync(process.execPath, [SCRIPT, "--codex-dir", codex, "--claude-dir", claude, "--hours", "100000"], { encoding: "utf8" });
  assert.equal(res.status, 0);
  assert.match(res.stdout, /5-hour window/);
  assert.doesNotMatch(res.stdout, /SECRET PROMPT TEXT/);
  const json = spawnSync(process.execPath, [SCRIPT, "--codex-dir", codex, "--claude-dir", claude, "--json"], { encoding: "utf8" });
  assert.equal(JSON.parse(json.stdout).codex.found, true);
});

test("grade follows the 60 and 85 percent thresholds", () => {
  assert.equal(grade(59.9), "green");
  assert.equal(grade(60), "yellow");
  assert.equal(grade(84), "yellow");
  assert.equal(grade(85), "red");
  assert.equal(grade(undefined), "unknown");
});

test("watchLine alerts on a live yellow or red window and ignores a stale one", () => {
  const { codex, claude } = fixtures();
  const snap = (nowMs, used) => {
    const c = codexSnapshot(codex, nowMs);
    c.five_hour.used_percent = used;
    return { generated: new Date(nowMs).toISOString(), codex: c, claude: claudeSnapshot(claude, 5, nowMs) };
  };
  assert.equal(watchLine(snap(NOW, 10)).alerts.length, 0);
  assert.match(watchLine(snap(NOW, 90)).alerts[0], /ALERT codex 5h window is red/);
  assert.equal(watchLine(snap(NOW + 7200 * 1000, 90)).alerts.length, 0); // window already reset
});

test("CLI rejects a bad --watch value", () => {
  for (const args of [["--watch", "0"], ["--watch", "abc"], ["--watch"]]) {
    assert.equal(spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" }).status, 2, args.join(" "));
  }
});

test("CLI rejects a bad --hours value", () => {
  const res = spawnSync(process.execPath, [SCRIPT, "--hours", "abc"], { encoding: "utf8" });
  assert.equal(res.status, 2);
});
