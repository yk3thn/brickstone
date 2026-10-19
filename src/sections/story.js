import { story } from "../content.js";
import { sectionHeader } from "../components/ui.js";
import { photo } from "../components/photo.js";

export default {
  render: () => `
    <section class="section section--light story" id="story">
      <div class="container story__grid">
        <div class="story__media">
          <div class="story__main" data-reveal style="--i:0">${photo({ ...story.photo, ratio: "4 / 5", tone: "cream" })}</div>
          <div class="story__inset" data-reveal style="--i:2">${photo({ ...story.photo2, ratio: "1 / 1", tone: "orange" })}</div>
        </div>
        <div class="story__copy">
          ${sectionHeader(story)}
          ${story.paragraphs.map((p, i) => `<p class="story__p" data-reveal style="--i:${i + 3}">${p}</p>`).join("")}
          <dl class="stats">
            ${story.stats
              .map(
                (s, i) => `
              <div class="stat" data-reveal style="--i:${i + 4}">
                <dt>${s.label}</dt>
                <dd>${s.value}</dd>
              </div>`,
              )
              .join("")}
          </dl>
        </div>
      </div>
    </section>`,
};
