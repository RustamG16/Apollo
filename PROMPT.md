# Codex kickoff prompt

The Codex variant of the kickoff. For the full runbook (both hosts, gates, rebuild steps),
see `USAGE.md`.

Replace the two placeholders, attach both folders to one Codex task, and send this:

> Use the attached Apollo folder as read-only operating context for this redesign. Read
> `ARCHITECTURE-ESSENTIALS.md`, `AGENTS.md`, and `START-HERE.md` completely before acting.
> The website project is `<PROJECT_FOLDER>` and the initial target is `<ROUTE_OR_PAGE>`. Do
> not inspect or edit production code yet. First ask the required intake questions from
> `START-HERE.md`. Use one Design Director, route skills from
> `library/registry/ROUTING-DIGEST.md`, respect Gates A/B/C and the loop bounds in
> `AGENTS.md`, and write project-specific artifacts to `<PROJECT_FOLDER>/.olympus/`.

Do not start a new task for every phase; the durable `.olympus/` artifacts are the handoff
if a new task becomes necessary.

## Codex host mechanics

- Skills are `$name` tokens (e.g. `$ux-evidence-audit`); bodies live in `.agents/skills/<id>/`.
- Specialists are `.codex/agents/<name>.toml` (6: `design-director` + 5). `sandbox_mode =
  "read-only"` agents cannot write.
- Rebuild the projections after any `library/` edit: `python library/tools/project.py all`.

## Useful follow-up commands

- "Gate A approved. Detail the one direction from the brief; do not implement."
- "Run the independent critique against the frozen direction."
- "Gate B approved with these changes: … Prepare the asset manifest and build plan."
- "The asset manifest is approved. Implement the first bounded slice and show browser evidence."
- "Run final visual QA. Apply the AGENTS.md loop bounds and surface remaining tradeoffs."
