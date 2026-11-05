---
name: godot-version-check
description: Finds a Godot project's version from project.godot and lists breaking changes to check before an upgrade. Use before upgrading Godot or when code from another version fails.
owner: godot-specialist
disable-model-invocation: true
argument-hint: "[path to project.godot] [target version, optional]"
---

# Godot version check

## Inputs

- The project's `project.godot` (or its path).
- The installed editor version (Help > About, or `godot --version`).
- The target version, if an upgrade is planned. If none is given, use the newest stable from the archive page.

## Steps

1. Read `project.godot`. `config_version=5` means Godot 4.x; `config_version=4` means Godot 3.x. Read `config/features=PackedStringArray("4.x", ...)` for the minor version last saved, plus feature tags such as `"Forward Plus"`, `"Mobile"`, `"GL Compatibility"` or `"C#"`.
2. Check for C#: a `.csproj` or `.sln` at the root and a `[dotnet]` section mean the .NET editor build is required. Read the `Godot.NET.Sdk/<version>` line in the `.csproj`.
3. Open https://godotengine.org/download/archive/ and record the newest stable and pre-release with dates.
4. For each minor step between current and target (for example 4.5 to 4.6, then 4.6 to 4.7), open the matching "Upgrading to Godot 4.x" page under https://docs.godotengine.org/en/stable/tutorials/migrating/ and list the items that touch this project. Do not skip intermediate guides.
5. Grep the project for each listed API (`glob: "*.gd"` for GDScript; ripgrep has no gdscript type). Count hits per item.
6. Check addons in `addons/*/plugin.cfg` for their stated Godot version; flag any without a release for the target.
7. Plan the upgrade: commit or branch first, open the project in the new editor, let it re-import, fix errors, run the game, then export each preset with matching new export templates.
8. Mark any change you read in a non-official source, or could not open today, as UNVERIFIED.

## Output

```
## Godot version check: <project>
Project saved with: <4.x> (config/features), renderer <tag>, C# <yes/no, SDK version>
Installed editor: <version>
Current stable: <version> (<date>), pre-release: <version> (<date>), checked <today>
Target: <version>
Breaking changes that affect this project:
| Version step | Change | Hits (files) | Fix |
Addons at risk: <name, stated version>
Upgrade steps: <numbered>
UNVERIFIED: <list>
```

## Done when

- [ ] Version came from `project.godot`, not a guess.
- [ ] Every intermediate migration guide was opened, with links listed.
- [ ] Each breaking change has a hit count from a real grep.
- [ ] Addons are checked against the target.
- [ ] The plan starts from a committed or branched state.
