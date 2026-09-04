---
name: SAVRA — Mise en Place
description: The restaurant in the hour before service — the room laid, the lamps on, the doors still shut.
northStar: Mise en Place
colors:
  ground: "#0F1518"
  ground-2: "#161E22"
  slate: "#335C67"
  auburn: "#9E2A2B"
  auburn-deep: "#3A1708"
  hunyadi: "#E09F3E"
  vanilla: "#FFF3B0"
  bone: "#E4DECD"
  bone-2: "#B9B4A6"
  ink-dark: "#12181A"
typography:
  hero:
    fontFamily: "Bodoni Moda Variable, Bodoni MT, Didot, serif"
    fontSize: "clamp(6rem, 15vw + 1rem, 21rem)"
    fontWeight: 500
    lineHeight: 0.78
    letterSpacing: "0.02em"
  display:
    fontFamily: "Bodoni Moda Variable, Bodoni MT, Didot, serif"
    fontSize: "clamp(3rem, 5.2vw + 1rem, 8rem)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  sub:
    fontFamily: "Bodoni Moda Variable, Bodoni MT, Didot, serif"
    fontSize: "clamp(1.75rem, 1.4vw + 1.1rem, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.05
  lead:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 0.35vw + 1rem, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
    measure: "46ch"
  body:
    fontFamily: "Archivo Variable, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  action:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.18em"
    textTransform: uppercase
    usage: "The reservation actions, and nothing else."
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.14em"
    textTransform: uppercase
rounded:
  square: "0px"      # the only radius in the system; focus rings included
shadows:
  none: "none"
spacing:
  scale: [4, 8, 16, 32, 64, 128]
  section-block: "6rem"
  gutter: "clamp(2rem, 4vw, 6rem)"
  measure: "1600px"
motion:
  micro: "150ms"
  move: "400ms"
  scene: "800ms"
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
  scrub: 1
  stagger: "60ms"
breakpoints:
  target: "1920x1080"
  degrade: "1100px"
components:
  reserve-button:
    backgroundColor: "{colors.auburn}"
    textColor: "{colors.vanilla}"
    contrast: "6.63:1"
    rounded: "{rounded.square}"
    typography: "{typography.label}"
  reserve-button-hover:
    backgroundColor: "transparent"
    textColor: "{colors.hunyadi}"
    borderColor: "{colors.hunyadi}"
  course-option-selected:
    rule: "inset 3px {colors.hunyadi}"
    fontWeight: 600
    note: "never colour alone"
  plate-panel:
    backgroundColor: "{measured per photograph}"
    padding: "4rem"
    transition: "{motion.move}"
---

# SAVRA — Mise en Place

## Visual World

A slate-cast near-black page carrying full-bleed photography of a restaurant that is ready
and empty. The ground is `#0F1518` for most of the scroll because the supplied photography
measures that dark: twenty of thirty frames sit below mean luminance 90/255, and thirty-eight
of sixty dominant colours fall within RGB-90 of the brand slate. The three warm brand colours
are not partners to it — they are events, and each gets one appearance.

Display type is a high-contrast variable serif set large enough to carry a 1920-wide frame:
the wordmark at 15vw, section headlines at roughly 5vw. That scale is the design. An earlier
build of this page set the hero at 6vw and every other decision was compromised by it — the
photographs were boxed into text columns to make the small type look deliberate, the ground
was darkened to compensate, and the page read as cautious. The type ramp above is committed
before any layout follows from it, and it is not negotiable downward.

## Type

Bodoni Moda for display, because the room is brass inlay against oxblood lacquer and a
high-contrast serif is the typographic form of that material. It is set in title case at
`0.86` leading, tight enough that two lines lock into a block.

Archivo carries every word of reading text at a 46ch measure. JetBrains Mono is confined
absolutely to metadata: the clock, the beat timestamps, the eyebrow labels, and the bracketed
placeholders. A mono is the correct voice for a timestamp and the wrong voice for prose.

Every fluid size carries a rem term alongside its `vw` term, so the scale still responds when
a reader zooms text (WCAG 1.4.4). Nothing on this page is sized in viewport units alone.

## Colour

The palette is locked to four supplied brand colours. Only a subset of pairings clears WCAG
AA against them, so the legal set is enumerated below and in `.impeccable/design.json`, and
verified two ways: a sweep that measures every rendered text element against its computed
background, and the mechanical detector for token drift.

An earlier draft of this document claimed the set was "fixed in `src/lib/contrast.ts` as types
— an illegal pairing does not compile." That was false: the module had no importers anywhere
in `src/`, so it guaranteed nothing. It has been deleted rather than left to imply a guard
that did not exist. Reading text is `--bone`, a desaturated vanilla, so that vanilla itself
stays an event instead of becoming the body colour.

`--auburn-deep #3A1708` is not a fifth brand colour. It is auburn as the room's own light
records it, measured from the supplied dining-room photograph, which sits RGB-108 from the
pure brand value. Flooding a section with saturated `#9E2A2B` next to crops that measure
`#343230` and `#280F05` would read as an arbitrary red field rather than as the lacquer.

**Measured on the rendered page: 79 text elements, zero failures, minimum ratio 6.63:1.**

## Media

The photography is the design. It runs full-bleed at the hero, the street, the room and the
opening, at full opacity, never inside a text column and never dimmed as a texture. Where
type crosses an image, a scrim is applied to the *type block* — not to the picture. That
distinction was worth 8.77:1 on the wordmark while leaving the shopfront at full strength.

Every derivative is generated by `.olympus/tools/prepare_media.py` from read-only originals.
The generation mark each source carries is removed by solving the aspect crop to exclude it,
not by retouching. Course photographs are feathered 7.5% at the border so a textured surface
cannot band against the flat panel behind it.

## Motion

GSAP earns its place in exactly three roles, and nowhere else: the doors, a one-shot arrival
gesture on a compositor-only `scaleX`; Flip on the menu, which preserves the spatial
relationship between a name in the list and the plate in the hero slot; and SplitText on the
wordmark, once, after `document.fonts.ready`. Every other movement on this page is CSS.

The three coloured arrivals — auburn, hunyadi, vanilla — are CSS transitions on an
`.is-in` class, not scrubbed tweens. A 0→1 field change tied to scroll position adds nothing
an arrival does not, and it cost a per-frame JS write plus a dependency on the ticker
actually running.

Section entrances are an IntersectionObserver class toggle, deliberately not a tween. An
entrance built on `gsap.from({opacity: 0})` strands content invisible whenever the animation
does not complete, and invisible text is the worst failure available. Content is visible by
default; the hidden start state is opt-in, and only for sections that are off-screen when the
page loads.

Under `prefers-reduced-motion: reduce` the doors are gone, every beat renders its end state,
the clip shows a poster, and no GSAP scroll branch initialises.

## Accessibility

Skip link, one `h1` and ordered `h2`s, visible focus with a field-aware ring colour (hunyadi
measures 2.03:1 on vanilla, so it cannot be the ring everywhere), a real `role="listbox"`
with roving tabindex and one tab stop, a native `<dialog>` for the reservation with visible
labels, per-field error text, `aria-invalid` and a `role="alert"` summary, alt text on all
eleven images, and a clip that plays once and stops rather than looping.

## Known Deployment Debt

- Source photographs are at most 1376px on the long edge, so a 1920-wide layout upscales by
  up to 1.4×. Real photography at 2560px or larger is the single biggest quality ceiling.
- The supplied clip is a different building from the rest of the set; only its final three
  seconds are usable, and they are trimmed, cropped and colour-graded to sit in this world.
- Address, hours, telephone, price register, chef and team names, and a booking provider are
  all unsupplied and render as visible placeholders.
- The reservation form has no transport and must keep its disclosure until one exists.
- No favicon or social-sharing metadata is declared.

## Do's and Don'ts

### Do

- **Do** let photography run to the viewport edge at full opacity — it is the only asset this brand has.
- **Do** hold the hero at 12–18vw and section headlines near 5vw. Smaller is the failure mode, not the safe choice.
- **Do** scrim the type block, not the picture, when type crosses an image.
- **Do** keep the ground near-black and let auburn, hunyadi and vanilla arrive once each.
- **Do** measure contrast on the rendered page, including against the brightest pixel under any type that sits on a photograph.
- **Do** mark every unsupplied fact as unsupplied, in the interface and in the handoff.

### Don't

- **Don't** box a photograph inside a text column, or mask it to pay for a page-wide motion idea.
- **Don't** dim an image to make type legible.
- **Don't** add a second hero moment, or let the clip's section grow into one.
- **Don't** use hunyadi on auburn (3.26) or on vanilla (2.03), or ink-dark on auburn (2.41).
- **Don't** build an entrance that hides content until an animation completes.
- **Don't** invent prices, hours, an address, a chef, press, awards or a service pattern.
