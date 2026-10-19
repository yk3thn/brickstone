import { hero } from "../content.js";
import { button, emphasize } from "../components/ui.js";
import { photo } from "../components/photo.js";
import { sandwichIcon } from "../components/logo.js";

// Hero items carry data-reveal="intro": they are revealed by the intro as
// the wall comes down (see intro.js), not by scrolling.
export default {
  render: () => `
    <section class="hero" id="top">
      <div class="hero__texture wall wall--navy" aria-hidden="true"></div>
      <div class="hero__inner container">
        <div class="hero__copy">
          <h1 class="display" data-reveal="intro" style="--i:0">${emphasize(hero.title)}</h1>
          <p class="lead hero__lead" data-reveal="intro" style="--i:1">${hero.lead}</p>
          <div class="hero__actions" data-reveal="intro" style="--i:2">
            ${button({ ...hero.primary, variant: "primary" })}
            ${button({ ...hero.secondary, variant: "ghost" })}
          </div>
        </div>
        <div class="hero__media" data-reveal="intro" style="--i:1">
          ${photo({ ...hero.photo, ratio: "4 / 5", tone: "deep", eager: true, className: "hero__photo" })}
          <div class="sticker" aria-hidden="true">
            <svg class="sticker__ring" viewBox="0 0 200 200">
              <defs><path id="sticker-circle" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0"/></defs>
              <text><textPath href="#sticker-circle" textLength="464" lengthAdjust="spacing">${hero.sticker}</textPath></text>
            </svg>
            ${sandwichIcon({ className: "sticker__icon" })}
          </div>
        </div>
      </div>
    </section>`,
};
