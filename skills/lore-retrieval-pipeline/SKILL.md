---
name: lore-retrieval-pipeline
description: Design or review a retrieval pipeline over game lore and quest data with entity chunks, spoiler gating, hybrid search, reranking and recall evals.
owner: rag-engineer
disable-model-invocation: true
argument-hint: "[lore source path or description, target platform]"
---

# Lore retrieval pipeline

A repeatable procedure for turning a lore bible and quest database into a gated, evaluated retrieval layer.

## Inputs

- Lore source location and format (wiki export, spreadsheet, Ink, Yarn, JSON, database).
- Approximate entry count and quest count.
- Deployment: on device, server side, or both.
- Progress signal: quest flags, chapter IDs, or both.
- Latency budget per query and memory budget on the weakest target platform.
- If any is missing, ask once. If still missing, write the assumption into the output and continue.

## Steps

1. Inventory the source: count entries, list entity types (character, location, faction, item, quest stage, event).
2. Define chunk IDs as `<type>.<slug>.<facet>`. Split any entity that has a secret into a public facet and a gated facet.
3. Assign gating metadata to every chunk: `reveal_after`, `audience`, `canon_version`, `source_hash`, `embed_model`.
4. Choose the store. Under about 50,000 chunks and on device: sqlite-vec or FAISS flat, exact search. Hosted only if lore updates after ship or content is player-generated; write the reason.
5. Build a BM25 index (for example SQLite FTS5) alongside the vector index over the same chunk IDs.
6. Write the query path: hard gate filter, BM25 top-k and vector top-k in parallel, Reciprocal Rank Fusion, rerank a pool of 20 to 50, pass 3 to 8 chunks with IDs.
7. Build the eval set: at least 50 queries, each with progress flags, NPC role, and expected chunk IDs. Make at least 20 percent adversarial (early twist questions, wrong-audience questions, misspelled names).
8. Run the eval. Report recall@k for k in {1, 5, 10} and spoiler leak rate (gated chunks retrieved when they should not be).
9. Set up invalidation: diff `source_hash` on import, re-embed changed chunks, tombstone deleted IDs, re-embed everything if `embed_model` changes.
10. Look up current APIs for every library named before writing code, and mark anything unchecked as UNVERIFIED.

## Output

```
# Retrieval design: <game>
## Assumptions
## Chunk schema
| field | type | example |
## Gating rules
## Store choice
Choice: <store> | Reason: <reason> | Chunk count: <n> | Measured p95 latency: <ms or "not measured">
## Query path
Filter -> BM25 top <k> + vector top <k> -> RRF (k=<n>) -> rerank <model> to <n> -> generator gets <n>
## Eval
Set: <path> | Queries: <n> (adversarial: <n>)
| metric | value | threshold |
| recall@1 | | |
| recall@5 | | |
| recall@10 | | |
| spoiler leak rate | | 0 |
## Invalidation plan
## Open questions and UNVERIFIED items
```

## Done when

- [ ] Every chunk has a stable entity ID and all five gating and versioning fields.
- [ ] Every secret is split into its own gated chunk.
- [ ] The gate is applied as a filter before ranking, not as a prompt instruction.
- [ ] Both BM25 and vector retrieval run, and fusion is specified.
- [ ] The eval set exists with adversarial queries, and recall@k and spoiler leak rate are reported with numbers.
- [ ] Spoiler leak rate on adversarial queries is zero, or the gap is listed as a blocker.
- [ ] The invalidation plan covers changed, deleted, and re-embedded entries.
- [ ] Library APIs were checked or marked UNVERIFIED.
