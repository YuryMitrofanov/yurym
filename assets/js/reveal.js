/* ARCHIVE0 — появление блоков и счётчики */
(function () {
  'use strict';
  var $$ = A0.$$;

  A0.observe($$('.reveal'), function (el) { el.classList.add('in'); }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

  var run = function (el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (A0.reduce) { el.textContent = target + suffix; return; }
    var start = performance.now(), dur = 1400;
    var tick = function (now) {
      var p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  A0.observe($$('[data-count]'), run, { threshold: 0.4 });
})();
