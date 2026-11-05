---
name: new-specialist
description: Turn a rough topic into a complete, validated NPC Union agent with its skills, knowledge file, and roster entry. Use to add a specialist.
owner: shared
argument-hint: "[rough topic, e.g. MCP or speedrun tooling]"
---

# New specialist

Builds one finished agent from a vague topic. Work in the NPC Union repo root (the folder with `catalog/roster.json`).

## Inputs

- A rough topic. If none was given, ask for one.
- Ask up to three narrowing questions in one message, only those that change the result:
  1. What should this specialist produce (code, a spec, assets, research, a review)?
  2. Which engine, platform, or audience matters most?
  3. Does its main output depend on live web search or image generation (this decides `runtime: codex`)?
- If the user says "just go", or runs non-interactively, pick defaults, write them under "Assumptions", and continue.

## Steps

1. Check overlap: read `catalog/roster.json` and `catalog/agents.json` (if present). If an existing agent already covers more than half the topic, say which one and stop unless the user still wants a new agent.
2. Pick the folder from the roster's existing folders (`leadership`, `production`, `creative/<dept>`, `technical/<dept>`, `knowledge/<dept>`), a kebab-case `name` not in the roster, and an original `persona_name` not used by any file under `agents/` (grep `persona_name:`) and not borrowed from another product's characters (see `docs/AGENT-SCHEMA.md`).
3. Research with WebSearch and WebFetch: at least five primary sources (official docs, standards, datasets). Record each URL with today's date. Mark anything you could not open as `UNVERIFIED`. Never invent a URL, game, or statistic.
4. Write `agents/<folder>/<name>.md` from `templates/agent.md`: all frontmatter fields, description of 200 characters or fewer, `runtime` and `model` per the runtime rule (codex only when live search or image generation is the main output, and then `web-search` or `image-gen` in `capabilities`), and the eight body sections in order. `## What I know` needs at least 8 specific, non-obvious items. The body needs at least 45 non-empty lines.
5. Write 1-2 owned skills at `skills/<skill>/SKILL.md` from `templates/skill.md`, each with `owner: <name>`, `disable-model-invocation: true`, and `## Steps` and `## Done when` sections. Point at each one from the agent's `## Skills` section as `Read ${CLAUDE_PLUGIN_ROOT}/skills/<skill>/SKILL.md`.
6. Write `knowledge/<topic>/<name>.md` with frontmatter `title`, `tags`, `sources`, `last_verified`, holding the stale-able facts.
7. Add the roster entry `"<name>:<runtime>:<model>"` to the matching folder list in `catalog/roster.json` (stream `a` for leadership and production, `b` creative, `c` technical, `d` knowledge).
8. Run `node scripts/validate.mjs`. Fix every ERROR that names your files and run it again. Repeat until it prints PASS or only errors about other streams' missing agents remain.
9. Run `node scripts/build-catalog.mjs` and `node scripts/build-index.mjs` if they exist.

## Output

```
## New specialist: <persona> (<name>)
Files: agents/<folder>/<name>.md, skills/<skill>/SKILL.md, knowledge/<topic>/<name>.md
Roster: "<name>:<runtime>:<model>" in <folder>
Assumptions: <list>
Sources checked: <n> (UNVERIFIED: <list or none>)
Validator: <last line of output>
```

## Done when

- [ ] Agent, skills, knowledge file, and roster entry exist.
- [ ] `node scripts/validate.mjs` reports no ERROR for these files.
- [ ] Every stale-able fact has a source and `last_verified`, or is marked UNVERIFIED.
- [ ] Persona name is unique and original.
