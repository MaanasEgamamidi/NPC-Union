// Builds office3d/specialists.json from catalog/agents.json.
// Run: node scripts/build-office-data.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "catalog", "agents.json"), "utf8"));

const specialists = catalog.agents.map((a) => ({
  name: a.name,
  persona: a.persona_name || a.name,
  description: a.description || "",
  division: a.division,
  department: a.department,
  folder: a.folder,
  model: a.model,
  runtime: a.runtime,
  reasoning: a.reasoning || "",
  capabilities: a.capabilities || [],
  isMaster: a.name === "shop-steward",
  avatar: `../assets/avatars/${a.name}.png`,
}));

writeFileSync(
  join(root, "office3d", "specialists.json"),
  JSON.stringify({ count: specialists.length, specialists }, null, 2) + "\n",
);
console.log(`Wrote ${specialists.length} specialists to office3d/specialists.json`);
