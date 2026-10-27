import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/intro.css";

import { renderPage, SECTIONS, CHROME } from "./render.js";
import { installWallTextures } from "./components/brick.js";
import { initPhotos } from "./components/photo.js";
import { runIntro } from "./intro.js";
import { whenReady } from "./ready.js";
import { revealIntroItems, initScrollReveals } from "./reveal.js";

// The built site arrives with the page already in the HTML (see
// tools/prerender.mjs); the dev server doesn't, so build it here then.
const app = document.querySelector("#app");
if (!app.children.length) app.innerHTML = renderPage();

installWallTextures();
initPhotos();
[...CHROME, ...SECTIONS].forEach((section) => section.init?.());

// The whole page is built and laid out underneath before the intro starts;
// the intro only uncovers it.
runIntro({
  ready: whenReady(),
  onReveal: () => {
    revealIntroItems();
    initScrollReveals();
  },
});
