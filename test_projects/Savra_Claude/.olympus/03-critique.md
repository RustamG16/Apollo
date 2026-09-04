# Independent concept critique

Produced by the read-only `independent-critic` specialist using `award-rubric`, against the
frozen direction in `02-concepts.md`. The critic did not author a replacement and wrote no
file, per the delegation policy in `AGENTS.md`. Contract: score, challenge, name defects.

There is one concept, not three — the direction rule produces one direction by default.

## Scoring

| Concept | Design /40 | Usability /30 | Creativity /20 | Content /10 | Total /100 | Delivery risk |
|---|---:|---:|---:|---:|---:|---|
| 1 — Mise en Place | 27 | 16 | 15 | 5 | **63** | **High** |

## Director's verification of the critique

The critique is adversarial and numerically specific, so it was checked rather than accepted.
Every quantitative claim was independently recomputed from `evidence/media-inventory.json`
and from the WCAG relative-luminance formula.

| Claim | Critic | Recomputed | Verdict |
|---|---:|---:|---|
| ink-dark `#12181A` on auburn `#9E2A2B` — the CTA drawn in the representative frame | 2.41 | **2.41** | Confirmed. A real failure, in the frozen artefact, on the conversion element. |
| hunyadi focus ring on the vanilla field | 2.03 | **2.03** | Confirmed. Below the 3:1 floor of WCAG 1.4.11. |
| hunyadi focus ring on the auburn field | 3.26 | **3.26** | Confirmed — passes, but only just. |
| "ink-dark on slate 2.51" in the banned-pairings line | 2.45 | **2.45** | Confirmed. 2.51 was `#0F1518` on slate; the row was mislabelled. |
| Aperture deltas 12 / 28 / 0 / 12 / 8 / 8 / **26** | beat 2 = +28 > hero beat 7 = +26 | **confirmed** | Confirmed from the direction's own table. Beat 2 has the largest opening on the page. |
| Auburn is not measurably present in the ROOM frames | lacquer at RGB-distance 108–120 | `#3A1708` **107.6**, `#2F1105` **120.0**, `#5C2F1C` **67.9** | Confirmed. The panelling is deep oxblood-brown, not `#9E2A2B`. |
| MATERIAL register holds two images; beat 4 specifies three crops | 2 vs 3 | **confirmed** | Confirmed against the audit's own register table. |
| `01-audit.md` says "nine sit below 65" | actual eight | **8** | Confirmed. My error. |
| Sea bass is a teal oval, quince is a cream bowl — Flip's "same object" claim fails | — | **confirmed by inspection**; also `Food_photography_of_plated_dish` and `Dish_photographed_overhead_on_table` are cream plates | Confirmed, and worse than stated: only four *distinct subjects* sit on the identical round teal plate. |

**Nothing in the critique failed verification.** Two of the defects are errors I introduced.

## Evidence and fatal risks

### Concept 1 — Mise en Place

**Strongest evidence.** The colour-matched plate: `Dish_plated_on_dark_slate` measures
`#365862` across 38% of the frame against brand slate `#335C67` — RGB distance 7,
independently confirmed. Laying that image on an identically-coloured field with no border
genuinely dissolves the rectangle, and it is free. Second: the thesis rests on a countable
fact (28 of 30 frames contain no person), not a mood, and correctly identifies that a
guest-arrival narrative has to argue against its own pictures.

**Weakest assumption.** That the three colour arrivals read as *earned* because each is
"tied to a photograph in which that colour is physically present." The inventory does not
support that for auburn or hunyadi, and attaches vanilla to a frame that is 57% near-black
with two slate-blue dominants. The page's colour drama rests on a bridge the evidence file
does not build.

**Fatal risk — commercial, not technical.** No reservation affordance before ~85% scroll
depth, no persistent reserve in the header, no stated total scroll length, and no price,
address, hours or availability anywhere. The entire business goal is routed through
completion of a nine-beat scrub narrative with no alternative path. Every other finding is
fixable in a pass; this one is a property of the information model.

**Critic's stated confidence:** high on the measurable findings, medium on composition
judgements, because only one of nine beats has a representative frame.

## Defects raised

| # | Sev | Defect |
|---|---|---|
| 1 | Critical | Representative frame's primary CTA is ink-dark on auburn = 2.41:1 |
| 2 | Critical | Focus-ring hunyadi = 2.03:1 on the vanilla field, which is where the CTA lives |
| 3 | High | Beat 2 is a second hero: largest aperture delta on the page, only pin, only moving image |
| 4 | High | The aperture spine is not one monotonic value — "held" at beat 3, "—" at beat 8, and it changes geometry from width-slot to letterbox |
| 5 | High | No persistent reservation affordance; "reserve" is absent from the header nav |
| 6 | High | Total scroll length unspecified for a scrub narrative whose only CTA sits at the end |
| 7 | High | Reservation dialog entirely unspecified — focus trap, return focus, Escape, labels, errors, disclosure |
| 8 | High | Beat 6 widget unspecified: no role, no click activation, no selected state; unclear whether unselected course names are visible at all |
| 9 | High | No pause control for the looping 8s clip (WCAG 2.2.2) |
| 10 | High | Scrub-driven full-viewport luminance swing 0.007 → 0.885 with no rate cap or light-sensitivity accommodation |
| 11 | High | Beat 4 requires three MATERIAL crops; the register supplies two |
| 12 | Medium | The three "earned arrivals" are unsupported by the inventory for auburn and hunyadi; vanilla is attached to the wrong frame |
| 13 | Medium | Beat 3 pre-spends all three punctuation colours before their arrivals, re-imports the rejected casual register, sits outside both spines, has no nav anchor |
| 14 | Medium | Flip's documentary claim fails on the chosen six courses (oval, cream bowl) |
| 15 | Medium | Hero copy states hours and service pattern as fact; the brief records them as unobtainable and requires marked placeholders |
| 16 | Medium | "No layout property is touched" is a category error — JS-driven `clip-path` is a main-thread paint, not compositor-only; no 240 Hz budget |
| 17 | Medium | Anchor navigation into a pinned, scrubbed page lands at wrong offsets |
| 18 | Medium | LCP element is 94% masked at beat 0; no image priority/decode/payload strategy; no font-loading strategy against a load-time SplitText entrance |
| 19 | Medium | Text resize to 200% (SC 1.4.4) against a `clamp()` / `13vw` type system |
| 20 | Medium | Price register — an explicit brief success criterion — has no representation, not even a marked placeholder |
| 21 | Low | `01-audit.md`: "nine sit below 65" — actual eight |
| 22 | Low | Pairing table row "ink-dark on slate 2.51" — actual 2.45 |
| 23 | Low | Confirm SplitText licensing for the pinned GSAP version |

## Recommendation

**Proceed with named changes.** Not a reject.

The critic's position: the thesis should survive untouched — it is derived from a counted
property of the media, it is a real inversion of the two prior runs, and it makes the
reservation the resolution of the page's only tension. The colour-matched plate is
excellent. The reduced-motion contract and the measured pairing table are more rigour than
most directions carry.

But as frozen the artefact contains two contrast failures on the conversion path, one
explicit doctrine violation, a spine whose table contradicts its prose, a beat requiring an
asset that does not exist, and an information model routing 100% of the business goal
through 85% of an unmeasured scroll.

Ordered: contrast (1, 2) → the second hero (3) → the aperture's definition (4) → a
persistent reservation affordance and a stated scroll length (5, 6) → then cut beat 3 (13),
which repairs the colour scheme as a side effect. Polish must not begin before 1–5 are closed.

Disposition of all 23 defects is in `04-decision.md`.
