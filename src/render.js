// The whole page as an HTML string, plus the restaurant's structured data
// for search engines. Used twice:
//   - at build time, tools/prerender.mjs writes both into dist/index.html, so
//     search engines and link previews get the full page without running JS;
//   - in the browser (dev server), main.js renders it when there's nothing
//     pre-rendered yet.
// Nothing in here may touch `window` or `document`.

import { site, menu } from "./content.js";
import { logoMark } from "./components/logo.js";

import nav from "./sections/nav.js";
import hero from "./sections/hero.js";
import marquee from "./sections/marquee.js";
import order from "./sections/order.js";
import combos from "./sections/combos.js";
import menuSection from "./sections/menu.js";
import about from "./sections/about.js";
import visit from "./sections/visit.js";
import gallery from "./sections/gallery.js";
import footer from "./sections/footer.js";

// The page, top to bottom. Reorder, add or remove sections here — each one
// is a self-contained file in ./sections with its words in content.js.
export const SECTIONS = [hero, marquee, order, combos, menuSection, about, visit, gallery];
export const CHROME = [nav, footer];

export function renderPage() {
  return `
  ${introMarkup()}
  <div id="site">
    ${nav.render()}
    <main>${SECTIONS.map((s) => s.render()).join("")}</main>
    ${footer.render()}
  </div>`;
}

// The opening's overlay (see intro.js for how it plays).
function introMarkup() {
  return `
    <div id="intro" aria-hidden="true">
      <div class="intro__wall"></div>
      <div class="intro__stage">
        <div class="intro__mark">${logoMark({ decorative: true })}</div>
        <p class="intro__tagline">${site.tagline.join("<span>|</span>")}</p>
      </div>
    </div>`;
}

// ---------------------------------------------------------------------------
// Structured data (schema.org Restaurant), built from content.js so the
// hours, phone and menu search engines see always match the page.
// ---------------------------------------------------------------------------

const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// "10:30 AM" -> "10:30", "6 PM" -> "18:00"
function to24h(hour, minutes = "00", meridiem) {
  let h = Number(hour) % 12;
  if (meridiem.toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${minutes}`;
}

function openingHours() {
  return site.hours.flatMap(({ days, time }) => {
    const times = [...time.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi)];
    if (times.length !== 2 || !DAY_NAMES.includes(days)) return []; // "Closed"
    const [opens, closes] = times.map((m) => to24h(m[1], m[2], m[3]));
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${days}`, opens, closes }];
  });
}

// "9.95" -> Offer at 9.95; "9.95+" -> a starting price
function offer(price) {
  const value = price.replace("+", "");
  return price.endsWith("+")
    ? { "@type": "AggregateOffer", lowPrice: value, priceCurrency: "USD" }
    : { "@type": "Offer", price: value, priceCurrency: "USD" };
}

export function structuredData() {
  const url = `${site.url}/`;
  const p = site.postal;
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${url}#restaurant`,
    name: site.name,
    alternateName: site.alternateNames,
    url,
    logo: `${site.url}/logo.png`,
    image: [`${site.url}/og-image.jpg`, `${site.url}/photos/two-slices.webp`],
    telephone: `+1-${site.phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.street,
      addressLocality: p.city,
      addressRegion: p.stateCode,
      postalCode: p.zip,
      addressCountry: p.country,
    },
    servesCuisine: site.cuisines,
    priceRange: "$",
    openingHoursSpecification: openingHours(),
    sameAs: [site.instagram.url],
    hasMenu: {
      "@type": "Menu",
      name: "Menu",
      url: `${url}#menu`,
      hasMenuSection: menu.categories.map((c) => ({
        "@type": "MenuSection",
        name: c.name,
        hasMenuItem: c.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.desc ? { description: item.desc } : {}),
          offers: offer(item.price),
        })),
      })),
    },
    potentialAction: Object.values(site.orderLinks).map((target) => ({
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: target },
    })),
  };
}
