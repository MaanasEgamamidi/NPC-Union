// Checks that CHANGELOG.md matches the plugin version and keeps an Unreleased section.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const plugin = JSON.parse(readFileSync(join(ROOT, ".claude-plugin/plugin.json"), "utf8"));
const changelog = readFileSync(join(ROOT, "CHANGELOG.md"), "utf8");

test("plugin.json has a semantic version", () => {
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
});

test("CHANGELOG.md has an Unreleased heading", () => {
  assert.match(changelog, /^## \[Unreleased\]\s*$/m);
});

test("CHANGELOG.md has a dated heading for the plugin version", () => {
  const escaped = plugin.version.replace(/\./g, "\\.");
  const m = changelog.match(new RegExp(`^## \\[${escaped}\\] - (\\d{4})-(\\d{2})-(\\d{2})\\s*$`, "m"));
  assert.ok(m, `no "## [${plugin.version}] - YYYY-MM-DD" heading in CHANGELOG.md`);
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  assert.equal(d.toISOString().slice(0, 10), `${m[1]}-${m[2]}-${m[3]}`, "release date is not a real date");
});
