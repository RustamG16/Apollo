---
name: project-scaffold
description: Use at the start of any new project or major feature, before writing implementation code. Creates the context files an AI agent needs — PRD, architecture, an essentials digest, agent instructions — then scaffolds the structure before any feature work. Trigger on "new project", "start a project", "set up this repo", "before we build", "scaffold this", "greenfield", or any first request to build something that does not yet exist.
---

# Project Scaffold

Before writing a single line of implementation code, create the context the agent will
otherwise invent. An agent with no PRD guesses at intent; an agent with no architecture
guesses at structure; and both guesses get baked into code before anyone notices.

Six artefacts, in order. **Do not start feature work until all six exist.**

---

## The six

### 1. `prd.md` — the product
What you are building, who it is for, what it actually needs to do. Scope boundaries and
explicit non-goals. No implementation detail.

### 2. `architecture.md` — the technical decisions, in full
Stack, data models, module boundaries, integration points, and **why** each was chosen.
This is the most complete file in the project and it is allowed to be long.

The split from the PRD is simple: **PRD is product, architecture is tech.** If a
statement would survive a total rewrite in another language, it belongs in the PRD.

### 3. `architecture-essentials.md` — the same decisions, as an outline
Not a second document. A **derived digest** of `architecture.md` — the decisions and
constraints only, no rationale, no alternatives considered.

**This is the mechanism that makes the whole practice work.** The agent references the
essentials file for routine work and opens the full architecture only when it needs the
reasoning. Without it, either the agent reads a huge document on every task and burns
context, or it reads nothing and invents structure.

Two rules keep it honest:
- **Derive it from `architecture.md`, never write it in parallel.** Two hand-maintained
  files drift, and a stale digest is worse than no digest.
- **If it stops fitting on roughly one screen, the architecture is too complicated** —
  that is signal about the design, not a reason for a longer outline.

### 4 & 5. `CLAUDE.md` and `AGENTS.md` — agent instructions
How an agent should work inside this project: commands, conventions, test strategy, what
never to touch.

**Write one and have the other reference it.** Maintaining two copies guarantees they
diverge. Put the content in `CLAUDE.md` and make `AGENTS.md` a pointer, or the reverse —
pick one and be consistent across projects.

### 6. The scaffold pass
Have the agent create the folder structure, data models, and stub files **before** any
feature is implemented. Empty directories and barely-drafted files are fine and expected.

The point is that the agent sees the shape of the whole project before it builds any one
part of it. Structure invented feature-by-feature does not converge on a coherent whole.

---

## The adversarial turn — do not skip this

After the files exist and **before** implementation, ask in one prompt:

> What will break? What edge cases are we missing? What is over-engineered?

Then write the answers back into the files.

This is the cheapest moment in the entire project to discover that something should not
be built. The same question after implementation costs a rewrite; before it costs a
paragraph. Expect it to cut scope — if it never cuts anything, it is not being asked
seriously.

---

## Scale it to the work

The full six are for a real project — an app, a service, a site, a substantial feature.
Applying them to a throwaway script is ceremony, and ceremony trains people to skip the
practice when it matters.

| Scope | What to create |
|---|---|
| One-file script, spike, throwaway | Nothing. Just write it. |
| Single feature in an existing codebase | The adversarial turn only. The architecture already exists. |
| New substantial feature | `prd.md` + the adversarial turn |
| New project | All six |

When the project already has an `architecture.md`, **extend it — do not create a second
one.** A repo with two architecture documents has none.

---

## Order matters

The sequence is not decorative:

```
prd.md              intent, before structure
  ↓
architecture.md     structure, informed by intent
  ↓
architecture-essentials.md   derived, never parallel
  ↓
CLAUDE.md / AGENTS.md        how to work here
  ↓
adversarial turn             cut before you build
  ↓
scaffold                     shape before parts
  ↓
now write code
```

Writing architecture before the PRD produces a stack in search of a product. Scaffolding
before the adversarial turn means scaffolding things you are about to delete.
