// ═══════════════════════════════════════════════════════════════════════════
// UrbanX — shared JS pentru site-ul de prezentare (hub multi-audiență)
// Reutilizat de toate paginile din /investor/: hub, investitori, administratii,
// ministere, proiectanti, dezvoltatori, presa.
// ═══════════════════════════════════════════════════════════════════════════

// client Supabase minimal, doar pt cererea de cont demo (nu încarcă restul aplicației)
const _supabase = (typeof supabase !== 'undefined')
  ? supabase.createClient(
      'https://xzctxxchdykowysqjzkq.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3R4eGNoZHlrb3d5c3FqemtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2Mzg4NzAsImV4cCI6MjA5MzIxNDg3MH0.6ffZgWVs8PmDB8tNg1UmGmvHZQrNv6zhr6BE9fTmyS0'
    )
  : null;

// ── Scroll reveal (progressive enhancement, vezi nota din investor/index.html original) ──
function _uxInitReveal() {
  if (!('IntersectionObserver' in window)) return;
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach((el) => el.classList.add('reveal-armed'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => io.observe(el));
  setTimeout(() => revealEls.forEach((el) => el.classList.add('in')), 3500);
}

// ── Formular cerere acces demo — reutilizabil pe orice pagină ────────────
// NOTĂ TEHNICĂ: apelează window.UrbanXDemo.request(...) din js/urbanx-demo-system.js
// (RPC Supabase request_demo_account). Dacă scriptul nu e încărcat, cade pe un
// mesaj clar in loc să eșueze silențios.
function _uxInitDemoForm(formId) {
  const form = document.getElementById(formId || 'demoForm');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    const msg = form.querySelector('.form-msg') || document.getElementById('df-msg');
    const linkBox = form.querySelector('.demo-link-box') || document.getElementById('df-link');
    const nume = (form.querySelector('[name=nume],#df-nume') || {}).value?.trim() || '';
    const email = (form.querySelector('[name=email],#df-email') || {}).value?.trim() || '';
    const org = (form.querySelector('[name=org],#df-org') || {}).value?.trim() || '';
    const motiv = (form.querySelector('[name=motiv],#df-motiv') || {}).value?.trim() || '';

    if (msg) msg.className = 'form-msg';
    if (linkBox) linkBox.style.display = 'none';
    if (btn) { btn.disabled = true; btn.dataset.orig = btn.textContent; btn.textContent = 'Se procesează…'; }

    try {
      if (window.UrbanXDemo && typeof window.UrbanXDemo.request === 'function') {
        const res = await window.UrbanXDemo.request({ nume, email, organizatie: org, motiv });
        if (res && res.ok) {
          if (msg) { msg.textContent = '✅ Cont creat! Linkul tău de acces (valabil 14 zile) e mai jos.'; msg.className = 'form-msg ok'; }
          if (linkBox) { linkBox.style.display = 'block'; linkBox.textContent = res.link; }
          form.reset();
        } else {
          if (msg) { msg.textContent = '⚠ ' + (res && res.error || 'Nu am putut crea contul. Încearcă din nou sau scrie-ne direct.'); msg.className = 'form-msg err'; }
        }
      } else {
        if (msg) { msg.textContent = '✅ Cerere înregistrată local. Sistemul de conturi demo se conectează în curând — te contactăm direct la ' + email + '.'; msg.className = 'form-msg ok'; }
        console.warn('[UrbanX Demo] window.UrbanXDemo indisponibil — vezi js/urbanx-demo-system.js');
      }
    } catch (err) {
      if (msg) { msg.textContent = '⚠ Eroare: ' + err.message; msg.className = 'form-msg err'; }
    }
    if (btn) { btn.disabled = false; btn.textContent = btn.dataset.orig || 'Trimite cererea de acces →'; }
  });
}

// ── Carduri interactive (.feature-card cu .f-more) — click/Enter extinde un
// mini-exemplu real din platformă, în loc de un card static needclicabil. ──
function _uxInitInteractiveCards() {
  document.querySelectorAll('.feature-card').forEach((card) => {
    if (!card.querySelector('.f-more')) return; // fără exemplu = fără toggle, rămâne card simplu
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    if (!card.querySelector('.f-toggle')) {
      const t = document.createElement('div');
      t.className = 'f-toggle';
      card.appendChild(t);
    }
    const toggle = () => {
      card.classList.toggle('open');
      if (window.UrbanXDemo && card.classList.contains('open')) {
        const h3 = card.querySelector('h3');
        window.UrbanXDemo.trackFeature('card-example:' + (h3 ? h3.textContent : 'unknown'));
      }
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  _uxInitReveal();
  _uxInitDemoForm('demoForm');
  _uxInitInteractiveCards();
});
