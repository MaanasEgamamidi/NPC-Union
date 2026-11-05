---
title: Model Context Protocol specification facts
owner: mcp-specialist
last_verified: 2026-11-05
---

# Model Context Protocol (MCP) specification facts

last_verified: 2026-11-05

Facts below were read from the live spec pages on 2026-11-05 unless marked UNVERIFIED. Re-check the version before relying on anything here: the spec changes by dated revision.

## Current version

- The current specification revision is `2026-07-28`. The spec index links its schema at `schema/2026-07-28/schema.ts`. Source: https://modelcontextprotocol.io/specification and https://github.com/modelcontextprotocol/specification/blob/main/schema/2026-07-28/schema.ts
- The TypeScript schema is the authoritative source for protocol requirements. Source: https://modelcontextprotocol.io/specification
- Earlier dated revisions include 2024-11-05, 2025-03-26, 2025-06-18 and 2025-11-25. UNVERIFIED (from memory, not re-checked on 2026-11-05).

## Base protocol

- Messages are JSON-RPC 2.0 and MUST be UTF-8 encoded. Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- Roles: hosts (LLM applications), clients (connectors inside the host), servers (services that provide context and capabilities). Source: https://modelcontextprotocol.io/specification
- The 2026-07-28 base protocol is described as stateless, self-contained requests with per-request capability negotiation. Source: https://modelcontextprotocol.io/specification
- Every request carries its protocol version and client capabilities in `_meta.io.modelcontextprotocol/*` fields in the message body. The body is the source of truth. Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- Message direction: servers do not initiate JSON-RPC requests and clients do not send JSON-RPC responses. Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- Earlier revisions used a connection-scoped session with an `initialize` handshake and allowed server-initiated requests. Implementations that talk to those revisions detect the counterpart's era and fall back, per the Versioning page compatibility matrix. Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports and https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
- Utilities listed: configuration, progress tracking, cancellation, error reporting. Source: https://modelcontextprotocol.io/specification

## Transports

- Two standard bindings: stdio (newline-delimited messages over the standard streams of a client-launched subprocess) and Streamable HTTP (each message is an HTTP POST to a single MCP endpoint; replies arrive as a JSON object or a request-scoped SSE stream). Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- Streamable HTTP mirrors selected body metadata into HTTP headers so intermediaries can route without parsing the body; the binding defines how mismatches are rejected. Exact header names: UNVERIFIED (see the streamable-http page). Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
- Cancellation: on stdio the client sends `notifications/cancelled`; on Streamable HTTP the client closes the request's response stream. Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- Custom transports MAY be built. They MUST keep the JSON-RPC format, message patterns and per-request metadata model. Over a reliable byte stream (Unix socket, TCP) they SHOULD reuse stdio framing. Source: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
- On stdio, stdout carries only MCP messages and logs go to stderr. UNVERIFIED for 2026-07-28 (true in earlier revisions, from memory).
- The older HTTP+SSE two-endpoint transport was replaced by Streamable HTTP in 2025-03-26. UNVERIFIED (from memory).

## Features

- Server features: Resources (context and data), Prompts (templated messages and workflows for users), Tools (functions for the model to execute). Source: https://modelcontextprotocol.io/specification
- Client features listed on the 2026-07-28 index: Elicitation (server-initiated requests for more information from users). Sampling and Roots are not listed on that index page; their status in 2026-07-28 is UNVERIFIED. Source: https://modelcontextprotocol.io/specification
- Optional extensions, opt-in and negotiated by both sides: Tasks (long-running operations with polling, mid-flight input, durable handles), Skills over MCP, MCP Apps (inline interactive UI). Source: https://modelcontextprotocol.io/specification and https://modelcontextprotocol.io/extensions/overview

## Security

- Tools represent arbitrary code execution. Tool annotations and descriptions are untrusted unless obtained from a trusted server. Hosts must obtain explicit user consent before invoking any tool. Source: https://modelcontextprotocol.io/specification
- Hosts must get explicit user consent before exposing user data to servers and must not transmit resource data elsewhere without consent. Source: https://modelcontextprotocol.io/specification
- HTTP authorization is based on OAuth 2.1 with protected resource metadata. UNVERIFIED for 2026-07-28 (from memory of 2025 revisions). Check https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization before use; that URL is UNVERIFIED.

## How to re-verify

1. Fetch https://modelcontextprotocol.io/specification and read the schema link to get the current dated version.
2. Fetch https://modelcontextprotocol.io/llms.txt for the page index.
3. Update `last_verified` and remove UNVERIFIED tags only for facts actually read.
