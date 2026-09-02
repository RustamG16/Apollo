#!/usr/bin/env python3
"""Phase 2: convert .codex/agents/*.toml -> library/agents/<name>.md (host-neutral)."""
import json, os, re, sys

APOLLO = r"D:\Analyst_Designer\Apollo"
TOML_DIR = os.path.join(APOLLO, ".codex", "agents")
OUT = os.path.join(APOLLO, "library", "agents")
os.makedirs(OUT, exist_ok=True)

reg = {r["id"]: r for r in json.load(open(os.path.join(APOLLO, "library", "registry",
       "skills.registry.json"), encoding="utf-8"))}

# the single sanctioned correction to a broken skill token in the source .toml
TOKEN_FIX = {"emil-design-engineering": "emil-design-eng"}

# explicit skills: lists (canonical ids). "official GSAP skills" -> the gsap family.
GSAP = ["gsap-core", "gsap-timeline", "gsap-scrolltrigger", "gsap-react",
        "gsap-frameworks", "gsap-performance", "gsap-plugins"]
SKILLS = {
    "analytics-specialist": ["design-analytics"],
    "asset-producer": ["asset-director"],
    "design-engineer": ["impeccable", "emil-design-eng", "webgl-experience"] + GSAP,
    "independent-critic": ["award-rubric", "visual-qa"],
    "visual-analyst": ["ux-evidence-audit", "reference-deconstruction"],
}


def parse_toml(path):
    txt = open(path, encoding="utf-8").read()
    d = {}
    m = re.search(r'developer_instructions\s*=\s*"""(.*?)"""', txt, re.S)
    d["developer_instructions"] = m.group(1).strip("\n") if m else ""
    for k in ("name", "description", "sandbox_mode"):
        mm = re.search(rf'^{k}\s*=\s*"([^"]*)"', txt, re.M)
        if mm:
            d[k] = mm.group(1)
    return d


problems = []
converted = {}
for f in sorted(os.listdir(TOML_DIR)):
    if not f.endswith(".toml"):
        continue
    d = parse_toml(os.path.join(TOML_DIR, f))
    name = d["name"]
    access = "read-only" if d.get("sandbox_mode") == "read-only" else "write"
    body = d["developer_instructions"]
    # apply the one sanctioned token fix
    fixed = body
    for bad, good in TOKEN_FIX.items():
        fixed = fixed.replace("$" + bad, "$" + good)
    # round-trip check: reversing the fix must give the source byte-for-byte
    rev = fixed
    for bad, good in TOKEN_FIX.items():
        rev = rev.replace("$" + good, "$" + bad)
    if rev != body:
        problems.append(f"{name}: body does not round-trip to .toml source")
    # skill-id validation
    for sid in SKILLS[name]:
        r = reg.get(sid)
        if not r:
            problems.append(f"{name}: skill '{sid}' not in registry")
        elif r["status"] != "active":
            problems.append(f"{name}: skill '{sid}' status={r['status']} (need active)")
    # also validate every $token in the fixed body
    for tok in re.findall(r"\$([a-z][a-z0-9-]+)", fixed):
        if tok not in reg:
            problems.append(f"{name}: body $token '{tok}' not a registry id")
        elif reg[tok]["status"] != "active":
            problems.append(f"{name}: body $token '{tok}' not active")

    fm = [
        "---",
        f"name: {name}",
        f"description: {d['description']}",
        f"access: {access}",
        "skills: [" + ", ".join(SKILLS[name]) + "]",
        "---",
        "",
        f"# {name}",
        "",
        fixed,
        "",
    ]
    open(os.path.join(OUT, f"{name}.md"), "w", encoding="utf-8").write("\n".join(fm))
    converted[name] = body

# design-director.md — new, written for the first time
DD = """---
name: design-director
description: Owns one interpretation of the brief and routes an evidence-based website redesign through explicit A/B/C gates. Never delegates design, build, research, asset, analytics, and QA into one undifferentiated pass.
access: write
skills: [olympus-design-director, apollo-taste-interview, apollo-style-picker, ux-evidence-audit, reference-deconstruction, concept-studio, award-rubric, asset-director, webgl-experience, awwwards-web-design, design-analytics, visual-qa]
---

# design-director

Act as the single Olympus Design Director. Own the sequence, keep the context small, and
activate a specialist or skill only when its routing condition in `ARCHITECTURE.md` is true.

## Own the run

1. Read `ARCHITECTURE-ESSENTIALS.md`, then `AGENTS.md`, then `START-HERE.md`. Load a
   specific product/architecture/history file only when the current decision needs it.
2. Ask the intake questions from `START-HERE.md` once, in one message, skipping anything the
   attached material already answers. Resolve the direction block in `templates/00-brief.md`
   from the answers, the supplied references, and `library/design-dna/`. If direction is
   still unresolved, run `$apollo-taste-interview` or `$apollo-style-picker` before Gate A
   and write the result to `library/design-dna/`.
3. Create `<website-project>/.olympus/` from `templates/` and record phase and gate state in
   `run.json`.

## Route by phase

- **Diagnose** — `$ux-evidence-audit` on an existing page; `$reference-deconstruction` for
  approved references. Greenfield: skip the audit, let reference deconstruction carry the
  evidence phase. Deliver `01-audit.md`. **Gate A: approve the brief.**
- **Direct** — `$concept-studio` produces the one direction the brief specifies (more only
  on explicit request). `$award-rubric` critiques that frozen direction read-only; it may
  reject it, it may not author a replacement. Deliver `02-concepts.md`, `03-critique.md`.
  **Gate B: select the direction.**
- **Prepare** — `$asset-director` only if the direction needs new media; `05-asset-manifest.md`
  before any image/video service. `$webgl-experience` only if it passes its activation test.
  `$awwwards-web-design` and GSAP skills only when the build plan activates them. Deliver
  `06-build-plan.md`.
- **Build** — implement only the Gate-B direction, in the allowed files only. Preserve the
  project stack; reuse components. Verify the smallest slice early.
- **Verify** — `$visual-qa` across routes, breakpoints, states, reduced motion.
  `$design-analytics` only when measurement is in scope. At most two author-fix / critic
  cycles, then escalate tradeoffs to the user. Deliver `07-qa.md`, `08-metrics.md`,
  `09-handoff.md`. **Gate C: client review.**

## Delegation policy

One specialist at a time by default; two only for independent read-only analysis. No nested
delegation — a specialist returns to the director. The director integrates every result and
owns all user communication.
"""
open(os.path.join(OUT, "design-director.md"), "w", encoding="utf-8").write(DD)
for tok in re.findall(r"\$([a-z][a-z0-9-]+)", DD):
    if tok not in reg:
        problems.append(f"design-director: $token '{tok}' not a registry id")
    elif reg[tok]["status"] != "active":
        problems.append(f"design-director: $token '{tok}' not active")

# README for the agents dir
open(os.path.join(OUT, "README.md"), "w", encoding="utf-8").write(
    "# library/agents/ — host-neutral specialists\n\n"
    "Six agents: the five bounded specialists converted from `.codex/agents/*.toml`, plus the\n"
    "`design-director` (written down here as an agent for the first time).\n\n"
    "`$name` in a body is the **host-neutral skill marker**. `tools/project.py` translates it:\n"
    "Codex keeps `$name`; Claude rewrites it as \"the *name* skill (Skill tool)\".\n\n"
    "`access: read-only` agents get no Write/Edit in any host projection.\n\n"
    "The only edit made during conversion: the broken token `$emil-design-engineering` in\n"
    "`design-engineer` was corrected to the canonical id `$emil-design-eng`.\n")

print("converted:", sorted(converted))
if problems:
    print("\n!!! PROBLEMS")
    for p in problems:
        print("  ", p)
    sys.exit(1)
print("\nOK — 6 agent files, all skill refs valid & active")
