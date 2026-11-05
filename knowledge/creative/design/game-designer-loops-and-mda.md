---
title: Core loops, MDA and design-doc practice
tags: [design, core-loop, mda, aesthetics, mechanics, design-doc]
sources: [https://users.cs.northwestern.edu/~hunicke/MDA.pdf, https://www.engadget.com/2011-07-14-half-minute-halo-an-interview-with-jaime-griesemer.html, https://lostgarden.com/2012/04/30/loops-and-arcs, https://www.theoryoffun.com/]
last_verified: 2026-11-05
---

# Core loops, MDA and design-doc practice

## MDA (Hunicke, LeBlanc, Zubek)
- Taught as part of the Game Design and Tuning Workshop at GDC. PDF: https://users.cs.northwestern.edu/~hunicke/MDA.pdf
- Mechanics: the components of the game at data and algorithm level. Dynamics: run-time behaviour of mechanics acting on player input and each other. Aesthetics: the desirable emotional responses in the player.
- Designer sees M → D → A; player experiences A first.
- Eight aesthetics: Sensation, Fantasy, Narrative, Challenge, Fellowship, Discovery, Expression, Submission.
- Paper's examples: Charades (Fellowship, Expression, Challenge); Quake (Challenge, Sensation, Competition, Fantasy); The Sims (Discovery, Fantasy, Expression, Narrative); Final Fantasy (Fantasy, Narrative, Expression, Discovery, Challenge, Submission).

## Loop timescales
- Jaime Griesemer (Bungie) on "30 seconds of fun": the documentary cut his point that the loop was replayed in varied settings, weapons, vehicles and enemies; he described "a 3-second loop inside of a 30-second loop inside of a 3-minute loop that is always different", tracing to a 2002 GDC talk with Chris Butcher. https://www.engadget.com/2011-07-14-half-minute-halo-an-interview-with-jaime-griesemer.html

## Loops and arcs (Daniel Cook, 2012)
- Loop: mental model → action → system → feedback → updated model. Loops deliver value through being exercised.
- Arc: a broken loop you exit immediately; delivers its payload once, repeat value drops.
- https://lostgarden.com/2012/04/30/loops-and-arcs

## Theory of fun
- Raph Koster, A Theory of Fun for Game Design; a fully revised tenth-anniversary edition is published by O'Reilly. https://www.theoryoffun.com/
- The "fun is learning and mastering patterns" thesis is widely summarised from the book; the book site itself does not state it in those words. Quote the book directly if you need exact wording.

## Doc sections (adapted from Claude-Code-Game-Studios game-designer agent, MIT)
Overview, Player fantasy, Rules, Formulas, Edge cases, Dependencies, Tuning knobs (feel / curve / gate), Acceptance criteria.
