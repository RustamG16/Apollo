"""Generate .impeccable/design.json from the tokens that are actually in src/styles.css.

Mirrors the artifact the `impeccable` skill produces (schemaVersion 2). That skill is
projected into this environment as SKILL.md only -- its scripts/ and reference/ playbooks are
not installed -- so the design system is generated here instead, from the live stylesheet, so
the JSON can never drift from the CSS the way a hand-transcribed copy would.

    python .olympus/tools/build_design_system.py
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CSS = ROOT / "src" / "styles.css"
OUT = ROOT / ".impeccable" / "design.json"


# --- colour maths: sRGB -> OKLCH, so the tonal ramps are computed, not eyeballed -----------

def srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_to_oklch(hex_str: str) -> tuple[float, float, float]:
    h = hex_str.lstrip("#")
    r, g, b = (srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4))

    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = l ** (1 / 3), m ** (1 / 3), s ** (1 / 3)

    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

    import math
    C = math.hypot(a, bb)
    H = math.degrees(math.atan2(bb, a)) % 360
    return round(L * 100, 1), round(C, 3), round(H, 1)


RAMP_STEPS = [15, 25, 35, 45, 55, 68, 82, 95]


def ramp(hex_str: str) -> list[str]:
    _, c, h = hex_to_oklch(hex_str)
    return [f"oklch({step}% {c:.3f} {h:.1f})" for step in RAMP_STEPS]


# --- read the live tokens ------------------------------------------------------------------

def read_tokens() -> dict[str, str]:
    text = CSS.read_text(encoding="utf-8")
    root = text[text.index(":root {"):text.index("\n}", text.index(":root {"))]
    return {m.group(1): m.group(2).strip()
            for m in re.finditer(r"--([\w-]+):\s*([^;]+);", root)}


def main() -> None:
    t = read_tokens()

    colour_roles = {
        "ground":      ("primary",   "Slate-cast Near-black", "The page's ambient truth. 20 of 30 supplied photographs sit below mean luminance 90/255, and 38 of 60 dominant colours fall within RGB-90 of the brand slate."),
        "ground-2":    ("primary",   "Lifted Ground",         "Ground raised ~5% for the Essentials strip and the dialog surface."),
        "slate":       ("primary",   "Dark Slate Gray",       "Locked brand colour. Ambient, not an event."),
        "auburn-deep": ("secondary", "Lacquer Oxblood",       "Brand auburn as the room's own light records it -- measured #3A1708 in the supplied dining room, RGB-108 from the pure brand value. The material beat's field."),
        "auburn":      ("secondary", "Auburn",                "Locked brand colour. Rules, display type on the material beat, and the reservation action."),
        "hunyadi":     ("accent",    "Lamp Hunyadi",          "Locked brand colour, and the single luminous accent. Arrives once, as a lamp, behind the chef."),
        "vanilla":     ("accent",    "Vanilla",               "Locked brand colour. Display type throughout, and the spilled light at the hero moment."),
        "bone":        ("neutral",   "Bone",                  "All reading text. Vanilla desaturated, so vanilla itself stays an event rather than becoming the body colour."),
        "bone-2":      ("neutral",   "Muted Bone",            "Meta, captions, the clock."),
        "ink-dark":    ("neutral",   "Ink",                   "Text and focus ring on the light fields."),
    }

    type_roles = {
        "hero":    ("Bodoni Moda Variable, Bodoni MT, Didot, Times New Roman, serif", t.get("t-hero"), 500, "0.78", "0.02em",
                    "The wordmark, once, at the cold open. 15vw at 1920 -- the apollo-kinetic doctrine calls for 12-18vw and an earlier draft of this build shipped 6vw, which is the single number that most held the design back."),
        "display": ("Bodoni Moda Variable, Bodoni MT, Didot, Times New Roman, serif", t.get("t-display"), 500, "0.86", "-0.02em",
                    "Every section headline. High optical contrast -- thick stem, hairline serif -- which is how brass reads against lacquer, and the room is literally made of both."),
        "sub":     ("Bodoni Moda Variable, Bodoni MT, Didot, Times New Roman, serif", t.get("t-sub"), 500, "1.05", "-0.01em",
                    "Course names in the menu listbox."),
        "lead":    ("Archivo Variable, Helvetica Neue, Arial, sans-serif", t.get("t-lead"), 400, "1.5", "0",
                    "The one paragraph each beat is allowed. Capped at 46ch."),
        "body":    ("Archivo Variable, Helvetica Neue, Arial, sans-serif", t.get("t-body"), 400, "1.55", "0",
                    "Reading text."),
        "label":   ("JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace", t.get("t-meta"), 400, "1.35", "0.14em",
                    "The clock, the eyebrows, the beat timestamps and every unfilled placeholder. Confined to metadata -- a mono is the right voice for a timestamp and the wrong one for anything else."),
    }

    doc = {
        "schemaVersion": 2,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "title": "Design System: SAVRA — Mise en Place",
        "generatedBy": ".olympus/tools/build_design_system.py, read from src/styles.css",
        "extensions": {
            "colorMeta": {
                name: {
                    "value": t.get(name),
                    "role": role,
                    "displayName": display,
                    "rationale": why,
                    "tonalRamp": ramp(t[name]) if t.get(name, "").startswith("#") else [],
                }
                for name, (role, display, why) in colour_roles.items()
                if t.get(name)
            },
            "typographyMeta": {
                name: {
                    "fontFamily": fam,
                    "fontSize": size,
                    "fontWeight": weight,
                    "lineHeight": lh,
                    "letterSpacing": ls,
                    "usage": usage,
                }
                for name, (fam, size, weight, lh, ls, usage) in type_roles.items()
                if size
            },
            "shadows": [
                {"name": "none", "value": "none",
                 "usage": "There are no shadows. The room is lit by pooled light, not by elevation; "
                          "every separation on this page is a rule, a field change, or real photographic depth."},
            ],
            "motion": [
                {"name": "micro", "value": t.get("dur-micro"), "usage": "State feedback only."},
                {"name": "move", "value": t.get("dur-move"), "usage": "Element transitions, including the menu Flip."},
                {"name": "scene", "value": t.get("dur-scene"), "usage": "Section entrances and field changes."},
                {"name": "ease-out", "value": t.get("ease-out"), "usage": "Everything that arrives."},
                {"name": "ease-in-out", "value": t.get("ease-in-out"), "usage": "Everything that crosses."},
                {"name": "scrub", "value": "1", "usage": "Never 0 — a scrub of 0 pins to raw scroll position and stutters."},
            ],
            "breakpoints": [
                {"name": "target", "value": "1920x1080",
                 "usage": "The single designed viewport, fixed by the client. There is no breakpoint matrix."},
                {"name": "degrade", "value": "1100px",
                 "usage": "Below this the 12-column grid collapses to 6 and split beats stack. Not a designed composition — a guarantee that a narrowed window does not break."},
                {"name": "no-pin", "value": "900px",
                 "usage": "Nothing pins below this. Currently academic: this build pins nowhere."},
            ],
        },
        "components": [
            {"name": "Reserve Button", "kind": "button", "reference": "src/components/Header.tsx",
             "spec": "Auburn field, vanilla text (6.63:1 measured), 1px auburn border, mono at 13px / 0.1em, "
                     "square. Hover inverts to transparent with hunyadi text. Persistent in the header from the "
                     "first frame — the narrative is the intended path to the reservation, not the only one."},
            {"name": "Primary CTA", "kind": "button", "reference": "src/components/BeatOpening.tsx",
             "spec": "The same pairing at 15px / 0.18em with 4rem horizontal padding, at the hero moment."},
            {"name": "Course Option", "kind": "listbox option", "reference": "src/components/BeatPass.tsx",
             "spec": "role=option in a role=listbox with roving tabindex, one tab stop. Selected state is an inset "
                     "3px hunyadi rule plus a weight change to 600 — never colour alone. Click, hover, focus and "
                     "arrow keys all select."},
            {"name": "Plate Panel", "kind": "media surface", "reference": "src/components/BeatPass.tsx",
             "spec": "The panel behind the plate takes the selected photograph's measured background colour "
                     "(--pass-field), transitioning over 400ms. Course 5's measured #365862 sits RGB-7 from the "
                     "brand slate, so the photograph has no visible edge at all. Every course image is feathered "
                     "7.5% at the border so textured grounds cannot band against a flat field."},
            {"name": "Doors", "kind": "motion element", "reference": "src/components/Doors.tsx",
             "spec": "Two ground-coloured panels, transform: scaleX only, opening 62% -> 0% cover across the first "
                     "viewport height. Compositor work, never a paint. Scoped to the hero: as a document-length "
                     "mask they narrowed every section below them, which is a bad trade on a page whose only asset "
                     "is photography."},
            {"name": "Placeholder", "kind": "inline token", "reference": "src/components/Placeholder.tsx",
             "spec": "Bracketed, mono, --bone-2, dashed underline, with a screen-reader suffix reading 'not yet "
                     "supplied'. Every fact the media does not contain renders through this and nowhere else."},
            {"name": "Reservation Dialog", "kind": "dialog", "reference": "src/components/Reservation.tsx",
             "spec": "Native <dialog> + showModal(), so focus trap, Escape, backdrop and inertness are the "
                     "platform's. Visible labels, per-field error text, aria-invalid, a role=alert summary, and a "
                     "prototype disclosure present before submission as well as after."},
            {"name": "Section Entry", "kind": "motion pattern", "reference": "src/lib/motion.ts",
             "spec": "A class toggle driven by IntersectionObserver, plus a CSS transition — deliberately not a "
                     "GSAP tween. An entrance built on gsap.from({opacity:0}) strands content invisible whenever "
                     "the animation does not complete. Sections already on screen are shown at once, never hidden "
                     "and faded back in."},
        ],
        "narrative": {
            "northStar": "Mise en Place",
            "overview": "SAVRA in the hour before service — the room laid, the lamps on, the doors still shut. "
                        "The scroll is the clock running to 18:00. The single hero moment is the doors opening, "
                        "and the reservation is the resolution of the page's only tension rather than a button "
                        "in a footer.",
            "evidence": "Twenty-eight of the thirty supplied photographs contain no person. The dining room is "
                        "shot laid and empty three times; a table is set for two nobody is sitting at; the chef "
                        "works alone. The only other human being in the set is a stranger passing outside. A page "
                        "that stages an arriving guest has to argue against its own pictures.",
            "keyCharacteristics": [
                "A slate-cast near-black ground for most of the page, because the photography measures that dark.",
                "Auburn, hunyadi and vanilla each arrive exactly once, each tied to a beat where that colour is physically in the frame.",
                "Photography runs full-bleed and at full strength; type is placed where the image is already dark rather than dimming the image to suit the type.",
                "Display type at 12-18vw, per the apollo-kinetic doctrine.",
                "One hero moment, and the aperture that opens onto it.",
            ],
            "rules": [
                {"name": "The Waiting Rule",
                 "body": "The restaurant is never shown occupied. No invented diners, no service in progress, no crowd. The subject is readiness."},
                {"name": "The Three Arrivals Rule",
                 "body": "Auburn, hunyadi and vanilla appear once each, in that order, and never as general-purpose accents. Spending them evenly spends them."},
                {"name": "The Measured Pairing Rule",
                 "body": "Colours are never composed by eye. Legal text pairings are fixed in src/lib/contrast.ts and an illegal one is a compile error, not a QA finding."},
                {"name": "The Field Follows the Photograph Rule",
                 "body": "Where a photograph sits on a coloured panel, that panel's colour is measured from the photograph, never chosen."},
                {"name": "The One Hero Rule",
                 "body": "The doors opening is the page's only climax. Beat 2's clip is a passage and must stay one."},
                {"name": "The Honest Placeholder Rule",
                 "body": "No address, hours, price, telephone, chef name or service pattern is invented. Unknown facts render as visible placeholders and appear as launch blockers in the handoff."},
                {"name": "The Legibility Floor Rule",
                 "body": "No entrance may leave content invisible if its animation does not run. Content is visible by default; the hidden start state is opt-in and only for what is off-screen."},
            ],
            "dos": [
                "Do let the photography run full-bleed and at full opacity; it is the only asset this brand has.",
                "Do set display type large enough to carry a 1920-wide frame — 12-18vw for the hero.",
                "Do place type where the photograph is already dark, and scrim the type block rather than the picture.",
                "Do keep the ground near-black and let the three warm colours be events.",
                "Do measure every contrast pairing on the rendered page, not from the token table alone.",
                "Do mark every unsupplied fact as unsupplied, in the interface and in the handoff.",
            ],
            "donts": [
                "Don't box a photograph inside a text column when it could run to the viewport edge.",
                "Don't dim an image to make type legible when a local scrim would do.",
                "Don't add a second hero moment, or let the clip's section grow into one.",
                "Don't use hunyadi on auburn or on vanilla — measured 3.26 and 2.03, both illegal.",
                "Don't build an entrance that hides content until an animation completes.",
                "Don't invent prices, hours, an address, a chef, press or awards.",
            ],
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(doc, indent=2), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}")
    print(f"  colours: {len(doc['extensions']['colorMeta'])}  "
          f"type roles: {len(doc['extensions']['typographyMeta'])}  "
          f"components: {len(doc['components'])}  rules: {len(doc['narrative']['rules'])}")


if __name__ == "__main__":
    main()
