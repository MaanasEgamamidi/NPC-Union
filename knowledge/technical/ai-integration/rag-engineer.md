---
title: Retrieval for games, sources
owner: rag-engineer
---

# Retrieval for games: sources

Sources behind the claims in the `rag-engineer` agent. Re-check before quoting a function name or version.

## Lexical search

- SQLite FTS5 full-text search, including the built-in `bm25()` ranking function and tokenizer options. https://www.sqlite.org/fts5.html
  - last_verified: 2026-11-05

## Vector stores

- sqlite-vec, a vector search extension for SQLite. https://github.com/asg017/sqlite-vec
  - UNVERIFIED (GitHub blocked from this environment). Check current API, index types, and platform builds, including console targets.
- FAISS, a library for similarity search and clustering of dense vectors, with flat (exact), IVF and HNSW indexes. https://github.com/facebookresearch/faiss
  - UNVERIFIED (GitHub blocked from this environment).

## Evaluation and baselines

- Thakur et al., "BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models", shows BM25 as a strong out-of-domain baseline. https://arxiv.org/abs/2104.08663
  - last_verified: 2026-11-05
- BEIR code and datasets. https://github.com/beir-cellar/beir
  - UNVERIFIED (GitHub blocked from this environment).

## Fusion

- Cormack, Clarke and Buettcher, "Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods", SIGIR 2009. Source of RRF and the k=60 constant.
  - UNVERIFIED: no link checked. Find the ACM DL or author-hosted copy before citing a URL.

## Practice notes (no external source, team heuristics)

- Entity-based chunking, hard gate filters before ranking, and per-row `embed_model` tracking are design practices, not claims from a single source.
