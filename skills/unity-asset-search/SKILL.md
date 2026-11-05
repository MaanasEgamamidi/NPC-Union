---
name: unity-asset-search
description: Search the Unity Asset Store for assets and report price, licence, commercial use, Unity versions, pipelines and update date in one table.
owner: unity-store-scout
disable-model-invocation: true
argument-hint: "[what you need, Unity version, render pipeline, budget, team size]"
---

# Unity asset search

A repeatable procedure for shortlisting Unity Asset Store assets with licence facts attached.

## Inputs

- What the asset must do or look like.
- Target Unity version (for example 2022.3 LTS or Unity 6).
- Render pipeline: Built-in, URP or HDRP.
- Budget per asset and total.
- Team size and number of machines that will open the editor (needed for Extension Asset seats).
- Commercial plans: paid game, UGC platform, tokens or NFTs, AI training. Any of the last three needs licence review.

If Unity version, pipeline or team size is missing, ask once. If still missing, assume latest LTS and URP, and say so in Notes.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/unity-asset-store.md` for current licence and search facts.
2. Search https://assetstore.unity.com/search with the request terms. Use the category (2D, 3D, Add-Ons, Audio, Templates, Tools, VFX), Price, Rating and sale facets. Do not claim a Unity version or pipeline filter was used unless you saw it on the page.
3. Open each candidate page. Collect: exact asset name, URL, list price, sale price if any, licence type, Extension Asset or not, supported Unity versions, pipeline compatibility, latest version date, publisher.
4. If a page cannot be fetched, keep the row but mark the missing fields UNVERIFIED. Never fill a field from memory.
5. Apply seat rules: Editor Extension, Scripting and Services assets need one seat per user, 2 computers per seat. Multiply price by seats in Notes.
6. Flag for asset-license-auditor: Restricted Asset terms, UGC products, tokens, AI training, contractor use.
7. Flag for unity-specialist: pipeline mismatch, Unity version gaps, last update older than 12 months.
8. Rank by fit, then by licence risk, then by total cost.

## Output

Search date: YYYY-MM-DD. Request: <one line>. Assumptions: <list>.

| Asset | URL | Price | Licence | Commercial use | Unity versions | Pipelines | Last update | Notes |
|---|---|---|---|---|---|---|---|---|
| Exact name | https://assetstore.unity.com/packages/... | List $X / sale $Y (seen YYYY-MM-DD) | Standard EULA, Extension Asset: yes/no | Allowed in Licensed Product / needs review | e.g. 2022.3+ | Built-in / URP / HDRP | YYYY-MM-DD | Seats x price, risks, UNVERIFIED fields |

Handoffs: asset-license-auditor: <items>. unity-specialist: <items>.

## Done when

- [ ] Every row has a real URL that was opened, or is marked UNVERIFIED.
- [ ] Every row states price, licence, commercial use, Unity versions, pipelines and last update, or UNVERIFIED.
- [ ] Sale price and list price are both shown when a sale is running, with the date seen.
- [ ] Extension Assets show seat count and total cost.
- [ ] Licence doubts are listed for asset-license-auditor and engine fit doubts for unity-specialist.
- [ ] No asset, price or rating was invented.
