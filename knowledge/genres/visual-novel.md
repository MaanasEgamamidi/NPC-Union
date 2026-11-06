---
topic: visual-novel
owner: visual-novel-expert
last_verified: 2026-11-05
---

# Visual novel

## Core loop

Read a scene (text, character sprites, background, music), reach a choice or an interaction, the game records it as a flag or point value, and later scenes read differently or branch. Replay with skip-read to reach other routes and endings. Hybrids replace or add to the choice with another verb: cross-examination (Ace Attorney), class trials (Danganronpa), escape-room puzzles (Zero Escape), drink mixing (VA-11 Hall-A), or route planning on a map (80 Days).

## Design pillars

- Voice and character first. The reader spends most of the time reading; prose and character voice carry the game.
- Choices with felt weight. A choice should change something the player can notice, ideally later and in hindsight.
- Structure the reader can map. Splits, bottlenecks, and endings should make sense once seen, supported by a flowchart or chapter select when replays are expected.
- Respect reading time. Backlog, skip-read, auto-advance, and save anywhere are baseline.
- Replays as story. When replays are required, the best examples make the act of replaying part of the fiction.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Phoenix Wright: Ace Attorney | 2001 (Japan, GBA) | Capcom | Fair-clue contradictions, cross-examination as the core verb, mostly linear story with a strong case structure | https://en.wikipedia.org/wiki/Phoenix_Wright:_Ace_Attorney |
| Steins;Gate | 2009 | 5pb. and Nitroplus | Phone-based choice system (replying to messages), long common route, true ending tied to the time-travel premise | https://en.wikipedia.org/wiki/Steins;Gate |
| Nine Hours, Nine Persons, Nine Doors (Zero Escape: 999) | 2009 | Chunsoft | Multiple endings where knowledge from earlier runs is part of the plot; true ending gated with a story reason | https://en.wikipedia.org/wiki/Nine_Hours,_Nine_Persons,_Nine_Doors |
| Danganronpa: Trigger Happy Havoc | 2010 (Japan) | Spike | Daily life, investigation, class trial loop; minigames inside trials to keep deduction active | https://en.wikipedia.org/wiki/Danganronpa:_Trigger_Happy_Havoc |
| VA-11 Hall-A | 2016 | Sukeban Games | A diegetic verb (mixing drinks) replacing dialogue menus; small scope, strong voice | https://en.wikipedia.org/wiki/VA-11_Hall-A |
| Doki Doki Literature Club! | 2017 | Team Salvato | Subverting dating-sim conventions; using save files and game files as part of the story; free release with an optional paid edition later | https://en.wikipedia.org/wiki/Doki_Doki_Literature_Club! |
| 80 Days | 2014 | Inkle | Systemic interactive fiction: state (money, time, condition) instead of hand-built routes; very large text with high reuse | https://en.wikipedia.org/wiki/80_Days_(2014_video_game) |

## Common failures

- Fake choices that change nothing. Readers save-scum, notice, and stop trusting every later choice.
- Long filler before the first meaningful decision. Readers drop before the hook.
- Random-feeling route locks. The player cannot tell which earlier choices put them on a route.
- Unfair deductions. The writer knows the answer, so a clue the player never saw gets demanded.
- True route gated by repetition with no story reason. Replays feel like a grind.
- Missing reader UX: no backlog, no skip-read, no flowchart, saves only at chapter breaks.
- Text boxes sized for the source language only, breaking during localization.

## Scope traps

- Counting endings instead of words. Each route is roughly a novella; total script across routes is often two or more times one playthrough.
- Binary branching growth. Five independent binary splits produce 32 leaves. Use branch and bottleneck structures and flag-based line variants instead.
- Sprite multiplication: characters x poses x expressions x outfits. A large cast is an art budget decision first.
- Background variants for time of day and weather.
- Event CGs per route and per ending.
- Voice acting cost scales with every line on every route. Partial voicing is a common compromise.
- Budget localization of a large script, including text expansion and UI fitting; measure representative translated strings in the target UI.

## Sources

- English Wikipedia pages linked in the Reference games table, for year and developer.
- Ren'Py documentation, https://www.renpy.org/doc/html/ , for engine features such as rollback, skip, and auto-forward. Check the current version.
- Measure reading pace with representative players before using it to estimate playtime.
