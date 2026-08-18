from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
MEDIA = ROOT / "media"
PUBLIC = ROOT / "public" / "media"
REPORT = ROOT / ".olympus" / "evidence" / "public-media-derivatives.json"


SPECS = [
    ("hero-entrance", "Restaurant_entrance_view_for_hero", [640, 1376]),
    ("threshold-crossing", "Camera_crossing_threshold_toward", [640, 1376]),
    ("plate-bread-wide", "Flatbread_with_butter_and_oil", [640, 1376]),
    ("plate-bread-portrait", "Flatbread_served_with_smoked_butter", [448, 896]),
    ("plate-lamb", "Lamb_backstrap_with_cherry_glaze", [640, 1376]),
    ("plate-beet-wide", "Salt-baked_beetroot_dish_on_plate", [640, 1376]),
    ("plate-beet-portrait", "Salt-baked_beetroot_with_labneh", [448, 896]),
    ("material-linen", "Stone_meets_textured_linen_weave", [640, 1376]),
    ("room-before-service", "Savra_dining_room_before_service", [640, 1376]),
    ("process-pass", "Chef_plating_at_pass", [448, 896]),
    ("process-plating", "Chef_plating_dish_202608", [640, 1376]),
    ("process-tweezers", "Chef_plating_dish_with_tweezers", [640, 1376]),
    ("table-destination", "Savra_destination_table_room_por", [384, 768]),
    ("table-reserve", "SAVRA_table_prepared_for_two", [640, 1376]),
]


def find_source(prefix: str) -> Path:
    matches = [path for path in MEDIA.iterdir() if path.is_file() and path.name.startswith(prefix)]
    if len(matches) != 1:
        raise RuntimeError(f"Expected one source for {prefix!r}, found {len(matches)}")
    return matches[0]


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    records = []
    for stem, prefix, widths in SPECS:
        source = find_source(prefix)
        with Image.open(source) as opened:
            image = opened.convert("RGB")
            for requested_width in widths:
                width = min(requested_width, image.width)
                height = round(image.height * width / image.width)
                rendered = image if width == image.width else image.resize((width, height), Image.Resampling.LANCZOS)
                output = PUBLIC / f"{stem}-{width}.webp"
                rendered.save(output, "WEBP", quality=83, method=6)
                records.append(
                    {
                        "output": output.relative_to(ROOT).as_posix(),
                        "source": source.relative_to(ROOT).as_posix(),
                        "width": width,
                        "height": height,
                        "bytes": output.stat().st_size,
                        "format": "webp",
                    }
                )
    video_source = find_source("Camera_tracking_through_dining_room")
    video_output = PUBLIC / "hero-arrival.mp4"
    shutil.copyfile(video_source, video_output)
    records.append(
        {
            "output": video_output.relative_to(ROOT).as_posix(),
            "source": video_source.relative_to(ROOT).as_posix(),
            "bytes": video_output.stat().st_size,
            "format": "mp4-byte-identical-copy",
        }
    )
    REPORT.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"derivatives": len(records), "bytes": sum(record["bytes"] for record in records)}))


if __name__ == "__main__":
    main()

