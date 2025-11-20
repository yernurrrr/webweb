document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const overlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Функция открытия/закрытия
    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Блокируем скролл
    }

    // Функция принудительного закрытия
    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    // Обработчики событий
    if (burger && nav) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation(); // Чтобы клик не проваливался
            toggleMenu();
        });

        // Закрыть при клике на затемненный фон
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        // Закрыть при клике на любую ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // --- Остальные скрипты (Год и Галерея) ---

    // Год
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Галерея (Lightbox)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = item.getAttribute('href');
                if(lightboxImg) lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
                body.classList.add('no-scroll');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            body.classList.remove('no-scroll');
            setTimeout(() => { if(lightboxImg) lightboxImg.src = ''; }, 300);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }
});
