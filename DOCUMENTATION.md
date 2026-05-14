# KlinikSehat — Technical Documentation

## Architecture

Multi-page static website with shared CSS and JavaScript. Each HTML file references the same `css/style.css`, `css/animations.css`, `js/lang.js`, and `js/main.js` files to ensure consistent appearance and behavior.

---

## Design Tokens (CSS Variables)

All design tokens are defined in `css/style.css` under `:root` for light theme and `[data-theme="dark"]` for dark theme.

| Category | Variables |
|----------|-----------|
| **Colors** | `--color-accent`, `--color-coral`, `--color-bg-*`, `--color-text-*`, `--color-border-*` |
| **Typography** | `--font-heading` (Manrope), `--font-body` (Inter), `--fs-xs` through `--fs-5xl` |
| **Spacing** | `--space-xs` through `--space-4xl` |
| **Border Radius** | `--radius-sm` through `--radius-full` |
| **Shadows** | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| **Z-Index** | `--z-header` (100), `--z-overlay` (500), `--z-modal` (1000) |

---

## Features

### Theme Toggle
- Toggle between light and dark mode via the 🌙/☀️ button
- Preference saved in `localStorage` as `clinic-theme`
- Falls back to OS `prefers-color-scheme`
- CSS uses `[data-theme="dark"]` selector

### Language Toggle
- Toggle between Indonesian (🇮🇩) and English (🇬🇧)
- Dictionary in `js/lang.js` — object with `id` and `en` keys
- Elements use `data-lang-key` attribute to bind to translation keys
- Input/textarea get their `placeholder` updated; others get `textContent`
- Preference saved in `localStorage` as `clinic-lang`

### Active Page Detection
- The JavaScript reads `window.location.pathname` and adds `.active` class to matching nav links
- Each page also has hardcoded `.active` classes on the appropriate links

### Scroll Reveal
- Elements with `.reveal`, `.reveal-left`, `.reveal-right`, or `.reveal-scale` classes
- Uses `IntersectionObserver` with 10% threshold and `-40px` root margin
- Stagger delays via `.stagger-1` through `.stagger-8` classes
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`

### Testimonial Carousel
- Track-based slider with CSS `translateX`
- Dot navigation and prev/next buttons
- Touch swipe support (50px threshold)
- Auto-advances every 5 seconds

### Appointment Form
- Validates required fields (name, phone, service, date)
- Builds formatted WhatsApp message and opens `wa.me` link
- Toast notification confirms submission

### Contact Form
- Validates name and email
- Shows toast notification on success

### Toast Notifications
- Dynamically created DOM elements
- Slide-in from right with opacity transition
- Auto-dismiss after 3.5 seconds
- Success (green) and warning (amber) variants

---

## Responsive Breakpoints

| Breakpoint | Target |
|-----------|--------|
| ≤ 1024px | Tablet: hamburger menu, 2-column grids |
| ≤ 768px | Mobile: 1-column grids, smaller typography |
| ≤ 480px | Small mobile: stacked buttons, single-column stats |

---

## Data Attributes

| Attribute | Purpose |
|-----------|---------|
| `data-theme` | On `<html>` — `"light"` or `"dark"` |
| `data-lang-key` | Translation key binding |
| `data-index` | Carousel dot index |

---

## Changelog

### v1.0.0 (2026‑02‑13)
- Initial release with 6 pages, bilingual support, dark/light theme, fully responsive
