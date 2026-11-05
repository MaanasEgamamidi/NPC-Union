---
name: painterly-style-guide
description: Builds a painterly (oil, watercolor, gouache) style sheet for a game project, covering values, palette, edges, strokes, surface, tech rules, prompts.
owner: painterly-stylist
disable-model-invocation: true
argument-hint: "[project name, 2D or 3D, medium, engine and platform]"
---

# Painterly style guide

Produces one style sheet that artists, `technical-artist`, and image generation can all follow.

## Inputs

- Project name and genre.
- 2D or 3D, and camera type (fixed, side, isometric, free).
- Medium: oil, watercolor, gouache, ink wash, or a mix.
- Engine, render pipeline, and lowest target platform.
- Existing references or a moodboard, if any.

If any are missing, ask once in a single message. If the user says to proceed, use defaults (3D, free camera, watercolor, lowest platform = mid-range laptop) and list them as assumptions.

## Steps

1. Read `knowledge/art-styles/painterly.md`. Pick 2 to 3 reference games that match the medium and camera, and write one line each on what to study.
2. Write 3 style pillars, each a short phrase that can settle a dispute (for example "paper shows through").
3. Value plan: define 3 to 5 value masses and assign scene elements to each. Reserve the darkest or most saturated mass for gameplay-critical items.
4. Palette: choose a ground color, light temperature, and shadow temperature. List 6 to 10 colors with hex and role. Keep shadows colored, never neutral gray.
5. Edge rules: where edges are lost, soft, and hard. Hard edges only at focal points and hazards.
6. Stroke and surface rules: stroke direction (follows form), stroke size in screen space, paper or canvas texture and how it is anchored (world or object space for 3D).
7. Technical rules:
   - 3D: baked light in albedo or dynamic light, not both; texel density target; filter choice (edge-preserving smoothing, stroke shader, overlay) with resolution; temporal stability rule (seeded strokes, held update rate); test before and after TAA and upscaling.
   - 2D: canvas resolution, brush set, layer order, how sprites and backgrounds share the same ground texture.
   Mark any number you have not measured as `UNVERIFIED`.
8. Image-prompt recipe: fill the template from the knowledge file with this project's palette, medium, and edges. Describe traits only, never name living artists.
9. Do and don't list: at least 4 of each, drawn from the pitfalls in the knowledge file.
10. Squint check: if image-gen is available, generate one test frame and check the value read with a grayscale blur. If not, state that no image was produced.

## Output

```markdown
# <Project> painterly style sheet

**Medium:** <oil | watercolor | gouache | ink wash>  **Dimension:** <2D | 3D>  **Camera:** <type>
**Assumptions:** <list or "none">

## Pillars
1. <phrase>
2. <phrase>
3. <phrase>

## References
| Game | Link | Study |
|---|---|---|

## Value plan
| Mass | Value range | Elements |
|---|---|---|

## Palette
| Hex | Role | Notes |
|---|---|---|
Ground: <hex>  Light temperature: <warm | cool>  Shadow temperature: <warm | cool>

## Edges
- Lost: <where>
- Soft: <where>
- Hard: <where>

## Strokes and surface
- Direction: <rule>
- Size: <screen-space rule>
- Surface texture: <paper | canvas>, anchored in <space>

## Technical rules
- <rule> (`UNVERIFIED` where not measured)

## Image-prompt recipe
<filled prompt>

## Do / Don't
| Do | Don't |
|---|---|

## Handoff to technical-artist
- Effects needed: <list>
- Stability requirements: <list>
```

## Done when

- [ ] All inputs are answered or listed as assumptions.
- [ ] 2 to 3 reference games, each with a link from the knowledge file and a study note.
- [ ] Value plan has 3 to 5 masses and a reserved mass for gameplay items.
- [ ] Palette lists hex values with roles and colored shadows.
- [ ] Edge, stroke, and surface rules are each stated.
- [ ] Technical rules cover lighting choice and temporal stability (3D) or layer and texture sharing (2D).
- [ ] Prompt recipe names no living artists.
- [ ] Unmeasured numbers are marked `UNVERIFIED`.
- [ ] Handoff section for `technical-artist` is present.
