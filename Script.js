// ── Navigation ────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  const link = document.querySelector(`.nav-link[onclick*="${id}"]`);
  if (link) link.classList.add('active');
  closeMenu();
  setTimeout(observeAll, 50);
}

// ── Burger ────────────────────────────────────
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('burger').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
}
document.addEventListener('click', e => {
  const nav = document.getElementById('nav-links');
  const burger = document.getElementById('burger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
});

// ── Navbar scroll ──────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow = window.scrollY > 10 ? '0 4px 32px rgba(0,0,0,.5)' : 'none';
});

// ── Reveal au scroll ──────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeAll() {
  document.querySelectorAll('.page.active .reveal, .page.active .reveal-up').forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showPage('accueil');
  setTimeout(observeAll, 100);
});