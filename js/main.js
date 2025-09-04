// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-canvas')) {
    new Particles();
  }
  // Inicializar funcionalidades
  initMenuToggle();
  initThemeToggle();
  initProjectFilter();
  initProjectModals();
  initSkillBars();
  initSmoothScrolling();
  
  // Inicializar partículas
  initParticles();
});

// Toggle del menú móvil
function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });
  }
}

// Toggle del tema claro/oscuro
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  // Verificar preferencia guardada o del sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema inicial
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = '🌙';
  }
  
  // Configurar el toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      if (themeIcon) {
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      }
    });
  }
}

// Filtrado de proyectos
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Añadir clase active al botón clickeado
      this.classList.add('active');
      
      // Obtener el filtro
      const filter = this.getAttribute('data-filter');
      
      // Filtrar proyectos
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Modales de proyectos
function initProjectModals() {
  const viewButtons = document.querySelectorAll('.view-details');
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  
  // Datos de ejemplo para los proyectos (en un caso real, podrían venir de una API)
  const projectData = {
    1: {
      title: 'Landing Pages Corporativas',
      image: 'assets/images/project-1.jpg',
      description: 'Diseño y desarrollo de landing pages optimizadas para conversión y posicionamiento SEO. Este proyecto incluyó la implementación de mejores prácticas de desarrollo web, diseño responsive y optimización de rendimiento.',
      longDescription: '<p>Desarrollé una serie de landing pages para diferentes empresas, enfocándome en la optimización de la tasa de conversión y el posicionamiento SEO. Cada landing page fue diseñada considerando la identidad de marca del cliente y sus objetivos específicos.</p><p>El proyecto incluyó investigación de audiencia, diseño de interfaz de usuario, desarrollo frontend con HTML5, CSS3 y JavaScript, y optimización para motores de búsqueda.</p>',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'SEO', 'Responsive Design'],
      challenges: ['Optimización de velocidad de carga', 'Compatibilidad entre navegadores', 'Diseño adaptable a diferentes dispositivos'],
      repoUrl: 'https://github.com/WilliamR0493/landing',
      demoUrl: '#'
    },
    2: {
      title: 'Software Educativo',
      image: 'assets/images/project-2.jpg',
      description: 'Aplicación educativa interactiva con funcionalidades multimedia para mejorar el aprendizaje.',
      longDescription: '<p>Desarrollo de una aplicación educativa que incorpora elementos multimedia para hacer el aprendizaje más interactivo y efectivo. La aplicación incluye integración con cámara para actividades prácticas y seguimiento de progreso.</p><p>El sistema fue construido con Java y utiliza MySQL para el almacenamiento de datos. Incluye funciones como quizzes interactivos, seguimiento de progreso y contenido multimedia educativo.</p>',
      technologies: ['Java', 'MySQL', 'Integración de cámara', 'JavaFX', 'Multimedia'],
      challenges: ['Sincronización de contenido multimedia', 'Optimización de base de datos', 'Interfaz intuitiva para diferentes grupos de edad'],
      repoUrl: 'https://github.com/WilliamR0493/edu-software',
      demoUrl: '#'
    },
    3: {
      title: 'Sistema Gimnasio',
      image: 'assets/images/project-3.jpg',
      description: 'Sistema de gestión para gimnasios con control de membresías, pagos y generación de reportes.',
      longDescription: '<p>Sistema completo de gestión para gimnasios que permite administrar miembros, membresías, pagos, asistencia y generar reportes detallados. La solución incluye un dashboard intuitivo para visualizar métricas clave del negocio.</p><p>El sistema fue desarrollado con enfoque en la experiencia de usuario, asegurando que los administradores puedan realizar sus tareas de manera eficiente y con la menor curva de aprendizaje posible.</p>',
      technologies: ['Dashboard', 'Sistema de reportes', 'Gestión de membresías', 'Sistema de pagos', 'Control de asistencia'],
      challenges: ['Diseño de base de datos eficiente', 'Generación de reportes en tiempo real', 'Interfaz usable para personal no técnico'],
      repoUrl: 'https://github.com/WilliamR0493/gym-dashboard',
      demoUrl: '#'
    },
    4: {
      title: 'FactuPan360 (POS)',
      image: 'assets/images/project-4.jpg',
      description: 'Sistema punto de venta completo para panaderías con control de inventario y facturación.',
      longDescription: '<p>Sistema punto de venta especializado para panaderías que incluye control de inventario, gestión de recetas, facturación y reportes de ventas. La solución está optimizada para el flujo de trabajo particular de una panadería, con funciones como cálculo automático de ingredientes según la producción.</p><p>Desarrollado en Java con interfaz gráfica amigable y base de datos MySQL para el almacenamiento persistente.</p>',
      technologies: ['Java', 'MySQL', 'Sistema POS', 'Control de inventario', 'Facturación electrónica'],
      challenges: ['Gestión de inventario en tiempo real', 'Optimización para hardware de bajo costo', 'Cálculo automático de ingredientes según recetas'],
      repoUrl: 'https://github.com/WilliamR0493/factupan360',
      demoUrl: '#'
    }
  };
  
  // Abrir modal
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const project = projectData[projectId];
      
      if (project && modal) {
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
          <h2 id="modal-title">${project.title}</h2>
          <img src="${project.image}" alt="${project.title}" loading="lazy" class="modal-image">
          <div class="modal-description">${project.longDescription}</div>
          
          <div class="modal-details">
            <div class="modal-section">
              <h3>Tecnologías Utilizadas</h3>
              <ul class="tech-list">
                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
              </ul>
            </div>
            
            <div class="modal-section">
              <h3>Retos y Soluciones</h3>
              <ul>
                ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
              </ul>
            </div>
            
            <div class="modal-links">
              <a href="${project.repoUrl}" target="_blank" rel="noopener" class="btn btn-primary">Ver Repositorio</a>
              ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener" class="btn btn-secondary">Ver Demo</a>` : ''}
            </div>
          </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
      }
    });
  });
  
  // Cerrar modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Cerrar modal al hacer clic fuera
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restaurar scroll
    }
  }
}

// Animación de barras de habilidades
function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  // Función para animar las barras cuando son visibles
  function animateSkills() {
    skillLevels.forEach(level => {
      const width = level.getAttribute('data-level');
      level.style.width = width;
    });
  }
  
  // Usar Intersection Observer para animar cuando son visibles
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => {
      observer.observe(level);
    });
  } else {
    // Fallback para navegadores que no soportan Intersection Observer
    animateSkills();
  }
}

// Scroll suave para enlaces internos
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Cerrar menú móvil si está abierto
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Scroll suave al elemento
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Inicializar partículas
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#2563eb'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#2563eb',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}