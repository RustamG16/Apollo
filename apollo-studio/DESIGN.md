---
name: Apollo Orchestration Studio
description: A calm dark control plane for visible orchestration, explicit ownership, and operational state.
colors:
  ink: "#07090e"
  surface: "#0d1119"
  surface-raised: "#121824"
  surface-soft: "#171e2b"
  line: "#293244"
  line-strong: "#3a465d"
  text: "#f5f7fb"
  muted: "#9ca8ba"
  dim: "#7f8ca0"
  cyan-action: "#4cc9ff"
  cyan-soft: "rgba(76, 201, 255, .13)"
  violet-gate: "#a982ff"
  violet-soft: "rgba(169, 130, 255, .13)"
  status-green: "#5bddac"
  status-amber: "#f4be62"
  status-red: "#ff7c91"
  focus: "#92dcff"
typography:
  display:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(30px, 4vw, 58px)"
    fontWeight: 570
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  title:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "9px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  tag: "5px"
  small: "8px"
  field: "9px"
  control: "10px"
  medium: "12px"
  large: "14px"
  canvas: "16px"
  circle: "50%"
spacing:
  xs: "5px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  page-inline: "clamp(18px, 3vw, 44px)"
  page-block: "clamp(28px, 4vw, 54px)"
components:
  button-primary:
    backgroundColor: "{colors.cyan-action}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 15px"
  button-primary-hover:
    backgroundColor: "#78d7ff"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 15px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.small}"
    padding: "7px 9px"
  field-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.field}"
    padding: "8px 10px"
    height: "38px"
  nav-active:
    backgroundColor: "{colors.text}"
    textColor: "{colors.ink}"
    rounded: "{rounded.small}"
    padding: "8px 12px"
  workflow-node:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.medium}"
    padding: "13px"
    height: "94px"
  workflow-gate:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.violet-gate}"
    rounded: "{rounded.medium}"
    padding: "13px"
    height: "94px"
---

# Design System: Apollo Orchestration Studio

## Overview

**Creative North Star: "The Visible Control Plane"**

Apollo Studio is a calm, legible dark mission-control workspace. The interface makes routing, phase, runtime state, approval gates, and agent ownership visible through compact metadata, explicit labels, connected workflow nodes, and persistent operational feedback rather than decorative spectacle.

Near-black tonal surfaces create hierarchy without fragmenting the workspace. Restrained cyan carries action and forward flow, violet distinguishes gates and approval-related feedback, and green, amber, and red report operational state. Large editorial page titles orient the user at view level; dense working areas return to compact sans-serif and monospace scales so systems, agents, inventories, budgets, and traces remain scannable.

**Key Characteristics:**

- Near-black tonal surfaces separated by quiet blue-gray hairlines
- Cyan reserved for action, selection, data flow, and active structure
- Violet reserved for gates, approval feedback, and the user side of Oracle
- Green, amber, and red used semantically for operational state
- Large view titles paired with compact metadata and tabular numbers
- Explicit phase, agent, inventory, budget, and runtime ownership
- Responsive workbenches that linearize without hiding system state

## Colors

The palette is a cool near-black control plane with restrained chromatic signals whose meaning stays stable across views.

### Primary

- **Signal Cyan** (`colors.cyan-action`): Primary actions, workflow connections, active structural borders, paths, phase labels, switches, and knowledge selection.
- **Control Ink** (`colors.ink`): The application ground, scrollbar track, inverse button text, and deepest contrast anchor.

### Secondary

- **Gate Violet** (`colors.violet-gate`): Approval gates, feedback connectors, user-authored Oracle messages, and host-specific event identity.
- **Operational Green** (`colors.status-green`): Live, completed, detected, usable, and active-system states.
- **Operational Amber** (`colors.status-amber`): Demo, connecting, pending, token, and approval-attention states.
- **Operational Red** (`colors.status-red`): Errors, failures, destructive actions, and form failure feedback.

### Neutral

- **Base Surface** (`colors.surface`): Default panels, cards, fields, workflow canvas, and result containers.
- **Raised Surface** (`colors.surface-raised`): Floating trace details and elevated sublayers.
- **Soft Surface** (`colors.surface-soft`): Hover, selected-list, message, tag, and nested-control layers.
- **Quiet Line** (`colors.line`): Default dividers and panel boundaries.
- **Strong Line** (`colors.line-strong`): Emphasized borders, sticky run-bar edges, and inactive switch structure.
- **Primary Text** (`colors.text`): High-priority labels and content.
- **Muted Text** (`colors.muted`): Descriptions and secondary values.
- **Dim Text** (`colors.dim`): Tertiary metadata, counts, source labels, and dormant context.

**The Semantic Signal Rule.** Cyan means action or active flow, violet means gate or approval context, and green/amber/red report operational state; do not exchange these roles for variety.

**The Tonal Surface Rule.** Build hierarchy from the established Ink, Surface, Raised, and Soft ladder before adding borders, shadows, or new colors.

## Typography

**Display Font:** UI sans-serif (with platform system fallbacks)  
**Body Font:** UI sans-serif (with platform system fallbacks)  
**Label/Mono Font:** UI monospace (with SFMono-Regular and Consolas fallbacks) for paths, outputs, and technical evidence

**Character:** The system sans serif is neutral and operational at small sizes, but expands into a large, tightly tracked view title for clear orientation. Monospace is evidence-specific, not a general stylistic layer.

### Hierarchy

- **Display** (`typography.display`): View-level titles, capped at 760px and reduced to 34px on mobile.
- **Headline** (`typography.headline`): Panel and section headings.
- **Title** (`typography.title`): Brand, output, card, and result identities.
- **Body** (`typography.body`): Explanations, runtime notes, and operational prose, usually constrained to approximately 68 characters per line.
- **Label** (`typography.label`): Phases, states, counts, sources, and other metadata, commonly uppercase with tracked letters.
- **Mono** (`typography.mono`): Filesystem paths, saved output excerpts, run bodies, and precise technical values.

**The Orientation-Then-Operation Rule.** Use the large display scale once to name the current view, then return to compact operational type inside the workbench.

**The Evidence Mono Rule.** Reserve monospace for machine-readable output, paths, and trace evidence; ordinary interface copy remains sans-serif.

## Layout

The application is centered in a 1560px maximum canvas with fluid page insets (`spacing.page-inline`) and fluid top spacing (`spacing.page-block`). A sticky 72px top bar balances brand, centered view navigation, and runtime state. View headers pair a large title block with one clear action or runtime note, followed by purpose-built grids for workflow, systems, knowledge, Oracle, comparisons, or run evidence.

At 1180px, the top bar moves navigation onto a second row, multi-column workbenches simplify, and horizontally complex workflow or knowledge views preserve their structure through controlled overflow. At 760px, the top bar becomes static, navigation scrolls horizontally, minimum interactive height becomes 44px, primary grids linearize, connectors disappear, and the workflow becomes an explicit ordered stack. No operational state is removed merely to fit a smaller viewport.

**The State Before Density Rule.** Responsive simplification may stack or scroll dense structures, but it must keep active selection, phase, ownership, runtime status, and available actions visible.

## Elevation & Depth

Depth is restrained and structural. Most lists and workbenches remain flat, separated by tonal surfaces and one-pixel borders. The shared ambient shadow (`0 18px 50px rgba(0,0,0,.28)`) marks major focused work surfaces such as the workflow canvas, Oracle, inline editors, and the sticky run bar. Workflow nodes use a tighter local shadow, while open traces use the shared or a closely related floating shadow. The top bar and sticky run bar use translucent dark fills with blur to remain legible over scrolling content.

**The Bounded Lift Rule.** Apply shadow to a focused canvas, sticky command surface, or floating detail; keep ordinary rows and registries flat.

## Shapes

Apollo uses gently rounded rectangles with a clear size hierarchy: 8–10px for controls and compact selections, 12px for workflow nodes and working cards, 14px for elevated panels, and 16px for the primary workflow canvas. Five-pixel skill tags are deliberately tighter. Dots and switch thumbs are circular because they encode state or binary position, while the cyan brand mark uses a clipped octagonal silhouette.

**The Nested Radius Rule.** Smaller controls use smaller corners than the panel that contains them; do not give every layer the same radius.

## Components

### Buttons

- **Primary:** Signal Cyan fill with Control Ink text, 10px corners, 11px by 15px padding, and a restrained cyan ambient shadow.
- **Hover / Focus:** Hover brightens the cyan fill; keyboard focus uses a 2px Focus Blue outline with a 3px offset.
- **Quiet:** Transparent with Muted Text, becoming a Soft Surface with Primary Text on hover.
- **Danger:** Transparent Operational Red text with a low-opacity red hover fill.
- **Disabled:** Remains visible at 0.45 opacity; running actions use a wait cursor at 0.5 opacity.

### Chips

- **Style:** Skill and plan chips use Primary Text softened toward blue-gray on a Soft Surface, with tight 5px corners and 4px by 6px padding.
- **State:** Status labels do not become generic chips; they retain semantic text color and, where implemented, a small glowing dot.

### Cards / Containers

- **Corner Style:** Compact work cards use 10–12px corners; elevated panels use 14px; the workflow canvas uses 16px.
- **Background:** Base Surface is the default; Raised and Soft surfaces identify nested or selected content.
- **Shadow Strategy:** Flat rows by default, bounded lift for canvases, sticky command surfaces, and floating traces.
- **Border:** One-pixel Quiet Line by default, Strong Line for emphasized boundaries, and semantic color for active workflow or gate states.
- **Internal Padding:** Dense rows use roughly 9–14px; independent cards and editors use 16–20px.

### Inputs / Fields

- **Style:** Base Surface fill, Quiet Line border, 9px corners, Primary Text, and a 38px minimum height for inputs and selects.
- **Focus:** A 2px Focus Blue outline with a 3px offset is shared across controls and summaries.
- **Error / Disabled:** Error feedback uses Operational Red. Disabled controls remain in layout with reduced opacity and a not-allowed cursor.

### Navigation

The primary navigation is a compact Base Surface capsule with a Quiet Line border and nested 8px items. Inactive items use Muted Text, hover moves to Soft Surface and Primary Text, and the active item inverts to Primary Text as its fill with Control Ink text. On mobile the same items remain in a horizontally scrolling row rather than collapsing into an undiscoverable menu.

### Toggle Switch

The switch is 36px by 20px with a 12px track and circular 14px thumb. Off uses Strong Line territory and Muted Text; on uses translucent cyan with a Signal Cyan thumb translated 16px. The hidden native checkbox retains keyboard focus through a Focus Blue outline on the track.

### Workflow Node

Workflow nodes are 12px rounded, gradient-toned surfaces with Strong Line borders and a tight local shadow. Hover lifts by 2px and shifts the border to Signal Cyan; pressed nodes add a cyan ring and stronger shadow. Phase labels use Signal Cyan, gate variants use Gate Violet and a violet border, and the always-active director exposes its status in Operational Green.

### Runtime and Run Status

Runtime state pairs compact text with a 7px glowing dot. Green denotes live/completed/detected, amber denotes demo/pending, red denotes error/failed, and cyan denotes activity. These colors remain semantic in history, integrations, tools, and host events.

## Do's and Don'ts

### Do:

- **Do** expose active system, phase, agent owner, inventory, budget, approval, runtime, and run state close to the object they describe.
- **Do** build hierarchy from the four near-black surface levels and quiet blue-gray lines before introducing elevation.
- **Do** preserve cyan for action and active flow, violet for gates and approval context, and status colors for operational truth.
- **Do** use compact tracked labels and tabular numbers for metadata while reserving the large title scale for view orientation.
- **Do** linearize dense workbenches on mobile while retaining selection, state, and action visibility.

### Don't:

- **Don't** use semantic accent colors as interchangeable decoration.
- **Don't** add large gradients, bright ambient backgrounds, or ornamental illustration that competes with system state.
- **Don't** turn every row into a floating card or apply the shared shadow to ordinary registry content.
- **Don't** hide complex workflow state behind hover-only behavior or remove it at responsive breakpoints.
- **Don't** use monospace for general prose or enlarge metadata until the information hierarchy flattens.
