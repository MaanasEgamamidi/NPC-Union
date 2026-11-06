---
name: team
description: Assemble, show, or clear the team of specialists the Steward may use. With a team set, only those agents run unless you approve more.
owner: shared
argument-hint: "[set a,b,c | add | remove | preset <id> | show | clear]"
---

# Team

A team is the short list of specialists you want on this project. While one is active, the Shop Steward uses only those agents and asks you before it brings in anyone else. The team is stored in your project at `.npc-union/team.json`, so it survives restarts and can be committed.

## Inputs

A subcommand and agent names. Names can be an agent name (`sprite-artist`), a persona (`Quantabit`), or a plugin ID. With no arguments, run `show`.

## Steps

1. Run `node ${CLAUDE_PLUGIN_ROOT}/scripts/team.mjs <subcommand> <args>` from the user's project folder. It validates every name against the catalog and prints a suggestion for typos.
2. `set a,b,c` replaces the team. `add` and `remove` edit it. `preset <id>` loads a starter team (list them with `presets`). `clear` removes the team, so every agent is available again.
3. After any change, run `show` and read the team back to the user in one line, with how many run on Claude and how many on Codex.
4. Tell the user the rule once: the Steward now uses only these agents, and will stop and ask before using anyone else.
5. If the user built the team in the Assemble Team tab, they paste a `/npc-union:team set ...` command or drop the downloaded `team.json` into `.npc-union/`. Handle either.

## Output

```
Team "My team" (5): game-designer, sprite-artist, ... (3 Claude, 2 Codex)
Rule: the Steward uses only these. Anyone else needs your OK first.
```

## Done when

- [ ] The script ran and its `show` output matches what the user asked for.
- [ ] The user was told the "only these, ask first" rule.
