---
title: SFX layering, variation, loudness and library licensing
tags: [sfx, sound-design, variation, round-robin, loudness, licensing, freesound, audio-formats]
sources:
  - https://freesound.org/help/faq/
  - https://creativecommons.org/licenses/by/4.0/
  - https://creativecommons.org/licenses/by-nc/4.0/
  - https://creativecommons.org/publicdomain/zero/1.0/
  - https://docs.unity3d.com/Manual/class-AudioClip.html
  - https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_audio_samples.html
  - https://docs.godotengine.org/en/stable/classes/class_audiostreamrandomizer.html
  - https://www.fmod.com/docs/
  - https://www.audiokinetic.com/library/
  - https://developer.valvesoftware.com/wiki/Soundscripts
  - https://www.itu.int/rec/R-REC-BS.1770
  - https://tech.ebu.ch/publications/r128
last_verified: 2026-11-05
---

# SFX layering, variation, loudness and library licensing

Working notes for the sfx-designer. Numbers here are craft heuristics, not standards, unless a source is named. Claims that could not be checked remain marked UNVERIFIED.

## Layering

- Split a designed sound into transient (first 5 to 30 ms), body (material and weight, roughly 30 to 300 ms) and tail (decay, debris, space).
- One layer owns the sub. High-pass the others. Stacked low end costs headroom and blurs the hit.
- Phase-check stacked transients in mono. Shift by about 1 ms or flip polarity if they cancel.
- Trim the head to the first attack sample. Silence at the start reads as input lag. Fade in 1 to 2 ms only if trimming clicks; always fade the end.
- Keep 3D-positioned sounds dry and mono. Bake reverb only into UI and non-positional sounds.

## Variation and repetition

- Pool size by trigger rate: rare 1 to 2, regular 3 to 4, rapid (footsteps, gunfire, pickups) 4 to 8 per surface or state.
- Pitch randomization around +/-100 to 200 cents for small repeated sounds; beyond about 300 cents the sound reads as a different object. Volume randomization +/-1 to 2 dB.
- Pure random selection repeats the previous file with probability 1/N (25 percent for a 4-file pool). Use shuffle or "avoid last N".
- Middleware and engine support:
  - Wwise Random Containers have an option to avoid repeating the last played items. Exact setting name: UNVERIFIED, check https://www.audiokinetic.com/library/.
  - FMOD Studio multi instruments select items from a playlist, with shuffle as the default; Random modulators modify properties. See the [FMOD 2.04 glossary](https://www.fmod.com/docs/2.04/studio/glossary.html).
  - Godot 4 has `AudioStreamRandomizer` with `random_pitch`, `random_volume_offset_db`, and `playback_mode`; `PLAYBACK_RANDOM_NO_REPEATS` avoids consecutive repeats when possible. See the [class reference](https://docs.godotengine.org/en/stable/classes/class_audiostreamrandomizer.html).
  - Valve Source engine soundscripts support `rndwave` to pick randomly from a list of files (https://developer.valvesoftware.com/wiki/Soundscripts). UNVERIFIED in this session.
- Limit instances of the same event (start at 3 to 6 voices) and add a retrigger cooldown of about 30 to 50 ms for rapid sounds. Many identical starts within a few milliseconds comb-filter.

## Loudness

- Loudness is measured in LUFS/LKFS per ITU-R BS.1770; EBU R 128 sets broadcast programme targets. These are written for programmes, so for short SFX use short-term or momentary loudness to compare items in a pool, and balance categories by ear against a reference such as dialogue.
- Keep true peak on exported files at or below about -1 dBTP to leave room for codec overshoot. Heuristic, not a game-industry standard.
- The Audio Standards Working Group (ASWG) published loudness recommendations for game output, commonly cited as about -24 LUFS integrated for console and PC and about -18 LUFS for mobile and handheld. UNVERIFIED: no source checked in this session, and no URL is listed for it.

## Formats

- Masters: WAV, 48 kHz, 24-bit is common for game work. Record at 96 kHz if sounds will be pitched down a lot, so they keep high-frequency content.
- Do not upsample 44.1 kHz library files to 48 kHz for no reason beyond matching the project; resampling is fine, but it adds nothing.
- Avoid MP3 for loops: encoders add padding at start and end that causes a gap. Ogg Vorbis and WAV loop cleanly.
- Unity: AudioClip import offers load types (decompress on load, compressed in memory, streaming) and compression formats (PCM, ADPCM, Vorbis). Check the current manual before stating defaults. UNVERIFIED for the current version.
- Godot imports WAV, Ogg Vorbis and MP3; [Godot 4.3 documentation](https://docs.godotengine.org/en/4.3/tutorials/assets_pipeline/importing_audio_samples.html) lists QOA as a WAV compression option.
- Mono for anything the engine spatialises. Stereo for UI, 2D and non-diegetic sounds.
- Put loop points on zero crossings and crossfade noisy loops.

## Licensing (Freesound and Creative Commons)

- Freesound sets the licence per uploaded sound, not per pack or user. A pack can mix licences.
- Freesound lists CC0, Attribution, and Attribution Noncommercial as upload licence options; older sounds can carry the retired Sampling+ licence. Check the individual sound and its licence terms. [Freesound FAQ](https://freesound.org/help/faq/).
- CC BY attribution normally needs the author name, the title or link, the licence and a link to it, and a note if you changed it. Check the deed for the version on the sound page.
- CC BY-NC sounds are not safe for a commercial game. Replace them before release. For edge cases (free game with ads, paid DLC, trailers), send to game-legal-advisor.
- Commercial libraries have their own EULAs. Common restrictions include no redistribution of raw files (a problem for moddable games that ship loose audio) and limits on use in other sound libraries. Read each EULA.
- Keep a ledger per file: source URL, author, licence, attribution text, commercial yes or no, date checked.

## Needs local verification

Recheck version-specific settings and individual licence terms before use.
