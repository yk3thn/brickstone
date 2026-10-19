// ==========================================================================
// Site content — every word, price and link on the page lives here.
//
// This is a demo: anything marked PLACEHOLDER is made up and should be
// replaced with the real thing. Edit this file and the page updates; no
// markup to touch. (Photos: give any `photo` a `src` and the placeholder
// tile becomes that image.)
// ==========================================================================

export const site = {
  name: "Brickstone",
  // The four words under the logo.
  tagline: ["Subs", "Pizzas", "Pastas", "Coffee"],
  neighborhood: "Downtown Atlanta",
  landmark: "Georgia State campus",

  address: ["Address coming soon", "Downtown Atlanta, GA"], // PLACEHOLDER
  phone: "(404) 555-0123", // PLACEHOLDER (555 = fictional)
  orderUrl: "#menu", // PLACEHOLDER — point at the real online-ordering link
  cateringUrl: "#catering", // PLACEHOLDER — catering form or email
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Brickstone+Downtown+Atlanta",

  instagram: {
    handle: "@brickstone_atl",
    url: "https://www.instagram.com/brickstone_atl/",
  },

  // PLACEHOLDER hours.
  hours: [
    { days: "Monday – Friday", time: "10am – 9pm" },
    { days: "Saturday", time: "11am – 9pm" },
    { days: "Sunday", time: "11am – 6pm" },
  ],
};

// Top navigation. `href` is the id of a section below.
export const nav = [
  { label: "Menu", href: "#menu" },
  { label: "Favorites", href: "#favorites" },
  { label: "Catering", href: "#catering" },
  { label: "Our story", href: "#story" },
  { label: "Visit", href: "#visit" },
];

export const hero = {
  eyebrow: `${site.neighborhood} · ${site.landmark}`,
  // Wrap a word in *asterisks* to set it in orange.
  title: "Built from scratch, *brick by brick.*",
  lead: "Toasted subs, soups, stone-baked pizzas, fresh pastas and real coffee — fresh flavors in the heart of Downtown.",
  primary: { label: "See the menu", href: "#menu" },
  secondary: { label: "Catering", href: "#catering" },
  facts: ["Toasted to order", "Pickup & dine-in", "Catering available"],
  photo: { label: "Hero shot — a toasted sub, cut and stacked" },
  sticker: "Toasted to order · Fresh daily · ",
};

export const marquee = ["Toasted subs", "Pizzas", "Pastas", "Soups", "Coffee", "Catering"];

// PLACEHOLDER menu — names, descriptions and prices are stand-ins.
export const menu = {
  eyebrow: "The menu",
  title: "Made to order, every order.",
  note: "Sample menu for the demo — items and prices are placeholders.",
  categories: [
    {
      name: "Subs",
      blurb: "Toasted on bread baked fresh every morning.",
      items: [
        { name: "The Brickstone", desc: "Salami, capicola, ham, provolone, hot giardiniera, oil & vinegar", price: "13" },
        { name: "Chicken Cutlet", desc: "Crispy cutlet, fresh mozzarella, basil pesto, roasted peppers", price: "13" },
        { name: "Meatball Parm", desc: "House meatballs, marinara, melted provolone, parmesan", price: "12" },
        { name: "Turkey Club", desc: "Roast turkey, bacon, lettuce, tomato, garlic aioli", price: "12" },
        { name: "Caprese", desc: "Fresh mozzarella, tomato, basil, balsamic glaze", price: "11" },
        { name: "Philly", desc: "Shaved ribeye, peppers, onions, white American", price: "14" },
      ],
    },
    {
      name: "Pizzas",
      blurb: "Hand-stretched dough, stone-baked. Whole pies or by the slice.",
      items: [
        { name: "Margherita", desc: "San Marzano tomato, fresh mozzarella, basil, olive oil", price: "14" },
        { name: "Pepperoni", desc: "Cup-and-char pepperoni, mozzarella, oregano", price: "15" },
        { name: "Hot Honey", desc: "Soppressata, mozzarella, chili honey, parmesan", price: "16" },
        { name: "White Pie", desc: "Ricotta, mozzarella, garlic, lemon zest, black pepper", price: "15" },
        { name: "Veggie", desc: "Mushroom, peppers, onion, olives, tomato sauce", price: "15" },
        { name: "Slice of the Day", desc: "Ask at the counter", price: "4" },
      ],
    },
    {
      name: "Pastas",
      blurb: "Tossed to order and finished in the pan.",
      items: [
        { name: "Spicy Vodka Rigatoni", desc: "Tomato cream, calabrian chili, parmesan", price: "14" },
        { name: "Chicken Alfredo", desc: "Fettuccine, garlic cream, grilled chicken", price: "15" },
        { name: "Baked Ziti", desc: "Ricotta, marinara, mozzarella, baked till bubbling", price: "13" },
        { name: "Pesto Penne", desc: "Basil pesto, cherry tomato, pine nuts", price: "13" },
        { name: "Spaghetti & Meatballs", desc: "House meatballs, slow-cooked marinara", price: "14" },
      ],
    },
    {
      name: "Soups",
      blurb: "Made from scratch daily. Cup or bowl.",
      items: [
        { name: "Tomato Basil", desc: "With a garlic crostini", price: "5 / 8" },
        { name: "Italian Wedding", desc: "Meatballs, greens, pastina", price: "6 / 9" },
        { name: "Minestrone", desc: "Seasonal vegetables, beans, pasta", price: "5 / 8" },
        { name: "Soup of the Day", desc: "Ask at the counter", price: "5 / 8" },
      ],
    },
    {
      name: "Coffee",
      blurb: "Espresso pulled to order. Hot or iced.",
      items: [
        { name: "Espresso", desc: "Double shot", price: "3" },
        { name: "Cappuccino", desc: "Espresso, steamed milk, foam", price: "4.5" },
        { name: "Latte", desc: "Add vanilla, caramel or hazelnut", price: "5" },
        { name: "Cold Brew", desc: "Steeped 18 hours", price: "4.5" },
        { name: "Affogato", desc: "Espresso over vanilla gelato", price: "6" },
      ],
    },
  ],
};

export const favorites = {
  eyebrow: "House favorites",
  title: "The ones people come back for.",
  items: [
    { name: "The Brickstone", desc: "Our namesake Italian sub, toasted and loaded.", price: "13", tag: "Sub", photo: { label: "The Brickstone sub" } },
    { name: "Hot Honey Pie", desc: "Soppressata, chili honey, a hit of parmesan.", price: "16", tag: "Pizza", photo: { label: "Hot honey pizza" } },
    { name: "Spicy Vodka Rigatoni", desc: "Creamy, a little heat, finished in the pan.", price: "14", tag: "Pasta", photo: { label: "Vodka rigatoni" } },
  ],
};

export const story = {
  eyebrow: "Our story",
  title: "A neighborhood counter for Downtown.",
  // PLACEHOLDER copy — swap in the owner's own story.
  paragraphs: [
    "Brickstone started with a simple idea: the kind of sandwich shop you'd want on your block — bread toasted right, ingredients that taste like something, and a counter where people know your order.",
    "Right on the Georgia State campus, we're feeding students, office crews and neighbors every day, from a morning coffee to a late lunch to a box of pies for the whole floor.",
  ],
  stats: [
    { value: "Daily", label: "Bread & soups made fresh" },
    { value: "To order", label: "Every sub toasted" },
    { value: "Steps", label: "From Georgia State" },
  ],
  photo: { label: "Behind the counter" },
  photo2: { label: "The dining room" },
};

export const catering = {
  eyebrow: "Catering",
  title: "Feeding a crowd? We'll bring the spread.",
  lead: "Sub platters, whole pies, pasta trays and coffee for offices, campus events, meetings and game days.",
  cta: { label: "Plan your order", href: site.cateringUrl },
  points: ["Sub platters", "Whole pizzas", "Pasta trays", "Coffee service"],
};

export const visit = {
  eyebrow: "Visit",
  title: "Come hungry.",
  mapLabel: "Map — Downtown Atlanta",
};

export const gallery = {
  eyebrow: "On Instagram",
  title: site.instagram.handle,
  photos: [
    { label: "Post" },
    { label: "Post" },
    { label: "Post" },
    { label: "Post" },
    { label: "Post" },
    { label: "Post" },
  ],
};

export const footer = {
  note: "Demo site — all copy, prices and photos are placeholders.",
};
