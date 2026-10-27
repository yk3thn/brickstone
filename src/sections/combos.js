import { combos } from "../content.js";
import { sectionHeader, price } from "../components/ui.js";
import { photo } from "../components/photo.js";

export default {
  render: () => `
    <section class="section section--dark combos" id="combos">
      <div class="container">
        ${sectionHeader(combos)}
        <div class="cards">
          ${combos.items
            .map(
              (c, i) => `
            <article class="card" data-reveal style="--i:${i}">
              <div class="card__photos">
                ${c.photos.map((p) => photo({ ...p, ratio: "1 / 1" })).join("")}
              </div>
              <div class="card__body">
                <div class="card__top">
                  <h3 class="h3">${c.name}</h3>
                  ${price(c.price)}
                </div>
                ${c.desc ? `<p class="card__desc">${c.desc}</p>` : ""}
              </div>
            </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>`,
};
