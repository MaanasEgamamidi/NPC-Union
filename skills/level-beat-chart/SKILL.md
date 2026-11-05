---
name: level-beat-chart
description: Turn a level goal into a timed beat chart with teaching steps, threat levels and an intensity curve, before any layout is drawn.
owner: level-designer
disable-model-invocation: true
argument-hint: "[level name] [mechanic taught] [target minutes]"
---

# Level beat chart

## Inputs

- The mechanic or idea the level teaches, and what the player already knows on arrival.
- Target play time in minutes, and position in the game (early, mid, late).
- Structure wanted: kishōtenketsu (one gimmick: introduce, develop, twist, conclude) or escalation (rising threat with rests).
- If any are missing, ask once. If still missing, assume a 10-minute early-game level with kishōtenketsu and say so.

## Steps

1. Write the level's one-line promise: "The player learns X and leaves able to Y."
2. List every new thing learned in order. Each must appear first in a safe beat (failure is cheap), then with mild consequence, then combined with something known.
3. Split the target time into beats of 1-3 minutes. Assign each beat: location, intended emotion, what is learned, threat 1-5, minutes, reward.
4. Apply the rest rule: no more than two beats at threat 4-5 or high cognitive load in a row; insert a low-load beat (traversal, reward room, short timed task) between them.
5. Place the twist beat at roughly 60-75% of the running time, and the final test after at least one rest.
6. Mark the landmark (weenie) the player can see from the start and from each rest beat.
7. Check every row: a beat with no "learns" and no "reward" is cut or merged.
8. Draw the intensity curve as a text sparkline of threat values and check it rises with dips, not flat.

## Output

```
# Beat chart: <level>
Promise: The player learns <X> and leaves able to <Y>.
Arrives knowing: <list>   Target: <min>   Structure: <kishōtenketsu|escalation>
Landmark: <name, where visible from>

| # | Beat | Location | Emotion | Learns | Threat 1-5 | Min | Reward |
|---|------|----------|---------|--------|-----------|-----|--------|

Intensity: 1 2 3 3 1 4   (twist at beat <n>, rest at beat <n>)
Cut candidates: <beats with no learning and no reward>
Assumptions: <list>
```

## Done when

- [ ] Every new mechanic appears first in a beat with threat 1-2.
- [ ] Minutes add up to the target within 10%.
- [ ] No three high-threat or high-load beats in a row.
- [ ] Twist and conclusion beats are named.
- [ ] A landmark is listed with where it is visible from.
- [ ] Assumptions are written down.
