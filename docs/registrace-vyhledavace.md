# Registrace webu ve vyhledávačích krok za krokem

Jak dostat nový web do vyhledávačů (Google, Bing, Seznam). Web sám je na to připravený (mapa webu, `robots.txt`,
popisy stránek, strukturovaná data, viz README enginu „Vyhledávače (SEO)“); tady jsou kroky, které musí udělat člověk
se svým účtem. Stav a data kontrol konkrétního webu patří do checklistu jeho obsahového repa, ne sem.

**Co je potřeba mít po ruce:** přístup k DNS domény (u registrátora) nebo možnost upravit `site.config.yaml` v repu
webu (ověření značkou `<meta>`, `site.verification`), účet Google (nejlépe ten, pod kterým běží Google Analytics webu),
účet Microsoft (pro Bing), účet Seznam.

## 0. Než začneš (5 minut)

- [ ] Web je nasazený a otevře se: <https://<adresa webu>/>
- [ ] Mapa webu se otevře a vypíše stránky: <https://<adresa webu>/sitemap.xml>
- [ ] `robots.txt` odkazuje na mapu: <https://<adresa webu>/robots.txt>
- [ ] Strukturovaná data jsou bez chyb: [Test výsledků s rozšířenými funkcemi](https://search.google.com/test/rich-results)
      (zadej adresu úvodní stránky a jednoho díla) a [Schema.org Validator](https://validator.schema.org/).

## 1. Google (svět i Česko, nejdůležitější)

V Česku dnes vyhledává většina lidí přes Google, je to první krok.

- [ ] Otevři [Google Search Console](https://search.google.com/search-console) a přihlas se.
- [ ] **Přidat službu.** Dvě možnosti, stačí jedna:
  - **Doména** `<doména>` (doporučeno: pokrývá celou doménu i budoucí podweby). Google ukáže
    záznam **TXT** (`google-site-verification=…`). Vlož ho v DNS u registrátora, počkej (minuty až
    hodiny) a klikni na **Ověřit**.
  - **Předpona adresy URL** `https://<adresa webu>/`. Nejrychlejší je ověření přes
    **Google Analytics** (účet, který má k měřicímu ID webu práva úprav). Případně přes **značku HTML**:
    kód (`content="…"`) vlož do `site.config.yaml` → `site.verification.google`, nasaď web a klikni na **Ověřit**.
- [ ] **Sitemaps** (v levém menu): zadej `sitemap.xml` a odešli. Stav má být „Úspěch“ a počet
      nalezených adres odpovídá počtu stránek (úvod, tvorba, kolekce, roky, díla, O mně, Kontakt).
- [ ] **Kontrola adresy URL**: zadej postupně úvodní stránku, `/o-mne/` a `/tvorba/` a u každé
      klikni na **Požádat o indexování**. Urychlí to první návštěvu robota.
- [ ] Nastavení → Uživatelé: přidej druhého správce (autorka nebo správce webu), ať přístup nezávisí na jednom účtu.
- [ ] Za **1–2 týdny** zkontroluj: **Stránky** (kolik je indexovaných a proč případně ne),
      **Vylepšení** (drobečková navigace bez chyb), **Výkon** (na jaké dotazy se web ukazuje).
- [ ] Nepovinný úklid: v Sitemaps služby `<doména>` jsou staré mapy jiných webů domény
      (pokud doména má víc webů); s tímto webem nesouvisí, jdou odebrat.

## 2. Bing (svět; jeho výsledky používají i další vyhledávače, např. DuckDuckGo a Yahoo)

- [ ] Otevři [Bing Webmaster Tools](https://www.bing.com/webmasters) a přihlas se účtem Microsoft
      (nebo Google).
- [ ] Nejjednodušší: **Importovat z Google Search Console**. Převezme ověřený web i mapu webu,
      nic dalšího není potřeba.
- [ ] Jinak **Přidat web** `https://<adresa webu>/` a ověřit: záznam v DNS, nebo značka
      `msvalidate.01` → kód do `site.config.yaml` → `site.verification.bing`, nasadit, ověřit.
- [ ] **Sitemaps**: odeslat `https://<adresa webu>/sitemap.xml`.
- [ ] **URL Submission**: odeslat úvodní stránku a `/o-mne/`.
- [ ] Za 1–2 týdny zkontrolovat přehled (indexované stránky, chyby procházení); počet indexovaných ukazuje
      **Site Explorer**. Když se do pár měsíců nepohne, odeslat mapu webu znovu a hlavní stránky přes URL Submission.

## 3. Seznam.cz (Česko)

Seznam má vlastního robota a vlastní výsledky; pro český web se vyplatí.

- [ ] Vyhledej službu **Seznam Webmaster** (nástroj Seznamu pro správce webů) a přihlas se účtem Seznam.
- [ ] **Přidat web** `https://<adresa webu>/` a ověřit vlastnictví způsobem, který nabídne. Pro
      značku `<meta name="seznam-wmt" …>`: kód do `site.config.yaml` → `site.verification.seznam`,
      nasadit, ověřit.
- [ ] Mapa webu: Seznam Webmaster zadání mapy nenabízí; robot ji najde sám přes `robots.txt`
      (`Allow: /` a `Sitemap: https://<adresa webu>/sitemap.xml`).
- [ ] **Přidat URL do hledání** (vlevo „Další nástroje“): odeslat `/tvorba/`, `/tvorba/kolekce/`,
      `/o-mne/`, `/kontakt/`; z nich se robot dostane po odkazech k dílům.
- [ ] Za 1–2 týdny zkontrolovat, zda Seznam stránky prochází a nehlásí chyby (Přehled: „V indexu“). Ověřit i
      hledáním `site:<adresa webu>` přímo na seznam.cz. „Pokusné stažení“ ukáže, jak stránku vidí robot (do pole celá adresa, např.
      `<adresa webu>/tvorba/`).

## 4. Mimo vyhledávače: odkazy, které webu dodají důvěru

Vyhledávače berou web vážně, když na něj odkazují místa, která už znají. Tohle pomůže víc než
cokoli v kódu:

- [ ] **Instagram** autorky: odkaz na web v profilu (bio).
- [ ] **Fler**: odkaz na web v profilu obchůdku (až bude). Adresu obchůdku pak doplnit do
      `site.config.yaml` → `site.fler` (web ji ukáže a vyhledávače spojí oba profily s autorkou).
- [ ] Kroužek, plenéry, kamarádi, místní zpravodaj: kde je to přirozené, odkaz na web nebo na konkrétní obraz.
- [ ] Sdílet odkazy na nové obrazy (náhled se ukáže sám, web na to má obrázky).

## 5. Průběžně

- [ ] Každý měsíc mrknout do Search Console (Výkon, Stránky). Nová díla se do mapy webu dostanou
      sama, nic se znovu neodesílá.
- [ ] Popisy děl psát lidsky a konkrétně (kde, kdy, co je na obraze, jaký papír): přesně to se
      ukazuje ve výsledcích hledání.
- Ve výsledcích hledání se u obrazu na prodej ukazuje jen to, že je na prodej, nikdy cena (rozhodnutí enginu).

## Kolik to trvá

Google a Bing obvykle začnou ukazovat nový web za několik dní až týdnů od odeslání mapy webu;
Seznam bývá pomalejší. Hledání podle jména (jméno autorky) se chytí nejdřív, obecné dotazy
(„akvarel Šumava“) až s více obrazy, popisy a odkazy odjinud.
