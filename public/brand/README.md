# Cactus Wave Media — brand kit source

Single mark. Everything else is type, color, and restraint.

## The mark

- Source (Canva, bone plate): `cactus-wave-media-mark-abstract.png`
- Transparent glyph (CSS mask): `mark.png`
- Bone glyph (icons / OG): `mark-bone.png`
- Social avatar, bone on ink: `avatar.png`

The Canva export has no alpha — Free blocked transparent PNG. Do not place the source file on a non-bone surface. Use `BrandMark` (mask) or the derived files.

Regenerate derivatives:

```
python scripts/extract-mark.py
```

## Tokens

See `src/lib/brand.ts` and `src/app/globals.css`.

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#0B0F0E` | Default field |
| Bone | `#F4EFE6` | Figure, reverse field |
| Sage | `#6E7F6B` | One accent, never a fill |
| Brass | `#C4A574` | Hairline metal (`--copper` in CSS) |

## Components

```ts
import { BrandMark, Wordmark } from "@/components/brand";
```

Public kit: `/brand`

Downloadable Canva exports: `pack/canva/`. Kit notes: `pack/README.md`.
Folder: https://www.canva.com/folder/FAHS_hqG6KE
Do not regenerate from `scripts/export-brand-pack.py` — Canva is the pack.
