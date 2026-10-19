// A photo slot. With no `src` it renders a labelled placeholder tile on the
// brick texture; give it a `src` (in content.js) and it becomes the real
// image, which fades in once it has loaded instead of popping in.
//
//   photo({ label: "Hero shot", ratio: "4 / 5", tone: "navy" })
//   photo({ src: "/photos/sub.jpg", alt: "Italian sub", ratio: "4 / 5" })
//
// tone: "navy" | "deep" | "orange" | "cream" — which brick texture to use.

export function photo({ label = "Photo", src, alt = "", ratio = "4 / 3", tone = "deep", className = "", eager = false }) {
  const style = `style="--ratio:${ratio}"`;
  if (src) {
    const loading = eager ? "eager" : "lazy";
    return `
      <figure class="photo photo--img ${className}" ${style}>
        <img src="${src}" alt="${alt}" loading="${loading}" decoding="async" />
      </figure>`;
  }
  return `
    <figure class="photo photo--${tone} ${className}" ${style} role="img" aria-label="Photo placeholder: ${label}">
      <figcaption class="photo__tag">
        ${cameraIcon()}
        <span>${label}</span>
      </figcaption>
    </figure>`;
}

function cameraIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.4-2h6.2l1.4 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
}

// Images fade in once loaded. One listener for the whole page (load events
// don't bubble, so it listens in the capture phase).
export function initPhotos() {
  const mark = (img) => img.closest(".photo")?.classList.add("is-loaded");
  document.addEventListener("load", (e) => e.target.tagName === "IMG" && mark(e.target), true);
  document.querySelectorAll(".photo img").forEach((img) => img.complete && img.naturalWidth && mark(img));
}
