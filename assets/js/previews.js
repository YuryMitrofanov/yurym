/* ARCHIVE0 — живые превью работ и фильтр */
(function () {
  'use strict';
  var $ = A0.$, $$ = A0.$$;
  var frames = $$('.work-frame');
  if (!frames.length) return;

  var fit = function () {
    frames.forEach(function (f) {
      var fr = $('iframe', f);
      if (!fr) return;
      var base = parseFloat(fr.getAttribute('data-w')) || 1440;
      var scale = f.clientWidth / base;
      if (!scale) return;
      fr.style.transform = 'scale(' + scale + ')';
      fr.style.height = (f.clientHeight / scale) + 'px';
    });
  };
  fit();
  window.addEventListener('resize', fit, { passive: true });
  window.addEventListener('load', fit);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(fit);
    frames.forEach(function (f) { ro.observe(f); });
  }

  A0.observe(frames, function (f) {
    var fr = $('iframe', f);
    if (!fr || fr.getAttribute('src')) return;
    fr.addEventListener('load', function () { f.classList.add('loaded'); fit(); });
    fr.setAttribute('src', fr.getAttribute('data-src'));
    setTimeout(function () { f.classList.add('loaded'); }, 6000);
  }, { rootMargin: '400px 0px' });

  var chips = $$('.chip[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      $$('.work-card').forEach(function (card) {
        card.hidden = !(f === 'all' || card.getAttribute('data-cat') === f);
      });
      fit();
    });
  });
})();
