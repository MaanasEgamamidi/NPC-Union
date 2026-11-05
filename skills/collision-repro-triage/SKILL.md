---
name: collision-repro-triage
description: Isolate missed or unstable physics contacts and verify a targeted correction. Use for tunneling, jitter and unexpected collision events.
owner: physics-programmer
disable-model-invocation: true
argument-hint: "[repro scene or collision symptom]"
---

# Collision repro triage

## Inputs

Repro scene or steps, engine and pinned version, units, timestep, body and shape types, initial transforms and velocities, expected versus observed result. If missing, request once; otherwise give an explicitly hypothetical test plan.

## Steps

1. Strip the scene to the smallest pair of colliders and a repeatable initial state. Record filters, materials, shape sizes, transforms and all motion writers.
2. Log per-tick positions, velocities, contacts and event timing. Compute speed times timestep and compare with obstacle thickness along motion.
3. Test one hypothesis at a time: filtering, initial overlap, duplicate transform writes, discrete tunneling, contact geometry, then solver settings as appropriate.
4. Select a minimal fix such as a swept query, supported continuous mode or removing a competing transform write. Verify engine-version documentation and body-pair limitations.
5. Replay baseline and fix at several speeds, orientations and frame stalls; include corners, moving bodies and spawn overlaps. Record actual results and any skipped test.
6. If networked, ask netcode-architect to evaluate authority and replay determinism; never promise determinism from a fixed step alone.

## Output

```markdown
## Collision triage
Engine/version; units; timestep; repro and initial state: ...
| Hypothesis | Experiment | Observation | Conclusion |
|---|---|---|---|
Fix and tradeoffs: ...
| Regression case | Expected | Actual / not run |
|---|---|---|
Docs checked and unresolved assumptions: ...
```

## Done when

- [ ] Repro and baseline are recorded, or explicitly unavailable.
- [ ] Each conclusion has an observation; untested hypotheses are labeled.
- [ ] Fix covers the identified pair and version, and regressions are recorded or marked not run.
