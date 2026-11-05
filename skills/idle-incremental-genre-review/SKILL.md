---
name: idle-incremental-genre-review
description: Audit an idle or incremental game design against the genre loop, pacing, prestige math, offline rules, and scope traps.
owner: idle-incremental-expert
disable-model-invocation: true
argument-hint: "[design doc path, cost spreadsheet, or short pitch]"
---

# Idle incremental genre review

A repeatable teardown of an idle or incremental design.

## Inputs

- The design doc, pitch, or prototype notes.
- Cost and output formulas, or a spreadsheet. If missing, ask for growth rates per generator.
- Platform and target session length. If missing, ask.
- Whether the game has offline progress and an active clicking phase. If missing, ask.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/genres/idle-incremental.md` for the loop, pillars, and failures.
2. Map the loop as earn, buy, multiply, reset. List every currency, its source, and its sinks.
3. Write down cost growth and output growth for each generator. Flag cost growth far outside roughly 1.07 to 1.15 per unit as a pacing risk to confirm.
4. Build a pacing table for the first hour: minute, unlock, new decision. Flag any gap over about five minutes with no new purchase or decision.
5. Check milestones and multipliers: do they arrive before a generator stalls?
6. Check prestige: currency formula (root or log of lifetime earnings is safer than linear), time to first reset, and time for run two to reach the run one peak.
7. Check offline progress: cap, rate, and the return screen. Flag uncapped gains.
8. Check automation: is each auto-buyer unlocked after the player has done that task by hand?
9. Check number limits and display: when values pass 1e308, which library is used, and which notation players can choose.
10. Check layers: does each new layer change decisions, or only scale numbers?
11. Check monetization pressure, if any: boosts must be optional speedups, not walls. Send details to monetization-designer.
12. Rank risks by severity and name a fix and an owner agent for each.

## Output

```
# Idle review: <game name>
## Loop map
earn -> buy -> multiply -> reset: <one line each>
Currencies: <name: source / sinks>
## Pacing (first hour)
| Minute | Unlock | New decision |
## Prestige check
Formula: <...>  First reset at: <...>  Run two regains peak at: <...>
## Offline and automation
Offline cap: <...>  Auto-buyer timing: <...>
## Number limits
Max expected value: <...>  Library: <...>  Notation options: <...>
## Risks
| Severity | Risk | Evidence | Fix | Owner agent |
## Open questions
- <...>
```

## Done when

- [ ] Every currency has a source and a sink listed.
- [ ] The first-hour pacing table has no unexplained gap over about five minutes.
- [ ] Prestige formula and payback time are stated or marked missing.
- [ ] Offline cap and automation timing are stated or flagged.
- [ ] Number limit and display plan are stated.
- [ ] Each risk has a severity, a fix, and an owner agent.
- [ ] Unchecked claims are marked UNVERIFIED.
