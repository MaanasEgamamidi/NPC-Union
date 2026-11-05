---
title: Shader precision, time wrapping and mobile cost
tags: [shaders, glsl, wgsl, hlsl, godot, precision, overdraw, mobile]
sources:
  - https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf
  - https://www.w3.org/TR/WGSL/
  - https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/shading_language.html
  - https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl
  - https://jcgt.org/published/0009/03/02/
last_verified: 2026-11-05
---

# Shader precision, time wrapping and mobile cost

Reference notes for `shader-artist`. Sources were not fetched in the session that wrote this file; claims that depend on them are marked UNVERIFIED until checked against the linked page.

## Floating-point precision

| Type | Stored mantissa bits | Step size at value v | Time where step is about 1/64 s |
|------|----------------------|----------------------|---------------------------------|
| 32-bit float (`highp`, `float`, `f32`) | 23 | v x 2^-23 | about 131,072 s (about 36 h) |
| 16-bit float (`half`, `f16`, typical `mediump`) | 10 | v x 2^-10 | 16 s |

The arithmetic above follows from IEEE 754 formats. What `mediump` actually maps to is implementation-defined: GLSL ES gives a minimum (relative precision of about 2^-10 for `mediump` float); the GPU may use full precision instead. Check section 4.5 "Precision and Precision Qualifiers" of the GLSL ES 3.00 spec. UNVERIFIED: exact section number and table values; fetch the PDF to confirm.

- GLSL ES fragment shaders: in GLSL ES 1.00 there is no default float precision in the fragment language, so a precision statement is required. UNVERIFIED for GLSL ES 3.00 wording; check the spec.
- Multiplying time by a frequency f multiplies the absolute phase error by f. A term `sin(t * 50.0)` needs about 50x more headroom than `sin(t)`.

## Time wrapping

- Wrap on the CPU in double precision and pass the wrapped value as a uniform.
- Choose a loop length L. For each periodic term `sin(2π k t / L)`, require integer k. Then `t mod L` is seamless for every term at once.
- For noise that must loop, sample the noise along a circle (2D noise for a 1D loop, 4D noise for a looping 2D field) instead of translating it linearly with time.
- Godot exposes `TIME` in shaders and has a project setting that rolls time over after a set number of seconds. UNVERIFIED: the setting name (believed to be under `rendering/limits/time/`) and its default; check the Godot docs for the project's version.
- Unity exposes `_Time` (with `.y` as seconds) to shaders. UNVERIFIED: whether it resets on scene load in the project's version; check the Unity manual for built-in shader variables.

## Porting differences

| Topic | GLSL | HLSL | WGSL |
|-------|------|------|------|
| Float modulo | `mod(x, y) = x - y * floor(x / y)` | `fmod`: sign follows x (truncation) | `%` on floats: truncation, sign follows x |
| Implicit numeric conversion | Some allowed | Allowed | Not allowed; convert explicitly |
| Matrix multiply | `M * v` | `mul(M, v)` with row/column conventions to check | `M * v` |
| Framebuffer / texture origin | Bottom-left (OpenGL) | Top-left (Direct3D) | Top-left (WebGPU) |

UNVERIFIED: WGSL float `%` definition; confirm in the WGSL spec section on arithmetic expressions. HLSL `fmod` sign behaviour; confirm on Microsoft Learn.

## Hash functions

- `fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453)` depends on `sin` precision at large arguments and gives different or patterned results across GPUs and at half precision.
- Jarzynski and Olano, "Hash Functions for GPU Rendering", Journal of Computer Graphics Techniques, 2020, compares GPU hashes and recommends PCG-style integer hashes for quality and speed. UNVERIFIED: the exact JCGT URL above; confirm it points to this paper.

## Overdraw and fill cost

- Fragments per frame = covered pixels x number of layers drawn over them. A 1080x2400 screen is 2,592,000 pixels.
- Four full-screen blended layers on that screen: about 10.4 million fragments per frame, about 622 million per second at 60 fps.
- Rendering at half width and half height cuts fragments to one quarter. Soft, low-frequency backgrounds tolerate this well; sharp lines and text do not.
- On tile-based GPUs (Arm Mali, Qualcomm Adreno, Apple), `discard` and alpha test can stop the GPU from rejecting hidden fragments early for that draw. UNVERIFIED: confirm wording in the Arm Mali GPU Best Practices guide and Apple's Metal documentation before quoting.
- Idle menus run for long periods; capping menu frame rate (for example to 30 fps) halves sustained fill cost. Test sustained performance for at least 10 minutes, since phones throttle when warm.

## Output quality

- 8-bit output bands visibly on slow, dark gradients. Add noise of about one quantisation step (1/255) before output. Interleaved gradient noise (Jimenez, "Next Generation Post Processing in Call of Duty: Advanced Warfare", SIGGRAPH 2014) is a cheap option. UNVERIFIED: no link included because the talk URL was not checked.
- Anti-alias SDF edges with `fwidth(d)` so edge width tracks screen resolution.
- `fract` on UVs before a texture sample causes a one-pixel seam because derivatives jump at the wrap; use `textureGrad` with derivatives of the unwrapped coordinate.

## Engine notes

- Godot 4: screen reads use `uniform sampler2D name : hint_screen_texture;` in place of Godot 3's `SCREEN_TEXTURE`. Check the shading language page linked in sources.
- Unity Shader Graph: node names and available targets change between package versions. Open the Shader Graph manual for the exact Unity version before naming nodes.

## How to check

1. Fetch each source link and confirm the UNVERIFIED items, then update `last_verified`.
2. For device behaviour, test on hardware with the engine profiler or the GPU vendor's tool. Record device, OS, engine version and frame time.
