---
title: Physics, interface and material reference notes
tags: [physics, ui, accessibility, gltf]
sources: [https://box2d.org/documentation/md_simulation.html, https://www.w3.org/TR/WCAG22/, https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html]
last_verified: 2026-11-05
---

- Box2D simulation: https://box2d.org/documentation/md_simulation.html ; last_verified: 2026-11-05. Continuous collision events can arrive on the following step; check the project's pinned engine and release.
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/ ; last_verified: 2026-11-05. Focus Visible is criterion 2.4.7; applicability to a particular game and platform is not assumed.
- Khronos glTF 2.0 material specification: https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html ; last_verified: 2026-11-05. Metallic-roughness texture uses green for roughness, blue for metallic, and linear transfer; base-color RGB is sRGB encoded. Check the project's format and importer.
