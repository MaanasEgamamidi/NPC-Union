---
title: Web game frameworks and browser constraints
tags: [web, phaser, pixijs, threejs, babylon, playcanvas]
sources: ["https://phaser.io/download/phaser4", "https://github.com/pixijs/pixijs/releases", "https://github.com/mrdoob/three.js/releases/latest", "https://github.com/BabylonJS/Babylon.js/releases", "https://github.com/playcanvas/engine/releases"]
last_verified: 2026-11-05
---

# Web framework snapshot

Recheck all releases and terms for the actual project; addons, assets, hosted services and editors have separate terms. Last verified: 2026-11-05.

- Phaser 4: 4.2.1, [release archive](https://phaser.io/download/phaser4). The framework is free, open source and MIT licensed: [framework](https://www.phaser.io/phaser4), [licence](https://github.com/phaserjs/phaser/blob/master/LICENSE.md). Phaser 4 is 2D and distinct from Phaser AE: [publisher explanation](https://phaser.io/news/2026/07/no-you-didn-t-miss-a-3d-update).
- PixiJS: 8.22.0, [releases](https://github.com/pixijs/pixijs/releases); MIT, no licence fee under its [licence](https://github.com/pixijs/pixijs/blob/dev/LICENSE).
- Three.js: r187, [latest release](https://github.com/mrdoob/three.js/releases/latest); MIT, no licence fee under its [licence](https://github.com/mrdoob/three.js/blob/dev/LICENSE).
- Babylon.js: 9.32.0, [releases](https://github.com/BabylonJS/Babylon.js/releases); Apache 2.0, no licence fee under its [licence](https://github.com/BabylonJS/Babylon.js/blob/master/license.md?plain=1).
- PlayCanvas engine: 2.23.3, [releases](https://github.com/playcanvas/engine/releases); MIT, no licence fee under its [licence](https://github.com/playcanvas/engine/blob/main/LICENSE). The hosted Editor is separately priced: free public plan, Personal $15/month, Organization $50/seat/month, [plans](https://playcanvas.com/plans); check billing options and current terms.

## Runtime references

- Browser audio may require user activation: [MDN Web Audio best practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices), checked 2026-11-05.
- For browser API availability, test the actual supported browsers and inspect current compatibility data; do not assume WebGPU or a particular extension. Recheck API details in the relevant framework's versioned documentation before implementing.
