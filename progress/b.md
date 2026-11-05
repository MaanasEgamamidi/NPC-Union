Status: IN PROGRESS

# Stream B: creative division

Branch: `build/b-creative`. Owns `agents/creative/**`, the skills owned by those agents, `knowledge/creative/**`, and this file.

## Done
- Read the brief, roster, templates, validator, tool taxonomy, and the Claude-Code-Game-Studios (MIT) reference.
- Cast plan fixed: persona names, robot concepts, voices, and owned skill names for all stream B roster agents.

## Next
- Draft agents by department (design, art, screens-effects, sound, narrative) with researched knowledge files and owned skills.
- Side-by-side review and rewrite of generic or similar-sounding text.
- `node scripts/validate.mjs --stream b --strict`.

## Decisions
- One or two owned skills per agent, all `disable-model-invocation: true` with `owner:` set.
- Knowledge lives under `knowledge/creative/<department>/`, frontmatter `title`, `tags`, `sources` (flow list), `last_verified`.
- Agent colours by department: design blue, art orange, screens-effects purple, sound green, narrative yellow.

## Needs local verification

(none yet)

## Requests to other streams

(none yet)
