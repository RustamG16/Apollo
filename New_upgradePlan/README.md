# New upgrade plan — start here

Turning Apollo into a multi-agency system on one shared knowledge base. Design Agency
finished first; the rest attach after.

Written 2026-09-03 from two sources by Bennett Spooner (@bennett.spooner) plus the current
state of `D:\Analyst_Designer\Apollo`.

## Kickoff prompt for a fresh session

Paste this. It is written for a cold session with no memory of how the plan got here.

```
Apollo system work, not a website redesign — skip the website read order in CLAUDE.md.

Read in this order:
  1. New_upgradePlan/README.md, including "Repository state at handoff"
  2. New_upgradePlan/SOURCE-ANALYSIS.md §9 — the measured evidence that set the priorities
  3. New_upgradePlan/SPEC-02-AGENCY-MODEL.md §4.0 and §5 — the work order and the sequence
  4. New_upgradePlan/OPEN-DECISIONS.md — D2 is the scope question

First: commit the working tree as-is. It holds the 2026-09-04 workflow lock and you want a
clean boundary before touching verify.py and the registry.

Then implement sub-project 0, the host-parity guard, exactly as SPEC-02 §4.0 specifies:
the hostNote field, verify.py checks 10 and 11, and agent parity.

Constraints:
- library/ is the only source of truth. Never hand-edit .claude/, .agents/skills/,
  .codex/agents/ or apollo-studio/knowledge/skills/ — regenerate with
  `python library/tools/project.py all`, then `python library/tools/verify.py`.
- Do not touch apollo-studio/data/ or anything under test_projects/. Both Savra projects
  are finished evidence, not work in progress.
- Follow §4.0's acceptance test literally, including the regression step: break one skill's
  hosts, confirm the check fails, restore it. A check that only describes today's state is
  not a check.

Report verify.py before and after. If §4.0 is wrong about anything, say so rather than
working around it.
```

To continue past sub-project 0, replace the last three paragraphs with the next item in
`SPEC-02` §5. Sub-project 1 is the shared KB and has its own spec and acceptance test in
`SPEC-01` §6.

## Read in this order

| # | File | What it is |
|---|---|---|
| 1 | [SOURCE-ANALYSIS.md](SOURCE-ANALYSIS.md) | His architecture, decoded — tiers, token economics, guardrails. Plus a gap table against Apollo. |
| 2 | [SPEC-01-KNOWLEDGE-BASE.md](SPEC-01-KNOWLEDGE-BASE.md) | **Approved.** The shared KB: SQLite + FTS5, three verbs, agents query instead of loading. |
| 3 | [SPEC-02-AGENCY-MODEL.md](SPEC-02-AGENCY-MODEL.md) | Draft. How Design is finished and how agency #2 attaches without a refactor. |
| 4 | [SPEC-03-CONSOLE-UI.md](SPEC-03-CONSOLE-UI.md) | Draft. The console: 5 views not 18, the five fixes, and why it is a window and never a dependency. |
| 5 | [OPEN-DECISIONS.md](OPEN-DECISIONS.md) | What's settled and the three still needing your call. |
| — | [media/](media/) | 17 screenshots of the reel + carousel. Same material as the UI reference; kept as evidence. |

## Repository state at handoff — 2026-09-04

Read this before implementing. A cold session lands on a working tree with a lot in it.

**Uncommitted:** 31 tracked files modified, ~600 insertions, plus untracked
`New_upgradePlan/`, `.claude/skills/impeccable/`, three new `templates/*.md`, and two
`test_projects/`. All of it is the 2026-09-04 workflow lock described above.
**Commit before starting** — sub-project 0 edits `verify.py` and the registry, and you want a
clean boundary to diff against.

**Verified green right now:**

| Check | Result |
|---|---|
| `python library/tools/project.py all` | OK |
| `python library/tools/verify.py` | CLEAN — 84 skills, 84 records |
| `node .claude/skills/impeccable/scripts/context.mjs` | runs |
| `node .claude/skills/impeccable/scripts/detect.mjs` | runs, returns `[]` on the test project |

**Two test projects, and what they are for.** `test_projects/Savra_v2` is the Codex run that
scored 93 — the reference for what good looks like. `test_projects/Savra_Claude` is the
Claude run that scored 67 and whose repair pass is the evidence in `SOURCE-ANALYSIS.md` §9.
Neither is being rebuilt. Do not treat either as work in progress.

**The MCP `apollo` server was disconnected** during the session that wrote this. Nothing in
the plan depends on it, but if a task seems to want `apollo_get_context`, that is why it is
unavailable.

## The two constraints everything obeys

**1. Usage does not change.** Open Claude Code in a project folder, or create the project
under `test_projects/`, and run it. No new install, no service that must be up, no
subscription beyond Claude and Codex.

**2. The console is a window, never a dependency.** If it is broken or never built, every
Apollo run still works. Nothing in the pipeline imports from it or waits on it.

## What was cut, 2026-09-03

Hermes, GLM-5.2, Ollama Cloud, the gateway, the $240 three-subscription stack, and the
model-per-seat routing table. Apollo runs on Claude + Codex. What survives from his worker
pool is the *economics* — bounded brief in, one page out, one-way escalation, stateless
subagents — which Claude Code's own subagents already support. See `SPEC-02` §4.1.

## Updated 2026-09-04 — the workflow lock, and what it cost to find

Two full runs of the same brief were measured against each other for the first time:
`Savra_v2` (Codex, **93/100**) and `Savra_Claude` (Claude, **67/100 FAIL**). Same media, same
repository, same pipeline. The write-up is `SOURCE-ANALYSIS.md` §9 and it changed three
things in this plan.

**1. A defect class nothing was watching.** Eleven pipeline skills carried
`hosts: ['codex','studio']`, so Claude ran a weaker loadout than Codex on the same repo — two
of them `defaultOn: true`. `impeccable` is fixed and the class is not. It is now sub-project
**0** in `SPEC-02` §5, ahead of the KB.

**2. Cost was not the failure mode.** Neither run failed on tokens. Both failed or nearly
failed on craft, contract and host parity — none of which were in the gap table. The worker
lane stays; it is no longer first.

**3. The cheapest thing worked best.** Roughly 300 words of doctrine plus one template — the
build plan as a design document, written in plan mode and implemented from in a fresh
session — moved output more than anything else tried. That is a real challenge to
`SPEC-02` §4.4's 5,400 words of SOP prose, and §5 records it.

All of it is already in the repo: `AGENTS.md`, `START-HERE.md`, `templates/06-build-plan.md`,
`templates/DESIGN.md`, `templates/PRODUCT.md`, `templates/10-finish-review.md`, and an
`## Activation` block on all six agents.

## The two findings that shape everything

**1. Apollo is already his tiers 1 and 2.** `design-director` is the conductor; the five
specialists are the dept heads. What's missing is tier 3 — the cheap worker lane. Without
it, every Apollo run pays conductor prices for typing work. *(Still true. No longer the
first thing to fix — see the 2026-09-04 update above.)*

**2. The measured cost of the current design.** `apollo_get_context` ships **21,992 bytes
on every task** (`PROGRESS.md` Phase 8) — ~5.5K tokens before any work starts. Spec 01
exists to kill that, and its acceptance test is a 5x reduction with no behavioural change.

## What is not being rebuilt

The unification finished 2026-09-02, Phases 0–8 all PASS. 84 skills, 6 agents, registry
parity clean, `npm check` green, an MCP server already running. This plan **adds a retrieval
layer and a worker lane to a working system.** It does not restructure it.

## What the Notion link gave us

Nothing structural. `agency-accelerants.notion.site` is a public link-farm — ~90 resource
titles and a community pitch. The architecture came from the carousel
(`instagram.com/p/DcR-CYckYW9/`); the UI came from the reel (`instagram.com/p/Db7d0pXBaOG/`,
filed at `D:\KnowledgeFactory\library\knowledge\04-ui-references\operator-console-ui.md`).

## Status

- Spec 01 — approved in principle, not implemented. Nothing has been built.
- Spec 02 — draft, needs D2 confirmed.
- Next step per the brainstorming process: you review these, then an implementation plan
  for Spec 01 only.
