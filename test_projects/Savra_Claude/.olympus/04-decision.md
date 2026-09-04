# Gate B decision

- **Selected concept:** Mise en Place — the only direction produced, per the direction rule.
- **Status:** approved, with the amendments below. Gate B was granted with Gate A via the
  implementation plan of 2026-09-03; this document records what the critique changed.
- **Date:** 2026-09-04

`02-concepts.md` is left exactly as it was frozen for critique. It is dated evidence and is
not edited retroactively, per `AGENTS.md`. **Revision B below supersedes it** and is the
direction that gets built.

---

## Disposition of the 23 defects

Twenty accepted, three accepted with a different remedy than implied, none rejected.

| # | Sev | Disposition | Remedy |
|---|---|---|---|
| 1 | Crit | **Accept** | The CTA is vanilla `#FFF3B0` on auburn `#9E2A2B` = **6.63:1**. ink-dark-on-auburn is added to the banned list. |
| 2 | Crit | **Accept** | The focus ring becomes field-aware: `--focus` is hunyadi on dark fields (8.06:1) and ground `#0F1518` on the light fields (7.85:1 on hunyadi, 15.96:1 on vanilla). One token, redefined per field, never composed by hand. |
| 3 | High | **Accept** | Beat 2's pin is **removed entirely** and the aperture curve is rescaled so the hero has the largest delta by a wide margin: 6 → 14 → 30 → 40 → 52 → 64 → **100**. Deltas 8/16/10/12/12/**36**. Removing the pin also closes defect 17 and the worst frame-budget case. |
| 4 | High | **Accept** | The aperture is redefined as a single scalar with **one geometry**: two opaque door panels whose combined cover goes 94% → 0% of the viewport width, full height, always. No letterbox, no per-section remap, no "held", no "—". Beat 7 and the footer sit at 0% cover. |
| 5 | High | **Accept** | **Reserve** becomes a persistent item in the fixed header from the first frame, and an "Essentials" strip precedes the footer. The beat-6 CTA remains the narrative resolution; it is no longer the only path. |
| 6 | High | **Accept** | Total scroll specified: **7.4 viewport heights ≈ 7 990px** at 1080. Per-beat heights are in the table below and are a build constraint, not an estimate. |
| 7 | High | **Accept** | The dialog is fully specified in Revision B and again in `06-build-plan.md`. |
| 8 | High | **Accept** | Beat 5 becomes an explicit listbox. All six course names are **always visible**. Click, hover, focus and arrow keys all activate. Visible selected state. `role="listbox"` / `role="option"` / `aria-selected`, roving tabindex. |
| 9 | High | **Accept** | The clip **plays once and stops** on entry rather than looping, and carries a visible pause/play control. WCAG 2.2.2 satisfied by both. |
| 10 | High | **Accept, different remedy** | The vanilla flood is cut. Beat 6 keeps the slate-black ground and the vanilla arrives as a **large lit panel** — the light spilling through the door — not a full-viewport wash. Peak whole-screen luminance change drops from ~16:1 to ~4:1. This is also more faithful to the photograph, and it closes half of defect 12. |
| 11 | High | **Accept, different remedy** | Beat 3 uses the **two** MATERIAL images plus two tight crops **of those same two**, declared as crops in the manifest. No parallax triplet. The direction no longer asks for an asset that does not exist. |
| 12 | Med | **Accept** | Auburn: the field uses `--auburn-deep #3A1708`, the lacquer's own measured colour, with pure `#9E2A2B` reserved for rules and display type on it — declared as "brand auburn as the room's light records it", with the measurement cited. Hunyadi: justified as a **lamp**, i.e. a radial pool, not a field — a lamp is not supposed to be a dominant colour. Vanilla: reattached to the light spill in `Threshold_opening_to_stone_table` and paired with `Savra_dining_room_before_service`, whose measured `#D8CDBC` is the set's actual vanilla. |
| 13 | Med | **Accept** | Beat 3 "the room, drawn" is **cut**. Nine beats become eight. The four PLAN stills go unused and are recorded as such. |
| 14 | Med | **Accept, different remedy** | The overclaim is dropped rather than the menu bent to fit it. Only **four distinct subjects** sit on the identical round teal plate, so "the object really is the same one" cannot justify the interaction. Flip is kept on its real merit — it preserves the spatial relationship between the name in the list and the plate in the hero slot, which a cross-fade destroys — and the genuine same-plate observation moves to where it is true, as a line of copy in the materials beat. |
| 15 | Med | **Accept** | Every unobtainable fact renders as a visibly marked placeholder (bracketed, in mono, dimmed, with a footnote). No invented hours, seatings, prices, address or names anywhere. |
| 16 | Med | **Accept** | `clip-path` is abandoned. The aperture is two panels animated with `transform: scaleX()` — compositor-only, and a better metaphor besides: they are door leaves. Budget stated for 240 Hz. |
| 17 | Med | **Closed by defect 3** | No pin remains, so no anchor lands inside one. |
| 18 | Med | **Accept** | Beat 0's image gets `fetchpriority="high"` and a `<link rel=preload>`; it is no longer 94% masked at rest because the panels open on load. SplitText runs after `document.fonts.ready`. Payload budget stated. |
| 19 | Med | **Accept** | Every fluid size becomes `clamp(<rem>, <vw> + <rem>, <rem>)` — the rem term makes the scale respond to text zoom. Body sizes are rem only. |
| 20 | Med | **Accept** | The Essentials strip carries a marked price-register placeholder alongside hours, address and telephone. |
| 21 | Low | **Accept** | `01-audit.md` corrected: eight, not nine. |
| 22 | Low | **Accept** | Row relabelled: ground `#0F1518` on slate = 2.51; ink-dark `#12181A` on slate = 2.45. Both banned. |
| 23 | Low | **Accept** | Verified at install; recorded in `06-build-plan.md`. |

## Elements explicitly rejected

- WebGL — fails its activation test.
- Smooth-scroll libraries — the doctrine refuses scroll-hijacking.
- Scroll-scrubbed video seeking — h264 seek stutter.
- `clip-path` animation — main-thread paint at 1920×1080.
- Section pinning — removed with defect 3; nothing left needs it.
- Beat 3, "the room, drawn" — cut with defect 13.
- Alternatives to this direction — not requested.

## Approved scope

One page, one dialog, single 1920×1080 target. Eight beats. No router, no server, no
analytics vendor, no network calls at runtime.

## Approved asset budget

**Zero external generation.** Everything comes from `media/`. No image or video service is
called, nothing is purchased, nothing is licensed. Derivatives are produced locally by
`.olympus/tools/prepare_media.py`.

## Motion posture

Scroll-narrative. GSAP with ScrollTrigger, Flip and SplitText, each with a written
justification in Revision B. No pinning. `scrub: 1`. One hero moment, beat 6.

## WebGL decision

**Declined**, on its activation test, not skipped.

---

# Revision B — the direction as built

Everything below supersedes the corresponding section of `02-concepts.md`.

## Thesis (unchanged)

The site is SAVRA in the hour before service — the room laid, the light on, the doors still
shut — and the scroll is the clock running to 18:00, when they open.

## The spine, restated correctly

**Two door panels cover the viewport and open across the length of the page.**

They are two absolutely-positioned panels in the page ground colour, one anchored left and
one right, each animated only with `transform: scaleX()` from a fixed outer origin. Combined
cover runs **94% → 0%** of viewport width, full height, monotonically, driven by one
ScrollTrigger with `scrub: 1` spanning the whole document.

At the top of the page a 6%-wide slot of light shows between them. At beat 6 they are gone.
There is no mask left, and the reservation is standing in the opening.

One value. One geometry. One transform property. Compositor-only. And the metaphor is now
literal rather than analogical — they are the doors.

## Beats

| # | Beat | Clock | Height | Cover | Ground | Content |
|---|---|---|---:|---:|---|---|
| 0 | **Cold open** | 16:40 | 100vh | 94% | slate-black | Wordmark, one line, the clock starts |
| 1 | **The street** | 16:52 | 90vh | 86% | slate-black | The shopfront. Where SAVRA is |
| 2 | **The room** | 17:05 | 110vh | 70% | slate-black | The clip, muted, plays once, pausable |
| 3 | **What it is made of** | 17:20 | 100vh | 60% | **auburn-deep** | Lacquer, stone, linen, brass |
| 4 | **One pair of hands** | 17:38 | 90vh | 48% | slate-black + **hunyadi pool** | The chef at the pass |
| 5 | **The pass** | 17:52 | 120vh | 36% | per-course measured field | Six courses, one listbox, Flip |
| 6 | **They open** | **18:00** | 110vh | **0%** | slate-black + **vanilla panel** | ← hero. Doors open, reservation arrives |
| 7 | **Essentials** | — | 60vh | 0% | slate-black | Hours, address, price register, telephone — all marked placeholders |
| 8 | Footer | — | 60vh | 0% | slate-black | Fiction, provenance, disclosure |

**Total 7.4 viewport heights ≈ 7 990px at 1080.** This is a build constraint. Cover deltas
are 8 / 16 / 10 / 12 / 12 / **36** — the hero's opening is three times the next largest.

## Colour, corrected against the measurements

| Token | Value | Justification |
|---|---|---|
| `--ground` | `#0F1518` | Slate-cast near-black. 20 of 30 stills sit below mean luma 90; 8 below 65. |
| `--ground-2` | `#161E22` | Ground lifted ~5%. |
| `--slate` | `#335C67` | Brand. 38 of 60 top-two dominants fall within RGB-90 of it. |
| `--auburn` | `#9E2A2B` | Brand. Rules and display type on the auburn beat only. |
| `--auburn-deep` | `#3A1708` | **The lacquer's own measured colour** in `Empty_dining_room_interior_view`. Used as the beat-3 field. Declared as brand auburn as the room's light records it — the pure brand value never appears at this scale anywhere in the photography. |
| `--hunyadi` | `#E09F3E` | Brand. A **lamp**, so a radial pool at beat 4, plus accent rules and the dark-field focus ring. |
| `--vanilla` | `#FFF3B0` | Brand. The light through the door at beat 6, as a panel, never a full-viewport wash. |
| `--bone` | `#E4DECD` | Derived: vanilla desaturated. All reading text, so vanilla stays an event. Not a fifth brand colour. |
| `--bone-2` | `#B9B4A6` | Meta, captions, the clock. |
| `--ink-dark` | `#12181A` | Text and focus ring on the light fields. |

**Legal pairings — measured, and the only ones permitted:**

| Foreground | Background | Ratio |
|---|---|---:|
| bone | ground / ground-2 | 13.70 / 12.57 |
| bone-2 | ground | 8.89 |
| vanilla | ground | 16.39 |
| hunyadi | ground | 8.06 |
| bone | auburn | 5.54 |
| **vanilla** | **auburn** | **6.63** ← the CTA |
| ink-dark | hunyadi | 7.85 |
| ink-dark | vanilla | 15.96 |
| auburn | vanilla | 6.63 |
| bone | slate | 5.45 |
| vanilla | slate | 6.52 |

**Banned, recorded so they cannot be rediscovered:** ink-dark on auburn (2.41), hunyadi on
vanilla (2.03), hunyadi on auburn at body size (3.26), ground on slate (2.51), ink-dark on
slate (2.45), and any brand-on-brand pairing not in the table above.

**Focus ring:** `--focus` = hunyadi on dark fields, ink-dark on the vanilla and hunyadi
fields. Redefined per field, never composed by hand. 3px solid, 2px offset.

## Beat 5, specified

A `role="listbox"` of six courses, **all six names permanently visible** at 20px in bone, in
a left column. The selected option is marked with an auburn rule and `aria-selected="true"`.
The right two-thirds holds the plate.

Activation: **click, hover, focus, and ↑/↓/Home/End**. Roving tabindex — one tab stop for
the whole list. Selection drives a GSAP Flip of the plate image between the option's thumb
and the hero slot, 400ms, `cubic-bezier(.16,1,.3,1)`.

**The field colour follows the photograph.** `prepare_media.py` measures each course image's
background from its corner regions and writes it into the asset manifest; selecting a course
transitions `--pass-field` to that value over 400ms. The plate therefore always appears to
rest on the page rather than inside a rectangle — the `Dish_plated_on_dark_slate` trick
(measured `#365862` against brand slate `#335C67`, distance 7), generalised to all six by
measurement rather than by eye.

Courses, one per distinct subject:

| # | Course | Image |
|---|---|---|
| 1 | Flatbread, smoked butter, za'atar | `Flatbread_served_with_smoked_butter` |
| 2 | Salt-baked beetroot, labneh, hazelnut | `Salt-baked_beetroot_dish_on_plate` |
| 3 | Charcoal sea bass, fennel, preserved lemon | `Charcoal_sea_bass_with_fennel` |
| 4 | Aubergine, tahini, pomegranate molasses | `Food_photography_of_plated_dish` |
| 5 | Dry-aged duck, parsnip, blackcurrant | `Dish_plated_on_dark_slate` ← default selection |
| 6 | Saffron quince, yoghurt, pistachio | `Quince_dessert_with_yogurt_and` |

Reduced motion: no Flip. The selected image swaps directly and the field colour is applied
without transition. The list is an ordinary list.

## The reservation dialog, specified

Native `<dialog>`, opened by the persistent header CTA and by the beat-6 CTA.

- Focus moves to the first field on open; `Escape` closes; focus returns to the invoking
  button; the backdrop closes it. All four are the platform's behaviour with `showModal()`.
- Fields: date, time (two seatings — **marked placeholder**), party size, name, email, one
  free-text note. Every field has a visible `<label>`, not a placeholder.
- Errors are identified in text next to the field and announced through a
  `role="alert"` region. No colour-only error signalling.
- Submit sets a flag and renders, in the dialog and not in a toast: *"This is a prototype.
  Nothing was sent, and no table is held."* The disclosure is present before submission too,
  under the submit button.
- No data is stored, transmitted or logged.

## Motion, corrected

| Use | Justification | Alternative rejected because |
|---|---|---|
| ScrollTrigger — the doors | One value across eight sections with smoothing | CSS scroll-linked animation cannot share a smoothed value across sections |
| Flip — beat 5 | Preserves the spatial relationship between the name in the list and the plate in the hero slot | A cross-fade destroys it. (The "same physical plate" argument is **withdrawn** — only four of the set's subjects share that object.) |
| SplitText — the wordmark, once, on load, after `fonts.ready` | Per-character entrance without damaging the accessible text | Hand-split markup breaks selection and screen-reader output |

Durations 150 / 400 / 800ms. Eases `cubic-bezier(.16,1,.3,1)` and `cubic-bezier(.65,0,.35,1)`.
Stagger 60ms capped at 8. Scrub 1. No pinning anywhere.

Performance budget at the user's 240 Hz (4.1ms frame): the doors are `transform` only, so
they are compositor work; nothing else animates during scroll except opacity. Target ≤2ms
main-thread scripting per frame during scrub, measured in QA rather than asserted.

## Loading

`<link rel="preload">` plus `fetchpriority="high"` on the beat-0 shopfront image, which is
the LCP element and is no longer mostly hidden. All other images `loading="lazy"` and
`decoding="async"`. Fonts `font-display: swap`, three variable families, subset to latin.
Payload budget: **≤2.2 MB** total on first view including the clip's poster, with the clip
itself `preload="none"` until beat 2 enters.

## Type, corrected for zoom

Every fluid size carries a rem term so it responds to text zoom:
hero `clamp(4.5rem, 6vw + 2rem, 11rem)`, display `clamp(2.5rem, 2vw + 1.5rem, 4.25rem)`.
Body, meta and UI sizes are rem only. Nothing is expressed in `vw` alone.

## Copy honesty

Every fact not derivable from the media renders as a marked placeholder — bracketed, in
JetBrains Mono, at `--bone-2`, with a footnote in the Essentials strip explaining that SAVRA
is fictional and these are unfilled. This covers: address, hours, seating times, telephone,
price register, chef and team names. The hero copy of `02-concepts.md`
("Two seatings. Tuesday to Saturday.") is **withdrawn** — it asserted as fact what the brief
records as unobtainable.
