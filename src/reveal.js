// Content is revealed, never popped in. Anything with a data-reveal
// attribute starts hidden (see base.css) and eases up into place:
//
//   data-reveal          when it scrolls into view
//   data-reveal="intro"  when the intro's wall comes down (the hero)
//
// A style="--i:N" on each item staggers items that arrive together.

export function revealIntroItems() {
  document.querySelectorAll('[data-reveal="intro"]').forEach((el) => el.classList.add("is-in"));
}

export function initScrollReveals() {
  const items = document.querySelectorAll('[data-reveal]:not([data-reveal="intro"])');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  items.forEach((el) => io.observe(el));
}
