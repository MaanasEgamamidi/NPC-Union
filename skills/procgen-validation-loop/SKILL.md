---
name: procgen-validation-loop
description: Sets up invariants, a seed fuzz run, cross-platform hash checks and a failing-seed regression set for a procedural generator. Use when building or changing a generator.
owner: procedural-generation-engineer
disable-model-invocation: true
argument-hint: "[generator name or path] [seed count]"
---

# Procgen validation loop

A repeatable loop that proves a generator keeps its promises across many seeds and platforms.

## Inputs

- The generator entry point and how a seed is passed in. If there is no explicit seed parameter, stop and add one first.
- The player movement envelope (jump height, gap width, abilities by stage). Ask if missing.
- The must-hold invariants (reachability, key-before-lock, bounds, pacing). Ask: "What would make a level unshippable?"
- Target platforms, and whether seeds must match across them.
- Seed count. Default 1,000 locally and 10,000 in CI.

## Steps

1. Write each invariant as a pure function `check(level) -> pass | fail(reason)`. Use the real movement envelope for reachability (BFS or flood fill over traversable cells).
2. Add a stage hash (64-bit, over sorted integer data) after each generator stage. Log `seed, stage, hash`.
3. Run seeds 1 to N. For each seed record pass/fail per invariant, the failure reason, generation time, and two expressive range metrics chosen for this game (for example path length and enemy density).
4. Group failures by reason. For each group keep the lowest seed as the minimal repro.
5. Fix the generator, not the output. Do not add post-hoc patching that hides a structural bug unless it is documented as a repair stage with its own invariant.
6. If cross-platform determinism is required, run seeds 1 to 1,000 on each platform and diff stage hashes. Report the first diverging stage per seed.
7. Add every failing seed to a regression fixture list that runs on every commit.
8. Rerun until the pass criteria hold. Record generator version and template library version with the results.

## Output

```
Generator: <name> @ <version>   Templates: <version>
Seeds run: <N>   Platforms: <list>
Invariants:
  - <invariant>: <pass count>/<N>   worst seed: <seed>   reason: <text>
Determinism: <identical | first divergence at stage X for seeds ...>
Expressive range: <metric A> range <min-max>, <metric B> range <min-max>, clustering notes
Generation time: p50 <ms>, p99 <ms>
Regression seeds added: <list>
Next fix: <one line>
```

## Done when

- [ ] Every invariant has an automated check that runs per seed.
- [ ] N seeds ran with zero invariant failures, or every failure is filed with a seed.
- [ ] Stage hashes match across all required platforms for seeds 1 to 1,000.
- [ ] Failing seeds are in the regression list and run in CI.
- [ ] Generator and template versions are recorded with the report.
