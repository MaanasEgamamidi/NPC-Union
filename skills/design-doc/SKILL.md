---
name: design-doc
description: Writes a mechanic or system design doc sized to the change, from a tuning table up to a full spec with knobs and acceptance criteria. Use before building a mechanic.
owner: game-designer
disable-model-invocation: true
argument-hint: "[mechanic or change, e.g. 'add parry to block']"
adapted_from: Claude-Code-Game-Studios/.claude/skills/quick-design/SKILL.md
---

# Design doc

Sizes the document to the change, then fills only the sections that size needs. Section set adapted from the reference quick-design and design-system skills.

## Inputs

- The change in one line, the game brief or pillars, and any existing doc for the affected system.
- Missing pillars: ask once, then assume and mark `ASSUMED`.

## Steps

1. Classify the change:
   - **Tuning**: numbers only, no new behaviour.
   - **Tweak**: small behaviour change, no new states.
   - **Addition**: 1 or 2 new states or interactions in an existing system.
   - **New system**: anything larger; uses the full template.
2. Search existing design docs for the system. Quote the current rule you are changing; note conflicts.
3. Name the target aesthetic(s) from MDA and the pillar served. If none, say so and ask whether to proceed.
4. Write rules precise enough that a programmer needs no follow-up: states, transitions, timings in frames or seconds, what cancels what.
5. Write formulas with variable names, ranges and one worked number. Hand curves with many interacting terms to `systems-designer`.
6. List edge cases: zero and max values, simultaneous inputs, death mid-action, a dominant strategy and its counter.
7. List tuning knobs: default, range, category (feel, curve, gate), and why the default.
8. Write acceptance criteria: functional checks plus one feel question a playtester answers yes or no.
9. Name dependencies and which agents must review (e.g. `controls-designer` for input timing).

## Output

```markdown
# <Mechanic> (<Tuning|Tweak|Addition|New system>)
**Pillar / aesthetic:** <pillar>; <aesthetic(s)>
## Overview
<one paragraph>
## Current rule → new rule
> <quoted current rule, or "none">
<new rule>
## Rules
1. <state / transition / timing>
## Formulas
`<formula>` where <vars and ranges>. Example: <numbers>.
## Edge cases
- <case>: <handling>
## Tuning knobs
| Knob | Default | Range | Category | Why |
## Acceptance criteria
- [ ] <functional>
- [ ] Feel: <yes/no playtest question>
## Dependencies and reviewers
- <system>: <contract>; review by <agent>
```

## Done when

- [ ] Change is classified and the doc only has the sections it needs.
- [ ] Every timing has a unit (frames at a stated fps, or seconds).
- [ ] At least one degenerate strategy is named with its counter.
- [ ] Every knob has a range and a category.
- [ ] Acceptance criteria include a feel question.
