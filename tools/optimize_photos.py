"""Turn the owner's photo shoot into web-sized images for the site.

    python tools/optimize_photos.py "C:/Users/yk3th/Downloads/Highlights/Highlights"

Reads the original Tezza-*.jpeg exports (1536px, 300-400 KB each, ~21 MB in
all) and writes small WebP copies into public/photos/, which content.js
points at. Only the photos the site uses are converted — add a line to
PHOTOS to bring another one in.
"""

import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "photos"

# output name: (source file, longest side in px)
PHOTOS = {
    # hero — the Pizza + Pizza + Drink combo
    "two-slices": ("Tezza-9730.jpeg", 1600),
    # combo cards
    "slice-pepperoni": ("Tezza-9903.jpeg", 900),
    "slice-cheese": ("Tezza-7377.jpeg", 900),
    "slice-loaded": ("Tezza-1254.jpeg", 900),
    "penne-tomato": ("Tezza-2712.jpeg", 900),
    "sub-tomato": ("Tezza-2497.jpeg", 900),
    "salad-caesar": ("Tezza-8688.jpeg", 900),
    # about
    "coffee-bar": ("Tezza-8782.jpeg", 1200),
    "iced-coffee": ("Tezza-9745.jpeg", 900),
    # gallery
    "pizza-pepperoni": ("Tezza-1664.jpeg", 800),
    "sub-lettuce": ("Tezza-3117.jpeg", 800),
    "penne-baked": ("Tezza-3475.jpeg", 800),
    "pizza-toppings": ("Tezza-4514.jpeg", 800),
    "iced-coffee-cup": ("Tezza-2446.jpeg", 800),
    "sub-drizzle": ("Tezza-8450.jpeg", 800),
}


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    src_dir = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for name, (src, size) in PHOTOS.items():
        im = ImageOps.exif_transpose(Image.open(src_dir / src)).convert("RGB")
        im.thumbnail((size, size), Image.LANCZOS)
        dest = OUT / f"{name}.webp"
        im.save(dest, "WEBP", quality=80, method=6)
        kb = dest.stat().st_size // 1024
        total += kb
        print(f"{name:26s} {im.width}x{im.height}  {kb} KB  <- {src}")
    print(f"total {total} KB")


if __name__ == "__main__":
    main()
