// Navbar: add shadow on scroll
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
