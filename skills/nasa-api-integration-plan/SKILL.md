---
name: nasa-api-integration-plan
description: "Turns a chosen NASA API into an integration plan: server-side key, cache and rate budget, offline snapshot, attribution, failure modes and a test query."
owner: nasa-data-specialist
disable-model-invocation: true
argument-hint: "<API or endpoint, game platform, expected players>"
---

# NASA API integration plan

A repeatable plan for wiring one chosen data source into a game so it survives rate limits, outages and schema changes.

## Inputs

- The chosen endpoint (ideally from `nasa-dataset-finder` output).
- Platform, whether a server exists, expected peak concurrent players.
- Required freshness.
- Commercial or not.
If players or freshness are missing, assume 1,000 daily players and daily freshness and state it.

## Steps

1. Re-run the test query and read headers: rate-limit headers, CORS, `Cache-Control`. Record the date.
2. Decide the call site. If the endpoint needs a key (api.nasa.gov, FIRMS MAP_KEY, Earthdata token), only the server calls it; the key lives in an environment variable, never in client code, build artefacts or logs. If it needs no key and allows any origin (Image and Video Library, EONET, GIBS tiles), the client may call it, but still prefer a server cache for multiplayer so all players see the same data.
3. Strip anything echoing credentials before forwarding (NeoWs `links` contain `api_key`).
4. Set the cache TTL from the data's real cadence, not from player traffic: e.g. NeoWs feed hourly, GIBS imagery per UTC day, EONET 15 to 60 minutes, APOD daily.
5. Compute the request budget: calls per hour = number of distinct queries / TTL in hours. Check it is under half the stated limit (api.nasa.gov registered key: 1,000/hour across all its APIs; FIRMS: 5,000 transactions per 10 minutes). One fetch job serves every player.
6. Normalise once on the server: parse numeric strings, convert to SI, convert times to UTC ISO 8601 and note the source system (TDB, Julian Date, day-of-year), fix coordinate order to `[lon, lat]`, and replace fill values with null.
7. Validate the schema on each fetch (required fields present, counts plausible). On failure keep serving the last good copy.
8. Build the offline snapshot: one real response, normalised, committed with the build, with its fetch date shown in the UI when used.
9. Write attribution: the data source credit, any third-party image credit, the GIBS acknowledgement if tiles are used. No NASA insignia or worm logo without written approval. For AI NPCs, no "according to NASA" phrasing in generated text.
10. Map failure modes to game behaviour (table below) and write one test that hits the real endpoint and one that runs entirely on the snapshot.

## Output

```
# Integration plan: <endpoint>
Verified: <date UTC>, status <code>, headers <limit/remaining/CORS>
Call site: <server job | client> because <reason>
Key: <env var name>, rotated <when>; never sent to clients
Cache: TTL <value> because <data cadence>; store <memory | KV | CDN>
Budget: <calls/hour> of <stated limit> (<percent>)
Normalised schema: <field: type, unit, time system>
Offline snapshot: <file>, fetched <date>, shown with banner "<text>"
Attribution: "<credit line>"
| Failure | Detection | Game behaviour |
| 403 key missing/invalid | status | alert ops, serve cache |
| 429 rate limited | status, Remaining=0 | back off to next window, serve cache |
| 5xx / timeout | status, 10 s timeout | retry once with jitter, serve cache |
| Empty or schema drift | validator | serve last good, log |
Test query: <exact URL>
```

## Done when

- [ ] No key or token can reach a browser, log line or forwarded JSON.
- [ ] TTL is tied to the data's update cadence and the budget is under half the stated limit.
- [ ] A committed offline snapshot exists and the UI says when it is in use.
- [ ] Units, time systems and coordinate order are normalised and documented.
- [ ] Attribution text is written and logos are excluded.
- [ ] Every failure mode has a defined game behaviour and a test.
