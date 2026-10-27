// ==========================================================================
// Site content — every word, price and link on the page lives here.
//
// Real details from the owner: address, phone, hours, the menu (copied
// from the Toast ordering page), the ordering links and the photo shoot
// (public/photos, made by tools/optimize_photos.py). The About paragraph is
// still a placeholder. Edit this file and the page updates; no markup to
// touch.
// ==========================================================================

export const site = {
  name: "Brickstone",
  // The four words under the logo.
  tagline: ["Subs", "Pizzas", "Pastas", "Coffee"],

  address: ["66 Broad St NW", "Atlanta, Georgia 30303"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=66+Broad+St+NW+Atlanta+GA+30303",
  phone: "(678) 300-2621",

  // Where people can order. Toast is the restaurant's own ordering page.
  orderLinks: {
    toast: "https://order.toasttab.com/online/brickstone-cafe-restaurant-66-broad-st-nw",
    doordash: "https://www.doordash.com/store/brickstone-atlanta-36265161/88015229/",
    ubereats: "https://www.ubereats.com/store/brickstone-cafe-broad-st-nw/zSHlUrk9WPWfJBC9UJpXHQ",
  },

  instagram: {
    handle: "@brickstone_atl",
    url: "https://www.instagram.com/brickstone_atl/",
  },

  hours: [
    { days: "Monday", time: "10:30 AM – 6 PM" },
    { days: "Tuesday", time: "10:30 AM – 6 PM" },
    { days: "Wednesday", time: "10:30 AM – 6 PM" },
    { days: "Thursday", time: "10:30 AM – 6 PM" },
    { days: "Friday", time: "10:30 AM – 3 PM" },
    { days: "Saturday", time: "10:30 AM – 3 PM" },
    { days: "Sunday", time: "Closed" },
  ],
};

// Top navigation. `href` is the id of a section below.
export const nav = [
  { label: "Menu", href: "#menu" },
  { label: "Combos", href: "#combos" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
];

// Every "Order online" button leads to the ordering section, where people
// pick Toast, DoorDash or Uber Eats.
export const orderCta = { label: "Order online", href: "#order" };

export const order = {
  title: "Order",
  options: [
    { label: "Order direct", href: site.orderLinks.toast, featured: true },
    { label: "DoorDash", href: site.orderLinks.doordash },
    { label: "Uber Eats", href: site.orderLinks.ubereats },
  ],
};

// The landing page leads with the Pizza + Pizza + Drink combo.
export const hero = {
  tag: "Combo",
  // Wrap words in *asterisks* to set them in orange.
  title: "Pizza *+* Pizza *+* Drink",
  price: "8.95",
  lead: "Any 2 generous quarter-pie slices of your choice, served with an ice-cold drink.",
  primary: { label: "Order now", href: "#order" },
  secondary: { label: "View menu", href: "#menu" },
  photo: { src: "/photos/two-slices.webp", alt: "Two quarter-pie pizza slices", ratio: "3 / 2" },
  sticker: "Subs · Pizzas · Pastas · Coffee · ",
};

export const marquee = site.tagline;

// From the Toast ordering page. A trailing "+" on a price means "from".
export const menu = {
  title: "Menu",
  categories: [
    {
      name: "Combos",
      items: [
        { name: "Pizza + Pizza + Drink", desc: "Our Crowd Pleasing Combo: Any 2 generous quarter-pie slice of your choice on our menu, served with an ice-cold drink-a satisfying meal.", price: "8.95" },
        { name: "Pizza + Pasta + Drink", price: "10.99" },
        { name: "Sandwich + Salad + Drink Combo", price: "14.45" },
      ],
    },
    {
      name: "Slices",
      items: [
        { name: "Cheese Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "3.95" },
        { name: "Pepperoni Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal pepperoni and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
        { name: "Chicken Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal chicken and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
        { name: "Veggie Lover's Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, olives, mushrooms, tomatoes, green peppers, onions and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
        { name: "Chicken Supreme Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal chicken, olives, green peppers, onions and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
        { name: "Meat Lover's Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal pepperoni, halal chicken, halal meatball and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
        { name: "Chicken Pesto Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, in-house made pesto sauce, halal chicken and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
        { name: "Chicken Alfredo Pizza Slice", desc: "A Classic Done Right: Our hand-tossed dough topped with in-house made Alfredo sauce, halal chicken and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "4.95" },
      ],
    },
    {
      name: "Pizzas",
      items: [
        { name: "Cheese Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "9.95+" },
        { name: "Pepperoni Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal pepperoni and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "9.95+" },
        { name: "Chicken Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal chicken and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "10.95+" },
        { name: "Veggie Lover's Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, olives, mushrooms, tomatoes, green peppers, onions and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "11.95+" },
        { name: "Chicken Supreme Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal chicken, olives, green peppers, onions and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "11.95+" },
        { name: "Meat Lover's Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, halal pepperoni, halal chicken, halal meatball and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "11.95+" },
        { name: "Chicken Pesto Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with rich pizza sauce, in-house made pesto sauce, halal chicken and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "11.95+" },
        { name: "Chicken Alfredo Pizza", desc: "A Classic Done Right: Our hand-tossed dough topped with in-house made Alfredo sauce, halal chicken and a generous layer of melted mozzarella, baked to a perfect golden finish.", price: "11.95+" },
      ],
    },
    {
      name: "Subs",
      note: 'Toasted subs come on 9" fresh baked bread.',
      items: [
        { name: "Turkey Melt Sub", desc: "A Melty Favorite: 9\" Fresh bread spread with mayo, layered with onions, halal turkey and mozzarella, baked until the cheese melts-finished with crisp lettuce and tomatoes.", price: "9.95" },
        { name: "Balsamic Chicken Sub", desc: "A Tangy Favorite: 9\" fresh bread spread with mayo, layered with onions, halal chicken, balsamic sauce, and mozzarella, baked until the cheese melts- finished with crisp lettuce and tomatoes.", price: "9.95" },
        { name: "Chicken Pesto Sub", desc: "A Fresh Favorite: 9\" fresh bread spread with mayo, layered with onions, halal chicken, pesto sauce, and mozzarella, baked until the cheese melts- finished with crisp lettuce and tomatoes.", price: "9.95" },
        { name: "Brickstone Club Sub", desc: "Smoked turkey, beef bacon, mayo, lettuce, tomato, onion, and deli mustard.", price: "9.95" },
        { name: "Chicken Parmesan Sub", desc: "An Italian Classic: 9\" fresh bread smothered in rich tomato basil and golden baked halal chicken on top melted blanket of mozzarella.", price: "9.95" },
        { name: "Chicken Caesar Sub", desc: "A Crisp Favorite: 9\" fresh bread spread with mayo, layered with onions, halal chicken, caesar sauce, and mozzarella, baked until the cheese melts- finished with crisp lettuce and tomatoes.", price: "9.95" },
        { name: "Roasted Vegetables Sub", desc: "A Garden Roasted Favorite: 9\" fresh bread spread with mayo, piled with roasted onions, bell peppers, olives, mushrooms, and tomatoes, topped with mozzarella and baked until the cheese melts- finished with crisp lettuce.", price: "9.95" },
        { name: "Buffalo Chicken Sub", desc: "A Spicy Favorite: 9\" fresh bread spread with mayo, layered with onions, halal chicken, buffalo sauce, mozzarella, and baked until the cheese melts- finished with crisp lettuce and tomatoes.", price: "9.95" },
        { name: "Smoke Turkey Pesto Sub", desc: "A Savory Favorite: 9\" fresh bread spread with mayo, layered with onions, smoked halal turkey, pesto sauce, mozzarella and baked until the cheese melts-finished with crisp lettuce and tomatoes.", price: "9.95" },
      ],
    },
    {
      name: "Pastas",
      note: "Oven baked.",
      items: [
        { name: "Alfredo Penne Pasta", desc: "A Classic Favorite: Penne pasta tossed in our in-house made Alfredo sauce, oven baked, then finished with parmesan cheese.", price: "8.45+" },
        { name: "Tomato Basil Penne Pasta", desc: "A House Favorite: Penne pasta tossed in our in-house tomato basil sauce, oven baked, then finished with parmesan cheese.", price: "8.45+" },
        { name: "Burgundy Penne Pasta", desc: "A Rich Favorite: Penne pasta tossed in our in-house made Alfredo and tomato basil sauces mixed together, oven baked, then topped with parmesan cheese. Add your choice of protein for an additional charge.", price: "10.50+" },
        { name: "Buffalo Penne Pasta", desc: "Penne pasta baked in our spicy buffalo Alfredo sauce. Add your choice of protein for an additional charge.", price: "10.50+" },
      ],
    },
    {
      name: "Salads",
      items: [
        { name: "Caesar Salad", desc: "A Crisp Classic: Fresh lettuce tossed in Caesar dressing, topped with parmesan cheese and crunchy croutons.", price: "9.45+" },
        { name: "Balsamic Salad", desc: "A Fresh Favorite: Fresh crisp lettuce tossed in balsamic dressing, topped with parmesan cheese and crunchy croutons.", price: "9.45+" },
        { name: "Garden Salad", desc: "A Fresh Garden Mix: Fresh crisp lettuce with olives, green peppers, tomatoes, red onions, mushrooms, topped with parmesan cheese and crunchy croutons.", price: "10.95+" },
      ],
    },
    {
      name: "Chicken",
      items: [
        { name: "Fried Chicken Sandwich & Fries", desc: "Choose your flavor (potato bun with fried chicken filet topped with red onions, lettuce, and tomato)", price: "10.95" },
        { name: "Chicken Wings", price: "9.95+" },
        { name: "Chicken Tenders", price: "5.95+" },
      ],
    },
    {
      name: "Sides",
      items: [
        { name: "Fries", price: "3.95" },
        { name: "Garlic Bread", price: "0.95" },
        { name: "Cheesy Garlic Bread", price: "1.95" },
        { name: "Mozzarella Sticks (6pcs)", price: "6.95" },
        { name: "Caesar Salad (Side Portion)", desc: "A Crisp Classic: Fresh lettuce tossed in Caesar dressing, topped with parmesan cheese and crunchy croutons.", price: "3.95" },
        { name: "Balsamic Salad (Side Portion)", desc: "A Fresh Favorite: Fresh crisp lettuce tossed in balsamic dressing, topped with parmesan cheese and crunchy croutons.", price: "3.95" },
        { name: "Chips", price: "1.75" },
      ],
    },
    {
      name: "Drinks",
      items: [
        { name: "Drinks", price: "2.69" },
        { name: "Phin Cafe", desc: "A Vietnamese Classic: Rich coffee slow-dripped through a traditional phin filter over sweet condensed milk, then stirred and poured over ice.", price: "3.95" },
        { name: "Water", price: "1.49" },
      ],
    },
  ],
};

// The three combos from the menu, each pictured with two of its parts.
export const combos = {
  title: "Combos",
  items: [
    {
      name: "Pizza + Pizza + Drink",
      desc: "Any 2 generous quarter-pie slices of your choice, served with an ice-cold drink.",
      price: "8.95",
      photos: [
        { src: "/photos/slice-pepperoni.webp", alt: "Pepperoni pizza slice" },
        { src: "/photos/slice-cheese.webp", alt: "Cheese pizza slice" },
      ],
    },
    {
      name: "Pizza + Pasta + Drink",
      price: "10.99",
      photos: [
        { src: "/photos/slice-loaded.webp", alt: "Pizza slice" },
        { src: "/photos/penne-tomato.webp", alt: "Baked penne pasta" },
      ],
    },
    {
      name: "Sandwich + Salad + Drink",
      price: "14.45",
      photos: [
        { src: "/photos/sub-tomato.webp", alt: "Toasted sub" },
        { src: "/photos/salad-caesar.webp", alt: "Caesar salad" },
      ],
    },
  ],
};

export const about = {
  title: "About",
  paragraphs: ["A few sentences about Brickstone go here."],
  photo: { src: "/photos/coffee-bar.webp", alt: "Phin coffee filters lined up on the counter" },
  photo2: { src: "/photos/iced-coffee.webp", alt: "Iced coffee" },
};

export const visit = {
  title: "Visit",
  mapLabel: "Map",
};

export const gallery = {
  title: "Instagram",
  photos: [
    { src: "/photos/pizza-pepperoni.webp", alt: "Pepperoni pizza" },
    { src: "/photos/sub-lettuce.webp", alt: "Toasted sub" },
    { src: "/photos/penne-baked.webp", alt: "Baked penne" },
    { src: "/photos/pizza-toppings.webp", alt: "Pizza" },
    { src: "/photos/iced-coffee-cup.webp", alt: "Iced coffee" },
    { src: "/photos/sub-drizzle.webp", alt: "Toasted sub" },
  ],
};
