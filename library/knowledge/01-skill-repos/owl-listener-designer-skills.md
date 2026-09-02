---
id: repo-004
repo: Owl-Listener/designer-skills
url: https://github.com/Owl-Listener/designer-skills
description: "Designer Skills Collection: agentic skills, commands, and plugins for design — from research to systems, UI, interaction, and delivery."
stars: 2368
pushed: '2026-08-08'
licence: MIT
verified: '2026-08-28'
verdict: gap — broadest design-process coverage
---

# Owl-Listener/designer-skills

Nine plugins, ~110 skills. None installed. Organised by **design discipline**, each
category shipping as its own `.claude-plugin` with both skills and slash commands.

## The nine categories

**`ui-design` (20)** — `aesthetic-usability` `color-system` `dark-mode-design`
`data-visualization` `illustration-style` `law-of-closure` `law-of-common-region`
`law-of-continuity` `law-of-figure-ground` `law-of-proximity` `law-of-similarity`
`layout-grid` `platform-conventions` `readable-measure` `responsive-design`
`spacing-system` `typography-scale` `visual-hierarchy` `von-restorff-effect`

**`interaction-design` (22)** — `animation-principles` `conversational-ux`
`doherty-threshold` `error-handling-ux` `feedback-patterns` `fitts-law` `form-design`
`gesture-patterns` `hicks-law` `interfaces-that-feel` `jakobs-law` `loading-states`
`micro-interaction-spec` `millers-law` `navigation-patterns` `onboarding-design`
`peak-end-rule` `search-ux` `serial-position-effect` `state-machine` `teslers-law`
`zeigarnik-effect`

**`design-systems` (11)** — `accessibility-audit` `component-spec`
`design-system-governance` `design-token` `documentation-template` `icon-system`
`localization-design` `motion-system` `naming-convention` `pattern-library`
`theming-system`

**`design-research` (12)** — `affinity-diagram` `card-sort-analysis` `diary-study-plan`
`empathy-map` `interview-script` `jobs-to-be-done` `journey-map` `research-repository`
`summarize-interview` `survey-design` `usability-test-plan` `user-persona`

**`ux-strategy` (12)** — `business-design` `competitive-analysis` `content-strategy`
`design-brief` `design-principles` `experience-map` `information-architecture`
`metrics-definition` `north-star-vision` `opportunity-framework` `service-blueprint`
`stakeholder-alignment`

**`design-ops` (9)** — `design-critique` `design-debt-audit` `design-impact-reporting`
`design-qa-checklist` `design-review-process` `design-sprint-plan` `handoff-spec`
`team-workflow` `version-control-strategy`

**`visual-critique` (7)** — `critique-affordance` `critique-brand-consistency`
`critique-color` `critique-composition` `critique-information-density`
`critique-typography` `critique-visual-hierarchy`

**`prototyping-testing` (8)** — `a-b-test-design` `accessibility-test-plan`
`click-test-plan` `heuristic-evaluation` `prototype-strategy` `test-scenario`
`user-flow-diagram` `wireframe-spec`

**`designer-toolkit` (7)** — `case-study` `design-negotiation` `design-rationale`
`design-system-adoption` `design-token-audit` `presentation-deck` `ux-writing`

## The mechanism worth stealing

**One law, one skill.** Rather than a single "UX principles" document, each Gestalt law
and each usability heuristic is its own invocable unit — `fitts-law`, `hicks-law`,
`law-of-proximity`, `von-restorff-effect`. That makes a critique *citable*: a review can
name which principle is violated and load only that principle's guidance.

`visual-critique` splits the same way — seven separate critique axes instead of one
"review this design". Same single-axis pattern as jakubkrehel's `better-*` family,
applied to evaluation rather than improvement.

## Overlap with installed

`design-critique`, `accessibility-audit`, `handoff-spec`, `content-strategy`,
`competitive-analysis` and `ux-writing` duplicate skills already present (the `design:`
plugin set, `content-strategy`, `competitor-profiling`). The Gestalt/usability-law layer
and the seven critique axes have **no local equivalent**.
