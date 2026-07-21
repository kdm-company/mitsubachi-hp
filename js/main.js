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

// note RSS -> JSON feed (via rss2json.com public endpoint). Falls back to the
// static "Coming soon" placeholder already in the HTML if the fetch fails or
// the feed has no items yet.
(function () {
  const list = document.getElementById('news-list');
  if (!list) return;
  const soon = document.getElementById('news-soon');
  const max = parseInt(list.dataset.max || '10', 10);
  const noteRssUrl = 'https://note.com/fair_viper9160/rss/';
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(noteRssUrl);

  fetch(feedUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) return;
      const items = data.items.slice(0, max);
      list.innerHTML = items
        .map((item) => {
          const d = new Date(item.pubDate);
          const date = isNaN(d.getTime())
            ? ''
            : d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
          const title = String(item.title || '').replace(/</g, '&lt;');
          const link = String(item.link || noteRssUrl);
          return (
            '<a class="row" href="' + link + '" target="_blank" rel="noopener">' +
            '<span class="date">' + date + '</span>' +
            '<span class="cat honey">note</span>' +
            '<span class="ttl">' + title + '</span></a>'
          );
        })
        .join('');
      list.hidden = false;
      if (soon) soon.hidden = true;
    })
    .catch(() => {
      // network unavailable or feed empty: keep the "Coming soon" placeholder
    });
})();

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
