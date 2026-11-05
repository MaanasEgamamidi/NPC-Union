---
title: Prototyper reference facts
tags: [prototyping, greybox, blockout, playtesting]
sources: [https://docs.unity3d.com/Manual/index.html, https://docs.godotengine.org/en/stable/, https://dev.epicgames.com/documentation/en-us/unreal-engine]
last_verified: UNVERIFIED
---

# Prototyper reference facts

Version and tool specifics that change. Check each against current engine docs before relying on it.

- Unity: ProBuilder is distributed as a package through the Package Manager for greyboxing. UNVERIFIED for current Unity versions.
- Godot 4: CSG nodes (CSGBox3D, CSGCombiner3D) are suitable for blockout but documented as costly for final geometry. UNVERIFIED.
- Unreal Engine 5: modeling tools and geometry script support in-editor blockout; default scale 1 unit = 1 cm. Scale UNVERIFIED for future versions.
- Unity and Godot 3D physics assume 1 unit = 1 m by convention. UNVERIFIED.
- Coyote time and jump buffer starting values near 0.1 s are a community heuristic, not an engine default. UNVERIFIED.
- "Five testers per round" comes from usability testing practice (Nielsen Norman Group) and is a heuristic for prototypes. UNVERIFIED as applied to fun testing.
