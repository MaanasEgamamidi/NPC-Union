---
title: PS1-era retro 3D
tags: [art-style, ps1, retro-3d, low-poly, dithering, affine-mapping, vertex-snapping]
sources: [https://en.wikipedia.org/wiki/PlayStation_technical_specifications, https://en.wikipedia.org/wiki/Texture_mapping, https://en.wikipedia.org/wiki/Ordered_dithering, https://en.wikipedia.org/wiki/Silent_Hill_(video_game), https://en.wikipedia.org/wiki/Metal_Gear_Solid_(1998_video_game), https://en.wikipedia.org/wiki/Resident_Evil_2, https://en.wikipedia.org/wiki/Spyro_the_Dragon_(video_game), https://en.wikipedia.org/wiki/Crash_Bandicoot_(video_game), https://en.wikipedia.org/wiki/Signalis, https://en.wikipedia.org/wiki/Dusk_(video_game), https://en.wikipedia.org/wiki/Haunted_PS1]
last_verified: 2026-11-05
---

# PS1-era retro 3D

Low-polygon 3D with warping textures, jittering vertices, low-resolution nearest-sampled textures, and dithered 15-bit color, as produced by the original Sony PlayStation (1994) and recreated by modern homages.

## Reference games

Original PS1 titles:

1. **Silent Hill** (1999). https://en.wikipedia.org/wiki/Silent_Hill_(video_game). Study fog and darkness as both a draw-distance budget and the core mood; a flashlight cone that defines what you see.
2. **Metal Gear Solid** (1998). https://en.wikipedia.org/wiki/Metal_Gear_Solid_(1998_video_game). Study faceless low-poly characters that still read through silhouette and animation, and cool industrial palettes.
3. **Resident Evil 2** (1998). https://en.wikipedia.org/wiki/Resident_Evil_2. Study real-time 3D characters over pre-rendered backgrounds with fixed cameras, and how lighting on characters is matched to painted backdrops.
4. **Spyro the Dragon** (1998). https://en.wikipedia.org/wiki/Spyro_the_Dragon_(video_game). Study saturated vertex-colored skies and terrain, and long sight lines faked with low-detail distant geometry.
5. **Crash Bandicoot** (1996). https://en.wikipedia.org/wiki/Crash_Bandicoot_(video_game). Study bright vertex-shaded characters with few textures, and corridor level design that controls the camera and polygon count.

Modern homages:

6. **Signalis** (2022). https://en.wikipedia.org/wiki/Signalis. Study a strict limited palette (deep reds, cold grays) and low-res 3D mixed with sharp 2D UI.
7. **Dusk** (2018). https://en.wikipedia.org/wiki/Dusk_(video_game). Study first-person readability with chunky textures and nearest filtering; how it keeps enemies legible at low resolution.
8. **Haunted PS1** collective. https://en.wikipedia.org/wiki/Haunted_PS1. Study the indie horror community's shared conventions: dither, vertex jitter, small framebuffers, fog.

## Palette rules

- Quantize final output to 15-bit color (32 levels per channel) and apply a 4x4 ordered dither before quantizing. Gradients should show visible dither patterns, not smooth bands.
- Per texture, pick a 16-color (4-bit CLUT) or 256-color (8-bit CLUT) palette. Small props and characters favor 16 colors.
- Push one dominant hue family per area (fog color, ambient, and texture tints agree). Signalis and Silent Hill both lean on one or two hues.
- Avoid pure black shadows in lit scenes; vertex lighting rarely reached zero. Reserve true black for voids.
- Saturation is a choice per project: bright and saturated (Spyro, Crash) or desaturated and murky (Silent Hill). Do not mix both in one level.

## Shape rules

- Faceted silhouettes: visible polygon edges on rounded forms are part of the look. Do not smooth-shade them away.
- Characters: simplified faces, often texture-painted features on flat planes; hands as mitts or few-finger blocks.
- Environments: boxy rooms, large flat quads with tiled textures, floors subdivided where the camera gets close.
- Detail lives in the texture, not the geometry: painted-on panel lines, windows, and wear.
- Keep scale chunky: thin details below one texel or one pixel at 320x240 disappear or shimmer.

## Technical constraints

Source: https://en.wikipedia.org/wiki/PlayStation_technical_specifications (checked 2026-11-05).

- Resolution: progressive 256x224 to 640x240; interlaced up to 640x512. 320x240 is the usual 3D target (common practice, not a hardware rule).
- Color: up to 24-bit output; texture modes are 4-bit CLUT, 8-bit CLUT, 15-bit direct, and 24-bit. The GPU supports dithering and fog per the spec page. That 3D rendering was typically 15-bit with dither while 24-bit was used mainly for FMV and stills is common knowledge (UNVERIFIED on the spec page).
- Texture and sprite size: 256x256 maximum per the spec page; textures are addressed from 256x256 texture pages in VRAM.
- VRAM: 1 MB shared between framebuffer and textures; main RAM 2 MB (UNVERIFIED in this check; confirm on the spec page).
- No perspective-correct texture mapping: UVs are interpolated affinely in screen space, so textures warp on large or angled polygons. See https://en.wikipedia.org/wiki/Texture_mapping (affine texture mapping section).
- No z-buffer: primitives are sorted with ordering tables by approximate depth, causing popping and sorting errors at intersections (UNVERIFIED on the spec page; widely documented in homebrew material).
- No sub-pixel vertex precision and fixed-point geometry math on the GTE coprocessor: vertices snap to whole pixels and jitter as they move (UNVERIFIED on the spec page).
- No mipmapping and no bilinear texture filtering: nearest sampling only (UNVERIFIED on the spec page).
- Lighting: flat or Gouraud (per-vertex) shading; no per-pixel lighting.

## Image-prompt recipe

Describe traits only. Never name living artists.

Template:
"Low-poly 3D render in the style of a 1990s home console game, [subject], [setting]. Faceted polygon silhouettes, visible triangle edges, 64x64 pixel textures with nearest-neighbor sampling, slightly warped textures on large surfaces, 4x4 ordered dithering visible in gradients, 15-bit color, rendered at 320x240 and upscaled with hard pixel edges, per-vertex lighting with no specular highlights, [fog color] distance fog fading the background, [palette: two or three hue words]."

Negative traits to add when the tool supports them: smooth shading, high-resolution textures, bloom, depth of field, ray-traced reflections, anti-aliasing, normal-mapped detail.

## Common pitfalls

- Bilinear upscale of the low-res framebuffer. It blurs the pixels and the dither; always use nearest.
- Vertex snapping to a grid finer than the framebuffer, or in world space instead of screen space. It reads as a bug.
- Jitter on UI, the first-person viewmodel, or the player character in third person. It causes discomfort and adds nothing.
- Affine warp on huge near-camera floors with no tessellation. Original games subdivided these; untreated, the warp is far stronger than real PS1 footage.
- High-res textures with a pixel filter on top. Texel density must actually be low (64 to 128 px for most assets).
- Normal maps, PBR specular, and screen-space effects. They break the period look immediately.
- Fog fading to black everywhere. Pick a fog color from the area palette.
- Mixing pixel scales: UI at native resolution next to a 320x240 scene can be intentional (Signalis), but decide it on purpose.
