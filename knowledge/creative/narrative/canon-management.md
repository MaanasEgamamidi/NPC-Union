---
title: Canon management for games
tags: [lore, canon, timeline, retcon, codex, naming]
sources:
  - "https://www.starwars.com/news/the-legendary-star-wars-expanded-universe-turns-a-new-page"
  - "https://www.articy.com/help/"
  - "https://www.mediawiki.org/wiki/Help:Templates"
  - "https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki"
  - "https://blacksmithgu.github.io/obsidian-dataview/"
last_verified: 2026-11-05
---

# Canon management for games

Reference for lore-keeper. All source URLs returned HTTP 200 on 2026-11-05; page contents were not re-read in full, so specific claims below are marked where unchecked.

## Canon tiers

Decide which source wins before anyone argues. A default order for a game project:

1. Shipped game text and VO (hardest to change: needs patch, re-record, localization).
2. Approved story bible.
3. Dev notes, design docs, unshipped scripts.
4. Marketing, tie-in comics and novels, community answers by staff.

Real example: in April 2014 Lucasfilm announced that the existing Expanded Universe would be presented as "Star Wars Legends", with new canon built around the films and new material (see the StarWars.com announcement in sources). For earlier continuity classifications, consult a primary Lucasfilm source before citing specific levels.

## Entry schema

One row per atomic fact:

| Field | Notes |
|---|---|
| ID | Stable, typed prefix: LK-CHR, LK-LOC, LK-EVT, LK-FAC, LK-TRM |
| Subject | Entity the fact is about |
| Claim | Short statement |
| Value | Machine-checkable value where possible (year, number, relation) |
| Source | File and line, or string ID |
| Tier | 1 to 4 as above |
| Status | proposed, approved, shipped, retconned |
| Spoiler gate | Earliest act, chapter or DLC where this may appear in player-facing text |
| Reliability | For in-world documents: author and whether they are trustworthy |

## Timelines

- One epoch, integer years from it. In-world calendars are display formats.
- Store birth years, not ages. Compute ages.
- Convert every "N years ago" in scripts to an absolute year during review.

## Retcon log format

`date | entry ID | old value | new value | reason | approved by | affected string IDs`

Notify localization and dialogue owners whenever affected strings is not empty.

## Naming rules

Write per-culture phonotactic rules (allowed sounds, syllable shapes, endings, banned letters). Check new names for near-collisions with existing names and against real words in shipping languages.

## Tool notes

- Check the [articy:draft help pages](https://www.articy.com/help/) for entity templates, properties and features in the version used by the project.
- MediaWiki templates give consistent infoboxes. Semantic MediaWiki adds queryable properties to wiki pages, which allows lists like "all characters born before year X".
- Obsidian with the Dataview plugin can query YAML frontmatter across Markdown notes, which suits small teams.

## Real examples of in-world unreliable sources

- The Elder Scrolls games include many in-game books with in-world authors whose accounts disagree, which lets the series keep conflicting histories. General pattern well known; no specific book claims made here.
- Destiny (2014) used Grimoire cards accessible through Bungie's website and companion app; those features were removed after Destiny 2 launched. [Destinypedia](https://www.destinypedia.com/Grimoire).
