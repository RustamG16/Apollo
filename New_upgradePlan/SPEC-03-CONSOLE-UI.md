# Spec 03 — the console

**Status:** draft. Depends on Spec 01 (the KB is what it queries).
**Goal:** the reference's UI, simplified and made honest, rendered in Apollo's own doctrine.

Reference: `D:\KnowledgeFactory\library\knowledge\04-ui-references\operator-console-ui.md`
(observed from the reel). Screenshots in `media/`.

---

## 1. The hard constraint

> **The console is a window, never a dependency.**

Apollo is used by opening Claude Code in a project folder. That does not change. If the
console is broken, not running, or never built, **every Apollo run still works exactly as it
does today.** Nothing in the pipeline may import from it, wait on it, or fail without it.

This is the difference between the reference and Apollo. His console *is* the product. Ours
is a view onto a system that runs headless.

## 2. What gets cut

His rail has **18 destinations**: Home · Comms · Funnel · Workflows · Social · Content ·
Finances · Agents · Tasks · Skills · Org Chart · Optimal Engine · Doctor · Connections ·
Roadmap · Analytics · Reference Vault · Personas.

Most of those are a business OS, not a design agency. Apollo gets **five**:

| View | Shows | Source |
|---|---|---|
| **Map** | The radial system map — agency → agents → skills → tools | `kb.db` |
| **Run** | The active run: phase rail, gates, token spend | `<project>/.olympus/run.json` |
| **Skills** | Catalog + the detail drawer | `kb.db` |
| **Knowledge** | Search across the KB | `kb.db` via `search()` |
| **Projects** | Projects found under `test_projects/` and elsewhere; pick one | filesystem scan |

Cut entirely: Funnel, Personas, Finances, Comms, Social, Content, Analytics, Roadmap.
They have no referent in Apollo and adding them would invent scope.

## 3. Map — the hero view

Concentric, as in the reference, but with Apollo's actual entities:

```
core         unlabelled particle cloud   = library/ , the shared knowledge
ring 1       agency hub                  = Design (one node today; Marketing joins later)
ring 2       agents                      = design-director + 5 specialists
ring 3       skills                      = 31 routed, accent by phase
ring 4       tools                       = external deps declared by skills
```

Rules carried over from the reference because they are correct:
- **Centre stays unlabelled.** A labelled "KNOWLEDGE BASE" circle turns an elegant map into
  an org chart.
- **Colour only on focus.** Everything grey until you select a cluster.
- **Accent traces the path, not the nodes** — connectors and junction dots take the colour;
  node bodies stay pale.
- **Click isolates, it does not zoom.** The selected cluster re-lays out as a top-down fan
  (tools → agents → skills → hub) with a `‹ name ›` pager.

## 4. The five fixes — the "improved" half

These are defects in the reference, not preferences.

| # | His | Ours |
|---|---|---|
| 1 | Outer tool ring is red "not connected" glyphs, implying live connection state a static page cannot know | Two honest states only: **declared** (a skill names it) and **resolved** (last `verify.py` run found it), with that run's timestamp on screen. Never a live green dot. |
| 2 | Small type unreadable even on a 4K monitor recording | Minimum 12px for any label that carries meaning. Pixel display face for headings only; a real mono for everything else. |
| 3 | Six accents competing simultaneously | One accent at a time, on focus. Apollo has one agency today — a second accent only exists when a second agency does. |
| 4 | Omni-input says "dump into the brain", implying an LLM behind the box | It is KB search and it is labelled **Search**. It calls `search()`. It never implies more than it does. |
| 5 | 18 nav destinations for 6 crews | 5 for 1 agency. |

## 5. The detail drawer — the thing most worth taking

His best idea. Trimmed to what Apollo can honestly fill:

```
title                      the skill's title
breadcrumb                 agency · category
ROUTING CONDITION          when this fires   <- Apollo-specific; better than his
PHASE / GATE               where in the run
WHAT IT REPLACES           one sentence
THE LADDER                 human-led / human-assisted / fully autonomous, current rung marked
THE HUMAN                  what a person still owns
THE SOP                    numbered steps
BUILDS ON / BREAKS INTO    dashed chip / solid chip  <- border style is the whole legend
TOOLS AT END OF CHAIN      declared deps
OPEN SKILL.md              the file, on disk
```

Sections with no data render an explicit **"not yet specified"** row. An empty drawer that
pretends to be full is worse than no drawer.

**This is content work, not UI work** — ~175 words × 31 routed skills. It is the slowest
item in the whole plan and it gates this view being worth opening.

## 6. Run view

The reference's Funnel, reframed to something Apollo actually has: the pipeline rail.

```
intake → 01 audit → [Gate A] → 02 direction → 03 critique → [Gate B]
       → 05/06 plan → implement → 07 QA → 08 metrics → [Gate C] → 09 handoff
```

Each node: name, state (pending / active / passed / blocked), and **tokens spent**. Gates
render as a distinct mark, not another node — a gate is a decision, not a step. Reads from
`run.json`, which already records phase counts.

## 7. Build

- **Extend `apollo-studio/`.** It is already Node + npm with a green `npm run check` and an
  MCP server. No new framework, no React, no build pipeline that isn't already there.
- Data: `kb.db` (via the same three verbs as the agents use) plus `run.json` per project.
- Launch: `npm run studio` from the Apollo root. Opens localhost, scans for projects.
- **Protected files stay protected**: `server.mjs`, `knowledge.mjs`, `mcp-server.mjs`,
  `data/`, `evidence/`, `handoffs/`, `public/media/` — per the existing out-of-scope rule.

## 8. Order

Build the Map and Skills views first — they read only `kb.db`, so they land as soon as
Spec 01 does. Run view needs a real run to look at. Knowledge is a thin wrapper over
`search()`. Projects is a directory listing.

**Do not start the drawer until §5's content exists for at least ten skills.** Building a
renderer for data nobody has written is how this stalls.
