---
name: rpg-genre-review
description: Audit an RPG design against the genre's core loop, pillars, failure modes and scope traps, with reference game comparisons.
owner: rpg-expert
disable-model-invocation: true
argument-hint: "[design doc path or short RPG pitch]"
---

# RPG genre review

A repeatable audit of a role-playing game design.

## Inputs

- A design doc, pitch, or feature list.
- If missing, ask: combat style (turn-based, real-time, hybrid), party or solo, target play length, number of major branches or endings, number of stats and classes, team size.

## Steps

1. Read `knowledge/genres/rpg.md` for the loop, pillars, failures and reference games.
2. Write the design's core loop in one line and compare it to the genre loop. Note any missing step (for example no loot, or no choice).
3. Score each design pillar from the knowledge file (character growth, meaningful choice, world and story, party or build identity, readable systems) from 1 to 5 with one sentence of evidence.
4. List every stat and skill. For each, name its effect in combat, dialogue and exploration. Flag any with fewer than two visible effects.
5. List every major choice and where it pays off. Flag choices with no later consequence.
6. Check the progression curve: XP growth shape, level scaling rules, loot tier growth against enemy growth. Flag flat or runaway curves.
7. Check against each common failure in the knowledge file and mark it present, at risk, or clear.
8. Estimate scope: hours of content, number of companions, branches, and endings against team size. Compare to the scope traps list.
9. Pick two or three reference games with matching combat style and scope and say what to study in each.
10. Name the next agents to hand off to and what each needs.

## Output

```
# RPG review: <project name>

**Loop:** <one line>

## Pillar scorecard
| Pillar | Score (1-5) | Evidence |
|---|---|---|

## Stat and choice payoffs
| Item | Type | Payoffs | Flag |
|---|---|---|---|

## Progression check
- XP curve: <shape and risk>
- Scaling: <rule and risk>
- Loot vs enemies: <risk>

## Top three risks
1. <risk>: <fix>
2. <risk>: <fix>
3. <risk>: <fix>

## Scope estimate
<content counts vs team size, cut suggestions>

## Reference games
| Game | What to study | Link |
|---|---|---|

## Handoffs
- <agent>: <what they need>

UNVERIFIED: <list or "none">
```

## Done when

- [ ] Loop written in one line.
- [ ] Every pillar scored with evidence.
- [ ] Every stat and major choice checked for payoffs.
- [ ] Progression curve, scaling and loot growth checked.
- [ ] Every common failure marked present, at risk, or clear.
- [ ] Scope compared to team size with cut suggestions.
- [ ] At least two reference games with links.
- [ ] Handoffs name real NPC Union agents.
- [ ] Unchecked claims tagged UNVERIFIED.
