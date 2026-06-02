// JavaScript for Portfolio Functionality

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Highlight Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset to make activation smoother
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 4. Scroll Animation with Intersection Observer
    // Add fade-in class to major elements we want to animate
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% visible
    };

    const fadeElements = document.querySelectorAll('.glass-card, .section-title, .hero-content, .hero-image');

    // Add initial fade-in class
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: stop observing once appeared
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

    // 5. Fullscreen image lightbox
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let lightboxSlides = [];
    let lightboxIndex = 0;
    let lightboxOnGoTo = null;
    let lightboxOnResume = null;

    const zoomIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6h-2V6.41l-7.29 7.3-1.42-1.42 7.3-7.29H15V3zM3 9h2v7h7v2H3V9zm18 12h-6v-2h4.59l-7.3-7.29 1.42-1.42 7.29 7.3V15h2v6z"/></svg>`;

    function updateLightboxImage() {
        const slide = lightboxSlides[lightboxIndex];
        lightboxImg.src = slide.src;
        lightboxImg.alt = slide.alt;
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxSlides.length}`;
    }

    function openLightbox(slides, index, onGoTo, onPause, onResume) {
        lightboxSlides = slides;
        lightboxIndex = index;
        lightboxOnGoTo = onGoTo;
        lightboxOnResume = onResume || null;
        if (onPause) onPause();
        updateLightboxImage();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxImg.src = '';
        if (lightboxOnResume) lightboxOnResume();
        lightboxOnResume = null;
    }

    function lightboxGoTo(index) {
        lightboxIndex = (index + lightboxSlides.length) % lightboxSlides.length;
        updateLightboxImage();
        if (lightboxOnGoTo) lightboxOnGoTo(lightboxIndex);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => lightboxGoTo(lightboxIndex - 1));
    lightboxNext.addEventListener('click', () => lightboxGoTo(lightboxIndex + 1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxGoTo(lightboxIndex - 1);
        if (e.key === 'ArrowRight') lightboxGoTo(lightboxIndex + 1);
    });

    // 6. Project card image slideshows
    document.querySelectorAll('[data-slideshow]').forEach((slideshow) => {
        const slides = Array.from(slideshow.querySelectorAll('.slide'));
        const dotsContainer = slideshow.querySelector('.slideshow-dots');
        if (!slides.length || !dotsContainer) return;

        let current = 0;
        let timer;

        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `ภาพที่ ${index + 1}`);
            dot.addEventListener('click', () => goTo(index, true));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function pauseAutoPlay() {
            clearInterval(timer);
        }

        function openFullscreen(index) {
            openLightbox(
                slides,
                index,
                (i) => goTo(i),
                pauseAutoPlay,
                startAutoPlay
            );
        }

        const zoomBtn = document.createElement('button');
        zoomBtn.type = 'button';
        zoomBtn.className = 'slideshow-zoom-btn';
        zoomBtn.setAttribute('aria-label', 'ดูภาพเต็มจอ');
        zoomBtn.innerHTML = zoomIcon;
        zoomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openFullscreen(current);
        });
        slideshow.appendChild(zoomBtn);

        function goTo(index, resetTimer = false) {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
            if (resetTimer) startAutoPlay();
        }

        function startAutoPlay() {
            clearInterval(timer);
            timer = setInterval(() => goTo(current + 1), 4000);
        }

        slideshow.addEventListener('mouseenter', () => clearInterval(timer));
        slideshow.addEventListener('mouseleave', startAutoPlay);

        slides.forEach((slide, index) => {
            slide.style.cursor = 'zoom-in';
            slide.addEventListener('click', () => openFullscreen(index));
        });

        startAutoPlay();
    });
});
