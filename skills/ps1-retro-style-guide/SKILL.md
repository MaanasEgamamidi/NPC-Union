---
name: ps1-retro-style-guide
description: Produces a PS1-era retro 3D style sheet for a project, with render settings, budgets, palette, fog, and prompts. Use when a game needs a defined PS1 look.
owner: ps1-retro-stylist
disable-model-invocation: true
argument-hint: "[project name, engine, camera type, mood, fidelity tier]"
---

# PS1 retro style guide

A repeatable procedure that turns a project brief into a PS1-era style sheet the shader and tech-art teams can build from.

## Inputs

- Project name and genre.
- Engine and target platform.
- Camera: fixed, third person, or first person.
- Mood in three words.
- Fidelity tier: faithful (emulate hardware limits), homage (keep the readable artifacts, soften the harsh ones), or hint (texture and palette only).
- Any reference games the team already likes.

If something is missing, ask once: "Which camera, which engine, and how much wobble can your players take?" If the user cannot answer, default to homage tier and say so.

## Steps

1. Read `knowledge/art-styles/ps1-retro.md` and pick two or three reference games that match the camera and mood.
2. Set render settings: internal resolution (320x240 by default, 256x224 or 640x480 only with a reason), nearest-neighbor upscale, 15-bit color quantize, 4x4 ordered dither on or off.
3. Set vertex snapping: grid equal to internal resolution. For first-person, exclude viewmodels. For homage tier, exclude the player character.
4. Set texture rules: sizes per asset class (64x64 props, 128x128 characters and walls, 256x256 hero surfaces at most), 4-bit or 8-bit palettes, nearest filter, no mipmaps.
5. Set affine warp: on for faithful; on with tessellation of near-camera surfaces for homage; off for hint.
6. Set lighting: vertex or flat only, vertex colors for baked light, no normal or specular maps.
7. Set fog: start and end distance in meters and a fog color sampled from the palette.
8. Set polygon budgets per asset class and mark them as targets, not hardware facts.
9. Write palette rules and shape rules from the knowledge file, adapted to the mood.
10. List artifacts to keep and artifacts to suppress (for example z-fighting on the player, jitter on UI).
11. Write two or three image prompts using the recipe in the knowledge file. Describe visual traits only; never name living artists.
12. Mark every number you could not verify as UNVERIFIED.

## Output

```markdown
# <Project> PS1 style sheet

Fidelity tier: <faithful | homage | hint>
References: <game 1>, <game 2>, <game 3>

## Render settings
| Setting | Value |
|---|---|
| Internal resolution | 320x240 |
| Upscale | nearest |
| Color depth | 15-bit |
| Dither | 4x4 ordered, on |
| Vertex snap grid | 320x240, excludes: <list> |
| Affine warp | <on / on with tessellation / off> |
| Texture filter | nearest, no mipmaps |
| Fog | <start> m to <end> m, color <hex> |

## Budgets
| Asset class | Texture size | Palette | Triangles (target) |
|---|---|---|---|

## Palette rules
- ...

## Shape rules
- ...

## Lighting
- ...

## Artifacts
Keep: ...
Suppress: ...

## Image prompts
1. ...
2. ...

## Open questions and UNVERIFIED items
- ...
```

## Done when

- [ ] Every row of the render settings table has a value.
- [ ] Budgets cover characters, props, and environment.
- [ ] Fog has numeric start, end, and color.
- [ ] Artifacts to keep and suppress are both listed.
- [ ] At least two references come from the knowledge file.
- [ ] Prompts describe traits only and name no living artist.
- [ ] Unchecked numbers are marked UNVERIFIED.
