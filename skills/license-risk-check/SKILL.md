---
name: license-risk-check
description: Audit every third-party asset, font and code library in a game build, record its licence and obligations, and rate the risk. Legal information only, not legal advice.
owner: game-legal-advisor
disable-model-invocation: true
argument-hint: "[project path or asset ledger] [ship platforms] [business model]"
---

# License risk check

A repeatable audit that turns a project folder into a licence ledger with risk ratings and lawyer questions. It is legal information, not legal advice. Every report ends by recommending review by a qualified lawyer.

## Inputs

- Project path, or an existing asset ledger (CSV or table).
- Ship platforms and stores (for example Steam, Switch, iOS, Google Play).
- Business model: premium, free with ads, IAP, paid random items, or free with donations.
- Engine and version, plus any package manager files (Unity `Packages/manifest.json`, `package.json`, `Cargo.toml`, `vcpkg.json`).
- If any of these are missing, ask once, then proceed and list the gaps as assumptions.

## Steps

1. State the disclaimer: legal information, not legal advice, and a lawyer should review the result.
2. Inventory third-party material. Glob for licence files (`LICENSE*`, `COPYING*`, `NOTICE*`, `OFL*.txt`, `*license*`), font files (`.ttf`, `.otf`, `.woff*`), audio, textures, models, and package manifests. List each item with its folder.
3. For each item, record source (URL or vendor), author, licence identifier using SPDX names where possible, licence version, and date acquired. Unknown source means red until proven otherwise.
4. Read the licence text for each distinct licence. Do not rely on the short name. Note the version (CC BY 3.0 and 4.0 differ).
5. Write the obligations per item: attribution text, licence text to ship, NOTICE file, share-alike scope, source-offer duty, relinking duty, name restrictions (OFL Reserved Font Name), noncommercial or no-derivatives limits.
6. Check fit against platforms and business model:
   - Any NC licence with a price, ads, IAP or donations: red.
   - GPL or AGPL code in a console or iOS build: red.
   - LGPL statically linked on iOS or console: amber, lawyer question.
   - CC BY or CC BY-SA in a DRM or console build: amber, lawyer question on technical protection measures.
   - ND licence on anything you edited beyond format conversion: red.
   - CC0 or public domain with visible brands or real people: amber for trademark or personality rights.
7. Check the engine EULA tier and revenue thresholds against the current terms page. Mark the numbers UNVERIFIED unless just read from the source.
8. Rate each item green (obligations met or none), amber (obligation unmet or open question), or red (likely incompatible, replace or get a licence).
9. For each red item, propose a specific action: replacement under a named permissive licence, a commercial licence from the author, or removal.
10. Draft the LICENSES or third-party notices file and the credits lines from step 5.
11. List UNVERIFIED facts with the primary source to check, and write the lawyer questions.
12. Hand off: release-manager gets the notices file and checklist items, store-page-marketer gets attribution text, the owning programmer or artist gets replacement tasks.

## Output

```
Licence risk check: <project> (<date>)
Legal information, not legal advice. Have a qualified lawyer review before shipping.

Scope: <platforms> | <business model> | <engine and version>
Assumptions: <list>

| Item | Path | Source | Licence (SPDX, version) | Obligations | Risk | Action |
|---|---|---|---|---|---|---|

Red items: <count> | Amber: <count> | Green: <count>

UNVERIFIED facts to check:
- <fact> -> <primary source>

Questions for the lawyer:
1. <question>

Draft third-party notices: <file path or inline text>
Handoffs: <agent>: <task>
```

## Done when

- [ ] Disclaimer appears at the top and lawyer review is recommended.
- [ ] Every third-party asset, font and library found in step 2 has a row.
- [ ] Every row has a licence version, not just a family name.
- [ ] Every red item has a named action.
- [ ] Draft notices and credits text exist.
- [ ] Every jurisdiction or time-sensitive fact is marked UNVERIFIED or has a checked source and date.
- [ ] Handoffs are named.
