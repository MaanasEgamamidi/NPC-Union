---
name: trailer-shot-plan
description: Turns a script or beat sheet into a timed shot list, capture plan and delivery spec for a game trailer, intro or cutscene.
owner: video-director
disable-model-invocation: true
argument-hint: "[script or beat sheet, destination platform, target length]"
---

# Trailer shot plan

A repeatable procedure for going from words on a page to a shot list someone can capture and cut.

## Inputs

- Script, beat sheet or a list of what must be shown. If missing, ask for the three mechanics or story beats that matter most.
- Destination: Steam, console store, App Store preview, Google Play, YouTube, social (9:16), or in-game cutscene.
- Target length in seconds.
- Music: tempo in BPM, or "not chosen yet".
- What is capturable: playable build, free camera or photo mode, offline recorder (Unity Recorder, Unreal Movie Render Queue), or only mock-ups.
- If any of the last three are missing, assume 60 s, 1080p60 delivery and in-engine capture, and say so at the top of the output.

## Steps

1. Look up the current spec for each destination (resolution, frame rate, codec, length limits, file size, number of videos). Write the date checked. Anything not checked is marked UNVERIFIED.
2. Write the hook in one sentence: what a muted viewer should understand by second 5.
3. Work out the music grid: seconds per beat = 60 / BPM; frames per beat = seconds per beat x delivery fps. Round bar lengths to whole frames and keep a running total so drift does not build up.
4. Write the beat sheet: hook (0 to 5 s), promise, proof, escalation, end card. End card gets the last 4 to 5 s.
5. Break each beat into shots. Give each shot a duration in frames that is a whole number of beats or bars. No shot in the first 20 s may depend on the shot before it to make sense (Steam microtrailer, social clipping).
6. For each text card, count words and set hold time to words / 3 + 0.5 s, rounded up to the next beat.
7. Choose a capture method per shot: live in-engine, offline frame-by-frame render, pre-rendered, or mock-up. Mark any mock-up so it is not mistaken for gameplay.
8. Write the capture setup per shot: build, level or save file, seed, camera, resolution, fps, HUD on or off, effects settings.
9. Flag risk shots: full-screen particles or grain (compression), flashes (more than 3 in any second), text or logos outside title safe, fast pans.
10. For in-game cutscenes add: skip behaviour, pause, subtitles, the assets to pre-load before each camera cut, and whether player customisation must show.
11. Write the music brief: tempo, total length, hit points in time code.
12. Run the review pass: read the shot list as if muted, then at phone size, then check the flags from step 9.

## Output

```markdown
# <Project> <video type> shot plan

**Destination:** <platform(s)>  **Length:** <s>  **Delivery:** <WxH> @ <fps>, <codec>  **Spec checked:** <date or UNVERIFIED>
**Hook (by 0:05):** <one sentence>
**Music:** <BPM>, beat = <frames> frames, bar = <frames> frames
**Assumptions:** <anything assumed>

## Beat sheet
| Beat | In | Out | Purpose |
|------|----|-----|---------|

## Shot list
| # | In | Out | Frames | Shot type | Camera | On screen | Capture method | Text card | Audio cue | Risk |
|---|----|-----|--------|-----------|--------|-----------|----------------|-----------|-----------|------|

## Capture setup
| # | Build / level / save | Seed | Resolution @ fps | HUD | Effects settings | Notes |
|---|----------------------|------|------------------|-----|------------------|-------|

## Cutscene notes (in-game only)
- Skip: <hold or confirm, repeat behaviour>
- Subtitles: <yes, style source>
- Pre-load before cuts: <shot numbers and assets>

## Music brief
- Tempo, length, hit points: <time codes>

## Delivery
| Platform | Spec | Checked |
|----------|------|---------|

## Review
- [ ] Muted read makes sense
- [ ] Phone-size read makes sense
- [ ] Flash check done
- [ ] Title safe
```

## Done when

- [ ] Every destination spec has a check date or is marked UNVERIFIED.
- [ ] The hook lands by 0:05 and uses gameplay, not a logo.
- [ ] Shot frame counts add up exactly to the target length.
- [ ] Every text card has a hold time of at least words / 3 + 0.5 s.
- [ ] Every shot has a capture method and a capture setup.
- [ ] Mock-up shots are labelled.
- [ ] Risk shots are flagged, and flash risks are sent to accessibility-specialist.
- [ ] The composer has tempo, length and hit points.
