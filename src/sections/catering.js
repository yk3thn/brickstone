import { catering } from "../content.js";
import { button, emphasize } from "../components/ui.js";
import { sandwichIcon } from "../components/logo.js";

export default {
  render: () => `
    <section class="catering" id="catering">
      <div class="catering__texture wall wall--orange" aria-hidden="true"></div>
      <div class="container catering__inner">
        <div class="catering__copy">
          <p class="eyebrow eyebrow--navy" data-reveal style="--i:0">${catering.eyebrow}</p>
          <h2 class="h2" data-reveal style="--i:1">${emphasize(catering.title)}</h2>
          <p class="lead" data-reveal style="--i:2">${catering.lead}</p>
          <div data-reveal style="--i:3">${button({ ...catering.cta, variant: "dark" })}</div>
        </div>
        <ul class="catering__points">
          ${catering.points
            .map(
              (p, i) => `
            <li data-reveal style="--i:${i + 1}">
              ${sandwichIcon({ className: "catering__icon" })}
              <span>${p}</span>
            </li>`,
            )
            .join("")}
        </ul>
      </div>
    </section>`,
};
