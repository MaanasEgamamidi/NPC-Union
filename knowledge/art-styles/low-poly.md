---
title: Low poly (flat-shaded faceted 3D)
tags: [art-style, low-poly, flat-shading, 3d, faceted, stylized]
sources: [https://en.wikipedia.org/wiki/Star_Fox_(1993_video_game), https://en.wikipedia.org/wiki/Virtua_Fighter_(video_game), https://en.wikipedia.org/wiki/Superhot, https://en.wikipedia.org/wiki/Islanders_(video_game), https://en.wikipedia.org/wiki/The_Battle_of_Polytopia, https://en.wikipedia.org/wiki/Lara_Croft_Go, https://en.wikipedia.org/wiki/A_Short_Hike, https://en.wikipedia.org/wiki/Flat_shading]
last_verified: 2026-11-05
---

# Low poly (flat-shaded faceted 3D)

Low poly as an art style means visible facets on purpose: each polygon reads as one flat value, shapes are simplified to their silhouette, and color plus lighting carry the detail that texture would carry in other styles. It grew out of the hardware limits of early real-time 3D and is now chosen for clarity, readability, and small asset cost.

All links below resolved (HTTP 200) on 2026-11-05. Game details are summarized from those pages and general knowledge; claims about specific internal technique are marked UNVERIFIED where not checked.

## Reference games

- **Star Fox (1993)**, https://en.wikipedia.org/wiki/Star_Fox_(1993_video_game). An early polygonal console game, rendered with help of the Super FX coprocessor in the cartridge. Study: how few polygons a readable ship needs, and how flat color per face separates the player from the background.
- **Virtua Fighter (1993, arcade)**, https://en.wikipedia.org/wiki/Virtua_Fighter_(video_game). Early 3D fighting game with flat-shaded polygon characters. Study: building recognizable characters from boxes and prisms, and silhouette contrast between two fighters.
- **Superhot (2016)**, https://en.wikipedia.org/wiki/Superhot. Minimal white environments with red faceted enemies. Study: using one accent hue for all threats, and how a near-monochrome world makes facets read through value alone.
- **Islanders (2019)**, https://en.wikipedia.org/wiki/Islanders_(video_game). Minimalist city builder on procedurally generated islands. Study: pastel terrain against more saturated buildings, and readability from a high camera.
- **The Battle of Polytopia**, https://en.wikipedia.org/wiki/The_Battle_of_Polytopia. Turn-based strategy with blocky low poly tribes and tiles. Study: identity per faction through a small color set and shape language, readable on phone screens.
- **Lara Croft Go (2015)**, https://en.wikipedia.org/wiki/Lara_Croft_Go. Turn-based puzzle game with a faceted, diorama-like look. Study: strong lighting gradients across large flat faces and atmospheric color for depth.
- **A Short Hike (2019)**, https://en.wikipedia.org/wiki/A_Short_Hike. Low poly 3D rendered at a low resolution and upscaled, giving a pixelated finish. Study: how pixelation warms the look and hides minor mesh issues.

## Palette rules

- Define colors per light band, not per object: each material family gets a top (lit), side (mid), and under (shadow) value. Three values per family is usually enough.
- Shift hue, not only value, between bands: lit faces lean warm toward the key light, shadow faces lean cool toward the ambient.
- Keep total swatches small (about 16 to 32 for a scene). A shared palette texture with UV islands placed on swatches gives one material for most props. (Common practice; UNVERIFIED as a universal rule.)
- Reserve one saturated accent hue for gameplay-critical things (enemies, pickups, the player), as Superhot does with red.
- Separate depth layers with fog tinted toward the sky color rather than adding detail.
- Avoid pure black shadows; they flatten facets into holes.

## Shape rules

- Silhouette first. Test every asset as a solid black shape at final on-screen size.
- Keep facet size consistent within a scene, roughly within 3x between asset classes.
- Prefer a few large planes plus one or two small chamfers at key edges over many even facets.
- Jitter vertices on organic forms (rocks, trees, terrain) so faces catch different light; perfectly regular primitives look mechanical.
- Exaggerate proportions (big heads, chunky limbs) because fine anatomy cannot be modeled at low counts.
- Use cones, prisms, and icosphere-like forms as base vocabulary; avoid UV spheres with many thin triangles at the poles.

## Technical constraints

- **Normals:** flat shading needs one normal per face. Either split all edges (hard edges, vertex count rises to about 3 per triangle) or compute the face normal in the shader from screen-space derivatives of world position (no extra vertices; may conflict with effects that read vertex normals).
- **Import settings:** engines expose normal import options (for example a normals or smoothing setting on model import). Exact menu names and defaults vary by engine version: UNVERIFIED, check current Unity, Godot, or Unreal docs before writing them into a sheet.
- **Budgets (starting points, adjust per project; UNVERIFIED as industry standards):** small props 20 to 300 tris, characters 150 to 1,500 tris, buildings 200 to 2,000 tris, terrain chunks sized by facet size. Mobile budgets should count vertices after edge splitting.
- **Materials:** one shared unlit or simple-lit material with a palette texture keeps draw calls low and batching easy.
- **Lighting:** one directional key light at about 30 to 50 degrees elevation plus flat ambient. Hard shadows suit the style; heavy soft shadows and strong screen-space AO blur facet edges.
- **Anti-aliasing:** facet edges are high contrast, so aliasing is visible. Use MSAA where the pipeline supports it, or accept it intentionally with a pixelated low-resolution render.
- **LODs:** low poly assets often need fewer LOD levels, but distant facets still shimmer; fog or a single simplified LOD helps.

## Image-prompt recipe

Describe visual traits only. Never name living artists.

Template: "<subject and camera>, low poly flat-shaded 3D, each polygon one solid color, visible facets, <palette: 3 to 5 colors or a mood>, single warm directional light, cool ambient, hard shadows, <fog color> distance fog, no textures, no outlines, clean simple shapes."

Optional modifiers: "rendered at low resolution, pixelated finish" (warm handmade look); "near-monochrome white scene with one red accent" (graphic look); "isometric diorama on a floating base" (puzzle or builder look).

Negative traits to state: smooth shading, subdivision, photoreal textures, noise, bloom, depth of field.

## Common pitfalls

- Smoothed normals on a faceted mesh: the most common way the style breaks, often from an import default.
- Mixing facet densities: a dense hero next to sparse props looks like kit-bashed assets from different games.
- Adding texture noise or gradients to every face; detail should come from light and shape.
- Soft multi-light setups that leave all faces the same value.
- Using too many hues; the scene loses its graphic clarity.
- Over-budget meshes from auto-decimation, which produce thin, random triangles instead of designed planes.
- Forgetting vertex cost of split edges on mobile.
