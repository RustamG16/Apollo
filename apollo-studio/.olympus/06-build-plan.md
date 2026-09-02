# Build plan

## Apollo Workbench prototype — 2026-08-31

- Added Work as the default project/chat-first route without replacing existing local APIs or domain modules.
- Added browser-local fixture projects/chats, tabs, search, creation controls, and an Enter/Shift+Enter-aware deterministic demo composer.
- Preserved Systems, Library, Playground, Oracle, and activity routes; navigation now uses the approved product vocabulary.
- Added a persistent Oracle dock that routes to explanation/proposal prompts only. It has no new mutation path.
- Added a desktop three-column workbench and narrow single-work-area adaptation with context as a drawer; Work has no WebGL or media dependency.

No dependencies were added. Existing media remains unused until rights are recorded. The Tauri/React/SQLite migration is deliberately deferred to the functional desktop slice, which must add tested persistence, attachment authorization, streaming/stop state, and approval-recorded system draft/save.

- Zero-install Node HTTP server using built-in APIs.
- Server-only `OPENAI_API_KEY`; no secrets in client storage.
- OpenAI Responses adapter with allowlisted models, bounded prompt/output size, optional hosted web search, and `store: false`.
- Demo adapter for safe no-key routing tests.
- Manager-style Apollo prompt composition from a registry of 18 distilled skill contracts.
- Two or three concurrent variants receiving identical prompt and model settings.
- ResizeObserver-driven SVG paths derived from rendered DOM node geometry.
- Browser-local skill configuration, run history, and JSON export.
- Responsive operator UI with native controls, keyboard focus, reduced-motion handling, and no mobile horizontal overflow.

## Continuous-improvement slice — 2026-09-01

The user expanded the approved Apollo Workbench implementation with the following bounded slice:

- Repair route state so exactly one main view is active, including narrow layouts.
- Make Architecture discoverable from Systems and implement a locally persisted node playground: select, move, rename, add, connect, delete, and auto-layout nodes without replacing server system data.
- Expose Agent Profiles through Library, group agents and skills into understandable categories, and reuse approved project-local portraits as functional identity.
- Simplify Work hierarchy and fix composer action placement/alignment so context, model, attach, status, and Send have stable proximity.
- Reframe Playground as a small-run comparison flow: same task, two or three setups, visible run scale, controlled comparison, and promotion of the chosen result.
- Use the existing vendored GSAP core for purposeful graph, panel, selection, and result feedback; transforms/opacity only, cleanup where needed, and `prefers-reduced-motion` fallbacks.
- Generate one approved systems-atlas still according to `.olympus/05-asset-manifest.md`; preserve the CSS fallback.

This slice stays in the dependency-free browser renderer. It does not claim Tauri/React migration completion, persistent graph/server migration, live autonomous execution, Sora output, WebGL, or marketplace completion.
