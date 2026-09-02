# CLAUDE.md

Entry point for Claude Code when this folder is attached for a website redesign. This file
carries **only** the read order and the host-specific mechanics. All doctrine is in
`AGENTS.md` — it is not duplicated here.

## Read order

1. `ARCHITECTURE-ESSENTIALS.md` — one screen: what Apollo is, the run, where things live.
2. `AGENTS.md` — the operating doctrine. Read in full.
3. `START-HERE.md` — the gated workflow and the intake questions.
4. Then only the file the current decision needs: `ARCHITECTURE.md` for the full routing
   table, a `library/doctrines/<name>/design.md` for a chosen doctrine, a specific
   `library/agents/<name>.md` before delegating.

Route skills from `library/registry/ROUTING-DIGEST.md`. Load a `SKILL.md` body only after the
routing decision, one per phase.

## Host mechanics — Claude Code

- **Skills** load from `.claude/skills/<id>/`. Invoke a skill with the **Skill tool**, not a
  `$name` token. Where `AGENTS.md` or an agent file writes `$reference-deconstruction`, that
  means "use the `reference-deconstruction` skill".
- **Agents** are in `.claude/agents/<name>.md` (6: `design-director` + 5 specialists). A
  read-only specialist has no Write/Edit in its `tools:` list — respect that boundary.
- **Some skills are plugin-owned and not projected here** (`gsap-*`, `impeccable`,
  `apple-design`, `emil-design-eng`, `seo-audit`). Use the installed plugin skill of that
  name; do not look for a `.claude/skills/` copy.
- **Three skills are studio-only stubs** (`taste-first-experience-design`,
  `ethical-gamification-systems`, `agent-identity-and-portfolio`) — no body to load here.
- **PowerShell** scripts run via `powershell -File scripts\<name>.ps1` (e.g.
  `validate-system.ps1`, `validate-project-context.ps1`).
- **Rebuild the generated trees** after any `library/` change:
  `python library/tools/project.py all` then `python library/tools/verify.py`.

## Do not

- Edit anything under `.claude/`, `.agents/skills/`, `.codex/agents/`, or
  `apollo-studio/knowledge/skills/` — they are generated from `library/` and overwritten.
- Write project evidence into this repo. It goes in `<website-project>/.olympus/`.
- Touch `apollo-studio/data/`, `evidence/`, `handoffs/`, `public/media/`, or any `.olympus/`.

## For humans

See `USAGE.md` for the runbook — what the system does, the gates, the kickoff prompt, and how
to rebuild the projections.
