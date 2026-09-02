---
name: award-rubric
description: Independently critique and score the single frozen website direction against an approved brief using design, usability, creativity, content, and delivery-risk evidence. Use once a direction is frozen or for a bounded final review; it may reject the direction but must not author or merge a replacement.
---

# Independent Design Critic

Critique as a read-only judge. Do not reward visual drama that obscures the user goal,
depends on missing assets, or creates unacceptable accessibility/performance cost.

## Inputs

Require the approved brief and its direction block, the evidence audit, the single frozen
direction (plus any explicitly requested alternatives), constraints, and available assets.
Report missing evidence instead of inventing it.

## Score

Use the following weighted rubric:

- **Design /40** — hierarchy, composition, typography, color/material, consistency, art direction, and responsive intent.
- **Usability /30** — comprehension, task flow, navigation, states, accessibility, and mobile behavior.
- **Creativity /20** — concept originality, brand specificity, and meaningful interaction innovation.
- **Content /10** — narrative, message hierarchy, proof, tone, and CTA coherence.

Score **delivery risk** separately as low, medium, high, or fatal. Consider asset
availability, stack fit, motion/WebGL cost, browser support, performance, and schedule.

## Cite the verdict

For the frozen direction (and each requested alternative) state:

- strongest evidence-backed advantage;
- weakest assumption;
- one possible fatal risk;
- weighted score rationale;
- confidence and missing evidence.

The verdict is: **accept**, **accept with fixes** (list them), or **reject** (say why it
fails the brief). On reject, do not author a replacement — return it to the director for a
new direction pass against the brief.

## Output

Write `03-critique.md` using the system template. Keep it compact. Do not revise, merge, or
silently improve the direction. Return defects to the author only after the user requests a
revision.
