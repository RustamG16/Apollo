# PROGRESS AND DECISIONS

Append concise dated entries. Preserve earlier entries; correct them with a later entry.

## 2026-09-03 — Project initialized

- **Run.** First Apollo run under Claude Code (Opus 5) against the SAVRA media set, which
  two earlier Codex-driven runs also used (`test_projects/Savra_Restraunt`,
  `test_projects/Savra_v2`). Stack and pipeline deliberately match those runs so the three
  are comparable.
- **Brief.** Greenfield, single page `/`, concept + implementation. Approved as Gate A and
  Gate B together via the implementation plan. Gate C remains a real review.
- **Direction — "Mise en Place", doctrine `apollo-kinetic`.** The site is SAVRA in the hour
  before service; the scroll is the clock running to 18:00; the four locked brand colours are
  four sequential narrative fields; the single hero moment is the doors opening. Chosen
  because every supplied photograph is empty of guests — the media's most conspicuous fact,
  and the one the two prior runs did not build on.
- **Deviation: intake not asked.** The user explicitly declined questions and granted full
  creative freedom. Intake fields were resolved by the director from the media and recorded
  in `.olympus/00-brief.md` as director-resolved rather than user-stated.
- **Deviation: no taste profile written.** `library/design-dna/` was empty. Rather than run
  `apollo-taste-interview` (an interview the user declined), direction was resolved from the
  media plus the `apollo-kinetic` doctrine. Nothing was written back to `library/design-dna/`
  — a profile inferred from one test project should not persist into every future run.
- **Rejected: WebGL.** Failed its activation test — there is no spatial or material claim the
  photography does not already make better. Recorded as declined, not skipped.
- **Rejected: smooth-scroll library.** The doctrine refuses scroll-hijacking; native scroll
  keeps anchors, find-in-page and reduced-motion honest.
- **Palette contrast is designed out, not caught late.** Vanilla and hunyadi are both light,
  so legal text pairings are fixed as tokens instead of composed freely. This is the defect
  that failed the first Codex run at 82/100.

## 2026-09-03 — Target narrowed to a single resolution

- The user specified **one resolution only: 1920x1080** (their VG27VQM, 240Hz, 8-bit SDR),
  mid-run, during the evidence phase.
- Consequences, applied across `PRD.md`, `ARCHITECTURE-ESSENTIALS.md`, `AGENTS.md`,
  `CODEX.md` and `.olympus/run.json`: the page is composed for a 1920x1080 viewport and
  verified there; there is no breakpoint matrix, no tablet or phone composition, and the
  media pipeline emits one derivative tier sized for 1920 instead of four.
- The layout still must not overflow horizontally when the window is narrowed. Graceful
  degradation is required; a designed narrow composition is not.
- This removes the mobile fallbacks the direction had planned (scroll-snap rail, no-pin
  under 900px). Reduced-motion fallbacks are unaffected and still mandatory.

## 2026-09-04 — Compared against the sibling Codex run, and the system was changed

- The user compared this build with `test_projects/Savra_v2` (Codex) and judged v2 better.
  That judgement was correct, and the causes were specific rather than mysterious.
- **Root cause, mechanical.** `impeccable` — which owns the design-system artifacts and the
  drift detector — carried `hosts: ['codex','studio']` in the Apollo registry. Its full body,
  including `scripts/` and `reference/`, was projected to `.agents/skills/` for Codex but not
  to `.claude/skills/`. This host fell back to a plugin copy that ships no scripts. Ten other
  pipeline skills were in the same position, two of them `defaultOn: true`. Claude Code was
  running a materially weaker loadout than Codex against the same repository.
- **Root cause, procedural.** v2 wrote `DESIGN.md` with a YAML token block — including
  `fontSize: clamp(8.5rem, 25vw, 29rem)` — *before* any code. This run let the type scale
  emerge while writing CSS and it came out at 6vw against a doctrine calling for 12–18vw.
  Every later decision then bent to make the small type look deliberate: photographs boxed
  into text columns, the hero dimmed to 42%, a page-wide door mask taking width from every
  section.
- **Fixed in the build.** Hero to 15.8vw, section display to ~5vw, photography full-bleed at
  full opacity, the doors reduced from a document-length mask to a one-shot arrival gesture,
  the type scrim moved off the picture and onto the type block.
- **Fixed in the system** (`library/`, with the user's explicit authorisation — the repo is
  otherwise read-only during project work): `impeccable` projected to `.claude/skills` and
  promoted to `defaultOn`; a new pipeline stage 3.5 that commits `PRODUCT.md` and `DESIGN.md`
  as numbers before layout; a design-system rule and a two-pass verification bound in
  `AGENTS.md`; `templates/DESIGN.md`, `templates/PRODUCT.md`, `templates/10-finish-review.md`;
  and `trail`, `design_system`, `qa_passes`, `finish_verdict`, `finish_score` in
  `templates/run.json`.
- **Honest record:** this project's own `DESIGN.md` was written *after* the first build, not
  before it, because the stage did not exist when the run started. `run.json` records
  `committed_before_build: false` rather than pretending otherwise.

## 2026-09-04 — Independent finish review: FAIL 67/100, then a bounded repair pass

- The new stage worked. The independent reviewer found 23 defects, including two contract
  breaches and a layout break at the target viewport that the author's own QA had missed
  entirely — because that QA measured contrast and geometry per element and never checked
  whether two elements occupied the same space.
- **The worst of them:** `.figure { margin: 0 }` was declared after `.bleed` and silently won.
  Every full-bleed figure on the page was 100vw wide but anchored at the wrap's left edge, and
  at beat 6 the door photograph ran 762px underneath its own headline and CTA, unscrimmed.
  The author's contrast sweep could not have caught it: it reads computed background colours,
  and a photograph behind text is not a background colour.
- Every claim was verified before acting. None failed verification. Two of the defects were
  false claims the author had written into the documentation: a compile-time contrast guard
  that had no importers anywhere, and three docblocks describing a motion spine that two
  revisions had already removed.
- Fifteen of twenty-three repaired inside the bound. Three accepted and recorded rather than
  fixed. Five carried to Gate C with their trade-offs. One further defect was found during
  the repair itself — `100vw` includes the scrollbar, so every bled element overhung by 7px
  per edge.
- **The verdict of record is still FAIL.** The re-review has not been run, and it is listed as
  a launch blocker rather than quietly treated as satisfied by the repairs.
