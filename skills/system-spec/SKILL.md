---
name: system-spec
description: "Write a formula-complete spec for one game system: variable table, output range, tuning knobs, interaction matrix and feedback loops."
owner: systems-designer
disable-model-invocation: true
argument-hint: "[system name] [player goal]"
---

# System spec

## Inputs

- System name and the player-facing goal (what the player should feel or decide).
- Input ranges (levels, stats, timers) and the formulas it touches.
- If ranges are missing, ask once; otherwise assume and label ASSUMED.

## Steps

1. List the system's implied subsystems (for example combat implies damage calc, health, status effects, death/respawn, UI feedback) and mark which are in scope.
2. For each formula: write the named expression, then the variable table (symbol, type, range, meaning).
3. Compute output at min inputs, max inputs and three middle points. State the output range and the inputs producing each end. Flag unusable outputs (negative, zero, divide by zero, overflow) and add a clamp or floor.
4. Write one worked example with concrete numbers.
5. Name the tuning knobs (ideally 1-3, orthogonal) with default, safe range and what each changes.
6. If the system has interacting elements, build the interaction matrix: every row x column cell filled or "no effect". Run a chain check: apply rules repeatedly and confirm they terminate.
7. List feedback loops: positive or negative, intended or not, and the damper.
8. Write the data table columns the programmer will implement.

## Output

```
# System spec: <name>
Player goal:
In scope / out of scope:
## Formula <n>: <name>
Expression:
| Symbol | Type | Range | Meaning |
Output range: min <v> at <inputs>; max <v> at <inputs>; clamp/floor:
Worked example:
## Tuning knobs
| Knob | Default | Safe range | Effect |
## Interaction matrix
|        | <B1> | <B2> |
| <A1>   |      |      |
Chain check: terminates? <yes/no, longest chain>
## Feedback loops
| Loop | +/- | Intended | Damper |
## Data table columns
## Assumptions and open questions
```

## Done when

- [ ] Every formula has variable table, output range and worked example.
- [ ] No reachable unusable output without a clamp.
- [ ] Knobs listed with safe ranges.
- [ ] Every matrix cell filled; chain check done.
- [ ] Every loop labelled intended or not.
