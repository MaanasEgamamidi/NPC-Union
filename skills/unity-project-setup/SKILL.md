---
name: unity-project-setup
description: "Sets up a new Unity 6 project: LTS pick, URP or HDRP, Input System, Addressables, asmdefs, .gitignore and LFS, CI hint. Use when starting a Unity project."
owner: unity-specialist
disable-model-invocation: true
argument-hint: "[game type, platforms, team size]"
---

# Unity project setup

## Inputs

- Target platforms. Console targets need the platform holder's developer approval for build modules.
- 2D or 3D, and visual ambition.
- Team size, and whether revenue plus funding is above the Personal threshold (see `knowledge/technical/engines/unity.md`).
- Existing package or asset store dependencies.

## Steps

1. Query https://services.api.unity.com/unity/editor/release/v1/releases (or open https://unity.com/releases/editor/archive) and note the newest editor in the latest LTS line. Check its end date on https://unity.com/releases/unity-6/support. Record both with today's date.
2. Choose the line: latest LTS for production. An Update release only if a feature you need exists only there, and write which feature.
3. Pipeline: URP if any target is mobile, web, Switch-class or VR standalone. HDRP only if every target is high-end PC or current console. Create the project from the matching template.
4. Input: install `com.unity.inputsystem`; set Player > Active Input Handling to the new package. Create one `.inputactions` asset with maps per context (Gameplay, UI) and generate the C# class.
5. Addressables: add `com.unity.addressables` if the game loads content by level, has DLC, or exceeds a few hundred MB. Otherwise use direct references and skip it.
6. Layout and asmdefs:
   ```
   Assets/_Project/
     Scripts/Runtime/   Game.Runtime.asmdef
     Scripts/Editor/    Game.Editor.asmdef (Editor only)
     Tests/             Game.Tests.asmdef (references Game.Runtime)
     Data/              ScriptableObject assets
     Art/ Audio/ Prefabs/ Scenes/
   ```
7. Editor settings: Asset Serialization Force Text; Version Control Visible Meta Files.
8. `.gitignore`: `Library/ Temp/ Obj/ Build/ Builds/ Logs/ UserSettings/ *.csproj *.sln`. Commit `Assets/`, `Packages/manifest.json`, `Packages/packages-lock.json`, `ProjectSettings/`, all `.meta` files. `.gitattributes` with LFS for `*.psd *.fbx *.png *.wav *.mp3 *.tga *.exr`.
9. Pin packages: read actual versions from Package Manager and keep them in `manifest.json`. Git packages get a tag or commit hash.
10. CI hint: hand the editor version string and build targets to `build-engineer`. GameCI and Unity Build Automation both need a licence activation secret.
11. Smoke test: an empty build to every target in week one.

## Output

```
## Unity setup: <project>
Editor: <6000.x.yfz> (<LTS|Update>, supported until <date>), checked <today>
Licence tier: <Personal|Pro|Enterprise>, reason
Pipeline: <URP|HDRP>, because <reason>
Input: Input System <version from PM>, maps <list>
Addressables: <yes/no>, because <reason>
Assemblies: <list>
Packages pinned: <name@version>
VCS: Git + LFS patterns <list> | Plastic/Perforce
CI: <tool>, targets <list>
Risks / UNVERIFIED: <list>
```

## Done when

- [ ] Editor version and support date come from Unity's own pages, dated today.
- [ ] Pipeline choice is consistent with every target.
- [ ] Active Input Handling is set to the new package only.
- [ ] Meta files are committed and Force Text is on.
- [ ] Every package version is pinned and the lock file is committed.
- [ ] An empty build has run on each target.
