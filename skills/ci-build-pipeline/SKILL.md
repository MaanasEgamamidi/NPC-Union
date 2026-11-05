---
name: ci-build-pipeline
description: Write or repair a pinned, cached CI pipeline (GitHub Actions by default) that tests, exports and uploads Godot, Unity, Unreal or web game builds.
owner: build-engineer
disable-model-invocation: true
argument-hint: "[engine + version, platforms, CI host]"
---

# CI build pipeline

## Inputs

- Engine and exact version (read `project.godot`, `ProjectSettings/ProjectVersion.txt`, or the `.uproject` EngineAssociation).
- Target platforms and the export preset or build target names.
- CI host (GitHub Actions unless told otherwise) and runner type (hosted or self-hosted).
- Where builds go: artifacts only, itch.io, Steam beta branch.

## Steps

1. Confirm the export config is committed (`export_presets.cfg`, Unity build settings script, Unreal BuildGraph or BuildCookRun args).
2. Look up the current command-line flags for the pinned engine version on the official page listed in `knowledge/technical/programming/build-ci.md`. Do not recall them.
3. Pin: runner image, engine version, action versions (major tag at minimum, commit SHA for third-party actions).
4. Add a cache keyed on lockfiles or asset hashes: Godot `.godot/`, Unity `Library/`, Unreal DDC (self-hosted), web `node_modules` via the lockfile.
5. Add steps in order: checkout with tags, install engine and templates, import, run tests, export or build, stamp version from `git describe --tags`, upload artifact plus symbols.
6. Gate deploy jobs on tags or a manual dispatch, never on every push.
7. List required secrets by name only. Never write a value into the file.
8. Run it. Fix the first failing step only, then rerun. Record each failure and fix.

## Output

```
## Pipeline: <game> (<engine> <version>)
File: .github/workflows/<name>.yml
Triggers: <push branches, tags, dispatch>
Pins: runner <image>, engine <version>, actions <list>
Cache: <path> keyed on <files>
Jobs: <job: steps>
Secrets required: <names>
Version string: <format>
Artifacts kept: <builds, symbols, retention days>
Verify before use: <flags or URLs to recheck, with page>
```

## Done when

- [ ] A clean run succeeds from an empty cache, and a second run hits the cache.
- [ ] Every version and action is pinned.
- [ ] No secret value appears in the repo.
- [ ] The artifact name contains the version string.
