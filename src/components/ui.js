// Small building blocks shared by every section. Each returns an HTML
// string; sections are just these stitched together with their content.

// "Built from scratch, *brick by brick.*" → the starred part in orange.
export function emphasize(text) {
  return text.replace(/\*(.+?)\*/g, '<em class="accent">$1</em>');
}

export function eyebrow(text, { tone = "" } = {}) {
  return `<p class="eyebrow ${tone}">${text}</p>`;
}

// The standard section heading: eyebrow, title, optional lead line.
// `reveal` staggers the three in as the section scrolls into view.
export function sectionHeader({ eyebrow: eb, title, lead, align = "left" }) {
  return `
    <header class="section-head section-head--${align}">
      ${eb ? `<p class="eyebrow" data-reveal style="--i:0">${eb}</p>` : ""}
      <h2 class="h2" data-reveal style="--i:1">${emphasize(title)}</h2>
      ${lead ? `<p class="lead" data-reveal style="--i:2">${lead}</p>` : ""}
    </header>`;
}

// variant: "primary" (orange) | "ghost" (outlined) | "light" (cream)
export function button({ label, href, variant = "primary", external = false }) {
  const target = external ? ' target="_blank" rel="noopener"' : "";
  return `<a class="btn btn--${variant}" href="${href}"${target}><span>${label}</span>${arrow()}</a>`;
}

export function arrow() {
  return `<svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

export function price(value) {
  return `<span class="price"><span class="price__sign">$</span>${value}</span>`;
}
