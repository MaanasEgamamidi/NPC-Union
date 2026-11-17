---
title: Biology, ecology and evolution for games
tags: [biology, ecology, evolution, genetics, population-model, predator-prey, food-web, biodiversity-data, gbif, sensitive-species]
sources:
  - "https://techdocs.gbif.org/en/openapi/"
  - "https://techdocs.gbif.org/en/data-use/"
  - "https://api.gbif.org/v1/enumeration/license"
  - "https://api.gbif.org/v1/occurrence/search?limit=0&facet=license"
  - "https://docs.gbif.org/sensitive-species-best-practices/master/en/"
  - "https://api.inaturalist.org/v1/swagger.json"
  - "https://api.checklistbank.org/dataset/3LR"
  - "https://github.com/IUCN-UK/iucnredlist/blob/main/README.md"
  - "https://support.nlm.nih.gov/knowledgebase/article/KA-05317/en-us"
  - "https://en.wikipedia.org/wiki/Logistic_function"
  - "https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations"
  - "https://en.wikipedia.org/wiki/Ecological_efficiency"
  - "https://en.wikipedia.org/wiki/Kleiber%27s_law"
  - "https://en.wikipedia.org/wiki/Insular_biogeography"
  - "https://en.wikipedia.org/wiki/Genetic_drift"
  - "https://www.nationalgeographic.com/science/article/bad-grades-for-spore"
  - "https://en.wikipedia.org/wiki/Spore_(2008_video_game)"
  - "https://en.wikipedia.org/wiki/SimLife"
  - "https://en.wikipedia.org/wiki/Niche_(video_game)"
  - "https://en.wikipedia.org/wiki/Eco_(2018_video_game)"
last_verified: 2026-11-16
---

# Biology, ecology and evolution for games

For creature and ecosystem sims, food webs, breeding and genetics, evolution games, and real species data. Owner: `biology-ecology-expert`. Disease spread with SIR models and medical framing is in `healthcare.md`; crops and livestock in `agriculture-food.md`; climate and habitat inputs in `climate-earth.md`.

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| GBIF API | GBIF Secretariat | https://techdocs.gbif.org/en/openapi/ | REST at `https://api.gbif.org/v1/`; most reads need no login; POST/PUT/DELETE and "some GET requests" need HTTP Basic Auth with a GBIF account | Per dataset. The API's licence list is CC0 1.0, CC BY 4.0, CC BY-NC 4.0 (plus UNSPECIFIED, UNSUPPORTED). Today about 2.74 billion occurrences were CC BY, 0.68 billion CC BY-NC and 0.48 billion CC0, of about 3.9 billion total | JSON | Not checked today | No guaranteed rate; search may return HTTP 429 under load. Set `User-Agent` to a URL or email. If a search script would run more than 15 minutes, request a download instead. Downloads come with a DOI that GBIF's data user agreement says you must cite. Filter by licence: CC BY-NC records cannot go into a commercial game |
| iNaturalist API v1 | iNaturalist | https://api.inaturalist.org/v1/swagger.json | REST at `https://api.inaturalist.org/v1/`; JWT (expires after 24 hours) only for writes and private data | iNaturalist Terms of Service and Privacy Policy; photos on `inaturalist-open-data` are openly licensed, photos on `static.inaturalist.org` "do not have open licenses" | JSON, PNG map tiles | Not checked today | Throttled at 100 requests per minute; iNaturalist asks for 60 per minute or lower and under 10,000 per day. "Intended to support application development, not data scraping"; use their exports or the AWS open dataset for bulk. The developer and recommended-practices pages on inaturalist.org returned 403 to scripts today |
| Catalogue of Life via ChecklistBank | Catalogue of Life | https://api.checklistbank.org/dataset/3LR | REST, no key; `3LR` aliases the latest release | Dataset metadata says licence "cc by" | JSON; downloads | Cadence not checked; latest today COL26.11 (issued 2026-11-11, DOI 10.48580/dgzy8) | Says it "probably includes just over 80% of the world's known species" and estimates 2.3 million extant species. Use it to check scientific names. catalogueoflife.org returned 403 to scripts today |
| IUCN Red List API | IUCN | https://github.com/IUCN-UK/iucnredlist/blob/main/README.md (official IUCN-supported client; api.iucnredlist.org and the Red List terms page refuse automated access) | Sign up to the Red List API for a token; rate limited, and the client waits at least 0.5 s between calls by default; excessive use can get the token throttled or revoked (README, checked 2026-11-16) | "The use of the API falls under the same Terms of Use as the Red List." "Use of the Red List API for commercial purposes is strictly forbidden"; the README points commercial users to IBAT (checked 2026-11-16). Full Terms of Use text UNVERIFIED: the terms page refuses automated access | | | Read the current terms in a browser before any use, especially commercial |
| NCBI E-utilities | US NLM | https://support.nlm.nih.gov/knowledgebase/article/KA-05317/en-us | "NCBI E-Utilities API service limits the number of requests per second (rps) to 3"; an API key, created under My NCBI Account settings, raises that to 10 rps (NLM Support Center, checked 2026-11-16) | UNVERIFIED: the NCBI documentation site served a reCAPTCHA browser check to scripts, so NCBI's data-use terms were not read | | | Re-check the usage policy in a browser before shipping |

## Models and numbers for simulation

- **Logistic growth.** dN/dt = rN(1 - N/K), with r the growth rate and K the carrying capacity (Verhulst, 1838). It follows from the equation that growth is fastest at N = K/2, which gives a natural harvest sweet spot.
- **Lotka-Volterra predator-prey.** dx/dt = αx - βxy, dy/dt = -γy + δxy. The solutions are closed periodic orbits with a conserved quantity, so cycles are neutral: any nudge, including integration error, moves the system to a different cycle. The standard fix is the extension with density-dependent prey growth and a Holling functional response (the Rosenzweig-MacArthur model). Hudson's Bay Company lynx and snowshoe hare fur records are the classic real-world example of cycles.
- **Energy between trophic levels.** The "ten percent law" is a rounded average; Lindeman (1942) "did not call it a 'law'" and cited efficiencies from 0.1% to 37.5%. Marine phytoplankton to herbivorous zooplankton is estimated near 20%. Make efficiency a per-biome parameter, not a constant.
- **Metabolic scaling (Kleiber's law).** Basal metabolic rate scales with body mass to the 3/4 power "in the vast majority of cases" (Kleiber, 1932). The exact exponent is debated; small animals fit 2/3 better. Good enough to derive food need, lifespan or speed for procedural creatures from size.
- **Island biogeography.** MacArthur and Wilson (1967): species number on an island settles where immigration balances extinction. Remote islands get fewer immigrants; small islands lose species faster. Use it for procedural archipelagos.
- **Genetic drift.** Drift is stronger in small populations, drives populations "towards genetic uniformity", and bottlenecks change allele frequencies "completely independent of selection". The founder effect is a special case. A breeding game with a bottleneck event should cut variation.

## Standards and expert sources

- Species names: Catalogue of Life (via ChecklistBank) for accepted names; GBIF for occurrences.
- Sensitive locations: Chapman, *Current Best Practices for Generalizing Sensitive Species Occurrence Data* (GBIF, version 1.0, November 2020, CC BY-SA 4.0). It rounds coordinates by category: about 1 degree or region only for the most sensitive, 0.1 degree (about 10 km), 0.01 degree (about 1 km), 0.001 degree (about 100 m). Threats listed include poaching and trade, egg collecting and disturbance; cacti, orchids and cycads are named as illegally collected plants. It advises against randomising points, because that creates false data.
- Evolution as a game subject: the October 2008 *Science* report card on Spore (via Wikipedia and National Geographic, below).

## Accuracy vs fun

Acceptable simplifications:
- One tick per day for ecosystems, one tick per generation for evolution, stated in the design notes.
- A handful of species with clear links instead of a full food web.
- Mendelian single genes for visible traits such as colour; a simple additive score for stats.
- Using "evolve" in a Pokémon-style levelling game, as long as the design notes do not claim it is biological evolution.

Trust breakers for biologists:
- Individuals choosing to evolve, or passing on traits gained in life.
- Raw Lotka-Volterra cycles that drift into extinction or explosion.
- A fixed 10% transfer everywhere presented as fact.
- Real endangered-species locations shown precisely.
- Every creature descending from a separate origin (one of the Spore criticisms).

Fun levers that are also accurate: trophic cascades when a predator is removed, lags between predator and prey peaks, bottlenecks and founder effects, island isolation creating odd endemic species, carrying capacity that the player can raise or lower.

## What games get wrong

- Spore (2008): Carl Zimmer's biologists gave "positive–though decidely mixed–marks"; criticisms quoted by National Geographic include that each creature traces back to a different single-celled organism from space, that offspring are "identical clones of you", and that dying has no consequence. Wikipedia reports the *Science* report card gave failing marks on mutation, natural selection, genetics and genetic drift.
- Goal-directed evolution: improvement by wanting it, rather than selection and drift on populations.
- Neutral predator-prey maths shipped without damping, so worlds collapse after long play.
- Endangered species placed on a map at their real nest or roost.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| SimLife | 1992 | Maxis | Design plants and animals, edit their genetics, build an ecosystem that sustains itself | https://en.wikipedia.org/wiki/SimLife |
| Spore | 2008 | Maxis (Will Wright, designer) | Five stages from Cell to Space; the case study in how evolution can be misrepresented | https://en.wikipedia.org/wiki/Spore_(2008_video_game) |
| Niche | 2017 | Stray Fawn Studio | Population-genetics-inspired breeding with over 100 simulated genes across four biomes | https://en.wikipedia.org/wiki/Niche_(video_game) |
| Eco | 2018 (early access) | Strange Loop Games | Shared world where over-harvesting damages the ecosystem; first designed for middle-school students | https://en.wikipedia.org/wiki/Eco_(2018_video_game) |

## Sensitive topics and legal

- Sensitive species: never show precise locations of threatened or collected species; follow the GBIF generalisation categories and do not re-add precision to generalised records.
- Licences: CC BY needs attribution in credits; CC BY-NC records cannot be used in a commercial game; iNaturalist photos on `static.inaturalist.org` are not openly licensed. Route commercial use to `game-legal-advisor`.
- Evolution and creationism: present evolution accurately; if a game simplifies it, say so in the design notes and avoid claiming it teaches biology.
- Pathogens: real outbreaks and named pathogens go through `healthcare-expert`; nothing that reads as instructions.
- Animal cruelty and extinction: decide depiction and content notes early with `narrative-director`.
- Indigenous knowledge of species and places: do not take names or knowledge without consent.

## How to check this is current

- GBIF: call `https://api.gbif.org/v1/enumeration/license` and `https://api.gbif.org/v1/occurrence/search?limit=0&facet=license`; re-read the OpenAPI page for auth and download rules.
- iNaturalist: read `info.description` in `https://api.inaturalist.org/v1/swagger.json` for rate limits.
- Catalogue of Life: read `license`, `version` and `alias` from `https://api.checklistbank.org/dataset/3LR`.
- IUCN and NCBI: open the terms and documentation in a browser; scripted fetches were blocked today.
- Games: Wikipedia infoboxes and developer sites.
