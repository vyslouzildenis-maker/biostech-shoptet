# Bios TECH — design pro Shoptet

Soubory pro úpravu vzhledu Shoptet e-shopu **793755.myshoptet.com** (šablona **Classic**, generace 3).

| Soubor | Co dělá |
|---|---|
| `bios-tech.css` | Vzhled — barvy, fonty (Montserrat), horní lišta, hlavička, menu, tlačítka, produktové karty, benefit banner, patička |
| `bios-tech.js` | Doplňky — stín hlavičky při scrollu, tlačítko „zpět nahoru" |

Princip: soubory leží na GitHubu, do Shoptetu se přes HTML editor vloží odkaz, který je natáhne z CDN. Úpravu vzhledu pak děláš v těchto souborech, ne v administraci.

---

## 1. Nahrání na GitHub

1. Na [github.com](https://github.com) vytvoř **veřejný (public)** repozitář, např. `biostech-shoptet`.
   Repozitář **musí být public** — z privátního CDN soubory nenačte.
2. Nahraj do něj `bios-tech.css` a `bios-tech.js`
   (tlačítko **Add file → Upload files**, pak **Commit changes**).

## 2. Odkazy přes jsDelivr (CDN)

Soubory se servírují přes **jsDelivr**, ne přes `raw.githubusercontent.com` — raw posílá CSS jako `text/plain` a prohlížeč ho jako styl odmítne. jsDelivr posílá správný MIME typ a je rychlý (CDN cache).

Tvar URL:

```
https://cdn.jsdelivr.net/gh/UCET/REPO@main/bios-tech.css
https://cdn.jsdelivr.net/gh/UCET/REPO@main/bios-tech.js
```

- `UCET` — tvé GitHub jméno
- `REPO` — název repozitáře (`biostech-shoptet`)
- `main` — větev (u nových repozitářů `main`)

## 3. Vložení do Shoptetu

V administraci: **Vzhled a obsah → Editor HTML kódu** → pole **„HTML kód v hlavičce stránky (`<head>`)"**.

Vlož tento blok (uprav `UCET/REPO`):

```html
<!-- Bios TECH design -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/UCET/REPO@main/bios-tech.css">
<script src="https://cdn.jsdelivr.net/gh/UCET/REPO@main/bios-tech.js" defer></script>
```

Ulož. E-shop má nový vzhled.

## 4. Aktualizace designu

Po commitu nové verze drží jsDelivr starou verzi v cache (u `@main` až 7 dní). Vyčistíš ji jednorázovým načtením těchto URL v prohlížeči:

```
https://purge.jsdelivr.net/gh/UCET/REPO@main/bios-tech.css
https://purge.jsdelivr.net/gh/UCET/REPO@main/bios-tech.js
```

Pro ostré nasazení je čistší verzovat přes git tag — `@v1.0.0` místo `@main`. Cache je pak neměnná a změnu nasadíš zvýšením čísla v odkazu.

---

## Poznámky k rozsahu

- CSS cílí na šablonu **Classic** (gen 3). Globální části — barvy, fonty, tlačítka, produktové karty, hlavička, horní lišta, menu, benefit banner, patička — sedí na celý e-shop.
- **Patička** šablony Classic je minimální (jen copyright). Bohatou patičku z návrhu nejde udělat čistým CSS — víceřádkový obsah se přidává v administraci Shoptetu.
- **Detail produktu** a **košík** jsou nastylované best-effort na stabilní Shoptet třídy. Na přesné doladění pošli HTML zdroj detailu produktu a košíku — selektory se pak zacílí napevno.
- Skript `bios-tech.js` jen přidává vizuální vrstvu, nesahá na košík ani formuláře. Když se nenačte, e-shop funguje a CSS drží samo.
