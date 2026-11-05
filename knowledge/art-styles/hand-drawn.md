---
title: Hand-drawn 2D art style (frame-by-frame, inked, sketchy)
tags: [art-style, hand-drawn, 2d, frame-by-frame, ink, cel-animation, sketchy]
sources: [https://en.wikipedia.org/wiki/Cuphead, https://en.wikipedia.org/wiki/Skullgirls, https://en.wikipedia.org/wiki/Rayman_Origins, https://en.wikipedia.org/wiki/UbiArt_Framework, https://en.wikipedia.org/wiki/Hollow_Knight, https://en.wikipedia.org/wiki/Dragon%27s_Lair_(1983_video_game), https://en.wikipedia.org/wiki/Gris_(video_game), https://en.wikipedia.org/wiki/Guacamelee!]
last_verified: 2026-11-05
---

# Hand-drawn 2D art style

Games whose characters and effects are drawn one frame at a time, usually with a visible ink or pencil line, and played back as sprite sequences rather than skeletal rigs.

## Reference games

| Game | Link | What to study |
|---|---|---|
| Cuphead (2017) | https://en.wikipedia.org/wiki/Cuphead | Animation hand-drawn, backgrounds painted in watercolour and colourized in Photoshop. Gameplay runs at 60 fps while animation runs at 24 per second (per Wikipedia). Study rubber-hose limbs, pie-cut eyes, and how film grain sits under the ink line. |
| Skullgirls (2012) | https://en.wikipedia.org/wiki/Skullgirls | Guinness World Records Gamer's Edition 2013 cites 11,515 frames for the first eight characters, about 1,439 per fighter (per Wikipedia). Study smears, anticipation frames, and how many drawings a readable fighting move needs. |
| Rayman Origins (2011) | https://en.wikipedia.org/wiki/Rayman_Origins | First game on UbiArt Framework, which lets artists import drawings into the engine; ran at 1080p and 60 fps on home consoles, 30 fps on 3DS (per Wikipedia). Study squash and stretch and loose, colored outlines. |
| Hollow Knight (2017) | https://en.wikipedia.org/wiki/Hollow_Knight | Hand-drawn sketches scanned directly into the engine (per Wikipedia). Study limited palettes per area, simple masks for faces, and thin dark line work against muted backgrounds. |
| Dragon's Lair (1983) | https://en.wikipedia.org/wiki/Dragon%27s_Lair_(1983_video_game) | LaserDisc game streaming full cel animation; the franchise page cites 22 minutes or 50,000 frames of footage. Study full-animation acting and why it limited interactivity. |
| Gris (2018) | https://en.wikipedia.org/wiki/Gris_(video_game) | Watercolor-like washes with hand-animated characters and sparse line. `UNVERIFIED`: art technique details not confirmed on the linked page. Study color introduced gradually as a progression reward. |
| Guacamelee! (2013) | https://en.wikipedia.org/wiki/Guacamelee! | Flat shapes with bold outlines and strong graphic color. `UNVERIFIED`: production technique not checked. Study a counterexample: graphic, clean shapes with minimal boil. |

## Palette rules

- Ink line is near-black with a slight warm or cool bias (for example #1A1612), not pure #000000, so it sits on paper tones.
- Base or paper tone is a desaturated light value; characters sit at higher saturation than backgrounds.
- One shadow tone per material, cut as a hard shape. No soft gradients on characters unless the whole game uses them.
- Reserve the highest saturation and contrast for the player, hazards, and pickups.
- Backgrounds: lower contrast and lighter or colored line work so characters read first.
- Keep a total working palette small enough to list in one table (roughly 16 to 32 swatches per scene is a practical starting point, a heuristic, not a measured rule).

## Shape rules

- Every character passes a silhouette test at gameplay size: fill it black, it must still read.
- Contours close; sketchy hatching and construction lines stay inside the shape.
- Pick a dominant primary shape per character type (circles for friendly, triangles for threat, squares for heavy) and repeat it in props.
- Exaggerate key poses; in-betweens can be simpler and lower detail.
- Smears and multiples replace motion blur for fast moves.

## Technical constraints

- Playback: animate on twos (12 drawings per second at 24 fps) by default; ones for fast action. Cuphead shows 24 fps animation inside a 60 fps game loop is workable.
- Memory: cost is per drawing. One 512x512 RGBA frame is 1 MB uncompressed (512 x 512 x 4 bytes). 150 drawings at that size is about 150 MB before compression, so atlas packing, trimming transparent space, and GPU compression are mandatory.
- Author at 2x or 4x the final display size and downscale with a filter tested on thin lines. Line weights must land on whole pixels at the lowest supported resolution.
- Separate line and fill layers (if the engine supports it) enable palette swaps and hit flashes without redrawing.
- Reuse: mirrored frames, held drawings, and shared cycles cut drawing counts sharply. Budget moves by drawings, not by seconds.
- Engine texture size caps and compression formats change by platform and version; confirm with the current engine documentation (`UNVERIFIED` here by design).

## Image-prompt recipe

Describe visual traits only. Never name living artists or studios.

```
2D hand-drawn game character, frame-by-frame cel animation style,
<subject and pose>, thick <warm/cool> near-black ink outline with slight
line wobble, flat <N>-tone color fills with one hard-edged shadow tone,
<palette: paper base, accent hue>, <shape language: round / angular>,
plain light background, full body, readable silhouette, no gradients,
no motion blur, no 3D rendering, no photo texture
```

Add for sketchy variants: "visible pencil construction lines inside the shape, light cross-hatching". Add for vintage cartoon variants: "1930s rubber-hose cartoon proportions, pie-cut eyes, subtle film grain".

## Common pitfalls

- Line weight set on the source canvas, then lost when downscaled.
- Bilinear filtering on tiny sprites turning lines grey and soft.
- Boil so strong it looks like a rendering bug next to static UI.
- Mixing tweened skeletal animation with frame-by-frame on the same character; the change in motion quality is obvious.
- Character and background using the same line weight and saturation, so the player gets lost.
- Budgeting by seconds of animation instead of drawings, then running out of memory or schedule.
- Adding post-process blur or bloom over clean ink.
- Generated images with inconsistent line weight between frames; always redraw or trace over generated frames before shipping.
