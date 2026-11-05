---
name: shader-cost-precision-audit
description: Audits an effect or background shader for precision, time wrapping, overdraw, seams, banding and mobile cost, and returns a fix list. Use before shipping or porting a shader.
owner: shader-artist
disable-model-invocation: true
argument-hint: "[shader file or pasted source] [engine/version] [lowest target device]"
---

# Shader cost and precision audit

A fixed pass over one shader (or one effect made of several passes) that finds the problems that only show up on slow devices, after long run times, or after a port.

## Inputs

- The shader source, and the material or script that feeds its uniforms.
- Engine and version, render pipeline or renderer (for example Unity URP, Godot 4 Mobile, WebGPU), and target language.
- Lowest target device and its screen resolution.
- How long the effect can stay on screen: a transition (under 2 s), a level (minutes), or an idle menu (hours).
- How many other full-screen or blended layers draw on the same pixels.

If the device or the on-screen duration is missing, ask once. If still unknown, assume a 1080x2400 mid-range phone and an idle menu that runs for hours, and say so in the report.

## Steps

1. **Map the passes.** List every pass and layer: full-screen or partial, opaque or blended, render resolution. Multiply covered pixels by layer count to get fragments per frame. Flag anything above 2x screen coverage on mobile.
2. **Check time.** Find every use of the engine time built-in or a time uniform. For each, note the largest frequency it is multiplied by. Flag if time is unwrapped, wrapped with a single `mod(t, 2π)`, or stored in `mediump`. Propose a loop length L where every periodic term completes whole cycles, and a CPU-side wrap.
3. **Check precision.** On GLSL ES, confirm a precision statement or qualifiers exist. Flag `mediump` on time, on UVs that address textures larger than 1024 texels, and on world-space positions. On other targets, flag `half` or `min16float` used for the same values.
4. **Check noise and hashes.** Flag `fract(sin(...) * large)` hashes. Replace with an integer hash where the target supports integers (GLSL ES 3.0, WGSL, HLSL SM4+), or a texture lookup where it does not.
5. **Check seams and wrapping.** Find `fract` or manual wrapping of UVs before a texture sample. Flag missing `textureGrad` or equivalent. When the shader was ported, list each `mod` and `%`/`fmod` and check sign behaviour for negative inputs.
6. **Check platform origin.** Confirm the y direction of UVs and screen coordinates matches the target API. Note any matrix multiply order change for HLSL `mul`.
7. **Check cost per fragment.** Count texture samples, loops (and whether their bounds are constant), divergent branches, and `discard`. Flag `discard` or alpha test in large blended areas on tile-based GPUs.
8. **Check output quality.** Look for slow gradients in dark tones without dithering. Check that SDF edges use `fwidth` or another derivative rather than a fixed width.
9. **Check accessibility hooks.** Confirm a uniform exists to reduce or stop motion and to lower flash intensity. If not, add one and note it for `accessibility-specialist`.
10. **Write the fix list** in priority order: visible bugs first, then cost, then polish. Give the code change for each.
11. **Define the test.** Accelerated time (time scale 100x for at least 5 minutes, or start time at 100,000 s), 10 minutes on the lowest device, and the reduced-motion toggle.

## Output

```markdown
# Shader audit: <effect name>

Engine / renderer / language: <...>
Lowest device and resolution: <...>
On-screen duration: <...>
Assumptions: <anything not provided>

## Passes
| Pass | Coverage | Blend | Resolution | Fragments per frame (est.) |
|------|----------|-------|------------|----------------------------|

Total screen coverage: <N>x

## Findings
| # | Area | Line or node | Problem | Severity (bug / cost / polish) | Fix |
|---|------|--------------|---------|-------------------------------|-----|

## Time
Loop length: <L> s. Frequencies used: <list>, each completes <k> cycles per loop.
Wrap location: <CPU script / engine setting>.

## Test plan
- [ ] 100x time for 5 minutes, no stepping or jitter
- [ ] 10 minutes on <device>, frame time <value or "not measured">
- [ ] Reduced-motion uniform at 0 stops motion

## UNVERIFIED
<claims about the device, engine defaults or vendor behaviour not checked>
```

## Done when

- [ ] Every pass and blended layer is listed with an estimated fragment count.
- [ ] Every use of time has a stated wrap and a loop length that closes every periodic term.
- [ ] No time, large-texture UV or world position value is left at half precision.
- [ ] No `sin`-based hash remains, or its retention is justified.
- [ ] Ported code has each `mod`/`fmod`/`%` and y-origin difference checked.
- [ ] A reduced-motion or intensity uniform exists.
- [ ] Each finding has a concrete code fix.
- [ ] Unmeasured numbers are labelled estimates and unchecked claims are marked UNVERIFIED.
