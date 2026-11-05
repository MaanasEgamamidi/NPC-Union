---
title: Layer compositing reference for game layer splits
tags: [layers, alpha, matting, parallax, inpainting, manifest, export]
sources: [https://en.wikipedia.org/wiki/Alpha_compositing, https://docs.godotengine.org/en/stable/classes/class_parallax2d.html, https://docs.unity3d.com/Manual/class-TextureImporter.html, https://docs.krita.org/]
last_verified: 2026-11-05
---

# Layer compositing reference

All sources above are UNVERIFIED in this session (not fetched). Engine setting names change between versions; check the version selector on each doc page before quoting one.

## Alpha conventions

| Convention | Stored RGB | Over operation | Wrong-pipeline symptom |
|---|---|---|---|
| Straight (unassociated) | Full colour, independent of alpha | `out = src * a + dst * (1 - a)` | Treated as premultiplied: bright, over-saturated edges |
| Premultiplied (associated) | Colour already multiplied by alpha | `out = src + dst * (1 - a)` | Treated as straight: dark fringes |

Source for formulas: Alpha compositing (Wikipedia), UNVERIFIED.

PNG stores straight alpha. Convert to premultiplied only at the point the engine or shader expects it.

## Halo and fringe causes

| Symptom | Usual cause | Fix |
|---|---|---|
| Light or dark outline after cutout | Old background colour baked into edge pixels | Decontaminate edge colour, bleed interior RGB outward 2 to 8 px |
| Black border when scaled or mipmapped | Transparent texels have black RGB and get filtered in | Dilate RGB into fully transparent area, keep alpha unchanged |
| Edge goes harder or softer after import | Mask saved or imported with sRGB gamma | Store masks as linear, non-colour data |
| Shimmering stair edges on pixel art | Soft anti-aliased matte | Binary alpha, threshold at 50 percent |
| Lost hair and fur detail | Mask choked to hide halo | Trimap matte, fix colour instead of shrinking mask |

## Cut type by material

| Material | Cut | Notes |
|---|---|---|
| Hard props, architecture, UI | Hard vector or path | Snap UI to whole pixels |
| Hair, fur, foliage edges | Trimap matte | Unknown band roughly 4 to 20 px at 1080p |
| Smoke, glass, glow | Separate additive or screen layer | Do not matte against background |
| Pixel art | Binary alpha | No feathering |

## Parallax margin math

- Relative slide between two planes over a camera move: `abs(scroll_front - scroll_back) x travel_px`.
- Inpaint the back plane that far past each front silhouette on the trailing side, plus about 8 px for filtering.
- If the camera starts centred and moves both ways, split the margin across both sides.
- Planes with scroll factor below 1.0 need canvas width of at least `screen_w + scroll x travel_px` unless they tile.

Godot 4 exposes per-layer scroll scale through [Parallax2D](https://docs.godotengine.org/en/stable/classes/class_parallax2d.html), introduced in [4.3](https://godotengine.org/article/parallax-progress-report/); older projects use ParallaxBackground and ParallaxLayer.

## Shadows, AO and spill

| Effect | Belongs to |
|---|---|
| Contact shadow under moving object | Object or separate multiply shadow layer |
| Ambient occlusion in crevices of static scene | Background |
| Colour bounce from a removed object | Paint out of background |
| Cast light from an effect (torch glow) | Separate additive layer so it can flicker |

## Naming scheme

`NN_band_object_variant`, two-digit z first, lower case, underscores. Bands: `sky`, `far`, `mid`, `play`, `fg`, `ui`. Example: `02_mid_tree_oak_a`, `04_play_fox_shadow`.

## Manifest fields

| Field | Type | Why |
|---|---|---|
| name | string | Matches file stem |
| file | string | Relative path |
| offset | [x, y] px | Position in original canvas after trimming padding |
| size | [w, h] px | Trimmed size |
| z | int | Draw order |
| scroll | float | Parallax factor, 1.0 = gameplay |
| blend | string | normal, multiply, add, screen |
| tile | bool | Wraps horizontally |
| nine_slice | [l, r, t, b] or null | UI stretch margins |
| pivot | [x, y] or null | For animated parts |

## Export checklist

- [ ] PNG, straight alpha, sRGB for colour layers
- [ ] Masks and depth maps linear, single channel where possible
- [ ] RGB bled under transparent pixels
- [ ] Transparent padding trimmed, offset recorded
- [ ] Tiling planes checked at 1:1 across the seam
- [ ] Composite over magenta and over black, 100 and 200 percent zoom
- [ ] Rebuild from manifest matches source within 1 px
- [ ] Engine import settings checked against current docs (Unity Texture Importer, Godot import dock), UNVERIFIED names flagged
