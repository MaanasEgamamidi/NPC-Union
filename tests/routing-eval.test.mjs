// Tests scripts/route.mjs and scripts/eval-routing.mjs. Never calls a model.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEntries, loadAgents, shortlist } from "../scripts/route.mjs";
import { buildPrompt, expectedVia, loadCases, parseReply, routeSteps, scoreCase, summarize, validateCases } from "../scripts/eval-routing.mjs";

const agents = loadAgents();
const cases = loadCases();

test("every case is well formed and names only catalog agents", () => {
  assert.deepEqual(validateCases(cases, agents), []);
  assert.ok(cases.length >= 50, "keep at least 50 cases");
});

test("validateCases reports unknown agents, repeated ids and empty expectations", () => {
  const errors = validateCases([
    { id: "a", request: "a long enough request", must: ["no-such-agent"] },
    { id: "a", request: "a long enough request" },
  ], agents);
  assert.equal(errors.length, 3);
});

test("expectedVia follows the route skill: direct, division lead, or shop-steward", () => {
  assert.equal(expectedVia({ must: ["composer"] }, agents), "direct");
  assert.equal(expectedVia({ must: ["monetization-designer", "analytics-engineer"] }, agents), "direct");
  assert.equal(expectedVia({ must: ["sprite-artist", "composer"] }, agents), "creative-lead");
  assert.equal(expectedVia({ must: ["godot-specialist", "composer"] }, agents), "shop-steward");
  assert.equal(expectedVia({ any: ["composer", "sfx-designer"] }, agents), null);
  assert.equal(expectedVia({ must: ["composer"], via: "shop-steward" }, agents), "shop-steward");
});

test("scoreCase counts must, any, accept and avoid", () => {
  const c = { id: "t", must: ["a", "b"], any: ["c", "d"], accept: ["e"], avoid: ["x"], viaExpected: "direct" };
  const full = scoreCase(c, ["a", "b", "d", "e"], "direct");
  assert.equal(full.pass, true); assert.equal(full.recall, 1); assert.equal(full.precision, 1); assert.equal(full.viaOk, true);
  const partial = scoreCase(c, ["a", "z"], "creative-lead");
  assert.equal(partial.pass, false); assert.equal(partial.recall, 1 / 3); assert.equal(partial.precision, 0.5);
  assert.deepEqual(partial.missing, ["b"]); assert.equal(partial.anyOk, false); assert.equal(partial.viaOk, false);
  assert.equal(scoreCase(c, ["a", "b", "c", "x"]).pass, false, "an avoided pick fails the case");
  assert.equal(scoreCase(c, []).precision, 0);
});

test("summarize averages and skips cases with no expected hand-off", () => {
  const s = summarize([
    { pass: true, recall: 1, precision: 1, avoided: [], viaOk: true },
    { pass: false, recall: 0.5, precision: 0.5, avoided: ["x"], viaOk: null },
  ]);
  assert.equal(s.passed, 1); assert.equal(s.passRate, 0.5); assert.equal(s.meanRecall, 0.75);
  assert.equal(s.avoidViolations, 1); assert.equal(s.viaAccuracy, 1); assert.equal(s.viaScored, 1);
});

test("parseReply reads a JSON array out of surrounding prose and rejects anything else", () => {
  assert.deepEqual(parseReply('Here you go:\n```json\n[{"id":"s01","specialists":["animator"],"via":"direct"}]\n```'), [{ id: "s01", specialists: ["animator"], via: "direct" }]);
  assert.throws(() => parseReply("I could not decide."));
});

test("the model prompt carries the route skill's steps, the whole catalog and each request", () => {
  const steps = routeSteps();
  assert.match(steps, /narrowest specialist/);
  const prompt = buildPrompt(cases.slice(0, 2), agents, steps);
  for (const a of agents) assert.ok(prompt.includes(`${a.name} | ${a.folder} |`), `${a.name} missing from prompt`);
  assert.ok(prompt.includes(cases[0].request) && prompt.includes(cases[1].request));
});

test("shortlist ranks a named engine's specialist first", () => {
  const hits = shortlist("Set up a Godot 4 project", 3, buildEntries(agents));
  assert.equal(hits[0].name, "godot-specialist");
  assert.deepEqual(shortlist("zzzz qqqq", 3), []);
});

test("keyword shortlist keeps its baseline on the eval cases", () => {
  const entries = buildEntries(agents);
  const results = cases.map((c) => scoreCase({ ...c, avoid: [] }, shortlist(c.request, 8, entries).map((h) => h.name)));
  const { passRate } = summarize(results);
  assert.ok(passRate >= 0.8, `keyword pass rate fell to ${passRate.toFixed(3)}; a catalog description probably lost the words requests use`);
});
