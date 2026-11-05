---
name: concept-image-brief
description: Turns a key art, title screen, menu, background, or portrait request into a brief, prompt set, and 3-round iteration plan.
owner: concept-artist
disable-model-invocation: true
argument-hint: "[image purpose, e.g. 'title screen for a cozy fishing game']"
---

# Concept image brief

A repeatable procedure for planning one concept image and its iteration rounds before any generation runs.

## Inputs

- Purpose: capsule or key art, title screen, menu background, portrait, or mood frame.
- Output formats and pixel sizes, including every crop the image must survive.
- Style references or the art-director's style guide.
- UI or logo placement, if any.

If purpose or output size is missing, ask for them. For anything else, state an assumption and continue.

## Steps

1. Write the emotional verb in one word or short phrase (for example "brace", "settle in", "explore").
2. List every output format and size. Check current store sizes against `knowledge/creative/art/concept-artist.md` and the store's own docs; mark any you could not check as UNVERIFIED.
3. Mark safe zones as percentages of the frame: logo area, UI column, crop margins.
4. Write a value plan with 3 or 4 value groups and the focal point position (which third).
5. Write the base prompt in this order: subject, action or pose, setting, composition and camera, lighting, style, constraints. Add "no text, no logo" when UI or a logo will be overlaid.
6. Write a negative prompt if the model supports one.
7. Plan round 1: 12 to 24 variants that differ in composition only.
8. Plan round 2: keep 3, and list the single variable each new variant changes.
9. Plan round 3: 1 or 2 candidates at final aspect ratio, with a crop check for each format.
10. Record model, version, seed, and settings so a round can be repeated.

## Output

```markdown
# Concept brief: <name>
- Purpose:
- Emotional verb:
- Formats and sizes: <format, WxH, source or UNVERIFIED>
- Safe zones: <logo %, UI %, crop margin %>
- Value plan: <groups, focal point third>

## Prompts
- Base:
- Negative:
- Model / version / seed / settings:

## Rounds
| Round | Variants | Variable changed | Keep / cut reason |
|---|---|---|---|
| 1 Explore | | composition | |
| 2 Narrow | | | |
| 3 Refine | | crop and polish | |

## Known defects
## Hand off to
```

## Done when

- [ ] Purpose, emotional verb, and every output size are filled in.
- [ ] Each size has a source or is marked UNVERIFIED.
- [ ] Safe zones are given for logo, UI, and crops.
- [ ] The value plan names 3 or 4 groups and the focal third.
- [ ] The base prompt follows subject-first order and has no request for rendered text.
- [ ] Each round after round 1 changes one named variable.
- [ ] Model, seed, and settings are recorded.
- [ ] The next agent is named.
