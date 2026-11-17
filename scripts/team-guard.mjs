#!/usr/bin/env node
// PreToolUse hook (hooks/hooks.json) that enforces the user's assembled team on the Agent tool.
// Node only, no dependencies, no network, no model calls.
//
// Reads the hook input JSON on stdin. Allows by printing nothing and exiting 0, so Claude Code's normal
// permission flow is unchanged. Denies by printing a PreToolUse decision on stdout:
//   {"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"..."}}
// Claude sees the reason. Rules:
//   - no team file, or an empty team            -> allow
//   - subagent is not an NPC Union agent         -> allow (built-ins, other plugins, the user's own agents)
//   - agent on the team, or in ALWAYS_ALLOWED    -> allow, approvals untouched
//   - agent outside the team with an approval    -> allow and use up that approval (scripts/team.mjs allow)
//   - agent outside the team, no approval        -> deny
// On its own errors (bad stdin, unreadable team file) the hook fails open: it warns on stderr and exits 0,
// because a broken guard must not block every agent.
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateAgent, loadCatalog, npcUnionAgentName, resolveTeamFile } from "./team.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const TEAM_SCRIPT = join(HERE, "team.mjs");
export const AGENT_TOOLS = new Set(["Agent", "Task"]); // "Task" is the tool's name before Claude Code 2.1.63

export function denyReason({ name, teamFile, team, inSubagent }) {
  const members = team?.members?.length ? team.members.join(", ") : "(none)";
  const allowCmd = `node "${TEAM_SCRIPT}" allow ${name} --file "${teamFile}"`;
  const lines = [
    `NPC Union team rule: ${name} is outside the active team, so this spawn was blocked.`,
    `Team: ${members}. Team file: ${teamFile}.`,
  ];
  if (inSubagent) {
    lines.push(
      "You are running as a subagent and cannot ask the user. Do not retry, and do not do this agent's work under another name.",
      `Return this line to the Shop Steward and continue with the team you have: "NEED ${name} (outside team): <one-sentence reason>".`,
    );
  } else {
    lines.push(
      `Do not retry yet. Ask the user whether to bring in ${name} for this task, and say why it is needed.`,
      `If the user says yes, record it with: ${allowCmd}`,
      `Then spawn ${name} once. One yes covers one run; the next run needs a new yes.`,
      `If the user wants ${name} for the rest of the project, add it to the team instead: node "${TEAM_SCRIPT}" add ${name} --file "${teamFile}"`,
    );
  }
  return lines.join("\n");
}

// Pure decision, so tests can call it directly. Throws on bad team files; main() turns that into fail-open.
export function decide(input, { env = process.env, catalog = loadCatalog(), now = Date.now() } = {}) {
  if (!input || typeof input !== "object") throw new Error("hook input is not a JSON object");
  if (input.tool_name && !AGENT_TOOLS.has(input.tool_name)) return { action: "allow", why: "not the Agent tool" };
  const name = npcUnionAgentName(input.tool_input?.subagent_type, catalog);
  if (!name) return { action: "allow", why: "not an NPC Union agent" };
  const teamFile = resolveTeamFile({ env, cwd: typeof input.cwd === "string" && input.cwd ? input.cwd : process.cwd() });
  const { verdict, team } = gateAgent(teamFile, name, catalog, now);
  if (verdict !== "outside-team") return { action: "allow", why: verdict, name, teamFile };
  return { action: "deny", name, teamFile, reason: denyReason({ name, teamFile, team, inSubagent: Boolean(input.agent_id) }) };
}

export function main(stdinText, env = process.env) {
  let result;
  try {
    result = decide(JSON.parse(stdinText), { env });
  } catch (e) {
    const msg = `npc-union team guard could not check this spawn and let it through: ${e.message}`;
    return { code: 0, stdout: JSON.stringify({ systemMessage: msg }), stderr: msg };
  }
  if (result.action !== "deny") return { code: 0, stdout: "", stderr: "" };
  const out = { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: result.reason } };
  return { code: 0, stdout: JSON.stringify(out), stderr: "" };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let text = "";
  try { text = readFileSync(0, "utf8"); } catch { text = ""; }
  const r = main(text);
  if (r.stderr) process.stderr.write(r.stderr + "\n");
  if (r.stdout) process.stdout.write(r.stdout + "\n");
  process.exitCode = r.code;
}
