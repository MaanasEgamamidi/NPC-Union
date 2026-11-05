---
name: low-poly-style-guide
description: Produce a low poly (flat-shaded faceted 3D) style sheet for a project, with palette bands, facet and triangle budgets, shading setup, lighting rig, and an image prompt.
owner: low-poly-stylist
disable-model-invocation: true
argument-hint: "<project name> [platform] [engine] [camera type]"
---

# Low poly style guide

Turns a project brief into a one-page low poly style sheet that artists and the `technical-artist` can build against.

## Inputs

- Project name, genre, and tone (clean and graphic, or warm and handmade).
- Target platform(s) and engine. If missing, ask once; if still missing, assume Unity URP on PC and say so.
- Camera type and typical distance to subject.
- Asset classes in scope (characters, props, terrain, buildings, vehicles).
- Any reference images or games the team already likes.
- `knowledge/art-styles/low-poly.md` (read it first).

## Steps

1. Read `knowledge/art-styles/low-poly.md`. Pick 3 to 5 reference games that match the tone and camera, and write one line each on what to study.
2. Set the target on-screen size of the smallest important asset (usually a character) in pixels at the lowest target resolution. If it is under about 48 px tall, simplify silhouettes and increase facet size.
3. Choose facet size in world units per asset class, keeping the ratio between classes within about 3x so the scene feels consistent.
4. Set triangle budgets per asset class from the platform. Check them against the vertex cost of flat shading (split edges roughly triple vertices). Note the budgets as ranges.
5. Choose the shading method: split-edge hard normals on import, or a derivative-based flat shader. Record which engine settings to verify, and mark any menu path you did not confirm in current docs as UNVERIFIED.
6. Build the palette: pick a key light color and an ambient color, then for each material family write top, side, and under hex values. Limit to about 3 values per family and 16 to 32 swatches total. Decide if a palette texture with one shared material is used.
7. Define the lighting rig: sun elevation, hard or soft shadows, AO policy, fog color and range.
8. Decide on post effects: pixelation or low internal resolution, outlines, color grading. Default is none.
9. Write 4 to 6 do/don't pairs from the pitfalls section that apply to this project.
10. Write the image prompt from the recipe in the knowledge file, describing visual traits only and never naming living artists.
11. If Codex image-gen is available, generate 2 to 4 frames and check each against the palette and facet rules. If not, say so and skip.

## Output

```markdown
# <Project> low poly style sheet

**Tone:** <one line>  **Platform/engine:** <...>  **Camera:** <type, distance>

## References
- <Game>: <what to study>

## Facets and budgets
| Asset class | Facet size (m) | Triangles | Notes |
|---|---|---|---|

## Shading
- Method: <split edges | derivative shader>
- Settings to verify: <list, UNVERIFIED where not checked>

## Palette
- Key light: #RRGGBB  Ambient: #RRGGBB at <n>%
| Family | Top | Side | Under |
|---|---|---|---|
- Palette texture: <yes/no, swatch count>

## Lighting and post
- Sun: <elevation, color>  Shadows: <hard/soft>  AO: <policy>  Fog: <color, range>
- Post: <none | pixelation | outlines>

## Do / Don't
- Do: <...> / Don't: <...>

## Image prompt
"<prompt>"

## Handoff
- technical-artist: budgets, shading method
- moodboard-curator: references
```

## Done when

- Every section of the template is filled, with hex values and numeric budgets, not adjectives.
- Every reference game appears in the knowledge file or has a checked link.
- Facet sizes across asset classes stay within about 3x of each other, or the exception is explained.
- Unchecked engine settings are marked UNVERIFIED.
- The prompt names no living artist and describes only visual traits.
