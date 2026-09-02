# Evidence audit

## Scope and evidence

- Routes/states inspected: live `#/systems` route and source that drives the saved system and the agent templates.
- Breakpoints: live local app at default desktop width; attempted 390×844 responsive check confirmed no horizontal document overflow (380px viewport width / 380px document width), though the live system content did not persist through the host's quick reload.
- Evidence locations: `agents.mjs`, `systems.mjs`, `data/systems.json`, `public/app.js`, `public/styles.css`, and `public/media/gods/`.
- Analytics available: none.
- Limits of this audit: no external user research or reference designs supplied. No media provenance beyond their local presence has been verified.

## Current experience in one sentence

Apollo is a functional, dark orchestration control plane whose active saved system and UI still expose eight generic specialists rather than the supplied Greek-god agent set.

## Highest-leverage findings

| Priority | Observation | Evidence | User/business effect | Severity | Confidence |
|---|---|---|---|---|---|
| 1 | **Observed:** the active saved system serializes eight generic agents and omits Apollo, Athena, Calliope, Hephaestus, and Hermes. | `data/systems.json` and `GET /api/systems`; corresponding portraits exist in `public/media/gods/`. | The user cannot recover or configure the expected agent system. | High | High |
| 2 | **Observed:** defaults are derived from the generic `agentDefinitions`, so new systems also recreate the wrong roster. | `agents.mjs` → `systems.mjs#defaultAgents`. | The defect returns whenever a system is created or duplicated. | High | High |
| 3 | **Observed:** the Systems view presents a long editor form and collapsed eight-agent roster before users can see identity, purpose, or available media. | Live DOM on `#/systems`, `public/app.js`, and `public/styles.css`. | Scanning and agent selection are unnecessarily slow. | Medium | High |
| 4 | **Observed:** no interface element currently consumes `public/media`; the live desktop Systems page contains no rendered `img` or `video`. | Browser audit and source search. | Supplied identity assets provide no differentiation or recognition. | Medium | High |
| 5 | **Observed:** the app is healthy in demo mode (22 enabled skills) and produced no browser console warnings/errors during inspection. **Inferred:** a restrained, Apple-like visual pass should reduce density rather than add decorative motion. | `/api/health`; browser logs; current compact visual system. | This is a safe base for a selected-direction polish pass. | Low | Medium |

## What already works

- The local API is healthy: 22 enabled skills are loaded and the app reports demo mode honestly.
- System creation, activation, saving, and deletion routes are implemented and the active system is server-backed.
- Reduced-motion CSS exists and the product already vendors GSAP locally.
- The app has responsive rules and a successful no-overflow mobile document check.

## Design problem to solve

Restore the god-agent system as a durable default and saved configuration, then make that roster legible and configurable through a calm, media-supported interface with purposeful, reduced-motion-safe feedback.
