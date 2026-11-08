// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav ul');
if (toggle) {
  toggle.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Image fallback (if a photo fails to load, show a soft gradient instead of a broken icon)
document.querySelectorAll('img').forEach(img => {
  const fail = () => img.classList.add('img-fallback');
  img.addEventListener('error', fail);
  if (img.complete && img.naturalWidth === 0) fail();
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Back to top
const topBtn = document.querySelector('.to-top');
if (topBtn) {
  window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 500));
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Collection filters
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const cat = btn.dataset.filter;
  document.querySelectorAll('.dress-card[data-cat]').forEach(card => {
    card.classList.toggle('hide', cat !== 'all' && card.dataset.cat !== cat);
  });
}));
// Open a filter from URL e.g. collections.html#party
if (filterBtns.length && location.hash) {
  const target = document.querySelector(`.filter-btn[data-filter="${location.hash.slice(1)}"]`);
  if (target) target.click();
}

// Lightbox gallery
const lb = document.querySelector('.lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.masonry figure').forEach(fig => fig.addEventListener('click', () => {
    lbImg.src = fig.querySelector('img').src;
    lb.classList.add('open');
  }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

// Contact form -> WhatsApp message
const form = document.getElementById('enquiry-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Hello Apsara Dresses!%0AName: ${encodeURIComponent(d.get('name'))}%0APhone: ${encodeURIComponent(d.get('phone'))}%0AInterested in: ${encodeURIComponent(d.get('interest'))}%0AMessage: ${encodeURIComponent(d.get('message'))}`;
    window.open(`https://wa.me/918072426181?text=${msg}`, '_blank');
  });
}
