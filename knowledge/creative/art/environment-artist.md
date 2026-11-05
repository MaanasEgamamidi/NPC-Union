---
title: Environment art reference
tags: [environment, tileset, autotile, parallax, modular-kit, set-dressing, performance]
sources: [https://docs.unity3d.com/Manual/Tilemap.html (UNVERIFIED), https://docs.godotengine.org/en/stable/tutorials/2d/using_tilesets.html (UNVERIFIED), https://docs.unrealengine.com/ (UNVERIFIED), https://gdcvault.com/ (UNVERIFIED)]
last_verified: 2026-11-05
---

# Environment art reference

Working tables for environment-artist. Engine setting names change between versions: check the current docs page before quoting one. Links in `sources` were not fetched in this session and are UNVERIFIED.

## Autotile schemes

| Scheme | Neighbours checked | Unique tiles | Good for | Pitfall |
|---|---|---|---|---|
| 16-tile (edge bitmask) | 4 edges | 16 | Blocky terrain, platforms, retro | No clean inner corners |
| 47-tile blob | 8, corners only when both edges set | 47 | Organic ground, cliffs, water edges | Sheet layout differs per tool |
| Corner-only (dual grid style) | 4 corners | 16 | Smooth blends with fewer tiles | Needs a half-tile offset layer |

Engine names (UNVERIFIED, check version docs): Godot 4 TileSet terrains offer "Match Corners and Sides", "Match Corners", "Match Sides"; Unity uses Rule Tile from the 2D Tilemap Extras package.

## Tile and resolution fit

| Base resolution | Scale to 1080p | 16 px tiles on screen | 32 px tiles on screen |
|---|---|---|---|
| 320x180 | 6x | 20 x 11.25 | 10 x 5.6 |
| 480x270 | 4x | 30 x 16.9 | 15 x 8.4 |
| 640x360 | 3x | 40 x 22.5 | 20 x 11.25 |

Atlas rule: 1 to 2 px extrusion per tile to stop filtering seams.

## Parallax starting values

| Layer | Scroll factor | Value (L*) guide | Saturation | Notes |
|---|---|---|---|---|
| Foreground | 1.2 to 1.5 | Darkest | Low | Under 10 to 15 percent screen coverage |
| Playfield | 1.0 | Mid to dark | Highest | Must read against player |
| Near BG | 0.5 | +20 to 30 over playfield | Medium | Shift hue toward sky |
| Mid BG | 0.25 | Lighter | Lower | Simplify shapes |
| Far BG | 0.1 | Near sky | Lowest | Silhouettes only |
| Sky | 0.0 | Lightest or gradient | Low | One texture or gradient |

## 3D modular grid

| Grid unit | Typical use | Piece examples |
|---|---|---|
| 1 m | Interior detail, trims | Railings, shelves, trim strips |
| 2 m | Interiors, dungeons | Wall 2x3 m, floor 2x2 m, door 2 m |
| 4 m | Exteriors, large halls | Wall 4x4 m, floor 4x4 m, corner 4 m |

Rules: pivot at grid corner; widths are whole multiples; test every piece against every neighbour; give doors and openings a fixed standard size.

## Set dressing density

| Layer | Purpose | Density guide |
|---|---|---|
| Hero props | Landmarks, navigation | 1 per room or per 1 to 2 screens |
| Clusters | Mid-scale interest | Groups of 3 to 5 with empty space between |
| Clutter and decals | Break repetition | Along edges and corners, not in lanes |
| Clear lane | Navigation | At least player collision width |

## Performance checklist

- [ ] One shared atlas and material per kit where possible.
- [ ] Draw calls estimated per screen or room (count unique materials).
- [ ] Average overdraw target set (about 2.5x or less on mid-range mobile is a working heuristic, UNVERIFIED as a universal number).
- [ ] Alpha cards trimmed to shape; no full-screen alpha layers without need.
- [ ] Static environment pieces batched or instanced.
- [ ] Greyscale check: player reads against every background band.

## Reference talk

- Joel Burgess and Nate Purkeypile, "Skyrim's Modular Level Design", GDC 2013. Find on GDC Vault by title; URL not checked (UNVERIFIED).
