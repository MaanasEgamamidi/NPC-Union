---
title: Branching structures and narrative tools
tags: [narrative, branching, ink, yarn-spinner, twine, ludonarrative, environmental-storytelling]
sources:
  - "https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/"
  - "https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md"
  - "https://docs.yarnspinner.dev/"
  - "https://twinery.org/"
  - "https://twinery.org/cookbook/"
  - "https://www.articy.com/"
  - "https://gdcvault.com/"
last_verified: 2026-11-05
---

# Branching structures and narrative tools

Owner: narrative-director. Only the Emily Short post was fetched on 2026-11-05. Everything else below is marked where it was not checked in this session.

## Structure patterns

- **Full branching (time cave):** every choice spawns separate content. Paths grow as 2^n for n binary choices. Rarely affordable past two or three levels.
- **Branch and bottleneck:** paths split and rejoin; state carries the difference forward. The default for commercial choice games.
- **Quality-based narrative (QBN):** storylets unlock by numeric qualities (inventory, skills, progress). Named and described in Emily Short's "Beyond Branching" (April 12, 2016). Verified 2026-11-05.
- **Salience-based narrative:** content chosen from a pool by best fit to current world state. Same source. Verified 2026-11-05.
- **Waypoint narrative:** conversation topics linked by transitions, with the system pathfinding toward trigger topics. Same source. Verified 2026-11-05.

## Talks and terms

- **Ludonarrative dissonance:** use the term for a tension between a game's story and its mechanics; locate an accessible primary source before attributing its origin or quoting a specific critique.
- **Dynamic dialogue via fuzzy pattern matching:** Elan Ruskin, Valve, GDC 2012, about the Left 4 Dead response system. Source: https://gdcvault.com/play/1015946/AI-driven-Dynamic-Dialog-through
- **"What Happened Here? Environmental Storytelling":** Harvey Smith and Matthias Worch, GDC 2010. Source: https://gdcvault.com/play/1012696/What-Happened-Here-Environmental

## Example games (details to keep exact)

- **Telltale's The Walking Dead (2012):** on-screen notices such as "Clementine will remember that" provide explicit feedback about decisions. Source: https://media.gdcvault.com/gdc2017/GameNarrativeReview/Nikhil_Kashyap_GameNarrativeReview.pdf
- **Fallout 4 (2015):** main plot is the search for the player's kidnapped son, Shaun; commonly cited for the open-world urgency conflict. Critique framing is opinion, not a source.
- **Hades (Supergiant, 2020):** story progresses through repeated escape attempts and returns to the hub after death.
- **Disco Elysium (ZA/UM, 2019):** skills speak as voices in dialogue.
- **Yarn Spinner users:** Night in the Woods, A Short Hike, DREDGE. Source: https://docs.yarnspinner.dev/
- **Ink users:** inkle's 80 Days and Heaven's Vault. Source: https://github.com/inkle/ink-library

## Tools

- **Ink (inkle):** open-source scripting language for interactive narrative, MIT licence. Core concepts: knots, stitches, diverts, choices, weave with gathers, tunnels, variables, LIST. Inky is the editor; a Unity integration package exists. Check the docs for the version pinned by the project. Sources: https://github.com/inkle/ink and https://github.com/inkle/ink-unity-integration.
- **Yarn Spinner:** consult the [documentation](https://docs.yarnspinner.dev/) for the project's installed version before using commands, localisation tags or conditional content selection.
- **Twine 2:** browser and desktop tool for hypertext stories. Story formats include Harlowe (default), SugarCube, Snowman and Chapbook. Sources: https://twinery.org/ and https://twinery.org/cookbook/terms/terms_storyformats.html
- **articy:draft:** commercial narrative design tool with dialogue flows and dedicated Unity and Unreal importers. Pricing changes; check the site. Source: https://www.articy.com/en/articydraft/feature-list/

## Working heuristics (house rules, not sourced)

- Coverage (words one player sees / words written) below about 0.4 is a warning sign for small teams.
- Cap the variables read at any one convergence scene; count combinations and band counters if above about 24.
- Echo the wording of a choice in its payoff when there is no on-screen reminder.
- Three narrative pillars at most, each with a "therefore we don't" line.

## How to re-verify

1. Fetch each source URL above and check that the claim still matches.
2. For tools, read the docs for the specific version in the project's lockfile or package manifest.
3. Update `last_verified` and remove UNVERIFIED tags only for claims actually checked.
