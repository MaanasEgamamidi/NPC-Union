---
name: render-pipeline-plan
description: Choose forward, deferred or forward+ and a graphics API, then lay out render passes with per-pass GPU budgets and measurement. Use when starting or auditing a renderer.
owner: graphics-programmer
disable-model-invocation: true
argument-hint: "[target platforms, fps, and game type]"
---

# Render pipeline plan

API status reference: `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/programming/rendering-apis.md`.

## Inputs

- Target platforms and the lowest-spec device by name.
- Output resolution and frame rate.
- Max dynamic lights on screen, shadowed lights, MSAA requirement.
- Transparency load (particles, foliage, glass) and post effects the art direction needs.
- Engine (and its available pipelines) or custom.

## Steps

1. Compute the frame budget: 1000 / fps. Reserve headroom: 30% on mobile and handheld, 10-15% on desktop/console. The remainder is the GPU budget.
2. Choose the render path:
   - Forward: few lights (under ~8 affecting any pixel), MSAA wanted, mobile.
   - Forward+ (tiled/clustered): many lights, MSAA wanted, transparency lit the same way.
   - Deferred: many lights, heavy screen-space effects, desktop/console bandwidth, or on-tile deferred on mobile via subpasses/tile memory.
   Write one sentence on why the others lose.
3. Choose the API per platform (Vulkan, Direct3D 12, Metal, WebGPU, OpenGL ES fallback). Check the knowledge file and official pages for current support; mark browser support claims with the date checked.
4. List passes in execution order: shadows, depth prepass (if any), opaque, sky, transparent, post chain, UI. For each give resolution, render target formats, and load/store actions.
5. Assign budgets in ms per pass that sum to at most the GPU budget. Show the sum.
6. For each pass write the measurement method (timestamp queries, RenderDoc, PIX, Xcode, Android GPU Inspector, Nsight) and the first thing to cut if over.
7. Note bandwidth risks on tile GPUs: any pass that loads or stores a full-resolution target it doesn't need.
8. List shader variant keywords and an estimate of variant count.
9. Handoffs: material/art budgets to technical-artist, markers to performance-engineer.

## Output

```markdown
# Render plan: <game>, <date>
Target: <device>, <res> @ <fps> | Frame <ms> | GPU budget <ms> (headroom <%>)
Path: <forward / forward+ / deferred> because <...>. Rejected: <...>
API: <per platform>, support checked <date> (<links>)

| # | Pass | Res | Targets / formats | Load/store | Budget ms | Measure with | Cut first |
|---|---|---|---|---|---|---|---|
| | Total | | | | x.x | | |

Variant keywords: <list> -> <count> variants
Bandwidth risks: <list>
```

## Done when

- [ ] Budgets sum to no more than the GPU budget after headroom.
- [ ] Render path choice states why alternatives lose.
- [ ] Every pass has a measurement method and a cut-first item.
- [ ] API support claims cite a source and date.
