---
title: Isometric and dimetric projection art style
tags: [isometric, dimetric, projection, tiles, orthographic-camera, depth-sorting, art-style]
sources: [https://en.wikipedia.org/wiki/Isometric_video_game_graphics, https://en.wikipedia.org/wiki/Isometric_projection, https://en.wikipedia.org/wiki/SimCity_2000, https://en.wikipedia.org/wiki/Diablo_II, https://en.wikipedia.org/wiki/Fallout_(video_game), https://en.wikipedia.org/wiki/Age_of_Empires_II, https://en.wikipedia.org/wiki/Final_Fantasy_Tactics, https://en.wikipedia.org/wiki/Monument_Valley_(video_game), https://en.wikipedia.org/wiki/Into_the_Breach, https://en.wikipedia.org/wiki/Hades_(video_game)]
last_verified: 2026-11-05
---

# Isometric and dimetric projection

Owner: `isometric-stylist`. Used by the `isometric-style-guide` skill.

Link check: every Wikipedia link below returned HTTP 200 on 2026-11-05. The "what to study" notes are study prompts, not claims about each studio's internal tools.

## Reference games

| Game | Link | What to study |
| --- | --- | --- |
| SimCity 2000 (1993) | https://en.wikipedia.org/wiki/SimCity_2000 | Dimetric city tiles, terrain height levels on a grid, how buildings of many sizes share one footprint system. |
| Fallout (1997) | https://en.wikipedia.org/wiki/Fallout_(video_game) | Interior views where walls and roofs hide or cut away, characters read clearly against busy ground. |
| Diablo II (2000) | https://en.wikipedia.org/wiki/Diablo_II | Sprite characters in many facing directions, dark value range, lighting radius around the player, walls fading when the player is behind them. |
| Age of Empires II (1999) | https://en.wikipedia.org/wiki/Age_of_Empires_II | Large multi-tile buildings sorting correctly with units, team color areas on sprites, readability of many small units at once. |
| Final Fantasy Tactics (1997) | https://en.wikipedia.org/wiki/Final_Fantasy_Tactics | 3D isometric battle maps with a rotatable camera, sprite characters on 3D terrain, tile height as a gameplay value. |
| Monument Valley (2014) | https://en.wikipedia.org/wiki/Monument_Valley_(video_game) | Flat-shaded 3D with an orthographic camera, impossible geometry that only works because there is no perspective, strict face value steps. |
| Into the Breach (2018) | https://en.wikipedia.org/wiki/Into_the_Breach | Small 8x8 pixel-art tactics grid, every tile readable at a glance, threat and preview overlays layered on the projection. |
| Hades (2020) | https://en.wikipedia.org/wiki/Hades_(video_game) | Painted isometric action rooms, strong silhouettes and rim light so fast combat reads at a fixed high camera. |

## Palette rules

- Assign fixed value steps per face: top lightest, the face toward the light one step darker, the face away from the light two steps darker. Keep these steps the same on every material.
- Keep floor values in a narrower, lower-contrast band than characters and interactables, so the actors pop off the grid.
- Reserve the highest saturation for things the player acts on (units, pickups, hazards).
- Avoid soft gradients across a whole tile; they show seams when tiled. Use flat faces or small repeating texture.
- Pick team or faction colors that survive on all three face values; check them on the darkest face.

## Shape rules

- Pixel art: only 2:1 lines (2 across, 1 up), 1:1 lines used sparingly, and verticals. No free angles.
- Every object fits the footprint grid; heights use one height unit.
- Silhouettes should read from the fixed camera angle. Test characters as solid black shapes at game scale.
- Put key details on the camera-facing faces; details on back faces are usually hidden.
- For 3D, bevel or outline edges where two faces of similar value meet, or the form flattens.

## Technical constraints

- Reference: https://en.wikipedia.org/wiki/Isometric_video_game_graphics and https://en.wikipedia.org/wiki/Isometric_projection.
- True isometric: 30 degree lines, 3D camera yaw 45 degrees, pitch about 35.264 degrees.
- 2:1 dimetric: about 26.565 degree lines (atan 0.5), 3D camera yaw 45 degrees, pitch 30 degrees. Most pixel games called "isometric" use this.
- Common 2:1 footprints: 32x16, 64x32, 128x64. Decide whether diamond edges overlap or abut and whether to trim 1 px.
- Height unit: one value for every level of height, often half the footprint width.
- Depth sorting: screen Y by foot point for small sprites; slice large objects per tile or sort by the back-most tile's (x + y); add a z term for stacked layers.
- Occlusion: cutaway walls, fade, or silhouette through walls. Each needs different wall and roof art.
- Facings: 4 diagonal facings can be mirrored to 2 drawn sets for symmetric designs; 8 facings double the art.
- Camera rotation in 2D needs 4 views of each prop; plan it before the art budget.
- UI stays screen-aligned, not skewed into the projection.
- Engine isometric tilemap and sorting settings change between versions: `UNVERIFIED` until checked against the current engine documentation for the project.

## Image-prompt recipe

Describe visual traits only. Never name living artists.

```
isometric game scene, 2:1 dimetric projection, orthographic view, no perspective,
<pixel art at <W>x<H> tile grid | flat-shaded 3D render>,
light from the upper-left, top faces lightest, left faces mid value, right faces darkest,
<palette words: e.g. muted greens and warm browns, high-saturation accent on characters>,
clean <2:1 stepped | crisp> edges, <dark outline | no outline>,
<subject: e.g. small farmhouse on a grass plot with a fence and a path>,
characters small relative to buildings, readable silhouettes, plain background
```

Negative words: perspective, vanishing point, fisheye, tilted horizon, soft gradient tiles, blurry edges.

Generated images are drafts. Check the angle with a 2:1 overlay before using any image as a reference; generators often drift toward perspective.

## Common pitfalls

- Calling 2:1 art "30 degrees" and setting the 3D camera to match the wrong angle.
- Mixing a 3D camera at pitch 35.264 with 2:1 pixel tiles; the grid will not line up.
- Sorting by sprite center instead of foot point, causing characters to pop in front of walls.
- Large buildings as one sprite with one sort key, causing units to draw on top of the far side.
- Deciding on occlusion after walls are drawn, forcing a redraw.
- Choosing 8 facings without budgeting the extra frames.
- Tiles with gradients or lighting baked across edges, causing visible seams.
- Skewing UI text into the projection.
