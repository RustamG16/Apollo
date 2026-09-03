---
name: Apollo Workbench
description: One resolved visual world for Apollo Studio — a dense, legible instrument for running and comparing design pipelines. Structure is drawn, colour is semantic, type never goes below 13px.
version: 2
replaces: Apollo Orchestration Studio (v1, 2026-08-28)
resolvedOn: 2026-09-03
colors:
  bg: "#0B0C0E"
  surface: "#131518"
  surface-2: "#1A1D21"
  surface-3: "#22262B"
  line: "#2A2E34"
  line-strong: "#5E646E"
  fg: "#EEF0F3"
  fg-muted: "#A7AEB8"
  fg-dim: "#8B929C"
  fg-on-accent: "#0B0C0E"
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
  bg-veil: "rgba(11,12,14,.92)"
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

# Apollo Workbench — the design specification

This file replaces `Apollo Orchestration Studio` (v1). It is read before any frontend work
in this repository, and it is the reason the previous interface looked the way it did:
v1 ratified `label: 9px`, `mono: 10px`, `body: 12px`, and every implementation of it was
faithful. **A specification that names an unusable size will get an unusable interface,
correctly built.** The measured evidence is in `LOADOUT-PLAN.md` sections 01-03 and the
numbers are re-measured on every run by `scripts/ui-metrics.mjs`.

One direction was resolved at intake and is held for the whole program. There are no
alternatives to compare, and no second world may be introduced at a surface pass.

## The world

**Apollo Studio is an instrument, not a stage.**

It is the panel you stand in front of to arm a pipeline, run it small, read what came back,
and change one variable. The interface's job is to make state legible at a glance and
changeable in one move. It has no story to tell about itself.

Three consequences, and everything else follows from them:

1. **Structure is drawn, not implied.** Hairlines, aligned columns, explicit grouping.
   Where v1 reached for a floating card, v2 uses a rule and a column.
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
| `--bg` | `#0B0C0E` | the application ground; nothing sits behind it |
| `--surface` | `#131518` | panels, the default container |
| `--surface-2` | `#1A1D21` | nested content, secondary buttons, selected rows |
| `--surface-3` | `#22262B` | hover, active navigation, tags |
| `--line` | `#2A2E34` | separators inside a group |
| `--line-strong` | `#5E646E` | the boundary of any control, field, or switch |

Hierarchy is built by moving down this ladder before any border, and by any border before
any shadow. There is exactly one shadow in the system.

**`--line` and `--line-strong` are not interchangeable.** `--line` is a 1.4:1 separator
and is only legal where the grouping is *also* carried by spacing and alignment; it may
never be the sole boundary of an interactive element. `--line-strong` is 3.3:1 against the
ground and is required wherever WCAG 1.4.11 applies — the edge of a field, a secondary
button, a switch track, a selectable cell.

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
- **The Specificity Rule.** No `!important`, with exactly one exception: the
  `prefers-reduced-motion` reset, which must beat author styles written by script and
  cannot do so on specificity. Everywhere else, a rule that needs one is telling you the
  cascade is wrong, and the cascade is what gets fixed. v1 had seven; five of them competed
  with nothing at all.

## How this file is enforced

`scripts/ui-metrics.mjs` boots the app, walks all eight views at 1280x800, 1440x900 and
1920x1080, reads computed styles rather than markup, and emits T1-T11. `npm run check`
fails on any regression. The markup-pattern detector that reported this interface clean
while 165 text nodes failed contrast is not evidence and is not accepted as evidence.

**The thresholds are the floor, not the ambition.** Passing all eleven means the interface
is legible, predictable and consistent. It does not yet mean it is good, and no measurement
in this file will ever tell you that it is.
