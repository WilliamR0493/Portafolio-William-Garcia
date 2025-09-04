// ========== INICIALIZACIÓN PRINCIPAL ==========
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar todas las funcionalidades
  initMenuToggle();
  initThemeToggle();
  initProjectFilter();
  initProjectModals();
  initSkillBars();
  initSmoothScrolling();
  initScrollHeader();
  initScrollAnimations();
  
  // Inicializar partículas si el canvas existe
  if (document.getElementById('particles-canvas')) {
    initParticles();
  }
});

// ========== HEADER OCULTABLE AL HACER SCROLL ==========
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    // No ocultar header en móviles cuando el menú está abierto
    const nav = document.querySelector('.nav');
    if (window.innerWidth < 768 && nav && nav.classList.contains('active')) {
      return;
    }
    
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    } else {
      header.classList.remove('hidden');
    }
    
    lastScrollY = window.scrollY;
  });
}

// ========== MEJORAS PARA EL MENÚ MÓVIL ==========
function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;
  
  if (!menuToggle || !nav) return;
  
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    
    // Cambiar icono de hamburguesa a X
    this.classList.toggle('active');
  });
  
  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      body.style.overflow = '';
      menuToggle.classList.remove('active');
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      body.style.overflow = '';
      menuToggle.classList.remove('active');
    }
  });
}

// ========== TOGGLE DEL TEMA CLARO/OSCURO ==========
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  if (!themeToggle) return;
  
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

// ========== FILTRADO DE PROYECTOS ==========
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0 || projectCards.length === 0) return;
  
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

// ========== MODALES DE PROYECTOS ==========
function initProjectModals() {
  const viewButtons = document.querySelectorAll('.view-details');
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  
  if (viewButtons.length === 0 || !modal) return;
  
  // Datos de ejemplo para los proyectos
  const projectData = {
    1: {
      title: 'Landing Pages Corporativas',
      image: 'assets/images/project-1.jpg',
      longDescription: '<p>Desarrollé una serie de landing pages para diferentes empresas, enfocándome en la optimización de la tasa de conversión y el posicionamiento SEO. Cada landing page fue diseñada considerando la identidad de marca del cliente y sus objetivos específicos.</p><p>El proyecto incluyó investigación de audiencia, diseño de interfaz de usuario, desarrollo frontend con HTML5, CSS3 y JavaScript, y optimización para motores de búsqueda.</p>',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'SEO', 'Responsive Design'],
      challenges: ['Optimización de velocidad de carga', 'Compatibilidad entre navegadores', 'Diseño adaptable a diferentes dispositivos'],
      repoUrl: 'https://github.com/WilliamR0493/landing',
      demoUrl: '#'
    },
    2: {
      title: 'Software Educativo',
      image: 'assets/images/project-2.jpg',
      longDescription: '<p>Desarrollo de una aplicación educativa que incorpora elementos multimedia para hacer el aprendizaje más interactivo y efectivo. La aplicación incluye integración con cámara para actividades prácticas y seguimiento de progreso.</p><p>El sistema fue construido con Java y utiliza MySQL para el almacenamiento de datos. Incluye funciones como quizzes interactivos, seguimiento de progreso y contenido multimedia educativo.</p>',
      technologies: ['Java', 'MySQL', 'Integración de cámara', 'JavaFX', 'Multimedia'],
      challenges: ['Sincronización de contenido multimedia', 'Optimización de base de datos', 'Interfaz intuitiva para diferentes grupos de edad'],
      repoUrl: 'https://github.com/WilliamR0493/edu-software',
      demoUrl: '#'
    },
    3: {
      title: 'Sistema Gimnasio',
      image: 'assets/images/project-3.jpg',
      longDescription: '<p>Sistema completo de gestión para gimnasios que permite administrar miembros, membresías, pagos, asistencia y generar reportes detallados. La solución incluye un dashboard intuitivo para visualizar métricas clave del negocio.</p><p>El sistema fue desarrollado con enfoque en la experiencia de usuario, asegurando que los administradores puedan realizar sus tareas de manera eficiente y con la menor curva de aprendizaje posible.</p>',
      technologies: ['Dashboard', 'Sistema de reportes', 'Gestión de membresías', 'Sistema de pagos', 'Control de asistencia'],
      challenges: ['Diseño de base de datos eficiente', 'Generación de reportes en tiempo real', 'Interfaz usable para personal no técnico'],
      repoUrl: 'https://github.com/WilliamR0493/gym-dashboard',
      demoUrl: '#'
    },
    4: {
      title: 'FactuPan360 (POS)',
      image: 'assets/images/project-4.jpg',
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
      
      if (project) {
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
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Cerrar modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Cerrar modal al hacer clic fuera
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ========== ANIMACIÓN DE BARRAS DE HABILIDADES ==========
function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  if (skillLevels.length === 0) return;
  
  // Usar Intersection Observer para animar cuando son visibles
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-level');
          entry.target.style.width = width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => {
      observer.observe(level);
    });
  } else {
    // Fallback para navegadores que no soportan Intersection Observer
    skillLevels.forEach(level => {
      const width = level.getAttribute('data-level');
      level.style.width = width;
    });
  }
}

// ========== SCROLL SUAVE PARA ENLACES INTERNOS ==========
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  if (links.length === 0) return;
  
  links.forEach(anchor => {
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
          document.body.style.overflow = '';
          menuToggle.classList.remove('active');
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

// ========== ANIMACIONES AL SCROLL ==========
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-content');
  if (animatedElements.length === 0) return;
  
  // Usar Intersection Observer para animar elementos al hacer scroll
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
      el.style.visibility = 'hidden';
      observer.observe(el);
    });
  } else {
    // Fallback para navegadores antiguos
    animatedElements.forEach(el => {
      el.classList.add('animate-in');
    });
  }
}

// ========== SISTEMA DE PARTÍCULAS ==========
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  // Configuración de partículas
  const config = {
    count: Math.floor((window.innerWidth * window.innerHeight) / 10000),
    colors: ['#2563eb', '#3b82f6', '#93c5fd'],
    mouseRadius: 100
  };
  
  // Clase Partícula
  class Particle {
    constructor() {
      this.size = (Math.random() * 2) + 1;
      this.x = Math.random() * (canvas.width - this.size * 2) + this.size * 2;
      this.y = Math.random() * (canvas.height - this.size * 2) + this.size * 2;
      this.directionX = (Math.random() * 1) - 0.5;
      this.directionY = (Math.random() * 1) - 0.5;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    }
    
    update(mouse) {
      // Rebote en bordes
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
      }
      
      // Interacción con el ratón
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const forceDirectionX = dx / distance * force * 5;
          const forceDirectionY = dy / distance * force * 5;
          
          this.x -= forceDirectionX;
          this.y -= forceDirectionY;
        }
      }
      
      this.x += this.directionX;
      this.y += this.directionY;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  // Inicializar partículas
  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    
    for (let i = 0; i < config.count; i++) {
      particles.push(new Particle());
    }
  }
  
  // Dibujar conexiones entre partículas
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const opacity = 1 - (distance / 100);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.3})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animación
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawConnections();
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(mouse);
      particles[i].draw();
    }
    
    requestAnimationFrame(animate);
  }
  
  // Seguimiento del ratón
  const mouse = {
    x: null,
    y: null,
    radius: config.mouseRadius
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
  });
  
  window.addEventListener('resize', init);
  
  // Iniciar
  init();
  animate();
}