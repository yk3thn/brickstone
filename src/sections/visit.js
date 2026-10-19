import { visit, site } from "../content.js";
import { sectionHeader } from "../components/ui.js";

export default {
  render: () => `
    <section class="section section--light visit" id="visit">
      <div class="container">
        ${sectionHeader(visit)}
        <div class="visit__grid">
          <div class="info-card" data-reveal style="--i:0">
            <p class="eyebrow">Hours</p>
            <dl class="hours">
              ${site.hours.map((h) => `<div><dt>${h.days}</dt><dd>${h.time}</dd></div>`).join("")}
            </dl>
          </div>

          <div class="info-card" data-reveal style="--i:1">
            <p class="eyebrow">Location</p>
            <address class="address">${site.address.join("<br />")}</address>
            <div class="info-card__links">
              <span>${site.phone}</span>
              <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a>
            </div>
          </div>

          <div class="map" data-reveal style="--i:2">
            <div class="map__grid" aria-hidden="true"></div>
            <div class="map__pin" aria-hidden="true">
              <svg viewBox="0 0 24 32"><path d="M12 1C6 1 1.5 5.5 1.5 11.2 1.5 19 12 31 12 31s10.5-12 10.5-19.8C22.5 5.5 18 1 12 1z"/><circle cx="12" cy="11" r="4" /></svg>
            </div>
            <p class="map__label">${visit.mapLabel}</p>
          </div>
        </div>
      </div>
    </section>`,
};
