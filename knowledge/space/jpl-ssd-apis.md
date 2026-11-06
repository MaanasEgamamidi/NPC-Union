---
title: JPL Solar System Dynamics and CNEOS APIs (Horizons, SBDB, CAD, Sentry, Fireball, Scout, NHATS)
tags: [space, jpl, horizons, asteroids, ephemeris, cneos, spice]
sources:
  - "https://ssd-api.jpl.nasa.gov/"
  - "https://ssd-api.jpl.nasa.gov/doc/horizons.html"
  - "https://ssd-api.jpl.nasa.gov/doc/sbdb.html"
  - "https://ssd-api.jpl.nasa.gov/doc/sbdb_query.html"
  - "https://ssd-api.jpl.nasa.gov/doc/sbdb_filter.html"
  - "https://ssd-api.jpl.nasa.gov/doc/cad.html"
  - "https://ssd-api.jpl.nasa.gov/doc/sentry.html"
  - "https://ssd-api.jpl.nasa.gov/doc/fireball.html"
  - "https://ssd-api.jpl.nasa.gov/doc/scout.html"
  - "https://ssd-api.jpl.nasa.gov/doc/nhats.html"
  - "https://ssd.jpl.nasa.gov/horizons/manual.html"
  - "https://ssd.jpl.nasa.gov/planets/eph_export.html"
  - "https://ssd.jpl.nasa.gov/ftp/eph/planets/bsp/"
  - "https://ssd.jpl.nasa.gov/planets/approx_pos.html"
  - "https://naif.jpl.nasa.gov/naif/toolkit.html"
  - "https://cneos.jpl.nasa.gov/"
last_verified: 2026-11-05
---

# JPL SSD / CNEOS APIs

No API key. JSON over GET (POST also allowed). Index: https://ssd-api.jpl.nasa.gov/ (lists Fireball, Horizons, Horizons File, Horizons Lookup, JD Date/Time Converter, NHATS, Periodic Orbits, SB Close Approach, SB Identification, SB Mission Design, SB Observability, SB Radar, SB Satellites, SBDB, SBDB Query, Scout, Sentry).

## Fair Use Policy (index page, read 2026-11-05)

- **One API request at a time** (no simultaneous requests); cache and reuse results.
- Back off on errors and rate limits; do not hammer retries.
- Automated clients must send an application-specific **User-Agent** with product name, version and contact.
- **You may not embed these APIs in your website (NASA CORS policy).** A browser game must call them from your own backend or ship pre-fetched data.
- Formats can change without notice: check the `signature.version` field in every response.

## Horizons API

`GET https://ssd.jpl.nasa.gov/api/horizons.api` (doc version 1.3, 2025 June). `format=json` (default) or `text`. Values are wrapped in single quotes; encode `;` as `%3B` and spaces as `%20`.

- `COMMAND`: `'499'` Mars, `'5'` Jupiter barycenter, `'MB'` lists major bodies, `'1%3B'` asteroid 1 Ceres (without the semicolon `'1'` is Mercury barycenter), `'DES=1999%20AN10%3B'`, `'Apophis%3B'`.
- `EPHEM_TYPE`: `OBSERVER` (default; RA/Dec etc.), `VECTORS` (Cartesian states), `ELEMENTS` (osculating), `APPROACH`, `SPK` (small bodies only, base64 binary).
- `CENTER`: default geocentric. `'500@10'` Sun center, `'500@0'` solar system barycenter, `'500@399'` Earth center, or an observatory code.
- `START_TIME`, `STOP_TIME`, `STEP_SIZE` (`'1%20d'`, `'10m'`, `'1 mo'`; a bare integer splits the span into N steps), or `TLIST` (up to 10,000 times).
- `REF_PLANE`: `ECLIPTIC` (default), `FRAME`, `BODY EQUATOR`. The frame parameter is **`REF_SYSTEM`** (`ICRF` default, `B1950`); there is no `REF_FRAME`.
- `OUT_UNITS`: `KM-S` (default), `AU-D`, `KM-D`. `VEC_TABLE` 1-6 (2 = position+velocity). `CSV_FORMAT='YES'`. `VEC_DELTA_T='YES'` prints TDB-UT.
- `TIME_TYPE`: observer tables UT or TT; vectors TDB or UT; elements TDB only. Vectors default to TDB.

Real call (2026-11-05), heliocentric Mars in au and au/day:
```
https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='499'&OBJ_DATA='NO'&EPHEM_TYPE='VECTORS'&CENTER='500@10'&START_TIME='2026-11-05'&STOP_TIME='2026-11-06'&STEP_SIZE='1%20d'&REF_PLANE='ECLIPTIC'&OUT_UNITS='AU-D'&VEC_TABLE='2'&CSV_FORMAT='YES'
```
Response `signature` was `{"source":"NASA/JPL Horizons API","version":"1.2"}`; `result` is the classic text with data between `$$SOE` and `$$EOE`:
```
2461349.500000000, A.D. 2026-Nov-05 00:00:00.0000, -3.410458095518644E-01,  1.561262717239684E+00,  4.108076305883566E-02, -1.314141918084918E-02, -1.797857139667471E-03,  2.845477964151434E-04,
```
Header said "Reference frame : Ecliptic of J2000.0" and the Sun's source was DE441. TDB-UTC on 2026-11-05 was 69.18 s (`VEC_DELTA_T`).

## SBDB API (single object)

`GET https://ssd-api.jpl.nasa.gov/sbdb.api` (doc v1.3). Exactly one of `sstr`, `spk`, `des`. Options: `phys-par=1`, `ca-data=1`, `vi-data=1`, `full-prec=1`, `discovery=1`, `cov=mat|vec|src`.
Example: `https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros&phys-par=1` returned orbit class Amor, a=1.46 au, e=0.223, diameter 16.84 km, rot_per 5.27 h, spec_B S, albedo 0.25. HTTP 300 means several matches (a `list` of `pdes`); "not found" comes back as HTTP 200 with `"message":"specified object was not found"`.

## SBDB Query API (many objects)

`GET https://ssd-api.jpl.nasa.gov/sbdb_query.api` (v1.0). `fields=` (case-sensitive names: `full_name,a,e,i,diameter,albedo,spec_B,H,moid,...`), `sb-kind=a|c`, `sb-group=neo|pha`, `sb-class=IEO,ATE,APO,AMO,MBA,TJN,...`, `sb-cdata` JSON constraints (`{"AND":["diameter|DF","spec_B|RE|^[CX]"]}`, URL-encoded, max 2048 chars), `sort=-diameter`, `limit`, `limit-from`, `info=count`.
Counts on 2026-11-05: numbered asteroids 895,910; unnumbered 683,235; NEOs 43,101; PHAs 2,551. No `fields` returns only a count.

## Close-Approach Data API

`GET https://ssd-api.jpl.nasa.gov/cad.api` (v1.5). Defaults: NEOs, Earth, within 0.05 au, next 60 days, sorted by date. Params: `date-min` (`now`), `date-max` (`%2B30` = +30 days), `dist-max` (`5LD` or au), `h-max`, `body` (`ALL`), `sort` (`dist`, `-v-rel`...), `diameter=true`, `fullname=true`, `limit`.
Example: `https://ssd-api.jpl.nasa.gov/cad.api?date-min=now&date-max=%2B30&dist-max=5LD&sort=dist&diameter=true&fullname=true&limit=3` returned 2026 VP1 at 0.00141 au on 2026-Nov-05 14:06 TDB (total 7). Records are arrays ordered by `fields`; times are TDB; numbers are strings. Apophis 2029-Apr-13 21:46 at 0.000254 au.

## Sentry, Fireball, Scout, NHATS

- **Sentry** `sentry.api` (v2.0): modes S (summary, default; 2,236 objects on 2026-11-05), O (`des=`), V (`all=1&ip-min=1e-3`), R (`removed=1`). Filters `ps-min`, `ip-min`, `h-max`. `des=99942` (the doc example) now returns `"error":"specified object removed"` with removal date 2021-02-21.
- **Fireball** `fireball.api` (v1.2): `limit`, `date-min`, `req-loc=true`, `sort=-impact-e`, `vel-comp`. `energy` is radiated energy in 10^10 J, `impact-e` is kilotons. Largest record: 2013-02-15 03:20:26, 441 kt, 54.8N 61.1E (Chelyabinsk). `count` is a string.
- **Scout** `scout.api` (v1.3): live NEOCP candidates (114 on 2026-11-05) with `neoScore`, `phaScore`, `H`, `rating`. Temporary designations (`tdes`) disappear.
- **NHATS** `nhats.api` (v1.3): human-accessible NEAs. `dv` 4-12 km/s, `dur` 60-450 days, `stay` 8/16/24/32, `launch` only from fixed windows `2020-2025` ... `2040-2045` or `2020-2045` (other values return HTTP 400). Example `?dv=6&dur=360&stay=8&launch=2025-2030&h=26&occ=7` gave 37 objects, first 2009 HC with min dv 4.583 km/s.

CNEOS human pages: https://cneos.jpl.nasa.gov/ (with `/ca/`, `/sentry/`, `/fireballs/`, `/scout/`, `/nhats/`).

## Precision path: DE ephemerides and SPICE

- DE440 (ICRF 3.0, 1549 to 2650) and DE441 (-13200 to 17191, no lunar core damping) are Chebyshev files in TDB; planets agree within 1 m (export page). Kernels at https://ssd.jpl.nasa.gov/ftp/eph/planets/bsp/ (`de440s.bsp` 31.2 MB, `de440.bsp` 114.3 MB, `de441.bsp` 3.08 GB). For newer kernels, check JPL's current ephemeris documentation and release notes for coverage and changes before choosing a file.
- NAIF SPICE Toolkit (https://naif.jpl.nasa.gov/naif/toolkit.html): current version N0067, released 2022-01-03; C, Fortran, IDL, MATLAB, JNI alpha; third-party Python wrappers use the C toolkit. Use it to read kernels offline for many times, frames, and spacecraft geometry.
- For games that need "roughly right" planets, JPL's Approximate Positions page gives Keplerian elements and rates for 1800-2050 and 3000 BC-3000 AD.

## Pitfalls

- JSON `signature.version` does not equal the doc's version: Horizons doc says 1.3, responses said 1.2. Pin what you tested.
- Horizons errors come back with HTTP 200 and an `error` field (e.g. "Bad dates -- start must be earlier than stop"); in text mode they appear at the end of the output.
- `ELEMENTS` default units are km and seconds (Ceres QR came back as 3.8e8 km); add `OUT_UNITS='AU-D'`.
- SPK-IDs: SBDB returned `spkid` 20000433 for Eros, 20000001 for Ceres and 20099942 for Apophis, while Horizons labeled Ceres 2000001 and the docs still show 2000433. Store the ID the API returns; don't compute it.
- SBDB values are strings at reduced precision unless `full-prec=1`; `full_name` has leading spaces.
- `info=count` returned JSON with the `info` key twice; strict parsers may complain.
- Default Horizons CENTER is geocentric; planets for a solar-system map need `500@10` or `500@0`.

## Game uses

- Real planet positions for a date: one VECTORS call per body per day, cached server-side, then interpolate; or use approx_pos elements on the client.
- Asteroid mining catalog: SBDB Query with `diameter|DF` and spectral class (C/X/S/M types) for resources, `moid` and NHATS dv for "reachability".
- Live events: CAD next-30-days flybys and recent Fireball records as in-game news, refreshed at most daily.

## How to check this is still current

1. Re-read the Fair Use Policy on https://ssd-api.jpl.nasa.gov/.
2. Compare each doc page's "Version" line with the `signature.version` your code receives.
3. Re-run the example URLs above; check the bsp directory listing for new DE files.
