---
name: historical-accuracy-pass
description: Audits a historical setting for anachronisms by tier, builds a primary-source list, a deliberate-departures register, and sensitivity flags. Use before locking a period setting.
owner: history-expert
disable-model-invocation: true
argument-hint: "<setting brief, place, year> [asset list or script]"
---

# Historical accuracy pass

A repeatable audit of a setting brief, item list, script, or map against the period it claims.

## Inputs

- Place and year (or year range). If only an era name is given, pick a year for that region, state it, and ask for confirmation.
- Point of view (whose story) and intended accuracy level: classroom, enthusiast, or loosely inspired.
- The material to audit: brief, item list, dialogue, map, mechanic.

## Steps

1. Pin the setting: one place, one year, one POV. Write it at the top.
2. Split the material into three tiers: material culture (objects, food, clothing, technology, architecture), language (words, titles, names, forms of address), attitudes (beliefs, social norms, behaviour shown as normal).
3. For each item, check whether it existed and was available in that place and year, at that social level. Record issue, fix, and source.
4. Check maps: the borders, place names, and polities must match the year. Note the source map and its date.
5. Check numbers: travel times, prices relative to wages, population sizes, army sizes and supply. Flag any that are modern guesses.
6. Pull at least one primary source per major claim from an archive (Library of Congress, Europeana, Smithsonian Open Access, The Met, Internet Archive, Old Bailey Online, HathiTrust, David Rumsey Map Collection, Pleiades for ancient places). Record the rights statement of each item.
7. Note historiography: where scholars disagree, say so and name the positions rather than picking one silently.
8. Build the deliberate-departures register: each intentional change, the reason (fun, clarity, sensitivity, scope), and how players are told (codex entry, credits note, loading screen).
9. Sensitivity pass: atrocity and genocide depiction, slavery and colonialism, religion and sacred objects, indigenous cultures and consultation, extremist symbols (country-specific rating rules, for example Germany's USK), real persons and living descendants, propaganda or revisionist sources. Assign each flag an owner.
10. List open questions for a specialist historian or community consultant.

## Output

```
## Historical accuracy pass: <place, year, POV>
Accuracy level: <classroom / enthusiast / inspired>
| Tier | Item | Issue | Fix | Source |
Map check: <source map, date, issues>
Numbers check: <claim - status - source>
Primary sources:
| Title | Archive | URL | Date | Rights |
Historiography notes: <debate - positions>
Deliberate departures:
| Change | Reason | How signalled |
Sensitivity flags:
| Topic | Risk | Owner agent |
Open questions:
```

## Done when

- [ ] Place, year, and POV are stated.
- [ ] Every audited item is in a tier with a fix or an OK.
- [ ] Each major claim has at least one primary source with a rights statement.
- [ ] Unchecked claims are marked UNVERIFIED.
- [ ] Every intentional change is in the departures register with how it is signalled.
- [ ] Sensitivity flags have owners; legal ones go to `game-legal-advisor`.
