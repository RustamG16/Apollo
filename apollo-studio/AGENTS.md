# AGENTS — Apollo Studio Desktop

## Read order

Read `ARCHITECTURE-ESSENTIALS.md` first. Read `PRD.md` for product decisions, `ARCHITECTURE.md` for runtime/data work, and `PROGRESS-AND-DECISIONS.md` only for needed history. The Apollo root `AGENTS.md` remains authoritative for redesign gates.

## Ownership and boundaries

Use bounded ownership and progressive disclosure. Protect existing business logic, API compatibility, `data/`, `knowledge/`, `public/media/`, credentials, local data, and unrelated uncommitted work. Write decision/evidence artifacts only in `.olympus/`. Do not silently replace legacy modules during migration; establish parity first. Do not alter media beyond approved manifest use.

## Evidence and safety

Do not invent user research, analytics, browser evidence, media provenance/rights, or credentials. Record uncertainty. Oracle can explain and draft but cannot mutate without a visible structured proposal and explicit approval. Never reveal secrets or bypass permission boundaries. Any new dependency, WebGL surface, external generation, or migration requires the approved Gate-B plan and documented fallback.

## Frontend quality

Every frontend change must apply and record reviews using Apple Design, UI/UX, and Emil Design guidance. Use accessible primitives, familiar Windows-appropriate patterns, labels, focus, error recovery, keyboard paths, reduced motion/transparency, and purposeful non-decorative motion.

## Verification

Run `npm.cmd run check`, project-context validation, relevant API checks, desktop/narrow visual checks, keyboard primary flow, reduced-motion behavior, and console/runtime checks before handoff. Do not call a redesign final until Gate C.
