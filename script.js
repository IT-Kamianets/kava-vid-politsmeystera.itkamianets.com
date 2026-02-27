// ===== Плавний скрол для якорних посилань =====
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Reveal-on-scroll з плавною появою =====
const revealItems = document.querySelectorAll('.fade-in');
revealItems.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index * 60, 420)}ms`);
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
);

revealItems.forEach((element) => revealObserver.observe(element));

// ===== Lightbox для галереї =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.lightbox .close');

function closeLightbox() {
    if (!lightbox) {
        return;
    }
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.querySelectorAll('.gallery-block .carousel-slides img').forEach((img) => {
    img.addEventListener('click', (e) => {
        if (!lightbox || !lightboxImg) {
            return;
        }
        lightbox.classList.add('active');
        lightboxImg.src = e.target.src;
        lightboxImg.alt = e.target.alt || 'Фото галереї';
        document.body.style.overflow = 'hidden';
    });
});

closeBtn?.addEventListener('click', closeLightbox);

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== Активна секція + динамічний navbar =====
const hero = document.getElementById('hero');
const heroOverlay = document.querySelector('.hero-overlay');
const heroContent = document.querySelector('.hero-content');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

let ticking = false;

function updateScrollEffects() {
    const scrollPos = window.scrollY;

    if (navbar) {
        navbar.classList.toggle('navbar-scrolled', scrollPos > 50);
    }

    let current = '';
    sections.forEach((section) => {
        if (scrollPos >= section.offsetTop - 220) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active-link', isActive);
    });

    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPos * 0.35}px`;
    }
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrollPos * 0.12}px)`;
    }
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollPos * 0.08}px)`;
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

updateScrollEffects();

// ===== Галерея: карусельні блоки + авто-перегортання =====
document.querySelectorAll('.gallery-block').forEach((block) => {
    const slides = block.querySelector('.carousel-slides');
    const images = slides?.querySelectorAll('img');
    const prevBtn = block.querySelector('.carousel-btn.prev');
    const nextBtn = block.querySelector('.carousel-btn.next');

    if (!slides || !images || images.length === 0 || !prevBtn || !nextBtn) {
        return;
    }

    let index = 0;
    let autoTimer = null;

    function updateCarousel() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function goNext() {
        index = (index + 1) % images.length;
        updateCarousel();
    }

    function startAuto() {
        stopAuto();
        autoTimer = setInterval(goNext, 3800);
    }

    function stopAuto() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        updateCarousel();
        startAuto();
    });

    nextBtn.addEventListener('click', () => {
        goNext();
        startAuto();
    });

    block.addEventListener('mouseenter', stopAuto);
    block.addEventListener('mouseleave', startAuto);
    block.addEventListener('focusin', stopAuto);
    block.addEventListener('focusout', startAuto);

    startAuto();
});
