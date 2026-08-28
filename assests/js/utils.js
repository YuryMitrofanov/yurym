/* ARCHIVE0 — общие утилиты */
window.A0 = (function () {
  'use strict';
  return {
    $: function (s, c) { return (c || document).querySelector(s); },
    $$: function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); },
    reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    fine: window.matchMedia('(hover:hover) and (pointer:fine)').matches,
    observe: function (nodes, cb, opts) {
      if (!('IntersectionObserver' in window)) { nodes.forEach(cb); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          cb(en.target);
          io.unobserve(en.target);
        });
      }, opts || { threshold: 0.1 });
      nodes.forEach(function (n) { io.observe(n); });
    }
  };
})();
