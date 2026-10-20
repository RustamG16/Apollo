---
name: convenium-style-picker
description: "Path B of the taste profile: pick a built-in doctrine, pre-fill the profile from it, then ask only what the doctrine cannot answer (audience, avoid-list, constraints). For a bespoke profile use convenium-taste-interview."
---
# convenium.design Style Picker

## 1. Present the options

Show all four built-in doctrines with a one-line feel each (pull the one-liner from the
top of each `library/doctrines/<name>/design.md` — don't write a new summary that could
drift from the doctrine file):

- **Atelier** — editorial restraint, type-led, near-still.
- **Kinetic** — motion-first cinema, scroll as narrative.
- **Instrument** — dense and systematic, built for daily use.
- **Cyberpunk Athens** — ancient marble civilization with a neon-tech overlay.

Note that this list grows over time — `library/knowledge/01-skill-repos/mengto-skills.md`
documents ~90 additional named-style references as future expansion room; only the four
above exist as real doctrines today, don't imply more are available.

## 2. Pre-fill from the chosen doctrine

Copy `library/doctrines/<chosen>/profile.json` wholesale as the starting point —
`explicitPreferences`, `avoidList`, `confidence.byField` all at 1.0, `doctrine` set,
`source: "style-pick"`.

## 3. Residual interview — only what the doctrine can't answer

A doctrine has no opinion on these; ask them regardless of which style was picked:

1. "Who's the actual audience for this?" — not a schema field on its own, but folds into
   `explicitPreferences.tone` as a qualifier if it changes the tone answer.
2. "Anything you specifically want to avoid, beyond what this style already avoids?" —
   append to `avoidList`, don't replace the doctrine's own avoid entries.
3. "Any hard project constraints — an existing brand colour that must appear, a platform
   requirement, anything the style shouldn't override?" — append as an additional
   `explicitPreferences` note or a `references` entry with `verdict: "mixed"` and a note
   explaining the constraint.

Keep this short — three questions, not the full eight-question interview. If the user
wants to go deeper, hand off to `convenium-taste-interview` instead of expanding this one.

## 4. Save

`source` stays `"style-pick"` unless the residual interview changed enough that
`"hybrid"` is more accurate (judgement call — if only the three residual questions were
answered, it's still `"style-pick"`; if the user asked to change core preferences from
the doctrine default, it's `"hybrid"`). Write it to the same place as the interview path —
`.olympus/brand-dna.json → taste` in the project, plus `~/.convenium/taste.json` only if the
user wants a personal default — and confirm with the user before use.
