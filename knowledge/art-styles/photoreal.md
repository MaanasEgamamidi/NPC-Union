---
title: Photorealistic PBR art style
tags: [art-style, photoreal, pbr, photogrammetry, materials, lookdev]
sources: [https://en.wikipedia.org/wiki/Physically_based_rendering, https://physicallybased.info/, https://en.wikipedia.org/wiki/The_Last_of_Us_Part_II, https://en.wikipedia.org/wiki/Red_Dead_Redemption_2, https://en.wikipedia.org/wiki/Star_Wars_Battlefront_(2015_video_game), https://en.wikipedia.org/wiki/The_Vanishing_of_Ethan_Carter, https://en.wikipedia.org/wiki/Hellblade:_Senua%27s_Sacrifice, https://en.wikipedia.org/wiki/Microsoft_Flight_Simulator_(2020_video_game), https://en.wikipedia.org/wiki/Gran_Turismo_7]
last_verified: 2026-11-05
---

# Photorealistic PBR

Physically based rendering aims for materials that respond to light the way real surfaces do, so one set of maps holds up under any lighting. The look succeeds when renders sit next to reference photos without standing out.

## Reference games

| Game | What to study | Link |
|---|---|---|
| The Last of Us Part II (2020) | Weathered urban materials, overgrowth on concrete, wet surfaces, and grounded skin shading at third-person distance. | https://en.wikipedia.org/wiki/The_Last_of_Us_Part_II |
| Red Dead Redemption 2 (2018) | Time-of-day and weather changing the same materials, atmospheric haze, mud and snow deformation. | https://en.wikipedia.org/wiki/Red_Dead_Redemption_2 |
| Star Wars Battlefront (2015) | Large-scale photogrammetry of real locations turned into game assets; consistent texel density across scanned terrain and rocks. | https://en.wikipedia.org/wiki/Star_Wars_Battlefront_(2015_video_game) |
| The Vanishing of Ethan Carter (2014) | Early small-team photogrammetry; how scanned rocks, buildings, and foliage blend with hand-made assets. | https://en.wikipedia.org/wiki/The_Vanishing_of_Ethan_Carter |
| Hellblade: Senua's Sacrifice (2017) | Close-up facial performance capture and skin detail; how a small team focused realism budget on one character. | https://en.wikipedia.org/wiki/Hellblade:_Senua%27s_Sacrifice |
| Microsoft Flight Simulator (2020) | Realism at planetary scale from aerial and satellite data; atmosphere and cloud lighting. | https://en.wikipedia.org/wiki/Microsoft_Flight_Simulator_(2020_video_game) |
| Gran Turismo 7 (2022) | Car paint, clear coat, and metal flake; product-clean grading with accurate reflections. | https://en.wikipedia.org/wiki/Gran_Turismo_7 |

## Palette rules

- Palette comes from measured materials, not from picked swatches. Sample reference photos shot with a gray card or color checker.
- Dielectric albedo stays roughly between 30 and 240 sRGB. Fresh snow is near the top, charcoal and asphalt near the bottom.
- Raw metal base color is bright, roughly 180 to 255 sRGB luminance. Tint only for colored metals such as gold and copper.
- Keep saturation modest. Real outdoor materials are rarely above about 60 percent saturation in albedo; strong color comes from light and grading.
- Grade belongs in post (tonemapping and color grading), never in albedo. Changing the grade must not require repainting textures.
- Pick one grade family per project: documentary grounded (low contrast, neutral white balance), cinematic graded (split toning, stronger contrast), or product clean (neutral, high clarity).

## Shape rules

- Real proportions and real scale. Build to measured dimensions; a door is about 2 m tall, a stair riser about 15 to 20 cm.
- Every edge has a bevel or a baked bevel normal. Perfectly sharp edges read as CG because they catch no highlight.
- Wear follows use: polish on handles and steps, grime in corners and crevices, chips on exposed edges.
- Avoid repetition. Break tiling with decals, vertex blending, and macro variation textures.
- Silhouettes come from the real object type; do not exaggerate for readability unless the project explicitly allows it.

## Technical constraints

- Metalness is 0 or 1. Mid values only at blends (chipped paint to bare metal, dirt over metal).
- Dielectric F0 is about 0.04 linear (4 percent reflectance). In spec/gloss workflows this is near sRGB 56 to 60.
- No lighting in albedo: no AO, cavity, shadows, or highlights. AO goes in its own channel.
- Roughness carries most of the realism. Vary it with wear masks instead of one flat value.
- Texel density is set per distance band and held across the project. A common first-person hero value is 10.24 px/cm (1024 px per meter); background assets use half or a quarter.
- Normal map green channel convention differs by engine: Unreal uses DirectX style, Unity uses OpenGL style. Check on every import. `UNVERIFIED` for any specific engine version; confirm in current docs.
- Use physical light units where the engine supports them. Direct sun is on the order of 100,000 lux. `UNVERIFIED` which exposure defaults each engine version ships with.
- Photogrammetry: shoot under overcast light or shade, include a color checker and gray card, use cross-polarized flash for diffuse capture where possible, then delight the result before it becomes albedo. Retopologize and bake to a game mesh; raw scans are too dense.
- Validate every material in a neutral lookdev scene: gray ball, chrome ball, color checker, one overcast HDRI, one hard sun.

## Image-prompt recipe

Describe visual traits only. Never name living artists.

Template: `[subject], photorealistic, physically based materials, [material list with condition, for example weathered oak with worn edges and grime in crevices], [light: overcast soft daylight or low warm sun with long shadows], [lens: 35mm, eye height, shallow depth of field], [grade: neutral white balance, low contrast, natural saturation], accurate scale, fine surface micro detail, no stylization`

Example: `abandoned rural gas station at dusk, photorealistic, physically based materials, rusted corrugated steel, cracked concrete with weeds, faded painted signage, wet asphalt reflecting a low orange sun, 35mm lens at eye height, neutral grade, natural saturation, fine surface detail, no stylization`

Negative cues to add: `plastic sheen, uniform roughness, oversaturated colors, painted look, cel shading, pure black shadows`.

## Common pitfalls

- Baked AO or shadows in albedo, which double-darkens under real lighting.
- Gray metalness maps that produce a dull plastic-metal hybrid.
- Albedo too dark or too bright, then compensated with light intensity, which breaks every other material.
- Uniform roughness on large surfaces.
- Mixed texel density between scanned and hand-made assets placed side by side.
- Scans used without delighting, so baked sun direction fights the scene's lighting.
- Flipped normal green channel, making bumps read as dents.
- Over-sharpened textures and missing bevels, which read as CG at once.
- Grading done in textures instead of post, so a lighting change forces a repaint.
