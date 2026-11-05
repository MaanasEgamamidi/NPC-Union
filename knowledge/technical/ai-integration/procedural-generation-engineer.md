---
agent: procedural-generation-engineer
topic: procedural content generation references
---

# Procedural generation: sources

Facts that can go stale are listed with a source and a check date. Items marked UNVERIFIED were not opened in this session.

## Level structure

- Spelunky level generation (Darius Kazemi's interactive breakdown): 4x4 room grid, start room in the top row, random walk where a roll of 1-2 goes left, 3-4 goes right and 5 goes down. Room types 0 (off path), 1 (left/right), 2 (adds bottom, and top if a type 2 is above), 3 (adds top). Off-path rooms are type 0. Source: https://tinysubversions.com/spelunkyGen/ `last_verified: 2026-11-05`
- Template dimensions for Spelunky rooms were not stated on that page. Do not quote them without another source. UNVERIFIED
- Dungeon generation in Unexplored (cyclic generation), Boris the Brave: https://www.boristhebrave.com/2021/04/10/dungeon-generation-in-unexplored/ UNVERIFIED

## Wave function collapse

- Reference implementation by Maxim Gumin: https://github.com/mxgmn/WaveFunctionCollapse `last_verified: 2026-11-05`
  - Two models: overlapping (learns NxN patterns from a sample bitmap, N typically 3) and simple tiled (tile list plus adjacency data).
  - A contradiction (a cell with no remaining options) ends the run without output. The README notes avoiding it is NP-hard in general but it is rare in practice.
  - Licence: in the repo's LICENSE file. Not read in this session. UNVERIFIED

## Randomness

- PCG family of PRNGs (Melissa O'Neill): https://www.pcg-random.org/ UNVERIFIED
- xoshiro / xoroshiro and splitmix64 (Blackman and Vigna): https://prng.di.unimi.it/ UNVERIFIED
- C++ standard distributions (`std::uniform_int_distribution` etc.) are implementation-defined in algorithm, so outputs differ across standard libraries for the same engine state. Source: cppreference, https://en.cppreference.com/w/cpp/numeric/random UNVERIFIED

## Noise

- OpenSimplex2 (KdotJPG): https://github.com/KdotJPG/OpenSimplex2 UNVERIFIED
- Making maps with noise functions (Red Blob Games): https://www.redblobgames.com/maps/terrain-from-noise/ UNVERIFIED

## Unreal Engine PCG framework

- Procedural Content Generation Framework docs (Epic): https://dev.epicgames.com/documentation/en-us/unreal-engine/procedural-content-generation-framework-in-unreal-engine `last_verified: 2026-11-05`
  - Plugin must be enabled per project. Sampling points on Static Meshes also needs the Geometry Script Interop plugin.
  - Graphs connect to the level through a PCG Component (on an Actor or a PCG Volume). Graph instances and subgraphs allow parameter overrides.
  - Doc topics vary by engine version (for example the 5.5 page lists Shape Grammar and PCG Biome). Always open the page for the user's engine version.
  - Production-ready status by engine version was not confirmed in this session. UNVERIFIED
- PCG overview (5.3 docs): https://dev.epicgames.com/documentation/unreal-engine/procedural-content-generation-overview?application_version=5.3 `last_verified: 2026-11-05` (seen in search results only)
- Houdini Engine for Unreal, PCG integration (SideFX): https://www.sidefx.com/docs/houdini/unreal/pcg/overview.html `last_verified: 2026-11-05` (seen in search results; states HDAs can run inside Unreal's PCG graph)

## How to check

1. Open the link. If blocked, add it to `progress/c.md` under `## Needs local verification` and keep UNVERIFIED.
2. For engine docs, set `application_version` to the version the user ships.
3. Update `last_verified` only after reading the page.
