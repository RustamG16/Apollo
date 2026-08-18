# Copy-paste kickoff prompt

Replace the two placeholders, attach both folders to one Codex task, and send this:

> Use the attached `system1` folder as read-only operating context for this redesign. Read `system1/START-HERE.md`, `system1/AGENTS.md`, and `system1/ARCHITECTURE.md` completely before acting. The website project is `<PROJECT_FOLDER>` and the initial target is `<ROUTE_OR_PAGE>`. Do not inspect or edit production code yet. First ask the required intake questions from `START-HERE.md`, omitting only questions already answered by attached material. Use one Design Director, route skills conditionally, respect Gates A/B/C, write project-specific artifacts to `<PROJECT_FOLDER>/.olympus/`, and limit QA to two cycles.

After you answer the intake and approve Gate A, the same task continues through concepts. Do not start a new task for every phase; the durable `.olympus/` artifacts are the handoff if a new task becomes necessary.

## Useful follow-up commands

- “Gate A approved. Create the three concept directions; do not implement.”
- “Run the independent critique against the frozen concepts.”
- “Gate B approved for Concept 2 with these changes: … Prepare the asset manifest and build plan.”
- “The asset manifest is approved. Implement the first bounded slice and show browser evidence.”
- “Run final visual QA. Stop after cycle two and surface remaining tradeoffs.”

