#!/usr/bin/env python3
"""Health check for Apollo's unified library. Exit 0 = clean, 1 = problems.

Checks:
  1. every skill folder has SKILL.md whose frontmatter `name:` equals the folder name
  2. exactly one registry record per skill folder, and one folder per record
  3. every record's `phase` is a valid value
  4. every record has a non-empty `description`
  5. no canonical id appears in two category folders
  6. every record's `hosts` is a non-empty subset of {claude, codex, studio}
  7. `three-js-implementation` appears nowhere in the library
  8. no Apollo_claude agent bodies leaked into library/agents (only the 6 sanctioned files)
  9. registry `status` is one of active | stub | manual
"""
import json, os, re, sys

LIB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILLS = os.path.join(LIB, "skills")
REG = os.path.join(LIB, "registry", "skills.registry.json")

VALID_PHASES = {"always", "diagnose", "direct", "prepare", "build", "verify", "unrouted"}
VALID_HOSTS = {"claude", "codex", "studio"}
VALID_STATUS = {"active", "stub", "manual"}
SANCTIONED_AGENTS = {
    "visual-analyst", "independent-critic", "asset-producer", "design-engineer",
    "analytics-specialist", "design-director",
}

bad = []


def name_of(path):
    txt = open(path, encoding="utf-8", errors="replace").read()
    m = re.match(r"^---\s*\n(.*?)\n---", txt, re.S)
    if not m:
        return None
    n = re.search(r"^name:\s*(.+)$", m.group(1), re.M)
    return n.group(1).strip().strip("\"'") if n else None


folders = {}  # id -> [categories]
for cat in sorted(os.listdir(SKILLS)):
    catdir = os.path.join(SKILLS, cat)
    if not os.path.isdir(catdir):
        continue
    for sid in sorted(os.listdir(catdir)):
        sdir = os.path.join(catdir, sid)
        if not os.path.isdir(sdir):
            continue
        folders.setdefault(sid, []).append(cat)
        p = os.path.join(sdir, "SKILL.md")
        if not os.path.isfile(p):
            bad.append(f"{cat}/{sid}: no SKILL.md")
            continue
        if name_of(p) != sid:
            bad.append(f"{cat}/{sid}: frontmatter name != folder ({name_of(p)!r})")

for sid, cats in folders.items():
    if len(cats) > 1:
        bad.append(f"{sid}: exists in multiple categories {cats}")

reg = json.load(open(REG, encoding="utf-8"))
reg_ids = [r["id"] for r in reg]
if len(reg_ids) != len(set(reg_ids)):
    bad.append("duplicate id in skills.registry.json")

for r in reg:
    if r["id"] not in folders:
        bad.append(f"registry record {r['id']} has no skill folder")
    if r["phase"] not in VALID_PHASES:
        bad.append(f"{r['id']}: invalid phase {r['phase']!r}")
    if not str(r.get("description", "")).strip():
        bad.append(f"{r['id']}: empty description")
    hosts = r.get("hosts") or []
    if not hosts or not set(hosts) <= VALID_HOSTS:
        bad.append(f"{r['id']}: invalid hosts {hosts!r}")
    if r.get("status") not in VALID_STATUS:
        bad.append(f"{r['id']}: invalid status {r.get('status')!r}")

for sid in folders:
    if sid not in set(reg_ids):
        bad.append(f"skill folder {sid} has no registry record")

if os.path.isdir(os.path.join(LIB, "skills", "spatial")) or "three-js-implementation" in folders:
    bad.append("three-js-implementation / spatial folder still present in library")

agents_dir = os.path.join(LIB, "agents")
if os.path.isdir(agents_dir):
    for f in os.listdir(agents_dir):
        if f == "README.md":
            continue
        if f.endswith(".md") and f[:-3] not in SANCTIONED_AGENTS:
            bad.append(f"unsanctioned agent file in library/agents: {f}")
    for a in SANCTIONED_AGENTS:
        if not os.path.isfile(os.path.join(agents_dir, f"{a}.md")):
            bad.append(f"missing sanctioned agent file: {a}.md")

print(f"skills {len(folders)} | registry records {len(reg)}")
for b in bad:
    print("FAIL ", b)
print("\nCLEAN" if not bad else f"\n{len(bad)} problem(s)")
sys.exit(1 if bad else 0)
