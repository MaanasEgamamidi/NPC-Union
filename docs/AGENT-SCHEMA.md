# Agent and skill schema

These are the rules every NPC Union agent and skill follows. `node scripts/validate.mjs` checks the mechanical parts. Reviewers check the rest.

## Accuracy comes first

A specialist should give a better answer than a general assistant, and give it faster. That only holds if its facts are right.

- Anything that can go stale (an API, a version, a price, a licence, where a dataset lives) needs a source link. The knowledge file that holds it needs a `last_verified: YYYY-MM-DD` date.
- If you could not check a claim, mark it `UNVERIFIED`. Never invent a URL, dataset, game, quote, or statistic. Example games must be real, and what you say about them must be correct.
- Agents tell the user when they are unsure, and look up version-specific facts instead of recalling them.
- Personality goes in the opening and closing lines of a reply. It never replaces, softens, or delays a fact.

## Platform facts the design relies on

These were checked against the [Claude Code docs](https://code.claude.com/docs) on 2026-11-04. Re-check them if you change how agents load.

- Plugin `agents/` folders are scanned recursively, and subfolders become part of the ID: `agents/creative/art/sprite-artist.md` registers as `npc-union:creative:art:sprite-artist`.
- A subagent can spawn subagents up to three layers below the main conversation, so Steward, then division lead, then specialist works.
- Claude Code ignores frontmatter fields it doesn't recognise. NPC Union's own fields (`persona_name`, `runtime`, `capabilities` and the rest) are safe for that reason.
- **Frontmatter is parsed as YAML, and if parsing fails every field is dropped silently.** Quote any value that contains `: ` or ` #`, and quote list items that contain URLs. The validator checks for this.
- `model` only names Claude models: `sonnet`, `opus`, `haiku`, `fable`, a full Claude model ID, or `inherit`. Codex routing goes in `runtime`.
- Every agent description costs context on every turn, so descriptions are 200 characters at most.
- A skill's description costs context on every turn unless the skill sets `disable-model-invocation: true`. That setting also stops the skill from being preloaded through an agent's `skills:` field.

## Agent frontmatter

Start from [`templates/agent.md`](../templates/agent.md).

```yaml
---
name: sprite-artist              # matches the filename and the roster entry
description: "Specs and generates game-ready sprite sheets. Use for characters, frame timing, atlases."   # 200 characters at most
tools: Read, Glob, Grep, Write, Edit, WebSearch, WebFetch
model: sonnet                    # the Claude model used when Claude runs the agent, or as the fallback
color: orange
persona_name: Quantabit          # unique and original
division: creative
department: art
runtime: codex                   # claude or codex
capabilities: [image-gen, web-search]
reasoning: medium                # low, medium or high: Codex reasoning effort
---
```

### Capabilities

List only what the agent really needs: `web-search`, `image-gen`, `research`, `long-form-text`, `code`, `quick-decisions`, `data-analysis`, `audio-gen`, `video-gen`, `3d-gen`.

### Runtime

- **`codex`:** the agent's main output depends on live web search or image generation, as with asset scouts, image-making artists, and database hunters. `scripts/run-agent.mjs` runs these agents with Codex CLI. The model comes from `NPC_UNION_CODEX_MODEL`.
- **`claude`:** everything else, including code, writing, design reasoning, and review.

Every Codex agent must still work as a Claude subagent when Codex isn't installed. It must say what it can't do without Codex.

## Agent body

These sections are required, in this order, with these exact headings:

1. `## Who I am`: the persona name, what the robot looks like, personality, a mood that shifts with the situation (what excites them, what makes them grumpy), quirks, and a catchphrase. Describe the robot well enough to draw a portrait from it.
2. `## What I know`: at least 8 specific, non-obvious heuristics, numbers, pitfalls, or techniques from this niche. A line that could sit unchanged in another agent's file doesn't count.
3. `## When to call me`: what the agent takes on, and what it sends elsewhere, naming the other agents.
4. `## How I work`: the steps, the questions it asks first, and when it stops asking and acts.
5. `## Knowledge and sources`: files in `knowledge/`, real databases and docs, and how to check them.
6. `## Skills`: the agent's 1-3 skills. Each gets a one-line use and the instruction to read `${CLAUDE_PLUGIN_ROOT}/skills/<skill>/SKILL.md`.
7. `## What I hand back`: the exact deliverable format, plus what the next agent in the pipeline needs.
8. `## Worked example`: one realistic request and a condensed but real answer.

The test for every agent: would a working professional in this niche learn something from its file?

## Skills

Start from [`templates/skill.md`](../templates/skill.md). A skill is a repeatable procedure with inputs, steps, an output template, and a done check. It doesn't restate the agent.

- **Shared skills** (`owner: shared`) can be invoked by the model and keep short descriptions. Examples are `steward`, `route`, and `new-specialist`.
- **Agent-owned skills** set `owner: <agent-name>` and `disable-model-invocation: true`. They stay out of each turn's context. A user can still run them as `/npc-union:<skill>`, and the owning agent reads the file when it needs it.

## Knowledge files

Knowledge lives in `knowledge/<topic>/*.md`, with this frontmatter:

```yaml
---
title: NASA Exoplanet Archive
tags: [space, exoplanets, api]
sources: ["https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html"]
last_verified: 2026-11-05
---
```

Run `node scripts/build-index.mjs` after you add or change knowledge, and `node scripts/kb-search.mjs "<query>"` to search it. [`docs/decisions/`](decisions/) explains why the search is plain keyword search rather than a vector database.

## Personas and portraits

- Each agent is a cartoon robot whose body shows its job. For example, the sprite artist has a pixel-grid face, and the NASA data specialist has a satellite-dish head.
- Each robot wears a small round enamel union pin in its division's colour: leadership is gold, creative is coral, technical is teal, production is amber, and knowledge is violet.
- Portraits live at `assets/avatars/<name>.png`.
- The union theme is seasoning. Departments can be "locals", and a joke about breaks is fine, as long as it never gets in the way of clarity.
- Persona names must be original. Don't borrow characters, names, or art from other products.

## Public tone

- Write plainly, with specific claims and no hype words.
- Don't state counts in prose by hand. Generate them from the catalog.
- Never commit screenshots or art from commercial games. Link to them instead.
