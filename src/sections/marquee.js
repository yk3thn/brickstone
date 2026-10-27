import { marquee } from "../content.js";

// The orange band of words that scrolls under the hero. The track holds two
// identical halves and slides left by exactly one half, so the loop wraps
// seamlessly. Each half repeats the words until it is wider than any screen
// (four words are only ~700px — shorter than a desktop window, which left a
// gap); the duration grows with the word count so the speed stays the same.
const REPEAT = 6;
const SECONDS_PER_WORD = 5.5;

export default {
  render: () => {
    const run = marquee.map((w) => `<span>${w}</span><span class="marquee__dot" aria-hidden="true">✦</span>`).join("");
    const half = run.repeat(REPEAT);
    const duration = marquee.length * REPEAT * SECONDS_PER_WORD;
    return `
      <div class="marquee" aria-label="${marquee.join(", ")}">
        <div class="marquee__track" aria-hidden="true" style="--marquee-duration:${duration}s">${half}${half}</div>
      </div>`;
  },
};
