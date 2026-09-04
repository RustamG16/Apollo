# AGENTS — SAVRA

## Read order

1. `ARCHITECTURE-ESSENTIALS.md` — always.
2. Then only the document the current task needs: `PRD.md` for scope, `ARCHITECTURE.md` for
   runtime and build, `.olympus/04-decision.md` for what the design is and why,
   `.olympus/06-build-plan.md` for how a beat is meant to be assembled.
3. `PROGRESS-AND-DECISIONS.md` only when you need to know why something was already decided.

## Ownership and boundaries

You may change `src/`, `index.html`, and the project config.

You may not:

- modify anything in `media/` — those are supplied originals;
- hand-edit `public/media/` — change `.olympus/tools/prepare_media.py` and re-run it;
- edit `.olympus/NN-*.md` retroactively — the trail is dated evidence. Correct it with a
  later entry in `PROGRESS-AND-DECISIONS.md`;
- reference a media file from anywhere except `src/assets.ts`;
- read a motion media query from anywhere except `src/lib/motion.ts`;
- add a dependency without recording in `PROGRESS-AND-DECISIONS.md` what it replaced.

Preserve the frozen direction. The page has **exactly one** hero moment (the doors opening,
beat 6). Adding a second is a design regression, not an enhancement.

## Evidence and safety

- Claims about rendering, contrast or performance must come from a measurement, not an
  assumption. If you have not looked at it in a browser, say so.
- SAVRA is fictional. Do not invent an address, a phone number, prices, awards, chef names
  or press quotes that read as real. Placeholders must be visibly placeholders.
- The reservation form has no transport and must keep saying so.
- No analytics data may be reported. `08-metrics.md` specifies a contract; it measures nothing.

## Verification

Before any handoff:

1. `npm run build` — clean, no TypeScript error.
2. `npm run preview` — screenshots at 1920x1080 into `.olympus/evidence/`.
3. Reduced-motion pass — every beat shows its end state.
4. Keyboard pass — full tab order, dialog open/close, focus returned.
5. Contrast pass — every pairing measured against the table in `.olympus/07-qa.md`.
6. Console clean; no horizontal overflow at the 1920x1080 target.
