---
title: Game localization pipeline reference
tags: [localization, i18n, plurals, pseudo-localization, cjk, rtl, lqa]
sources:
  - https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
  - https://unicode-org.github.io/icu/userguide/format_parse/messages/
  - https://www.unicode.org/reports/tr9/
  - https://www.unicode.org/reports/tr14/
  - https://www.w3.org/TR/jlreq/
  - https://docs.godotengine.org/en/stable/tutorials/i18n/internationalizing_games.html
  - https://learn.microsoft.com/en-us/globalization/methodology/pseudolocalization
last_verified: 2026-11-05
---

# Game localization pipeline reference

Owner: `localization-lead`. Links were not fetched during this write-up because of a time limit. Treat every link as UNVERIFIED until a session fetches it, and check version-specific engine behaviour on the live docs.

## Plural categories (CLDR)

CLDR defines six plural categories: zero, one, two, few, many, other. Cardinal examples:

| Language | Categories | Notes |
|---|---|---|
| English | one, other | |
| German | one, other | |
| French | one, many, other | In [CLDR 49](https://www.unicode.org/cldr/charts/49/supplemental/language_plural_rules.html), 0 and 1 are "one"; "many" includes 1,000,000 and certain compact forms. Check the chart for the complete rule. |
| Portuguese (Brazil) | one, many, other | In [CLDR 49](https://www.unicode.org/cldr/charts/49/supplemental/language_plural_rules.html), 0 and 1 are "one" for pt; "many" includes 1,000,000 and certain compact forms. Check the chart for the complete rule. |
| Russian, Polish | one, few, many, other | Plus "other" for decimals. |
| Arabic | zero, one, two, few, many, other | All six. |
| Japanese, Chinese, Korean, Thai | other | No plural inflection. |

Test values that exercise most rules: 0, 1, 2, 3, 5, 11, 21, 22, 100, 101, 1.5.

## Message formatting

- ICU MessageFormat supports `plural`, `selectordinal` and `select` (for gender or any enum). Put whole sentences inside each branch so translators can reorder.
- Never assemble sentences from fragments in code. Pass named placeholders and describe each one in the context note.
- Format numbers, dates, currency and lists with locale data (CLDR via ICU or the engine), then insert the result.

## Text expansion budgets

Rule of thumb used in the industry, UNVERIFIED as a precise standard (figures vary by source):

| English length | Allow growth of |
|---|---|
| up to 10 characters | 100 to 200 percent |
| 11 to 20 | 80 to 100 percent |
| 21 to 70 | 40 to 60 percent |
| over 70 | about 30 percent |

German, French, Russian and Brazilian Portuguese are usually the longest European targets. CJK strings are usually shorter in character count but may need larger font sizes for legibility, so measure in pixels, not characters.

## Pseudo-localization spec

- Pad by 30 to 40 percent with filler characters.
- Replace ASCII letters with accented or look-alike characters so the text stays readable.
- Wrap with start and end markers, for example `[!! ... !!]`.
- Keep placeholders and markup untouched so the pass also catches placeholder breakage.
- Add an RTL pseudo-locale that mirrors layout. Microsoft's pseudo-locales (qps-ploc, qps-ploca, qps-plocm) are a model; see the Microsoft link above.

## CJK checklist

- Han unification: choose fonts per locale (ja, zh-Hans, zh-Hant, ko), not one shared CJK font.
- Glyph counts: 2,136 Jōyō kanji (2010 list) plus kana for Japanese; 6,763 hanzi in GB2312 for Simplified Chinese.
- Line breaking follows kinsoku rules for Japanese (W3C JLREQ) and UAX #14 generally. Do not rely on spaces.
- Check IME input for player names and chat if the game has text entry.

## RTL checklist

- Shaping: Arabic letters take initial, medial, final and isolated forms. Confirm the engine text stack shapes them.
- Bidi: mixed Arabic with numbers or Latin names follows UAX #9. Test player names and numbers inside sentences.
- Mirror layout: navigation arrows, progress bars, list and HUD alignment. Do not mirror clocks, media play icons or real-world maps.
- Godot 4's advanced text server provides BiDi and shaping (check current docs). Unity and Unreal support varies by text component and version: UNVERIFIED, check current docs.

## Casing pitfalls

- Turkish: i/İ and ı/I are distinct pairs.
- German: ß uppercases to SS (capital ẞ exists but is not the default uppercase mapping).
- Let translators author all-caps variants instead of transforming at runtime.

## Context note fields

Location (screen or scene), speaker, addressee and their gender, formality, max length (characters or pixels), placeholder meanings, screenshot link, related string IDs, do-not-translate terms.

## LQA bug taxonomy

Functional: truncation, overlap, untranslated, hardcoded, placeholder mismatch, wrong plural form, missing glyph (tofu), wrong glyph forms (CJK fallback), broken bidi, unmirrored layout, line break errors.
Linguistic: mistranslation, terminology inconsistency against glossary, wrong tone or formality, cultural issue, grammar or spelling.
