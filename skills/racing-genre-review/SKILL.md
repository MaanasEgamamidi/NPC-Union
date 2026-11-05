---
name: racing-genre-review
description: Audit a racing game design against the genre loop, pillars, failure modes, and scope traps. Use on a pitch, GDD, or prototype notes.
owner: racing-expert
disable-model-invocation: true
argument-hint: "[path to design doc or short pitch]"
---

# Racing genre review

A repeatable audit of a racing design. Read `knowledge/genres/racing.md` first.

## Inputs

- The design doc, pitch, or prototype notes.
- If missing, ask: subgenre (arcade, kart, sim, combat, open world)? Input devices? Solo, split-screen, or online? Track and car count at launch?

## Steps

1. Name the subgenre and the closest two reference games from the knowledge file.
2. Write the loop at four scales: corner, lap, race, session. Flag any scale with no reward.
3. Check handling: is grip loss readable before it happens? Is there a skill line beyond the racing line (drift, boost, slipstream)?
4. Check speed feel: camera FOV, near-field objects, audio pitch, boost strength.
5. Check tracks: does the first sector teach the track's language? Are restarts fast?
6. Check AI and catch-up: is rubber banding visible on straights? Are comeback tools (items, boost) tied to systems the player can see?
7. Check progression: unlock pace, upgrade balance, and whether open-world drives between events are short.
8. Score each pillar 1 to 5 with one reason.
9. List scope traps: licensing, track count, netcode, physics, split-screen performance.
10. Write the top three risks with one fix each and a named handoff agent.

## Output

```
# Racing review: <title>
Subgenre: <type> | References: <game>, <game>
## Loop
- Corner: ... | Lap: ... | Race: ... | Session: ...
## Pillar scores
| Pillar | Score | Reason |
## Top risks
1. <risk> -> <fix> (handoff: <agent>)
## Scope traps
- ...
## Handoffs
- <agent>: <task>
```

## Done when

- [ ] Subgenre and two references named.
- [ ] Loop written at all four scales.
- [ ] Every pillar scored with a reason.
- [ ] Three risks, each with a fix and a handoff agent.
- [ ] Scope traps listed.
- [ ] Unchecked claims marked UNVERIFIED.
