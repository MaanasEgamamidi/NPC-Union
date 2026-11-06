---
title: Chip synthesis reference for retro game SFX
tags: [audio, chiptune, nes, 2a03, sfxr, jsfxr, web-audio, synthesis]
sources:
  - "https://www.nesdev.org/wiki/APU"
  - "https://www.nesdev.org/wiki/APU_Pulse"
  - "https://www.nesdev.org/wiki/APU_Triangle"
  - "https://www.nesdev.org/wiki/APU_Noise"
  - "https://www.nesdev.org/wiki/APU_Mixer"
  - "https://gbdev.io/pandocs/Audio.html"
  - "https://www.drpetter.se/project_sfxr.html"
  - "https://github.com/chr15m/jsfxr"
  - "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
  - "https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createPeriodicWave"
  - "https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime"
  - "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay"
last_verified: 2026-11-05
---

# Chip synthesis reference for retro game SFX

Used by `chiptune-synthesist`. NESdev pages remain blocked to direct fetching in this environment; some details below were checked against search-indexed source text. Check the linked page before quoting a number to a user.

## NES 2A03 APU

| Channel | Waveform | Volume | Notes |
|---|---|---|---|
| Pulse 1, Pulse 2 | Square with duty 12.5%, 25%, 50%, 75% | 4-bit (0 to 15) constant or decaying envelope | Each has a sweep unit for pitch slides |
| Triangle | 32-step quantised triangle | None: on or off only | One octave lower than a pulse at the same timer value |
| Noise | 15-bit LFSR | 4-bit envelope | 16 period presets, mode bit for short loop |
| DMC | 1-bit delta samples | 7-bit output level | Used for drums and voice clips |

- Check pulse and triangle frequency formulas and the target region's CPU clock in the linked NESdev channel documentation before calculating pitches.
- Pulse timer values below 8 mute the channel. The sweep unit also mutes the channel when its target period exceeds $7FF. [NESdev sweep](https://www.nesdev.org/wiki/APU_Sweep).
- Check the linked NESdev sweep documentation for differences between the pulse channels before implementing downward sweeps.
- 75% duty is the 25% waveform inverted. Heard alone, they sound the same.
- Noise short mode (mode bit set) produces a 93- or 31-step repeating sequence, depending on the shift register state. [NESdev noise](https://www.nesdev.org/wiki/APU_Noise).
- The mixer is nonlinear. An approximation is `pulse_out = 95.88 / (8128 / (pulse1 + pulse2) + 100)` with a separate curve for triangle, noise and DMC. [NESdev mixer](https://www.nesdev.org/wiki/APU_Mixer).
- Famicom cartridges could add expansion audio chips; the NES cartridge slot did not route that audio. Konami's VRC6 in the Japanese release of Castlevania III (Akumajou Densetsu) added two pulse channels and a sawtooth. [NESdev VRC6 audio](https://www.nesdev.org/wiki/VRC6_audio).

## Game Boy (DMG) for comparison

For Game Boy channel capabilities, waveform sizes and noise modes, consult [Pan Docs](https://gbdev.io/pandocs/Audio.html) for the target hardware before implementing them.

## Arpeggios and frame timing

- Chords are faked by cycling notes once per frame. NTSC games tick at about 60 Hz, PAL at 50 Hz, so the same arpeggio table runs about 17% slower on PAL.
- Tracker arpeggio effects (FamiTracker `0xy`) cycle base note, +x semitones, +y semitones. Check the documentation of the specific tracker or fork for exact behaviour.

## sfxr and jsfxr parameters

Use the [sfxr project page](https://www.drpetter.se/project_sfxr.html) and [jsfxr repository](https://github.com/chr15m/jsfxr) to check release history and the chosen port's exact parameter names. Parameter groups to inspect:

- Wave: square, sawtooth, sine, noise (some ports add more).
- Envelope: attack, sustain, sustain punch, decay.
- Pitch: start frequency, minimum frequency cutoff, slide, delta slide, vibrato depth, vibrato speed.
- Arpeggio: change amount, change speed.
- Square: duty, duty sweep.
- Repeat speed.
- Phaser: offset, sweep.
- Filters: low-pass cutoff, low-pass sweep, low-pass resonance, high-pass cutoff, high-pass sweep.

Keep the parameter set in the repo. A WAV alone cannot be tweaked later.

## Web Audio pitfalls

- `OscillatorNode` with type `"square"` is a 50% duty wave. For other duties, build a `PeriodicWave` with sine coefficients `b_k = (2 / (k * pi)) * sin(k * pi * d)` for duty `d`, or generate samples in an `AudioWorklet`.
- `exponentialRampToValueAtTime` throws or misbehaves for a target of 0; ramp to a small value such as 0.0001 and stop the node.
- Call `setValueAtTime` at the current time before starting a ramp, or the ramp starts from the previous scheduled event.
- Autoplay policy: an `AudioContext` created before a user gesture starts suspended. Call `resume()` from a click, tap or key handler.
- Create one `AudioContext` per page and reuse it; create new oscillator nodes per sound, since an `OscillatorNode` can only be started once.

## Export

- Short SFX: 16-bit WAV. Lossy codecs smear noise transients, and MP3 adds encoder delay at the start, which matters for sounds under 100 ms.
- Peak around -3 dBFS before the mix stage; loudness targets come from `audio-director`.
