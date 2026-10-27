"""Make the images search engines and link previews use.

    python tools/make_social.py

Writes into public/:
    og-image.jpg     1200x630 preview shown when the site is shared
                     (texts, iMessage, Instagram, Facebook, X ...)
    logo.png         the wordmark on transparent, for search engines
    favicon-48.png   PNG fallback for the SVG favicon (Google's minimum)

Needs Pillow and ImageMagick (`magick`) to rasterize the SVGs.
"""

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
MARK = ROOT / "src" / "assets" / "logo" / "brickstone-mark.svg"
NAVY = (27, 35, 83)
ORANGE = "#B77543"


def rasterize(svg_text, width, out):
    with tempfile.NamedTemporaryFile("w", suffix=".svg", delete=False) as f:
        f.write(svg_text)
        src = f.name
    subprocess.run(["magick", "-background", "none", "-density", "300", src, "-resize", f"{width}x", out], check=True)
    Path(src).unlink()
    return Image.open(out).convert("RGBA")


def main():
    mark_svg = MARK.read_text().replace("currentColor", ORANGE)

    # logo.png
    logo = rasterize(mark_svg, 800, PUBLIC / "logo.png")
    print("logo.png", logo.size)

    # og-image.jpg: the combo photo on the right, the wordmark on a navy panel
    W, H, PANEL = 1200, 630, 470
    card = Image.new("RGB", (W, H), NAVY)
    photo = ImageOps.exif_transpose(Image.open(PUBLIC / "photos" / "two-slices.webp")).convert("RGB")
    photo = ImageOps.fit(photo, (W - PANEL, H), centering=(0.5, 0.5))
    card.paste(photo, (PANEL, 0))
    mark = logo.copy()
    mark.thumbnail((PANEL - 90, H))
    card.paste(mark, ((PANEL - mark.width) // 2, (H - mark.height) // 2), mark)
    card.save(PUBLIC / "og-image.jpg", quality=86, optimize=True, progressive=True)
    print("og-image.jpg", card.size, (PUBLIC / "og-image.jpg").stat().st_size // 1024, "KB")

    # favicon-48.png from the existing SVG favicon
    subprocess.run(["magick", "-background", "none", "-density", "300", str(PUBLIC / "favicon.svg"),
                    "-resize", "48x48", str(PUBLIC / "favicon-48.png")], check=True)
    print("favicon-48.png")


if __name__ == "__main__":
    main()
