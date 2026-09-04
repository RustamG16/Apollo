"""Generate public/media/ from the read-only originals in media/.

Three jobs, none of which the layout should be asked to do:

1. **Exclude the generation mark.** Every supplied still carries a four-point mark at a fixed
   relative position -- measured at x in [91.2%, 94.6%], y in [84.2%, 90.4%] on the five
   frames whose backgrounds are clean enough to measure it against. Rather than trimming it
   off after the fact, the aspect crop each asset needs anyway is *solved* so that its window
   excludes the mark zone. One operation, not two.

2. **Measure the background.** Beat 5 sets the page field to each course photograph's own
   background so the plate appears to rest on the page rather than inside a rectangle. That
   colour is measured from the cropped result's border ring and written into the manifest --
   it is never eyeballed.

3. **Strip the clip's audio** and emit mp4 + webm + a poster frame. The doctrine forbids
   autoplaying audio and the source carries an AAC track.

media/ is never modified. public/media/ is disposable; delete and re-run.

    python .olympus/tools/prepare_media.py
"""

from __future__ import annotations

import json
import shutil
import subprocess
from dataclasses import dataclass, field
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
MEDIA = ROOT / "media"
OUT = ROOT / "public" / "media"
MANIFEST = ROOT / ".olympus" / "evidence" / "asset-manifest.json"

# The generation-mark exclusion zone, as a fraction of the frame. Generous against the
# measured box so a crop is never marginally safe.
MARK_X = 0.895
MARK_Y = 0.825

WEBP_Q = 82


@dataclass
class Asset:
    id: str
    stem: str
    aspect: float          # target width / height
    out_w: int             # emitted width; never upscaled past what the crop can supply
    purpose: str
    alt: str               # "" means decorative
    fx: float = 0.5        # focal point, fraction of the source frame
    fy: float = 0.5
    measure_field: bool = False   # sample the border ring for --pass-field
    thumb_w: int = 0              # emit an additional small variant at this width
    zoom: float = 1.0             # <1 tightens the crop; a detail crop must actually be one
    feather: bool = False         # fade the outer edge into the field so no seam can band


ASSETS: list[Asset] = [
    # --- beat 0/1 : the street -------------------------------------------------------
    Asset("street", "SAVRA_restaurant_entrance_in_Vienna", 16 / 9, 1200,
          "beat 0-1 full-bleed. The LCP element.",
          "The SAVRA shopfront at dusk on a Vienna side street: a dark slate frame around a "
          "warmly lit dining room, one figure passing on the cobbles.",
          fx=0.50, fy=0.46),

    # --- beat 2 : the room (poster for the clip) --------------------------------------
    Asset("room-poster", "Empty_dining_room_interior_view", 16 / 9, 1200,
          "beat 2 poster frame and the reduced-motion still for the clip.",
          "The dining room before service: lacquered oxblood panelling, brass inlay, "
          "slate tables laid with linen, every chair empty.",
          fx=0.50, fy=0.45),

    # --- beat 3 : what it is made of ---------------------------------------------------
    Asset("material-weave", "Stone_meets_textured_linen_weave", 3 / 2, 900,
          "beat 3 primary material tile.",
          "Oatmeal linen falling over a slate edge, met by a brass line and black oak.",
          fx=0.42, fy=0.50),
    Asset("material-setting", "Table_settings_with_linen_runner", 3 / 4, 700,
          "beat 3 secondary material tile.",
          "A place setting on slate: a cream plate on a linen runner, cutlery engraved SAVRA, "
          "a smoked-glass lamp at the edge of frame.",
          fx=0.45, fy=0.55),
    Asset("material-weave-detail", "Stone_meets_textured_linen_weave", 1 / 1, 520,
          "beat 3 tight crop of the same weave frame -- declared as a crop, not a third asset.",
          "", fx=0.66, fy=0.38, zoom=0.42),
    Asset("material-setting-detail", "Table_settings_with_linen_runner", 1 / 1, 520,
          "beat 3 tight crop of the same setting frame -- declared as a crop.",
          "", fx=0.58, fy=0.76, zoom=0.40),

    # --- beat 4 : one pair of hands ----------------------------------------------------
    Asset("hands", "Chef_plating_at_pass", 3 / 4, 820,
          "beat 4. The only person on the page.",
          "A chef alone at the pass under a single pendant lamp, both hands resting either "
          "side of a white plate holding one leaf.",
          fx=0.45, fy=0.48),

    # --- beat 5 : the pass. 4:3 so Flip only ever interpolates position and scale -------
    Asset("course-1", "Flatbread_served_with_smoked_butter", 4 / 3, 1000,
          "beat 5, course 1.",
          "Blistered flatbread with za'atar and green oil on a teal oval dish, smoked butter "
          "in a small bowl beside it, on slate.",
          fx=0.46, fy=0.60, measure_field=True, thumb_w=340, feather=True),
    Asset("course-2", "Salt-baked_beetroot_dish_on_plate", 4 / 3, 1000,
          "beat 5, course 2.",
          "Salt-baked beetroot on labneh with hazelnuts and herb oil, seen from above on a "
          "teal plate against dark slate.",
          fx=0.66, fy=0.50, measure_field=True, thumb_w=340, feather=True),
    Asset("course-3", "Charcoal_sea_bass_with_fennel", 4 / 3, 1000,
          "beat 5, course 3.",
          "Charred sea bass under shaved fennel and dill on a teal oval plate, on a worn "
          "wooden table.",
          fx=0.50, fy=0.55, measure_field=True, thumb_w=340, feather=True),
    Asset("course-4", "Food_photography_of_plated_dish", 4 / 3, 1000,
          "beat 5, course 4.",
          "A roasted aubergine half with tahini, sumac and herbs on a cream plate, on slate.",
          fx=0.46, fy=0.55, measure_field=True, thumb_w=340, feather=True),
    Asset("course-5", "Dish_plated_on_dark_slate", 4 / 3, 1000,
          "beat 5, course 5. Default selection -- its background measures within RGB-7 of "
          "the brand slate, which is where the field-matching idea came from.",
          "Sliced duck breast with charred parsnip and blackcurrant, seen from above on a "
          "teal plate against a flat slate-blue ground.",
          fx=0.62, fy=0.50, measure_field=True, thumb_w=340, feather=True),
    Asset("course-6", "Quince_dessert_with_yogurt_and", 4 / 3, 1000,
          "beat 5, course 6.",
          "Saffron-poached quince with thick yoghurt, pistachio and a shard of brittle in a "
          "cream bowl, lacquered panelling behind.",
          fx=0.50, fy=0.62, measure_field=True, thumb_w=340, feather=True),

    # --- beat 6 : they open -------------------------------------------------------------
    Asset("door", "Threshold_opening_to_stone_table", 16 / 9, 1200,
          "beat 6. The hero moment.",
          "A dark door standing ajar in a slate wall, warm light spilling from the room "
          "beyond onto a single laid table.",
          fx=0.50, fy=0.48),
    Asset("room-lit", "Savra_dining_room_before_service", 3 / 2, 900,
          "beat 6 support. Carries the set's only measured vanilla (#D8CDBC over 31% of frame).",
          "The dining room lit and laid, seen straight down the centre aisle.",
          fx=0.50, fy=0.45),
    Asset("table", "Table_set_for_two", 3 / 4, 760,
          "beat 6 closing image. The table the reservation is for.",
          "One slate table set for two against a dark panelled wall, a single lamp lit "
          "between the two settings.",
          fx=0.50, fy=0.52),
]

CLIP = "Camera_tracking_through_dining_room"
CLIP_IN = 4.6      # seconds into the source; see emit_clip()
CLIP_LEN = 3.4     # seconds kept


# --------------------------------------------------------------------------------------


def find(stem: str) -> Path:
    for p in MEDIA.glob("*"):
        if p.name.startswith(stem):
            return p
    raise FileNotFoundError(stem)


def solve_crop(w: int, h: int, aspect: float, fx: float, fy: float,
               zoom: float = 1.0) -> tuple[int, int, int, int]:
    """Largest window at `aspect`, biased to the focal point, that excludes the mark zone.

    Two candidate bounds -- stop before the mark horizontally, or stop above it vertically.
    Take whichever keeps more pixels. Raises if neither can satisfy the aspect, which would
    mean the asset needs a different target ratio rather than a silent bad crop.
    """
    candidates = []
    for limit_w, limit_h in ((int(w * MARK_X), h), (w, int(h * MARK_Y))):
        cw = min(limit_w, int(limit_h * aspect))
        ch = int(cw / aspect)
        cw, ch = int(cw * zoom), int(ch * zoom)
        if ch > limit_h:
            ch = limit_h
            cw = int(ch * aspect)
        if cw < 64 or ch < 64:
            continue
        # position by focal point, clamped inside the allowed box
        x = int(fx * w - cw / 2)
        y = int(fy * h - ch / 2)
        x = max(0, min(x, limit_w - cw))
        y = max(0, min(y, limit_h - ch))
        candidates.append((cw * ch, x, y, cw, ch))
    if not candidates:
        raise ValueError("no crop window excludes the mark zone at this aspect")
    _, x, y, cw, ch = max(candidates)
    return x, y, cw, ch


def border_colour(im: Image.Image, ring: float = 0.06) -> str:
    """Median colour of the outer ring of the cropped frame -- the surface the subject sits
    on. This is what the page field is set to, so the seam around the photograph vanishes."""
    import statistics

    small = im.convert("RGB").resize((200, 200))
    px = small.load()
    band = max(2, int(200 * ring))
    samples = []
    for i in range(200):
        for j in list(range(band)) + list(range(200 - band, 200)):
            samples.append(px[i, j])
            samples.append(px[j, i])
    r = statistics.median(s[0] for s in samples)
    g = statistics.median(s[1] for s in samples)
    b = statistics.median(s[2] for s in samples)
    return "#%02X%02X%02X" % (int(r), int(g), int(b))


def feather_edge(im: Image.Image, frac: float = 0.075) -> Image.Image:
    """Fade the outer border into transparency.

    The page paints each course's measured background behind the photograph. Where that
    background is genuinely flat (course-5, measured #365862 against brand slate #335C67)
    the seam already vanishes. Where the surface is textured or vignetted it would band --
    a single measured colour cannot match a gradient. Dissolving the edge makes the trick
    hold for every course instead of only the flat ones.
    """
    from PIL import ImageDraw, ImageFilter

    w, h = im.size
    pad = max(6, int(min(w, h) * frac))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rectangle([pad, pad, w - pad, h - pad], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(pad * 0.55))
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def emit(a: Asset) -> dict:
    src = find(a.stem)
    with Image.open(src) as im:
        W, H = im.size
        x, y, cw, ch = solve_crop(W, H, a.aspect, a.fx, a.fy, a.zoom)
        crop = im.convert("RGB").crop((x, y, x + cw, y + ch))

        out_w = min(a.out_w, cw)          # never upscale
        out_h = round(out_w / a.aspect)
        main = crop.resize((out_w, out_h), Image.LANCZOS)
        if a.feather:
            main = feather_edge(main)
        main_path = OUT / f"{a.id}.webp"
        main.save(main_path, "WEBP", quality=WEBP_Q, method=6)

        rec = {
            "id": a.id,
            "source": src.name,
            "purpose": a.purpose,
            "alt": a.alt,
            "decorative": a.alt == "",
            "crop": {"x": x, "y": y, "w": cw, "h": ch, "of": [W, H]},
            "mark_excluded": True,
            "file": f"media/{a.id}.webp",
            "width": out_w,
            "height": out_h,
            "bytes": main_path.stat().st_size,
            "upscaled": False,
        }
        if a.out_w > cw:
            rec["note"] = (f"requested {a.out_w}px but the mark-safe crop supplies {cw}px; "
                           f"emitted at source resolution rather than upscaling")

        if a.thumb_w:
            tw = min(a.thumb_w, cw)
            th = round(tw / a.aspect)
            tp = OUT / f"{a.id}-thumb.webp"
            th_im = crop.resize((tw, th), Image.LANCZOS)
            if a.feather:
                th_im = feather_edge(th_im, 0.06)
            th_im.save(tp, "WEBP", quality=WEBP_Q, method=6)
            rec["thumb"] = {"file": f"media/{a.id}-thumb.webp", "width": tw, "height": th,
                            "bytes": tp.stat().st_size}

        if a.measure_field:
            rec["field"] = border_colour(crop)
            rec["feathered"] = a.feather

    return rec


def emit_clip() -> dict:
    """Trim, crop, grade and mute the supplied clip.

    The clip is the only moving asset in the set and it belongs to the register the audit
    rejected -- its first four seconds are the warm bistro building with red door frames,
    timber beams and ochre plaster, not the formal lacquered SAVRA room. Its *last* three
    seconds are not: by then the frame is one lamp, one laid table for two, linen and
    glassware, which is register-neutral and is exactly the page's thesis.

    So the clip is trimmed to that passage, cropped past the generation mark, and graded
    cooler and deeper to sit in the page's world. This is a declared transformation, recorded
    in the manifest -- not a hidden retouch.
    """
    src = find(CLIP)
    mp4 = OUT / "room.mp4"
    webm = OUT / "room.webm"
    poster = OUT / "room-poster-frame.webp"

    vf = (f"crop=iw*{MARK_X}:ih*0.86:0:0,scale=1120:-2,"
          "eq=saturation=0.75:contrast=1.12:brightness=-0.04:gamma=0.96,"
          "colorbalance=rs=-0.07:gs=-0.03:bs=0.11:rm=-0.05:gm=-0.02:bm=0.06:rh=-0.03:bh=0.04")
    trim = ["-ss", str(CLIP_IN), "-t", str(CLIP_LEN)]

    # -an strips the AAC track at the container level; the element is muted as well.
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *trim, "-i", str(src), "-an",
                    "-vf", vf, "-c:v", "libx264", "-crf", "24", "-preset", "slow",
                    "-movflags", "+faststart", str(mp4)], check=True)
    # No WebM. VP9 encoded this 3.4s clip *larger* than the h264 (566 kB vs 287 kB), and
    # h264/mp4 is supported by every browser this page targets. A second, bigger encoding
    # that is never the better choice is just payload.
    if webm.exists():
        webm.unlink()
    tmp = poster.with_suffix(".jpg")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp4), "-frames:v", "1",
                    "-q:v", "3", str(tmp)], check=True)
    with Image.open(tmp) as im:
        im.convert("RGB").save(poster, "WEBP", quality=WEBP_Q, method=6)
    tmp.unlink()

    return {
        "id": "room-clip",
        "source": src.name,
        "purpose": "beat 2. Plays once on entry, muted, with a visible pause control.",
        "alt": "A slow move in toward a single lamp on a table laid for two.",
        "audio_stripped": True,
        "mark_excluded": f"cropped to {MARK_X:.1%} of source width and 86% of height",
        "transform": {
            "trim": f"{CLIP_IN}s to {CLIP_IN + CLIP_LEN}s of {8.0}s",
            "why_trimmed": "the first four seconds show the bistro register the audit rejected "
                           "(red door frames, timber beams, ochre plaster); the last three show "
                           "only a lamp and a laid table, which is register-neutral",
            "grade": "saturation 0.75, contrast 1.12, brightness -0.04, gamma 0.96, shadows and "
                     "midtones shifted cool to sit against the page's slate-cast ground",
            "declared": "a transformation of supplied media, not a retouch of its content",
        },
        "files": {
            "mp4": {"file": "media/room.mp4", "bytes": mp4.stat().st_size},
            "poster": {"file": "media/room-poster-frame.webp", "bytes": poster.stat().st_size},
        },
    }


def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    records = []
    for a in ASSETS:
        rec = emit(a)
        records.append(rec)
        note = f"  {rec['note']}" if "note" in rec else ""
        fieldc = f"  field={rec['field']}" if "field" in rec else ""
        print(f"{a.id:26} {rec['width']}x{rec['height']:<5} "
              f"{rec['bytes'] / 1024:6.1f} kB{fieldc}{note}")

    clip = emit_clip()
    print(f"{'room-clip':26} mp4 {clip['files']['mp4']['bytes'] / 1024:.0f} kB  "
          f"trimmed {CLIP_LEN}s, graded, audio stripped, mark cropped")

    total = sum(r["bytes"] for r in records)
    total += sum(r.get("thumb", {}).get("bytes", 0) for r in records)
    poster = clip["files"]["poster"]["bytes"]

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps({
        "generated_from": "media/ (read-only originals)",
        "provenance": "AI-generated stills and clip supplied by the client. Fictional brand. "
                      "No third-party rights. Generation mark excluded by crop, not retouched.",
        "mark_zone_excluded": {"x_from": MARK_X, "y_from": MARK_Y},
        "webp_quality": WEBP_Q,
        "images": records,
        "clip": clip,
        "totals": {
            "image_bytes": total,
            "poster_bytes": poster,
            "first_view_bytes_excluding_clip": total + poster,
        },
    }, indent=2), encoding="utf-8")

    print()
    print(f"images + thumbs : {total / 1024:.0f} kB")
    print(f"first view (no clip): {(total + poster) / 1024:.0f} kB  "
          f"[budget 2200 kB]  {'OK' if total + poster <= 2_200_000 else 'OVER'}")
    print(f"manifest -> {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
