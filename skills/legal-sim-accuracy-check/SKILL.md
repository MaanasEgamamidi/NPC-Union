---
name: legal-sim-accuracy-check
description: Audits a courtroom, legislature, or election mechanic against real procedure, current numbers, data licences, and neutrality rules. Returns a fix list.
owner: law-civics-expert
disable-model-invocation: true
argument-hint: "<mechanic or design doc> [jurisdiction] [audience]"
---

# Legal sim accuracy check

A repeatable audit for any game system that depicts law, government, or elections.

## Inputs

- The mechanic or design doc (rules text, flow chart, or a playable description).
- Jurisdiction: a real one, or "fictional, based on X". If missing, ask once; if still missing, assume fictional and say so.
- Audience: schools, general, adult. Commercial or non-commercial.
- Any real people, parties, courts, or datasets named in the game.

## Steps

1. Classify the model: adversarial or inquisitorial; jury, bench, or mixed (lay judges); presidential or parliamentary; FPTP, RCV/IRV, list PR, or other.
2. Write the 3-5 rules that must hold for that model (who decides guilt, burden of proof, vote thresholds, veto and override, upper-house powers). Cite a fetched source for each.
3. Compare each game rule to the list. Mark each MATCH, SIMPLIFIED (acceptable), or WRONG (breaks expert trust).
4. Check base rates against live data: plea and trial rates (Pew/AO US Courts), bill passage (congress.gov API counts), election returns (MEDSL), democracy scores (V-Dem). Record URL and date.
5. Check vocabulary: no "jury" where there is none, no "objection" mechanics in a dossier-led system unless labelled as stylised.
6. Data licence check for every dataset used: Public Domain Mark, CC0, OGL v3.0, CC BY-SA (share-alike), CC BY-NC (no commercial). Flag any NC or SA conflicts with a commercial release.
7. Neutrality check for civics or school use: are policy outcomes framed as facts or as trade-offs? Do both major value positions get a winning path? Are parties fictional or evenly treated?
8. Real-person check: list every real politician, judge, or official. Flag defamation and likeness risk; send to `game-legal-advisor`.
9. Misinformation check for election content: no false claims about how, when, or where to vote; real voting rules described must be current and sourced.
10. Add the "not legal advice" line where players might act on the content.

## Output

```
## Legal sim check: <game / mechanic>
Model: <classification>
Rules that must hold:
- <rule> (source, date)
Rule audit:
| Game rule | Real rule | Verdict | Fix |
Base rates: <stat, source, date>
Data licences: <dataset, licence, OK/conflict>
Neutrality: <findings>
Real people: <names, risk, sent to game-legal-advisor?>
Misinformation risk: <findings>
UNVERIFIED items: <list>
```

## Done when

- [ ] Every game rule has a verdict and a fix where WRONG.
- [ ] Every number has a URL and check date.
- [ ] Every dataset has a licence and commercial-use verdict.
- [ ] Neutrality and real-person checks are written, even if "none found".
- [ ] Unchecked items are marked UNVERIFIED.
