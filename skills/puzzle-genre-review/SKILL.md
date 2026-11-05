---
name: puzzle-genre-review
description: Audits a puzzle game design or level set for rule clarity, teaching order, brute-force risk, fairness, hints and scope. Use before building or after playtest drop-off.
owner: puzzle-expert
disable-model-invocation: true
argument-hint: "[design doc path, level list, or one-paragraph pitch]"
---

# Puzzle genre review

A repeatable audit of a puzzle design against the genre's loop, pillars, failure modes and scope traps.

## Inputs

- The design: a doc path, level list, or pitch.
- Format: handcrafted levels, endless, or procedural.
- Platform and expected session length.
- Planned level count and any playtest data (solve times, quit points).

If any are missing, ask once. If still missing, write the assumption at the top of the output and continue.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/genres/puzzle.md`.
2. Write the rules in five lines or fewer. If that is impossible, flag "rules unclear" as the top problem.
3. Name the core loop as: observe state, form a hypothesis, act, read the result, revise. Note where each step happens in this design and which step is weakest.
4. List every idea the levels teach, one per line. For each, record the level that introduces it alone, the level that first combines it, and the wrong assumption it breaks.
5. Flag any level that introduces more than one new idea at once.
6. For each sample level, estimate the reachable state space (pieces times positions or rotations). Flag levels where trying every option is faster than thinking.
7. Check fairness: is every piece of information needed for the answer visible to the player? Flag hidden rules and late rule reveals.
8. Check recovery: undo, instant reset, and the cost of failure in time. Flag any step-based level without undo.
9. Check hints: are there tiered hints, do they teach the idea or give the answer, and are they paid. Send paid hints to monetization-designer.
10. Check the difficulty curve for spikes with no breather level after them.
11. Compare with two or three reference games from the knowledge file, naming what each does better or worse.
12. Check scope traps from the knowledge file against the planned level count and tooling.
13. Rank problems by severity (blocker, major, minor) and assign each to an owner agent.

## Output

```markdown
# Puzzle review: <game name>

Assumptions: <list or "none">

## Rules (5 lines max)
1. ...

## Core loop
| Step | Where it happens | Strength (weak/ok/strong) |
|---|---|---|

## Teaching order
| Idea | Introduced alone (level) | First combined (level) | Wrong assumption broken |
|---|---|---|---|

## Problems
| Severity | Problem | Evidence | Fix | Owner agent |
|---|---|---|---|---|

## Recovery and hints
- Undo: ...
- Reset: ...
- Hints: ...

## Reference comparisons
- <Game>: ...

## Scope check
- ...

## Next actions
1. <action> (owner)
```

## Done when

- [ ] Rules fit in five lines or the problem is flagged.
- [ ] Every taught idea has an introduction level and a wrong assumption.
- [ ] No level introduces two new ideas without being flagged.
- [ ] Brute-force risk is checked on at least three levels.
- [ ] Undo, reset and hints each have a verdict.
- [ ] At least two reference games are compared, all from the knowledge file.
- [ ] Every problem has a severity and an owner agent.
- [ ] Assumptions are listed at the top.
