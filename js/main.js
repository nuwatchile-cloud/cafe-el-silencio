/* ============================================
   CAFÉ EL SILENCIO — LÓGICA
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFadeUp();
  initNavScroll();
  initCarousel();
  initFaqAccordion();
});

/* ---------- Fade-up on scroll ---------- */
function initFadeUp() {
  const items = document.querySelectorAll('.fade-up');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  items.forEach((el) => observer.observe(el));
}

/* ---------- Nav shadow on scroll ---------- */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  });
}

/* ---------- Galería / carrusel ---------- */
function initCarousel() {
  const track  = document.getElementById('gal-track');
  const wrap   = document.getElementById('gal-wrap');
  const dotsEl = document.getElementById('gal-dots');
  const prevBtn = document.getElementById('gal-prev');
  const nextBtn = document.getElementById('gal-next');

  if (!track || !wrap || !dotsEl) return;

  const slides = track.querySelectorAll('.galeria-slide');
  const total  = slides.length;
  if (!total) return;

  let current = 0;
  let startX = 0;
  let isDragging = false;
  let dragOffset = 0;
  let autoplayTimer = null;

  const slideWidth = () => slides[0].offsetWidth + 16; // width + gap

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateX(-${current * slideWidth()}px)`;
    dotsEl.querySelectorAll('.galeria-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === current);
    });
  }

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'galeria-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Mouse drag
  wrap.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragOffset = e.clientX - startX;
    track.style.transform = `translateX(${-current * slideWidth() + dragOffset}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    resolveDrag();
  });

  // Touch drag
  wrap.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    dragOffset = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${-current * slideWidth() + dragOffset}px)`;
  }, { passive: true });

  wrap.addEventListener('touchend', () => {
    track.style.transition = '';
    resolveDrag();
  });

  function resolveDrag() {
    if (dragOffset < -60) goTo(current + 1);
    else if (dragOffset > 60) goTo(current - 1);
    else goTo(current);
    dragOffset = 0;
  }

  // Autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(() => goTo((current + 1) % total), 5000);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  wrap.addEventListener('mouseenter', stopAutoplay);
  wrap.addEventListener('mouseleave', startAutoplay);

  // Recalculate position on resize (slide width changes)
  window.addEventListener('resize', () => goTo(current));

  startAutoplay();
}

/* ---------- FAQ accordion ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const toggle = () => {
      const isOpen = item.classList.contains('open');
      items.forEach((i) => {
        i.classList.remove('open');
        i.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.setAttribute('aria-expanded', 'true');
      }
    };

    item.addEventListener('click', toggle);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}
