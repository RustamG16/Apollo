# Brief

## Target

- Project: `D:\Analyst_Designer\Apollo\test_projects\Savra_Claude`
- Route/page: single page `/`, plus a `#reserve` dialog. Greenfield — no existing page.
- Mode: concept + implementation

## Outcome

- Primary business goal: reservation intent for a fictional Vienna restaurant, SAVRA.
- Primary visitor action: open the reservation panel and complete the (prototype) request.
- Primary audience: design-aware Vienna locals and visitors booking a considered dinner —
  people who choose a restaurant the way they choose a hotel, on atmosphere first.
- Success signal: a visitor reaches the reservation panel having understood the room, the
  cooking and the price register, without having read a paragraph of marketing copy.

## Constraints

- Must preserve: the 31 supplied originals in `media/` are read-only; the four-colour brand
  palette from `Color_Palette___trend_colors` is locked; SAVRA is fictional and must be
  disclosed; no real booking is transmitted.
- May change: everything else — this is greenfield.
- Stack/dependencies: Vite + React 19 + TypeScript, GSAP + `@gsap/react`, self-hosted OFL
  fonts. Native scroll. No Lenis, no WebGL, no CSS framework, no UI kit.
- **Single target viewport: 1920x1080** (user-specified 2026-09-03, their VG27VQM display).
  The page is composed and verified for that one resolution. No breakpoint matrix, no
  tablet or phone composition, and one image derivative tier rather than four.
- Deadline/budget: single session. Cut order if scope must give: polish layer first,
  never accessibility, never the gated trail, never reduced-motion.

## Taste references

The supplied media *is* the reference set. No external sites are referenced or deconstructed.

| Reference | Specifically liked | Do not copy / avoid |
|---|---|---|
| `SAVRA_restaurant_entrance_in_Vienna` | Cold blue street against a warm gold interior — one light threshold, the whole brand in one frame | Literal "peek through the window" framing as a page-wide gimmick |
| `Empty_dining_room_interior_view` | Formal symmetry; lacquered auburn panelling, mustard tile pilasters, brass line, laid but empty | Symmetry as a page layout — the page is asymmetric, the photograph is not |
| `Stone_meets_textured_linen_weave` | Four materials in one frame: linen, stone, brass, black oak. The brand is material, not motif | Texture overlays or noise filters standing in for real material |
| `Salt-baked_beetroot_with_labneh` | Dark ground, one bright figure, deep shadow — the Kinetic contrast engine already in the photography | Lightening the food photography to fit a light layout |
| `Color_Palette___trend_colors` | A named, locked four-colour system, and all four are physically present in the rooms | Using all four at equal weight; using hunyadi as a body-text colour |

## Direction

Resolved by the director from the supplied media as reference evidence plus the
`apollo-kinetic` doctrine. `library/design-dna/` holds no profile; the user granted full
creative freedom and explicitly declined an intake round, so `apollo-taste-interview` and
`apollo-style-picker` were both dormant. No profile was written back to
`library/design-dna/` — a taste profile inferred from one test project should not persist
into every future run.

- Chosen doctrine: **`apollo-kinetic`**
- Structural posture: cinematic
- Motion posture: scroll-narrative
- Type logic: a high-contrast variable display serif carries every headline at viewport
  scale, a neutral variable grotesque carries all reading, and a mono is confined to the
  clock and eyebrow labels that mark the passing hour.
- Colour logic: a slate-cast near-black ground, and the four locked brand colours used as
  four sequential narrative fields — slate, auburn, hunyadi, vanilla — advancing on scroll
  so the page warms as the hour approaches service; hunyadi is the single luminous accent.
- Explicitly ruled out: WebGL, smooth-scroll libraries, scroll-hijacking, cursor followers,
  autoplaying audio, uniform fade-up-on-scroll, a second hero moment, any use of colour that
  drops a text pairing below 4.5:1.
- Alternatives requested: **no** — one direction, per the direction rule in `AGENTS.md`.

### Thesis — "Mise en Place"

Every photograph in the set is empty of guests. The room is laid and unoccupied, the table
is set for two nobody is sitting at, the chef works alone at the pass, and the only person
in thirty images is a stranger walking past outside. The site is therefore SAVRA in the hour
before service. The scroll is the clock running toward 18:00; each section is one act of
preparation owned by one brand colour; the single hero moment is the doors opening, and the
reservation is not a footer button but the arrival the whole page has been preparing for.

## Available assets and access

- Brand: name and wordmark (from the entrance photograph); four locked colours with hex.
  No logo vector, no brand guide.
- Fonts/licenses: none supplied. Direction uses OFL families self-hosted via
  `@fontsource-variable` — no licence risk.
- Images/video/renders: 30 JPEG stills (≤1376px on the long edge) and one 8s 1280×720 h264
  clip with an audio track, in `media/`. All AI-generated, all carrying a generation mark in
  the lower-right corner.
- Figma: none.
- Analytics: none. `08-metrics.md` specifies an event contract; it does not report data.
- Missing: real address, hours, phone, booking provider, menu prices, chef and team names,
  a logo vector, and any image above 1376px. All are recorded as launch blockers in
  `09-handoff.md` and represented in the build as clearly-marked placeholders.

## Gate A

- Status: **approved**
- User decision: approved as part of the implementation plan, 2026-09-03. The user's brief
  was "use the maximum capabilities of Apollo, build an awwwards-worthy high-end animated
  website from the provided media, full creative freedom, do not ask questions." Gate B was
  approved in the same act, against the single frozen direction stated above.
- Date: 2026-09-03
