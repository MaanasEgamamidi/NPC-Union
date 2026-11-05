---
title: Claude Code plugin facts
source: https://code.claude.com/docs
last_verified: 2026-11-05
owner: agent-tooling-engineer
---

# Claude Code plugin facts

Facts used when building plugins, subagents, skills, and hooks for NPC Union. Each item below the first heading was checked against https://code.claude.com/docs on 2026-11-04 (see `docs/AGENT-SCHEMA.md`). Anything marked UNVERIFIED has not been checked and must be confirmed in the docs before anyone depends on it.

## Verified (last_verified: 2026-11-05)

- Plugin `agents/` is scanned recursively. Subfolders become part of the agent ID: `agents/creative/art/sprite-artist.md` registers as `npc-union:creative:art:sprite-artist`.
- A subagent can spawn subagents up to three layers below the main conversation. Steward to division lead to specialist is valid; a fourth layer is not.
- Plugin agents ignore the `hooks`, `mcpServers`, and `permissionMode` frontmatter fields. Put hooks and MCP servers at the plugin level instead.
- Unknown frontmatter fields are silently ignored, so custom fields such as `persona_name`, `division`, `runtime` are safe. Write lists in flow style on one line.
- `model` accepts `sonnet`, `opus`, `haiku`, `fable`, a full Claude model ID, or `inherit`. It only names Claude models. Non-Claude routing goes in the repo's own `runtime` field.
- `tools: Agent(a, b), Read` allowlists which subagents an agent can spawn.
- All subagent descriptions cost context on every turn. Claude Code warns when the combined total passes 15,000 tokens. Repo rule: agent descriptions are 200 characters or fewer.
- Skill descriptions cost context every turn unless `disable-model-invocation: true` is set. That setting also blocks preloading the skill through an agent's `skills:` frontmatter field.
- Plugin skills live at `skills/<name>/SKILL.md` and are invoked as `/npc-union:<name>`.
- A `CLAUDE.md` at the plugin root is not loaded.
- `${CLAUDE_PLUGIN_ROOT}` is substituted in agent and skill Markdown bodies.
- Plugin names cannot start with `claude-`.
- `claude plugin validate .` validates a plugin when the CLI is available.

## UNVERIFIED (check before relying on these)

- Hook event names and event-specific JSON input schemas are documented at https://code.claude.com/docs/en/hooks. Command hooks receive the JSON on stdin.
- `${CLAUDE_PLUGIN_ROOT}` resolves in hook `command` and `args` and in MCP server fields; the supported fields depend on transport. See https://code.claude.com/docs/en/plugins-reference.
- Exit 2 can block an action, but its effect and where stderr appears depend on the event; consult the per-event table at https://code.claude.com/docs/en/hooks.
- UNVERIFIED: the token cost of a 200-character description, and so how many agents fit under the 15,000-token warning. Measure rather than estimate.
- UNVERIFIED: precedence when a plugin agent and a project or user agent share a name.

## How to re-check

1. Open https://code.claude.com/docs and find the page for the fact (plugins, subagents, skills, hooks).
2. If the fact still holds, update `last_verified` above. If it changed, edit the line and tell `technical-lead`.
3. Run `claude plugin validate .` from the repo root if the CLI is installed.
