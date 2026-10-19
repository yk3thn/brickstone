// The brick wall from the logo, as a repeatable background.
//
// Measured off the original artwork: each course alternates a long brick
// and a short one, and every course is shifted half a pattern along, so a
// short brick always sits centred under a long one. Everything is a multiple
// of the course height H:
//
//   mortar 0.19H · long brick 2.6H · short brick 1.02H · pattern width 4H
//
// Colours are read from the CSS tokens at runtime, so changing --navy in
// tokens.css re-colours the bricks too.

const RATIO = { gap: 0.19, long: 2.6, short: 1.02, radius: 0.1, unit: 4 };

function token(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// One course of bricks, `unit` wide, as SVG markup. `y` places the course;
// `shift` slides the pattern along (used for the half-offset course).
function course(H, y, shift, fill) {
  const gap = RATIO.gap * H;
  const long = RATIO.long * H;
  const short = RATIO.short * H;
  const unit = RATIO.unit * H;
  const h = H - gap;
  const r = RATIO.radius * H;
  const bricks = [];
  // Draw one pattern either side as well so shifted bricks wrap cleanly.
  for (let k = -1; k <= 1; k++) {
    const x0 = k * unit + shift + gap / 2;
    bricks.push(
      `<rect x="${x0}" y="${y + gap / 2}" width="${long}" height="${h}" rx="${r}"/>`,
      `<rect x="${x0 + long + gap}" y="${y + gap / 2}" width="${short}" height="${h}" rx="${r}"/>`,
    );
  }
  return `<g fill="${fill}">${bricks.join("")}</g>`;
}

function toUrl(svg) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// A two-course tile that repeats in both directions — for backgrounds.
export function wallTile(H, { brick, mortar }) {
  const unit = RATIO.unit * H;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${unit}" height="${2 * H}" viewBox="0 0 ${unit} ${2 * H}">` +
    `<rect width="100%" height="100%" fill="${mortar}"/>` +
    course(H, 0, 0, brick) +
    course(H, H, unit / 2, brick) +
    `</svg>`;
  return { image: toUrl(svg), width: unit, height: 2 * H };
}

// A single course — for the intro, where each course is its own strip.
export function courseTile(H, { brick, mortar }) {
  const unit = RATIO.unit * H;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${unit}" height="${H}" viewBox="0 0 ${unit} ${H}">` +
    `<rect width="100%" height="100%" fill="${mortar}"/>` +
    course(H, 0, 0, brick) +
    `</svg>`;
  return { image: toUrl(svg), width: unit, height: H };
}

export const brickUnit = (H) => RATIO.unit * H;

// Background textures used around the site, published as CSS variables
// (--wall-navy etc.) so any element can use one: see .wall in components.css.
// Each pairs a brick colour with a mortar colour from the tokens.
const TEXTURES = {
  navy: { brick: "--navy", mortar: "--navy-deep", H: 64 },
  deep: { brick: "--navy-soft", mortar: "--navy-deep", H: 64 },
  orange: { brick: "--orange", mortar: "--orange-ink", H: 52 },
  cream: { brick: "--cream", mortar: "--cream-deep", H: 52 },
};

export function installWallTextures() {
  const root = document.documentElement.style;
  for (const [name, t] of Object.entries(TEXTURES)) {
    const tile = wallTile(t.H, { brick: token(t.brick), mortar: token(t.mortar) });
    root.setProperty(`--wall-${name}`, tile.image);
    root.setProperty(`--wall-${name}-size`, `${tile.width}px ${tile.height}px`);
  }
}

export { token };
