const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

// count-up stats
const stats = document.querySelectorAll('.stat-num');
const statsIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.round(target / 40));
      const tick = () => {
        cur += step;
        if(cur >= target){ el.textContent = target + suffix; return; }
        el.textContent = cur + suffix;
        requestAnimationFrame(tick);
      };
      tick();
      statsIO.unobserve(el);
    }
  });
}, {threshold:0.6});
stats.forEach(s => statsIO.observe(s));

// cursor glow (desktop only)
const glow = document.getElementById('glow');
if(window.matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove', (e) => {
    glow.style.opacity = 1;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => glow.style.opacity = 0);
}

// tilt effect on hero photo
const tiltCard = document.getElementById('tiltCard');
if(tiltCard && window.matchMedia('(hover:hover)').matches){
  tiltCard.addEventListener('mousemove', (e) => {
    const r = tiltCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltCard.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
  });
}

// mobile menu
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if(navToggle && mobileMenu){
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
