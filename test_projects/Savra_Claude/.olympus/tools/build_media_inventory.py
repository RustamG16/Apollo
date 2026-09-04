"""Build .olympus/evidence/media-inventory.json from the read-only media/ originals.

Measures, per still: dimensions, orientation, mean luminance, the share of pixels that are
near-black, and the five dominant colours by k-means-free quantisation. This is the hard
evidence the direction phase leans on -- "the photography is dark and warm" has to be a
measurement, not an impression.

Never writes to media/. Run from the project root:
    python .olympus/tools/build_media_inventory.py
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
MEDIA = ROOT / "media"
OUT = ROOT / ".olympus" / "evidence" / "media-inventory.json"

# The locked brand palette, from Color_Palette___trend_colors.
BRAND = {
    "slate": (0x33, 0x5C, 0x67),
    "auburn": (0x9E, 0x2A, 0x2B),
    "hunyadi": (0xE0, 0x9F, 0x3E),
    "vanilla": (0xFF, 0xF3, 0xB0),
}


def hexof(rgb: tuple[int, int, int]) -> str:
    return "#%02X%02X%02X" % rgb


def luminance(rgb: tuple[int, int, int]) -> float:
    """Relative luminance, WCAG 2.1."""
    def channel(c: int) -> float:
        s = c / 255
        return s / 12.92 if s <= 0.04045 else ((s + 0.055) / 1.055) ** 2.4

    r, g, b = (channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def nearest_brand(rgb: tuple[int, int, int]) -> tuple[str, float]:
    """Closest locked brand colour and its RGB distance, so we can say how literally
    present the palette is in the photography rather than asserting that it is."""
    best, dist = "", 1e9
    for name, ref in BRAND.items():
        d = sum((a - b) ** 2 for a, b in zip(rgb, ref)) ** 0.5
        if d < dist:
            best, dist = name, d
    return best, round(dist, 1)


def dominant(img: Image.Image, n: int = 5) -> list[dict]:
    small = img.convert("RGB").resize((160, 160))
    quant = small.quantize(colors=n, method=Image.Quantize.MEDIANCUT)
    palette = quant.getpalette() or []
    total = sum(count for count, _ in quant.getcolors() or [])
    out = []
    for count, index in sorted(quant.getcolors() or [], reverse=True):
        rgb = tuple(palette[index * 3: index * 3 + 3])
        name, dist = nearest_brand(rgb)
        out.append(
            {
                "hex": hexof(rgb),
                "share": round(count / total, 3),
                "nearest_brand": name,
                "brand_distance": dist,
            }
        )
    return out


def still(path: Path) -> dict:
    with Image.open(path) as img:
        w, h = img.size
        rgb = img.convert("RGB")
        grey = rgb.convert("L")
        hist = grey.histogram()
        px = w * h
        dark = sum(hist[:48]) / px
        mean = sum(i * c for i, c in enumerate(hist)) / px
        return {
            "file": path.name,
            "width": w,
            "height": h,
            "orientation": "landscape" if w > h else ("portrait" if h > w else "square"),
            "aspect": round(w / h, 3),
            "mean_luma_0_255": round(mean, 1),
            "near_black_share": round(dark, 3),
            "dominant": dominant(rgb),
        }


def clip(path: Path) -> dict:
    probe = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "stream=codec_type,codec_name,width,height,duration,r_frame_rate",
            "-of", "json", str(path),
        ],
        capture_output=True, text=True, check=True,
    )
    streams = json.loads(probe.stdout).get("streams", [])
    return {
        "file": path.name,
        "streams": streams,
        "has_audio": any(s.get("codec_type") == "audio" for s in streams),
    }


def main() -> None:
    stills = sorted(p for p in MEDIA.glob("*.jpeg"))
    clips = sorted(p for p in MEDIA.glob("*.mp4"))
    data = {
        "source": "media/ (read-only supplied originals)",
        "provenance": "AI-generated; every still carries a generation mark in the lower-right corner",
        "brand_palette": {k: hexof(v) for k, v in BRAND.items()},
        "still_count": len(stills),
        "clip_count": len(clips),
        "stills": [still(p) for p in stills],
        "clips": [clip(p) for p in clips],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}  ({len(stills)} stills, {len(clips)} clips)")

    dark = [s for s in data["stills"] if s["mean_luma_0_255"] < 90]
    print(f"stills with mean luminance < 90/255: {len(dark)}/{len(stills)}")


if __name__ == "__main__":
    main()
