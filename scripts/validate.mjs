#!/usr/bin/env node
// Validates agents and skills against catalog/roster.json. Node only, no dependencies.
// Usage: node scripts/validate.mjs [--stream a|b|c|d] [--strict]
//   default: checks the agent files that exist; missing roster agents are warnings.
//   --strict: missing roster agents are errors.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const stream = args.includes("--stream") ? args[args.indexOf("--stream") + 1] : null;

const HEADINGS = ["Who I am", "What I know", "When to call me", "How I work", "Knowledge and sources", "Skills", "What I hand back", "Worked example"];
const CAPABILITIES = new Set(["web-search", "image-gen", "research", "long-form-text", "code", "quick-decisions", "data-analysis", "audio-gen", "video-gen", "3d-gen"]);
const MODELS = new Set(["sonnet", "opus", "haiku", "fable", "inherit"]);
const MIN_BODY_LINES = 45;
const MIN_KNOW_ITEMS = 8;

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// Reads simple top-level "key: value" frontmatter, including flow-style lists.
function parse(path) {
  const text = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    fields[kv[1]] = value;
  }
  return { fields, body: match[2] };
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

// Roster
const roster = JSON.parse(readFileSync(join(ROOT, "catalog/roster.json"), "utf8"));
const expected = new Map();
for (const [streamId, folders] of Object.entries(roster.streams)) {
  for (const [folder, entries] of Object.entries(folders)) {
    for (const entry of entries) {
      const [name, runtime, model] = entry.split(":");
      if (expected.has(name)) err("catalog/roster.json", `duplicate name ${name}`);
      expected.set(name, { stream: streamId, folder, runtime, model });
    }
  }
}

// Agents
const personas = new Map();
const declaredSkills = new Map();
const agentFiles = walk(join(ROOT, "agents"));
const seen = new Set();

for (const path of agentFiles) {
  const file = relative(ROOT, path).replace(/\\/g, "/");
  const parsed = parse(path);
  if (!parsed) { err(file, "missing or malformed frontmatter"); continue; }
  const { fields, body } = parsed;
  const name = fields.name;
  const spec = expected.get(name);
  if (stream && spec && spec.stream !== stream) continue;
  if (stream && !spec && !file.startsWith("agents/")) continue;

  for (const key of ["name", "description", "tools", "model", "persona_name", "division", "department", "runtime", "capabilities", "reasoning"]) {
    if (!fields[key] || fields[key].length === 0) err(file, `missing field ${key}`);
  }
  if (!name) continue;
  seen.add(name);

  if (!file.endsWith(`/${name}.md`)) err(file, `filename must match name ${name}`);
  if (fields.description && fields.description.length > 200) err(file, `description is ${fields.description.length} chars, max 200`);
  if (fields.model && !MODELS.has(fields.model) && !String(fields.model).startsWith("claude-")) err(file, `model must be a Claude model, got ${fields.model}`);
  if (!["claude", "codex"].includes(fields.runtime)) err(file, `runtime must be claude or codex, got ${fields.runtime}`);
  if (!["low", "medium", "high"].includes(fields.reasoning)) err(file, `reasoning must be low, medium or high`);

  const caps = Array.isArray(fields.capabilities) ? fields.capabilities : [];
  for (const cap of caps) if (!CAPABILITIES.has(cap)) err(file, `unknown capability ${cap}`);
  if (fields.runtime === "codex" && !caps.some((c) => ["web-search", "image-gen"].includes(c))) err(file, "codex runtime needs web-search or image-gen in capabilities");

  if (spec) {
    if (file !== `agents/${spec.folder}/${name}.md`) err(file, `roster path is agents/${spec.folder}/${name}.md`);
    if (fields.runtime !== spec.runtime) err(file, `roster runtime is ${spec.runtime}`);
    if (fields.model !== spec.model) err(file, `roster model is ${spec.model}`);
  } else {
    warn(file, "not in catalog/roster.json; list it in your progress file so stream A can add it");
  }

  if (fields.persona_name) {
    const key = fields.persona_name.toLowerCase();
    if (personas.has(key)) err(file, `persona_name ${fields.persona_name} already used by ${personas.get(key)}`);
    personas.set(key, file);
  }

  const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const positions = HEADINGS.map((h) => headings.indexOf(h));
  HEADINGS.forEach((h, i) => { if (positions[i] === -1) err(file, `missing section "## ${h}"`); });
  const found = positions.filter((p) => p !== -1);
  if (found.some((p, i) => i > 0 && p < found[i - 1])) err(file, "sections out of order");

  const lines = body.split("\n").filter((l) => l.trim()).length;
  if (lines < MIN_BODY_LINES) err(file, `body has ${lines} non-empty lines, min ${MIN_BODY_LINES}`);

  const know = body.match(/## What I know\n([\s\S]*?)(?=\n## |$)/);
  if (know) {
    const items = know[1].split("\n").filter((l) => /^\s*(-|\*|\d+\.)\s/.test(l)).length;
    if (items < MIN_KNOW_ITEMS) err(file, `"What I know" has ${items} list items, min ${MIN_KNOW_ITEMS}`);
  }

  const skills = body.match(/## Skills\n([\s\S]*?)(?=\n## |$)/);
  if (skills) {
    const names = [...skills[1].matchAll(/skills\/([a-z0-9-]+)\/SKILL\.md/g)].map((m) => m[1]);
    if (names.length === 0) err(file, "Skills section must point at skills/<name>/SKILL.md");
    for (const skill of names) declaredSkills.set(skill, { owner: name, file });
  }
}

// Roster coverage
for (const [name, spec] of expected) {
  if (stream && spec.stream !== stream) continue;
  if (seen.has(name)) continue;
  const path = `agents/${spec.folder}/${name}.md`;
  if (strict) err(path, "roster agent missing");
  else warn(path, "roster agent not written yet");
}

// Skills
const skillsDir = join(ROOT, "skills");
const onDisk = new Set(existsSync(skillsDir) ? readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory()) : []);
for (const [skill, { owner, file }] of declaredSkills) {
  if (!onDisk.has(skill)) { err(file, `points at skills/${skill}/SKILL.md, which does not exist`); continue; }
  const parsed = parse(join(skillsDir, skill, "SKILL.md"));
  if (!parsed) { err(`skills/${skill}/SKILL.md`, "missing or malformed frontmatter"); continue; }
  if (parsed.fields.owner && parsed.fields.owner !== owner && parsed.fields.owner !== "shared") {
    warn(`skills/${skill}/SKILL.md`, `owner is ${parsed.fields.owner}, but ${owner} also points at it`);
  }
}
for (const skill of onDisk) {
  const path = `skills/${skill}/SKILL.md`;
  if (!existsSync(join(ROOT, path))) { err(path, "missing SKILL.md"); continue; }
  const parsed = parse(join(ROOT, path));
  if (!parsed) { err(path, "missing or malformed frontmatter"); continue; }
  const { fields, body } = parsed;
  const ownerSpec = expected.get(fields.owner);
  if (stream && ownerSpec && ownerSpec.stream !== stream) continue;
  if (stream && !ownerSpec && stream !== "a") continue;
  if (!fields.description) err(path, "missing description");
  if (fields.description && fields.description.length > 200) err(path, `description is ${fields.description.length} chars, max 200`);
  if (!fields.owner) err(path, 'missing owner (an agent name, or "shared")');
  if (fields.owner && fields.owner !== "shared") {
    if (fields["disable-model-invocation"] !== "true") err(path, "agent-owned skills need disable-model-invocation: true");
    if (!declaredSkills.has(skill) && !seen.has(fields.owner) && !ownerSpec) err(path, `owner ${fields.owner} is not a known agent`);
    if (!declaredSkills.has(skill) && seen.has(fields.owner)) err(path, `owner ${fields.owner} does not list this skill`);
  }
  for (const heading of ["Steps", "Done when"]) {
    if (!new RegExp(`^## ${heading}`, "m").test(body)) err(path, `missing section "## ${heading}"`);
  }
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
const scope = stream ? `stream ${stream}` : "all";
const total = [...expected.values()].filter((s) => !stream || s.stream === stream).length;
console.log(`\n${scope}: ${[...seen].filter((n) => !stream || expected.get(n)?.stream === stream).length}/${total} roster agents written, ${errors.length} errors, ${warnings.length} warnings`);
if (errors.length) { console.log("FAIL"); process.exit(1); }
console.log("PASS");
