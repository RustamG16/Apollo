from __future__ import annotations

import json
import math
import struct
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
MEDIA = ROOT / "media"
EVIDENCE = ROOT / ".olympus" / "evidence"


def human_bytes(value: int) -> str:
    if value < 1024:
        return f"{value} B"
    if value < 1024**2:
        return f"{value / 1024:.1f} KiB"
    return f"{value / 1024**2:.2f} MiB"


def iter_boxes(data: bytes, start: int = 0, end: int | None = None):
    end = len(data) if end is None else min(end, len(data))
    cursor = start
    while cursor + 8 <= end:
        size = struct.unpack_from(">I", data, cursor)[0]
        kind = data[cursor + 4 : cursor + 8].decode("latin-1")
        header = 8
        if size == 1 and cursor + 16 <= end:
            size = struct.unpack_from(">Q", data, cursor + 8)[0]
            header = 16
        elif size == 0:
            size = end - cursor
        if size < header or cursor + size > end:
            break
        yield kind, cursor, cursor + size, header
        cursor += size


def parse_mp4(path: Path) -> dict:
    data = path.read_bytes()
    result: dict[str, object] = {"durationSeconds": None, "videoCodec": None, "width": None, "height": None}
    containers = {"moov", "trak", "mdia", "minf", "stbl"}

    def walk(start: int, end: int):
        for kind, box_start, box_end, header in iter_boxes(data, start, end):
            payload = box_start + header
            if kind == "mvhd" and payload + 24 <= box_end:
                version = data[payload]
                if version == 1 and payload + 32 <= box_end:
                    timescale = struct.unpack_from(">I", data, payload + 20)[0]
                    duration = struct.unpack_from(">Q", data, payload + 24)[0]
                else:
                    timescale = struct.unpack_from(">I", data, payload + 12)[0]
                    duration = struct.unpack_from(">I", data, payload + 16)[0]
                if timescale:
                    result["durationSeconds"] = round(duration / timescale, 3)
            elif kind == "stsd" and payload + 16 <= box_end:
                entry_count = struct.unpack_from(">I", data, payload + 4)[0]
                entry = payload + 8
                for _ in range(entry_count):
                    if entry + 8 > box_end:
                        break
                    entry_size = struct.unpack_from(">I", data, entry)[0]
                    codec = data[entry + 4 : entry + 8].decode("latin-1")
                    if codec in {"avc1", "avc3", "hvc1", "hev1", "vp09", "av01", "mp4v"} and entry + 36 <= box_end:
                        result["videoCodec"] = codec
                        result["width"] = struct.unpack_from(">H", data, entry + 32)[0]
                        result["height"] = struct.unpack_from(">H", data, entry + 34)[0]
                    if entry_size < 8:
                        break
                    entry += entry_size
            if kind in containers:
                walk(payload, box_end)

    walk(0, len(data))
    return result


def crop_thumbnail(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    target_w, target_h = size
    source_ratio = image.width / image.height
    target_ratio = target_w / target_h
    if source_ratio > target_ratio:
        crop_w = int(image.height * target_ratio)
        left = (image.width - crop_w) // 2
        box = (left, 0, left + crop_w, image.height)
    else:
        crop_h = int(image.width / target_ratio)
        top = (image.height - crop_h) // 2
        box = (0, top, image.width, top + crop_h)
    return image.crop(box).resize(size, Image.Resampling.LANCZOS)


def build_contact_sheet(images: list[Path], output: Path) -> None:
    columns = 5
    thumb = (260, 160)
    cell = (286, 220)
    rows = math.ceil(len(images) / columns)
    canvas = Image.new("RGB", (columns * cell[0], rows * cell[1]), "#335C67")
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default()
    for index, path in enumerate(images):
        x = (index % columns) * cell[0] + 13
        y = (index // columns) * cell[1] + 13
        with Image.open(path) as source:
            rendered = crop_thumbnail(source.convert("RGB"), thumb)
        canvas.paste(rendered, (x, y))
        label = path.stem
        if len(label) > 36:
            label = label[:33] + "..."
        draw.text((x, y + thumb[1] + 10), f"{index + 1:02d}  {label}", fill="#FFF3B0", font=font)
    canvas.save(output, "JPEG", quality=90, optimize=True)


def main() -> None:
    EVIDENCE.mkdir(parents=True, exist_ok=True)
    records = []
    image_paths = []
    for path in sorted(MEDIA.iterdir(), key=lambda item: item.name.casefold()):
        if not path.is_file():
            continue
        record: dict[str, object] = {
            "filename": path.name,
            "extension": path.suffix.lower(),
            "bytes": path.stat().st_size,
            "size": human_bytes(path.stat().st_size),
        }
        if path.suffix.lower() in {".jpg", ".jpeg"}:
            image_paths.append(path)
            with Image.open(path) as image:
                record.update(
                    width=image.width,
                    height=image.height,
                    aspectRatio=round(image.width / image.height, 4),
                    orientation="landscape" if image.width > image.height else "portrait",
                )
        elif path.suffix.lower() == ".mp4":
            record.update(parse_mp4(path))
        records.append(record)
    (EVIDENCE / "media-inventory.json").write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    build_contact_sheet(image_paths, EVIDENCE / "media-contact-sheet.jpg")
    print(json.dumps({"files": len(records), "images": len(image_paths), "output": str(EVIDENCE)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
