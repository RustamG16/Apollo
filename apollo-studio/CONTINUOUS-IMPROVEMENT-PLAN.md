# Apollo Studio Continuous Improvement Plan

Status: Superseded by `LOADOUT-PLAN.md` for phase ordering, the direction rule, and gates. Retained for the anti-AI rules and the standing loop shape.

## Target outcome

Apollo Studio should feel like a deliberate professional desktop tool rather than an AI-generated dark dashboard. Workflow, information hierarchy, and interaction quality should provide the identity. Decorative media is allowed only when it has a measurable product purpose.

## Standing loop

Inspect -> Diagnose -> Propose -> Approve -> Implement -> Verify -> Critique -> Repeat

Completing one implementation slice does not complete the program. Every verified slice produces the next prioritized diagnosis.

## Phase 1: baseline

- Capture Work, Systems, Library, Playground, Oracle, and Runs at laptop and desktop sizes.
- Inventory typography, color, spacing, panels, icons, imagery, motion, content, and interaction patterns.
- Separate functional defects from aesthetic defects.
- Identify patterns that make the product appear generic or AI-generated.
- Select professional product references and score the current baseline.

No gate. The diagnosis and the T1-T11 thresholds are fixed in `LOADOUT-PLAN.md`.

## Phase 2: the visual system

VOID as of 2026-09-03 — superseded by `LOADOUT-PLAN.md`. There is no candidate list and no selection ceremony. The director resolves ONE direction at intake and commits to it; a full redesign is mandated. Define shell, navigation, typography, color, density, components, workflow visualization, motion, media policy, risks, and representative screens for the chosen direction. No decorative generated media is allowed during selection.

No gate. The resolved direction is recorded in `PROGRESS-AND-DECISIONS.md` and implementation proceeds.

## Phase 3: foundation

- Replace ad-hoc styling with semantic tokens.
- Establish consistent typography and spacing scales.
- Standardize buttons, inputs, menus, inspectors, tabs, and feedback.
- Reduce unnecessary containers, borders, micro-labels, and vague copy.
- Define hover, focus, active, disabled, loading, empty, error, and success states.
- Establish reduced-motion behavior.

## Phase 4: workflow sequence

Improve one workflow at a time: Work; Systems and node editor; Library and Agent Profiles; Playground; Oracle; Runs and history.

For every workflow, observe the task, diagnose the highest-impact friction, implement one coherent slice, test the complete task, compare before and after, record defects, and feed findings into the next iteration.

## Phase 5: continuous critique

After every implementation slice, test 1280x800, 1440x900, and 1920x1080; verify keyboard, focus, contrast, readability, runtime, console health, and concept fidelity; run an independent AI-generated-appearance critique; update scores for hierarchy, coherence, originality, usability, and restraint; and select the next backlog item.

A slice passes only when no critical or high defects remain, the primary task is clearer, complexity has not increased without value, the result matches the locked direction, and evidence is recorded.

## Anti-AI rules

- No decorative gradients or glow without state or spatial meaning.
- No generated imagery used as background ornament.
- No excessive cards or nested panels.
- No tiny uppercase text for ordinary information.
- No vague product copy or inconsistent icon styles.
- No animation without feedback or orientation value.
- No feature added only to make the interface appear advanced.
- No design drift after the direction is locked.

## Stop conditions

Pause only when a decision changes product direction, cost, privacy, or architecture; a required asset or permission is unavailable; the loop bounds in `AGENTS.md` are reached (QA repair or anti-loop); or the user explicitly pauses the loop. Do not stop because one page or iteration is complete.
