---
name: rhythm-genre-review
description: Audit a rhythm game design or chart against the genre's core loop, timing model, pillars, failure modes, and scope traps.
owner: rhythm-expert
disable-model-invocation: true
argument-hint: "[design doc path, chart file, or short concept]"
---

# Rhythm genre review

A repeatable teardown of a rhythm design, chart, or beat-synced mechanic.

## Inputs

- A design doc, chart file, or concept description.
- Input device and target platforms. Ask if missing.
- Music source: licensed, original, or user-supplied. Ask if missing.
- Fail rule: can the player fail mid-song? Ask if missing.

## Steps

1. Read `knowledge/genres/rhythm.md` for the loop, pillars, and failure list.
2. Map the design's loop: hear cue, read note, input on time, get feedback, build combo, grade. Note any missing link.
3. Check the timing model: clock source (audio, not frame), audio and visual offset calibration, window tiers in ms, early/late feedback.
4. Pick one song or level. Mark its sections and BPM. Check that notes follow an audible layer, that density spikes have rests, and that difficulty tiers are charted separately.
5. Check readability: lane contrast, note overlap, background noise, scroll speed options.
6. Score each pillar from the knowledge file as Strong, Weak, or Missing with one line of evidence.
7. Compare to two reference games from the knowledge file and name what to borrow.
8. Check scope traps: song licensing, chart count per song, peripherals, online leaderboards, editors.
9. Assign each risk to a named NPC Union agent.
10. List every claim not checked as UNVERIFIED.

## Output

```markdown
# Rhythm review: <title>

**Verdict:** <one line>

## Loop
<loop map and gaps>

## Timing model
| Item | Current | Recommended |
|---|---|---|
| Clock source | | |
| Offset calibration | | |
| Windows (ms) | | |
| Early/late feedback | | |

## Chart findings
- <finding>

## Pillar scorecard
| Pillar | Rating | Evidence |
|---|---|---|

## Borrow from
- <game>: <what>

## Scope traps
- <trap>: <cost>

## Risks
| Risk | Owner agent | Next step |
|---|---|---|

## UNVERIFIED
- <claim>
```

## Done when

- [ ] All four inputs are known or marked as assumptions.
- [ ] Timing table is filled with numbers in ms.
- [ ] At least one chart section was checked against the music.
- [ ] Every pillar has a rating and evidence.
- [ ] Every risk has a named owner agent.
- [ ] Unchecked claims are listed as UNVERIFIED.
