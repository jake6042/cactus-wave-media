# Cactus Wave Media — Canva brand pack

Source of truth is **Canva**, not `scripts/export-brand-pack.py`.

Folder: [Cactus Wave Media — Brand Pack](https://www.canva.com/folder/FAHS_hqG6KE)

The official stamp is the ribbed jewelry mark from [Architectural Monogram with Cactus and Wave](https://www.canva.com/d/xLG-AIoa4ib_9dk) (`DAHS_XXVa8c` in the older [Cactus Wave Media](https://www.canva.com/folder/FAHS_Zb77Es) folder). That is the same geometry as `public/brand/cactus-wave-media-mark-abstract.png`. Copies in this pack use that asset (`MAHS_eplHE8`) — not a new cactus.

## How this matches the site Wordmark

Live lockup is `<Wordmark>` in `src/components/brand/wordmark.tsx`:

- Jewelry-stamp mark **left**, type **right**, vertically centered (`items-center`, `gap-3`).
- **CACTUS WAVE** — Geist energy, medium, 11px at site scale, `tracking-[0.22em]`, uppercase, bone on ink.
- **MEDIA** — smaller, `tracking-[0.28em]`, uppercase, sand `#9A9183` on ink (ink at ~55% on bone).
- Stacked is mark above, type centered (`<Wordmark stacked />`).
- Compact is **CACTUS WAVE** only (`<Wordmark compact />`).

Canva wordmarks follow that hierarchy. They are not the old three-line Canva lockups (CACTUS / WAVE / MEDIA beside a divider).

Canva cannot set Geist by family through the API — type is a geometric grotesque in the same energy. Tracking and the two-line stack are the match.

## Plan limits

| Limit | What happened |
| --- | --- |
| **Transparent PNG** | Canva Free blocks it. Confirmed on export: *“Users on the Canva Free plan can not export PNGs with transparent background.”* Use ink and bone plates. Site still uses CSS-masked `mark.png` for true alpha. |
| **Fonts** | API cannot change typeface family. Geist is on the site; Canva uses a close geometric sans. |
| **Magic generation quota** | Hit mid-pack. Brass plate, extra stacked-on-bone, and a dedicated wide email strip were not generated. Resize trial is also exhausted (0 remaining). |
| **Ink glyph on ink** | The official Canva asset is an **ink** stamp. On ink fields it goes quiet (watermark). Bone and sage plates hold. For a cream stamp on night, use the site mask or upgrade and recolor in the editor. |

## Designs

| File (local, after download) | Canva | Use |
| --- | --- | --- |
| `canva/mark-on-bone.png` | [Mark — on bone](https://www.canva.com/d/xMct3lWSjEanV9O) `DAHS_hGTG0M` | **The stamp.** Ink ribs on bone. Print, light plates, the plate they already loved. |
| `canva/mark-on-ink.png` | [Mark — on ink](https://www.canva.com/d/NaYtSP5iFE2jma1) `DAHS_qEk24A` | Official geometry on ink. Low contrast until the glyph is recolored bone. |
| `canva/mark-on-sage.png` | [Mark — on sage](https://www.canva.com/d/zPyfYgNL8x-wD1j) `DAHS_qoeIKs` | Ink stamp on sage `#6E7F6B`. Accent plate only — sage is not a system fill. |
| `canva/wordmark-horizontal-on-ink.png` | [Wordmark — horizontal on ink](https://www.canva.com/d/xUGkyN_XVP8pxEI) `DAHS_p2OJkg` | Site header lockup: mark left, CACTUS WAVE / MEDIA right. |
| `canva/wordmark-horizontal-on-bone.png` | [Wordmark — horizontal on bone](https://www.canva.com/d/bv786FJC5RKb4fk) `DAHS_vjYmwM` | Same lockup, reverse. Highest-contrast wordmark in the pack. |
| `canva/wordmark-stacked-on-ink.png` | [Wordmark — stacked on ink](https://www.canva.com/d/YsN2WRsYzEFZSOT) `DAHS_k5rc2Y` | `<Wordmark stacked />`. Mark above type. |
| `canva/wordmark-compact-on-ink.png` | [Wordmark — compact on ink](https://www.canva.com/d/1bunhfsUJYg5CCv) `DAHS_laNcYM` | `<Wordmark compact />`. No Media line. |
| `canva/og-1200x630.png` | [Social — Open Graph 1200×630](https://www.canva.com/d/KCfFPPAr3_qfEx9) `DAHS_qrdUEo` | Link previews. Official mark on the bone plate; type on ink. |
| `canva/twitter-1200x600.png` | [Social — Twitter/X 1200×600](https://www.canva.com/d/obpjGPbZcWC5L4Q) `DAHS_sUjFno` | Same split, shorter field. |
| `canva/favicon-512.png` | [Favicon / app icon — mark on bone 512](https://www.canva.com/d/YjSerHYRxMDMlvR) `DAHS_tVvDXs` | Tab / PWA. Crop to the stamp. |
| `canva/avatar-circle-on-ink.png` | [Avatar — circle on ink](https://www.canva.com/d/IceEn5Bt5_-OT2v) `DAHS_jX6HSk` | Profile crop. Prefer the bone-plate stamp if the circle frame feels busy. |
| `canva/email-signature-on-bone.png` | [Email — signature lockup on bone](https://www.canva.com/d/T9eHIJcZRDFNu8k) `DAHS_txkSgY` | Same as the bone horizontal lockup (resize quota ran out before a thin strip). |

## Opening-rate campaign (first ads)

Folder: [Cactus Wave Media — Opening Rate](https://www.canva.com/folder/FAHS_wxNc_Y)

Magic generation and Magic Resize were exhausted, so these are edited copies of the official plates — same ribbed stamp (`MAHS_eplHE8`), not a new cactus. Copy is an opening studio courtesy, not a cheap sale.

| File | Canva | Size |
| --- | --- | --- |
| `campaign/opening-rate-instagram-1080.png` | [Opening Rate — Instagram 1080×1080](https://www.canva.com/design/DAHS_0PXmWM) | 1080×1080 (canvas is 2000×2000, 1:1) |
| `campaign/opening-rate-story-1080x1920.png` | [Opening Rate — Story 1080×1920](https://www.canva.com/design/DAHS_00W9BA) | Local 1080×1920 (ink-padded). Canva canvas is still 2000×2000 until Resize quota returns. |
| `campaign/opening-rate-landscape-1200x630.png` | [Opening Rate — Landscape 1200×630](https://www.canva.com/design/DAHS_0m2gfs) | 1200×630 Meta/OG |

**Copy:** Opening rate / Half off through 31 October / cactuswavemedia.com (landscape only).

Older exploratory logos stay in [Cactus Wave Media](https://www.canva.com/folder/FAHS_Zb77Es). Do not ship those.

## Not in this Canva pass

- Transparent lockups — Free plan.
- Mark on brass — generation quota, then resize quota.
- Stacked / compact on bone as separate designs — use the bone horizontal and edit in Canva, or wait for quota.
- Dedicated 1600×400 email strip.

## Local leftovers

`public/brand/pack/mark/`, `wordmark/`, `svg/`, etc. may still hold files from the aborted Python flatten. They are **not** the Canva kit. Prefer `canva/` and the folder above. The live site continues to use `<BrandMark>` / `<Wordmark>`, not these PNGs.
