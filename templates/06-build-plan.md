# [Project] — [direction name]

**This document is the design, not a task list.** It is written before implementation and it
is the thing the build is made from. If someone read only this file they should be able to
picture the finished page.

Write it in plan mode where the host has one, then implement from it in a fresh session. A
build that starts from a complete design document beats one that discovers the design while
typing, and the whole conversation that produced the plan is dead weight during the build.

## Outcome

One paragraph: what is being built, for whom, and what the visitor should feel. Then the
primary action, and the secondary action if there is one.

State the direction policy explicitly. If the brief granted full creative freedom or refused
alternatives, say so here — it becomes an acceptance criterion at the bottom of this file.

## Creative system

The part most build plans skip, and the part that decides whether the result is any good.

- **Art direction:** the world in one line. Name what it is *not*, too.
- **Palette:** every colour with its hex and its role. Which one is ambient, which are events.
- **Type:** display face and why, text face and why, and anything confined to metadata. The
  hero size **as a number**, checked against the chosen doctrine's `--display-max`.
- **Material:** texture, light, edges, depth. What the surfaces are made of.
- **Composition:** the grid, where type sits relative to media, what bleeds and what is
  contained, and the one rule that keeps it coherent.

## Page sequence and media map

One numbered entry per section, each naming **the exact source files it uses**. This is the
map that stops the build inventing content or reaching for whatever is nearest.

### 1. [Section name] — [height]

- Assets: `exact-filename.jpg`, `exact-filename.mp4`
- What happens here, in two or three sentences, including the movement.
- Copy intent: what the words have to do. Note anything that must not be invented.

Repeat per section. Then:

- **Unused assets:** name them and say why. An asset dropped for a stated reason is a
  decision; an asset silently unused is an oversight.

## Motion and interaction choreography

- Which library, and the specific job each one earns its place with.
- Every scroll-linked or timed sequence, named, with what moves and what it hands off to.
- Hover, focus and cursor behaviour, with their bounds.
- What is disabled for touch, keyboard and reduced motion — and what the static end state is.

## Implementation notes

Stack, dependencies, asset pipeline, token strategy, loading strategy. Short. The creative
system above is the part that needs the words.

## Responsive behavior

Per breakpoint, what changes — not "it stacks". If the client fixed a single target viewport,
say so and state what degradation is still required.

## Performance guardrails

LCP, INP, frame budget, payload ceiling. Mark each as a target or a measurement; do not let a
guardrail read as a result.

## Build order

Numbered. Static hierarchy verified in a browser before any motion. Motion after the layout
is stable. Verification last, bounded.

## Acceptance criteria

What must be true for this to be done. Include the direction policy from Outcome, the media
map's completeness, the primary action's reachability, and the accessibility and motion
guarantees. Write them so someone else could check them.

## Research basis

Live URLs for anything claimed as current practice, a platform behaviour, or a trend. If the
brief asked for what is current, this section is not optional — and it is the only place the
plan is allowed to cite something it did not measure itself.
