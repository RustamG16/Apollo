# ARCHITECTURE ESSENTIALS

Read this before changing the project. Explanations live in `ARCHITECTURE.md`.

## 1. Source of truth

- Design decisions: `.olympus/04-decision.md` (frozen direction) and `.olympus/06-build-plan.md`.
- Product truth: `PRD.md`. Media truth: `.olympus/05-asset-manifest.md`.
- Every media reference in the app resolves through `src/assets.ts`. Nothing else names a file.
- Every motion decision resolves through `src/lib/motion.ts`. Nothing else reads a media query.
- Legal colour pairings live in `DESIGN.md` and are verified by measurement, not by types.

## 2. Protected boundaries

- `media/` — supplied originals, **read-only**. Never edit, never import from the app.
- `public/media/` — generated, disposable. Rebuild with `python .olympus/tools/prepare_media.py`.
- `.olympus/` — audit trail, not application code. Never imported.

## 3. Runtime and dependencies

Vite 7 · React 19 · TypeScript · GSAP 3 (ScrollTrigger, Flip, SplitText) · `@fontsource-variable`.
Native scroll. No smooth-scroll library, no WebGL, no CSS framework, no UI kit, no analytics
vendor, no network calls at runtime. Adding a dependency requires a line in
`PROGRESS-AND-DECISIONS.md` saying what it replaced.

## 4. Required gates

- Every body text pairing at least 4.5:1; display at 24px bold or larger may sit at 3:1.
  Legal pairings are fixed as tokens in `styles.css` — do not compose colours freely.
- `prefers-reduced-motion: reduce` renders every beat's **end state**, statically. No beat may
  leave content invisible or mid-transition when motion is off.
- Keyboard reaches every interactive element with visible focus. The dialog traps focus and
  returns it.
- **Single target viewport: 1920x1080.** The page is composed for it and verified at it.
  No breakpoint matrix, no mobile composition. The layout must still not overflow
  horizontally if the window is narrowed, but narrower widths are not a design target.
- No console errors at any verified width.

## 5. Build and verification

```
npm install · npm run dev · npm run build · npm run preview
python .olympus/tools/prepare_media.py     # regenerate public/media/
```

Before handoff: build clean, preview screenshotted at 1920x1080, plus a reduced-motion pass
and a keyboard pass. Evidence goes in `.olympus/evidence/`.

## 6. Publication and secrets

No secrets, keys or endpoints in this repository. No personal data is collected, stored or
transmitted — the reservation form is a prototype and says so on screen. SAVRA is fictional
and the footer discloses it. Photography is AI-generated; provenance is in
`.olympus/05-asset-manifest.md` and disclosed in the footer.
