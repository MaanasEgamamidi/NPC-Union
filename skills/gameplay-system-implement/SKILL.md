---
name: gameplay-system-implement
description: "Turn a gameplay design spec into code: transition table, tunable data asset, implementation and headless tests. Use when a mechanic spec is ready to build."
owner: gameplay-programmer
disable-model-invocation: true
argument-hint: "[path to design spec or mechanic name]"
---

# Gameplay system implement

From spec to a working, tunable, tested mechanic. Patterns reference: `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/programming/gameplay-patterns.md`.

## Inputs

- The design spec (file path or pasted text).
- Engine and pinned version, language, fixed step rate, target display rates.
- Online or offline (online changes where input and state live; involve netcode-architect).

If engine or version is missing, ask once; if still missing, write engine-agnostic pseudocode and list engine calls to confirm.

## Steps

1. Extract every rule into a numbered list. Mark each number given by the spec, and each one missing.
2. For every missing number, propose a default and a safe range with units. Flag these as "designer to confirm".
3. Write the state list and the transition table (state x event -> next state, plus guard). Every empty cell becomes a question to game-designer.
4. Define the data asset: one field per tuning value, unit in the field name (`dashDurationSec`, `maxSpeedUnitsPerSec`). No literals in logic code.
5. Decide the update split: input read and timestamped in the per-frame update, simulation in the fixed step, presentation (animation, VFX, sound triggers) via events.
6. Implement the state machine with explicit enter/exit per state. Timers count in seconds with dt from the fixed step.
7. Inject time and input behind an interface so tests can drive the system without the engine loop.
8. Write tests: one per rule, one per edge case in the spec, plus "frame-rate independence" (same input script at 30, 60 and 144 Hz update rates gives the same result within a tolerance).
9. Add a debug overlay: current state, active timers, velocity.
10. Verify each engine API used against the official docs for the pinned version. Note any you could not confirm.

## Output

```markdown
## <Mechanic> implementation
Engine: <name version> | Fixed step: <Hz> | Files: <list>

### Transition table
| State | Event | Guard | Next |
|---|---|---|---|

### Tuning data
| Field | Default | Range | Source (spec / proposed) |
|---|---|---|---|

### Tests
| Test | Rule/edge case | Status |
|---|---|---|

### Open questions for design
1. ...

### APIs verified
- <API>: <docs URL, version>
```

## Done when

- [ ] No literal tuning numbers in logic code.
- [ ] Transition table has no unexplained empty cells.
- [ ] Every spec rule and edge case has a test.
- [ ] Frame-rate independence test passes.
- [ ] Proposed defaults are flagged for design sign-off.
