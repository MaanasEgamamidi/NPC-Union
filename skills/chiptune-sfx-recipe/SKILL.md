---
name: chiptune-sfx-recipe
description: Turn a retro sound request into an editable chip patch (sfxr params, NES channel table, or Web Audio code) with variants and export notes.
owner: chiptune-synthesist
disable-model-invocation: true
argument-hint: "[sound to make, target: nes | gameboy-style | web-audio | sfxr]"
---

# Chiptune SFX recipe

Produces one sound sheet per effect that a programmer can drop in and a designer can tweak later.

## Inputs

- The sound's name and the game event that triggers it.
- Target: strict NES 2A03, Game Boy-style, sfxr or jsfxr, or Web Audio code.
- Frame timing: NTSC 60 Hz or PAL 50 Hz. Default to 60 Hz and say so.
- Whether the effect shares channels with music.
- How often it fires (once per level, or several times a second).

If target and trigger are known, assume the rest, state the assumptions at the top of the sheet, and continue.

## Steps

1. Write the sound's job in one line: what it confirms or warns about, and what it must not mask.
2. Set a length in frames, then convert: ms = frames x 1000 / frame rate. Sounds that fire several times a second stay under about 8 frames.
3. Choose the channel plan. Tonal blips use a pulse; impacts and hiss use noise in normal mode; metallic hits use short-mode noise; low thumps use the triangle (no fades on the triangle for strict NES). If music shares the chip, assign the effect to one pulse plus noise and note which music voice drops out.
4. Choose duty cycle: 12.5% for thin and cutting, 25% for bright, 50% for hollow. Note that 75% sounds like 25% on its own.
5. Write the pitch shape: start note or Hz, end note or Hz, slide curve, and any arpeggio steps (one note per frame for chord shimmer, longer steps for a two-note jingle).
6. Write the volume envelope per frame (0 to 15 for NES) or as attack, sustain, punch, decay for sfxr.
7. Write the patch in the target format:
   - sfxr or jsfxr: the full parameter list with names and values.
   - NES: a frame-by-frame table of channel, duty, volume, timer or note.
   - Web Audio: a function with named default arguments, `PeriodicWave` for non-50% duty, `setValueAtTime` before every ramp, gain ramps ending at 0.0001, and a note that `AudioContext.resume()` must run inside a user gesture.
8. Mark the two or three parameters that change the character most.
9. Make two or three variants by changing one or two knobs each, and name them.
10. Check limits: duty exists on target, triangle has no volume ramp on strict NES, pulse timer not under 8, channel conflicts with music, PAL timing if relevant.
11. Write export settings: 16-bit WAV, sample rate, peak level, no lossy codec for short SFX.

## Output

```
### <sound name>
Job: <one line>
Trigger: <event>  Priority: <high | normal | low>
Target: <nes | gameboy-style | sfxr | web-audio>  Timing: <60 | 50> Hz
Length: <n> frames / <ms> ms
Assumptions: <list>

Channel plan:
| Channel | Role | Duty / mode | Notes |

Patch:
<sfxr parameter list | per-frame table | code block>

Main knobs: <param>: <what it changes>; <param>: <what it changes>

Variants:
- <name>: <what changed>
- <name>: <what changed>

Limit checks: <pass, or what was changed and why>
Export: 16-bit WAV, <sample rate>, peak <dBFS>
Hand-off: audio-director (mix priority), <programmer or other agent>
```

## Done when

- [ ] Every sound has a job line, trigger, length in frames and ms.
- [ ] The patch is numbers or code, not only a description, and can be changed without re-recording.
- [ ] Non-50% pulse duty in Web Audio uses `PeriodicWave` or an `AudioWorklet`, not the built-in square type.
- [ ] Strict NES patches use only real duty values and no triangle volume fades.
- [ ] Two or three named variants exist.
- [ ] Channel conflicts with music are stated.
- [ ] Export settings avoid lossy formats for short effects.
- [ ] Assumptions are listed at the top.
