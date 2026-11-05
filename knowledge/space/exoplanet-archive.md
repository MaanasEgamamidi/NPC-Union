---
title: NASA Exoplanet Archive (TAP access, tables, columns, game uses)
tags: [space, exoplanets, nasa, tap, adql, data]
sources:
  - https://exoplanetarchive.ipac.caltech.edu/
  - https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html
  - https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html
  - https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html
  - https://exoplanetarchive.ipac.caltech.edu/docs/acknowledge.html
  - https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
  - https://nssdc.gsfc.nasa.gov/planetary/factsheet/venusfact.html
last_verified: 2026-11-05
---

# NASA Exoplanet Archive

Operated by Caltech/IPAC for NASA's Exoplanet Exploration Program. No API key. Data is served through an IVOA Table Access Protocol (TAP) service that takes ADQL (SQL-like) queries.

## Current count (read 2026-11-05)

The archive home page showed **6,451 Confirmed Planets**, dated 10/15/2026, plus 1,012 TESS confirmed planets and 8,151 TESS Project Candidates (dated 10/09/2026). A live `select count(*) from pscomppars` and `select count(*) from ps where default_flag=1` both returned 6451 on 2026-11-05. The `ps` table had 40,350 rows (all solutions). News posts describe weekly updates, so re-query instead of hardcoding.

## Endpoints

| Use | URL |
|---|---|
| Synchronous (browser, curl) | `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=<ADQL>&format=csv` |
| Base URL for TAP clients (TOPCAT, PyVO) | `https://exoplanetarchive.ipac.caltech.edu/TAP` |
| Asynchronous (UWS jobs) | `POST https://exoplanetarchive.ipac.caltech.edu/TAP/async` with `query`, `format`, `PHASE=RUN` |
| Schema | `https://exoplanetarchive.ipac.caltech.edu/TAP/tables` or `select * from TAP_SCHEMA.columns where table_name like 'ps'` |

Async, tested: POST returned `303` with a `Location` of `/TAP/async/<jobid>`; `/phase` returned `COMPLETED`; the job XML listed the result at `.../result.csv` and a `destruction` time 4 days after start. Job timestamps were in Pacific time, not UTC.

`format` values (from the TAP guide): `votable` (default), `ipac`, `json`, `tsv`, `csv`. `maxrec=N` and ADQL `top N` both limit rows. The old `cgi-bin/nstedAPI/nph-nstedAPI` API is legacy: its Confirmed Planets / Composite / Extended tables were retired in April 2021, and only Mission Stars tables remain there.

## Main TAP tables (from the TAP guide)

- `ps`: Planetary Systems, one row per planet per reference (solution).
- `pscomppars`: Planetary Systems Composite Parameters, one row per planet.
- `toi`: TESS Project Candidates (TOIs). Key columns `toi`, `tid`, `tfopwg_disp` (PC, CP, KP, FP, APC, FA), `pl_orbper`, `pl_rade`, `pl_eqt`, `st_dist`.
- `stellarhosts`, `ml` (microlensing), `k2pandc`, `keplernames`, `k2names`, `spectra`, `TD` (transiting planets), `cumulative` (KOI), plus Kepler delivery tables and time-series tables.

## Key columns (confirmed in TAP_SCHEMA and the column doc)

`pl_name`, `hostname`, `pl_orbper` (days), `pl_orbsmax` (au), `pl_rade` (Earth radii), `pl_bmasse` (best mass, Earth masses: true mass, M*sin(i)/sin(i), or M*sin(i)), `pl_bmassprov` (which of those it is), `pl_orbeccen`, `pl_insol` (Earth flux), `pl_eqt` (K), `st_teff` (K), `st_spectype`, `sy_dist` (pc), `sy_vmag`, `ra`/`dec` (deg), `disc_year`, `discoverymethod`, `disc_facility`, `default_flag`, `soltype`, `pl_controv_flag`, `pl_refname`, `rowupdate`. Uncertainties use the suffixes `err1` (+), `err2` (-), `lim` (limit flag); composite values carry `_reflink`.

## ps vs pscomppars

- `ps` rows are self-consistent sets from one paper. Filter `default_flag=1` for the archive's chosen solution per planet. Rows often have blanks because that paper didn't publish every value.
- `pscomppars` fills gaps: values start from the default solution, then come from other solutions (most precise, else most recent), and missing radius/mass/density/luminosity can be **calculated**, including from a mass-radius relation. The archive says the result is "more complete, though not necessarily self-consistent".

Real example of the mixing (run 2026-11-05): `ps` has 5 rows for TRAPPIST-1 e. The default (Agol et al. 2021) has radius 0.920 and mass 0.692 but no `pl_eqt`. `pscomppars` reports radius 0.920 and mass 0.692 from Agol, and `pl_eqt` 249.70 from Ducrot et al. 2020.

## ADQL example (run 2026-11-05)

```
https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_orbper,pl_rade,pl_bmasse,pl_eqt,sy_dist,disc_year,discoverymethod+from+pscomppars+where+hostname+like+'TRAPPIST-1'+order+by+pl_orbper&format=csv
```
Output (first rows):
```
pl_name,hostname,pl_orbper,pl_rade,pl_bmasse,pl_eqt,sy_dist,disc_year,discoverymethod
"TRAPPIST-1 b","TRAPPIST-1",1.51082600000,1.11600000,1.37400000,397.60,12.42988881,2016,"Transit"
"TRAPPIST-1 e","TRAPPIST-1",6.10101300000,0.92000000,0.69200000,249.70,12.42988881,2017,"Transit"
"TRAPPIST-1 h","TRAPPIST-1",18.77286600000,0.75500000,0.32600000,171.70,12.42988881,2017,"Transit"
```
Discovery methods in `pscomppars` that day (group by): Transit 4785, Radial Velocity 1204, Microlensing 292, Imaging 98, Transit Timing Variations 29, others under 20.

## Citation and acknowledgement

Requested text: "This research has made use of the NASA Exoplanet Archive, which is operated by the California Institute of Technology, under contract with the National Aeronautics and Space Administration under the Exoplanet Exploration Program." Cite Christiansen et al. (2025) for the archive, and cite the specific literature reference when you use its values. Put this in game credits.

## Pitfalls

- Using `ps` without `default_flag=1` counts each planet several times (40,350 rows vs 6,451 planets).
- `pscomppars` mixes papers and may contain calculated masses/radii. Check `pl_bmassprov` and `_reflink`; Proxima Cen b's "mass" 1.055 is `Msini`, a minimum mass.
- `pl_refname` and `_reflink` fields contain raw HTML `<a>` tags; strip them before showing.
- `toi.toi` is a `char` column, so `order by toi` sorts as text ("1017.01" came first). Cast or sort on `tid`.
- Null values come back as empty CSV fields, not 0. Treat them as unknown.
- Bad column names return HTTP 400 with a VOTable `QUERY_STATUS` ERROR (Oracle message, e.g. `ORA-00904`), even if you asked for CSV.
- String values are case-sensitive (`'Radial Velocity'`); column names are not. URL-encode `%` as `%25` and `+` as `%2B`.
- **`pl_eqt` is not surface temperature.** It is a blackbody heated only by the host star (column doc), with an albedo assumed by each paper. Earth's blackbody temperature is 254.0 K but its mean surface is 288 K; Venus is 226.6 K blackbody and 737 K at the surface (NSSDC fact sheets).

## Game uses

- Procedural star maps seeded from real systems: pull `hostname, ra, dec, sy_dist, st_teff, st_spectype` and the planets per host; convert ra/dec/distance to 3D; fill missing values procedurally and label them as invented.
- Habitability mini-games: use `pl_insol`, `pl_eqt`, `pl_rade` as inputs, then let atmosphere (greenhouse) be a player variable, using the Earth/Venus gap above as the teaching hook.
- Discovery-method collectibles (transit, RV, microlensing, imaging) with real counts.
- Ship a snapshot CSV with the date; don't query live per player.

## How to check this is still current

1. Load the home page and read the Confirmed Planets panel and its date.
2. Run `select count(*) from ps where default_flag=1` and compare.
3. Re-open `docs/TAP/usingTAP.html` (it said "Last updated: 24 July 2026") for table renames or new formats.
4. Query `TAP_SCHEMA.columns` for any column you rely on before release.
