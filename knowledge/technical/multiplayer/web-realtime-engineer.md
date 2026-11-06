---
title: Browser realtime transports for games
owner: web-realtime-engineer
last_reviewed: 2026-11-05
last_verified: 2026-11-05
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
- **DataChannel message size**: keep messages moderately small; large messages can block other channels when message interleaving is unavailable. If SDP omits `max-message-size`, the default is 64 KiB; check the negotiated limit and test target browsers. Source: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels
- **WebTransport**: HTTP/3 over QUIC, reliable streams plus unreliable datagrams, no ICE or SDP. `datagrams.maxDatagramSize` gives the current limit.
  Source: https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API (last_verified: 2026-11-05)
  Source: https://developer.mozilla.org/en-US/docs/Web/API/WebTransport/datagrams (last_verified: 2026-11-05)
- **WebTransport in Safari**: Safari 26.4 added WebTransport support in March 2026. Check WKWebView availability in the current WebKit documentation and test the target OS and embedded browser.
  Source: https://webkit.org/blog/17862/webkit-features-for-safari-26-4/ (last_verified: 2026-11-05)

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
  Source: https://github.com/geckosio/geckos.io (last_verified: 2026-11-05)
- **Pion WebRTC** (Go).
  Source: https://github.com/pion/webrtc (last_verified: 2026-11-05)
- **node-datachannel** (Node bindings to libdatachannel).
  Source: https://github.com/murat-dogan/node-datachannel (last_verified: 2026-11-05)

## Needs checking before use

- Check current Node.js and chosen server implementation documentation for HTTP/3 and WebTransport support, then test the deployment.
- Measure the share of sessions requiring TURN relay in the target audience and use that result for capacity estimates.
