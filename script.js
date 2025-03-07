document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar ul a");
    let currentPage = window.location.pathname.split("/").pop(); // Récupère la page actuelle

    // Cas où l'URL est vide ou finit par un "/"
    if (currentPage === "" || currentPage === "portfolio-vf") {
        currentPage = "index.html"; // On force "index.html" pour que la comparaison fonctionne
    }

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");

        // Vérifie si le lien correspond à la page actuelle
        if (
            linkHref === currentPage ||
            (currentPage === "index.html" && linkHref === "./")
        ) {
            link.firstElementChild.classList.add("active"); // Ajoute la classe active
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.getElementById("show-more");

    if (!showMoreBtn) return; // Si le bouton n'existe pas, on stoppe l'exécution ici

    const hiddenProjects = document.querySelectorAll(".project-card.hidden");
    let currentIndex = 0;

    showMoreBtn.addEventListener("click", function () {
        for (let i = 0; i < 2; i++) {
            if (currentIndex < hiddenProjects.length) {
                hiddenProjects[currentIndex].classList.remove("hidden");
                currentIndex++;
            }
        }

        if (currentIndex >= hiddenProjects.length) {
            showMoreBtn.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Ajoute un effet fade-out avant le changement de page
    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function (e) {
            if (
                !this.getAttribute("href").startsWith("#") &&
                this.getAttribute("target") !== "_blank"
            ) {
                e.preventDefault();
                const href = this.getAttribute("href");
                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// changement de thèmes
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleDesktop = document.getElementById("theme-toggle"); // 🌞 Icône dans le header (desktop)
    const themeToggleMobile = document.querySelector(".theme-toggle"); // 📱 Icône dans le menu mobile
    const themeIconMobile = themeToggleMobile.querySelector("i");
    const themeTextMobile = themeToggleMobile.querySelector("span");

    // 📌 Récupère le thème sauvegardé ou applique le thème clair par défaut
    let currentTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(currentTheme);
    updateIcons(currentTheme);

    // 📌 Ajoute l'événement pour les deux boutons (desktop & mobile)
    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener("click", toggleTheme);
    }
    themeToggleMobile.addEventListener("click", toggleTheme);

    function toggleTheme() {
        let newTheme = document.body.classList.contains("light")
            ? "dark"
            : "light";
        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);

        // Sauvegarde le choix de l'utilisateur
        localStorage.setItem("theme", newTheme);
        updateIcons(newTheme);
    }

    function updateIcons(theme) {
        // 📌 Mise à jour des icônes et textes pour Desktop et Mobile
        if (themeToggleDesktop) {
            themeToggleDesktop.classList.remove("fa-sun", "fa-moon");
            themeToggleDesktop.classList.add(
                theme === "dark" ? "fa-sun" : "fa-moon"
            );
        }

        themeIconMobile.classList.remove("fa-sun", "fa-moon");
        themeIconMobile.classList.add(theme === "dark" ? "fa-sun" : "fa-moon");
        themeTextMobile.textContent =
            theme === "dark" ? "Mode clair" : "Mode sombre";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.getElementById("burger-menu");
    const sidebar = document.getElementById("sidebar");
    const themeToggle = document.getElementById("theme-toggle");

    // ✅ Vérifie si le menu burger existe avant d’exécuter le script
    if (!burgerMenu || !sidebar) return;

    const overlay = document.createElement("div");

    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    // 📌 Ouvrir la sidebar
    burgerMenu.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("show");
    });

    // 📌 Fermer la sidebar en cliquant en dehors
    overlay.addEventListener("click", function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    });

    // 📌 Gestion du changement de thème (dans la sidebar)
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    });

    // 📌 Appliquer le dernier thème utilisé (mémorisation via localStorage)
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
});

// sidebar
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("side-bar");
    const toggleBtn = document.querySelector(".toggle-btn");
    const content = document.querySelector(".content");
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Sensibilité du swipe

    // ✅ Fonction pour ouvrir la sidebar
    function openSidebar() {
        sidebar.classList.add("active");
        sidebar.style.left = "0"; // ✅ Fait apparaître la sidebar depuis la gauche
        toggleBtn.classList.add("active"); // ✅ Change le bouton burger en croix
    }

    // ✅ Fonction pour fermer la sidebar
    function closeSidebar() {
        sidebar.classList.remove("active");
        sidebar.style.left = "-340px"; // ✅ Fait disparaître la sidebar vers la gauche
        toggleBtn.classList.remove("active");
    }

    // ✅ Click sur le burger menu → Ouvre/Ferme la sidebar
    toggleBtn.addEventListener("click", function () {
        if (sidebar.classList.contains("active")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // ✅ Click en dehors de la sidebar → Ferme la sidebar
    content.addEventListener("click", function () {
        if (sidebar.classList.contains("active")) {
            closeSidebar();
        }
    });

    // ✅ Swipe gauche → droite pour OUVRIR la sidebar
    document.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX < 50 && touchEndX > touchStartX + swipeThreshold) {
            openSidebar();
        }
    });

    // ✅ Swipe droite → gauche pour FERMER la sidebar
    sidebar.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });

    sidebar.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX > 50 && touchEndX < touchStartX - swipeThreshold) {
            closeSidebar();
        }
    });
});

// toggle / click / projets sur mobile-tablette
document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("click", function () {
            if (window.innerWidth <= 1080) {
                // ✅ Activation seulement sur mobile/tablette
                this.querySelector(".card-inner").classList.toggle("flipped");
            }
        });
    });
});
