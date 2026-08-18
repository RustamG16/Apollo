# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated and authorized by the user: a minimal Vite + React + TypeScript project, with GSAP and `@gsap/react` only where the approved narrative requires them. No UI kit, WebGL, smooth-scroll library, CMS, database, or booking SDK.

## Users

Primary users are design-aware Vienna locals, special-occasion diners, and culinary travelers looking for a premium intimate dining concept. They arrive deciding whether the atmosphere and point of view are compelling enough to begin a reservation.

## Product Purpose

SAVRA is a synthetic single-page concept for a fictional fire-led Eastern Mediterranean tasting-menu restaurant in Vienna. The page should build reservation intent and let a visitor explore a polished reservation demo. Success is demo reservation engagement, not a real booking or claimed conversion result.

## Positioning

The experience frames dining as an after-hours passage from threshold to fire, plate, craft, room, and one waiting table, using the supplied media as its narrative material.

## Operating Context

Visitors browse on desktop or mobile, often under low ambient light, scan atmosphere and plates, and need a clear path to “Reserve a Table.” The reservation interaction is a local demo and must disclose that nothing is submitted.

## Capabilities and Constraints

- One route: `/`.
- Primary action: **Reserve a Table**.
- Reservation demo may collect only transient interface choices; it does not connect to a booking service and must not collect personal data.
- Native browser scrolling; purposeful GSAP only; complete reduced-motion behavior.
- WebGL, external generation, stock purchasing, real analytics connection, and deployment are out of scope.
- No claims about real operation, address, chef, availability, prices, awards, reviews, certifications, or customers.
- Undecided and deliberately absent: deployment target, real booking provider, real restaurant facts, verified releases/licensing, and analytics baseline.

## Brand Commitments

- Name: SAVRA.
- Locked palette: Hunyadi Yellow `#E09F3E`, Auburn `#9E2A2B`, Dark Slate Gray `#335C67`, Vanilla `#FFF3B0`.
- Dark Slate Gray dominates; Vanilla anchors light content; Auburn is architectural focus; Hunyadi Yellow is limited fire/light.
- The supplied palette image is evidence only. Its icon, lettering, labels, and four-panel composition must not be copied.
- Voice: concise, atmospheric, specific to fire and Eastern Mediterranean ritual, and honest about fictional status.

## Evidence on Hand

- Thirty supplied JPEG images and one supplied MP4 in `media/`; originals remain read-only.
- Media metadata, role classification, and contact sheet are recorded in `.olympus/01-audit.md` and `.olympus/evidence/`.
- No Figma, font license, analytics account, user research, releases, real menu, real address, or live booking integration was supplied. Future work must not fabricate them.

## Product Principles

1. Make the reservation action visible before, during, and after the narrative.
2. Let supplied media carry the story; interface chrome stays subordinate.
3. Treat synthetic imagery as concept material, never documentary proof.
4. Preserve the same content and action in full-motion and reduced-motion modes.
5. Earn visual ambition through hierarchy, pacing, crop discipline, and performance rather than added spectacle.

## Accessibility & Inclusion

Semantic landmarks and headings, keyboard-visible focus, dialog focus management, text contrast, useful alt text, empty alt for decorative imagery, responsive behavior down to 360px, and a complete `prefers-reduced-motion` experience are required.

