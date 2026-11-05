---
name: audio-mix-bible
description: Writes a game's audio direction document: loudness targets, bus tree, ducking, voice limits, middleware choice, and asset naming. Use at audio kickoff or before a mix pass.
owner: audio-director
disable-model-invocation: true
argument-hint: "[platforms, engine, genre, team size]"
---

# Audio mix bible

Produces one document that composers, sound designers, voice directors, and programmers all work from.

## Inputs

- Target platforms (PC, consoles, handheld, mobile, web).
- Engine and version.
- Team: is there an audio programmer? Who makes music, SFX, VO?
- Budget for middleware licences (or "none").
- Genre, how much dialogue, and whether music must adapt to gameplay.
- Existing audio assets or reference games.

If platforms or engine are missing, ask once. If still missing, assume PC plus one console, the latest stable engine version, and list the assumptions at the top.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/creative/sound/game-mix-standards.md`.
2. Choose middleware: FMOD Studio, Wwise, or engine-native. Check the current licence page and engine integration status with WebSearch or WebFetch; mark anything you could not check as UNVERIFIED.
3. Set loudness: integrated LUFS per output (home, portable, mobile), true-peak ceiling, dialogue reference, and measurement method (BS.1770 meter, long gameplay capture).
4. Draw the bus tree. Keep it to three levels or fewer; reverb and other shared effects go on send buses.
5. Write ducking and mix-state rules: trigger, target bus, reduction in dB, attack, release, priority if two rules hit one bus.
6. Write voice limits per category: max instances, steal behaviour, virtual behaviour for loops. Add the global real-voice cap per platform.
7. Write memory and compression rules: source format, per-platform codec, load type (decompressed, compressed in memory, streamed) by category.
8. Write the naming convention with a pattern, a category code table, and five real examples from this project.
9. Write the style guide: three to five reference games or films with what to take from each, and three "never" rules.
10. List open questions, each with an owner agent (`composer`, `sfx-designer`, `voice-director`, `accessibility-specialist`, `localization-lead`).

## Output

```markdown
# <Game> audio direction v<n> (<date>)

## Summary and assumptions
## Middleware
Choice: <FMOD | Wwise | engine-native> because <reason>. Licence checked: <date or UNVERIFIED>.
## Loudness targets
| Output | Integrated LUFS | True peak | Dialogue reference | Measured how |
## Bus tree
- Master
  - Dialogue
  - Music
  - SFX
    - ...
  - Ambience
  - Reverb (send)
## Ducking and mix states
| Trigger | Target bus | Reduction dB | Attack ms | Release ms | Priority |
## Voice limits
| Category | Max instances | Steal | Virtual behaviour |
Global real voices: <platform: n>
## Memory and compression
| Category | Source | Codec per platform | Load type |
## Naming
Pattern: <CAT>_<OWNER>_<Action>_<Variant>_<NN>
| Code | Meaning |
Examples: ...
## Style guide
References: ...
Never: ...
## Open questions
| Question | Owner | Needed by |
```

## Done when

- [ ] Every platform has an integrated LUFS target and a true-peak ceiling.
- [ ] The bus tree has no more than three levels and every category of sound has a bus.
- [ ] Every ducking rule has numbers for reduction, attack, and release.
- [ ] Every repeatable sound category has a voice limit and steal behaviour.
- [ ] Naming examples follow the pattern exactly, with no spaces.
- [ ] Middleware licence and integration status are checked or marked UNVERIFIED.
- [ ] Each open question names an owner agent.
