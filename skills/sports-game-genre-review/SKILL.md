---
name: sports-game-genre-review
description: Audit a sports game design against the genre's match loop, meta loop, pillars, failure modes, and scope traps, and return a scored review.
owner: sports-game-expert
disable-model-invocation: true
argument-hint: "[design doc path or a short pitch: sport, camp, modes, team size]"
---

# Sports game genre review

A repeatable audit of a sports game design. It checks the design against `knowledge/genres/sports.md`.

## Inputs

- The design doc or pitch.
- Sport, camp (sim, arcade, or management), target platform and input device, team size and timeline.
- Modes planned (quick match, career, franchise, collection, online ranked) and license plans.
- If any of these are missing, ask for them in one message. If the sport and camp are still unknown, stop and ask.

## Steps

1. Read `knowledge/genres/sports.md` for the loop, pillars, failures, and scope traps.
2. Name the camp. If one mode mixes sim and arcade rules, flag it.
3. Write the match loop in one line: verbs, scoring, match length. Count the core verbs; more than five for arcade is a warning.
4. Write the meta loop: what carries between matches (ratings, roster, cards, rank). If none, flag weak retention.
5. Count steps from boot to first touch of the ball (or puck, board, car). More than three menus before play is a warning.
6. Check feel: input response, animation lock vs control, camera, AI mistakes and difficulty method (flag hidden stat boosts).
7. Check licensing: list each real league, team, player, or venue. Ask what happens if it is lost. Recommend fictional fallbacks.
8. Check scope traps: roster size, commentary lines, stadium count, online netcode, yearly content.
9. Score each pillar 1 to 5 with one sentence of evidence.
10. Pick 2 to 4 reference games from the knowledge file and say what to study in each.
11. Name handoffs to other NPC Union agents with one action each.

## Output

```markdown
# Sports review: <project>
**Sport / camp:** <sport> / <sim | arcade | management>
**Match loop:** <verbs> -> <scoring> -> <match length>
**Meta loop:** <what carries over>
**Boot to first touch:** <n steps>

## Pillar scores
| Pillar | Score (1-5) | Evidence |
|---|---|---|

## Top risks
1. <risk>: <why> -> <fix>

## Scope traps
- <trap>: <cut or fallback>

## Study these
- <game>: <what to study>

## Handoffs
- <agent>: <action>
```

## Done when

- [ ] Camp named and mixed-camp modes flagged.
- [ ] Match loop and meta loop each written in one line.
- [ ] Boot-to-first-touch count given.
- [ ] Every real license listed with a fallback.
- [ ] Every pillar scored with evidence.
- [ ] At least two reference games from the knowledge file cited.
- [ ] Each handoff names a real NPC Union agent and one action.
- [ ] Unchecked claims marked UNVERIFIED.
