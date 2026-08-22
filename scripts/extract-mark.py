"""Extract the abstract mark from its Canva bone plate into kit assets."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "brand" / "cactus-wave-media-mark-abstract.png"
OUT_MARK = ROOT / "public" / "brand" / "mark.png"
OUT_MARK_BONE = ROOT / "public" / "brand" / "mark-bone.png"
OUT_AVATAR = ROOT / "public" / "brand" / "avatar.png"

INK = np.array([11, 15, 14], dtype=np.uint8)
BONE = np.array([244, 239, 230], dtype=np.uint8)


def extract_alpha(rgb: np.ndarray) -> np.ndarray:
    lum = rgb.mean(axis=2)
    # Bone plate ~230–245, ink glyph ~5–25. Midtones are anti-alias.
    alpha = np.clip((220.0 - lum) / (220.0 - 18.0), 0.0, 1.0)
    return (alpha * 255.0).astype(np.uint8)


def tight_crop(alpha: np.ndarray, pad_ratio: float = 0.08) -> tuple[int, int, int, int]:
    ys, xs = np.where(alpha > 12)
    y0, y1 = int(ys.min()), int(ys.max())
    x0, x1 = int(xs.min()), int(xs.max())
    h, w = y1 - y0, x1 - x0
    pad = int(max(h, w) * pad_ratio)
    y0 = max(0, y0 - pad)
    x0 = max(0, x0 - pad)
    y1 = min(alpha.shape[0] - 1, y1 + pad)
    x1 = min(alpha.shape[1] - 1, x1 + pad)
    # Square crop around the glyph
    side = max(y1 - y0, x1 - x0)
    cy = (y0 + y1) // 2
    cx = (x0 + x1) // 2
    y0 = max(0, cy - side // 2)
    x0 = max(0, cx - side // 2)
    y1 = min(alpha.shape[0], y0 + side)
    x1 = min(alpha.shape[1], x0 + side)
    return x0, y0, x1, y1


def compose_glyph(alpha: np.ndarray, rgb: np.ndarray) -> Image.Image:
    out = np.zeros((*alpha.shape, 4), dtype=np.uint8)
    out[..., :3] = INK
    out[..., 3] = alpha
    return Image.fromarray(out, "RGBA")


def recolor(mark: Image.Image, rgb: np.ndarray) -> Image.Image:
    arr = np.array(mark)
    arr[..., :3] = rgb
    return Image.fromarray(arr, "RGBA")


def main() -> None:
    src = Image.open(SRC).convert("RGB")
    rgb = np.array(src)
    alpha = extract_alpha(rgb)
    box = tight_crop(alpha)
    cropped_alpha = alpha[box[1] : box[3], box[0] : box[2]]
    cropped_rgb = rgb[box[1] : box[3], box[0] : box[2]]
    mark = compose_glyph(cropped_alpha, cropped_rgb)
    # Keep a high-res master for CSS masks
    mark = mark.resize((1024, 1024), Image.Resampling.LANCZOS)
    mark.save(OUT_MARK, "PNG", optimize=True)
    recolor(mark, BONE).save(OUT_MARK_BONE, "PNG", optimize=True)

    avatar = Image.new("RGBA", (1024, 1024), (*INK.tolist(), 255))
    bone_mark = recolor(mark, BONE)
    # Inset so the glyph has hotel-monogram padding
    inset = 168
    placed = bone_mark.resize((1024 - inset * 2, 1024 - inset * 2), Image.Resampling.LANCZOS)
    avatar.paste(placed, (inset, inset), placed)
    avatar.save(OUT_AVATAR, "PNG", optimize=True)

    # Tiny-size sanity: how many opaque pixels survive at 16px
    tiny = mark.resize((16, 16), Image.Resampling.LANCZOS).filter(ImageFilter.SHARPEN)
    tiny_a = np.array(tiny)[..., 3]
    print("source", src.size)
    print("crop", box, "glyph", cropped_alpha.shape)
    print("mark", mark.size, "opaque>", int((tiny_a > 40).sum()), "/ 256 at 16px")
    print("wrote", OUT_MARK.name, OUT_MARK_BONE.name, OUT_AVATAR.name)


if __name__ == "__main__":
    main()
