---
title: Game economy design, loot math and paid randomness status
tags: [economy, sources-sinks, inflation, loot-tables, loot-boxes, eve-online, machinations]
sources: ["https://www.eveonline.com/news/view/monthly-economic-report-march-2026", "https://www.raadvanstate.nl/actueel/nieuws/@130206/dwangsom-onterecht-opgelegd-loot-boxes/", "https://machinations.io/"]
last_verified: 2026-11-05
---

# Game economy design, loot math and paid randomness status

## Terms

- Source (faucet): creates currency (drops, quest rewards, vendor sales to NPCs).
- Sink (drain): destroys currency (repairs, fees, taxes, NPC shop purchases, upgrades).
- Transfer: moves currency between players; neither source nor sink.
- Finite sink: capacity runs out (buy-once catalogue). Repeatable sink: scales with play.

## EVE Online Monthly Economic Report

CCP publishes a Monthly Economic Report (MER) in the EVE Online news section and forums, with faucets, sinks, money supply, ISK velocity, price indices, and raw data downloads. Search results (2026-11-05) show reports for January through May 2026 on eveonline.com, and an August 2026 forum thread. Examples reported: total ISK faucets up about 17% in March 2026; faucets up about 26% in May 2026, mainly bounty prizes and commodities. Use the report layout as a template for your own economy dashboard.

## Loot math (independent tries, chance p)

| p | Expected tries | P50 | P90 | P99 |
|---|---|---|---|---|
| 10% | 10 | 7 | 22 | 44 |
| 5% | 20 | 14 | 45 | 90 |
| 1% | 100 | 69 | 230 | 459 |
| 0.5% | 200 | 139 | 460 | 919 |

Percentile n = ln(1 - q) / ln(1 - p), rounded up. Chance of still missing after n tries: (1 - p)^n. Weighted table: p = weight / total weight.

## Paid randomness: status as checked 2026-11-05

- Netherlands: Council of State (Raad van State), ruling 9 March 2022, case 202005769/1: FIFA Ultimate Team packs not a standalone game of chance; the KSA's penalty order against EA annulled; no further appeal. Confirmed via search results of raadvanstate.nl and press. Ask game-legal-advisor to check current Dutch policy and legislation before advising.
- Belgium: In 2018 the Gaming Commission concluded that paid loot boxes examined in Overwatch, FIFA 18, and Counter-Strike: Global Offensive met its definition of games of chance. See the [Australian parliamentary report citing the commission](https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/Gamingmicro-transactions/Report/c01); check current law before relying on this historical conclusion.
- For other markets and platform odds-disclosure rules, have `game-legal-advisor` check current primary sources for each target territory and storefront.

## Tools

Machinations (machinations.io): diagram and simulate economy loops; free start advertised (2026-11-05). Spreadsheets for time-to-afford tables; scripts for seeded loot simulation.
