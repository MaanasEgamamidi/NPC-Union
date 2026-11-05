---
name: frame-budget-plan
description: Set per-system frame time (ms) and memory budgets for each platform tier, with how each budget is measured and enforced.
owner: performance-engineer
disable-model-invocation: true
argument-hint: "[game type, engine, platform tiers, target Hz per tier]"
---

# Frame budget plan

## Inputs

- Engine and platform tiers (for example: min-spec PC, Steam Deck, mid phone, web).
- Target refresh per tier, and whether the game is GPU- or CPU-heavy by genre.
- Memory ceiling per tier. If unknown, ask; if the platform publishes one, look it up and cite it.
- Any existing captures of a representative scene.

## Steps

1. For each tier, compute frame ms (1000 / Hz) and keep 10 to 15 percent headroom unallocated.
2. Split CPU main-thread time across systems: gameplay, AI, physics, animation, UI, audio, scripting VM or GC, engine overhead. Start from a capture if one exists; otherwise start from the genre split and mark it provisional.
3. Split GPU time across passes: shadows, opaque, transparent and particles, post, UI.
4. Split memory: textures, meshes, audio, animation, code and heap, streaming pool, headroom.
5. For each line, name the profiler marker or stat used to measure it, so the budget is checkable.
6. Name the owner of each line and the enforcement: a CI perf test, a review checklist, or a per-milestone capture.
7. Mark every number without a capture behind it as provisional; schedule the capture that will confirm it.

## Output

```
## Frame budget: <game> (<engine>)
| Tier | Hz | Frame ms | Headroom ms | Memory ceiling MB |
|------|----|----------|-------------|-------------------|

### CPU main thread (<tier>)
| System | Budget ms | Marker / stat | Owner | Status (measured / provisional) |

### GPU (<tier>)
| Pass | Budget ms | Marker / stat | Owner | Status |

### Memory (<tier>)
| Category | Budget MB | How measured | Owner | Status |

Enforcement: <CI perf test, capture cadence>
Captures needed to confirm: <list>
```

## Done when

- [ ] Every tier sums to its frame ms minus headroom.
- [ ] Every line has a marker or stat to measure it and an owner.
- [ ] Provisional numbers are labelled.
- [ ] Memory ceilings cite a source or are marked UNVERIFIED.
