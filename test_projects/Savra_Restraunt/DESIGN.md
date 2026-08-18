---
name: SAVRA
description: An after-dark threshold ritual shaped by fire, material, and one waiting table.
colors:
  dark-slate: "#335c67"
  vanilla: "#fff3b0"
  auburn: "#9e2a2b"
  hunyadi-fire: "#e09f3e"
typography:
  display:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(4rem, 10vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.78
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.35rem, 5vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "0.69rem"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.16em"
rounded:
  square: "0"
  disc: "50%"
spacing:
  page-inline: "clamp(1.25rem, 4vw, 4.75rem)"
  section-block: "clamp(5.5rem, 11vw, 10rem)"
  control-inline: "1.2rem"
  control-block: "0.82rem"
components:
  button-fire:
    backgroundColor: "{colors.auburn}"
    textColor: "{colors.vanilla}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "{spacing.control-block} {spacing.control-inline}"
    height: "3.1rem"
  button-fire-hover:
    backgroundColor: "{colors.vanilla}"
    textColor: "{colors.dark-slate}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "{spacing.control-block} {spacing.control-inline}"
    height: "3.1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.vanilla}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "{spacing.control-block} {spacing.control-inline}"
    height: "3.1rem"
  header-reserve:
    backgroundColor: "transparent"
    textColor: "{colors.vanilla}"
    rounded: "{rounded.square}"
    padding: "0.6rem 1rem"
    height: "2.8rem"
  choice-selected:
    backgroundColor: "color-mix(in srgb, #9e2a2b 48%, transparent)"
    textColor: "{colors.vanilla}"
    rounded: "{rounded.square}"
    padding: "1rem"
---

# Design System: SAVRA

## Overview

**Creative North Star: "The Threshold Ritual"**

SAVRA behaves like an after-dark passage rather than a conventional restaurant catalogue. Full-bleed synthetic media establishes the room and food, while large serif statements, narrow uppercase labels, long rules, and abrupt fields of color pace the visitor from threshold to fire, craft, and one waiting table.

The system is cinematic but controlled. Dark Slate is the dominant atmosphere, Vanilla provides illuminated editorial relief, Auburn forms architectural interruptions and decisive actions, and Hunyadi Fire appears as a scarce point of heat. Square geometry and sparse chrome keep the imagery in command; motion reveals the path without replacing the content.

**Key Characteristics:**

- Full-viewport media chapters with directional shade overlays
- Editorial serif scale paired with compact uppercase utility labels
- Square-edged controls, panels, and image crops
- Alternating Dark Slate, Vanilla, and Auburn fields
- Hunyadi Fire reserved for focus, progress, selection, and ritual marks
- Responsive 12/8/4-column composition with a linear mobile reading order

## Colors

The palette is mineral and fire-lit: one dominant cool field, one warm reading surface, one architectural red, and one deliberately scarce flame accent.

### Primary

- **Dark Slate** (`colors.dark-slate`): The default page, header, footer, dialog, and cinematic-overlay color. It carries the after-dark atmosphere and is the system's dominant field.
- **Auburn Threshold** (`colors.auburn`): The architectural focus color for chapter fields, primary actions, selected choices, and the vertical threshold mark.

### Secondary

- **Hunyadi Fire** (`colors.hunyadi-fire`): A limited ignition color for focus outlines, progress, rules, glyphs, scrollbar thumbs, and selected controls. It is an accent, not a background system.

### Neutral

- **Vanilla Light** (`colors.vanilla`): The warm reading surface and default foreground on dark fields. It also supplies hairline borders and the light hover state of primary actions.

**The Scarce Flame Rule.** Hunyadi Fire marks heat, direction, focus, or progress; it does not fill ordinary content surfaces.

**The Alternating Field Rule.** Chapters gain rhythm by moving between solid Dark Slate, Vanilla, and Auburn fields, not by introducing additional palette colors.

## Typography

**Display Font:** Georgia (with Times New Roman and serif fallbacks)  
**Body Font:** Arial (with Helvetica and sans-serif fallbacks)

**Character:** The serif is atmospheric, literary, and deliberately large; the sans serif is direct and unobtrusive. Tight serif spacing creates the dramatic voice, while tracked uppercase labels supply orientation and operational clarity.

### Hierarchy

- **Display** (`typography.display`): The split SAVRA hero wordmark, stretched across the grid with an unusually compressed line height.
- **Headline** (`typography.headline`): Section-scale statements, balanced and generally held to approximately 18 characters per line.
- **Title** (`typography.title`): Plate chapter titles, held to approximately 13 characters per line to maintain sculptural wrapping.
- **Body** (`typography.body`): Narrative copy and disclosure text. Important paragraphs are typically constrained between 38 and 62 characters per line.
- **Label** (`typography.label`): Section names and concept labels in uppercase; nearby navigation and caption labels use closely related compact, tracked sans-serif treatments.

**The Two-Voice Rule.** Use Georgia for atmosphere and Arial for navigation, labeling, disclosure, and action; do not introduce a third typographic voice.

**The Short Serif Rule.** Large serif copy remains concise and width-constrained so its line breaks behave as composition, not as long-form prose.

## Layout

Desktop composition uses a 12-column grid with fluid page insets (`spacing.page-inline`) and generous vertical chapter spacing (`spacing.section-block`). Sections frequently overlap media and copy across unequal column spans: imagery commonly occupies seven or eight columns while copy sits in the remaining four. Full-height hero, room, and reservation stages create the major beats; intervening editorial sections use asymmetry and deliberate negative space.

At 900px and below, the primary composition contracts to eight columns, navigation becomes a full-width drop panel, and the header reservation control yields to the menu. At 680px and below, layouts become four-column or linear, page insets settle at 1.15rem, chapter spacing settles at 5.5rem, video is replaced by its poster, and the reservation action becomes a fixed bottom bar. Plate imagery changes crop and height by chapter rather than forcing one universal aspect ratio.

**The Native Passage Rule.** Preserve normal document flow and native scrolling. Responsive layouts retain the same narrative order and reservation path without depending on pinned or animated states.

## Elevation & Depth

The system is flat by default. Depth comes from full-bleed photography, color-field changes, image clipping, translucent shade gradients, and the fixed header's blurred Dark Slate layer. The reservation dialog is the only materially lifted surface, using a deep ambient shadow (`0 1.5rem 4rem color-mix(in srgb, var(--slate) 72%, transparent)`) above a blurred Dark Slate backdrop.

**The One Lifted Surface Rule.** Keep chapters, cards, controls, and navigation shadowless; reserve ambient elevation for the modal reservation layer.

## Shapes

The form language is rectilinear. Buttons, the dialog, choice cards, image frames, color fields, and progress tracks use square corners (`rounded.square`). Circular geometry (`rounded.disc`) is rare and symbolic: it appears only in the Hunyadi Fire disc and the dot embedded in the threshold mark. Borders are one-pixel hairlines derived from the current foreground, with a two-pixel Hunyadi edge reserved for the mobile reservation bar.

**The Cut-Stone Rule.** Default to hard edges and flush crops; circles are ritual marks, not a general component style.

## Components

### Buttons

- **Shape:** Square, bordered, and compact, with a minimum height of 3.1rem for the shared button primitive.
- **Primary:** Auburn Threshold fill, Hunyadi Fire border, and Vanilla Light text using the compact uppercase label voice.
- **Hover / Focus:** Primary actions lift by 2px and invert to Vanilla Light with Dark Slate text over 240ms; keyboard focus uses a 3px Hunyadi Fire outline offset by 4px.
- **Ghost:** Transparent with a current-color border and Vanilla Light text. Disabled buttons retain layout but reduce opacity to 0.45 and use a not-allowed cursor.
- **Header:** A smaller transparent Vanilla Light outline control that fills Vanilla Light and switches to Dark Slate text on hover.

### Chips

No standalone chip system is implemented. Reservation options use full choice cards rather than pills or compact tags.

### Cards / Containers

- **Corner Style:** Square with clipped media.
- **Background:** Craft cards are image-led and transparent within an Auburn field; reservation choice cards begin transparent and gain a translucent Auburn selection field.
- **Shadow Strategy:** Flat at rest; cards never receive drop shadows.
- **Border:** Choice cards use a foreground-derived hairline that changes to Hunyadi Fire on hover and selection.
- **Internal Padding:** Choice cards use 1rem; image captions sit inside a 1rem edge with a hairline rule above.

### Inputs / Fields

- **Style:** The reservation flow uses native radio inputs positioned inside large square choice cards; the radio accent is Hunyadi Fire.
- **Focus:** Global keyboard focus is a 3px Hunyadi Fire outline with 4px separation. Hovered and selected cards add a Hunyadi border and translucent Auburn field.
- **Disabled:** Continue actions remain visible at 0.45 opacity until the current choice is complete. No text-entry, error, or validation field style is implemented.

### Navigation

Desktop navigation centers compact uppercase links in the translucent fixed header. Hover and keyboard focus grow a one-pixel Hunyadi underline from right to left. At 900px, it becomes a Vanilla Light full-width drop panel with large Georgia links, Dark Slate text, and horizontal separators; the explicit header reservation action is hidden.

### Reservation Dialog

The dialog is a square Dark Slate surface with a Vanilla Light hairline and one ambient shadow. Its three-step progress line uses Hunyadi Fire for completed/current segments. Desktop width is capped at 52rem; below 680px the dialog becomes a borderless, full-viewport sheet with an internally scrolling shell. Confirmation retains the same palette and introduces one circular fire mark.

### Mobile Reservation Bar

At 680px and below, a fixed full-width Auburn Threshold bar anchors the viewport with a two-pixel Hunyadi Fire top edge. It preserves the primary reservation action while the visitor moves through the long-form narrative.

## Do's and Don'ts

### Do:

- **Do** let supplied media occupy full or dominant fields, with interface chrome subordinate to the image and copy.
- **Do** use Dark Slate as the dominant atmosphere, Vanilla Light as illumination, Auburn Threshold as architecture, and Hunyadi Fire as a scarce signal.
- **Do** preserve hard-edged geometry, hairline rules, short serif statements, and compact tracked labels.
- **Do** retain equivalent content, reading order, and reservation access when motion is reduced or media changes for mobile.
- **Do** use translucent color mixes of the established palette for overlays, muted text, borders, and selected states.

### Don't:

- **Don't** add rounded cards, pill controls, soft UI shells, or decorative shadows to ordinary surfaces.
- **Don't** introduce additional accent colors or use Hunyadi Fire as a large ambient fill.
- **Don't** add a third font family or turn large serif statements into dense paragraphs.
- **Don't** make navigation, motion, or pinned scenes prerequisites for understanding the page or opening the reservation demo.
- **Don't** style synthetic concept media as documentary proof or remove the implemented illustrative disclosures.
