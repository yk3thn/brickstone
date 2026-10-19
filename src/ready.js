// Resolves once everything the first screen needs is actually in hand — the
// brand font in each weight the page uses, and every eagerly-loaded image
// decoded — so the intro and the reveal never show something still
// arriving. Capped, so one slow image can't hold the door shut.
export function whenReady({ timeout = 3500 } = {}) {
  const family = '"Bricolage Grotesque Variable"';
  const fonts = Promise.all(
    ["400", "600", "800"].map((w) => document.fonts.load(`${w} 1em ${family}`)),
  ).then(() => document.fonts.ready);

  // Lazy images below the fold load as you scroll (and fade in when they
  // do — see photo.js); waiting on them here would just hit the cap.
  const images = [...document.images]
    .filter((img) => img.loading !== "lazy")
    .map((img) => img.decode().catch(() => {}));

  const cap = new Promise((resolve) => setTimeout(resolve, timeout));
  return Promise.race([Promise.all([fonts, ...images]), cap]);
}
