---
name: asset-licence-audit
description: Build a licence inventory of a game project's third-party assets and code, flag risks, and attach dated evidence for each item.
owner: asset-license-auditor
disable-model-invocation: true
argument-hint: "[project path or asset list, plus target stores and business model]"
---

# Asset licence audit

## Inputs

- Project path, or a list of assets from itch-scout, unity-store-scout, unreal-fab-scout, godot-asset-scout, open-asset-scout or audio-asset-scout.
- Target stores (Steam, console, mobile, itch) and business model (paid, free, ads, IAP).
- Receipts or order numbers for paid assets.
- If missing, ask: Is the game sold or monetised? Which platforms? Is any code shipped as source or modifiable by players? Were any assets made with AI tools?

## Steps

1. Scan the project with Glob and Grep for `LICENSE*`, `COPYING*`, `NOTICE*`, `*.license`, `credits*`, `addons/`, `Packages/`, `Plugins/`, font files (`*.ttf`, `*.otf`) and SPDX headers (`SPDX-License-Identifier`).
2. List every third-party item: art, audio, fonts, shaders, code, engine addons, middleware.
3. For each item, find the source URL and the licence. Map it to an SPDX identifier from https://spdx.org/licenses/ ; use `LicenseRef-<name>` for store EULAs and custom terms.
4. Fetch the licence page with WebFetch. Record the date checked and an archive link. If it cannot be fetched, write UNVERIFIED.
5. Record price paid and receipt reference, commercial-use terms, and the exact attribution text required.
6. Check compatibility: NC against a monetised game, ND against any modification, SA against how the asset is combined, GPL or LGPL against how code is linked and shipped, MIT and Apache notices present in credits.
7. Check fonts: OFL allows bundling, not selling the font alone; check Reserved Font Names if modified.
8. Note AI-generated assets and whether the target store requires disclosure. Mark the store rule UNVERIFIED unless checked that day.
9. Rate risk: Low (clear, compatible, evidence saved), Medium (missing evidence or attribution), High (incompatible terms or unknown source).
10. Send every High item and any legal question to game-legal-advisor.

## Output

```markdown
# Licence audit: <project> (checked <YYYY-MM-DD>)

Business model: <paid / free / ads / IAP>. Stores: <list>.

| Asset | Source URL | Licence (SPDX) | Price paid | Commercial use | Attribution required | Risk | Evidence/date |
|---|---|---|---|---|---|---|---|
| <name and path> | <url or UNKNOWN> | <SPDX id or LicenseRef-...> | <amount, receipt ref> | <yes / no / conditional> | <exact text or none> | <Low/Medium/High> | <archive url, YYYY-MM-DD or UNVERIFIED> |

## Actions
- <item>: <fix, replace, or escalate to game-legal-advisor>

## Credits text
<ready-to-paste attribution block>

## Unverified
- <claims not checked live>
```

## Done when

- [ ] Every third-party file or package in the project appears in the table.
- [ ] Every row has an SPDX identifier or a LicenseRef.
- [ ] Every row has evidence with a date, or is marked UNVERIFIED.
- [ ] Every High risk row has an action and a game-legal-advisor referral.
- [ ] Attribution text is complete for all BY, MIT and Apache items.
- [ ] AI-generated assets are listed with a disclosure note.
