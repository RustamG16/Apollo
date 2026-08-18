# Existing-media manifest — The Threshold Ritual

All sources are supplied synthetic concept inputs. The originals remain read-only in `media/`. This manifest authorizes only local WebP derivatives and one byte-identical public copy of the MP4; it does not establish ownership, releases, or rights beyond the user's supplied-project context.

| ID | Source filename | Section / purpose | Output | Source dimensions | Safe crop / responsive behavior | Alt / decorative | Acceptance criteria | Fallback |
|---|---|---|---|---:|---|---|---|---|
| A01 | `Restaurant_entrance_view_for_hero_202608110048.jpeg` | Hero poster and reduced-motion hero | `public/media/hero-entrance-{640,1376}.webp` | 1376×768 | Preserve auburn door and table; center 16:9; mobile uses A13 portrait instead | Meaningful: “A single table glimpsed through an auburn doorway.” | Door/table remain legible; no over-sharpening; copy contrast ≥4.5:1 on scrim | Original JPEG via dev-only source mapping |
| A02 | `Camera_tracking_through_dining_room_202608110048.mp4` | Full-motion hero ambience | `public/media/hero-arrival.mp4` (byte-identical copy) | 1280×720, 8 s, avc1 | `object-fit: cover`; center; hidden for reduced motion and small data preference where detectable | Decorative video; poster carries meaning | Muted, inline, loop, no controls, `preload="metadata"`; no autoplay under reduced motion | A01 poster |
| A03 | `Camera_crossing_threshold_toward…_202608110048.jpeg` | Arrival threshold divider | `public/media/threshold-crossing-{640,1376}.webp` | 1376×768 | Keep doorway opening centered; never crop beyond inner frame | Meaningful | Threshold shape survives 390px crop | A01 |
| A04 | `Flatbread_with_butter_and_oil_202608110048.jpeg` | Plate I desktop — bread/fire opening | `public/media/plate-bread-wide-{640,1376}.webp` | 1376×768 | Center plate; retain oil and butter companions | Meaningful: “Charred flatbread with butter and oil on dark stone.” | Plate stays crisp at displayed width; lazy below fold | A05 portrait |
| A05 | `Flatbread_served_with_smoked_butter_202608110048.jpeg` | Plate I mobile/portrait | `public/media/plate-bread-portrait-{448,896}.webp` | 896×1200 | Preserve full bread ellipse and side bowl | Same meaning as A04 | No tight secondary crop | A04 |
| A06 | `Lamb_backstrap_with_cherry_glaze_202608110048.jpeg` | Plate II — ember / main plate | `public/media/plate-lamb-{640,1376}.webp` | 1376×768 | Hold plate left-center and black glass; use `object-position: 54% 50%` | Meaningful | Dark plate details remain separated from background | A12 sea-bass portrait |
| A07 | `Salt-baked_beetroot_dish_on_plate_202608110048.jpeg` | Plate III desktop — earth | `public/media/plate-beet-wide-{640,1376}.webp` | 1376×768 | Keep full plate and garnish; center-right | Meaningful: “Beetroot, herbs and pale cream on dark slate.” | Color remains auburn-compatible without recoloring | A08 portrait |
| A08 | `Salt-baked_beetroot_with_labneh_202608110048.jpeg` | Plate III mobile/portrait | `public/media/plate-beet-portrait-{448,896}.webp` | 896×1200 | Preserve full beet and labneh field | Same meaning as A07 | No further zoom on 360px | A07 |
| A09 | `Stone_meets_textured_linen_weave_202608110048.jpeg` | Materiality interlude / tactile transition | `public/media/material-linen-{640,1376}.webp` | 1376×768 | Preserve diagonal seam and auburn table edge | Decorative (`alt=""`) | Texture survives compression; lazy-load | Vanilla/Auburn CSS field |
| A10 | `Savra_dining_room_before_service_202608110048.jpeg` | Space reveal / bounded desktop pin | `public/media/room-before-service-{640,1376}.webp` | 1376×768 | Center vanishing point; mobile swaps to non-pinned 4:3 crop | Meaningful: “A low-lit dining room arranged before the imagined service.” | No text directly over the busiest tables; static on mobile | A13 table portrait |
| A11 | `Chef_plating_at_pass_202608110048.jpeg` | Process portrait / anonymous craft | `public/media/process-pass-{448,896}.webp` | 896×1200 | Retain hands, plate, and shadowed anonymous figure | Meaningful: “An anonymous cook finishing a plate at the pass.” | No identity claim; shadow detail not crushed | A12 or omit panel |
| A12 | `Chef_plating_dish_202608110048.jpeg` | Process wide / plate finish | `public/media/process-plating-{640,1376}.webp` | 1376×768 | Keep both hands and plate within frame | Meaningful: “Hands arranging a plate beneath a warm pass light.” | Crop does not sever hands; lazy-load | A11 |
| A13 | `Chef_plating_dish_with_tweezers_202608110048.jpeg` | Process detail | `public/media/process-tweezers-{640,1376}.webp` | 1376×768 | Keep tweezers and plate center | Meaningful: “A final garnish placed with tweezers.” | Avoid repetition with A12 through asymmetric sizing | A11 |
| A14 | `Savra_destination_table_room_por…_202608110048.jpeg` | Mobile hero alternative and final reservation portrait | `public/media/table-destination-{384,768}.webp` | 768×1376 | Preserve full doorway and centered table | Meaningful: “A table for two framed by a tall dark arch.” | Strong at 360–768px; no stretching on desktop | A15 |
| A15 | `SAVRA_table_prepared_for_two_202608110048.jpeg` | Desktop reservation culmination | `public/media/table-reserve-{640,1376}.webp` | 1376×768 | Center table and lamp; use shallow overlay only | Meaningful: “A softly lit table prepared for two in the fictional SAVRA room.” | CTA maintains ≥4.5:1 contrast; no real availability claim | A14 |

## Provenance and source mapping

- Provenance label: **user-supplied synthetic concept imagery; rights/releases not established in this run**.
- Derivative mapping is one-to-one by row above; width suffixes indicate maximum output width. WebPs preserve aspect ratio and do not alter hue or content.
- The palette reference M08 is not copied into the site. Its hex values alone define the CSS tokens.
- `asset-director` stays dormant: inventory did not reveal an implementation-critical missing asset, and external generation/purchasing is explicitly out of scope.

## User should provide later, if this concept becomes real

- Required for real publication: confirmed rights/licenses/releases for every retained image/video; verified venue, menu, chef, address, hours, availability, and booking integration.
- Helpful: licensed brand typefaces, a master logo/vector, high-resolution hero video/stills, real accessibility statement, analytics consent requirements.
- Existing substitutes for this synthetic build: system typography, supplied media, explicit fictional disclosure, and a non-submitting reservation demo.

## Derivative acceptance

- No original may be renamed, moved, overwritten, or deleted.
- Derivatives live only in `public/media/`; manifest and build must expose no runtime hotlinks.
- Remove any derivative that fails crop, visible quality, or provenance requirements during browser QA; use the documented fallback.

