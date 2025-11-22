document.addEventListener("DOMContentLoaded", () => {
    // --- 1. МЕНЮ (БУРГЕР) ---
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const overlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    if (burger && nav) {
        // Удаляем старые обработчики (на всякий случай) и ставим новый
        burger.onclick = (e) => {
            e.stopPropagation();
            toggleMenu();
        };

        if (overlay) overlay.addEventListener('click', closeMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // --- 2. АВТОМАТИЧЕСКИЙ ГОД ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 3. ГАЛЕРЕЯ (Lightbox) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = item.getAttribute('href');
                if (lightboxImg) lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
                body.classList.add('no-scroll');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            body.classList.remove('no-scroll');
            setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 300);
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }

    // --- 4. МОДАЛЬНОЕ ОКНО ТЕХНИКИ (Список 1-20) ---
    const machinesData = {
        "1": {
            title: "Камаз 4208 (Вахтовка)",
            img: "assets/machines/1.png",
            desc: "Надежный грузовой автомобиль для перевозки вахтовых бригад и оборудования в условиях бездорожья.",
            specs: { "Год выпуска": "2012", "Гос. номер": "KZ 809AU11", "Колесная формула": "6x6", "Двигатель": "Дизель", "Мест": "22+2" },
            status: "Исправный/ на базе"
        },
        "2": {
            title: "ВАЗ-Нива 21214",
            img: "assets/machines/2.png",
            desc: "Легкий внедорожник для оперативного реагирования и патрулирования местности.",
            specs: { "Год выпуска": "2012", "Гос. номер": "KZ 052AU11", "Привод": "Полный 4x4", "Двигатель": "1.7 л (Бензин)", "Мощность": "83 л.с." },
            status: "Исправный/ на базе"
        },
        "3": {
            title: "Toyota Land Cruiser Prado",
            img: "assets/machines/3.png",
            desc: "Штабной автомобиль командного состава. Высокая проходимость и надежность.",
            specs: { "Год выпуска": "2008", "Гос. номер": "KZ 064AU11", "Объем двигателя": "2.7 л", "Привод": "4WD", "Тип": "Внедорожник" },
            status: "Исправный/ на базе"
        },
        "4": {
            title: "КрАЗ 255 (Лаптежник)",
            img: "assets/machines/4.png",
            desc: "Тяжелый грузовик-вездеход с колесной формулой 6x6. Предназначен для транспортировки крупногабаритных грузов.",
            specs: { "Год выпуска": "1989", "Гос. номер": "KZ 034AU11", "Двигатель": "ЯМЗ-238", "Грузоподъемность": "7.5 т", "Колеса": "Широкопрофильные" },
            status: "Исправный/ на базе"
        },
        "5": {
            title: "Камаз 43118",
            img: "assets/machines/5.png",
            desc: "Бортовой тягач вездеход. Используется для доставки оборудования на месторождения.",
            specs: { "Год выпуска": "2011", "Гос. номер": "KZ 812AU11", "Колесная формула": "6x6", "Мощность": "300 л.с.", "Грузоподъемность": "10 т" },
            status: "Исправный/ на базе"
        },
        "6": {
            title: "Toyota Hilux Pick Up",
            img: "assets/machines/6.png",
            desc: "Мобильный пикап оперативной группы. Дислокация: месторождение Аманкелди газ.",
            specs: { "Год выпуска": "2011", "Гос. номер": "KZ 220AU11", "Тип": "Пикап 4x4", "Двигатель": "Дизель", "Назначение": "Оперативный выезд" },
            status: "Исправный/ м/р Аманкелди газ"
        },
        "7": {
            title: "Toyota Hilux Pick Up",
            img: "assets/machines/7.png",
            desc: "Мобильный пикап оперативной группы. Дислокация: месторождение Арыскум.",
            specs: { "Год выпуска": "2011", "Гос. номер": "KZ 056AU11", "Тип": "Пикап 4x4", "Двигатель": "Дизель", "Назначение": "Оперативный выезд" },
            status: "Исправный/ м/р Арыскум"
        },
        "8": {
            title: "Автокран Кс-45717 К-3Р",
            img: "assets/machines/8.png",
            desc: "Автомобильный кран на шасси КАМАЗ для проведения грузоподъемных работ при ликвидации аварий.",
            specs: { "Год выпуска": "2013", "Гос. номер": "KZ 802AU11", "Грузоподъемность": "25 т", "Вылет стрелы": "21 м", "Шасси": "КамАЗ-43118" },
            status: "Требуется ремонт ТНВД"
        },
        "9": {
            title: "Камаз 43 118-10",
            img: "assets/machines/9.png",
            desc: "Грузовой автомобиль повышенной проходимости для материально-технического обеспечения.",
            specs: { "Год выпуска": "2013", "Гос. номер": "KZ 059AU11", "Колесная формула": "6x6", "Двигатель": "Евро-3", "Тип": "Бортовой" },
            status: "Исправный/ на базе"
        },
        "10": {
            title: "KIA Sportage",
            img: "assets/machines/10.png",
            desc: "Кроссовер для административных и служебных задач в городских условиях и на легком бездорожье.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 229AU11", "Привод": "AWD", "Двигатель": "2.0 л", "КПП": "Механика" },
            status: "Требуется ремонт МКПП"
        },
        "11": {
            title: "ГАЗ-33027-245 (Бизнес)",
            img: "assets/machines/11.png",
            desc: "Малотоннажный грузовой автомобиль с полным приводом для перевозки инвентаря.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 062AU11", "Привод": "4x4", "Грузоподъемность": "1.5 т", "Тип": "Бортовой" },
            status: "Исправный/ на базе"
        },
        "12": {
            title: "Камаз 43118-46",
            img: "assets/machines/12.png",
            desc: "Модифицированный вездеход КамАЗ. Высокая автономность и проходимость.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 813AU11", "Колесная формула": "6x6", "Двигатель": "КамАЗ 740.662", "Мощность": "300 л.с." },
            status: "Исправный/ на базе"
        },
        "13": {
            title: "Газель ГАЗ 27057",
            img: "assets/machines/13.png",
            desc: "Грузопассажирский фургон (комби) с полным приводом. Вмещает бригаду и оборудование.",
            specs: { "Год выпуска": "2014", "Гос. номер": "KZ 061AU11", "Привод": "4x4", "Мест": "7", "Тип": "Фургон ЦМФ" },
            status: "Исправный/ на базе"
        },
        "14": {
            title: "УАЗ (Буханка)",
            img: "assets/machines/14.png",
            desc: "Классический автомобиль-вездеход. Обслуживает ТОО «КазГерМунай».",
            specs: { "Год выпуска": "2018", "Гос. номер": "KZ 756AC11", "Привод": "4x4", "Двигатель": "ЗМЗ-409", "Тип": "Остекленный фургон" },
            status: "Исправный/ ТОО «КазГерМунай»"
        },
        "15": {
            title: "УАЗ (Буханка)",
            img: "assets/machines/15.png",
            desc: "Санитарно-оперативный автомобиль. Используется для служебных разъездов.",
            specs: { "Год выпуска": "2021", "Гос. номер": "KZ 844AX11", "Привод": "4x4", "Экологический класс": "Евро-5", "Год": "2021" },
            status: "Исправный/служба"
        },
        "16": {
            title: "Лада 4x4 (Нива Легенд)",
            img: "assets/machines/16.png",
            desc: "Служебный внедорожник на месторождении «Торгай Петролеум».",
            specs: { "Год выпуска": "2022", "Гос. номер": "KZ 774 BM 09", "Двигатель": "1.7 л", "Привод": "Полный", "Кузов": "3-дверный" },
            status: "Исправный/ м/р «Торгай Петролеум»"
        },
        "17": {
            title: "Лада 4x4 (Нива Легенд)",
            img: "assets/machines/17.png",
            desc: "Служебный внедорожник. Обслуживает м/р «Полторацкое» и «Акшабулак».",
            specs: { "Год выпуска": "2022", "Гос. номер": "KZ 772 BM 09", "Двигатель": "1.7 л", "Привод": "Полный", "Год": "2022" },
            status: "Исправный/ м/р «Полторацкое»"
        },
        "18": {
            title: "Лада 4x4 (Нива Легенд)",
            img: "assets/machines/18.png",
            desc: "Служебный внедорожник на месторождении «Кумколь».",
            specs: { "Год выпуска": "2021", "Гос. номер": "KZ 846AX11", "Двигатель": "1.7 л", "Привод": "Полный", "Год": "2021" },
            status: "Исправный/ м/р «Кумколь»"
        },
        "19": {
            title: "Great Wall King Kong Poer",
            img: "assets/machines/19.png",
            desc: "Современный мощный пикап для перевозки грузов и мобильных групп.",
            specs: { "Год выпуска": "2023", "Гос. номер": "KZ 335AC11", "Двигатель": "2.0 Турбодизель", "КПП": "Механика", "Привод": "4WD" },
            status: "Требуется ремонт МКПП"
        },
        "20": {
            title: "ГАЗ-27527 Соболь 4x4",
            img: "assets/machines/20.png",
            desc: "Новый полноприводный микроавтобус. Высокий комфорт и проходимость.",
            specs: { "Год выпуска": "2025", "Гос. номер": "KZ 602AS11", "Привод": "Полный", "Мест": "7", "Двигатель": "Cummins/Evotech" },
            status: "Исправный/ на базе"
        }
    };

    const modalOverlay = document.getElementById('machine-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const vehicleCards = document.querySelectorAll('.js-view-details');

    const mTitle = document.getElementById('modal-title');
    const mImg = document.getElementById('modal-img');
    const mDesc = document.getElementById('modal-desc');
    const mSpecs = document.getElementById('modal-specs');
    const mStatus = document.getElementById('modal-status');

    if (modalOverlay && vehicleCards.length > 0) {
        vehicleCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                const data = machinesData[id];
                if (data) {
                    mTitle.textContent = data.title;
                    mImg.src = data.img;
                    mDesc.textContent = data.desc;
                    mSpecs.innerHTML = '';
                    for (const [key, value] of Object.entries(data.specs)) {
                        const li = document.createElement('li');
                        li.innerHTML = `<span style="color: var(--color-primary)">${key}:</span> ${value}`;
                        mSpecs.appendChild(li);
                    }
                    mStatus.textContent = "Статус: " + data.status;
                    mStatus.style.color = data.status.toLowerCase().includes('ремонт') ? '#ffcc00' : '#00e0ff';

                    modalOverlay.classList.add('active');
                    body.classList.add('no-scroll');
                }
            });
        });

        const closeModalFunc = () => {
            modalOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        };
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModalFunc);
        modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModalFunc(); });
    }
});
