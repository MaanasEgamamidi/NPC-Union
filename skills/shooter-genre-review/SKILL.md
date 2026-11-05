---
name: shooter-genre-review
description: Audit a shooter design or pitch against the genre's core loop, pillars, failure modes, and scope traps, and return a scored review with fixes.
owner: shooter-expert
disable-model-invocation: true
argument-hint: "[design doc path or short shooter pitch]"
---

# Shooter genre review

A repeatable teardown of a shooter design (FPS, TPS, arena, tactical, hero, extraction, or campaign).

## Inputs

- The design doc, pitch, or build notes.
- If missing, ask: first or third person? Platform and input (mouse, controller, both)? PvP, PvE, or both? Player count per match? Target time-to-kill band? Weapon list with damage, fire rate, range? Map count and size?

## Steps

1. Read `knowledge/genres/shooter.md` for the loop, pillars, and reference games.
2. Write the core loop as the design states it (for example: spawn, move, find target, shoot, kill or die, reward, respawn) and mark where the design is vague.
3. Compute paper TTK for each primary weapon (shots to kill divided by fire rate). Flag weapons that fall outside the stated band and weapons that make others redundant.
4. Check the shot feedback stack for each weapon: muzzle flash, recoil, sound, hit marker, hit sound, enemy reaction, kill confirm.
5. Check maps: longest sightline versus longest effective weapon range, spawn safety, lane count, cover spacing, and time from spawn to first contact.
6. Check input: aim assist plan for controller, sensitivity and FOV options, cross-play stance.
7. Check netcode assumptions: tick rate target, lag compensation policy, server or peer hosting. Mark unknowns.
8. Score each pillar from the knowledge file 1 to 5 with one line of evidence.
9. List the top five failure risks from the knowledge file's Common failures that apply, each with a concrete fix.
10. List scope traps (extra modes, campaign plus multiplayer, live service, large maps, many weapons) and suggest what to cut for a first playable.
11. Pick two or three reference games from the knowledge file that best match the problems found.
12. Name handoffs to other NPC Union agents.

## Output

```markdown
# Shooter review: <project name>

**Verdict:** <one line>

## Core loop
- As written: <loop>
- Gaps: <list>

## TTK table
| Weapon | Damage | Shots to kill | Fire rate | Paper TTK | In band? |
|---|---|---|---|---|---|

## Pillar scorecard
| Pillar | Score 1-5 | Evidence |
|---|---|---|

## Top risks
1. <risk>: <fix>

## Scope traps
- <trap>: <cut or defer>

## Study these
- <game>: <what to look at>

## Handoffs
- <agent>: <task>

## Unverified
- <claims or numbers not checked>
```

## Done when

- [ ] Core loop written and gaps listed.
- [ ] Paper TTK computed for every primary weapon, or missing stats requested.
- [ ] Every pillar scored with evidence.
- [ ] At least three risks, each with a fix.
- [ ] Scope traps listed with a cut suggestion.
- [ ] Reference games come from `knowledge/genres/shooter.md`.
- [ ] Handoffs name real NPC Union agents.
- [ ] Unchecked claims marked UNVERIFIED.
