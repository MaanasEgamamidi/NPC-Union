---
name: local-model-budget
description: Sizes a local AI model against a target device's memory, CPU threads, frame time, download size, and licence before committing to on-device inference.
owner: on-device-ai-engineer
disable-model-invocation: true
argument-hint: "[model, quantization, target devices]"
---

# Local model budget

A repeatable sizing pass for running a model on the player's device.

## Inputs

- Model name and exact checkpoint, parameter count, and candidate quantizations. If missing, ask what the model must do and propose two candidate sizes.
- Target devices, lowest spec first, with total RAM and VRAM (or unified memory).
- Measured memory use and frame time of the game at its heaviest scene. If missing, ask for one capture; otherwise mark every headroom number UNVERIFIED.
- Required context length and expected response length.
- Target download size and whether an optional download is allowed.

## Steps

1. Read model metadata (layers, KV heads, head dimension) from the GGUF header or model config. Do not assume from the model family.
2. Weights size: parameters x bits per weight / 8, or the real file size if it exists.
3. KV cache: 2 x layers x KV heads x head dimension x bytes per element x context length.
4. Runtime total: weights + KV cache + compute buffers; measure buffer use on the target runtime and device, or mark an unmeasured estimate UNVERIFIED.
5. Headroom: device memory minus the game's peak use minus OS reserve. Compare to the runtime total for full GPU, partial offload, and CPU-only placements.
6. Threads: pick an inference thread count below the physical core count and list which game threads it must avoid.
7. Download: shipped size, whether it is base install or optional, and patch impact.
8. Licence: open the licence file for the exact checkpoint and list redistribution, attribution, use restriction, and threshold terms. Link it.
9. Define the on-device test: device, session length (at least 20 minutes on mobile), and pass criteria.

## Output

```
Model: <name, checkpoint, quant>   Task: <task>
Target: <device>   Memory type: <dedicated VRAM | unified>
Weights: <GiB>   KV cache @ <ctx> tokens: <MiB>   Buffers: <MiB>   Total: <GiB>
Game peak: <GiB>   Headroom: <GiB>   Placement: <GPU | split n layers | CPU>
Threads: <n>, avoid <threads>   Expected tok/s: <value> (measured | UNVERIFIED)
Download: <MB>, <base | optional>   Licence: <name, link>, obligations: <list>
Verdict: <go | go with changes | no-go>   Fallback: <plan>
UNVERIFIED: <list>
```

## Done when

- [ ] Every target device has a total, a headroom figure, and a placement.
- [ ] KV cache is computed from real metadata at the chosen context length.
- [ ] Thread count and threads to avoid are stated.
- [ ] Licence is linked for the exact checkpoint, with obligations listed.
- [ ] Each estimate is labelled measured or UNVERIFIED.
- [ ] A verdict and fallback are given.
