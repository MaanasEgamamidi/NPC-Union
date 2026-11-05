---
name: survival-crafting-genre-review
description: Audit a survival-crafting design against the genre loop, needs, progression gates, failure modes, and scope traps, and return a scored review with fixes.
owner: survival-crafting-expert
disable-model-invocation: true
argument-hint: "[pitch, design doc path, or feature list]"
---

# Survival-crafting genre review

A repeatable teardown of a survival-crafting design. Use `knowledge/genres/survival-crafting.md` as the reference.

## Inputs

- A pitch, design doc, or feature list.
- If missing, ask: single-player or multiplayer? Persistent or session-based world? What kills the player first? What is the end goal? How many recipes, biomes, and building pieces are planned?
- If answers are still missing after one round, write them as assumptions and continue.

## Steps

1. Read `knowledge/genres/survival-crafting.md` for the loop, pillars, failures, and reference games.
2. Write the core loop in one line (gather, craft, survive, expand) and mark the weakest step.
3. Find the first deadline: the first night, storm, or threat that forces the player to build. If none exists, flag it as a top risk.
4. List every need or survival stat. For each, note what refills it, what drains it, and which other need it competes with. Flag any need that competes with nothing as a chore.
5. List the progression tiers. For each tier, name the unlock object or event (boss drop, scanned fragment, new station, new ore) and the threat that guards it.
6. Check for a logistics friction rule (weight, portal limits, storage) that keeps exploration and hauling meaningful.
7. Check recipe discovery: how does the player learn a recipe without an outside wiki?
8. Check base purpose: what attacks, weathers, or rewards the base?
9. Check the long tail: what happens after the player has solved survival? Look for a world shift, endgame boss, or wipe or reset plan for multiplayer.
10. Score each pillar from 1 to 5 with one sentence of evidence.
11. Run the scope trap list from the knowledge file and propose cuts with a target number for each.
12. Pick three reference games from the knowledge file and say exactly what to study in each.
13. Name hand-offs to other NPC Union agents.

## Output

```
# Survival-crafting review: <title>

## Loop
<one line> | Weakest step: <step and why>

## First deadline
<what it is, when it arrives, or "missing">

## Needs
| Need | Drains from | Refilled by | Competes with | Verdict |
|---|---|---|---|---|

## Progression gates
| Tier | Unlock object/event | Guarding threat | New verb |
|---|---|---|---|

## Pillar scores
| Pillar | Score 1-5 | Evidence |
|---|---|---|

## Top risks and fixes
1. <risk>: <fix>

## Scope cuts
- <system>: from <planned> to <target>, because <reason>

## Study these
- <game>: <what to study>

## Hand-offs
- <agent>: <task>

## Assumptions and UNVERIFIED items
- <item>
```

## Done when

- [ ] The loop is written in one line with a weakest step named.
- [ ] A first deadline is identified or flagged missing.
- [ ] Every need has a competing need or is flagged as a chore.
- [ ] Every progression tier names an unlock object or event.
- [ ] Recipe discovery, base purpose, and long tail are each addressed.
- [ ] Every pillar has a score and evidence.
- [ ] At least three scope cuts or an explicit "no cuts needed" with reasons.
- [ ] Three reference games are named with specific things to study.
- [ ] Hand-offs name real NPC Union agents.
- [ ] Assumptions and unchecked facts are marked UNVERIFIED.
