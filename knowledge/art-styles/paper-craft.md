---
title: Papercraft and cutout art style
tags: [art-style, papercraft, cutout, cardboard, felt, craft, diorama]
sources: [https://en.wikipedia.org/wiki/Tearaway_(video_game), https://en.wikipedia.org/wiki/Paper_Mario:_The_Origami_King, https://en.wikipedia.org/wiki/Yoshi%27s_Crafted_World, https://en.wikipedia.org/wiki/Kirby%27s_Epic_Yarn, https://en.wikipedia.org/wiki/LittleBigPlanet_(2008_video_game), https://en.wikipedia.org/wiki/Paper_Mario_(video_game), https://en.wikipedia.org/wiki/Lumino_City]
last_verified: 2026-11-05
---

# Papercraft and cutout art style

Worlds that look built by hand from paper, card stock, cardboard, felt, yarn and other craft materials. The look depends on physical cues: visible edges, folds, fibre texture, soft contact shadows and a small, tabletop sense of scale. All links below returned HTTP 200 on 2026-11-05; details marked `UNVERIFIED` were not checked against the page text.

## Reference games

| Game | Link | What to study |
|---|---|---|
| Paper Mario (2000, Intelligent Systems) | https://en.wikipedia.org/wiki/Paper_Mario_(video_game) | Flat 2D paper characters placed in a 3D world; how a character turns by flipping like a sheet. |
| Paper Mario: The Origami King (2020, Intelligent Systems) | https://en.wikipedia.org/wiki/Paper_Mario:_The_Origami_King | Contrast between flat paper characters and folded origami enemies; crease shading; cardboard props and tape as world detail. |
| Tearaway (2013, Media Molecule) | https://en.wikipedia.org/wiki/Tearaway_(video_game) | A whole world folded from coloured paper; fold lines, simple low-poly paper shapes, and paper that crumples and unfolds in animation. |
| Yoshi's Crafted World (2019, Good-Feel) | https://en.wikipedia.org/wiki/Yoshi%27s_Crafted_World | Cardboard, boxes, cups and household craft items; strong shallow depth of field; levels that can be seen from the back to reveal the reverse side of props. |
| Kirby's Epic Yarn (2010, Good-Feel / HAL Laboratory) | https://en.wikipedia.org/wiki/Kirby%27s_Epic_Yarn | Yarn outlines and fabric patches; stitched seams and buttons as readable shape and gameplay cues. |
| LittleBigPlanet (2008, Media Molecule) | https://en.wikipedia.org/wiki/LittleBigPlanet_(2008_video_game) | Mixed craft materials (cardboard, felt, sponge, fabric) on a small number of depth planes; sticker decoration on surfaces. |
| Lumino City (2014, State of Play) | https://en.wikipedia.org/wiki/Lumino_City | A physical model city built from paper, card and real light, then captured for the game. Study real paper lighting and edge shadows. Exact model size `UNVERIFIED`. |

## Palette rules

- Start from a paper base, not pure white: warm off-white, cream or kraft. Pure #FFFFFF reads as screen, not paper.
- Avoid pure black. Use deep ink blue, brown or plum as the darkest value; paper shadows are coloured by bounced light.
- Coloured paper is fully saturated in the sheet but loses saturation at the fold shade face. Shade by darkening and slightly cooling, not by adding grey.
- Limit saturated accents to 2 or 3, tied to gameplay roles (interactable, danger, collectible).
- Felt and yarn read slightly darker and less saturated than paper of the same dye because of fibre shadowing.
- Tissue and thin paper let light through: backlit sheets shift warmer and lighter.

## Shape rules

- Silhouettes are simple and cuttable: shapes someone could cut with scissors or a craft knife in a few strokes.
- Cut edges wobble slightly; vary irregularity per asset so it does not look like a repeated filter.
- Folds are straight lines with two tones (light face and shade face). Curved paper bends smoothly; it does not stretch.
- Paper does not have bevels or rounded plastic corners. Thickness shows only at the cut edge.
- Show construction: tabs, glue blobs, tape, brads, staples, stitches. One or two per screen is enough.
- Characters made of flat sheets should turn by flipping or showing a printed back, not by rotating as a volume.

## Technical constraints

- Cut edge: render a thin lighter core line on cutouts, often 1 to 3 px at 1080p. Scale with resolution.
- Plane stack: 3 to 6 layers keeps sorting simple and depth readable.
- Contact shadows: small offset and blur next to the edge, plus a wider faint ambient shadow. Offset grows with layer distance.
- Texture frequency: fibre, felt fuzz and flute detail must be low contrast so it does not shimmer with mip-mapping or camera motion.
- Specular: broad and weak on paper, near zero on felt. Use a soft rim on felt for fuzz.
- Camera: flat cutouts reveal their flatness at steep angles. Lock yaw range, or give pieces real thickness and a back face.
- Depth of field: shallow blur on far layers sells tabletop scale; keep the play plane sharp for readability.

## Image-prompt recipe

Describe visual traits only. Never name living artists.

Positive: "handmade papercraft diorama, layered cutouts of matte card stock with visible lighter cut edges, crisp fold creases with a light and a shaded face, soft contact shadows between paper layers, subtle paper fibre texture, felt and corrugated cardboard accents, small details such as masking tape and brass paper fasteners, shallow depth of field, warm soft studio light, tabletop miniature scale"

Negative: "glossy, plastic, smooth 3D render, beveled edges, flat vector illustration, hard uniform drop shadow, pure black outlines, noisy high-contrast texture, photorealistic people"

Variants:
- Felt and yarn: replace card stock with "stitched felt shapes, visible running-stitch seams, wool yarn outlines, soft fuzzy rim light".
- Cardboard: "corrugated cardboard with exposed flutes on the cut ends, kraft brown, printed shipping marks, packing tape".

## Common pitfalls

- No edge thickness: reads as vector stickers, not paper.
- One big drop shadow under everything: reads as UI cards, not layered planes.
- Glossy speculars: paper turns into plastic.
- Fold drawn as one dark line: looks inked on, not creased.
- Mixed thickness scales on one prop without a reason: breaks the miniature scale.
- Identical hand-cut wobble on every asset: reads as a filter.
- Coarse fibre noise: shimmers in motion and fights readability.
- Too many craft props (tape, pins, glue) per screen: clutter hides gameplay.
- Camera orbiting too far around flat cutouts: exposes paper-thin geometry.
