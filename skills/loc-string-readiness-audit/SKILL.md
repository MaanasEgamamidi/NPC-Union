---
name: loc-string-readiness-audit
description: Audits a game's strings, code and UI for localization readiness and produces a blocking-issue list, expansion budget and translator handoff checklist.
owner: localization-lead
disable-model-invocation: true
argument-hint: "[project path] [target locales, e.g. de,pt-BR,ja,zh-Hans,ar]"
---

# Localization string readiness audit

A repeatable audit to run before any string goes to translators, and again before each LQA round.

## Inputs

- Project path and engine with version. If missing, detect from project files (`project.godot`, `ProjectSettings/ProjectVersion.txt`, `*.uproject`) and state it.
- Target locales as BCP 47 codes. If missing, ask; if no answer, assume de, fr, ja, zh-Hans and state the assumption.
- Where strings live now (tables, CSV, PO, XLIFF, hardcoded). If unknown, find out in step 1.
- Screenshots or scene files for the tightest UI (HUD, buttons, menus).

## Steps

1. Locate strings. Grep source and scene files for quoted English display text outside the string tables. Record file, line and text.
2. Find concatenation. Grep for `+` or format calls that join quoted text with variables near display calls. Each hit is a blocker unless it joins non-linguistic data only.
3. Find casing and formatting in code. Grep for `ToUpper`, `ToLower`, `upper()`, `capitalize`, hand-built number or date formats, and `== 1` checks next to display strings. Each is a blocker.
4. Check keys. Confirm each string has a stable ID that is not the English text. Flag duplicate IDs and identical English text used under different meanings (for example "Close" as verb and adjective) that needs separate IDs.
5. Check plurals. For each target locale, read its categories from the CLDR plural rules chart. List every count-bearing string and confirm it uses ICU `plural` or the engine's plural API with all required categories.
6. Check gender and placeholders. For each placeholder record what it holds and whether the surrounding sentence agrees with it in gender or case in any target language. Add a gender field or ICU `select` where needed.
7. Set budgets. For each UI element with a fixed width, record the English length and the allowance: up to 10 characters, allow 100 percent; 11 to 20, 80 percent; 21 to 70, 50 percent; longer, 30 percent. Mark these allowances as starting values to be checked against pseudo-loc and the first real German pass.
8. Pseudo-localize. Generate a pseudo-locale: pad each string by 40 percent, replace Latin letters with accented forms, wrap in `[!! ... !!]`, keep placeholders intact. Play the critical path and record unbracketed text, cut-off markers and overlaps.
9. Check scripts and fonts. For each locale, record script, direction, font and fallback order. For CJK, confirm locale-specific fallback. For Arabic or Hebrew, confirm the engine's text stack shapes and applies bidi, and list screens that need mirroring. For ja, zh and th, confirm line breaking does not rely on spaces.
10. Check glyph coverage. Run every translated or pseudo string (and a set of sample player names) against each font's character map and list missing code points.
11. Build the handoff checklist and write the report.

## Output

```markdown
# Localization readiness: <project> (<engine> <version>)
Date: <YYYY-MM-DD>   Assumptions: <list>

## Target locales
| Locale | Script | Dir | Plural categories | Font / fallback | Milestone |
|---|---|---|---|---|---|

## Blocking issues
| # | Type (hardcoded / concat / casing / plural / gender / key) | File:line | Text | Fix |
|---|---|---|---|---|

## Expansion budget (tightest elements)
| Element | EN chars | Allowance | Max chars | Pseudo-loc result |
|---|---|---|---|---|

## Pseudo-loc findings
- <screen>: <issue>

## Script and font checks
- <locale>: shaping <ok/needs work>, bidi <ok/n.a.>, line breaking <ok/needs work>, missing glyphs <count>

## Translator handoff checklist
- [ ] Export with ID, source, context note, max length, placeholder notes
- [ ] Plural forms per locale listed
- [ ] Glossary and do-not-translate list (confirmed with lore-keeper)
- [ ] Style guide: tone, formality per language, addressee rules
- [ ] Screenshots for UI and context-heavy lines

## LQA plan
- Functional (scripted): truncation, tofu, untranslated, placeholder mismatch, plural at 0, 1, 2, 3, 11, 21, 100
- Linguistic (native testers): <scope and schedule>
```

## Done when

- [ ] Every target locale has its plural categories taken from the CLDR chart, not from memory.
- [ ] Every blocker has a file and line and a concrete fix.
- [ ] No concatenated display sentences or casing calls on translated text remain unlisted.
- [ ] The pseudo-loc pass covered the critical path and its findings are recorded.
- [ ] Every locale has a named font and fallback order, and glyph coverage was checked.
- [ ] RTL and CJK items are either confirmed working or listed with the screens affected.
- [ ] The handoff checklist is complete or each open item has an owner.
