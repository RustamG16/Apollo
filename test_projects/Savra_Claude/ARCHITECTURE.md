# ARCHITECTURE — SAVRA

## Runtime and stack

| Layer | Choice | Why |
|---|---|---|
| Build | Vite 7 | Fast dev, native ESM, no config surface to maintain for a single page. |
| UI | React 19 + TypeScript | The two prior Apollo runs on this media settled here; keeping it makes this run comparable to them. A single page does not need React — but the beat components each own a GSAP context, and `useGSAP` gives correct cleanup for free. |
| Motion | GSAP 3 + `@gsap/react`, with ScrollTrigger, Flip and SplitText | The direction is scroll-narrative with element continuity between sections. Flip is the only honest way to move an element between two layouts; SplitText is the only honest way to animate per-character display type without shipping hand-split markup. All GSAP plugins are free as of 3.13. |
| Scroll | Native | The doctrine refuses scroll-hijacking. A smooth-scroll library takes ownership of the scroll position, breaks browser find-in-page and anchor behaviour, and adds latency to every ScrollTrigger. Rejected deliberately, not overlooked. |
| Styling | One hand-written `src/styles.css`, CSS custom properties as tokens | The token set is small and fixed (four brand colours, one ground, one scale). A utility framework would be more bytes than the entire stylesheet. |
| Fonts | `@fontsource-variable/*`, self-hosted | OFL, no external request, no licence question, no FOUT from a third-party CDN. |
| Images | WebP derivatives generated at build-prep time by a Pillow script | Sources are JPEG, ≤1376px, and carry a corner mark that must be cropped. Generating derivatives is the only way to ship a sane payload; the prior run that skipped it shipped 6 MB of raw JPEG. |
| Video | ffmpeg-stripped MP4 + WebM, muted, `playsinline` | The source clip carries an audio track the doctrine forbids playing. |

No router: one page, one dialog, hash anchors.

## Source layout and boundaries

```
media/                  31 supplied originals. READ-ONLY. Never modified, never referenced
                        by the app directly.
public/media/           Generated derivatives. Disposable — rebuild with the tool below.
src/
  main.tsx              Mount only.
  App.tsx               Section order and the page-level scroll orchestration.
  assets.ts             The single import manifest. Every media reference in the app
                        resolves through here; no component builds its own URL.
  lib/motion.ts         The matchMedia gate, the duration/ease tokens, the
                        reduced-motion predicate. Every component asks this module
                        whether it may animate.
  components/           One component per beat, plus the reservation dialog.
  styles.css            All styling. Tokens at the top, beats in narrative order below.
.olympus/               The Apollo audit trail. Not application code. Do not import from it.
.olympus/tools/         The media derivative pipeline (Python + ffmpeg).
```

**Boundaries that matter:**

- `media/` is an input, not a source directory. If a derivative is wrong, fix the tool and
  re-run it; never edit an original.
- `public/media/` is generated. It is safe to delete and regenerate at any time.
- Only `src/lib/motion.ts` decides whether motion runs. A component that reads
  `matchMedia('(prefers-reduced-motion: reduce)')` on its own is a bug — the decision must
  be single-sourced or the reduced-motion guarantee cannot be verified.
- Only `src/assets.ts` names a file. This is what makes a media re-cut a one-file change.

## Interfaces and state

There is no server, no persistence and no API.

State is local and shallow:

- `App` holds the active beat index for the nav's `aria-current`, derived from ScrollTrigger.
- `Pass` (the menu beat) holds the selected dish id; changing it drives a GSAP Flip between
  the small card and the large plate.
- `ReservationDialog` holds form values and a submitted flag. It is a native `<dialog>`,
  so focus trapping, `Escape`, and the backdrop are the platform's job, not ours.

Nothing is written to `localStorage`, cookies, or the network. The reservation submit
handler deliberately has no transport: it sets a flag and renders a notice saying the
booking was not sent.

## Build, verification and deployment

```
npm install
npm run dev                    # Vite dev server, http://localhost:5173
npm run build                  # tsc -b && vite build
npm run preview                # serve dist/ for verification
python .olympus/tools/prepare_media.py    # regenerate public/media/ from media/
```

Verification before any handoff:

1. `npm run build` completes with no TypeScript error.
2. `npm run preview`, then screenshot 1440 / 1280 / 768 / 390 — evidence in
   `.olympus/evidence/`.
3. Reduced-motion pass: emulate `prefers-reduced-motion: reduce`, confirm every beat renders
   its end state and nothing is mid-transition or invisible.
4. Keyboard pass: tab the whole page, open and close the dialog, confirm focus returns.
5. Contrast pass: measure every text-on-background pairing; the table lives in
   `.olympus/07-qa.md`.
6. Console clean at all four widths.

Deployment is static: `dist/` on any host. Not configured — no target was specified.

## Decisions and costs

- **React for a single page is over-provisioned.** Accepted for comparability with the two
  prior Apollo runs on this media, and because `useGSAP` cleanup is genuinely useful across
  seven independently-triggered beats. Cost: ~45 kB gzip of framework for a page that could
  be static HTML. If this were a real launch, that trade should be revisited.
- **Native scroll over Lenis.** Costs some perceived smoothness on Windows trackpads and
  mice. Buys correct anchor navigation, working find-in-page, no scroll-position ownership
  conflict, and honest `prefers-reduced-motion`. The doctrine's refusal of scroll-hijacking
  makes this non-negotiable.
- **The locked four-colour palette is hostile to text contrast** — vanilla `#FFF3B0` and
  hunyadi `#E09F3E` are both light, so only a small set of pairings clears 4.5:1. Resolved
  by fixing the legal pairings as tokens rather than allowing free colour use. This is the
  defect that failed the first Codex run at 82/100; it is designed out here rather than
  caught in QA.
- **Video is a masked loop, not a scroll-scrubbed seek.** Frame-accurate scrubbing of h264
  stutters badly outside Safari. The aperture mask is scrubbed instead; the video plays at
  its own rate underneath. Cost: the clip is not frame-locked to scroll position. Buys a
  stable 60fps on the pinned beat.
- **No 2× imagery.** Sources are ≤1376px. Upscaling would be dishonest and would inflate the
  payload for no real detail. Cost: the hero is soft on a 4K display. Recorded as a launch
  blocker — real photography is needed.
