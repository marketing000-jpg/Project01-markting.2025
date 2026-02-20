/* ─── CURSOR ──────────────────────────────────────────────────── */
const cur = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
(function loop() { rx += (mx - rx) * .11; ry += (my - ry) * .11; curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; requestAnimationFrame(loop); })();
document.querySelectorAll('a,button').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hov'); curR.classList.add('hov'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hov'); curR.classList.remove('hov'); });
});

/* ─── HEADER SCROLL ───────────────────────────────────────────── */
const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 50));

/* ─── REVEAL ON SCROLL ────────────────────────────────────────── */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ─── TERRITORY RADAR ─────────────────────────────────────────── */
const locations = [
  { name: 'Guidonia Montecelio', x: 50, y: 48 },
  { name: 'Tivoli', x: 62, y: 32 },
  { name: 'Villanova', x: 35, y: 38 },
  { name: 'Villalba', x: 58, y: 62 },
  { name: 'Bagni di Tivoli', x: 70, y: 55 },
  { name: 'Villa Adriana', x: 38, y: 65 },
  { name: 'Monterotondo', x: 28, y: 25 },
  { name: 'Mentana', x: 22, y: 40 },
];
let locIdx = 0;
const pin = document.getElementById('terrPin');
const nameEl = document.getElementById('terrName');

function setPin(loc) {
  pin.style.left = loc.x + '%';
  pin.style.top = loc.y + '%';
  pin.style.transform = 'translate(-50%, -50%)';
  nameEl.textContent = loc.name;
}

function cyclePin() {
  pin.classList.add('fade');
  setTimeout(() => {
    locIdx = (locIdx + 1) % locations.length;
    setPin(locations[locIdx]);
    pin.classList.remove('fade');
  }, 650);
}

if (pin && nameEl) {
  setPin(locations[0]);
  setInterval(cyclePin, 3000);
}

/* ─── RADAR STAR ──────────────────────────────────────────────── */
const radarStar = document.querySelector('.hero-r-dot');
if (radarStar) {
  function moveRadarStar() {
    radarStar.style.opacity = 0;
    setTimeout(() => {
      const randomX = Math.floor(Math.random() * 30) + 35;
      const randomY = Math.floor(Math.random() * 30) + 27;
      radarStar.style.left = randomX + '%';
      radarStar.style.top = randomY + '%';
      radarStar.style.opacity = 0.8;
    }, 450);
  }
  setTimeout(() => {
    radarStar.style.opacity = 0.8;
    setInterval(moveRadarStar, 2500);
  }, 1000);
}

/* ─── CURSOR HOVER SCALE ──────────────────────────────────────── */
document.querySelectorAll('a, button, .svc').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width = '35px'; cur.style.height = '35px'; });
  el.addEventListener('mouseleave', () => { cur.style.width = '20px'; cur.style.height = '20px'; });
});

/* ─── WHATSAPP BUTTON VISIBILITY ON SCROLL ────────────────────── */
const waBtn = document.getElementById('waBtn');
if (waBtn) {
  // Show after 300px scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      waBtn.style.opacity = '1';
      waBtn.style.transform = 'scale(1)';
    } else {
      waBtn.style.opacity = '0';
      waBtn.style.transform = 'scale(0.8)';
    }
  }, { passive: true });
  // Start hidden
  waBtn.style.opacity = '0';
  waBtn.style.transform = 'scale(0.8)';
  waBtn.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease';
}

/* ─── FAQ SMOOTH ACCORDION ────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  const summary = item.querySelector('.faq-q');
  summary.addEventListener('click', e => {
    // Close all other open items
    document.querySelectorAll('.faq-item[open]').forEach(open => {
      if (open !== item) open.removeAttribute('open');
    });
  });
});

/* ─── LEAD FORM VALIDATION & SUBMIT ──────────────────────────── */
const leadForm = document.getElementById('leadForm');
const formSuccess = document.getElementById('formSuccess');

if (leadForm) {
  leadForm.addEventListener('submit', e => {
    e.preventDefault();

    // Client-side validation
    let valid = true;
    const nome = document.getElementById('lead-name');
    const email = document.getElementById('lead-email');
    const zona = document.getElementById('lead-zona');
    const budget = leadForm.querySelector('input[name="budget"]:checked');
    const fatturato = leadForm.querySelector('input[name="fatturato"]:checked');

    // Reset errors
    leadForm.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));

    if (!nome.value.trim()) {
      nome.classList.add('error');
      nome.focus();
      valid = false;
    }
    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      if (valid) email.focus();
      valid = false;
    }
    if (!zona.value.trim()) {
      zona.classList.add('error');
      if (valid) zona.focus();
      valid = false;
    }
    if (!budget) valid = false;
    if (!fatturato) valid = false;

    if (!valid) {
      // Shake the submit button
      const btn = document.getElementById('formSubmit');
      btn.style.animation = 'form-shake 0.4s ease';
      setTimeout(() => btn.style.animation = '', 400);
      return;
    }

    // Map display values for WhatsApp
    const budgetLabel = budget.parentElement.querySelector('.radio-value').textContent;
    const fatturatoLabel = fatturato.parentElement.querySelector('.radio-value').textContent;

    // Build WhatsApp message
    const waMsg = encodeURIComponent(
      `Ciao! Ho compilato il form sul vostro sito.\n\n` +
      `📍 Opero a: ${zona.value}\n` +
      `💼 La mia attività fattura: ${fatturatoLabel}\n` +
      `📊 Budget mensile per il marketing: ${budgetLabel}\n\n` +
      `Sono ${nome.value}. Vorrei capire come posso crescere online nella mia zona.`
    );

    // Show success
    const btn = document.getElementById('formSubmit');
    btn.disabled = true;
    const btnText = btn.querySelector('.btn-form-text');
    if (btnText) btnText.textContent = 'Inviato ✓';

    formSuccess.classList.add('visible');

    // Scroll to success message
    setTimeout(() => {
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);

    // Redirect to WhatsApp after 1.8s
    setTimeout(() => {
      window.open(`https://wa.me/3900000000?text=${waMsg}`, '_blank');
    }, 1800);
  });
}

/* ─── FORM SHAKE ANIMATION ────────────────────────────────────── */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes form-shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
