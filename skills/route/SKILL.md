---
name: route
description: Decide which NPC Union specialist or lead should handle a request, and on which runtime. Use when unsure who to ask.
owner: shared
argument-hint: "[the request]"
---

# Route

## Inputs

The user's request. If it names no game, engine, or platform and the choice depends on it, ask one question.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/catalog/agents.json`.
2. Match the request against each agent's description, department, and capabilities. Prefer the narrowest specialist that fully covers it.
3. If two or more departments in one division are needed, route to that division's lead. If divisions differ, route to `shop-steward`.
4. If the user has a team (`node ${CLAUDE_PLUGIN_ROOT}/scripts/team.mjs show`), pick only from it. List a better-fitting agent outside the team on its own line as "needs your OK", never in the run order.
5. For each pick, run `node ${CLAUDE_PLUGIN_ROOT}/scripts/run-agent.mjs <name> --which` to confirm the runtime that will really be used.

## Output

```
| Order | Agent | Persona | Runtime | Why |
|-------|-------|---------|---------|-----|
Run: <Agent tool with id npc-union:...> or <node .../run-agent.mjs <name> "<task>">
```

## Done when

- [ ] Every pick exists in the catalog.
- [ ] With a team active, every pick is on it, or is marked "needs your OK".
- [ ] Each row has a one-line reason and a runtime.
