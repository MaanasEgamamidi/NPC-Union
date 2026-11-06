---
title: Adaptive music loops, layers and engine loop points
tags: [music, loops, adaptive-audio, stems, godot, unity, web-audio, fmod, wwise]
sources:
  - "https://docs.godotengine.org/en/stable/classes/class_audiostreamoggvorbis.html"
  - "https://docs.godotengine.org/en/stable/classes/class_audiostreamwav.html"
  - "https://godotengine.org/releases/4.3/"
  - "https://docs.godotengine.org/en/stable/classes/class_audiostreaminteractive.html"
  - "https://docs.godotengine.org/en/stable/classes/class_audiostreamsynchronized.html"
  - "https://docs.unity3d.com/ScriptReference/AudioSource.PlayScheduled.html"
  - "https://docs.unity3d.com/ScriptReference/AudioSettings-dspTime.html"
  - "https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopStart"
  - "https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/loopEnd"
last_verified: 2026-11-05
---

# Adaptive music loops, layers and engine loop points

The Godot interactive and synchronized stream documentation and 4.3 release notes were checked on 2026-11-05. Check the documentation for the project's engine version before specifying its audio properties.

## Loop math

- Samples per bar = sample_rate x 60 x beats_per_bar / BPM.
- 48,000 Hz, 120 BPM, 4/4: 96,000 samples. 48,000 Hz, 150 BPM: 76,800. 48,000 Hz, 90 BPM: 128,000.
- 44,100 Hz, 140 BPM, 4/4: 75,600. 44,100 Hz, 133 BPM: 79,578.95 (not whole, so it drifts against a beat clock over many loops).
- Loop start = intro length in samples. Loop end = loop start + loop body length in samples.

## Seams and tails

- Print-twice method: render the loop body twice in a row and cut the loop from the second pass, so tails from the end wrap into the start.
- Cut at zero crossings on all channels and match energy across the seam.
- Encoder delay and padding can affect loop seams. Test the exported file in the target playback path; check the encoder documentation for delay and padding behavior.

## Engine loop points

- Godot 4 AudioStreamOggVorbis: `loop` (bool), `loop_offset` (seconds).
- Godot 4 AudioStreamWAV: `loop_mode`, `loop_begin`, `loop_end` (samples).
- [Godot 4.3](https://godotengine.org/releases/4.3/) added AudioStreamInteractive (clip switching with transitions), AudioStreamSynchronized (stems in sync with per-stream volume) and AudioStreamPlaylist.
- Unity: for an intro followed by a loop, evaluate scheduling clips with [`AudioSource.PlayScheduled`](https://docs.unity3d.com/ScriptReference/AudioSource.PlayScheduled.html); confirm timing and loop settings in the installed version's documentation and test the seam.
- Web Audio: AudioBufferSourceNode `loop`, `loopStart`, `loopEnd` (seconds).
- Check the target tool's documentation and test an imported file before relying on loop metadata tags.

## Middleware terms

- FMOD Studio: loop regions, transition markers, destination markers, transition regions, quantization on transitions. See [FMOD authoring events](https://www.fmod.com/docs/2.04/studio/authoring-events.html).
- For Wwise terminology and transition settings, consult the documentation for the installed version and test the transition in the project.

## Layering and resequencing

- Vertical layering: stems of identical length and zero point, faded in or out by game state. Each layer alone should still sound finished.
- Horizontal resequencing: segments chained by state, with exit points every 1 to 2 bars and short bridge segments for frequent jumps.
- Stingers: short (1 to 4 bars), quantized to the next beat or bar, written to a shared tonic or delivered per key.

## Real-game precedents

- Super Mario Bros. (1985): the music speeds up when the timer drops below 100.
- Super Mario World (1990): a percussion layer is added while the player rides Yoshi.

## Loudness

- Choose a loudness target with the audio director; check the current delivery requirements for each target platform before quoting a number.
