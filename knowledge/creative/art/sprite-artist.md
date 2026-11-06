---
title: Sprite sheet reference
tags: [sprites, pixel-art, atlas, animation, import-settings]
sources: ["https://docs.unity3d.com/Manual/class-TextureImporter.html", "https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html", "https://www.aseprite.org/docs/sprite-sheet/", "https://www.codeandweb.com/texturepacker/documentation"]
last_verified: 2026-11-05
---

# Sprite sheet reference

Owner: `sprite-artist`. Check import settings against the documentation for the exact engine version in use, then test the exported sprites in the target build.

## Internal resolution and integer scaling

| Internal | x2 | x3 | x4 | x6 | x8 |
|---|---|---|---|---|---|
| 320x180 | 640x360 | 960x540 | 1280x720 | 1920x1080 | 2560x1440 |
| 384x216 | 768x432 | 1152x648 | 1536x864 | 2304x1296 | 3072x1728 |
| 480x270 | 960x540 | 1440x810 | 1920x1080 | 2880x1620 | 3840x2160 |
| 640x360 | 1280x720 | 1920x1080 | 2560x1440 | 3840x2160 | |

Rule: if a target display is not an integer multiple, letterbox to the largest integer scale instead of stretching.

## Common cell sizes

| Cell | Typical use |
|---|---|
| 8x8 | tiles, tiny pickups, bullets |
| 16x16 | small characters, enemies, items |
| 16x24, 16x32 | taller side-view characters |
| 32x32 | detailed characters, bosses at low internal resolution |
| 48x48, 64x64 | large enemies, portraits |

## Frame timing starting points

| Animation | Frames | ms per frame | Notes |
|---|---|---|---|
| Idle (breathing) | 2 to 4 | 150 to 400 | Small 1 px shifts only |
| Walk | 4 to 8 | 100 to 150 | Hold contact frames longer than passing |
| Run | 6 to 8 | 70 to 100 | Lean forward 1 px |
| Jump | 3 to 5 | per-pose, not looped | Separate rise, apex, fall |
| Attack | 3 to 6 | anticipation 150 to 250, strike 40 to 80 | Not looped |
| Hit / hurt | 1 to 3 | 60 to 120 | Often paired with a flash |
| Death | 4 to 8 | 80 to 150 | Last frame holds |

These are craft starting points, not standards. Adjust to the game's feel.

## Atlas settings

| Setting | Default | Why |
|---|---|---|
| Size | power of two, 512 or 1024 | Safe across GPUs and compression formats |
| Padding | 1 px, 2 px if sub-pixel sampling is possible | Stops neighbour bleed |
| Extrude | 1 px for tiles | Stops seams between adjacent tiles |
| Trim | off unless importer stores offsets | Keeps pivot stable |
| Rotation | off unless importer supports it | Some runtimes ignore rotated regions |
| Alpha | straight unless engine asks for premultiplied | Avoids dark fringes |

## Import settings per engine (UNVERIFIED for exact names by version)

| Engine or tool | Check for the version in use |
|---|---|
| Unity | Find the texture filtering, compression, mipmap and pixels-per-unit controls in the current manual; test the pixel camera setup. |
| Godot | Find the texture filtering, import and pixel-snapping controls in the current manual; test in the target renderer. |
| Phaser | Check the current game configuration documentation for pixel-art filtering and pixel rounding; test at target scales. |
| Aseprite export | Check the current sprite-sheet export documentation for layout, padding, trimming and metadata options. |

## Pre-export checklist

- [ ] Every pixel is in the palette (no anti-aliased stray colours).
- [ ] Transparent background, no matte colour left in edge pixels.
- [ ] Same cell size across each animation.
- [ ] Pivot on a whole pixel and identical across frames.
- [ ] Padding at least 1 px; tiles extruded.
- [ ] Nearest filtering, mipmaps off, compression lossless or off.
- [ ] Frame durations listed in ms with loop flags.
- [ ] Tested at 1x and at the largest integer scale used in the game.

## Common faults and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Blurry sprite | Bilinear filtering | Switch to nearest |
| Thin lines from neighbour frame | No padding, sub-pixel UVs | Add padding, snap positions |
| Seams in tilemap | No extrude | Extrude 1 px |
| Sprite jitters while walking | Pivot moves per frame or trim offsets lost | Fix pivot, disable trim |
| Uneven pixel widths | Non-integer scale | Integer scale with letterbox |
| Colour banding or smears | Block compression | Disable compression for pixel art |
