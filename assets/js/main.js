if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }
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
const heroVid = document.querySelector('.liquid-glass-card video');
if (heroVid) {
  const vObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? heroVid.play() : heroVid.pause());
  }, { threshold: 0.1 });
  vObserver.observe(heroVid);
}

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
      window.open(`https://wa.me/393347871260?text=${waMsg}`, '_blank');
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

/* ─── HAMBURGER MENU LOGIC ────────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const overlay = document.querySelector('.menu-overlay');
const backdrop = document.querySelector('.menu-backdrop');
const closeBtn = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.menu-links a');

if (toggle && overlay) {
  const toggleMenu = (forceClose = false) => {
    const isActive = forceClose ? false : !overlay.classList.contains('active');
    toggle.classList.toggle('active', isActive);
    overlay.classList.toggle('active', isActive);
    if (backdrop) backdrop.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => toggleMenu());
  if (backdrop) backdrop.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(true));

  // Chiudi quando si clicca un link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });
}
/* ─── PORTFOLIO FOLDER LOGIC ──────────────────────────────────── */
const folderTabs = document.querySelectorAll('.folder-tab');
const folderItems = document.querySelectorAll('.folder-item');

if (folderTabs.length > 0) {
  folderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');

      // Update tabs
      folderTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content items
      folderItems.forEach(item => {
        if (item.id === `port-${target}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });

    // Hover effect for cursor
    tab.addEventListener('mouseenter', () => {
      if (cur && curR) {
        cur.classList.add('hov');
        curR.classList.add('hov');
      }
    });
    tab.addEventListener('mouseleave', () => {
      if (cur && curR) {
        cur.classList.remove('hov');
        curR.classList.remove('hov');
      }
    });
  });
}

// Add portfolio folder to cursor hover scale list
document.querySelectorAll('.folder-tab').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width = '35px'; cur.style.height = '35px'; });
  el.addEventListener('mouseleave', () => { cur.style.width = '20px'; cur.style.height = '20px'; });
});

/* ═══════════════════════════════════════════════════════════════
   ROI CALCULATOR LOGIC
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const btnFatturato = document.querySelectorAll('#roiFatturatoContainer .roi-btn');
  const risultatoVal = document.getElementById('roiRisultato');
  const risultatoNetto = document.getElementById('roiRisultatoNetto');
  const badgeVal = document.getElementById('roiBadge');
  const badgeExtra = document.getElementById('roiBadgeExtra');
  const resSmall = document.getElementById('roiResSmall');

  if (!risultatoVal || !badgeVal) return;

  let valFatturato = 3500; // Default internally
  const costoAgenzia = 500;

  function formatEuro(num) {
    return '€ ' + Math.round(num).toLocaleString('it-IT');
  }

  function doCalculate(isPillClick = false) {
    const crescitaSEO = valFatturato * 0.28;
    const guadagnoNetto = crescitaSEO - costoAgenzia;
    const roi = Math.round((guadagnoNetto / costoAgenzia) * 10) / 10;

    // Animation triggers
    if (isPillClick) {
      risultatoVal.classList.remove('updating');
      void risultatoVal.offsetWidth;
      risultatoVal.classList.add('updating');
      setTimeout(() => {
        updateDOM(crescitaSEO, guadagnoNetto, roi);
      }, 150);
    } else {
      updateDOM(crescitaSEO, guadagnoNetto, roi);
    }
  }

  function updateDOM(crescitaSEO, guadagnoNetto, roi) {
    // We always show the 6-month projection for visual consistency as requested
    resSmall.textContent = "Con SEO locale nei primi 6 mesi aggiungi mediamente al tuo fatturato";
    risultatoVal.textContent = formatEuro(crescitaSEO * 6) + " in 6 mesi";

    if (guadagnoNetto <= 0) {
      risultatoNetto.textContent = "sottraendo €500/mese di investimento, raggiungi il punto di pareggio e generi profitto netto costante già dai primi mesi.";

      badgeVal.textContent = "Break-even garantito al mese 2";
      badgeVal.style.color = "var(--sky)";
      badgeVal.style.background = "rgba(184, 212, 236, 0.1)";
      badgeVal.style.borderColor = "var(--sky)";
      if (badgeExtra) badgeExtra.textContent = "";
    } else {
      risultatoNetto.textContent = `sottraendo €500/mese di investimento, il tuo guadagno netto è ${formatEuro(guadagnoNetto * 6)} nei primi 6 mesi`;

      badgeVal.textContent = "ROI: " + roi + "× il tuo investimento";
      badgeVal.style.color = "var(--lemon)";
      badgeVal.style.background = "rgba(253,241,187,0.1)";
      badgeVal.style.borderColor = "rgba(253,241,187,0.2)";

      if (roi >= 3) {
        if (badgeExtra) {
          badgeExtra.textContent = `Ogni €1 investito ne genera ${roi}`;
        }
      } else {
        if (badgeExtra) badgeExtra.textContent = "";
      }
    }
  }

  btnFatturato.forEach(b => {
    b.addEventListener('click', (e) => {
      btnFatturato.forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');
      valFatturato = parseInt(e.currentTarget.getAttribute('data-fatturato'));
      doCalculate(true);
    });
  });

  // Mostra risultato immediatamente
  doCalculate();
});
