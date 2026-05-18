# Bios TECH — design pro Shoptet

Úprava vzhledu Shoptet e-shopu **793755.myshoptet.com** (šablona **Classic**).

| Soubor | Co dělá |
|---|---|
| `bios-tech.css` | Konzervativní overlay — barvy, fonty (Montserrat), tlačítka, produktové karty, hlavička, patička. Mění jen vzhled, **layout netknutý** → nemůže rozbít funkce. |
| `bios-tech.js` | Přidává na úvodní stránku nové sekce podle návrhu — hero, produktové linie, ACE, showroom, manifest. Jen přidává obsah, nesahá na košík/menu/checkout. |

Princip: dvě vrstvy nad standardním Shoptetem. Shoptet servíruje svoje CSS+JS (všechny funkce jedou nativně), tyto soubory navrch jen překryjí barvy a doplní sekce.

---

## 0. Nejdřív naprav rozbitý e-shop

Pokud je v e-shopu stará (rozbitá) verze: Administrace → **Vzhled a obsah → Editor HTML kódu** → z hlavičky smaž celý blok `<!-- Bios TECH design -->` → ulož. E-shop se vrátí na default. Pak pokračuj krokem 1.

## 1. Nahrání na GitHub

1. Veřejný (**public**) repozitář na [github.com](https://github.com), např. `biostech-shoptet`.
2. Nahraj `bios-tech.css` a `bios-tech.js` (Add file → Upload files → Commit).

## 2. Vložení do Shoptetu

Administrace → **Vzhled a obsah → Editor HTML kódu** → pole **„HTML kód v hlavičce stránky (`<head>`)"**. Vlož (uprav `UCET/REPO`):

```html
<!-- Bios TECH design -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/UCET/REPO@main/bios-tech.css">
<script src="https://cdn.jsdelivr.net/gh/UCET/REPO@main/bios-tech.js" defer></script>
```

`UCET` = GitHub jméno (např. `vyslouzildenis-maker`), `REPO` = název repozitáře.
jsDelivr se používá schválně — `raw.githubusercontent.com` servíruje CSS jako `text/plain` a prohlížeč ho odmítne.

## 3. Doplň odkazy v sekcích

V `bios-tech.js` nahoře je objekt `LINKS` — doplň reálné URL kategorií:

```js
var LINKS = {
  katalog:  '#products-1',   // hero: "Prohlédnout stroje"
  testride: '/kontakty/',    // rezervace / kontakt
  hobby:    '/',             // karta linie Rhino  — doplň URL kategorie
  profi:    '/',             // karta linie M3     — doplň URL kategorie
  ace:      '/'              // karta linie ACE    — doplň URL kategorie
};
```

## 4. Aktualizace

jsDelivr cachuje (u `@main` až 7 dní). Po commitu vyčisti cache načtením:

```
https://purge.jsdelivr.net/gh/UCET/REPO@main/bios-tech.css
https://purge.jsdelivr.net/gh/UCET/REPO@main/bios-tech.js
```

---

## Co je a není pokryto

- **Funguje vše** — košík, vyhledávání, menu, varianty, filtry, checkout jsou Shoptetovy, netknuté.
- **CSS** přebarví celý e-shop (paleta Bios TECH: černá / antracit / hrášková, Montserrat). Žádné zásahy do layoutu → strukturu rozbít nemůže.
- **JS** přidá na homepage bespoke sekce z návrhu. Běží jen na úvodní stránce, ostatní stránky nechá být.
- Bespoke layout produktové karty / detailu (zaoblené plovoucí karty s mezerami) **není** — Shoptet Classic má karty v pevné flex mřížce se sdílenými rámečky. Měníme jen jejich barvu a rámeček, ne strukturu. Pixelově přesná shoda s návrhem by znamenala blank-mode custom theme (zastaralé, rizikové) — nedoporučeno.
