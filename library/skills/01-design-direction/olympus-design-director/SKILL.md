---
name: olympus-design-director
description: Orchestrate an evidence-based redesign of an existing website page through intake, audit, three concepts, human approval, asset planning, implementation, analytics, and browser QA. Use when a user asks to improve, repair, redesign, or elevate a page and needs coherent routing rather than every design capability at once.
---

# Olympus Design Director

Own one interpretation of the brief and route work through explicit gates. Never treat “award-winning” as a license to optimize spectacle over clarity, accessibility, mobile behavior, or performance.

## Start

1. Read the attached system’s `START-HERE.md`, `AGENTS.md`, and `ARCHITECTURE.md`.
2. Identify the website project and target route.
3. Ask only unanswered intake questions from `START-HERE.md`.
4. Create `<project>/.olympus/` and copy the relevant system templates there.
5. Record phase and gate state in `.olympus/run.json`.

## Route the run

### Diagnose

- Invoke `$ux-evidence-audit` for the existing page.
- Invoke `$reference-deconstruction` only when approved references exist.
- Write durable findings to `.olympus/01-audit.md`.
- Stop for Gate A. Do not generate concepts or edit production code before approval.

### Direct

- Invoke `$concept-studio` after Gate A.
- Require exactly three materially different experience directions.
- Invoke `$award-rubric` after the concepts are complete, preferably as a read-only critic.
- Recommend one direction, but stop for Gate B and let the user choose.

### Prepare

- Invoke `$asset-director` only if required media is missing or needs transformation.
- Invoke `$webgl-experience` only if the selected concept has a candidate 3D/WebGL element.
- Invoke `$awwwards-web-design` for premium interaction and implementation polish after the static hierarchy is accepted.
- Load official GSAP skills only for approved timed sequences or scroll narratives.
- Write `.olympus/05-asset-manifest.md` and `.olympus/06-build-plan.md` before implementation.

### Build and verify

- Implement only the Gate-B-approved direction.
- Preserve the project stack and reuse existing components.
- Invoke `$visual-qa` on the actual implementation.
- Invoke `$design-analytics` only when a goal and analytics scope are known.
- Permit at most two author-fix/critic-review cycles, then escalate remaining tradeoffs.
- Stop for Gate C before declaring the work final.

## Delegate narrowly

Use the Design Director locally by default. If custom agents are available, delegate only a bounded phase and provide:

- objective and approved brief;
- permitted routes/files;
- evidence inputs;
- exact output path and schema;
- stop condition;
- prohibited actions.

Run at most one specialist by default, or two independent read-only specialists. Never allow nested delegation.

## Maintain the contract

At each phase transition, summarize only:

- approved facts;
- unresolved decisions;
- artifact paths;
- next specialist’s objective;
- gate state.

Do not paste the full conversation into specialist prompts. Do not regenerate unchanged work. Never claim browser verification, analytics evidence, user research, or asset rights without proof.
