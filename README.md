# Brickstone — website demo

Site for **Brickstone** ([@brickstone_atl](https://www.instagram.com/brickstone_atl/)),
66 Broad St NW, Atlanta. Everything on it comes from the owner: address, phone, hours,
the menu (copied from the Toast ordering page), the Toast / DoorDash / Uber Eats links and
the photo shoot. The About paragraph is still a placeholder. Nothing is made up.

Built the same way as ethanmogilinedi.com: Vite + GSAP, served on Railway by `sirv`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
```

`?intro=0` on the URL skips the intro while you work on the page.

## Where to change things

| To change…                         | Edit                                   |
| ---------------------------------- | -------------------------------------- |
| Any words, prices, hours, links    | `src/content.js` (everything is here)  |
| Menu items and prices              | `menu` in `content.js` (a trailing `+` on a price means "from") |
| Ordering links                     | `orderLinks` in `content.js` (Toast, DoorDash, Uber Eats) |
| Photos                             | add a line to `tools/optimize_photos.py`, run it on the shoot folder, point a `photo.src` at `/photos/<name>.webp` |
| Colours, font, sizes, spacing      | `src/styles/tokens.css`                |
| Add / remove / reorder sections    | `SECTIONS` in `src/main.js`            |
| One section's layout               | `src/sections/<name>.js` + its block in `src/styles/sections.css` |
| Intro pacing                       | `INTRO_TIMING` at the top of `src/intro.js` |
| Swap a placeholder for a real photo| give that item's `photo` a `src` in `content.js` (put the file in `public/`) |

Words wrapped in `*asterisks*` in a title are set in orange.

## The brand

- **Logo** — `src/assets/logo/brickstone-mark.svg` is the wordmark traced from the client's
  logo (`tools/source/logo-original.webp`) by `tools/trace_logo.py`. One `<path>` per letter
  (`data-letter="B"` … `"E"`, `"O"` is the sandwich), filled with `currentColor`.
  Re-run with `python tools/trace_logo.py` (needs pillow, numpy, opencv-python, potracer).
- **Colours** — colour-picked from the logo (see `tools/out/palette.txt`):
  navy `#1B2353` (brick face), deep navy `#141D4C` (mortar), orange `#B77543` (wordmark).
  Cream `#F6F0E8` is the one added neutral for light sections and text.
- **Font** — one family, Bricolage Grotesque (self-hosted via Fontsource), in three weights:
  400 body, 600 UI, 800 headings.
- **Texture** — the logo's brick wall, measured off the artwork (long + short bricks, each
  course shifted half a pattern), generated in `src/components/brick.js` and used for the
  intro, the hero, the footer and every placeholder photo.

## How the intro works

1. The page is fully built and laid out underneath before anything moves; the intro waits
   for the font and first-screen images (`src/ready.js`), so nothing pops in.
2. The logo's own wall fades up, the letters are laid on it one by one, the sandwich lands
   last, the tagline comes up — the sign, recreated.
3. The wall's courses slide away alternately left and right from the middle while the
   wordmark shrinks into the nav. The page shows through only where a course has moved;
   the hero content eases in as it opens.
4. **Click or press any key to skip** — it fast-forwards whatever is left into under half a
   second rather than cutting, so everything lands exactly where it would have.

Below the hero, everything with `data-reveal` eases up as it scrolls into view
(`src/reveal.js`). The intro deliberately plays even with reduced-motion turned on.

## Deploying (Railway)

`railway.json` builds with `npm run build` and starts `npm run start` (`sirv dist` on
`$PORT`). Point a Railway service at this repo; no environment variables needed.

## Files

```
index.html               shell (navy first paint, favicon)
public/                  favicon.svg, apple-touch-icon.png, photos/ (web-sized shoot)
src/main.js              assembles the page and starts the intro
src/content.js           ALL site content
src/intro.js             the opening animation
src/ready.js, reveal.js  load gate, scroll reveals
src/components/          logo, brick texture, photo slot, buttons/labels
src/sections/            nav, hero (combo), marquee, order, combos, menu, about, visit, gallery (Instagram), footer
src/styles/              tokens, base, components, sections, intro
tools/                   logo tracer + the original logo, photo optimizer
```
