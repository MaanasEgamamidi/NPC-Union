---
name: wargame-sensitivity-review
description: Checks a war or strategy game's logistics, attrition, and command model for realism, then screens it for sensitivity, export-control, and licensing risks.
owner: defense-strategy-expert
disable-model-invocation: true
argument-hint: "<design doc or ruleset> [era] [real or fictional conflict]"
---

# Wargame sensitivity review

Two passes: a realism model check, then a sensitivity and legal screen.

## Inputs

- Ruleset or design doc, including combat, movement, supply, and intelligence rules.
- Level (tactical, operational, strategic), turn length, unit scale.
- Setting: historical, fictional, or ongoing real conflict. If unknown, ask once, then assume fictional and say so.
- Lists of real units, weapons, vehicles, places, and people named; data sources used for stats.

## Steps

Realism pass:
1. Attrition: name the model (CRT, Lanchester, per-unit hit points, other). If Lanchester, confirm it is used only where forces are comparable and note what it ignores (terrain, quality, morale, C2).
2. Sustainment: is there a supply source, a range or trace limit, a consumption rate, and a way to cut it? If any are missing, propose the smallest rule that adds them.
3. Command and control: is there order delay, command radius, or friction? Units that react instantly at any range get a flag.
4. Fog of war: are reports delayed, partial, or wrong, or only hidden? Recommend at least one error source.
5. Variance: can the player see odds? Recommend exposing the table.
Sensitivity and legal pass:
6. Ongoing conflicts: if any depicted conflict is ongoing (check UCDP or recent news via live search), flag and recommend fictionalisation or advisory review.
7. Civilians and war crimes: are civilian harm and IHL violations depicted? Are they rewarded? Reference the ICRC and Arma 3 Laws of War approach.
8. Glorification and propaganda: does the framing celebrate a real faction or recruit? Check store copy and trailers too.
9. Export-controlled or classified data: list the source for every weapon stat. Reject any from leaked, classified, or controlled documents; use public, approximate, or fictional values.
10. Trademarks and likeness: list real weapon, vehicle, and manufacturer names and real people; send the list to `game-legal-advisor`.
11. Data licences: UCDP (CC BY 4.0), SIPRI (commercial use needs authorisation), ACLED (corporate licence, transformative outputs only), COW (cite per dataset).

## Output

```
## Wargame review: <game>
Realism
| Area | Current rule | Issue | Proposed fix |
| Attrition | | | |
| Sustainment | | | |
| C2 | | | |
| Fog of war | | | |
Sensitivity and legal
| Risk | Finding | Severity (low/med/high) | Action / owner |
Stat sources: <weapon/unit: source, OK/reject>
Data licences: <dataset: licence, OK/conflict>
UNVERIFIED: <list>
```

## Done when

- [ ] All four realism areas have a finding.
- [ ] Every weapon stat has a named public source or is marked fictional.
- [ ] Ongoing-conflict check done with date.
- [ ] Real names list sent to `game-legal-advisor`.
- [ ] Unchecked items are marked UNVERIFIED.
