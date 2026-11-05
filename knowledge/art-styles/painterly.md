---
title: Painterly art style reference (oil, watercolor, gouache in 2D and 3D)
tags: [art-style, painterly, watercolor, oil, gouache, hand-painted, npr, stylized-rendering]
sources: [https://en.wikipedia.org/wiki/%C5%8Ckami, https://en.wikipedia.org/wiki/Dishonored, https://en.wikipedia.org/wiki/Gris_(video_game), https://en.wikipedia.org/wiki/Disco_Elysium, https://en.wikipedia.org/wiki/Hades_(video_game), https://en.wikipedia.org/wiki/Bastion_(video_game), https://en.wikipedia.org/wiki/Ori_and_the_Blind_Forest, https://en.wikipedia.org/wiki/Kuwahara_filter]
last_verified: 2026-11-05
---

# Painterly art style reference

Painterly means the image reads as made by a brush: visible strokes, grouped values, soft and lost edges next to a few hard ones, and a surface (canvas, paper) under it. It works in 2D (painted sprites and backgrounds) and in 3D (hand-painted textures, stroke shaders, post filters).

## Reference games

Each link was checked for a live page on 2026-11-05 unless marked otherwise.

| Game | Link | What to study |
|---|---|---|
| Okami (Clover Studio, 2006) | https://en.wikipedia.org/wiki/%C5%8Ckami | Ink wash (sumi-e) look in real-time 3D: thick outline strokes, paper texture over the whole frame, a limited palette on a warm off-white ground. |
| Dishonored (Arkane Studios, 2012) | https://en.wikipedia.org/wiki/Dishonored | Oil-painting feel in 3D through hand-painted textures with broad strokes and exaggerated, chunky forms. Detail is painted in, not modeled. |
| Gris (Nomada Studio, 2018) | https://en.wikipedia.org/wiki/Gris_(video_game) | Watercolor in 2D: wet edges, pigment pooling, paper grain, and color introduced one hue at a time as the game progresses. |
| Disco Elysium (ZA/UM, 2019) | https://en.wikipedia.org/wiki/Disco_Elysium | Oil painting style over 3D-rendered scenes and painted portraits. Loose, expressive strokes in portraits; muted, earthy palettes. |
| Hades (Supergiant Games, 2020) | https://en.wikipedia.org/wiki/Hades_(video_game) | Hand-painted 2D with strong value grouping, dark backgrounds, saturated accent light, and painted character portraits for dialogue. |
| Bastion (Supergiant Games, 2011) | https://en.wikipedia.org/wiki/Bastion_(video_game) | Hand-painted isometric tiles with baked light and color; the painted ground assembles under the player. |
| Ori and the Blind Forest (Moon Studios, 2015) | https://en.wikipedia.org/wiki/Ori_and_the_Blind_Forest | Painted layered backgrounds with depth haze, glowing accents, and a readable gameplay plane in front of soft painted depth. |

Technique reference: Kuwahara filter, https://en.wikipedia.org/wiki/Kuwahara_filter (`UNVERIFIED`: page returned HTTP 429 during checking).

## Palette rules

- Pick a ground color first (paper white, warm canvas, dark umber underpainting) and let it show through in 5 to 15 percent of the frame.
- Group values into 3 to 5 masses per frame. Test with a grayscale blur: if the read fails blurred, it will fail painted.
- Warm light, cool shadow (or the reverse) and keep it consistent. Painterly shadows carry color, never neutral gray.
- Watercolor: highest values come from the paper, not from white paint. Keep saturation lower in large washes and higher in small pooled edges.
- Oil and gouache: mix variation into flat areas (2 to 3 nearby hues in one mass) so it does not read as vector fill.
- Reserve the most saturated color for gameplay-critical items (pickups, enemies, interactables).

## Shape rules

- Large, simple silhouettes; detail lives in the texture, not in geometry.
- Exaggerate proportions slightly (chunky hands, thick props) so broad strokes still describe the form.
- Edge hierarchy: lost edges in backgrounds, soft on forms turning away from light, hard only where you want the eye (focal point, player character, hazards).
- Stroke direction follows form (around a cylinder, down a fold), never a random noise pattern.
- Keep stroke size proportional to screen size, not world size, or distant objects turn into mush.

## Technical constraints

- Hand-painted textures with baked light fight dynamic lighting. Choose: bake light into albedo and use flat or minimal lighting, or paint neutral albedo and get the painterly feel from shading and post. Mixing both gives double shadows.
- Kuwahara and similar edge-preserving smoothing filters cost more as the kernel grows; an anisotropic variant looks more like strokes but costs more again. Run at half resolution and upsample if the budget is tight. (Specific cost numbers: `UNVERIFIED`, measure per project.)
- Screen-space stroke and paper overlays "swim" when the camera moves (the shower-door effect). Anchor paper texture in object or world space, or move it with camera motion, to keep it stable.
- Stroke shaders that re-randomize per frame flicker. Seed stroke placement from stable data (world position, object ID) and update at a held rate (for example every 2 to 3 frames) if a boiling look is wanted.
- Texel density must be consistent across assets, or brush stroke size jumps between objects. Set a target (for example, pixels per meter) in the style sheet.
- Mipmapping smears painted strokes into blur at distance. Consider sharper mip filtering or painting dedicated distant variants.
- TAA and heavy upscalers blur stroke edges and paper grain; test the stylization pass before and after them.

## Image-prompt recipe

Describe visual traits only. Never name living artists.

```
[subject], painterly [oil | watercolor | gouache] game art, visible directional brush strokes following form,
[3-5] grouped value masses, [warm light / cool shadow], limited palette of [colors],
soft lost edges in background, hard edges only on [focal point], [paper grain | canvas texture] visible,
chunky simplified shapes, [camera / view], no photorealism, no outlines unless ink style
```

Watercolor add-ons: wet-edge blooms, pigment pooling at shape borders, white of paper as highlights.
Oil add-ons: impasto ridges on highlights, dark underpainting showing through.
Gouache add-ons: matte flat opaque areas, crisp cut shapes, slight dry-brush texture at edges.

## Common pitfalls

- Applying a filter to a photoreal render and calling it done: values and shapes were never designed, so the result looks like a phone app effect.
- Uniform stroke size across the frame: no focal point, everything equally busy.
- Noise used as brush texture: it reads as dirt, not paint.
- Paper overlay in screen space with a moving camera: textures slide over the world.
- Baked light in textures plus dynamic shadows: double, conflicting lighting.
- UI and gameplay effects drawn in a clean vector style next to painted worlds with no bridge (use the same ground texture or edge treatment).
- Too many hues in shadows; painterly color variation still needs value control.
