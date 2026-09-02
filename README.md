# Olympus Designer System 1

Olympus is a portable context pack for redesigning an existing website page. It is deliberately a **gated studio**, not an autonomous swarm: one design director owns the run, specialist roles are activated only when needed, and implementation cannot begin until a human selects a concept.

## Apollo Orchestration Studio

The working architecture console and same-prompt skill-comparison playground live in [`apollo-studio/`](apollo-studio/). Start it with:

```powershell
cd D:\Analyst_Designer\Apollo\apollo-studio
npm.cmd start
```

Then open `http://127.0.0.1:4173`. It runs safely in demo mode without credentials and switches to live OpenAI Responses mode when `OPENAI_API_KEY` is present in the server process.

## Use it with any project

1. Attach this `system1` folder and the website project folder to the same Codex task.
2. Tell Codex: **“Read `system1/START-HERE.md` completely and follow it. My website project is `<project-folder>`.”**
3. Codex must ask the intake questions in `START-HERE.md` before auditing or editing.
4. Approve the direction at Gate B.
5. Review the verified implementation at Gate C.

Do not copy this system into the website. Project-specific decisions and evidence belong in `<project>/.olympus/`; this folder remains reusable and unchanged.

## What is included

- `START-HERE.md` — the only kickoff instruction you need to reference.
- `AGENTS.md` — operating rules Codex should obey while this folder is attached.
- `ARCHITECTURE.md` — the complete routing model and skill/MCP map.
- `.agents/skills/` — focused skills for audit, concepts, assets, motion, WebGL, analytics, and QA.
- `.codex/agents/` — optional specialist roles. They are never all launched together.
- `templates/` — stable output contracts for every run.
- `config/MCP-SETUP.md` — optional connections and their activation rules.

The skill folder also vendors the requested [Impeccable](https://github.com/pbakaus/impeccable) package and [GreenSock’s official GSAP skills](https://github.com/greensock/gsap-skills). Exact upstream commits and licenses are recorded in `third-party/`.

## Core promise

The system separates four kinds of work that broad “make it award-winning” prompts usually collapse together:

1. Evidence: what is wrong and why.
2. Direction: one direction, resolved at intake from the questionnaire and taste profile.
3. Production: only the chosen direction, with an explicit asset plan.
4. Verification: browser evidence, analytics, and an independent critique.

That separation is the main defense against wasted tokens, random redesigns, and polished-but-wrong output.

## Validate the pack

From PowerShell:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\validate-system.ps1
```

This performs a dependency-free structural check. The initial release was also checked with Codex’s `skill-creator` validator across all 19 included skills.
