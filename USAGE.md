# USAGE.md — the runbook

## What this system does

Apollo runs an evidence-based website redesign as a single Design Director that routes work
through explicit approval gates, activating one skill or specialist at a time instead of
loading every design capability at once. The method, token rules, and loop bounds are in
`AGENTS.md`; the routing table is in `ARCHITECTURE.md`; the skill and agent source of truth
is `library/`.

## The gates, in three sentences

**Gate A** freezes the brief and the single design direction (resolved from the questionnaire
and the taste profile, not by generating options). **Gate B** confirms that direction before
any production code is written. **Gate C** is the client review of the verified
implementation, with before/after evidence, asset provenance, and how success will be
measured.

## Kickoff — Claude Code

Attach this folder and the website project to the session, then send:

> Read `CLAUDE.md`, then `ARCHITECTURE-ESSENTIALS.md`, `AGENTS.md`, and `START-HERE.md`
> completely before acting. The website project is `<PROJECT_FOLDER>`; the initial target is
> `<ROUTE_OR_PAGE>`. Do not inspect or edit production code yet. First ask the intake
> questions from `START-HERE.md`, skipping any already answered by attached material. Act as
> one Design Director, route skills from `library/registry/ROUTING-DIGEST.md`, respect Gates
> A/B/C, write project artifacts to `<PROJECT_FOLDER>/.olympus/`, and limit QA to two cycles.

## Kickoff — Codex

Attach both folders to one Codex task and send:

> Use the attached Apollo folder as read-only operating context for this redesign. Read
> `ARCHITECTURE-ESSENTIALS.md`, `AGENTS.md`, and `START-HERE.md` completely before acting.
> The website project is `<PROJECT_FOLDER>` and the initial target is `<ROUTE_OR_PAGE>`. Do
> not inspect or edit production code yet. First ask the intake questions from
> `START-HERE.md`, omitting any already answered by attached material. Use one Design
> Director, route skills from `library/registry/ROUTING-DIGEST.md` (skills are `$name`
> tokens), respect Gates A/B/C, write artifacts to `<PROJECT_FOLDER>/.olympus/`, and limit
> QA to two cycles.

`PROMPT.md` is the same prompt plus the Codex host-mechanics quick reference.

## Follow-up commands (either host)

- "Gate A approved. Detail the one direction from the brief; do not implement."
- "Run the independent critique against the frozen direction."
- "Gate B approved with these changes: … Prepare the asset manifest and build plan."
- "The asset manifest is approved. Implement the first bounded slice and show browser evidence."
- "Run final visual QA. Stop after cycle two and surface remaining tradeoffs."
- "I want two alternative directions as well — here is why: …" (alternatives are opt-in)

## Rebuild the projections

`library/` is the only place to edit skills, agents, and the registry. After any change:

```
python library/tools/project.py all      # regenerate .claude/ .agents/ .codex/ apollo-studio/knowledge/
python library/tools/verify.py            # health check — exit 0 = clean
python library/tools/build_index.py       # refresh library/INDEX.md
powershell -File scripts/validate-system.ps1
```

`project.py <claude|codex|studio|digest>` runs one projector; add `--dry-run` to preview.

## The Studio

`apollo-studio/` is an optional local control plane (Node ≥20): `npm --prefix apollo-studio
start`, then `http://127.0.0.1:4173`. It reads the same `library/registry/` data via
`skills.mjs`. `npm --prefix apollo-studio run check` syntax-checks it.
