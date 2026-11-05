---
title: Voxel art style reference
tags: [art-style, voxel, 3d, low-res, magicavoxel]
sources: [https://en.wikipedia.org/wiki/Voxel, https://en.wikipedia.org/wiki/Minecraft, https://en.wikipedia.org/wiki/Teardown_(video_game), https://en.wikipedia.org/wiki/Cube_World, https://en.wikipedia.org/wiki/3D_Dot_Game_Heroes, https://en.wikipedia.org/wiki/Crossy_Road, https://en.wikipedia.org/wiki/Voxatron, https://en.wikipedia.org/wiki/Dragon_Quest_Builders, https://ephtracy.github.io/, https://0fps.net/2012/06/30/meshing-in-a-minecraft-game/, https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/]
last_verified: 2026-11-05
---

# Voxel art

Voxel art builds images and models from cubes on a regular 3D grid. The look depends on one decision above all: how many voxels make up a character, and whether the cubes are meant to read as visible bricks or as fine sculptural grain.

## Reference games

All links below returned HTTP 200 on 2026-11-05. Notes on what to study are from general knowledge; specific numbers are flagged where not checked against a primary source.

| Game | Link | What to study |
| --- | --- | --- |
| Minecraft | https://en.wikipedia.org/wiki/Minecraft | 1 block per metre world grid with flat 16x16 pixel textures on each face. Shows how texture detail, not geometry, carries material identity. |
| Teardown | https://en.wikipedia.org/wiki/Teardown_(video_game) | Small voxels (around 10 cm, `UNVERIFIED`) with fully destructible scenes, path-traced style lighting, reflections and fog. Study how lighting makes tiny cubes read as real materials. |
| Cube World | https://en.wikipedia.org/wiki/Cube_World | Untextured flat-colour voxels, soft gradients across terrain, round chunky characters. Study colour-per-voxel shading without textures. |
| 3D Dot Game Heroes | https://en.wikipedia.org/wiki/3D_Dot_Game_Heroes | 8-bit sprites extruded into 3D blocks. Study the sprite-to-voxel translation and toy-diorama camera. |
| Crossy Road | https://en.wikipedia.org/wiki/Crossy_Road | Very low voxel counts per character, bright flat palette, fixed isometric-ish camera. Study silhouette readability at phone size. |
| Voxatron | https://en.wikipedia.org/wiki/Voxatron | A fixed voxel "display" (128x128x64, `UNVERIFIED`) with a limited palette. Study hard constraints as a style. |
| Dragon Quest Builders | https://en.wikipedia.org/wiki/Dragon_Quest_Builders | Block world combined with smooth, non-voxel characters. Study the hybrid choice and where it helps character appeal. |

## Palette rules

1. Colour lives per voxel. Pick a palette first (MagicaVoxel uses a 256-slot palette) and forbid off-palette colours.
2. Use 3 to 5 values per material ramp: highlight, base, shadow, and an optional deep shadow. More than that turns into noise at low resolution.
3. Hue-shift ramps: shadows lean cooler, highlights warmer. Pure black or white voxels look like holes or glare.
4. Reserve the highest saturation for gameplay-critical things (pickups, hazards, the player). Terrain sits 20 to 40 percent lower in saturation.
5. If the engine adds AO and lighting, keep painted shading subtle or it doubles up and looks muddy.
6. Dither between two palette colours on large flat faces (grass, walls) to break up the plastic look; never dither on small characters.

## Shape rules

1. Decide the voxel budget per character first (for example 8 to 16 voxels tall for a toy look, 32+ for a detailed look) and keep every asset on the same grid.
2. Never mix voxel sizes in one scene unless it is a deliberate rule (for example, props at half scale). Mixed grids are the most common tell of an inconsistent kit.
3. Eyes and key features should be at least 1 full voxel; a 1-voxel feature placed off-centre on an even-width face looks lopsided, so pick odd widths for faces.
4. Diagonals are staircases. Use 1:1, 1:2 or 2:1 steps consistently; irregular steps look like errors.
5. Silhouette first: check the model as a flat black shape from the game camera before adding colour.
6. Exaggerate: oversized heads, hands and tools read better than realistic proportions at low counts.

## Technical constraints

- Tools: MagicaVoxel (https://ephtracy.github.io/) is free and exports .vox, OBJ and PLY. Other tools such as Qubicle and Goxel exist (`UNVERIFIED` for current status and features).
- Meshing: naive per-cube meshes waste triangles. Cull hidden faces, then use greedy meshing to merge coplanar faces (see https://0fps.net/2012/06/30/meshing-in-a-minecraft-game/). Greedy meshing with per-voxel colour needs vertex colour or a palette texture, or merged quads will smear colour.
- Ambient occlusion: per-vertex voxel AO from the 3 neighbours of each corner is cheap and gives the classic soft-corner look (see https://0fps.net/2013/07/03/ambient-occlusion-for-minecraft-like-worlds/). Flip quad triangulation based on AO values to avoid anisotropy artefacts.
- Texturing: use a 256x1 palette texture with point (nearest) filtering and no mipmaps on the palette, or colours bleed.
- Animation: voxel characters are usually split into rigid parts (head, body, limbs) and animated by transform, or swapped per frame like sprites. Skinning bends cubes and breaks the look.
- Scale: set world units per voxel once (for example 1 voxel = 1/16 unit) and lock the import scale in the engine.

## Image-prompt recipe

Describe visual traits only. Do not name living artists.

> isometric voxel art diorama, [subject], built from small uniform cubes, clearly visible cube edges, flat colours per cube, soft ambient occlusion in corners, limited palette of [N] colours: [hex list], warm key light from upper left, cool shadow, clean background [colour], toy-like chunky proportions, orthographic camera, no textures, no outlines

Add a voxel count hint ("character about 16 cubes tall") and negative terms for smooth surfaces, bevels, blur, and photo noise. Image models often produce inconsistent cube sizes; regenerate or correct in MagicaVoxel rather than accepting mixed grids.

## Common pitfalls

- Mixed voxel scales across assets in one scene.
- Smooth-shaded normals or bevels that hide the cube edges.
- Linear texture filtering blurring palette colours together.
- Painted shading plus engine AO, giving muddy double shadows.
- Single-voxel noise on characters, which flickers in motion.
- Too many palette colours, losing the graphic quality.
- Image-model output passed as final art without a grid check.
