---
name: accessibility-audit
description: Run a structured game accessibility audit across vision, hearing, motor and cognitive needs, ranked by impact and effort with owners.
owner: accessibility-specialist
disable-model-invocation: true
argument-hint: "[build, design doc, menu or HUD mockup to audit, plus platforms]"
---

# Accessibility audit

A repeatable audit of a game build, design doc or mockup against the Game Accessibility Guidelines and the Xbox Accessibility Guidelines.

## Inputs

- The thing to audit: build, video capture, design doc, screenshots or mockups.
- Genre, camera type, target platforms and supported input devices.
- Whether the game has voice acting, voice or text chat, timing-critical mechanics, or competitive modes.
- The current options menu, if any.

If any of these are missing, write them as assumptions and continue.

## Steps

1. List the journey stages to check: first boot, main menu, options menu, tutorial, core loop, combat or challenge, cutscenes, failure and retry, multiplayer and chat.
2. For each stage, check vision: text size and contrast (aim for 4.5:1 for normal text per WCAG), color-only information, UI scaling, high-contrast or screen-reader support for menus.
3. Check hearing: subtitles (speaker names, size presets, background box, line length near 40 characters, two lines max), captions for meaningful sounds, visual equivalents for directional audio, separate volume sliders.
4. Check motor: full remapping including menus, toggle for every hold, alternatives for mashing and QTEs, timing windows, simultaneous button chords, adaptive controller use.
5. Check cognitive: objective reminders, replayable tutorials, pause anywhere, clear feedback on failure, difficulty and assist granularity.
6. Check photosensitivity and motion: flashing against three-per-second, camera shake, motion blur, FOV, head bob toggles.
7. Log each snag in the table with a guideline reference (GAG tier or XAG area). Mark any reference you could not check as UNVERIFIED.
8. Score severity: blocker (stops progress for a group), major (big penalty or pain), minor (friction).
9. Estimate effort S, M or L and assign an owner agent.
10. Rank: blockers first, then majors by reach over effort. Pick the top ten for the next milestone.
11. Write recommended defaults and the first-boot flow.

## Output

```
# Accessibility audit: <game or build>
Scope: <what was reviewed> | Platforms: <...> | Inputs: <...>
Assumptions: <list>

| ID | Stage | Snag | Blocks | Severity | Guideline | Fix | Effort | Owner |
|----|-------|------|--------|----------|-----------|-----|--------|-------|

## Top ten for next milestone
1. ...

## Defaults and first boot
- ...

## Not verified
- ...
```

## Done when

- [ ] Every journey stage was checked against vision, hearing, motor and cognitive.
- [ ] Photosensitivity and motion items were checked, including cutscenes.
- [ ] Every snag has severity, fix, effort and owner.
- [ ] Guideline references are given or marked UNVERIFIED.
- [ ] A ranked top ten and a defaults list are included.
- [ ] Assumptions and unverified items are listed.
