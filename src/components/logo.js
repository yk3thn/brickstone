// The Brickstone wordmark, traced from the client's logo by
// tools/trace_logo.py. One <path> per letter (data-letter="B" … "E", with
// "O" being the sandwich), all filled with currentColor — so the mark takes
// the colour of whatever it sits in.
import markSvg from "../assets/logo/brickstone-mark.svg?raw";

// The sandwich's own box inside the mark's viewBox (from the trace output),
// so it can be used alone as an icon.
const SANDWICH_BOX = "338 302 348 177";

const sandwichPath = markSvg.match(/<path data-letter="O"[^>]*\/>/)[0];

// `decorative` copies (the intro, the footer's big mark) are hidden from
// screen readers; the nav copy is the one that announces the name.
export function logoMark({ className = "", decorative = false } = {}) {
  const a11y = decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="Brickstone"';
  return markSvg
    .replace(/ role="img" aria-label="Brickstone"/, "")
    .replace("<svg", `<svg class="${className}" ${a11y}`);
}

export function sandwichIcon({ className = "" } = {}) {
  return `<svg class="${className}" viewBox="${SANDWICH_BOX}" fill="currentColor" aria-hidden="true" focusable="false">${sandwichPath}</svg>`;
}
