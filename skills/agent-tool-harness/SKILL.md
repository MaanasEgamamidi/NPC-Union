---
name: agent-tool-harness
description: Checks a Claude Code agent, skill, or plugin layout against repo rules (description length, frontmatter, skill paths, spawn limits) before handoff.
owner: agent-tooling-engineer
disable-model-invocation: true
argument-hint: "[path to agent file, skill folder, or plugin root]"
---

# Agent tool harness

A repeatable check for agent and skill files before they go to review. Facts come from `${CLAUDE_PLUGIN_ROOT}/knowledge/technical/claude-code-plugin-facts.md`.

## Inputs

- A path: one agent `.md`, one `skills/<name>/` folder, or the plugin root.
- The templates: `templates/agent.md` and `templates/skill.md`.
- If no path is given, ask: "Which file or folder should I check, and is this a new file or a fix?"

## Steps

1. List the target files with Glob (`agents/**/*.md`, `skills/*/SKILL.md`).
2. For each agent, derive its ID from the path (subfolders join with `:` after `npc-union:`) and confirm `name` matches the filename.
3. Check the description is 200 characters or fewer. Use Bash, for example `awk -F'description: ' '/^description:/{print length($2)}' <file>`.
4. Check frontmatter keys against the template. Flag unknown or misspelled keys, since unknown fields are silently ignored. Flag `hooks`, `mcpServers`, or `permissionMode` on plugin agents, since they are ignored.
5. Check `model` is one of `sonnet`, `opus`, `haiku`, `fable`, a full Claude ID, or `inherit`. Lists must be flow style on one line.
6. If `tools` includes `Agent(...)`, confirm each named agent exists and the spawn chain stays within three layers below the main conversation.
7. Check body headings are present and in template order.
8. For each skill, confirm `owner` names a real agent, `disable-model-invocation: true` is set for agent-owned skills, and the owner's `## Skills` section points at `${CLAUDE_PLUGIN_ROOT}/skills/<name>/SKILL.md`.
9. Search the body for hardcoded absolute paths and replace them with `${CLAUDE_PLUGIN_ROOT}`.
10. Run `claude plugin validate .` from the plugin root if the CLI is installed. Otherwise record "CLI not available".
11. Mark any rule you relied on that is not in the facts file as UNVERIFIED.

## Output

```
Harness report: <target>
Date: <YYYY-MM-DD>

| File | ID | Desc chars | Keys OK | Headings OK | Skill links OK | Notes |
|------|----|-----------|---------|-------------|----------------|-------|
| ...  | ...| ...       | yes/no  | yes/no      | yes/no/n.a.    | ...   |

Validator: <output or "CLI not available">
Fixes made: <list>
UNVERIFIED: <list or "none">
Send to: <peer agent, if any, and why>
```

## Done when

- [ ] Every target file appears in the table.
- [ ] Every description is 200 characters or fewer.
- [ ] No ignored or misspelled frontmatter keys remain, or each is listed in Notes.
- [ ] Every `Agent(...)` name resolves and no chain is deeper than three layers.
- [ ] Every agent-owned skill has `owner` and `disable-model-invocation: true`, and its owner links to it.
- [ ] Validator result is recorded.
- [ ] UNVERIFIED items are listed.
