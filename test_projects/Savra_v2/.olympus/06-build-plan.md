# SAVRA — Enter the Ritual

## Outcome

Build one cinematic, reservation-led restaurant landing page from the supplied SAVRA imagery. The experience should feel like crossing a threshold into an intimate room: cool blue architecture outside, amber light inside, precise food craft at the center. No alternative concept phase.

Primary action: **Reserve a table**. Secondary action: **Explore the menu ritual**.

## Creative system

- **Art direction:** architectural portal + dining ritual; restrained, tactile, nocturnal, not luxury-template minimalism.
- **Palette:** deep petrol `#173A42`, oxblood `#6D2924`, lamp amber `#E2A94F`, bone `#E8E0D1`, charcoal `#111312`.
- **Type:** expressive high-contrast editorial serif for display; narrow grotesk for navigation and details; tabular mono only for time, course, and location metadata.
- **Material:** subtle linen/noise overlay, thin oxblood rules, warm pools of light, hard rectangular masks echoing doors and arches.
- **Composition:** oversized type interrupted by framed imagery; asymmetric captions; portrait assets puncture long horizontal sequences.

## Page sequence and media map

### 1. Threshold hero — 100svh

- Use `Restaurant_entrance_view_for_hero_202608110048.jpeg` as the first visual.
- The page opens as a narrow vertical slit, then the teal doors reveal the table as the word **SAVRA** resolves behind the opening.
- Persistent minimal navigation: SAVRA / Vienna / Menu / Story / Reserve.
- Primary reservation pill remains visible but quiet until the reveal completes.

### 2. Crossing — pinned cinematic passage

- Use `Threshold_opening_to_stone_table_202608110048.jpeg`, the two `Camera_*threshold*` stills, and `Camera_tracking_through_dining_room_202608110048.mp4`.
- Scroll progress widens a door-shaped mask; still image hands off to the video without a visual jump.
- Copy: “A room between fire, stone and season.” Keep the story under 55 words.
- The video is muted, inline, looped, poster-backed, and loaded only as the section approaches.

### 3. The room — spatial editorial spread

- Use `Savra_destination_table_room_por…`, `Savra_dining_room_before_service`, `Empty_dining_room_interior_view`, and `SAVRA_table_prepared_for_two`.
- One tall portrait remains sticky while two landscape frames drift past at different but restrained rates.
- Small live details: Vienna address, dinner service, seating character, reservation lead time.

### 4. The craft — chef sequence

- Use `Chef_plating_at_pass`, `Chef_plating_dish`, and `Chef_plating_dish_with_tweezers`.
- A three-beat scroll timeline reveals hand → plate → finished gesture through clipped vertical panels.
- Kinetic caption follows the cursor within a small bounded region; keyboard focus gets the same information without motion.

### 5. Seasonal menu — interactive dish atlas

- Feature charcoal sea bass, beetroot with labneh, lamb backstrap, flatbread, quince dessert, and the overhead dish.
- Desktop: a horizontally scrubbed editorial reel driven by vertical scroll; the focused dish expands while neighbors compress.
- Touch/mobile: native horizontal snap carousel with visible controls and no hijacked vertical scroll.
- Each dish exposes name, technique, and one ingredient line; no invented pricing.

### 6. Table for two — conversion interlude

- Use `Table_set_for_two`, `Table_settings_with_linen_runner`, and `Stone_meets_textured_linen_weave`.
- Layer a soft linen texture behind a large promise: “Your table is waiting beyond the blue door.”
- Reservation CTA opens an accessible dialog or external reservation URL. If no booking provider is supplied, ship a clearly labeled prototype form.

### 7. Final room / footer

- Use `SAVRA_restaurant_entrance_in_Vienna` or the dining-room tracking video poster.
- Large local-time treatment, address, service days, contact, social, legal links, and final Reserve CTA.
- The closing mask narrows slightly, echoing the opening without trapping scroll.

## Motion and interaction choreography

- **GSAP + ScrollTrigger:** hero slit reveal, crossing pin, craft sequence, menu reel, and section entrances.
- **Lenis:** optional smooth scrolling on precise pointer devices only; native scrolling on touch and reduced-motion modes.
- **Kinetic typography:** SplitText-style line masks built without a paid dependency unless licensed; stagger by line, not character, for readability.
- **Magnetic CTA:** maximum 8px translation with spring-like easing; disabled for touch, keyboard, and reduced motion.
- **Image hover:** one subtle focal shift and caption reveal; no constant floating.
- **Reservation transition:** use the native View Transition API when available, with an instant accessible fallback.
- **Ambient details:** cursor halo samples the current section color; noise is static or extremely slow to avoid GPU waste.

Motion must communicate crossing, focus, or sequence. Decorative effects stop when offscreen. Animate transforms, opacity, clip-path, and CSS variables; never animate layout dimensions during scroll.

## Technical architecture

- Vite + React + TypeScript.
- `gsap`, `@gsap/react`, `ScrollTrigger`; Lenis only if profiling confirms value.
- Semantic sections and real links first; animation enhancement after the static document works.
- Central asset manifest with role, aspect ratio, preload priority, alt text, and mobile crop.
- Responsive images via generated AVIF/WebP variants plus original fallback; preserve all source media.
- One hero image preloaded; all other imagery lazy-decoded. Video uses a poster and `preload="metadata"` or `none`.
- CSS custom properties for color, type scale, spacing, motion duration, and easing.

## Responsive behavior

- Desktop: full pinned crossing and scroll-scrubbed menu reel.
- Tablet: shorter pins, simplified parallax, two-column editorial rhythm.
- Mobile: no long pins; threshold reveal becomes a brief entrance; dish reel uses native snap; persistent bottom Reserve button respects safe areas.
- `prefers-reduced-motion`: no smooth scroll, scrubbing, parallax, cursor halo, or magnetic motion; cross-fades under 180ms or immediate state changes.

## Performance guardrails

- LCP target under 2.5s on a representative mobile profile; hero decoded dimensions fixed to prevent CLS.
- INP target under 200ms; pointer effects update through `requestAnimationFrame` and never read/write layout in the same frame.
- Aim for under 10ms animation work per frame during the critical sequences.
- Cap active compositor layers; remove `will-change` after entrances.
- Test the video handoff and pinned sections at 360×800, 390×844, 768×1024, 1440×900, and 1920×1080.

## Build order

1. Inventory media, assign crops/posters/alt text, and create optimized derivatives.
2. Scaffold the semantic page, typography, tokens, navigation, and working reservation path.
3. Build the threshold hero and responsive static section layouts.
4. Add crossing/video, craft, and dish-reel timelines with cleanup and reduced-motion branches.
5. Add micro-interactions, focus states, loading states, and fallback behavior.
6. Run browser QA, keyboard/accessibility checks, runtime/console checks, mobile profiling, and two bounded repair passes.

## Acceptance criteria

- One coherent direction is implemented; no three-concept detour.
- Every supplied visual used has a declared role and crop; unused assets stay untouched.
- Reservation is reachable from hero, persistent navigation, conversion interlude, and footer.
- The page works without animation and remains understandable with JavaScript disabled where practical.
- No horizontal document overflow, scroll traps, inaccessible dialogs, autoplay audio, or fabricated restaurant details.
- Motion is smooth on representative desktop and mobile profiles and fully respects reduced motion.

## Research basis

- GSAP ScrollTrigger updates scroll-linked animation in sync with animation frames and supports bounded triggers: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Web platform guidance recommends transform/opacity animation, reduced-motion alternatives, and measuring smoothness rather than adding motion indiscriminately: https://web.dev/articles/animations-and-performance
- Native View Transitions can preserve visual continuity while keeping a fallback path: https://web.dev/learn/css/view-transitions-spas
