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
  // 4. Hero Section reference (for SVG parallax below)
  // ==========================================
  const heroSection = document.querySelector('.styles_hero__XVQM0');

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

  document.querySelectorAll('.animate-fadeinup, .animate-text, .feature_card, .build_card, .chart-line, .styles_block__K5nIf, .build_grid, .features_grid').forEach((el) => {
    revealObserver.observe(el);
  });

  // Fail-safe: Ensure all cards become visible after 1.5s even if scroll observer is delayed
  setTimeout(() => {
    document.querySelectorAll('.build_card, .feature_card').forEach(card => {
      card.classList.add('is-visible');
    });
  }, 1500);

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
  // FAQ Accordion Toggle System (Desktop & Mobile Touch)
  // ==========================================
  const faqItemsList = document.querySelectorAll('.faq_item');
  faqItemsList.forEach(item => {
    const handleFaqToggle = (e) => {
      e.stopPropagation();
      const isActive = item.classList.contains('active');
      faqItemsList.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    };

    const questionBtn = item.querySelector('.faq_question');
    questionBtn?.addEventListener('click', handleFaqToggle);
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

  // ─── LeadSquared CRM Configuration ───────────────────────────────────────
  const LSQ_URL = 'https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Create?accessKey=u$r0f83abac5915f1175344c491a1481e4a&secretKey=e23030c4b0cc1edc251ad61ce5340a9f6499c21d';

  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmTerm: params.get('utm_term') || '',
      utmContent: params.get('utm_content') || ''
    };
  }

  function formatLsqPhone(countryCode, rawPhone) {
    let digits = (rawPhone || '').replace(/\D/g, '');
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    const codeDigits = (countryCode || '').replace(/\D/g, '');
    if (codeDigits && digits.startsWith(codeDigits) && digits.length > 10) {
      digits = digits.substring(codeDigits.length);
    }
    if (countryCode === '+91' || codeDigits === '91') {
      if (digits.length > 10) {
        digits = digits.slice(-10);
      }
      return digits;
    }
    return `+${codeDigits}${digits}`;
  }

  // ==========================================
  // 10. Form Submissions
  // ==========================================
  const inlineForm = document.getElementById('inline_cta_form');
  const modalForm = document.getElementById('popup_cta_form');

  function handleFormSubmit(form, successMsgId) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Extract Form Field Values
      const nameInput = form.querySelector('input[type="text"]')?.value || '';
      const emailInput = form.querySelector('input[type="email"]')?.value || '';
      const countryCodeSelect = form.querySelector('.single_phone_select')?.value || '';
      const rawPhoneInput = form.querySelector('.single_phone_input')?.value || '';
      const roleSelect = form.querySelector('select:not(.single_phone_select)')?.value || '';

      const fullPhone = `${countryCodeSelect} ${rawPhoneInput}`.trim();
      const lsqPhone = formatLsqPhone(countryCodeSelect, rawPhoneInput);

      // 1. Google Tag Manager / GTag DataLayer Lead Event
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'lead_submitted',
        'form_id': form.id,
        'user_name': nameInput,
        'user_email': emailInput,
        'user_phone': fullPhone,
        'user_role': roleSelect
      });

      // 2. Microsoft Clarity Custom Lead Event
      if (typeof window.clarity === 'function') {
        window.clarity('event', 'lead_submitted');
      }

      // 3. Meta Pixel (Facebook Pixel) Lead Conversion Event
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: '14-Day Applied AI Workshop',
          category: roleSelect
        });
      }

      // 4. LeadSquared CRM API Payload Construction
      const nameParts = nameInput.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const lsqPayload = [
        { Attribute: 'FirstName',        Value: firstName },
        { Attribute: 'LastName',         Value: lastName  },
        { Attribute: 'Phone',            Value: lsqPhone  },
        { Attribute: 'EmailAddress',     Value: emailInput },
        { Attribute: 'JobTitle',         Value: roleSelect },
        { Attribute: 'Source',           Value: 'Meta AI Lead' }
      ];

      const utms = getUtmParams();
      if (utms.utmSource)   lsqPayload.push({ Attribute: 'mx_utm_source',   Value: utms.utmSource });
      if (utms.utmMedium)   lsqPayload.push({ Attribute: 'mx_utm_medium',   Value: utms.utmMedium });
      if (utms.utmCampaign) lsqPayload.push({ Attribute: 'mx_utm_campaign', Value: utms.utmCampaign });
      if (utms.utmTerm)     lsqPayload.push({ Attribute: 'mx_utm_term',     Value: utms.utmTerm });
      if (utms.utmContent)  lsqPayload.push({ Attribute: 'mx_utm_content',  Value: utms.utmContent });

      // Post Lead Data to LeadSquared CRM API
      fetch(LSQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lsqPayload)
      }).then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.warn('LeadSquared API response warning:', text);
        }
      }).catch(err => console.warn('LeadSquared CRM submission network error:', err));

      const successBox = document.getElementById(successMsgId);
      if (successBox) {
        form.style.display = 'none';

        successBox.style.display = 'block';
        successBox.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; text-align:center; padding: 24px 12px; gap:12px; animation: fadeIn 0.4s ease-out;">
            <div style="width:54px; height:54px; border-radius:50%; background: linear-gradient(135deg, #22c55e, #16a34a); display:flex; align-items:center; justify-content:center; color:#ffffff; box-shadow: 0 8px 24px rgba(34, 197, 94, 0.35);">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h4 style="font-size:1.25rem; font-weight:800; color:#0f172a; margin:0;">Seat Reservation Request Received!</h4>
            <p style="font-size:0.90rem; color:#475569; margin:0; line-height:1.45;">Welcome aboard! Our mentor team will reach out via WhatsApp/Email shortly to complete your enrollment.</p>
          </div>
        `;
        form.reset();
        
        if (form === modalForm) {
          setTimeout(() => {
            closeModal();
            setTimeout(() => {
              form.style.display = 'block';
              successBox.style.display = 'none';
            }, 600);
          }, 3200);
        }
      }
    });
  }

  handleFormSubmit(inlineForm, 'inline_form_success');
  handleFormSubmit(modalForm, 'modal_form_success');

  // ==========================================
  // 7. Header Progressive Upward Graph Counter (1 -> line -> 14 Days)
  // ==========================================
  const daysCounter = document.getElementById('header_days_counter');
  const curvedStroke = document.getElementById('curved_stroke_path');
  const lineCounter = document.querySelector('.header_line_counter');

  if (daysCounter) {
    let currentVal = 1;
    const targetVal = 14;
    const duration = 1400;
    const stepInterval = Math.floor(duration / targetVal);

    let pathLength = 100;
    if (curvedStroke) {
      try {
        const len = Math.ceil(curvedStroke.getTotalLength());
        if (len > 20) pathLength = len;
      } catch (e) {
        pathLength = 100;
      }
      curvedStroke.style.strokeDasharray = pathLength.toString();
      curvedStroke.style.strokeDashoffset = pathLength.toString();
    }

    daysCounter.textContent = '1';

    const counterTimer = setInterval(() => {
      currentVal++;
      daysCounter.textContent = currentVal;

      if (curvedStroke) {
        const progress = (currentVal - 1) / (targetVal - 1);
        const offset = Math.max(0, pathLength * (1 - progress));
        curvedStroke.style.strokeDashoffset = offset.toString();
      }

      if (currentVal >= targetVal) {
        clearInterval(counterTimer);
        daysCounter.textContent = targetVal;
        if (curvedStroke) curvedStroke.style.strokeDashoffset = '0';
        if (lineCounter) lineCounter.classList.add('is-complete');
      }
    }, stepInterval);
  }

});


