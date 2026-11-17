---
title: History and historical settings for games
tags: [history, archives, primary-sources, anachronism, maps, gazetteer, cultural-heritage, open-access, sensitive-history]
sources:
  - "https://www.loc.gov/apis/json-and-yaml/"
  - "https://www.loc.gov/apis/json-and-yaml/working-within-limits/"
  - "https://metmuseum.github.io/"
  - "https://registry.opendata.aws/smithsonian-open-access/"
  - "https://github.com/Smithsonian/OpenAccess"
  - "https://europeana.atlassian.net/wiki/spaces/EF/pages/2462351393/Accessing+the+APIs"
  - "https://europeana.atlassian.net/wiki/spaces/EF/pages/2360508417/API+FAQ"
  - "https://en.wikipedia.org/wiki/Europeana"
  - "https://pleiades.stoa.org/"
  - "https://pleiades.stoa.org/downloads"
  - "https://en.wikipedia.org/wiki/Old_Bailey_Online"
  - "https://www.oldbaileyonline.org/about/api"
  - "https://www.oldbaileyonline.org/about/legal-info"
  - "https://www.davidrumsey.com/about"
  - "https://www.wikidata.org/wiki/Wikidata:Licensing"
  - "https://archive.org/developers/"
  - "https://seshatdatabank.info/"
  - "https://seshat-db.com/terms/current/"
  - "https://github.com/Seshat-Global-History-Databank/build_polaris_dataset"
  - "https://en.wikipedia.org/wiki/Seshat_(project)"
  - "https://orbis.stanford.edu/"
  - "https://gwern.net/doc/technology/2026-hall.pdf"
  - "https://ourworldindata.org/life-expectancy"
  - "https://en.wikipedia.org/wiki/List_of_common_misconceptions_about_history"
  - "https://usk.de/usk-beruecksichtigt-bei-altersfreigabe-von-spielen-kuenftig-sozialadaequanz/"
  - "https://en.wikipedia.org/wiki/Kingdom_Come:_Deliverance"
  - "https://en.wikipedia.org/wiki/Pentiment_(video_game)"
  - "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Origins"
  - "https://en.wikipedia.org/wiki/Attentat_1942"
  - "https://en.wikipedia.org/wiki/This_War_of_Mine"
  - "https://en.wikipedia.org/wiki/Crusader_Kings_III"
last_verified: 2026-11-16
---

# History and historical settings for games

For period games, historical strategy, maps and borders, daily-life sims, war logistics, and educational history games. Owner: `history-expert`. Rights are per item, not per collection: most archives below mix public-domain and rights-reserved material.

## Datasets and APIs

| Name | Publisher | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|
| loc.gov JSON/YAML API (https://www.loc.gov/apis/json-and-yaml/) | Library of Congress | REST, "no API key or authentication required" | Not stated on the API page; check each item page | JSON, YAML | Live | JSON/YAML API 20 requests per minute, image and text services 150 per minute; breaking a limit blocks you for 1 hour (MARCXML: 72 hours, and the countdown restarts if you keep requesting). Limits may drop under heavy load (429 or a CAPTCHA). No paging past result 100,000; narrow with facets |
| Met Collection API (https://metmuseum.github.io/) | The Metropolitan Museum of Art | REST, no key. Base `https://collectionapi.metmuseum.org/public/collection/v1/` | Selected datasets "Creative Commons Zero"; API use subject to the Met's terms | JSON, JPEG images | Live | "Please limit request rate to 80 requests per second." Filter on `isPublicDomain`; copyrighted works are also listed. The v1 `/search` was due to retire on 1 October 2026 (that date has passed); use `/public/collection/v1.1/search`, which pages 100 at a time and reaches only the first 10,000 results |
| Smithsonian Open Access images (https://registry.opendata.aws/smithsonian-open-access/) | Smithsonian | S3 bucket `smithsonian-open-access` (us-west-2), no AWS account (`--no-sign-request`) | CC0 | Images, metadata | Pushed weekly | Over 2.8 million CC0 2-D and 3-D images, a subset of the collections. Separate count: the archived GitHub repo (https://github.com/Smithsonian/OpenAccess) holds over 11 million metadata records as line-delimited JSON. si.edu/openaccess returned 403 to our fetcher |
| Europeana APIs (https://europeana.atlassian.net/wiki/spaces/EF/pages/2462351393/Accessing+the+APIs) | Europeana Foundation | API key plus a Europeana account (account required since 28 May 2025); one personal key at a time | Metadata: "All metadata from Europeana's APIs are provided as CC0". Media and linked objects follow the rights statement in each record's `edm:rights` field (Europeana API FAQ, https://europeana.atlassian.net/wiki/spaces/EF/pages/2360508417/API+FAQ, checked 2026-11-16). Items stay with the holding institution, so media rights differ per item. pro.europeana.eu served a Cloudflare bot check on 2026-11-16 and was not read | JSON | Live | Personal-key rate limits "progressively reduced until April 2026"; no figures published on that page. Project keys have higher limits. Wikipedia gives "over 50 million" records from 3,000+ institutions |
| Pleiades (https://pleiades.stoa.org/downloads) | Pleiades community gazetteer | Download, no key | CC BY 3.0 (downloads page) | GIS-ready CSV, JSON (the only complete dump), KML, RDF Turtle; GeoJSON derived | JSON/CSV/KML exported daily; numbered releases quarterly (4.1, 28 May 2025) | Gazetteer of ancient places. Coverage is strongest for the Mediterranean, Near East and Nile; Central Asia, India and East Africa are partial. Do not use the legacy CSV ("DEPRECATED") |
| Old Bailey Proceedings Online (https://www.oldbaileyonline.org/) | Academic project (Wikipedia names Hertfordshire, Sheffield and Open University researchers); site published by the Digital Humanities Institute, University of Sheffield | Web, plus the Old Bailey API: JSON endpoints such as `https://www.dhi.ac.uk/api/data/oldbailey_record?text=...`; "Anybody can query this back end directly" (https://www.oldbaileyonline.org/about/api, checked 2026-11-16 in a browser) | Transcribed text, XML, API data and 1834-1913 page images: CC BY-NC 4.0 unless otherwise stated. Commercial use of the text, including generative-AI training, needs a licence from the project; pre-November 1834 page images belong to the holding libraries (https://www.oldbaileyonline.org/about/legal-info, checked 2026-11-16 in a browser) | JSON (API), text, XML | Static | Proceedings 1674-1913, "over 197,000 trials", plus Ordinary of Newgate's Accounts 1679-1772 (Wikipedia). A large corpus of London criminal trials. Non-commercial licence: a paid game needs a licence from the project |
| David Rumsey Map Collection (https://www.davidrumsey.com/about) | Stanford Libraries | Web, georeferencer, Google Earth | CC BY-NC-SA 3.0; commercial use needs permission | Images | Ongoing | Over 152,000 maps and images; georeferenced maps let you overlay a period map on modern terrain. Non-commercial licence: a paid game must ask first |
| Wikidata (https://www.wikidata.org/wiki/Wikidata:Licensing) | Wikimedia | SPARQL / dumps | Structured data CC0; text in other namespaces CC BY-SA 4.0 | JSON, RDF | Live | Good for dates and places of people and events; crowd-edited, so cross-check with a primary source |
| Internet Archive (https://archive.org/developers/) | Internet Archive | Item Metadata API, S3-like API, Python library | Archive "does not assert any new copyright" over items; each item's own rights apply | Varied | Live | No rate limits stated on the developer page. Many uploads are not public domain despite being free to view |
| Seshat Global History Databank (https://seshatdatabank.info/) | Seshat / Evolution Institute | Website data section; downloads from seshat-db.com need a free account and acceptance of its User Agreement | Public Data: CC BY-SA 4.0, commercial use allowed with attribution, a licence link and share-alike on adaptations; unreleased Private Data may not be shared (https://seshat-db.com/terms/current/, checked 2026-11-16 in a browser). The Polaris-2026 GitHub repo (https://github.com/Seshat-Global-History-Databank/build_polaris_dataset) carries an MIT licence whose text covers "the Software" and its documentation and does not mention data (checked 2026-11-16) | CSV, JSON (seshat-db.com downloads) | Research releases | Codes social complexity of past polities, roughly 4000 BCE to 1900 CE (Wikipedia). Useful for strategy-game tech and state stats; share-alike means a shipped table built from it must carry CC BY-SA 4.0 or a licence Creative Commons declares compatible |

## Standards and expert sources

- Life expectancy: low historical life expectancy at birth was driven largely by child mortality. Our World in Data: "in 1800, no region had a life expectancy higher than 40 years"; a 15-year-old in France in 1816 could expect to reach 58 (OWID, CC BY). Wikipedia's misconceptions list: a 21-year-old man in medieval England could expect to reach about 64.
- Travel: ORBIS (Stanford, Scheidel and Meeks) models Roman travel by road, river, coastal and open sea, by season, cost and speed, with donkey, wagon and carriage options. Use it to set travel times for antiquity instead of guessing. The home page gives no fixed speeds. Jacob R. Hall, "Travel Speed over the Longue Durée" (European Review of Economic History, 2026, doi:10.1093/ereh/heag011), reports that ORBIS cites about 19 miles (roughly 30 km) a day for travellers on foot with moderate loads, and that medieval English and French royal itineraries average about 15 to 20 miles a day, slower with the household baggage train. Hall also cites Prestwich (about fifteen miles a comfortable day for Edward I's travels, over twenty uncommon) and Boyer (1951: most journeys in 14th-century France at 20 to 30 miles a day; Hall does not give the mode of travel).
- Maps: use a map dated to your year (David Rumsey, Library of Congress), and Pleiades for ancient place names and coordinates.
- Germany, symbols: USK press release of 9 August 2018 lets rating boards apply the "social adequacy" clause (§ 86a Abs. 3 StGB) to games with symbols of unconstitutional organisations used for art, science or depicting history. Each case is reviewed individually and it "stellt keine generelle Ausnahme dar" (is not a blanket exception). Route to `game-legal-advisor`.

## Accuracy vs fun

Acceptable simplifications:
- Compressing travel and campaign time, if relative distances and seasons still matter.
- A single named year and place for the whole game, with a visible register of deliberate departures.
- Modern readable language with period terms for titles, money and objects.
- Fictional characters inside a real setting (Pentiment's fictional town of Tassing).

Trust breakers for historians and enthusiasts:
- Objects, foods or weapons that had not yet arrived (Tier 1 anachronism).
- One base map reused across centuries.
- Modern myths stated as fact (see next section).
- Armies with no supply, season or forage limits.
- Presenting a contested interpretation as the only reading.

## What games get wrong

Popular myths, all corrected in Wikipedia's list of common misconceptions about history:
- Medieval people did not avoid bathing; "public bathhouses were common" in large towns.
- Educated medieval Europeans knew the Earth was round.
- No evidence that Vikings wore horned helmets.
- Iron maidens were assembled in the 18th century for exhibition; no evidence of medieval use. Most surviving chastity belts are thought to be 19th-century fakes.
- Salem's accused witches were hanged (nineteen), not burned.
- "People died at 30": a life-expectancy-at-birth figure misread as typical adult lifespan.
- Representation debates: Kingdom Come: Deliverance was praised by historians for its aim at accuracy, yet critics argued it portrayed Cumans and Hungarians as cruel invaders and reinforced nationalist myths, and debated its depiction of who lived in 1403 Bohemia (Wikipedia). Accuracy claims invite scrutiny of every choice; document sources for contested ones.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Kingdom Come: Deliverance | 2018 | Warhorse Studios | Bohemia, 1403; realism as a selling point and the debates it drew | https://en.wikipedia.org/wiki/Kingdom_Come:_Deliverance |
| Pentiment | 2022 | Obsidian Entertainment | 16th-century Upper Bavaria; art drawn from manuscripts, early print and woodcuts; historians consulted (de Hamel, Kern, Black) | https://en.wikipedia.org/wiki/Pentiment_(video_game) |
| Assassin's Creed Origins: Discovery Tour | 2017 (tour Feb 2018) | Ubisoft Montreal | Combat-free mode with 75 guided tours curated by historians and Egyptologists | https://en.wikipedia.org/wiki/Assassin%27s_Creed_Origins |
| Attentat 1942 | 2017 | Charles University and Czech Academy of Sciences | Protectorate of Bohemia and Moravia after Heydrich's assassination; players interview eyewitnesses | https://en.wikipedia.org/wiki/Attentat_1942 |
| This War of Mine | 2014 | 11 bit studios | Civilians in war, inspired by the Siege of Sarajevo; added to Poland's recommended school reading list in 2020 | https://en.wikipedia.org/wiki/This_War_of_Mine |
| Crusader Kings III | 2020 | Paradox Development Studio | Dynasty and character sim with start dates 867, 1066, 1178, ending 1453 | https://en.wikipedia.org/wiki/Crusader_Kings_III |

## Sensitive topics and legal

- Atrocity, genocide, slavery and colonialism: show perspective and consequence; never turn perpetrator actions into a score loop. Consult specialist historians and affected communities.
- Symbols of extremist regimes: legal treatment differs by country (Germany's USK case-by-case rule above). Hand off to `game-legal-advisor`.
- Living descendants and named real people: defamation and personality-rights risk; flag to `game-legal-advisor`.
- Indigenous and colonised cultures: consult the community; sacred objects and ceremonies may be off limits.
- Image rights: CC0 (Met open access, Smithsonian Open Access) carries no copyright restriction, but trademarks and personality rights can still apply; CC BY-NC-SA (David Rumsey) is not without permission; Wikidata text outside structured data is share-alike.

## How to check this is current

- loc.gov: re-read "working within limits" for the per-minute rates and block lengths.
- Met: confirm the v1.1 search endpoint and the 80 requests per second guidance on metmuseum.github.io.
- Smithsonian: check the AWS registry entry; try si.edu/openaccess in a browser (blocked to scripts).
- Europeana: read the API key page and Media policy in a browser for current limits and rights statements.
- Pleiades: check the downloads page for the latest numbered release.
- Old Bailey and Seshat: both block scripted fetches; re-read the Old Bailey licensing and API pages and the Seshat User Agreement in a browser.
- Games: Wikipedia infoboxes and developer sites.
