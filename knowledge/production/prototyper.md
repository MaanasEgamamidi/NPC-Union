---
title: Prototyper reference facts
tags: [prototyping, greybox, blockout, playtesting]
sources: [https://docs.unity3d.com/Manual/index.html, https://docs.godotengine.org/en/stable/, https://dev.epicgames.com/documentation/en-us/unreal-engine]
last_verified: 2026-11-05
---

# Prototyper reference facts

Version and tool specifics that change. Check each against current engine docs before relying on it.

- Unity: ProBuilder is distributed through the Package Manager for greyboxing. [Unity 6 package documentation](https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.probuilder.html).
- Godot CSG nodes are intended for prototyping; creation and moving overlapping CSG nodes have significant CPU costs. [Godot CSGBox3D](https://docs.godotengine.org/en/stable/classes/class_csgbox3d.html).
- Unreal Engine 5: modeling tools and geometry script support in-editor blockout; default scale 1 unit = 1 cm. Scale UNVERIFIED for future versions.
- [Godot 4.6](https://docs.godotengine.org/en/4.6/tutorials/3d/introduction_to_3d.html) uses 1 unit = 1 m for 3D, with physics tuned to that scale. Unity physics scale: UNVERIFIED; check the project version.
- Coyote time and jump buffer starting values near 0.1 s are a community heuristic, not an engine default. UNVERIFIED.
- [Nielsen Norman Group](https://www.nngroup.com/articles/usability-testing-101/) recommends five participants for a typical qualitative usability study of one user group; do not treat that number as evidence of fun or as a quantitative sample size.
