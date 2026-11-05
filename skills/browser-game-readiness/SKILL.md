---
name: browser-game-readiness
description: Select a web game framework and verify a first playable on the target host.
owner: web-engine-specialist
disable-model-invocation: true
argument-hint: "[game, targets, host]"
---

# Browser Game Readiness

## Inputs

- Game dimensions, core interaction, team experience, existing dependencies and host.
- Browser/device matrix, first-play and frame budgets, offline and accessibility needs. Ask only for missing blockers; state assumptions for a prototype.

## Steps

1. Inspect manifest, lockfile, entry point and deployment settings. Record installed versions; check current releases and licences in the official links in `knowledge/technical/engines/web-frameworks.md`.
2. Compare Phaser 4 and PixiJS for a 2D request, or Three.js, Babylon.js and PlayCanvas for 3D. Record which input, physics, tooling and deployment systems the choice leaves to the team. If dimensionality or existing work points elsewhere, explain it.
3. Define supported devices and renderer fallback; list cross-origin assets and host headers. Feature-detect capabilities rather than guessing device support.
4. Build or specify a minimal interactive slice. Separate initial download, decode and upload; set a resolution policy and map pointers through the displayed canvas rectangle.
5. Exercise audio activation, background/foreground, resize, network failure and context loss; repeat on the real host and representative device. Record measured values and unrun checks separately.
6. Pin actual dependencies in the project lockfile and hand deployment inputs to `build-engineer`. Do not change a working project's versions without a migration reason.

## Output

```
Framework/version and date checked: <value and source>
Targets and fallback: <matrix>
Missing systems and ownership: <list>
Asset/startup path: <stages and measured times>
Host, build command, output and headers: <values>
Tests and evidence: <device, browser, result>
Risks / UNVERIFIED: <list>
```

## Done when

- [ ] Version, licence and hosted service costs are checked separately.
- [ ] Fallback, resource ownership and audio activation have explicit plans.
- [ ] Actual target host and devices are tested, or remaining tests are marked UNVERIFIED.
