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
  → 05 asset manifest + 06 build plan → implement → 07 QA + 08 metrics → Gate C → 09 handoff
```

- **Direction is decided at intake**, not by generating alternatives. Default output is one
  direction. See the direction rule in `AGENTS.md`.
- **Greenfield**: no existing page → start at the questionnaire, `ux-evidence-audit` dormant,
  `reference-deconstruction` carries evidence.
- **Loops**: QA repair ≤ 2 cycles, then escalate. Never re-run an audit against unchanged
  evidence.

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
