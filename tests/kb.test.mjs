import { test } from "node:test";
import assert from "node:assert/strict";
import { parseKnowledge, search, tokenize } from "../scripts/lib/kb.mjs";
test("parses block and flow lists", () => {
  const { meta } = parseKnowledge("---\ntitle: T\ntags: [a, b]\nsources:\n  - https://x.org\n  - https://y.org\nlast_verified: 2026-11-05\n---\nbody");
  assert.deepEqual(meta.tags, ["a", "b"]); assert.deepEqual(meta.sources, ["https://x.org", "https://y.org"]); assert.equal(meta.last_verified, "2026-11-05");
});
test("bm25 ranks the matching chunk first", () => {
  const mk = (h, t) => { const tf = {}; const toks = tokenize(t); for (const x of toks) tf[x] = (tf[x] || 0) + 1; return { heading: h, len: toks.length, tf }; };
  const hits = search([mk("a", "steam capsule image sizes"), mk("b", "orbital mechanics delta v"), mk("c", "loot box law belgium")], "steam capsule");
  assert.equal(hits[0].heading, "a");
});
