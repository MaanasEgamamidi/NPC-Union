---
name: strategy-genre-review
description: Audit a strategy game design (RTS, 4X, tactics, grand strategy) against the genre loop, pillars, failure modes, and scope traps. Use before prototyping.
owner: strategy-expert
disable-model-invocation: true
argument-hint: "[design doc path or short pitch]"
---

# Strategy genre review

A repeatable audit of a strategy design. It produces a risk list and next actions.

## Inputs

- A design doc, pitch, or one-page summary.
- Subgenre (RTS, 4X, turn-based tactics, grand strategy, auto-battler, hybrid). Ask if missing.
- Player mode: single player, multiplayer, or both. Ask if missing.
- Target session and match length. Ask if missing.
- Planned factions, unit counts, and map count, if known.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/genres/strategy.md`.
2. Write the core loop as one sentence: observe, decide, act, resolve. If the doc cannot support one sentence, stop and report that as the first finding.
3. Name the main decision per turn (or per minute in real time). List at least two viable answers. If only one answer is ever right, mark it as a dominant strategy.
4. Walk the three phases (early, mid, late). For each, note the main decision, the likely failure (solved opening, mid-game grind, late-game snowball), and one fix.
5. Audit information: what is visible, what is hidden, and whether scouting or intel is worth its cost.
6. Audit counters: are they soft or hard? Is there any unit, build, or policy with no answer?
7. Estimate turn time or APM demand at the start and near the end. Flag growth of more than three times as a micromanagement risk.
8. Pick two or three reference games from the knowledge file and state what this design should copy or avoid from each.
9. Run the scope trap list from the knowledge file. Flag each trap that applies, with a cut suggestion.
10. Write next actions, each tagged with an NPC Union agent. Mark anything not checked as UNVERIFIED.

## Output

```
# Strategy review: <game name>

Subgenre: <...>   Mode: <SP/MP/both>   Match length: <...>

## Core loop
<one sentence>

## Main decision
<decision> | Viable answers: <a>, <b>, <c> | Dominant strategy risk: <yes/no + why>

## Phase risks
| Phase | Main decision | Likely failure | Fix |
|---|---|---|---|
| Early | | | |
| Mid | | | |
| Late | | | |

## Information and counters
- Visible / hidden: <...>
- Counters: <soft/hard, gaps>

## Turn time / APM
<start vs late estimate, risk>

## References
- <game>: copy <...>, avoid <...>

## Scope flags
- <trap>: <cut suggestion>

## Next actions
1. <action> (agent: <name>)

## Unverified
- <claims not checked>
```

## Done when

- [ ] Core loop is one sentence, or its absence is the first finding.
- [ ] Main decision has at least two viable answers listed, or a dominant strategy is flagged.
- [ ] All three phases have a failure and a fix.
- [ ] Information and counters are both covered.
- [ ] At least two reference games from the knowledge file are cited.
- [ ] Every applicable scope trap has a cut suggestion.
- [ ] Every next action names an agent.
- [ ] Unverified claims are listed.
