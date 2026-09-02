---
id: rule-001
title: Six files before any code
source: src-0004 — https://www.instagram.com/reel/DcCpkSVhprW/ (andov.zip)
status: ACTIVE — enforced globally via ~/.claude/CLAUDE.md + project-scaffold skill
captured: '2026-08-21'
promoted: '2026-08-28'
---

# Six files before any code

The rule, as stated in the source: *before writing a single line of code, create these six
files to give the AI agent the context it needs.*

| # | File | What it holds |
|---|---|---|
| 1 | `prd.md` | Product. What, for whom, what it must do. Scope boundaries and explicit non-goals. No implementation detail. |
| 2 | `architecture.md` | Tech, in full. Stack, data models, module boundaries, integration points, and **why** each was chosen. Allowed to be long. |
| 3 | `architecture-essentials.md` | The same decisions as a one-screen outline. **Derived** from `architecture.md`, never written in parallel. |
| 4 | `AGENTS.md` | Agent instructions. |
| 5 | `CLAUDE.md` | Agent instructions. Write one of 4/5 and make the other a pointer. |
| 6 | The scaffold pass | Folder structure, data models and stub files created *before* any feature. Empty dirs and barely-drafted files are expected. |

The source calls #6 "an empty file". That is the scaffold pass: the agent lays out the
shape of the whole project before it builds any one part of it.

## Why #3 is the one that matters

`architecture-essentials.md` is the mechanism that makes the practice work rather than
just being paperwork. The agent reads the essentials for routine work and opens the full
architecture only when it needs the reasoning. Without it you get one of two failures:
the agent reads a huge document on every task and burns context, or it reads nothing and
invents structure.

Two rules keep it honest:
- Derive it from `architecture.md`. Two hand-maintained files drift, and a stale digest
  is worse than no digest.
- If it stops fitting on roughly one screen, the architecture is too complicated. That is
  signal about the design, not a reason for a longer outline.

## The adversarial turn

After the files exist and **before** implementation, ask in one prompt:

> What will break? What edge cases are we missing? What is over-engineered?

Write the answers back into the files. This is the cheapest moment in the project to
discover something should not be built — a paragraph now versus a rewrite later. Expect
it to cut scope; if it never cuts anything, it is not being asked seriously.

## Scale it to the work

| Scope | What to create |
|---|---|
| One-file script, spike, throwaway | Nothing. Just write it. |
| Single feature in an existing codebase | The adversarial turn only |
| New substantial feature | `prd.md` + the adversarial turn |
| New project | All six |

Applying the full six to a throwaway script is ceremony, and ceremony trains people to
skip the practice when it matters.

## Where this is enforced

- `~/.claude/CLAUDE.md` — global instruction, applies to every project on this machine.
- `~/.claude/skills/project-scaffold/SKILL.md` — the executable version.

## Provenance note

The source claims the workflow was "approved by Anthropic engineers at their event."
That is the creator's claim, unverified here, and it is not why the rule is kept — the
essentials-digest mechanism stands on its own.
