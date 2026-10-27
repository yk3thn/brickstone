// Last step of `npm run build`.
//
// 1. Pre-renders the page into dist/index.html, so search engines, link
//    previews and anything else that doesn't run JavaScript still get the
//    whole site — menu, hours, address and all.
// 2. Adds the restaurant's structured data (schema.org JSON-LD).
// 3. Writes .br and .gz copies of the text files; sirv sends those to
//    browsers that accept them, so pages load faster.
//
// render.js is compiled for Node first by `vite build --ssr` into dist-ssr/.

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { brotliCompressSync, gzipSync, constants } from "node:zlib";
import { fileURLToPath } from "node:url";

const DIST = new URL("../dist/", import.meta.url);
const { renderPage, structuredData } = await import(new URL("../dist-ssr/render.js", import.meta.url));

// --- 1 + 2: the page itself -------------------------------------------------
const indexUrl = new URL("index.html", DIST);
let html = await readFile(indexUrl, "utf8");

const EMPTY_APP = '<div id="app"></div>';
if (!html.includes(EMPTY_APP)) throw new Error("dist/index.html has no empty #app to fill");
html = html.replace(EMPTY_APP, `<div id="app">${renderPage()}</div>`);

// "<" is escaped so nothing in the data can close the script tag early.
const jsonLd = JSON.stringify(structuredData()).replace(/</g, "\\u003c");
html = html.replace("</head>", `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`);

await writeFile(indexUrl, html);
console.log(`prerendered dist/index.html (${Math.round(html.length / 1024)} KB)`);

// --- 3: compressed copies -----------------------------------------------------
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".svg", ".json", ".xml", ".txt"]);

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

let saved = 0;
for await (const path of files(fileURLToPath(DIST))) {
  if (!COMPRESSIBLE.has(extname(path))) continue;
  const body = await readFile(path);
  const br = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } });
  await writeFile(`${path}.br`, br);
  await writeFile(`${path}.gz`, gzipSync(body, { level: 9 }));
  saved += body.length - br.length;
}
console.log(`compressed text files (brotli saves ${Math.round(saved / 1024)} KB)`);
