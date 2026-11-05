---
name: milestone-plan
description: Build or re-baseline a game milestone schedule with binary gates, a risk register, a cut list and a vertical slice target. Use at project start and at every gate.
owner: producer
disable-model-invocation: true
argument-hint: "[pitch or project doc path, ship date, team size]"
---

# Milestone plan

A repeatable procedure for turning a game scope into dated milestones with testable gates, and for re-planning at each gate.

## Inputs

- Pitch or design doc, and any existing schedule.
- Ship date, and whether it is fixed (publisher, festival, platform event) or movable.
- Team: names or roles, hours per week each, and known absences.
- Runway in months and any milestone payments tied to dates.
- Target platforms and storefronts.
- The one feature that must not be cut.

If any are missing, ask once in a single message. If still missing, write the assumption down and continue.

## Steps

1. List fixed dates first: ship date, festivals, publisher payments, cert windows. Look up any storefront or platform deadline on the official partner docs; mark it UNVERIFIED if you cannot check it.
2. Reserve a buffer block of 15 to 25 percent of the remaining schedule at the end, owned by production. Do not spread it across tasks.
3. Work backwards from the ship date and place: release candidate, beta (content complete), alpha (feature complete), vertical slice, first playable.
4. Write two to four binary exit criteria per milestone. Each must be answerable yes or no by someone outside the team.
5. Define the vertical slice: the smallest section at shipping quality across every discipline, and the cost numbers it must produce (hours per level, enemy, card, minute of dialogue).
6. Size content. If the slice is done, multiply its measured unit costs by planned counts. If not, mark the sizing as a guess and add a re-plan gate one week after the slice.
7. Build the risk register: list risks, score probability and impact as L/M/H, give each top-five risk an owner, a trigger date and a cheap experiment that retires it. Always check pipeline, save/load, localization freeze, certification and online services.
8. Build the cut list: every non-core feature with value (H/M/L), cost (weeks), and the milestone by which it must be cut if behind. Sort by value per cost.
9. Check capacity: total planned weeks per discipline against available weeks per discipline. If any discipline is over, move items to the cut list now.
10. Date-stamp the plan and list the assumptions. At each gate, rerun steps 6 to 10 with measured data.

## Output

```
# Milestone plan: <project> (dated <YYYY-MM-DD>)

Fixed dates: <list, with source or UNVERIFIED>
Buffer: <weeks>, <start> to <end>

| Milestone | Date | Exit criteria (yes/no) | Owner |
|---|---|---|---|

Vertical slice: <contents>. Must measure: <unit costs>.

## Risks
| Risk | P | I | Owner | Trigger date | Mitigation experiment |
|---|---|---|---|---|---|

## Cut list
| Feature | Value | Cost (wks) | Cut by | Status |
|---|---|---|---|---|

## Capacity
| Discipline | Planned wks | Available wks | Over/under |
|---|---|---|---|

## Assumptions
- <assumption>, verify by <date> with <agent>
```

## Done when

- [ ] Every milestone has a date, an owner and binary exit criteria.
- [ ] A buffer block exists and is not assigned to tasks.
- [ ] The vertical slice names the unit costs it must measure.
- [ ] Top five risks each have an owner, trigger date and experiment.
- [ ] The cut list is sorted and has a cut-by milestone for every item.
- [ ] No discipline is over capacity without a matching cut.
- [ ] Platform and store dates are cited or marked UNVERIFIED.
- [ ] The plan is dated and assumptions are listed.
