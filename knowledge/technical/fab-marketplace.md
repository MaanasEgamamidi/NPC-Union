---
title: Fab marketplace facts for asset scouting
owner: unreal-fab-scout
last_verified: 2026-11-05
---

# Fab marketplace facts

last_verified: 2026-11-05

Verification note: on 2026-11-05 a WebFetch of https://www.fab.com/eula returned HTTP 403 Forbidden, so nothing below was confirmed against the live site on that date. Every fact is marked UNVERIFIED until someone with browser or Codex live search access checks it and updates the date.

## What Fab is

- Fab (https://www.fab.com) is Epic Games' unified content marketplace. UNVERIFIED (from prior knowledge, not checked 2026-11-05).
- It launched in October 2024 and replaced the Unreal Engine Marketplace, the Sketchfab Store, the Quixel Megascans library and the ArtStation Marketplace as storefronts. UNVERIFIED.
- Former Unreal Engine Marketplace purchases were migrated into Fab libraries. UNVERIFIED.
- Megascans content moved to Fab; it was free to claim for a period after launch and later became paid content. Check the current price on each listing. UNVERIFIED.

## Licence types to report per asset

| Licence | What to record | Status |
|---|---|---|
| Fab Standard License | Commercial use allowed within the EULA terms; check the tier bought | UNVERIFIED |
| Personal license | Non-commercial use only; do not ship in a paid product | UNVERIFIED |
| Creative Commons (CC BY, CC BY-SA, CC0 and similar) | Copy the exact CC variant and the attribution text required | UNVERIFIED |
| "Unreal Engine only" restriction | Some content, largely legacy Marketplace and Epic-produced content, may only be used in Unreal Engine projects | UNVERIFIED |

## Pricing tiers

- Standard License listings can show a Personal tier and a Professional tier. The Professional tier is aimed at studios and companies above a revenue threshold. The threshold has been reported as USD 100,000 in annual gross revenue; confirm it on the EULA page before quoting it. UNVERIFIED.
- Free listings exist and can be filtered. Free does not mean commercial use: always read the licence line. UNVERIFIED.

## Search and filters

- Fab search supports filters for asset type, price (including a free filter), licence type, file format, and Unreal Engine version compatibility. UNVERIFIED.
- Fab requires sellers to disclose AI-generated content, and listings carry an AI-generated label that can be used as a filter. UNVERIFIED.
- Listings state supported Unreal Engine versions and included formats (for example .uasset project files, FBX, OBJ, glTF/GLB, USD). Read the listing, do not infer. UNVERIFIED.
- Nanite and Lumen readiness is a seller claim in the description or tags, not a Fab guarantee. Record it as "seller states" and send to unreal-specialist for a check. UNVERIFIED.

## Sources

- Fab home: https://www.fab.com (not fetched 2026-11-05)
- Fab EULA: https://www.fab.com/eula (HTTP 403 on 2026-11-05)

## How to re-verify

1. Open https://www.fab.com/eula in a browser or with Codex live search.
2. Confirm licence names, the Professional tier threshold and the UE-only clause wording.
3. Run one Fab search, open the filter panel, and list the filters that exist.
4. Replace each UNVERIFIED tag that checks out and update last_verified.
