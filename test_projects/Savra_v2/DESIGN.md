---
name: SAVRA
description: A nocturnal restaurant world that crosses cool petrol architecture into a warm dining ritual.
colors:
  petrol: "#173a42"
  petrol-dark: "#0d252b"
  oxblood: "#6d2924"
  amber: "#e2a94f"
  bone: "#e8e0d1"
  charcoal: "#111312"
  muted-bone: "#c8bdab"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(8.5rem, 25vw, 29rem)"
    fontWeight: 500
    lineHeight: 0.68
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3.8rem, 8vw, 8.5rem)"
    fontWeight: 500
    lineHeight: 0.82
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.45rem, 2vw, 2rem)"
    fontWeight: 500
    lineHeight: 1
  body:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.02em"
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
  interface:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  square: "0px"
  circle: "50%"
  pill: "100vmax"
spacing:
  page-pad: "clamp(1.25rem, 3vw, 3.75rem)"
  page-pad-compact: "clamp(1rem, 4vw, 2rem)"
  section-block: "clamp(6rem, 12vw, 11rem)"
components:
  button-reserve:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.charcoal}"
    typography: "{typography.interface}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.2rem 0.7rem 1.35rem"
    height: "2.9rem"
  button-reserve-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.charcoal}"
    typography: "{typography.interface}"
    rounded: "{rounded.pill}"
  button-reserve-oxblood:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.bone}"
    typography: "{typography.interface}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.35rem"
    height: "3.2rem"
  button-mobile:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.charcoal}"
    typography: "{typography.interface}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.25rem"
    height: "3.2rem"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0.8rem 0.15rem"
---

# Design System: SAVRA

## Overview

**Creative North Star: "The Nocturnal Threshold"**

SAVRA is a passage from cool architectural restraint into a warm dining ritual. Petrol and charcoal establish the night; amber, oxblood, bone linen, and supplied restaurant imagery reveal fire, table, and craft. The interface refuses a standard restaurant hero followed by interchangeable cards: its recurring grammar is the portal, the staged reveal, and the full-viewport room.

The system is editorial rather than ornamental. Monumental serif language carries atmosphere, condensed service typography carries action and explanation, and mono labels behave like quiet annotations. Controls stay compact and legible at the perimeter while imagery owns the center.

**Key Characteristics:**

- Cool petrol thresholds with a warm amber center.
- Full-bleed supplied photography, hard portal masks, and restrained material overlays.
- Monumental serif headlines paired with narrow service copy and mono annotations.
- Flat architectural surfaces, with lift reserved for floating actions and the modal layer.
- Desktop cinematic sequencing that becomes native, touch-first scrolling below 900px.

## Colors

The palette moves between cool nocturnal architecture and a small, deliberately warm ritual core.

### Primary

- **Threshold Petrol:** The principal architectural field for doors, entry scenes, and cool room transitions.
- **Deep Petrol:** The darker continuation used behind the crossing and closing layers.

### Secondary

- **Joinery Oxblood:** A grounded red-brown for craft fields, dividers, form focus, and reservation emphasis.
- **Lamp Amber:** The rare warm signal for the SAVRA wordmark, italic emphasis, selection, focus, and the mobile reservation action.

### Neutral

- **Bone Linen:** The light reading surface and default light-on-dark text color.
- **Night Charcoal:** The site ground, menu field, and dark text color on bone.
- **Muted Bone:** Secondary copy and low-priority metadata on dark imagery.

**The Temperature Crossing Rule.** A sequence begins cool and architectural, then earns amber or oxblood warmth at a moment of craft, food, or invitation.

**The Rare Amber Rule.** Amber is a focal signal, not a general fill; it marks names, emphasis, focus, selection, and the persistent mobile action.

## Typography

**Display Font:** Cormorant Garamond (with Georgia and generic serif fallbacks)  
**Body Font:** Barlow Condensed (with Arial Narrow and generic sans-serif fallbacks)  
**Label/Mono Font:** IBM Plex Mono (with a generic monospace fallback)

**Character:** The serif is soft, tall, and theatrical enough to occupy a viewport; the narrow sans keeps descriptions and controls efficient; the mono face turns captions, indices, and factual labels into precise service annotations.

### Hierarchy

- **Display** (500, fluid 8.5–29rem, 0.68 line-height): Reserved for the oversized SAVRA name and similarly singular brand-scale moments.
- **Headline** (500, fluid 3.8–8.5rem, 0.82 line-height): Section theses, usually balanced over two short lines with tight negative tracking.
- **Title** (500, fluid 1.45–2rem, 1 line-height): Dish names and compact editorial titles.
- **Body** (400, fluid 1–1.25rem, 1.55 line-height): Explanatory copy, typically constrained to roughly 25–31rem rather than spanning a full column.
- **Label** (500, 0.65–0.72rem, 0.05–0.14em letter spacing, uppercase): Navigation, captions, facts, indices, and prototype status.
- **Interface** (600, 0.72–0.78rem, 0.11–0.12em letter spacing, uppercase): Reservation actions and other compact controls.

**The Three Jobs Rule.** Serif creates desire, condensed sans explains or acts, and mono records; do not swap those jobs casually.

**The Short-Line Rule.** Atmospheric headlines are composed as two or three deliberate lines, not allowed to collapse into long prose measures.

## Layout

The page uses a fluid inline gutter and large fluid section padding, with content held inside editorial maxima of 88–98rem where a section needs a readable grid. The section grammar is sequential: threshold hero, crossing portal, anchored room with floating evidence, full-viewport craft triptych, horizontal seasonal menu, centered invitation, and image-backed closing field. Most major scenes occupy at least one small viewport height (`100svh`).

Desktop is intentionally asymmetric. The room pairs a sticky portrait anchor with a vertically paced image column; the crossing and craft sequences pin a stage; the menu pins a 24rem/35vw editorial column beside a horizontally translated dish track. Photography alternates portrait and landscape ratios and uses offset widths to prevent a repetitive card grid.

At 899px and below, the composition changes behavior rather than merely shrinking. Navigation and header reservation controls disappear, a safe-area-aware reservation bar becomes fixed at the bottom, sticky and pinned narratives become static, the room becomes one column, and the menu becomes a native horizontal scroll-snap strip with explicit previous/next buttons. At 620px and below, facts and form pairs become one column, menu metadata stacks, the invitation images become cropped edge fragments, and footer content stacks. The supported floor is 320px.

**The Native Mobile Rule.** Below 900px, prefer touch scrolling, scroll snap, and a persistent action over desktop pinning or horizontal scroll choreography.

**The Portal Sequence Rule.** Major sections should feel crossed or entered through framing, clipping, overlap, or a foreground edge; generic centered-card stacks do not belong in this world.

### Media Handling

The hero image is dimensioned, eagerly prioritized, and cropped with `object-fit: cover`; most subsequent images carry intrinsic dimensions, lazy loading, and asynchronous decoding. Desktop imagery is composed through explicit object positions, while the hero shifts its crop toward 40% on narrow screens. Menu images rest slightly desaturated and scale to 1.035 with full saturation on hover.

The crossing video is muted, looping, inline, and initially `preload="none"`. An intersection observer promotes it to metadata preload and plays it only near the viewport, pausing it when it leaves. A poster and ordered still images preserve the narrative frame while the video loads. The linen texture is decorative, grayscale, low-opacity, and multiplied beneath a bone overlay.

## Elevation & Depth

The system is flat by default and builds depth with photography, tonal layering, gradients, clip paths, blend modes, and overlap. Shadows appear only where a control or modal must detach from the scene; they are not a card-decoration language. The global amber halo is a very low-opacity screen blend and disappears on touch layouts and in reduced-motion mode.

### Shadow Vocabulary

- **Action lift** (`0 10px 28px rgb(17 19 18 / 0.22)`): Reserve-button hover only.
- **Persistent mobile lift** (`0 12px 34px rgb(0 0 0 / 0.3)`): Keeps the bottom reservation bar above moving imagery.
- **Modal lift** (`0 28px 80px rgb(0 0 0 / 0.45)`): Separates the reservation dialog from its darkened, blurred backdrop.
- **Focused field rule** (`0 2px 0` in oxblood): Reinforces the active underline without rounding or filling the field.

**The Flat Architecture Rule.** Use borders, tonal fields, crop, and overlap for structure; reserve shadow for an action that floats or a layer that must interrupt the page.

## Shapes

The dominant form language is hard-edged and architectural. Sections, images, cards, dialog surfaces, and fields are square; narrow one-pixel rules divide facts and metadata. Full pills are reserved for reservation actions, while circular controls are reserved for the menu arrows. Portal clipping and tall arch imagery supply the expressive silhouettes instead of decorative corner radii.

**The Soft Action, Hard Field Rule.** Calls to reserve are pill-shaped; reading surfaces and data-entry fields stay square.

## Components

### Reservation Buttons

- **Shape:** Full pill with a 2.9–3.2rem minimum height.
- **Primary:** Bone on charcoal/petrol scenes; the invitation and dialog use oxblood on bone; mobile uses amber on charcoal.
- **Hover / Focus:** Fine-pointer hover changes the light button to amber, lifts it with the action shadow, and shifts the inline arrow 3px. All controls inherit a visible 2px amber focus outline with a 5px offset.
- **Motion:** On fine pointers and only when motion is allowed, the reusable reserve button follows the pointer within an 8px magnetic range. The mobile bar remains stable.

### Navigation

The fixed 5.25rem desktop header is a four-part perimeter grid with a small tracked serif brand, location label, two underlined-on-hover links, and the reservation pill. It uses difference blending so light navigation survives mixed imagery. Below 900px it becomes a 4.5rem two-column header containing only the brand; the bottom reservation bar takes over the primary action.

### Dish Rail

Dish cards are frameless image-and-metadata units rather than raised containers. A tall cover image sits above a ruled three-column line for index, serif dish title, and right-aligned mono technique/detail. Desktop translates the whole rail through a pinned ScrollTrigger; mobile uses native overflow, center snapping, and 3rem circular arrow controls. At 620px, technique/detail moves below the title.

### Facts and Captions

Room facts use oxblood top and bottom rules with three structured label/value rows. Figure captions, movement notes, indices, and factual caveats use small uppercase mono or narrow text. Missing operational details remain explicitly marked “forthcoming” or “to be connected”; a label must never visually imply that an unknown fact is confirmed.

### Reservation Dialog and Fields

The native modal dialog is a bone reading surface capped by a 0.55rem oxblood rule and separated with a deep shadow plus a dark blurred backdrop. Its form uses paired columns above 620px and one column below. Labels are small uppercase mono; inputs are transparent, square, and underline-only, shifting to oxblood with a 2px reinforcement on focus. Submission replaces the form with an explicit staged-success state rather than claiming a booking.

### Motion and Reduced Motion

The standard state easing is `cubic-bezier(0.16, 1, 0.3, 1)`. When motion is allowed, the hero opens through a 1.65s portal reveal, typography follows, scroll-linked desktop scenes scrub crossing, craft, room drift, and the menu rail, and ordinary content rises once into view. Optional View Transitions wrap dialog opening where supported.

With `prefers-reduced-motion: reduce`, GSAP sequences and fine-pointer magnetic effects do not initialize; CSS animation and transition durations collapse to 0.01ms; smooth document scrolling becomes automatic; clip paths are removed; pinned-height sections flatten; later craft panels and the ambient halo disappear. The still, readable composition is the intended fallback.

### Accessibility

The implementation includes a keyboard-revealed skip link, semantic landmarks and labelled sections, visible global focus treatment, labelled carousel controls, explicit form labels and autocomplete hints, intrinsic media dimensions, useful image alternatives, empty alternatives for redundant crossing stills, and a native dialog. The mobile menu preserves native scrolling, and body scrolling is locked only while the dialog is open.

### Known Deployment Debt

- Cormorant Garamond, Barlow Condensed, and IBM Plex Mono are self-hosted through Latin-only Fontsource imports in `src/main.tsx`; retain those local packages or provide equivalent licensed files if the delivery stack changes.
- The reservation form has no transport or booking-provider integration. It only stages local success and must keep its prototype disclosure until a real provider, failure path, consent handling, and confirmed contact details exist.
- Address, service days/hours, direct contact, pricing, and reservation lead time remain intentionally unconfirmed in the product and interface.
- Reduced-motion currently disables the authored GSAP and CSS sequences, but the intersection observer can still play the muted crossing video and menu arrow controls still request smooth programmatic scrolling. A production accessibility pass should gate both behaviors on the same media query.
- Images ship as local JPEG assets without responsive `srcset`/`picture` variants, and the crossing is a single MP4 source. Intrinsic dimensions and lazy loading mitigate layout and transfer cost, but production media derivatives remain outstanding.
- The document head supplies title, description, viewport, and theme color only; no social-sharing metadata or favicon declarations are present in the reviewed entry point.

## Do's and Don'ts

### Do:

- **Do** begin major narrative passages in petrol or charcoal and earn amber or oxblood warmth through content.
- **Do** keep the supplied room, craft, food, linen, and entrance imagery as the source of atmosphere.
- **Do** use monumental serif type for a few decisive statements and compact mono/narrow type for service information.
- **Do** preserve the behavioral handoff at 899px: desktop choreography becomes native mobile scroll and snap.
- **Do** retain visible focus, the skip link, semantic labels, useful alternatives, and the native dialog behavior.
- **Do** keep every unknown venue or booking detail explicitly marked as forthcoming, prototype, or to be connected.

### Don't:

- **Don't** turn the page into a generic hero followed by a uniform grid of rounded restaurant cards.
- **Don't** use amber as a broad background or distribute all palette colors with equal weight.
- **Don't** add rounded containers, ornamental shadows, or glass surfaces beyond the documented action and modal layers.
- **Don't** carry desktop pinning, magnetic movement, or staged clip-path reveals into touch or reduced-motion paths.
- **Don't** invent menu pricing, service schedules, address, contact, testimonials, press, or reservation confirmation.
- **Don't** treat fallback fonts, prototype submission, or non-responsive media as production-complete.
