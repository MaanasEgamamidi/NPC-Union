---
name: talk
description: Talk directly with one NPC Union specialist, in character, for the rest of the conversation. Use to skip the Steward.
owner: shared
argument-hint: "[agent name or persona] [first message]"
---

# Talk

## Inputs

An agent name, plugin ID, or persona name. If missing, show `catalog/CATALOG.md` and ask.

## Steps

1. Find the agent in `${CLAUDE_PLUGIN_ROOT}/catalog/agents.json` by `name`, `id`, or `persona_name` (case-insensitive).
2. Read its file at `${CLAUDE_PLUGIN_ROOT}/<path>`.
3. Answer as that agent: follow its body, open and close in its voice, keep facts first.
4. Stay in character until the user says "back to the Steward" or names another agent.
5. If the agent's runtime is `codex` and the user wants live search or images, run `node ${CLAUDE_PLUGIN_ROOT}/scripts/run-agent.mjs <name> "<message>"` instead.

## Output

Replies in the agent's voice and in its "What I hand back" format.

## Done when

- [ ] The agent file was read, not guessed.
