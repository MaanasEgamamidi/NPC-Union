---
name: godot-project-setup
description: Sets up a new Godot 4 project: version, renderer, GDScript or C#, folders, autoloads, export presets and web caveats. Use when starting a Godot project.
owner: godot-specialist
disable-model-invocation: true
argument-hint: "[game type, target platforms, preferred language]"
---

# Godot project setup

## Inputs

- Target platforms (desktop, web, Android, iOS, console through a porting partner).
- 2D or 3D, and rough visual ambition.
- Language preference (GDScript, C#, or GDExtension for a specific hot path).
- Team size and whether anyone already knows C#.
Ask only for what is missing. If web is a target, settle steps 2 and 3 before asking anything else.

## Steps

1. Open https://godotengine.org/download/archive/ and note the newest `-stable` and any beta. Pick the newest stable minor for new work. Record the date checked. Compare with `knowledge/technical/engines/godot.md`; if the page is newer, say so.
2. Renderer: web target or very low-end hardware means Compatibility. Mobile-first 3D means Mobile. Desktop 3D with high fidelity means Forward+. Write the reason in one line.
3. Language: web target means GDScript (C# cannot export to web in Godot 4; re-check the C# docs page). C# only if the team knows it and accepts the .NET editor build plus .NET export templates. GDExtension only for a measured hot path.
4. Create the folder layout:
   ```
   res://
     autoload/      global singletons only
     scenes/        one folder per feature (player/, enemies/, ui/)
     resources/     .tres data (stats, items)
     scripts/shared reusable component scripts
     assets/        art, audio, fonts (import settings committed)
     addons/        third-party plugins
   ```
5. Autoloads: start with at most `Events` (signal bus), `Settings`, `SaveGame`. For each one, write why it must outlive scenes. Reject any autoload that stores a scene node.
6. Input: define actions in Project Settings > Input Map (`move_left`, `jump`, `pause`), never raw keycodes in scripts.
7. Display: set base resolution, stretch mode and aspect. Pixel art: viewport stretch, integer scaling, Nearest texture filter in the project default.
8. `.gitignore`: ignore `.godot/` and `*.translation` builds; commit `*.import` and `*.uid` files. Add Git LFS rules for `*.png *.wav *.ogg *.glb` if assets are large.
9. Export presets: install export templates matching the editor version exactly. Create one preset per target. For Web: single-threaded by default; enable threads only if the host can send COOP `same-origin` and COEP `require-corp`. Note audio: Sample playback by default, request a user gesture before playing sound.
10. Smoke test: export an empty scene to every target in week one, especially web.

## Output

```
## Godot setup: <project>
Version: <x.y.z-stable> (checked <date> at godotengine.org/download/archive)
Renderer: <Forward+ | Mobile | Compatibility>, because <reason>
Language: <GDScript | C# | mixed>, because <reason>
Targets: <list>, export templates <version>
Folders: <tree>
Autoloads: <name>: <why it outlives scenes>
Input actions: <list>
Display: <base res>, stretch <mode>, aspect <aspect>
Web notes: threads <on/off>, headers <needed/not>, audio playback <Sample/Stream>
Risks / UNVERIFIED: <list>
```

## Done when

- [ ] Version and date checked are written down from the official archive page.
- [ ] Renderer and language each have a one-line reason, and neither conflicts with a target platform.
- [ ] Every autoload has a justification.
- [ ] `.gitignore` excludes `.godot/` and keeps `.import` and `.uid` files.
- [ ] Every target has an export preset and a successful empty export.
