---
title: Game logos and wordmarks for stores and screens
tags: [logo, wordmark, lockup, steam, capsule, app-icon, typography, font-licensing]
sources:
  - https://partner.steamgames.com/doc/store/assets/standard
  - https://partner.steamgames.com/doc/store/assets/libraryassets
  - https://developer.apple.com/design/human-interface-guidelines/app-icons
  - https://developer.android.com/distribute/google-play/resources/icon-design-specifications
  - https://fonts.google.com/knowledge/glossary/open_font_license
last_verified: 2026-11-05
---

# Game logos and wordmarks for stores and screens

Reference for logo-designer. Sizes go stale; re-check the source before quoting them in a deliverable.

## Steam store capsules (checked 2026-11-05 on the Steamworks standard assets page)

| Asset | Size (px) | Logo note |
|---|---|---|
| Header capsule | 920 x 430 | Smaller versions generated from it. Only the game title as text. |
| Small capsule | 462 x 174 | Steam also makes 184 x 69 and 120 x 45 versions. Logo should nearly fill the capsule to stay readable. Art does not need to match other capsules. |
| Main capsule | 1232 x 706 | Only the game title as text. |
| Vertical capsule | 748 x 896 | Only the game title as text. |
| Bundle header | 707 x 232 | Clearly legible logo. |
| Page background | 1438 x 810 | Optional. |

Steam rules from the same page: no quotes or other text strings beyond the title on header, main, and vertical capsules. The logotype must be legible against the background. Use Artwork Overrides for time-limited event art instead of editing base capsules.

## Steam library assets (UNVERIFIED this session)

The [Steamworks library assets documentation](https://partner.steamgames.com/doc/store/assets/libraryassets) specifies:
- Library capsule 600 x 900.
- Library hero 3840 x 1240, with no text in the hero itself.
- Library logo as a transparent PNG, 1280 px wide and/or 720 px tall, placed over the hero.

## App icons (UNVERIFIED this session)

- Apple: iOS, iPadOS and macOS app icon layouts are 1024 x 1024; the system applies the corner mask. Other Apple platforms have different specifications. See the [Apple icon guidelines](https://developer.apple.com/design/human-interface-guidelines/app-icons).
- Google Play: store listing icon 512 x 512, 32-bit PNG. See [Google Play icon specifications](https://developer.android.com/distribute/google-play/resources/icon-design-specifications).
- Consoles (Nintendo, PlayStation, Xbox): specs are under developer NDA portals and cannot be checked publicly. Always ask the team for the current spec sheet.

## Small-size legibility rules (craft practice, not platform rules)

- Test every lockup at 120 x 45 and at a 64 px square. Blur test at about 4 px radius to check silhouette.
- Watch letter pairs that merge when small: rn to m, cl to d, I l 1, vv to w.
- Keep minimum stroke weight around 12 to 15 percent of cap height on small variants. This is a working rule of thumb, not a published standard.
- Long titles: stack, enlarge the most distinctive word, shrink filler words.
- Texture and inline detail only on large variants.
- An app or console icon should be a glyph, monogram, or mascot, not the full wordmark.

## Lockup set checklist

Primary, horizontal, stacked, small-capsule, icon glyph, single-colour light, single-colour dark, library logo with baked outline or plate, vector master with outlined type, layered source for animation.

## Font licensing

- Fonts under the SIL Open Font License (most of Google Fonts) may be used and embedded in commercial products; the licence restricts selling the font itself and using reserved font names for modified versions. Check the specific font's licence file.
- Commercial foundry fonts usually separate desktop (artwork) licences from app or game embedding licences. Terms vary by foundry; read the EULA.
- "Free for personal use" fonts are not cleared for a commercial game logo. Converting text to outlines does not change that.
- Route anything unclear to game-legal-advisor.
