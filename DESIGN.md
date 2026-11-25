# RADOVA LINUX — DESIGN SYSTEM (`DESIGN.md`)

**Single Source of Truth:** `radova-linux.github.io` (Homepage), `guideline-radova/` (`whitemode.pdf` & `darkmode.pdf`), dan `AGENTS.md`.  
Seluruh halaman ekosistem (`learns`, `events`, `latest`, `about`) wajib merujuk ke sistem desain ini agar tampilan, proporsi, warna, dan perilaku responsif seragam.

---

## 1. Color Tokens

### Brand & Palette (Konstan di Light & Dark Mode)
| Token | Nilai | Penggunaan |
|---|---|---|
| `--red-900` | `#A10000` | Primary accent, heading Light Mode, `.btn-navy`, badge kritis |
| `--red-700` | `#BB080B` | Hover primary, aksen sekunder |
| `--red-600` | `#DB000F` | CTA utama (`.btn-primary`), `border-top` footer, fokus & highlight |
| `--red-500` | `#FF0000` | Aksen merah terang khusus |
| `--navy-950` | `#0B0711` | Background halaman Dark Mode |
| `--navy-900` | `#0E0347` | Teks navbar/brand Light Mode, gradient atas footer Dark Mode |
| `--navy-800` | `#150B52` | Surface card & tombol Dark Mode |
| `--blue` | `#0B2E8D` (Light) / `#0035C6` (Dark) | Aksen biru status/sekunder (`whitemode.pdf` vs `darkmode.pdf`) |
| `--lavender` | `#F7F6FF` | Surface halus Light Mode (`--surface-subtle`) |
| `--white` | `#FFFFFF` | Surface utama Light Mode, teks utama Dark Mode |

### Komposisi Warna (`60% - 30% - 10%`)
- **60% Primary Background:** `#FFFFFF` / `#F7F6FF` (Light) · `#0B0711` / `#0E0347` (Dark)
- **30% Secondary Surface & Text:** `#150B52` / gradient navy-crimson / teks utama
- **10% Accent CTA:** `#DB000F` (`--red-600`) untuk tombol aksi utama & sorotan fokus

### Semantic Role Tokens
| Role Token | Light Mode | Dark Mode (`:root[data-theme="dark"]`) |
|---|---|---|
| `--surface-page` | `#FFFFFF` (atau `--lavender` `#F7F6FF` untuk halaman editorial) | `#0B0711` |
| `--surface-card` | `#FFFFFF` | `#150B52` |
| `--surface-subtle` | `#F7F6FF` | `#150B52` |
| `--surface-dock` | `#F0EFFC` | `#0E0347` |
| `--surface-header` | `rgba(255, 255, 255, 0.82)` | `rgba(11, 7, 17, 0.88)` |
| `--text-primary` | `#0E0347` / `#A10000` (sesuai konteks) | `#FFFFFF` |
| `--text-heading` | `#A10000` (hero/heading) · `#0E0347` (nav/brand) | `#FFFFFF` |
| `--text-muted` | `#5B5A78` | `#C4C0D4` |
| `--text-accent` | `#DB000F` | `#DB000F` |
| `--border-line` | `rgba(14, 3, 71, 0.10)` | `rgba(196, 192, 212, 0.18)` |
| `--border-card` | `rgba(14, 3, 71, 0.12)` | `rgba(196, 192, 212, 0.16)` |

> **Aturan Dark Mode:** Dilarang membalik nilai variabel dasar (`--navy-*`, `--red-*`, `--white`) secara global di `:root[data-theme="dark"]`. Gunakan override eksplisit per selector.

---

## 2. Typography & Fonts

- **Heading (`--font-heading`):** `"Lato", system-ui, -apple-system, sans-serif` (weight `700`, `900`)
- **Body (`--font-body`):** `"Roboto Variable", system-ui, -apple-system, sans-serif` (weight `400`–`700`)
- **Monospace (`--font-mono`):** `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
- **Loading:** Font lokal `.woff2` (`lato-latin-700.woff2`, `lato-latin-900.woff2`, `roboto-latin-wght.woff2`) di `assets/css/fonts.css` dengan `font-display: swap`, dimuat via *interaction-triggered loader* (`loader.js`). Tidak boleh ada `<link rel="preload" as="font">`.

### Type Scale (`guideline-radova` + Homepage)
- **Heading (`Lato` di produksi Homepage, scale `H1–H6`):**
  - `H1`: `56px` (`3.5rem` desktop, `clamp(1.85rem, 4.8vw, 3.25rem)` → `3.1rem` at `1280px` → `3.5rem` at `1536px`, `font-weight: 900`, `line-height: 1.05`, `letter-spacing: -0.03em`)
  - `H2`: `48px` (`3rem`) · `H3`: `40px` (`2.5rem`) · `H4`: `32px` (`2rem`) · `H5`: `24px` (`1.5rem`) · `H6`: `20px` (`1.25rem`)
- **Body (`Roboto Variable` di produksi Homepage, Regular & Bold):**
  - `Large Text`: `20px` (`1.25rem`) · `Medium Text`: `18px` (`1.125rem`) · `Normal Text`: `16px` (`1rem`, `line-height: 1.6`, `max-width: 65ch`) · `Small Text`: `14px` (`0.875rem`)
  - *(Catatan: di PDF guideline label kolom font Heading tertulis Roboto dan Body tertulis Lato, namun implementasi produksi Homepage memakai **Lato** untuk Heading dan **Roboto Variable** untuk Body.)*
- **Navbar Links:** `15px`, `font-weight: 500` (`700` saat `aria-current="page"`).
- **Brand Name:** `0.8rem`, `font-weight: 900`, `letter-spacing: 0.02em`, `uppercase`.

### Iconography
- **Phosphor Icons:** Gunakan aset SVG Phosphor lokal (inline SVG atau CSS `mask: url("assets/icons/...")`), dilarang memuat CDN eksternal (`@phosphor-icons/web`).

---

## 3. Responsive Grid & Breakpoints

Seluruh halaman memakai satu sistem container terpadu pada `.site-header`, `<main>`, dan `.site-footer`:
```css
padding-inline: max(var(--pad-x), calc((100% - var(--container-max)) / 2));
```

| Size | Breakpoint (`min-width`) | Container Max-Width (`--container-max`) | Root Font Size (`html`) |
|---|---|---|---|
| **Extra small (`xs`)** | `< 576px` (default) | `100%` (`--pad-x: 1rem`) | `100%` (`16px`) |
| **Small (`sm`)** | `>= 576px` | `510px` | `106.25%` (`17px`) |
| **Medium (`md`)** | `>= 768px` | `700px` | `112.5%` (`18px`) |
| **Large (`lg`)** | `>= 1024px` | `950px` | `118.75%` (`19px`) |
| **Extra large (`xl`)** | `>= 1280px` | `1200px` | `125%` (`20px`) |
| **Extra extra large (`xxl`)** | `>= 1536px` | `1450px` | `131.25%` (`21px`) |

---

## 4. Core Components

### Header & Navigation (`.site-header`)
- **Layout:** `position: sticky; top: 0; z-index: 100; min-height: 48px; padding-block: 0.65rem; gap: 1.25rem`.
- **Glass Surface:** `background: var(--surface-header); backdrop-filter: blur(16px) saturate(180%); border-bottom: 1px solid var(--border-line)`.
- **Light Mode Ink:** `.brand-name` dan `.nav-list a` memakai `#0E0347` (`--navy-900`); `.dropdown-content a` memakai `#0E0347` (WCAG AA >= 4.5:1).
- **About Dropdown:** Pemicu `<button type="button" id="about-menu-btn" class="btn-navy">` (`border-radius: 16px`, `font-size: 13px`). Panel `.dropdown-content` (`top: calc(100% + 18px)`, `min-width: 250px`, `border-radius: 16px`) **tanpa** `role="menu"` / `role="menuitem"`.
- **Theme & Lang Controls:**
  - `button.btn-theme`: `36px x 36px` bulat (`border-radius: 999px`), SVG matahari/bulan langsung (tanpa HTMX swap).
  - `button.btn-lang`: `border-radius: 16px`, `font-size: 13px`, label `EN` / `ID`.
- **Mobile Drawer (`max-width: 767px`):** `.nav-toggle` (`38px x 38px`, `aria-label="Open navigation menu"`) membuka `.header-menu.is-open` full-height (`top: 58px; height: calc(100dvh - 58px)`).

### Buttons & Chips
- **Primary CTA (`.btn` / `.button`):** `height: 48px`, `padding: 0 1.5rem`, `border-radius: 9999px`, `background: var(--red-600)`, `color: #FFFFFF`, `box-shadow: 0 4px 16px rgba(219, 0, 15, 0.24)`.
- **Hero Chip (`.hero-chip` / `.chip`):** `border-radius: 999px`, `padding: 0.35rem 0.9rem`, `font-size: 13px`, `border: 1px solid rgba(219, 0, 15, 0.25)`, `background: rgba(219, 0, 15, 0.04)`.

### Cards, Hero Media Placeholder & Panels
- **Hero Media Placeholder (`.hero-media`):**
  - Gunakan kontainer placeholder `<div class="hero-media" data-img="..." data-alt="...">` lengkap dengan `<noscript><img ...></noscript>` untuk menjaga `CLS = 0`.
  - Kunci rasio wadah sesuai proporsi aset gambar/gedung (`aspect-ratio: 16 / 9` atau `aspect-ratio: 4 / 3` — developer tinggal menyesuaikan rasio sesuai kebutuhan), dengan `overflow: hidden; border-radius: 20px;` serta `.hero-media img { display: block; width: 100%; height: 100%; object-fit: cover; }`.
- **Surface:** `background: var(--surface-card)`, `border: 1px solid var(--border-card)`, `border-radius: 16px`–`20px`.
- **Dark Mode Hero Wash:**
  `radial-gradient(46% 52% at 82% 18%, rgba(219, 0, 15, 0.16), transparent 72%), radial-gradient(38% 46% at 15% 32%, rgba(21, 11, 82, 0.45), transparent 72%), var(--surface-page)`.

### Footer (`.site-footer`)
- **Light Mode:** `background: #6D0000; border-top: 3px solid var(--red-600); color: rgba(255, 255, 255, 0.92)`.
- **Dark Mode:** `background: linear-gradient(180deg, var(--navy-900) 0%, var(--navy-950) 100%); border-top-color: var(--red-600)`.
- **Grid:** 1 kolom (`<576px`) → 2 kolom (`>=576px`) → 4 kolom (`>=1024px`). Heading kolom wajib `<h2 class="footer-heading">`.
- **Back to top (`.footer-top`):** Pill `#FFFFFF`, `font-size: 12.5px`, `border: 1px solid rgba(255, 255, 255, 0.2)`–`0.45`, `border-radius: 999px`.
- **Logo Footer:** `<img src="...logo.png" alt="Radova Logo" width="28" height="28" loading="lazy" decoding="async">`.

---

## 5. Architecture, Motion & Performance Standards

1. **CSS Delivery:** Inline critical `<style>` (termasuk `button.btn-theme` dan `:root[data-theme="dark"] .site-header` untuk `CLS = 0` & bebas FOUC) + `<page>-below.css` non-blocking (`media="print" onload="this.media='all'"` + fallback `<noscript>`).
2. **Cascade Order:** `tokens → base → layout → components → page → atomic` (`atomic.css` 1 class = 1 properti, nol class tak terpakai).
3. **Motion:** Hanya transisi `transform` dan `opacity`. Dilarang `transition: all`, dan dilarang animasi `opacity: 0` / `filter: blur(...)` pada elemen LCP.
4. **JavaScript:** Pure Vanilla JS di-bundle ke `assets/js/<page>.bundle.js` dan dimuat oleh `assets/js/loader.js` pada interaksi pertama (atau langsung jika `radova-theme="dark"` / `radova-lang="id"`).
