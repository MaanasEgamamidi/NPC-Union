---
title: Voice direction and casting for games
tags: [voice, vo, casting, barks, dialogue, ai-voice, sound]
sources:
  - https://www.sagaftra.org/
  - https://www.dglaw.com/sag-aftras-new-video-game-agreement/
  - https://technologylaw.fkks.com/post/102mewu/inside-the-new-sag-aftra-interactive-media-agreement-new-standards-for-ai-and-di
  - https://www.equity.org.uk/
  - https://www.audiokinetic.com/en/library/
last_verified: 2026-11-05
---

# Voice direction and casting for games

Working notes for the voice-director. Session conventions here are craft practice, not contract terms. Anything about unions, rates, or AI law changes over time and must be rechecked before use.

## Recording script columns

Game VO is usually recorded line by line, with each actor alone in the booth. The script must carry what a film actor would get from the scene partner:

| Column | Why |
|---|---|
| ID | Stable key for files, engine events, and localization |
| Speaker | Who says it |
| Context | What just happened, or the previous line |
| To | Who the line is addressed to |
| Distance | whisper, near, room, far, shout |
| Intent | One verb or short phrase |
| Projection 1-5 | Groups lines by mic technique and gain |
| Max duration | Only for time-locked lines |
| Notes | EFFORT, pronunciation, alt reads |

## Session running order

1. Room tone, 30 seconds, and again after any mic move.
2. Warm-up lines at low projection.
3. Dialogue in story order, grouped by projection so the engineer is not resetting gain each line.
4. Barks.
5. Efforts, screams, and deaths last, because they tire the voice.

Throughput rule of thumb: roughly 200 to 300 simple lines per session day, far fewer for dramatic cinematic scenes. UNVERIFIED; varies by actor, director, and line type.

Pickup budget: plan a follow-up session for around 10 to 15 percent of lines. UNVERIFIED rule of thumb.

## File naming

Pattern: `VO_<area>_<speaker>_<ID>_<lang>_t<take>.wav`. Drop the take suffix on the circled take at delivery. Never name files from line text. If the project uses Wwise, dialogue is commonly organized into localized voice banks or sound banks per language; check the current Audiokinetic documentation for the exact setup in the version used.

## Barks

- Budget variants by how often the trigger fires. High-frequency triggers (spotted, reload, hurt) need the most variants.
- Pair variants with a cooldown rule for the audio programmer, for example "no repeat of the same variant within N seconds".
- Write barks in sets so each variant differs in wording and intent, not only in delivery.

## Casting briefs and sides

- Describe the voice, not the actor's appearance: voice age, pitch, texture, accent with region, energy.
- References are described in words, not by naming a living actor to imitate.
- Sides are 1 to 2 pages with a quiet line, a subtext line, the character's common emotional state, and one effort or loud line.

## Unions and AI voices

- SAG-AFTRA members ratified a new Interactive Media Agreement in July 2025, ending the video game strike that began in 2024 over AI protections. Law-firm summaries describe requirements for separate, written, reasonably specific consent before a performer's digital replica is created or used, disclosure rules, and usage reporting. Sources: the Davis+Gilbert and Frankfurt Kurnit links above. Exact terms, exceptions, and dates are UNVERIFIED against the agreement text; read the agreement on sagaftra.org before relying on any of them.
- Session length limits for vocally stressful work exist in SAG-AFTRA terms. Exact hours are UNVERIFIED.
- UK performers: check Equity UK guidance. No specific Equity terms are stated here; UNVERIFIED.
- Temp TTS for timing is common. Tag every temp file `TEMP_TTS_` so it cannot ship.
- Cloning a real voice, or training a model on recordings, needs written consent from the performer and a contract check by game-legal-advisor. This file is not legal advice.

## Real game references

- Hades (Supergiant Games, 2020): Logan Cunningham voices Hades along with several other characters, and composer Darren Korb voices Zagreus. A useful example of a small cast covering many roles with distinct reads.
- Firewatch (Campo Santo, 2016): almost the whole story is carried by two voices over a radio, Cissy Jones as Delilah and Rich Sommer as Henry. A reference for distance and intimacy direction without on-screen faces.
