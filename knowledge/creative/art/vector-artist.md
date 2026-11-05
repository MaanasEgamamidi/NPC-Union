---
title: Neon vector art for games
tags: [vector, svg, neon, glow, bloom, export, palette]
sources: [https://www.w3.org/TR/SVG2/, https://github.com/svg/svgo, https://github.com/linebender/resvg, https://inkscape.org/doc/inkscape-man.html, https://docs.godotengine.org/en/stable/tutorials/3d/environment_and_post_processing.html]
last_verified: 2026-11-05
---

# Neon vector art for games

All source links below are UNVERIFIED (not fetched in this session). Check tool flags against the installed version before quoting them.

## Stroke width at target resolution

| Shipped size (1x) | Core stroke | Halo stroke | Notes |
|---|---|---|---|
| 16 to 24 px icon | 2 px | 4 px | Skip halo if bloom is on; keep 2 px minimum |
| 32 to 48 px sprite | 2 to 3 px | 5 to 6 px | 3 px on x.5 coordinates |
| 64 to 128 px sprite | 3 to 4 px | 6 to 8 px | Room for a notch or inner detail line |
| HUD frame lines | 2 px | 4 px | Keep identical across all panels |

- Author with viewBox = 1x pixel size, so 1 unit = 1 px.
- Odd widths on half-pixel coordinates, even widths on whole numbers.
- `vector-effect="non-scaling-stroke"` matters only where SVG is rendered at runtime (SVG 2 spec).

## Bloom vs baked glow

| | Engine bloom | Baked glow |
|---|---|---|
| Runtime cost | Full-screen post pass | None beyond the sprite |
| Scales with zoom/resolution | Yes | No, radius fixed in pixels |
| Atlas space | Small sprites | Larger sprites + padding |
| Control | Global, threshold based | Per asset |
| Pitfall | Low threshold blooms UI and background | Doubles up if bloom also on |

- With HDR bloom, emissive colour above 1.0 and threshold near 1.0 isolates neon. Parameter names differ by engine and version: check Unity URP Bloom and Godot Environment glow docs for the version in use.
- Baked glow padding: glow radius + 2 px per side, same gap between atlas entries.

## Palette on dark backgrounds

| Colour | Approx. relative luminance | Use |
|---|---|---|
| #0000FF pure blue | ~0.07 | Avoid as sole signal |
| #FF0000 pure red | ~0.21 | Pair with a lighter core |
| #00E5FF cyan | ~0.63 | Strong neon blue substitute |
| #00FF00 pure green | ~0.72 | Bright, watch red/green colour blindness |
| #FFFF00 yellow | ~0.93 | Hottest read, use sparingly |

(Luminance values computed from the WCAG relative luminance formula; round numbers.)

- 4 to 6 hues, one gameplay job each.
- Core tinted toward white, colour in the halo.
- Do not separate player and enemy by red vs green alone.

## Path simplification checklist

- [ ] Closed shape 8 to 20 nodes.
- [ ] No overlapping duplicate nodes or zero-length segments.
- [ ] SVGO floatPrecision 2 to 3; diff a 4x render after.
- [ ] Round joins and caps for neon; avoid sharp miters that bloom into hot spots.
- [ ] Remove editor metadata and hidden layers.

## Export commands (check flags for installed version)

| Tool | Command | Status |
|---|---|---|
| resvg | `resvg -w 128 in.svg out@2x.png` | UNVERIFIED |
| Inkscape 1.x | `inkscape in.svg --export-type=png --export-filename=out@2x.png --export-width=128` | UNVERIFIED |
| SVGO | `svgo in.svg -o out.svg` | UNVERIFIED |

- Export every scale from the SVG; never resize a PNG.
- Naming: `name.png`, `name@2x.png`, `name@3x.png`.
- Use premultiplied alpha or edge bleed to avoid dark fringes on soft glows.
- Use one rasterizer for all blur filters; blur extents differ between renderers.

## Reference games

- Geometry Wars: Retro Evolved (Bizarre Creations, 2005, Xbox Live Arcade): neon vector shapes on black, colour tied to enemy type.
- Tempest (Atari, 1981): arcade vector display, the origin of the glowing line look.
