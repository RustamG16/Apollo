---
name: ux-evidence-audit
description: Diagnose an existing website page with browser, source, content, accessibility, responsive, and available analytics evidence before design work begins. Use for redesigns, weak-performing pages, visual-quality reviews, conversion problems, or unclear interfaces where causes must be prioritized before concepts.
---

# UX Evidence Audit

Audit the actual experience before prescribing a style. Inspect the target route at representative desktop and mobile widths and relevant interaction states.

## Build an evidence inventory

Record the route/build, viewport, state, screenshot or source location, available analytics, and any access limitation. Label each claim as:

- **Observed** — directly visible or measured.
- **Inferred** — plausible explanation that needs validation.
- **Unknown** — missing evidence that could change the recommendation.

## Inspect six dimensions

1. **Purpose and action** — can the intended audience understand the offer and next action?
2. **Information hierarchy** — does the page establish focal order, grouping, and scanning rhythm?
3. **Visual system** — are type, color, spacing, imagery, and components coherent and distinctive?
4. **Interaction and content** — are controls, states, copy, feedback, and trust cues clear?
5. **Responsive and inclusive behavior** — mobile structure, keyboard/focus, contrast, semantics, reduced motion, and readable sizing.
6. **Runtime quality** — broken states, console/network issues, loading behavior, layout shifts, and obvious performance risks.

## Prioritize

Score findings by severity and confidence. Prefer a small number of causal problems over a long taste-based checklist.

| Severity | Meaning |
|---|---|
| Critical | Blocks the main task, access, or reliable use |
| High | Materially harms comprehension, trust, conversion, or a major viewport |
| Medium | Causes friction or inconsistent quality |
| Low | Polish issue with limited behavioral effect |

## Output

Write `01-audit.md` using the system template. Include:

- current experience in one sentence;
- no more than five highest-leverage findings;
- evidence, affected user/business outcome, severity, and confidence;
- what already works and should be protected;
- unanswered questions and missing media;
- a concise design problem statement.

Do not create concepts, edit production code, or call something broken solely because it differs from personal taste.

