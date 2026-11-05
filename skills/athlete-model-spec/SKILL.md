---
name: athlete-model-spec
description: Turn a sports game idea into an athlete attribute, fatigue, form and injury model with parameter ranges and data sources.
owner: sports-science-expert
disable-model-invocation: true
argument-hint: "<sport, game type, season or session length>"
---

# Athlete model spec

Produces a parameter table a systems designer can drop into a spreadsheet or code.

## Inputs

- Sport and level (pro, amateur, youth, fictional).
- Game type: manager sim, arcade sports, exergame.
- Time scale: matches per season, sessions per week, or session length.
- Real or fictional athletes. If any input is missing, assume football manager sim, fictional players, 38 league matches, and say so.

## Steps

1. Attributes: pick 10 to 25 attributes in three groups (physical, technical, mental). Give each a scale (for example 1 to 20), a starting distribution, and an ageing curve (rise, peak window, decline rate). Physical speed and power peak earlier than mental attributes.
2. Load: define load per event (minutes x intensity for matches, smaller fixed loads for training). For exergames, use MET values from the Compendium of Physical Activities and session minutes.
3. Fitness and fatigue: model each as an exponentially decaying sum of load (Banister). Set fatigue decay several times faster than fitness. Readiness = fitness minus fatigue, scaled to the attribute range. Leave tau values as tunable ranges, not fixed claims.
4. Sharpness or form: a separate value that rises with recent minutes and decays without them.
5. Injury: base probability per exposure, multiplied by (a) load spike (7-day versus 28-day, shown as a warning, not a validated predictor), (b) previous injury in the last season, (c) age. Define recovery bands by type (knock, strain, ligament) with day ranges.
6. Recovery levers: rest days, rotation, training intensity, and their effect size.
7. Data sources: for each, record URL, licence or terms, format, and what you calibrate with it (event frequencies, age curves). Check terms live; mark anything unchecked UNVERIFIED.
8. Player-facing feedback: which values are shown (readiness, sharpness, risk colour) and which stay hidden.
9. Risks: real names and likeness, body weight or BMI display, health claims, betting links. Route to `game-legal-advisor`.
10. Test plan: three scripted scenarios (fixture pile-up, injury return, ageing star) with the expected outcome.

## Output

```
# Athlete model: <game>
Assumptions: <sport, type, time scale>

## Attributes
| Group | Attribute | Scale | Peak age window | Decline per year after peak | Notes |

## Load and readiness
| Parameter | Value or range | Unit | Tune by |
| load_match | minutes x intensity | AU | |
| tau_fitness | <range> | days | |
| tau_fatigue | <range> | days | |
| sharpness_gain / decay | | per match / per week | |

## Injury
| Factor | Multiplier | Note |
| base rate | | per match |
| load spike | | |
| recent injury | | |
| age band | | |
Recovery bands: knock <days>, strain <days>, ligament <days>

## Data sources
| Name | URL | Terms | Format | Used for |

## Feedback to player
## Risks for game-legal-advisor
## Test scenarios
## UNVERIFIED
```

## Done when

- [ ] Every attribute has a scale and an ageing curve.
- [ ] Fitness, fatigue and sharpness are separate parameters with ranges.
- [ ] Injury has base rate, multipliers and recovery bands.
- [ ] Each data source lists URL and terms, or is marked UNVERIFIED.
- [ ] Body metrics are opt-in or absent; no health claims in copy.
- [ ] Three test scenarios are written.
