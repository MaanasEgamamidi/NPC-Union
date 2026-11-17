---
title: Law, courts, government and civics for games
tags: [law, civics, courtroom, legislature, elections, voting-systems, legal-data, constitutions, government-sim]
sources:
  - "https://wiki.free.law/c/courtlistener/help/api/rest/v4/overview"
  - "https://wiki.free.law/c/courtlistener/help/api/bulk-data/bulk-legal-data"
  - "https://github.com/LibraryOfCongress/api.congress.gov"
  - "https://api.data.gov/docs/developer-manual/"
  - "https://api.congress.gov/v3/bill/118?api_key=DEMO_KEY&format=json&limit=1"
  - "https://api.congress.gov/v3/law/118?api_key=DEMO_KEY&format=json&limit=1"
  - "https://www.legislation.gov.uk/developer"
  - "https://docs.openstates.org/api-v3/"
  - "https://electionlab.mit.edu/data"
  - "https://dataverse.harvard.edu/api/datasets/:persistentId/?persistentId=doi:10.7910/DVN/42MVDX"
  - "https://www.v-dem.net/data/the-v-dem-dataset/"
  - "https://www.constituteproject.org/content/about"
  - "https://www.constituteproject.org/content/data"
  - "https://www.pewresearch.org/short-reads/2023/06/14/fewer-than-1-of-defendants-in-federal-criminal-cases-were-acquitted-in-2022/"
  - "https://www.pewresearch.org/short-reads/2019/06/11/only-2-of-federal-criminal-defendants-go-to-trial-and-most-who-do-are-found-guilty/"
  - "https://www.senate.gov/about/powers-procedures/filibusters-cloture.htm"
  - "https://www.senate.gov/about/powers-procedures/filibusters-cloture/overview.htm"
  - "https://www.senate.gov/legislative/vetoes/vetoCounts.htm"
  - "https://www.archives.gov/founding-docs/constitution-transcript"
  - "https://www.moj.go.jp/EN/hisho/kouhou/20200115.html"
  - "https://www.moj.go.jp/EN/keiji1/saibanin_seido_gaiyou03.html"
  - "https://hakusyo1.moj.go.jp/en/59/nfm/n_59_2_6_0_2_1.html"
  - "https://hakusyo1.moj.go.jp/en/59/nfm/n_59_2_6_0_0_0.html"
  - "https://www.bakermckenzie.co.jp/wp/wp-content/uploads/ClientAlert_180921_Japanese_Plea_Barganing_System_E.pdf"
  - "https://www.fenwick.com/insights/publications/litigation-alert-california-superior-court-finds-use-of-likeness-of-former-panamanian-dictator-manuel-noriega-in-video-game-transformative"
  - "https://cbldf.org/2014/11/california-court-dismisses-noriegas-lawsuit-against-activision/"
  - "https://en.wikipedia.org/wiki/Parliament_Acts_1911_and_1949"
  - "https://en.wikipedia.org/wiki/Lay_judges_in_Japan"
  - "https://en.wikipedia.org/wiki/2022_Alaska%27s_at-large_congressional_district_special_election"
  - "https://en.wikipedia.org/wiki/Duverger%27s_law"
  - "https://en.wikipedia.org/wiki/Arrow%27s_impossibility_theorem"
  - "https://en.wikipedia.org/wiki/Phoenix_Wright:_Ace_Attorney"
  - "https://en.wikipedia.org/wiki/Papers,_Please"
  - "https://en.wikipedia.org/wiki/Suzerain_(video_game)"
  - "https://en.wikipedia.org/wiki/Democracy_(video_game)"
  - "https://en.wikipedia.org/wiki/ICivics"
last_verified: 2026-11-16
---

# Law, courts, government and civics for games

For courtroom and trial mechanics, legislature and government sims, election and voting-system models, constitutions, and civics games for schools. Owner: `law-civics-expert`. This is game content, not legal advice; the studio's own legal questions go to `game-legal-advisor`.

## Datasets and APIs

| Name | Publisher | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|
| CourtListener REST API v4 (https://wiki.free.law/c/courtlistener/help/api/rest/v4/overview) | Free Law Project | `https://www.courtlistener.com/api/rest/v4/`, header `Authorization: Token <token>` | See bulk data below for the dedication | JSON | Live | Authenticated limits: 5 requests per minute, 50 per hour, 125 per day, rolling windows, most restrictive applies. Too small for anything but a demo |
| CourtListener bulk data (https://wiki.free.law/c/courtlistener/help/api/bulk-data/bulk-legal-data) | Free Law Project | S3 bucket `com-courtlistener-storage`, `bulk-data/` prefix, `--no-sign-request` | Creative Commons Public Domain Mark 1.0, "free of known copyright restrictions" | CSV (PostgreSQL `COPY`), `schema.sql` | Full snapshots quarterly (last day of Mar, Jun, Sep, Dec) | Case law, dockets, judges, oral arguments, financial disclosures. Tables are exported separately while live, so files may not match each other exactly. Embeddings are about 2 TB |
| Congress.gov API v3 (https://github.com/LibraryOfCongress/api.congress.gov) | Library of Congress | api.data.gov key required | Not stated in the repo README | JSON, XML | Live | 5,000 requests per hour; 20 results per page by default, up to 250. `DEMO_KEY` is limited to 30 per hour and 50 per day per IP (api.data.gov manual) |
| legislation.gov.uk API (https://www.legislation.gov.uk/developer) | UK government (Crown copyright) | URIs such as `/id/ukpga/1999/17`, no key stated | Open Government Licence v3.0 except where stated; EUR-Lex-derived content under Commission Decision 2011/833/EU | XML and other formats | Live | A fair-use policy is linked but its limits were not read |
| Open States API v3 (https://docs.openstates.org/api-v3/) | Open States (accounts at open.pluralpolicy.com) | `https://v3.openstates.org/`, key required (`X-API-KEY` header or `apikey` param) | Data licence not stated on the docs page | JSON | Live | US states, DC, Puerto Rico; municipal support "limited". Rate limits not stated on that page |
| MEDSL election returns (https://electionlab.mit.edu/data) | MIT Election Data and Science Lab | Harvard Dataverse download | CC0 1.0 (checked on "U.S. President 1976-2024", v10.1, released 2026-09-04); check each dataset | Data files on Dataverse | Per election | House 1976-2024 by district; precinct-level returns for 2016, 2018, 2020, 2024. Licence not stated on the MEDSL page itself |
| V-Dem dataset (https://www.v-dem.net/data/the-v-dem-dataset/) | V-Dem Institute | Download | CC BY-SA 4.0 (share-alike on derived data) | CSV, Stata, R, SPSS | Annual (version 16, March 2026) | 531 V-Dem indicators plus indices in Country-Year Full+Others. Share-alike: a shipped table of derived democracy scores must carry the same licence |
| Constitute (https://www.constituteproject.org/content/about) | Comparative Constitutions Project | Web, XML data files, API (docs in a Google Doc) | CC BY-NC 3.0 Unported except third-party copyrighted material | XML, CSV export | Not stated | Non-commercial: a paid game needs permission to ship constitution text. Some translations used with permission from HeinOnline and Oxford |
| Federal Register API | US Office of the Federal Register | UNVERIFIED: federalregister.gov redirected our fetcher to an "unblock" page | UNVERIFIED | JSON | Daily | Check in a browser before relying on it |

## Standards and expert sources

- Pleas, not trials (US federal): in fiscal 2022, 89.5% of 71,954 defendants pleaded guilty, 8.2% had cases dismissed, 1.9% (1,379) were convicted at trial and about 0.4% (290) acquitted (Pew, 2023). In fiscal 2018, 2% went to trial; 38% of bench-trial defendants were acquitted versus 14% at jury trials, and only 12% of trial defendants had a bench trial. Trials fell from 7% of defendants in 1998 to 2% (Pew, 2019).
- US bill attrition: the congress.gov API on 2026-11-16 returned 19,315 measures for the 118th Congress (`/v3/bill/118`, all types including simple resolutions) and 274 laws (`/v3/law/118`).
- Senate cloture: three-fifths of "all senators duly chosen and sworn", 60 of 100. Cloture began in 1917 at two-thirds; 1975 lowered it to three-fifths. "The Senate adopted new precedents in the 2010s to allow a simple majority to end debate on nominations" (senate.gov cloture overview).
- Vetoes 1789 to present (senate.gov): 1,533 regular, 1,066 pocket, 2,599 total; 112 overridden. That is about 7% of regular vetoes, or 4.3% of all vetoes. State which denominator you use.
- Presentment (US Constitution, Art. I, §7, archives.gov transcript): a bill not returned "within ten Days (Sundays excepted)" becomes law "unless the Congress by their Adjournment prevent its Return, in which Case it shall not be a Law" (the pocket veto). Override needs two thirds of each House.
- UK Parliament Acts 1911 and 1949: a money bill passes after one month if the Lords do not pass it; other Commons bills passed in two successive sessions and rejected twice by the Lords can become law, with at least one year between second reading in the first session and final passage. Not covered: bills extending Parliament beyond five years, bills starting in the Lords, private bills (Wikipedia).
- Japan lay judges (saiban-in): in use since 21 May 2009 (MOJ White Paper on Crime 2010, Part 6); panels of three judges and six lay judges, or one judge and four lay judges in certain cases (same White Paper, Part 6, Section 2); a guilty finding needs a majority of the panel that includes at least one professional judge, and lay judges also decide the sentence (MOJ saiban-in overview). Defendants cannot waive it (Wikipedia).
- Japan conviction rate: the Minister of Justice's January 2020 response to the Wall Street Journal puts Japan's indictment ratio at 37% and explains that 99.3% is convictions divided by indictments, not by suspects. Quote the denominator with the number.
- Japan agreement system (from June 2018): a suspect or defendant gives evidence or testimony against third parties in exchange for charges being dropped or reduced; it gives no benefit for evidence about one's own crimes. It covers drug and firearm crimes and economic or financial crimes (bribery, fraud, antitrust, tax evasion, Financial Instruments and Exchange Act), excluding crimes punishable by death or life imprisonment (Baker McKenzie client alert, 21 September 2018; a law-firm summary, not the statute).
- Voting theory: Duverger's law says plurality in single-member districts tends toward two parties, a tendency with exceptions where regional parties win seats (Canada, UK, India). Arrow's theorem covers ranked (ordinal) methods, including plurality, instant-runoff, Borda and Condorcet; rated methods (score, approval) are outside its scope (Wikipedia).
- Instant-runoff example: Alaska's August 2022 at-large special election. Round 1: Peltola 39.66%, Palin 30.92%, Begich 27.84%; Begich eliminated. Final: Peltola 51.48%, Palin 48.52%. Begich was preferred by a majority over each opponent, a "center squeeze" (Wikipedia).

## Accuracy vs fun

Acceptable simplifications:
- Compress time, paperwork and appeals.
- Collapse a court's staff into a few roles.
- Fictional states built on a named real model (Papers, Please's Arstotzka, Suzerain's Sordland).
- One trial per chapter, if the game says trials are rare.

Rules that must hold, or the game teaches the wrong thing:
- Burden and standard of proof, and who decides guilt (jury, bench, mixed panel).
- Real vote thresholds (cloture, override, majority) for the system modelled.
- Adversarial (parties lead, judge referees) versus inquisitorial (judge-led file) kept consistent within one game.
- Most bills die; most criminal cases end in pleas or dismissals.

## What games get wrong

- Trials as the default outcome. US federal data show about 2% of defendants go to trial.
- Juries everywhere. Japan uses mixed lay-judge panels, not Anglo-American juries.
- Legislatures where most bills pass: 274 laws from 19,315 measures in the 118th Congress.
- Upper houses with an absolute veto where they have a delay only (UK Lords).
- Voting systems presented as neutral counters. The same ballots give different winners under plurality, instant-runoff and rated methods.
- Ace Attorney's courtroom is a stylised contradiction-hunting mechanic; one critic read it as commentary on Japan's very high conviction rate (Wikipedia). Treat it as design inspiration, not a model of procedure.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Phoenix Wright: Ace Attorney | 2001 | Capcom | Cross-examination: press statements, present contradicting evidence, penalty for wrong evidence | https://en.wikipedia.org/wiki/Phoenix_Wright:_Ace_Attorney |
| Papers, Please | 2013 | Lucas Pope (3909) | Applying changing daily rules to documents in a fictional state; moral cost of compliance | https://en.wikipedia.org/wiki/Papers,_Please |
| Suzerain | 2020 | Torpor Games | President of fictional Sordland; constitutional reform and re-election pressure | https://en.wikipedia.org/wiki/Suzerain_(video_game) |
| Democracy 4 | 2022 (full) | Positech Games | Policy sliders feeding overlapping voter groups; logic editable in CSV | https://en.wikipedia.org/wiki/Democracy_(video_game) |
| iCivics games | 2009 onward | iCivics (founded by Justice Sandra Day O'Connor) | Free classroom civics games such as Do I Have a Right? and Win the White House | https://en.wikipedia.org/wiki/ICivics |

## Sensitive topics and legal

- Neutrality in civics games for schools: present procedures, not party positions; give each side's strongest case if politics appears.
- Real politicians, judges and parties: fictionalise by default. Route any real-person depiction to `game-legal-advisor`. Precedent, not a licence: Noriega v. Activision Blizzard (No. BC 551747, Los Angeles Superior Court) was dismissed with prejudice on Activision's anti-SLAPP motion on 27 October 2014, the use of Noriega in Black Ops II found "transformative and protected under the First Amendment" (Fenwick); Noriega had sued in July 2014 (CBLDF).
- Licences: V-Dem share-alike and Constitute non-commercial terms affect shipped data; CourtListener bulk and MEDSL datasets checked here are public domain mark or CC0.
- Not legal advice: courtroom and rights games should say so, especially when aimed at teens.
- Criminal justice and race, policing, and immigration detention are live political topics; consult affected communities and avoid caricature.

## How to check this is current

- CourtListener: re-read the v4 overview for throttles and the bulk page for schedule and licence.
- Congress.gov: call `/v3/bill/<congress>` and `/v3/law/<congress>` with a key and record `pagination.count` and the date.
- senate.gov: re-read the veto table totals and the cloture page.
- Pew: look for a newer federal plea and trial short read.
- MEDSL: check the licence on each Dataverse dataset via the Dataverse API.
- V-Dem: note the current version on the dataset page.
- Federal Register: check in a browser and mark the date.
- Japan: moj.go.jp returned 403 to WebFetch but loaded with a browser user agent; look for a newer White Paper on Crime for the indictment ratio.
