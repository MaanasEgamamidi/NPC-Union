---
name: engine-subsystem-design
description: Write a design doc for a job system, ECS, allocator or asset streaming system, with data layout, memory budget, threading model and measurement plan.
owner: engine-programmer
disable-model-invocation: true
argument-hint: "[subsystem, e.g. 'asset streaming for open-world PC/console']"
---

# Engine subsystem design

## Inputs

- Subsystem type: job system, ECS, allocator, asset streaming, resource lifetime, or other.
- Target hardware: lowest spec CPU (cores/threads), RAM, storage type.
- Workload numbers: entity counts, allocations per frame, asset sizes and how many load per second.
- Engine (custom or host engine with native extension) and language.

Ask once for any missing workload number; if none is given, state an assumption with a range.

## Steps

1. Write goals and non-goals in one line each. Non-goals stop scope creep (for example "no runtime defragmentation in v1").
2. List the operations and their frequency per frame (create, destroy, iterate, query, load, evict).
3. Design the data layout: structs with field sizes, total bytes per element, SoA or AoS choice with the reason from step 2.
4. Compute the memory budget: element size x max count + overhead, per pool, and total against the platform budget.
5. Define the threading model: which threads own which data, where sync points are each frame, and what is lock-free versus locked. Draw the frame timeline as a list.
6. Define ownership and lifetime: handles (index + generation) or pointers, who frees, what a stale access does.
7. Sketch the API (signatures only) for the five most-used calls.
8. List failure modes: pool exhaustion, load failure, stall, out-of-memory. For each, the behaviour and the log/telemetry line.
9. Write the measurement plan: profiler markers to add, counters, and pass/fail thresholds in ms or MB.
10. Estimate reversal cost; if over two engineer-weeks, flag for technical-director as an ADR.

## Output

```markdown
# <Subsystem> design, <date>
Goals: ... | Non-goals: ...

## Workload
| Operation | Per frame (typical / peak) |
|---|---|

## Data layout
| Struct / array | Fields (bytes) | Bytes/element | Max count | Total |
|---|---|---|---|---|

## Threading
Frame timeline: 1. ... 2. ...
Sync points: ...

## Lifetime and handles
...

## API
```cpp
// signatures
```

## Failure modes
| Failure | Behaviour | Telemetry |
|---|---|---|

## Measurement plan
| Marker / counter | Threshold | Tool |
|---|---|---|

Reversal cost: <engineer-weeks>. ADR needed: yes/no.
```

## Done when

- [ ] Every struct has byte sizes and the memory total is computed.
- [ ] Threading model names owners and sync points.
- [ ] Failure modes each have a behaviour.
- [ ] Measurement plan has numeric thresholds.
