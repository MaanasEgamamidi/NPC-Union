---
name: roster
description: Browse NPC Union agents by folder, capability, or runtime. Use to see who is in the union.
owner: shared
argument-hint: "[folder | capability | runtime]"
---

# Roster

## Inputs

An optional filter: a folder (e.g. `creative/art`), a capability (e.g. `image-gen`), or a runtime (`claude`, `codex`).

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/catalog/agents.json`.
2. Filter by folder prefix, capability membership, or runtime.
3. Group by folder and print the table below. Count rows from the data, never from memory.

## Output

```
### <folder>
| Persona | Agent | Runtime | Model | Capabilities | Description |
```

## Done when

- [ ] Every row comes from the catalog file.
