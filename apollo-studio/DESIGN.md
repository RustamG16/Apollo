---
name: Oracle Continuum
description: A warm task-first operations shell containing exact, evidence-led technical canvases only where system complexity needs explanation.
northStar: Oracle Continuum
version: 3.0
resolvedAtGate: approved-in-plan
resolvedOn: 2026-09-15
doctrine:
  name: apollo-instrument
  displayMax: 28px
  variance: The continuous UI contract supplies the warm-paper shell and persistent Oracle dock; it does not alter the doctrine's compact operational hierarchy.
colors:
  rail: "#050506"
  workspace: "#F7F7F2"
  ink: "#050506"
  inkMuted: "#666862"
  line: "#D7D7D1"
  panel: "#FFFFFF"
  technicalCanvas: "#050506"
  active: "#57C98A"
  action: "#5FA8F5"
  pending: "#E0A64B"
  error: "#F0757F"
  focus: "#5FA8F5"
typography:
  fontUi: "Arial Narrow, Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  fontMono: "ui-monospace, Cascadia Mono, SFMono-Regular, Consolas, monospace"
  rootSize: 16px
  micro: { fontSize: 0.75rem, fontWeight: 600, lineHeight: 1.333, letterSpacing: 0.06em }
  label: { fontSize: 0.875rem, fontWeight: 650, lineHeight: 1.286, letterSpacing: 0.04em }
  body: { fontSize: 1rem, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  title: { fontSize: 1.25rem, fontWeight: 650, lineHeight: 1.2, letterSpacing: -0.01em }
  section: { fontSize: 1.5rem, fontWeight: 700, lineHeight: 1.167, letterSpacing: -0.02em }
  display: { fontSize: 1.75rem, fontWeight: 750, lineHeight: 1.071, letterSpacing: -0.03em }
spacing:
  scale: [2px, 4px, 6px, 8px, 12px, 16px, 24px, 32px, 48px]
  page: "clamp(16px, 2.5vw, 40px)"
  section: 24px
  controlGap: 8px
rounded:
  panel: 8px
  control: 6px
  chip: 999px
motion:
  instant: 1ms
  feedback: 120ms
  change: 160ms
  trace: 240ms
  easeOut: "cubic-bezier(0.2, 0.65, 0.3, 1)"
  reducedMotion: "all nonessential animation resolves immediately; no automatic graph motion or panning"
breakpoints:
  mobile: "0-819px"
  shell: "820px and above"
  desktop: "1280px and above"
  wide: "1440px and above"
shell:
  rail: 210px
  routeStrip: 44px
  oracleDockMax: 760px
  contentMax: 1440px
  mobileControlMin: 44px
  desktopControlMin: 40px
components:
  primaryAction: { background: "#5FA8F5", foreground: "#050506", contrast: "8.16:1", minHeight: 40px }
  activeState: { background: "#57C98A", foreground: "#050506", contrast: "9.82:1" }
  pendingState: { background: "#E0A64B", foreground: "#050506", contrast: "9.44:1" }
  errorState: { background: "#F0757F", foreground: "#050506", contrast: "7.33:1" }
  paperText: { background: "#F7F7F2", foreground: "#050506", contrast: "18.96:1" }
---

# Oracle Continuum — design specification

## Visual World

Apollo is an operations desk, not a spectacle. The user works on warm paper framed by a near-black global rail. A faint grid implies rigor without competing with content. Only Knowledge Connections and System Node Control open a near-black inner canvas, where thin luminous paths disclose evidence and recorded causal flow. The shell never changes, and a route never acquires a mood-specific color system.

The resolved direction takes the Instrument doctrine's visible structure, semantic color, one-family hierarchy, and feedback-only motion. The doctrine's maximum display size is 28px; the committed display token is exactly 28px, so no exception is needed.

## Shell and screen grammar

- The left rail is fixed at 210px on desktop and lists Home, Projects, Plan, Playground, Results, Knowledge, System, Agents, Settings in that order. Exactly one item is emerald.
- Apollo identity remains fixed in the rail; the environment badge remains fixed in the rail/route strip and names local, demo, live, unverified, unavailable, or unknown in text. A configured credential is never represented as verified live.
- The fixed route/status strip names `Projects / {project} / {view}`, Oracle availability, environment status, current stage, and next mandatory action.
- Paper workspace begins with a plain-language answer: what is happening and what to do next. Detail follows in aligned panels, rows, and evidence lists—not a grid of generic cards.
- The bottom-center Oracle composer is 760px maximum width and shared geometry on every primary view. It exposes removable context tokens and reserves workspace bottom padding.
- Knowledge and System use the technical canvas only inside the paper workspace. A graph is accompanied by a synchronized list and never replaces ordinary navigation.
- At less than 820px the rail becomes a drawer. Apollo identity and the textual environment badge move into the fixed route strip; route, stage, next action, and Oracle composer remain visible; graphs begin in List mode.

## Type

One UI stack supports headings and body; mono is confined to IDs, timestamps, evidence, routes, budget, and machine state. Headings may use `Arial Narrow` when installed but retain the same system stack when it is not. The compact 12/14/16/20/24/28px ramp prevents the product from becoming a marketing hero while leaving 16px body text and 44px narrow controls readable. Tabular figures are required for numeric state.

## Colour

The semantic state contract is immutable: emerald is active/verified/complete/approved; blue is action/selection/data flow; amber is pending/review/approval-required; coral is error/blocker/destructive. These foreground/background pairings are authorized: ink on paper 18.96:1; ink on emerald 9.82:1; ink on blue 8.16:1; ink on amber 9.44:1; ink on coral 7.33:1; muted ink `#666862` on paper 5.25:1. Do not use colored text alone to communicate status.

## Media

The supplied numbered images are design evidence, not decorative runtime backgrounds. Real project thumbnails, artifacts, and evidence previews are content and retain their source lineage. Missing media renders a labelled neutral panel with filename/status, never stock art or an invented preview. The technical grid is CSS material; no generated portraits, particles, or video are needed for this release.

## Motion

Use CSS for focus, selection, drawers, tokens, and simple state transitions. Existing GSAP may sequence a recorded System edge or a Playground delta only when a causal relationship is visible; it must stop offscreen and under reduced motion. Routes, approvals, drafts, failures, and pending states are explicit before animation begins. Reduced motion resolves to the same static state in 1ms without transforms, glow pulses, auto-panning, or scrolling.

Notifications and reminders use the same restraint: they are quiet by default and surface only required input, approval, completion, failure, meaningful change, or a user-created reminder. The notification treatment cannot claim an unchanged monitor has progressed.

## Accessibility

Use landmark and heading structure, visible 2px blue focus outlines, keyboard-operable drawers/dialogs, 40px desktop and 44px narrow controls, 200% text without clipping, and no hover-only affordance. Every graph has a synchronized readable list; every change that can matter is described in text. The Oracle dock may not cover primary actions, confirmation, errors, or focused controls.

## Known Deployment Debt

- Managed cloud execution, real provider capability probing beyond the local prototype, analytics baselines, billing, marketplace, and publication are not in this build.
- Media provenance beyond supplied local assets must be recorded before any later asset reuse or generation.
- Performance figures in the plan are targets until browser evidence records a measurement.

## Do's and Don'ts

### Do

- Lead each screen with current stage, next action, and evidence context.
- Keep the exact semantic color meanings across all routes.
- Use the paper shell to make routine work calm and the technical canvas only for evidence.
- Label deterministic fixtures, unknown capability, draft, test, and live state precisely.
- Pair every graph with a synchronized list and explicit relationship evidence.
- Keep Oracle contextual, removable, and visible without letting it seize focus.
- Keep fixed Apollo identity and textual environment status visible across responsive shell states.
- Keep agent profiles evidence-led and Settings drafts explicit, reversible, and quiet by default.

### Don't

- Make the node graph the home page, navigation model, or only explanation.
- Replace the shared shell with a dark theme on Knowledge or System.
- Copy Manus UI, Instagram/browser chrome, or generic cyberpunk decoration.
- Use decorative motion, fake progress, or a glow with no evidential relationship.
- Present a draft or test as applied production state.
- Treat a configured key, unknown integration, or unchanged monitor as verified live activity.
- Introduce generated media, WebGL, React, CrewAI, cloud billing, or a marketplace in this slice.
