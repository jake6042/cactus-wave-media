"""Flatten the live Cactus Wave Media lockup into a downloadable brand pack.

Layout matches ``<Wordmark>`` / ``<BrandMark>`` on the site — Geist, tracking,
stacking, jewelry-stamp mark scale. Uses the extracted transparent glyphs
(``public/brand/mark.png``, ``mark-bone.png``), never the Canva bone plate.

    python scripts/export-brand-pack.py
"""

from __future__ import annotations

import base64
import io
import json
import math
import urllib.request
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from fontTools.misc.transform import Transform
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[1]
BRAND_DIR = ROOT / "public" / "brand"
MARK_INK = BRAND_DIR / "mark.png"
MARK_BONE = BRAND_DIR / "mark-bone.png"
PACK = BRAND_DIR / "pack"
VENDOR = ROOT / "scripts" / ".vendor" / "geist"
GEIST_VF = VENDOR / "Geist-wght.ttf"
GEIST_REG = VENDOR / "Geist-Regular.ttf"
GEIST_MED = VENDOR / "Geist-Medium.ttf"
GEIST_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/geist/Geist%5Bwght%5D.ttf"
MANIFEST_TS = ROOT / "src" / "lib" / "brand-pack.ts"

INK = (11, 15, 14)
BONE = (244, 239, 230)
SAGE = (110, 127, 107)
BRASS = (196, 165, 116)
SAND = (154, 145, 131)
INK_SOFT = (11, 15, 14, 140)  # ink @ 55% — site ``text-ink/55``

# Live <Wordmark> / <BrandMark> CSS pixels (see wordmark.tsx, brand-mark.tsx)
SITE = {
    "horizontal": {"mark": 40, "gap": 12, "title": 11, "unit": 10, "unit_mt": 4, "stacked": False},
    "compact": {"mark": 40, "gap": 12, "title": 11, "unit": 0, "unit_mt": 0, "stacked": False},
    "stacked": {"mark": 72, "gap": 20, "title": 11, "unit": 10, "unit_mt": 4, "stacked": True},
    "header": {"mark": 28, "gap": 12, "title": 11, "unit": 10, "unit_mt": 4, "stacked": False},
}

SCALE_2X = 10  # 1 site CSS px → 10 export px (horizontal mark = 400)
SCALE_1X = 5
CLEAR_RATIO = 0.125  # brandUsage.clearSpace ≈ ⅛ of the glyph
PLATE_PAD_RATIO = 0.42
MARK_INSET = 0.18
APP_INSET = 0.20
AVATAR_INSET = 168 / 1024  # matches public/brand/avatar.png

CATALOG: list[dict] = []
SVG_QUEUE: list[tuple[str, str]] = []
SKIPPED: list[tuple[str, str]] = [
    (
        "Bone glyph on sage",
        "Readable-ish, but bone on a mineral fill looks like a cheap colorway. Sage is an accent, never a field.",
    ),
    (
        "Bone glyph on brass",
        "Contrast collapses (~2:1). Bone on gold does not hold.",
    ),
    (
        "Sage / brass wordmark plates",
        "The live system forbids sage and brass as fills. A colored lockup plate would look like a logo generator, not a studio kit.",
    ),
]


@dataclass
class TextLine:
    text: str
    x: float
    baseline: float
    size: float
    tracking_em: float
    weight: int
    fill: tuple


@dataclass
class Lockup:
    width: int
    height: int
    mark: tuple[int, int, int]  # x, y, size
    lines: list[TextLine]
    mark_tone: str
    surface: str  # "dark" | "light" — which type colors


def hex_of(rgb: tuple[int, ...]) -> str:
    return f"#{rgb[0]:02X}{rgb[1]:02X}{rgb[2]:02X}"


def rel_lum(rgb: tuple[int, int, int]) -> float:
    def chan(c: float) -> float:
        c = c / 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    return 0.2126 * chan(rgb[0]) + 0.7152 * chan(rgb[1]) + 0.0722 * chan(rgb[2])


def contrast(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    l1, l2 = rel_lum(a), rel_lum(b)
    if l1 < l2:
        l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)


def ensure_fonts() -> None:
    VENDOR.mkdir(parents=True, exist_ok=True)
    if not GEIST_VF.exists():
        print("downloading Geist…")
        urllib.request.urlretrieve(GEIST_URL, GEIST_VF)
    if not GEIST_REG.exists() or not GEIST_MED.exists():
        for wght, dest in ((400, GEIST_REG), (500, GEIST_MED)):
            inst = instantiateVariableFont(TTFont(str(GEIST_VF)), {"wght": wght}, inplace=False)
            inst.save(str(dest))


def load_glyphs() -> dict[str, Image.Image]:
    if not MARK_INK.exists() or not MARK_BONE.exists():
        raise SystemExit("Missing public/brand/mark.png or mark-bone.png. Run: python scripts/extract-mark.py")
    return {
        "ink": Image.open(MARK_INK).convert("RGBA"),
        "bone": Image.open(MARK_BONE).convert("RGBA"),
    }


def mark_at(glyphs: dict[str, Image.Image], tone: str, size: int) -> Image.Image:
    return glyphs[tone].resize((size, size), Image.Resampling.LANCZOS)


class Type:
    def __init__(self) -> None:
        self._pil: dict[tuple[int, int], ImageFont.FreeTypeFont] = {}
        self._tt: dict[int, TTFont] = {}
        self._sets: dict[int, object] = {}
        self._cmap: dict[int, dict] = {}
        self._upem: dict[int, int] = {}

    def pil(self, weight: int, size: float) -> ImageFont.FreeTypeFont:
        px = max(1, int(round(size)))
        key = (weight, px)
        if key not in self._pil:
            path = GEIST_MED if weight >= 500 else GEIST_REG
            self._pil[key] = ImageFont.truetype(str(path), px)
        return self._pil[key]

    def tt(self, weight: int) -> TTFont:
        if weight not in self._tt:
            path = GEIST_MED if weight >= 500 else GEIST_REG
            font = TTFont(str(path))
            self._tt[weight] = font
            self._sets[weight] = font.getGlyphSet()
            self._cmap[weight] = font.getBestCmap()
            self._upem[weight] = font["head"].unitsPerEm
        return self._tt[weight]

    def tracked_width(self, text: str, weight: int, size: float, tracking_em: float) -> float:
        font = self.pil(weight, size)
        tracking = tracking_em * font.size
        if not text:
            return 0.0
        return sum(font.getlength(ch) for ch in text) + tracking * (len(text) - 1)

    def baseline(self, weight: int, size: float, line_top: float, line_height: float) -> float:
        font = self.pil(weight, size)
        ascent, descent = font.getmetrics()
        half = (line_height - (ascent + descent)) / 2.0
        return line_top + half + ascent

    def svg_paths(self, line: TextLine) -> list[str]:
        self.tt(line.weight)
        glyph_set = self._sets[line.weight]
        cmap = self._cmap[line.weight]
        upem = self._upem[line.weight]
        scale = line.size / upem
        tracking = line.tracking_em * line.size
        x = line.x
        paths: list[str] = []
        for i, ch in enumerate(line.text):
            name = cmap.get(ord(ch))
            if name:
                glyph = glyph_set[name]
                pen = SVGPathPen(glyph_set)
                transform = Transform(scale, 0, 0, -scale, x, line.baseline)
                glyph.draw(TransformPen(pen, transform))
                cmd = pen.getCommands()
                if cmd:
                    paths.append(cmd)
                x += glyph.width * scale
            else:
                x += self.pil(line.weight, line.size).getlength(ch)
            if i < len(line.text) - 1:
                x += tracking
        return paths


TYPE = Type()
GLYPHS: dict[str, Image.Image] = {}


def type_colors(surface: str) -> tuple[tuple, tuple]:
    if surface == "dark":
        return (*BONE, 255), (*SAND, 255)
    return (*INK, 255), INK_SOFT


def layout_lockup(kind: str, surface: str, scale: float) -> Lockup:
    spec = SITE[kind]
    mark = spec["mark"] * scale
    gap = spec["gap"] * scale
    title_size = spec["title"] * scale
    unit_size = spec["unit"] * scale
    unit_mt = spec["unit_mt"] * scale
    stacked = spec["stacked"]
    title_h = spec["title"] * scale
    unit_h = spec["unit"] * scale if spec["unit"] else 0.0

    title_text = "CACTUS WAVE"
    unit_text = "MEDIA" if spec["unit"] else ""
    title_w = TYPE.tracked_width(title_text, 500, title_size, 0.22)
    unit_w = TYPE.tracked_width(unit_text, 400, unit_size, 0.28) if unit_text else 0.0
    type_w = max(title_w, unit_w)
    type_h = title_h + (unit_mt + unit_h if unit_text else 0.0)
    title_fill, unit_fill = type_colors(surface)
    mark_tone = "bone" if surface == "dark" else "ink"

    if stacked:
        width = max(mark, type_w)
        height = mark + gap + type_h
        mark_x = (width - mark) / 2.0
        mark_y = 0.0
        type_x0 = (width - type_w) / 2.0
        type_top = mark + gap
    else:
        width = mark + gap + type_w
        height = max(mark, type_h)
        mark_x = 0.0
        mark_y = (height - mark) / 2.0
        type_x0 = mark + gap
        type_top = (height - type_h) / 2.0

    lines = [
        TextLine(
            text=title_text,
            x=type_x0 + (type_w - title_w) / 2.0 if stacked else type_x0,
            baseline=TYPE.baseline(500, title_size, type_top, title_h),
            size=title_size,
            tracking_em=0.22,
            weight=500,
            fill=title_fill,
        )
    ]
    if unit_text:
        lines.append(
            TextLine(
                text=unit_text,
                x=type_x0 + (type_w - unit_w) / 2.0 if stacked else type_x0,
                baseline=TYPE.baseline(400, unit_size, type_top + title_h + unit_mt, unit_h),
                size=unit_size,
                tracking_em=0.28,
                weight=400,
                fill=unit_fill,
            )
        )

    return Lockup(
        width=int(math.ceil(width)),
        height=int(math.ceil(height)),
        mark=(int(round(mark_x)), int(round(mark_y)), int(round(mark))),
        lines=lines,
        mark_tone=mark_tone,
        surface=surface,
    )


def draw_tracked(draw: ImageDraw.ImageDraw, line: TextLine) -> None:
    font = TYPE.pil(line.weight, line.size)
    tracking = line.tracking_em * font.size
    x = line.x
    for i, ch in enumerate(line.text):
        draw.text((x, line.baseline), ch, font=font, fill=line.fill, anchor="ls")
        x += font.getlength(ch)
        if i < len(line.text) - 1:
            x += tracking


def render_lockup(lock: Lockup) -> Image.Image:
    canvas = Image.new("RGBA", (lock.width, lock.height), (0, 0, 0, 0))
    mx, my, ms = lock.mark
    glyph = mark_at(GLYPHS, lock.mark_tone, ms)
    canvas.paste(glyph, (mx, my), glyph)
    draw = ImageDraw.Draw(canvas)
    for line in lock.lines:
        draw_tracked(draw, line)
    return canvas


def pad_image(im: Image.Image, pad: int) -> Image.Image:
    out = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
    out.paste(im, (pad, pad), im)
    return out


def on_plate(im: Image.Image, color: tuple[int, int, int], pad: int) -> Image.Image:
    out = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (*color, 255))
    out.paste(im, (pad, pad), im)
    return out


def save_png(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)


def record(group: str, rel: str, use: str, folder: str) -> None:
    CATALOG.append({"group": group, "file": f"{folder}/{rel}", "use": use, "name": rel})


def oversample_mask(size: int, kind: str, oversample: int = 4) -> Image.Image:
    s = size * oversample
    mask = Image.new("L", (s, s), 0)
    draw = ImageDraw.Draw(mask)
    if kind == "circle":
        draw.ellipse((0, 0, s - 1, s - 1), fill=255)
    else:
        r = int(round(s * 0.2237))
        draw.rounded_rectangle((0, 0, s - 1, s - 1), radius=r, fill=255)
    return mask.resize((size, size), Image.Resampling.LANCZOS)


def stamp_on_field_shaped(
    size: int,
    field: tuple[int, int, int],
    tone: str,
    inset_ratio: float,
    shape: str,
) -> Image.Image:
    inset = int(round(size * inset_ratio))
    inner = max(8, size - inset * 2)
    glyph = mark_at(GLYPHS, tone, inner)
    field_img = Image.new("RGBA", (size, size), (*field, 255))
    field_img.paste(glyph, (inset, inset), glyph)
    if shape == "square":
        return field_img
    mask = oversample_mask(size, shape)
    r, g, b, a = field_img.split()
    aa = (np.array(a, dtype=np.uint16) * np.array(mask, dtype=np.uint16) // 255).astype(np.uint8)
    return Image.merge("RGBA", (r, g, b, Image.fromarray(aa, "L")))


def lockup_set(kind: str, folder: str, group: str, uses: dict[str, str]) -> None:
    for surface, stem in (("dark", "dark"), ("light", "light")):
        lock2 = layout_lockup(kind, surface, SCALE_2X)
        lock1 = layout_lockup(kind, surface, SCALE_1X)
        im2 = render_lockup(lock2)
        im1 = render_lockup(lock1)
        pad2 = max(8, int(round(lock2.mark[2] * CLEAR_RATIO)))
        pad1 = max(4, int(round(lock1.mark[2] * CLEAR_RATIO)))
        plate2 = max(16, int(round(lock2.mark[2] * PLATE_PAD_RATIO)))
        plate1 = max(8, int(round(lock1.mark[2] * PLATE_PAD_RATIO)))

        t2 = pad_image(im2, pad2)
        t1 = pad_image(im1, pad1)
        save_png(t2, PACK / folder / f"wordmark-{kind}-{stem}.png")
        save_png(t1, PACK / folder / f"wordmark-{kind}-{stem}-1x.png")
        record(group, f"wordmark-{kind}-{stem}.png", uses[f"{stem}-2x"], folder)
        record(group, f"wordmark-{kind}-{stem}-1x.png", uses[f"{stem}-1x"], folder)

        field = INK if surface == "dark" else BONE
        plate_name = "on-ink" if surface == "dark" else "on-bone"
        p2 = on_plate(im2, field, plate2)
        p1 = on_plate(im1, field, plate1)
        save_png(p2, PACK / folder / f"wordmark-{kind}-{plate_name}.png")
        save_png(p1, PACK / folder / f"wordmark-{kind}-{plate_name}-1x.png")
        record(group, f"wordmark-{kind}-{plate_name}.png", uses[f"{plate_name}-2x"], folder)
        record(group, f"wordmark-{kind}-{plate_name}-1x.png", uses[f"{plate_name}-1x"], folder)

        svg = lockup_svg(lock2, pad2)
        svg_path = PACK / "svg" / f"wordmark-{kind}-{stem}.svg"
        svg_path.parent.mkdir(parents=True, exist_ok=True)
        svg_path.write_text(svg, encoding="utf-8")
        SVG_QUEUE.append((f"wordmark-{kind}-{stem}.svg", uses[f"{stem}-svg"]))


def lockup_svg(lock: Lockup, pad: int) -> str:
    mx, my, ms = lock.mark
    glyph = mark_at(GLYPHS, lock.mark_tone, ms)
    buf = io.BytesIO()
    glyph.save(buf, format="PNG", optimize=True)
    href = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")
    w = lock.width + pad * 2
    h = lock.height + pad * 2
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none">',
        f'  <image href="{href}" x="{pad + mx}" y="{pad + my}" width="{ms}" height="{ms}"/>',
    ]
    for line in lock.lines:
        shifted = TextLine(
            text=line.text,
            x=line.x + pad,
            baseline=line.baseline + pad,
            size=line.size,
            tracking_em=line.tracking_em,
            weight=line.weight,
            fill=line.fill,
        )
        fill = line.fill
        if len(fill) == 4:
            color = f"rgba({fill[0]},{fill[1]},{fill[2]},{fill[3] / 255:.3f})"
        else:
            color = hex_of(fill)
        for d in TYPE.svg_paths(shifted):
            parts.append(f'  <path d="{d}" fill="{color}"/>')
    parts.append("</svg>")
    return "\n".join(parts) + "\n"


def render_wide(kind: str, width: int, height: int, surface: str) -> Image.Image:
    field = INK if surface == "dark" else BONE
    # Fit the horizontal lockup with generous side air (~14% each side)
    target_lock_w = int(width * 0.72)
    probe = layout_lockup(kind, surface, 1.0)
    scale = target_lock_w / probe.width
    lock = layout_lockup(kind, surface, scale)
    im = render_lockup(lock)
    canvas = Image.new("RGBA", (width, height), (*field, 255))
    x = (width - im.width) // 2
    y = int(round((height - im.height) * 0.48))
    canvas.paste(im, (x, y), im)
    return canvas


def write_readme() -> None:
    groups: dict[str, list[dict]] = {}
    for item in CATALOG:
        groups.setdefault(item["group"], []).append(item)

    lines = [
        "# Cactus Wave Media — export pack",
        "",
        "Flattened files of the **live site lockup**. The mark is the extracted rib glyph.",
        "Type is Geist, set the same way `<Wordmark>` sets it on the site.",
        "",
        "## How this matches the site",
        "",
        "- Mark left, type right. `items-center`. Gap is Tailwind `gap-3` (12px) at site scale.",
        "- Stacked is `<Wordmark stacked />`: mark above, `gap-5` (20px), type centered.",
        "- Compact is `<Wordmark compact />`: “CACTUS WAVE” only, no Media line.",
        "- “CACTUS WAVE” — Geist Medium, 11px at site scale, `tracking-[0.22em]`, uppercase.",
        "- “MEDIA” — Geist Regular, 10px, `tracking-[0.28em]`, uppercase. Sand on ink; ink at 55% on bone.",
        "- Mark sizes follow `<BrandMark>`: 40 (horizontal / compact), 72 (stacked), 28 (email / header).",
        "- Clear space around transparent lockups is ⅛ of the mark — the wave-band rule.",
        "",
        "## Palette",
        "",
        "| Token | Hex | Role |",
        "| --- | --- | --- |",
        f"| Ink | {hex_of(INK)} | Default field |",
        f"| Bone | {hex_of(BONE)} | Figure, reverse field |",
        f"| Sage | {hex_of(SAGE)} | Accent only — one mark plate, never type |",
        f"| Brass | {hex_of(BRASS)} | Hairline metal — one mark plate, never type |",
        f"| Sand | {hex_of(SAND)} | “MEDIA” on ink |",
        "",
        "## Files",
        "",
    ]
    for group, items in groups.items():
        lines.append(f"### {group}")
        lines.append("")
        for item in items:
            lines.append(f"- `{item['file']}` — {item['use']}")
        lines.append("")

    lines.extend(
        [
            "## Skipped",
            "",
        ]
    )
    for name, why in SKIPPED:
        lines.append(f"- **{name}** — {why}")
    lines.extend(
        [
            "",
            "## Regenerate",
            "",
            "```",
            "python scripts/extract-mark.py   # only if mark.png / mark-bone.png are missing",
            "python scripts/export-brand-pack.py",
            "```",
            "",
            "Do not place `cactus-wave-media-mark-abstract.png` on a non-bone surface.",
            "The live header and footer still use `<Wordmark>` — these files are the kit.",
            "",
        ]
    )
    (PACK / "README.md").write_text("\n".join(lines), encoding="utf-8")


def write_manifest_ts() -> None:
    groups: dict[str, list[dict]] = {}
    order: list[str] = []
    for item in CATALOG:
        if item["group"] not in groups:
            order.append(item["group"])
            groups[item["group"]] = []
        groups[item["group"]].append(item)

    ledes = {
        "Mark": "The stamp alone. Transparent glyphs, then the same stamp on a field.",
        "Avatars": "Circle and squircle. Bone on ink, ink on bone.",
        "Favicons": "Mark on ink. Drop these in as icons; do not box them again.",
        "Horizontal wordmark": "The site lockup. Mark left, type right.",
        "Stacked wordmark": "The stacked site lockup. Mark above type.",
        "Compact wordmark": "“Cactus Wave” only — the compact site lockup.",
        "Social": "Open Graph and Twitter cards. Lockup centered on a field.",
        "Email": "A small horizontal strip, header scale.",
        "App": "Padded mark for a home screen or PWA.",
        "SVG wordmarks": "Self-contained. Mark is the PNG glyph; type is Geist outlined.",
    }

    payload = []
    for title in order:
        payload.append(
            {
                "title": title,
                "lede": ledes.get(title, ""),
                "items": [{"file": i["file"], "use": i["use"]} for i in groups[title]],
            }
        )

    skipped = [{"name": n, "why": w} for n, w in SKIPPED]
    ts = (
        "/** Generated by scripts/export-brand-pack.py — edit the script, not this file. */\n"
        "export const brandPackBase = \"/brand/pack\";\n\n"
        "export type BrandPackItem = {\n"
        "  file: string;\n"
        "  use: string;\n"
        "};\n\n"
        "export type BrandPackGroup = {\n"
        "  title: string;\n"
        "  lede: string;\n"
        "  items: BrandPackItem[];\n"
        "};\n\n"
        f"export const brandPackGroups: BrandPackGroup[] = {json.dumps(payload, indent=2, ensure_ascii=False)};\n\n"
        f"export const brandPackSkipped = {json.dumps(skipped, indent=2, ensure_ascii=False)} as const;\n"
    )
    MANIFEST_TS.write_text(ts, encoding="utf-8")
    (PACK / "manifest.json").write_text(
        json.dumps({"groups": payload, "skipped": skipped}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


def export_marks() -> None:
    folder = "mark"
    for tone, label in (("ink", "Ink glyph"), ("bone", "Bone glyph")):
        src = GLYPHS[tone]
        save_png(src, PACK / folder / f"mark-{tone}.png")
        save_png(src.resize((512, 512), Image.Resampling.LANCZOS), PACK / folder / f"mark-{tone}-512.png")
        record("Mark", f"mark-{tone}.png", f"{label}, transparent, 1024. CSS masks, print, any field.", folder)
        record("Mark", f"mark-{tone}-512.png", f"{label}, transparent, 512.", folder)

    # Fields that still read. Sage/brass only with ink glyph.
    fields = [
        ("on-ink", INK, "bone", "Bone stamp on ink. Default. Site, social, the night field."),
        ("on-bone", BONE, "ink", "Ink stamp on bone. Reverse. Print, light plates."),
        ("on-sage", SAGE, "ink", "Ink stamp on sage. Use rarely — sage is an accent, not a system."),
        ("on-brass", BRASS, "ink", "Ink stamp on brass. Use rarely — metal as a field, not a habit."),
    ]
    for name, color, tone, use in fields:
        ratio = contrast(color, INK if tone == "ink" else BONE)
        if ratio < 3.0:
            SKIPPED.append((f"Mark {name}", f"Contrast {ratio:.1f}:1 is too weak to ship."))
            continue
        for size in (1024, 512):
            im = stamp_on_field_shaped(size, color, tone, MARK_INSET, "square")
            fname = f"mark-{name}.png" if size == 1024 else f"mark-{name}-512.png"
            save_png(im, PACK / folder / fname)
            record("Mark", fname, use if size == 1024 else f"{use} 512.", folder)


def export_avatars() -> None:
    folder = "avatar"
    variants = [
        ("ink", INK, "bone", "Bone stamp on ink"),
        ("bone", BONE, "ink", "Ink stamp on bone"),
    ]
    for field_name, field, tone, label in variants:
        for shape in ("circle", "squircle"):
            for size in (1024, 512):
                im = stamp_on_field_shaped(size, field, tone, AVATAR_INSET, shape)
                fname = f"avatar-{field_name}-{shape}-{size}.png"
                save_png(im, PACK / folder / fname)
                record(
                    "Avatars",
                    fname,
                    f"{label}, {shape}, {size}. Profile photo, Slack, Instagram.",
                    folder,
                )


def export_favicons() -> None:
    folder = "favicon"
    specs = [
        (16, "favicon-16.png", "Browser tab, 16."),
        (32, "favicon-32.png", "Browser tab, 32."),
        (48, "favicon-48.png", "Windows site icon, 48."),
        (180, "apple-touch-icon.png", "Apple touch icon, 180."),
        (192, "icon-192.png", "Android / PWA, 192."),
        (512, "icon-512.png", "Android / PWA, 512. Mark on ink."),
    ]
    for size, fname, use in specs:
        # Tiny sizes need more relative inset so ribs do not clip the pixel grid
        inset = 0.12 if size <= 32 else (0.16 if size <= 48 else MARK_INSET)
        im = stamp_on_field_shaped(size, INK, "bone", inset, "square")
        if size <= 32:
            im = im.filter(ImageFilter.UnsharpMask(radius=0.6, percent=80, threshold=2))
        save_png(im, PACK / folder / fname)
        record("Favicons", fname, use, folder)


def export_wordmarks() -> None:
    horizontal_uses = {
        "dark-2x": "Transparent. Bone type + bone mark. Dark or photograph backgrounds. 2×.",
        "dark-1x": "Same lockup, 1×.",
        "light-2x": "Transparent. Ink type + ink mark. Light backgrounds. 2×.",
        "light-1x": "Same lockup, 1×.",
        "on-ink-2x": "The default plate. Bone lockup on ink.",
        "on-ink-1x": "Ink plate, 1×.",
        "on-bone-2x": "Reverse plate. Ink lockup on bone.",
        "on-bone-1x": "Bone plate, 1×.",
        "dark-svg": "SVG. Bone lockup, transparent. Type outlined in Geist.",
        "light-svg": "SVG. Ink lockup, transparent. Type outlined in Geist.",
    }
    stacked_uses = {
        "dark-2x": "Stacked, transparent, for dark fields. Matches `<Wordmark stacked />`.",
        "dark-1x": "Stacked dark, 1×.",
        "light-2x": "Stacked, transparent, for light fields.",
        "light-1x": "Stacked light, 1×.",
        "on-ink-2x": "Stacked on ink.",
        "on-ink-1x": "Stacked on ink, 1×.",
        "on-bone-2x": "Stacked on bone.",
        "on-bone-1x": "Stacked on bone, 1×.",
        "dark-svg": "Stacked SVG, bone on transparent.",
        "light-svg": "Stacked SVG, ink on transparent.",
    }
    compact_uses = {
        "dark-2x": "Compact — no Media line. Transparent, dark fields. Matches `<Wordmark compact />`.",
        "dark-1x": "Compact dark, 1×.",
        "light-2x": "Compact, transparent, light fields.",
        "light-1x": "Compact light, 1×.",
        "on-ink-2x": "Compact on ink.",
        "on-ink-1x": "Compact on ink, 1×.",
        "on-bone-2x": "Compact on bone.",
        "on-bone-1x": "Compact on bone, 1×.",
        "dark-svg": "Compact SVG, bone on transparent.",
        "light-svg": "Compact SVG, ink on transparent.",
    }
    lockup_set("horizontal", "wordmark", "Horizontal wordmark", horizontal_uses)
    lockup_set("stacked", "wordmark", "Stacked wordmark", stacked_uses)
    lockup_set("compact", "wordmark", "Compact wordmark", compact_uses)
    for fname, use in SVG_QUEUE:
        record("SVG wordmarks", fname, use, "svg")


def export_social() -> None:
    folder = "social"
    pairs = [
        ("og-ink.png", 1200, 630, "dark", "Open Graph 1200×630. Horizontal lockup on ink."),
        ("og-bone.png", 1200, 630, "light", "Open Graph 1200×630. Horizontal lockup on bone."),
        ("twitter-ink.png", 1200, 600, "dark", "Twitter / X 1200×600. Same lockup, shorter field."),
        ("twitter-bone.png", 1200, 600, "light", "Twitter / X 1200×600 on bone."),
    ]
    for fname, w, h, surface, use in pairs:
        save_png(render_wide("horizontal", w, h, surface), PACK / folder / fname)
        record("Social", fname, use, folder)


def export_email() -> None:
    folder = "email"
    # Header / footer scale (sm mark = 28), 3× for a usable mail client strip
    scale = 3
    for surface, stem, use_t, use_p in (
        (
            "dark",
            "dark",
            "Transparent strip for dark email themes. Header-scale lockup.",
            "Same strip on an ink plate.",
        ),
        (
            "light",
            "light",
            "Transparent strip for light email themes.",
            "Same strip on a bone plate.",
        ),
    ):
        lock = layout_lockup("header", surface, scale)
        im = render_lockup(lock)
        pad = max(6, int(round(lock.mark[2] * CLEAR_RATIO)))
        plate = max(10, int(round(lock.mark[2] * 0.36)))
        save_png(pad_image(im, pad), PACK / folder / f"signature-{stem}.png")
        field = INK if surface == "dark" else BONE
        plate_name = "on-ink" if surface == "dark" else "on-bone"
        save_png(on_plate(im, field, plate), PACK / folder / f"signature-{plate_name}.png")
        record("Email", f"signature-{stem}.png", use_t, folder)
        record("Email", f"signature-{plate_name}.png", use_p, folder)


def export_app() -> None:
    folder = "app"
    im = stamp_on_field_shaped(512, INK, "bone", APP_INSET, "square")
    save_png(im, PACK / folder / "app-icon-512.png")
    record("App", "app-icon-512.png", "PWA / home screen, 512. Bone mark on ink, maskable padding.", folder)
    im2 = stamp_on_field_shaped(512, INK, "bone", APP_INSET, "squircle")
    save_png(im2, PACK / folder / "app-icon-512-squircle.png")
    record("App", "app-icon-512-squircle.png", "Same icon, pre-masked squircle.", folder)


def main() -> None:
    global GLYPHS
    ensure_fonts()
    TYPE.tt(400)
    TYPE.tt(500)
    GLYPHS = load_glyphs()

    print(
        f"contrast ink/sage {contrast(INK, SAGE):.2f}  "
        f"ink/brass {contrast(INK, BRASS):.2f}  "
        f"bone/sage {contrast(BONE, SAGE):.2f}  "
        f"bone/brass {contrast(BONE, BRASS):.2f}"
    )

    if PACK.exists():
        for child in PACK.rglob("*"):
            if child.is_file() and child.suffix.lower() in {".png", ".svg", ".json", ".md"}:
                # keep folder; rewrite files
                pass

    export_marks()
    export_avatars()
    export_favicons()
    export_wordmarks()
    export_social()
    export_email()
    export_app()
    write_readme()
    write_manifest_ts()

    print(f"wrote {len(CATALOG)} files -> {PACK}")
    for item in CATALOG:
        print(f"  {item['file']}")


if __name__ == "__main__":
    main()
