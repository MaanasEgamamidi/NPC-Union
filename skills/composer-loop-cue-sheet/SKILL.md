---
name: composer-loop-cue-sheet
description: Turns a list of game screens and states into a music cue sheet with sample-accurate loop points, layers, exits, stingers and stem files.
owner: composer
disable-model-invocation: true
argument-hint: "[screens/states, engine, sample rate]"
---

# Composer loop cue sheet

A repeatable procedure for specifying looping, adaptive game music so a programmer can wire it without guessing.

## Inputs

- List of screens or game states that need music, and how long a player typically stays on each.
- Engine or middleware (Godot, Unity, Web Audio, FMOD, Wwise, other) and its version.
- Shipping sample rate. If missing, ask; default to 48,000 Hz and say so.
- State changes that should move the music (enemy count, health, timer, boss phase) and how fast the change should be heard (next beat, next bar, next phrase).
- Any tempo or key constraints from `audio-director` or the art direction.

## Steps

1. List each cue with its game state and expected listening time. Flag any state over about 90 seconds that has a single short loop.
2. Choose tempo and meter per cue. Compute samples per bar = sample_rate x 60 x beats_per_bar / BPM. If beat sync matters and the result is not a whole number, adjust the tempo until it is, and note the change.
3. Set intro length and loop body length in bars, then convert both to sample offsets: loop_start = intro_bars x samples_per_bar, loop_end = loop_start + loop_bars x samples_per_bar.
4. Define layers (vertical) and segments (horizontal). Every layer of a cue gets the same length and zero point. Mark legal exit points (every bar or every 2 bars) and the transition rule for each state change.
5. Define stingers: trigger, quantization (next beat or bar), length in bars, and the key they resolve to.
6. Render: print each loop body twice and cut from the second pass. Cut at zero crossings. Export Ogg Vorbis or WAV, never MP3, for anything that loops.
7. Listen to at least three wraps of every loop and every layer alone. Record pass or fail.
8. Look up the current engine or middleware docs for the loop and transition property names, and note the version checked. Write the engine notes.
9. Fill in the output template.

## Output

```markdown
# Music cue sheet: <game>

Sample rate: <Hz> | Format: <ogg/wav> | Engine: <name version> (docs checked <date>)

| ID | State | BPM | Meter | Key | Samples/bar | Intro (bars / samples) | Loop start | Loop end | Layers | Exit rule | Listening time |
|---|---|---|---|---|---|---|---|---|---|---|---|

## Stingers
| ID | Trigger | Quantize | Bars | Resolves to |
|---|---|---|---|---|

## Transitions
| From | To | When | Quantize | Bridge / fade |
|---|---|---|---|---|

## Stems
- mus_<cue>_<layer>_<bpm>bpm_<key>.ogg (<samples> samples)

## Engine notes
- <property>: <value> (<doc page>)

## Checks
- Wrap test (3 loops): <pass/fail per cue>
- Layers alone: <pass/fail>
- Assumptions: <list>
```

## Done when

- [ ] Every cue has BPM, meter, key, samples per bar, and loop start/end as whole sample numbers.
- [ ] Every beat-synced cue has a whole-sample bar length, or the drift is noted.
- [ ] All layers of a cue share length and zero point, and the stem list shows identical sample counts.
- [ ] Every state change has a transition row with a quantize value.
- [ ] No looping file is MP3.
- [ ] Loop seams were checked over at least three wraps and each layer was heard alone.
- [ ] Engine property names were checked against current docs, with the version noted.
