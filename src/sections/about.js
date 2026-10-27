import { about } from "../content.js";
import { sectionHeader } from "../components/ui.js";
import { photo } from "../components/photo.js";

export default {
  render: () => `
    <section class="section section--dark about" id="about">
      <div class="container about__grid">
        <div class="about__media">
          <div class="about__main" data-reveal style="--i:0">${photo({ ...about.photo, ratio: "4 / 5", tone: "cream" })}</div>
          <div class="about__inset" data-reveal style="--i:2">${photo({ ...about.photo2, ratio: "1 / 1", tone: "orange" })}</div>
        </div>
        <div class="about__copy">
          ${sectionHeader(about)}
          ${about.paragraphs.map((p, i) => `<p class="about__p" data-reveal style="--i:${i + 1}">${p}</p>`).join("")}
        </div>
      </div>
    </section>`,
};
