class Particles {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 100 };
    
    this.colors = {
      primary: '#2563eb',
      primaryLight: '#3b82f6',
      primaryLighter: '#93c5fd'
    };
    
    this.init();
    this.animate();
    
    // Event listeners
    window.addEventListener('resize', () => this.init());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    
    window.addEventListener('mouseout', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }
  
  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Ajustar número de partículas según el tamaño de pantalla
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    this.particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const size = (Math.random() * 2) + 1;
      const x = (Math.random() * ((this.canvas.width - size * 2) - (size * 2)) + size * 2);
      const y = (Math.random() * ((this.canvas.height - size * 2) - (size * 2)) + size * 2);
      const directionX = (Math.random() * 1) - 0.5;
      const directionY = (Math.random() * 1) - 0.5;
      const color = this.getRandomColor();
      
      this.particles.push({
        x, y, directionX, directionY, size, color
      });
    }
  }
  
  getRandomColor() {
    const colors = [this.colors.primary, this.colors.primaryLight, this.colors.primaryLighter];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Dibujar conexiones entre partículas
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const opacity = 1 - (distance / 100);
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.3})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
    
    // Dibujar partículas
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      
      // Interacción con el ratón
      if (this.mouse.x && this.mouse.y) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const forceDirectionX = dx / distance * force * 5;
          const forceDirectionY = dy / distance * force * 5;
          
          p.x -= forceDirectionX;
          p.y -= forceDirectionY;
        }
      }
      
      // Mover partículas y rebotar en los bordes
      if (p.x + p.size > this.canvas.width || p.x - p.size < 0) {
        p.directionX = -p.directionX;
      }
      if (p.y + p.size > this.canvas.height || p.y - p.size < 0) {
        p.directionY = -p.directionY;
      }
      
      p.x += p.directionX;
      p.y += p.directionY;
    }
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.draw();
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new Particles();
});