---
title: NASA open APIs (api.nasa.gov, Image and Video Library, EONET)
tags: [nasa, api, apod, neows, donki, eonet, epic, images, rate-limits]
sources:
  - https://api.nasa.gov/
  - https://api.nasa.gov/assets/html/authentication.html
  - https://api.nasa.gov/assets/json/apis.json
  - https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-11-05&end_date=2026-11-07&api_key=DEMO_KEY
  - https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY
  - https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY
  - https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
  - https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY
  - https://images-api.nasa.gov/search?q=apollo%2011&media_type=image&page_size=5
  - https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
  - https://eonet.gsfc.nasa.gov/docs/v3
  - https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=5&days=30
last_verified: 2026-11-05
---

# NASA open APIs

All requests below were run on 2026-11-05 unless marked UNVERIFIED.

## api.nasa.gov: keys and limits

- Sign-up: the form on https://api.nasa.gov/ issues an api.data.gov key by email. Anyone can register; the key works across federal APIs on api.data.gov.
- Stated limits (https://api.nasa.gov/assets/html/authentication.html): registered key 1,000 requests per hour, applied across all api.nasa.gov APIs, rolling window; exceeding it blocks the key until the hour passes. DEMO_KEY: 30 per hour and 50 per day per IP address.
- Observed: DEMO_KEY responses carried `X-RateLimit-Limit: 10` and `X-RateLimit-Remaining` dropped to 2 within five calls (shared IP). Trust headers over the docs.
- Headers: `X-RateLimit-Limit` and `X-RateLimit-Remaining` on every response; `Access-Control-Expose-Headers` makes them readable from browser JS. `Access-Control-Allow-Origin: *`.
- No key: HTTP 403 `{"error":{"code":"API_KEY_MISSING",...}}`.
- The catalog (https://api.nasa.gov/assets/json/apis.json) listed 16 entries: APOD, Asteroids NeoWs, DONKI, EONET, EPIC, Exoplanet, GIBS, InSight, NASA Image and Video Library, Open Science Data Repository, Satellite Situation Center, SSD/CNEOS, Techport, TechTransfer, TLE API, Vesta/Moon/Mars Trek WMTS.
- **Not listed any more:** Mars Rover Photos and Earth imagery/assets. Treat as retired; live status not tested (UNVERIFIED).

## Status table

| API | Example request | Status 2026-11-05 | Response shape |
|---|---|---|---|
| APOD (legacy) | `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY` | HTTP 500 | `{"code":500,"msg":"Internal Service Error"}`. Catalog: offline 2026-12-01. **Deprecated.** |
| APOD (WordPress) | `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY` | 200, 289 KB | JSON list of 25 objects: `date, post_id (string), title, permalink, media_type, explanation (HTML), credit (HTML), copyright, alt, url, hdurl, basic_html, basic_html_url`. `Cache-Control: max-age=60`, no rate-limit headers. Catalog: params `date`, `start_date`, `end_date`, `count` (max 25); `concept_tags`, `hd`, `thumbs` disabled. |
| NeoWs feed | `https://api.nasa.gov/neo/rest/v1/feed?start_date=2026-11-05&end_date=2026-11-07&api_key=DEMO_KEY` | 200, 26 KB | `{element_count, links, near_earth_objects:{"YYYY-MM-DD":[...]}}`; 22 objects, 4 hazardous. Max range 7 days. |
| NeoWs lookup | `https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY` | 200, 121 KB | Adds `designation`, `orbital_data`; `close_approach_data` had 282 entries (1900 to 2200, Earth, Venus, "Merc"). |
| NeoWs browse | `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY` | 200, 323 KB | `page: {size:20, total_elements:62825, total_pages:3142}`. |
| DONKI | `https://api.nasa.gov/DONKI/CME?startDate=2017-01-03&endDate=2017-01-03&api_key=DEMO_KEY` (catalog example) | listed; not called (UNVERIFIED) | Catalog: CME, CMEAnalysis, GST, IPS, FLR, SEP, MPC, RBE, HSS, WSAEnlilSimulations, notifications; default window 30 days before current UTC date. |
| EPIC | `https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY` | endpoint returned 404 on 2026-11-05; availability UNVERIFIED | Catalog: per image `image, date, caption, centroid_coordinates, dscovr_j2000_position, lunar_j2000_position, sun_j2000_position, attitude_quaternions`. Archive PNG path `EPIC/archive/natural/YYYY/MM/DD/png/<image>.png`. |
| InSight weather | `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0` | returned historical JSON on 2026-11-05 | Catalog page "Last Updated: 3/30/2021", warns of significant missing data. Treat as historical only. |
| TechTransfer | `https://api.nasa.gov/techtransfer/patent/?engine&api_key=DEMO_KEY` | listed; not called (UNVERIFIED) | patent, patent_issued, software, spinoff searches. |
| SSD/CNEOS | see `knowledge/space/jpl-ssd-apis.md` | listed | CAD, Fireball, Mission Design, NHATS, Scout, Sentry on ssd-api.jpl.nasa.gov. |
| Exoplanet | see `knowledge/space/exoplanet-archive.md` | listed | |
| GIBS | see `knowledge/space/earthdata.md` | tested 200 | |
| TLE API | `http://tle.ivanstanojevic.me/api/tle` | listed; not called (UNVERIFIED) | Third-party service fed from CelesTrak, per catalog. |
| Trek WMTS | `https://api.nasa.gov/mars-wmts/catalog/` | Mars catalog opened on 2026-11-05 | Mars WMTS layer catalog; Moon and Vesta endpoints were not tested (UNVERIFIED). |

## NeoWs fields and pitfalls

- `estimated_diameter.{meters,kilometers,feet,miles}.estimated_diameter_min/max`: numbers. A range, derived from absolute magnitude.
- `close_approach_data[].miss_distance.{astronomical,kilometers,lunar,miles}` and `relative_velocity.{kilometers_per_second,...}`: **strings**.
- `epoch_date_close_approach`: Unix milliseconds; `close_approach_date_full`: "2026-Nov-07 00:21".
- `orbital_data` elements are strings, some with a bare leading dot (".6758634748619897"); `epoch_osculation` "2461000.5" is a Julian Date; `equinox: "J2000"`.
- `links.self`/`next`/`previous` repeat your `api_key` and use `http://`. Strip before forwarding to clients.
- The ATE `orbit_class_range` text reads "q (perihelion) > 0.983 AU"; Atens are defined by aphelion. Do not trust descriptive strings blindly.

## NASA Image and Video Library

- Root `https://images-api.nasa.gov`, no key. Docs PDF v1.22.0 (2023-01-06).
- Endpoints: `/search`, `/asset/{nasa_id}`, `/metadata/{nasa_id}`, `/captions/{nasa_id}`, `/album/{album_name}`.
- Search params: `q, center, description, description_508, keywords, location, media_type (image,video,audio), nasa_id, page, page_size (default 100), photographer, secondary_creator, title, year_start, year_end`.
- Observed: `Access-Control-Allow-Origin: *`, `Cache-Control: public, max-age=300, s-maxage=600`. `q=apollo 11, media_type=image` had 1,522 hits. Results beyond 10,000 return HTTP 400 "Maximum number of search results have been displayed. Please refine your search." (page 100 x 100 worked, page 101 failed; page_size 1000 worked).
- Shape: Collection+JSON. `collection.items[].data[0]` holds `nasa_id, title, description, center, date_created, keywords, media_type, album`; `links[]` give `~thumb, ~small, ~medium, ~large, ~orig` renditions with width, height, size.
- `/asset/{id}` lists file URLs (http://); `/metadata/{id}` returns `{"location": ".../metadata.json"}`; `/captions/{id}` returns the `.srt` location (tested on "Artemis Origins").
- `/album/apollo` returned "No assets found" although it is the documented example: album contents change.
- Rights: check `photographer`, `secondary_creator`, and the description for non-NASA credits; see `knowledge/space/nasa-media-and-usage.md`.

## EONET v3

- Docs: https://eonet.gsfc.nasa.gov/docs/v3. v3 is current; v2.1 is "deprecated and tagged for removal" but still answered 200.
- Events: `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=5&days=30`, no key. Params: `source, category, status (open|closed|all, default open), limit, days, start, end, magID, magMin, magMax, bbox`.
- GeoJSON variant: `/api/v3/events/geojson`.
- Categories (live): drought, dustHaze, earthquakes, floods, landslides, manmade, seaLakeIce, severeStorms, snow, tempExtremes, volcanoes, waterColor, wildfires.
- Shape: `{title, description, link, events:[{id, title, description, link, closed, categories, sources, geometry:[{magnitudeValue, magnitudeUnit, date, type, coordinates:[lon,lat]}]}]}`. A storm track is many Point geometries (6-hourly, magnitude in kts).
- Pitfalls: bbox order is `minLon,maxLat,maxLon,minLat`; JSON served as `Content-Type: application/rss+xml`; header `X-RateLimit-Limit: 60` (window not documented); default returns open events only, so a category can come back empty.
