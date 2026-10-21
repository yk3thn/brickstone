// ==========================================================================
// Site content — every word, price and link on the page lives here.
//
// The only real information below is the name, the four words from the
// logo, the address and the Instagram link. Everything else is a neutral placeholder
// waiting for the owner's real details — edit this file and the page
// updates; no markup to touch. (Photos: give any `photo` a `src` and the
// placeholder tile becomes that image.)
// ==========================================================================

// Stand-in rows until the real menu arrives. Replace a call with a list of
// real items, e.g. [{ name: "…", desc: "…", price: "12" }, …].
const placeholderItems = (count) =>
  Array.from({ length: count }, () => ({ name: "Item name", desc: "Item description", price: "00" }));

export const site = {
  name: "Brickstone",
  // The four words under the logo.
  tagline: ["Subs", "Pizzas", "Pastas", "Coffee"],

  address: ["66 Broad St NW", "Atlanta, Georgia 30303"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=66+Broad+St+NW+Atlanta+GA+30303",
  phone: "(000) 000-0000",

  // PLACEHOLDER — paste the restaurant's Toast online-ordering link here
  // (Toast Web: Takeout & delivery > Toast order sources > Restaurant info).
  // Every "Order online" button on the site uses it, and opens it in a new
  // tab once it's a full https:// link. Until then they just jump to the menu.
  orderUrl: "#menu",

  instagram: {
    handle: "@brickstone_atl",
    url: "https://www.instagram.com/brickstone_atl/",
  },

  hours: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((days) => ({
    days,
    time: "00:00 – 00:00",
  })),
};

// Top navigation. `href` is the id of a section below.
export const nav = [
  { label: "Menu", href: "#menu" },
  { label: "Favorites", href: "#favorites" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
];

// The Toast ordering button, wherever it appears (nav, hero, menu).
export const order = { label: "Order online", href: site.orderUrl };
export const navCta = order;

export const hero = {
  // Wrap words in *asterisks* to set them in orange.
  title: "Subs, pizzas, pastas *& coffee.*",
  lead: "A short introduction to Brickstone goes here.",
  primary: order,
  secondary: { label: "View menu", href: "#menu" },
  photo: { label: "Photo" },
  sticker: "Subs · Pizzas · Pastas · Coffee · ",
};

export const marquee = site.tagline;

export const menu = {
  title: "Menu",
  categories: site.tagline.map((name) => ({ name, items: placeholderItems(6) })),
};

export const favorites = {
  title: "Favorites",
  items: placeholderItems(3).map((item) => ({ ...item, photo: { label: "Photo" } })),
};

export const about = {
  title: "About",
  paragraphs: ["A few sentences about Brickstone go here."],
  photo: { label: "Photo" },
  photo2: { label: "Photo" },
};

export const visit = {
  title: "Visit",
  mapLabel: "Map",
};

export const gallery = {
  title: "Instagram",
  photos: Array.from({ length: 6 }, () => ({ label: "Photo" })),
};
