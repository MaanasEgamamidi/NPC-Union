---
name: unity-version-check
description: Reads a Unity project's version from ProjectVersion.txt and lists API and package changes to handle before upgrading. Use before a Unity upgrade or when old code fails.
owner: unity-specialist
disable-model-invocation: true
argument-hint: "[project path] [target editor version, optional]"
---

# Unity version check

## Inputs

- `ProjectSettings/ProjectVersion.txt` and `Packages/manifest.json` (plus `packages-lock.json`).
- Target version. If none, use the newest editor on the latest LTS line.

## Steps

1. Read `m_EditorVersion` (for example `6000.0.85f2`) and `m_EditorVersionWithRevision`. Map the line: `6000.N` is Unity 6.N; `2022.3` and `2021.3` are older LTS lines.
2. Query https://services.api.unity.com/unity/editor/release/v1/releases?order=RELEASE_DATE_DESC and record the newest patch on the current line and on the target line, with dates. Check support dates at https://unity.com/releases/unity-6/support.
3. Open the upgrade guide for each line step under the Manual's "Upgrade Unity" section for the target version (https://docs.unity3d.com/<version>/Documentation/Manual/ ; find "Upgrade guides"). Note items that touch this project.
4. Grep `Assets/` (`glob: "*.cs"`) for known hotspots: `FindObjectOfType`, `FindObjectsOfType` (obsolete, use `FindFirstObjectByType` / `FindObjectsByType`), `Input.Get` (legacy input), `ScriptableRenderPass.Execute` overrides (URP Render Graph), `GetInstanceID` (check the target's notes on `EntityId`), `UnityEngine.Experimental` namespaces. Count hits per file.
5. For each package in `manifest.json`, note the version the target editor's Package Manager offers. Flag packages with major version jumps and git packages without tags.
6. Check Asset Store assets with editor scripts or native plugins: confirm the publisher supports the target line, or hand to `unity-store-scout`.
7. Plan: branch, close the editor, delete `Library/`, open in the target editor, let it re-import, fix compile errors, run tests, build each target.
8. Mark anything not confirmed on a Unity page today as UNVERIFIED.

## Output

```
## Unity version check: <project>
Current: <m_EditorVersion> (Unity 6.N, <LTS|Update>, support ends <date>)
Target: <version>, latest patch <x> (<date>), checked <today>
Upgrade guides read: <links>
Code hotspots:
| API | Hits | Files | Replacement |
Packages:
| Package | Current | Target offers | Risk |
Third-party assets at risk: <list>
Steps: <numbered>
UNVERIFIED: <list>
```

## Done when

- [ ] Version came from ProjectVersion.txt.
- [ ] Every line step's upgrade guide is linked.
- [ ] Hotspots have real grep counts.
- [ ] Every package has a target version from Package Manager, not memory.
- [ ] The plan starts on a branch with `Library/` cleared.
