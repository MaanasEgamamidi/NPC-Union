---
name: climate-data-to-mechanic
description: Turn a climate, weather or natural-hazard dataset into a game state variable with units, baseline, update rule and gameplay effects.
owner: climate-earth-expert
disable-model-invocation: true
argument-hint: "<feature or hazard> [region] [time step] [commercial yes/no]"
---

# Climate data to mechanic

Converts one real climate or Earth-science quantity into a small, honest game system.

## Inputs

- The feature (for example sea level, heatwaves, drought, earthquakes, storms).
- Region (real place or fictional) and period (historic, live, projected).
- Game time step (one tick = hour, day, year).
- Commercial or not (decides which free APIs are allowed).
If the time step is missing, assume one year per turn for climate and one hour for weather, and write the assumption at the top.

## Steps

1. Classify the quantity: weather (hours to days), climate (10-30 year means), or geophysical (quakes, volcanoes). Never couple geophysical hazards to the climate variable.
2. Choose the source by question type:
   - live forecast: NWS API (US only, User-Agent header) or Open-Meteo (free tier non-commercial only);
   - history on a grid: ERA5 via Copernicus CDS (account, accept dataset terms, CC-BY-4.0);
   - station history: NOAA NCEI CDO v2 (token, 5 req/s, 10,000/day);
   - global temperature trend: NASA GISTEMP (1951-1980 baseline);
   - projections and headline ranges: IPCC AR6 SYR SPM;
   - earthquakes: USGS FDSN event service or GeoJSON feeds (US public domain, credit USGS).
3. Open the source's own page and confirm licence, key, rate limit and update cadence. Mark anything you cannot open UNVERIFIED.
4. Define the state variable: name, unit, baseline period, starting value, plausible range. Write the baseline next to every temperature.
5. Write the update rule. Use cumulative or delayed responses where the real system has them (temperature follows cumulative emissions; sea level lags warming; soil moisture lags rain).
6. Map the variable to effects as smooth curves (frequency and intensity scale with the variable), not one threshold switch. For quakes, use logarithmic energy and drive damage from distance and ground type.
7. Give the player levers: at least one fast and costly, one slow and cheap, one systemic with a delayed payoff.
8. List safe simplifications and trust breakers (see `knowledge/domains/climate-earth.md`).
9. Note sensitive content (real disasters, victims, misinformation) and hand-offs.
10. Write the caching rule for code: how often to fetch, what to store, what to do offline.

## Output

```
## Mechanic: <name>
Assumptions: <time step, region, commercial>
Source: <dataset> | <URL> | <licence> | <access/key> | <cadence> | <limit>
Variable: <name> (<unit>), baseline <period>, start <value>, range <min-max>
Update rule: <formula or plain rule, per tick>
Effects: <variable -> effect curve, numbers>
Levers: fast <...> | slow <...> | systemic <...>
Safe simplifications: <list>
Trust breakers to avoid: <list>
Sensitive content / hand-offs: <list>
Caching: <fetch interval, storage, offline fallback>
UNVERIFIED: <items>
```

## Done when

- [ ] Weather, climate and geophysical quantities are kept separate.
- [ ] Every temperature has a baseline period.
- [ ] Source licence, key and limit were read from the source page this session, or marked UNVERIFIED.
- [ ] Commercial use checked against each source's terms.
- [ ] The update rule includes the real delay or accumulation where one exists.
- [ ] The player has at least one lever with a delayed payoff.
- [ ] Sensitive content and hand-offs are listed.
