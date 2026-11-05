---
name: gamemaker-room-diagnosis
description: Diagnose GameMaker instance, collision and room lifecycle failures.
owner: gamemaker-specialist
disable-model-invocation: true
argument-hint: "[symptom, runtime, target]"
---

# Gamemaker Room Diagnosis

## Inputs

- Reproduction, project or event snippets, IDE and runtime, target, VM or YYC, and expected outcome.
- Collision masks, room transitions and persistence requirements when relevant.

## Steps

1. Record versions and target; check `knowledge/technical/engines/gamemaker.md` and the matching official manual. Preserve the existing runtime while isolating the bug.
2. Map object definitions to instances, creation, persistent controllers, relevant events and room transitions. Identify ownership and cleanup of runtime-created resources.
3. Reproduce on a small room. Inspect sprite origin, mask shape and changes per frame; show collision bounds if the project has a debug overlay.
4. Trace movement in Step, position before and after each axis, and obstacle checks. Test corners, high speed and starting overlaps; avoid assuming a simple endpoint check covers swept motion.
5. Make the smallest event-specific correction. Check Draw/GUI coordinate assumptions if the symptom is visual; avoid saving room instance IDs across room unload.
6. Repeat the reproduction, room reload and target build. Record VM/YYC and platform differences and pass build requirements to `build-engineer`.

## Output

```
IDE/runtime and target: <values>
Reproduction and expected result: <steps>
Objects/events and ownership: <map>
Root cause and evidence: <finding>
Change: <object/event and GML or editor steps>
Regression checks: <results>
Risks / UNVERIFIED: <list>
```

## Done when

- [ ] The observed symptom is distinguished from its suspected cause.
- [ ] Masks, lifetime and event order are checked where relevant.
- [ ] Target and repeated-room tests are recorded or marked UNVERIFIED.
