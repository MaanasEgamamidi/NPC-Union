# How it works

## Hierarchy

```
you
 └─ Shop Steward            npc-union:leadership:shop-steward
     ├─ Creative Lead       npc-union:leadership:creative-lead
     │   └─ creative/{design, art, screens-effects, sound, narrative}
     ├─ Technical Lead      npc-union:leadership:technical-lead
     │   └─ technical/{programming, engines, multiplayer, ai-integration, platform-tools, asset-scouts}
     ├─ Production Lead     npc-union:leadership:production-lead
     │   └─ production
     ├─ Knowledge Lead      npc-union:leadership:knowledge-lead
     │   └─ knowledge/{genres, art-styles, domains}
     └─ Budget Keeper       npc-union:leadership:budget-keeper (advisor, no specialists under it)
```

The Budget Keeper watches Claude and Codex usage and second-opinions model and effort per task. It reads `scripts/usage-check.mjs`, which costs no model tokens, and the Steward consults it before heavy plans. You can also run the script yourself in a terminal: `node scripts/usage-check.mjs`.

Claude Code lets a subagent spawn subagents up to three layers below the main conversation, so Steward → lead → specialist fits. Each department folder is a "local" in the union theme.

The plugin scans `agents/` recursively, and subfolders become part of the ID: `agents/creative/art/sprite-artist.md` registers as `npc-union:creative:art:sprite-artist`.

## Ways in

| Entry point | Use |
|---|---|
| `/npc-union:steward` | Hand a request to the Steward inside a normal session |
| `claude --agent npc-union:leadership:shop-steward` | Run the whole session as the Steward |
| `/npc-union:talk <agent>` | Talk to one specialist directly, in character |
| `/npc-union:route` | Ask which agents should handle something, without running them |
| `/npc-union:build-pipeline <idea>` | Get a written run order from [PIPELINE.md](PIPELINE.md) for a specific game |

## Routing

1. The Steward reads `catalog/agents.json`, the generated catalog of every agent's ID, description, division, department, runtime, model, and capabilities. It picks from this file instead of relying only on the agent listing Claude Code shows it.
2. If the request fits one department, the Steward runs those specialists itself.
3. If it crosses departments, the Steward asks the relevant division lead for a plan, or has the lead run its specialists and report back.
4. Knowledge agents (genre, art style, domain) join as reviewers whenever a project names a genre, a style, or a real-world subject.
5. For whole projects, the Steward follows the phases and gates in [PIPELINE.md](PIPELINE.md).

## Runtimes

Each agent's frontmatter has a `runtime` field.

| Runtime | When it is used | How it runs |
|---|---|---|
| `claude` | Code, writing, design reasoning, review | Spawned as a Claude Code subagent with the agent's `model` |
| `codex` | Main output depends on live web search or image generation (asset scouts, image-making artists, data hunters) | `node scripts/run-agent.mjs <agent> "<task>"` |

`run-agent.mjs` reads the agent's frontmatter and uses its body as instructions. If Codex is installed it runs Codex with web search on, the agent's `reasoning` effort, and the model from `NPC_UNION_CODEX_MODEL`. It passes arguments as an array, never through a shell string. If Codex is not installed it falls back to `claude -p` and prints a notice. Every `codex` agent says in its file what it cannot do without Codex. `--dry-run` prints the command without running it.

## Skills

- A small set of shared skills (`steward`, `talk`, `route`, `roster`, `build-pipeline`, `kb`, `new-specialist`) stay model-invocable and have short descriptions.
- Agent-owned skills set `disable-model-invocation: true`, so they do not cost context on every turn. The owning agent reads `${CLAUDE_PLUGIN_ROOT}/skills/<skill>/SKILL.md` when it needs one. You can still run any of them with `/npc-union:<skill>`.

## Knowledge base

`knowledge/` holds Markdown files with `title`, `tags`, `sources`, and `last_verified` frontmatter. `scripts/build-index.mjs` builds `knowledge/index.json`, and `scripts/kb-search.mjs` does keyword (BM25-style) search over it. There is no vector database. Agents are told to look up version-specific facts (engine versions, API limits, prices, licences) at run time and say when they are unsure.

## Reporting

Every specialist ends with a `## What I hand back` deliverable in a fixed format, so the next agent can use it without re-asking. The Steward merges what comes back into one reply:

1. A short answer to what was asked.
2. Decisions and recommendations, each credited to the agent that made it.
3. Disagreements between agents, stated rather than averaged away.
4. Anything marked `UNVERIFIED` or looked up live.
5. The suggested next step and which agent takes it.

Personality shows up in the first and last lines of each agent's reply. It does not replace or delay facts.
