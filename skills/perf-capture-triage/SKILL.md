---
name: perf-capture-triage
description: Turn a profiler capture into a named bound (CPU, GPU, memory, IO) with numbers, ranked fixes with owners, and a re-measure plan.
owner: performance-engineer
disable-model-invocation: true
argument-hint: "[capture file or pasted profiler numbers, platform, target Hz]"
---

# Perf capture triage

## Inputs

- A capture or pasted numbers: frame time, main thread, render thread, GPU time, top zones or markers.
- Target platform tier and refresh rate (60, 30, 120 Hz).
- Build type (editor, development, release) and what the player was doing.
- If there is no capture: stop and give the capture steps from `knowledge/technical/programming/profilers.md` for that engine.

## Steps

1. Convert the target to ms (1000 / Hz). Set the working budget at 85 to 90 percent of it.
2. Record median, p95, p99 frame time and frames over budget per minute. If only an average exists, ask for a 60-second capture.
3. Decide the bound:
   - GPU time close to frame time and CPU threads waiting on present or GPU fences: GPU-bound.
   - GPU idle gaps, main or render thread close to frame time: CPU-bound (name which thread).
   - Isolated tall frames with GC, file read, decompression, or shader compile markers: hitch (memory, IO, or PSO).
   - Memory rising across snapshots in a fixed state: leak or cache growth.
4. Run the split test for the bound: GPU, change render scale to 50 percent; CPU, disable the top zone's system for one capture; hitch, play the same path twice (second-pass hitch gone means compile or first-load).
5. List the top 3 zones by ms inside the bound. Ignore zones outside it.
6. For each, name a fix, its expected ms saved as a range, effort (S, M, L), and owner agent.
7. Write the re-measure plan: same scene, same path, same duration, same build type, compare median and p99.

## Output

```
## Triage: <scene> on <platform> (<build type>)
Target: <Hz> Hz = <ms> ms, working budget <ms> ms
Frame time: median <ms> | p95 <ms> | p99 <ms> | over-budget frames/min <n>
Threads: main <ms> | render <ms> | GPU <ms>
Bound: <CPU-main | CPU-render | GPU-pixel | GPU-vertex/submit | memory | IO | shader compile>
Evidence: <the two numbers that prove it>
Split test: <what was changed> -> <result>

| Rank | Zone | Cost ms | Fix | Expected saving | Effort | Owner |
|------|------|---------|-----|-----------------|--------|-------|

Re-measure: <exact steps>
Unverified: <anything estimated>
```

## Done when

- [ ] The bound is named with two numbers from the capture.
- [ ] No fix targets work outside the bound.
- [ ] Every fix has an owner and a savings range marked as an estimate.
- [ ] A re-measure plan matches the original capture conditions.
