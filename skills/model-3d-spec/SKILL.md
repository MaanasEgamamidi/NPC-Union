---
name: model-3d-spec
description: Turns a sentence or reference image into a 3D model spec, generation prompt, cleanup plan, and glTF/GLB export checklist.
owner: modeler-3d
disable-model-invocation: true
argument-hint: "[asset description or image path] [engine] [platform]"
---

# Model 3D spec

A repeatable procedure for going from a sentence or picture to a game-ready model that imports at the right size.

## Inputs

- Asset description or reference image (front view required, side or back view preferred).
- Target engine (Unity, Unreal, Godot, web/three.js) and platform (mobile, PC/console, VR, web).
- Camera distance: first-person, third-person, top-down, or UI/hero.
- Deforms or static? Has moving parts (lids, doors, wheels)?
- Project texel density and triangle budget, if set.

If engine or camera is missing, ask once. If still missing, assume third-person, Unity, metres, and state the assumption at the top of the output.

## Steps

1. Write real-world dimensions in metres for the asset. Compare against a 1.8 m human reference.
2. Pick a triangle budget for LOD0 from `${CLAUDE_PLUGIN_ROOT}/knowledge/creative/art/modeler-3d.md`, then set LOD1 at about 50% and LOD2 at about 25%.
3. If generating, write a prompt for one object, neutral even lighting, plain background, no cast shadows, three-quarter front view. Generate moving parts in their closed or rest state.
4. Inspect the raw mesh: hidden faces, floating islands, non-manifold edges, fused parts, baked lighting in albedo.
5. Choose decimate (static, far, hard-surface) or retopo (deforms, close camera, characters). List the edge loops required at joints.
6. Split moving parts into separate objects and set each pivot (base centre, hinge, axle, or grip).
7. UV: seams on every hard edge, texel density checked with a checker texture, padding per texture size.
8. Bake normals (OpenGL green-up for glTF) and AO from the high-poly source. Pack ORM as R occlusion, G roughness, B metallic.
9. Apply rotation and scale, export GLB with +Y up, and run the Khronos glTF Validator.
10. Import into the target engine. Check size, facing direction, normals, vertex count after splits, and LOD switching.

## Output

```markdown
# <asset name> model spec
Assumptions: <engine, platform, camera>
Size (m): W <> x D <> x H <>   Reference check: pass/fail
Budget: LOD0 <> tris | LOD1 <> | LOD2 <>
Pivot(s): <part: location>
UVs: <texture size>, <px/cm>, padding <px>
Textures: baseColor, normal (OpenGL), ORM (R=AO, G=rough, B=metal)
Generation prompt: "<prompt or n/a>"
Cleanup plan:
1. <step>
Export: GLB, +Y up, transforms applied, validator: <errors/warnings>
Engine check: size <>, facing <>, normals <>, verts <>, LOD switch <>
Open questions / UNVERIFIED: <list>
Next agent: <name> needs <what>
```

## Done when

- [ ] Dimensions are in metres and checked against a 1.8 m reference.
- [ ] Every LOD has a triangle count at or under budget.
- [ ] Each moving part has its own object and correct pivot.
- [ ] Hard edges sit on UV seams; texel density matches the project value.
- [ ] Transforms applied; object scale is 1,1,1.
- [ ] GLB exported +Y up and glTF Validator reports no errors.
- [ ] Engine import shows correct size and facing.
- [ ] Assumptions and unverified items are listed.
