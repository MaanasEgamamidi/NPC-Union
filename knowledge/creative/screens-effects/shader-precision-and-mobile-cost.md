---
title: Shader precision, time wrapping and mobile cost
tags: [shaders, glsl, wgsl, hlsl, godot, precision, overdraw, mobile]
sources:
  - "https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf"
  - "https://www.w3.org/TR/WGSL/"
  - "https://docs.godotengine.org/en/stable/tutorials/shaders/shader_reference/shading_language.html"
  - "https://learn.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl"
  - "https://jcgt.org/published/0009/03/02/"
last_verified: 2026-11-05
---

# Shader precision, time wrapping and mobile cost

Reference notes for `shader-artist`. The sources were not fetched when this file was written; check the linked sources and project versions before quoting engine or device details.

## Floating-point precision

| Type | Stored mantissa bits | Step size at value v | Time where step is about 1/64 s |
|------|----------------------|----------------------|---------------------------------|
| 32-bit float (`highp`, `float`, `f32`) | 23 | v x 2^-23 | about 131,072 s (about 36 h) |
| 16-bit float (`half`, `f16`, typical `mediump`) | 10 | v x 2^-10 | 16 s |

The arithmetic above follows from IEEE 754 formats. What `mediump` actually maps to is implementation-defined: GLSL ES gives a minimum (relative precision of about 2^-10 for `mediump` float); the GPU may use full precision instead. See [GLSL ES 3.00 specification section 4.5.1](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf) for the range and precision table.

- GLSL ES 3.00 fragment shaders have no default precision for floating-point types: each float, vector, or matrix declaration needs a precision qualifier or a previously declared default. [GLSL ES 3.00 specification, section 4.5.4](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf).
- Multiplying time by a frequency f multiplies the absolute phase error by f. A term `sin(t * 50.0)` needs about 50x more headroom than `sin(t)`.

## Time wrapping

- Wrap on the CPU in double precision and pass the wrapped value as a uniform.
- Choose a loop length L. For each periodic term `sin(2π k t / L)`, require integer k. Then `t mod L` is seamless for every term at once.
- For noise that must loop, sample the noise along a circle (2D noise for a 1D loop, 4D noise for a looping 2D field) instead of translating it linearly with time.
- Godot exposes `TIME` in shaders. In [Godot 4.2](https://docs.godotengine.org/en/4.2/classes/class_projectsettings.html), `rendering/limits/time/time_rollover_secs` defaults to 3,600 seconds; check the project version.
- Check the Unity manual for built-in shader variables in the project's version, and test time behaviour across scene changes before relying on it.

## Porting differences

| Topic | GLSL | HLSL | WGSL |
|-------|------|------|------|
| Float modulo | `mod(x, y) = x - y * floor(x / y)` | `fmod`: sign follows x (truncation) | `%` on floats: truncation, sign follows x |
| Implicit numeric conversion | Some allowed | Allowed | Not allowed; convert explicitly |
| Matrix multiply | `M * v` | `mul(M, v)` with row/column conventions to check | `M * v` |
| Framebuffer / texture origin | Bottom-left (OpenGL) | Top-left (Direct3D) | Top-left (WebGPU) |

[WGSL](https://www.w3.org/TR/WGSL/#arithmetic-expr) defines remainder as `x - y * trunc(x / y)` within its specified domain. [Microsoft](https://learn.microsoft.com/en-us/visualstudio/designers/shader-designer-nodes?view=visualstudio) describes HLSL `fmod` remainder as having the sign of x.

## Hash functions

- `fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453)` depends on `sin` precision at large arguments and gives different or patterned results across GPUs and at half precision.
- Jarzynski and Olano, "Hash Functions for GPU Rendering", Journal of Computer Graphics Techniques, 2020, compares GPU hashes and recommends PCG-style integer hashes for quality and speed. [Paper](https://jcgt.org/published/0009/03/02/paper.pdf).

## Overdraw and fill cost

- Fragments per frame = covered pixels x number of layers drawn over them. A 1080x2400 screen is 2,592,000 pixels.
- Four full-screen blended layers on that screen: about 10.4 million fragments per frame, about 622 million per second at 60 fps.
- Rendering at half width and half height cuts fragments to one quarter. Soft, low-frequency backgrounds tolerate this well; sharp lines and text do not.
- Profile `discard` and alpha testing on target GPUs; consult the GPU vendor's documentation to check how they affect early fragment rejection.
- Idle menus run for long periods; capping menu frame rate (for example to 30 fps) halves sustained fill cost. Test sustained performance for at least 10 minutes, since phones throttle when warm.

## Output quality

- To mitigate visible gradient banding, test output dithering at the target bit depth and compare the result on representative displays.
- Anti-alias SDF edges with `fwidth(d)` so edge width tracks screen resolution.
- `fract` on UVs before a texture sample causes a one-pixel seam because derivatives jump at the wrap; use `textureGrad` with derivatives of the unwrapped coordinate.

## Engine notes

- Godot 4: screen reads use `uniform sampler2D name : hint_screen_texture;` in place of Godot 3's `SCREEN_TEXTURE`. Check the shading language page linked in sources.
- Unity Shader Graph: node names and available targets change between package versions. Open the Shader Graph manual for the exact Unity version before naming nodes.

## How to check

1. Fetch each source link and confirm the UNVERIFIED items, then update `last_verified`.
2. For device behaviour, test on hardware with the engine profiler or the GPU vendor's tool. Record device, OS, engine version and frame time.
