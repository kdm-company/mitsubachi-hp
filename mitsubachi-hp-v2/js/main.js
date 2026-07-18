// MITSUBACHI v2
// drawer nav (LAYOUT-014: full-screen drawer)
const burger = document.querySelector('.burger');
const drawer = document.querySelector('.drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });
  drawer.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

// DECO-021 sync slider (text x image, number pager, NEXT arrow, auto-advance)
const axis = document.querySelector('.axis');
if (axis) {
  const slides = [
    {
      copy: '\u3069\u3093\u306a\u76f8\u8ac7\u3082\u3001\u307e\u308b\u3054\u3068\u53d7\u3051\u6b62\u3081\u308b',
      body: '\u65b0\u54c1\u30fb\u4e2d\u53e4\u306e\u58f2\u8cb7\u304b\u3089\u91d1\u5c5e\u52a0\u5de5\u3001\u5de5\u5834\u306e\u56f0\u308a\u3054\u3068\u307e\u3067\u3002\u300c\u3053\u308c\u306f\u3069\u3053\u306b\u983c\u3081\u3070\uff1f\u300d\u3092\u306a\u304f\u3059\u7a93\u53e3\u3068\u3057\u3066\u3001\u6a5f\u68b0\u306b\u307e\u3064\u308f\u308b\u3042\u3089\u3086\u308b\u3054\u76f8\u8ac7\u3092\u4e00\u672c\u5316\u3057\u307e\u3059\u3002',
      word: 'ONE-STOP',
    },
    {
      copy: '\u73fe\u5834\u3092\u77e5\u308b\u5546\u793e\u306e\u76ee\u5229\u304d',
      body: '\u6771\u5927\u962a\u306e\u753a\u5de5\u5834\u3068\u3068\u3082\u306b\u6b69\u3093\u3067\u304d\u305f\u7d4c\u9a13\u3092\u3082\u3068\u306b\u3001\u30ab\u30bf\u30ed\u30b0\u30b9\u30da\u30c3\u30af\u3060\u3051\u3067\u306f\u308f\u304b\u3089\u306a\u3044\u300c\u73fe\u5834\u3067\u4f7f\u3048\u308b\u4e00\u53f0\u300d\u3092\u898b\u6975\u3081\u3066\u3054\u63d0\u6848\u3057\u307e\u3059\u3002',
      word: 'ON-SITE',
    },
    {
      copy: '\u88fd\u9020\u306e\u73fe\u5834\u3068\u76f4\u7d50\u3057\u305f\u6280\u8853\u529b',
      body: '\u95a2\u9023\u4f1a\u793e\u30fb\u682a\u5f0f\u4f1a\u793e\u30a8\u30a4\u30a8\u30eb\u30a2\u30a4\uff08\u534a\u5c0e\u4f53\u88fd\u9020\u88c5\u7f6e\u90e8\u54c1\u306e\u7cbe\u5bc6\u6a5f\u68b0\u52a0\u5de5\uff09\u3068\u9023\u643a\u3002\u58f2\u308b\u3060\u3051\u3067\u306a\u304f\u3001\u52a0\u5de5\u30fb\u6280\u8853\u9762\u304b\u3089\u3082\u652f\u3048\u307e\u3059\u3002',
      word: 'ENGINEERING',
    },
  ];
  let i = 0;
  const numEl = axis.querySelector('.pager .n');
  const copyEl = axis.querySelector('.axis_copy');
  const bodyEl = axis.querySelector('.axis_body');
  const imgs = axis.querySelectorAll('.axis_img .slide');
  const render = () => {
    numEl.textContent = '0' + (i + 1);
    copyEl.textContent = slides[i].copy;
    bodyEl.textContent = slides[i].body;
    imgs.forEach((s, k) => s.classList.toggle('on', k === i));
  };
  const nextBtn = axis.querySelector('.next');
  let timer = setInterval(() => { i = (i + 1) % slides.length; render(); }, 5200);
  nextBtn.addEventListener('click', () => {
    i = (i + 1) % slides.length;
    render();
    clearInterval(timer);
    timer = setInterval(() => { i = (i + 1) % slides.length; render(); }, 5200);
  });
  render();
}
