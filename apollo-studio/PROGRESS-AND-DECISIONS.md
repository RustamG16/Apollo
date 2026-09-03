# PROGRESS AND DECISIONS

Append concise dated entries. Preserve history; correct entries by adding a later entry.

## 2026-08-31 — Desktop master plan recorded

- Gate A is approved for the Apollo Studio desktop redesign.
- Target: Windows-first local creative operating system; project/chat foundation with Work, Systems, Library, Playground, and a persistent approval-gated Oracle.
- The existing Node/vanilla-JS application, deterministic demo/live distinction, local APIs, media, data, knowledge, and uncommitted work remain protected during migration.
- Gate B is pending an explicit selection among Apollo Workbench, Olympus Observatory, and Artifact Archive. No product redesign implementation may begin before that decision.
- Gate C is pending final QA, packaged-build evidence, migration evidence, WKO demo instructions, and user acceptance.

## 2026-08-31 — Gate B approved: Apollo Workbench

- The user delegated the choice of concept; Apollo Workbench was selected after the three frozen directions and independent critique.
- The project/chat-first shell, contextual Oracle, and CSS-only initial identity fallbacks are approved for implementation.
- Olympus Observatory and Artifact Archive remain useful future feature-level patterns, but are not the global shell direction.

## 2026-08-31 — Phase 1 Workbench prototype

- Added an Apollo Workbench prototype over the protected Node/vanilla application: Work is default, projects/chats use controlled browser-local fixtures, existing Systems/Library/Playground/Oracle routes remain functional, and Oracle remains proposal-only.
- No dependency, database, external generation, WebGL, or media-rights decision was added. Existing media is deliberately unused pending provenance confirmation.
- `npm.cmd run check`, local health, project-context validation, desktop interaction checks, and 390 px no-overflow checks passed. One narrow-drawer overflow was fixed in QA cycle 1.
- Gate C remains pending; this is not a final desktop app or a Tauri/React migration.

## 2026-09-01 — Persistent Work foundation

- Added a dependency-free, atomic local workspace adapter for projects, nested chats, messages, explicit attachment metadata, and proposal audit records.
- File selection remains scoped to browser-selected metadata; no file contents enter the renderer, server, logs, or model prompt in this slice.
- Existing systems, knowledge, agents, events, protected media, and `/api/*` behavior were not replaced.
- Automated syntax, project-context, and local API smoke checks passed. Gate C remains pending interactive browser verification and the broader approved desktop-migration scope.

## 2026-09-01 — Desktop continuous-improvement slice

- The user explicitly narrowed layout scope to laptop and desktop; mobile responsiveness is not part of this slice.
- Added primary-source research and a phased improvement backlog, then implemented the first approved Workbench slice without altering the Node/vanilla architecture or demo/live boundary.
- Work is now a bounded command surface with live project orientation; Architecture supports keyboard node movement and a roving command toolbar; Playground is a two-column evidence comparison bench with visible run progress.
- Added two generated, non-semantic signal artworks with documented prompts and local WebP fallbacks, plus locally vendored Lucide command icons and reduced-motion-aware GSAP state transitions.
- Browser verification passed at 1280×800, 1440×900, and 1920×1080 with no horizontal overflow or console errors. One Work viewport-height defect was repaired and rechecked.
- The baseline was pushed to the private GitHub repository before this slice. These improvements remain local and must not be pushed until the user explicitly confirms.
- Gate C remains pending packaged Windows smoke testing and user acceptance; browser-demo evidence is current in `.olympus/07-qa.md`.

## 2026-09-01 — Visual enrichment implemented

- The user explicitly requested more design elements and authorized generated media for Apollo Studio.
- Added two locally served, optimized WebP atmospheres: a systems concordance used in Systems/Architecture and a knowledge reliquary used in Library. The assets are decorative, have CSS fallbacks, and are disabled as secondary visual layers for reduced-transparency/high-contrast preferences.
- Design improvements also introduced measured hero framing for Systems and Library plus quieter craft detail on agent profile surfaces; no product behavior, API, records, or external runtime dependency changed.
- `npm.cmd run check`, project-context validation, and a 1440×900 in-app-browser verification passed with no horizontal overflow or browser console warnings/errors. Gate C remains pending.

## 2026-09-03 — Redesign program amended for unattended execution

- Measured UI audit recorded in `LOADOUT-PLAN.md`: 92% of rendered text below 13px, 165 AA
  contrast failures, 289 controls under the 36px PRODUCT.md commitment, 0 rem font-sizes,
  18 CSS custom properties and no spacing/type/radius/motion/elevation tokens.
- Root cause identified: `DESIGN.md` ratifies label=9px, mono=10px, body=12px. The defect is
  the specification, not drift. No CSS work may begin before DESIGN.md is replaced.
- Second root cause: `detect.mjs` returns clean because every defect lives in computed styles,
  not markup patterns. The improvement loop has been running without instrumentation.
- The user removed the direction-selection rule. There is no candidate list, no
  concept-triptych and no selection ceremony. A full redesign is mandated; one direction is
  resolved at intake and held. The Phase-2 candidate line in `CONTINUOUS-IMPROVEMENT-PLAN.md`
  is void and that file is superseded for phase ordering, the direction rule, and gates.
- All human approval gates are removed for work on Apollo Studio itself. Gates A/B/C continue
  to govern client website projects. Exit gates are now self-verified measurements (T1-T11).
- Architecture decision: the Olympus pipeline is locked and made read-only in the UI; all
  configuration moves into a named, saveable, comparable "loadout" — 8 skill slots, Design DNA,
  brief, tools/MCP, budget. No new agents and no new systems.
- `RUN-PROMPT.md` added as the kickoff prompt for unattended sessions.
