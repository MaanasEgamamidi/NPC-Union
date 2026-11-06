---
title: 3D modeling for games, generated meshes to glTF
tags: [3d, modeling, retopology, uv, texel-density, gltf, lod, export]
sources: ["https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html", "https://github.com/KhronosGroup/glTF-Validator", "https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html", "https://gltf-transform.dev/"]
last_verified: 2026-11-05
---

# 3D modeling reference

The glTF specification was checked on 2026-11-05. Check the linked tool documentation for the project version before quoting options.

## Engine units and axes

| Target | Unit | Up axis | Notes |
|---|---|---|---|
| glTF 2.0 | 1 = 1 m | +Y | Right-handed, asset front faces +Z. Source: [glTF 2.0 spec](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#coordinate-system-and-units) |
| Blender | Check project settings | Check version documentation | Test the glTF export orientation |
| Unity | Check project version documentation | Check project version documentation | Test imported scale and facing |
| Godot | Check project version documentation | Check project version documentation | Test imported scale and facing |
| Unreal | Check project settings and version documentation | Check project version documentation | Test imported scale and facing |

## Triangle budget starting points (LOD0)

These are planning defaults, not published limits. Confirm with `technical-lead` and profile on device.

| Asset | Mobile | PC/console | VR |
|---|---|---|---|
| Small prop | 300 to 1,500 | 1,000 to 5,000 | 500 to 3,000 |
| Large prop / vehicle | 2,000 to 8,000 | 10,000 to 50,000 | 5,000 to 20,000 |
| Hero character | 5,000 to 15,000 | 30,000 to 100,000 | 15,000 to 40,000 |

LOD steps: LOD1 about 50%, LOD2 about 25%, LOD3 about 10% or impostor.

## Texel density

| Camera | Common target |
|---|---|
| First-person | 10.24 px/cm (1024 px per m) |
| Third-person | 5.12 px/cm |
| Top-down / RTS | 2.56 px/cm or lower |

## UV padding

| Texture | Padding |
|---|---|
| 512 | 2 to 4 px |
| 1024 | 4 to 8 px |
| 2048 | 8 to 16 px |
| 4096 | 16 px |

## glTF material packing

| Texture | Channels |
|---|---|
| baseColor | RGB colour, A alpha |
| metallicRoughness | G roughness, B metallic |
| occlusion | R |
| normal | OpenGL convention, green up |

## Generated mesh cleanup checklist

- [ ] Remove floating islands and internal faces
- [ ] Fix non-manifold edges and flipped normals
- [ ] Rebuild guessed back and underside
- [ ] Remove baked lighting from albedo
- [ ] Decimate (static, far) or retopo (deforms, close)
- [ ] Separate moving parts; set pivots
- [ ] Hard edges on UV seams; bake normals from high-poly

## Export checklist

- [ ] Rotation and scale applied, scale 1,1,1
- [ ] Pivot at base centre or functional axis
- [ ] GLB, +Y up
- [ ] Optional compression: KHR_draco_mesh_compression or EXT_meshopt_compression, textures via KHR_texture_basisu; confirm the target loader supports each
- [ ] Under 65,535 vertices per primitive if 16-bit indices are required
- [ ] glTF Validator: zero errors
- [ ] Engine import: size, facing, normals, LOD switch checked
