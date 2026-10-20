# Routing digest

One line per pipeline-active skill. Route from this table, then follow the two-stage skill-loading rule in `AGENTS.md`.
Unrouted skills (72) are in `UNROUTED.md` — capabilities, invoked explicitly, not part of the pipeline.

| Skill | Phase | Line |
|---|---|---|
| `olympus-design-director` | always | Orchestrates an evidence-based redesign through intake, audit, one direction, human approval, assets, build… |
| `competitor-profiling` | diagnose | Profile a business's competitors from their URLs — offer, positioning, pricing, and how they present themse… |
| `customer-research` | diagnose | Synthesise existing customer evidence (interviews, tickets, reviews, surveys) into the user, their primary … |
| `product-marketing` | diagnose | Structure a business's offer, audience, ICP and positioning into a reusable context the Brand DNA is built on |
| `reference-deconstruction` | diagnose | Extracts transferable visual logic without copying expression. |
| `site-architecture` | diagnose | Plan the page/route hierarchy, navigation model, URL structure, and internal linking so the redesign has a … |
| `ui-ux` | diagnose | Establishes product cognition, task journeys, progressive disclosure, recovery states, mobile priorities, a… |
| `ux-evidence-audit` | diagnose | Diagnoses source, browser, responsive, accessibility, and content evidence. |
| `apple-design` | direct | Applies Apple-inspired purpose, agency, familiarity, simplicity, typography, material restraint, and fluid … |
| `award-rubric` | direct | Independently scores the single frozen direction against the approved brief (design, usability, creativity,… |
| `concept-studio` | direct | Produces the one direction the approved brief specifies, in full: layout, type, media, motion, mobile, asse… |
| `convenium-style-picker` | direct | Path B of the taste profile: pick a built-in doctrine, pre-fill the profile from it, then ask only what the… |
| `convenium-taste-interview` | direct | Path A of the taste profile: a structured interview that walks taste-profile.schema.json field by field and… |
| `asset-director` | prepare | Plans required media, provenance, rights, and fallbacks. |
| `gsap-core` | prepare | Adds responsive, reduced-motion-aware tweens. |
| `gsap-plugins` | prepare | Routes approved plugin use such as Flip, Draggable, or SplitText. |
| `gsap-scrolltrigger` | prepare | Controls justified scroll-linked narratives and pinning. |
| `gsap-timeline` | prepare | Sequences dependent animation beats. |
| `gsap-utils` | prepare | Official GSAP skill for gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, … |
| `webgl-experience` | prepare | Tests whether 3D has communication value and specifies a bounded fallback. |
| `awwwards-web-design` | build | Adds premium editorial craft after hierarchy is stable. |
| `copywriting` | build | Write the interface's copy against the approved direction and primary action - headline, subheads, body, CT… |
| `emil-design-eng` | build | Polishes component feel, interaction feedback, animation decisions, easing, performance, and invisible inte… |
| `gsap-frameworks` | build | Scopes Vue, Nuxt, Svelte, and SvelteKit animation lifecycle. |
| `gsap-react` | build | Scopes React animation lifecycle and cleanup. |
| `impeccable` | build | Owns the finish: commits the design system as numbers before layout (PRODUCT.md, DESIGN.md, design.json), t… |
| `mobile-app-shell` | build | Makes the phone journey app-grade (360–430 px): screen budgets per page, phone-sized scroll-scrub runways, … |
| `modern-web-guidance` | build | Looks up current web-platform patterns (dialog, popover, anchor positioning, container queries, View Transi… |
| `scroll-scrubbed-visual-sequence` | build | Builds reversible scroll-controlled transformations on a pinned or sticky stage with normalized progress (v… |
| `threejs-build` | build | Implements an approved three.js / React Three Fiber scene within the budget and fallback that webgl-experie… |
| `animation-performance` | verify | Checks that implemented motion stays inside the frame budget: composite-only properties, main-thread load, … |
| `better-interface` | verify | Combines all of the `better-*` skills into a single review across accessibility, layout, writing, typograph… |
| `copy-editing` | verify | Edit implemented interface copy in focused passes (clarity, concision, consistency, voice) without changing… |
| `design-analytics` | verify | Connects design hypotheses to a minimal event contract. |
| `gsap-performance` | verify | Finds animation jank and layout-thrashing risk. |
| `playwright-cli` | verify | Drives a real browser from the command line for captures, interaction states and responsive checks during a… |
| `visual-qa` | verify | Verifies the implementation against the approved direction with browser evidence: viewports, interaction st… |
