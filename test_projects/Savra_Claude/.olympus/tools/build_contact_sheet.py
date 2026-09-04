"""Render .olympus/evidence/contact-sheet.jpg -- every supplied still on one page, grouped
by the register it belongs to, so the art-direction argument in 01-audit.md can be checked
against the actual pictures rather than taken on trust.

Reads media/ only. Run from the project root:
    python .olympus/tools/build_contact_sheet.py
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
MEDIA = ROOT / "media"
OUT = ROOT / ".olympus" / "evidence" / "contact-sheet.jpg"
INVENTORY = ROOT / ".olympus" / "evidence" / "media-inventory.json"

CELL = 300
PAD = 10
COLS = 6
GROUND = (16, 22, 25)
INK = (232, 226, 205)

# Registers, decided in 01-audit.md. Order here is the order on the sheet.
REGISTERS = [
    ("ROOM - the formal lacquered SAVRA world (the spine)", [
        "SAVRA_restaurant_entrance_in_Vienna", "Threshold_opening_to_stone_table",
        "Empty_dining_room_interior_view", "Savra_dining_room_before_service",
        "SAVRA_table_prepared_for_two", "Table_set_for_two",
    ]),
    ("MATERIAL - what the room is made of", [
        "Stone_meets_textured_linen_weave", "Table_settings_with_linen_runner",
    ]),
    ("HAND - the only people in the set", [
        "Chef_plating_at_pass", "Chef_plating_dish", "Chef_plating_dish_with_tweezers",
    ]),
    ("PLATE - the same teal ceramic, every time", [
        "Salt-baked_beetroot_dish_on_plate", "Dish_plated_on_dark_slate",
        "Salt-baked_beetroot_with_labneh", "Charcoal_sea_bass_with_fennel",
        "Lamb_backstrap_with_cherry_glaze", "Slow-cooked_lamb_shoulder_plate",
        "Flatbread_served_with_smoked_butter", "Flatbread_with_butter_and_oil",
        "Saffron_poached_quince_dessert", "Quince_dessert_with_yogurt_and",
        "Food_photography_of_plated_dish", "Dish_photographed_overhead_on_table",
    ]),
    ("PLAN - flat colour-field compositions, a different art direction", [
        "Camera_crossing_threshold_toward", "Camera_entering_SAVRA_restaurant",
        "Savra_destination_table_room_por", "Portrait_recomposition_of_asset",
        "Color_Palette___trend_colors",
    ]),
    ("OUTLIERS - a different building, or a duplicate pass. Not used.", [
        "Restaurant_entrance_view_for_hero", "Recreating_dish_from_asset",
    ]),
]


def resolve(stem: str) -> Path | None:
    for p in MEDIA.glob("*.jpeg"):
        if p.name.startswith(stem):
            return p
    return None


def main() -> None:
    luma = {}
    if INVENTORY.exists():
        for s in json.loads(INVENTORY.read_text(encoding="utf-8"))["stills"]:
            luma[s["file"]] = s["mean_luma_0_255"]

    rows_needed = 0
    for _, stems in REGISTERS:
        rows_needed += 1 + (len(stems) + COLS - 1) // COLS  # header row + image rows

    width = COLS * (CELL + PAD) + PAD
    height = PAD
    blocks = []
    for title, stems in REGISTERS:
        height += 34
        n_rows = (len(stems) + COLS - 1) // COLS
        height += n_rows * (CELL + PAD)
        blocks.append((title, stems, n_rows))
    height += PAD

    sheet = Image.new("RGB", (width, height), GROUND)
    draw = ImageDraw.Draw(sheet)

    y = PAD
    for title, stems, n_rows in blocks:
        draw.text((PAD, y + 8), title.upper(), fill=(224, 159, 62))
        y += 34
        for i, stem in enumerate(stems):
            path = resolve(stem)
            col = i % COLS
            row = i // COLS
            x = PAD + col * (CELL + PAD)
            cy = y + row * (CELL + PAD)
            if path is None:
                draw.rectangle([x, cy, x + CELL, cy + CELL], outline=(158, 42, 43))
                draw.text((x + 8, cy + 8), f"MISSING {stem}", fill=(158, 42, 43))
                continue
            with Image.open(path) as im:
                thumb = im.convert("RGB").copy()
                thumb.thumbnail((CELL, CELL))
                ox = x + (CELL - thumb.width) // 2
                oy = cy + (CELL - thumb.height) // 2
                sheet.paste(thumb, (ox, oy))
            label = path.name.split("_2026")[0][:34]
            lum = luma.get(path.name)
            meta = f"{label}  L{lum:.0f}" if lum is not None else label
            draw.text((x + 2, cy + CELL - 12), meta, fill=INK)
        y += n_rows * (CELL + PAD)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(OUT, quality=86, optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  {sheet.width}x{sheet.height}")

    listed = {s for _, stems in REGISTERS for s in stems}
    all_stems = {p.name.split("_2026")[0] for p in MEDIA.glob("*.jpeg")}
    unplaced = [s for s in all_stems if not any(s.startswith(x) or x.startswith(s[:20]) for x in listed)]
    if unplaced:
        print("NOT PLACED IN A REGISTER:", unplaced)


if __name__ == "__main__":
    main()
