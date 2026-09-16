// Nurul Imam — reveal + dock, native Web Animations API (no CDN, same-origin).
// Reveal-once (elements stay visible after first reveal), Framer-equal eases.
const E22 = 'cubic-bezier(0.22,1,0.36,1)';
const E16 = 'cubic-bezier(0.16,1,0.3,1)';
const EBACK = 'cubic-bezier(0.34,1.56,0.64,1)';

const T = (s) => ({ transform: s });
const CONF = {
  nav:         { mount: true, from: { opacity: 0, ...T('translateY(-12px)') },        to: { opacity: 1, ...T('translateY(0px)') },              d: 0.55, delay: 0,    e: E16 },
  heroName:    { mount: true, from: T('translateY(110%)'),          to: T('translateY(0%)'),                   d: 0.85, delay: 0.12, e: E22 },
  heroCopy:    { mount: true, from: { opacity: 0, ...T('translateY(24px)') },        to: { opacity: 1, ...T('translateY(0px)') },              d: 0.75, delay: 0.12, e: E22 },
  portrait:    { mount: true, from: { opacity: 0, ...T('scale(0.96)') },             to: { opacity: 1, ...T('scale(1)') },                     d: 0.85, delay: 0.2,  e: E22 },
  sectionHead: { from: { opacity: 0, ...T('translateY(20px)') },   to: { opacity: 1, ...T('translateY(0px)') },   d: 0.6, e: E22 },
  github:      { from: { opacity: 0, ...T('translateY(20px)') },   to: { opacity: 1, ...T('translateY(0px)') },   d: 0.6, e: E22 },
  article:     { from: { opacity: 0, ...T('translateY(20px)') },   to: { opacity: 1, ...T('translateY(0px)') },   d: 0.6, e: E22 },
  card:        { from: { opacity: 0, ...T('translateY(20px)') },   to: { opacity: 1, ...T('translateY(0px)') },   d: 0.5, e: E22 },
  bento:       { from: { opacity: 0, ...T('translateY(20px)') },   to: { opacity: 1, ...T('translateY(0px)') },   d: 0.5, e: E22 },
  dock:        { from: { opacity: 0, ...T('translateY(16px) scale(0.85)') }, to: { opacity: 1, ...T('translateY(0px) scale(1)') }, d: 0.5, e: E22 },
};

function play(el, from, to, c, stagger) {
  const delay = ((c.delay || 0) + Math.min(stagger || 0, 0.5)) * 1000;
  if (el.__anim) el.__anim.cancel();
  const anim = el.animate([from, to], {
    duration: (c.d || 0.5) * 1000,
    delay,
    easing: c.e || E22,
    fill: 'forwards',
  });
  // bulletproof: force final visible state once done, and drop the attr so the
  // `[data-motion]` opacity:0 CSS can never re-hide the element
  anim.onfinish = () => {
    el.style.opacity = '1';
    el.style.transform = to.transform === undefined ? 'none' : to.transform;
    el.removeAttribute('data-motion');
    el.removeAttribute('data-motion-delay');
  };
  el.__anim = anim;
}

function revealNow(el) {
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.removeAttribute('data-motion');
}

function setup() {
  document.querySelectorAll('[data-motion]').forEach((el) => {
    const c = CONF[el.getAttribute('data-motion')] || CONF.article;
    const stagger = parseFloat(el.getAttribute('data-motion-delay') || '0') || 0;

    if (c.mount) {
      play(el, c.from, c.to, c, stagger);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            play(el, c.from, c.to, c, stagger);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    io.observe(el);
  });

  // dock magnification (spring-like)
  document.querySelectorAll('.dock-item-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.animate(
        [{ transform: 'translateY(0px) scale(1)' }, { transform: 'translateY(-10px) scale(1.22)' }],
        { duration: 500, easing: EBACK, fill: 'forwards' },
      );
    });
    card.addEventListener('mouseleave', () => {
      card.animate(
        [{ transform: 'translateY(-10px) scale(1.22)' }, { transform: 'translateY(0px) scale(1)' }],
        { duration: 420, easing: E22, fill: 'forwards' },
      );
    });
  });
}

if (!('animate' in document.documentElement)) {
  document.querySelectorAll('[data-motion]').forEach(revealNow);
} else {
  setup();
}

// absolute safety net: reveal anything in-viewport that got stuck (never hide below-fold prematurely)
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('[data-motion]').forEach((el) => {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (inView && parseFloat(getComputedStyle(el).opacity) < 0.1) revealNow(el);
    });
  }, 2000);
});