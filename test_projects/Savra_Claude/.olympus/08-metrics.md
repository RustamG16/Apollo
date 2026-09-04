# 08 — Measurement

**Nothing here is instrumented and no data is reported.** This is an event contract for a
future implementer, plus the performance and payload figures actually measured on this build.
No analytics vendor is installed and the page makes no network call at runtime.

## The hypothesis this page is making

A visitor who spends the page inside a restaurant that is ready and empty will reach the
reservation with more intent than one shown a conventional hero-and-grid. The page is 10.86
viewport heights and its in-narrative CTA sits near the end, so the measurement that matters
most is **whether the narrative earns the scroll or merely costs it**.

## Event contract

Six events. Any more and nobody reads the dashboard.

| Event | Fires when | Properties | Answers |
|---|---|---|---|
| `page_view` | Load | `referrer`, `viewport_w`, `reduced_motion` | Baseline; and what share of visitors have motion off |
| `beat_reached` | A beat's top crosses 50% of the viewport, once each | `beat` (0–8), `t_ms` | Where the scroll dies. This is the single most valuable series on the page. |
| `course_selected` | A menu option is chosen | `course_id`, `method` (`click`/`hover`/`key`) | Whether the menu is discovered, and by which affordance |
| `clip_played` | The clip starts | `trigger` (`auto`/`manual`) | Whether the one moving asset is seen |
| `reserve_opened` | The dialog opens | `source` (`header`/`hero_cta`), `beat_at_open`, `scroll_pct` | **The key one.** How many convert from the persistent header CTA versus from the narrative, and how far they got first. |
| `reserve_submitted` | The prototype form validates | `party_size`, `days_ahead` | Intent shape, once a real provider exists |

Deliberately not tracked: mouse movement, hover heatmaps, rage clicks, session recording. None
of them would change a decision on this page.

## What would falsify the design

- If `reserve_opened` is dominated by `source: header` with a low `scroll_pct`, the narrative
  is not doing commercial work and the page is too long.
- If `beat_reached` collapses between beats 2 and 3, the passage after the clip is the
  problem.
- If `course_selected` fires rarely, the menu is not reading as interactive despite six
  permanently visible names.

## Measured on this build

| Metric | Value | Budget |
|---|---:|---:|
| JS bundle, gzipped | **123 kB** | 160 kB |
| CSS, gzipped | 8.5 kB | — |
| Media, first view | **1 165 kB** | 2 200 kB |
| Clip, deferred to beat 2 | 287 kB | — |
| Total if the visitor reaches beat 2 | 1 452 kB | — |
| Images emitted | 16 stills + 6 thumbs + 1 poster | — |
| Heaviest asset | `course-2.webp`, 205 kB | — |
| Page height | 10.86 × 1080 px | 7.4 stated (deviation) |
| Contrast, rendered | 79 elements, 0 failures, min **6.63:1** | ≥4.5 |
| Design-system drift | `[]` | clean |

## Not measured, and why

Lighthouse, LCP, INP and CLS were not obtained: the browser surface available in this session
suspends `requestAnimationFrame` and never presents frames after the first paint, so any
timing read from it would be fiction. The 240 Hz frame-budget claim in `06-build-plan.md`
(≤2 ms scripting per frame during scroll) is therefore an **untested guardrail**, not a
measurement. It is listed as a launch blocker in `09-handoff.md`.

The structural argument for it still holds and can be read from the source: after the final
revision, nothing writes a style during scroll at all. The doors run once on load, the three
coloured arrivals are CSS transitions, and section entrances are a class toggle. There is no
scroll-linked JavaScript left on this page.
