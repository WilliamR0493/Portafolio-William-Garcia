// Inicialización de partículas
document.addEventListener("DOMContentLoaded", function () {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#2563eb" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#2563eb",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
      },
    });
  }

  // Animaciones al hacer scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      const position = el.getBoundingClientRect();
      if (position.top < window.innerHeight - 100) {
        el.classList.add("animated");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Ejecutar una vez al cargar

  // Cambio de tema
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const savedTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);
  themeIcon.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });

  // Animación de barras de habilidades
  const skillLevels = document.querySelectorAll(".skill-level");
  skillLevels.forEach((level) => {
    const width = level.getAttribute("data-level");
    setTimeout(() => {
      level.style.width = width;
    }, 500);
  });

  // Header que se oculta al hacer scroll
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
    lastScrollY = window.scrollY;
  });

  // Navegación móvil
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Validación básica del formulario
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulación de envío exitoso
      alert("¡Mensaje enviado con éxito! Te contactaré pronto.");
      contactForm.reset();
    });
  }
});
