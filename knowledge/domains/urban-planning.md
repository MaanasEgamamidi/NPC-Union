---
title: Urban planning, traffic and city data for games
tags: [urban-planning, city-builder, zoning, traffic, transit, gtfs, openstreetmap, census, induced-demand, land-use]
sources:
  - "https://www.openstreetmap.org/copyright"
  - "https://wiki.openstreetmap.org/wiki/Overpass_API"
  - "https://operations.osmfoundation.org/policies/nominatim/"
  - "https://operations.osmfoundation.org/policies/tiles/"
  - "https://docs.overturemaps.org/attribution/"
  - "https://www.census.gov/data/developers.html"
  - "https://www.census.gov/data/developers/about/terms-of-service.html"
  - "https://api.census.gov/data/2023/acs/acs5?get=NAME,B01003_001E&for=state:06"
  - "https://lehd.ces.census.gov/data/"
  - "https://lehd.ces.census.gov/data/lodes/LODES8/"
  - "https://gtfs.org/documentation/schedule/reference/"
  - "https://mobilitydatabase.org/"
  - "https://www.aeaweb.org/articles?id=10.1257/aer.101.6.2616"
  - "https://en.wikipedia.org/wiki/Fundamental_diagram_of_traffic_flow"
  - "https://en.wikipedia.org/wiki/Route_assignment"
  - "https://en.wikipedia.org/wiki/Headway"
  - "https://archive.strongtowns.org/journal/2011/6/13/the-growth-ponzi-scheme-part-1.html"
  - "https://en.wikipedia.org/wiki/SimCity_(1989_video_game)"
  - "https://en.wikipedia.org/wiki/SimCity_(2013_video_game)"
  - "https://en.wikipedia.org/wiki/Cities:_Skylines"
  - "https://en.wikipedia.org/wiki/Mini_Metro_(video_game)"
last_verified: 2026-11-16
---

# Urban planning, traffic and city data for games

For city-builders, transit and traffic games, civic sims, and levels set in real places. Owner: `urban-planning-expert`. Genre design (pacing, UI, player expectations) is in `knowledge/genres/city-builder.md`.

## Datasets and APIs

| Name | Publisher | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|
| OpenStreetMap data (https://www.openstreetmap.org/copyright) | OSM Foundation and contributors | Planet files, extracts, Overpass | ODbL. Credit OpenStreetMap and make clear the data is ODbL; "If you alter or build upon our data, you may distribute the result only under the same license." Documentation is CC BY-SA 2.0 | OSM data files | Continuous | Share-alike applies to a derived road or building database you ship. OSMF will not provide free tiles or map API for third parties |
| Overpass API (https://wiki.openstreetmap.org/wiki/Overpass_API) | FOSSGIS (overpass-api.de) and others | `https://overpass-api.de/api/interpreter`, no key | ODbL data | JSON, XML | Live | Under 10,000 queries and 1 GB per day is the "won't disturb others" ceiling; for regular use divide by 100 (about 100 queries, 10 MB per day). "Commercial use should use self-hosted or paid Overpass servers." Your users' requests count toward your total. Wait 30 s after 429 or 406 |
| Nominatim geocoding (https://operations.osmfoundation.org/policies/nominatim/) | OSMF | Public API | Attribution required | JSON | Live | Absolute maximum 1 request per second (4 per minute for long-running bulk jobs); identifying User-Agent or Referer; results "must be cached"; bulk geocoding "not encouraged"; client-side autocomplete forbidden |
| OSM standard tiles (https://operations.osmfoundation.org/policies/tiles/) | OSMF | tile.openstreetmap.org | Visible attribution on the map | PNG tiles | Live | No bulk downloading or prefetching; "Offline use is not permitted"; best effort, no SLA; cache at least 7 days if headers are not honoured. Not a backend for a shipped game |
| Overture Maps (https://docs.overturemaps.org/attribution/) | Overture Maps Foundation | Downloads | Base, buildings, divisions, transportation: ODbL ("© OpenStreetMap contributors" plus other credits). Places: per provider, mostly CDLA Permissive 2.0. Addresses: per source | Downloads (format not checked) | Releases | Mixed licences per theme; read the attribution page for the theme you ship |
| Census Data API (https://www.census.gov/data/developers.html) | US Census Bureau | REST; key required in practice | Show: "This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau." | JSON | ACS 1-year listed through 2025 | A keyless request on 2026-11-16 returned "Missing Key: A valid key must be included with each data API request." Numeric rate limits not stated in the terms |
| LEHD LODES (https://lehd.ces.census.gov/data/) | US Census Bureau | Download by state | US government data (terms not read) | Files per state | Version 8 (2020 blocks); tech doc 8.5 dated 2026-10-28 | Origin-Destination (OD), Residence Area (RAC), Workplace Area (WAC) files at census block level for "most states". Commute flows to calibrate home-work pairs |
| GTFS Schedule (https://gtfs.org/documentation/schedule/reference/) | gtfs.org | Spec | Spec; each feed has its own licence | Zipped UTF-8 CSV text files | Per feed | Required: agency, stops, routes, trips, stop_times, calendar and/or calendar_dates. `frequencies.txt` gives headway-based service; `shapes.txt` the drawn path |
| Mobility Database (https://mobilitydatabase.org/) | Mobility Database | Web catalogue, REST API (sign-up) | Feed licences not stated on the home page; check each feed | GTFS, GTFS Realtime, GBFS | Continuous | "6000+" feeds from "100+" countries. Transitland (transit.land) returned 403 to our fetcher |

## Standards and expert sources

- Induced demand: Duranton and Turner, "The Fundamental Law of Road Congestion", AER 101(6), 2011: "VKT increases proportionately to roadway lane kilometers for interstate highways", from more driving by residents, commercial traffic and migration; they found "no evidence that the provision of public transportation affects VKT".
- Fundamental diagram: flow = speed x density. Flow rises on the free-flow branch to a capacity peak, then falls on the congested branch to zero at jam density (Wikipedia).
- Volume-delay: the BPR link function t = t0 x (1 + 0.15 x (v/c)^4), t0 free-flow time, v volume, c capacity. Wardrop user equilibrium: no traveller can cut their travel time by switching route (Wikipedia, Route assignment). A cheap, standard way to spread traffic in a game.
- Transit frequency: "Headways have an enormous impact on ridership levels above a certain critical waiting time"; Wikipedia cites Boyle: cutting headway from 12 to 10 minutes cuts average waits by 1 minute and raises ridership about 2.5%.
- Infrastructure finance: Strong Towns (Charles Marohn, 2011) argues new low-density growth trades near-term revenue for long-term maintenance obligations, a "Ponzi scheme". This is an advocacy position; present it alongside the conventional view that growth expands the tax base, and let the budget show the maintenance tail either way.

## Accuracy vs fun

Acceptable simplifications:
- Aggregate flows instead of persistent agents, if trips still come from land use.
- A small stylised table of trips per building type, labelled as stylised.
- A zoning demand indicator, if it responds to access, jobs and services and not just ratios.
- Compressing years of induced demand into minutes of play.

Trust breakers for planners:
- "Add a lane, fix traffic" with no rebound.
- Road capacity with no breakdown past critical density, so jams never form or never clear.
- Transit judged by stop coverage alone, ignoring frequency.
- Infrastructure with a build cost and no maintenance cost.

## What games get wrong

- SimCity (2013): traffic "took the shortest route rather than the route with the most available capacity", and Sims went to the nearest available job and then the nearest available house, so commuters were not persistent (Wikipedia).
- Cities: Skylines: citizens follow the fastest route, and a rerouted citizen is sent back to their origin rather than re-pathed from where they are (Wikipedia). Pathfinding choices are visible to players and become the meta.
- Real places used as set dressing: real neighbourhoods carry histories (displacement, highway building, redlining) that a level can trivialise.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| SimCity | 1989 | Will Wright | Residential, commercial and industrial zones; built on Jay Forrester's system dynamics and Urban Dynamics (1969) | https://en.wikipedia.org/wiki/SimCity_(1989_video_game) |
| SimCity | 2013 | Maxis Emeryville | GlassBox agent engine and the limits of shortest-path agents | https://en.wikipedia.org/wiki/SimCity_(2013_video_game) |
| Cities: Skylines | 2015 | Colossal Order | Agent traffic with lane rules; modding culture; sequel released October 2023 to mixed reviews | https://en.wikipedia.org/wiki/Cities:_Skylines |
| Mini Metro | 2015 | Dinosaur Polo Club | Abstract transit network design; overcrowding (about six waiting passengers) as the fail state | https://en.wikipedia.org/wiki/Mini_Metro_(video_game) |

## Sensitive topics and legal

- OSM attribution and ODbL share-alike for any shipped derived database; Census "not endorsed" notice; per-feed GTFS licences. Route to `game-legal-advisor`.
- Real addresses and residents: do not place real people's homes or names in a level.
- Displacement, gentrification, segregation and urban renewal: treat as history with consequences, not decoration; involve `history-expert` for past policy.
- Real city branding (transit logos, city seals): trademark questions go to `game-legal-advisor`.

## How to check this is current

- OSM: re-read the copyright page and the Overpass, Nominatim and tile policies.
- Census: request a known table without a key to confirm the key rule; check the developers page for the newest ACS release.
- LODES: open the LODES8 directory and note the newest tech doc version and date.
- Mobility Database: note the feed and country counts on the home page.
- Overture: re-read the attribution page per theme before each data refresh.
- Games: Wikipedia infoboxes and developer sites.
