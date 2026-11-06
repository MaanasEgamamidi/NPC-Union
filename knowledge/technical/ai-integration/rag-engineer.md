---
title: Retrieval for games, sources
owner: rag-engineer
last_verified: 2026-11-05
---

# Retrieval for games: sources

Sources behind the claims in the `rag-engineer` agent. Re-check before quoting a function name or version.

## Lexical search

- SQLite FTS5 full-text search, including the built-in `bm25()` ranking function and tokenizer options. https://www.sqlite.org/fts5.html
  - last_verified: 2026-11-05

## Vector stores

- sqlite-vec, a vector search extension for SQLite. https://github.com/asg017/sqlite-vec
  - Description checked against the [project documentation](https://github.com/asg017/sqlite-vec/blob/main/site/index.md). Check current API, index types, and platform builds, including console targets, before use.
- FAISS, a library for similarity search and clustering of dense vectors, with flat (exact), IVF and HNSW indexes. https://github.com/facebookresearch/faiss
  - [Faiss index documentation](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes) describes flat, IVF and HNSW indexes.

## Evaluation and baselines

- Thakur et al., "BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models", shows BM25 as a strong out-of-domain baseline. https://arxiv.org/abs/2104.08663
  - last_verified: 2026-11-05
- BEIR code and datasets. https://github.com/beir-cellar/beir
  - UNVERIFIED (GitHub blocked from this environment).

## Fusion

- Cormack, Clarke and Buettcher, ["Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods"](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf), SIGIR 2009. The paper used k=60, fixed during a pilot investigation.

## Practice notes (no external source, team heuristics)

- Entity-based chunking, hard gate filters before ranking, and per-row `embed_model` tracking are design practices, not claims from a single source.
