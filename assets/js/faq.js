/* ARCHIVE0 — аккордеон вопросов */
(function () {
  'use strict';
  A0.$$('.faq-item').forEach(function (item) {
    var q = A0.$('.faq-q', item);
    if (!q) return;
    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');
    q.setAttribute('aria-expanded', 'false');
    var toggle = function () {
      q.setAttribute('aria-expanded', item.classList.toggle('open') ? 'true' : 'false');
    };
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();
