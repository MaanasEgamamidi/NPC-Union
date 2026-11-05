---
title: Healthcare, medicine and public health for games
tags: [healthcare, medicine, nursing, epidemiology, public-health, hospital-sim, serious-games, health-data]
sources:
  - https://www.who.int/data/gho/info/gho-odata-api
  - https://ghoapi.azureedge.net/api/Dimension
  - https://data.who.int/about/data/terms-and-conditions
  - https://wonder.cdc.gov/wonder/help/wonder-api.html
  - https://data.cdc.gov/
  - https://dev.socrata.com/docs/app-tokens.html
  - https://icd.who.int/icdapi
  - https://icd.who.int/docs/icd-api/license/
  - https://icd.who.int/en/docs/icd11-license.pdf
  - https://www.snomed.org/get-snomed
  - https://www.nlm.nih.gov/research/umls/rxnorm/index.html
  - https://www.nlm.nih.gov/research/umls/rxnorm/docs/rxnormfiles.html
  - https://lhncbc.nlm.nih.gov/RxNav/APIs/index.html
  - https://lhncbc.nlm.nih.gov/RxNav/TermsofService.html
  - https://open.fda.gov/apis/authentication/
  - https://open.fda.gov/terms/
  - https://physionet.org/content/mimiciv/3.1/
  - https://synthetichealth.github.io/synthea/
  - https://raw.githubusercontent.com/synthetichealth/synthea/master/README.md
  - https://hl7.org/fhir/
  - https://hl7.org/fhir/license.html
  - https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/denovo.cfm?id=DEN200026
  - https://en.wikipedia.org/wiki/Theme_Hospital
  - https://en.wikipedia.org/wiki/Two_Point_Hospital
  - https://en.wikipedia.org/wiki/Project_Hospital
  - https://en.wikipedia.org/wiki/Plague_Inc.
  - https://en.wikipedia.org/wiki/Surgeon_Simulator_2013
  - https://en.wikipedia.org/wiki/Trauma_Center:_Under_the_Knife
  - https://en.wikipedia.org/wiki/Pandemic_(board_game)
  - https://en.wikipedia.org/wiki/EndeavorRx
last_verified: 2026-11-05
---

# Healthcare, medicine and public health for games

For hospital management sims, emergency and triage games, outbreak and pandemic sims, and medical training or serious games. Owner: `healthcare-expert`.

## Datasets and APIs

| Name | Publisher | Access | Licence / terms (as stated) | Format | Cadence | Limit or pitfall |
|---|---|---|---|---|---|---|
| Global Health Observatory OData API (https://www.who.int/data/gho/info/gho-odata-api) | WHO | REST, no key. `https://ghoapi.azureedge.net/api/Indicator`, then `/api/<IndicatorCode>` | data.who.int datasets: "Creative Commons Attribution 4.0 International License (CC BY 4.0), with the additional terms" (no endorsement, no de-anonymising) | JSON (OData) | Per indicator; records carry a `Date` field | The doc examples filter `Dim1 eq 'MLE'` but live data uses `SEX_MLE`. Query `/api/DIMENSION/SEX/DimensionValues` first. Values often include uncertainty ranges as text ("48.1 [45.4-50.8]"); use `NumericValue`, `Low`, `High` |
| CDC WONDER API (https://wonder.cdc.gov/wonder/help/wonder-api.html) | CDC | POST XML query; must send consent to data use restrictions (`accept_datause_restrictions=true`) | CDC data use restrictions (consent required) | XML | Dataset-specific | Only national data via the API, no grouping by location for vital statistics. CDC asks for one query at a time, about every 2 minutes. The site blocked plain curl in testing |
| data.cdc.gov (https://data.cdc.gov/) | CDC | Socrata SODA API, app token optional (raises throttling limit, https://dev.socrata.com/docs/app-tokens.html) | Per dataset; check metadata | JSON, CSV | Per dataset | Some datasets are retired: the COVID-19 provisional death counts set says "This dataset is no longer updated". Read `data_updated_at`, not `updatedAt` |
| ICD-11 API (https://icd.who.int/icdapi) | WHO | REST, register for keys; local Docker deployment available | "Creative Commons Attribution-NoDerivs 3.0 IGO license (CC BY-ND 3.0 IGO)" | JSON | Annual releases (a 2026 release is listed) | Software must keep code, title and URI together; crosswalks and translations need a separate WHO agreement; no use to build a rival standard |
| SNOMED CT (https://www.snomed.org/get-snomed) | SNOMED International | Via national release centre or MLDS | Free in member countries; affiliate licence and possible fees elsewhere; web apps may need special permission | RF2 files | Periodic releases | Rarely needed for games. Do not ship a SNOMED subset in a global game without checking licence by territory |
| RxNorm and RxNav APIs (https://lhncbc.nlm.nih.gov/RxNav/APIs/index.html) | US NLM | REST, no key; optional UMLS key | APIs: "no license is needed" with one exception (SNOMED in RxClass). Full RxNorm files need a UMLS licence; the prescribable subset does not | JSON, XML; RRF files | Monthly full release, weekly updates | Max 20 requests per second per IP (100 with a UTS key); NLM recommends caching 12-24 hours |
| openFDA (https://open.fda.gov/apis/authentication/) | US FDA | REST; free key | "public domain ... Creative Commons CC0 1.0 Universal" except marked third-party content (e.g. GMDN device terms) | JSON | Varies by endpoint | Page says a key is required yet lists no-key limits (1,000 requests per day per IP); with a key 120,000 per day. Adverse event reports are not proof a drug caused the event |
| MIMIC-IV (https://physionet.org/content/mimiciv/3.1/) | PhysioNet / MIT | Credentialed access only | "PhysioNet Credentialed Health Data License 1.5.0" plus DUA; CITI "Data or Specimens Only Research" training | CSV | Versioned | Real de-identified ICU data. Not shippable in a game; use only for offline calibration if your team is credentialed |
| Synthea (https://synthetichealth.github.io/synthea/) | MITRE | Download samples or run the Java generator | Apache License 2.0 (README) | FHIR R4/STU3/DSTU2, C-CDA, CSV, Bulk FHIR ndjson | Ongoing development | Synthetic: realistic in pattern, not in individual detail. CSV export is off by default (`exporter.csv.export = true`) |
| HL7 FHIR (https://hl7.org/fhir/) | HL7 | Specification | FHIR licensed under CC0 (https://hl7.org/fhir/license.html) | JSON/XML resources | R5 (5.0.0) listed as current published version | Synthea exports R4; check which release your tools expect |
| LOINC | Regenstrief Institute | Download after account | Licence page blocked in this environment: UNVERIFIED | | | Lab and observation codes; only needed if you display lab tests by code |

## Standards and expert sources

- Classifications: ICD-11 for diagnoses (cite as WHO requires), SNOMED CT for clinical terms, RxNorm for US drug names, FHIR for record structure.
- Regulatory: FDA De Novo database record DEN200026 (EndeavorRx, "digital therapeutic software for attention deficit hyperactivity disorder", decision date 06/15/2020). Use the FDA databases, not press coverage, to check device status.
- Triage systems (START for mass casualty, five-level ED acuity scales such as ESI, the Manchester Triage System): look up current official handbooks before quoting criteria. UNVERIFIED in this file.
- Privacy: US HIPAA applies to covered entities and business associates; EU GDPR treats health data as a special category. Source pages not fetched here: UNVERIFIED, route to `game-legal-advisor`.
- Media guidance on suicide and self-harm (WHO and national bodies): not fetched here, UNVERIFIED; the general rules (no method detail, signpost help) are widely adopted.

## Accuracy vs fun

Acceptable simplifications:
- Compress time (a day per minute) as long as the order of events (triage, tests, treatment, discharge) is kept.
- Use comic, invented illnesses (Theme Hospital, Two Point Hospital) if they are obviously invented.
- Use deterministic compartment models (S, I, R) with a few tunable rates for outbreaks, and say what is ignored.
- Merge roles (one "doctor" class) in arcade games.

Trust breakers for clinicians:
- Real disease with a fake cure, or a real drug with a wrong effect.
- Resuscitation that almost always works.
- No bed or discharge bottleneck; unlimited staff stamina.
- Diagnosis by a single magic scanner in a game that claims realism.
- R0 treated as a fixed property of a pathogen instead of depending on contacts and behaviour.

Fun levers that are also accurate: limited beds and boarding, staff fatigue and handover errors, test ordering as a cost-versus-certainty choice, outbreak response trade-offs (testing, isolation, vaccination supply).

## What games get wrong

- Television and games often show high CPR success. A 1996 NEJM study of US medical dramas found 75% of TV patients survived the immediate arrest and 67% appeared to survive to discharge (abstract seen via search, full paper not fetched: UNVERIFIED).
- Pathogen sims can be read as forecasts. In January 2020 Ndemic reminded players that Plague Inc. "was not on par with any scientific model" and pointed them to WHO (Wikipedia, Plague Inc.).
- Hospital sims tend to drop discharge and boarding, so flow problems vanish. Speak generally; no single game is named here.
- Health claims slip into marketing ("reduces stress", "trains doctors") without evidence. EndeavorRx shows the real path: trials and FDA authorization.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Theme Hospital | 1997 | Bullfrog Productions | Room-based diagnosis and treatment chain, comic fictitious ailments, staff management | https://en.wikipedia.org/wiki/Theme_Hospital |
| Two Point Hospital | 2018 | Two Point Studios | GP office to diagnosis rooms to treatment flow; epidemics with limited vaccines; reputation as patient-arrival driver | https://en.wikipedia.org/wiki/Two_Point_Hospital |
| Project Hospital | 2018 | Oxymoron Games | Hospital sim focused on accurate medical procedures and departments; pathology DLC investigates deaths | https://en.wikipedia.org/wiki/Project_Hospital |
| Plague Inc. | 2012 | Ndemic Creations | Pathogen evolution against a cure timer; CDC invited the developer to talk in 2013; added a cure mode (The Cure) in November 2020 | https://en.wikipedia.org/wiki/Plague_Inc. |
| Surgeon Simulator | 2013 | Bossa Studios | Deliberately clumsy physics comedy; shows how far from realism a medical theme can go when it is clearly a joke | https://en.wikipedia.org/wiki/Surgeon_Simulator_2013 |
| Trauma Center: Under the Knife | 2005 | Atlus | Touchscreen surgery steps under time limits, fictional disease (GUILT), visual-novel framing | https://en.wikipedia.org/wiki/Trauma_Center:_Under_the_Knife |
| Pandemic (board game) | 2008 | Matt Leacock (designer), Z-Man Games | Cooperative outbreak response, epidemic card reshuffle that makes recent cities flare again, role powers | https://en.wikipedia.org/wiki/Pandemic_(board_game) |
| EndeavorRx | 2020 (FDA) | Akili Interactive | Prescription game-based device for ADHD ages 8-12; the regulatory line a "health game" crosses | https://en.wikipedia.org/wiki/EndeavorRx |

## Sensitive topics and legal

- Not medical advice: every medical game needs a fiction / not-advice line in game and on the store page.
- Self-harm, suicide, overdose, eating disorders: no method detail, no reward for harm, signpost help lines for each sale region, content warnings.
- Patient privacy: never use real patient records. Synthetic data (Synthea) is the default. Credentialed datasets (MIMIC-IV) cannot ship.
- Device claims: treat, cure, diagnose, prevent or mitigate a condition can make software a medical device (FDA, EU MDR). Hand off to `game-legal-advisor` before any health benefit wording.
- Real institutions and logos (WHO, CDC, real hospitals): no implied endorsement; WHO data terms forbid it.
- Children and death: handle child patients and grief with care; offer warnings and opt-outs.
- Misinformation during real outbreaks: be ready to add pointers to official health sources, as Ndemic did.

## How to check this is current

- WHO GHO: call `https://ghoapi.azureedge.net/api/Dimension` and an indicator with `?$top=2`; read data.who.int terms.
- ICD: check the ICD API home page for the current release and API version; read the licence page.
- openFDA: re-read the authentication page for limits; test `https://api.fda.gov/drug/event.json?limit=1`.
- RxNav: re-read the Terms of Service for rate limits.
- FHIR: open `https://hl7.org/fhir/` and read which version is "current published".
- Device status: search the FDA De Novo, 510(k) and PMA databases by product name.
- Games: check Wikipedia infoboxes and the developer site for dates and updates.
