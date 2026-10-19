import { nav as links, site } from "../content.js";
import { logoMark } from "../components/logo.js";
import { button } from "../components/ui.js";

export default {
  render: () => `
    <header class="nav" data-nav>
      <div class="nav__inner container">
        <a class="nav__logo" href="#top" aria-label="Brickstone — back to top">
          ${logoMark({ className: "nav__mark" })}
        </a>
        <nav class="nav__links" aria-label="Main">
          ${links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}
        </nav>
        <div class="nav__cta">${button({ label: "Order online", href: site.orderUrl })}</div>
        <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          <span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <nav aria-label="Main">
          ${links.map((l, i) => `<a href="${l.href}" style="--i:${i}">${l.label}</a>`).join("")}
        </nav>
        ${button({ label: "Order online", href: site.orderUrl })}
      </div>
    </header>`,

  init() {
    const header = document.querySelector("[data-nav]");
    const toggle = header.querySelector(".nav__toggle");
    const menu = header.querySelector(".mobile-menu");

    // Solid background once the page has scrolled off the very top.
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile menu: open/close, and close again when a link is chosen.
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      header.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    window.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  },
};
