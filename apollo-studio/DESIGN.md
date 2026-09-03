---
name: Apollo Workbench
description: One resolved visual world for Apollo Studio — a dense, legible instrument for running and comparing design pipelines. The ground recedes and structure is carried by lift, colour is semantic, type never goes below 13px, and one skeleton carries every view.
version: 2.1
replaces: Apollo Orchestration Studio (v1, 2026-08-28)
amends: v2.0 — adds "The shell"; corrects the ground; decides the three carried-forward items
resolvedAtGate: Gate B, three comps scored blind — see metrics/comps/CRITIQUE.md
resolvedOn: 2026-09-03
colors:
  bg: "#050506"
  surface: "#101215"
  surface-2: "#17191D"
  surface-3: "#1F2227"
  line: "#24272D"
  line-strong: "#6B7280"
  fg: "#EEF0F3"
  fg-muted: "#A7AEB8"
  fg-dim: "#8B929C"
  fg-on-accent: "#050506"
  accent: "#5FA8F5"
  accent-hover: "#82BEF8"
  accent-quiet: "rgba(95,168,245,.14)"
  accent-line: "rgba(95,168,245,.45)"
  ok: "#57C98A"
  ok-quiet: "rgba(87,201,138,.14)"
  warn: "#E0A64B"
  warn-quiet: "rgba(224,166,75,.14)"
  danger: "#F0757F"
  danger-quiet: "rgba(240,117,127,.14)"
  focus: "#9BD1FF"
  bg-veil: "rgba(5,5,6,.92)"
typography:
  fontUi: "ui-sans-serif, -apple-system, 'Segoe UI Variable Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  fontMono: "ui-monospace, 'Cascadia Mono', 'SF Mono', Consolas, 'Liberation Mono', monospace"
  rootSize: "16px"
  label:
    fontSize: "0.8125rem"
    px: 13
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.06em"
    textTransform: "uppercase"
    # v2.1: this is the EYEBROW role - section and column headers only. Field labels,
    # captions, metadata and status use `meta` in sentence case with fg-dim.
    useFor: "section headers, column headers"
  meta:
    fontSize: "0.875rem"
    px: 14
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontSize: "1rem"
    px: 16
    fontWeight: 400
    lineHeight: 1.55
  title:
    fontSize: "1.125rem"
    px: 18
    fontWeight: 600
    lineHeight: 1.35
  heading:
    fontSize: "1.375rem"
    px: 22
    fontWeight: 600
    lineHeight: 1.3
  section:
    fontSize: "1.75rem"
    px: 28
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  display:
    fontSize: "2rem"
    px: 32
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
shell:
  bands: "52px chrome / auto transport / 1fr work / 32px status"
  rail: "240px"
  controlH: "2.25rem"
  labCol: "186px"
  labColNarrow: "120px"
  ctlCol: "320px"
  proseMax: "74ch"
  valueMax: "60ch"
  containers: [row, sec, map, log]
  gridConfigs: [is-wide, is-narrow]
spacing:
  space-1: "0.125rem"
  space-2: "0.25rem"
  space-3: "0.375rem"
  space-4: "0.5rem"
  space-5: "0.75rem"
  space-6: "1rem"
  space-7: "1.5rem"
  space-8: "2rem"
  space-9: "3rem"
  space-10: "4rem"
  inset-page: "clamp(1rem, 2.5vw, 2.5rem)"
  inset-block: "2rem"
rounded:
  radius-1: "2px"
  radius-2: "4px"
  radius-3: "8px"
  radius-round: "999px"
motion:
  dur-instant: "80ms"
  dur-fast: "120ms"
  dur-slow: "150ms"
  ease-out: "cubic-bezier(.2,.6,.35,1)"
  reducedMotion: "all durations collapse to 1ms; no transform is applied"
elevation:
  z-base: 0
  z-raised: 10
  z-sticky: 20
  z-dock: 30
  z-overlay: 40
  z-toast: 50
  shadow-float: "0 8px 24px rgba(0,0,0,.5)"
sizing:
  control-h: "2.25rem"
  control-h-narrow: "2.75rem"
  row-h: "2rem"
  icon: "1rem"
  icon-lg: "1.25rem"
  hit-min: "2.25rem"
  measure-prose: "68ch"
  canvas-max: "1560px"
components:
  button-primary:
    background: "{colors.accent}"
    color: "{colors.fg-on-accent}"
    rounded: "{rounded.radius-2}"
    minHeight: "{sizing.control-h}"
    padding: "0 {spacing.space-5}"
    fontSize: "{typography.body.fontSize}"
    fontWeight: 600
  button-secondary:
    background: "{colors.surface-2}"
    color: "{colors.fg}"
    border: "1px solid {colors.line-strong}"
    rounded: "{rounded.radius-2}"
    minHeight: "{sizing.control-h}"
    padding: "0 {spacing.space-5}"
  button-quiet:
    background: "transparent"
    color: "{colors.fg-muted}"
    rounded: "{rounded.radius-2}"
    minHeight: "{sizing.control-h}"
    padding: "0 {spacing.space-4}"
    hoverBackground: "{colors.surface-3}"
    hoverColor: "{colors.fg}"
  button-danger:
    background: "transparent"
    color: "{colors.danger}"
    border: "1px solid {colors.line-strong}"
    rounded: "{rounded.radius-2}"
    minHeight: "{sizing.control-h}"
    requires: "an undo affordance; see The Undo Rule"
  field:
    background: "{colors.bg}"
    color: "{colors.fg}"
    border: "1px solid {colors.line-strong}"
    rounded: "{rounded.radius-2}"
    minHeight: "{sizing.control-h}"
    padding: "0 {spacing.space-5}"
    fontSize: "{typography.body.fontSize}"
  panel:
    background: "{colors.surface}"
    border: "1px solid {colors.line}"
    rounded: "{rounded.radius-3}"
    padding: "{spacing.space-6}"
  row:
    minHeight: "{sizing.row-h}"
    borderBottom: "1px solid {colors.line}"
    padding: "0 {spacing.space-5}"
    interactiveMinHeight: "{sizing.control-h}"
  tag:
    background: "{colors.surface-3}"
    color: "{colors.fg-muted}"
    rounded: "{rounded.radius-1}"
    fontSize: "{typography.label.fontSize}"
    padding: "{spacing.space-1} {spacing.space-3}"
  nav-item:
    minHeight: "{sizing.control-h}"
    padding: "0 {spacing.space-5}"
    rounded: "{rounded.radius-2}"
    inactiveColor: "{colors.fg-muted}"
    activeBackground: "{colors.surface-3}"
    activeColor: "{colors.fg}"
    activeMarker: "2px {colors.accent} inset-block-end rule"
  switch:
    width: "2.75rem"
    height: "1.5rem"
    hitBox: "{sizing.hit-min}"
    offTrack: "{colors.surface-3}"
    onTrack: "{colors.accent-quiet}"
    onThumb: "{colors.accent}"
  focus-ring:
    outline: "2px solid {colors.focus}"
    outlineOffset: "2px"
---

# Apollo Workbench — the design specification (v2.1)

This file replaces `Apollo Orchestration Studio` (v1). It is read before any frontend work
in this repository, and it is the reason the previous interface looked the way it did:
v1 ratified `label: 9px`, `mono: 10px`, `body: 12px`, and every implementation of it was
faithful. **A specification that names an unusable size will get an unusable interface,
correctly built.** The measured evidence is in `LOADOUT-PLAN.md` sections 01-03 and the
numbers are re-measured on every run by `scripts/ui-metrics.mjs`.

**v2.1 amends v2.0 rather than replacing it.** The type scale, the token families, the
standing rules and the enforcement discipline were right and are kept. What v2.0 lacked was
a specification of the *shell* — nothing in it said what a view is — so every surface pass
invented one, and the result was seven top-level column systems that each passed T1-T11.
That section now exists, and v2.0's ground value is corrected.

**The "one direction, no alternatives" rule is void for the visual specification.** It was
adopted to save a selection ceremony and it removed Gate B, the gate that stops an unjudged
direction from becoming build truth. v2.1's direction was chosen from three comps scored
blind by a critic who did not author them (`metrics/comps/CRITIQUE.md`). No second world may
be introduced at a surface pass — that part stands.

## The world

**Apollo Studio is an instrument, not a stage.**

It is the panel you stand in front of to arm a pipeline, run it small, read what came back,
and change one variable. The interface's job is to make state legible at a glance and
changeable in one move. It has no story to tell about itself.

Three consequences, and everything else follows from them:

1. **The ground recedes, and structure is carried by lift.** A panel is a raised surface;
   a hairline sits on top of that and is never the only signal. v2.0 got this half right —
   it shipped a correct four-step ladder and then set the canvas to `#0B0C0E`, a mid-dark
   grey that competes with the panels resting on it. Measured against Linear, whose canvas
   is `#010102`: their first lift off the ground is a **15.5x** luminance step, ours was
   **2.0x**. Every contrast ratio passed and the composition still read flat, because
   ground that does not recede is not ground. The canvas is now `#050506`. See
   `REFERENCES.md` P1 — this is the one token that fixes it, not a repaint.
2. **Colour is state.** One accent hue carries action and selection. Everything else is
   green, amber or red and means exactly one thing. Nothing is coloured for mood.
3. **Density comes from geometry, never from type.** Rows are 32px, padding is 8-12px,
   rules are one pixel. The type does not shrink to make room. If a layout only fits at
   9px, the layout is wrong.

### What this world refuses

Background photography and generated atmospheres. Gradients used as decoration. Two type
families. Serif display type. Gold, cream, and any warm editorial register. Cards as the
default container — they waste their own edges. Hero sections. Motion that delays a state
change. Proportional numerals in a data context. Any size below 13px, for any reason,
including "it's just a label".

### What it replaces, precisely

| v1 shipped | v2 specifies |
|---|---|
| Two visual worlds — warm gold/cream/serif in Work, neon cyan/violet in Architecture | One world, one family, one accent |
| `label` 9px, `mono` 10px, `body` 12px, `title` 14px | 13px floor, 16px body, everything in rem |
| `display` clamp(30px, 4vw, 58px) — 6.4x the body | `display` 32px flat — 2x the body |
| Cyan action + violet gate + warm gold = 3 non-semantic hues | One accent; gates read as status, not as a hue of their own |
| 18 colour custom properties, 0 other tokens, 48 hex + 112 rgba literals | Complete token families; zero literals in rules |
| 25 radii, 10 ad hoc transitions, 14 z-index spellings, 7 `!important` | 4 radii, 3 durations, 6 named layers, no `!important` |
| 5 decorative WebP backgrounds across 3 views | No decorative imagery; portraits are content |

## The shell

This section did not exist in v2.0, and its absence is why the interface reads as eight
products. Nothing in the old specification said what a view *is*, so each surface pass
invented its own: seven independent top-level column systems and eight rail widths — 190,
220, 226, 248, 252, 300, 330, 340px. Every one of those layouts passes T1–T11 individually.
No threshold can see a missing skeleton; only a contact sheet can, which is why
`scripts/ui-shots.mjs` now runs on every check.

Resolved at Gate B from three scored comps (`metrics/comps/CRITIQUE.md`) — C2, at 85/100
against the shipping build's 62. The artifacts are `comp-c2-loadouts.html`,
`comp-c2-work.html` and `comp-c2-runs.html`; **when this prose and those files disagree, the
files are wrong and get fixed, because the prose was derived from them.**

### One skeleton. Four bands. Every view.

```
 52px   chrome        brand · destination tabs · the app-level action
 auto   transport     the locked pipeline, and the run (see the contract below)
  1fr   work          rail (240px) │ detail        ← only this band changes per view
 32px   status        mode · shortcuts. Non-interactive by rule.
```

A view supplies the contents of band 3 and nothing else. It may not add a band, change the
rail measure, or introduce a top-level grid of its own. The rail always holds **a list of
objects** — projects, loadouts, capabilities, runs. A surface with no list of objects is not
a view; see *Pipeline map*, below.

### Measures, defined once, used everywhere

| Token | Value | What it measures |
|---|---|---|
| `--rail` | 240px | every list rail in the product |
| `--control-h` | 2.25rem (36px) | every button, field, select, nav item, and clickable row |
| `--lab-col` | 186px | the label column of the wide parameter grid |
| `--lab-col-narrow` | 120px | the label column of the narrow grid |
| `--ctl-col` | 320px | the control column; a field is `--ctl-col` minus its own 12px gutter |

A field capped on the element rather than the column gave 320px in one section and 308px in
another — two measures, 12px apart, in the thing that exists to have one. The cap belongs to
the column.

**Prose measures.** A value or consequence cell is capped at **60ch**; running prose at
**74ch**. Without this the consequence column ran past 140 characters at 1920 — and 1920 is
what an all-day desktop user has. Stated here so it is not re-litigated per view.

### Exactly four containers

`.row`, `.sec`, `.map`, `.log`. **A fifth needs a written reason in this file.** Six list
shapes invented across six surface passes is what the last program shipped.

- **`.row`** — the one list item, everywhere. Grid `1fr auto`: name in column 1, an optional
  `small` beneath it, an optional `.tag` in column 2 spanning both rows.
  `grid-column` on the tag is **not optional** — with only `grid-row` set, auto-placement puts
  the tag in column 1 row 1 and pushes the name down a line, so the status renders *above* the
  thing it labels. That bug was in every comp, unnoticed through two scored reviews, until a
  render was actually looked at.
- **`.sec`** — the one panel: 1px `--line`, `--radius-3`, `--surface`, with an uppercase
  header bar. There is no second panel class. A variant is `.sec.delta`, not `.delta`.
- **`.map`** — the locked five-stage route. `repeat(5, 1fr)`, always exactly five, because
  five is the product's central invariant; a sixth cell for a budget block misstates it.
- **`.log`** — an event table. A log is a table; that is the written reason.

### The parameter grid — two configurations, named

The editable surface *is* the product, so it is one grid, and `display: contents` on the
field is what guarantees every section shares it rather than approximating it.

```
.grid.is-wide    --lab-col | --ctl-col | 1fr     label · control · consequence
.grid.is-narrow  --lab-col-narrow | 1fr          label · value   (read-only, or halved)
```

Two, with explicit modifier classes — not two selectors both called `.grid` in different
files, which is how three standalone comps ended up redefining `.grid`, `.ctl` and the
border mechanism under the same names. **Invisible across files; on merge the loser is
whichever is written second.** Six vocabularies wearing one name is worse than six
differently-named ones, because grep cannot find it.

The read-only cell is `.val`, never `.ctl`. `.ctl` holds a control. One border mechanism:
`.f:not(:last-child) > *` carries the rule.

### The transport contract — all three states

Band 2 is the only region that changes without the user acting, which is why it is allowed
to be the loudest thing on screen. It states the locked route always, and run state only
when run state is true.

| State | Height | Shows |
|---|---|---|
| **No run** | ~34px, header line only | `Olympus pipeline · locked`, the five names inline, `No run yet` |
| **In flight** | ~148px, the five-stage track | per-stage status, tokens, the live stage, budget used, gate state |
| **Completed** | ~34px, header line only | the route inline, `last run <id> · <n> ago` — **it collapses** |

**A finished run is history, and history lives in Runs.** The transport never shows stale
run state: keeping a completed run expanded would spend ~16% of every viewport on every view
displaying something that stopped being true, which is exactly the empty-state rot this
program is fixing. It expands when a run starts and collapses when it ends.

The 34px↔148px change is a layout change inside the ≤150ms motion budget, animating height
only. **It may never reflow an active chat stream**: on Work the stream is anchored to the
bottom, so the composer does not move under a typing hand.

### The accent rule

**Exactly one accent-filled action per view, and it is the action that acts on what the view
is showing.** Loadouts shows a loadout → `Run this loadout`. Work shows a chat → `Send`.
Runs shows a run → `Approve Gate C`.

A consequence to state, because an implementer will otherwise normalise it away: **the
global top-right button deliberately changes weight by view** — accent on Loadouts, bordered
on Work and Runs. That is the rule working, not an inconsistency.

`--accent` already carries selection, value-differs-from-default, and run-is-executing. It
does not also get to carry two primary actions on one screen.

### Monospace has a remit

`--font-mono` is for **machine identifiers and measured quantities**: skill ids, run ids,
token counts, timings, ratios, keyboard hints. It is a data type, not a second visual world
(the T6 exclusion says so).

It is **not** for UI status. `1 unsaved` is a sentence about the interface, not a machine
fact, and it is set in the UI face. Drift here is exactly the mechanism the one-world rule
exists to stop: mono spread from "machine state in the transport" to "any count, id, diff,
budget or route string anywhere" in a single comp round.

### The status band is non-interactive

32px, below the 36px floor, so nothing in it may become a control. If it ever needs one, the
band goes to 36px first. It carries mode, counts that are facts rather than actions, and
shortcut hints as text.

### Pipeline map is not a view

There is exactly one pipeline and it is locked, so a Pipeline map view has no list of objects
to put in the rail — it would be 240px of nothing, or filled with something invented for that
view alone. And band 2 already *is* the pipeline, so a full-width map in band 3 draws the
same locked route twice on one screen.

**A diagram of a fixed route that no run has traversed is an illustration; the same diagram
carrying a real run's trace is an instrument.** So the map lives in Runs: the rail lists runs,
the detail draws the route the selected run actually took — per-stage status including
`dormant · not required`, tokens, timings, and the gate row. `/api/events` already carries
every field this needs.

Two consequences, both deliberate:

1. **Runs' empty state draws `.map` with all five stages in `.skip`**, over the line "no run
   has taken this route yet." That gives the zero-data state a real component instead of a
   dead end, and gives "what is this pipeline?" its only home.
2. **"Which agent owns this decision?" is answered on Loadouts, not on a map** — every
   decision row names its owning agent under the label. The route-without-a-run question is
   answered where it is actually asked.

Eight views become seven.

### Oracle is an overlay, and overlays have rules

The dock uses `--rail` — it may not invent an eighth measure — the one `.sec` panel shape,
and it is **the only element in the product permitted the shadow token**. Depth everywhere
else comes from the ladder. It traps focus while open and closes on Escape, returning focus
to its trigger. If Oracle ever becomes a full view it takes the same four bands.

### Reference traceability

**Every rule in this file traces to a line in `REFERENCES.md`, or is marked `PRIOR` and
defended on its own.** v2.0 was 487 lines of prose authored against nothing external, and an
agent given no reference converges on its priors — which is what "AI-generated" describes.
The reference set is the anchor; this file is downstream of it.

A caution recorded at Gate B: `REFERENCES.md` weights its five principles equally, and on a
flat score the matrix selected the *most generic* candidate — it won four of five principles
because P1–P4 are hygiene every candidate shared, while P5 was the only principle that
changed what the product is. **Hygiene principles and position principles are not worth the
same, and the matrix does not yet say so.**

## Type

**One family.** `ui-sans-serif, -apple-system, 'Segoe UI Variable Text', 'Segoe UI', Roboto,
Helvetica, Arial, sans-serif`. There is no display face and no second family. Monospace
(`ui-monospace, 'Cascadia Mono', 'SF Mono', Consolas, monospace`) is not a second family —
it is a data type, used only for ids, paths, keys, hashes, raw values and run output.

**Everything is in `rem`, against a 16px root.** No `font-size` in the stylesheet may be
expressed in `px`. This is not a style preference: WCAG 1.4.4 requires text to survive a
200% text-only resize, and the v1 stylesheet's 179 `px` font-sizes made that impossible
product-wide. `scripts/ui-metrics.mjs` fails the build if a single declaration regresses.

### The scale

| Token | rem | px | Weight | Leading | Role |
|---|---:|---:|---:|---:|---|
| `--text-label` | 0.8125 | **13** | 600 | 1.35 | uppercase metadata, +0.06em tracking |
| `--text-meta` | 0.875 | 14 | 400 | 1.4 | secondary values, table cells, captions |
| `--text-body` | 1 | 16 | 400 | 1.55 | the default; prose, control labels, inputs |
| `--text-title` | 1.125 | 18 | 600 | 1.35 | the name of an object — a loadout, an agent, a run |
| `--text-heading` | 1.375 | 22 | 600 | 1.3 | panel and section headings |
| `--text-section` | 1.75 | 28 | 600 | 1.2 | the heading of a region within a view |
| `--text-display` | 2 | **32** | 600 | 1.15 | the view's own name, once per view, -0.02em |

**13px is the floor and the floor is absolute.** It is the smallest size at which the
system UI face keeps its counters legible on a dark ground at typical laptop pixel density.
Nothing — no label, no count, no unit, no timestamp, no keyboard hint — goes below it.

**The display stops at 32px.** v1's display was up to 58px against a 12px body: a 6.4x
jump that made every real piece of information look like a footnote. 32px against 16px is
2x, which is enough to orient and not enough to shout.

**Tabular numerals everywhere.** `font-variant-numeric: tabular-nums` on the root. Numbers
in this product are compared down columns; proportional digits make that impossible.

**Prose is capped at 68ch.** Operational prose only — this product has no marketing copy.

## Colour

The ground is a neutral, very slightly cool dark. v1's ground was blue enough to read as a
theme; v2's reads as unpainted metal, which is what lets one accent mean something.

### The surface ladder

| Token | Value | Role |
|---|---|---|
| `--bg` | `#050506` | the application ground; nothing sits behind it |
| `--surface` | `#101215` | panels, the default container |
| `--surface-2` | `#17191D` | nested content, secondary buttons, selected rows |
| `--surface-3` | `#1F2227` | hover, active navigation, tags |
| `--line` | `#24272D` | separators inside a group |
| `--line-strong` | `#6B7280` | the boundary of any control, field, or switch |

Hierarchy is built by moving down this ladder before any border, and by any border before
any shadow. There is exactly one shadow in the system.

**`--line` and `--line-strong` are not interchangeable.** `--line` is a 1.4:1 separator
and is only legal where the grouping is *also* carried by spacing and alignment; it may
never be the sole boundary of an interactive element. `--line-strong` clears 3:1 against
*every* surface in the ladder — 4.4:1 on `--bg`, 3.4:1 on `--surface-3` — not only against
the ground, because a field, a secondary button or a switch track sits on a raised surface
as often as on `--bg`. It is required wherever WCAG 1.4.11 applies: the edge of a field, a
secondary button, a switch track, a selectable cell. `scripts/ui-metrics.mjs` measures the
rendered border of every control against the surface behind it as part of T4.

### Foreground

| Token | Value | On `--bg` | On `--surface-3` | Role |
|---|---|---:|---:|---|
| `--fg` | `#EEF0F3` | 16.4:1 | 11.9:1 | primary content |
| `--fg-muted` | `#A7AEB8` | 8.9:1 | 6.9:1 | labels, secondary values, descriptions |
| `--fg-dim` | `#8B929C` | 6.2:1 | 4.9:1 | tertiary metadata, counts, dormant context |

All three pass AA for normal text on every surface in the ladder. That is the point of
having exactly three: v1 had a `dim` that failed against half the surfaces it was used on,
which is where a large share of the 165 measured contrast failures came from.

### One accent

`--accent: #5FA8F5`. It means **action or active selection** and nothing else: primary
buttons, the current navigation item's marker, the focused field's edge, the selected row,
the active connection in the pipeline map. `--accent-hover: #82BEF8` is its hover state and
keeps `--fg-on-accent` at 10:1.

**An active control is a surface step plus an accent marker, never an inverted slab.**
The active navigation item, the active switcher tab and the selected row all read as
`--surface-3` with a 2px `--accent` inset rule. A white or cream fill puts the brightest
value in the interface on a control that is merely *current*, which is what v1 did and why
the eye went to the navigation before it went to the work.

There is no second non-semantic hue. v1's violet gate identity is withdrawn — a gate is a
*state*, so it reads with the status palette (pending amber, passed green, blocked red)
like every other state in the product. This is the T7 threshold: at most one non-semantic
hue, and one is what we are spending.

### Status, and only status

| Token | Value | Means |
|---|---|---|
| `--ok` | `#57C98A` | live, complete, passed, detected, available |
| `--warn` | `#E0A64B` | demo, pending, awaiting approval, degraded |
| `--danger` | `#F0757F` | failed, error, destructive, unavailable |

Each has a `-quiet` companion at 14% for fills. **If a colour cannot be named in a legend,
it does not appear.** No hue may be borrowed for variety, emphasis, or category.

### Focus

`--focus: #9BD1FF`, a 2px outline at 2px offset, on every interactive element without
exception, and never removed. It is 12:1 against the ground and 9.4:1 against
`--surface-3`, so it is visible on every surface a control can sit on.

## Density, spacing and rules

**Position on density: dense, and legible, at the same time.** These are only in tension
if density is bought with type size. It is bought here with geometry.

- Rows are `--row-h` (32px) when the row itself is not the control.
- Any row, cell, or item that is clickable is at least `--control-h` (36px) tall and 36px
  wide, on desktop; at least 44px below 900px. This is the PRODUCT.md commitment, and
  v1 missed it in 289 places.
- Horizontal padding inside dense structures is `--space-4` to `--space-5` (8-12px).
- Vertical rhythm between groups is `--space-6` (16px); between regions, `--space-8` (32px).

### The spacing scale

`--space-1` 2px · `--space-2` 4 · `--space-3` 6 · `--space-4` 8 · `--space-5` 12 ·
`--space-6` 16 · `--space-7` 24 · `--space-8` 32 · `--space-9` 48 · `--space-10` 64.

Page inset is `--inset-page: clamp(1rem, 2.5vw, 2.5rem)`; the canvas is capped at 1560px.
No spacing value may be written as a literal in a rule.

### Rules

A rule is 1px, `--line`, and it is the primary grouping device. Where v1 would have made
each item a card with a border on four sides, v2 draws one rule between items and aligns
their columns. Aligned columns and a shared baseline do more grouping work than a border,
and cost nothing.

## Shape

Four radii, and no others:

| Token | Value | Applies to |
|---|---|---|
| `--radius-1` | 2px | tags, dots of information, inline markers |
| `--radius-2` | 4px | every control — buttons, fields, selects, nav items |
| `--radius-3` | 8px | panels, canvases, floating layers |
| `--radius-round` | 999px | switch thumbs and status dots only, where the shape encodes a binary or a point |

Nested radii step down: a control inside a panel uses a smaller radius than the panel.
v1 shipped 25 distinct radii, which is not a shape language, it is an absence of one.

## Motion

**Position: motion is feedback, never performance.** It confirms a state change that has
already happened. It never introduces content, never staggers a page in, never runs on
scroll, and never delays a response.

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80ms | a state flip — toggle, checkbox, selection |
| `--dur-fast` | 120ms | hover, focus, colour and border changes |
| `--dur-slow` | 150ms | a disclosure opening, a panel entering |

`--ease-out: cubic-bezier(.2,.6,.35,1)`. **Nothing in this product animates for longer
than 150ms.** Only `opacity`, `background-color`, `border-color`, `color`, and `transform`
limited to 4px of translation may be animated; never `width`, `height`, `top` or `left`.

Under `prefers-reduced-motion: reduce`, all three durations become 1ms and no transform is
applied. GSAP stays in the product for state feedback only, inside these bounds; it is not
a licence for choreography.

## Elevation

Six named layers, and one shadow.

`--z-base` 0 · `--z-raised` 10 · `--z-sticky` 20 · `--z-dock` 30 · `--z-overlay` 40 ·
`--z-toast` 50. No `z-index` may be written as a number in a rule.

`--shadow-float: 0 8px 24px rgba(0,0,0,.5)` is the only shadow in the system, and it is
only for a layer that genuinely floats over another: the Oracle dock, an open trace, a
menu, a toast. Panels, rows, registries and canvases are flat. An `inset` box-shadow is not
a shadow in this sense — it is how a selection or state marker is drawn, and it stays.

`--bg-veil: rgba(11,12,14,.92)` is the only translucency in the system: a sticky or
floating surface reading over content that scrolls beneath it. It is a veil over `--bg`,
not a colour, and it is never used as a text colour or as a panel fill.

**Named layers are for the application; ordinals are for a component.** `z-index` uses the
named tokens for anything that stacks against another part of the application. Ordering
*within* one component's own stacking context may use `-1`, `0`, `1`, `2` or `3` and may
not exceed `3`; a component that needs a fourth level is describing an application layer
and should say so.

## Media

**No decorative imagery, anywhere.** No background photographs, no generated atmospheres,
no ambient gradients. v1 used five of them across three views. Ornament is what an
interface reaches for when its type is too weak to carry authority; the type is now strong
enough, so the appetite should not return.

Agent portraits are **content**, not ornament — they identify an agent. They render in a
reserved 1:1 box that holds its space before the image loads, with a CSS-only monogram
fallback in `--surface-2` and `--fg-muted` that is a complete substitute, not a placeholder.
An image that fails to load must never cause a layout shift or an overlapping alt string.

Files under `public/media/` are protected and are not deleted. They simply stop being
referenced.

## The three that were carried forward

The previous program ended with three items "carried forward — each needs a decision, not
another loop slice." They were carried for the whole program and never decided, and all three
are taste items. **Three deferred taste decisions is why the interface reads as unresolved.**
They are decided here.

### 1. The agent portraits — decided: crop, do not desaturate

Two portraits ship at full-saturation neon and are held back in CSS by `filter: saturate(.45)`.
A stylesheet apologising for an asset is not a treatment. Under the shell, Agents is a view
like any other: the rail lists agents, the detail shows one. **The portrait becomes a 40px
identity mark in the row and a 96px block in the detail, cropped to the face**, and the
`saturate()` is deleted. At that size the neon is a colour accent rather than a second
visual temperature, and the crop is the fix that the filter was standing in for.
Production of the crops is asset work; the treatment is settled.

### 2. The 314 off-scale spacing literals — decided: they go with the layout

Snapping 3, 5, 7, 9, 10, 11, 13, 14, 15, 17, 18, 20 and 22px to the scale "changes the
spacing rhythm," which was true while the layouts stayed. **Every view is being rebuilt to
the shell in V4, so the literals leave with the layouts that needed them.** The ratchet
target is **0 at the end of V4**, not "never rises". A literal surviving a view's rebuild is
a defect in that rebuild, not a rhythm to preserve.

### 3. The uppercase-tracked label register — decided: it is the eyebrow, not the default

`--text-label` at 13px/600/+0.06em/uppercase is correct, and it was applied so widely it
became the product's default secondary register. `REFERENCES.md` records Linear's evidence:
positive tracking belongs on eyebrows, and display type tracks *negative*. **Uppercase +
tracking is reserved for section and column headers.** Field labels, captions, metadata and
status text use the UI face at `--text-meta` with `--fg-dim` — sentence case, no tracking.
This is what the comps do and it is the single largest reason they read quieter than the
build they replace.

## Standing rules

Each of these names a measured defect in v1 and is checked on every run.

- **The Floor Rule.** No rendered text below 13px. (T1)
- **The Unit Rule.** Every `font-size` in `rem`. (T3)
- **The Contrast Rule.** Every text/background pair meets AA — 4.5:1 normal, 3:1 for
  >=24px or >=18.66px bold. Boundaries that carry meaning meet 3:1. (T4)
- **The Target Rule.** Every interactive element is at least 36px in both dimensions on
  desktop, 44px below 900px — including inside a collapsed disclosure. (T5)
- **The One-World Rule.** One type family, one accent. A surface pass may not introduce
  a second visual register "just here". (T6, T7)
- **The Token Rule.** No colour, spacing, radius, duration or z-index literal appears in a
  rule. If a value is worth writing twice it is worth naming once. (T8)
- **The Empty-State Rule.** Every view states what it holds when it holds nothing, and
  offers exactly one primary action to fill it. An empty view with no action is a dead end,
  and v1 had six of them. (T9)
- **The No-Ornament Rule.** No image is present without an informational role. (T10)
- **The Undo Rule.** Every destructive action is reversible, and says so at the moment it
  is taken. Undo is offered inline for at least the duration of the following interaction;
  a confirmation dialog is not an undo and does not satisfy this rule. (T11)
- **The Skeleton Rule.** Every view is the four bands and supplies only band 3. A view may
  not add a band, change `--rail`, or introduce a top-level grid of its own. (Contact sheet)
- **The Vocabulary Rule.** Four containers — `.row`, `.sec`, `.map`, `.log` — and two named
  grid configurations. A fifth container or a third configuration needs a written reason in
  this file. Two selectors of the same name meaning different things in different files is
  the specific failure this rule exists to prevent.
- **The One-Primary Rule.** Exactly one accent-filled action per view, and it is the action
  that acts on what the view is showing.
- **The Specificity Rule.** No `!important`, with exactly one exception: the
  `prefers-reduced-motion` reset, which must beat author styles written by script and
  cannot do so on specificity. Everywhere else, a rule that needs one is telling you the
  cascade is wrong, and the cascade is what gets fixed. v1 had seven; five of them competed
  with nothing at all.

## How this file is enforced

Three instruments, and they measure different things.

- **`scripts/ui-metrics.mjs`** — what the interface LOOKS like. Boots the app, walks every
  view at 390x844, 820x1180, 1280x800, 1440x900 and 1920x1080, reads computed styles rather
  than markup, and emits T1-T11. The 390px column is the narrow-target commitment in
  `PRODUCT.md`; nothing may overflow or clip there either.
- **`scripts/ui-behaviour.mjs`** — whether it DOES what it says. Emits B1-B8: every control
  wired, every click producing an observable change, every label's stated postcondition true,
  every loadout decision reaching the request, no orphan stores, no unbacked runtime claim,
  runs that survive a reload, a clean console under the sweep. It exists because all eleven
  T thresholds passed while the Design DNA panel rendered an avoid-list headed "Never, in any
  run" that no run enforced. **An interface can be perfectly legible and still be lying.**
- **`scripts/ui-shots.mjs`** — what it looks like *together*. Writes every view and a contact
  sheet of all of them on one image. The previous program consulted screenshots four times in
  roughly fifteen slices, always to chase a named defect, never to judge a composition; the
  missing skeleton was invisible to every threshold and obvious on the first sheet.

`npm run check` runs all three and fails on any regression in the first two. The
markup-pattern detector that reported this interface clean while 165 text nodes failed
contrast is not evidence and is not accepted as evidence.

**The thresholds are the floor, not the ambition.** T1-T11 passing means the interface is
legible, predictable and consistent. B1-B8 passing means it is honest — that it does what it
says. Neither means it is *good*, and no measurement in this file will ever tell you that it
is. That judgement is made at a gate, by a critic who did not author the thing, against a
named reference set — which is the mechanism v2.0 deleted and v2.1 restores.
