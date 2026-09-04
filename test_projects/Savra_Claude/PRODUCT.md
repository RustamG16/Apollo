# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite 8 + React 19 + TypeScript, fixed to match the two prior Apollo runs on this media so the
three are comparable. GSAP with ScrollTrigger, Flip and SplitText provides progressive motion
enhancement; native scroll throughout, no smooth-scroll library, no WebGL. Fonts are
self-hosted OFL variable families. There is no server, no persistence, no analytics vendor
and no network call at runtime.

## Users

Design-aware Vienna locals and visiting guests booking a considered dinner — an anniversary,
a client, a first evening in the city. They choose a restaurant the way they choose a hotel,
on atmosphere first, and they judge the site by whether it feels like the room will feel.
Secondary: press and guides who want the room, the cooking and the credibility signals in one
pass, quickly.

## Product Purpose

Introduce SAVRA through the hour before it opens — the room laid, the lamps on, nobody
arrived — and make reserving a table the resolution of that tension rather than a button in a
footer. Success is a visitor reaching the reservation panel having understood the room, the
cooking and the price register without reading a paragraph of marketing prose.

## Positioning

SAVRA is presented as a room in a state of readiness: formal, half-dark, built from four
materials, lit one table at a time, and photographed at the moment everything is prepared and
still untouched.

## Operating Context

The client fixed a single target viewport of 1920×1080 (a VG27VQM at 240 Hz, 8-bit SDR).
There is no breakpoint matrix and no designed narrow composition; the page must not overflow
horizontally when a window is narrowed, but tablet and phone layouts are explicitly out of
scope for this run. The experience must remain complete and legible with JavaScript disabled
and under `prefers-reduced-motion: reduce`.

## Capabilities and Constraints

- One reservation-led landing page at `/`, plus a modal reservation dialog.
- Primary action: reserve a table. There is no secondary action competing with it.
- The reservation ships as a clearly labelled prototype: it validates, it confirms, and it
  states on screen that nothing was sent and no table is held.
- The four-colour brand palette is locked. Legal text pairings are enumerated in `DESIGN.md`
  and verified by a measured sweep over every rendered text element, not by a type guard.
- The 31 supplied originals in `media/` are read-only. All derivatives are generated.
- Address, opening hours, service pattern, telephone, price register, chef and team names,
  and a booking provider are not supplied and must not be invented.
- Reduced-motion, keyboard and no-JavaScript behaviours are required, not optional.

## Brand Commitments

The name SAVRA, the supplied photography, the four locked brand colours, and the committed
"Mise en Place" direction are binding.

**SAVRA is fictional.** The restaurant does not exist, the menu is inferred from the
photographs' own filenames, and the footer says so unambiguously. The photography is
AI-generated, carries no third-party rights, and every transformation applied to it — the
crop that excludes the generation mark, the trim, crop and grade applied to the clip — is
recorded in `.olympus/05-asset-manifest.md` and its JSON companion.

The experience is dark, formal, material and unoccupied. Nothing on this page may show the
restaurant in service, and nothing may claim a fact the supplied material does not contain.
