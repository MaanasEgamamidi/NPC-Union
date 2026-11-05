---
name: physics-plausibility-check
description: "Back-of-envelope check of a game mechanic's physics numbers: units, orders of magnitude, scaling laws, with a pass/adjust table."
owner: physics-engineering-expert
disable-model-invocation: true
argument-hint: "[mechanic and its numbers with units]"
---

# Physics plausibility check

A fast sanity check of the numbers behind a mechanic.

## Inputs

- The mechanic and every number it uses, with units. Ask for units if any are missing.
- Realism level: toy, plausible, or teaching-accurate. If missing, assume plausible and say so.
- Engine, if known (affects solver artefacts).

## Steps

1. List every quantity. Convert to SI (m, kg, s, N, Pa, J, W). Note the game's unit scale (for example 1 unit = 1 m).
2. For each quantity, write the governing relation: weight = m x g (g_n = 9.806 65 m/s^2, NIST CODATA); drag D = 0.5 x rho x V^2 x A x Cd (NASA Glenn); stress = force / area; beam deflection scales with span^3 (point load) or span^4 (distributed load).
3. Find a sourced reference value and record the source and grade (Engineering ToolBox for modulus, NIST Chemistry WebBook for fluids, NASA Glenn for aero).
4. Compute the ratio game / real. Within 2x is usually invisible; 10x or more is noticeable to experts.
5. Apply scaling checks: if something is scaled by k, mass goes k^3 and strength k^2 (square-cube law); speed doubling means drag x4 and power x8.
6. Separate engine artefacts (joint springiness, jitter from large mass ratios between connected bodies) from physics errors. Do not "fix" an artefact by changing physics values without telling `physics-programmer`.
7. Give a verdict per row: pass, adjust (with a suggested value), or fake on purpose (with the design reason).
8. Add safety notes if the mechanic could teach an unsafe real practice; keep such content non-instructional.

## Output

```
## Plausibility check: <mechanic>
Realism level: <...> (default stated?)  Unit scale: <...>
| Quantity | Game value (unit) | Real reference (unit, source, grade) | Ratio | Verdict | Suggested value / reason |
Scaling laws applied: <...>
Engine artefacts: <...>
Safety notes: <...>
Handoffs: <agent>: <what they need>
```

## Done when

- [ ] Every quantity has a unit and an SI value.
- [ ] Every reference value has a source and grade or condition.
- [ ] At least one scaling law is checked where size or speed changes.
- [ ] Each row has pass, adjust, or fake-on-purpose with a reason.
- [ ] Engine artefacts are listed separately from physics errors.
