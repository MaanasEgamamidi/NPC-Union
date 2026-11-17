---
title: Sports science, athlete modelling and sports data for games
tags: [sports-science, exercise-physiology, training-load, injury-model, sports-analytics, exergames, sports-data, football-manager]
sources:
  - "https://raw.githubusercontent.com/statsbomb/open-data/master/README.md"
  - "https://github.com/statsbomb/open-data"
  - "https://raw.githubusercontent.com/statsbomb/open-data/master/LICENSE.pdf"
  - "https://github.com/SkillCorner/opendata"
  - "https://github.com/metrica-sports/sample-data"
  - "https://www.retrosheet.org/notice.txt"
  - "https://sabr.org/lahman-database/"
  - "https://sabr.org/terms-of-use/"
  - "https://pacompendium.com/"
  - "https://www.who.int/news-room/fact-sheets/detail/physical-activity"
  - "https://www.who.int/publications/i/item/9789240015128"
  - "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1136/bjsports-2020-102955&resultType=core&format=json"
  - "https://www.trainingpeaks.com/learn/articles/the-science-of-the-performance-manager/"
  - "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1123/ijspp.2019-0864&resultType=core&format=json"
  - "https://pmc.ncbi.nlm.nih.gov/articles/PMC7534938"
  - "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:32299793&resultType=core&format=json"
  - "https://en.wikipedia.org/wiki/Wii_Fit"
  - "https://en.wikipedia.org/wiki/Football_Manager"
  - "https://en.wikipedia.org/wiki/Football_Manager_25"
  - "https://en.wikipedia.org/wiki/Ring_Fit_Adventure"
  - "https://en.wikipedia.org/wiki/Beat_Saber"
  - "https://en.wikipedia.org/wiki/Out_of_the_Park_Baseball"
last_verified: 2026-11-16
---

# Sports science, athlete modelling and sports data for games

For sports management sims, athlete attributes, fatigue, form, injury and ageing models, exergames, and choosing sports data. Owner: `sports-science-expert`. Genre structure and match engines belong to `knowledge/genres/sports.md` and `sports-game-expert`.

## Datasets and APIs

| Name | Publisher | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|
| StatsBomb open data (https://github.com/statsbomb/open-data) | StatsBomb Services Ltd | GitHub download; registration of interest requested | README: credit StatsBomb and use its logo; for "research projects and genuine interest". `LICENSE.pdf` (User Agreement, updated 8 Sep 2023): the user may not "commercially exploit the data or any analysis derived" from it, nor distribute it to third parties | JSON (events, lineups, 360 frames for selected matches) | Irregular additions | Research and non-commercial analysis only, with the logo credit. Calibrating or prototyping a commercial game with it is still commercial use: get written consent, and route to `game-legal-advisor` |
| SkillCorner open data (https://github.com/SkillCorner/opendata) | SkillCorner | GitHub download | Repository is MIT licensed; README asks you to credit SkillCorner | JSON, JSONL tracking, CSV events | Sample | 10 A-League 2024/25 matches of broadcast tracking at 10 fps, coordinates in metres from pitch centre, plus season physical aggregates. Broadcast tracking is extrapolated from video, so off-screen players are estimated |
| Metrica Sports sample data (https://github.com/metrica-sports/sample-data) | Metrica Sports | GitHub download | No licence named; "If you use it for anything public, please aknowledge the source" (sic) | CSV; game 3 in FIFA EPTS format with JSON events | Static | Three sample games of synchronised tracking and event data; positions 0-1 on a 105 x 68 m pitch. No licence means rights are unclear for a shipped product |
| Retrosheet (https://www.retrosheet.org/notice.txt) | Retrosheet | Download | Any use including commercial, if the notice appears prominently: "The information used here was obtained free of charge from and is copyrighted by Retrosheet. Interested parties may contact Retrosheet at "www.retrosheet.org"." | Event files, CSV | Corrected over time | No accuracy guarantee; data is "subject to correction" |
| Lahman Baseball Database (https://sabr.org/lahman-database/) | SABR | Download | No licence stated on the page; footer "© 2026 SABR. All Rights Reserved"; Negro Leagues data "licensed from Seamheads.com". SABR's site Terms of Use (https://sabr.org/terms-of-use/, read 2026-11-16) allow site Content "solely for your personal, noncommercial use" but do not name the Lahman Database, so the licence for the download is UNVERIFIED. The release documentation linked from the page is a box.com file that redirects to a download, so it was not opened (2026-11-16) | SQL, Access, CSV | Annual (2025 version released 2 January 2026) | Major league batting and pitching back to 1871. Check terms with SABR before shipping |
| Compendium of Physical Activities (https://pacompendium.com/) | Compendium team | Web, download | Adult, Older Adult and Wheelchair compendia "free to use for commercial purposes"; cite the site; "do not change MET values or combine activities with different MET levels" | Tables | 2024 edition (published January 2024) | 1 MET = 1 kcal/kg/hour (about 3.5 ml O2/kg/min). Older adult (60+) and wheelchair compendia are separate |

## Standards and expert sources

- Physical activity guidelines (WHO 2020, Bull et al., Br J Sports Med 54(24):1451-62): children and adolescents "an average of 60 min/day" of moderate-to-vigorous aerobic activity; adults 150-300 min moderate or 75-150 min vigorous per week. The WHO fact sheet (dated 4 November 2026) says 31% of adults and 86% of adolescents do not meet recommended levels.
- Fitness-fatigue (Banister impulse-response) model: performance = baseline + fitness term - fatigue term, each a decaying sum of past training doses with a gain and time constant; fatigue has the larger gain and the shorter time constant (TrainingPeaks summary). TrainingPeaks' Performance Management Chart uses defaults of 42 days (CTL, fitness) and 7 days (ATL, fatigue). These are software defaults, not physiological constants; fit them to your game's calendar.
- Acute:chronic workload ratio (ACWR): Impellizzeri et al. (IJSPP 2020, PMID 32502973) state "There is no evidence supporting the use of ACWR in training-load-management systems" and that its ratio properties make it "an inaccurate metric". The Part 2 commentary (J Athl Train 2020, PMC7534938) adds that the ratio was derived from the Banister model without justification and that time-window choices overfit. Use a load spike as a readable warning, not an injury predictor.
- Injury risk (Green et al., BJSM 2020, 78 studies, 71,324 athletes, 8,319 hamstring strain injuries): any history of hamstring injury RR 2.7, recent hamstring injury RR 4.8, previous ACL injury RR 1.7, previous calf strain RR 1.5, older age also significant. "Older age and a history of HSI are the strongest risk factors."

## Accuracy vs fun

Acceptable simplifications:
- 1-20 or 1-100 attribute scales, grouped physical, technical, mental.
- Two decaying load sums (fitness and fatigue) with tuned time constants.
- Injury bands (days, weeks, months) instead of named diagnoses.
- Exergame calories shown as a rough MET-based range, labelled as an estimate.

Trust breakers for coaches and analysts:
- Players who never tire, or one stamina bar for both match fitness and sharpness.
- Injuries rolled independently, ignoring previous injury and age.
- ACWR presented as a validated injury predictor.
- Off-ball positioning models claimed from event data only (event data records on-ball actions; tracking data records every player).
- Precise calorie claims from body weight times a guessed rate.

## What games get wrong

- Body metrics that shame: Wii Fit's BMI calculation labelled a UK child overweight, parents complained, and Nintendo apologised for any offence (Wikipedia). Make weight and BMI opt-in and default to performance and consistency measures.
- Reusing "free" data that is not free for commercial use. StatsBomb's agreement forbids commercial exploitation of the data and of analysis derived from it.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Football Manager series | 2004 (FM2005) | Sports Interactive | Deep attribute and squad sim; Everton agreed in 2008 to use its database for scouting. FM25 was postponed twice and cancelled in February 2025; FM26 released 4 November 2025, so check which edition is current | https://en.wikipedia.org/wiki/Football_Manager |
| Out of the Park Baseball | 1999 | Out of the Park Developments | Baseball management; MLB and MiLB licences from OOTP 16 (2015), MLBPA from OOTP 17 | https://en.wikipedia.org/wiki/Out_of_the_Park_Baseball |
| Ring Fit Adventure | 2019 | Nintendo EPD | Exercise as turn-based combat input via Ring-Con strain sensor and leg strap; quiet mode swaps running for squats | https://en.wikipedia.org/wiki/Ring_Fit_Adventure |
| Wii Fit | 2007 | Nintendo EAD | Fitness game with body-metric feedback; cautionary BMI terminology | https://en.wikipedia.org/wiki/Wii_Fit |
| Beat Saber | 2019 (full) | Beat Games | Short song-length bouts with rest between, the shape of interval training | https://en.wikipedia.org/wiki/Beat_Saber |

## Sensitive topics and legal

- Health claims: "burns X calories", "improves fitness" or "prevents injury" need evidence and legal review; route to `game-legal-advisor` and `healthcare-expert`.
- Body image and eating disorders: no weight-loss pressure, no shaming language, body metrics opt-in.
- Real athletes, clubs and leagues: names, faces and badges are licensed separately (OOTP needed MLB and MLBPA deals). Fictional by default.
- Gambling adjacency: odds, fantasy and betting tie-ins go to `game-legal-advisor`.
- Data terms: StatsBomb (non-commercial, no redistribution), Metrica (no licence named), Lahman (licence unstated) are the risky ones; Retrosheet and SkillCorner (MIT) are the permissive ones checked here.

## How to check this is current

- StatsBomb: re-read the README and LICENSE.pdf date (8 September 2023 at last check).
- Retrosheet: re-read notice.txt for the exact notice text.
- Lahman: check the SABR page and the download's readme for a licence.
- Compendium: check pacompendium.com for a newer edition and the terms of use.
- WHO: check the fact sheet date and the guideline publication for revisions.
- Research: look for newer reviews on ACWR and injury risk factors via Europe PMC.
