---
title: Title screen motion, loops and safe areas
tags: [title-screen, parallax, safe-area, attract-mode, accessibility, loops]
sources:
  - https://learn.microsoft.com/en-us/windows/apps/design/devices/designing-for-tv
  - https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html
  - https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
  - https://docs.godotengine.org/en/stable/classes/class_parallax2d.html
last_verified: 2026-11-05
---

# Title screen motion, loops and safe areas

Reference notes for `title-screen-designer`. WCAG and Godot parallax details were checked on 2026-11-05; other unchecked claims remain marked UNVERIFIED.

## Safe areas

- Microsoft's "Designing for Xbox and TV" guidance describes a TV-safe area of 48 effective pixels from the left and right edges and 27 effective pixels from the top and bottom, on a 960x540 effective-pixel layout. That is 5% per side. UNVERIFIED (source not re-fetched on 2026-11-05).
- Older broadcast practice used "action safe" at about 90% and "title safe" at about 80% of the frame. Modern TVs overscan less, but many games still ship an overscan or safe-area slider. UNVERIFIED as a current standard; treat as background.
- Steam Deck's built-in screen is 1280x800 (16:10). Ultrawide monitors are commonly 21:9 (for example 2560x1080 or 3440x1440). Nintendo Switch handheld output is 1280x720.
- Console certification requirements (Xbox, PlayStation, Nintendo) are under NDA and change between SDK versions. Do not quote them from memory; check the platform's developer portal.

## Flashing and motion

- [WCAG 2.3.1](https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold) (Level A): content must not flash more than three times in any one-second period, unless the flashes are below the general and red flash thresholds.
- [WCAG 2.2.2](https://www.w3.org/TR/WCAG21/#pause-stop-hide) (Level A): moving, blinking or scrolling content that starts automatically, lasts more than five seconds and is shown alongside other content needs a way to pause, stop or hide it, unless essential. The criterion also addresses auto-updating content. WCAG targets web content, but the same reasoning supports a reduced-motion option for animated title screens.
- Working heuristic: a press-start blink near 1 Hz, or a soft alpha pulse, sits well inside the WCAG flash limit.

## Parallax and loop maths

- Godot 4 has a `Parallax2D` node with a `scroll_scale` property per layer and a `repeat_size` for wrapping layers. Introduced in Godot 4.3, it is intended as a replacement for `ParallaxBackground`/`ParallaxLayer` ([Godot progress report](https://godotengine.org/article/parallax-progress-report/); [class reference](https://docs.godotengine.org/en/stable/classes/class_parallax2d.html)).
- Loop length of a composed screen = least common multiple of every layer's cycle length. Example: cycles of 8, 3 and 2 s repeat together every 24 s. Choose cycles that divide one master length.
- A wrapping layer is seamless only if the scroll distance per cycle is a whole multiple of its tile width. For pixel art, the per-frame position must also land on whole source pixels or the layer shimmers when scaled.
- Typical parallax factors (heuristic, not a standard): sky 0.0 to 0.1, far 0.2 to 0.3, mid 0.5, play plane 1.0, foreground 1.2 to 1.5.

## Cost

- Uncompressed RGBA8 memory = width x height x 4 bytes. One 3840x2160 layer is 33,177,600 bytes, about 33 MB. One 1920x1080 layer is about 8.3 MB.
- Each full-screen alpha layer adds one shading pass per pixel (overdraw). Cut transparent areas and merge layers that never move relative to each other.

## Attract mode

- Arcade cabinets run an attract loop (title, high scores, demo play) while no credit is inserted, to draw players in.
- Super Mario Bros. (NES, 1985) and Sonic the Hedgehog (Mega Drive/Genesis, 1991) both play gameplay demos if left on the title screen.
- Demo play is commonly a replay of recorded inputs, which needs a deterministic, seeded simulation. Where that is not possible, a pre-rendered video is the safer choice. UNVERIFIED as a description of how either game above implements it.

## OLED and idle screens

- Static high-contrast elements left on an OLED panel for long periods risk image retention. Mitigations: slow logo drift or scale breathing, dimming after a few minutes idle, or switching to attract mode. Heuristic; no single published threshold is cited here.

## Localization

- Keep "Press Start" or "Press any button" as a live text layer, not part of the logo art. Budget roughly 30 to 40% extra width for longer languages. Heuristic. Platforms often have required button-naming terms; check the platform guidelines.
