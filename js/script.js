const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const navigationLinks = document.querySelectorAll(".navigation a");

function toggleMenu() {
    const menuIsOpen = navigation.classList.toggle("active");

    menuButton.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    menuButton.setAttribute("aria-expanded", menuIsOpen);
    menuButton.setAttribute(
        "aria-label",
        menuIsOpen ? "Fechar menu" : "Abrir menu"
    );
}

function closeMenu() {
    navigation.classList.remove("active");
    menuButton.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
}

menuButton.addEventListener("click", toggleMenu);

navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
        closeMenu();
    }
});

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* Animação das seções */

const revealElements = document.querySelectorAll(
    `
    .section-heading,
    .about__text,
    .about-card,
    .technology-card,
    .competencies,
    .experience-item,
    .featured-project,
    .project-card,
    .projects__github,
    .degree-card,
    .courses,
    .contact__content
    `
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* Menu ativo conforme a seção visível */

const sections = document.querySelectorAll("main section");
const menuLinks = document.querySelectorAll(".navigation a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const sectionId = entry.target.getAttribute("id");

            menuLinks.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${sectionId}`;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});