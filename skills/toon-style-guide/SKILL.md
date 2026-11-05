---
name: toon-style-guide
description: Builds a western cartoon toon 3D style sheet for one project: proportions, shapes, palette, shading, outlines, prompt recipe, and checks.
owner: toon-stylist
disable-model-invocation: true
argument-hint: "[project name, platform, camera, 1-3 reference games]"
---

# Toon style guide

Produces a one-page style sheet that artists, `technical-artist`, and image generators can all follow.

## Inputs

- Project name and genre.
- Target platform and frame budget. Ask if missing.
- Camera type and typical distance to characters. Ask if missing.
- Audience age.
- Lighting model: baked, dynamic, or mixed.
- One to three reference games. If none, offer three from `knowledge/art-styles/toon.md` and ask which is closest.

If platform and camera are known, proceed and list other gaps as assumptions.

## Steps

1. Read `knowledge/art-styles/toon.md` and pick the reference entries closest to the request.
2. Set proportions: heads tall per character class (hero, NPC, creature), and which one or two traits are exaggerated per class.
3. Set shape language: dominant and secondary shape per faction or role, at about a 70/30 split.
4. Build the palette: 1 base world palette (4 to 6 hexes), reserved high-saturation hues for players or interactables, a shadow hue (shifted, not grey), and a rim light color. Check that reserved hues never appear in the environment.
5. Choose the shading owner: hand-painted albedo, ramp/banded shading, or painted albedo plus a flat ramp on characters only. Write the reason in one line.
6. Decide outlines: none, characters only, or all. Note the vertex cost for inverted-hull outlines.
7. Set a texel density target and detail rule (large color blocks, sparse painted strokes).
8. Write the silhouette checklist: black fill at 64 px tall, readable role and pose.
9. Write the image prompt recipe from visual traits only. Never name living artists or studios' staff.
10. Write a do/don't list of at least 5 lines each, using the pitfalls section of the knowledge file.
11. If Codex image-gen is available, render one silhouette sheet and one palette swatch and attach paths. If not, say so and leave the prompts ready.

## Output

```markdown
# <Project> toon style sheet

**Assumptions:** ...
**References:** <game> (what we take from it), ...

## Proportions
| Class | Heads tall | Exaggerated traits |
|---|---|---|

## Shape language
| Role/faction | Dominant | Secondary |
|---|---|---|

## Palette
| Role | Hex | Notes |
|---|---|---|
| World base | | |
| Reserved (players/interactables) | | |
| Shadow hue | | |
| Rim light | | |

## Shading and outlines
- Shading owner: ... because ...
- Outlines: ... (cost note)
- Texel density: ... px/m; detail rule: ...

## Silhouette checklist
- [ ] ...

## Prompt recipe
"..."

## Do / Don't
| Do | Don't |
|---|---|

## Handoff
- technical-artist: ...
- character-designer: ...
```

## Done when

- [ ] Every character class has a heads-tall number.
- [ ] Palette has hexes with roles, a non-grey shadow hue, and reserved hues absent from the environment.
- [ ] Exactly one shading owner is named with a reason.
- [ ] Outline decision and its cost are stated.
- [ ] Silhouette checklist is present and testable at 64 px.
- [ ] Prompt recipe names visual traits only, no living artists.
- [ ] Do/don't list has at least 5 lines each.
- [ ] Handoff notes exist for `technical-artist` and `character-designer`.
