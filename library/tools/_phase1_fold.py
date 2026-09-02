#!/usr/bin/env python3
"""Phase 1 one-time fold: build Apollo/library/ from KF library + studio-six + personal skills.
Idempotent-ish: wipes library/skills, library/registry, library/knowledge, library/doctrines,
library/schemas before rebuilding. Does NOT touch library/tools (hand-authored) beyond origins.json.
"""
import json, os, re, shutil, sys, hashlib

APOLLO = r"D:\Analyst_Designer\Apollo"
KF = r"D:\KnowledgeFactory\library"
AC = r"D:\KnowledgeFactory\Apollo_claude"
PERSONAL = r"C:\Users\Rustam Gurbanov\.claude\skills"
STUDIO_KN = os.path.join(APOLLO, "apollo-studio", "knowledge", "skills")
LIB = os.path.join(APOLLO, "library")
SCRATCH = os.path.dirname(os.path.abspath(__file__))

skillsmjs = json.load(open(os.path.join(SCRATCH, "skillsmjs.json"), encoding="utf-8"))
MJS = {s["id"]: s for s in skillsmjs["skills"]}
KF_MAN = json.load(open(os.path.join(KF, "MANIFEST.json"), encoding="utf-8"))
KF_CAT = {s["name"]: s["category"] for s in KF_MAN["skills"]}

VALID_PHASES = {"always", "diagnose", "direct", "prepare", "build", "verify", "unrouted"}

# ---- decisions -------------------------------------------------------------
CLAUDE_EXCLUDE = {  # decision 9: collide with a plugin skill of the same bare name
    "gsap-core", "gsap-frameworks", "gsap-performance", "gsap-plugins", "gsap-react",
    "gsap-scrolltrigger", "gsap-timeline", "gsap-utils", "impeccable",
    "apple-design", "emil-design-eng", "seo-audit",
}
STUBS = {  # decision 10: runtimePrompt-only -> status stub, hosts studio only
    "taste-first-experience-design", "ethical-gamification-systems", "agent-identity-and-portfolio",
}
DMI_MANUAL = {"pick-ui-library", "prototype", "review-animations"}  # decision 11

STUDIO_SIX = {
    "ui-ux": dict(category="01-design-direction", phase="diagnose", group="Craft", defaultOn=True,
                  body=os.path.join(STUDIO_KN, "craft", "ui-ux", "sources", "upstream", "SKILL.md")),
    "apple-design": dict(category="01-design-direction", phase="direct", group="Craft", defaultOn=True,
                         body=os.path.join(PERSONAL, "apple-design", "SKILL.md")),
    "emil-design-eng": dict(category="01-design-direction", phase="build", group="Craft", defaultOn=True,
                            body=os.path.join(PERSONAL, "emil-design-eng", "SKILL.md")),
    "taste-first-experience-design": dict(category="01-design-direction", phase="direct", group="Experience", defaultOn=False, body=None),
    "ethical-gamification-systems": dict(category="11-meta-system", phase="direct", group="Progression", defaultOn=False, body=None),
    "agent-identity-and-portfolio": dict(category="11-meta-system", phase="prepare", group="Agents", defaultOn=False, body=None),
}

M06 = {
    "ab-testing", "ad-creative", "ads", "ai-seo", "aso", "attribution", "churn-prevention",
    "co-marketing", "cold-email", "community-marketing", "competitors", "cro",
    "directory-submissions", "emails", "free-tools", "influencer-marketing", "launch",
    "lead-magnets", "marketing-council", "marketing-ideas", "marketing-loops", "marketing-plan",
    "marketing-psychology", "offers", "onboarding", "paywalls", "popups", "pricing",
    "product-marketing", "programmatic-seo", "prospecting", "public-relations", "referrals",
    "revops", "schema", "seo-audit", "signup", "site-architecture", "sms", "social",
}
PERSONAL_CATEGORY = {}
for _i in M06:
    PERSONAL_CATEGORY[_i] = "06-marketing-growth"
PERSONAL_CATEGORY.update({
    "pick-ui-library": "02-web-build", "prototype": "02-web-build",
    "animate": "03-motion-3d", "animation-vocabulary": "03-motion-3d",
    "find-animation-opportunities": "03-motion-3d", "improve-animations": "03-motion-3d",
    "review-animations": "03-motion-3d", "video": "03-motion-3d",
    "remotion-best-practices": "03-motion-3d", "remotion-captions": "03-motion-3d",
    "remotion-create": "03-motion-3d", "remotion-docs": "03-motion-3d",
    "remotion-interactivity": "03-motion-3d", "remotion-maps": "03-motion-3d",
    "remotion-markup": "03-motion-3d", "remotion-multimedia": "03-motion-3d",
    "remotion-render": "03-motion-3d", "remotion-saas": "03-motion-3d",
    "remotion-studio": "03-motion-3d", "remotion-upgrade": "03-motion-3d",
    "image": "04-media-generation",
    "content-strategy": "05-content-copy", "copy-editing": "05-content-copy",
    "copywriting": "05-content-copy", "sales-enablement": "05-content-copy",
    "analytics": "07-research-intel", "competitor-profiling": "07-research-intel",
    "customer-research": "07-research-intel",
    "project-scaffold": "09-engineering-workflow",
    # apple-design / emil-design-eng handled by STUDIO_SIX (same canonical id)
})

# KF skills that carry no skills.mjs seed and no routing-table phase -> unrouted,
# except these explicit assignments:
KF_EXPLICIT = {
    "gsap-utils": dict(phase="prepare", group="Motion", defaultOn=False),      # fixes defect 4
    "apollo-taste-interview": dict(phase="direct", group="Taste", defaultOn=False),
    "apollo-style-picker": dict(phase="direct", group="Taste", defaultOn=False),
}

GROUP_TITLES = {
    "01-design-direction": "Direction", "02-web-build": "Web Build", "03-motion-3d": "Motion",
    "04-media-generation": "Media", "05-content-copy": "Content", "06-marketing-growth": "Growth",
    "07-research-intel": "Research", "08-qa-review": "QA", "09-engineering-workflow": "Engineering",
    "10-docs-deliverables": "Docs", "11-meta-system": "Meta",
}

# ---- helpers -------------------------------------------------------------
def read_frontmatter(path):
    txt = open(path, encoding="utf-8", errors="replace").read()
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", txt, re.S)
    if not m:
        return {}, txt
    fm = {}
    for line in m.group(1).splitlines():
        mm = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if mm:
            v = mm.group(2).strip()
            if len(v) >= 2 and v[0] in "\"'" and v[-1] == v[0]:
                v = v[1:-1]
            fm[mm.group(1)] = v
    return fm, m.group(2)

def copytree(src, dst):
    shutil.copytree(src, dst, dirs_exist_ok=True)

def norm_name(path):
    fm, _ = read_frontmatter(path)
    return fm.get("name")

# ---- wipe generated-from-source parts of library -----------------------
for sub in ("skills", "registry", "knowledge", "doctrines", "schemas", "design-dna"):
    p = os.path.join(LIB, sub)
    if os.path.isdir(p):
        shutil.rmtree(p)
os.makedirs(os.path.join(LIB, "registry"), exist_ok=True)
os.makedirs(os.path.join(LIB, "design-dna"), exist_ok=True)
os.makedirs(os.path.join(LIB, "schemas"), exist_ok=True)
os.makedirs(os.path.join(LIB, "tools"), exist_ok=True)

records = {}          # id -> record
folder_of = {}        # id -> category
report = {"duplicates": [], "unrouted": [], "unsorted": [], "halts": []}

def add_skill(sid, category, src_dir=None, body_file=None, phase="unrouted", group=None,
              defaultOn=False, runtimePrompt="", status="active", hosts=None, description=None,
              name=None, dmi=False):
    if sid in records:
        report["halts"].append(f"duplicate canonical id at build time: {sid}")
        return
    if group is None:
        group = GROUP_TITLES.get(category, "Unrouted")
    if hosts is None:
        hosts = ["claude", "codex", "studio"]
        if sid in CLAUDE_EXCLUDE and "claude" in hosts:
            hosts = ["codex", "studio"]
    dest = os.path.join(LIB, "skills", category, sid)
    os.makedirs(dest, exist_ok=True)
    # materialise the body
    if src_dir and os.path.isdir(src_dir):
        copytree(src_dir, dest)
    if body_file:
        shutil.copyfile(body_file, os.path.join(dest, "SKILL.md"))
    skill_md = os.path.join(dest, "SKILL.md")
    if status == "stub" and not os.path.isfile(skill_md):
        open(skill_md, "w", encoding="utf-8").write(
            f"---\nname: {sid}\ndescription: {description}\nstatus: stub\n---\n\n"
            f"# {name or sid}\n\n> Stub. This skill exists only as a runtime prompt; it has no authored body.\n"
            f"> The Studio registry carries it. It is not projected for Claude or Codex.\n\n"
            f"{runtimePrompt}\n")
    # normalise frontmatter name to folder
    if os.path.isfile(skill_md):
        fm, bod = read_frontmatter(skill_md)
        desc = description or fm.get("description", "").strip()
        if fm.get("name") != sid:
            txt = open(skill_md, encoding="utf-8", errors="replace").read()
            m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", txt, re.S)
            if m:
                fmlines = []
                had = False
                for line in m.group(1).splitlines():
                    if re.match(r"^name:\s*", line):
                        fmlines.append(f"name: {sid}"); had = True
                    else:
                        fmlines.append(line)
                if not had:
                    fmlines.insert(0, f"name: {sid}")
                open(skill_md, "w", encoding="utf-8").write("---\n" + "\n".join(fmlines) + "\n---\n" + m.group(2))
            report["duplicates"].append(f"{sid}: frontmatter name normalised to folder")
    else:
        desc = description or ""
    if not desc:
        report["halts"].append(f"{sid}: empty description")
    rec = dict(id=sid, name=name or (MJS.get(sid, {}).get("name")) or sid,
               phase=phase, group=group, defaultOn=bool(defaultOn),
               description=desc, runtimePrompt=runtimePrompt or "",
               category=category, hosts=hosts, status=status)
    if dmi:
        rec["disableModelInvocation"] = True
    records[sid] = rec
    folder_of[sid] = category
    if phase == "unrouted":
        report["unrouted"].append(sid)
    if category == "99-unsorted":
        report["unsorted"].append(sid)

# ---- 1. KF library skills --------------------------------------------------
for cat in sorted(os.listdir(os.path.join(KF, "skills"))):
    catdir = os.path.join(KF, "skills", cat)
    if not os.path.isdir(catdir):
        continue
    for sid in sorted(os.listdir(catdir)):
        sdir = os.path.join(catdir, sid)
        if not os.path.isfile(os.path.join(sdir, "SKILL.md")):
            continue
        seed = MJS.get(sid)
        if seed:
            add_skill(sid, cat, src_dir=sdir, phase=seed["phase"], group=seed["group"],
                      defaultOn=seed["defaultOn"], runtimePrompt=seed.get("runtimePrompt", ""),
                      description=seed["description"], name=seed["name"], status="active")
        elif sid in KF_EXPLICIT:
            e = KF_EXPLICIT[sid]
            add_skill(sid, cat, src_dir=sdir, phase=e["phase"], group=e["group"],
                      defaultOn=e["defaultOn"], status="active")
        else:
            add_skill(sid, cat, src_dir=sdir, phase="unrouted", status="active")

# ---- 2. studio-six -------------------------------------------------------
for sid, cfg in STUDIO_SIX.items():
    seed = MJS.get(sid, {})
    status = "stub" if sid in STUBS else "active"
    hosts = ["studio"] if sid in STUBS else None
    add_skill(sid, cfg["category"], body_file=cfg["body"], phase=cfg["phase"], group=cfg["group"],
              defaultOn=cfg["defaultOn"], runtimePrompt=seed.get("runtimePrompt", ""),
              description=seed.get("description"), name=seed.get("name"), status=status, hosts=hosts)

# ---- 3. personal skills ------------------------------------------------
for sid in sorted(os.listdir(PERSONAL)):
    sdir = os.path.join(PERSONAL, sid)
    if not os.path.isfile(os.path.join(sdir, "SKILL.md")):
        continue
    if sid in records:  # apple-design / emil-design-eng already folded via studio-six
        report["duplicates"].append(f"{sid}: personal copy is byte-identical to studio-six upstream; "
                                    f"canonical body kept from personal, single folder retained (decision 9/precedence)")
        continue
    cat = PERSONAL_CATEGORY.get(sid, "99-unsorted")
    status = "manual" if sid in DMI_MANUAL else "active"
    add_skill(sid, cat, src_dir=sdir, phase="unrouted", status=status,
              dmi=(sid in DMI_MANUAL))

# ---- 4. knowledge, doctrines, schemas ---------------------------------
copytree(os.path.join(KF, "knowledge"), os.path.join(LIB, "knowledge"))
os.makedirs(os.path.join(LIB, "doctrines"), exist_ok=True)
for d in sorted(os.listdir(os.path.join(AC, "profiles", "doctrines"))):
    s = os.path.join(AC, "profiles", "doctrines", d)
    if os.path.isdir(s):
        copytree(s, os.path.join(LIB, "doctrines", d))
shutil.copyfile(os.path.join(KF, "systems", "schemas", "taste-profile.schema.json"),
                os.path.join(LIB, "schemas", "taste-profile.schema.json"))
open(os.path.join(LIB, "design-dna", ".gitkeep"), "w").write(
    "# taste profiles land here at runtime (Phase 5). empty until then.\n")

# ---- 5. registry files ------------------------------------------------
reg = [records[k] for k in sorted(records)]
json.dump(reg, open(os.path.join(LIB, "registry", "skills.registry.json"), "w", encoding="utf-8"),
          indent=2, ensure_ascii=False)
for arr in ("tools", "plugins", "presets"):
    json.dump(skillsmjs[arr], open(os.path.join(LIB, "registry", f"{arr}.json"), "w", encoding="utf-8"),
              indent=2, ensure_ascii=False)

# external-skills.json: plugin ids that must NOT be owned as bodies + builtin ids
ext = {
    "_comment": "Skill ids referenced but NOT owned as bodies in this library. "
                "plugin = installed Claude plugin (decision 9: never copied as a body). "
                "builtin = Anthropic-shipped. Personal skills are now folded into library/skills "
                "and are no longer external.",
    "plugin": ["design:accessibility-review", "design:design-critique", "design:design-handoff",
               "design:design-system", "design:research-synthesis", "design:user-research",
               "design:ux-copy", "brightdata-plugin:competitive-intel",
               "anthropic-skills:emil-design-eng", "apple-design", "impeccable",
               "anthropic-skills:gsap-core", "anthropic-skills:gsap-scrolltrigger",
               "dataviz", "seo-audit"],
    "builtin": ["anthropic-skills:brand-guidelines", "anthropic-skills:docx", "anthropic-skills:pdf",
                "anthropic-skills:pptx", "anthropic-skills:frontend-design",
                "anthropic-skills:web-design-pro", "artifact-capabilities"],
    "unresolved": ["claude-api"],
}
json.dump(ext, open(os.path.join(LIB, "registry", "external-skills.json"), "w", encoding="utf-8"),
          indent=2, ensure_ascii=False)

# UNROUTED.md / UNSORTED.md
unr = sorted(report["unrouted"])
with open(os.path.join(LIB, "registry", "UNROUTED.md"), "w", encoding="utf-8") as f:
    f.write("# Unrouted skills\n\n")
    f.write("These skills are in the library and are projected to their hosts, but have no "
            "derivable phase in Apollo's redesign pipeline (decision 13). They are available "
            "capabilities, invoked explicitly, and are excluded from `ROUTING-DIGEST.md`'s "
            "active table.\n\n")
    f.write(f"Count: {len(unr)}\n\n")
    by_cat = {}
    for sid in unr:
        by_cat.setdefault(records[sid]["category"], []).append(sid)
    for cat in sorted(by_cat):
        f.write(f"## {cat}\n\n")
        for sid in sorted(by_cat[cat]):
            f.write(f"- `{sid}` — {records[sid]['description'][:140]}\n")
        f.write("\n")
with open(os.path.join(LIB, "registry", "UNSORTED.md"), "w", encoding="utf-8") as f:
    f.write("# Unsorted skills\n\n")
    f.write("Personal skills that fit no existing category (decision 12): `category: 99-unsorted`, "
            "`defaultOn: false`, `phase: unrouted`.\n\n")
    us = sorted(report["unsorted"])
    f.write(f"Count: {len(us)}\n\n")
    if not us:
        f.write("_None — every folded skill resolved to a category._\n")
    for sid in us:
        f.write(f"- `{sid}` — {records[sid]['description'][:140]}\n")

# origins.json for the new location
json.dump({
    "_comment": "library/ is now the source of truth inside Apollo. The host trees "
                "(.claude, .agents, .codex, apollo-studio/knowledge) are GENERATED from it "
                "by tools/project.py. This file only records where external upstreams live, "
                "for reference.",
    "personal-upstream": {"windows": PERSONAL, "env": "PERSONAL_SKILLS_DIR"},
    "apollo-claude-donor": {"windows": AC, "env": "APOLLO_CLAUDE_DIR"},
    "knowledgefactory-donor": {"windows": KF, "env": "KF_LIBRARY_DIR"},
}, open(os.path.join(LIB, "tools", "origins.json"), "w", encoding="utf-8"), indent=2)

# ---- report -----------------------------------------------------------
print(f"skills folded: {len(records)}")
from collections import Counter
print("by category:", dict(sorted(Counter(r['category'] for r in reg).items())))
print("by status  :", dict(sorted(Counter(r['status'] for r in reg).items())))
print("by phase   :", dict(sorted(Counter(r['phase'] for r in reg).items())))
print(f"unrouted: {len(unr)}   unsorted: {len(report['unsorted'])}")
bad_phase = [r['id'] for r in reg if r['phase'] not in VALID_PHASES]
print("invalid phase:", bad_phase)
print("empty description:", [r['id'] for r in reg if not r['description'].strip()])
if report["halts"]:
    print("\n!!! HALTS:")
    for h in report["halts"]:
        print("  ", h)
    sys.exit(1)
json.dump(report, open(os.path.join(SCRATCH, "fold_report.json"), "w", encoding="utf-8"), indent=1)
print("\nOK")
