---
name: sprite-sheet-spec
description: Turn a short character or prop brief into a sprite sheet spec with grid, palette, frame timing, atlas packing and engine import settings.
owner: sprite-artist
disable-model-invocation: true
argument-hint: "[subject, size, animations, engine]"
---

# Sprite sheet spec

A repeatable procedure for going from a one-line brief to a spec an artist, an image model or a packer can follow without guessing.

## Inputs

- Subject and view (side, top-down, isometric).
- Target engine and version.
- Internal render resolution.
- Cell size, or the on-screen height the sprite should have.
- Animations needed and any style guide or palette.

If any are missing, ask once, in one message. If still missing, use these defaults and say so: 320x180 internal resolution, 16x16 cell, bottom-centre pivot, 6 to 8 colour palette, 1 px padding, nearest-neighbour filtering.

## Steps

1. Check the internal resolution scales by whole integers to the target displays. If not, flag it.
2. Pick the cell size. Keep one cell size per animation set, sized to the largest pose.
3. Fix the pivot as a whole-pixel coordinate inside the cell. For even widths, name the exact pixel.
4. Build the palette: list hex values with roles (outline, shadow, base, light, accent). Use 3-step ramps with hue shift.
5. List animations. For each, give frame count, per-frame duration in ms, loop flag and a one-line key-pose note.
6. Lay out the sheet: one row per animation (and per direction if needed), frame 0 on the left.
7. Plan the atlas: size (power of two by default), padding, extrude, trim on or off, rotation off unless the importer supports it.
8. Write engine import settings: nearest filtering, mipmaps off, lossless or no compression, pixels-per-unit if the engine uses it.
9. Check version-specific settings against the engine docs. Mark anything not checked as UNVERIFIED.
10. List open questions.

## Output

```markdown
# <Subject> sprite sheet

**Summary:** <cell WxH> cells, pivot (<x>, <y>), <n> colours, <engine version>, internal <WxH>.

## Grid
| Item | Value |
|---|---|
| Cell size | |
| Pivot | |
| Padding | |
| Layout | one row per animation |

## Palette
| Role | Hex |
|---|---|

## Frames
| Animation | Row | Frames | Durations (ms) | Loop | Key poses |
|---|---|---|---|---|---|

## Atlas
| Setting | Value |
|---|---|
| Size | |
| Padding | |
| Extrude | |
| Trim | |
| Rotation | |

## Engine import
- Filter:
- Mipmaps:
- Compression:
- Pixels per unit:

## Open questions and UNVERIFIED
-
```

## Done when

- [ ] Internal resolution scales by integers to each target display, or the mismatch is flagged.
- [ ] Every animation uses one cell size, and the pivot is a whole pixel shared by every frame.
- [ ] Every colour in the palette has a hex value and a role.
- [ ] Every frame has a duration in ms, and each animation has a loop flag.
- [ ] Atlas padding is at least 1 px, and trim and rotation choices are stated.
- [ ] Filtering is nearest-neighbour, mipmaps are off, and compression is lossless or off.
- [ ] Version-specific settings are sourced or marked UNVERIFIED.
