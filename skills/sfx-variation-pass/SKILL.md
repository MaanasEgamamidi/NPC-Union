---
name: sfx-variation-pass
description: Turns a list of game events into SFX layer recipes, variation pools, randomization ranges, loudness targets and a licence ledger.
owner: sfx-designer
disable-model-invocation: true
argument-hint: "[feature or event list, engine, 2D or 3D]"
---

# SFX variation pass

A repeatable pass that takes the sound events for a feature and produces a buildable, licence-clean SFX sheet.

## Inputs

- The list of game events that make sound, or the feature description to derive them from.
- Engine and middleware (Unity, Godot, Unreal, FMOD, Wwise, or engine-native audio).
- 2D or 3D positioning, and target platforms.
- The reference category for loudness (usually dialogue; music if there is no dialogue).
- Where sounds come from: original recording, generation, or libraries (name them).

If engine or perspective is missing, ask once. If still missing, assume engine-native audio and 3D, and write the assumption at the top of the output.

## Steps

1. List every event as one row. Give each an ID in the form `<category>_<event>`.
2. Estimate trigger rate for each event: rare (under once a minute), regular, or rapid (more than once a second).
3. Set pool size from rate: rare 1 to 2, regular 3 to 4, rapid 4 to 8 per surface or state.
4. Set pitch range in cents: rapid small sounds +/-100 to 200, heavy or tonal sounds +/-0 to 50, UI 0 unless the design wants it. Set volume range at +/-1 to 2 dB for rapid sounds.
5. Set the repeat rule: avoid last N with N about half the pool size (minimum 1). Never pure random for pools under 8.
6. Set instance cap and cooldown for rapid events (start at 3 to 6 voices and 30 to 50 ms) so stacked starts do not comb-filter.
7. Write the layer recipe for each event that is not a simple one-shot: transient, body, tail, with the frequency range each owns. Only one layer owns the sub. Note phase-check and head trim.
8. Mark each event mono (3D positioned) or stereo (UI, 2D, non-diegetic). Mark dry or baked reverb (bake only for non-positional).
9. Set category loudness relative to the reference, and a true-peak ceiling of about -1 dBTP on exported files. Check pools for consistency with short-term loudness, not integrated.
10. Pick formats: masters as 48 kHz 24-bit WAV unless the project says otherwise; engine import or compression per category from the current engine docs (look them up, do not recall). No MP3 for loops.
11. For every external file, open its source page and record URL, author and licence. Flag CC BY-NC and anything unclear as not cleared for commercial use.
12. Name files `sfx_<category>_<event>_<variant##>.wav`.

## Output

```markdown
# SFX sheet: <feature>
Assumptions: <engine, perspective, reference category>

## Events
| ID | Category | Rate | 2D/3D | Mono/Stereo | Pool | Pitch (cents) | Vol (dB) | Repeat rule | Cap | Cooldown |
|---|---|---|---|---|---|---|---|---|---|---|

## Layer recipes
### <ID>
- Transient: <source>, owns <range>, <processing>
- Body: <source>, owns <range>, <processing>
- Tail: <source>, owns <range>, dry/baked
- Notes: head trim, phase check, fades

## Loudness
| Category | Relative to reference (dB) | True peak ceiling |
|---|---|---|

## Formats
| Category | Master | Engine import / compression | Loop points |
|---|---|---|---|

## Licence ledger
| File | Source URL | Author | Licence | Attribution text | Commercial OK |
|---|---|---|---|---|---|

## Open questions
- <anything that needs audio-director, game-designer or game-legal-advisor>
```

## Done when

- [ ] Every event has a row with rate, pool size, pitch and volume ranges, and a repeat rule.
- [ ] Rapid events have an instance cap and cooldown.
- [ ] Every 3D-positioned event is mono and dry.
- [ ] Every layered event names which layer owns the low end.
- [ ] Each category has a loudness target relative to the reference and a peak ceiling.
- [ ] Engine import settings were checked against current docs, or marked UNVERIFIED.
- [ ] Every external file has a ledger row, and no CC BY-NC or unclear file is marked commercial OK.
- [ ] File names follow the naming pattern.
