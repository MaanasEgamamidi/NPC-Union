---
title: Agriculture, farming and food for games
tags: [agriculture, farming-sim, crops, livestock, soil, growing-degree-days, food-data, nutrition, cooking-games, food-safety]
sources:
  - "https://www.fao.org/contact-us/terms/db-terms-of-use/en/"
  - "https://bulks-faostat.fao.org/production/datasets_E.json"
  - "https://quickstats.nass.usda.gov/api"
  - "https://fdc.nal.usda.gov/api-guide/"
  - "https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/tutorials/license-be-on-the-legal-side/"
  - "https://openfoodfacts.github.io/openfoodfacts-server/api/"
  - "https://planthardiness.ars.usda.gov/"
  - "https://www.nrcs.usda.gov/resources/data-and-reports/web-soil-survey"
  - "https://www.fao.org/statistics/highlights-archive/highlights-detail/faostat-launches-a-new-api-developer-portal-to-make-data-access-easier/en"
  - "https://extension.psu.edu/understanding-growing-degree-days"
  - "https://ndawn.ndsu.nodak.edu/help-wheat-growing-degree-days.html"
  - "https://www.agry.purdue.edu/ext/corn/news/timeless/HybridMaturityDelayedPlant.html"
  - "https://www.agry.purdue.edu/ext/corn/News/timeless/GrainFill.html"
  - "https://extension.missouri.edu/publications/wq277"
  - "https://en.wikipedia.org/wiki/Liebig%27s_law_of_the_minimum"
  - "https://en.wikipedia.org/wiki/Feed_conversion_ratio"
  - "https://www.cdc.gov/food-safety/prevention/index.html"
  - "https://en.wikipedia.org/wiki/Stardew_Valley"
  - "https://en.wikipedia.org/wiki/Farming_Simulator"
  - "https://en.wikipedia.org/wiki/Harvest_Moon_(video_game)"
  - "https://en.wikipedia.org/wiki/FarmVille"
  - "https://en.wikipedia.org/wiki/Overcooked"
last_verified: 2026-11-16
---

# Agriculture, farming and food for games

For farming sims, cozy crop loops, livestock and supply-chain games, and cooking games. Owner: `agriculture-food-expert`. Weather inputs live in `climate-earth.md`; pests and pollinators as species in `biology-ecology.md`; prices and farm finance in `business-finance.md`.

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| FAOSTAT bulk downloads | FAO | https://bulks-faostat.fao.org/production/datasets_E.json | Catalogue JSON lists every dataset with a zip URL and `DateUpdate`; the catalogue loaded without a key (zip downloads not tried) | FAO statistical databases: CC BY 4.0 "as complemented by the Terms of Use" (https://www.fao.org/contact-us/terms/db-terms-of-use/en/) | Zip files named `..._All_Data_(Normalized).zip` | Per dataset; the catalogue listed 69 datasets today. QCL (crops and livestock production) dated 2025-12-31, PP (producer prices) 2026-10-09 | The extra terms say datasets "shall not be used for or in conjunction with the promotion of a commercial enterprise and/or its product(s)". Whether a paid game that uses FAO-derived numbers is affected is a question for `game-legal-advisor`; do not decide it in design. Required citation: "FAO. [year of last update]. [database: dataset]. [Accessed on date]. [URL] Licence: CC-BY-4.0." Some datasets carry third-party data with other terms |
| FAOSTAT query API | FAO | https://www.fao.org/faostat/en/#developer-portal/sign-in | FAO announced a FAOSTAT API developer portal on 13 April 2026 (https://www.fao.org/statistics/highlights-archive/highlights-detail/faostat-launches-a-new-api-developer-portal-to-make-data-access-easier/en, read 2026-11-16); the announcement does not say whether a key is needed. UNVERIFIED: third-party pages say the API now needs a developer-portal key; the portal sign-in page was not fetched, and `fenixservices.fao.org/faostat/api/v1` returned error 521 when first checked | | | | Use the bulk files above until the API is checked |
| Quick Stats API | USDA NASS | https://quickstats.nass.usda.gov/api | Key by email; agree to the NASS Terms of Service. Endpoints `/api/api_GET/`, `/api/get_param_values/`, `/api/get_counts/` | Terms require the line "This product uses the NASS API but is not endorsed or certified by NASS." No implied endorsement, no altered content still credited to NASS | JSON (default), XML, CSV | Not checked today | Max 50,000 records per request; call `get_counts` first and split by year or state. US only |
| FoodData Central API | USDA ARS | https://fdc.nal.usda.gov/api-guide/ | data.gov API key on every request; `DEMO_KEY` for trying it (30 per hour, 50 per day per IP) | "public domain ... published under CC0 1.0"; USDA asks you to credit FoodData Central | REST; endpoints `/food/{fdcId}`, `/foods`, `/foods/list`, `/foods/search` under `https://api.nal.usda.gov/fdc/v1/` | Versioned releases | 1,000 requests per hour per IP by default; over that the key is blocked for an hour (HTTP 429). Keys found in public repos are deactivated, so never ship the key in a client build |
| Open Food Facts | Open Food Facts | https://openfoodfacts.github.io/openfoodfacts-server/api/ | Reads need no login, only a custom User-Agent `AppName/Version (ContactEmail)` | Database under ODbL, individual contents under the Database Contents License, product images CC BY-SA (images "may contain graphical elements subject to copyright") | JSON API; CSV or JSONL dumps | Not checked today | 15 requests per minute per IP for product reads, 10 per minute for search; exceeding them can get the IP banned. For more than a few hundred products use the dumps. Real brand names and packaging art are trademarks |
| USDA Plant Hardiness Zone Map | USDA ARS | https://planthardiness.ars.usda.gov/ | Web map, zip search, map downloads | Terms not shown on the home page; check "Policies and Links" | GIS map, images | 2023 edition (previous 2012) | Based on "average annual extreme minimum winter temperature", 10 °F zones and 5 °F half zones. It says what survives winter, not how fast anything grows |
| Web Soil Survey | USDA NRCS | https://www.nrcs.usda.gov/resources/data-and-reports/web-soil-survey | Web app. The NRCS page (read 2026-11-16) says it provides soil data from the National Cooperative Soil Survey, lets users download spatial, tabular and thematic soils data for GIS, and links a fact sheet titled "Free Public Access to the Nation's Soil Resource Data" | UNVERIFIED: websoilsurvey.nrcs.usda.gov returned HTTP 502 when first checked and again on 2026-11-16, so the app's own terms were not read | SSURGO / STATSGO2 | | Re-check before relying on it |

## Models and numbers for simulation

- **Growing degree days (GDD).** Penn State Extension: daily GDD = (high + low) / 2 minus the base temperature; zero if the mean is at or below base; if the low is below base, use the base. Corn, sorghum and soybeans have a base of about 50 °F; for corn, cap the high at 86 °F because "corn development levels off" there. Alfalfa's base is 41 °F. Worked example: high 80 °F, low 60 °F gives 20 GDD.
- **Wheat stages by GDD.** NDAWN (North Dakota State) uses a 32 °F (0 °C) base for wheat. Accumulated °F GDD from planting: emergence 180, heading begins 1,567, flowering begins 1,739, kernel watery ripe 1,825. NDAWN gives no values past that because later stages follow kernel moisture, not heat. Good for a staged crop sprite.
- **Corn maturity.** Purdue (Nielsen, 2022): seed companies rate hybrids in "GDDs to black layer"; the example hybrid is 2,700 GDD from planting to physiological maturity. "Days to maturity" ratings "do not literally refer to calendar time". Planting after about 1 May cuts the need by about 6.8 GDD per day of delay. Black layer comes about 55 to 65 days after silking, at about 30 percent kernel moisture (Purdue, 2021). So drive growth with heat and a hard frost check, not a fixed day count.
- **Law of the minimum.** Growth is set by the scarcest resource, not the total (Sprengel 1840, popularised by Liebig; the "barrel" image). In code: yield factor = min(water, nitrogen, temperature), not a sum.
- **Legume nitrogen credit.** University of Missouri WQ277 (reviewed 2022) gives nitrogen added for the next crop in lb N per acre: alfalfa 120-140 at an 80-100 percent stand, 40-60 at 50-80 percent, 0-20 below 50 percent; sweet clover green manure 100-120; red clover 40-60; soybeans 15-60. Root-nodule microbes fix the nitrogen, and added nitrogen fertiliser "will only delay, or inhibit" fixation. A rotation stat can use these ratios directly.
- **Feed conversion (Wikipedia summary of cited sources, treat as rough).** kg feed per kg live-weight gain: beef cattle above 6 (University of Illinois, 2013); pigs about 3 at slaughter (2009) to about 3.5 (1992); US broilers 1.6 (2011), world average about 2.0 (FAO, 2013); farmed salmon around 1. FCRs compare only loosely across species because feeds differ. Use the ratios for "meat costs more than grain", not as exact values.
- **Food safety numbers (CDC).** Safe internal temperatures: poultry 165 °F, ground beef and pork 160 °F, whole cuts of beef, pork, lamb and veal 145 °F then rest 3 minutes, finfish 145 °F, leftovers 165 °F. The four steps are "clean, separate, cook, and chill".

## Standards and expert sources

- University extension services (Penn State, Purdue, NDSU, Missouri above) give local, crop-specific numbers. Prefer them over blogs and seed-company marketing, and note the state, since numbers vary by region.
- FAO FAOSTAT for country-level production, yields, land use and producer prices; USDA NASS for US county and state statistics.
- USDA FoodData Central for nutrients; Open Food Facts for packaged-product labels.
- CDC food-safety pages for cooking temperatures (the USDA FSIS chart and foodsafety.gov blocked scripted fetches today with 403).

## Accuracy vs fun

Acceptable simplifications:
- Compress the season (Stardew Valley uses four 28-day seasons) as long as order holds: sow, grow, ripen, harvest, with winter wheat sown in autumn.
- Replace the GDD sum with "growth points per warm day" and keep the base-temperature idea.
- Let a missed watering pause growth instead of killing the crop (Harvest Moon's choice) in a cozy game.
- Use three soil icons for a hidden nitrogen number.

Trust breakers for farmers:
- Crops growing at full speed in frost, or no difference between a hot and a cool biome.
- Fertiliser that rescues a crop dying of drought (bonuses that add instead of capping).
- Rotation with no payoff; legumes that use nitrogen like cereals.
- Meat as cheap as grain in an economy that claims realism.
- Undercooked poultry served as safe in a cooking game.

Fun levers that are also accurate: frost dates and planting windows, harvest windows that close, legume rotations, soil that recovers slowly, cover crops, a drought year that tests storage.

## What games get wrong

- Calendar-day growth. Real maturity follows accumulated heat; Purdue warns that even seed "days" ratings are not calendar days.
- Hardiness zones used as a heat or season model; USDA defines them by winter minimum temperature only.
- Additive yield bonuses, which let one input mask a missing one, against the law of the minimum.
- Withering as monetisation pressure: FarmVille crops withered after 2.5 times their growth time and could be revived with paid Farm Cash. Fine to study; risky to copy in a game for children.
- Overcooked shows how to make cooking hard through layout and time, not through wrong food science.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Harvest Moon | 1996 (JP), 1997 (NA) | Amccus | Inherit a run-down farm; daily watering where drought stops growth but does not kill; cows that sicken if neglected | https://en.wikipedia.org/wiki/Harvest_Moon_(video_game) |
| Stardew Valley | 2016 | ConcernedApe | Four 28-day seasons, daily watering, seasonal seeds that generally must be harvested before the next season | https://en.wikipedia.org/wiki/Stardew_Valley |
| Farming Simulator series | 2008 onward | GIANTS Software | Licensed real machinery (John Deere, Claas, Fendt and others); FS 17 yields rose with staged fertiliser, ploughing and oilseed radish cover crops; FS 22 added a seasonal cycle and production chains | https://en.wikipedia.org/wiki/Farming_Simulator |
| FarmVille | 2009 | Zynga | Real-time growth timers, withering at 2.5 times growth time, neighbour help; the Facebook version closed 31 Dec 2020 when Flash ended | https://en.wikipedia.org/wiki/FarmVille |
| Overcooked | 2016 | Ghost Town Games (Team17 publishing) | Up to four local co-op chefs; prep, cook, serve and clean against an order queue; changing kitchen layouts | https://en.wikipedia.org/wiki/Overcooked |

## Sensitive topics and legal

- Nutrition and allergy content: keep it clearly as game flavour. Anything that reads as diet or health advice goes to `healthcare-expert` and `game-legal-advisor`.
- Food safety: never teach an unsafe temperature as safe; use the CDC numbers above or avoid numbers.
- Animal welfare and slaughter: decide the depiction (off-screen, abstract, explicit) early, add content notes, check rating descriptors.
- Brands: real machinery, seed and food brands are trademarks. Farming Simulator licenses them; do not copy that without a licence. Open Food Facts product images may carry copyrighted packaging.
- Data terms: FAO forbids implying endorsement and using datasets to promote a commercial product; NASS requires its non-endorsement line. Route commercial use to `game-legal-advisor`.
- Real farming crises (famine, farmer suicide, land disputes): handle with `narrative-director`; no mockery, no mechanics that reward suffering.

## How to check this is current

- FAOSTAT: download `https://bulks-faostat.fao.org/production/datasets_E.json` and read `DateUpdate` for the dataset you use; re-read the FAO database terms. Check whether the query API needs a key.
- NASS: re-read the Quick Stats API page for the record limit and terms.
- FoodData Central: re-read the API guide for rate limits and licence.
- Open Food Facts: re-read the API introduction for rate limits and User-Agent rules.
- Hardiness zones: check the map edition year on the home page.
- Extension numbers: re-open the cited extension page; they are revised every few years.
- Games: Wikipedia infoboxes and developer sites.
