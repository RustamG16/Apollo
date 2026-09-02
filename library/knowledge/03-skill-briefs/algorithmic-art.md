---
id: brief-003
skill: algorithmic-art
source: divyannshisharma carousel, slide 4 — https://www.instagram.com/p/Db0wyP_Ev1G/
upstream: github.com/anthropics/skills/tree/main/skills/algorithmic-art
local_status: NOT AVAILABLE — closest local is `art` (project-local to 005-agency)
filed: '2026-08-28'
---

# algorithmic-art

**Not available in this session.** The nearest thing on this machine is `art` in
`005-agency/.claude/skills/`, which was not inspected and may or may not be the same
skill.

## The idea

> "You give Claude an idea. You get back an interactive piece of generative art."

## What it does

Builds an **interactive art playground**, not a picture:

- Adjust parameters live
- Create variations
- Save the versions worth keeping
- Infinite variations from one system

The screenshot shows a full generative-art tool — a parameter panel (detail, flow
strength, turbulence, colour, background, brightness), an interaction panel, a canvas
rendering a flow-field piece, and an export control.

## The result

> "All delivered as a single HTML file you can open anywhere."

Positioned for NFT projects, digital art, and creative experiments.

> "Ideas become interfaces. Interfaces become art."

## Assessment

The pattern — **generate a parametric system and its control surface, not an output** —
is the same one behind `canvas-design` ([brief-001](canvas-design.md)) and behind the
`prototype` skill already installed here: produce the space of possibilities plus a way to
navigate it, rather than one guess.

Single-file HTML output makes it directly publishable as an Artifact, which is how it
would be used here.

**Not a gap worth closing urgently.** Generative art is not on the critical path for the
design systems work, and `anthropic-skills:three-guide`, `dataviz` and the MengTo effect
skills cover adjacent ground. Recorded for completeness.
