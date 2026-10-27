import { menu, orderCta } from "../content.js";
import { sectionHeader, price, button } from "../components/ui.js";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default {
  render: () => `
    <section class="section section--light menu" id="menu">
      <div class="container">
        <div class="menu__top">
          ${sectionHeader(menu)}
          <div data-reveal style="--i:1">${button(orderCta)}</div>
        </div>

        <div class="tabs" role="tablist" aria-label="Menu categories" data-reveal style="--i:1">
          ${menu.categories
            .map(
              (c, i) => `
            <button class="tab" role="tab" type="button" id="tab-${slug(c.name)}"
              aria-controls="panel-${slug(c.name)}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
              ${c.name}
            </button>`,
            )
            .join("")}
        </div>

        <div class="menu__panels" data-reveal style="--i:2">
          ${menu.categories
            .map(
              (c, i) => `
            <div class="menu__panel" role="tabpanel" id="panel-${slug(c.name)}"
              aria-labelledby="tab-${slug(c.name)}" ${i === 0 ? "" : "hidden"}>
              ${c.note ? `<p class="menu__note">${c.note}</p>` : ""}
              <ul class="menu__list">
                ${c.items
                  .map(
                    (item, j) => `
                  <li class="menu-item" style="--i:${j}">
                    <div class="menu-item__row">
                      <h3 class="menu-item__name">${item.name}</h3>
                      <span class="menu-item__leader" aria-hidden="true"></span>
                      ${price(item.price)}
                    </div>
                    ${item.desc ? `<p class="menu-item__desc">${item.desc}</p>` : ""}
                  </li>`,
                  )
                  .join("")}
              </ul>
            </div>`,
            )
            .join("")}
        </div>
      </div>
    </section>`,

  // Plain tabs: click (or arrow keys) shows one category's panel.
  init() {
    const tabs = [...document.querySelectorAll("#menu .tab")];
    const select = (tab) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      }
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        const next = tabs[(i + step + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  },
};
