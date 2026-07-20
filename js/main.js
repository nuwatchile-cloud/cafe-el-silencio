// Esperar a que el documento esté completamente listo
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Lógica del Menú de Navegación Móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en cualquier enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Animaciones de Aparición (Scroll) utilizando IntersectionObserver
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { 
    threshold: 0.1 
  });
  
  fadeElements.forEach(element => scrollObserver.observe(element));
});