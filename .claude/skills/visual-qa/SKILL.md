---
name: visual-qa
description: Verify an implemented website redesign against the approved direction using browser screenshots, responsive and interaction states, accessibility basics, reduced motion, runtime health, content, assets, and performance evidence. Use after a working implementation exists; the QA repair loop is bounded by AGENTS.md.
---

# Visual QA

Verify the actual implementation, not screenshots alone. Use a running build and record the environment, route, viewport, state, and evidence path.

## Build the matrix

Cover agreed routes and at least representative wide desktop and narrow mobile widths. Add critical intermediate widths when layout behavior changes. Test:

- initial, loading, empty, error, and populated states where applicable;
- navigation, links, forms, menus, modals, carousels, and interactive media;
- hover, focus, active, disabled, keyboard, and touch behavior;
- reduced-motion behavior and WebGL/static fallbacks;
- content wrapping, long text, missing media, and realistic data;
- console errors, failed network requests, layout shifts, and obvious loading/performance regressions.

## Compare to the contract

Judge against the approved brief, selected concept, asset manifest, and build plan. Report deviations as evidence, not taste.

Classify defects:

- **Critical** — blocks primary use, access, or release.
- **High** — breaks approved hierarchy, major responsive behavior, accessibility, or a core interaction.
- **Medium** — visible inconsistency or friction.
- **Low** — polish with limited user effect.

For every defect provide route/state/viewport, screenshot or reproducible evidence, expected versus actual, likely owner, and acceptance condition.

## Control the loop

Write `07-qa.md`. Send defects to the author for one bounded fix pass, then re-check affected and adjacent states. The QA repair loop is bounded by `AGENTS.md`; when that bound is reached, show remaining defects and tradeoffs to the user rather than continuing autonomously.

Do not claim a pass without browser evidence. Do not redesign the selected direction during QA.

