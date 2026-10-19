import { gallery, site } from "../content.js";
import { photo } from "../components/photo.js";
import { button } from "../components/ui.js";

const tones = ["navy", "orange", "deep", "cream", "navy", "orange"];

export default {
  render: () => `
    <section class="section section--dark gallery" id="gallery">
      <div class="container">
        <div class="gallery__head">
          <div>
            <p class="eyebrow" data-reveal style="--i:0">${gallery.eyebrow}</p>
            <h2 class="h2" data-reveal style="--i:1">${gallery.title}</h2>
          </div>
          <div data-reveal style="--i:2">
            ${button({ label: "Follow along", href: site.instagram.url, variant: "ghost", external: true })}
          </div>
        </div>
        <div class="gallery__grid">
          ${gallery.photos
            .map(
              (p, i) => `
            <a class="gallery__item" href="${site.instagram.url}" target="_blank" rel="noopener"
              aria-label="Open ${site.instagram.handle} on Instagram" data-reveal style="--i:${i}">
              ${photo({ ...p, ratio: "1 / 1", tone: tones[i % tones.length] })}
            </a>`,
            )
            .join("")}
        </div>
      </div>
    </section>`,
};
