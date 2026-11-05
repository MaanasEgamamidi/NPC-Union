---
title: Asset licences for game projects
owner: asset-license-auditor
last_verified: 2026-11-05
---

# Asset licences for game projects

last_verified: 2026-11-05

Facts the asset-license-auditor relies on. Each line says whether it was checked on 2026-11-05 (VERIFIED) or not (UNVERIFIED). Licences and store terms change, so re-check before any release and record the date in the audit.

## Identifiers and tooling

- SPDX licence list: https://spdx.org/licenses/ . VERIFIED 2026-11-05: version 3.29.0 dated 2026-09-16. Confirmed identifiers: `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC-BY-NC-4.0`, `CC0-1.0`, `OFL-1.1`, `MIT`, `Apache-2.0`, `GPL-3.0-only`, `LGPL-3.0-only`.
- REUSE: https://reuse.software . VERIFIED 2026-11-05: an FSFE initiative with three steps: choose and provide licences, add copyright and licensing information to each file, confirm compliance. The `reuse lint` tool and `LICENSES/` folder convention are UNVERIFIED from that page; check the developer tools section before citing them.

## Creative Commons

- Licence index: https://creativecommons.org/licenses/ . UNVERIFIED in this pass.
- BY: attribution required. BY-SA: adaptations must carry the same licence (share-alike). NC: no commercial use, which rules out a paid game and is risky for a free game with ads or IAP. ND: no adaptations, so recolouring, cropping or re-rigging an ND asset is a breach. UNVERIFIED wording; read the deed and legal code for the exact version used.
- CC0 is a waiver plus fallback licence, not the same as public domain status. Public domain depends on jurisdiction and date. UNVERIFIED.
- BY-SA art inside a game: whether the whole game counts as an adaptation is a legal question. Escalate to game-legal-advisor.

## Code licences

- GPL in shipped game code or an engine addon can require releasing source of the combined work when distributed. LGPL generally allows linking if the user can replace the library. UNVERIFIED; check https://www.gnu.org/licenses/ (UNVERIFIED URL check).
- MIT and Apache-2.0 require keeping the copyright and licence notice. Apache-2.0 also requires carrying a NOTICE file if one exists. UNVERIFIED.

## Fonts

- SIL Open Font License 1.1 (`OFL-1.1`) allows embedding and bundling in software but does not allow selling the font file by itself. Reserved Font Names limit renaming of modified versions. UNVERIFIED; check https://openfontlicense.org (UNVERIFIED URL).

## Stores and marketplaces

- Unity Asset Store: governed by the Unity Asset Store EULA, standard seat-based licence. UNVERIFIED; check the EULA on assetstore.unity.com and record the date.
- Fab (Epic): Fab licence tiers (standard and professional) differ from the old Unreal Marketplace terms. UNVERIFIED; check the licence on fab.com.
- itch.io: each creator sets their own terms on the asset page. There is no single itch licence. UNVERIFIED; archive the asset page.
- Steam: content survey asks developers to disclose AI-generated content. UNVERIFIED; check Steamworks documentation before release.

## Evidence practice

- Archive each licence page (for example with the Wayback Machine at https://web.archive.org, UNVERIFIED in this pass) and record the archive URL and date checked.
- Keep the receipt or order number for paid assets.
