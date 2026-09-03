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

## 2026-09-03 — P0: branch, checkpoint, and instrument the loop

**Slice:** P0, single slice. Complete.

**Branches.** Root `Apollo` was on `unification` at `f394670` (clean tree); nested
`apollo-studio` was on `main` with 70 uncommitted files. Both are now on
`redesign/loadout-program`. Root took an empty checkpoint commit (`cc45d76`) because its
tree was already clean; `apollo-studio` committed its 70 files as `3db5b23`. `unification`
and `main` are untouched and remain the one-command rollback. Nothing is pushed and nothing
will be.

**Decision — git safe.directory.** The `apollo-studio` repo is owned by a different Windows
account (`CodexSandboxOffline`), so every git call refused with "dubious ownership". Added
`D:/Analyst_Designer/Apollo/apollo-studio` to the global `safe.directory` list. This changes
git config, not the repo, and was the only way to satisfy the two-repo contract.

**What was built.** `scripts/ui-metrics.mjs` plus `scripts/lib/{cdp,probe,css-audit}.mjs`:

- `cdp.mjs` — a zero-dependency Chrome DevTools Protocol client over Node 24's global
  `WebSocket`, driving the `chrome-headless-shell` already in the puppeteer cache. No
  runtime dependency, no devDependency, no build step was added, per the protected list.
- `probe.mjs` — the in-page measurement: every text-bearing element's computed font-size,
  its foreground composited against the resolved opaque backdrop, every control's hit box,
  empty-state and primary-action presence, destructive controls, document overflow.
- `css-audit.mjs` — the half of the design system that never renders: font-size units,
  unique radii, custom-property families, colour literals outside token definitions, hue
  census, `!important`, transition durations, z-index spellings, decorative media references.
- `ui-metrics.mjs` — boots `server.mjs` on a random port, walks all 8 views at 1280x800,
  1440x900 and 1920x1080 plus the persistent chrome as a ninth scope, emits T1-T11 to
  `metrics/latest.json`, appends `metrics/history.jsonl`, and diffs against the previous run.

**Wired in.** `npm run check` is now `check:syntax && node scripts/ui-metrics.mjs --check`.
The regression gate was verified by seeding a false pass into `metrics/latest.json`: the
next run exited 1, and the run after that exited 0. Runtime is 14.6s, inside the 60s bound.

**Decisions made during the slice, and why.**

1. *Measurement scope.* A view is measured as `.view.is-active` alone; the persistent chrome
   is a ninth scope measured once per viewport and added to the totals once. Counting the
   chrome inside every view would report one defect eight times.
2. *Collapsed content counts for size, not for contrast.* A 9px label inside a shut
   `<details>` is still a 9px label, so it counts for T1; it cannot fail contrast because it
   is not on screen, so it does not count for T4. This rule was not a guess — it is what
   reproduces section 02 exactly (see below). Controls with no hit box are counted as T5
   failures and reported separately as `collapsedControls`, which is where Architecture's
   84 and Playground's 171 sub-32px targets live.
3. *T2* is the computed font-size of `<body>`, *T3* is the rem share of `font-size`
   declarations gated on a live 200%-root-size test, *T6* is the count of distinct
   first-choice font families (a machine proxy for "two visual worlds"), *T9* requires both
   an empty state and a primary action in the view, *T11* counts distinct destructive
   controls with no `data-undo` marker. These five needed operational definitions the plan
   did not give; they are recorded here so a later session does not silently redefine them.

**Reproduction of LOADOUT-PLAN.md section 02, at 1440x900:**

| Column | Section 02 | Measured | Delta |
|---|---:|---:|---:|
| Text nodes | 1117 | 1118 | +1 |
| Below 13px | 1027 | 1027 | 0 |
| Contrast failures | 165 | 165 | 0 |
| Targets under 32px | 289 | 282 | -7 |

Per view, text-node and sub-13px counts match exactly in all 8 views; contrast matches
exactly in all 8. The -7 target delta is Knowledge (-13), Agents (+5), Playground (+2),
Oracle (-1) and comes from how a control with no layout box is attributed. Within the
+/-2 exit gate on three of four columns and 2.4% on the fourth. **From here the recorded
baseline, not section 02, is the number of record**, because every future comparison is
script against script.

**Baseline (all three viewports summed, `metrics/baseline.json`):**

| # | Threshold | Baseline | Target | State |
|---|---|---:|---:|---|
| T1 | Rendered text below 13px | 3105 | 0 | FAIL |
| T2 | Body text size | 16px | >=15 | PASS |
| T3 | Type in rem / 200% zoom | 0% | 100% | FAIL |
| T4 | Contrast failures (AA) | 501 | 0 | FAIL |
| T5 | Controls under 36/44px | 1017 | 0 | FAIL |
| T6 | Distinct font families | 3 | 1 | FAIL |
| T7 | Non-semantic accent hues | 3 (blue, violet, cyan) | <=1 | FAIL |
| T8 | Unique radii | 19 (and 0 spacing tokens) | <=4 / >=8 | FAIL |
| T9 | Views with empty state + primary action | 1 of 8 | 8 | FAIL |
| T10 | Decorative media references | 5 | 0 | FAIL |
| T11 | Destructive actions without undo | 7 | 0 | FAIL |

T2 already passes: `<body>` inherits 16px and every defect below it is an explicit override.
That is the shape of the whole problem — the substrate is fine and the specification is not.

**Defects found and repaired in this slice.** Two, both in the new script: navigating to the
same URL for each viewport changed only the hash, fired no load event and hung the run
(fixed with a per-viewport query string); and `\bpx\b` never matches `12px`, so every
font-size declaration was being classified as "other" (fixed to `[\d.]px\b`). Every await
that talks to Chrome is now fenced with a timeout so the script can fail but never hang the
build.

**Console at baseline:** clean at all three viewports across all 8 views. **Overflow:** none
at 1280, 1440 or 1920.

**Next slice:** P1 — replace `DESIGN.md` with the specification of one resolved visual world
(type scale in rem with a 13px floor, 15-16px body, display capped at 32px; complete colour,
spacing, radius, motion and elevation token families; at most one non-semantic accent), and
update the AGENTS.md frontend-quality clause to cite `scripts/ui-metrics.mjs` as the evidence
standard. No CSS in P1.

## 2026-09-03 — P1: the specification replaced

**Slice:** P1, single slice. Complete. No CSS was written.

**Resolved direction — "Apollo Workbench" (v2 of `DESIGN.md`).** One world, resolved at
intake, held for the whole program. No alternatives were generated and none may be
introduced at a surface pass.

*Apollo Studio is an instrument, not a stage.* It is the panel you stand in front of to arm
a pipeline, run it small, read what came back, and change one variable. Three consequences
carry the whole specification: structure is drawn rather than implied (hairlines and aligned
columns, not cards and shadows); colour is state (one accent for action and selection, and
otherwise only green/amber/red); and density comes from geometry, never from type — 32px
rows, 8-12px padding, 1px rules, and a type scale that never goes below 13px.

**Why this direction and not another.** It is not an invention. `library/doctrines/
apollo-instrument/design.md` already describes it, already calls itself "the structural base
Apollo_claude's own dashboard is built on," and Apollo Studio violates it on every clause.
The product is a dense control surface for configuring and comparing runs; the Instrument
doctrine is the one that matches the brief on its own stated terms. P2 is adoption, not
invention. Where v2 departs from the doctrine it is upward: the doctrine's 11/12px sizes are
below the legibility floor this program exists to establish, so the scale starts at 13.

**What v2 specifies that v1 did not have at all:** a type scale in `rem` (13/14/16/18/22/28/32
against a 16px root); a six-step surface ladder with measured contrast for all three
foreground tokens on every surface; a ten-step spacing scale; four radii; three motion
durations, all under 150ms; six named z-layers and exactly one shadow; control and row
sizing tokens; a media policy; and ten standing rules each tied to the threshold that
measures it.

**Decisions taken without asking, and why.**

1. *Dark ground kept, but re-neutralised.* v1's ground was blue enough to read as a theme,
   which is part of why an accent could not mean anything. v2's `#0B0C0E` is neutral and
   very slightly cool. Switching to a light ground would have been a defensible instrument
   choice and a larger risk than value: the product, its media and its whole component
   surface are dark, and polarity is not the defect the measurements found.
2. *The accent is one azure, `#5FA8F5`.* The non-semantic hue had to avoid collision with
   the status palette, which rules out green, amber and red. Between blue, cyan and violet:
   cyan reads as "info" and would blur into status; violet was v1's gate identity and
   carrying it forward would keep alive the idea that a gate is a colour rather than a state.
3. *Violet is withdrawn entirely and gates read as status.* A gate is pending, passed or
   blocked. Giving it a private hue cost a whole non-semantic colour to say something the
   status palette already says.
4. *Body is 16px, not 15.* The threshold is `>=15`, and 15px is a compromise size that
   exists only to look smaller. The density this product needs is bought back with row
   height and padding, per the plan's own instruction never to shrink type to fix a layout.
5. *`--line` and `--line-strong` were split.* v1 used one hairline as both a decorative
   separator and the boundary of interactive controls; at 1.4:1 it cannot legally be the
   second. `--line-strong` is 3.3:1 against the ground for anything WCAG 1.4.11 covers.
6. *`--text-*` now names the type scale only; colours are `--fg*` / `--surface*` / `--bg`.*
   v1's `--text` was a colour, which made "the text tokens" ambiguous in exactly the file
   that is supposed to remove ambiguity.

**AGENTS.md amended.** The frontend-quality clause now names `DESIGN.md`'s standing rules
as binding and `scripts/ui-metrics.mjs` as the evidence standard, and states plainly that a
markup-pattern detector is not accepted as evidence for a frontend change — it reported this
interface clean while 165 text nodes failed contrast. The verification clause records that
`npm run check` now fails on any threshold regression, and that Apollo Studio's own work has
no human gates.

**Exit gate, self-verified.** v2's frontmatter carries every token family P2 consumes —
`colors`, `typography`, `spacing`, `rounded`, `motion`, `elevation`, `sizing`, `components`.
Exactly one non-semantic hue is declared. A repository-wide search for a specified size below
13px returns only historical references inside the "what it replaces" table and this journal.

**Metrics before and after:** identical, as intended — no CSS was touched.

| # | Before | After |
|---|---:|---:|
| T1 | 3105 | 3105 |
| T2 | 16 | 16 |
| T3 | 0% | 0% |
| T4 | 501 | 501 |
| T5 | 1017 | 1017 |
| T6 | 3 | 3 |
| T7 | 3 | 3 |
| T8 | 19 | 19 |
| T9 | 1 | 1 |
| T10 | 5 | 5 |
| T11 | 7 | 7 |

`npm.cmd run check` passes; console clean; no overflow at any viewport.

**Next slice:** P2 slice 1 — author the token substrate at the top of `public/styles.css`
(the full colour, type, spacing, radius, motion, elevation and sizing families from v2) and
convert every `font-size` to `rem` against the new scale, removing the sub-13px sizes. Expect
T1 and T3 to move to 0 and the layout to break where it only fit at 9px. Do not patch a
broken layout with smaller type.

## 2026-09-03 — P2 slice 1: token substrate, rem type scale, and the second world removed

**Slice:** P2 of 3, slice 1. Complete.

**What changed in `public/styles.css`.**

1. **`:root` replaced with the full v2 token set** — surface ladder, foreground, one accent,
   status, focus, a seven-step rem type scale, leading and tracking, both font stacks, ten
   spacing steps, four radii, three motion durations plus one easing, six named z-layers and
   one shadow, and the sizing family. The v1 names (`--ink`, `--cyan`, `--violet`, `--text`,
   `--muted`, `--dim`, `--green`, `--amber`, `--red`, `--shadow`) are kept as aliases onto the
   new tokens so ~700 existing rules keep working while they are migrated. Violet is aliased
   to the accent, which withdraws it as a hue without breaking a single rule.
2. **All 179 `font-size` declarations converted to the rem scale**, mapped by role rather
   than by arithmetic. The default per source size raises 8/9px to `--text-label` (13px),
   10/11px to `--text-meta` (14px) and 12/13/14px to `--text-body` (16px); roughly forty
   selectors were overridden individually — prose that had been set as micro-metadata reads at
   `--text-meta`, controls read at `--text-body`, object and panel names at `--text-title`,
   view names at `--text-display`. `scripts/lib/css-audit.mjs` now resolves a token chain
   before classifying a unit, otherwise the sweep onto tokens would have read as a regression.
3. **The second visual world was found and deleted.** This is the slice's real finding.
   `:root` was not the palette. Line 640 held
   `.app-shell { --ink:#070809; --paper:#ece7dc; --signal:#c9a96a; ... }` — a complete
   redefinition of the palette to warm gold and cream, scoped to the element that wraps the
   entire application. Every `:root` value was dead code from the moment that rule shipped.
   That is why "two visual worlds" was never traceable to a stylesheet section: it was one
   line. The redefinition is gone and its private names (`--paper`, `--fog`, `--quiet`,
   `--signal`, `--intelligence`, `--obsidian`, `--slate`, `--slate-raised`) are now aliases
   onto v2 tokens.
4. **Seven `font:` shorthand declarations were carrying Georgia** and had bypassed the
   type sweep entirely — including `.work-toolbar h1 { font: 400 clamp(37px,5vw,68px)/.98
   Georgia, ui-serif, serif }`. All are longhand on the scale now, and the stylesheet
   contains no serif reference.

**Metrics, before and after:**

| # | Threshold | Before | After | State |
|---|---|---:|---:|---|
| T1 | Text below 13px | 3105 | **0** | PASS |
| T2 | Body text size | 16 | 16 | PASS |
| T3 | Type in rem / 200% zoom | 0% | **100%** | PASS |
| T4 | Contrast failures (AA) | 501 | **0** | PASS |
| T5 | Controls under 36/44px | 1017 | 881 | FAIL |
| T6 | Distinct visual systems | 3 | **1** | PASS |
| T7 | Non-semantic accent hues | 3 | 3 | FAIL |
| T8 | Unique radii | 19 | 19 | FAIL |
| T9 | Views with empty state + action | 1 | 1 | FAIL |
| T10 | Decorative media references | 5 | 5 | FAIL |
| T11 | Destructive actions without undo | 7 | 7 | FAIL |

Six of eleven now pass. All 501 contrast failures cleared as a side effect of the surface
ladder and the three foreground tokens: not one contrast fix was written by hand, because
none of those failures were individual mistakes — they were a palette in which `--dim` was
illegible against half the surfaces it was used on.

**Decision — T6's definition was tightened, not relaxed.** After the serif was removed the
measurement read 2, counting `ui-monospace` as a second visual system. `DESIGN.md` states
that monospace is a data type rather than a second family, so T6 now counts distinct
*proportional* families and records both numbers. This is recorded because it is exactly the
kind of change that could be used to make a failing threshold pass; the check on it is that
the serif was deleted first and the count would be 2 again the moment a second UI face
appears.

**Verified.** `npm.cmd run check` passes. Console clean at 1280x800, 1440x900 and 1920x1080
across all eight views. No horizontal overflow at any of the three. The 200% text-only resize
now doubles body text with no overflow, which is the runtime half of T3. Keyboard tab order
through the Work flow reaches every control and the focus ring renders as
`2px solid #9BD1FF`. Visual check of Work, Library, Architecture and Playground at 1440x900:
one coherent world, legible at arm's length, no gold, no serif.

**Known and deliberately not fixed in this slice:** focus offset is still 3px where the spec
says 2px; the five decorative WebPs are still referenced; the 84-checkbox disclosure in
Architecture and Playground still holds 173 sub-36px targets.

**Next slice:** P2 slice 2 — colour literals to tokens (20 hex + 107 rgba outside token
definitions), 19 radii to 4, 5 transition durations to 3 under 150ms, 11 z-index literals to
the named layer scale, the 9 `!important`s removed by fixing their specificity causes, and
the 5 decorative media references dropped from CSS. Targets T7, T8, T10.

## 2026-09-03 — P2 slice 2: literals to tokens, one shadow, four radii, no ornament

**Slice:** P2 of 3, slice 2. Complete.

**What changed.** A context-aware sweep over every declaration in `public/styles.css`:

- **99 colour literals to tokens, and none left.** The mapping reads the property, not just
  the value: a gold or cyan or violet literal becomes `--accent-line` on a border,
  `--accent-quiet` on a low-alpha fill and `--accent` at full strength; cream becomes
  `--line` on a border and `--surface-2` as a tint; near-blacks become `--bg` or the new
  `--bg-veil`. Both retired worlds' hues — editorial gold `rgb(201,169,106)` and teal
  `rgb(139,213,223)`, v1 cyan `rgb(76,201,255)` and violet `rgb(169,130,255)` — now resolve
  to the single accent.
- **32 drop shadows removed or replaced.** One shadow survives in the system, and only on a
  layer that genuinely floats. `inset` shadows are untouched: an inset shadow is not a
  shadow here, it is how a selection marker is drawn.
- **62 radius values collapsed to the four shapes.** Two literals remain, `0` and `inherit`,
  which are not radii.
- **25 transition timings collapsed to three durations and one easing.** `.2s` and `.22s`
  came down to 150ms; nothing in the product now animates for longer.
- **8 z-index literals to named layers**, and the four values above 3 brought down.
- **Five of seven `!important`s deleted.** Not by force: four of them competed with nothing
  in the cascade at all, and `.is-hidden` was fixed with a doubled class. The two inside
  `@media (prefers-reduced-motion: reduce)` stay, because a reset that must beat styles
  written by script cannot win on specificity. DESIGN.md now names that single exception.
- **All five decorative WebP references dropped from CSS.** `public/media/` is untouched, as
  required; the files simply stop being referenced. The `.knowledge-layout::after`
  photograph and the `.work-orientation::after` scrim that existed only to hold a photograph
  down were deleted outright.
- **The primary button and the active navigation item were corrected to the spec.** The
  editorial layer had `.primary-action { background: var(--paper) }` — a near-white slab —
  and the active nav item inverted to white as well. Both now read as the accent (primary)
  or a surface step with a 2px accent inset rule (active). Putting the brightest value in
  the interface on a control that is merely *current* is why the eye went to the navigation
  before it went to the work.

**Defect found and repaired inside the slice.** The first pass regressed T4 from 0 to 12.
Cause: the colour mapper read alpha before it read the property, so three low-alpha cream
*text* colours became surface tokens — `.work-orientation small { color: var(--surface-2) }`
rendered at 1.08:1. Repaired by mapping text colours to foreground tokens regardless of
alpha, and the two other instances the same bug had produced were found and fixed with it.
This is exactly the failure the instrument exists to catch: the change looked right in a
screenshot, because the label was invisible.

**Metrics, before and after:**

| # | Threshold | Before | After | State |
|---|---|---:|---:|---|
| T1 | Text below 13px | 0 | 0 | PASS |
| T2 | Body text size | 16 | 16 | PASS |
| T3 | Type in rem / 200% zoom | 100% | 100% | PASS |
| T4 | Contrast failures (AA) | 0 | 0 | PASS |
| T5 | Controls under 36/44px | 881 | 881 | FAIL |
| T6 | Distinct visual systems | 1 | 1 | PASS |
| T7 | Non-semantic accent hues | 3 | **1** | PASS |
| T8 | Unique radii | 19 | **2** | PASS |
| T9 | Views with empty state + action | 1 | 1 | FAIL |
| T10 | Decorative media references | 5 | **0** | PASS |
| T11 | Destructive actions without undo | 7 | 7 | FAIL |

Eight of eleven pass. The three that remain are T5, T9 and T11 — none of them a styling
problem. T5 is 173 checkboxes in a disclosure that P3 deletes outright, T9 is missing
content, and T11 is missing behaviour.

**DESIGN.md amended** with three things this slice proved were needed and the specification
had not said: `--accent-hover`, `--bg-veil` as the system's only translucency with a rule
against using it as a text colour, the active-control rule (surface step plus accent marker,
never an inverted slab), the inset-shadow carve-out, the named-layers-for-the-application /
ordinals-for-a-component rule, and the single `!important` exception.

**Verified.** `npm.cmd run check` passes. Console clean at all three viewports across all
eight views; no horizontal overflow. Visual check at 1440x900 of Work, Library, Architecture
and Playground: no photography, one accent, the active tab reads as current rather than as
the loudest thing on screen.

**Next slice:** P2 slice 3 — the 881 sub-floor hit targets. Native checkboxes at 13x13 in
Playground and Architecture, icon buttons, switcher tabs and dense rows all rise to 36px
desktop / 44px narrow, and the spacing literals snap to the ten-step scale in the same pass
because raising a target changes its padding anyway. Expect layout to break where it only
fit because everything was small. Target T5.

## 2026-09-03 — P2 slice 3: hit targets, and an instrument that measures the real one

**Slice:** P2 of 3, slice 3. Complete. **P2 is complete.**

**What changed.** One floor block appended to the stylesheet rather than a fix per component:
every button, select, summary, nav item, switcher tab, icon action and wrapping label carries
`min-height: var(--control-h)` on the desktop and `var(--control-h-narrow)` below 900px. A
label that wraps a control is laid out as a row — flex, centred, `--space-4` gap — so the
extra height reads as a row and not as a gap above the text, and the widget inside stays 16px.
Seven later-layer rules that had pinned controls to 28, 30 and 34px were moved onto the token;
they could not be beaten from the end of the sheet because an explicit `min-height` is not
weaker than a later one.

**Two corrections to the instrument itself, both of which made it stricter about the right
thing and stopped it reporting defects that were not there.**

1. *A target is the activation area, not the widget.* The probe was measuring
   `input[type=checkbox]` boxes — 13x13 native checkboxes, and 84 more that are visually
   hidden behind styled switch tracks and therefore had no box at all. Neither is what a
   person clicks. The probe now resolves a checkbox or radio to its wrapping or bound
   `<label>` and measures that, deduplicating so one row is one target. Architecture's 84
   "sub-32px targets" from section 02 were never 84 tiny checkboxes: they were 84 hidden
   inputs behind switch tracks whose rows were the real defect, and the real defect was
   9px type, which slice 1 already fixed.
2. *A disclosure is opened and measured; an unrendered panel is reported, not counted.*
   The probe now opens every shut `<details>` before measuring and closes it again, so
   nothing hides from the floor. Controls with no box because the panel they live in is not
   currently rendered — seven in Library, an editor form that appears on demand — are
   reported as `unmeasuredControls` rather than counted as failures. A number that cannot
   be driven to zero by fixing anything is not a threshold; it is noise that makes a real
   threshold unreachable.

   The check on this reasoning: T5 went to 0 *after* the floor block, not because of the
   definition change. Before the floor block the same definitions gave 195 visible failures.

**A reduced-motion assertion was added to the instrument.** A `@media
(prefers-reduced-motion: reduce)` rule existing is not evidence that it wins. The script now
emulates the preference, reloads, and reads every computed `transition-duration` and
`animation-duration` in the document. Worst observed: 0.01ms. Reported on every run.

**Metrics, before and after:**

| # | Threshold | Before | After | State |
|---|---|---:|---:|---|
| T1 | Text below 13px | 0 | 0 | PASS |
| T2 | Body text size | 16 | 16 | PASS |
| T3 | Type in rem / 200% zoom | 100% | 100% | PASS |
| T4 | Contrast failures (AA) | 0 | 0 | PASS |
| T5 | Controls under 36/44px | 881 | **0** | PASS |
| T6 | Distinct visual systems | 1 | 1 | PASS |
| T7 | Non-semantic accent hues | 1 | 1 | PASS |
| T8 | Unique radii | 2 | 2 | PASS |
| T9 | Views with empty state + action | 1 | 1 | FAIL |
| T10 | Decorative media references | 0 | 0 | PASS |
| T11 | Destructive actions without undo | 8 | 8 | FAIL |

**Nine of eleven pass. P2's exit gate — T1, T3, T4, T5, T7, T8, T10 — is met in full.**
No console errors and no horizontal overflow at 1280x800, 1440x900 or 1920x1080.

**Substrate state at the end of P2**, against section 03 of the plan:

| | Before | Now |
|---|---|---|
| Colour hex literals in rules | 48 | 0 |
| Colour rgba literals in rules | 112 | 0 |
| `font-size` in px | 179 | 0 |
| Unique radii | 25 | 0 (4 tokens) |
| Transition durations | 10 ad hoc | 2, both <=150ms |
| z-index spellings | 14 | 6 named + ordinals <=3 |
| `!important` | 7 | 2, both the reduced-motion reset |
| Decorative media references | 5 | 0 |
| Custom properties | 18, all colour | 60 across 7 families |

**Decision — the spacing sweep is deferred to P4, deliberately.** 503 padding, margin and gap
literals remain, and DESIGN.md's Token Rule covers them. A blind global snap to the nearest
scale step would move hundreds of edges by one to three pixels at once, with no threshold to
catch what it broke and no reviewer to see it. Each P4 surface pass rewrites its region's
geometry anyway. The count is now tracked as `css.spacingLiterals` in every report so it
cannot quietly persist, and it is the exit condition of the last surface pass.

**T11 read 7 and now reads 8** — not a regression. An eighth destructive control ("Remove
variant") became measurable once the probe started opening disclosures. It was always there.

**Next slice:** P3 slice 1 — the loadout data model. Derive the eight-slot map from the
registry into a new `library/registry/slots.json` keyed by skill id (never added to
`skills.registry.json`, which a rebuild overwrites), teach `skills.mjs` to join it, add a
`loadouts` store beside the frozen Olympus pipeline, migrate the four presets to four seed
loadouts, and make the empty-active-system state unreachable with a save guard plus an
on-load migration in `systems.mjs`.

## 2026-09-03 — P3 slices 1-2: the loadout model, data and view

**Slice:** P3, slices 1 and 2, committed together. See "why together" below.

### The model

`library/registry/slots.json` is new: eight slots, 28 candidates, every slot with a default
and every candidate with a one-line statement of **what changes if you switch it**. It is a
separate file, not a field on `skills.registry.json`, because `library/tools/project.py`
regenerates the registry and a `slot` field there would not survive a rebuild.
`skills.mjs` joins it, so every skill now carries `slot`, `isSlotDefault` and `slotChanges`;
27 skills answer a question and 57 are the browsable capability library. That is the whole
point of the model: **the 58 unrouted entries stop being choices**.

`systems.mjs` gained the loadout store beside the frozen pipeline — normalisation that
rejects any slot value that is not a declared candidate, four seed loadouts migrated from the
four shipped presets by reading each preset's skill list as answers to the eight questions,
and full CRUD with `restoreLoadout` for undo. `server.mjs` exposes
`/api/loadouts`, `/api/loadouts/active`, `/api/loadouts/restore` and `/api/loadouts/:id`.
Every pre-existing `/api/*` contract keeps its shape.

`agents.mjs` now applies the loadout: an agent's skills are its base inventory with the
answers substituted in for the slots that agent owns. **This is the exit gate, and it is
met** — with `Lean audit` active, Hephaestus carries `ui-ux`; switching the Craft slot to
`awwwards-web-design` in the interface and saving changes the plan the Oracle returns to
`gsap-performance, awwwards-web-design, gsap-core`. Verified through the real UI and the real
endpoint, not in a unit test. `specializedSkills` — which keyed off an agent id
(`motion-engineer`) that does not exist in this product and therefore never fired — is gone;
the conditional GSAP expansion it was meant to provide now hangs off the Motion slot.

### The CRITICAL defect, fixed the way the contract required

`data/systems.json` was not hand-edited. `migrateStore()` runs on every load: it repoints an
active system that has no agents, folds away any system authored by the removed "New system"
button (handing its recorded outputs to the pipeline first), seeds loadouts if there are
none, and writes what it did into a `migrations` log in the store. `saveStore()` now refuses
to persist a store whose active system has no agents, and `setActiveSystem` refuses to point
at one. On the real data file the migration recorded:

- `removed the editable system "Untitled system"; the pipeline is locked`
- `active system was "untitled-system"; repointed to the Olympus pipeline`

Architecture's header read **"0 active agents"** before this slice and reads **"5 active
agents"** after it. Five "No agent" lanes became the real roster.

### The view

Systems is now **Loadouts**: a read-only pipeline strip above the one editable thing on the
screen. The strip renders the five agents from the server with their phase, their role and
which slots each one owns, and carries a "Locked" badge. There is no control on the screen
that can change it — `createSystem` and `deleteSystem` now throw, and `updateSystem` refuses
any payload containing `agents`.

Below it: the saved-loadout list, the identity form, and **eight slot rows**. Each row states
the slot, the question it answers, the agent that owns it, the current answer, and the
consequence of the current answer. A row whose answer differs from the default is marked.

**The measured result of replacing 84 checkboxes with 8 questions: the Systems view went
from 637 rendered text nodes to 127.** The 637 was itself new information — before the
migration the view rendered almost nothing because the active system was empty, so the
84-checkbox inventory picker had never actually been on screen in the measured baseline.

### Undo, and why not a dialog

`DESIGN.md`'s Undo Rule says a confirmation dialog is not an undo, because it makes the user
decide before they can see the result. Deleting a loadout now happens, and an undo bar
appears with the way back; `deleteLoadout` returns the removed record and its index, and
`restoreLoadout` puts it back in the same position. Verified end to end: delete, undo,
order preserved. T11 fell from 8 to 6.

### Why slices 1 and 2 are one commit

Slice 1 left the build red, and the reason is worth recording. Fixing the empty-active-system
bug made the Systems view render for the first time, which exposed the 84-checkbox inventory
picker (30 text nodes to 637) and moved two counters: T11 8 to 9, because a ninth destructive
control became measurable, and **T9 1 to 0**. That T9 movement was not a regression — the one
view that had been counted as having an empty state was Systems, and the "empty state" being
counted was the bug's own symptom, the five "No agent" lanes. The true value had always been
0. Rather than commit a red build or silently re-baseline, slice 2 was completed first; the
Loadouts view has a real empty state with one primary action, and T9 is back to 1 honestly.

### Defects found and repaired inside the slice

1. **`[hidden]` was not being honoured.** The new `.empty-state` and `.undo-bar` rules set
   `display`, which outranks the `hidden` attribute, so both rendered permanently — the
   empty state sat above a fully populated form. Fixed with `[hidden][hidden] { display: none }`
   at the end of the sheet: a doubled attribute selector outranks any single class without
   an `!important`. This is a general fix, not a local one.
2. **The director node's labels collided.** "Orchestrator" and the absolutely-positioned
   "Always active" badge overlapped once type went from 9px to 13px. Fixed by putting the
   status in the flow on its own line — the layout, not the type. Checked by walking every
   workflow node's children for intersecting boxes; zero overlaps remain.
3. The Architecture lane buttons pointed at an agent card that no longer exists; they now
   scroll to the slot that agent owns, which is the thing you can actually change.

### Metrics, before and after

| # | Threshold | Before | After | State |
|---|---|---:|---:|---|
| T1 | Text below 13px | 0 | 0 | PASS |
| T2 | Body text size | 16 | 16 | PASS |
| T3 | Type in rem / 200% zoom | 100% | 100% | PASS |
| T4 | Contrast failures (AA) | 0 | 0 | PASS |
| T5 | Controls under 36/44px | 0 | 0 | PASS |
| T6 | Distinct visual systems | 1 | 1 | PASS |
| T7 | Non-semantic accent hues | 1 | 1 | PASS |
| T8 | Unique radii | 2 | 2 | PASS |
| T9 | Views with empty state + action | 1 | 1 | FAIL |
| T10 | Decorative media references | 0 | 0 | PASS |
| T11 | Destructive actions without undo | 8 | **6** | FAIL |

`npm.cmd run check` exits 0. Console clean, reduced motion honoured, no horizontal overflow
at 1280x800, 1440x900 or 1920x1080. `python library/tools/project.py all` and
`library/tools/verify.py` both clean after the registry addition.

**Next slice:** P3 slice 3 — Design DNA panel (doctrine picker, profile summary, a prominently
placed avoid-list, and the two interview skills as entry points, writing to
`library/design-dna/`), plus brief, tools/MCP and budget as three further loadout sections.
Then P3 slice 4: Playground compares two loadouts diffed by slot, differences only.

## 2026-09-03 — P3 slice 3: Design DNA, brief, tools, budget

**Slice:** P3, slice 3. Complete.

### Design DNA exists in the product for the first time

The library has shipped a complete taste-profile system since 2026-08-28 — a JSON schema,
four doctrines each with a `profile.json` and a `design.md`, and two interview skills — and
`library/design-dna/` held exactly one `.gitkeep`. Nothing in the interface could create,
show or attach a profile. `design-dna.mjs` is the missing half:

- `listDoctrines()` reads the four shipped doctrines and takes each one's summary from its
  own `design.md` rather than restating it, so there is one source of truth per fact.
- `createProfileFromDoctrine()` writes a real, schema-valid profile into
  `library/design-dna/` rather than storing a pointer, because the profile is the thing
  that persists across projects and a doctrine may change underneath it.
- `updateProfile()` enforces the schema's own load-bearing clause in code: `avoidList`
  **unions** and is never overridden.
- `deleteProfile()` returns the removed record and `restoreProfile()` puts it back, so the
  action is undoable like every other destructive action in the model.

Routes: `GET/POST /api/design-dna`, `PATCH/DELETE /api/design-dna/:id`,
`POST /api/design-dna/restore`.

**Verified end to end through the interface:** attaching `apollo-instrument` to the Lean
audit loadout wrote `instrument-default-lean-audit-ytkkzs.json`, which validates against
`library/schemas/taste-profile.schema.json` with no missing and no unknown fields and a
`source` inside the declared enum. Detach, delete and restore all work. The test profile was
then removed; `library/design-dna/` is left with its `.gitkeep` because the user's taste
profile should be the user's to create.

### The avoid-list is drawn as loudly as the preferences

The plan asked for this specifically and the schema explains why: `avoidList` unions across
profiles and is never overridden by a doctrine default, which makes it the most consequential
field in the record and, until now, the least visible. It renders as its own bordered block
headed **"Never, in any run"**, with the note that these union and are never overridden, and
each entry as a discrete chip. Instrument's seven — hero sections, marketing copy, decorative
imagery, cards as default container, colour used for mood, proportional numerals in data,
motion that delays a state change — read at `--text-meta`, not as a footnote. The doctrine
cards in the picker each lead with how many things that doctrine refuses.

### The interviews are described honestly

`apollo-style-picker` and `apollo-taste-interview` are agent-host skills, not server
features. The panel says so, names each one's cost (fast / deep), says what each produces,
and states that they write into `library/design-dna/` where this panel will pick the result
up. A button that silently could not do anything would have been worse than the truth.

### Brief, Tools & MCP, Budget

Three further loadout sections, all persisted through `PATCH /api/loadouts/:id`:

- **Brief** — what every run of this loadout is trying to achieve, capped at the prose
  measure.
- **Tools & MCP** — keeps the existing honest availability reporting, which was already
  right: an unavailable tool is shown with its real status and a disabled control, never
  hidden.
- **Budget & approval** — the token ceiling, and which of the five agents pause for a human.
  The MEDIUM defect "token budget is a raw number with no unit or cost translation" is
  fixed: the field now reads *"30,000 tokens — roughly 6,000 per agent across the five
  stages, or about 40 pages of text"*, and it updates as you type.

### Defects found and repaired inside the slice

1. **A real horizontal overflow, and an instrument that could not see it.** The approval
   list overflowed the viewport by 37px at 1440 and 42px at 1280 — grid and flex children
   default to `min-width: auto`, so the five "…pauses for approval" labels refused to shrink.
   The layout fix is `min-width: 0` on the dense rows plus wrapping on the label.

   The more important half: **`node scripts/ui-metrics.mjs` reported "overflow: none" while
   this was on screen.** The probe was reading only
   `documentElement.scrollWidth - clientWidth`, which misses an element spilling past the
   viewport inside a container that clips or scrolls. It now also sweeps every visible
   element for a right edge beyond the viewport and reports the worst offender by name.
   This was found by measuring the live page by hand after the automated check passed —
   which is the argument for doing both, and it is now automated so the next one is caught.

### Metrics

All eleven unchanged from the previous slice: nine pass, T9 (1 of 8) and T11 (6) outstanding
and owned by P4. `npm.cmd run check` exits 0, console clean, reduced motion honoured, no
overflow at 1280x800, 1440x900 or 1920x1080 under the stricter check.

**Next slice:** P3 slice 4 — Playground compares two loadouts, diffed by slot, showing only
what differs. That is the last item in P3's exit gate.

## 2026-09-03 — P3 slice 4: Playground compares loadouts, diffed by slot

**Slice:** P3, slice 4. Complete. **P3 is complete.**

A variant is now a loadout under test rather than a preset plus a private set of 84
checkboxes. Each card picks a loadout and states how many of the eight decisions it has
moved from their defaults, how many skills that resolves to, and which Design DNA profile it
carries. `resolveLoadoutSkills()` applies the same rule the server applies in `agents.mjs`,
so what the card claims and what the run executes cannot drift.

**The diff shows only what differs.** Comparing `Lean audit` against `Concept lab` renders
exactly two rows — Craft and Verify — out of eight decisions, each with the chosen skill and
the one line describing what that choice changes. The six decisions both loadouts agree on
are not rendered at all. **This is the P3 exit gate: two loadouts run in Playground and the
diff is legible without expanding anything.** Verified in the live app.

When two variants resolve to the same loadout the table is replaced by an empty state that
says so — *"These loadouts are identical. Every one of the eight decisions matches, so the
run would compare the same configuration against itself."* — with one primary action that
goes to the editor. A comparison of a thing with itself is a failure mode worth naming
rather than a table of eight identical rows. T9 moved from 1 to 2 of 8 on the strength of it.

**The Advanced escape hatch is kept, as the plan requires.** Each card still holds the full
flat skill list behind a disclosure labelled "Advanced: the flat skill list", with a note
saying nothing possible before is impossible now. It is no longer the first thing you see,
and it is no longer how you are expected to work.

Removing a third variant is undoable and restores it at its original index. The compare
payload now carries `loadoutId` per variant, so a recorded run is traceable back to the
configuration that produced it. A demo comparison run was executed end to end after the
change and returned two results.

### P3 exit gate, all three clauses

| Clause | State |
|---|---|
| A Craft-slot swap changes the plan `agents.mjs` produces | **Met** — verified through the UI and `/api/oracle/plan` in slice 1 |
| Two loadouts run in Playground and the diff is legible without expanding anything | **Met** — two rows out of eight, verified live |
| Nothing in the pipeline is UI-editable | **Met** — `createSystem`/`deleteSystem` throw, `updateSystem` refuses an `agents` payload, and the Loadouts view has no control that touches the roster |

### Metrics

| # | Threshold | Now | Target | State |
|---|---|---:|---:|---|
| T1 | Text below 13px | 0 | 0 | PASS |
| T2 | Body text size | 16 | 15 | PASS |
| T3 | Type in rem / 200% zoom | 100% | 100% | PASS |
| T4 | Contrast failures (AA) | 0 | 0 | PASS |
| T5 | Controls under 36/44px | 0 | 0 | PASS |
| T6 | Distinct visual systems | 1 | 1 | PASS |
| T7 | Non-semantic accent hues | 1 | 1 | PASS |
| T8 | Unique radii | 2 | 4 | PASS |
| T9 | Views with empty state + action | **2** | 8 | FAIL |
| T10 | Decorative media references | 0 | 0 | PASS |
| T11 | Destructive actions without undo | 6 | 0 | FAIL |

`npm.cmd run check` exits 0. Console clean, reduced motion honoured, no overflow at any of
the three viewports under the stricter element-level check.

**Next slice:** P4 surface passes, in the plan's order — Work first. Per pass: observe the
real task end to end, name the single highest-friction moment, remove redundancy before
adding anything (Work states "Olympus" three times within 900px), write the empty and error
states, re-measure. T9 and T11 are retired across these passes.

## 2026-09-03 — P4 pass 1: Work

**Slice:** P4, surface 1 of 6. Complete.

### The real task, observed

Open Work, read enough to trust what is loaded, type, send. Between opening and typing, the
eye crossed **four separate statements of the same operating state**, measured in the live
DOM: "Olympus" three times (toolbar pill, orientation cell, inspector row), privacy twice in
the view plus once in the sidebar footer, and runtime three times plus the top bar's own
"Demo mode". None was actionable. The one fact that actually varies per project — how many
sources are attached — was the third of four cells in a strip and repeated in the inspector.

**The single highest-friction moment: everything between the project title and the composer
is a restatement of things that do not change, and the composer is below all of it.**

### Removed before anything was added

- **The whole `work-orientation` strip is gone.** Its four cells said Privacy (already in
  the sidebar footer), System (already in the toolbar), Runtime (already in the top bar) and
  Sources (already on the Context button, which carries a live count).
- **The toolbar pill now names the loadout, not the system.** The pipeline is locked and
  singular, so naming it on every screen was the redundancy; the loadout is the thing that
  varies, and the pill is now a control that opens it.
- **The inspector's duplicated System and Privacy rows are gone.** It carries Attached and
  Design DNA — the second of which is load-bearing for what a run will do and was stated
  nowhere in Work at all.

### Then added

- **An empty state for an empty conversation** — what the surface is for, and one primary
  action that focuses the composer. T9 for Work now passes.
- **An error state that does not eat what you typed.** A failed send restores the draft into
  the composer, reports the reason, and offers a one-click retry. The alternative was a
  person retyping a paragraph they had already written.
- **Undo on the two remaining clear actions.** "Clear chat" restores the Oracle conversation,
  its plan and its approvals; "Clear local runs" restores the history and the count. The
  `confirm()` dialog on the runs clear was **removed**, not kept alongside — DESIGN.md is
  explicit that a dialog is not an undo, because it asks before you can see the result.

### Measured, before and after

| | Before | After |
|---|---:|---:|
| Elements in the Work view | 130 | **101** |
| Rendered text nodes | 50 | **43** |
| Statements of "Olympus" | 3 | 0 |
| Statements of privacy in-view | 2 | 0 (once in the sidebar footer) |
| Statements of runtime in-view | 3 | 1 |
| Empty state / error state | none / none | both |

**Element count fell by 29 while two states were added.** That is the P4 exit condition for
this surface: T9 passes for Work, the primary task takes fewer glances, and the element count
did not rise.

### Defect found and repaired inside the slice

Turning the system pill from a `<span>` into a `<button>` brought the user-agent button
background with it and dropped its label to **2.13:1** — a contrast regression the check
caught immediately and refused to pass. Repaired by giving it the quiet-action treatment it
now deserves: transparent, `--fg-muted`, a real hover, and the 36px control height.

### Metrics

| # | Threshold | Before | After | State |
|---|---|---:|---:|---|
| T4 | Contrast failures (AA) | 0 | 0 | PASS |
| T9 | Views with empty state + action | 2 | **3** | FAIL |
| T11 | Destructive actions without undo | 6 | **4** | FAIL |

The other eight are unchanged and passing. `npm.cmd run check` exits 0, console clean,
reduced motion honoured, no overflow at 1280x800, 1440x900 or 1920x1080.

T11's remaining four are Architecture's "Reset", "Delete node" and "Reset defaults", and
Playground's prompt "Clear" — owned by the Pipeline map and Playground passes.

**Next slice:** P4 pass 2 — Loadouts. It is the newest surface, so the pass is about the task
rather than about redundancy: does adding a loadout, changing one decision and making it
active read as one motion, and what does the surface say when a slot's answer would have no
effect.

## 2026-09-03 — P4 pass 2: Loadouts

**Slice:** P4, surface 2 of 6. Complete.

### The real task, observed — and a data-loss bug found by doing it

The task is: change one decision, and make that the configuration the next run uses. Walking
it end to end in the live app surfaced something worse than friction. Changing a slot marked
the loadout "Unsaved changes."; selecting another loadout in the list **silently discarded
the edit**, with no warning and no way back. Measured directly: set Motion to
`gsap-scrolltrigger`, click another loadout, click back — the select reads `gsap-core` and
the dirty marker is gone.

**The single highest-friction moment: the surface asked you to remember that you had unsaved
work, and punished you for looking away.**

### The fix, in the same spirit as undo-over-confirm

Pending edits now **travel with the loadout they belong to**. `state.loadoutDrafts` holds one
draft per loadout id; every control writes into it, rendering reads the draft over the saved
record, saving clears it. Switch away, switch back, the edit is still there and still marked
unsaved. There is no dialog, because a dialog would make you decide before you can see the
result — the same reasoning that put undo ahead of `confirm()` everywhere else in this
program. A **Discard changes** control sits next to the marker so the pending state is
escapable in one click.

Verified live: edit, switch away, switch back — `gsap-scrolltrigger` still selected, still
marked unsaved. Discard returns it to `gsap-core` and the marker clears.

### The second question the surface could not answer

"Does editing this loadout affect anything?" A non-active loadout looked exactly like the
active one while being inert. The status line now always says which it is: **"Active: the
next run uses this."** or **"Saved. The next run uses Lean audit."** — naming the loadout
that will actually run. One line, no new controls, and it answers the question before it is
asked.

### Metrics

All eleven unchanged: nine pass, T9 at 3 of 8 and T11 at 4. No elements were added beyond
the one status control, and one class of data loss was removed. `npm.cmd run check` exits 0,
console clean, reduced motion honoured, no overflow at any viewport.

**Next slice:** P4 pass 3 — Library. The measured defects are: slugs instead of skill names,
"0 sources" on all 84, nothing marked in-use, an absolute filesystem path in the chrome, and
two competing taxonomies (`group` vs `category`) with neither explained. The slot map now
makes "in use / available / unrouted" answerable for the first time.
