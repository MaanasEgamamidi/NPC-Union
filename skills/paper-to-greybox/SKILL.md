---
name: paper-to-greybox
description: Take one design question from a paper test to a playable greybox with written kill criteria, then make a go, kill or pivot call. Use before committing production time to a mechanic.
owner: prototyper
disable-model-invocation: true
argument-hint: "[mechanic or design question to test]"
---

# Paper to greybox

A repeatable procedure for testing one mechanic cheaply, first on paper and then in a throwaway playable build.

## Inputs

- The mechanic or idea, in one or two sentences.
- Target engine or tool for the greybox (Unity, Godot, Unreal, browser, or paper only).
- Timebox in days, and who can playtest.
- If missing, ask: "What single question should this answer?", "What result would make you drop it?", "How many days can it take?"

## Steps

1. Write the question as one testable sentence with a comparison or threshold. Split it if it contains "and".
2. Classify it: decision, rules, economy or pacing question goes to paper first; feel, timing, camera or input question goes straight to greybox.
3. Write kill criteria before building, as observable behavior (retries, route choices, time to first success, quotes), with a number and tester count.
4. Paper pass (if classified paper): build with cards, dice, grid paper or a spreadsheet in under one day. Run at least 3 sessions. Record choices and where players stalled.
5. Decide if paper answered it. If yes, skip to step 10. If the remaining doubt is about feel, continue.
6. Lock player metrics: move speed, jump or reach distance, camera distance and FOV, scale (state units per meter).
7. Build the greybox: primitives only, a color key for walkable, hazard and interactable, live tuning for every feel variable, restart under 2 seconds.
8. Test with 5 players per round where possible. Change one variable between rounds. Log behavior, not ratings.
9. Compare results against the kill criteria. Do not move the thresholds after seeing results.
10. Make the call: go, kill or pivot. For a pivot, write the new single question and restart at step 1.
11. Write the report, list what production should keep, and mark the build as throwaway.

## Output

```
# Prototype: <question as name>
Question: <one sentence>
Medium: paper | greybox (<engine>) | both
Timebox: <planned days> / <actual days>
Kill criteria: <threshold>, <tester count>
Metrics locked: <speed, reach, camera, scale>
Tuning values tested: <variable: values per round>
Testers: <count per round>, <rounds>
Observed: <behavior bullets with counts>
Call: GO | KILL | PIVOT
Why: <link each reason to a kill criterion>
Keep for production: <values, rules, feel notes>
Hand off to: <game-designer, gameplay-programmer, producer>
Build: <path>, THROWAWAY, do not merge
```

## Done when

- [ ] The question is one sentence with a threshold or comparison.
- [ ] Kill criteria were written and dated before building.
- [ ] The cheapest suitable medium was used first.
- [ ] Metrics were locked before any greybox geometry was built.
- [ ] At least 3 paper sessions or 5 greybox testers were observed, or the shortfall is stated.
- [ ] The call is GO, KILL or PIVOT and each reason maps to a criterion.
- [ ] The build is marked throwaway and a keep list exists for production.
