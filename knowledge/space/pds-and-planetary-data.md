---
title: NASA Planetary Data System (PDS), Solar System Treks, and DEMs for game terrain
tags: [space, pds, planetary-data, dem, heightmap, terrain, mars, moon]
sources:
  - "https://pds.nasa.gov/"
  - "https://pds.nasa.gov/services/search/"
  - "https://pds.mcp.nasa.gov/api/search/1/products"
  - "https://trek.nasa.gov/"
  - "https://trek.nasa.gov/tiles/apidoc/"
  - "https://docs.unity3d.com/2019.4/Documentation/Manual/terrain-OtherSettings.html"
  - "https://naif.jpl.nasa.gov/"
last_verified: 2026-11-05
---

# NASA Planetary Data System and game-ready planetary data

Open the linked sources and product labels before quoting details or using data.

## PDS nodes (links taken from the pds.nasa.gov home page, 2026-11-05)

| Node | Site | Typical holdings |
|---|---|---|
| Atmospheres | https://pds-atmospheres.nmsu.edu/ | planetary atmosphere data (MAVEN releases appear in PDS news) |
| Geosciences | https://pds-geosciences.wustl.edu/ | home page links its LRO, MRO (CRISM, SHARAD, gravity), GRAIL, InSight, MSL, Mars 2020, Odyssey, Apollo, Artemis II mission pages |
| Cartography and Imaging Sciences | https://pds-imaging.jpl.nasa.gov/ | images; home page links a beta "archive explorer" (e.g. Mars 2020 Mastcam-Z) |
| NAIF | https://naif.jpl.nasa.gov/ | SPICE kernels and toolkit (see `knowledge/space/jpl-ssd-apis.md`) |
| Planetary Plasma Interactions (PPI) | https://pds-ppi.igpp.ucla.edu/ | fields and particles |
| Ring-Moon Systems | https://pds-rings.seti.org/ | rings and satellites |
| Small Bodies | https://pds-smallbodies.astro.umd.edu/ (also pdssbn.astro.umd.edu, sbn.psi.edu) | asteroids, comets, dust (Dawn, OSIRIS-REx, New Horizons KEM links) |

The node descriptions in the right column are starting points; read each node site for its current holdings.

## Searching PDS

- Start at the [PDS search page](https://pds.nasa.gov/services/search/) and follow its current links to the search interface and API.
- Search API, tested 2026-11-05: `GET https://pds.mcp.nasa.gov/api/search/1/products?q=<query>&limit=N` with `Accept: application/json`. A query `lid eq "urn:nasa:pds:lro_lola_rdr"` returned `"hits":1`. The response has `summary` (hits, properties) and per-product fields such as `lid`, `lidvid`, `ops:Data_File_Info.ops:file_ref`, `ops:Harvest_Info.ops:node_name`.
- Pitfall seen: `q=title like "LOLA"` returned 156,204 hits, so a loose `like` filter did not narrow results the way you'd expect. Check the current API documentation for query grammar and test filters against known products.
- Only PDS4 products are indexed by the Search API (per the search page). Older PDS3 data sets are reached through the node sites.

## PDS4 vs PDS3

- Consult the [PDS standards](https://pds.nasa.gov/datastandards/about/) for the applicable PDS3 or PDS4 label format and identifiers.
- Read each product label for its data layout, byte order, sample type, scaling and projection where provided; confirm missing fields in the product documentation.

## Solar System Treks (verified on trek.nasa.gov, page last updated January 22, 2026)

- Browser portals: Moon, Mars, Vesta, Ceres, Titan, Icy Moons, Mercury, Ryugu, Bennu, Europa, Callisto, Venus, Ganymede, Phobos, Io Trek.
- Tools: elevation profiles from a DEM with CSV export, sun-angle calculator, distance tool, VR flyovers, 3D printing (whole-globe print files for Bennu, Ceres, Ryugu, Vesta).
- The [WMTS Layer Services](https://trek.nasa.gov/tiles/apidoc/) page links body-specific services. The [Vesta service](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=vesta) documents OGC RESTful WMTS requests and tile URL templates; check the relevant body and layer before streaming tiles.

## Game-ready products to check

- Search the [PDS nodes](https://pds.nasa.gov/) and [USGS Astrogeology](https://astrogeology.usgs.gov/search) for lunar and Martian elevation models and imagery. Inspect each product page for coverage, resolution, format and download options.

## DEM to game heightmap

1. Pick the product and read its label: units (meters vs km), datum (radius or areoid reference), data type, no-data value, pixel scale (m/pixel), projection.
2. Reproject/crop with GDAL: `gdalwarp -t_srs <projection> -te <bounds> -tr <m> <m> -r bilinear in.tif crop.tif`. Use an equal-area or local projection for a playable patch; equirectangular stretches toward the poles.
3. Resample to the engine's size. [Unity 2019.4 terrain settings](https://docs.unity3d.com/2019.4/Documentation/Manual/terrain-OtherSettings.html) specify heightmap resolutions of 2^n+1, such as 1025 or 2049; check the manual for the target Unity version. Use bilinear or cubic for heights, never nearest.
4. Fill no-data holes (`gdal_fillnodata.py`) before normalizing, or the minimum value wrecks your range.
5. Normalize to 16-bit: `h16 = round((h - hmin) / (hmax - hmin) * 65535)`. Record `hmin`, `hmax` and pixel size. 8-bit PNG gives visible terracing; use 16-bit PNG or little-endian RAW (`gdal_translate -ot UInt16 -scale hmin hmax 0 65535 -of ENVI`).
6. Scale in-engine: horizontal size = pixels x m/pixel; vertical range = hmax - hmin. Any vertical exaggeration (1.5x to 3x is common for readability on flat Moon/Mars plains) should be stated in-game if you claim realism.
7. Drape a matching mosaic or Treks tile as the albedo texture, reprojected to the same grid.

## Licensing

[NASA's media guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/) say NASA images and specified media generally are not subject to US copyright; this does not establish the rights of every dataset. Product-specific rights must be checked. Some PDS holdings come from partner agencies (e.g. ESA, JAXA), and the PDS search page notes results include data from other agencies. Check each product's label, node page and `knowledge/space/nasa-media-and-usage.md` before shipping, and credit the mission and instrument team.

## Pitfalls

- PDS3 `.IMG` byte order and sample type differ by product; reading as the wrong endianness gives noise. Always use the label.
- Heights are relative to a reference radius or areoid, not "sea level"; mixing products with different datums causes cliffs at seams.
- Planetary longitudes can be east- or west-positive (Horizons, for example, reports Mars as IAU_MARS "West-longitude positive" in its header), and 0-360 vs -180-180 conventions vary.
- Global DEMs at 100+ m/pixel look blurry at character scale; add procedural detail and say so.
- The Search API `like` filter behaved unexpectedly (see above).

## Game uses

- Real Mars/Moon terrain for rover or lander levels (a Treks elevation profile CSV is a fast prototype path).
- Landing-site picker using Treks layers as a 2D map.
- Asteroid shape models (Bennu, Ryugu, Vesta print files) as playable small worlds.

## How to check this is still current

1. Reload pds.nasa.gov and confirm node URLs.
2. Re-run the Search API `lid eq` query above.
3. Open trek.nasa.gov, follow "WMTS Layer Services", and record real layer endpoints into this file.
4. Open the product documentation and verify its metadata and rights before use.
