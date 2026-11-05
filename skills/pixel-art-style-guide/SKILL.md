---
name: pixel-art-style-guide
description: "Builds a pixel art style sheet for a project: resolution, scale, palette, sprite sizes, shading rules, engine settings, and prompt recipe."
owner: pixel-art-stylist
disable-model-invocation: true
argument-hint: "[project name, engine, target screens, camera, reference games]"
---

# Pixel art style guide

A repeatable procedure that turns a project brief into a pixel art style sheet the art and tech teams can follow.

## Inputs

- Project name and genre.
- Engine and version (for example Godot 4.x, Unity 6, GameMaker).
- Target platforms and their screen resolutions.
- Camera: side view, top down, three-quarter, or isometric.
- Two or three reference games. If missing, read `knowledge/art-styles/pixel-art.md` and offer three from it.
- Team size and pixel art experience.

If the engine or target screens are missing, ask. Do not guess them.

## Steps

1. Read `knowledge/art-styles/pixel-art.md`.
2. Pick a base resolution. List each target screen and the integer scale it gets. If a screen does not divide evenly, choose letterbox, crop, or a per-device view size, and write the choice down.
3. Set the pixel size rule: one pixel size for all art, UI, and effects. List any deliberate exceptions.
4. Set grid sizes: tile size (8, 16, 24, or 32), character height in pixels, and how many tiles fit on screen at base resolution.
5. Pick a palette. Start from a named fixed palette or build one. Record every hex code. Group colors into ramps of 4 to 6 steps per material, with hue shifting (cooler shadows, warmer highlights).
6. Set the light direction, outline rule (black, colored, or selective), and dithering rule (none, only for gradients in backgrounds, or textures).
7. Set animation rules: frames per second for sprite animation, frame counts for idle, walk, attack, and whether sub-pixel animation is used.
8. Write engine settings: point or nearest filtering, mipmaps off, compression off or lossless, integer scaling, pixel snapping, and the pixel-perfect camera or viewport setup. Look up current setting names in the engine docs and mark anything unchecked `UNVERIFIED`.
9. Write the image prompt recipe from the knowledge file, filled with this project's palette, resolution, and subject. Describe visual traits only. Never name living artists.
10. Write the do and don't list from the pitfalls in the knowledge file, picking the ones that matter for this camera and genre.
11. If image generation is available, make a test sheet (palette strip, one character at 1x and 4x, a 3x3 tile sample) and check it against the rules. If not, say the sheet is untested.

## Output

```markdown
# <Project> pixel art style sheet

## Resolution and scale
- Base resolution: <w>x<h>
| Target screen | Scale | Fit (exact, letterbox, crop) |
|---|---|---|

## Grid
- Pixel size rule: <rule and exceptions>
- Tile size: <n>x<n>
- Character size: <w>x<h>
- Tiles on screen: <cols> x <rows>

## Palette
- Source: <named palette or custom>
- Colors: <count>
| Material | Ramp (dark to light hex) |
|---|---|

## Light, outlines, dithering
- Light direction: <direction>
- Outlines: <rule>
- Dithering: <rule>

## Animation
- Sprite animation rate: <fps>
| Action | Frames |
|---|---|

## Engine settings (<engine and version>)
- Filtering: <setting>
- Mipmaps: <setting>
- Compression: <setting>
- Scaling and camera: <setting>
- Unchecked items: <list marked UNVERIFIED>

## Image prompt recipe
<filled prompt>

## Do
- ...

## Don't
- ...

## Test sheet
<link or "untested: no image generation">
```

## Done when

- [ ] Every target screen has an integer scale and a fit choice.
- [ ] One pixel size rule is stated, with exceptions listed.
- [ ] Every palette color has a hex code and belongs to a ramp.
- [ ] Light direction, outline, and dithering rules are stated.
- [ ] Animation rate and frame counts are listed.
- [ ] Engine settings are listed and unchecked ones are marked `UNVERIFIED`.
- [ ] The prompt recipe names no living artist.
- [ ] The test sheet is attached or the guide says it is untested.
