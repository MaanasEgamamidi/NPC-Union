---
name: save-format-design
description: Design a save format: header, versioned schema, slots, atomic write sequence, load fallback, and cloud sync conflict rules.
owner: save-systems-engineer
disable-model-invocation: true
argument-hint: "[engine, platforms, cloud sync yes/no, what must persist]"
---

# Save format design

## Inputs

- Engine and platforms. Cloud sync target (Steam Cloud, platform cloud, own backend, none).
- The state that must persist (from game-designer or systems-designer). Ask for it if missing.
- Expected size per save and save frequency (manual, checkpoint, autosave interval).
- Whether players or modders will read or edit saves.

## Steps

1. Split state into persisted, derived (rebuild on load), and session-only. Persist only the first.
2. Pick the format using `knowledge/technical/programming/save-systems.md`: JSON, MessagePack, FlatBuffers or protobuf. Write down why.
3. Define the header: format tag, schema version (int), build ID, payload length, checksum (CRC32), save timestamp, monotonic save counter, total playtime.
4. Define schema v1 with stable string IDs, integer currency, and a policy for unknown fields (preserve and write back).
5. Define slots: number, file naming (`slot_<n>.sav`, `slot_<n>.sav.bak`), and slot metadata for UI (name, playtime, location, thumbnail path).
6. Write the atomic save sequence for each platform: tmp file, flush, fsync, rename or ReplaceFile, directory fsync where supported, rotate `.bak`.
7. Write the load sequence: read header, verify checksum, refuse newer versions, run the migration chain, fall back to `.bak`, then report a clear error to UI.
8. Write the cloud conflict rule: compare save counter and playtime, not wall clock. If both advanced, ask the player.
9. Note platform limits (cloud quota, file count) with a link; mark UNVERIFIED if not checked.

## Output

```
## Save format: <game> v<schema version>
Format: <JSON | MessagePack | FlatBuffers | protobuf> because <reason>
Header: | field | type | notes |
Schema v1: | path | type | stable ID rule | notes |
Slots: <count, file names, metadata>
Write sequence (<platform>): 1. ... 2. ...
Load sequence: 1. ... 2. ...
Conflict rule: <rule>
Platform limits: <quota, path patterns, source link>
Open questions: <list>
```

## Done when

- [ ] The header has a version and checksum.
- [ ] Write sequence never leaves the only copy half-written.
- [ ] Load refuses newer versions and falls back to the backup.
- [ ] Conflict rule never auto-discards progress that both sides made.
