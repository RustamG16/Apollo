# Apollo

Apollo is a portable, gated design-orchestration system: one persistent **Design Director**
routes an evidence-based website redesign through explicit approval gates, activating a skill
or specialist only when its routing condition is true. It is deliberately not an "everything
at once" swarm — implementation cannot begin until a human selects a concept, and every run
leaves a verifiable trace (`.olympus/` in the target project).

This repository is the **system** — reusable, host-neutral operating context. It never holds
project-specific decisions or evidence; those belong in `<website-project>/.olympus/`.

## Read order

New to this repo (human or agent)? Read in this order:

1. [`ARCHITECTURE-ESSENTIALS.md`](ARCHITECTURE-ESSENTIALS.md) — one screen: what Apollo is, the
   run, where things live.
2. [`AGENTS.md`](AGENTS.md) — the full operating doctrine. This is the single source of truth
   for both hosts; `CLAUDE.md` and `PROMPT.md` only add host-specific mechanics on top.
3. [`START-HERE.md`](START-HERE.md) — the gated workflow and the intake questions.
4. [`USAGE.md`](USAGE.md) — the human runbook: kickoff prompts for Claude Code and Codex, the
   gates explained in three sentences, follow-up commands.
5. Then only what the current decision needs: [`ARCHITECTURE.md`](ARCHITECTURE.md) for the full
   routing table, a `library/doctrines/<name>/design.md` for a chosen doctrine, a specific
   `library/agents/<name>.md` before delegating.

## Set up on a new device

### Prerequisites

| Tool | Version | Used for |
|---|---|---|
| [Git](https://git-scm.com/) | any recent | cloning, version control |
| [Node.js](https://nodejs.org/) | ≥ 20 | Apollo Studio (`apollo-studio/`) |
| [Python](https://www.python.org/) | 3.9+ (stdlib only) | `library/tools/*.py` — projecting and verifying the skill library |
| PowerShell | 5.1+ (Windows) or [PowerShell 7](https://github.com/PowerShell/PowerShell) (macOS/Linux) | `scripts/*.ps1` validators |

No API keys are required to use the system itself. `apollo-studio` runs in demo mode without
credentials and switches to live mode only if `OPENAI_API_KEY` is set in its process
environment — never commit that key.

### Windows: enable long paths first

The skill library has deeply nested paths (some vendored skills, e.g. under
`remotion-best-practices/`, nest 6+ levels deep). Windows' default 260-character path limit can
break `git clone`'s checkout step with `Filename too long` errors — set this **before**
cloning:

```powershell
git config --global core.longpaths true
```

If you still hit path-length errors afterward (rare, only on deeply nested user profile paths),
also lift the OS-level limit once, as Administrator, then reboot:

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

Cloning to a short root path (e.g. `D:\Apollo` rather than a deeply nested `Documents`
folder) further reduces the risk.

### Clone and verify

```bash
git clone https://github.com/RustamG16/Apollo.git
cd Apollo
```

Run the structural validators — both are dependency-free and should exit clean on any machine:

```bash
python library/tools/verify.py
```

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-system.ps1
```

`verify.py` checks registry/skill parity in `library/`; `validate-system.ps1` checks that every
required file and every enabled, non-stub skill's projection into `.claude/` and `.agents/`
exists. Both must print a clean pass (`CLEAN` / `Olympus validation passed…`) before you trust
the clone.

### Optional: Apollo Studio (the local console)

```bash
cd apollo-studio
npm install
npm start
```

Then open `http://127.0.0.1:4173`. `npm run check` syntax-checks the whole studio (server,
scripts, and public JS) — run it after `npm install` to confirm the clone is healthy.

### MCP wiring

`.mcp.json` at the repo root registers the Apollo Studio MCP server using
`${CLAUDE_PROJECT_DIR}` (a Claude Code variable expanded to wherever the repo actually lives),
so it works unmodified regardless of clone path or OS — no per-device edits needed.

## What is included

| Path | Holds |
|---|---|
| `library/` | **Source of truth** — skills, agents, doctrines, registry, design DNA. Edit only here. |
| `.claude/`, `.agents/`, `.codex/` | **Generated, disposable** projections of `library/` for each host. Never edit directly — rebuild with `python library/tools/project.py all`. |
| `apollo-studio/` | Optional local control plane / same-prompt skill-comparison console (Node ≥ 20). |
| `templates/` | Stable output contracts for every run (`00-brief.md` … `10-finish-review.md`, `run.json`). |
| `config/MCP-SETUP.md` | Optional external MCP connections and their activation rules. |
| `test_projects/` | Device-specific test/demo projects. **Gitignored** — each one is its own independent git repo, never tracked or pushed as part of Apollo. |
| `scripts/` | PowerShell validators (`validate-system.ps1`, `validate-project-context.ps1`). |

The skill library also vendors the requested
[Impeccable](https://github.com/pbakaus/impeccable) package and
[GreenSock's official GSAP skills](https://github.com/greensock/gsap-skills). Exact upstream
commits and licenses are recorded in `third-party/`.

## Use it with a website project

1. Attach this repo and the website project folder to the same Claude Code / Codex session.
2. Send the kickoff prompt from [`USAGE.md`](USAGE.md) (host-specific — Claude Code and Codex
   have slightly different phrasing).
3. The agent must ask the intake questions in `START-HERE.md` before auditing or editing.
4. Approve the direction at Gate B.
5. Review the verified implementation at Gate C.

Do not copy this system into the website. Project-specific decisions and evidence belong in
`<project>/.olympus/`; this repo stays reusable and unchanged by any single project's run.

## Core promise

The system separates four kinds of work that broad "make it award-winning" prompts usually
collapse together:

1. **Evidence** — what is wrong and why.
2. **Direction** — one direction, resolved at intake from the questionnaire and taste profile.
3. **Production** — only the chosen direction, with an explicit asset plan.
4. **Verification** — browser evidence, analytics, and an independent critique.

That separation is the main defense against wasted tokens, random redesigns, and
polished-but-wrong output.

## Maintaining the library

`library/` is the only place to edit skills, agents, and the registry. After any change there,
rebuild every generated tree and re-verify before committing:

```bash
python library/tools/project.py all      # regenerate .claude/ .agents/ .codex/ apollo-studio/knowledge/
python library/tools/verify.py           # health check — exit 0 = clean
python library/tools/build_index.py      # refresh library/INDEX.md
```

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-system.ps1
```

`project.py <claude|codex|studio|digest>` runs one projector; add `--dry-run` to preview
without writing.
