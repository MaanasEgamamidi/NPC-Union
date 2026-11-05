---
name: seamless-texture-set
description: Builds a tileable PBR map set (albedo, normal, roughness, metallic, AO, height) with seam and repetition checks. Use for floors, walls, terrain layers.
owner: texture-artist
disable-model-invocation: true
argument-hint: "[material, engine, tile size in metres]"
---

# Tileable texture set

A repeatable procedure for producing one tileable PBR material that passes seam, repetition, and import checks.

## Inputs

- Material description (for example "worn concrete, light oil stains").
- Target engine and version. Ask if missing; it decides normal convention and channel packing.
- Workflow: metal/roughness (default) or specular/glossiness.
- Real-world size one tile should cover, in metres. Ask if missing; default 2 m for walls, 4 m for floors.
- Texel density target. Default 512 px/m first-person, 256 px/m third-person or top-down.
- Source: reference photo, scan, or "generate". If generating, confirm Codex image generation is available; if not, write prompts and mark images as to be supplied.

## Steps

1. Compute resolution: tile metres x texel density, rounded up to the next power of two (512, 1024, 2048, 4096). Record the actual density that results.
2. Get a source that is orthographic, evenly lit, and free of perspective. For generation, prompt: "top-down orthographic photo of <material>, overcast flat lighting, no shadows, no vignette, no perspective, tileable".
3. De-light the albedo: remove AO, cast shadows, and highlights. Check no non-metal pixel is near pure black or pure white.
4. Make it tile: offset by exactly 50% width and 50% height with wrap, repair the cross seam in the centre, offset back.
5. Remove high-contrast landmarks (single stains, cracks, logos) from the base tile and list them as decal candidates.
6. Derive height from the tiled albedo or source, then normal, AO, and roughness from that same tiled data so all maps share the wrap.
7. Set normal convention for the target: OpenGL Y+ (Unity, Blender, glTF) or DirectX Y- (Unreal). Flip the green channel if needed and note it.
8. Set metallic to 0 or 1 except on transition pixels.
9. Pack channels for the target engine (ORM for Unreal and glTF; confirm the layout for Unity pipelines in the engine docs).
10. Run QA: offset check on every map (not just albedo), 3x3 tiling at 25% zoom, mip preview at 1/8 size, and a lit test in-engine on a plane at the target UV scale.
11. Write breakup notes: macro variation mask scale (a non-integer ratio such as 0.13x), decal list, and any blend layer.

## Output

```
Material: <name>
Engine / version: <engine> <version>
Workflow: metal/roughness | spec/gloss
Tile size: <m> x <m>    Resolution: <px>    Texel density: <px/m>
Normal convention: OpenGL Y+ | DirectX Y-   (green flipped: yes/no)

| File | Content | Colour space | Channels | Compression |
|------|---------|--------------|----------|-------------|
| T_<name>_BC | albedo, de-lit | sRGB | RGB(A) | BC1/BC7 |
| T_<name>_N  | tangent normal | linear | RG(B) | BC5 |
| T_<name>_ORM | occlusion/roughness/metallic | linear | R/G/B | BC1/BC7 |
| T_<name>_H  | height | linear | R | BC4 |

QA
- Offset check (all maps): pass/fail, notes
- 3x3 at 25%: landmarks seen
- Mip 1/8: bleeding or colour shift
- In-engine lit test: notes

Breakup: macro mask <scale>, decals <list>, blend layers <list>
Source / prompts: <text>
Open questions / UNVERIFIED: <list>
```

## Done when

- [ ] Resolution is a power of two and density is recorded.
- [ ] Albedo has no baked shadows, AO, or highlights.
- [ ] Every map passes the 50% offset check with no visible cross.
- [ ] 3x3 tiling at 25% zoom shows no repeating landmark.
- [ ] Normal convention matches the target engine and is written down.
- [ ] Only albedo and emissive are sRGB; all data maps are linear.
- [ ] Channel packing matches the engine's expected layout.
- [ ] Breakup notes and decal list are included.
