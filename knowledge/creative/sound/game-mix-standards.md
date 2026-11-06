---
title: Game mix standards and audio direction reference
tags: [audio, mixing, loudness, middleware, fmod, wwise, naming]
sources:
  - "https://www.itu.int/rec/R-REC-BS.1770"
  - "https://www.itu.int/dms_pub/itu-r/opb/rep/R-REP-BS.2434-2018-PDF-E.pdf"
  - "https://www.audiogang.org/wp-content/uploads/2015/04/IESD-Mix-Ref-Levels-v03.02.pdf"
  - "https://audiomediainternational.com/mobile-loudness-an-adaptive-approach/"
  - "https://tech.ebu.ch/publications/r128"
  - "https://www.fmod.com/docs"
  - "https://www.audiokinetic.com/en/library/"
  - "https://docs.unity3d.com/Manual/AudioMixer.html"
  - "https://docs.godotengine.org/en/stable/tutorials/audio/audio_buses.html"
last_verified: 2026-11-05
---

# Game mix standards and audio direction reference

Used by `audio-director`. Numbers marked as heuristics are working practice, not standards.

## Loudness

- Measurement: ITU-R BS.1770 defines the LKFS/LUFS measurement and true-peak metering. Use a compliant meter.
- Home console and PC: about -24 LUFS integrated, ±2 LU. Portable game devices: about -18 LUFS, ±2 LU. An ITU-R report (BS.2434, 2018) lists these as typical video game loudness values; the IESD mix reference document hosted on the Game Audio Network Guild site also recommends -24 LUFS for console titles. Search check on 2026-11-05 found these via search results; the PDFs themselves were not opened in full.
- Consult the original ASWG-R001 recommendation before attributing specific true-peak or measurement-duration guidance to it.
- For a game mix, choose a true-peak ceiling and confirm it against the current target platform guidelines; measure with a compliant meter.
- Platform holders publish their own requirements under NDA. Registered developers must check them directly.
- Measure over long, representative gameplay captures, not over a single cue or the menu. (Heuristic.)

## Bus structure (heuristic)

- Master > Dialogue, Music, SFX (with sub-buses by source), Ambience, UI; reverb and shared effects as send buses.
- Keep the tree to three levels or fewer so mix states stay readable.
- Engine-native options: Unity AudioMixer has groups, snapshots, sends, and a Duck Volume effect (see Unity manual). Godot uses an audio bus layout with effects per bus, including a compressor that can take a sidechain bus (see Godot docs).

## Ducking (heuristic)

- Music under dialogue: 6 to 9 dB reduction, attack 50 to 150 ms, release 400 to 800 ms.
- Short release (under about 250 ms) audibly pumps between lines; very long release leaves gaps after short barks.
- Do not stack a snapshot and a sidechain duck on one bus without a priority rule.

## Voice limits (heuristic)

- Frequent one-shots (footsteps, impacts): 4 to 8 instances, steal oldest or quietest.
- Stingers and announcer lines: 1 instance, fail new or cut old depending on importance.
- Set a global real-voice cap per platform; extra voices go virtual. In Wwise, the per-object virtual voice behaviours include continuing to play, killing the voice, and sending to virtual voice (see Wwise docs). Check loop behaviour on return from virtual (resume vs restart).
- Godot 4 `AudioStreamPlayer` has a `max_polyphony` property per player; there is no built-in per-category concurrency, so a small pool script handles categories.

## Assets and memory (heuristic)

- Author at 48 kHz. Choose codecs per platform at build time.
- 3D point sources in mono; stereo for music, UI, ambience beds.
- Short frequent sounds in memory (decompressed or ADPCM); long music and ambience streamed.
- Footsteps: 6 to 10 variations per surface, randomise pitch within about ±2 semitones and volume within about ±2 dB.

## Naming (heuristic)

- Pattern: `<CAT>_<OWNER>_<Action>_<Variant>_<NN>`, for example `SFX_PLR_Footstep_Grass_01`, `MUS_Biome1_Combat_Loop`, `VO_SHOP_Greet_03`.
- No spaces, no version words like "final", two-digit indexes from 01.

## Middleware

- FMOD Studio and Wwise both offer event-based authoring, parameters, snapshots or states, randomisation, and live profiling. Wwise includes an HDR audio feature.
- Check current FMOD and Wwise licensing terms, thresholds and prices before advising: https://www.fmod.com/licensing and the Audiokinetic pricing page.
- Check the maintainers' documentation and release notes for the FMOD or Wwise Godot integration and the project's exact Godot version before choosing it.

## Needs local verification

- ASWG-R001 PDF: exact true-peak and measurement guidance.
- Current FMOD and Wwise licence thresholds.
