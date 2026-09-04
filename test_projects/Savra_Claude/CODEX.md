# CODEX — project router

1. Always read `ARCHITECTURE-ESSENTIALS.md` first.
2. Product or scope question: read `PRD.md`.
3. Runtime, data, build or deployment question: read `ARCHITECTURE.md`.
4. Work boundaries or release checks: read `AGENTS.md`.
5. What the design is and why: read `.olympus/04-decision.md`, then `.olympus/06-build-plan.md`.
6. Which photograph goes where, and its provenance: read `.olympus/05-asset-manifest.md`.
7. Prior decisions only when needed: search `PROGRESS-AND-DECISIONS.md`.

## Commands

```
npm install
npm run dev                              # http://localhost:5173
npm run build                            # tsc -b && vite build
npm run preview                          # serve dist/ for verification
python .olympus/tools/prepare_media.py   # regenerate public/media/ from media/
```

Verification before handoff: build clean · screenshot at 1920x1080 · reduced-motion pass ·
keyboard pass · contrast pass · console clean. Evidence in `.olympus/evidence/`.
