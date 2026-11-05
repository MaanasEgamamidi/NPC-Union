---
name: visual-novel-genre-review
description: Audit a visual novel or narrative adventure design against branching structure, choice weight, reader UX, failure modes, and scope traps.
owner: visual-novel-expert
disable-model-invocation: true
argument-hint: "[path to design doc or a short pitch with length, endings, cast size]"
---

# Visual novel genre review

A repeatable audit of a VN design. It produces a flowchart, a scope count, and ranked risks.

## Inputs

- The design doc or pitch.
- Target length (words or hours), number of endings, whether a true route exists, cast size, engine, team size, and schedule.
- If any are missing, ask once. If still missing, assume a small and a full version and review both.

## Steps

1. Read `knowledge/genres/visual-novel.md` for the loop, pillars, failures, and scope traps.
2. Classify the form: kinetic novel, choice-based VN with routes, investigation or deduction hybrid, or systemic interactive fiction (80 Days style).
3. Draw a text flowchart: chapters as nodes, choices as splits, bottlenecks as joins, flags on edges, and the lock-in point for each route.
4. Count total words across all routes, words per single playthrough, and shared versus unique words. Convert to hours with a stated reading pace and mark the pace as an assumption.
5. Count art: characters x poses x expressions x outfits for sprites, backgrounds x time-of-day variants, and event CGs.
6. Audit each major choice: what it changes, when the player learns that, whether it is visible in hindsight, and whether it is fake (changes nothing).
7. If there is a true route or replay gate, check that the fiction gives it a reason.
8. For investigation layers, check each required deduction: is every clue shown to the player before it is demanded.
9. Check reader UX baseline: backlog, skip-read of seen text, auto-advance, save anywhere, quick save, chapter select or flowchart for replays, text speed, readable box length.
10. Compare against two or three reference games from the knowledge file and name what to borrow.
11. Rank the top three risks with one concrete fix each, and name the agent to hand each fix to.

## Output

```
# VN review: <title>

Form: <kinetic | routes | investigation hybrid | systemic IF>

## Flowchart
<text flowchart>

## Scope
| Item | Count | Notes |
|---|---|---|
| Words, one playthrough | | pace assumed: |
| Words, all routes | | |
| Sprites | | chars x poses x expr x outfits |
| Backgrounds | | |
| CGs | | |

## Choice weight
| Choice | What it changes | When the player learns | Verdict |
|---|---|---|---|

## Reader UX
- [ ] Backlog  - [ ] Skip seen text  - [ ] Auto-advance  - [ ] Save anywhere
- [ ] Quick save  - [ ] Chapter select or flowchart  - [ ] Text speed

## References
- <game>: <what to borrow>

## Top risks
1. <risk> -> <fix> -> <agent>
2.
3.

## Assumptions and UNVERIFIED items
```

## Done when

- [ ] Flowchart drawn with every ending and lock-in point.
- [ ] Word and art counts filled with stated assumptions.
- [ ] Every major choice has a verdict.
- [ ] True route or replay gate checked for a story reason (or marked not present).
- [ ] Reader UX checklist completed.
- [ ] At least two reference games named with a specific lesson.
- [ ] Three ranked risks, each with a fix and a named agent.
- [ ] Unchecked claims marked UNVERIFIED.
