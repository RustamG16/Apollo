# Olympus operating instructions

These instructions apply whenever this folder is attached as context for a website redesign.

## Source of truth

- Start with `START-HERE.md`; it defines the gated workflow.
- Treat this repository as reusable and read-only during project work.
- Write project evidence and decisions only under `<website-project>/.olympus/`.
- Existing user work is not disposable. Preserve unrelated changes and the project’s established framework, conventions, and component system.

## Required behavior

- Ask the intake questions before auditing or editing unless the answers are already provided.
- Obtain Gate A before concepts, Gate B before implementation, and Gate C before calling the work final.
- Follow the direction rule below: resolve one direction at intake; do not generate alternatives by default.
- Prefer evidence from the actual page, source, supplied references, analytics, and browser behavior over stylistic claims.
- State what media the user should provide before proposing generation.
- Make new dependencies, WebGL, heavy scroll animation, and external generation opt-in decisions with explicit value and fallback.
- Verify desktop, mobile, interaction states, reduced motion, console/runtime health, accessibility basics, and performance risks.
- Keep an audit trail in `.olympus/` using the templates in this repository.
- Do not begin a new project without the six root context files in
  `templates/project-context/`; run `scripts/validate-project-context.ps1` before Gate A.
- Use progressive disclosure: read Architecture Essentials first, then only the product,
  architecture, agent, or history file needed for the current decision.

## The direction rule

Direction is decided at intake, not by generating alternatives. The questionnaire and taste
profile must resolve direction before Gate A. The default output is **one** direction.
Produce more only when the user asks for alternatives, and state how many and why.

The taste profile is load-bearing. If `library/design-dna/` holds no profile and the supplied
references do not resolve the direction block in `templates/00-brief.md`, the director runs
`$apollo-taste-interview` or `$apollo-style-picker` before Gate A rather than guessing, and
writes the result to `library/design-dna/` where it persists across projects.

Greenfield work has an entry: with no existing page the run starts at the questionnaire,
`$ux-evidence-audit` stays dormant, and `$reference-deconstruction` carries the evidence phase.

## Delegation policy

The default is a single Design Director using focused skills. Optional custom agents in `.codex/agents/` are specialists, not a hierarchy.

- Delegate only a bounded phase with a written output contract.
- Never launch all specialists.
- Never let a specialist delegate further.
- Run authors and critics sequentially when both may touch the same files.
- Use parallel work only for independent read-only evidence gathering, with at most two workers.
- The Design Director integrates the result and owns user communication.

## Token and loop controls

- Load only the relevant skill for the current phase.
- Share file paths and concise phase packets, not the whole conversation.
- Do not repeat completed analysis unless the target or evidence changed.
- Produce one direction by default (see the direction rule); limit QA repair cycles to two.
- A critic identifies defects and scores work; it does not secretly redesign it.
- Stop and ask when a missing choice would materially alter direction, cost, rights, or technical risk.

## Safety and quality

- Do not copy another site’s distinctive expression. Extract transferable principles and document the transformation.
- Do not invent analytics data, user research, asset rights, or browser verification.
- Do not place secrets in this repository or generated project documents.
- Respect reduced motion and provide non-WebGL fallbacks.
- An “Awwwards-level” ambition does not excuse unclear hierarchy, inaccessible interaction, poor mobile behavior, or unacceptable loading cost.
