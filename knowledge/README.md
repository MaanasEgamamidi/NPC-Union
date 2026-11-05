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
