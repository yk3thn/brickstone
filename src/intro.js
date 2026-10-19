import gsap from "gsap";
import { site } from "./content.js";
import { logoMark } from "./components/logo.js";
import { courseTile, brickUnit, token } from "./components/brick.js";

// Every beat of the opening, in seconds. Tune the pacing here — nothing else
// hard-codes a duration.
export const INTRO_TIMING = {
  settle: 0.35,       // 0. the bare brick wall fades up — the logo's own background
  lay: 0.55,          // 1. each letter drops onto the wall like a brick being laid…
  layStagger: 0.075,  //    …one after another: B R I C K, then S T N E
  sandwich: 0.7,      // 2. the sandwich lands last, in the gap where the O goes
  tagline: 0.5,       // 3. SUBS | PIZZAS | PASTAS | COFFEE comes up underneath
  hold: 0.5,          // 4. the full logo, exactly as it looks on the sign
  part: 1.05,         // 5. the wall's courses slide away, alternating left and right…
  partStagger: 0.035, //    …starting from the middle course and working out
  fly: 1.0,           // 6. meanwhile the wordmark shrinks into its place in the nav
  skip: 0.45,         // a click or keypress fast-forwards whatever is left into this many seconds
};

const LAY_ORDER = ["B", "R", "I", "C", "K", "S", "T", "N", "E"];
// The logo artwork's course height relative to its wordmark width
// (133px courses under a 1050px-wide wordmark), so the wall behind the
// intro is the logo's own wall at the logo's own scale.
const COURSE_PER_MARK = 133 / 1050;
const MIN_COURSE = 40;

export function introMarkup() {
  if (!introEnabled()) return "";
  return `
    <div id="intro" aria-hidden="true">
      <div class="intro__wall"></div>
      <div class="intro__stage">
        <div class="intro__mark">${logoMark({ decorative: true })}</div>
        <p class="intro__tagline">${site.tagline.join("<span>|</span>")}</p>
      </div>
    </div>`;
}

// `?intro=0` skips the opening — handy while working on the page.
function introEnabled() {
  return new URLSearchParams(location.search).get("intro") !== "0";
}

// Plays the opening, then hands the page over.
//   ready    — a promise for "everything is loaded"; nothing moves before it
//   onReveal — called as the wall comes down, to bring the page content in
export function runIntro({ ready, onReveal }) {
  const intro = document.querySelector("#intro");
  const nav = document.querySelector("[data-nav]");

  if (!intro) {
    nav.classList.add("is-ready", "has-logo");
    ready.then(onReveal);
    return Promise.resolve();
  }

  const root = document.documentElement;
  root.classList.add("is-intro");
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  // A click or key before the page has even finished loading still counts:
  // the opening then plays straight through at skip speed once it starts.
  let tl = null;
  let skipped = false;
  const skip = () => {
    if (skipped) return;
    skipped = true;
    if (tl) fastForward(tl);
  };
  window.addEventListener("pointerdown", skip);
  window.addEventListener("keydown", skip);

  return new Promise((resolve) => {
    // Nothing is measured or moved until the font and first-screen images
    // are in — and the window has its real size.
    ready.then(() =>
      requestAnimationFrame(() => {
        tl = buildTimeline(intro, nav, onReveal, () => {
          window.removeEventListener("pointerdown", skip);
          window.removeEventListener("keydown", skip);
          root.classList.remove("is-intro");
          if (location.hash) document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
          resolve();
        });
        if (skipped) fastForward(tl);
        if (import.meta.env.DEV) window.__intro = tl; // seek it from the console while tuning
        tl.play();
      }),
    );
  });
}

// Skipping fast-forwards rather than cutting: whatever is left plays out in
// INTRO_TIMING.skip seconds, so every element still finishes exactly where it
// would have — the wordmark lands in the nav, the wall clears, nothing pops.
function fastForward(tl) {
  const left = tl.duration() - tl.time();
  const speed = Math.max(1, left / INTRO_TIMING.skip);
  gsap.to(tl, { timeScale: speed, duration: 0.12, ease: "power1.in" });
}

function buildTimeline(intro, nav, onRevealOnce, onDone) {
  const T = INTRO_TIMING;
  // Called on cue as the wall opens, and again at the end as a backstop
  // (seeking past a cue skips it) — but only ever runs once.
  let revealed = false;
  const onReveal = () => !revealed && (revealed = true) && onRevealOnce();
  const mark = intro.querySelector(".intro__mark");
  const tagline = intro.querySelector(".intro__tagline");
  const letter = (L) => mark.querySelector(`[data-letter="${L}"]`);
  const wall = buildWall(intro.querySelector(".intro__wall"), mark);
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

  // 0 — the wall
  tl.to(wall.courses, { opacity: 1, duration: T.settle, ease: "power1.out" }, 0);

  // 1 — the letters are laid, each dropping in with a little settle
  tl.addLabel("lay", T.settle * 0.6);
  LAY_ORDER.forEach((L, i) => {
    const at = `lay+=${i * T.layStagger}`;
    tl.fromTo(
      letter(L),
      { y: -150, rotation: i % 2 ? 4 : -4, transformOrigin: "50% 100%" },
      { y: 0, rotation: 0, duration: T.lay, ease: "back.out(1.6)" },
      at,
    ).to(letter(L), { opacity: 1, duration: T.lay * 0.35, ease: "none" }, at);
  });

  // 2 — the sandwich, last and with the most bounce
  tl.fromTo(
    letter("O"),
    { scale: 0.35, rotation: -16, opacity: 0, transformOrigin: "50% 50%" },
    { scale: 1, rotation: 0, opacity: 1, duration: T.sandwich, ease: "back.out(2.2)" },
    `lay+=${LAY_ORDER.length * T.layStagger + T.lay * 0.35}`,
  );

  // 3 — the tagline
  tl.fromTo(
    tagline,
    { opacity: 0, y: 14, letterSpacing: "0.3em" },
    { opacity: 1, y: 0, letterSpacing: "0.06em", duration: T.tagline, ease: "power3.out" },
    "-=0.3",
  );

  // 4 — hold on the finished logo
  tl.addLabel("part", `+=${T.hold}`);

  // 5 — the wall comes down. The intro's solid backing goes first; the
  // courses are opaque and cover everything, so nothing changes on screen
  // until they actually move — what you see from here is purely the page
  // showing through where a course has slid out of the way.
  tl.call(() => wall.freeze(), null, "part");
  tl.set(intro, { backgroundColor: "transparent" }, "part");
  tl.to(
    wall.courses,
    {
      xPercent: (i) => (i % 2 ? 104 : -104),
      duration: T.part,
      ease: "power3.inOut",
      stagger: (i) => wall.distanceFromCentre(i) * T.partStagger,
    },
    "part",
  );
  tl.to(tagline, { opacity: 0, y: -10, duration: 0.3, ease: "power2.in" }, "part");

  // 6 — the wordmark flies to the nav. The target is measured when this
  // tween starts, so it is wherever the nav logo really is at that moment.
  const navMark = nav.querySelector(".nav__mark");
  let target;
  const flip = () => {
    const from = mark.getBoundingClientRect();
    const to = navMark.getBoundingClientRect();
    target = {
      x: to.left + to.width / 2 - (from.left + from.width / 2),
      y: to.top + to.height / 2 - (from.top + from.height / 2),
      scale: to.width / from.width,
    };
    return target.x;
  };
  tl.to(
    mark,
    { x: flip, y: () => target.y, scale: () => target.scale, duration: T.fly, ease: "power3.inOut" },
    "part+=0.05",
  );
  // The dark outline is the logo-on-the-wall look; the nav copy has none.
  tl.to(mark.querySelectorAll("path"), { strokeWidth: 0, duration: T.fly * 0.8, ease: "power2.in" }, "part+=0.05");

  // The page content starts coming in as the wall opens.
  tl.call(onReveal, null, `part+=${T.part * 0.3}`);
  tl.call(() => nav.classList.add("is-ready"), null, `part+=${T.part * 0.45}`);

  tl.eventCallback("onComplete", () => {
    // The intro's wordmark is sitting exactly on the nav's own copy now, so
    // swapping one for the other is invisible.
    nav.classList.add("is-ready", "has-logo");
    onReveal();
    wall.destroy();
    intro.remove();
    onDone();
  });
  return tl;
}

// Lays the wall out as horizontal courses, each its own strip so they can
// slide apart. Sized off the wordmark exactly as in the logo artwork, with
// the middle course centred on the screen so the wall sits symmetrically.
// Re-lays itself on resize until the wall starts to come down.
function buildWall(el, mark) {
  // Enough courses for the whole screen, not just the current window, so a
  // resize mid-intro can't open a gap.
  const tallest = Math.max(window.innerHeight, window.screen.height || 0, 900);
  const rows = 2 * Math.ceil(tallest / 2 / MIN_COURSE) + 1;
  const mid = (rows - 1) / 2;
  const courses = Array.from({ length: rows }, () => {
    const c = document.createElement("div");
    c.className = "intro__course";
    return c;
  });
  el.append(...courses);

  let H = MIN_COURSE;
  const layout = () => {
    H = Math.max(MIN_COURSE, Math.round(mark.getBoundingClientRect().width * COURSE_PER_MARK));
    const unit = brickUnit(H);
    const tile = courseTile(H, { brick: token("--navy"), mortar: token("--navy-deep") });
    const top = window.innerHeight / 2 - H / 2 - mid * H;
    // Pattern phase chosen so a brick, not a mortar joint, sits at the centre.
    const phase = window.innerWidth / 2 - unit * 0.33;
    courses.forEach((c, r) => {
      c.style.top = `${top + r * H}px`;
      c.style.height = `${H + 1}px`; // 1px overlap: no hairline between courses
      c.style.backgroundImage = tile.image;
      c.style.backgroundSize = `${tile.width}px ${tile.height}px`;
      c.style.backgroundPosition = `${phase + (r % 2 ? unit / 2 : 0)}px 0`;
    });
  };
  layout();
  window.addEventListener("resize", layout);

  // How many courses from the middle one, capped at the edge of the screen:
  // off-screen courses leave with the outermost visible ones instead of
  // adding dead time to the end of the opening.
  const visibleHalf = () => Math.ceil(window.innerHeight / 2 / H);
  const distanceFromCentre = (i) => Math.min(Math.abs(i - mid), visibleHalf());

  return {
    courses,
    distanceFromCentre,
    freeze: () => window.removeEventListener("resize", layout),
    destroy: () => window.removeEventListener("resize", layout),
  };
}
