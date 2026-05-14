/* ============================================
   CLINIC TEMPLATE — SHARED JAVASCRIPT
   Multi-Page: Navbar, Theme, Language, Scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initBackToTop();

    // Page-specific init
    if (document.querySelector('.testimonial-carousel')) initTestimonialCarousel();
    if (document.querySelector('#appointment-form')) initAppointmentForm();
    if (document.querySelector('#contact-form')) initContactForm();
});

/* ============================================
   THEME TOGGLE
   ============================================ */
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const saved = localStorage.getItem('clinic-theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }
    updateThemeIcon();

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('clinic-theme', next);
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    if (!icon) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.textContent = isDark ? '☀️' : '🌙';
}

/* ============================================
   LANGUAGE SWITCH
   ============================================ */
function initLanguage() {
    const toggle = document.getElementById('lang-toggle');
    const saved = localStorage.getItem('clinic-lang') || 'id';
    applyLanguage(saved);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = localStorage.getItem('clinic-lang') || 'id';
            const next = current === 'id' ? 'en' : 'id';
            localStorage.setItem('clinic-lang', next);
            applyLanguage(next);
        });
    }
}

function applyLanguage(lang) {
    if (typeof translations === 'undefined') return;
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (!dict[key]) return;

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
        } else if (el.tagName === 'OPTION') {
            el.textContent = dict[key];
        } else {
            el.textContent = dict[key];
        }
    });

    // Update toggle button
    const label = document.querySelector('.lang-label');
    if (label) label.textContent = lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';

    document.documentElement.setAttribute('lang', lang);
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Detect active page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const isActive = (href === currentPage) ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html');
        if (isActive) link.classList.add('active');
    });

    // Sticky on scroll
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = y;
    }, { passive: true });

    // Initial check
    if (window.scrollY > 50) navbar.classList.add('scrolled');
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* ============================================
   BACK TO TOP
   ============================================ */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================
   TESTIMONIAL CAROUSEL (Home page)
   ============================================ */
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testi-prev');
    const nextBtn = document.querySelector('.testi-next');
    const dots = document.querySelectorAll('.testi-dot');

    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;
    let autoPlay;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });
    dots.forEach(dot => {
        dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.index)); resetAuto(); });
    });

    // Touch/swipe
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
            resetAuto();
        }
    });

    // Auto play
    function startAuto() { autoPlay = setInterval(next, 5000); }
    function resetAuto() { clearInterval(autoPlay); startAuto(); }
    startAuto();
}

/* ============================================
   APPOINTMENT FORM (Appointment page)
   ============================================ */
function initAppointmentForm() {
    const form = document.getElementById('appointment-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather data
        const name = form.querySelector('[name="patient-name"]')?.value;
        const phone = form.querySelector('[name="patient-phone"]')?.value;
        const service = form.querySelector('[name="service"]')?.value;
        const doctor = form.querySelector('[name="doctor"]')?.value;
        const date = form.querySelector('[name="visit-date"]')?.value;
        const time = form.querySelector('[name="visit-time"]')?.value;
        const notes = form.querySelector('[name="notes"]')?.value;

        if (!name || !phone || !service || !date) {
            showNotification('Mohon lengkapi data yang diperlukan.', 'warning');
            return;
        }

        // Build WA message
        const waMsg = encodeURIComponent(
            `*Reservasi KlinikSehat*\n\n` +
            `Nama: ${name}\nTelp: ${phone}\n` +
            `Layanan: ${service}\nDokter: ${doctor || '-'}\n` +
            `Tanggal: ${date}\nWaktu: ${time || '-'}\n` +
            `Catatan: ${notes || '-'}`
        );

        showNotification('Reservasi terkirim! Kami akan mengonfirmasi via WhatsApp.', 'success');

        // Optional: open WhatsApp
        setTimeout(() => {
            window.open(`https://wa.me/6282112345678?text=${waMsg}`, '_blank');
        }, 1500);

        form.reset();
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('[name="fullname"]')?.value;
        const email = form.querySelector('[name="email"]')?.value;

        if (!name || !email) {
            showNotification('Mohon lengkapi nama dan email.', 'warning');
            return;
        }

        showNotification('Pesan terkirim! Kami akan segera membalas.', 'success');
        form.reset();
    });
}

/* ============================================
   NOTIFICATION TOAST
   ============================================ */
function showNotification(message, type = 'success') {
    // Remove existing
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
    `;

    // Style
    Object.assign(toast.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'var(--font-heading)',
        fontWeight: '600',
        fontSize: '14px',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(30px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        background: type === 'success' ? '#ECFDF5' : '#FFFBEB',
        color: type === 'success' ? '#065F46' : '#92400E',
        border: `1px solid ${type === 'success' ? '#A7F3D0' : '#FDE68A'}`
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
