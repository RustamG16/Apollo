# 10 — Finish review

The second, **independent** pass over the implementation. The author of the build does not
write this document. Read-only: it scores and names defects; it does not fix them.

`07-qa.md` is the author verifying their own work against the direction. This is someone else
deciding whether the result is good. Both are required — v2 of this system scored 93 here and
that number is the reason its remaining defects were known rather than discovered later.

## Scope

- Route(s) reviewed:
- Viewport(s):
- Evidence read:
- Reviewer: (specialist or skill used)
- Date:

## Score

| Axis | Score | Note |
|---|---:|---|
| Design /40 | | Hierarchy, type, colour, media treatment, craft |
| Usability /30 | | Task completion, affordance, keyboard, error recovery |
| Creativity /20 | | Distinctiveness against the category and against the brief |
| Content /10 | | Copy carries the argument; nothing invented |
| **Total /100** | | |

**Verdict:** PASS / PASS WITH NOTES / FAIL

## Against the committed design system

Check the build against `DESIGN.md`, not against taste. Every drift is a defect.

| Token / rule | Committed | Built | Drift |
|---|---|---|---|

The hero type size is checked explicitly, in vw, against the chosen doctrine's range. A build
that shipped smaller than the committed ramp is a defect regardless of how it looks.

## Defects

| # | Severity | Defect | Expected vs actual |
|---|---|---|---|

## What the author must not do with this document

Fix the defects, then re-run the review once. The QA repair loop is bounded by `AGENTS.md`;
this review does not create a new loop. Remaining defects after the bound are presented to
the user with their trade-offs, not silently carried.
