---
owner: on-device-ai-engineer
topic: On-device model inference in games
last_verified: 2026-11-05
---

# On-device AI: knowledge

## llama.cpp quantization sizes

- Measured sizes for Llama-3.1-8B: Q4_K_M about 4.89 bpw and 4.58 GiB; Q5_K_M 5.33 GiB; Q8_0 7.95 GiB; F16 14.96 GiB. `--imatrix` supplies an importance matrix to reduce quantization loss.
  - Source: https://github.com/ggml-org/llama.cpp/blob/master/tools/quantize/README.md
  - last_verified: 2026-11-05

## Unity Inference Engine (Sentis)

- Package ID `com.unity.ai.inference`. Display name changed from Inference Engine back to Sentis in 2.4 per the manual and a Unity forum thread; package ID unchanged. Imports ONNX (stated opset range) and LiteRT models, runs on CPU or GPU.
  - Source: https://docs.unity3d.com/Packages/com.unity.ai.inference@2.6/manual/index.html
  - Source: https://discussions.unity.com/t/did-inference-engine-package-revert-to-the-old-sentis-name/1695183
  - last_verified: 2026-11-05 (via search result summary; recheck the opset range on the page)

## ONNX Runtime execution providers

- Provider list and per-platform availability: https://onnxruntime.ai/docs/execution-providers/ . Check the provider-specific page for the target platform.

## Open-weight model licences

- Check the licence for each checkpoint in its model repository, including use restrictions, thresholds and attribution requirements.

## Platform memory and store download limits

- Check current memory and download limits in the target platform's developer documentation; ask the team for access where needed.
