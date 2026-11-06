---
name: token-savings-audit
description: Audits a session, plan, or repo setup for token waste and ranks fixes by saving and quality risk. Use when usage runs hot or before a large multi-agent job.
owner: budget-keeper
disable-model-invocation: true
argument-hint: "[session, plan, or path to audit]"
---

# Token savings audit

Finds avoidable spend and ranks the fixes. A fix that lowers quality is not a saving, so every row carries a quality risk and a check.

## Inputs

- What to audit: a planned job (a list of agents and tasks), the current session, or the plugin setup.
- The latest `usage-check` numbers, if available.
- If the target is unclear, ask: "Audit this plan, this session, or the setup?"

## Steps

1. For a plan, list each agent with runtime, model, reasoning and expected volume (files read, images made, rounds). Read `${CLAUDE_PLUGIN_ROOT}/catalog/agents.json`.
2. Check the structure first, because it moves the most tokens:
   - Parallel agents that read the same files. Merge them or pass the content once.
   - Specialists whose output nobody uses next.
   - Many agents where two would do. Fewer, sharper briefs are cheaper than overlap.
   - A long conversation carrying finished work. Suggest `/compact` at a natural break, or `/clear` between unrelated tasks.
3. Check the setup:
   - `CLAUDE.md` over about 200 lines, with workflow detail that belongs in a skill.
   - Unused MCP servers (`/mcp`), and MCP where a CLI like `gh` would do.
   - Agent and skill descriptions over 200 characters, which cost context every turn.
   - Hooks that could filter big test or log output.
4. Check the cache: model or effort switches mid-task, `opusplan` toggles, idle gaps past the cache lifetime, and tool changes. See the cache section in `${CLAUDE_PLUGIN_ROOT}/knowledge/leadership/claude-usage-and-savings.md`.
5. Check the routing: read-only search or listing on an expensive model (use haiku), judgment work on a cheap one (do not downgrade it), Codex doing work Claude does equally well, and Claude doing live search or image generation that Codex handles.
6. Check background spend: loops, scheduled tasks, goal check-ins, cross-session messages, prompt suggestions and idle compaction. Each can start a full-context turn while idle.
7. Rank findings by estimated saving, then drop any whose quality risk is "check" unless a verification step is named.
8. Re-verify any number you quote against its source link. Mark the rest UNVERIFIED.
9. Never recommend removing a verification step, source check, or review gate to save tokens.

## Output

```
## Savings audit: <target>
| # | Finding | Fix | Saving | Quality risk | How to check |
|---|---------|-----|--------|--------------|--------------|
Do now: <1-3 items>   Not worth it: <items with a reason>
UNVERIFIED: <list or none>
```

## Done when

- [ ] Every finding has a fix, a saving (estimated or measured, labelled), and a quality risk.
- [ ] No fix removes a check or lowers a model or effort level on judgment work without a stated test.
- [ ] Quoted limits and settings point at a source and date.
