---
agent: anti-cheat-engineer
topic: Defensive anti-cheat sources
last_verified: 2026-11-05
---

# Anti-cheat engineer knowledge

## Platform support

- Steamworks: Proton and Steam Deck anti-cheat. Proton supports Easy Anti-Cheat without recompilation, but the developer must enable it per build; BattlEye needs a per-title configuration step through Valve or BattlEye contacts; kernel-space anti-cheat is not currently supported, user-space is recommended. https://partner.steamgames.com/doc/steamdeck/proton `last_verified: 2026-11-05`
- Are We Anti-Cheat Yet: crowd-sourced list of games with anti-cheat and their Linux/Proton status (supported, running, broken, denied). Treat as a signal. https://areweanticheatyet.com/ `last_verified: 2026-11-05`

## Vendor and engine docs

- [Epic Online Services Anti-Cheat Interfaces](https://dev.epicgames.com/docs/epic-online-services/trust-and-safety/anti-cheat-interfaces/anti-cheat-interfaces) documents its Easy Anti-Cheat integration. `UNVERIFIED`: the page returned HTTP 200 on 2026-11-16 but its text is rendered by script and could not be read. Check the current platform support before selecting it.
- BattlEye official site; it describes BattlEye as an independent anti-cheat provider. https://www.battleye.com/ `last_verified: 2026-11-16`

## Design background

- Gabriel Gambetta, Fast-Paced Multiplayer series: Client-Server Game Architecture, Client-Side Prediction and Server Reconciliation, Entity Interpolation, Lag Compensation. https://www.gabrielgambetta.com/client-server-game-architecture.html `last_verified: 2026-11-16`
- Riot Games, "Demolishing Wallhacks with VALORANT's Fog of War" (Paul Chamberlain, 14 Apr 2020): the server does not send a hidden player's location to enemies until that player peeks the angle. https://www.riotgames.com/en/news/demolishing-wallhacks-valorants-fog-war `last_verified: 2026-11-16`
