---
name: editor-tool-build
description: Scope, build and ship an in-editor tool for Unity, Godot, Unreal or a web editor, with undo, correct serialization, validation, dry run and a docs page.
owner: tools-programmer
disable-model-invocation: true
argument-hint: "[engine + version, the manual task, who does it]"
---

# Editor tool build

## Inputs

- Engine and exact version.
- The manual task in steps, who does it, how often, and how long it takes by hand.
- What data it touches (scenes, prefabs, resources, data tables) and whether those are under version control.

## Steps

1. Compute time saved per week: minutes per task x runs per week x people. If under about 1 hour, propose a checklist or validator only.
2. Write the scope: one sentence of what it does, a list of what it will not do, and the success test.
3. Pick the entry point: menu item, inspector button, editor window, or on-save validator.
4. Look up the undo and serialization API for the engine version (Unity `Undo` + `SerializedObject`; Godot `EditorUndoRedoManager`; Unreal `FScopedTransaction` + `Modify()`). Read the docs page; do not recall it.
5. Build a dry-run path that lists every change without making it.
6. Build the apply path: one undo group per user action, progress bar and cancel for long runs, editor-only folder or plugin so it never ships in the game build.
7. Add validation: refuse bad input with a message that names the asset and the fix.
8. Test: run on a copy of a real level, undo once and diff against version control (it should be clean), run twice (second run should change nothing).
9. Write the docs page: what it does, how to run it, what each error means, how to disable it.
10. Watch one real user run it. Fix what they trip on.

## Output

```
## Tool: <name> (<engine> <version>)
Saves: <minutes/week> for <who>
Entry point: <menu path / window / validator>
Does: <one sentence>   Does not: <list>
Undo: <API used, one group per action: yes/no>
Dry run: <how to trigger>
Validation rules: | rule | message | fix |
Files: <paths, all editor-only>
Tests: undo clean <y/n>, idempotent <y/n>, real-data run <y/n>
Docs: <link or path>
```

## Done when

- [ ] One undo reverts one user action and leaves version control clean.
- [ ] A second run changes nothing.
- [ ] The tool code is excluded from game builds.
- [ ] A real user ran it once without help.
