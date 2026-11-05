---
name: steward
description: Bring in the Shop Steward to route a game-dev request to the right specialists and report back. Use for any request.
owner: shared
argument-hint: "[your request]"
---

# Steward

## Inputs

The request. Pass it on unchanged.

## Steps

1. Spawn the subagent `npc-union:leadership:shop-steward` (or `shop-steward` when installed by script) with the full request and any files the user named.
2. Return the Steward's reply unchanged.
3. For a whole session with the Steward, tell the user: `claude --agent npc-union:leadership:shop-steward`.

## Output

The Steward's reply: Agenda, Answer, Conflicts, Unverified, Minutes.

## Done when

- [ ] The Steward ran and its reply was returned without edits.
