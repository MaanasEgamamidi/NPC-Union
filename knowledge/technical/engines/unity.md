---
title: Unity 6 releases, LTS status, licence tiers and render pipelines
tags: [unity, engine, versions, lts, pricing, urp, hdrp]
sources:
  - https://services.api.unity.com/unity/editor/release/v1/releases
  - https://unity.com/releases/unity-6/support
  - https://unity.com/products/pricing-updates
  - https://unity.com/releases/editor/archive
last_verified: 2026-11-05
---

# Unity 6 releases, LTS status, licence tiers and render pipelines

## Current editor releases (Unity release API, queried 2026-11-05)

Source: https://services.api.unity.com/unity/editor/release/v1/releases (ordered by release date)

| Line | Latest editor | Date | Stream |
|---|---|---|---|
| Unity 6.3 LTS | 6000.3.28f1 | 2026-11-03 | LTS |
| Unity 6.0 LTS | 6000.0.85f2 | 2026-11-03 | LTS |
| Unity 6.6 | 6000.6.8f1 | 2026-11-03 | SUPPORTED (Update release) |
| Unity 6.7 | 6000.7.0b7 | 2026-10-29 | BETA |
| next major | 7000.0.0a12 | 2026-10-22 | ALPHA |

Version string format: `6000.3.28f1` = Unity 6.3, patch 28, final build 1. `b` = beta, `a` = alpha.

## Support windows (https://unity.com/releases/unity-6/support, 2026-11-05)

- Unity 6.3 LTS: "Latest LTS release", "supported until December 2027".
- Unity 6.0 LTS: "supported through October 2026" (so at or past its end now; a patch was still published 2026-11-03).
- Update releases: "Supported until the next release is published."
- Enterprise and Industry get an extra year on LTS.
Unity describes 6.7 as an upcoming LTS in its [render pipeline strategy](https://discussions.unity.com/t/render-pipelines-strategy-for-2026/1710004/1); check availability and support dates before planning an upgrade.

## Licence tiers (https://unity.com/products/pricing-updates, 2026-11-05)

| Tier | Threshold |
|---|---|
| Personal | free, up to $200,000 USD revenue and funding (last 12 months); effective with Unity 6, 17 Oct 2024 |
| Pro | required above $200,000; range $200,001 to $24,999,999, effective 1 Jan 2025 |
| Enterprise | $25,000,000 USD and over in total finances in the most recent 12 months; see https://unity.com/pages/license-compliance |

Unity Pro: $210 per seat per month on the annual plan paid monthly, as listed on [Unity's product page](https://unity.com/products/unity-pro); check current prices and payment terms for other plans.

Runtime Fee: cancelled as of 12 September 2024, effective immediately; it will not apply to games made with Unity 6 or any other version (pricing-updates page).

## Render pipelines

- URP: default for new cross-platform projects, mobile, web, Switch-class hardware.
- HDRP: high-end PC and current consoles only; no mobile or web.
- Built-in Render Pipeline: deprecated in Unity 6.5, with support planned through the Unity 6.7 LTS lifecycle. See the [Unity 6.5 upgrade guide](https://docs.unity.com/en-us/engine/6000.6/manual/upgrade-guides/upgrade-guide-unity65).
- Pipelines are not interchangeable at runtime; materials and shaders need conversion.

## How to re-check

1. Release API above, or https://unity.com/releases/editor/archive, for the latest patch per line.
2. https://unity.com/releases/unity-6/support for LTS end dates.
3. https://unity.com/products/pricing-updates and https://unity.com/products for tiers.
4. Upgrade guides: https://docs.unity3d.com/6000.0/Documentation/Manual/UpgradeGuides.html (check the guide for the target version).
