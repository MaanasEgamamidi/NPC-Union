---
title: NASA Earthdata for games (Earthdata Login, CMR, GIBS, AppEEARS, FIRMS)
tags: [nasa, earthdata, cmr, gibs, wmts, appeears, firms, hdf, netcdf, geotiff]
sources:
  - https://www.earthdata.nasa.gov/data/earthdata-login
  - https://urs.earthdata.nasa.gov/documentation/for_users/user_token
  - https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html
  - https://cmr.earthdata.nasa.gov/search/collections.json?keyword=MODIS%20land%20surface%20temperature&page_size=3
  - https://nasa-gibs.github.io/gibs-api-docs/
  - https://nasa-gibs.github.io/gibs-api-docs/access-basics/
  - https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi?SERVICE=WMTS&REQUEST=GetCapabilities
  - https://appeears.earthdatacloud.nasa.gov/api/
  - https://firms.modaps.eosdis.nasa.gov/api/
  - https://firms.modaps.eosdis.nasa.gov/api/map_key/
  - https://firms.modaps.eosdis.nasa.gov/api/area/
last_verified: 2026-11-05
---

# NASA Earthdata for games

## Earthdata Login (EDL)

- Free registration at https://urs.earthdata.nasa.gov (username, password, email, a short user profile). Needed to **download** data from any DAAC; browsing information pages and searching metadata do not need it (https://www.earthdata.nasa.gov/data/earthdata-login).
- Observed: a protected granule URL on `data.lpdaac.earthdatacloud.nasa.gov` answers 302 to `urs.earthdata.nasa.gov/oauth/authorize`.
- User tokens (https://urs.earthdata.nasa.gov/documentation/for_users/user_token): valid 60 days, at most two valid tokens per user; create with `POST https://urs.earthdata.nasa.gov/api/users/token` using HTTP Basic auth; send as `Authorization: Bearer <token>`. 403 `max_token_limit` when two exist.
- Site banner on 2026-11-05: "Suomi NPP is no longer delivering new data." Prefer NOAA-20/NOAA-21 VIIRS products for current imagery.
- Game rule: EDL credentials and tokens belong on a server or in an offline build step, never in a client.

## CMR (Common Metadata Repository) search

- Docs: https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html. No login for public metadata.
- Collections: `https://cmr.earthdata.nasa.gov/search/collections.json?keyword=MODIS%20land%20surface%20temperature&page_size=3` returned `CMR-Hits: 414`, first results MOD11A1 061, MYD11A1 061, MYD11A2 061 (provider LPCLOUD, `cloud_hosted: true`).
- Granules: `https://cmr.earthdata.nasa.gov/search/granules.json?short_name=MOD11A1&version=061&temporal=2026-10-01T00:00:00Z,2026-10-02T00:00:00Z&bounding_box=-10,35,5,45&page_size=2` returned 8 hits; links include HTTPS data, `s3://`, OPeNDAP, and `s3credentials`.
- Paging: `page_size` default 10, max 2000. `page_num`/`offset`/`scroll` are deprecated; use the `CMR-Search-After` response header and send it back as a request header. Results stop at the 1 millionth item. `CMR-Hits` tells you how many pages you need.
- Send a `Client-Id` header naming your app. CORS is open (`Access-Control-Allow-Origin: *`).
- `bounding_box` order is `west,south,east,north`.
- Granule names: `MOD11A1.A2026274.h18v05.061.2026278224437` = product, acquisition year + day-of-year (2026-10-01), sinusoidal tile h18v05, collection 061, production timestamp. MODIS C6.1 files are HDF4 (`.hdf`).

## GIBS and Worldview (no login)

- Docs: https://nasa-gibs.github.io/gibs-api-docs/. WMTS (REST and KVP), WMS, TWMS, generic XYZ; projections EPSG:4326, 3857, 3413, 3031. Endpoint families `best`, `std`, `nrt`, `all`.
- REST pattern: `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{Layer}/default/{Time}/{TileMatrixSet}/{z}/{y}/{x}.{ext}`.
- Tested: `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/2026-11-01/GoogleMapsCompatible_Level9/3/3/4.jpg` returned a 256x256 JPEG, no login, `Access-Control-Allow-Origin: *`, and headers `layer-identifier-actual: MODIS_Terra_CorrectedReflectance_TrueColor_v6.1_STD`, `layer-time-actual`.
- Tiles were sent with `Cache-Control: no-store`; cache them in your own CDN or service worker if your use allows.
- The EPSG:3857 `best` capabilities listed 1,332 layers. Each layer's `<Dimension>` gives valid date ranges with gaps (Terra had about 11 gaps since 2000).
- Today's date gives a partially filled near-real-time mosaic (the 2026-11-05 tile was 14 KB vs 22 KB for 2026-11-04); a future date returns 404. Use the previous UTC day for a full globe. The special time value `default` gives the default date.
- Requested acknowledgement: "We acknowledge the use of imagery provided by services from NASA's Global Imagery Browse Services (GIBS), part of NASA's Earth Science Data and Information System (ESDIS)."
- Game use: a Leaflet/OpenLayers/MapLibre raster layer with a date slider, or a sphere texture built from zoom 0 to 2 tiles.

## AppEEARS

- API: https://appeears.earthdatacloud.nasa.gov/api/. Product list is public (193 products on 2026-11-05, e.g. MCD12Q1.061, MOD09GA.061); task endpoints need an EDL login via `POST /login`, which returns a Bearer token that expires about 48 hours later (handle 403 by logging in again).
- Point or area tasks; area output `file_type` is `geotiff` or `netcdf4`; point output is CSV. Task dates use `MM-DD-YYYY`.
- Game use: an offline build step to cut a small region and time range into GeoTIFF or CSV, then convert to PNG heightmaps or JSON for the client.

## LANCE / FIRMS active fires

- API index https://firms.modaps.eosdis.nasa.gov/api/ (version 4.2.6). Needs a free MAP_KEY requested by email at https://firms.modaps.eosdis.nasa.gov/api/map_key/. Limit: 5,000 transactions per 10-minute interval; multi-day requests count as several.
- Area endpoint: `/api/area/csv/[MAP_KEY]/[SOURCE]/[west,south,east,north or world]/[DAY_RANGE 1..5]/[DATE optional]`. Sources: LANDSAT_NRT (US/Canada), MODIS_NRT, MODIS_SP, VIIRS_NOAA20_NRT/SP, VIIRS_NOAA21_NRT/SP, VIIRS_SNPP_NRT/SP.
- Observed: an invalid key returns HTTP 400 "Invalid MAP_KEY."
- RT/URT detections are replaced when NRT is processed or after 6 hours; URT can arrive in under 60 seconds for much of the US and Canada (per the area page).
- The country endpoint was marked "Feature currently not available" on the API index.

## Formats a game will meet

| Format | Where seen | Game handling |
|---|---|---|
| HDF4 (.hdf) | MODIS C6.1 granules | Convert offline (GDAL); never parse in browser |
| HDF5 / NetCDF4 | AppEEARS `netcdf4`, many newer products | Convert offline to PNG/JSON |
| GeoTIFF / COG | AppEEARS `geotiff` | Offline to PNG heightmap or texture; COGs allow range reads |
| CSV | FIRMS, AppEEARS point | Parse on server, cache |
| JPEG/PNG tiles | GIBS | Direct in client |

Fill values: science products store fill and scale factors in file attributes; read them before converting, or ocean pixels become extreme values.
