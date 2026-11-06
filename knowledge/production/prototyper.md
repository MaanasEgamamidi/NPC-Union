---
title: Prototyper reference facts
tags: [prototyping, greybox, blockout, playtesting]
sources: ["https://docs.unity3d.com/Manual/index.html", "https://docs.godotengine.org/en/stable/", "https://dev.epicgames.com/documentation/en-us/unreal-engine"]
last_verified: 2026-11-05
---

# Prototyper reference facts

Version and tool specifics that change. Check each against current engine docs before relying on it.

- Unity: ProBuilder is distributed through the Package Manager for greyboxing. [Unity 6 package documentation](https://docs.unity3d.com/6000.0/Documentation/Manual/com.unity.probuilder.html).
- Godot CSG nodes are intended for prototyping; creation and moving overlapping CSG nodes have significant CPU costs. [Godot CSGBox3D](https://docs.godotengine.org/en/stable/classes/class_csgbox3d.html).
- For Unreal blockouts, check modeling tools, geometry scripting and unit scale in the documentation for the project version.
- [Godot 4.6](https://docs.godotengine.org/en/4.6/tutorials/3d/introduction_to_3d.html) uses 1 unit = 1 m for 3D, with physics tuned to that scale. Check Unity physics scale against the project version documentation.
- Choose coyote time and jump-buffer windows as project-specific tuning values; measure missed inputs and adjust through playtests.
- [Nielsen Norman Group](https://www.nngroup.com/articles/usability-testing-101/) recommends five participants for a typical qualitative usability study of one user group; do not treat that number as evidence of fun or as a quantitative sample size.
