/* ==============================================================
   BIOS TECH — Shoptet homepage sekce
   Šablona: Classic (11)
   --------------------------------------------------------------
   Skript POUZE PŘIDÁVÁ nové sekce na úvodní stránku (hero, linie,
   ACE, showroom, manifest). Nesahá na Shoptet DOM ani logiku —
   košík, vyhledávání, menu, checkout zůstávají netknuté.
   ============================================================== */
(function () {
  'use strict';

  /* ---- odkazy k úpravě (doplň reálné URL kategorií) ---- */
  var LINKS = {
    katalog:  '#products-1',     // hero: "Prohlédnout stroje"
    testride: '/kontakty/',      // hero + showroom: rezervace / kontakt
    hobby:    '/',               // karta linie Rhino  — doplň URL kategorie
    profi:    '/',               // karta linie M3     — doplň URL kategorie
    ace:      '/'                // karta linie ACE    — doplň URL kategorie
  };

  document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;

    /* běží jen na homepage; pojistka proti dvojímu vložení */
    var isHome = /(^|\s)in-index(\s|$)/.test(body.className) ||
      ['/', '', '/uvod/', '/uvod'].indexOf(location.pathname) > -1;
    if (!isHome || document.getElementById('bt-hero')) return;

    var header = document.getElementById('header');
    var footer = document.getElementById('footer') || document.querySelector('footer');

    function sekce(id, html) {
      var s = document.createElement('section');
      s.id = id;
      s.className = 'bt-section';
      s.innerHTML = html;
      return s;
    }
    function predFooter(node) {
      if (footer && footer.parentNode) footer.parentNode.insertBefore(node, footer);
      else body.appendChild(node);
    }

    /* sdílené styly pro všechny sekce */
    var baseStyle =
      '<style>' +
      '.bt-section{font-family:"Montserrat",sans-serif;-webkit-font-smoothing:antialiased;}' +
      '.bt-section *{box-sizing:border-box;}' +
      '.bt-wrap{max-width:1240px;margin:0 auto;padding:0 24px;}' +
      '.bt-eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12px;font-weight:700;' +
        'letter-spacing:.18em;text-transform:uppercase;}' +
      '.bt-eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:#8BC53F;}' +
      '.bt-btn{display:inline-flex;align-items:center;gap:8px;border-radius:100px;padding:15px 28px;' +
        'font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;border:0;text-decoration:none;' +
        'transition:transform .12s ease,background .15s ease;}' +
      '.bt-btn:hover{transform:translateY(-2px);}' +
      '.bt-btn-pea{background:#8BC53F;color:#1A1A1A;}' +
      '.bt-btn-pea:hover{background:#9FD650;color:#1A1A1A;}' +
      '.bt-btn-dark{background:#1A1A1A;color:#fff;}' +
      '.bt-btn-dark:hover{background:#2D3138;color:#fff;}' +
      '.bt-btn-ghost{background:transparent;border:1.5px solid rgba(255,255,255,.3);color:#fff;}' +
      '.bt-btn-ghost:hover{border-color:#8BC53F;color:#fff;}' +
      '.bt-btn-ghost-d{background:transparent;border:1.5px solid #1A1A1A;color:#1A1A1A;}' +
      '.bt-btn-ghost-d:hover{background:#1A1A1A;color:#fff;}' +
      '</style>';

    /* ---- tovární SVG silueta traktoru (ACE) ---- */
    var tractorSvg =
      '<svg viewBox="0 0 400 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      '<g fill="#E6E8EB">' +
      '<rect x="100" y="78" width="150" height="65" rx="6"/>' +
      '<path d="M118 78 L135 22 L220 22 L240 78 Z"/>' +
      '<rect x="142" y="14" width="10" height="20"/>' +
      '<path d="M250 78 L330 95 L330 145 L250 152 Z"/>' +
      '<circle cx="120" cy="162" r="42"/><circle cx="295" cy="170" r="28"/>' +
      '</g>' +
      '<g fill="#1A1A1A"><circle cx="120" cy="162" r="17"/><circle cx="295" cy="170" r="11"/></g>' +
      '<path d="M138 74 L152 30 L218 30 L232 74 Z" fill="#1F2329"/>' +
      '<rect x="100" y="138" width="150" height="4" fill="#8BC53F"/>' +
      '<rect x="320" y="100" width="12" height="8" fill="#8BC53F"/>' +
      '</svg>';

    /* ============================================================
       1. HERO — vkládá se hned pod hlavičku
       ============================================================ */
    var hero = sekce('bt-hero', baseStyle +
      '<style>' +
      '#bt-hero{background:#1A1A1A;color:#fff;overflow:hidden;}' +
      '#bt-hero .bt-wrap{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;' +
        'padding-top:72px;padding-bottom:72px;}' +
      '#bt-hero .bt-eyebrow{color:#C7CACE;}' +
      '#bt-hero h1{font-size:clamp(40px,5.6vw,80px);line-height:.98;letter-spacing:-.03em;' +
        'font-weight:800;margin:22px 0 0;color:#fff;}' +
      '#bt-hero h1 em{font-style:normal;color:#8BC53F;}' +
      '#bt-hero .bt-lead{font-size:18px;color:#C7CACE;max-width:480px;margin:22px 0 0;line-height:1.55;}' +
      '#bt-hero .bt-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px;}' +
      '#bt-hero .bt-stats{display:flex;gap:36px;margin-top:48px;flex-wrap:wrap;}' +
      '#bt-hero .bt-stats .n{font-size:30px;font-weight:800;color:#fff;}' +
      '#bt-hero .bt-stats .l{font-size:13px;color:#C7CACE;}' +
      '#bt-hero .bt-visual{position:relative;min-height:360px;display:flex;align-items:center;justify-content:center;}' +
      '#bt-hero .bt-visual::before{content:"";position:absolute;inset:0;' +
        'background:radial-gradient(ellipse at center,rgba(139,197,63,.18) 0%,transparent 62%);}' +
      '#bt-hero .bt-visual .ring{position:absolute;width:340px;height:340px;border-radius:50%;' +
        'background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);}' +
      '#bt-hero .bt-visual .svg{position:relative;width:90%;max-width:460px;}' +
      '@media(max-width:860px){#bt-hero .bt-wrap{grid-template-columns:1fr;gap:32px;' +
        'padding-top:48px;padding-bottom:48px;}#bt-hero .bt-visual{min-height:240px;order:-1;}}' +
      '</style>' +
      '<div class="bt-wrap">' +
        '<div>' +
          '<span class="bt-eyebrow">Showroom · Štoky</span>' +
          '<h1>Technika<br>pro vaši <em>práci</em>.</h1>' +
          '<p class="bt-lead">Vyberte. Porovnejte. Vyzkoušejte. Showroom nové generace traktorů ' +
            'a techniky pro ty, kteří chtějí víc než jen stroj.</p>' +
          '<div class="bt-cta">' +
            '<a class="bt-btn bt-btn-pea" href="' + LINKS.katalog + '">Prohlédnout stroje →</a>' +
            '<a class="bt-btn bt-btn-ghost" href="' + LINKS.testride + '">Rezervovat test ride</a>' +
          '</div>' +
          '<div class="bt-stats">' +
            '<div><div class="n">15+</div><div class="l">strojů ve showroomu</div></div>' +
            '<div><div class="n">3</div><div class="l">produktové linie</div></div>' +
            '<div><div class="n">7 let</div><div class="l">záruka ACE</div></div>' +
          '</div>' +
        '</div>' +
        '<div class="bt-visual"><span class="ring"></span><span class="svg">' + tractorSvg + '</span></div>' +
      '</div>');
    if (header && header.parentNode) header.parentNode.insertBefore(hero, header.nextSibling);
    else body.insertBefore(hero, body.firstChild);

    /* ============================================================
       2. PRODUKTOVÉ LINIE
       ============================================================ */
    var lines = sekce('bt-lines', baseStyle +
      '<style>' +
      '#bt-lines{background:#fff;padding:72px 0;}' +
      '#bt-lines .head{margin-bottom:36px;}' +
      '#bt-lines .bt-eyebrow{color:#1A1A1A;}' +
      '#bt-lines h2{font-size:clamp(28px,3.6vw,46px);letter-spacing:-.02em;margin:14px 0 0;color:#1A1A1A;}' +
      '#bt-lines .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}' +
      '#bt-lines a.card{position:relative;display:flex;flex-direction:column;justify-content:space-between;' +
        'min-height:300px;padding:30px;border-radius:16px;overflow:hidden;text-decoration:none;' +
        'transition:transform .2s ease;}' +
      '#bt-lines a.card:hover{transform:translateY(-4px);}' +
      '#bt-lines .card .num{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;opacity:.7;}' +
      '#bt-lines .card h3{font-size:34px;letter-spacing:-.02em;margin:8px 0 0;}' +
      '#bt-lines .card p{font-size:14px;margin:10px 0 0;line-height:1.55;max-width:250px;}' +
      '#bt-lines .card .arrow{align-self:flex-start;margin-top:22px;width:46px;height:46px;border-radius:50%;' +
        'display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;}' +
      '#bt-lines .c-hobby{background:#F6F7F8;border:1px solid #E3E5E7;color:#1A1A1A;}' +
      '#bt-lines .c-hobby h3{color:#1A1A1A;}#bt-lines .c-hobby p{color:#5C6168;}' +
      '#bt-lines .c-hobby .arrow{background:#8BC53F;color:#1A1A1A;}' +
      '#bt-lines .c-profi{background:#2D3138;color:#fff;}' +
      '#bt-lines .c-profi h3{color:#fff;}#bt-lines .c-profi p{color:#C7CACE;}' +
      '#bt-lines .c-profi .arrow{background:#8BC53F;color:#1A1A1A;}' +
      '#bt-lines .c-ace{background:#1A1A1A;color:#fff;}' +
      '#bt-lines .c-ace h3{color:#fff;}#bt-lines .c-ace p{color:#C7CACE;}' +
      '#bt-lines .c-ace .num{color:#FF6A1F;opacity:1;}' +
      '#bt-lines .c-ace .arrow{background:#FF6A1F;color:#fff;}' +
      '@media(max-width:860px){#bt-lines .grid{grid-template-columns:1fr;}}' +
      '</style>' +
      '<div class="bt-wrap">' +
        '<div class="head">' +
          '<span class="bt-eyebrow">Tři linie · Tři světy</span>' +
          '<h2>Vyberte si svět práce.</h2>' +
        '</div>' +
        '<div class="grid">' +
          '<a class="card c-hobby" href="' + LINKS.hobby + '">' +
            '<div><span class="num">01 · Hobby</span><h3>Rhino</h3>' +
            '<p>Pro zahrady, sady a menší pozemky. Cesta začíná tady — bez kompromisů na kvalitě.</p></div>' +
            '<span class="arrow">→</span></a>' +
          '<a class="card c-profi" href="' + LINKS.profi + '">' +
            '<div><span class="num">02 · Hobby/Profi</span><h3>M3</h3>' +
            '<p>Pro farmy, vinaře, sadaře a obce. Sílu i citlivost spojuje do jedné jízdy.</p></div>' +
            '<span class="arrow">→</span></a>' +
          '<a class="card c-ace" href="' + LINKS.ace + '">' +
            '<div><span class="num">03 · Profi ACE</span><h3>ACE</h3>' +
            '<p>Vlajková řada bez kompromisů. Centrála ACE pro ČR ve Štokách.</p></div>' +
            '<span class="arrow">→</span></a>' +
        '</div>' +
      '</div>');
    predFooter(lines);

    /* ============================================================
       3. ACE — pruh sub-brandu
       ============================================================ */
    var ace = sekce('bt-ace', baseStyle +
      '<style>' +
      '#bt-ace{background:#1A1A1A;padding:56px 0;}' +
      '#bt-ace .bt-wrap{display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}' +
      '#bt-ace .badge{display:inline-flex;align-items:center;gap:9px;padding:6px 14px;border-radius:100px;' +
        'background:rgba(255,106,31,.12);border:1px solid rgba(255,106,31,.32);' +
        'font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#FF6A1F;}' +
      '#bt-ace .badge::before{content:"";width:6px;height:6px;border-radius:50%;background:#FF6A1F;}' +
      '#bt-ace h2{font-size:clamp(26px,3vw,40px);color:#fff;letter-spacing:-.02em;margin:16px 0 0;}' +
      '#bt-ace h2 em{font-style:normal;color:#FF6A1F;}' +
      '#bt-ace p{color:#C7CACE;font-size:15px;margin:10px 0 0;max-width:440px;}' +
      '#bt-ace .bt-btn-ace{background:#FF6A1F;color:#fff;}' +
      '#bt-ace .bt-btn-ace:hover{background:#E5560F;color:#fff;}' +
      '</style>' +
      '<div class="bt-wrap">' +
        '<div>' +
          '<span class="badge">Sub-brand · Centrála ČR</span>' +
          '<h2><em>ACE</em>. Profesionální traktory.</h2>' +
          '<p>Pro toho, kdo nebere kompromisy. Showroom Štoky je oficiální centrála značky ACE pro ČR.</p>' +
        '</div>' +
        '<a class="bt-btn bt-btn-ace" href="' + LINKS.ace + '">ACE řada →</a>' +
      '</div>');
    predFooter(ace);

    /* ============================================================
       4. SHOWROOM
       ============================================================ */
    var showroom = sekce('bt-showroom', baseStyle +
      '<style>' +
      '#bt-showroom{background:#F6F7F8;padding:72px 0;}' +
      '#bt-showroom .bt-wrap{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center;}' +
      '#bt-showroom .bt-eyebrow{color:#1A1A1A;}' +
      '#bt-showroom h2{font-size:clamp(28px,3.6vw,48px);letter-spacing:-.025em;margin:14px 0 0;color:#1A1A1A;}' +
      '#bt-showroom p{color:#3A3F47;font-size:16px;margin:16px 0 0;max-width:460px;}' +
      '#bt-showroom .bt-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px;}' +
      '#bt-showroom .info{display:grid;grid-template-columns:1fr 1fr;gap:12px;}' +
      '#bt-showroom .info .big{grid-column:1/3;background:#1A1A1A;color:#fff;border-radius:16px;padding:26px;' +
        'min-height:170px;display:flex;flex-direction:column;justify-content:space-between;}' +
      '#bt-showroom .info .sm{background:#fff;border:1px solid #E3E5E7;border-radius:16px;padding:20px;}' +
      '#bt-showroom .info .cap{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#8B8F95;}' +
      '#bt-showroom .info .big .cap{color:#C7CACE;}' +
      '#bt-showroom .info .v{font-size:22px;font-weight:800;color:#1A1A1A;margin-top:6px;letter-spacing:-.01em;}' +
      '#bt-showroom .info .big .v{color:#fff;font-size:26px;}' +
      '#bt-showroom .info .s{font-size:12px;color:#8B8F95;margin-top:6px;}' +
      '#bt-showroom .info .big .s{color:#C7CACE;}' +
      '@media(max-width:860px){#bt-showroom .bt-wrap{grid-template-columns:1fr;gap:28px;}}' +
      '</style>' +
      '<div class="bt-wrap">' +
        '<div>' +
          '<span class="bt-eyebrow">Showroom · Štoky</span>' +
          '<h2>Stroje si tu osaháte, porovnáte vedle sebe, vyzkoušíte.</h2>' +
          '<p>Showroom — jako Mercedes nebo Apple. Ne prodejna, ne katalog. Mluvíte s někým, kdo tomu rozumí.</p>' +
          '<div class="bt-cta">' +
            '<a class="bt-btn bt-btn-dark" href="' + LINKS.testride + '">Plán cesty</a>' +
            '<a class="bt-btn bt-btn-ghost-d" href="' + LINKS.testride + '">Test ride</a>' +
          '</div>' +
        '</div>' +
        '<div class="info">' +
          '<div class="big"><span class="cap">Adresa</span>' +
            '<div><div class="v">Štoky 184</div><div class="s">582 53 · D1 výjezd, 90 km od Prahy</div></div></div>' +
          '<div class="sm"><span class="cap">Po–Pá</span><div class="v">8:00–17:00</div>' +
            '<div class="s">So 9–13 · Ne zavřeno</div></div>' +
          '<div class="sm"><span class="cap">Test ride</span><div class="v">90 min</div>' +
            '<div class="s">Po rezervaci · zdarma</div></div>' +
        '</div>' +
      '</div>');
    predFooter(showroom);

    /* ============================================================
       5. MANIFEST
       ============================================================ */
    var manifesto = sekce('bt-manifesto', baseStyle +
      '<style>' +
      '#bt-manifesto{background:#fff;padding:80px 0;}' +
      '#bt-manifesto .bt-wrap{max-width:860px;text-align:center;}' +
      '#bt-manifesto .bt-eyebrow{color:#1A1A1A;}' +
      '#bt-manifesto .big{font-size:clamp(24px,3.2vw,40px);font-weight:700;letter-spacing:-.02em;' +
        'line-height:1.2;margin:22px 0 0;color:#1A1A1A;}' +
      '#bt-manifesto .big em{font-style:normal;color:#6FA02C;}' +
      '#bt-manifesto .vals{display:flex;justify-content:center;gap:40px;flex-wrap:wrap;margin-top:40px;}' +
      '#bt-manifesto .vals div{font-size:13px;color:#6B6F75;max-width:170px;}' +
      '#bt-manifesto .vals strong{display:block;font-size:16px;color:#1A1A1A;margin-bottom:3px;}' +
      '</style>' +
      '<div class="bt-wrap">' +
        '<span class="bt-eyebrow">Co děláme</span>' +
        '<div class="big">Neprodáváme jen stroje. Pomáháme lidem vybrat techniku pro jejich práci, ' +
          'kterou si chtějí <em>prožít</em>, ne jen odbýt.</div>' +
        '<div class="vals">' +
          '<div><strong>Tvoříme prostor</strong>pro vaši vizi</div>' +
          '<div><strong>Síla a odvaha</strong>ne strach</div>' +
          '<div><strong>Otevřenost</strong>nasloucháme, reagujeme</div>' +
          '<div><strong>Trvalost</strong>jsme s vámi i v dalších letech</div>' +
        '</div>' +
      '</div>');
    predFooter(manifesto);
  });
})();
