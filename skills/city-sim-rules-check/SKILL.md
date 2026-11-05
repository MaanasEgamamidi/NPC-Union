---
name: city-sim-rules-check
description: Audit a city-builder's zoning demand, traffic, service coverage and budget rules against real planning behaviour, and flag where to stay abstract on purpose.
owner: urban-planning-expert
disable-model-invocation: true
argument-hint: "<rules doc, design notes, or a description of the city sim's systems>"
---

# City sim rules check

A repeatable audit that compares each city-sim rule with how real cities behave and gives a verdict and a cheap fix.

## Inputs

- The rules as written (design doc, code notes, or a plain description) for zoning/demand, traffic, transit, services, and budget.
- Real or fictional city? If real, which one and what data the team plans to use.
- Simulation style: persistent agents or aggregate flows. Scale: target population and platform.
- If anything is missing, assume a fictional city, aggregate simulation, PC, and state it in the report.

## Steps

1. Trace one citizen's day through the rules: where they live, how they pick a job, how they travel, which services reach them, what tax they pay. Note each step where the rules have no answer.
2. Zoning and demand: check that demand responds to jobs, access (commute time) and land value, not only zone ratios. Check whether permissions (use, height, parking) exist or zones just spawn buildings.
3. Traffic: check for (a) a travel-time function that rises past critical density (fundamental diagram), (b) route choice by current travel time, not fixed shortest path, (c) trip generation that responds to travel time (induced demand, Duranton and Turner 2011).
4. Transit: check that wait time depends on headway (about half the headway) and that walk access, not a flat radius, drives use. If GTFS import is planned, list the files needed (agency, stops, routes, trips, stop_times, plus calendar or calendar_dates).
5. Services coverage: check whether coverage is a radius, a network distance, or capacity-limited. Flag radius-only coverage as "abstract on purpose" if readable, "wrong" if it lets one building serve unlimited people.
6. Budget: check that capital cost and ongoing maintenance are separate, and that maintenance grows with network length. Note the Strong Towns argument and the traditional tax-base argument; recommend the budget show both effects.
7. Agents: if persistent agents are used, check home-work pairs persist; if not, check aggregate flows are not shown as individual commuters (the SimCity 2013 problem).
8. For each rule, give a verdict: plausible / abstract on purpose / teaches the wrong thing, and the cheapest fix.
9. Real places: check OSM attribution and ODbL share-alike, Overpass and Nominatim usage limits, Census API key and notice, GTFS feed licence. Flag real addresses, real neighbourhood histories (redlining, displacement), and real landmarks for `game-legal-advisor` and `history-expert`.
10. Hand the table to `systems-designer` and model notes to `game-ai-engineer`; send readability questions to `city-builder-expert`.

## Output

```
## City rules audit: <game>
Assumptions: <real/fictional> | <agent/aggregate> | <scale, platform>
### Citizen day trace (gaps found)
| System | Rule as written | Real behaviour (source) | Verdict | Cheapest fix |
### Keep abstract on purpose (and why it is fine)
### Data and licences (if real place)
### Sensitive items
### Hand-offs
```

## Done when

- [ ] Every system present in the game has at least one row in the table.
- [ ] Each "wrong" verdict has a fix that names the mechanism (cost function, feedback, persistence).
- [ ] At least one rule is explicitly kept abstract with a reason.
- [ ] Real-place work lists attribution text and licences, or says "fictional city".
- [ ] Sensitive items and hand-offs named with exact agent names.
