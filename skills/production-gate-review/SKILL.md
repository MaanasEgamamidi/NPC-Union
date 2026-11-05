---
name: production-gate-review
description: Review integrated production work with specialist briefs, evidence, trade-offs and a decision gate.
owner: production-lead
disable-model-invocation: true
argument-hint: "[project brief and decision]"
---

# Integrated production review

## Inputs

Project brief, current artifact or build, decision, constraints, capacity and evidence. Ask once for missing decision-critical inputs; otherwise state assumptions.

## Steps

1. Read the live catalog. Select the fewest written production specialists needed; record IDs, runtimes and dependencies. Identify Codex or unavailable work for the Steward.
2. Define an observable outcome and acceptance gate. Write briefs with input, scope, output, recipient and evidence. Sequence dependencies and identify independent work.
3. If execution is requested and permitted, spawn available Claude specialists; otherwise return a plan. Never claim unexecuted work as complete. Preserve sources, dates and uncertainty.
4. Compare results against the shared gate. Use the agreed ship criteria and player impact. Producer and qa-lead present options with cost and exposure; release-manager states deployment consequences. Escalate unmet gates and waivers to the Steward and authorized decision-maker.
5. Return a decision record, risks, owners, next actions and unverified claims. Send cross-division decisions and Codex briefs to the Steward.

## Output

```
Decision and assumptions: ...
| ID | Runtime | Status | Input | Deliverable | Dependency | Recipient |
|---|---|---|---|---|---|---|
Evidence and dated sources: ...
Conflict, options and decision owner: ...
Gate, risk and next action: ...
UNVERIFIED: ...
```

## Done when

- [ ] Every assignment exists in the catalog; availability and runtime are checked.
- [ ] Each brief has input, deliverable, dependency and recipient; status distinguishes planned from completed.
- [ ] Conflicts and evidence are attributable; unknowns remain UNVERIFIED.
- [ ] The gate and next action have an owner; Codex and cross-division work return to the Steward.
