---
title: Gameplay VFX timing, budgets and flash safety
tags: [vfx, particles, flipbook, overdraw, screen-shake, photosensitivity, accessibility]
sources:
  - "https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html"
  - "https://docs.unity3d.com/Manual/PartSysTexSheetAnimModule.html"
  - "https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@latest"
  - "https://docs.godotengine.org/en/stable/classes/class_gpuparticles3d.html"
  - "https://gameaccessibilityguidelines.com/"
  - "https://realtimevfx.com/"
last_verified: 2026-11-05
---

# Gameplay VFX timing, budgets and flash safety

Reference for the vfx-artist agent. Check each source and the target engine version before relying on its guidance.

## Timing

- Effects have three phases: anticipation (telegraph), impact (peak), dissipation (falloff).
- Starting split for a melee hit at 60 fps: 0 to 2 frames build, 1 to 3 frames peak, 10 to 30 frames falloff. This is a working rule of thumb, not a published standard.
- Telegraph fill time should equal the gameplay wind-up, and the telegraph shape should equal the hitbox.
- Hit-stop (brief freeze on impact) changes gameplay timing, so its owner is game design. VFX should either freeze in sync or keep playing, consistently.

## Blend modes

- Additive: good on dark backgrounds, washes out on bright ones and stacks to white.
- Alpha or premultiplied alpha with a darker core or outline: keeps a silhouette on bright backgrounds.

## Flipbooks

- Unity's Texture Sheet Animation module plays grid flipbooks on particles (see Unity manual link above).
- Grid math: an 8x8 grid on a 2048 px texture gives 256 px frames; 4x4 on 1024 gives 256 px frames with 16 frames.
- Motion-vector blending can smooth flipbook playback between frames. Check the target engine version's documentation and test the effect before selecting its settings.

## Budgets

| Item | What to set |
|---|---|
| Particles per instance | Hard cap per effect |
| Max instances | Cap plus a replacement rule (oldest dies first) |
| Overdraw | Estimate transparent layers at the closest camera distance |
| Culling | Distance cull or LOD; authored bounds for GPU systems |

- Fill rate from large transparent quads near the camera usually costs more than particle count. Tight-fitting sprite meshes reduce wasted transparent pixels.
- Godot's GPUParticles3D uses a visibility AABB for culling (see Godot class reference); other engines have equivalent authored bounds for GPU particles.

## Screen shake

- Trauma model: trauma value 0 to 1, add per event, decay over time, amplitude driven by trauma squared or cubed through smooth noise. Presented by Squirrel Eiserloh, GDC 2016, "Math for Game Programmers: Juicing Your Cameras With Math". Source: https://media.gdcvault.com/gdc2016/Presentations/Eiserloh_Squirrel_JuicingYourCameras.pdf
- Always expose a shake intensity setting. Game Accessibility Guidelines recommend letting players reduce or turn off screen shake and similar motion effects (check wording on the site).

## Flash safety

- WCAG 2.1 success criterion 2.3.1: web pages must not contain anything that flashes more than three times in any one-second period, unless the flash is below the general flash and red flash thresholds.
- The Understanding document defines the general flash threshold area in terms of a combined area of flashes within a 10 degree visual field (0.006 steradians). Exact pixel equivalents depend on viewing distance and screen size.
- WCAG is a web standard; applying it to games is common practice, not a legal requirement in itself. Check current platform documentation for any additional requirements.
- Practical game rules: no full-screen white or red flash on routine events, use small-area tints on the hit target, and ship a flash reduction option.
- Historical example: the 1997 Pokemon anime episode "Dennou Senshi Porygon" broadcast in Japan caused photosensitive seizures in viewers, which is often cited in discussions of flashing content.

## Readability checks

- Desaturate the screen and confirm threats still read by value and shape.
- Keep enemy threat effects in a different shape language from player and ally effects, and let players reduce ally effect opacity in multiplayer.
