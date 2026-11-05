---
name: shader-cost-review
description: Review shader cost using target captures, compiled variants, texture sampling and overdraw. Use before optimizing materials or shader features.
owner: technical-artist
disable-model-invocation: true
argument-hint: "[shader and representative scene]"
---

# Shader cost review

## Inputs

Shader and material variants, engine/version, target GPU and resolution, representative scene, visual constraints and profiler capture. If no capture exists, provide hypotheses and a measurement plan rather than claiming a bottleneck.

## Steps

1. Record baseline GPU time, resolution, device conditions and scene coverage; identify relevant passes using a target-device frame capture.
2. Inventory texture samples, blending, alpha clipping, feature switches and compiled variants per pass. Check compiled statistics for the actual target; counts alone do not establish runtime cost.
3. Inspect screen coverage, overdraw and texture bandwidth as well as arithmetic. Compare a controlled material or feature toggle while holding camera, scene and settings constant.
4. Rank candidate changes by measured savings, visual risk and implementation cost. Consider reducing overlapping transparent area, samples or unused variants only when supported by evidence.
5. Apply one candidate at a time, recapture under the same conditions and compare timing and image quality at gameplay scale. Revert regressions; report thermal or measurement variance.
6. Check version-specific profiling and shader documentation, then hand remaining renderer changes to graphics-programmer and frame-wide bottlenecks to performance-engineer.

## Output

```markdown
## Shader review: <name>
Engine/version; target; scene; capture conditions: ...
| Pass / variant | GPU time | Samples / features | Coverage evidence |
|---|---|---|---|
| Change | Before / after ms | Visual impact | Status / next step |
|---|---|---|---|
Unmeasured hypotheses, source checks and handoff: ...
```

## Done when

- [ ] Baseline and comparison use comparable conditions, or are labeled not measured.
- [ ] Variant and overdraw concerns are tied to evidence rather than instruction counts alone.
- [ ] Visual impact, outstanding uncertainty and owner are recorded.
