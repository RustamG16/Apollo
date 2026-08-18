# Approved build plan — The Threshold Ritual

## Direction contract

- **Mode:** Persuade.
- **Thesis:** turn the supplied thresholds, plates, craft, room, and waiting table into one reservation-intent journey; refuse the generic restaurant stack of hero, menu cards, testimonials, map, and footer.
- **Physical scene:** design-aware diners browse after dark on phone or laptop; a slate-dark field, auburn architectural planes, Vanilla reading light, and rare Hunyadi fire marks match that low-light context.
- **Impeccable seed:** `6b441450`, assigned slot 4. The user-pinned Threshold Ritual beats the external roll. Challenger verdicts: city nocturne declined (competing cobalt/weak restaurant clarity); jacquard declined (abstract/competing gold); Stenberg declined (aggressive public-poster voice); Merz collage declined (clarity/premium mismatch); data-sublime declined (off-brand/strobe risk); darkroom competitive on after-hours emergence but loses restaurant clarity. Kept disciplines—not motifs—are temporal banding, traceable craft, decisive scale, responsive repacking, reduced-motion rigor, and one slow reveal.
- **Build path:** code-led. No image-generation comp is required; the first-viewport contract and signature threshold interaction carry the ambition.

## Scope

- Route: `/` only.
- Production files: Vite/React/TypeScript scaffold, `src/` components/styles, `public/media/` derivatives, and package lock.
- Components: `App`, `Header`, `Hero`, `ThresholdStatement`, `PlateChapter`, `MaterialRoom`, `ProcessCraft`, `ReservationCulmination`, `ReservationDialog`, `Footer`, and small analytics/motion hooks.
- Out of scope: deployment, live booking, personal-data collection, CMS/database, authentication, real claims, stock/downloaded fonts, WebGL, custom smooth scrolling, UI kit.

## Content and story

1. **Arrival:** “After hours, the room begins with fire.” SAVRA and a visible Reserve a Table action sit inside the first viewport.
2. **Point of view:** concise fictional positioning—Eastern Mediterranean ingredients guided by flame, smoke, ember, patience.
3. **Signature plates:** three concept plates—charred flatbread, lamb and sour cherry, beetroot and labneh—explicitly presented as concept-menu language, with no prices or availability.
4. **Space/materiality:** slate, linen, auburn lacquer, low table light; no real-address claim.
5. **Craft:** anonymous synthetic process imagery; language focuses on gestures, not a named chef.
6. **Reservation culmination:** waiting table and accessible demo stepper; “No booking is sent.”
7. **Footer:** “SAVRA is a fictional restaurant concept created for a design demonstration.”

## Visual system

- Colors: `--slate #335C67`, `--vanilla #FFF3B0`, `--auburn #9E2A2B`, `--hunyadi #E09F3E`; tints use CSS color mixing/alpha of these four only, never a fifth hue.
- Type: self-host no font. Use `Georgia, 'Times New Roman', serif` for display only because the runbook prefers a practical system stack; body/UI uses `Arial, Helvetica, sans-serif`. Distinction comes from scale, weight, spacing, case, and composition rather than font downloading.
- Grid: 12 columns desktop, 8 tablet, 4 mobile; deliberate overlap only above 900px. Content measure 68–72ch.
- Shape: architectural rectangular frames, clipped doorway masks, thin rules, and one curved circular fire mark; no generic rounded cards, decorative glass, gradients, or repeated icon tiles.
- Browser surfaces: palette selection, focus ring, caret, scrollbar, underlines, dialog backdrop, and form controls.

## Media loading

- Generate WebP widths documented in `05-asset-manifest.md`; copy MP4 byte-for-byte.
- Hero poster is eager with `fetchpriority="high"`; video uses poster, `muted`, `playsInline`, `loop`, and `preload="metadata"`.
- Reduced-motion media query prevents autoplay and hides the video in favor of the poster.
- Below-fold images use `loading="lazy"`, `decoding="async"`, explicit `width`/`height`, and `<picture>` mobile art direction where documented.
- No runtime hotlinks. If video fails, the poster remains visible and the narrative stays complete.

## Motion contract

| Interaction | Purpose | Trigger | Duration/easing | Interruptible | Reduced-motion behavior |
|---|---|---|---|---|---|
| Hero entrance timeline | Establish threshold ritual and action hierarchy | first client render | 0.6–1.2 s, `power3.out`, labeled timeline | Yes; content visible by default | No animation; poster and final composition immediately visible |
| Threshold mask | Make crossing spatially legible | scroll through point-of-view section | `clip-path`/scale transform, scrub 0.6 | Scroll-controlled | Static open doorway image, no scrub |
| Plate chapters | Change rhythm and emphasize three concept plates | each chapter enters 75% viewport | 0.7 s transform/opacity, `power3.out` | Yes; one-shot | Static final states |
| Material-to-room reveal | Connect surface detail to the imagined room | desktop ≥960px only | one pinned top-level timeline, scrub 0.8, bounded to 110vh | Scroll-controlled | Unpinned stacked material + room images |
| Craft triptych | Show a sequence of anonymous gestures | section entrance | stagger 0.12, 0.65 s | Yes | All panels static |
| Reservation dialog | Orient step changes without spectacle | open/next/back | 0.28–0.42 s, `power2.out` | Yes | Instant state update; focus management unchanged |

## GSAP lifecycle

- Register `useGSAP` and `ScrollTrigger` once.
- Scope selectors to the page root or component refs.
- Use `gsap.matchMedia()` branches for `(min-width: 960px) and (prefers-reduced-motion: no-preference)`, smaller full-motion screens, and reduced motion.
- Put ScrollTrigger on top-level tweens/timelines, never child tweens. Use either scrub or toggle actions, not both.
- Create triggers in document order; use stable IDs; no markers in production.
- `useGSAP` and matchMedia revert cleanly on unmount/update. Refresh once after hero media is ready and after dialog layout changes only when needed.
- Prefer transform, opacity, and bounded clip-path; no layout-property animation or persistent `will-change`.

## Responsive rules

- 1440/1280: full 12-column choreography; hero typography spans left and bottom; one room pin.
- 768: 8-column editorial stack; no pin; video may play only when motion is allowed; process becomes two-plus-one composition.
- 390/360: 4-column; portrait art direction A05/A08/A14; hero uses portrait still rather than video; no overlapping copy/media that harms reading; sticky reserve control appears after hero; touch targets ≥44px.
- No horizontal scrolling; CSS uses `min-width: 0`, clamped type, safe-area padding, and container-aware gaps.

## Reservation demo

- Use native `<dialog>` as a protected-focus task: steps are party size, preferred moment (illustrative), and confirmation.
- Buttons, not clickable divs. Escape closes; close button is always visible; focus returns to opener.
- No names, email, phone, address, or free text. Values live only in React state and are discarded on close/refresh.
- Submit action renders a demo confirmation: “This is a concept demo. No reservation was sent.”
- Loading/disabled/error semantics: next disabled until selection; no external request; a noscript-like static fallback remains the Reserve CTA plus disclosure.

## Accessibility

- Semantic header/nav/main/sections/footer; one H1; ordered H2/H3 hierarchy.
- Skip link, visible 3px Hunyadi focus ring with Slate offset, and underline-based links.
- Meaningful alt text from the asset manifest; decorative material texture has empty alt.
- Body and control text target 4.5:1; large display target 3:1; all media copy uses solid/scrimmed surfaces.
- Dialog label/description, `aria-live` confirmation, radiogroup/fieldset semantics, and focus return.
- Reduced-motion mode is logged once locally and exposes identical content/action.

## Performance budget

- Initial transferred media target: ≤500 KiB poster + CSS/JS; video not preloaded beyond metadata.
- Production JS target: ≤220 KiB gzip including GSAP/React; CSS target ≤35 KiB gzip.
- Total selected local media derivatives may exceed initial budget but below-fold assets remain lazy.
- No layout shift from images; explicit aspect ratios and dimensions.
- No third-party runtime, font download, fake loader, or smooth-scroll main-thread cost.

## Analytics event contract

Implement a development-safe `trackSavraEvent()` logger with no network request, cookie, persistent identity, personal data, or animation-event spam. Required events: `savra_page_view`; `savra_nav_select {destination}`; `savra_menu_dish_view {dish_id, source}` once per plate per page view; `savra_reservation_open {source}`; `savra_reservation_step {step, direction}`; `savra_reservation_submit_demo {source}`; `savra_motion_mode {mode}` once.

## Implementation slices

1. Create scaffold and media derivatives; verify source mapping.
2. Build semantic static hierarchy and responsive visual system with all content visible.
3. Add reservation demo and local analytics logger.
4. Add scoped responsive GSAP motion and reduced-motion branches.
5. Production build, mechanical design detector, browser QA, at most two repair cycles, then metrics/handoff and Gate C.

## Fallbacks

- JavaScript disabled: core page content, anchor navigation, images, and reservation disclosure remain; dialog button is hidden or links to the final section.
- Video blocked/fails: poster only.
- WebP unsupported: modern Vite target assumes current browsers; original JPEG fallback may be added if actual QA target demonstrates need.
- GSAP unavailable: default CSS renders all content in final state; no CSS sets essential content to hidden.
- Reduced motion: no autoplay, scrub, pin, or entrance timelines.

