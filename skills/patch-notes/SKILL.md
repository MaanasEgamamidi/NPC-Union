---
name: patch-notes
description: Turns a raw changelog and build info into player-facing patch notes with exact values, fixes and known issues, ready for Steam and Discord.
owner: community-manager
disable-model-invocation: true
argument-hint: "[changelog file or pasted list, build version, release date]"
---

# Patch notes

A repeatable procedure for writing patch notes players can trust.

## Inputs

- The raw changelog: commits, tickets or a team list of changes.
- The build version string exactly as players see it in the game or launcher.
- Go-live time and platforms (Steam, consoles, other stores).
- Open bugs from qa-lead that players are likely to hit.
- Old and new values for every balance or economy change.

If any of these are missing, ask once: "What is the in-game build string, when does it go live, and do you have before and after values for each balance change?" If values are still missing, write `[VALUE NEEDED]` in place and keep going.

## Steps

1. Strip internal-only items (refactors, tooling, test changes) unless players can feel them. Keep anything that changes behavior, even if small.
2. Sort each remaining item into a player-facing section: Highlights, Balance, Gameplay, Economy, UI, Audio, Performance, Bug Fixes, Known Issues.
3. Rewrite each item as "what changed" plus a value: "X reduced from A to B." Replace "adjusted", "tweaked", "improved" with the actual change.
4. Add a one-sentence reason to every balance and economy change. Get it from game-designer if it is not in the changelog.
5. Write bug fixes as the symptom the player saw: "Fixed a crash when opening the map during a boss fight", not the code cause.
6. Pick the top one to three items for Highlights, the ones most players will notice.
7. Build the Known Issues list from qa-lead's open bugs, each with a workaround if there is one.
8. Check the version string against release-manager's build and the go-live time against the deploy plan.
9. Mark every date, promise and number with its owner. Send anything unconfirmed to that owner before posting.
10. Make channel versions: full notes for the Steam announcement, a short summary with a link for Discord, and the full text for the forum pin.
11. Read it once as the angriest reasonable player. Cut spin, hype and exclamation marks.
12. Post only once the build is live on every listed platform.

## Output

```
# [Game] Update [version string], [date]

## Highlights
- [Biggest player-facing change, one line]

## Balance
- [Item]: [stat] changed from [A] to [B]. Reason: [one sentence].

## Gameplay / Economy / UI / Audio / Performance
- [Change, with value]

## Bug Fixes
- Fixed [symptom the player saw].

## Known Issues
- [Issue]. Workaround: [steps or "none yet"].

[One line on where to report bugs and when the next update is expected, if approved.]

---
Facts check (internal, do not post)
| Item | Value or date | Owner | Confirmed? |
```

Discord summary: three to five bullets from Highlights and Known Issues, then a link to the full notes.

## Done when

- [ ] Version string matches the in-game build.
- [ ] No "adjusted", "tweaked" or "improved" without a value.
- [ ] Every balance and economy change has before, after and a reason.
- [ ] Every shipped player-facing change is listed. No silent changes.
- [ ] Known Issues is present, even if it says "none known".
- [ ] Every date and promise has a named owner who confirmed it.
- [ ] Steam, Discord and forum versions are ready.
- [ ] Posting is timed to the build being live.
