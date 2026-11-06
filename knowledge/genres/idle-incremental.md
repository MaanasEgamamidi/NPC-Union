---
topic: idle-incremental
owner: idle-incremental-expert
last_verified: 2026-11-05
---

# Idle and incremental games

## Core loop

Earn a currency, buy generators or upgrades that earn more, hit milestones that multiply output, then reset for a permanent bonus (prestige) and climb again faster. Many games add offline progress so the loop keeps running between sessions, and automation that takes over tasks the player has already mastered.

## Design pillars

- Constant anticipation: the next purchase is always visible and close.
- Growth with structure: exponential costs against stepped multipliers, so lines stall and then break open.
- Reset that pays back: prestige should make the next run clearly faster.
- New decisions per layer: each layer changes what the player chooses, not only the size of numbers.
- Respect for time away: offline gains are rewarding but capped so active play still matters.
- Slow reveal: hidden systems unlock over time, as in A Dark Room and Universal Paperclips.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Cookie Clicker | 2013 | Julien "Orteil" Thiennot (DashNet) | Clicking into idle, prestige via heavenly chips, upgrade density | https://en.wikipedia.org/wiki/Cookie_Clicker |
| AdVenture Capitalist | 2014 | Hyper Hippo Games | Quantity milestones, managers as automation, angel investor prestige | https://en.wikipedia.org/wiki/AdVenture_Capitalist |
| A Dark Room | 2013 | Michael Townsend (Doublespeak Games) | Text-based slow reveal, genre shift into exploration | https://en.wikipedia.org/wiki/A_Dark_Room |
| Universal Paperclips | 2017 | Frank Lantz | Phase changes that replace the interface and the goal | https://en.wikipedia.org/wiki/Universal_Paperclips |
| Antimatter Dimensions | 2016 | Hevipelle | Stacked prestige layers, automation of earlier layers, big-number handling | https://en.wikipedia.org/wiki/Antimatter_Dimensions |
| Egg, Inc. | 2016 | Auxbrain | Mobile idle pacing, optional ad boosts, prestige via soul eggs | https://en.wikipedia.org/wiki/Egg,_Inc. |
| Melvor Idle | 2021 (Steam release date) | Games by Malcs | Idle timers across many RPG skills, offline progress cap | https://store.steampowered.com/app/1267910/Melvor_Idle/ |

Note: the Wikipedia links above returned HTTP 200 on 2026-11-05; page contents were not read line by line. The Antimatter Dimensions original release year remains UNVERIFIED; its [Steam listing](https://store.steampowered.com/app/1399720/Antimatter_Dimensions/) gives a 2022 Steam release and lists Hevipelle among its developers. The Melvor Idle Steam listing confirms the 2021 release date and Games by Malcs as developer.

## Common failures

- Dead air: long waits with no new purchase or decision, especially in the first 30 minutes.
- Linear prestige currency that floods late runs and makes later layers trivial.
- Prestige that takes longer to pay back than the time it erases.
- Uncapped offline progress that makes active play pointless.
- Layers that only add a bigger multiplier and no new choice.
- Automation given too early (nothing to learn) or too late (tedium).
- Numbers that become unreadable, or overflow near 1.8e308 without a big-number library.
- Monetized boosts that feel required to keep pace.

## Scope traps

- Planning many prestige layers before the first one is fun.
- Hand-tuning hundreds of upgrades without a spreadsheet or simulation.
- Building a rich art layer before the curve is proven; prototype in a spreadsheet or plain text first.
- Adding offline progress late; it touches save format, time handling, and balance.
- Switching number libraries mid-project instead of choosing one up front.

## Sources

- Wikipedia, Incremental game: https://en.wikipedia.org/wiki/Incremental_game
- Wikipedia pages for each game in the table above.
- break_infinity.js (big-number library used in incremental games): https://github.com/Patashu/break_infinity.js
- Cookie Clicker Wiki, heavenly chips and prestige formula: https://cookieclicker.fandom.com/wiki/Heavenly_Chips UNVERIFIED
