---
name: vo-session-script-pack
description: Turns a dialogue list into a casting brief, sides, recording script, running order, and take log for one voice session.
owner: voice-director
disable-model-invocation: true
argument-hint: "[dialogue file or pasted lines, plus cast and session length]"
---

# VO session script pack

Builds everything a voice session needs from a list of dialogue lines, keyed to stable dialogue IDs.

## Inputs

- Dialogue lines with IDs and speakers (CSV, spreadsheet export, or pasted). If lines have no IDs, ask whether IDs exist in the dialogue tool before inventing them; if none exist, assign `<SPEAKERCODE>_<4-digit number>` and say so.
- Characters to cast, with any existing character art or bio.
- Union or non-union, target languages, session length available.
- Which lines are time-locked (cutscene, lip sync) and their max durations.
- Whether any AI, TTS, or voice cloning is planned.

If session length is missing, ask the production team for its planned session length; if unavailable, state the scheduling assumption and confirm it with the performers.

## Steps

1. Normalize the line list into one table with columns: ID, Speaker, Line. Flag duplicate IDs and empty lines.
2. For each line, add Context (what happened just before), To (addressed listener), Distance (whisper, near, room, far, shout), Intent (one verb or short phrase), and Projection 1 to 5.
3. Mark efforts, screams, deaths, and combat barks with `EFFORT` in Notes.
4. Count variants per bark trigger. Flag any high-frequency trigger with fewer than 4 variants.
5. Build a pronunciation list of every invented name or term found in the lines, with phonetic spelling and stress. Ask lore-keeper to confirm if unsure.
6. Write a casting brief per speaker: voice age, pitch and texture, accent and region, references described in words, special requirements.
7. Pick 3 to 5 sides per main role covering a quiet line, a subtext line, the most common emotional state, and one effort or loud line.
8. Write the running order: room tone, warm-up, dialogue in story order grouped by projection, barks, efforts last. Estimate minutes per block.
9. Set the file naming pattern `VO_<area>_<speaker>_<ID>_<lang>_t<take>.wav` and build an empty take log.
10. Add flags: AI or TTS use (needs written consent and a check with game-legal-advisor), time-locked lines for localization-lead, union terms to verify.

## Output

```markdown
# VO pack: <project>, session <n>

## Assumptions
- ...

## Casting briefs
### <Character>
- Voice age:
- Pitch and texture:
- Accent:
- References (in words):
- Special requirements:

## Sides
### <Character>
1. [ID] (context, proj) "line"

## Pronunciation guide
| Term | Phonetic | Stress | Source |

## Recording script
| ID | Speaker | Context | To | Distance | Intent | Proj | Line | Max dur | Notes |

## Running order
| Block | Content | Est. minutes |

## File naming
Pattern: VO_<area>_<speaker>_<ID>_<lang>_t<take>.wav
Delivered: VO_<area>_<speaker>_<ID>_<lang>.wav

## Take log
| ID | Take | Circled | Reason | Pickup? |

## Flags
- AI/TTS:
- Union terms to verify:
- Time-locked lines:
```

## Done when

- [ ] Every line has an ID, context, addressee, distance, and projection.
- [ ] No duplicate IDs; file names derive from IDs, not line text.
- [ ] Every efforts and scream block is at the end of the running order.
- [ ] Every high-frequency bark trigger has at least 4 variants or a flag.
- [ ] Every invented term is in the pronunciation guide.
- [ ] Each main role has a casting brief and sides.
- [ ] AI or TTS use and union questions are flagged, with unchecked claims marked UNVERIFIED.
