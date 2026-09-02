---
id: brief-002
skill: systematic-debugging
source: divyannshisharma carousel, slide 5 — https://www.instagram.com/p/Db0wyP_Ev1G/
upstream: github.com/obra/superpowers
local_status: PRESENT but project-local to Desktop/DigitalAgency_Saas/lab/005-agency
filed: '2026-08-28'
---

# systematic-debugging

**Present on this machine but not loaded here.** It lives in
`005-agency/.claude/skills/systematic-debugging`, part of the `obra/superpowers` set. In
any other project — including KnowledgeFactory — it is unavailable. See
[../06-health/installed-skills-check.md](../06-health/installed-skills-check.md).

## The contrast it draws

| Normal debugging | Systematic debugging |
|---|---|
| "Guess. Try. Hope." | "Find the cause. Fix it. Move on." |
| Try this, try that, guess, get frustrated, waste 3 hours | A four-phase structured bug hunt |
| Maybe this? What if it's this? Try again. Still broken. 3 hours later… | Identify → log → isolate → fix |

## The four phases

1. **Identify the component boundary** — narrow to which part owns the failure
2. **Add targeted logging** — instrument the narrowed area
3. **Isolate the root cause** — from evidence, not hypothesis
4. **Fix with confidence** — because the cause is known

## The claim

Average time to fix a bug drops from **2–3 hours to 15–30 minutes**.

> "It's not guessing. It's Root Cause Analysis."
> "Less guessing. More root causes."

Treat the timing figure as the creator's, unverified.

## Why it is worth un-stranding

The mechanism is the same one that makes `architecture-essentials.md` work in
[the six-files rule](../00-rules/six-files-before-code.md): **structure the approach
before the work, so the agent cannot flail.** Phase 1 in particular — establish the
component boundary before touching anything — is the step an unguided agent always skips,
and skipping it is what produces the three-hour version.

This is a general-purpose engineering skill sitting in one project's folder. It has no
agency-specific content. Moving `obra/superpowers` to `~/.claude/skills/` would make it
available everywhere at zero acquisition cost.
