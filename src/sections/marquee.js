import { marquee } from "../content.js";

// The orange band of words that scrolls under the hero. The list is
// written out twice so the loop can wrap seamlessly at the halfway point.
export default {
  render: () => {
    const run = marquee.map((w) => `<span>${w}</span><span class="marquee__dot" aria-hidden="true">✦</span>`).join("");
    return `
      <div class="marquee" aria-label="${marquee.join(", ")}">
        <div class="marquee__track" aria-hidden="true">${run}${run}</div>
      </div>`;
  },
};
