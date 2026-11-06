// Tests scripts/team.mjs and catalog/teams.json. Uses a temp folder, never the real .npc-union/.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadCatalog, loadPresets, resolveNames, checkAgent, readTeam, writeTeam, briefText } from "../scripts/team.mjs";

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), "../scripts/team.mjs");
const catalog = loadCatalog();

const run = (file, ...args) => spawnSync(process.execPath, [SCRIPT, ...args, "--file", file], { encoding: "utf8" });
const tempFile = () => join(mkdtempSync(join(tmpdir(), "npc-team-")), ".npc-union", "team.json");

test("every preset member exists in the catalog and presets have unique ids", () => {
  const presets = loadPresets();
  const ids = new Set();
  for (const p of presets) {
    assert.ok(!ids.has(p.id), `duplicate preset id ${p.id}`);
    ids.add(p.id);
    const { unknown } = resolveNames(p.members, catalog);
    assert.deepEqual(unknown, [], `${p.id} has unknown members`);
    assert.equal(new Set(p.members).size, p.members.length, `${p.id} lists a member twice`);
    assert.ok(p.members.length >= 3, `${p.id} is too small to be a team`);
  }
});

test("names resolve from agent name, persona and plugin id, and dedupe", () => {
  const { names, unknown } = resolveNames(["game-designer", "Gyre", "npc-union:creative:design:game-designer", "nobody-here"], catalog);
  assert.deepEqual(names, ["game-designer"]);
  assert.deepEqual(unknown, ["nobody-here"]);
});

test("set, show, add, remove and clear round-trip through the file", () => {
  const file = tempFile();
  assert.equal(run(file, "set", "game-designer,sprite-artist").status, 0);
  assert.deepEqual(readTeam(file).members, ["game-designer", "sprite-artist"]);
  assert.equal(run(file, "add", "Gyre", "composer").status, 0);
  assert.deepEqual(readTeam(file).members, ["game-designer", "sprite-artist", "composer"]);
  assert.equal(run(file, "remove", "sprite-artist").status, 0);
  assert.deepEqual(readTeam(file).members, ["game-designer", "composer"]);
  assert.match(run(file, "show").stdout, /game-designer/);
  assert.equal(run(file, "clear").status, 0);
  assert.equal(existsSync(file), false);
  assert.match(run(file, "show").stdout, /No team active/);
});

test("an unknown agent is rejected with a suggestion and nothing is written", () => {
  const file = tempFile();
  const r = run(file, "set", "game-desginer", "sprite-artist");
  assert.equal(r.status, 1);
  assert.match(r.stderr, /Unknown agent "game-desginer"/);
  assert.equal(existsSync(file), false);
});

test("check allows team members and the Steward, blocks everyone else, and allows all when no team is set", () => {
  const file = tempFile();
  assert.equal(checkAgent(file, "composer", catalog), "no-team");
  writeTeam(file, { members: ["game-designer"] });
  assert.equal(checkAgent(file, "game-designer", catalog), "in-team");
  assert.equal(checkAgent(file, "Gyre", catalog), "in-team");
  assert.equal(checkAgent(file, "shop-steward", catalog), "in-team");
  assert.equal(checkAgent(file, "composer", catalog), "outside-team");
  assert.equal(run(file, "check", "composer").status, 3);
  assert.equal(run(file, "check", "game-designer").status, 0);
});

test("preset command loads a starter team", () => {
  const file = tempFile();
  assert.equal(run(file, "preset", "solo-dev-starter").status, 0);
  assert.ok(readTeam(file).members.includes("producer"));
  assert.equal(run(file, "preset", "nope").status, 1);
});

test("the brief tells a lead to report needs instead of spawning outsiders", () => {
  const text = briefText({ members: ["game-designer", "composer"] });
  assert.match(text, /game-designer, composer/);
  assert.match(text, /NEED <agent-name> \(outside team\)/);
  assert.match(text, /cannot/);
});

test("the file format matches what the Assemble Team tab downloads", () => {
  const file = tempFile();
  writeTeam(file, { members: ["game-designer"] });
  const raw = JSON.parse(readFileSync(file, "utf8"));
  assert.deepEqual(Object.keys(raw).sort(), ["members", "name", "policy", "version"]);
  assert.equal(raw.policy, "strict");
});
