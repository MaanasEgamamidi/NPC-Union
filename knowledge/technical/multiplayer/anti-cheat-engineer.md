---
agent: anti-cheat-engineer
topic: Defensive anti-cheat sources
last_verified: 2026-11-05
---

# Anti-cheat engineer knowledge

## Platform support

- Steamworks: Proton and Steam Deck anti-cheat. Proton supports Easy Anti-Cheat without recompilation, but the developer must enable it per build; BattlEye needs a per-title configuration step through Valve or BattlEye contacts; kernel-space anti-cheat is not currently supported, user-space is recommended. https://partner.steamgames.com/doc/steamdeck/proton `last_verified: 2026-11-05`
- Are We Anti-Cheat Yet: crowd-sourced list of games with anti-cheat and their Linux/Proton status (supported, running, broken, denied). Treat as a signal. https://areweanticheatyet.com/ `last_verified: 2026-11-05`

## Vendor and engine docs (UNVERIFIED, check before citing)

- [Epic Online Services Anti-Cheat Interfaces](https://dev.epicgames.com/docs/epic-online-services/trust-and-safety/anti-cheat-interfaces/anti-cheat-interfaces) documents its Easy Anti-Cheat integration. Check the current platform support before selecting it.
- BattlEye official site. https://www.battleye.com/

## Design background (UNVERIFIED, check before citing)

- Gabriel Gambetta, Fast-Paced Multiplayer (client-side prediction, lag compensation). https://www.gabrielgambetta.com/client-server-game-architecture.html
- Riot Games tech blog on VALORANT fog of war and wallhack mitigation. https://www.riotgames.com/en/news/demolishing-wallhacks-valorants-fog-war
