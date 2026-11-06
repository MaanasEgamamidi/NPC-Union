---
title: Dialogue and barks, working reference
tags: [dialogue, barks, subtitles, ink, yarn-spinner, localization, voice]
sources:
  - "https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md"
  - "https://docs.yarnspinner.dev/"
  - "https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide"
  - "https://gameaccessibilityguidelines.com/"
  - "https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/104"
last_verified: 2026-11-05
---

# Dialogue and barks, working reference

Verification note: check version-specific guidance before using it in production.

## Line length budgets

- [Netflix English (USA) Timed Text Style Guide](https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide): 42 characters per line, at most 2 lines per subtitle event, and up to 20 characters per second for adult content.
- Games: use the subtitle box's real capacity at the largest font size the game offers. Write English to about 38 to 42 characters per line when other languages ship.
- Text expansion: translations can occupy more space than the source. Test representative translated strings, including short UI labels, in the actual layout and largest supported font.
- [Xbox Accessibility Guideline 104](https://learn.microsoft.com/en-us/gaming/accessibility/xbox-accessibility-guidelines/104) covers speaker identification and subtitle and caption settings.

## Bark cooldown model

Four cooldowns, all needed:

| Cooldown | Stops | Typical use |
|----------|-------|-------------|
| Per line | The exact same line repeating | Long, minutes |
| Per concept | Any line of the same concept repeating | Seconds to tens of seconds |
| Per speaker | One character dominating | A few seconds |
| Global | Two barks overlapping | Around one line length |

The numbers depend on the game's pace. Tune them in playtest. Frequent concepts get more variants and plainer wording.

Reference design: Elan Ruskin's ["AI-driven Dynamic Dialog through Fuzzy Pattern Matching. Empower Your Writers!"](https://gdcvault.com/play/1015946/AI-driven-Dynamic-Dialog-through), GDC 2012, describes Valve's rule-based response system used in Left 4 Dead and other titles. It matches world facts against rules and tracks history.

## Choice wording

- The label states intent and tone. The spoken line must not exceed what the label signalled.
- Mark options that end the conversation or start hostility.
- Known example of the paraphrase problem: Fallout 4's four-option dialogue wheel, whose short labels were widely criticized for not matching the delivered line.

## Script formats

### Ink (inkle)
- Knots `=== name ===`, stitches `= name`, diverts `-> target`.
- `*` choices are once-only, `+` choices are sticky.
- Square brackets in a choice: text inside shows only on the choice, not in the output that follows.
- Check the project's Ink version and tag conventions in the [Ink documentation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md); agree on stable line IDs with the localization pipeline.

### Yarn Spinner
- Nodes have a `title:` header, body between `---` and `===`.
- Options start with `->`. Commands use `<<command>>`. Variables use `$name`.
- Line IDs use `#line:<id>` tags. Yarn Spinner 2.4 documents the [Add Line Tags to Scripts](https://docs.yarnspinner.dev/2.4/using-yarnspinner-with-unity/assets-and-localization) tool; check the tooling for your installed version.

## IDs

- IDs are stable for the life of the line. Editing text does not change the ID.
- Changing an ID orphans recorded VO and translations.

## Example games, for reference

- Night in the Woods used Yarn Spinner, as described in the [Yarn Spinner documentation](https://docs.yarnspinner.dev/2.3/beginners-guide/syntax-basics).
- 80 Days and Heaven's Vault were written in Ink by inkle.
- Oxenfree (Night School Studio) lets the player interrupt conversations, and characters resume the thread.
- Disco Elysium gives the player's skills their own voices in dialogue.
