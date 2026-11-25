(function () {
  "use strict";

  let loaded = false;
  // Each page names its bundle: <script src="/assets/js/loader.js" data-bundle="info" defer>.
  const me = document.currentScript;
  const bundle = me.dataset.bundle || "mans";
  const url = function (path) { return new URL(path, me.src).href; }; // relative to this file, so a sub-folder host works
  let pending = null; // a button clicked before the bundle arrived; clicked again once it has

  function remember(e) {
    const t = e.target.closest && e.target.closest("#theme-toggle, #lang-toggle, #nav-toggle");
    if (t) pending = t;
  }

  function loadBundle() {
    if (loaded) return;
    loaded = true;
    // Webfonts (Lato, Roboto) arrive with the first interaction; until then the system font shows.
    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = url("../css/fonts.css");
    document.head.appendChild(fonts);
    const script = document.createElement("script");
    script.src = url(bundle + ".bundle.js");
    script.defer = true;
    script.onload = function () {
      document.removeEventListener("click", remember, true);
      if (pending) pending.click();
    };
    document.body.appendChild(script);
  }

  document.addEventListener("click", remember, true);

  let savedTheme = null;
  let savedLang = null;
  try {
    savedTheme = localStorage.getItem("radova-theme");
    savedLang = localStorage.getItem("radova-lang");
  } catch (_) {}

  if (savedTheme === "dark" || savedLang === "id") {
    loadBundle();
  } else {
    ["pointerdown", "keydown", "touchstart", "focusin"].forEach(function (evt) {
      window.addEventListener(evt, loadBundle, { once: true, passive: true });
    });
    window.addEventListener("load", function () {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadBundle, { timeout: 2500 });
      } else {
        setTimeout(loadBundle, 1200);
      }
    }, { once: true });
  }
})();
