# KlinikSehat — Multi-Page Clinic Template

![Version](https://img.shields.io/badge/version-1.0.0-0D9488)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-333)

> **Klinik kesehatan multi-page website template** — Professional, modern, bilingual (Bahasa Indonesia & English), with dark/light theme support.

**By: Lazy Tycoon — Mican84 & Ninja**

---

## ✨ Features

- 🏥 **6 Pages** — Home, About, Services, Doctors, Contact, Appointment
- 🌙 **Dark/Light Theme** — Auto‑detects OS preference, saved to localStorage
- 🌐 **Bilingual** — Indonesian (primary) & English, instant toggle
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- 🎯 **Active Page Detection** — Navbar highlights current page automatically
- 📅 **Appointment Form** — Service/doctor selection with WhatsApp redirect
- 📩 **Contact Form** — With toast notification system
- 🚨 **Emergency Card** — 24‑hour emergency number with pulse animation
- ⏰ **Operating Hours** — Weekday/Saturday/Sunday schedule display
- 🎠 **Testimonial Carousel** — Touch swipe, auto‑play, and dot navigation
- ✨ **Scroll Reveal Animations** — Fade, slide, and scale-in effects
- 💬 **WhatsApp Float** — Sticky WA button on every page
- 🔝 **Back to Top** — Appears after scrolling 400px
- 🏗️ **Zero Dependencies** — Pure HTML, CSS, and JavaScript

---

## 📁 Project Structure

```
clinic_template/
├── index.html          ← Home page
├── about.html          ← About Us page
├── services.html       ← Services page
├── doctors.html        ← Doctors page
├── contact.html        ← Contact page
├── appointment.html    ← Appointment booking
├── css/
│   ├── style.css       ← Main design system (~900 lines)
│   └── animations.css  ← Scroll reveal & transitions
├── js/
│   ├── lang.js         ← Bilingual dictionary (160+ keys)
│   └── main.js         ← Shared interactivity logic
├── README.md
├── DOCUMENTATION.md
└── LICENSE
```

---

## 🚀 Quick Start

1. Clone or download the repository
2. Open `index.html` in a browser
3. No build step or dependencies needed

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary (Teal) | `#0D9488` |
| Accent (Cyan) | `#06B6D4` |
| Coral | `#F97066` |
| Heading Font | Manrope |
| Body Font | Inter |
| Border Radius | 8px / 12px / 16px / 20px |

---

## 📄 Pages Overview

| Page | Key Sections |
|------|-------------|
| **Home** | Hero with stats, 6 services, stats bar, 3 doctors, testimonials, CTA |
| **About** | Story, vision/mission, timeline, stats |
| **Services** | 8 detailed services with schedules |
| **Doctors** | 6 doctor profiles with specializations |
| **Contact** | Info cards, emergency, hours, contact form |
| **Appointment** | Booking form → WhatsApp, BPJS/insurance info |

---

## 🛠 Customization

### Colors
Edit CSS variables in `css/style.css` under `:root` and `[data-theme="dark"]`.

### Translations
Edit translation keys in `js/lang.js`. Add a new language by adding a third property to the `translations` object.

### WhatsApp & Contact
Search for `6282112345678` in HTML files and replace with the actual number.

---

## 📋 License

MIT License — see [LICENSE](LICENSE) for details.
