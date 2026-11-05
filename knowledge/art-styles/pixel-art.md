---
title: Pixel art style reference
tags: [art-style, pixel-art, 2d, palette, sprites, retro]
sources: [https://en.wikipedia.org/wiki/Pixel_art, https://en.wikipedia.org/wiki/Celeste_(video_game), https://en.wikipedia.org/wiki/Shovel_Knight, https://en.wikipedia.org/wiki/Stardew_Valley, https://en.wikipedia.org/wiki/Hyper_Light_Drifter, https://en.wikipedia.org/wiki/Owlboy, https://en.wikipedia.org/wiki/Dead_Cells, https://en.wikipedia.org/wiki/Eastward_(video_game), https://en.wikipedia.org/wiki/Blasphemous_(video_game), https://lospec.com/palette-list, https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html, https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html]
last_verified: 2026-11-05
---

# Pixel art

Pixel art is digital art made and edited at the level of single pixels, displayed at a scale where each pixel is a visible, deliberate unit. All links below returned HTTP 200 on 2026-11-05. Specific numbers about individual games are marked `UNVERIFIED` where they were not checked against the source.

## Reference games

| Game | Link | What to study |
|---|---|---|
| Celeste (2018) | https://en.wikipedia.org/wiki/Celeste_(video_game) | Tiny player sprite that still reads clearly; hair color as a state signal; screen shake and particles that stay on the pixel grid. Internal resolution of 320x180 is `UNVERIFIED`. |
| Shovel Knight (2014) | https://en.wikipedia.org/wiki/Shovel_Knight | An NES-inspired look with small palettes per sprite and strong silhouettes. Which NES limits it kept and which it broke (widescreen, extra colors) is `UNVERIFIED` here; check the developer's own posts. |
| Stardew Valley (2016) | https://en.wikipedia.org/wiki/Stardew_Valley | Top-down tiles on a 16 pixel grid (`UNVERIFIED`), warm seasonal palettes, readable crops and items at small size, a full game drawn by one person. |
| Hyper Light Drifter (2016) | https://en.wikipedia.org/wiki/Hyper_Light_Drifter | Limited, saturated pinks, teals, and purples; large environments with small characters; strong value contrast for combat readability. |
| Owlboy (2016) | https://en.wikipedia.org/wiki/Owlboy | Dense, hand-animated sprites with many frames, soft hue-shifted ramps, layered parallax backgrounds. |
| Dead Cells (2018) | https://en.wikipedia.org/wiki/Dead_Cells | A pipeline where 3D models are rendered out as pixel-look sprites (`UNVERIFIED` detail; check developer talks). Study fast, readable attack frames. |
| Eastward (2021) | https://en.wikipedia.org/wiki/Eastward_(video_game) | Highly detailed top-down environments combined with modern lighting effects while keeping a pixel look. |
| Blasphemous (2019) | https://en.wikipedia.org/wiki/Blasphemous_(video_game) | Dark, high-contrast palette with gold and red accents; large, detailed character sprites and death animations. |

## Palette rules

- Start from a fixed palette. The Lospec palette list (https://lospec.com/palette-list) catalogs many by color count. 16 to 32 colors suits most projects; fewer forces a stronger look.
- Build ramps of 4 to 6 steps per material. Hue shift along the ramp: shadows cooler (toward blue or purple), highlights warmer (toward yellow), not only darker or lighter.
- Keep value contrast high between the player, enemies, and background. Test in grayscale.
- Reserve one or two saturated accent colors for interactive objects and danger.
- Share colors across materials so the palette stays small and unified.
- Record every color as a hex code in the style sheet.

## Shape rules

- One pixel size for everything: sprites, tiles, UI, text, effects. Mixed pixel sizes ("mixels") look unplanned.
- Silhouette first. A sprite should read as a single flat color at 1x.
- Clean lines step in regular runs (1-1-1, 2-2-2, 1-2-1-2). Irregular runs make jaggies.
- Remove orphan pixels and doubled pixels on curves.
- One light direction for the whole game. Avoid pillow shading (light from the center outward).
- Avoid banding: adjacent colors forming parallel stair-step lines.
- Use outlines on purpose: black for the player or key objects, colored or no outlines for backgrounds.
- Exaggerate key features (eyes, weapons, hands) because there are few pixels to show them.

## Technical constraints

- Base resolution: pick one that scales by whole numbers to target screens. 320x180 and 640x360 scale evenly to 1280x720 and 1920x1080. Screens like 1366x768 or 1280x800 need letterboxing, cropping, or a different view size.
- Integer scaling only. Non-integer scaling makes some pixels wider than others.
- Texture filtering: point or nearest neighbor. Mipmaps off. Compression off or lossless (PNG source).
- Runtime rotation and scaling break the grid. Pre-draw rotations, or render to a low resolution target and upscale it.
- Snap sprite and camera positions to whole pixels at base resolution to avoid shimmer.
- Godot: viewport stretch mode and integer scaling settings are documented at https://docs.godotengine.org/en/stable/tutorials/rendering/multiple_resolutions.html. Check the default texture filter setting name for your Godot version.
- Unity: the 2D Pixel Perfect package provides a Pixel Perfect Camera component with assets pixels per unit, reference resolution, and upscale render texture options (https://docs.unity3d.com/Packages/com.unity.2d.pixel-perfect@5.0/manual/index.html). In URP the component may differ; check the docs for your Unity version (`UNVERIFIED` for current versions).
- Sprite animation often runs at 8 to 12 frames per second while the game runs at 60. This is common practice, not a rule.

## Image prompt recipe

Describe visual traits only. Never name living artists or ask for a specific studio's look.

```
pixel art, <subject>, <camera: side view | top-down | three-quarter>,
<base resolution or sprite size, e.g. 32x32 sprite>, limited palette of <n> colors,
hue-shifted shading with cool shadows and warm highlights, light from <direction>,
<outline rule: dark colored outline | black outline | no outline>,
crisp hard pixel edges, no anti-aliasing, no blur, no gradients, no dithering (or: ordered dithering in background only),
flat <color> background, upscaled with nearest neighbor
```

Generated images often have uneven pixel sizes and soft edges. Downscale to the true grid with nearest neighbor, reduce to the project palette, then clean by hand.

## Common pitfalls

- Mixed pixel sizes between characters, UI, and effects.
- Bilinear filtering or mipmaps left on, which blurs sprites.
- Non-integer window scaling.
- Rotating or scaling sprites at runtime without planning for it.
- Too many colors, with near-duplicates that add noise.
- Pillow shading and banding.
- Detail that disappears at 1x because it was drawn while zoomed in.
- Smooth gradients or soft brushes from paint tools.
- Inconsistent light direction between characters and environments.
- Text in a smooth font next to pixel art; use a pixel font at the same pixel size.
