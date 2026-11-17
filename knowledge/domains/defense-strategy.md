---
title: Defense, wargaming and military strategy for games
tags: [defense, wargaming, military-history, strategy, logistics, attrition, lanchester, conflict-data, ucdp, sipri, sensitivity]
sources:
  - "https://ucdp.uu.se/downloads/"
  - "https://ucdp.uu.se/apidocs/"
  - "https://www.sipri.org/databases/milex"
  - "https://www.sipri.org/databases/armstransfers"
  - "https://www.sipri.org/databases/armstransfers/sources-and-methods"
  - "https://www.sipri.org/about/terms-and-conditions"
  - "https://acleddata.com/eula/"
  - "https://correlatesofwar.org/data-sets/"
  - "https://en.wikipedia.org/wiki/Lanchester%27s_laws"
  - "https://en.wikipedia.org/wiki/Combat_results_table"
  - "https://en.wikipedia.org/wiki/Kriegsspiel"
  - "https://en.wikipedia.org/wiki/OODA_loop"
  - "https://usnwc.edu/Research-and-Wargaming/Wargaming"
  - "https://www.gov.uk/government/publications/defence-wargaming-handbook"
  - "https://assets.publishing.service.gov.uk/media/5a82e90d40f0b6230269d575/doctrine_uk_wargaming_handbook.pdf"
  - "https://rulespal.com/tactics-ii/rulebook"
  - "https://en.wikipedia.org/wiki/War_Thunder"
  - "https://en.wikipedia.org/wiki/Arma_3"
  - "https://en.wikipedia.org/wiki/Tactics_II"
  - "https://en.wikipedia.org/wiki/Hearts_of_Iron_IV"
  - "https://en.wikipedia.org/wiki/This_War_of_Mine"
last_verified: 2026-11-16
---

# Defense, wargaming and military strategy for games

For wargames, grand strategy, military sims and games about war's effect on people. Owner: `defense-strategy-expert`. Period detail goes to `history-expert`; genre conventions in `knowledge/genres/strategy.md`; cyber operations in `cybersecurity.md`.

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| UCDP datasets | Uppsala Conflict Data Program | https://ucdp.uu.se/downloads/ | Free download | "licensed under CC BY 4.0"; cite the publications listed with each dataset and acknowledge UCDP's DEMSCORE funding | Per dataset | Versioned; UCDP/PRIO Armed Conflict Dataset v26.1 covers 1946-2025; GED Global v26.1 | Read each codebook before turning counts into game numbers |
| UCDP API | Uppsala Conflict Data Program | https://ucdp.uu.se/apidocs/ | Token from the API maintainer (requests "reviewed and responded to within 3–5 working days"), sent as header `x-ucdp-access-token`. Base `https://ucdpapi.pcr.uu.se/api/<resource>/<version>` | As above | Paged responses (format not checked today) | Version required on every call (latest 26.1) | 5,000 requests per day, errors included. Paging is mandatory; iterate to `TotalPages`. Resources include `gedevents`, `ucdpprioconflict`, `battledeaths` |
| SIPRI Military Expenditure Database | SIPRI | https://www.sipri.org/databases/milex | Download (format not checked today) | SIPRI terms: free for analysis and citing; fair use is under 10% of a data set; "Any reproduction ... requires authorization"; commercial use "must be authorized and will normally require the payment of a reasonable royalty" | Spreadsheet | Revised 27 April 2026 | Covers 1949-2025 in constant (2024) and current US dollars; "no estimates for total world military expenditure are available before 1988" for lack of Soviet data |
| SIPRI Arms Transfers Database | SIPRI | https://www.sipri.org/databases/armstransfers | Web query | Same SIPRI terms | Web query | Updated 9 March 2026; covers 1950-2025 | Values are trend-indicator values (TIV), "the transfer of military resources rather than the financial value"; SIPRI says do not compare TIV with GDP, military expenditure or sales values. Never show TIV as dollars |
| ACLED | ACLED | https://acleddata.com/eula/ | Account; automated access only through ACLED's API | EULA (last updated 1 November 2026): "Commercial entities may not access or use the Content and/or Platforms" without a corporate licence; shared outputs "must be transformative, such that they cannot be reverse engineered"; follow the Attribution Policy | API and platforms | Not checked today | A studio is a commercial entity: plan for a corporate licence or use UCDP. Re-read the EULA; it changed this month |
| Correlates of War | COW Project | https://correlatesofwar.org/data-sets/ | Free download | "Data are not to be used for any commercial activity"; no redistribution without written permission; cite per dataset | Per dataset | Versioned (e.g. National Material Capabilities v7.0, State System Membership v2024, War Data 1816-2007 v4.0) | Non-commercial only, so useful for research and prototypes, not for shipping data in a paid game without permission |

## Models and numbers for simulation

- **Lanchester's laws** (Lanchester, 1916; Osipov independently). Square law for aimed long-range fire: dA/dt = -βB, dB/dt = -αA, so fighting power scales with the square of numbers. Linear law for one-on-one or unaimed area fire. Stated limits: does not apply to whole armies where not all troops engage, nor to machine guns, unguided artillery or nuclear weapons. Use it for quick auto-resolve between similar forces only.
- **Combat results table (CRT).** Attack strength over defence strength selects a column (less often the difference), a die roll selects the row; results include elimination, retreat or advance, surrender, partial losses. It shows the player the odds honestly.
- **Kriegsspiel.** Reisswitz's 1812 prototype (porcelain terrain, troop blocks) and his son's 1824 rules with dice, maps and an umpire who keeps hidden positions secret to simulate fog of war. Verdy du Vernois's free Kriegsspiel (1876) dropped most rules and dice in favour of umpire judgment. The umpire maps to a game master or an AI adjudicator.
- **OODA loop** (John Boyd, early 1970s): observe, orient, decide, act. Useful as a tempo lens; its critics call it vague, "not incorrect, but neither is it unique or especially profound" (Hankins, quoted on Wikipedia).
- **Fog of war as data quality.** Late, partial and wrong reports teach more than black tiles. This is a design recommendation, not a sourced number.
- **Supply.** Model supply as a flow with range and consumption per unit per turn, and let the player cut it. Hearts of Iron IV lists supply lines among combat factors. This is design guidance; take real consumption rates from period sources via `history-expert`.

## Standards and expert sources

- US Naval War College: wargaming "since 1887", "more than 50 gaming events per year", from "complex, multi-sided computer-assisted games to simple, single-sided seminar games"; games "foster an understanding of the decisions" leaders make.
- UK Ministry of Defence, *Wargaming Handbook* (first published 4 August 2017, updated 30 August 2017): wargaming at national strategic, strategic, operational and tactical levels, for education and training, planning and decision-making. From the PDF (DCDC, August 2017): "Wargaming is a decision-making technique" (1.5); elements are aim and objectives, setting and scenario, players ("Player decisions drive all wargames"), simulation, rules, procedures and adjudication, data and sources, supporting personnel and experts, and analysis (1.9); "Wargames are not predictive" (1.19); the design process "should determine the analysis plan" (2.17), and "An analysis plan should exist for both training and analytical wargames". Adjudication methods: free, rigid, semi-rigid, minimal/consensual (3.11).
- UCDP for conflict events and deaths (commercial-friendly licence); SIPRI for spending and arms-transfer volumes (permission for commercial use); COW and ACLED with the licence limits above.

## Accuracy vs fun

Acceptable simplifications:
- One CRT with terrain column shifts instead of per-weapon modelling.
- Abstract supply ("in supply" or not) traced to a depot.
- Fictional conflicts and fictional units in a realistic setting.
- Compressed time per turn, stated clearly.

Trust breakers for military readers:
- Infinite ammunition and fuel; no logistics at all.
- Lanchester's square law used for whole armies or mixed forces.
- Perfect intelligence of enemy positions.
- Real weapon statistics taken from leaked or restricted documents.
- SIPRI TIV shown as money.

Fun levers that are also accurate: cut supply lines, delayed orders, unreliable reports, reserves, the umpire's hidden information, civilian consequences that matter (as in Arma 3's Laws of War and This War of Mine).

## What games get wrong

- Treating attrition maths as the whole of war; Lanchester himself scoped his laws narrowly.
- Forum-sourced weapon data. War Thunder's forums saw repeated leaks, including a Challenger 2 armour document in July 2021 that moderators removed because the UK Ministry of Defence had already said it was classified; later leaks included export-restricted (not classified) material. Gaijin's rules prohibit classified information and "Export-restricted military-technical data", and the article says Gaijin will not use such material to change vehicles.
- Civilians as scenery. This War of Mine (2014), inspired by the Siege of Sarajevo, is the counter-example; in 2020 Poland's Chancellery of the Prime Minister added it to recommended high-school reading.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Kriegsspiel | 1824 | Georg von Reisswitz | Umpire, hidden information, dice and loss tables; adopted by the Prussian army | https://en.wikipedia.org/wiki/Kriegsspiel |
| Tactics II | 1958 | Charles S. Roberts (Avalon Hill) | Roberts' 1958 board wargame; he formed Avalon Hill to publish it. Its rules compute "the odds at which the opposing units are fighting", then a die roll "plus the odds ratio" is read on the Combat Results Table (rulespal.com rulebook transcription; edition not stated) | https://en.wikipedia.org/wiki/Tactics_II |
| This War of Mine | 2014 | 11 bit studios | Civilian experience of war rather than frontline combat | https://en.wikipedia.org/wiki/This_War_of_Mine |
| Hearts of Iron IV | 2016 | Paradox Development Studio | Grand-strategy production (civilian factories build military factories and dockyards), customisable divisions | https://en.wikipedia.org/wiki/Hearts_of_Iron_IV |
| Arma 3: Laws of War | 2017 (DLC) | Bohemia Interactive with the ICRC | Humanitarian demining, bomb disposal, civilian harm; part of earnings went to the Red Cross ($176,667 total) | https://en.wikipedia.org/wiki/Arma_3 |

## Sensitive topics and legal

- Ongoing conflicts: avoid real current wars as playable scenarios without a clear purpose and review by `narrative-director` and `game-legal-advisor`.
- War crimes and civilians: depict consequences, never reward atrocities; the Arma 3 and ICRC collaboration is the reference for international humanitarian law in play.
- Classified and export-controlled data: never use it, never ask players for it, remove it if posted to your forums, as Gaijin does.
- Real weapons, vehicles and unit insignia: trademarks and manufacturer rights; route to `game-legal-advisor`.
- Data licences: UCDP CC BY 4.0 with citations; SIPRI commercial use needs authorisation and usually a royalty; COW is non-commercial only; ACLED needs a corporate licence for companies.

## How to check this is current

- UCDP: read the downloads page for dataset versions and the API docs for token, rate limit and latest version.
- SIPRI: check the Milex revision date and Arms Transfers update date; re-read the terms.
- ACLED: re-read the EULA "Last Updated" date and the commercial clauses.
- COW: re-read the data-sets page terms and versions.
- Naval War College and MoD: check for newer wargaming publications.
- Games: Wikipedia infoboxes and developer sites.
