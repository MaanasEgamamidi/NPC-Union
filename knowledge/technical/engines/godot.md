---
title: Godot engine versions, renderers, C# support and web export
tags: [godot, engine, versions, gdscript, csharp, web-export]
sources:
  - https://godotengine.org/download/archive/
  - https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html
  - https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html
  - https://docs.godotengine.org/en/stable/about/release_policy.html
  - https://godotengine.org/license/
last_verified: 2026-11-05
---

# Godot engine versions, renderers, C# support and web export

## Current releases (checked 2026-11-05)

Source: https://godotengine.org/download/archive/

| Version | Status | Date |
|---|---|---|
| 4.8-beta2 | pre-release (beta) | 29 Oct 2026 |
| 4.8-beta1 | pre-release (beta) | 15 Oct 2026 |
| 4.7.2-stable | current stable 4.x | 18 Aug 2026 |
| 3.6.3-stable | maintenance branch 3.x | 22 Aug 2026 |

The `stable` docs at docs.godotengine.org showed "Godot Engine 4.7 documentation" on 2026-11-05.
Do not start production work on a beta. Re-check the archive page before giving any version advice.

## Licence

MIT licence, no royalties or fees (https://godotengine.org/license/). Ship the licence text with the game (Godot plus its third-party components; the editor's Help > About lists them). Fetched page not read in full today: treat the third-party list as UNVERIFIED.

## Support policy

Godot has no "LTS" label. The release policy page (https://docs.godotengine.org/en/stable/about/release_policy.html) describes which minor branches get patch releases. Exact support windows per branch: UNVERIFIED today, open that page.

## Renderers (rendering methods)

| Method | Backend | Use for |
|---|---|---|
| Forward+ | Vulkan / D3D12 / Metal | desktop 3D, full feature set |
| Mobile | Vulkan / D3D12 / Metal | mobile and lighter desktop 3D |
| Compatibility | OpenGL 3.3 / OpenGL ES 3.0 / WebGL 2.0 | web, old hardware, most 2D |

Web export: "Godot 4 can only target WebGL 2.0 (using the Compatibility rendering method)." WebGPU is not supported yet (exporting_for_web page, 2026-11-05).

## C# (.NET) platform support

From https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html (4.7 docs, 2026-11-05):
- Desktop (Windows, Linux, macOS): supported since 4.2.
- Android: "currently experimental". iOS: "currently experimental and has a few limitations" (exports only built from macOS).
- Web: "Currently, projects written in C# cannot be exported to the web platform." The page suggests Godot 3 for C# on web.
- C# needs the separate .NET build of the editor and the .NET export templates.

## Web export facts (exporting_for_web, 2026-11-05)

- Thread support is off by default; single-threaded is the preferred default and works on more hosts.
- Threaded exports need SharedArrayBuffer: secure context plus `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`. Without headers, the PWA option can apply a service-worker workaround.
- Since 4.3 web audio uses Sample playback by default: no AudioEffects, reverb or doppler, positional audio may be off. Stream playback restores features at the cost of latency.
- Browsers block autoplay audio: require a click, tap or key before starting sound.
- Safari has WebGL 2.0 issues; Chromium and Firefox are recommended.

## Breaking-change hotspots for 4.6 to 4.7 (from the official migration guide)

Source: https://docs.godotengine.org/en/stable/tutorials/migrating/upgrading_to_godot_4.7.html (not re-fetched today: UNVERIFIED, re-check before quoting)
- Overrides of methods with a typed return now inherit that return type; add an explicit `return`.
- `RichTextLabel.ImageUpdateMask.UPDATE_WIDTH_IN_PERCENT` renamed `UPDATE_WIDTH_UNIT`.
- Mouse and keyboard `InputEvent.device` IDs are now `InputEvent.DEVICE_ID_MOUSE` / `DEVICE_ID_KEYBOARD` instead of 0.
- Jolt `WorldBoundaryShape3D` plane sign flipped compared to 4.6.
- `AudioStreamPlayer2D/3D.area_mask` default changed from layer 1 to 0.
- New projects default stretch mode `canvas_items`, aspect `expand`.
Earlier: 4.6 made Jolt the default 3D physics for new projects and D3D12 the default on Windows (UNVERIFIED today).

## How to re-check

1. https://godotengine.org/download/archive/ for the newest stable and pre-release.
2. https://godotengine.org/releases/ and the "Upgrading to Godot 4.x" pages under https://docs.godotengine.org/en/stable/tutorials/migrating/ for breaking changes.
3. https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/index.html for C# platform status.
4. https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html for web export limits.
