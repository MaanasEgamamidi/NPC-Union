---
title: Browser realtime transports for games
owner: web-realtime-engineer
last_reviewed: 2026-11-05
---

# Browser realtime transports for games

Reference facts for `web-realtime-engineer`. Re-check anything version-sensitive before stating it to a user. A link marked "checked" was reachable on that date; the content summary is our own reading.

## Transports

- **WebSocket**: TCP-based, reliable and ordered, so one lost segment delays every later message (head-of-line blocking). Supported in all current browsers.
  Source: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API (last_verified: 2026-11-05)
- **RTCDataChannel**: SCTP over DTLS. `ordered: false` with `maxRetransmits: 0` gives unreliable, unordered delivery. Only one of `maxRetransmits` and `maxPacketLifeTime` may be set.
  Source: https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel (last_verified: 2026-11-05)
- **DataChannel backpressure**: `bufferedAmount`, `bufferedAmountLowThreshold` and the `bufferedamountlow` event.
  Source: https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/bufferedAmountLowThreshold (last_verified: 2026-11-05)
- **DataChannel message size**: about 16 KiB is the commonly cited cross-browser safe size. UNVERIFIED against a current primary source; treat as a planning number.
- **WebTransport**: HTTP/3 over QUIC, reliable streams plus unreliable datagrams, no ICE or SDP. `datagrams.maxDatagramSize` gives the current limit.
  Source: https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API (last_verified: 2026-11-05)
  Source: https://developer.mozilla.org/en-US/docs/Web/API/WebTransport/datagrams (last_verified: 2026-11-05)
- **WebTransport in Safari**: a secondary source reports WebTransport reached Baseline when Safari 26.4 shipped support in March 2026, and that support depends on the OS version. The exact Safari version and WKWebView status are UNVERIFIED against Apple release notes or caniuse (caniuse returned HTTP 406 to our fetch).
  Source: https://webrtc.ventures/2026/04/webtransport-is-now-baseline-what-it-means-for-real-time-media/ (last_verified: 2026-11-05)
  Source: https://caniuse.com/webtransport (UNVERIFIED, blocked from this environment)

## Frameworks and hosting

- **Colyseus**: authoritative room server with schema-based binary state sync at a patch rate. Check the docs for the installed major version before quoting defaults.
  Source: https://docs.colyseus.io/ (last_verified: 2026-11-05)
- **PartyKit**: one stateful server per room id, WebSocket-based.
  Source: https://docs.partykit.io/ (last_verified: 2026-11-05)
- **Cloudflare Durable Objects**: single-threaded actor per id, can hold WebSocket connections. Placement and hibernation details change; read the current docs.
  Source: https://developers.cloudflare.com/durable-objects/ (last_verified: 2026-11-05)
- **Socket.IO**: own protocol on top of WebSocket or HTTP long-polling; a plain WebSocket client cannot connect to a Socket.IO server. Multi-node deployments with polling need sticky sessions.
  Source: https://socket.io/docs/v4/ (last_verified: 2026-11-05)

## Server-side WebRTC libraries

- **geckos.io**: client-server UDP-style messaging for Node over WebRTC DataChannels.
  Source: https://github.com/geckosio/geckos.io (UNVERIFIED, GitHub returned 403 to our fetch)
- **Pion WebRTC** (Go).
  Source: https://github.com/pion/webrtc (UNVERIFIED, GitHub returned 403 to our fetch)
- **node-datachannel** (Node bindings to libdatachannel).
  Source: https://github.com/murat-dogan/node-datachannel (UNVERIFIED, GitHub returned 403 to our fetch)

## Needs checking before use

- Node.js HTTP/3 and WebTransport server maturity: UNVERIFIED.
- Share of sessions that need TURN relay in production: varies by audience; no figure recorded. UNVERIFIED.
