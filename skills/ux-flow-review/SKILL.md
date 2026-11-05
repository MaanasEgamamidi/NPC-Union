---
name: ux-flow-review
description: Review a game menu, HUD or flow against heuristics, measured text size, focus order, back behaviour and feedback timing; return severity-ranked fixes.
owner: ux-designer
disable-model-invocation: true
argument-hint: "[flow or screen name] [platform]"
adapted_from: Claude-Code-Game-Studios/.claude/skills/ux-review/SKILL.md
---

# UX flow review

## Inputs

- The flow or screen (build, video, screenshots, or a written spec).
- Platforms and input methods.
- Any evidence: playtest notes, metrics, reviews.
- If there is no build or capture, review the spec and mark every finding "from spec, untested".

## Steps

1. Map the flow: each step's screen, player goal, input, feedback, exits. Count presses from gameplay to goal.
2. Check entry and exit: every screen has a clear way back; Back is the same button and behaviour everywhere.
3. Check states: loading, empty, error, populated. Missing error and empty states are findings.
4. Check focus order for gamepad and keyboard: logical, wraps or stops consistently, no mouse-only targets.
5. Measure text body height on a 1080p capture against XAG 101 minimums (26 px console, 18 px PC/VR) and check scaling to 200%.
6. Check colour-only information and contrast; run a colour-blindness simulation.
7. Check feedback: every input gets visible, audible or haptic response quickly; irreversible actions have confirmation, reversible ones do not.
8. Check device glyphs switch with input device.
9. Rank findings: blocker (task fails), major (task slow or error-prone), minor (polish). Give each a concrete fix.
10. Verdict: READY, NEEDS REVISION, MAJOR REVISION, or NOT ASSESSED (no build and no spec detail for a dimension; name it).

## Output

```
# UX flow review: <flow>
Source: build | capture | spec (untested)   Platform/input:
Verdict:
## Flow map
| Step | Screen | Goal | Input | Feedback | Exits |
Presses from gameplay to goal: <n>
## Findings
| # | Severity | Where | Problem | Evidence | Fix |
## Text and accessibility
| Element | Measured body height | Minimum | Pass |
Colour-only info: ...   Glyph switching: ...
## Not assessed
```

## Done when

- [ ] Flow map complete with press count.
- [ ] Back behaviour checked on every screen.
- [ ] Text measured or marked not assessed.
- [ ] Every finding has severity, evidence and a fix.
- [ ] Verdict given.
