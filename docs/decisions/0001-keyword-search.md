# 0001: Keyword search for the knowledge base, not a vector database

**Status:** accepted

## Context

Agents need to pull the right facts from `knowledge/` when they need them. That folder is a few hundred labelled Markdown files, each with a title, tags and sources. NPC Union installs as a plain Claude Code plugin, so whatever retrieval it uses has to run anywhere Node runs, with nothing extra to install and no API keys.

## Decision

`scripts/build-index.mjs` splits every knowledge file at its `##` headings and writes `knowledge/index.json`. `scripts/kb-search.mjs` ranks those sections with BM25 keyword scoring. Both are plain Node with no dependencies. CI checks that the index is current.

## Consequences

- Nothing to install. Search is deterministic and fast, and its results can be reviewed in a diff.
- It matches words, not meaning, so a query needs words the files use. Tags and descriptive headings make up for most of that.
- If the corpus grows past what keyword search handles well, embeddings can be added later behind the same `kb-search` interface.
