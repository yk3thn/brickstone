import { site, nav } from "../content.js";
import { logoMark } from "../components/logo.js";

export default {
  render: () => `
    <footer class="footer">
      <div class="footer__texture wall wall--deep" aria-hidden="true"></div>
      <div class="container footer__inner">
        <div class="footer__mark" data-reveal>${logoMark({ className: "footer__logo", decorative: true })}</div>
        <p class="footer__tagline" data-reveal style="--i:1">${site.tagline.join('<span aria-hidden="true">|</span>')}</p>

        <div class="footer__cols">
          <div data-reveal style="--i:2">
            <p class="eyebrow">Location</p>
            <p>${site.address.join("<br />")}</p>
          </div>
          <div data-reveal style="--i:3">
            <p class="eyebrow">Explore</p>
            <ul>${nav.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
          </div>
          <div data-reveal style="--i:4">
            <p class="eyebrow">Contact</p>
            <ul>
              <li>${site.phone}</li>
              <li><a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__base">
          <span>&copy; ${new Date().getFullYear()} ${site.name}</span>
        </div>
      </div>
    </footer>`,
};
