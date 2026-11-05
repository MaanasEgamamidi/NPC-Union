---
name: balance-sweep
description: Sweep or Monte Carlo simulate a system's numbers to find outliers, dominated options, dead zones and variance problems, with a verdict.
owner: systems-designer
disable-model-invocation: true
argument-hint: "[system name or data file path]"
adapted_from: Claude-Code-Game-Studios/.claude/skills/balance-check/SKILL.md
---

# Balance sweep

## Inputs

- The formulas (ideally a `system-spec`) and the data (weapon table, curve, enemy stats).
- Target ranges for outputs (time-to-kill, time-to-level). If none exist, the verdict for target checks is NOT ASSESSED; do not invent targets.
- Record each input as FOUND or ABSENT before starting.

## Steps

1. Pick the domain: combat (DPS, time-to-kill), progression (XP to level, power per hour), loot (time to each rarity).
2. Deterministic sweep: compute outputs across a grid of inputs (each tier x each option). Put it in a table or CSV.
3. Stochastic runs, if randomness is involved: write a short seeded script (Bash with node or python), run at least 10,000 trials per cell, record mean, median, 5th and 95th percentile.
4. Compare each value with its target. Outside target = outlier row. No target = "not judged".
5. Dominance check: flag any option at least as good as another on every axis at every tier.
6. Curve checks: dead zones (no meaningful gain for too long), spikes (one step over 2x the previous), and caps hit early.
7. Pick the verdict by the worst finding: CRITICAL (dominant strategy, uncompletable progression, unbounded loop), CONCERNS (tunable outliers), NOT ASSESSED (missing data or targets), HEALTHY.
8. For each issue, propose a knob change and re-run the affected cells.

## Output

```
# Balance sweep: <system>
Inputs: <file> FOUND|ABSENT ...
Verdict: CRITICAL | CONCERNS | NOT ASSESSED | HEALTHY
## Sweep table
| Option | Tier | Mean | Median | P5 | P95 | Target | Status |
## Dominated / dominating options
## Curve problems
## Recommendations
| Priority | Issue | Knob change | Re-run result |
Seed and trial count:
```

## Done when

- [ ] Every input marked FOUND or ABSENT.
- [ ] Random systems run with a recorded seed and at least 10,000 trials.
- [ ] Percentiles reported, not only means.
- [ ] Dominance check done.
- [ ] Each recommendation re-run and its result shown.
