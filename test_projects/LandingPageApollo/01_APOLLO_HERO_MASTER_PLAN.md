# APOLLO SYSTEM — HERO SCROLL FILM
## Master plan: self-generated continuity pipeline

Version: 2026-09-04  
Purpose: Produce a scroll-controlled cinematic hero as one apparent camera take, using one Google Flow project and only the saved character assets `@Apollo` and `@Rustam`.

## Non-negotiable production rule

Do not collect, upload, or search for theatre, orchestra, lighting, room, hand, storyboard, or mood-board reference images. The production system must generate these inside Flow.

The first approved generated still is the **World Lock**. Every later still and clip must inherit from an approved generated predecessor. A new scene is never invented from text alone after the World Lock. This is the continuity mechanism that prevents identity, architecture, lighting, and camera-direction morphing.

## Inputs

- `@Apollo`: Apollo identity master. Preserve face, age, hair, proportions, and recognizable character design.
- `@Rustam`: creator identity master. Use only where the creator or his arm/hand is visible; do not redesign him.
- Generated assets made in this Flow project: the sole visual source for environment, wardrobe extension, orchestra, room, hand action, and camera path.

## Visual world

A photoreal, low-key Neo-Athenian theatre: dark stone and black architectural surfaces, selective marble columns and statues, bronze, deep-red velvet curtains, practical backstage rigging, warm tungsten stage light, and very thin cyan structural accents. It is cinema, not concept art: restrained film grain, gentle halation, natural materials and readable blacks. Avoid neon-city styling, particles, fog, hologram clutter, fantasy effects, plastic skin, excessive bloom, and text baked into imagery.

## Story and scroll path

1. **0–12% — Backstage approach.** Camera advances through a calm, dark backstage toward closed red curtains; quiet upper-left text space.
2. **12–22% — Curtain reveal.** Curtains open as camera crosses the line. Apollo is already standing on stage, with the orchestra deeper in view.
3. **22–40% — Apollo orbit.** A graceful 280–330° curved orbit with a modest elevation shift. Apollo begins conducting; switch the text-safe side during the move.
4. **40–55% — Orchestra glide.** Camera releases into a real aisle between musicians. Apollo remains intermittently visible in depth.
5. **55–67% — Skill swap.** One featured musician completes a phrase, safely lowers instrument A, takes instrument B, and continues. An optional distant substitute-player change stays secondary.
6. **67–78% — Design manifestation.** The performance resolves grids, type hierarchy, components, and layout frames into the theatre architecture—not generic floating dashboards.
7. **78–86% — Corner approach.** Camera enters one genuine lower theatre corner and looks diagonally toward its opposite upper corner. Website copy fades away.
8. **86–94% — Open-boundary reveal.** It tilts upward along that diagonal. The theatre has no conventional roof; it opens into a much larger, generated real-world studio. This must not look like a box.
9. **94–100% — Hand grab.** `@Rustam`'s realistic hand has already started entering from the opposite upper corner. It reaches diagonally, physically grips the camera, causes a subtle contact reaction, then pulls it into the generated studio.

## Generated asset chain

Approve each item before using it as the next input. Name it in Flow exactly as shown.

| Order | Generated asset | Derived from | Purpose |
|---|---|---|---|
| 1 | `GEN_WORLD_LOCK` | `@Apollo`, `@Rustam` | Canonical theatre, Apollo wardrobe extension, palette, lens, orchestra language, and generated studio endpoint. |
| 2 | `GEN_FRAME_01_CURTAIN_START` | `GEN_WORLD_LOCK` | Backstage entrance anchor. |
| 3 | `GEN_FRAME_02_APOLLO_REVEAL` | frame 01 | Curtain-open / Apollo-on-stage anchor. |
| 4 | `GEN_FRAME_03_ORBIT_EXIT` | frame 02 | Orbit exit facing the orchestra aisle. |
| 5 | `GEN_FRAME_04_SKILL_SWAP` | frame 03 | Featured-player action anchor. |
| 6 | `GEN_FRAME_05_DESIGN_MANIFEST` | frame 04 | Architectural design-system anchor. |
| 7 | `GEN_FRAME_06_CORNER` | frame 05 | Lower-corner anchor before upward tilt. |
| 8 | `GEN_FRAME_07_OPEN_TOP` | frame 06, `@Rustam` | Open-boundary and generated-studio anchor. |
| 9 | `GEN_FRAME_08_HAND_GRAB` | frame 07, `@Rustam` | Hand-contact endpoint. |

## Video assembly rule

Generate each clip from the prior approved frame and save its strongest last frame. That saved output becomes the next clip's start-frame reference. Do not regenerate the whole film to repair a local defect.

- `CLIP_A`: frame 01 → frame 02 — backstage push and curtains.
- `CLIP_B`: frame 02 → frame 03 — Apollo orbit into orchestra.
- `CLIP_C`: frame 03 → frame 05 — aisle glide, skill swap, design manifestation.
- `CLIP_D`: frame 05 → frame 08 — corner, tilt, open boundary, hand grab.

At every join lock: Apollo identity, theatre plan, statue and curtain placement, orchestra clothing, lighting direction, palette, lens character, camera height/direction, and generated-studio design. Motion must continue forward at normal speed without dissolves, portals, or scene-change morphing.

## Acceptance test

The viewer should understand Apollo controls a coordinated, customizable agent system whose performance makes a design system, then discover the system is held in the creator’s larger reality. The result should read as one premium film take even though it is built from connected clips.
