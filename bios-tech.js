/* ==============================================================
   BIOS TECH — Shoptet design (doplňky)
   Šablona: Classic (generace 3)
   --------------------------------------------------------------
   Skript pouze PŘIDÁVÁ vizuální vrstvu. Nesahá na Shoptet logiku
   (košík, formuláře, AJAX). Když se nenačte, e-shop funguje dál
   a CSS drží samo o sobě.
   ============================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* označení, že JS vrstva běží */
  root.classList.add('bt-js');

  function ready(fn) {
    if (doc.readyState !== 'loading') {
      fn();
    } else {
      doc.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    var header = doc.getElementById('header');

    /* tlačítko „zpět nahoru" */
    var toTop = doc.createElement('button');
    toTop.type = 'button';
    toTop.className = 'bt-to-top';
    toTop.setAttribute('aria-label', 'Zpět nahoru');
    toTop.innerHTML = '<span aria-hidden="true">↑</span>';
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    (doc.body || root).appendChild(toTop);

    /* scroll: stín hlavičky + zobrazení tlačítka nahoru
       (throttle přes requestAnimationFrame) */
    var ticking = false;

    function update() {
      var y = window.pageYOffset || doc.documentElement.scrollTop || 0;
      if (header) {
        header.classList.toggle('bt-scrolled', y > 12);
      }
      toTop.classList.toggle('is-visible', y > 600);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
  });
})();
