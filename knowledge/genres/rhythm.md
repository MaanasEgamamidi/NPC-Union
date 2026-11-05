---
topic: rhythm
owner: rhythm-expert
last_verified: 2026-11-05
---

# Rhythm games

## Core loop

1. Hear the music and see a cue (note, prompt, enemy tell).
2. Input at the right moment, and in some games the right direction or lane.
3. Get immediate judgment feedback (Perfect, Great, Miss) in sound and visuals.
4. Build combo or multiplier; lose it on a miss.
5. Finish the song with a grade and score, then retry for a better result or move to a harder chart.

## Design pillars

- **Fair timing:** hits are judged against the audio clock, with calibration for audio and display latency.
- **Music first:** notes follow what the player can hear, so the chart teaches the song.
- **Readability:** the player can always see what is coming and in which lane.
- **Mastery ladder:** charted difficulty tiers and a reason to replay (grades, full combos, leaderboards).
- **Feel of performing:** feedback makes the player feel they are playing the music, not following it.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Dance Dance Revolution | 1998 | Konami | Four-arrow step charts, difficulty ratings, dance pad as input | https://en.wikipedia.org/wiki/Dance_Dance_Revolution |
| Guitar Hero | 2005 | Harmonix | Note highway, star power, peripheral-driven feel of performing | https://en.wikipedia.org/wiki/Guitar_Hero_(video_game) |
| osu! | 2007 | Dean "peppy" Herbert | Community-made beatmaps, accuracy scoring, timing windows tied to difficulty settings | https://en.wikipedia.org/wiki/Osu! |
| Rhythm Heaven | 2008 | Nintendo SPD and TNX | Short minigames that teach a rhythm through audio cues rather than a note track | https://en.wikipedia.org/wiki/Rhythm_Heaven |
| Crypt of the NecroDancer | 2015 | Brace Yourself Games | Roguelike movement and combat quantized to the beat | https://en.wikipedia.org/wiki/Crypt_of_the_NecroDancer |
| Beat Saber | 2019 | Beat Games | VR directional cuts, readability of 3D notes, physical exertion as pacing | https://en.wikipedia.org/wiki/Beat_Saber |
| Hi-Fi Rush | 2023 | Tango Gameworks | Action combat where the world moves to the beat and timing adds bonus effect | https://en.wikipedia.org/wiki/Hi-Fi_Rush |

Notes: Beat Saber was in early access from 2018 and fully released in 2019. Rhythm Heaven year is the Nintendo DS release (Japan 2008). Links UNVERIFIED unless marked otherwise below.

## Common failures

- Judging input against frame time instead of the audio clock, causing drift over a song.
- No audio and visual offset calibration, so TV and Bluetooth players feel the game is wrong.
- Charts that follow an inaudible instrument or a grid rather than the music.
- Easy charts made by deleting notes from hard charts, which breaks phrasing.
- Density spikes with no recovery space.
- Busy backgrounds and low-contrast notes that hide the cues.
- No early/late feedback, so players cannot correct their offset.
- No practice mode (slowdown, section loop).

## Scope traps

- **Licensed music:** each track needs licensing, and licenses can expire and force delisting.
- **Charts per song:** four difficulty tiers per song multiplies charting work by four, plus testing.
- **Peripherals:** custom controllers add hardware cost, latency testing, and support burden.
- **Chart editor and user content:** an editor is a second product with its own UX, file format, and moderation.
- **Online leaderboards:** need anti-cheat and replay validation, since timing data is easy to fake.
- **Multiple input devices:** keyboard, pad, touch, and VR each need different windows and charts.

## Sources

- Wikipedia articles for each reference game listed above (UNVERIFIED this session).
- StepMania source and documentation for judge window values: https://github.com/stepmania/stepmania (UNVERIFIED this session).
- osu! wiki on hit windows and Overall Difficulty: https://osu.ppy.sh/wiki/en/Beatmap/Overall_difficulty (UNVERIFIED this session).
