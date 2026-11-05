---
name: fab-asset-search
description: Search Fab for Unreal-ready assets and report licence, price tier, commercial use, engine restriction, UE versions and formats per asset.
owner: unreal-fab-scout
disable-model-invocation: true
argument-hint: "[asset need, UE version, budget, commercial or personal project]"
---

# Fab asset search

A repeatable procedure for shortlisting assets on Fab (https://www.fab.com) with licence facts attached to every row.

## Inputs

- What the asset is (type, style, scale, poly budget).
- Target Unreal Engine version (for example 5.4). Ask if missing.
- Commercial or personal project, and whether the buyer is an individual or a company above the Professional tier revenue threshold. Ask if missing.
- Budget, and whether free only.
- Whether the project uses or may move to another engine (this matters for "Unreal Engine only" content).
- Whether AI-generated content is acceptable.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/fab-marketplace.md` for licence types, tiers and filter names.
2. Try a quick WebFetch of https://www.fab.com or https://www.fab.com/eula. If it fails or returns 403, write "Live check blocked (HTTP code)" in the report and mark every unchecked field UNVERIFIED.
3. Search Fab with the filters that match the inputs: asset type, price or free, licence type, format, UE version, and the AI-generated label. Record the filters used.
4. For each candidate, open the listing and copy: title, listing URL, price per tier (Personal and Professional), licence, any "Unreal Engine only" note, supported UE versions, included formats, seller statements on Nanite and Lumen, and AI-generated label.
5. Set Commercial use to Yes, No, or Check. Personal license means No. CC listings need the exact CC variant and attribution text. Anything unclear is Check.
6. Never fill a field from memory or guess a URL. If a listing could not be opened, leave the field as UNVERIFIED.
7. Route licence doubts to asset-license-auditor and engine fit questions (Nanite, Lumen, version upgrade) to unreal-specialist.

## Output

Filters used: <list>. Live check: <done or blocked, with code>.

| Asset | URL | Price tier | Licence | Commercial use | Engine restriction | UE versions | Formats | Notes |
|---|---|---|---|---|---|---|---|---|
| <title> | <listing URL or UNVERIFIED> | <Personal $x / Professional $y / Free> | <Standard / Personal / CC variant> | <Yes / No / Check> | <UE only / None stated / UNVERIFIED> | <list> | <list> | <Nanite or Lumen claim, AI label, attribution> |

Handoffs: <asset-license-auditor items>, <unreal-specialist items>.

## Done when

- [ ] Every row has a real listing URL or says UNVERIFIED.
- [ ] Every row states licence, price tier and commercial use.
- [ ] "Unreal Engine only" is checked for every row.
- [ ] UE versions and formats come from the listing, not inference.
- [ ] AI-generated label status is noted.
- [ ] The live check result is stated.
- [ ] Licence doubts and engine fit questions are routed by name.
