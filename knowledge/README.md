# Knowledge base

Labelled Markdown files that agents cite. Each file starts with frontmatter:

```
---
title: Short title
tags: [topic, subtopic]
sources:
  - https://primary.source/page
last_verified: YYYY-MM-DD
---
```

Mark anything not checked against its source as `UNVERIFIED`.

- Build the index: `node scripts/build-index.mjs` (writes `knowledge/index.json`)
- Search: `node scripts/kb-search.mjs "steam capsule sizes"`

Search is BM25 keyword ranking over `##` sections, in plain Node with no dependencies and no vector database.

## Freshness check

`node scripts/kb-stale.mjs` lists files whose `last_verified` is older than `--max-age` days (default 180), oldest first, and files with a missing or malformed date. It also counts `UNVERIFIED` markers per file. The count includes prose that mentions the word, so treat it as a pointer, not an exact tally of open claims.

- `--check-links` also fetches every distinct source URL (HEAD, then GET if HEAD is refused). Dead links are listed with the files that cite them. 401, 403 and 429 are listed as "blocked, check by hand" because many sites refuse scripts; open those in a browser.
- `--json` prints machine output. `--strict` exits 1 when anything is stale, missing a date, or dead; otherwise the exit code is 0. `--today YYYY-MM-DD` replaces the clock.
- A monthly workflow (`.github/workflows/kb-freshness.yml`) runs it with `--check-links` and opens or updates an issue titled "Knowledge base freshness report".

What to do with the output: re-check each listed file against its sources, fix or replace dead URLs, resolve or keep `UNVERIFIED` markers, then set `last_verified` to the date you checked. Only change the date after you have actually checked the file.
