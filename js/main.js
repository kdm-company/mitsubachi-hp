// MITSUBACHI v3
// drawer nav (SP) - a11y: aria-expanded / Esc / focus return
const burger = document.querySelector('.burger');
const drawer = document.querySelector('.drawer');
if (burger && drawer) {
  const setOpen = (open) => {
    burger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setOpen(!drawer.classList.contains('open')));
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      setOpen(false);
      burger.focus();
    }
  });
}

// light fade-in on scroll (respects prefers-reduced-motion)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fxTargets = document.querySelectorAll(
  '.sec-h,.axis_item,.tcard,.prod_txt,.prod_img,.band_flex,.news .row,.blk,.ceo .card,.pcard,.cguide,.cmp table'
);
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px' }
  );
  fxTargets.forEach((t) => {
    t.classList.add('fx');
    io.observe(t);
  });
  // safety fallback: never leave content hidden
  setTimeout(() => {
    fxTargets.forEach((t) => t.classList.add('in'));
  }, 1500);
}
