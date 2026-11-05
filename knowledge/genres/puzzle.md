---
topic: puzzle
owner: puzzle-expert
last_verified: 2026-11-05
---

# Puzzle games

## Core loop

1. Observe the state of the board or room.
2. Form a hypothesis about the rules or the solution.
3. Act (move, rotate, place, answer).
4. Read the result.
5. Revise the hypothesis, or move on with a new idea learned.

In handcrafted puzzle games the reward is understanding: the moment a wrong assumption breaks. In endless puzzle games (falling blocks, match-3) the loop is shorter and the reward is pace, combos and score, with the board state as the puzzle.

## Design pillars

- **Clear, visible rules.** Every fact needed for the answer is on screen or deducible.
- **One idea per level when teaching.** Introduce a mechanic alone, then combine it with one known mechanic.
- **Deduction beats brute force.** Keep the state space small or signposted so thinking is faster than trying.
- **Cheap failure.** Undo and instant reset keep players experimenting.
- **A planned curve with breathers.** Spikes are followed by easier levels that use the new idea.
- **Fresh-player testing.** The designer cannot judge difficulty after knowing the answer.

## Reference games

| Game | Year | Developer | What to study | Link |
|---|---|---|---|---|
| Tetris | 1985 | Alexey Pajitnov (Soviet Academy of Sciences computing centre) | Endless spatial puzzle, readable pieces, speed as difficulty | https://en.wikipedia.org/wiki/Tetris |
| Portal 2 | 2011 | Valve | Introducing each mechanic alone before combining, environmental teaching, co-op puzzle design | https://en.wikipedia.org/wiki/Portal_2 |
| The Witness | 2016 | Thekla, Inc. | Wordless teaching through panel sequences, rules learned by observation | https://en.wikipedia.org/wiki/The_Witness_(2016_video_game) |
| Baba Is You | 2019 | Hempuli (Arvi Teikari) | Rules as movable objects on the board, breaking assumptions about what a rule can be | https://en.wikipedia.org/wiki/Baba_Is_You |
| Return of the Obra Dinn | 2018 | Lucas Pope | Deduction game, confirming fates in sets of three to block guessing | https://en.wikipedia.org/wiki/Return_of_the_Obra_Dinn |
| Monument Valley | 2014 | ustwo games | Impossible geometry, short gentle levels, puzzles about perception rather than failure | https://en.wikipedia.org/wiki/Monument_Valley_(video_game) |
| Candy Crush Saga | 2012 | King | Free-to-play match-3, move limits, lives, level-based tuning of pass rates | https://en.wikipedia.org/wiki/Candy_Crush_Saga |
| Sokoban | 1982 | Thinking Rabbit | The crate-pushing baseline: small rules, irreversible moves, why undo matters | https://en.wikipedia.org/wiki/Sokoban |

## Common failures

- **Hidden information.** The solution needs a fact the player could not see. It plays as a guess.
- **Several new ideas at once.** Players cannot tell which idea they failed on.
- **Brute-force wins.** A large state space with a narrow answer, so tapping through options is faster than reasoning.
- **No undo.** Step-based puzzles with long replays after a mistake. Players stop experimenting.
- **"Hard" means "long".** More steps of a known idea rather than a new insight.
- **Unfair red herrings.** Too many decoys in teaching levels.
- **Designer blindness.** Difficulty judged only by the people who built the levels.
- **Hints that give the answer.** A hint should point to the idea, not the move list.

## Scope traps

- **Level count.** Each handcrafted puzzle takes design, testing with fresh players and iteration. Plan level count from measured time per level, not hope.
- **Missing level editor.** Without an in-engine editor and a quick test loop, level production stalls.
- **Solvability checks.** Large or procedural sets need an automated solver or validator. Writing one is real engineering work.
- **Too many mechanics.** Each new mechanic multiplies the combinations that need testing. A few mechanics explored deeply often beat many shallow ones.
- **Procedural generation as a shortcut.** Generated puzzles are hard to make teach anything; they suit endless modes more than a teaching campaign.
- **Live tuning.** Free-to-play match-3 needs analytics and ongoing level tuning, a service commitment and not a one-off build.

## Sources

- Wikipedia pages listed in the reference table. All eight links returned HTTP 200 on 2026-11-05. Release years and developers come from these pages.
- The Tetris Company guideline "7-bag" randomizer: widely documented by the Tetris community (see https://tetris.wiki/Random_Generator, checked 2026-11-05).
- Obra Dinn confirmation rule: the Wikipedia page above says correct fates are validated in sets of three, with the last few validated in sets of two. Checked 2026-11-05.
