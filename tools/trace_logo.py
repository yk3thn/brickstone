"""Trace the Brickstone wordmark out of the client's raster logo.

    python tools/trace_logo.py

Reads  tools/source/logo-original.webp  (the logo as posted: orange wordmark,
white tagline, navy brick wall) and writes

    src/assets/logo/brickstone-mark.svg   one <path> per letter, currentColor
    tools/out/palette.txt                 the colour-picked brand colours
    tools/out/mask.png                    the bitmap that was traced (debug)

Only the orange shape is kept: the wall, the dark drop-shadow and the tagline
are all left behind, so the mark can sit on any background and take any
colour. Each letter is its own path (data-letter="B", "R", ... "O" for the
sandwich) so the intro can lay them one at a time.

Needs: pillow, numpy, opencv-python, potracer (pure-Python potrace port).
"""

from pathlib import Path

import cv2
import numpy as np
import potrace
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "tools" / "source" / "logo-original.webp"
OUT_SVG = ROOT / "src" / "assets" / "logo" / "brickstone-mark.svg"
OUT_DIR = ROOT / "tools" / "out"

UPSCALE = 3          # trace at 3x so curves come out smooth, not stair-stepped
MIN_AREA = 40        # px at source scale; anything smaller is webp noise
LETTERS = ["B", "R", "I", "C", "K", "S", "T", "O", "N", "E"]  # reading order; "O" is the sandwich


def hexcol(rgb):
    return "#%02X%02X%02X" % tuple(int(round(c)) for c in rgb)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_SVG.parent.mkdir(parents=True, exist_ok=True)
    rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32)

    # --- Colour pick. Orange has a big red-minus-blue; navy and the white
    # tagline both sit near zero or below, so R-B separates the wordmark
    # cleanly from everything else in the file.
    rb = rgb[..., 0] - rgb[..., 2]
    orange_px = rgb[rb > 90]
    white_px = rgb[(rgb.min(axis=2) > 200)]
    blue_px = rgb[(rb < -40) & (rgb[..., 2] > 79)]
    deep_px = rgb[(rb < -40) & (rgb[..., 2] < 77)]
    palette = {
        "orange": hexcol(np.median(orange_px, axis=0)),
        "navy": hexcol(np.median(blue_px, axis=0)),
        "navy-deep": hexcol(np.median(deep_px, axis=0)),
        "white": hexcol(np.median(white_px, axis=0)),
    }
    (OUT_DIR / "palette.txt").write_text(
        "\n".join(f"{k:10s} {v}" for k, v in palette.items()) + "\n"
    )
    print("palette", palette)

    # --- Soft alpha for "how orange is this pixel", then the wordmark only.
    navy_rb = float(np.median(rb[(rb < -40)]))
    orange_rb = float(np.median(rb[rb > 90]))
    alpha = np.clip((rb - navy_rb) / (orange_rb - navy_rb), 0, 1)

    hard = (alpha > 0.5).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(hard, connectivity=8)
    keep = [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] >= MIN_AREA]
    x0 = min(stats[i, 0] for i in keep)
    y0 = min(stats[i, 1] for i in keep)
    x1 = max(stats[i, 0] + stats[i, 2] for i in keep)
    y1 = max(stats[i, 1] + stats[i, 3] for i in keep)
    pad = 4
    x0, y0, x1, y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
    W, H = x1 - x0, y1 - y0

    # Upscale the soft alpha (not the hard mask) so the threshold lands
    # between pixels, then a whisper of blur to iron out compression ripple.
    crop = alpha[y0:y1, x0:x1]
    big = cv2.resize(crop, (W * UPSCALE, H * UPSCALE), interpolation=cv2.INTER_CUBIC)
    big = cv2.GaussianBlur(big, (0, 0), UPSCALE * 0.9)
    mask = (big > 0.5).astype(np.uint8)
    Image.fromarray(mask * 255).save(OUT_DIR / "mask.png")

    # --- Split into letters. Each connected blob is a piece; a smaller piece
    # whose centre falls inside a bigger piece's box belongs to that piece.
    # (The sandwich sits in front of the N and cuts the foot off its left
    # stem — that foot is its own blob, and this hands it back to the N.)
    n, labels, stats, cents = cv2.connectedComponentsWithStats(mask, connectivity=8)
    pieces = [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] >= MIN_AREA * UPSCALE**2]
    box = {i: (stats[i, 0], stats[i, 1], stats[i, 0] + stats[i, 2], stats[i, 1] + stats[i, 3]) for i in pieces}
    owner = {}
    for i in pieces:
        cx, cy = cents[i]
        hosts = [
            j for j in pieces
            if j != i and stats[j, cv2.CC_STAT_AREA] > stats[i, cv2.CC_STAT_AREA]
            and box[j][0] <= cx <= box[j][2] and box[j][1] <= cy <= box[j][3]
        ]
        owner[i] = min(hosts, key=lambda j: stats[j, cv2.CC_STAT_AREA]) if hosts else i
    def root(i):
        while owner[i] != i:
            i = owner[i]
        return i
    groups = {}
    for i in pieces:
        groups.setdefault(root(i), []).append(i)

    # Two rows (BRICK / STONE), each read left to right.
    mid = mask.shape[0] / 2
    ordered = sorted(groups, key=lambda g: (cents[g][1] > mid, cents[g][0]))
    if len(ordered) != len(LETTERS):
        raise SystemExit(f"expected {len(LETTERS)} letters, found {len(ordered)}")

    paths = []
    for letter, g in zip(LETTERS, ordered):
        m = np.isin(labels, groups[g])
        gx0 = min(box[i][0] for i in groups[g]) - 2
        gy0 = min(box[i][1] for i in groups[g]) - 2
        gx1 = max(box[i][2] for i in groups[g]) + 2
        gy1 = max(box[i][3] for i in groups[g]) + 2
        sub = m[gy0:gy1, gx0:gx1]
        bm = potrace.Bitmap(~sub)  # potracer treats falsy pixels as ink
        plist = bm.trace(turdsize=8, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
                         alphamax=1.0, opticurve=True, opttolerance=0.25)
        d = []
        s = 1 / UPSCALE
        def pt(p):
            return f"{(p.x + gx0) * s:.2f} {(p.y + gy0) * s:.2f}"
        for curve in plist:
            d.append("M" + pt(curve.start_point))
            for seg in curve.segments:
                if seg.is_corner:
                    d.append("L" + pt(seg.c) + "L" + pt(seg.end_point))
                else:
                    d.append("C" + pt(seg.c1) + " " + pt(seg.c2) + " " + pt(seg.end_point))
            d.append("Z")
        paths.append((letter, "".join(d), (gx0 * s, gy0 * s, gx1 * s, gy1 * s)))
        print(letter, "curves", len(plist))

    body = "\n".join(
        f'  <path data-letter="{L}" fill-rule="evenodd" d="{d}"/>' for L, d, _ in paths
    )
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'fill="currentColor" role="img" aria-label="Brickstone">\n{body}\n</svg>\n'
    )
    OUT_SVG.write_text(svg)
    print("wrote", OUT_SVG.relative_to(ROOT), f"viewBox 0 0 {W} {H}", f"{len(svg)//1024} KB")
    for L, _, b in paths:
        print(f"  {L}: x {b[0]:.0f}-{b[2]:.0f}  y {b[1]:.0f}-{b[3]:.0f}")


if __name__ == "__main__":
    main()
