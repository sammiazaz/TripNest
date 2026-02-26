/**
 * TripNest — Landing Page JavaScript
 * Handles: navbar scroll effect, mobile menu toggle, scroll animations
 */

// ── Navbar: add shadow on scroll ─────────────────────────────
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ── Mobile menu toggle ────────────────────────────────────────
function toggleMenu() {
    var menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
    var hamburger = document.getElementById('hamburger');
    var menu = document.getElementById('mobile-menu');
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
    }
});

// ── Scroll-in Animations ──────────────────────────────────────
// Adds 'visible' class to elements when they enter the viewport
(function () {
    // Elements to animate on scroll
    var animSelectors = [
        '.feature-card',
        '.step',
        '.testi-card',
        '.hero-badge',
    ];

    // Set initial state
    var style = document.createElement('style');
    style.innerHTML = `
    .feature-card, .step, .testi-card {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity .5s ease, transform .5s ease;
    }
    .feature-card.visible, .step.visible, .testi-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
    document.head.appendChild(style);

    // Intersection Observer for scroll effect
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.12 });

    // Observe all matching elements with staggered delay
    animSelectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.08) + 's';
            observer.observe(el);
        });
    });
})();

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
