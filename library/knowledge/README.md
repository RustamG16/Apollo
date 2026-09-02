# Knowledge

Curated, verified knowledge filed from sources. Where `library/sources/` holds MNEMOSYNE's
raw analysis records, this holds the **conclusions** — organised by what they are for
rather than by where they came from.

Every claim here is marked as observed or inferred, and every external repo was resolved
live against the GitHub API on the date in its frontmatter. Unresolvable claims are
recorded as unsupported rather than repeated.

```
knowledge/
├── 00-rules/            practices promoted to standing rules
├── 01-skill-repos/      external skill repositories, verified
├── 02-tool-inventories/ recommendation lists, assessed against what is installed
├── 03-skill-briefs/     individual skills described by a source
├── 04-ui-references/    UI and design references to build from
├── 05-pending-capture/  supplied but not yet ingested
├── 06-health/           is the local setup correct and correctly used
└── 07-design-systems/   the three design setups
```

## Start here

| If you want to | Read |
|---|---|
| Know what is actually missing from your setup | [02-tool-inventories/gap-analysis.md](02-tool-inventories/gap-analysis.md) |
| Know whether your installed skills are healthy | [06-health/installed-skills-check.md](06-health/installed-skills-check.md) |
| Build the map of your own system | [04-ui-references/system-map-ui.md](04-ui-references/system-map-ui.md) |
| Get three different design outputs from one brief | [07-design-systems/](07-design-systems/README.md) |
| The rule that now applies to every new project | [00-rules/six-files-before-code.md](00-rules/six-files-before-code.md) |

## The two findings that matter most

**1. Ten design skills and the whole superpowers workflow set are installed but stranded.**
They live in `Desktop/DigitalAgency_Saas/lab/005-agency/.claude/skills/` and are
unavailable in every other project — including this one — while
`~/.claude/skill-index/graphic-designer.md` and `skills-library/ROUTING.md` both treat
`awwwards-web-design` as the primary design route. Fixing that recovers more capability
than any download.

**2. `library/design-dna/`, `layout/`, `motion/` and `typography/` are empty.**
MNEMOSYNE captures references and extracts frames; nothing turns those frames into a
profile the design agents read. That missing middle step is exactly what
[`tastemaker`](01-skill-repos/codeswithroh-tastemaker.md) does.

## Conventions

- One file per item. Frontmatter carries id, source, verification date and verdict.
- Verdicts follow MNEMOSYNE's vocabulary: `installed` · `gap` · `park` · `discard`.
- Creator-supplied figures (star counts, time savings, agent counts) are labelled as
  unverified wherever they are repeated.
