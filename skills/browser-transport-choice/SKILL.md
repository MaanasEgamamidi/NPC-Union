---
name: browser-transport-choice
description: Chooses a browser multiplayer transport and framework (WebSocket, WebRTC DataChannel, WebTransport) and writes a decision note with wire budget.
owner: web-realtime-engineer
disable-model-invocation: true
argument-hint: "[game genre, tick rate, players per room, server language, hosting]"
---

# Browser transport choice

A repeatable procedure for picking how a browser game talks to its server, sized to the game's real traffic.

## Inputs

- Genre and the fastest gameplay interaction (for example: turn-based, co-op puzzle, twitch shooter).
- Server tick or snapshot rate in Hz, and players per room.
- Target browsers, and whether iOS Safari, in-app WebViews or school and corporate networks matter.
- Server language and hosting (self-hosted VM, Cloudflare, managed Colyseus, other).
- Existing stack, if any, and the symptom that prompted the question.

If tick rate, players per room or target browsers are missing, ask once. If the user cannot answer, assume 20 Hz, 8 players, and "all evergreen browsers including iOS Safari", and state the assumption.

## Steps

1. Classify each message type into one of two lanes: **latest-wins** (snapshots, positions, aim) or **must-arrive** (joins, hits, inventory, chat, RPC results).
2. Estimate bytes per message with a quantized binary layout, then bandwidth per client per second: `bytes_per_snapshot x snapshot_rate`. Note the JSON size for comparison.
3. If the latest-wins lane is empty or under about 10 messages per second, choose WebSocket. Pick the framework: Colyseus for authoritative rooms with schema sync, PartyKit or Durable Objects for one-actor-per-room on Cloudflare, plain `ws` for custom servers. Skip to step 6.
4. Otherwise, check current WebTransport support on caniuse.com and MDN, and record the date. If the server stack has a maintained HTTP/3 and WebTransport server and the host passes UDP, choose WebTransport datagrams for latest-wins and streams for must-arrive, with WebSocket fallback.
5. If not, choose a server-side WebRTC DataChannel peer: one channel `{ ordered: false, maxRetransmits: 0 }` for latest-wins, one default reliable channel for must-arrive. Add TURN on 443 with TLS and short-lived credentials, and keep WebSocket as a fallback when ICE fails.
6. Write the connection flow: feature detection order, heartbeat interval, reconnect backoff with a session token, full-snapshot resync after reconnect or tab visibility change.
7. Write a network test: `tc netem` (or a link conditioner) with delay, jitter and 1 to 3% loss, and the metric to compare (p99 gap between snapshot arrivals).
8. List every version-sensitive claim with a link and check date, or mark it UNVERIFIED.

## Output

```markdown
# Transport decision: <game name>

**Assumptions:** <tick rate> Hz, <players> per room, browsers: <list>, server: <language/host>

| Lane | Messages | Transport | Settings |
|------|----------|-----------|----------|
| latest-wins | <ids> | <WebTransport datagrams / DataChannel unreliable / WebSocket> | <ordered, retransmits, max size> |
| must-arrive | <ids> | <stream / reliable channel / WebSocket> | <notes> |

**Framework:** <Colyseus / PartyKit / Durable Objects / custom> because <reason>
**Fallback order:** <first> -> <second> -> <third>

## Wire budget
| Message | Fields and types | Bytes | Rate (Hz) | Bytes/s per client |
|---------|------------------|-------|-----------|--------------------|

## Connection flow
1. ...

## Risks and tests
- <risk>: <test>

## Sources
- <link> (checked YYYY-MM-DD | UNVERIFIED)
```

## Done when

- [ ] Every message type is assigned to a lane.
- [ ] Bandwidth per client per second is computed, not guessed.
- [ ] The choice follows from step 3, 4 or 5, and the note says which.
- [ ] A fallback exists for browsers or networks without UDP.
- [ ] TURN is addressed if WebRTC is used.
- [ ] Reconnect and resync are specified.
- [ ] A loss-and-jitter test with a named metric is included.
- [ ] Browser support claims carry a link and date, or say UNVERIFIED.
