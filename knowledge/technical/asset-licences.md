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
- REUSE: https://reuse.software . VERIFIED 2026-11-05: an FSFE initiative with three steps: choose and provide licences, add copyright and licensing information to each file, confirm compliance. The `reuse lint` command checks REUSE compliance: https://reuse.readthedocs.io/en/stable/man/reuse-lint.html. The [REUSE tool](https://github.com/fsfe/reuse-tool) places licence texts in `LICENSES/`.

## Creative Commons

- Licence index: https://creativecommons.org/licenses/ .
- BY requires attribution. BY-SA requires shared adaptations to use the same or a compatible licence. NC limits use to noncommercial purposes. ND 4.0 permits private adaptation but not sharing adapted material; whether a modification is an adaptation depends on applicable law. Read the exact licence version. [Creative Commons](https://creativecommons.org/faq/).
- CC0 dedicates rights to the public domain to the extent possible and includes a fallback licence where a waiver is ineffective. Other rights can still apply. [Creative Commons](https://creativecommons.org/cc-and-nfts/).
- BY-SA art inside a game: whether the whole game counts as an adaptation is a legal question. Escalate to game-legal-advisor.

## Code licences

- GPL in shipped game code or an engine addon can require releasing source of the combined work when distributed. LGPL generally allows linking if the user can replace the library. UNVERIFIED; check https://www.gnu.org/licenses/ (UNVERIFIED URL check).
- MIT and Apache-2.0 require keeping the copyright and licence notice. Apache-2.0 also requires carrying a NOTICE file if one exists. UNVERIFIED.

## Fonts

- SIL Open Font License 1.1 (`OFL-1.1`) allows embedding and bundling in software but prohibits selling the font by itself. Reserved Font Names restrict the names of modified versions. Preserve copyright and licence information. [SIL FAQ](https://openfontlicense.org/ofl-faq/).

## Stores and marketplaces

- Unity Asset Store: under the [standard EULA](https://unity.com/legal/as-terms), extension assets are per-seat; other assets have different entity-based terms. Check the asset for non-standard terms.
- Fab Standard License: Personal and Professional pricing tiers grant the same scope of rights; Reference-Only gives referenced content rather than source format. Check the specific asset licence. [Fab](https://www.fab.com/eula).
- itch.io: each creator sets their own terms on the asset page. There is no single itch licence. UNVERIFIED; archive the asset page.
- Steam's content survey asks about generative AI used in development or in the product. [Steamworks](https://partner.steamgames.com/doc/gettingstarted/contentsurvey).

## Evidence practice

- Archive each licence page (for example with the Wayback Machine at https://web.archive.org, UNVERIFIED in this pass) and record the archive URL and date checked.
- Keep the receipt or order number for paid assets.
