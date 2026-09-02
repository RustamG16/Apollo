# Apollo Unification — Progress Log

Executor: Claude Code, unattended. Plan: `PLAN-UNIFICATION.md` v3.
Resume rule: read this file, find the last phase marked **PASS**, resume at the next phase.

---

## Phase 0 — safety net, off-machine — **PASS** (2026-09-02)

### Actions
- `git add -A` + commit `pre-unification snapshot` on `main` (commit `4ad1fb1`).
- `git tag pre-unification` created on that commit.
- `git checkout -b unification` — working branch created.
- `git push -u origin unification` — pushed OK.
- `git push origin pre-unification` — tag pushed OK. **Remote tag is the real safety net.**
- `D:\KnowledgeFactory` is **not a git repository** (no `.git`, no remote configured).
  Per Phase 0 step 5, this is recorded here and execution continues. No snapshot/tag/push
  was possible for KnowledgeFactory. Its `library/` is the read-only donor for Phase 1.

### Pre-change baseline (this is what later phases compare against)

| Store | Count |
|---|---|
| `.agents/skills/` (SKILL.md files) | 27 |
| `apollo-studio/knowledge/skills/` (README.md leaf folders) | 25 |
| `apollo-studio/skills.mjs` (`skills` array entries) | 24 |
| `~/.claude/skills/` (skill folders) | 71 |
| `D:\KnowledgeFactory\library\skills\` (SKILL.md files) | 52 |

- `npm.cmd run check` in `apollo-studio`: **EXIT 0 — PASSED.** This is the baseline;
  later phases halt only on a *new* failure.
- Notes: `apollo-studio/data/*.jsonl` and `node_modules/` gitignored — snapshot does not
  cover run data (correct; `data/` protected by out-of-scope rule only).
- `test_projects/EcoPowerTech` is itself a nested git repo; captured in the snapshot as a
  gitlink. Out of scope — not touched further.

### HALT CHECK — Phase 0
- [x] Apollo repo clean after snapshot commit.
- [x] KnowledgeFactory: not a git repo — recorded, continuing (per plan).
- [x] `unification` branch exists and is pushed to `origin`.
- [x] `pre-unification` tag exists on `origin`.
- [x] This file records all five counts and the `npm check` baseline.

**Result: PASS. Proceeding to Phase 1.**

---

## Phase 1 — build the library — **PASS** (2026-09-02)

### Actions
- Copied `D:\KnowledgeFactory\library\{skills,knowledge}` and `systems/schemas/taste-profile.schema.json`
  into `Apollo\library\`. Did **not** copy `agents/`, `sources/`, `frames/`, `design-dna/`,
  `layout/`, `motion/`, `typography/`, `systems/` (loadouts/routing/pipelines/rules).
- Created empty `library/design-dna/` (publish target for Phase 5).
- Folded the 6 Studio-store skills:
  - `ui-ux` — body from `apollo-studio/.../craft/ui-ux/sources/upstream/SKILL.md`; 01-design-direction, diagnose/Craft/defaultOn.
  - `apple-design`, `emil-design-eng` — bodies from personal skills (byte-identical to the
    studio `sources/upstream` copies after newline normalisation; precedence keeps one folder).
    `hosts` excludes `claude` (decision 9). 01-design-direction, direct+build/Craft.
  - `taste-first-experience-design`, `ethical-gamification-systems`, `agent-identity-and-portfolio`
    — `status: stub`, `hosts: ["studio"]` (decision 10). Stub `SKILL.md` written (registry
    carries the runtimePrompt; not projected to Claude/Codex).
- Folded all **71** personal skills from `C:\Users\Rustam Gurbanov\.claude\skills`.
  `apple-design` + `emil-design-eng` collapsed into the studio-six ids (documented duplicates).
  Remaining 69 folded fresh. Categories assigned: 05-content-copy (4) and 06-marketing-growth (40)
  filled; 03-motion-3d +18; 07-research-intel +3; 02-web-build +2; 04-media-generation +1;
  09-engineering-workflow +1. **No skill landed in 99-unsorted** — every one resolved to a category.
  `pick-ui-library`, `prototype`, `review-animations` → `status: manual`, `disable-model-invocation`
  preserved (decision 11).
- Deleted `three-js-implementation`: removed its `customSkills` entry from
  `apollo-studio/knowledge/index.json` and deleted `apollo-studio/knowledge/skills/spatial/`.
  (`overrides` and `sources` left untouched per the plan; one now-dangling `sources` ref remains,
  which the plan explicitly forbids touching.)
- Brought the 4 doctrines from `Apollo_claude\profiles\doctrines\` into `library/doctrines/`
  as knowledge (`profile.json` + `design.md` each): apollo-atelier, apollo-cyberpunk-athens,
  apollo-instrument, apollo-kinetic.
- `apollo-taste-interview`, `apollo-style-picker`, `taste-profile.schema.json` already present
  via the KF library copy / schemas copy. Taste skills routed `phase: direct`, group `Taste`.
- Built `library/registry/skills.registry.json` — 127 records. Seeded phase/group/defaultOn/
  runtimePrompt/description/name from `skills.mjs` for the 18 KF∩mjs skills + 6 studio-six;
  `gsap-utils` → `phase: prepare` (fixes defect 4); everything else with no derivable phase →
  `phase: unrouted` (decision 13).
- Copied `skills.mjs` `tools` / `plugins` / `presets` arrays verbatim into
  `library/registry/{tools,plugins,presets}.json`.
- Wrote `library/registry/external-skills.json`, `UNROUTED.md` (100 skills), `UNSORTED.md` (0).
- Rewrote `library/tools/origins.json` for the unified location; added `verify.py` + `build_index.py`.
- Fold script kept at `scratchpad/fold_library.py`; report at `scratchpad/fold_report.json`.

### Counts
| Category | Skills |
|---|---|
| 01-design-direction | 11 |
| 02-web-build | 3 |
| 03-motion-3d | 27 |
| 04-media-generation | 11 |
| 05-content-copy | 4 |
| 06-marketing-growth | 40 |
| 07-research-intel | 5 |
| 08-qa-review | 4 |
| 09-engineering-workflow | 12 |
| 10-docs-deliverables | 2 |
| 11-meta-system | 8 |
| **Total** | **127** |

status: active 121 · manual 3 · stub 3.
phase: always 1 · diagnose 3 · direct 7 · prepare 8 · build 5 · verify 3 · unrouted 100.

### Documented duplicates (decision 9)
- `apple-design` — personal copy byte-identical to `apollo-studio/.../craft/apple-design/sources/upstream/SKILL.md` (normalised). One folder kept, body = personal, `hosts` excludes claude.
- `emil-design-eng` — same: personal copy byte-identical to the studio `sources/upstream` copy. One folder kept, `hosts` excludes claude.
No case of "two different real bodies for one id" — no HALT.

### HALT CHECK — Phase 1
- [x] `verify.py` exits 0 (`CLEAN`, 127 skills / 127 records).
- [x] Exactly one registry record per skill folder and one folder per record.
- [x] No `library/agents/` content (directory not created yet; Phase 2).
- [x] No `three-js-implementation` anywhere (removed from studio; never in library).
- [x] Every `phase` is a valid value; every skill has a non-empty `description`; no id in two folders.
- [x] Total 127 ≥ 52 + 6 + 71 − 2 = 127.

**Result: PASS. Proceeding to Phase 2.**

---

## Phase 2 — the agent layer, host-neutral — **PASS** (2026-09-02)

### Actions
- Converted the 5 `.codex/agents/*.toml` specialists into `library/agents/<name>.md`:
  `visual-analyst`, `independent-critic`, `analytics-specialist` (`access: read-only`),
  `asset-producer`, `design-engineer` (`access: write`). Frontmatter: `name`, `description`
  (from the toml), `access`, `skills: [...]` (canonical ids). Body = `developer_instructions`
  verbatim.
- Added `library/agents/design-director.md` — the role `START-HERE.md` describes, written as
  an agent for the first time. `access: write`.
- `library/agents/README.md` documents that `$name` is the host-neutral skill marker
  (`project.py` keeps `$name` for Codex, rewrites for Claude) and `access: read-only` → no
  Write/Edit in any projection.
- **One sanctioned edit during conversion:** the source `design-engineer.toml` contains the
  broken token `$emil-design-engineering` (not a registry id). Corrected to the canonical
  `$emil-design-eng`. This is the only non-identity substitution; it round-trips to the
  source exactly when reversed. Documented in `library/agents/README.md`.
- `.codex/agents/*.toml` left in place (Phase 3's `project.py codex` will regenerate them).
- `verify.py` extended: `library/agents/` may contain only the 6 sanctioned `.md` files
  (+ `README.md`), and all 6 must be present.

### HALT CHECK — Phase 2
- [x] Six agent files present (`visual-analyst`, `independent-critic`, `asset-producer`,
      `design-engineer`, `analytics-specialist`, `design-director`).
- [x] Every skill id referenced (frontmatter `skills:` + body `$tokens`) exists in the
      registry with `status: active` — validated by `scratchpad/build_agents.py`.
- [x] Every agent has `access` set.
- [x] The five converted bodies round-trip to their `.toml` source byte-for-byte; the single
      documented substitution is `$emil-design-engineering` ↔ `$emil-design-eng`
      (src 405/433/536/358/417 → body 405/433/**528**/358/417; the 8-char delta is exactly
      that token correction).
- [x] `verify.py` exits 0.

**Result: PASS. Proceeding to Phase 3.**

---

## Phase 3 — generators — **PASS** (2026-09-02)

### Actions
- Wrote `library/tools/project.py` (stdlib only). Subcommands: `claude`, `codex`, `studio`,
  `digest`, plus `all`. Every subcommand supports `--dry-run`.
  - `claude` → `.claude/skills/<id>/` (full skill folder) + `.claude/agents/<name>.md` for
    every record with `claude` in `hosts` (excludes the 3 stubs). Agent `tools:` derives from
    `access`: read-only → `Read, Glob, Grep, Bash, WebFetch`; write → + `Write, Edit,
    NotebookEdit`. Body `$name` markers rewritten to "the *name* skill (Skill tool)".
  - `codex` → `.agents/skills/<id>/` + `.codex/agents/<name>.toml` (`name`, `description`,
    `sandbox_mode` only when read-only, `developer_instructions`). Body keeps `$name`.
  - `studio` → `apollo-studio/knowledge/skills/<group>/<id>/README.md` (group lowercased) +
    `apollo-studio/skills.registry.json` (`{skills,tools,plugins,presets}`, field shapes
    identical to `skills.mjs`). Studio projection writes README.md only and **never touches
    `sources/`** or `knowledge/index.json`.
  - `digest` → `library/registry/ROUTING-DIGEST.md`: id, phase, one line, for the 27
    pipeline-active skills only.
- Delete budget implemented: a file is deleted only if it is in that root's previous
  `MANIFEST.txt` **and** the root has `GENERATED.md`; otherwise hard halt. First run (no
  `MANIFEST.txt`) writes only, deletes nothing. Each root gets `GENERATED.md` + `MANIFEST.txt`
  on a real (non-dry) run.

### HALT CHECK — Phase 3
- [x] `project.py claude --dry-run` → exit 0, 0 deletes (`.claude/skills` 1019 writes,
      `.claude/agents` 6).
- [x] `project.py codex --dry-run` → exit 0, 0 deletes (`.agents/skills` 895 writes,
      `.codex/agents` 6).
- [x] `project.py studio --dry-run` → exit 0, 0 deletes (127 README writes + 1 registry).
- [x] `project.py digest --dry-run` → exit 0 (1 write, 27 active skills).
- [x] `git status` after the dry runs shows only the newly-authored `library/tools/project.py`
      — the dry runs wrote nothing.
- [x] Every planned delete list is empty on this first pass.

**Result: PASS. Proceeding to Phase 4.**

---
