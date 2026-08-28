/* ARCHIVE0 — световой курсор и мягкий наклон плашки */
(function () {
  'use strict';
  var glow = A0.$('#glow');
  if (glow) {
    if (A0.fine && !A0.reduce) {
      var x = 0, y = 0, cx = 0, cy = 0, raf = null;
      var loop = function () {
        cx += (x - cx) * 0.08;
        cy += (y - cy) * 0.08;
        glow.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px)';
        raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(loop) : null;
      };
      window.addEventListener('pointermove', function (e) {
        x = e.clientX; y = e.clientY;
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
    } else { glow.remove(); }
  }

  var bg = A0.$('.bg-anim');
  if (bg && !A0.reduce) {
    var ticking = false;
    var apply = function () {
      bg.style.setProperty('--par', (window.scrollY * 0.06).toFixed(1) + 'px');
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    }, { passive: true });
    apply();
  }

  var tilt = A0.$('#tiltCard');
  if (tilt && A0.fine && !A0.reduce) {
    tilt.addEventListener('pointermove', function (e) {
      var r = tilt.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = 'perspective(1000px) rotateY(' + (px * 4).toFixed(2) + 'deg) rotateX(' + (-py * 4).toFixed(2) + 'deg)';
    });
    tilt.addEventListener('pointerleave', function () { tilt.style.transform = ''; });
  }
})();
