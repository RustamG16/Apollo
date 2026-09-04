# 09 — Handoff

SAVRA — "Mise en Place". Single page, single target viewport 1920×1080.
Gate C is **pending**: nothing here is called final until reviewed.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run preview    # serve dist/ for verification
```

Regenerate media derivatives from the read-only originals:

```bash
python .olympus/tools/prepare_media.py
```

Regenerate the machine-readable design system from `src/styles.css`:

```bash
python .olympus/tools/build_design_system.py
```

Check for design-system drift after any UI edit:

```bash
node ../../.claude/skills/impeccable/scripts/detect.mjs --json src/styles.css src/components
```

## Where the truth lives

| Question | File |
|---|---|
| What the design is, as numbers | `DESIGN.md` — the token block binds |
| What the product is | `PRODUCT.md` |
| Why the design is that | `.olympus/04-decision.md` (Revision B supersedes `02-concepts.md`) |
| What the evidence was | `.olympus/01-audit.md`, `.olympus/evidence/` |
| Which photograph goes where, and its provenance | `.olympus/05-asset-manifest.md` |
| What was checked | `.olympus/07-qa.md`, `.olympus/10-finish-review.md` |
| Every media reference | `src/assets.ts` — nothing else names a file |
| Every motion decision | `src/lib/motion.ts` — nothing else reads a motion media query |
| Every legal colour pairing | `DESIGN.md` — enumerated and measured, verified by a rendered-page sweep |

## Launch blockers

Nothing here can be derived from the supplied material. Each renders in the interface as a
visibly marked placeholder rather than as an invented fact.

| # | Blocker | Where it surfaces |
|---|---|---|
| 1 | **Street address** | Essentials strip, beat 1, footer |
| 2 | **Opening hours and service pattern** | Essentials strip, beat 6, reservation dialog |
| 3 | **Telephone and email** | Essentials strip |
| 4 | **Price register** — six courses, and wine pairing | Essentials strip, beat 5 |
| 5 | **Booking provider.** The form validates and then stops, and says so on screen. It must keep that disclosure until a real provider, failure path and consent handling exist. | Reservation dialog |
| 6 | **Chef and team names** | Beat 4 |
| 7 | **Photography at 2560px or larger.** Everything supplied is ≤1376px, so a 1920-wide layout upscales by up to 1.4×. This is the largest quality ceiling on the page. | Everywhere |
| 8 | **A clip shot in the SAVRA room.** The supplied clip is a different building; only its final 3.4 seconds are usable, trimmed and graded. | Beat 2 |
| 9 | **Human verification at 1920×1080.** No pixel screenshot at the target viewport was obtainable in this session — see `07-qa.md`. Structure, geometry and contrast were verified from the live DOM; aesthetic judgement at the target size has not been. | The whole page |
| 10 | **Performance measurement.** LCP/INP/CLS and the 240 Hz frame budget are untested guardrails. | — |
| 11 | Logo as SVG; favicon and social-sharing metadata are absent | Head, header |
| 12 | **Prerendering.** A `<noscript>` fallback now carries the argument, the menu and the essentials, but full no-JS parity — the reservation path in particular — needs SSG. | Whole page |
| 13 | **Re-review.** `10-finish-review.md` returned FAIL 67/100; a bounded repair pass fixed 15 of 23 defects but the second review has not been run. The verdict of record is still FAIL. | — |
| 14 | Composite contrast measurement of the hero eyebrow at 1920 at 100% and 200% text zoom. Its scrim alpha depends on the type block's rendered height, so it degrades toward the 4.5:1 boundary as text scales. | Beat 0 |

## Accepted risks

- **Page length.** 11.69 viewport heights against 7.4 planned. Mitigated by a persistent
  header CTA present from the first frame, so conversion never depends on completing the
  narrative. Whether that is sufficient is a judgement for Gate C.
- **No responsive design.** A single viewport was fixed by the client. The layout degrades
  without overflowing below 1100px but no narrow composition was designed.
- **No WebP fallback.** Every targeted browser supports WebP.
- **React for a single page** is over-provisioned — roughly 45 kB gzip of framework for a page
  that could be static. Kept for comparability with the sibling runs on this media.

## Provenance and disclosure

SAVRA is **fictional**; the footer says so. The photography and clip are AI-generated, supplied
as the brief's reference set, carry no third-party rights and need no attribution. Every
transformation is recorded in `.olympus/05-asset-manifest.md` and
`.olympus/evidence/asset-manifest.json`:

- Each still is cropped so the generation mark it carries falls outside the frame. Nothing is
  retouched, cloned or painted over.
- The clip is trimmed to 4.6–8.0s, cropped, colour-graded cooler, and stripped of its audio
  track.
- Course photographs are feathered at the border so they meet their measured field colour
  without a seam.

`media/` holds the untouched originals and is never written to. `public/media/` is generated
and safe to delete.

## No data leaves the page

No analytics vendor, no cookies, no `localStorage`, no network call at runtime. The
reservation form has no transport: it validates, sets a flag, and states that nothing was sent
and no table is held.
