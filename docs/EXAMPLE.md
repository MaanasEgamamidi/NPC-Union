# A worked example

One real request, run through the Shop Steward on 2026-11-16 with Claude Code 2.1.325. Nothing below was edited except this introduction. The Steward's reply is pasted whole.

## The request

> I want to make a small 2D roguelike in Godot 4 where you play a lighthouse keeper fighting sea creatures at night. Give me a first-playable plan: the core loop, a pixel art direction, and a brief for the music. Do not write any files; reply in chat.

It was run headless from an empty folder, with web lookups, file reads and `node` allowed up front, because a headless run cannot stop to ask for permission:

```bash
claude -p --plugin-dir <path to this repo> --add-dir <path to this repo>   --agent npc-union:leadership:shop-steward   --allowedTools WebFetch WebSearch Read Grep Glob "Bash(node:*)" "PowerShell(node:*)"   "<the request>"
```

## What happened

| Step | Who | What |
|---|---|---|
| 1 | Shop Steward | Ran `team.mjs show`. No team was active, so the whole roster was available. Read the catalog and asked `run-agent.mjs --which` for each pick's runtime. |
| 2 | `budget-keeper` | Checked the draft agenda and said to keep all three items as planned. |
| 3 | `game-designer` (Claude) | Wrote the core loop. Ran first, because the art and music depend on it. |
| 4 | `pixel-art-stylist` (Codex) and `composer` (Claude) | Ran at the same time. The stylist went through `scripts/run-agent.mjs` on Codex CLI; the composer ran as a plugin subagent. Both opened the Godot docs. |
| 5 | Shop Steward | Merged the three answers, listed four conflicts between them, and listed what nobody verified. |

The run took a little over 4 minutes and 13 turns of the Steward. The CLI reported a cost of about $1.56 at API prices; the Codex call is not in that figure.

## What this run shows, and what it does not

- The request spans three departments in two divisions (creative and knowledge), so the Steward handled it itself instead of passing it to one lead. That is step 3 of the [route skill](../skills/route/SKILL.md).
- The Steward ordered the work by dependency: design first, then art and music in parallel.
- It used both runtimes: two Claude subagents and one Codex agent.
- It checked the specialists' answers against each other. It caught that the "16-colour" palette lists 14 colours, that the phase timings do not add up to the stated run length, and that the two specialists read different Godot doc versions.
- The Godot settings were checked against the Godot docs by the specialists on the day. The reply's own "Unverified" section lists what was not checked; take that list at its word.
- An earlier run of the same request without `--allowedTools` could not use the shell or the web. The agents then marked every Godot setting UNVERIFIED instead of guessing. Without tool access, expect that.
- The plan was not built or playtested. This shows routing and reporting, not that the design is good.

## The Steward's reply, unedited

Quorum here. The plan has three items and each one has an owner. No files were written: the specialists ran read-only lookups and the Codex log shows no writes.

## Agenda
1. Core loop → Gyre (`game-designer`, claude)
2. Pixel art direction → Nibbleplot (`pixel-art-stylist`, codex; `--which` returned `codex`)
3. Music brief → Dalsegno Brix (`composer`, claude)

Gaugette Thrum (`budget-keeper`) said **keep** on all three runtimes and effort levels, so I changed nothing. Items 2 and 3 ran in parallel after the loop was set.

## Answer

### 1. Core loop (Gyre, game-designer)
**Assumptions:** the tower is fixed at screen centre with sea on all sides. The keeper doesn't walk, and the mouse aims.

- **Feeling:** a tense vigil where you hold the dark back one sweep at a time.
- **Verbs:**
  - **Sweep:** mouse-aim a wide beam that reveals and slows enemies. The turn rate is capped at 180°/s by default (tunable from 90 to 360).
  - **Focus:** hold the right mouse button for a narrow beam that burns, at the cost of seeing less.
  - **Flare:** left mouse button. Spends oil to stun everything in the cone.
- **Moment loop (~3 s):** spot a sign in the dark, sweep to it, focus, and the creature burns and drops oil.
- **Wave (~60 s):** threats come from 2–3 sides, so you choose which one to light.
- **Night phases:**
  - **Dusk**, 30 s: pick 1 of 3 upgrades.
  - **Night**, 3 waves, about 3 min.
  - **Surge**, 45 s: every enemy type from every side.
  - **Dawn**, 10 s: creatures flee and the night is scored.
- **Roguelike layer:** spawn sides, enemy mixes and upgrade offers are random. Nothing carries over between runs in the first playable.
- **Enemies:** each one needs a different beam answer.
  - **Drowner:** slow and heads for the rocks. Focus it.
  - **Skitterers:** crabs in packs of 6 that scatter from wide light. Sweep them.
  - **Ink Squid:** blacks out a 45° sector for 5 s. Flare it before it sprays.
  - **Lamp Jelly:** drains oil while it is lit. Look away.
- **Scope:**
  - Upgrade pool of 8, with 3 picks per run. Half of them change rules, e.g. Prism splits the beam.
  - A run is 3 nights. You win by reaching Dawn on night 3 and lose when tower integrity hits 0. Running out of oil only disables Flare.
- **Cut:** walking and repairs, meta-progression, weather, bosses, ships, story and gamepad.
- **Question the build must answer:** does aiming one beam feel like fair triage? Five testers play three runs each. If more than ⅓ still say "didn't see it coming" after one tuning pass, the single-beam premise goes back to the brief.

### 2. Pixel art direction (Nibbleplot, pixel-art-stylist)
- **Camera:** top-down, rendered at **320×180** with one pixel size for sprites, effects, UI and text.
  - 1280×720 scales 4× exactly.
  - 1920×1080 scales 6× exactly.
  - 1366×768 shows a centred 1280×720 with black bars.
- **Grid and sizes:** 16×16 tiles. The tower is 48×48 and the keeper 16×24. Drowner 16×16, Skitterer 12×8, Ink Squid 16×24, Lamp Jelly 16×16. These are starting targets.
- **Palette ramps** (dark to light):
  - Sea: `#101426 #1D3042 #315364 #668A8A`
  - Tower and keeper: `#1D3042 #52616B #A6A99A #E5D9AC`
  - Beam and UI: `#52616B #B19555 #E5C975 #FFF3C4`
  - Enemies: `#101426 #594573 #9678A2 #B9D0B6 #E8F0DC`
- **Value rules:** the sea stays in its two darkest values. In the dark, only eyes and selected edges show. Inside the beam, keep a dark outline so the body separates from the light. Test both states in grayscale at 1×.
- **Light:** ambient light comes from the top left, and the beam overrides it.
- **Beam:** use hard-edged, low-resolution cone masks in the base viewport, one each for Sweep, Focus and Flare. Avoid soft Light2D gradients; a shader can come later. The visible cone must match the hit detection.
- **Dithering:** sparse ordered dithering on sea gradients only, never over eyes or cone edges.
- **Readability per enemy:**
  - Drowner: two bright, separated eyes.
  - Skitterers: gaps between all six.
  - Ink Squid: a distinct edge on the blackout sector.
  - Lamp Jelly: a clear drain indicator while it is lit.
- **Animation:** 10 fps, with 4 idle frames and 6 attack frames.
- **Godot settings**, checked against the [Godot 4.5 multiple-resolutions page](https://docs.godotengine.org/en/4.5/tutorials/rendering/multiple_resolutions.html) and [ProjectSettings](https://docs.godotengine.org/en/4.5/classes/class_projectsettings.html) on 2026-11-16:
  - Default Texture Filter = Nearest
  - Stretch Mode = viewport
  - Aspect = keep
  - Scale Mode = integer
  - Snap 2D Transforms to Pixel = on
  - Vertex snapping off, mipmaps off, lossless imports.
- **References to discuss:** Hyper Light Drifter, Eastward, Stardew Valley.

### 3. Music brief (Dalsegno Brix, composer)
- **Mood:** lonely and steady, building from dread to defiance. The tower should be the warmest sound.
- **Touchstones:** Hades (Darren Korb) for layered intensity, Sea of Stars (Yasunori Mitsuda) for colour, and Return of the Obra Dinn for the maritime feel.
- **Not chiptune:** a few dry acoustic stems give a solo dev more mood.
- **Instruments:** felt piano, cello and bass, harmonium, glockenspiel as the beam, frame drum and toms, and a low brass foghorn drone.
- **Key:** D throughout, so every stinger shares the tonic.
- **Structure:** horizontal sections by phase, with vertical layers inside Night. Samples are at 48 kHz.

| Cue | BPM | Key | Loop |
|---|---|---|---|
| Dusk | 72 | D Dorian | 8 bars (1,280,000 samples) |
| Night | 96 | D minor | 16 bars (1,920,000), 3 stems |
| Surge | 144 | D minor | 8 bars (640,000) |
| Dawn | 72 | D major | 3-bar one-shot (480,000) |

- **Night stems:** the base stem plays from wave 1, percussion joins at wave 2 and the lead at wave 3. Each fades in over 1 bar.
- **Transitions:** every change lands on the next bar line, with a 1-bar riser into Surge.
- **Ink Squid blackout:** a low-pass filter on the music bus, with no new audio.
- **Minimum to ship (7 files):** Dusk, 3 Night stems, Surge, Dawn (reused as the victory cue), plus a 1-bar wave stinger and a ~4 s death stinger.
- **Godot:** play one `AudioStreamPlayer` per phase, with Night as an `AudioStreamSynchronized`. Drive stem volumes with Tweens on your own bar clock, and move to `AudioStreamInteractive` later.
  - Docs checked 2026-11-16: [Interactive](https://docs.godotengine.org/en/stable/classes/class_audiostreaminteractive.html), [Synchronized](https://docs.godotengine.org/en/stable/classes/class_audiostreamsynchronized.html), [OggVorbis](https://docs.godotengine.org/en/stable/classes/class_audiostreamoggvorbis.html).
- **Delivery:**
  - Ogg Vorbis at about q5, looping from sample 0. Cut loops from a second pass at zero crossings.
  - All stems in a cue are the same length, named like `mus_night_perc_96bpm_Dm.ogg`.
  - Loudness: about −18 LUFS integrated and ≤ −1 dBTP true peak. This is his proposal, and `audio-director` makes the final call.

## Conflicts and open questions
- **Godot version:** Nibbleplot checked the **4.5** docs, while Dalsegno read `/stable` and reports it as **4.7**. I haven't confirmed which is current. Tell me your Godot 4.x version and the settings should be rechecked against it.
- **Palette count:** Nibbleplot calls it a 16-colour palette, but the ramps listed contain **14 unique hexes**. Either two slots are spare or two colours are missing. Nibbleplot should settle it.
- **Run length:** Gyre's phase timings add up to about 4.4 min per night, so about 13 min per run, not the ~12 he states. It's minor and tuning will settle it.
- **Keeper sprite:** the keeper doesn't walk under Gyre's loop, but Nibbleplot sized a 16×24 keeper sprite. It may only need idle and aim frames.

## Unverified
- **Art (Nibbleplot):**
  - Sprite sizes at playable scale.
  - Import settings in a real project.
  - Your exact Godot minor version and monitors.
  - No test sheet was generated, so the palette and sizes are untested on screen.
- **Music (Dalsegno):**
  - The Obra Dinn reference comes from memory.
  - Which Godot version added `AudioStreamInteractive` and `AudioStreamSynchronized` (he recalls 4.3).
  - Whether a Synchronized stream can be a clip inside an Interactive one.
  - Whether Interactive's bar timing reads the Ogg `bpm` and `bar_beats` fields.

## Minutes
Next step: `godot-specialist` (Arbor) sets up the 320×180 project, beam prototype and phase clock against your Godot version, then `prototyper` runs Gyre's five-tester fairness test. Waiting on your go and your Godot version. Motion carried.
