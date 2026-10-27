import { order } from "../content.js";
import { sectionHeader, arrow } from "../components/ui.js";

// Where to order: the restaurant's own Toast page first, then the delivery
// apps. Each opens in a new tab.
export default {
  render: () => `
    <section class="section section--light order" id="order">
      <div class="container">
        ${sectionHeader(order)}
        <ul class="order__options">
          ${order.options
            .map(
              (o, i) => `
            <li data-reveal style="--i:${i + 1}">
              <a class="order-option${o.featured ? " order-option--featured" : ""}" href="${o.href}" target="_blank" rel="noopener">
                <span class="order-option__label">${o.label}</span>
                <span class="order-option__go">${arrow()}</span>
              </a>
            </li>`,
            )
            .join("")}
        </ul>
      </div>
    </section>`,
};
