// Small building blocks shared by every section. Each returns an HTML
// string; sections are just these stitched together with their content.

// "Built from scratch, *brick by brick.*" → the starred part in orange.
export function emphasize(text) {
  return text.replace(/\*(.+?)\*/g, '<em class="accent">$1</em>');
}

export function eyebrow(text, { tone = "" } = {}) {
  return `<p class="eyebrow ${tone}">${text}</p>`;
}

// The standard section heading: one plain title, revealed on scroll.
export function sectionHeader({ title }) {
  return `
    <header class="section-head">
      <h2 class="h2" data-reveal>${emphasize(title)}</h2>
    </header>`;
}

// variant: "primary" (orange) | "ghost" (outlined). Full https:// links open
// in a new tab.
export function button({ label, href, variant = "primary", external = /^https?:\/\//.test(href) }) {
  const target = external ? ' target="_blank" rel="noopener"' : "";
  return `<a class="btn btn--${variant}" href="${href}"${target}><span>${label}</span>${arrow()}</a>`;
}

export function arrow() {
  return `<svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

// "(678) 300-2621" -> "tel:+16783002621"
export function telHref(phone) {
  return `tel:+1${phone.replace(/\D/g, "")}`;
}

export function price(value) {
  return `<span class="price"><span class="price__sign">$</span>${value}</span>`;
}
