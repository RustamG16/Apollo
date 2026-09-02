# library/ — Apollo's source of truth

Everything an agent needs is authored **here and only here**. The host trees
(`.claude/`, `.agents/skills/`, `.codex/agents/`, `apollo-studio/knowledge/`) are
**generated** from this directory by `tools/project.py` (added in Phase 3). Editing a
generated tree is a defect; the generator overwrites it.

```
library/
├── skills/<category>/<id>/SKILL.md   one skill = one canonical kebab-case id = one folder
├── agents/<name>.md                  5 specialists + the design director, host-neutral (Phase 2)
├── doctrines/<name>/                  design doctrines — profile.json + design.md (direction input)
├── knowledge/                         MNEMOSYNE's verified conclusions (published from KnowledgeFactory)
├── schemas/                           taste-profile.schema.json
├── design-dna/                        the persistent taste profile — filled at runtime (Phase 5)
├── registry/
│   ├── skills.registry.json           one record per skill
│   ├── tools.json · plugins.json · presets.json
│   ├── external-skills.json           plugin/builtin ids referenced but never owned as bodies
│   ├── UNROUTED.md                     skills with no pipeline phase (decision 13)
│   └── UNSORTED.md                     skills that fit no category (decision 12)
└── tools/
    ├── verify.py                       health check — exit 0 = clean
    ├── build_index.py                  regenerates INDEX.md from the registry
    └── project.py                      the host projectors (Phase 3)
```

## Canonical rules

- `name:` in a skill's frontmatter **must equal its folder name**.
- Precedence when stores disagree, highest wins: a real `SKILL.md` body → a
  `sources/upstream/` copy → an Apollo_claude copy → a `runtimePrompt`-only entry (a stub).
- Plugin skills are never copied here as bodies — they are declared in
  `registry/external-skills.json`.
- A skill whose bare name collides with an installed plugin skill keeps its file here but
  its registry `hosts` **excludes `claude`**, so the projection never shadows the plugin.
