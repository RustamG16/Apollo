# Greenfield readiness and evidence inventory

## Scope and evidence

- Target: greenfield route `/`; no existing interface, production source, browser state, or analytics baseline existed at the start.
- Directly inspected: the controlled runbook; all filenames, extensions, byte sizes, image dimensions/aspect ratios; a generated 30-image contact sheet; and MP4 container metadata.
- Evidence: [`evidence/media-inventory.json`](evidence/media-inventory.json) and [`evidence/media-contact-sheet.jpg`](evidence/media-contact-sheet.jpg).
- Inventory utility: [`tools/build_media_inventory.py`](tools/build_media_inventory.py). It reads originals and writes only evidence derivatives.
- Limits: individual video frames were not visually decoded because no local video-frame decoder was available. The MP4 container exposes 8.000 seconds, `avc1` (H.264/AVC), and 1280×720; Windows metadata separately exposed an 8-second duration and 128 kbps audio bit rate.
- Gate A: explicitly approved in the user runbook. No before-state screenshot exists or is claimed.

## Readiness in one sentence

The supplied set has enough coherent arrival, room, plate, material, process, and table imagery to support three premium concepts without external generation, provided implementation uses deliberate responsive crops, conservative loading, and a clear synthetic-concept disclosure.

## Quantitative inventory — direct observations

- 31 originals: 30 JPEG images and one MP4; total 7,552,516 bytes (about 7.20 MiB).
- JPEGs: 5,369,145 bytes total; 18 landscape and 12 portrait.
- Image dimensions: 16 × 1376×768, 9 × 896×1200, 2 × 1200×896, 2 × 768×1376, and 1 × 736×1104 palette reference.
- Video: 2,183,371 bytes; 1280×720; 8.000 seconds; `avc1` video codec. The container is suitable for an optional short muted ambient beat, but not a high-resolution full-screen source on very large displays without careful treatment.
- The contact sheet is a project-evidence derivative only. Its numbers include images only, whereas stable media IDs below include the MP4 as M03.

## Per-asset inventory and role classification

“Likely role” and “suitability” are design inferences from the visible contact sheet and filenames; dimensions, sizes, and formats are direct observations. No asset is treated as proof of a real restaurant, chef, dish, address, or claim.

| ID | Source file | Dimensions / size | Likely role | Responsive suitability | Visible or delivery risk |
|---|---|---:|---|---|---|
| M01 | `Camera_crossing_threshold_toward…_202608110048.jpeg` | 1376×768 · 112.5 KiB | Arrival threshold / opening transition | Strong landscape; center doorway can survive moderate 4:3 crop | Wide crop loses architectural edges on narrow mobile; too small for unsoftened 2× desktop hero |
| M02 | `Camera_entering_SAVRA_restaurant…_202608110048.jpeg` | 1376×768 · 90.8 KiB | First interior reveal / point of view | Strong desktop/tablet scene; central table holds at 4:3 | Mobile crop can remove room context; pale wall needs contrast protection for overlaid text |
| M03 | `Camera_tracking_through_dining_room_202608110048.mp4` | 1280×720 · 2.08 MiB · 8.000 s · avc1 | Optional ambient arrival bridge or hero background | Short, modest payload; use muted inline with poster and static fallback | Frame content not visually decoded in this phase; 720p softness, autoplay/reduced-motion, and poster requirements |
| M04 | `Charcoal_sea_bass_with_fennel_202608110048.jpeg` | 896×1200 · 159.4 KiB | Signature plate portrait | Excellent mobile/editorial card; usable as narrow desktop column | Portrait cannot fill wide panels without destructive crop; dish name remains fictional concept copy |
| M05 | `Chef_plating_at_pass_202608110048.jpeg` | 896×1200 · 131.1 KiB | Anonymous process portrait | Strong mobile/process rail; silhouette gives copy-safe dark region | Very dark face and clothing; must stay anonymous and synthetic, with no chef identity claim |
| M06 | `Chef_plating_dish_202608110048.jpeg` | 1376×768 · 133.0 KiB | Wide craft/process beat | Good desktop cinematic crop; hands and plate form focal triangle | Narrow crop risks cutting hands/plate; highlights require text scrim if overlaid |
| M07 | `Chef_plating_dish_with_tweezers_202608110048.jpeg` | 1376×768 · 102.6 KiB | Close process detail | Good wide sequence companion; center action survives 4:3 | Similar to M06; avoid repetitive use and implied documentary authenticity |
| M08 | `Color_Palette___trend_colors_202608110048.jpeg` | 736×1104 · 39.3 KiB | Color source of truth only | Not intended for page display | Its icon, lettering, labels, and panel composition are explicitly prohibited from reuse |
| M09 | `Dish_photographed_overhead_on_table_202608110048.jpeg` | 1200×896 · 318.0 KiB | Overhead plate / menu index | Flexible 4:3 editorial tile; useful at medium widths | Higher JPEG weight; textured split background may compete with copy |
| M10 | `Dish_plated_on_dark_slate_202608110048.jpeg` | 1200×896 · 145.9 KiB | Plate profile with label space | Flexible 4:3; negative slate field supports adjacent metadata | Avoid small rendering where the dish loses detail; text-on-image still needs tested contrast |
| M11 | `Empty_dining_room_interior_view_202608110048.jpeg` | 1376×768 · 141.7 KiB | Space/materiality panorama | Strong desktop room anchor; central symmetry | Narrow crops lose tables and wall breadth; do not imply a real address or venue availability |
| M12 | `Flatbread_served_with_smoked_butter_202608110048.jpeg` | 896×1200 · 213.5 KiB | Bread/opening plate portrait | Excellent mobile and vertical rhythm | Tight food crop offers little text-safe space; fictional dish description only |
| M13 | `Flatbread_with_butter_and_oil_202608110048.jpeg` | 1376×768 · 373.6 KiB | Wide bread ritual / plate opener | Strong immersive desktop strip; centered plate | Largest JPEG among bread assets; optimize derivative after Gate B and avoid duplicating M12 |
| M14 | `Food_photography_of_plated_dish_202608110048.jpeg` | 1376×768 · 250.5 KiB | Supporting plate / progression beat | Good landscape card; centered plate | Generic filename gives weak content certainty; describe only with approved concept copy |
| M15 | `Lamb_backstrap_with_cherry_glaze_202608110048.jpeg` | 1376×768 · 226.1 KiB | Signature meat plate | Strong desktop menu panel; dark field helps framing | Low-key exposure can collapse on dim screens; crop must retain plate and glass balance |
| M16 | `Portrait_recomposition_of_asset_202608110048.jpeg` | 768×1376 · 147.9 KiB | Doorway/table interlude or reservation prelude | Excellent narrow/mobile full-bleed; centered table | Limited desktop width; synthetic recomposition must not be framed as documentary evidence |
| M17 | `Quince_dessert_with_yogurt_and_202608110048.jpeg` | 896×1200 · 155.8 KiB | Dessert portrait / closing plate | Strong mobile and vertical editorial card | Tight crop and filename truncation; use only fictional descriptive copy supplied by the concept |
| M18 | `Recreating_dish_from_asset_202608110048.jpeg` | 896×1200 · 276.8 KiB | Alternate plate / process-adjacent still | Strong portrait mosaic tile | “Recreating” indicates synthetic derivation; may visually repeat beetroot family and needs provenance note |
| M19 | `Restaurant_entrance_view_for_hero_202608110048.jpeg` | 1376×768 · 80.5 KiB | Primary after-hours doorway hero candidate | Strong wide center framing; auburn door provides focal architecture | Very small file may show compression/softness at 1440+; mobile crop needs a distinct focal position |
| M20 | `Saffron_poached_quince_dessert_202608110048.jpeg` | 1376×768 · 190.3 KiB | Wide dessert / warm closing beat | Strong desktop plate panel with controlled negative space | Dish is small in frame on mobile; copy must remain fictional |
| M21 | `Salt-baked_beetroot_dish_on_plate_202608110048.jpeg` | 1376×768 · 378.8 KiB | Wide vegetable plate / signature sequence | Strong immersive desktop image | Largest JPEG in set; optimize after Gate B; extreme crop can lose plate rim and garnish |
| M22 | `Salt-baked_beetroot_with_labneh_202608110048.jpeg` | 896×1200 · 219.1 KiB | Portrait vegetable plate | Excellent mobile/editorial pairing with M21 | Near-duplicate subject; use one format per narrative need rather than both decoratively |
| M23 | `Savra_destination_table_room_por…_202608110048.jpeg` | 768×1376 · 113.2 KiB | Destination table / reservation CTA | Excellent narrow full-bleed and mobile CTA backdrop | Desktop needs framing rather than stretching; no real table availability claim |
| M24 | `Savra_dining_room_before_service_202608110048.jpeg` | 1376×768 · 128.2 KiB | Space and materiality | Strong desktop/laptop section, central vanishing point | Wide-to-mobile crop loses side seating; “before service” is a concept scene, not operational evidence |
| M25 | `SAVRA_restaurant_entrance_in_Vienna_202608110048.jpeg` | 1376×768 · 184.4 KiB | Exterior arrival / city-context concept image | Strong desktop scene; central facade survives 4:3 | Must not imply a real address or operating venue; passerby and signage are synthetic imagery |
| M26 | `SAVRA_table_prepared_for_two_202608110048.jpeg` | 1376×768 · 110.5 KiB | Reservation invitation / intimacy | Strong wide CTA and table reveal | Central table can become too small on mobile; no real availability or service claim |
| M27 | `Slow-cooked_lamb_shoulder_plate_202608110048.jpeg` | 896×1200 · 255.5 KiB | Portrait main plate | Strong mobile and menu rail | Close food crop lacks text-safe area; fictional dish positioning only |
| M28 | `Stone_meets_textured_linen_weave_202608110048.jpeg` | 1376×768 · 240.4 KiB | Materiality macro / section divider | Flexible wide texture strip and crop | Subtle image can read as generic at small sizes; use purposefully, not as filler |
| M29 | `Table_set_for_two_202608110048.jpeg` | 896×1200 · 89.1 KiB | Quiet table ritual / CTA support | Strong portrait/mobile and low payload | Low-contrast dark wall requires careful foreground separation; no availability claim |
| M30 | `Table_settings_with_linen_runner_202608110048.jpeg` | 896×1200 · 159.9 KiB | Linen/table detail | Strong mobile/material detail | Crop is already tight; avoid further zoom and ensure cutlery does not look clipped |
| M31 | `Threshold_opening_to_stone_table_202608110048.jpeg` | 1376×768 · 75.1 KiB | Final threshold / transition frame | Strong wide doorway; center opening survives moderate crop | Very low file size suggests softness/compression; narrow crop can reduce the threshold effect |

## Highest-leverage readiness findings

| Priority | Observation | Evidence | User/business effect | Severity | Confidence |
|---|---|---|---|---|---|
| 1 | There is no current UI, booking integration, analytics baseline, or browser behavior to diagnose. | Project contained only the runbook and `media/` at startup. | Concept decisions must be evaluated against the supplied objective and later verified in-browser; no conversion uplift can be claimed. | High | Direct |
| 2 | The media set is narratively complete but mostly modest resolution. | 16 wides are 1376×768; video is 1280×720. | A 1440px hero can work with atmospheric treatment, but aggressive zoom or retina-level full-bleed use risks softness. | High | Direct + inference |
| 3 | Portrait and landscape pairs enable responsive art direction for plates and tables. | 12 portraits and 18 landscapes, with repeated plate/table subjects. | Mobile can retain focal content instead of mechanically cropping every desktop frame. | High positive | Direct + inference |
| 4 | Synthetic imagery and fictional positioning require persistent content integrity. | Runbook and filenames describe synthetic concept work; no releases or real-world facts supplied. | Disclosure must be explicit; copy cannot imply a real venue, chef, address, menu availability, or booking submission. | Critical | Direct |
| 5 | The strongest business-aligned narrative runs from threshold to table, not from a conventional menu grid. | Arrival/doorway, room, process, plate, material, and table groups are all present. | Concepts can make “Reserve a Table” feel like the emotional culmination while keeping the action clear and reachable throughout. | High | Inference |

## Media groups available to concepts

- Arrival/threshold: M01, M02, M19, M25, M31, and M03 video.
- Space/materiality: M11, M24, M28, M29, M30.
- Signature plates: M04, M09, M10, M12–M15, M17–M22, M27.
- Anonymous process: M05–M07.
- Reservation/table culmination: M16, M23, M26, M29.
- Palette reference only: M08.

## What is deliberately absent

- No real address, chef identity, awards, reviews, press, certifications, opening hours, prices, availability, or customer claims.
- No verified releases, asset-license statement, brand font/license, Figma, CMS, database, booking service, analytics account, or consent configuration.
- No approved external visual references and no right to infer another site's distinctive expression.
- No implementation, dependency graph, runtime, console, accessibility, performance, or before-state browser evidence yet.

## Design problem to solve

Use the supplied media to turn a fictional after-hours dining ritual into a legible, responsive reservation-intent journey: atmosphere first, point of view and plates next, material/process proof as synthetic concept storytelling, and a strong demo reservation culmination—without sacrificing honest disclosure, mobile crop integrity, reduced-motion access, or load discipline.

## Gate A record

- Status: approved by the user-supplied controlled runbook.
- Audit route: greenfield readiness inventory; `ux-evidence-audit` intentionally dormant.
- Missing-media decision: no implementation-critical gap is established. `asset-director` stays dormant and no external generation/purchase is requested.

