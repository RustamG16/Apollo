# Three design directions — frozen Gate B record

These concise alternatives satisfy the Olympus comparison requirement. Per the user's instruction to proceed with one concept without another pause, the independent critique will select the strongest direction automatically.

## Shared non-negotiables

- SAVRA is a fictional contemporary fire-led Eastern Mediterranean tasting-menu concept in Vienna; no real venue, chef, address, prices, awards, reviews, availability, or live booking is implied.
- Primary action is **Reserve a Table**, implemented as an honest demo interaction.
- Only the supplied media is used. M08 is palette evidence only; its graphic composition is not reused.
- Brand colors are locked: Dark Slate Gray dominant, Vanilla light anchor, Auburn architectural focus, Hunyadi Yellow limited fire accent.
- Native scrolling, semantic structure, keyboard focus, responsive art direction, reduced-motion parity, and conservative loading are mandatory. WebGL and external media are out of scope.

## Concept 1 — The Threshold Ritual

- **Thesis:** The page behaves like crossing a sequence of thresholds—from Vienna dusk to flame, plate, craft, room, and finally one waiting table.
- **Fit:** Best balance of emotional narrative and reservation clarity for special-occasion diners; the call to action is always available, while the final table image makes it feel earned.
- **Emotional arc:** outside → invitation → heat → abundance → human craft → intimacy → reservation.
- **Hierarchy/navigation:** persistent minimal header (`Story`, `Plates`, `Space`, `Reserve`); video/doorway hero; point-of-view manifesto; three-plate editorial sequence; materiality room reveal; anonymous chef/process triptych; destination-table CTA; restrained disclosure footer.
- **Typography/layout:** high-contrast system serif display with disciplined grotesk/system sans metadata; asymmetric 12-column desktop frames, alternating media scale, auburn “door” planes, Vanilla reading fields, sparse Hunyadi glints.
- **Precise media mapping:** M03 video + M19 poster/hero fallback; M01/M31 threshold transitions; M12, M15, M21 signature plates; M28 material interlude; M24 room; M05–M07 craft; M23/M26 reservation culmination; M25 optional exterior arrival.
- **Motion:** GSAP justified for one continuous entrance timeline, restrained section reveals, plate progression, and one desktop-only room-to-table pinned transition. Native scroll remains; no mobile pinning. Reduced motion shows final states, static M19 poster, and simple CSS-free jumps.
- **Responsive behavior:** desktop uses cinematic overlap and one bounded pin; tablet reduces overlap; mobile swaps to portrait plate/table assets, keeps copy before media, turns the plate sequence into stacked chapters, and removes scrub/pin.
- **Reservation interaction:** header and final CTA open a modal-like demo drawer with party size, occasion, and date-like demo steps; explicit “Concept demo—no booking is sent.” Keyboard-trapped, closable, and locally logged without personal data.
- **Performance/accessibility:** preload only poster/critical hero; video metadata or none until eligible; responsive derivatives after selection; lazy-load the rest; text never depends on motion; `aria-current` section awareness; visible focus.
- **Risks/safeguards:** 720p hero softness—contain with atmospheric overlay and poster on constrained modes; scroll excess—only one bounded pin; dark imagery—dedicated scrims and contrast checks.
- **Required assets:** none beyond supplied inputs; a verified rights/releases statement would be helpful but is not claimed.
- **WebGL:** no; the threshold idea is better communicated with 2D media and scroll pacing.

Representative desktop wireframe:

```text
┌──────────────────────────────────────────────────────────────────┐
│ SAVRA          Story   Plates   Space          [Reserve a Table] │
├──────────────────────────── HERO VIDEO / DOORWAY ────────────────┤
│  AFTER HOURS.                  SAVRA                              │
│  FIRE AT THE CENTRE.           ↓ Begin the ritual                │
├──────────── AUBURN THRESHOLD ────────┬───────────────────────────┤
│ manifesto / point of view            │ flame + material detail   │
├──────────────────────────────────────┴───────────────────────────┤
│ PLATE 01 full bleed  ── copy     PLATE 02 portrait     PLATE 03 │
├──────────────── ROOM / MATERIALITY REVEAL ──────────────────────┤
│ process 01            process 02              process 03          │
├────────────── DESTINATION TABLE + RESERVATION CTA ──────────────┤
│                 [Begin a Reservation]                             │
└──────────────────────── concept disclosure ─────────────────────┘
```

## Concept 2 — The Fire Index

- **Thesis:** SAVRA is presented as a sharp editorial index: ingredients, methods, plates, and rooms are browsed like a collectible after-dark journal.
- **Fit:** Best for repeat browsing and direct dish discovery; less cinematic but highly scannable.
- **Emotional arc:** index → choose a thread → discover details → compose a meal → reserve.
- **Hierarchy/navigation:** large typographic contents hero; filter-like anchor rail (`Fire`, `Bread`, `Sea`, `Earth`, `Room`); modular plate index; process notes; room folio; reservation band.
- **Typography/layout:** denser sans-led typography with oversized serif numerals; strict modular grid; Dark Slate Gray canvas with Vanilla cards and auburn rules.
- **Precise media mapping:** M09/M10 grid openers; M12/M13 bread pair; M04 sea bass; M21/M22 beetroot pair; M15/M27 meat pair; M17/M20 dessert pair; M05/M06 process notes; M11/M24 room folio; M29 CTA.
- **Motion:** no pinning; CSS transitions for focus/hover and GSAP only for grouped index entrances. Reduced motion removes entrances with no structural loss.
- **Responsive behavior:** desktop masonry-like index; tablet two columns; mobile becomes an accessible numbered reading list with portrait-first art direction and sticky reserve bar.
- **Reservation interaction:** compact inline demo panel in the reservation band; same explicit no-submit disclosure.
- **Performance/accessibility:** many thumbnails require `srcset`, lazy loading, and strict image budget; filter rail remains anchor navigation rather than hidden content state.
- **Risks/safeguards:** can feel like a portfolio instead of hospitality; counter with warm copy and a dominant table ending. Higher image count—cap initial render and lazy-load below fold.
- **Required assets:** none.
- **WebGL:** no.

Representative desktop wireframe:

```text
┌──────────────────────────────────────────────────────────────────┐
│ SAVRA / FIRE INDEX                         [Reserve]              │
│ 01 Fire  02 Bread  03 Sea  04 Earth  05 Room                     │
├──────────────┬───────────────────────┬───────────────────────────┤
│ 01 / BREAD   │ large plate           │ method note               │
├──────────────┼───────────┬───────────┴───────────────────────────┤
│ portrait     │ 02 / SEA  │ wide plate                            │
├──────────────┴───────────┼───────────────────────┬───────────────┤
│ process notes            │ 03 / EARTH            │ portrait      │
├──────────────────────────┴───────────────────────┴───────────────┤
│ ROOM FOLIO                         [Begin a Reservation]          │
└──────────────────────────────────────────────────────────────────┘
```

## Concept 3 — One Table After Dark

- **Thesis:** A radically restrained central-axis experience follows one waiting table through rooms, plates, and hands, making reservation intent the entire page’s organizing idea.
- **Fit:** Most intimate and conversion-forward; strongest for special occasions, with fewer narrative branches.
- **Emotional arc:** empty table → anticipation → dishes arrive → hands finish the ritual → table waits again → reserve.
- **Hierarchy/navigation:** minimal wordmark and reserve control; destination-table hero; short point-of-view statement; four full-height acts (bread, plate, craft, room); final table returns with demo reservation.
- **Typography/layout:** centered serif titles, narrow measure, near-monastic spacing; mostly Dark Slate Gray and Vanilla with auburn door frames; Hunyadi appears only as lamp/fire markers.
- **Precise media mapping:** M23 hero; M29 table detail; M12 bread; M21 beetroot; M15 lamb; M05 craft; M28 linen; M24 room; M26 final table; M31 final threshold.
- **Motion:** restrained dissolves, depth shifts, and a recurring table-mask transition; GSAP timeline and ScrollTrigger justified, but no continuous scrub on mobile. Reduced motion becomes clean static chapters.
- **Responsive behavior:** desktop uses centered 70–82vh framed images; tablet reduces breathing room; mobile uses portrait assets and 60–70vh chapters with the reserve control fixed only after the hero.
- **Reservation interaction:** final table expands into a full-page accessible demo stepper; header reserve skips directly to it.
- **Performance/accessibility:** smallest media count and clearest focus order; large viewport imagery still needs responsive derivatives and explicit dimensions.
- **Risks/safeguards:** sparse content may under-communicate the Eastern Mediterranean point of view and make the experience feel generic; copy must carry more meaning. Full-height pacing can tire mobile users—shorter mobile chapters.
- **Required assets:** none.
- **WebGL:** no.

Representative desktop wireframe:

```text
┌──────────────────────────────────────────────────────────────────┐
│ SAVRA                                                  [Reserve] │
│                                                                  │
│                 ┌──── ONE WAITING TABLE ────┐                    │
│                 │          image            │                    │
│                 └───────────────────────────┘                    │
│              Fire-led. Eastern Mediterranean.                    │
├──────────────────── ACT I / BREAD ───────────────────────────────┤
├──────────────────── ACT II / EARTH ──────────────────────────────┤
├──────────────────── ACT III / HANDS ─────────────────────────────┤
├──────────────────── ACT IV / ROOM ───────────────────────────────┤
│                 THE TABLE WAITS                                  │
│                 [Begin a Reservation]                             │
└──────────────────────── concept disclosure ─────────────────────┘
```

## Meaningful differences

| Dimension | The Threshold Ritual | The Fire Index | One Table After Dark |
|---|---|---|---|
| Information model | Linear cinematic journey | Browsable editorial taxonomy | Single reservation-centered axis |
| Composition | Asymmetric 12-column chapters and thresholds | Dense modular grid / index | Sparse centered full-height acts |
| Media | Arrival video + varied cinematic/portrait sequence | Largest plate set in modular tiles | Smallest curated set, table motif repeated |
| Motion | One bounded pin + narrative reveals | Minimal grouped reveals, no pin | Dissolves and recurring mask transitions |
| Differentiation | Architectural journey from door to table | Culinary journal / visual catalog | Intimate ritual with radical restraint |
| Mobile model | Purposeful chapter re-art-direction | Numbered list / two-to-one column collapse | Short centered acts with portrait media |
| Production cost | Medium | Medium, image-derivative heavy | Low–medium |
| Principal risk | Over-choreography | Portfolio/catalog tone | Under-communication / generic minimalism |

## Freeze

All three directions are frozen for independent scoring. They must not be merged during critique. Per the user's explicit instruction, the recommended concept may be selected automatically and implementation may begin without another Gate B pause.

