---
name: kb
description: Search the NPC Union knowledge base and answer with file citations and verification dates. Use for sourced game-dev facts.
owner: shared
argument-hint: "[query]"
---

# Knowledge base search

## Inputs

A query. Short keyword queries work best.

## Steps

1. Run `node ${CLAUDE_PLUGIN_ROOT}/scripts/kb-search.mjs "<query>"`. If the script is missing, Grep `${CLAUDE_PLUGIN_ROOT}/knowledge/` for the keywords.
2. Read the top 2-3 hits.
3. Answer from them only. Cite each fact with its file path and `last_verified` date.
4. If `last_verified` is older than 180 days, or the fact is marked UNVERIFIED, say so and check the source link live.

## Output

```
<answer>
Sources: knowledge/<path> (verified <date>), ...
```

## Done when

- [ ] Every fact cites a knowledge file or a live-checked link.
