---
title: Education and learning games
tags: [education, learning-science, edtech, coppa, ferpa, standards, assessment, udl]
sources:
  - https://en.wikipedia.org/wiki/Bloom%27s_taxonomy
  - https://shura.shu.ac.uk/3556/
  - https://eprints.whiterose.ac.uk/id/eprint/189921/
  - https://en.wikipedia.org/wiki/Testing_effect
  - https://en.wikipedia.org/wiki/Spacing_effect
  - https://en.wikipedia.org/wiki/Cognitive_load
  - https://myweb.fsu.edu/vshute/pdf/IJT.pdf
  - https://www.thecorestandards.org/Math/Content/6/RP/
  - https://www.nextgenscience.org/three-dimensions
  - https://udlguidelines.cast.org/
  - https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa
  - https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions
  - https://www.govinfo.gov/content/pkg/FR-2025-04-22/html/2025-05904.htm
  - https://gdpr-info.eu/art-8-gdpr/
  - https://studentprivacy.ed.gov/ferpa
  - https://www.1edtech.org/standards/lti
  - https://www.esrb.org/ratings-guide/
  - https://pegi.info/what-do-the-labels-mean
  - https://nces.ed.gov/ccd/
  - https://educationdata.urban.org/documentation/
last_verified: 2026-11-05
---

# Education and learning games

Reference for `education-expert`. Learning science, standards, data, classroom constraints, and child-privacy law for game makers.

## Datasets and APIs

| Name | Publisher | URL | Access | Licence / terms | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|---|
| Common Core of Data (CCD) | NCES (US Dept. of Education) | https://nces.ed.gov/ccd/ | Download, CCD Data File Tool | US federal statistics; licence wording not checked on page (UNVERIFIED) | CSV / data files | Annual | About 100,000 public schools and 18,000 districts; school-level, no student data |
| Education Data Portal API | Urban Institute | https://educationdata.urban.org/documentation/ | REST API by URL, or Stata / R; no key stated | See "Data Policy and Terms of Use" on the page (exact licence not recorded, UNVERIFIED) | JSON | Follows source releases | Aggregates CCD and other sources; check source-year coverage per endpoint |
| Common Core State Standards | Common Core State Standards Initiative | https://www.thecorestandards.org/Math/Content/6/RP/ | Web pages per grade and domain | Terms not checked (UNVERIFIED) | HTML with stable codes (e.g. CCSS.Math.Content.6.RP.A.1) | Rarely changes | States adopt and modify; check the state's version |
| NGSS | NGSS Lead States | https://www.nextgenscience.org/three-dimensions | Web pages | Terms not checked (UNVERIFIED) | HTML; performance expectations combine three dimensions | Rarely changes | Each standard is three-dimensional; a game that only covers content (core ideas) misses practices |
| OpenStax textbooks | Rice University | https://openstax.org/license | Download | Reported as CC BY 4.0 (UNVERIFIED: page returned no readable content) | PDF, web | Editions | Logo and name are trademarks; check before use |
| PhET simulations | University of Colorado Boulder | https://phet.colorado.edu/en/licensing | Web, download | Reported as CC BY 4.0 (UNVERIFIED: page is a script app, licence text not read) | HTML5 sims | Ongoing | Older Java/Flash sims differ; check per sim |
| Khan Academy | Khan Academy | none | No public API known (UNVERIFIED: GitHub repo blocked in this environment) | n/a | n/a | n/a | Do not plan a game around Khan Academy data |

## Standards and expert sources

- **Bloom's taxonomy, revised 2001:** Remember, Understand, Apply, Analyze, Evaluate, Create (Krathwohl 2002 overview). https://en.wikipedia.org/wiki/Bloom%27s_taxonomy
- **Intrinsic integration:** Habgood and Ainsworth (2011), Journal of the Learning Sciences 20(2), 169-206. Zombie Division teaches division to 7 to 11 year olds through combat: each attack is a divisor, and the right attack splits a skeleton's number into whole parts. Study 1: 58 children, intrinsic vs extrinsic (identical multiple-choice questions between levels) vs control, two hours; intrinsic learned more. Study 2: 16 children with free choice played the intrinsic version over seven times longer. https://shura.shu.ac.uk/3556/
- **Mechanism update:** Cutting and Iacovides (2022), pre-registered, n=210, Pacman-like game: learning higher with intrinsic integration, no significant motivation or cognitive load effect; attention is the proposed mechanism. https://eprints.whiterose.ac.uk/id/eprint/189921/
- **"Chocolate-covered broccoli":** Habgood and Ainsworth attribute the phrase to Bruckman, "Can educational be fun?", GDC 1999.
- **Testing effect:** Roediger and Karpicke (2006), Psychological Science 17(3). https://en.wikipedia.org/wiki/Testing_effect
- **Spacing effect:** Cepeda et al. (2006): spaced practice beat massed in 259 of 271 cases. https://en.wikipedia.org/wiki/Spacing_effect
- **Cognitive load theory:** Sweller, late 1980s; intrinsic, extraneous, germane load; worked-example, split-attention and expertise-reversal effects. https://en.wikipedia.org/wiki/Cognitive_load
- **Evidence-centered design for games:** Kim, Almond and Shute (2016), International Journal of Testing: 10-step ECD procedure for Physics Playground, Bayesian networks for scoring; competency, evidence, and task models. https://myweb.fsu.edu/vshute/pdf/IJT.pdf
- **UDL:** CAST UDL Guidelines 3.0, released 30 July 2024; three principles (Engagement, Representation, Action and Expression). Version 2.2 is still on the downloads page. https://udlguidelines.cast.org/
- **LTI 1.3 / LTI Advantage (1EdTech):** Assignment and Grade Services (gradebook columns and scores), Names and Role Provisioning Services (rosters), Deep Linking (teacher picks content). https://www.1edtech.org/standards/lti

## Accuracy vs fun

Acceptable simplifications:
- Restricting choices (Zombie Division offers only three divisors at a time) to keep load manageable.
- Fantasy themes, as long as the win condition requires the skill.
- Fading scaffolds and adaptive difficulty driven by mastery evidence.

Trust breakers for teachers and researchers:
- Quiz gates between unrelated gameplay.
- Mechanics that reward guessing or brute force without cost.
- Content errors (wrong formula, wrong vocabulary for the grade).
- Claims of learning gains without a comparison group, an external pre/post test, and a delayed test.
- Reporting only stars and completion as "mastery".

## What games get wrong

- The extrinsic quiz-gate pattern, tested directly by Habgood and Ainsworth: same questions, less learning, far less voluntary play.
- Rewards for speed that push children to guess.
- Monetization and engagement loops in children's learning products. A specific criticism of Prodigy Math by advocacy groups is widely reported, but this build did not fetch the source (UNVERIFIED); speak generally unless verified.
- Sessions longer than a class period with no mid-level save.
- Dependence on installs, WebGL features, or domains blocked by school filters.

## Reference games

Details below were not fetched in this build; confirm each on Wikipedia or the official site before citing (all UNVERIFIED).

| Game | Year | Developer | What to study |
|---|---|---|---|
| The Oregon Trail | 1971 (later MECC versions) | MECC | Resource trade-offs as history; consequences that stick |
| DragonBox Algebra 5+ | 2012 | WeWantToKnow | Algebra rules as card manipulation before symbols appear |
| Minecraft Education | 2016 | Mojang Studios / Microsoft | Teacher controls, classroom worlds, LMS integration |
| Kerbal Space Program (KSP EDU) | 2015 (full release) | Squad | Orbital mechanics learned by failing launches |
| Zoombinis (The Logical Journey of the Zoombinis) | 1996 | TERC / Brøderbund | Logic puzzles with no text instructions |
| Duolingo | 2011 | Duolingo | Streaks and spaced review; study where gamification helps retention and where it pushes shallow practice |

## Sensitive topics and legal

- **COPPA (US):** applies to services directed to children under 13 or with actual knowledge of under-13 users. Child-directed services treat all visitors as children; mixed-audience services may use a neutral age screen not defaulting to 13+; persistent identifiers are personal information (FTC COPPA FAQ).
- **2025 COPPA amendments:** effective 23 June 2025; compliance by 22 April 2026 (most provisions). Added separate verifiable parental consent for third-party disclosures not integral to the service, and a written data retention policy. The FTC did not finalize the ed-tech and school authorization proposals and continues to enforce under existing guidance. https://www.govinfo.gov/content/pkg/FR-2025-04-22/html/2025-05904.htm
- **Schools as consenting agents:** limited to the educational context, "for the use and benefit of the school, and for no other commercial purpose" (FAQ section N). The operator, not the school, is responsible for compliance.
- **FERPA:** governs education records held by schools; ed-tech vendors typically receive data under the "school official" provisions. https://studentprivacy.ed.gov/ferpa
- **GDPR Article 8:** consent-based processing for information society services offered directly to children needs parental authorization under 16; member states may lower this to no less than 13. https://gdpr-info.eu/art-8-gdpr/
- **UK Age Appropriate Design Code (ICO):** applies to services likely to be accessed by under-18s (UNVERIFIED: ICO site blocked).
- **Ratings:** ESRB lists In-Game Purchases and other Interactive Elements that do not change the rating; PEGI labels include In-game purchases and Paid random items descriptors.
- Hand off to `game-legal-advisor` for: any under-13 data collection, school contracts and data processing agreements, EU or UK child users, chat and user-generated content, purchases in a child-directed product.

## How to check this is current

- Re-read the FTC COPPA FAQ and rule page for post-2025 changes, especially ed-tech provisions.
- Check the Department of Education for FERPA rule changes.
- Check udlguidelines.cast.org for the current Guidelines version.
- Check 1edtech.org for the current LTI version.
- Re-confirm OpenStax and PhET licences on their licensing pages, per item.
- For any research claim, find the paper or an author's accepted version and quote numbers from it.
