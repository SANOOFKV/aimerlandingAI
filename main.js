// Complete Awwwards-Grade GPU Animation & Interaction System for Aimer Landing AI

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Custom Smooth Follower Cursor System (Lerp 60 FPS)
  // ==========================================
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Hover expansion over interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .styles_block__K5nIf, .feature_card, .build_card, .persona_pill, .styles_tool__badge');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
  });

  // ==========================================
  // 2. Magnetic Button Micro-Interaction
  // ==========================================
  const magneticButtons = document.querySelectorAll('.styles_nav__contact__S0xFm, .styles_button__DwtwR');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate3d(${relX * 0.25}px, ${relY * 0.25}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate3d(0, 0, 0)`;
    });
  });

  // ==========================================
  // 3. Button Ripple Click Effect
  // ==========================================
  const rippleButtons = document.querySelectorAll('.styles_button__container__kKhYm, .submit_btn, .styles_nav__contact__S0xFm');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-disk');

      const existing = button.querySelector('.ripple-disk');
      if (existing) existing.remove();

      button.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ==========================================
  // 4. Hero Dashboard 3D Tilt Parallax
  // ==========================================
  const heroImageContainer = document.querySelector('.styles_images__w4HUt');
  const heroSection = document.querySelector('.styles_hero__XVQM0');

  if (heroSection && heroImageContainer) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((e.clientY - centerY) / rect.height) * -12;
      const rotateY = ((e.clientX - centerX) / rect.width) * 12;

      heroImageContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroImageContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  }

  // ==========================================
  // 5. Header Scroll Glass Effect
  // ==========================================
  const header = document.querySelector('.styles_header__qc_3q');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 6. Scroll Reveal Observer with Stagger & Blur Clear
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('chart-line')) {
          entry.target.classList.add('is-drawn');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fadeinup, .animate-text, .feature_card, .build_card, .chart-line, .styles_block__K5nIf').forEach((el, idx) => {
    if (!el.classList.contains('stagger-1') && !el.classList.contains('stagger-2')) {
      el.classList.add(`stagger-${(idx % 5) + 1}`);
    }
    revealObserver.observe(el);
  });

  // ==========================================
  // 7. SVG Cutout Headline Scroll Parallax Zoom
  // ==========================================
  const transparentHeadline = document.querySelector('.styles_transparent__headline__2VL7S svg');

  window.addEventListener('scroll', () => {
    if (!heroSection || !transparentHeadline) return;
    const heroRect = heroSection.getBoundingClientRect();
    const scrollProgress = Math.min(Math.max(-heroRect.top / (heroRect.height || 1), 0), 1);
    const scaleVal = 1 + scrollProgress * 0.45;
    transparentHeadline.style.transform = `scale(${scaleVal})`;
  });

  // ==========================================
  // 8. Interactive Accordion Service Cards (3 Phases)
  // ==========================================
  const serviceCards = document.querySelectorAll('.styles_block__K5nIf');
  const serviceButtons = document.querySelectorAll('.styles_button__5Hsdz');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      serviceCards.forEach(c => c.classList.remove('styles_active__6vkxR'));
      card.classList.add('styles_active__6vkxR');
    });

    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('styles_active__6vkxR'));
      card.classList.add('styles_active__6vkxR');
    });
  });

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.styles_block__K5nIf');
      serviceCards.forEach(card => card.classList.remove('styles_active__6vkxR'));
      parentCard?.classList.add('styles_active__6vkxR');
    });
  });

  // ==========================================
  // 9. Modal Popup & 40% Scroll Trigger
  // ==========================================
  const modalBackdrop = document.getElementById('cta_modal');
  const modalCloseBtn = document.getElementById('modal_close');
  let hasPoppedOnScroll = false;

  function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add('is-open');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    hasPoppedOnScroll = true;
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  // Intercept scroll/wheel/touchmove events outside modal card while modal is open
  window.addEventListener('wheel', (e) => {
    if (modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      if (!e.target.closest('.styles_modal__card')) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      if (!e.target.closest('.styles_modal__card')) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  function handleScrollPopup() {
    if (hasPoppedOnScroll) return;

    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;

    if (totalScrollable > 0) {
      const percentage = (scrollY / totalScrollable) * 100;
      // Trigger modal when scrolling reaches 40% of total page height
      if (percentage >= 40) {
        openModal();
      }
    }
  }

  window.addEventListener('scroll', handleScrollPopup, { passive: true });
  // Check immediately in case page loads pre-scrolled
  setTimeout(handleScrollPopup, 300);

  document.querySelectorAll('a[href="#reserve"], .js-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // ==========================================
  // 10. Form Submissions
  // ==========================================
  const inlineForm = document.getElementById('inline_cta_form');
  const modalForm = document.getElementById('popup_cta_form');

  function handleFormSubmit(form, successMsgId) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = document.getElementById(successMsgId);
      if (successBox) {
        successBox.style.display = 'block';
        form.reset();
        
        if (form === modalForm) {
          setTimeout(() => {
            closeModal();
            successBox.style.display = 'none';
          }, 2500);
        }
      }
    });
  }

  handleFormSubmit(inlineForm, 'inline_form_success');
  handleFormSubmit(modalForm, 'modal_form_success');

  // ==========================================
  // 11. FAQ Accordion Toggle
  // ==========================================
  const faqItems = document.querySelectorAll('.faq_item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq_question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================
  // 12. Interactive Ambient Fiber Canvas Mesh Effect
  // ==========================================
  const canvas = document.querySelector('.styles_fiber__R8VPk canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let canvasMouseX = width / 2;
    let canvasMouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      canvasMouseX = e.clientX;
      canvasMouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.15
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        const dxMouse = canvasMouseX - p1.x;
        const dyMouse = canvasMouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p1.x += dxMouse * 0.008;
          p1.y += dyMouse * 0.008;
        }

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 41, 249, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(94, 41, 249, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }
});
