---
name: nasa-dataset-finder
description: Turns a game idea into ranked NASA or space dataset candidates, each with access method, auth, limits, format and a sample query that was actually run.
owner: nasa-data-specialist
disable-model-invocation: true
argument-hint: "<game idea, platform, how fresh the data must be>"
---

# NASA dataset finder

Produces a ranked shortlist of real data sources for one game idea. Every candidate is tested with a live request before it is ranked.

## Inputs

- The game idea in one or two sentences.
- What the player sees or does with the data.
- Freshness: live (minutes), daily, weekly, or static.
- Platform and whether a server exists. If missing, assume a browser game with a small server and say so.
- Commercial or not (affects media rights).

## Steps

1. Translate the idea into data needs: object type (asteroid, storm, fire, planet, image), fields needed, spatial scope, time window, update cadence.
2. Pull candidates from `knowledge/space/nasa-apis.md`, `knowledge/space/earthdata.md`, `knowledge/space/exoplanet-archive.md`, `knowledge/space/jpl-ssd-apis.md` and `knowledge/space/pds-and-planetary-data.md`. Also fetch https://api.nasa.gov/assets/json/apis.json to see what api.nasa.gov lists today; an API missing from it is presumed retired.
3. Keep 2 to 4 candidates. Drop any that need Earthdata Login for a browser-only game unless a server will fetch and convert the data.
4. Run one sample request per candidate with curl. Use `DEMO_KEY` only for api.nasa.gov, at most one call per candidate (the DEMO_KEY budget is per IP and small; on 2026-11-05 headers showed a limit of 10).
5. Record for each call: HTTP status, response size, `X-RateLimit-Limit` and `X-RateLimit-Remaining`, `Access-Control-Allow-Origin`, `Cache-Control`, and `Content-Type`.
6. Inspect the body: list the fields you would use, their raw types (numbers as strings?), units, time system (UTC, TDB, Julian Date, day-of-year), coordinate order and frame, fill or null values.
7. Note rights: is the data or imagery NASA-produced, or does it carry a third-party `copyright` or credit?
8. Rank by: fit to the mechanic, freshness match, browser-safe access (no key, open CORS), stated limits versus expected traffic, schema cleanliness, rights.
9. Mark any candidate you could not call as UNVERIFIED and never rank it first.

## Output

```
# Dataset shortlist: <game idea>
Assumptions: <platform, server, freshness, commercial>

| Rank | Source | Endpoint tested | Auth | Stated limit | Observed headers | Format | Verdict |
|------|--------|-----------------|------|--------------|------------------|--------|---------|

## Candidate 1: <name>
Sample query run (<date UTC>): <exact URL with DEMO_KEY or no key>
Result: <status, size, count of records>
Fields for the game: <field: raw type -> parsed type, unit, time system>
Pitfalls seen: <strings for numbers, coordinate order, partial data, HTML in text>
Rights: <NASA / third-party credit>

## Not recommended
<source: reason>

## UNVERIFIED
<item: why it could not be checked>
```

## Done when

- [ ] Every ranked candidate has a real request URL, a date, and an observed status code.
- [ ] Rate-limit and CORS headers are recorded, not copied from memory.
- [ ] Units, time system and coordinate order are stated for each field used.
- [ ] Third-party credits or copyrights are flagged.
- [ ] Retired or missing APIs are excluded or marked.
- [ ] Anything not called is labelled UNVERIFIED.
