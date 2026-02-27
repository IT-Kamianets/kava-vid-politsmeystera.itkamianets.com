// ===== Плавний скрол для якорних посилань =====
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Intersection Observer для анімації при скролу =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('fade-in')) {
                entry.target.style.opacity = '1';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Спостерігаємо за елементами з класом fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===== Lightbox для галереї =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', (e) => {
        lightbox.classList.add('active');
        lightboxImg.src = e.target.src;
        document.body.style.overflow = 'hidden';
    });
});

closeBtn?.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Закриття при натисненні Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== Активна секція у навігації =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--color-text-light)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-accent)';
        }
    });
});

// ===== Паралакс ефект для hero =====
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
    }
});

// ===== Галерея: карусельні блоки =====
document.querySelectorAll('.gallery-block').forEach(block => {
    const slides = block.querySelector('.carousel-slides');
    const imgs = slides.querySelectorAll('img');
    let index = 0;

    const prevBtn = block.querySelector('.carousel-btn.prev');
    const nextBtn = block.querySelector('.carousel-btn.next');

    function updateCarousel() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + imgs.length) % imgs.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % imgs.length;
        updateCarousel();
    });
});
