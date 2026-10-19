import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/intro.css";

import nav from "./sections/nav.js";
import hero from "./sections/hero.js";
import marquee from "./sections/marquee.js";
import menu from "./sections/menu.js";
import favorites from "./sections/favorites.js";
import story from "./sections/story.js";
import catering from "./sections/catering.js";
import visit from "./sections/visit.js";
import gallery from "./sections/gallery.js";
import footer from "./sections/footer.js";

import { installWallTextures } from "./components/brick.js";
import { initPhotos } from "./components/photo.js";
import { introMarkup, runIntro } from "./intro.js";
import { whenReady } from "./ready.js";
import { revealIntroItems, initScrollReveals } from "./reveal.js";

// The page, top to bottom. Reorder, add or remove sections here — each one
// is a self-contained file in ./sections with its words in content.js.
const SECTIONS = [hero, marquee, menu, favorites, story, catering, visit, gallery];

document.querySelector("#app").innerHTML = `
  ${introMarkup()}
  <div id="site">
    ${nav.render()}
    <main>${SECTIONS.map((s) => s.render()).join("")}</main>
    ${footer.render()}
  </div>`;

installWallTextures();
initPhotos();
[nav, ...SECTIONS, footer].forEach((section) => section.init?.());

// The whole page is built and laid out underneath before the intro starts;
// the intro only uncovers it.
runIntro({
  ready: whenReady(),
  onReveal: () => {
    revealIntroItems();
    initScrollReveals();
  },
});
