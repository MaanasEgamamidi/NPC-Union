---
title: Pose artist reference
tags: [pose, line-of-action, controlnet, openpose, hands, foreshortening, on-model]
sources: ["https://github.com/lllyasviel/ControlNet", "https://github.com/CMU-Perceptual-Computing-Lab/openpose", "https://huggingface.co/docs/diffusers/using-diffusers/controlnet"]
last_verified: 2026-11-05
---

# Pose artist reference

Sources (check the model and version before quoting settings):
- ControlNet repository: https://github.com/lllyasviel/ControlNet
- OpenPose repository and keypoint docs: https://github.com/CMU-Perceptual-Computing-Lab/openpose
- Hugging Face Diffusers ControlNet guide: https://huggingface.co/docs/diffusers/using-diffusers/controlnet

## Pose readability checklist

| Check | How | Fail sign | Fix |
|---|---|---|---|
| Line of action | Draw one stroke through head, spine, support leg | Needs two strokes, or straight vertical with no intent | Bend the spine or lean the whole figure |
| Balance | Plumb line from neck pit | Lands outside the feet with no motion implied | Move support foot under it, or add motion cues |
| Contrapposto | Compare hip and shoulder tilt | Both tilt the same way unintentionally | Tilt shoulders opposite to hips |
| Silhouette | Black fill at about 64 to 100 px tall | Limbs vanish into torso | Pull a limb clear, open negative space |
| Twinning | Compare left and right limbs | Mirror-matched angles | Offset one joint or one beat |
| Camera height | Note eye line | Changes across a set | Fix one height per sheet |

## Keypoint formats (check the model card)

| Format | Body points | Notes |
|---|---|---|
| COCO and BODY_25 | Check the selected model | Compare body-point ordering and available feet in the [OpenPose output documentation](https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/02_output.md) and the control model card |
| Hand and face | Check the selected model | Confirm point counts and ordering in the model card before preparing input |

Side colours encode left and right. A mirrored skeleton moves the prop to the wrong hand.

## Conditioning starting values (heuristics, tune per model)

| Situation | Pose strength | End step | Extra control |
|---|---|---|---|
| Standard pose, identity priority | 0.7 to 0.9 | 60 to 80% | none |
| Complex action, pose priority | 0.9 to 1.0 | 100% | depth if limbs overlap |
| Limb toward camera | 0.8 | 80% | depth or normal map |
| Detailed hand gesture | 0.8 | 80% | hand keypoints, then inpaint |
| Stylised proportions (chibi, 2 to 4 heads) | 0.6 to 0.8 | 60% | rescale skeleton first |

## Identity lock list

- Head count (height in heads)
- Face shapes: eyes, brows, nose or muzzle, mouth
- Hair, ear, or helmet silhouette
- Palette swatches (3 to 5)
- Three most recognisable costume shapes
- Prop and which hand holds it
- Fixed references, fixed seed strategy, only the pose input changes

## Common failures

| Failure | Likely cause | Fix |
|---|---|---|
| Stretched torso on a short character | Stock adult skeleton | Scale bone lengths to head count |
| Prop in wrong hand | Mirrored skeleton | Check side colours, flip skeleton |
| Extra or merged fingers | No hand control | Hand keypoints, crop and inpaint |
| Flat foreshortened arm | Skeleton only, no depth | Add depth map, overlap forearm |
| Face drifts across poses | Pose control too strong too long | Lower strength, end earlier, keep same references |
| Stiff pose | No line of action, twinned limbs | Redo thumbnail with one curve |
