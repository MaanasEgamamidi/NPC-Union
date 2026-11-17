---
title: Climate, weather and Earth science for games
tags: [climate, weather, sea-level, earthquakes, natural-hazards, reanalysis, era5, ipcc, weather-api, climate-games]
sources:
  - "https://www.ipcc.ch/report/ar6/syr/downloads/report/IPCC_AR6_SYR_SPM.pdf"
  - "https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf"
  - "https://data.giss.nasa.gov/gistemp/"
  - "https://data.giss.nasa.gov/gistemp/faq/"
  - "https://cds.climate.copernicus.eu/api/catalogue/v1/collections/reanalysis-era5-single-levels"
  - "https://www.ncdc.noaa.gov/cdo-web/webservices/v2"
  - "https://www.weather.gov/documentation/services-web-api"
  - "https://open-meteo.com/en/terms"
  - "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity"
  - "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php"
  - "https://earthquake.usgs.gov/fdsnws/event/1/"
  - "https://www.usgs.gov/faqs/there-earthquake-weather"
  - "https://www.usgs.gov/faqs/do-solar-flares-or-magnetic-storms-space-weather-cause-earthquakes"
  - "https://science.nasa.gov/earth/climate-change/can-climate-affect-earthquakes-or-are-the-connections-shaky/"
  - "https://www.climateinteractive.org/en-roads/"
  - "https://en.wikipedia.org/wiki/SimEarth"
  - "https://en.wikipedia.org/wiki/Fate_of_the_World"
  - "https://en.wikipedia.org/wiki/Civilization_VI:_Gathering_Storm"
  - "https://en.wikipedia.org/wiki/Terra_Nil"
last_verified: 2026-11-16
---

# Climate, weather and Earth science for games

For climate and policy sims, weather systems, sea level and flooding, earthquakes and other hazards. Owner: `climate-earth-expert`. NASA satellite data access is in `knowledge/space/earthdata.md`; crop impacts in `agriculture-food.md`; species and habitats in `biology-ecology.md`.

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| ERA5 hourly data on single levels | Copernicus / ECMWF | https://cds.climate.copernicus.eu/api/catalogue/v1/collections/reanalysis-era5-single-levels | Climate Data Store account; Python `cdsapi`; accept the dataset licence | Catalogue JSON lists licence "CC-BY-4.0" | Not stated in the catalogue entry; check the download form | "Updated daily with a latency of about 5 days"; the catalogue extent ran 1940-01-01 to 2026-11-10 today | Regridded to 0.25 degrees for the reanalysis. Early release ERA5T can differ from the final release 2 to 3 months later. History only, not live weather |
| GISTEMP v4 | NASA GISS | https://data.giss.nasa.gov/gistemp/ | Download | Asks you to cite the web page (with access date) and the latest paper | netCDF, Zarr, SBBX | "Updated about the 10th of every month" | Anomalies against GISS's own 1951-1980 base period (FAQ), not 1850-1900 like IPCC. Never mix baselines in one UI |
| NOAA NCEI Climate Data Online API v2 | NOAA NCEI | https://www.ncdc.noaa.gov/cdo-web/webservices/v2 | Free token sent as a `token` header; base `https://www.ncei.noaa.gov/cdo-web/api/v2/{endpoint}` | (Terms not read today) | Not checked today | Not checked today | Five requests per second and 10,000 per day per token. Station data, so gaps and station moves are normal |
| NWS API | US National Weather Service | https://www.weather.gov/documentation/services-web-api | "A User Agent is required to identify your application" (add contact details) | (Terms not read today) | Not checked today | Live | Rate limit "is not public"; on error wait about 5 seconds and retry. Flow: `/points/{lat},{lon}` then the returned `gridpoints/{office}/{x},{y}/forecast`. Grid values can change, so re-check `/points` periodically. US forecasts only |
| Open-Meteo | Open-Meteo | https://open-meteo.com/en/terms | Access method not checked today | Data CC BY 4.0. Free use is for non-commercial purposes only; "Websites or apps that have subscriptions or display advertisements" count as commercial, and commercial users are asked to subscribe | Not checked today | Not checked today | Free tier: under 10,000 calls a day, 5,000 an hour, 600 a minute. A paid or ad-supported game is commercial use |
| USGS real-time earthquake feeds | USGS | https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php | No key; e.g. `/earthquakes/feed/v1.0/summary/4.5_week.geojson` | (US government data; terms not separately read) | GeoJSON | "Updated every minute" | Windows: past hour, day, 7 days, 30 days, by magnitude band. Use these, not repeated queries, for live display |
| USGS FDSN event service | USGS | https://earthquake.usgs.gov/fdsnws/event/1/ | No key; `query` method | (as above) | QuakeML (default), GeoJSON, CSV | Not checked today | "The service limits queries to 20000" events; larger requests get HTTP 400. Split by time |

## Models and numbers for simulation

- **Warming so far.** IPCC AR6 Synthesis Report SPM A.1.1: global surface temperature was 1.09 [0.95 to 1.20] °C higher in 2011-2020 than 1850-1900. Always show the baseline.
- **Warming per emissions.** SYR SPM B.5.2: for every 1000 GtCO2 emitted, global surface temperature rises 0.45 °C (likely range 0.27 to 0.63 °C). Remaining budgets from the start of 2020: 500 GtCO2 for a 50% chance of 1.5 °C, 1150 GtCO2 for a 67% chance of 2 °C. This makes a simple, honest model: temperature anomaly = start value + 0.45 × cumulative GtCO2 / 1000. Under that rule, cutting emissions slows the rise, and only net zero CO2 stops it (SYR B.5: "Limiting human-caused global warming requires net zero CO2 emissions"). SYR B.5.1 says net zero greenhouse gas emissions, if sustained, give a "gradual decline in global surface temperatures after an earlier peak". The rule covers CO2 only: B.5.2 adds that stronger cuts in non-CO2 emissions lower the temperature reached for a given budget, so treat methane and other gases as a separate, smaller lever.
- **Sea level.** WGI SPM A.1.7: global mean sea level rose 0.20 [0.15 to 0.25] m from 1901 to 2018; the rate went from 1.3 mm per year (1901-1971) to 1.9 (1971-2006) to 3.7 (2006-2018). Projections relative to 1995-2014 (SYR B.3.1): 0.28-0.55 m by 2100 under SSP1-1.9 and 0.63-1.01 m under SSP5-8.5. Sea level rise "is unavoidable for centuries to millennia". A century of play is tens of centimetres to about a metre, not many metres; storms on top of that do the flooding.
- **Hazards scale smoothly.** SYR SPM: "Every increment of global warming will intensify multiple and concurrent hazards". Scale hazard rates with the temperature variable, not with a switch at 2 °C.
- **Earthquakes.** USGS: each whole magnitude step is a tenfold increase in recorded amplitude and about 32 times more energy. Magnitude is one number per quake; intensity (Modified Mercalli in the US) is the shaking at each place and falls with distance. Drive damage from intensity at the location, not from magnitude alone.
- **Quakes are not weather or climate.** USGS FAQ "Is there earthquake weather?": "There is no such thing as 'earthquake weather'"; quakes are spread about equally across cold, hot and rainy weather. Very large low-pressure changes from major storms "are known to trigger episodes of fault slip (slow earthquakes)" and may play a role in some damaging quakes, but "the numbers are small and are not statistically significant." USGS space-weather FAQ: "earthquakes are driven by processes in the Earth's interior." NASA (Buis, 2019, updated 2024): climate-like stress changes can affect microseismicity (magnitudes below zero), and JPL's Paul Lundgren says "We're simply not in a position at this point to say that climate processes could trigger a large quake." Model quakes on their own geophysical system.
- **Weather versus history.** Use a forecast API for live weather and ERA5 or station data for history; ERA5 is a 0.25-degree grid and will smooth mountains and coasts that a station sees.

## Standards and expert sources

- IPCC AR6 Synthesis Report and Working Group I Summaries for Policymakers (PDFs, both downloaded and read today). The HTML page https://www.ipcc.ch/report/ar6/syr/ returned 403 to WebFetch and plain curl on 2026-11-16 (it loaded with a browser user agent); the SPM PDF downloaded with plain curl. Use the PDFs.
- NASA GISTEMP FAQ for anomaly baselines and why they differ.
- Copernicus Climate Data Store catalogue JSON for ERA5 licence and latency.
- USGS Earthquake Hazards Program for magnitude, intensity and feeds (the usgs.gov magnitude page loaded through WebFetch but returned 403 to plain curl).
- En-ROADS (Climate Interactive and MIT Sloan) as a reference policy simulator for showing how choices affect temperature; the product page did not say whether it is free.

## Accuracy vs fun

Acceptable simplifications:
- One global temperature number driven by cumulative emissions (the 0.45 °C per 1000 GtCO2 rule) instead of a climate model.
- Compressed time (Fate of the World uses five-year turns) if delays still show.
- Weather as noise around a slowly moving mean.
- Fictional coasts tuned with real storm statistics.

Trust breakers for climate scientists:
- Temperature falling the turn after emissions are cut.
- Metres of sea level rise in a decade presented as realistic.
- A single cold snap shown as evidence against warming.
- Anomalies with no baseline, or two baselines mixed.
- Earthquake damage scaled linearly with magnitude, or quakes driven by weather or climate (see USGS and NASA above).

Fun levers that are also accurate: delayed payoffs, adaptation (seawalls, wetlands, raised buildings), carbon budgets as a shared resource, regional politics, early warning systems.

## What games get wrong

- Instant feedback on emissions; IPCC says temperatures keep rising until net zero and decline only slowly after a peak.
- Mixing geophysical and climate hazards: Civilization VI: Gathering Storm puts volcanic eruptions in the same natural-disaster system as floods, storms and droughts, while CO2 from coal and oil raises disaster frequency. Fine for a strategy board; do not copy it as a climate explainer.
- Doom with no levers. Terra Nil (restore, then remove your own buildings) and Fate of the World (policy cards with funds locked up while they take effect) give players agency.
- Linear magnitude scaling, which makes a magnitude 7 feel like a strong 6 when USGS says it releases about 32 times the energy.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| SimEarth | 1990 | Maxis (Will Wright, Fred Haslam) | Models James Lovelock's Gaia hypothesis, with Lovelock advising; atmosphere gases, continental drift, evolving life, a Daisyworld option | https://en.wikipedia.org/wiki/SimEarth |
| Fate of the World | 2011 | Red Redemption | Five-year turns, policy cards across twelve regions, public opinion; climate models by Myles Allen (Oxford Climate Dynamics group) | https://en.wikipedia.org/wiki/Fate_of_the_World |
| Civilization VI: Gathering Storm | 2019 | Firaxis Games | Disasters, CO2 from fossil power raising disaster frequency, sea level rise taking coastal tiles unless flood barriers are built | https://en.wikipedia.org/wiki/Civilization_VI:_Gathering_Storm |
| Terra Nil | 2023 | Free Lives (Devolver Digital publishing) | "Reverse city-builder": restore ecosystems, then dismantle your structures and leave | https://en.wikipedia.org/wiki/Terra_Nil |

## Sensitive topics and legal

- Real disasters and victims: do not build mechanics around a named recent disaster without care; route to `narrative-director` and `game-legal-advisor`.
- Misinformation: keep baselines, sources and uncertainty ranges visible in any game that claims realism; say what the model leaves out.
- Climate anxiety: give players agency and partial wins; avoid pure collapse.
- Data licences: ERA5 and Open-Meteo data are CC BY 4.0 (credit required); Open-Meteo's free tier is non-commercial only; cite GISTEMP as NASA asks. NWS needs an identifying User-Agent.
- Live data in a shipped game: cache on a server you control; never call public APIs per frame or per player without checking limits.

## How to check this is current

- IPCC: check whether an AR7 report has replaced AR6 headline numbers.
- ERA5: read the catalogue JSON for licence, extent and latency.
- GISTEMP: check the home page for the version and the FAQ for the base period.
- NOAA CDO: re-read the v2 page for token limits and any retirement notice.
- NWS: re-read the API documentation for User-Agent and rate-limit wording.
- Open-Meteo: re-read the terms for free-tier limits and the commercial definition.
- USGS: re-read the feed and FDSN pages for limits.
- Games: Wikipedia infoboxes and developer sites.
