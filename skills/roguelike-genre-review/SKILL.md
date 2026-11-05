---
name: roguelike-genre-review
description: Audit a roguelike or roguelite design against the genre loop, pillars, failure modes and scope traps, and return ranked risks with owners.
owner: roguelike-expert
disable-model-invocation: true
argument-hint: "[design doc path or short pitch]"
---

# Roguelike genre review

## Inputs

- A pitch, design doc or build notes.
- If missing, ask: run length? What persists after death? Turn-based or real-time? Main repeated choice? Target platform and team size?
- Read `knowledge/genres/roguelike.md` before starting.

## Steps

1. Write the loop at three scales: moment (one room or fight), run (start to death or win), meta (across runs).
2. Time the run: estimated length, time to first meaningful choice, and how much of the opening repeats every run.
3. Classify meta-progression as sideways (new options) or upward (raw power). Flag any design where upward power is the main reason to keep playing.
4. Check death: Is each death readable (can the player name the cause)? Does death advance anything (story, unlocks, knowledge)?
5. Check build variety: count offers per run, items per offer, and whether a skip is allowed. Flag offers where all choices are pure stat bumps.
6. Check procedural generation: authored pieces vs noise, guaranteed path, seed exposure for debugging and sharing.
7. Check information: is enemy intent visible? Is hidden information a deliberate choice?
8. Score each pillar from the knowledge file as strong, okay or weak with one reason.
9. Run the Common failures and Scope traps lists from the knowledge file against the design. Note each hit.
10. Pick two to three reference games from the knowledge file and say what to study in each for this design.
11. Rank the top five risks and assign each to an NPC Union agent.

## Output

```markdown
# Roguelike review: <project>

**Verdict:** <one line>

## Loop map
- Moment: ...
- Run: ... (length: ..., opening repeat: ...)
- Meta: ... (sideways / upward)

## Pillars
| Pillar | Score | Reason |
|---|---|---|

## Top risks
1. <risk>: <why> -> <agent>

## Scope traps hit
- ...

## Study these
- <game>: <what to study>

## Assumptions and open questions
- ...
```

## Done when

- [ ] Loop map covers moment, run and meta.
- [ ] Meta-progression is classified sideways or upward.
- [ ] Every pillar has a score and a reason.
- [ ] Five risks are ranked and each has an owner agent.
- [ ] At least two real reference games are named with what to study.
- [ ] Assumptions are stated and unchecked claims marked UNVERIFIED.
