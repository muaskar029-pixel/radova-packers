(function () {
  "use strict";

  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const langBtn = document.getElementById("lang-toggle");
  const navToggle = document.getElementById("nav-toggle");
  const headerMenu = document.getElementById("header-menu");
  const backToTopBtn = document.getElementById("back-to-top");

  /* 1. Theme Toggle */
  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  if (themeBtn) {
    const isDark = root.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "dark" : "light");

    themeBtn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("radova-theme", next);
      } catch (_) {}
    });
  }

  /* 2. Language Toggle (EN / ID) */
  const i18n = {
    "en": {
      "title": "Page not found",
      "desc": "This page does not exist or has moved. Pick a section above, or go back to the start.",
      "back": "Back to home",
      "backToTop": "Back to top"
    },
    "id": {
      "title": "Halaman tidak ditemukan",
      "desc": "Halaman ini tidak ada atau sudah dipindahkan. Pilih salah satu bagian di atas, atau kembali ke awal.",
      "back": "Kembali ke beranda",
      "backToTop": "Kembali ke atas"
    }
  };

  function applyLang(lang) {
    const dict = i18n[lang] || i18n.en;
    root.setAttribute("lang", lang);
    if (langBtn) {
      langBtn.textContent = lang.toUpperCase();
      langBtn.setAttribute(
        "aria-label",
        lang === "id" ? "Ganti bahasa ke Inggris" : "Switch language to Indonesian"
      );
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
  }

  if (langBtn) {
    let savedLang = "en";
    try {
      savedLang = localStorage.getItem("radova-lang") || "en";
    } catch (_) {}
    applyLang(savedLang);

    langBtn.addEventListener("click", function () {
      const current = root.getAttribute("lang") === "id" ? "id" : "en";
      const next = current === "en" ? "id" : "en";
      applyLang(next);
      try {
        localStorage.setItem("radova-lang", next);
      } catch (_) {}
    });
  }

  /* 3. Mobile Drawer */
  if (navToggle && headerMenu) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      headerMenu.classList.toggle("is-open", !expanded);
    });
  }

  /* 4. Back to Top */
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
