---
name: mobile-app-shell
description: "Makes the phone journey app-grade (360–430 px): screen budgets per page, phone-sized scroll-scrub runways, thumb-zone tab bar, safe areas, cheap phone motion, and real-device verification."
---
# Mobile app shell

Most hospitality and editorial traffic arrives on a phone. Treat the 360–430 px band as the
primary layout, not a fallback, and judge it by numbers you can test.

This skill owns the phone-specific decisions. It points out for the rest:
the scrub pattern itself is `scroll-scrubbed-visual-sequence`; layout and safe-area rules are
`better-layout`; touch gestures are `gesture-patterns`; native conventions are
`mobile-ios-design` and `apple-design`; GSAP mechanics are the `gsap-*` skills. A project's
committed design system (palette, type, corners, shadows) always overrides any example here.

## 1. Set a screen budget per page

Measure page height in phone screens at 390×844 (`scrollHeight / innerHeight`).

| Page | Budget |
|---|---|
| Home (carries the signature film) | ≤ 16 screens |
| Every other route | ≤ 12 screens |

Enforce it with a test, not by eye. When a page is over budget, change layout before cutting
content:

- Card lists → a horizontal snap rail (`scroll-snap-type: x mandatory`) with the next card
  peeking 16–32 px. Native scrolling, keyboard reachable, no JS carousel.
- Day-by-day schedules, spec tables, logs → native `<details>`, first item open.
- Grids of media → first ~12 items, then a "Show all N" button with `aria-expanded`.
- Two-month calendars → one month with previous/next on phones.

Never trim the page's one signature moment to meet a budget; report the gap instead.

## 2. Size scroll-scrubbed media for phones

Same story, shorter journey. Desktop runways do not transfer.

- **Runway:** about 3 screens per sequence on phones (hero ~300vh, secondary scrubs ~250vh).
  Engines that read the runway's `offsetHeight` need no code change — only CSS.
- **Frame set:** a separate phone set at about half the desktop frame count, sampled evenly so
  timing matches. Fewer frames over a shorter runway feels the same per swipe and downloads
  about half.
- **Resolution ceiling:** a 9:16 crop of a W×H master is at most `H × 9/16` px wide. Compute it
  before promising sharpness. Re-cut from the highest-resolution master you have (often the
  original video, not the exported desktop frames); if even that is soft, the fix is new
  portrait footage, which is an asset decision, not a code one.
- **Warm the cache cheaply:** prefetch the phone set at low priority after the first frame paints,
  back off while the engine has requests in flight, skip Save-Data and 2G. A cache warmer only
  works on a host that allows caching — check the production `Cache-Control`.
- **Reduced motion:** no canvas, no frame requests, one static frame, and the hero's own heading
  visible.

## 3. Build the app shell (≤ 767 px)

- **Tab bar** in the thumb zone: 4–5 cells, each ≥ 44×44 px, labels ≥ 11 px, one primary cell
  (the booking action) in the accent. Active tab marked with `aria-current="page"`. Hidden under
  full-screen overlays (menu drawer, gallery canvas); absent on pages that own a bottom dock.
- **Bottom-anchored overlays** (skip chips, fact labels, release copy) add the tab bar height.
- **Viewport:** `viewport-fit=cover`, then pad with `env(safe-area-inset-*)` on **all four sides**:
  top on the nav, bottom on the tab bar and docks, and left/right as
  `max(var(--margin), env(safe-area-inset-left))` so landscape phones keep text out of the notch.
- **Heights:** sticky stages at `100dvh`; runways stay in `vh` so scroll distance does not jump
  when the toolbar hides.
- **Forms:** inputs at 16 px (no iOS focus-zoom), controls ≥ 44 px.
- **Installable:** manifest with `start_url`/`scope` relative to the deployed base, 192/512/maskable
  icons, `apple-touch-icon`.

## 4. Keep phone motion cheap

Scroll-linked motion is the expensive kind; keep it for content that explains something.

- Text and element reveals **play once** on phones (`once: true` or
  `toggleActions: 'play none none none'`), not `scrub`.
- No parallax on `(pointer: coarse)`.
- No `backdrop-filter` blur over moving media; use a solid plate of the base colour at ~94 %.
- Blur on canvases in whole-pixel steps, written only on change, lower ceiling on phones.
- One smooth-scroll instance per page. Two instances fight for the same scroll.
- Target 60 fps on a mid-range Android phone, not a flagship.

## 5. Verify what emulation hides

Each of these has shipped a defect that a green test suite missed.

| Check | How | Why |
|---|---|---|
| Reduced motion | computed `opacity` of the h1 and above-the-fold copy ≥ 0.95 | Playwright's `toBeVisible()` ignores opacity |
| Live-scroll lag | 4 s pass on 4G emulation (9 Mbps / 150 ms), cold cache, sample `target − nearestLoaded` every frame: p95 ≤ 5, max ≤ 15 | "lag after settle" passes while a real flick freezes |
| Cache headers | serve the test build with the production `Cache-Control` | a `no-cache` preview server downloads every prefetched frame twice |
| Perf budget | long-task count judged on the median of 3 runs | one run is noise |
| Safe areas | emulate insets (CDP `Emulation.setSafeAreaInsetsOverride`), portrait and landscape | insets are 0 in plain emulation |
| Budget | screen count per route on every phone viewport | pages grow silently |

Device matrix: 360×780, 360×800, 375×667, 384×832, 390×844, 393×873, 414×896, 430×932,
plus one WebKit iPhone pass. Re-check pinned runways at 390 and 1920 after any runway change.

## Before you finish

| Symptom | Fix |
|---|---|
| Phone page over budget | Rail, disclosure or "Show all" — layout first, content last |
| Desktop runway length on phones | Phone runway ~3 screens per sequence |
| Phone frames cropped from a smaller master than exists | Re-cut from the best master; state the ceiling |
| `env(safe-area-inset-*)` on top/bottom only | Add left/right with `max()` against the margin |
| `scrub` reveals on phones | Play-once reveals |
| Backdrop blur over video | Solid plate |
| Reduced-motion check uses `toBeVisible()` | Assert computed opacity |
| Test server sends `no-cache` | Serve with production cache headers |
