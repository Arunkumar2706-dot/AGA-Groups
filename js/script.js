/**
 * AGA Groups — Main JavaScript
 * Centralized config, shared UI, and page-specific modules
 */

/* ============================================
   SITE CONFIG — Update with your real details
   ============================================ */
const SITE_CONFIG = {
  companyName: 'AGA Groups',
  tagline: 'Building Excellence, Creating Landmarks',
  // Confirmed contact
  phone: '+91 63830 13232, +91 73733 34330',
  whatsapp: '916383013232',
  // Update these when you have the details
  email: 'agagroupshosur@gmail.com',
  address: "AGA Groups, Hosur, Tamil Nadu, India — 12°46'01.4\"N 77°50'16.2\"E",
  mapsLink: 'https://maps.app.goo.gl/qeUVk95mjjKewhaf8',
  mapsEmbedUrl: 'https://maps.google.com/maps?ll=12.767061,77.837836&z=17&output=embed',
  businessHours: 'Mon – Sat: 9:00 AM – 6:00 PM',
  social: {
    facebook: '#',
    instagram: 'https://www.instagram.com/aga_groups_hosur?utm_source=qr&igsh=OW0waGs3a2N1dzFj',
    linkedin: '#',
    twitter: '#',
  },
  // Formspree: sign up at https://formspree.io → New Form → paste your form ID below
  formspreeFormId: '',
  get formspreeEndpoint() {
    return this.formspreeFormId
      ? `https://formspree.io/f/${this.formspreeFormId}`
      : '';
  },
};

/* ============================================
   PROJECT DATA — Portfolio & modals
   ============================================ */
const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Skyline Residences',
    category: 'residential',
    image: 'images/projects/project-1.jpeg',
    description:
      'A premium 24-story residential tower featuring modern amenities, sustainable design, and panoramic city views. Completed with precision engineering and luxury finishes.',
    client: 'Skyline Developers',
    year: '2024',
    location: 'Mumbai, India',
  },
  {
    id: 2,
    title: 'Corporate Hub Tower',
    category: 'commercial',
    image: 'images/projects/project-2.jpeg',
    description:
      'State-of-the-art commercial office complex with 50,000 sq ft of leasable space, smart building systems, and LEED-certified green architecture.',
    client: 'TechCorp Industries',
    year: '2023',
    location: 'Pune, India',
  },
  {
    id: 3,
    title: 'Luxury Villa Interior',
    category: 'interior',
    image: 'images/projects/project-3.jpeg',
    description:
      'Complete interior transformation of a 5-bedroom luxury villa with bespoke furniture, Italian marble flooring, and smart home integration.',
    client: 'Private Client',
    year: '2024',
    location: 'Goa, India',
  },
  {
    id: 4,
    title: 'Heritage Home Renovation',
    category: 'renovation',
    image: 'images/projects/project-4.jpeg',
    description:
      'Careful restoration and modernization of a century-old heritage property, preserving architectural character while adding contemporary comforts.',
    client: 'Heritage Trust',
    year: '2023',
    location: 'Jaipur, India',
  },
  {
    id: 5,
    title: 'Green Valley Apartments',
    category: 'residential',
    image: 'images/projects/project-5.jpeg',
    description:
      'Eco-friendly apartment complex with solar panels, rainwater harvesting, and landscaped gardens across 3 acres of premium living space.',
    client: 'Green Valley Estates',
    year: '2022',
    location: 'Bangalore, India',
  },
  {
    id: 6,
    title: 'Metro Business Park',
    category: 'commercial',
    image: 'images/projects/project-6.jpeg',
    description:
      'Multi-building business park with retail spaces, co-working zones, and underground parking for 500+ vehicles.',
    client: 'Metro Holdings',
    year: '2023',
    location: 'Hyderabad, India',
  },
  {
    id: 7,
    title: 'Boutique Hotel Interior',
    category: 'interior',
    image: 'images/projects/project-7.jpeg',
    description:
      'Elegant boutique hotel interior design featuring locally sourced materials, artisan craftsmanship, and ambient lighting throughout 45 rooms.',
    client: 'Boutique Stays Ltd',
    year: '2024',
    location: 'Udaipur, India',
  },
  {
    id: 8,
    title: 'Industrial Warehouse Upgrade',
    image: 'images/projects/project-8.jpeg',
    description:
      'Complete structural reinforcement and modernization of a 100,000 sq ft industrial warehouse with upgraded logistics infrastructure.',
    client: 'LogiFlow Corp',
    year: '2022',
    location: 'Chennai, India',
  },
];

/* ============================================
   THEME INITIALIZATION
   ============================================ */
(function initTheme() {
  const savedTheme = localStorage.getItem('aga_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

/* ============================================
   DOM READY — Page Router
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  injectSiteConfig();
  initLoader();
  initNavbar();
  initBackToTop();
  initWhatsApp();
  initAOS();
  initCounters();
  initReviewForm();

function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  themeToggleBtns.forEach(btn => {
    // Set initial icon
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Toggle event
    btn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('aga_theme', newTheme);
      
      // Update all toggle buttons on the page
      themeToggleBtns.forEach(b => {
        const i = b.querySelector('i');
        if (i) i.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      });
    });
  });
}

  const page = document.body.dataset.page;

  switch (page) {
    case 'home':
      initTestimonials();
      break;
    case 'projects':
      initProjectFilter();
      initBeforeAfter();
      break;
    case 'contact':
      initContactForm();
      break;
    case 'showcase':
      initShowcase();
      break;
  }
});

/* ============================================
   CONFIG INJECTION
   ============================================ */
function injectSiteConfig() {
  document.querySelectorAll('[data-config="phone"]').forEach((el) => {
    el.textContent = SITE_CONFIG.phone;
    if (el.tagName === 'A') el.href = `tel:${SITE_CONFIG.phone.split(',')[0].replace(/\s/g, '')}`;
  });

  document.querySelectorAll('[data-config="email"]').forEach((el) => {
    el.textContent = SITE_CONFIG.email;
    if (el.tagName === 'A') el.href = `mailto:${SITE_CONFIG.email}`;
  });

  document.querySelectorAll('[data-config="address"]').forEach((el) => {
    if (el.tagName === 'A') {
      el.textContent = SITE_CONFIG.address;
      el.href = SITE_CONFIG.mapsLink;
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.textContent = SITE_CONFIG.address;
    }
  });

  document.querySelectorAll('[data-config="hours"]').forEach((el) => {
    el.textContent = SITE_CONFIG.businessHours;
  });

  document.querySelectorAll('[data-config="maps"]').forEach((el) => {
    if (el.tagName === 'IFRAME') el.src = SITE_CONFIG.mapsEmbedUrl;
  });

  // Set any elements that should open the maps link (address anchors, buttons)
  document.querySelectorAll('[data-config-mapslink]').forEach((el) => {
    el.href = SITE_CONFIG.mapsLink;
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  const socialLinks = {
    facebook: SITE_CONFIG.social.facebook,
    instagram: SITE_CONFIG.social.instagram,
    linkedin: SITE_CONFIG.social.linkedin,
    twitter: SITE_CONFIG.social.twitter,
  };

  Object.entries(socialLinks).forEach(([network, url]) => {
    document.querySelectorAll(`[data-social="${network}"]`).forEach((el) => {
      el.href = url;
      if (url && url !== '#') {
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  document.querySelectorAll('[data-config="company"]').forEach((el) => {
    el.textContent = SITE_CONFIG.companyName;
  });

  document.querySelectorAll('[data-config="tagline"]').forEach((el) => {
    el.textContent = SITE_CONFIG.tagline;
  });
}

/* ============================================
   LOADER
   ============================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const minDisplay = 800;
  const start = Date.now();

  const hide = () => {
    const elapsed = Date.now() - start;
    const delay = Math.max(0, minDisplay - elapsed);
    setTimeout(() => {
      loader.classList.add('loader--hidden');
      document.body.classList.remove('no-scroll');
    }, delay);
  };

  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide);
  }
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });

  const closeMenu = () => {
    menu?.classList.remove('nav-menu--open');
    toggle?.classList.remove('nav-toggle--active');
    overlay?.classList.remove('nav-overlay--visible');
    document.body.classList.remove('no-scroll');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('nav-menu--open');
    toggle.classList.toggle('nav-toggle--active', isOpen);
    overlay?.classList.toggle('nav-overlay--visible', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  overlay?.addEventListener('click', closeMenu);

  menu?.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  const currentPage = document.body.dataset.page;
  menu?.querySelectorAll('.nav-link').forEach((link) => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('nav-link--active');
    }
  });
}

/* ============================================
   BACK TO TOP
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('back-to-top--visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   WHATSAPP FLOAT
   ============================================ */
function initWhatsApp() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  const message = encodeURIComponent(
    `Hello ${SITE_CONFIG.companyName}, I would like to inquire about your construction services.`
  );
  btn.href = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`;
  btn.setAttribute('aria-label', 'Chat on WhatsApp');
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
}

/* ============================================
   AOS
   ============================================ */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 80,
    });
  }
}

/* ============================================
   COUNTERS
   ============================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ============================================
   TESTIMONIALS — Swiper
   ============================================ */
function createReviewHTML(review) {
  let starsHtml = '';
  for(let i = 0; i < review.rating; i++) {
    starsHtml += '<i class="fas fa-star"></i>';
  }
  
  const initials = review.name.substring(0, 2).toUpperCase();
  const textHtml = review.message && review.message.trim() !== '' 
    ? `<p class="testimonial-card__text">"${review.message}"</p>` 
    : '';
  
  return `
    <div class="swiper-slide">
      <div class="testimonial-card">
        <div class="testimonial-card__stars">${starsHtml}</div>
        ${textHtml}
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">${initials}</div>
          <div>
            <div class="testimonial-card__name">${review.name}</div>
            <div class="testimonial-card__role">Verified Client</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initTestimonials() {
  if (typeof Swiper === 'undefined') return;

  // Load local reviews
  const customReviews = JSON.parse(localStorage.getItem('aga_custom_reviews') || '[]');
  const wrapper = document.querySelector('.testimonials-swiper .swiper-wrapper');
  
  if (wrapper && customReviews.length > 0) {
    customReviews.forEach(review => {
      wrapper.insertAdjacentHTML('beforeend', createReviewHTML(review));
    });
  }

  const isLoop = customReviews.length >= 3;
  window.testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: isLoop,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

/* ============================================
   PROJECT FILTER & MODAL
   ============================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.project-item');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      items.forEach((item) => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;
        item.classList.toggle('project-item--hidden', !show);
      });
    });
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const id = parseInt(item.dataset.id, 10);
      const project = PROJECTS_DATA.find((p) => p.id === id);
      if (project) openProjectModal(project);
    });
  });

  const closeModal = () => {
    modal?.classList.remove('modal--open');
    document.body.classList.remove('no-scroll');
  };

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('modal--open')) {
      closeModal();
    }
  });
}

function openProjectModal(project) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  document.getElementById('modal-image').src = project.image;
  document.getElementById('modal-image').alt = project.title;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-description').textContent = project.description;
  document.getElementById('modal-client').textContent = project.client;
  document.getElementById('modal-year').textContent = project.year;
  document.getElementById('modal-location').textContent = project.location;

  const catEl = document.getElementById('modal-category');
  if (catEl) {
    catEl.textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
  }

  modal.classList.add('modal--open');
  document.body.classList.add('no-scroll');
}

/* ============================================
   BEFORE / AFTER SLIDER
   ============================================ */
function initBeforeAfter() {
  document.querySelectorAll('.ba-slider').forEach((slider) => {
    const handle = slider.querySelector('.ba-handle');
    const afterImg = slider.querySelector('.ba-after');
    const input = slider.querySelector('.ba-input');
    if (!handle || !afterImg) return;

    const update = (pct) => {
      const clamped = Math.max(0, Math.min(100, pct));
      afterImg.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      handle.style.left = `${clamped}%`;
      if (input) input.value = clamped;
    };

    if (input) {
      input.addEventListener('input', () => update(parseFloat(input.value)));
    }

    let dragging = false;

    const onMove = (clientX) => {
      if (!dragging) return;
      const rect = slider.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      update(pct);
    };

    handle.addEventListener('mousedown', () => {
      dragging = true;
    });
    handle.addEventListener('touchstart', () => {
      dragging = true;
    });

    window.addEventListener('mouseup', () => {
      dragging = false;
    });
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('touchend', () => {
      dragging = false;
    });
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX);
    });

    update(50);
  });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: {
      el: form.querySelector('#name'),
      validate: (v) => (v.trim().length >= 2 ? '' : 'Name must be at least 2 characters'),
    },
    email: {
      el: form.querySelector('#email'),
      validate: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address',
    },
    phone: {
      el: form.querySelector('#phone'),
      validate: (v) =>
        v.replace(/\D/g, '').length >= 10 ? '' : 'Phone must be at least 10 digits',
    },
    message: {
      el: form.querySelector('#message'),
      validate: (v) =>
        v.trim().length >= 10 ? '' : 'Message must be at least 10 characters',
    },
  };

  const showError = (field, msg) => {
    const group = fields[field].el.closest('.form-group');
    const errorEl = group.querySelector('.form-error');
    if (msg) {
      group.classList.add('form-group--error');
      errorEl.textContent = msg;
    } else {
      group.classList.remove('form-group--error');
      errorEl.textContent = '';
    }
  };

  const validateAll = () => {
    let valid = true;
    Object.keys(fields).forEach((key) => {
      const msg = fields[key].validate(fields[key].el.value);
      showError(key, msg);
      if (msg) valid = false;
    });
    return valid;
  };

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => {
      showError(key, fields[key].validate(fields[key].el.value));
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const toast = document.getElementById('form-toast');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    if (!SITE_CONFIG.formspreeFormId) {
      showToast(
        toast,
        'Form is not connected yet. Please call us at ' + SITE_CONFIG.phone + '.',
        'error'
      );
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      return;
    }

    try {
      const formData = new FormData(form);
      const res = await fetch(SITE_CONFIG.formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errMsg =
          data.error || data.errors?.map((e) => e.message).join(' ') || 'Submission failed';
        throw new Error(errMsg);
      }

      form.reset();
      showToast(toast, 'Thank you! We\'ll be in touch shortly.', 'success');
    } catch (err) {
      const fallback = 'Something went wrong. Please call us at ' + SITE_CONFIG.phone + '.';
      showToast(toast, err.message === 'Submission failed' ? fallback : err.message || fallback, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function showToast(el, message, type) {
  if (!el) return;
  el.textContent = message;
  el.className = `form-toast form-toast--${type} form-toast--visible`;
  setTimeout(() => el.classList.remove('form-toast--visible'), 5000);
}

/* ============================================
   REVIEW FORM
   ============================================ */
function initReviewForm() {
  const form = document.getElementById('review-form');
  const stars = document.querySelectorAll('#star-rating i');
  const ratingInput = document.getElementById('rating-value');
  
  if (!form || !stars.length) return;

  // Initialize stars to gold
  stars.forEach(s => s.style.setProperty('color', 'var(--color-gold)', 'important'));

  stars.forEach(star => {
    // Hover effects
    star.addEventListener('mouseenter', () => {
      const rating = star.dataset.rating;
      stars.forEach(s => {
        s.style.setProperty('color', s.dataset.rating <= rating ? 'var(--color-gold)' : '#ccc', 'important');
      });
    });
    
    // Reset to selected rating on mouse leave
    star.addEventListener('mouseleave', () => {
      const currentRating = ratingInput.value;
      stars.forEach(s => {
        s.style.setProperty('color', s.dataset.rating <= currentRating ? 'var(--color-gold)' : '#ccc', 'important');
      });
    });

    // Click to set rating
    star.addEventListener('click', () => {
      ratingInput.value = star.dataset.rating;
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const toast = document.getElementById('review-toast');
    
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    
    const name = document.getElementById('review-name').value;
    const message = document.getElementById('review-message').value;
    const rating = ratingInput.value;

    const newReview = { name, message, rating: parseInt(rating, 10) };
    
    // Simulate API call for review submission
    setTimeout(() => {
      showToast(toast, 'Thank you for your valuable feedback!', 'success');
      
      // Save locally
      const customReviews = JSON.parse(localStorage.getItem('aga_custom_reviews') || '[]');
      customReviews.push(newReview);
      localStorage.setItem('aga_custom_reviews', JSON.stringify(customReviews));

      // Add to Swiper
      if (window.testimonialsSwiper && typeof window.testimonialsSwiper.appendSlide === 'function') {
        window.testimonialsSwiper.appendSlide(createReviewHTML(newReview));
        window.testimonialsSwiper.update();
      }
      
      form.reset();
      stars.forEach(s => s.style.color = 'var(--color-gold)');
      ratingInput.value = 5;
      btn.disabled = false;
      btn.textContent = 'Submit Review';
    }, 1000);
  });
}

/* ============================================
   THREE.JS SHOWCASE
   ============================================ */
function initShowcase() {
  const container = document.getElementById('showcase-canvas');
  const loading = document.getElementById('showcase-loading');
  if (!container) return;

  if (typeof THREE === 'undefined') {
    setTimeout(initShowcase, 100);
    return;
  }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a1628);
  scene.fog = new THREE.Fog(0x0a1628, 20, 60);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    200
  );
  camera.position.set(12, 8, 16);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x404060, 0.6);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffeedd, 1.2);
  sun.position.set(10, 20, 10);
  sun.castShadow = true;
  scene.add(sun);

  const goldLight = new THREE.PointLight(0xc9a227, 0.8, 30);
  goldLight.position.set(0, 5, 0);
  scene.add(goldLight);

  const buildingGroup = new THREE.Group();

  const floorCount = 8;
  const floorHeight = 1.2;
  const buildingWidth = 4;
  const buildingDepth = 3;

  const bodyGeo = new THREE.BoxGeometry(buildingWidth, floorCount * floorHeight, buildingDepth);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1a2d4a,
    metalness: 0.3,
    roughness: 0.7,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = (floorCount * floorHeight) / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  buildingGroup.add(body);

  const windowMat = new THREE.MeshStandardMaterial({
    color: 0xc9a227,
    emissive: 0xc9a227,
    emissiveIntensity: 0.4,
    metalness: 0.8,
    roughness: 0.2,
  });

  const windows = [];
  for (let f = 0; f < floorCount; f++) {
    for (let w = 0; w < 3; w++) {
      const winGeo = new THREE.PlaneGeometry(0.6, 0.5);
      const win = new THREE.Mesh(winGeo, windowMat.clone());
      win.position.set(
        -1.2 + w * 1.2,
        0.8 + f * floorHeight,
        buildingDepth / 2 + 0.01
      );
      buildingGroup.add(win);
      windows.push(win);
    }
  }

  const roofGeo = new THREE.BoxGeometry(buildingWidth + 0.4, 0.3, buildingDepth + 0.4);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x0a1628, metalness: 0.5 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = floorCount * floorHeight + 0.15;
  buildingGroup.add(roof);

  const groundGeo = new THREE.PlaneGeometry(40, 40);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x0d1f35, roughness: 0.9 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(40, 40, 0x1a2d4a, 0x152238);
  scene.add(grid);

  scene.add(buildingGroup);


  let controls;
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 35;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
  }

  if (loading) loading.classList.add('showcase-loading--hidden');

  let time = 0;
  const animate = () => {
    requestAnimationFrame(animate);
    time += 0.016;

    buildingGroup.position.y = Math.sin(time * 0.5) * 0.05;

    windows.forEach((win, i) => {
      win.material.emissiveIntensity = 0.3 + Math.sin(time * 2 + i * 0.5) * 0.2;
    });

    goldLight.intensity = 0.6 + Math.sin(time) * 0.2;

    

    controls?.update();
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);

  renderer.domElement.addEventListener('mousedown', () => {
    if (controls) controls.autoRotate = false;
  });

  
}

// Opens a modal with a Three.js view of a single project image

