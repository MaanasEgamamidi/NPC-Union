---
name: shader-port-check
description: Port a shader between HLSL, GLSL, WGSL, Metal Shading Language and Godot shading language with a precision, layout and feature checklist. Use for any cross-API shader port.
owner: graphics-programmer
disable-model-invocation: true
argument-hint: "[source shader file] [target language]"
---

# Shader port check

## Inputs

- Source shader and its language, plus target language and target API/engine version.
- How it is used: vertex/fragment/compute, what buffers and textures it binds.
- Target devices (mobile precision matters).

## Steps

1. Inventory the source: inputs, outputs, uniforms/constant buffers, textures and samplers, built-ins used, extensions or intrinsics.
2. Map types and built-ins with this checklist:
   - Vector/matrix types (`float4` / `vec4` / `vec4<f32>` / `float4` in MSL).
   - Matrix order and multiply (`mul(v, M)` in HLSL row-vector style vs `M * v`); check packing (`row_major` / `column_major`).
   - Texture sampling: separate textures and samplers in HLSL, WGSL and MSL; combined `sampler2D` in GLSL; `texture(...)` in Godot with `hint_*` uniforms.
   - Derivatives (`ddx`/`dFdx`/`dpdx`/`dfdx`) and sampling with implicit LOD: WGSL requires uniform control flow; move them out of non-uniform branches.
   - Integer and float conversion: WGSL has no implicit conversions; cast explicitly.
   - Clip space: depth range 0..1 (D3D, Metal, Vulkan, WebGPU) vs -1..1 (OpenGL by default); Y-flip differences in framebuffer and texture coordinates.
3. Uniform layout: apply std140/std430 or WGSL alignment rules (vec3 aligns to 16 bytes); pad structs and mirror the padding on the CPU side.
4. Precision: on GLSL ES and mobile Metal, choose `highp` for positions, depth reconstruction and large-UV math; `mediump`/`half` for colours and normals. Mark each choice.
5. Godot target: map to built-ins (`VERTEX`, `NORMAL`, `ALBEDO`, `ROUGHNESS`, `EMISSION`, `ALPHA`), pick `shader_type` and render modes, and drop code Godot already does (lighting unless `unshaded` or custom `light()`). Check the Godot shading language docs for the pinned version.
6. Features: list anything the target lacks (geometry shaders are absent in Metal and WebGPU; wave/subgroup ops vary by API and need feature checks) and the replacement.
7. Produce the ported shader and a diff table of semantic changes.
8. Test: render a known input (a gradient quad, a lit sphere) in source and target, compare screenshots, and check for NaNs and banding on the lowest device.

## Output

```markdown
# Shader port: <name> <source> -> <target>, <date>

| Source line/construct | Target | Why |
|---|---|---|

Precision choices: <list>
Layout padding: <struct, bytes>
Missing features and replacements: <list>
Test: <scene>, result <match / differences>
```

## Done when

- [ ] Every construct in the inventory is mapped or marked replaced.
- [ ] Matrix convention, clip-space depth and Y-flip checked.
- [ ] Uniform layout padding matches CPU side.
- [ ] Precision chosen per value on mobile targets.
- [ ] Visual comparison done on a reference scene.
