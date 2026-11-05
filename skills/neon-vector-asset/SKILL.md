---
name: neon-vector-asset
description: Build one neon line-art game asset as layered SVG code, then export PNGs at 1x/2x/3x with a spec manifest. Use for glow sprites, neon icons, HUD frames.
owner: vector-artist
disable-model-invocation: true
argument-hint: "[asset name, on-screen px size, engine, bloom on/off]"
---

# Neon vector asset

A repeatable procedure for turning a brief into a clean neon SVG and exported PNGs.

## Inputs

- Asset name and gameplay role (player, enemy, pickup, hazard, UI).
- On-screen size in pixels at the reference resolution.
- Engine and whether bloom is on.
- Background colour and the existing palette with each colour's job.
- Scales to export (default 1x, 2x, 3x).

If missing, ask once. If still missing, assume black background, bloom off, 64 px, 1x/2x/3x, and list the assumptions in the output.

## Steps

1. Set the SVG `viewBox` to the 1x pixel size (for example `0 0 64 64`) so one unit is one pixel.
2. Choose glow method: bloom on means `core` + `halo` layers only; bloom off means add a baked `glow` layer.
3. Compute padding: baked glow radius + 2 px per side; 2 px if bloom only. Shrink the shape to fit inside the padded area, not the canvas.
4. Draw the silhouette with the fewest nodes that hold it. Target 8 to 20 nodes for a closed shape. Use `stroke-linejoin="round"` and `stroke-linecap="round"`.
5. Snap: odd stroke widths on x.5 coordinates, even widths on whole numbers.
6. Set strokes at 1x: core 2 to 3 px, halo core + 2 to 4 px at 40 to 70% opacity. Never below 2 px core at the smallest export.
7. Pick colours: core tinted toward white, halo saturated. Check the hue is not already used for another gameplay job. Avoid pure #0000FF and #FF0000 as the only signal on black.
8. For baked glow, draw the `glow` group as a wider stroke with `feGaussianBlur`, and rasterize with one fixed tool for every export.
9. Run SVGO (floatPrecision 2 to 3), then diff the 4x render against the original to catch shifted corners.
10. Export each scale from the SVG with the export commands below. Do not resize PNGs.
11. View the 1x PNG on the real background colour and at 50% zoom. If the shape loses its read, simplify or thicken and repeat from step 4.

## Output

```
Asset: <name>    Role: <gameplay job>
Base size: <W>x<H> px    Scales: 1x, 2x, 3x
Glow method: <bloom | baked>    Padding: <px>
Layers:
  core  stroke <px>  <hex>
  halo  stroke <px>  <hex> @ <opacity>
  glow  (baked only) blur stdDeviation <n>  <hex>
Node count: <n>
Palette check: <hex> luminance <value>, job <job>, no clash with <list>
Assumptions: <list or none>

<svg ...> ... </svg>

Export:
  resvg -w <W>   <name>.svg <name>.png
  resvg -w <2W>  <name>.svg <name>@2x.png
  resvg -w <3W>  <name>.svg <name>@3x.png

Handoff:
  technical-lead: <bloom threshold / emissive intensity / import settings>
  animator: <layer to pulse>
  layer-compositor: <blend mode per layer>
```

## Done when

- [ ] viewBox equals the 1x pixel size.
- [ ] Core stroke is 2 px or more at 1x, and snapped per odd/even rule.
- [ ] Node count is recorded and the closed shape is under 20 nodes, or the reason is written.
- [ ] Glow method is stated, and baked glow is not combined with bloom on the same asset.
- [ ] Padding is at least glow radius + 2 px.
- [ ] Every colour has one gameplay job and none clashes with the existing palette.
- [ ] PNGs for every scale come from the SVG, not from each other.
- [ ] The 1x PNG was checked on the real background colour.
- [ ] Assumptions and any UNVERIFIED tool flags are listed.
