# PRD — SAVRA

## Problem and goal

SAVRA is a fictional fine-dining restaurant in Vienna's first district, used here as the
subject of an Apollo design run. It has thirty photographs, one eight-second clip, a name,
and a four-colour palette. It has no website.

A restaurant at this register is chosen on atmosphere before it is chosen on menu. The
existing material is unusually strong on atmosphere and unusually silent on everything else
— there is no price list, no chef biography, no address. The site's job is therefore to make
the room legible and desirable from photography alone, and to convert that into one action:
opening the reservation panel.

The goal is not a brochure. It is a single page that a visitor experiences once, at length,
and leaves having decided.

## Audience

- **Primary** — design-aware Vienna locals and visiting guests booking a considered dinner:
  an anniversary, a client, a first visit to the city. They browse on a laptop in the
  evening or a phone on the move, and they judge a restaurant by whether its site feels like
  the room will feel.
- **Secondary** — press, guides and industry readers looking for the room, the cooking and
  the credibility signals in one pass, quickly, without patience for narrative.

## Success criteria

1. A visitor reaches the reservation panel having seen the room, the cooking and the
   materials, without needing to read a paragraph of marketing prose.
2. The page reads and works with JavaScript disabled and with `prefers-reduced-motion`
   set — all content present, all end states static.
3. Every text-on-background pairing measures at least 4.5:1 (3:1 for display type above
   24px bold), verified in QA, not asserted.
4. Keyboard-only navigation reaches every interactive element in visible focus order,
   including the reservation dialog, which traps focus and returns it on close.
5. The page is verified by screenshot at its single target viewport, 1920x1080.
6. No console errors; production build and preview both clean.

## Data and publication boundary

- No personal data is collected, stored or transmitted. The reservation form is a
  prototype: it validates, it confirms, and it states plainly on screen that no booking has
  been sent.
- No analytics vendor is installed. `08-metrics.md` specifies an event contract for a future
  implementer; nothing is instrumented and no data is reported.
- No secrets, keys or endpoints appear in this repository.
- The photography is AI-generated and carries a generation mark. Provenance is recorded in
  `.olympus/05-asset-manifest.md` and disclosed in the footer.
- SAVRA does not exist. The footer says so, unambiguously, on every viewport.

## Out of scope

- A real booking integration (OpenTable, Resy, SevenRooms or equivalent).
- A CMS, a menu that changes, multiple routes, or a second language.
- Real address, hours, telephone, prices, chef and team names — all are placeholders and all
  are listed as launch blockers in `.olympus/09-handoff.md`.
- WebGL, 3D, physics, audio, and any smooth-scroll library.
- Retina/2x imagery. The source photographs are at most 1376px on the long edge; the layout
  is sized to what the media can honestly carry rather than upscaling it.
- **Responsive breakpoints.** The user specified a single target resolution, 1920x1080. The
  page is composed and verified for that viewport only. It degrades gracefully if narrowed,
  but tablet and phone compositions are explicitly out of scope for this run.
