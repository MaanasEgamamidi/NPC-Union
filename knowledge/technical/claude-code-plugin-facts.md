---
title: Claude Code plugin facts
source: https://code.claude.com/docs
last_verified: 2026-11-04
owner: agent-tooling-engineer
---

# Claude Code plugin facts

Facts used when building plugins, subagents, skills, and hooks for NPC Union. Each item below the first heading was checked against https://code.claude.com/docs on 2026-11-04 (see `docs/BUILD_BRIEF.md` section 3). Anything marked UNVERIFIED has not been checked and must be confirmed in the docs before anyone depends on it.

## Verified (last_verified: 2026-11-04)

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

- UNVERIFIED: exact hook event names and the JSON shape each hook receives on stdin. Read the hooks page of https://code.claude.com/docs before writing a hook script.
- UNVERIFIED: whether `${CLAUDE_PLUGIN_ROOT}` is also expanded inside `hooks.json` command strings and `.mcp.json` at the plugin level.
- UNVERIFIED: hook exit code semantics (which code blocks an action and how stderr is surfaced).
- UNVERIFIED: the token cost of a 200-character description, and so how many agents fit under the 15,000-token warning. Measure rather than estimate.
- UNVERIFIED: precedence when a plugin agent and a project or user agent share a name.

## How to re-check

1. Open https://code.claude.com/docs and find the page for the fact (plugins, subagents, skills, hooks).
2. If the fact still holds, update `last_verified` above. If it changed, edit the line and tell `technical-lead`.
3. Run `claude plugin validate .` from the repo root if the CLI is installed.
