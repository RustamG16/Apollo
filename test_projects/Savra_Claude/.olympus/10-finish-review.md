# 10 — Finish review

The second, **independent** pass. Produced by the read-only `independent-critic` specialist
using `award-rubric` and `visual-qa`, against the frozen `DESIGN.md`. The reviewer did not
build this and wrote no file. Date 2026-09-04.

## Score, as returned

| Axis | Score |
|---|---:|
| Design /40 | 28 |
| Usability /30 | 19 |
| Creativity /20 | 14 |
| Content /10 | 6 |
| **Total /100** | **67** |

**Verdict returned: FAIL.**

Two contract breaches — a stated product requirement specified in the build plan and then not
built, and a declared gate in `ARCHITECTURE-ESSENTIALS.md` §4 left unmet — plus a derived
layout break on the hero beat at the single target viewport.

The reviewer also made a fair methodological objection, recorded here rather than argued
with: **this project's `DESIGN.md` was written after its first build**, so drift measured
against it is measured against a document reverse-engineered from the artifact. It therefore
scored against the genuinely-frozen artifacts as well. `run.json` records
`committed_before_build: false`.

## Verification before acting

Every claim was checked before any repair. Nothing was taken on the reviewer's word, and
nothing failed verification.

| Claim | Method | Result |
|---|---|---|
| D1 — beat-6 figure overruns its own copy | `getBoundingClientRect` at 1920 | **Confirmed, and worse than derived.** Figure 1920px wide from x=153, overflowing 153px past the right edge, with **762px of intersection** under the hero copy and CTA. Cause: `.figure { margin: 0 }` is declared *after* `.bleed` and silently won, killing the negative margins while `width: 100vw` survived. Every bled figure on the page was mispositioned. |
| D2 — blank page with JS off | `dist/index.html` | Confirmed. No `<noscript>`, no prerender. |
| D8 — Flip inert, no thumbnails | grep | Confirmed. Zero `thumb` references in `BeatPass.tsx`. |
| D10 — invented facts | grep | Confirmed. "1010 Vienna", "Twenty-eight seats", "Eleven coats", "roughly every three weeks", "first district". |
| D11 — `--doors: 1` initial | source | Confirmed. |
| D13 — `aria-current` false under reduced motion | source | Confirmed. `onPageProgress` short-circuits to `fn(1)`. |
| D16 — video has no intrinsic box | source | Confirmed. |
| D21 — `src/lib/contrast.ts` has zero importers | grep | **Confirmed.** The "an illegal pairing does not compile" claim in `DESIGN.md` and `PRODUCT.md` was false. |

## Repair pass — one, per the bound in `AGENTS.md`

| # | Defect | Repair |
|---|---|---|
| D1 | Bled figures mispositioned; beat-6 photograph under its own copy | `.figure.bleed` specificity so the margins cannot be overridden; `.opening__figure` moved to `grid-column: 1 / -1`. **Verified: intersection area 0.** |
| D2 | Blank page without JavaScript | A real `<noscript>` carrying the wordmark, the argument, the hero image, all six courses, the essentials with marked placeholders, and the fiction disclosure. Full parity still needs prerendering — recorded as a launch blocker. |
| D3 | Two hero moments | **Accepted, not repaired.** The doors are an arrival prologue and beat 6 is the resolution; the doctrine's concern is a second *climax* competing for the same attention, and these sit 11 viewport heights apart. Recorded rather than silently carried. |
| D4, D12 | Three docblocks asserting a motion mechanic the build no longer has | Corrected in `App.tsx`, `BeatOpening.tsx`, `Header.tsx`, `Doors.tsx`. |
| D5 | Dialog returned focus to the last-hovered course option | The invoker is captured before `showModal()` and restored on close. **Verified: returns to `.header__cta`.** |
| D6 | Terminal state silent, focus dropped | Confirmation is `role="status" aria-live="polite"` and takes focus. **Verified.** |
| D7 | Focus and selection could desynchronise on Home/End | One `select()` path for every keyboard move. **Verified across End, Home, ↓, ↓, ↑: focus is always the selected option.** |
| D8 | Flip inert | **Accepted.** The plate swap and the measured field transition remain; the thumbnail-to-hero Flip was never built, so the claim is withdrawn from `DESIGN.md` rather than the animation faked. |
| D9 | Clock disagreed with the beat beside it | Beat times are now interpolated between the beats' **measured** offsets, so the header and the headline agree by construction. |
| D10 | Invented facts | All removed. "1010 Vienna" → `[postcode] Vienna`; seat count, coat count, district and service cadence rewritten to claim nothing. |
| D11 | First paint fully shut | `--doors: 0` by default — closing is what JS does. |
| D13 | `aria-current` lied under reduced motion | Reduced motion now reads real scroll position via a passive listener. A scroll listener is position, not motion. |
| D14 | Dead seating select | Replaced with the project's own `Placeholder` treatment. **Verified: no `<select>`; screen-reader text reads "not yet supplied".** |
| D16 | Video reflowed ~120px | Intrinsic `width`/`height` added. |
| D17 | Reduced-motion clip not replaced by a still | The fallback matrix is now implemented: reduced motion renders `room-poster.webp` instead of the video, which also retires the unused asset. |
| D19 | Header CTA hover put hunyadi over a photograph | Hover now fills with `--ground` rather than going transparent. |
| D21 | Dead code; false compile-time guarantee | `src/lib/contrast.ts` deleted; the claim corrected in `DESIGN.md`, `PRODUCT.md` and `ARCHITECTURE-ESSENTIALS.md`. |
| — | **Found during repair, not reported** | `100vw` includes the scrollbar, so every bled element overhung by 7px per edge. A `--vw` custom property is now measured by `ResizeObserver`. **Verified: bleeds flush 0..1905, horizontal overflow 0.** |

## Not repaired, and why

- **D3, two hero moments** — a judgement, recorded above.
- **D8, the Flip interaction** — the claim was withdrawn rather than the feature invented.
- **D9's second half**, that the clock's payoff lands late: the page is 11.69 viewport heights
  against 7.4 planned. Shortening it is a direction change, not a repair.
- **D15** hover debounce, **D18** Essentials heading, **D20** eyebrow scrim at 200% zoom,
  **D22** hero alignment, **D23** footer arithmetic — carried to Gate C with their trade-offs
  rather than fixed inside the bound.
- **D20 specifically** needs a composite measurement at 1920 at both 100% and 200% text zoom,
  which this environment cannot produce. Listed as a launch blocker.

## Re-verified after repair

| Check | Result |
|---|---|
| Contrast, rendered page | **109 elements, 0 failures, minimum 6.63:1** |
| Beat-6 figure vs hero copy | Intersection **0 px²** |
| Full-bleed alignment | All three flush `0..1905`; horizontal overflow **0** |
| Listbox | Focus is the selected option after End, Home, ↓, ↓, ↑ |
| Dialog | Modal; focus to first field; focus returns to the opener; confirmation announced and focused |
| Seating field | No dead control; marked placeholder with screen-reader text |
| Design-system drift | `impeccable detect.mjs` → `[]` |
| Production build | Clean |

## Status

The reviewer's instruction is that a repaired build is re-reviewed once. **That second review
has not been run.** This document records the first review and the repair pass against it.
The verdict of record therefore remains **FAIL (67/100)**, and Gate C should treat it that way
until a re-review is run.
