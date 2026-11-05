---
name: paper-craft-style-guide
description: Builds a papercraft or cutout style sheet for a game project, covering materials, palette, layering, shadows and prompt recipes. Use when a project needs a craft-look spec.
owner: paper-craft-stylist
disable-model-invocation: true
argument-hint: "[project name, materials, camera type, mood words]"
---

# Paper craft style guide

A repeatable procedure that turns a project brief into a papercraft or cutout style sheet that artists, `technical-artist` and image generation can all follow.

## Inputs

- Project name and one-line pitch.
- Materials wanted: paper, card stock, corrugated cardboard, felt, yarn, tissue, mixed.
- Camera: 2D side view, 2.5D, or free 3D camera, and its rotation limits.
- Target resolution and platform.
- Three mood words and any existing art to match.

If any of these are missing, ask once in a single message. If still missing, use defaults (card stock plus felt, 2.5D side view, 1080p, "warm, handmade, cosy") and write them under Assumptions.

## Steps

1. Read `knowledge/art-styles/paper-craft.md` and pick 2 or 3 reference games that match the brief. Note one specific thing to study in each.
2. Build the material ladder: list each material, its visual thickness at target resolution (in px for the cut edge), its surface texture, and its sheen (matte, faint, none).
3. Set the plane stack: number of layers (3 to 6), what lives on each, and the contact shadow offset and blur per layer. Offset grows with depth.
4. Write the palette: a paper base, a neutral board tone, a darkest value (not pure black), and at most 2 or 3 saturated accents with a clear gameplay role.
5. Write shape rules: silhouette simplicity, cut irregularity range, fold placement, and which scale cues (tape, pins, staples, pencil marks) are allowed and how many per screen.
6. Set camera and depth rules: rotation limits, depth of field on far layers, and whether pieces need back faces.
7. Write the prompt recipe: material words, edge and shadow words, lighting, depth of field, and a negative list. Describe visual traits only; never name living artists.
8. If Codex image-gen is available, generate 2 to 4 test frames from the recipe and review them. If not, say that frames are still to be made.
9. Run the review checklist from the knowledge file's pitfalls and mark each pass or fail.

## Output

```markdown
# <Project> papercraft style sheet

## Assumptions
- <defaults used, or "none">

## References
| Game | Study this |
|---|---|
| <game> | <specific trait> |

## Material ladder
| Material | Used for | Cut edge (px) | Texture | Sheen |
|---|---|---|---|---|

## Plane stack
| Layer | Contents | Shadow offset (px) | Shadow blur (px) |
|---|---|---|---|

## Palette
| Role | Hex | Notes |
|---|---|---|

## Shape rules
- <rule>

## Camera and depth
- <rule>

## Prompt recipe
Positive: <traits>
Negative: <traits>

## Review
| Check | Pass/Fail | Note |
|---|---|---|
```

## Done when

- [ ] Every material has an edge thickness, texture and sheen.
- [ ] The plane stack has 3 to 6 layers with shadow offsets that grow with depth.
- [ ] The palette has hex values, no pure black, and no more than 3 accents.
- [ ] Camera limits are stated.
- [ ] The prompt recipe has a negative list and names no living artists.
- [ ] At least 2 references come from the knowledge file with links.
- [ ] Review table is filled in, and image frames are either attached or listed as still to be made.
