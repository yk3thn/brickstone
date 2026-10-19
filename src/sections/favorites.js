import { favorites } from "../content.js";
import { sectionHeader, price } from "../components/ui.js";
import { photo } from "../components/photo.js";

export default {
  render: () => `
    <section class="section section--dark favorites" id="favorites">
      <div class="container">
        ${sectionHeader(favorites)}
        <div class="cards">
          ${favorites.items
            .map(
              (f, i) => `
            <article class="card" data-reveal style="--i:${i}">
              ${photo({ ...f.photo, ratio: "4 / 3", tone: "navy", className: "card__photo" })}
              <div class="card__body">
                <div class="card__top">
                  <h3 class="h3">${f.name}</h3>
                  ${price(f.price)}
                </div>
                <p class="card__desc">${f.desc}</p>
              </div>
            </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>`,
};
