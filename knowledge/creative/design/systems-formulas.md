---
title: Systems design formulas, curves and simulation
tags: [systems-design, damage-formula, armour, diminishing-returns, monte-carlo, emergence, machinations]
sources: ["https://wiki.leagueoflegends.com/en-us/Armor", "https://gdcvault.com/play/1024562/Change-and-Constant-Breaking-Conventions", "https://machinations.io/"]
last_verified: 2026-11-05
---

# Systems design formulas, curves and simulation

## Mitigation forms

| Form | Expression | Behaviour | Pitfall |
|---|---|---|---|
| Subtractive | max(floor, atk - def) | Sharp breakpoints | Weak multi-hit attacks hit 0 without a floor |
| Percentage cap | atk x (1 - min(cap, def x r)) | Simple | Cap becomes the only target |
| Hyperbolic | atk x K / (K + def) | Smooth, never 0 | Needs K tuned per game |

League of Legends (wiki fetched 2026-11-05): post-mitigation = damage x 100 / (100 + armour) for armour >= 0; damage x (2 - 100 / (100 - armour)) for negative armour. 100 armour halves damage; -100 armour gives +50% damage taken. Patches can change this: re-check.

Effective health with the hyperbolic form: EHP = HP x (1 + def / K), linear in defence.

## Diminishing returns

| Curve | Expression | k means |
|---|---|---|
| Hyperbolic | cap x x / (x + k) | x giving half the cap |
| Exponential | cap x (1 - e^(-x / k)) | x giving about 63% of cap |
| Piecewise soft cap | slope s1 until c1, s2 after | designer-set breakpoint |

## Stacking buckets

Additive within a bucket (1 + a + b), multiplicative across buckets ((1 + a)(1 + c)). Write the bucket for every modifier.

## Emergence: Breath of the Wild

For the Breath of the Wild systems discussion, consult the [GDC Vault session](https://gdcvault.com/play/1024562/Change-and-Constant-Breaking-Conventions); watch it before attributing specific terminology or element lists to the speakers.

## Monte Carlo recipe

1. Fix a seed; log it.
2. 10,000+ trials per configuration.
3. Report mean, median, P5, P95; histograms if variance matters.
4. Compare configurations on the same seeds (common random numbers) to reduce noise.

## Tools

- Spreadsheet: one formula across a range, curve plots.
- Script (node, python): thousands of seeded trials, dominance checks.
- Machinations (machinations.io): diagram and simulate economies and loops; site advertises a free start with no credit card (2026-11-05); check pricing page for limits.
