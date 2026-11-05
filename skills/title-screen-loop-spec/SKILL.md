---
name: title-screen-loop-spec
description: Builds a title screen spec with layer stack, seamless loop maths, intro timeline, press-start rules, attract mode and safe areas. Run before title art or code starts.
owner: title-screen-designer
disable-model-invocation: true
argument-hint: "[game, art style, platforms, music loop length]"
---

# Title screen loop spec

Turns a title screen brief into a spec an artist, a composer and an engine programmer can build from without guessing.

## Inputs

- Target platforms and output resolutions. Ask if missing; default to 1920x1080 plus 16:10 and 21:9 checks.
- Art style and base resolution (pixel art source size, painted, or 3D).
- Scene idea: what is in the background, midground, foreground, and what moves.
- Music loop length in seconds, or BPM and bar count. Ask if missing.
- Boot sequence before the title (publisher and engine logos).
- Whether attract mode is wanted, and whether gameplay can be replayed deterministically.
- Memory or platform limits (mobile, Switch, web).

If an answer is missing after one round of questions, write the assumption into the spec under "Assumptions" and continue.

## Steps

1. **List layers back to front.** For each: name, source size, opaque or alpha, parallax factor (0.0 for sky, rising to 1.0 at the play plane, above 1.0 for foreground), motion type (static, scroll, sprite cycle, shader), and cycle length.
2. **Set the master loop.** Choose a master length that every cycle divides into evenly. If music exists, make the master equal to the music loop or a whole divisor of it. Compute the least common multiple of all cycle lengths and confirm it equals the master. Adjust cycles that don't fit.
3. **Check wrapping layers.** For each scrolling layer, distance per cycle must be a whole multiple of the tile width, and for pixel art a whole number of source pixels.
4. **Estimate cost.** Memory per layer = width x height x 4 bytes for RGBA8 before compression. Sum it. Count full-screen alpha layers as the overdraw estimate. Flag anything above 4 full-screen alpha layers on mobile or web.
5. **Write the intro timeline** in ms from the first title frame: each layer's fade or entrance, logo entrance, logo settled, prompt reveal. The prompt appears at least 500 ms after the logo settles.
6. **Write press-start rules:** blink or pulse timing (around 1 Hz, never 3 or more flashes per second), ignore buttons held on arrival, require a fresh press, any press during the intro skips to the settled frame, confirm sound cue name, and what happens next (menu, profile pick, save load).
7. **Write attract-mode rules** if wanted: idle timeout, demo source (recorded inputs plus RNG seed, or a pre-rendered video), how many demos rotate, return to title on any input. If the game is not deterministic, specify a video instead.
8. **Plan safe areas** for each target aspect: the centre safe rectangle (5% per side unless the platform says otherwise), which layers bleed, how much extra width or height each background layer needs for 16:10 and 21:9, and phone notch insets if relevant.
9. **Accessibility and burn-in:** flash count per second for every flicker, reduced-motion fallback (parallax and drift off, static frame), idle dim or logo drift for OLED, prompt as a live text layer for localization with 30 to 40% spare width.
10. **Placeholder images** (Codex only): generate each layer on a transparent background at its source size, and record the prompt. Without Codex, write the prompts and leave generation to the team.
11. **List hand-offs and open questions.**

## Output

```markdown
# Title screen spec: <game>

## Assumptions
- <assumption>

## Layer stack
| # | Layer | Source size | Alpha | Parallax | Motion | Cycle (s) | Memory (MB, RGBA8) |
|---|---|---|---|---|---|---|---|

Master loop: <n> s. LCM of cycles: <n> s. Music loop: <n> s. Match: yes/no.
Overdraw estimate: <n> full-screen alpha layers.
Total uncompressed memory: <n> MB.

## Intro timeline (ms)
| t | Event |
|---|---|

## Press start
- Prompt text: <text>, live text layer
- Reveal: <ms after logo settles>
- Blink: <on ms> / <off ms> or pulse <period>
- Input: ignore held on arrival; fresh press required; intro skip jumps to settled frame
- Confirm cue: <sfx name>; next screen: <screen>

## Attract mode
- Enabled: yes/no; idle timeout: <s>
- Source: recorded inputs + seed / video; demos: <n>
- Exit: any input returns to title

## Safe areas
| Aspect | Resolution | Safe rect | Bleed layers | Extra art needed |
|---|---|---|---|---|

## Accessibility and burn-in
- Max flashes per second: <n>
- Reduced motion: <behaviour>
- OLED: <drift or dim rule>

## Placeholder prompts
- <layer>: <prompt>

## Hand-offs
- composer: <loop length>
- video-director: <capture length>
- <agent>: <item>

## Open questions
- <question>
```

## Done when

- [ ] Every layer has a parallax factor, motion type and cycle length.
- [ ] Every cycle divides the master loop evenly, and the master matches or divides the music loop (or the mismatch is stated as intended).
- [ ] Scroll distance per cycle is a whole multiple of each wrapping layer's tile width.
- [ ] Memory and overdraw are estimated, with a flag if over budget.
- [ ] The prompt reveal comes after the logo settles, and held-button handling is specified.
- [ ] No element flashes three or more times in any one second.
- [ ] Logo and prompt sit inside the safe rectangle for every listed aspect ratio.
- [ ] A reduced-motion fallback and an OLED idle rule are written down.
- [ ] Prompt text is a separate layer with spare width for localization.
- [ ] Hand-offs name the receiving agents and what each one needs.
