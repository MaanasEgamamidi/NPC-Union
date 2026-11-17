# A worked example

One real request, run through the Shop Steward on 2026-11-16 with Claude Code 2.1.325. Nothing below was edited except this introduction. The Steward's reply is pasted whole.

## The request

> I want to make a small 2D roguelike in Godot 4 where you play a lighthouse keeper fighting sea creatures at night. Give me a first-playable plan: the core loop, a pixel art direction, and a brief for the music. Do not write any files; reply in chat.

It was run headless from an empty folder:

```bash
claude -p --plugin-dir <path to this repo> --agent npc-union:leadership:shop-steward "<the request>"
```

## What happened

| Step | Who | What |
|---|---|---|
| 1 | Shop Steward | Looked for an active team. There was none, so the whole roster was available. |
| 2 | `budget-keeper` | Checked the draft agenda. Kept all three items and advised high effort for design, medium for art and music. |
| 3 | `game-designer` | Wrote the core loop. Ran first, because the art and music depend on its camera and night structure. |
| 4 | `pixel-art-stylist` and `composer` | Ran at the same time, each given the core loop as input. |
| 5 | Shop Steward | Merged the three answers, named one conflict between them, and listed what nobody could verify. |

The run took 4 minutes and 11 turns of the Steward, and the CLI reported a cost of about $1.40 at API prices.

## What this run shows, and what it does not

- The request spans three departments in two divisions (creative and knowledge), so the Steward handled it itself instead of passing it to one lead. That is step 3 of the [route skill](../skills/route/SKILL.md).
- The Steward ordered the work by dependency: design first, then art and music in parallel.
- It reported a disagreement between two specialists (whether the crab should be invisible until lit) and did not settle it silently.
- **The headless run had no permission to use the shell or the web.** The Steward could not run `team.mjs` or read the catalog, and the specialists could not open the Godot docs. Every Godot setting in the reply is therefore marked UNVERIFIED by the agents themselves. In a normal interactive session you would be asked to allow those tools and the facts would be checked. Treat the Godot details below as a draft to verify, which is what the reply says too.
- All four agents here run on Claude. No Codex agent was used, so this run does not show the Codex path.
- The plan was not built or playtested. This shows routing and reporting, not that the design is good.

## The Steward's reply, unedited

Quorum here. Your first-playable plan is ready: a top-down beam-aiming loop, a 320×180 pixel look with 16 colours, and a 5-cue adaptive folk-drone score. Every Godot 4 setting and version below is **unverified**, because web access and the shell were blocked this session and none of us could open the docs.

## Agenda
1. Budget check → Gaugette Thrum (`budget-keeper`). It kept all three items and set effort high for design and medium for the other two. I followed that.
2. Core loop → Gyre (`game-designer`, effort high). It ran first, because the other two depend on its camera and night structure.
3. Pixel art direction → Nibbleplot (`pixel-art-stylist`, effort medium). It ran at the same time as item 4.
4. Music brief → Dalsegno Brix (`composer`, effort medium).

I couldn't read the catalog, so the runtimes are assumed to be claude. All three ran as plugin subagents.

## Answer

### 1. Core loop (Gyre, game-designer)
- **The idea:** your lamp is your weapon, and you can't light everything at once. Whatever you leave dark is the cost of every choice.
- **Camera:** top-down, with the tower in the middle of a small rock. A turning cone of light reads clearly from above. From the side it would flatten into a line.
- **Verbs:**
  - **Sweep:** the mouse aims a cone about 30° wide. It uses oil.
  - **Focus:** hold to narrow the cone to about 10° and burn whatever it touches. It uses oil 3× faster.
  - **Crank:** hold a key to refill oil. The beam freezes while you crank.
  - **Harpoon:** works in the dark. You get 6 shots per night.
- **Enemies:** each one reacts to light differently.

  | Creature | How it behaves |
  |---|---|
  | Gulper (eel) | Flees the light, sneaks in through the dark and bites the lens |
  | Lantern-swarm (jellies) | Follows the beam and dims the lens. You can lead it onto the rocks |
  | Wreck-crab | Armoured, so only the harpoon kills it. You can only see it while it's lit |

- **One night (about 4 min):** quiet dusk → the first creature → waves build to a peak → dawn.
- **Day:** a single screen with no real-time play. You repair the lens a little, then pick 1 of 3 cards. Cards should change rules, for example "the beam splits in two".
- **A run:** the full game is 5 nights, and the first playable has 3.
  - You lose if the lens breaks or the keeper is hit 3 times.
  - Nothing carries over between runs yet.
- **In the first playable:**
  - one rock map
  - the 4 verbs, 3 enemies, oil and lens health
  - 3 nights
  - a placeholder day screen with 3 cards
  - restart
- **Left out:**
  - progress that carries between runs
  - walking around the rock, weather, story
  - an upgrade tree
  - final art and audio
- **Done when:** 4 of 5 new testers play 3 nights using only a control card, then can say which creature killed them and name a moment they chose to leave something dark.
- **Test this first:** aiming might feel like a chore rather than a choice. Build a rough grey-box version with one night, the Gulper and the swarm. If testers can't name a moment they left something dark on purpose, narrow the cone and cut the oil.

### 2. Pixel art direction (Nibbleplot, pixel-art-stylist)
- **Resolution:** 320×180 with 16×16 tiles. It scales exactly 6× to 1080p and 4× to 720p. The camera never moves, so pixels won't shimmer.
- **Palette:** a 16-colour draft of its own, not taken from Lospec.
  - Dark: `#0b0714 #171028 #221a3e #2f3a63 #3f6283`
  - Lit: `#5f93a6 #a3d1c8 #eef3dc`
  - Dawn: `#f7e9a0 #f0b94d #d9733f #a8455a #6a2a52 #3a1d3d`
  - Accents: `#58e0c0` for jelly glow and `#8a7f9e` for crab shell.
  - Rules: unlit areas use only the 5 dark colours, the beam adds the 3 lit ones, and at dawn the warm colours take over.
- **Darkness and beam:**
  - CanvasModulate darkens the scene. A PointLight2D carries a pre-drawn cone texture, with one version at 30° and one at 10°.
  - The cone is drawn as 3 or 4 hard bands of palette colours, never a smooth gradient.
  - The light renders at 320×180 so its edges stay pixel-sharp.
  - Hits are worked out from the cone's shape in code, never from which pixels are lit.
- **Seeing creatures in the dark:**
  - Silhouettes are darker than the sea.
  - The Gulper shows two 1-pixel eyes.
  - The jellies glow on their own.
  - The crab shows nothing until it's lit.
- **Sprite sizes:**

  | Asset | Size | Frames |
  |---|---|---|
  | Tower on rock | 48×48 | 1 |
  | Lamp head | 16×16 | 8 directions |
  | Keeper | 8×8 | 2 |
  | Gulper | 24×12 | 4 swim + 2 flee |
  | Jelly | 8×8 | 4 |
  | Crab | 16×12 | 4 |
  | Hit effect | 16×16 | 4 |

- **Godot 4 settings (UNVERIFIED, from memory):**
  - viewport size 320×180
  - `stretch/mode = viewport`
  - `stretch/aspect = keep`
  - `stretch/scale_mode = integer` (which 4.x version added this is unknown)
  - `default_texture_filter = Nearest`
  - snap 2D transforms and vertices to pixel: on
  - on import: mipmaps off, lossless compression

### 3. Music brief (Dalsegno Brix, composer)
- **Sound:** acoustic instruments over a drone, not chiptune. Bowed low strings, a detuned harmonium drone, a solo fiddle or whistle, a muted bell and a frame drum. Touchstones are *Return of the Obra Dinn*, *Dredge* and *Sunless Sea*.
- **Cues:** all Ogg files at 48 kHz, in D. At 72 BPM one bar is exactly 160,000 samples. I checked that maths and the sample counts below.

  | Cue | Format | Use |
  |---|---|---|
  | `mus_title` | 8-bar loop | Title screen |
  | `mus_night` | 16-bar loop, 5 stems, 2,560,000 samples | The night |
  | `mus_day` | 90 BPM, 16 bars | Card-pick screen |
  | `stg_dawn` | 4 bars, plays once | Dawn |
  | `stg_death` | 2 bars plus a tail | Death |

- **How the night music changes:** layers are added and removed, and each change waits for the next bar.
  - `drone` plays from dusk.
  - When the first Gulper is seen, everything drops out for a bar, then the fiddle comes in.
  - When the swarm locks onto the beam (`swarm_lock`), a glassy shimmer rises.
  - When `threat` passes 0.7, a drum layer called `pulse` comes in.
  - At the peak wave, full strings (`swell`) join.
  - When `oil_ratio` falls below 0.2 or the lens cracks, only a thin drone remains and it stutters with the light.
  - At dawn: a 1-bar fade, then `stg_dawn`, then `mus_day`.
- **In Godot:**
  - Play the stems through AudioStreamSynchronized, with volume set per stem. Separate players for each stem can drift out of sync.
  - Use AudioStreamInteractive to move between night, dawn and day.
  - Both were said to arrive in Godot 4.3, which is UNVERIFIED.
- **Mix:**
  - about −20 LUFS overall, with peaks at or below −1 dBTP (Brix's working default, not a platform rule)
  - keep 2–5 kHz clear for sound effects
  - lower the music 3–4 dB under big hits

## Conflicts and open questions
- **Crab fairness:** Gyre made the Wreck-crab invisible until lit. Nibbleplot suggests faint 1-pixel foam ripples at its waterline so players aren't hit by something they had no way to see. That's Gyre's call, and the grey-box test should decide it.
- **Run length:** the full run is 5 nights and the first playable has 3. Gyre was consistent here; I'm noting it so it doesn't read as a contradiction.

## Unverified
- All of the Godot settings in §2: the stretch mode, aspect, integer scale mode and when it was added, the texture filter, the snap settings, how light textures behave when the window is scaled, and the Light Only canvas material.
- AudioStreamSynchronized and AudioStreamInteractive arriving in Godot 4.3, the `set_sync_stream_volume` method, and the loop property names on Ogg streams.
- Whether Godot's compressor has a sidechain option for lowering the music under hits.
- The −20 LUFS target.
- Nibbleplot's palette is an original draft. It hasn't been checked against Lospec.

Fix: allow WebFetch in this session, or have `godot-specialist` check these against the docs for your exact Godot version.

## Minutes
Next step: `godot-specialist` checks the Godot settings and audio classes against your version, then builds Gyre's one-night grey box with the Gulper and the swarm. No files were written. Motion carried.
