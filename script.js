// ===== Navigation scroll effect =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
});

// ===== Mobile menu toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('open');
    }
});

// ===== Countdown timer =====
const weddingDate = new Date('2026-09-05T13:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days);
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Scroll reveal animation =====
const revealElements = document.querySelectorAll(
    '.info-card, .notice-card, .cm-content, .rsvp-form'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children).filter(el => el.classList.contains('reveal'));
                const index = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);

                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

revealElements.forEach(el => observer.observe(el));

// ===== RSVP Form =====
const form = document.getElementById('rsvp-form');
const success = document.getElementById('rsvp-success');

form.addEventListener('submit', () => {
    // The form submits to Google Forms via the hidden iframe.
    // We show the success message after a short delay to allow the POST to complete.

    // Smooth transition
    form.style.opacity = '0';
    form.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        form.hidden = true;
        success.hidden = false;
        success.style.opacity = '0';
        success.style.transform = 'translateY(10px)';

        requestAnimationFrame(() => {
            success.style.transition = 'all 0.5s ease';
            success.style.opacity = '1';
            success.style.transform = 'translateY(0)';
        });
    }, 400);
});

// Add transition to form for smooth hide
form.style.transition = 'all 0.3s ease';
