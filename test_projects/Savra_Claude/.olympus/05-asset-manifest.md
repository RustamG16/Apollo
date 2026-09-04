# 05 — Asset manifest

Produced after Gate B, against Revision B of the direction in `04-decision.md`.

**Nothing is generated, purchased or licensed.** Every asset is a local transformation of the
supplied originals. No image or video service was called, so no generation approval was
required and none is requested.

Machine-readable companion: `evidence/asset-manifest.json`, written by
`tools/prepare_media.py`. Every number below comes from it.

---

## Inventory and disposition

| State | Count | Notes |
|---|---:|---|
| Usable as-is (after crop) | 15 | 13 stills + 2 declared crops of stills already in the list |
| Transformable — required work | 1 | The clip: trim, crop, grade, mute |
| Held as fallback | 4 | Duplicate passes at the same subject |
| Not used — register conflict | 2 | `Restaurant_entrance_view_for_hero`, `Recreating_dish_from_asset` |
| Not used — beat cut | 4 | The PLAN register, orphaned when beat 3 was cut per defect 13 |
| Specification, not photography | 1 | `Color_Palette___trend_colors` — the palette source, never displayed |
| Not used — subject already covered | 4 | Second lamb, second beetroot, second flatbread, second quince frames |

**Rights, for every asset:** AI-generated and supplied by the client for this project.
SAVRA is fictional. No third-party rights, no model releases, no attribution required, no
licence terms to record. Provenance is disclosed in the page footer.

## Two facts that governed the whole pipeline

**1. The generation mark.** Every still carries a four-point mark at a *fixed relative
position* — measured at x ∈ [91.2%, 94.6%], y ∈ [84.2%, 90.4%] on the five frames whose
backgrounds are clean enough to isolate it. It is burned into the clip as well.

It is excluded by **crop, not retouch**. Each asset needs an aspect crop anyway, so
`solve_crop()` picks the largest window at the target ratio, biased to a stated focal point,
that lies entirely outside a generous exclusion zone (x < 89.5% or y < 82.5%). One operation.
Nothing is cloned, blurred or painted over, and no image is altered inside its frame.

Cost: some assets can no longer supply their requested width. The tool refuses to upscale and
records the shortfall in the manifest — `hands` at 801px against 820 requested, four courses
at 896 against 1000, and both material details well below request. Softness is accepted;
inventing pixels is not.

**2. The clip belongs to the register the audit rejected.** Its first four seconds are the
warm bistro building — red door frames, timber beams, ochre plaster, bentwood and leather —
not the formal lacquered SAVRA room. This was not visible from the filename
(`Camera_tracking_through_dining_room`) and only surfaced on frame extraction.

Its **last three seconds** are a different matter: by then the frame holds a lamp, a table
laid for two, linen and glassware, and nothing architecturally specific. That passage is
register-neutral and is precisely the page's thesis.

So the clip is trimmed to 4.6s–8.0s, cropped past the mark, and graded cooler and deeper to
sit against the slate-cast ground. This is a **declared transformation**, recorded in the
JSON manifest with its reason, its trim points and its grade parameters. Evidence:
`evidence/clip-frames.jpg` (the source, showing the problem) and `evidence/clip-graded.jpg`
(the result).

---

## The assets

Format is WebP at quality 82 for every still, `image/mp4` (h264) for the clip. One derivative
tier, per the single 1920×1080 target. Acceptance criterion for every asset: the mark is
absent, no upscaling has occurred, and the subject survives the crop — verified on
`evidence/derivatives-check.jpg`.

### Beats 0–1 · the street

| | |
|---|---|
| **ID** | `street` · `media/street.webp` · 1200×675 · 63 kB |
| Source | `SAVRA_restaurant_entrance_in_Vienna` (1376×768) |
| Crop | 16:9, focal (0.50, 0.46) |
| Purpose | Full-bleed behind the opening doors. **This is the LCP element** — preloaded, `fetchpriority="high"`. |
| Alt | "The SAVRA shopfront at dusk on a Vienna side street: a dark slate frame around a warmly lit dining room, one figure passing on the cobbles." |
| Fallback | None needed; if it fails to load the ground colour stands and the wordmark remains legible. |

### Beat 2 · the room

| | |
|---|---|
| **ID** | `room-clip` · `media/room.mp4` · 1120×~617 · **287 kB** · h264, no audio track |
| Source | `Camera_tracking_through_dining_room` (1280×720, 8.0s, 24fps, **AAC audio**) |
| Transform | Trimmed to 4.6–8.0s · cropped to 89.5% width, 86% height · saturation 0.75, contrast 1.12, brightness −0.04, gamma 0.96, shadows and midtones shifted cool |
| Why | See above. Content is right, art direction was not; the trim solves both. |
| Purpose | Beat 2. Plays **once** on entry, muted, `playsinline`, `preload="none"`, with a visible pause control. Never loops — WCAG 2.2.2. |
| Alt | "A slow move in toward a single lamp on a table laid for two." |
| Poster | `media/room-poster-frame.webp` · 24 kB · first graded frame |
| Fallback | `media/room-poster.webp` (1200×675, 37 kB, from `Empty_dining_room_interior_view`) renders instead under `prefers-reduced-motion`, and if the video errors. |
| No WebM | VP9 encoded this clip **larger** than h264 (566 kB vs 287 kB). A second, bigger encoding that is never the better choice is payload, not coverage. |

### Beat 3 · what it is made of

Four tiles from **two** source frames — the MATERIAL register holds two images, and the
direction was corrected to stop asking for a third (defect 11). The two extra tiles are
declared crops of the same frames, not separate assets.

| ID | Source | Size | Role |
|---|---|---|---|
| `material-weave` | `Stone_meets_textured_linen_weave` | 900×600, 103 kB | Linen over slate, met by brass and black oak |
| `material-weave-detail` | *the same frame*, zoom 0.42 | 322×322, 21 kB | Decorative crop — the brass line at macro |
| `material-setting` | `Table_settings_with_linen_runner` | 700×933, 61 kB | A place setting on slate |
| `material-setting-detail` | *the same frame*, zoom 0.40 | 358×358, 24 kB | Decorative crop — cutlery engraved SAVRA. The only legible brand mark in the set apart from the shopfront. |

Both `-detail` tiles are marked `decorative: true` and carry empty alt text; their content is
described by the parent tile's alt.

### Beat 4 · one pair of hands

| | |
|---|---|
| **ID** | `hands` · 801×1068 · 45 kB (requested 820; the mark-safe crop supplies 801, not upscaled) |
| Source | `Chef_plating_at_pass` (896×1200) |
| Alt | "A chef alone at the pass under a single pendant lamp, both hands resting either side of a white plate holding one leaf." |
| Note | The panelling behind is the formal lacquered room — this frame is in register, unlike the clip. |

### Beat 5 · the pass

Six courses, one per distinct subject. All 4:3 so GSAP Flip only ever interpolates position
and scale, never aspect ratio.

**Each course carries a measured field colour.** The page paints that colour behind the
photograph so the plate appears to rest on the page rather than inside a rectangle. The
colour is sampled from the cropped result's border ring — never chosen by eye — and every
course image is **feathered**: a soft alpha falloff over the outer 7.5%.

Feathering was added after inspection. Without it, flat grounds matched invisibly and
textured grounds banded visibly — `course-2`'s veined slate and `course-6`'s stone both
showed a hard seam against a single flat colour. Dissolving the edge makes the effect hold
for all six instead of only the flat ones.

| # | Course | ID | Source | Size | Field |
|---|---|---|---|---:|---|
| 1 | Flatbread, smoked butter, za'atar | `course-1` | `Flatbread_served_with_smoked_butter` | 896×672, 106 kB | `#374E53` |
| 2 | Salt-baked beetroot, labneh, hazelnut | `course-2` | `Salt-baked_beetroot_dish_on_plate` | 1000×750, 205 kB | `#545B56` |
| 3 | Charcoal sea bass, fennel, preserved lemon | `course-3` | `Charcoal_sea_bass_with_fennel` | 896×672, 85 kB | `#3F382F` |
| 4 | Aubergine, tahini, pomegranate molasses | `course-4` | `Food_photography_of_plated_dish` | 1000×750, 121 kB | `#32484D` |
| 5 | Dry-aged duck, parsnip, blackcurrant | `course-5` | `Dish_plated_on_dark_slate` | 1000×750, 53 kB | **`#365862`** |
| 6 | Saffron quince, yoghurt, pistachio | `course-6` | `Quince_dessert_with_yogurt_and` | 896×672, 58 kB | `#403E38` |

`course-5` is the **default selection**. Its measured field `#365862` sits RGB-7 from the
brand slate `#335C67` — the audit's best finding, rediscovered independently by the pipeline.
It is the course where the effect is literally invisible, so it is the one a visitor meets first.

Each course also emits a `-thumb` at 340px wide for the list, feathered at 6%.

Every course image carries real alt text naming the dish and its surface — none are decorative.

### Beat 6 · they open

| ID | Source | Size | Role |
|---|---|---|---|
| `door` | `Threshold_opening_to_stone_table` | 1200×675, 15 kB | **The hero.** A door ajar, warm light spilling onto one laid table. |
| `room-lit` | `Savra_dining_room_before_service` | 900×600, 31 kB | Support. Carries the set's only measured vanilla (`#D8CDBC` over 31% of frame) — the reason the vanilla arrival is attached here rather than asserted. |
| `table` | `Table_set_for_two` | 760×1013, 23 kB | Closing image. The table the reservation is for. |

---

## Payload

| | |
|---|---:|
| Images and thumbs | **1 142 kB** |
| Clip poster | 24 kB |
| **First view, excluding the clip** | **1 165 kB** — budget 2 200 kB · **OK** |
| Clip, on demand at beat 2 (`preload="none"`) | 287 kB |
| Total if the visitor reaches beat 2 | 1 452 kB |

The heaviest single asset is `course-2` at 205 kB — a 1000×750 frame of veined slate, which
WebP compresses badly because the texture is real detail rather than noise. It is lazy-loaded
and is not the default course.

## What is still missing, and what the page does about it

None of these can be derived from the media. Each renders as a **visibly marked placeholder**
— bracketed, in JetBrains Mono, at `--bone-2` — and each is a launch blocker in `09-handoff.md`.

| Missing | Where it shows | Priority |
|---|---|---|
| Street address | Essentials strip, footer | Required |
| Opening hours and service pattern | Essentials strip, reservation dialog | Required |
| Telephone | Essentials strip | Required |
| Price register (menu price, or a range) | Essentials strip. An explicit brief success criterion and the one the direction originally omitted entirely. | Required |
| Booking provider | Reservation dialog — the form has no transport and says so | Required |
| Chef and team names | Beat 4 caption | Helpful |
| Logo vector (SVG) | The wordmark is set in type; a real mark would replace it | Helpful |

## What to supply for a real launch

Prioritised, specific, and with formats — not "send brand assets":

**Required**

1. **Photography at 2560px on the long edge or larger**, same art direction, same lacquered
   room. Everything supplied is ≤1376px, so a 1920-wide layout upscales by up to 1.4×. This
   is the single largest quality ceiling on the page.
2. **The same photography without a generation mark**, so crops can be composed for the
   layout rather than around a corner.
3. **A clip shot in the SAVRA room** — 10–20s, 1920×1080 or better, no audio needed. The
   supplied clip is a different building and only three seconds of it are usable.
4. Address, hours, telephone, price register, and a booking provider or endpoint.

**Helpful**

5. Logo as SVG, plus the engraved wordmark's actual typeface if it is licensed.
6. Two or three more MATERIAL frames — the register holds two, which is why beat 3 is
   currently built from four crops of the same two images.
7. Portrait-orientation frames of the ROOM register. Four exist; a future narrow layout would
   be short of vertical material.

## Reproducing

```bash
python .olympus/tools/prepare_media.py     # regenerates public/media/ and the JSON manifest
```

`media/` is never written to. `public/media/` is deleted and rebuilt on every run, so the
derivatives are always a pure function of the tool plus the originals.
