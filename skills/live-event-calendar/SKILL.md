---
name: live-event-calendar
description: Build a week-by-week live game season calendar with event slots, battle pass pacing, rest weeks and burnout checks. Use when planning or auditing a season.
owner: live-ops-designer
disable-model-invocation: true
argument-hint: "[game, season length, team size, pass yes/no]"
---

# Live event calendar

A repeatable procedure for laying out one live season, sizing its pass, and checking it for player and team burnout.

## Inputs

- Game genre, platforms and top regions.
- Season length in weeks and start date.
- Team capacity: content drops the team can ship per month at sustainable pace, and on-call coverage per week.
- Pass details if any: tier count, paid or free, current XP sources.
- Typical weekly play hours for light, median and heavy players (from telemetry).
- Known external dates: platform sales, cert windows, regional holidays.

If any are missing, ask once. If still missing, write the assumption in the output and continue.

## Steps

1. Count weeks and mark fixed external dates (holidays, store sales, cert submission deadlines) on a blank week grid.
2. Divide season length by the team's drop interval to get the number of major drops. Round down.
3. Place the launch beat in week 1 and the finale in the second-to-last week. Spread major drops evenly between them.
4. Mark at least one rest week (no new content, no limited event) after every high-load week.
5. Fill remaining weeks with reusable event formats. Do not put two peak events in adjacent weeks.
6. Check every launch and event start: no Fridays, no day before a holiday, on-call staffed. Move any that fail.
7. Size the pass: total XP = tiers x XP per tier. Compute completion week for light, median and heavy players. Target median completion at 60 to 75 percent of the season. Adjust XP per tier until it fits.
8. List retention levers (dailies, weeklies, streaks, community goals). Flag any that punish a missed day or force a disliked mode, and replace them.
9. Write a cut order for slips and an extension policy for outages during limited events.
10. Rate team load per week (low, medium, high). If more than 40 percent of weeks are high, remove an event.

## Output

```
Season: <name>  Weeks: <n>  Start: <date>  Reset time: <UTC time>
Assumptions: <list>

| Week | Dates | Beat | Event format | Rewards | Team load |
|------|-------|------|--------------|---------|-----------|

Pass: <tiers> tiers, <xp/tier> XP per tier, sources <match %> / <challenge %>
Completion week: light <w>, median <w>, heavy <w>

Retention levers:
- <lever>: burnout risk <low/med/high>, change <if any>

Cut order if a drop slips: <1, 2, 3>
Extension policy: <rule>
Hand-offs: monetization-designer, analytics-engineer, community-manager, release-manager
```

## Done when

- [ ] Every week has a beat and a team load rating.
- [ ] At least one rest week follows each high-load week.
- [ ] No launch or event start falls on a Friday or the day before a holiday.
- [ ] Median pass completion lands between 60 and 75 percent of the season.
- [ ] No retention lever resets progress on a missed day.
- [ ] Cut order and extension policy are written.
- [ ] Assumptions are stated where inputs were missing.
