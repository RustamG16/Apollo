# Architecture essentials

One screen. Derived from `ARCHITECTURE.md` and `library/README.md` — do not add detail here;
add it there and re-summarise.

## What Apollo is

One persistent Design Director routes an evidence-based redesign through explicit gates,
activating a skill or specialist only when its routing condition is true. It is not "run every
capability at once" — that failure mode is described at the end of `ARCHITECTURE.md`.

## The run

```
intake + direction block → 01 audit → Gate A
  → 02 direction (one, per the brief) → 03 critique → Gate B
  → 05 asset manifest + 06 build plan
  → PRODUCT.md + DESIGN.md committed as numbers   ← before any layout code
  → implement
  → 07 QA (author) + 10 finish review (independent, scored) + 08 metrics
  → Gate C → 09 handoff
```

- **Direction is decided at intake**, not by generating alternatives. Default output is one
  direction. See the direction rule in `AGENTS.md`.
- **The design system is committed before the build**, with real numbers in `DESIGN.md`. See
  the design-system rule in `AGENTS.md`. This is the step whose absence most reliably produces
  a timid result.
- **Verification is two passes**: the author's, then an independent scored finish review.
- **Trail may be `full` or `abridged`** — abridged collapses `00`–`04` into an approved plan
  when the user's instruction already fixes brief and direction. It never skips
  `06-build-plan.md`, `DESIGN.md`, the finish review, or Gate C.
- **`06-build-plan.md` is the design document**, not a task list — art direction, palette,
  type scale as numbers, a page sequence with a per-section media map. Written in plan mode
  where the host has one, and **implemented from in a fresh session**.
- **The brief is read as written.** Explicit creative freedom cancels intake; a refusal
  ("no three directions") is a rejection to encode, not a request; "current"/"trending"/a
  named year opens a research lane that must cite live URLs. See `AGENTS.md`.
- **Six agents, one roster.** `library/agents/` is what both hosts run and each now states
  its own activation conditions. The console's five-name pantheon in `apollo-studio/data/`
  is a display model; `slots.json` carries `runtimeOwner` to map between them.
- **Greenfield**: no existing page → start at the questionnaire, `ux-evidence-audit` dormant,
  `reference-deconstruction` carries evidence.
- **Loops**: see the loop bounds in `AGENTS.md` (QA cycles, intake, audit cache, one-direction,
  anti-loop). Phase counts are recorded in `run.json`.

## Where things live

| Thing | Path |
|---|---|
| Source of truth (authored here only) | `library/` |
| Skills | `library/skills/<category>/<id>/SKILL.md` — one canonical kebab-case id per folder |
| Agents (host-neutral) | `library/agents/` — 5 specialists + `design-director` |
| Registry | `library/registry/skills.registry.json` · `ROUTING-DIGEST.md` (route from this) |
| Taste profile (persists across projects) | `library/design-dna/` |
| Doctrines | `library/doctrines/` — direction input to the questionnaire |
| **Generated, disposable** | `.claude/` · `.agents/skills/` · `.codex/agents/` · `apollo-studio/knowledge/` |
| Rebuild the generated trees | `python library/tools/project.py all` |
| Project artifacts (never in this repo) | `<website-project>/.olympus/` |

## Two-stage skill loading

Route from `library/registry/ROUTING-DIGEST.md` (one line per pipeline-active skill). Load a
`SKILL.md` body only after the routing decision, and never more than one body per phase.

## Hosts

`AGENTS.md` is the single doctrine for both hosts. `CLAUDE.md` and `PROMPT.md` carry only the
host-specific mechanics. `USAGE.md` is the human runbook.
