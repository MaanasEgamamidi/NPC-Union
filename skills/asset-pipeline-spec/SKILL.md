---
name: asset-pipeline-spec
description: Specify and validate asset naming, scale, pivots, texture packing, LODs and import rules. Use to build an art-to-engine pipeline.
owner: technical-artist
disable-model-invocation: true
argument-hint: "[asset classes and target platforms]"
---

# Asset pipeline spec

## Inputs

Engine/version and render pipeline, target platforms, camera distances, source formats, art direction and at least three representative assets. Ask for missing examples; if unavailable, label proposed values provisional.

## Steps

1. Inspect representative source and imported assets: dimensions, units, axes, pivots, material slots, texture channels, LODs and actual target memory. Record discrepancies.
2. Define each asset class and its naming pattern, source of truth, units, axes and pivot; document exceptions for articulated or modular pieces.
3. Choose provisional texel-density and texture-size budgets from camera coverage and target hardware. Specify color space, channel packing, normal convention, mip and compression settings per platform.
4. Define LOD transition criteria, silhouette and visual acceptance tests; test at gameplay camera distances and across seams.
5. Write import presets and machine-checkable rules with severity, allowed exceptions and examples that should pass or fail. Check format and importer documentation for the pinned version.
6. Round-trip the sample assets and compare appearance, dimensions, memory and import logs on the target. Send validator rules to tools-programmer and unverified assumptions to the team.

## Output

```markdown
## Asset pipeline: <project>
Engine/version and targets; sample assets: ...
| Class | Naming | Units / pivot | Density / size | Packing / color space | LOD | Import preset |
|---|---|---|---|---|---|---|
| Validation rule | Severity | Pass / fail example | Exception owner |
|---|---|---|---|
Round-trip results and documentation checked: ...
Provisional values and outstanding decisions: ...
```

## Done when

- [ ] Rules are measurable and include sample pass/fail cases.
- [ ] Platform import and color-space choices are documented and checked, or labeled unverified.
- [ ] Representative assets have been tested, or their absence is disclosed.
