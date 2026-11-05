# Contributing

Thanks for helping. The bar for an agent is that a working professional in its niche would learn something from its file. Fewer, sharper agents beat more, vaguer ones.

## Set up

```bash
git clone https://github.com/MaanasEgamamidi/npc-union.git
```

```bash
cd npc-union
```

```bash
node scripts/validate.mjs --strict
```

Node 18 or newer. The scripts have no dependencies.

To try your changes, load the clone as a local plugin in Claude Code, or run `./install.sh` into a test project.

## Adding a specialist

1. Run `/npc-union:new-specialist <topic>`. It asks narrowing questions, researches with citations, and writes the agent, its skills, knowledge files, and roster entry.
2. Or write it by hand from `templates/agent.md` and `templates/skill.md`, following [docs/AGENT-SCHEMA.md](docs/AGENT-SCHEMA.md).
3. Put the file at `agents/<division>/<department>/<name>.md`. The plugin ID becomes `npc-union:<division>:<department>:<name>`.
4. Add the agent to `catalog/roster.json`, then regenerate the catalog with `node scripts/build-catalog.mjs`.
5. Run `node scripts/validate.mjs --strict` and fix every failure.

### Agent rules

- `description` is 200 characters or fewer. Every agent description is loaded on every turn.
- Body sections, in this order: `## Who I am`, `## What I know`, `## When to call me`, `## How I work`, `## Knowledge and sources`, `## Skills`, `## What I hand back`, `## Worked example`.
- `## What I know` needs at least 8 specific heuristics, numbers, or pitfalls that would not fit in any other agent's file.
- Personality goes in the first and last lines of a reply. It never replaces or delays facts.
- Personas are original. Do not reuse names, portraits, or personalities from other products.
- Use `runtime: codex` only when the main output depends on live web search or image generation. The agent must still work, and say what it cannot do, when run by Claude.

### Skill rules

- Agent-owned skills set `disable-model-invocation: true` and `owner: <agent-name>`.
- A skill is a procedure: inputs, steps, an output template, and a done check.

### Knowledge rules

- Files in `knowledge/` need frontmatter with `title`, `tags`, `sources`, and `last_verified: YYYY-MM-DD`.
- Anything that can go stale (API, version, price, licence, dataset location) needs a source link.
- Mark anything you could not check as `UNVERIFIED`. Never invent a URL, dataset, game, quote, or statistic.
- Do not commit screenshots or art from commercial games. Link to them instead.
- No secrets, personal data, or local machine paths.

## Adapted work

If a file is substantially based on [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios), add `adapted_from: Claude-Code-Game-Studios/<path>` to its frontmatter.

## Pull requests

- One agent, or one related group, per pull request.
- Fill in the pull request template, including how you checked facts.
- CI runs the validator, tests, and a catalog freshness check. Regenerate the catalog if it fails.

## Writing style

Plain and specific. No hype words, no filler intros. Do not state counts in prose unless a script generates them.

By contributing you agree your work is released under the [MIT License](LICENSE) and that you will follow the [Code of Conduct](CODE_OF_CONDUCT.md).
