---
name: voxel-style-guide
description: Produce a voxel art style sheet for a project, covering voxel budget, palette, shapes, AO, export settings and image prompts.
owner: voxel-stylist
disable-model-invocation: true
argument-hint: "[project name, camera, platform, engine]"
---

# Voxel style guide

A repeatable procedure that turns a project brief into a voxel style sheet the art and tech teams can build from.

## Inputs

- Project name and one-line pitch.
- Camera: isometric, top-down, third person or first person. Ask if missing.
- Target platform and performance tier. Ask if missing.
- Engine and whether it computes AO or lighting.
- Palette limits or brand colours, if any.
- 1 to 3 reference games or images.

If camera and platform are known, proceed and list other gaps as assumptions.

## Steps

1. Read `knowledge/art-styles/voxel.md`. Pick 2 or 3 reference games from it that match the camera and mood, and note one thing to borrow from each.
2. Set the voxel budget: hero height in voxels, prop range, and world units per voxel. Use odd face widths.
3. Build the palette: total colour count, one ramp of 3 to 5 hue-shifted values per material, and saturation reserved for gameplay-critical objects. Give hex values.
4. Write shape rules: proportions, allowed diagonal step ratios, minimum feature size, silhouette check from the game camera.
5. Set the lighting and AO policy: what the engine does, how much shading is painted into voxels.
6. Write technical settings: tool (default MagicaVoxel), export format, meshing (face culling plus greedy meshing), colour source (vertex colour or palette texture), filtering (point, no mipmaps), animation method (rigid parts or frame swaps).
7. Write 2 or 3 image prompts from the recipe in the knowledge file, describing visual traits only and never naming living artists.
8. List do/don't pairs drawn from the pitfalls section.
9. Mark any fact you could not verify as `UNVERIFIED`.

## Output

```markdown
# <Project> voxel style sheet

## References
- <Game>: borrow <trait>

## Voxel budget
- Hero height: <n> voxels; face width <odd n>
- Props: <range>
- Scale: 1 voxel = <x> units

## Palette (<count> colours)
| Material | Shadow | Base | Light | Highlight |
| --- | --- | --- | --- | --- |

## Shape rules
- ...

## Lighting and AO
- ...

## Technical settings
- Tool / export / meshing / colour source / filtering / animation

## Image prompts
1. ...

## Do / Don't
- Do ... / Don't ...

## Assumptions and UNVERIFIED items
- ...
```

## Done when

- [ ] Hero voxel height, prop range and world scale are stated as numbers.
- [ ] Every material has a ramp with hex values, and total colour count is stated.
- [ ] Meshing, colour source, filtering and animation method are specified.
- [ ] At least 2 image prompts exist and name no living artists.
- [ ] At least 2 reference games are cited from the knowledge file.
- [ ] Assumptions and `UNVERIFIED` items are listed.
