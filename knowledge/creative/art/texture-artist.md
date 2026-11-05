---
title: Texture artist reference
tags: [texture, pbr, tiling, normal-map, texel-density, mipmaps]
sources: [https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html, https://docs.unity3d.com/Manual/class-TextureImporter.html, https://dev.epicgames.com/documentation/en-us/unreal-engine/texture-format-support-and-settings-in-unreal-engine, https://docs.blender.org/manual/en/latest/render/shader_nodes/vector/normal_map.html]
last_verified: 2026-11-05
---

# Texture artist reference

All sources above are UNVERIFIED: not fetched in this session. Check each page for the engine version in use before quoting a setting.

## Normal map conventions

| Target | Green channel | Notes |
|--------|---------------|-------|
| OpenGL style | Y+ (up) | Blender, Unity, glTF 2.0 |
| DirectX style | Y- (down) | Unreal Engine |
| Convert | Invert G only | R and B unchanged |

Symptom of wrong convention: bumps look lit from below along one axis only.

## Colour space per map

| Map | Colour space | Typical compression |
|-----|--------------|---------------------|
| Albedo / base colour | sRGB | BC1 (no alpha), BC7 |
| Emissive | sRGB | BC1, BC7 |
| Normal | Linear | BC5 (two channel, Z rebuilt) |
| Roughness, metallic, AO | Linear | packed into one BC1/BC7 |
| Height | Linear | BC4, or 16-bit if used for displacement |

## Channel packing

| Layout | R | G | B | A | Used by |
|--------|---|---|---|---|---------|
| ORM | Occlusion | Roughness | Metallic | - | glTF 2.0, common in Unreal |
| Unity URP/HDRP masks | check docs | | | | layout differs by pipeline, UNVERIFIED |

glTF 2.0 metallicRoughnessTexture reads roughness from G and metallic from B.

## Resolution and texel density

| Texel density | 1024 tile covers | 2048 tile covers | Typical use |
|---------------|------------------|------------------|-------------|
| 1024 px/m | 1 m | 2 m | close-up hero |
| 512 px/m | 2 m | 4 m | first-person default |
| 256 px/m | 4 m | 8 m | third-person, background |
| 128 px/m | 8 m | 16 m | top-down, distant terrain |

Rules: power-of-two sides; at minimum multiples of 4 for block compression. Keep neighbouring surfaces at the same density.

## Tiling QA checklist

- [ ] 50% offset check on every map, including height and roughness.
- [ ] 3x3 tiling at 25% zoom: no repeating landmark.
- [ ] Mip preview at 1/8: no colour drift or atlas neighbour bleed.
- [ ] Albedo de-lit: no AO, shadows, highlights.
- [ ] Metallic close to 0 or 1 except transitions.
- [ ] Roughness has variation (wear, dirt, moisture), not a flat value.
- [ ] Lit in-engine test at real UV scale, under at least two light angles.

## Repetition breakup options

| Method | Cost | When |
|--------|------|------|
| Remove landmarks, re-add as decals | low | always first |
| Macro variation mask at non-integer scale | low | large floors, terrain |
| Vertex-paint blend between two materials | low to medium | walls, floors with wear paths |
| Height-blended layers | medium | terrain, puddles |
| Stochastic or hex tiling shader | medium to high | large open areas; hand to technical-lead |

## Mipmap bleeding in atlases

- Tiling textures wrap correctly at low mips; atlases do not.
- Pad each atlas cell with dilated edge pixels; 8-16 px at 2048 is a common margin.
- Prefer texture arrays for tiling sets when the engine supports them.
