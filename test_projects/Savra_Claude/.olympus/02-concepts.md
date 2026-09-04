# Design direction

One direction. The brief's direction block specifies `apollo-kinetic`, cinematic posture,
scroll-narrative motion; alternatives were not requested and are not produced, per the
direction rule in `AGENTS.md`.

## Shared constraints — the non-negotiables, stated once

1. Single target viewport **1920×1080**. No breakpoint matrix. Must not overflow when narrowed.
2. The four brand colours are locked: `#335C67` slate, `#9E2A2B` auburn, `#E09F3E` hunyadi,
   `#FFF3B0` vanilla.
3. `media/` is read-only. 24 of 30 stills are usable; two outliers are dropped, two are
   duplicate passes held as fallbacks, one is a palette specification.
4. Every body pairing ≥ 4.5:1, measured. Reduced motion renders every end state statically.
5. Native scroll. No WebGL, no smooth-scroll library, no autoplaying audio.
6. SAVRA is fictional; the reservation sends nothing and says so.
7. Exactly one hero moment.

---

## Direction — **Mise en Place**

### Thesis

The site is SAVRA in the hour before service — the room laid, the light on, the doors still
shut — and the scroll is the clock running to 18:00, when they open.

### Why this, for this audience and this goal

The audience decides on atmosphere before menu, and the only thing this brand has is
atmosphere: thirty photographs, no address, no prices, no chef. The photography's most
conspicuous property, measured in `01-audit.md`, is that **nobody is in it** — 28 of 30
frames contain no person. A page that stages an arriving guest has to argue against its own
pictures. A page that stages the waiting is simply describing them.

It also does the commercial work directly. The visitor spends the whole page in a restaurant
that is ready and empty, and the single thing the page finally offers is the moment it stops
being empty. The reservation is not a call to action bolted to a footer; it is the resolution
of the only tension the page has.

### The spine — one idea, not seven effects

**The aperture widens monotonically from the first pixel to the last.**

The page opens almost closed: a narrow vertical slot of the shopfront photograph in a field
of near-black, about 6% of the viewport width. Every subsequent beat opens it further. At
18:00 it is the full viewport and there is no mask left.

This is the doctrine's continuity rule taken seriously — one element transforming across the
entire page rather than seven sections each doing their own reveal. It is also principle 2
from the audit (four of six room photographs look *through* something) made structural
instead of decorative.

### Page hierarchy and section order

| # | Beat | Clock | Ground | Aperture | Content |
|---|---|---|---|---|---|
| 0 | **Cold open** | 16:40 | slate-black | 6% slot | Wordmark, one line, the clock starts |
| 1 | **The street** | 16:52 | slate-black | 18% | The shopfront. Where SAVRA is, and what it is |
| 2 | **The room** | 17:05 | slate-black | 46% letterbox | The clip. The room, moving |
| 3 | **The room, drawn** | — | slate-black | held | The PLAN interlude: the four colours, named |
| 4 | **What it is made of** | 17:20 | **auburn** | 58% | Lacquer, stone, linen, brass. The material argument |
| 5 | **One pair of hands** | 17:38 | slate-black + **hunyadi** pool | 66% | The chef at the pass. The only person |
| 6 | **The pass** | 17:52 | slate-black | 74% | Six courses, one plate |
| 7 | **They open** | **18:00** | **vanilla** | **100%** | ← the hero moment. Doors open, reservation arrives |
| 8 | Footer | — | slate-black | — | Fiction, provenance, placeholders, disclosure |

Nine sections; three of them (0, 3, 8) are short. The clock is visible throughout in the
fixed header and is the page's progress indicator — it replaces a scroll bar with something
that means something.

### Typography and colour logic

**Type.** The only type evidence in the entire media set is the engraved wordmark on the
shopfront lintel, on the cutlery and on the kitchen counter: a wide, light, generously
letterspaced capital serif. That is a real brand signal, so the display face answers it.

| Role | Family | Why |
|---|---|---|
| Display | **Bodoni Moda** (variable, OFL) | High optical contrast — thick stem, hairline serif. On screen it reads the way brass inlay reads against lacquer, which is literally what the room is made of. Set in capitals with `+0.06em` tracking for the wordmark, tighter (`-0.02em`) at display sizes. |
| Text | **Archivo** (variable, OFL) | Neutral grotesque, wide-ish, high x-height. Gets out of the way; survives at 15px on a dark ground. |
| Clock and labels | **JetBrains Mono** (OFL) | Confined to the clock, the beat numbers and the eyebrow labels. A mono is the correct voice for a timestamp and the wrong voice for anything else. |

Scale 1.500 (perfect fifth), per the doctrine: `13 / 15 / 20 / 30 / 45 / 68 / 102`, plus a
hero clamp at `clamp(6rem, 13vw, 15rem)`. Display leading 0.9, body 1.55.

**Colour.** The audit measurement changed this from the initial hypothesis. 38 of 60
dominant colours across the set fall within RGB-90 of slate; auburn, hunyadi and vanilla
appear in that band twice, twice and three times. So the palette is **one ambient colour and
three punctuations**, and the page treats it that way.

- The ground is a slate-cast near-black, `#0F1518`, held for roughly 70% of the scroll.
- **Auburn arrives once**, at beat 4, where the page argues material — because auburn *is*
  the lacquer.
- **Hunyadi arrives once**, at beat 5, as a pool of task light behind the chef — because
  hunyadi *is* that lamp.
- **Vanilla arrives once**, at beat 7, flooding the page as the doors open — because vanilla
  *is* the light that spills out of the door in `Threshold_opening_to_stone_table`.

Each arrival is tied to a photograph in which that colour is physically present. None of the
three is used as a general-purpose accent anywhere else.

Reading text does not use the brand colours. It uses a derived bone tint `#E4DECD` — vanilla
desaturated — so that vanilla itself stays an event rather than becoming the body colour.
This is a documented derivation, not a fifth brand colour.

**The legal pairing table.** Fixed as tokens; colours are never composed freely. Measured,
not asserted:

| Foreground | Background | Ratio | Use |
|---|---|---:|---|
| bone `#E4DECD` | ground `#0F1518` | **13.70** | All body text |
| bone-2 `#B9B4A6` | ground | **8.89** | Meta, captions, the clock |
| vanilla `#FFF3B0` | ground | **16.39** | Display headlines |
| hunyadi `#E09F3E` | ground | **8.06** | Accent text, rules, focus rings |
| bone | auburn `#9E2A2B` | **5.54** | Body on the auburn field |
| vanilla | auburn | **6.63** | Display on the auburn field |
| ink-dark `#12181A` | hunyadi | **7.85** | Text on the hunyadi field |
| ink-dark | vanilla `#FFF3B0` | **15.96** | Text on the vanilla field |
| auburn | vanilla | **6.63** | Display on the vanilla field |
| bone | slate `#335C67` | **5.45** | Body on a slate field |
| vanilla | slate | **6.52** | Display on a slate field |

**Banned pairings, recorded so they cannot be rediscovered by accident:** ink-dark on slate
(2.51), hunyadi on auburn at body size (3.26), and any brand colour on any other brand colour
not in the table above.

### Media strategy

Built from the ROOM, MATERIAL, HAND and PLATE registers only. The PLAN register gets one
bounded interlude of its own (beat 3) and is never intercut with ROOM. Both outliers are
dropped: `Restaurant_entrance_view_for_hero` is a different building, and
`Recreating_dish_from_asset` is the set's only daylight frame.

Three specific media decisions:

1. **`Dish_plated_on_dark_slate` is colour-matched to the page.** Its background measures
   `#365862`; brand slate is `#335C67` — a distance of about 8 in RGB. At beat 6 the CSS
   field is set to the photograph's measured background and the image is placed with no
   border, so the plate appears to rest on the page rather than inside a rectangle. This is
   the direction's single best material trick and it is free.
2. **The clip is an aperture, not a scrub.** Beat 2 pins briefly and widens a mask over the
   clip while it plays at its own rate, muted and looping. Frame-locked seeking of h264
   stutters everywhere except Safari and would be the page's worst moment.
3. **The plate persists.** Nine of twelve dish photographs use the same teal ceramic, three
   with the same maker's mark. Beat 6 therefore does not cross-fade between photographs; it
   Flips one shared element between a small card and the large plate. The continuity is
   documentary — the object really is the same one.

### Motion posture, and whether GSAP is justified

Scroll-narrative. GSAP is justified on three specific grounds, not as a default:

- **ScrollTrigger** — the aperture is one value driven monotonically across nine sections
  with `scrub: 1`. CSS scroll-linked animations cannot express a value shared across
  sections with smoothing, and cannot pin.
- **Flip** — beat 6 moves a shared element between two different layout positions and sizes.
  There is no honest CSS equivalent; the alternative is a cross-fade, which is the effect the
  direction is specifically rejecting.
- **SplitText** — the wordmark's per-character entrance, used exactly once, on load. The
  alternative is hand-splitting the markup, which damages the accessible text.

Everything else — hovers, focus rings, the dialog — is CSS transitions at 150ms. If it is
state feedback, it is not GSAP's job.

**Durations:** 150ms micro / 400ms move / 800ms scene. **Eases:** `cubic-bezier(.16,1,.3,1)`
out, `cubic-bezier(.65,0,.35,1)` in-out. **Stagger** 60ms, capped at 8. **Scrub** 1, never 0.

The beat sheet:

| # | Beat | Trigger | What moves | Duration | Hands off to |
|---|---|---|---|---|---|
| 0 | Cold open | load | Wordmark chars rise 110%→0 with 60ms stagger; clock counts 16:00→16:40; aperture sits at 6% | 1200ms | 1 |
| 1 | The street | scrub | Aperture 6%→18%; shopfront scales 1.08→1.00 inside the mask; the header rule draws left→right | scrub | 2 |
| 2 | The room | pin 80vh, scrub | Aperture 18%→46%, letterbox; clip playing muted underneath; copy rises at 40% progress | scrub | 3 |
| 3 | The room, drawn | scrub | Three PLAN frames enter on a 60ms stagger; four colour chips draw their labels | 800ms | 4 |
| 4 | What it is made of | scrub | Ground `#0F1518`→auburn over 30% of the section; three material crops offset-parallax at 0.94/1.00/1.06 | scrub | 5 |
| 5 | One pair of hands | scrub | Ground returns to slate-black; a hunyadi radial pool fades up behind the chef, 0→0.55 opacity | scrub | 6 |
| 6 | The pass | hover / focus / arrow keys | **Flip**: the selected course's card becomes the large plate; the previous plate becomes its card. Course name cross-sets in place | 400ms | 7 |
| 7 | **They open** | scrub | Aperture 74%→100% as the door image mask-wipes open from the centre seam; ground floods vanilla; clock lands on 18:00 and stops; reservation panel rises | 800ms | 8 |
| 8 | Footer | scrub | Static. Nothing moves. | — | — |

Exactly one hero moment: beat 7. Beat 2 is a passage — it pins for less than one viewport
height and resolves into the next section rather than climaxing.

**Reduced motion.** `prefers-reduced-motion: reduce` is read in one place,
`src/lib/motion.ts`, and every beat renders its **end state**: aperture at 100% throughout,
ground colours applied as static section backgrounds, the clip replaced by its poster frame,
the wordmark set, the plate showing the first course with the menu operating as an ordinary
list. Nothing is invisible and nothing is mid-transition.

### WebGL

**No.** It fails its activation test. There is no spatial, material or informational claim
here that the photography does not already make better, and a shader approximation of
lacquer, stone and linen would replace real material with a synthetic imitation of it. The
decision is recorded as declined rather than skipped.

### Viewport behaviour

Single target, 1920×1080, per the user's constraint of 2026-09-03. The composition is built
for that frame: a 12-column grid on a 1600px maximum measure centred in the viewport, with
the aperture and the full-bleed beats breaking out to the full 1920.

Narrower windows are not a design target but must not break. The rule applied throughout is
that every horizontal composition uses `minmax()` and `clamp()` rather than fixed pixel
widths, so the page compresses rather than overflowing. Pinning is disabled below 900px so a
narrowed window cannot trap the scroll. Tablet and phone compositions are explicitly out of
scope and recorded as such in `PRD.md`.

### Required assets

Everything the direction needs already exists in `media/`. Nothing is generated, purchased or
externally sourced, so no generation budget is requested.

What is **missing** and cannot be derived from the media — each becomes a visible placeholder
and a launch blocker in `09-handoff.md`: street address, opening hours, telephone, a booking
provider, menu prices, chef and team names, a logo vector, and any photograph above 1376px.

### Implementation risk

| Risk | Likelihood | Mitigation |
|---|---|---|
| The aperture, as one value across nine sections, is the page's whole spine — if it stutters, everything stutters | Medium | It animates `clip-path: inset()` on a single element, promoted once. No layout property is touched. Verified with a frame-rate check in QA. |
| Beat 2's pin fights the aperture, which is also scroll-driven | Medium | One ScrollTrigger owns the aperture globally; the pin owns only its own section's mask width, expressed as a fraction of the global value. The ownership map is written out in `06-build-plan.md`. |
| Flip on beat 6 with images of different aspect ratios | Medium | All six course images are pre-cropped to a single square by the media pipeline, so Flip only ever interpolates position and scale. |
| A 1376px source upscaled 1.4× to fill 1920 | High, accepted | Not fixable — upscaling would be dishonest. The full-bleed beats accept the softness; the framed beats stay at or under native size. Recorded as a launch blocker. |
| The clip's audio track | Certain | Stripped by ffmpeg in the pipeline. `muted` and `playsinline` on the element as a second line of defence. |
| 240Hz display exposing jank the developer's own eye would miss | Medium | The user's monitor runs at 240Hz. GSAP is frame-rate independent, but `will-change` and promotion mistakes show up sooner at that rate. QA includes a frame-timing check rather than a visual impression. |

### Representative frame

Beat 7 — the hero moment — at 1920×1080, as it is meant to resolve:

```
┌──────────────────────────────────────────────────────────────────────────┐
│  SAVRA                 street · room · made of · hands · pass    18:00    │  ← header rule, hunyadi
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│      ░░░░░░░░░░░░░░░  VANILLA #FFF3B0 FLOODS THE FULL FRAME  ░░░░░░░░░    │
│                                                                          │
│   ┌────────────────────────────────┐                                     │
│   │                                │     T H E Y   O P E N               │  Bodoni Moda
│   │   Threshold_opening_to_stone   │     ─────────────────               │  auburn on vanilla
│   │   _table — the door ajar,      │                                     │  6.63:1
│   │   warm light spilling out,     │     Six courses. Two seatings.      │
│   │   mask-wiping open from the    │     Tuesday to Saturday.            │  ink-dark on vanilla
│   │   centre seam to full bleed    │                                     │  15.96:1
│   │                                │     ┌───────────────────────────┐   │
│   └────────────────────────────────┘     │  R E S E R V E  A  TABLE  │   │  ← the one CTA
│                                          └───────────────────────────┘   │
│                                            ↑ ink-dark on auburn button   │
└──────────────────────────────────────────────────────────────────────────┘
   aperture = 100%. There is no mask left. The page has finished opening.
```

The whole page has been building one gesture: a slot 6% wide at the top of the scroll, fully
open here, with the reservation sitting in the light that comes through it.

---

## How it answers the brief

| Dimension | This direction | Brief requirement it satisfies |
|---|---|---|
| Information model | Nine beats on one page, ordered as an hour: where it is → the room → its palette → its materials → its cook → its food → its opening. The clock is the progress indicator. | "Understand the room, the cooking and the price register without reading a paragraph of marketing copy." |
| Composition | Slate-black ground with a monotonically widening aperture; asymmetric editorial grid on a 1600px measure inside 1920. Photographs with large empty grounds carry the type. | Cinematic structural posture; single 1920×1080 target. |
| Media | 24 of 30 stills, registered and separated; the clip muted and masked; one photograph colour-matched to the page ground. | "Use the provided media"; asset provenance recorded; nothing generated. |
| Motion | One spine (the aperture) plus three justified GSAP uses. Exactly one hero moment. Every beat has a static end state. | `apollo-kinetic` scroll-narrative posture; the doctrine's refusal of uniform fade-up, second heroes, and motion that delays reading. |
| Colour | Slate-black ambient; auburn, hunyadi and vanilla arrive once each, each tied to a photograph where that colour is physically present. Eleven measured legal pairings; three named bans. | Locked palette preserved; ≥4.5:1 designed in rather than QA'd in. |
| Complexity / risk | One page, no router, no server, no WebGL, no smooth-scroll. Three GSAP plugins, each with a written justification. | "Make new dependencies, WebGL and heavy scroll animation opt-in decisions with explicit value and fallback." |

## Alternatives

- Requested: **no.** One direction, resolved at intake, per the direction rule in `AGENTS.md`.
