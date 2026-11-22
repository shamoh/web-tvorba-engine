# Návod pro autorku: obsah webu

Obecný návod k obsahovému repu webu postaveného na enginu: jak přidat obraz, psát texty, zakládat kolekce a co se pak
s obsahem děje. Obsahové repo autorky je **soukromé** (originální fotky obrazů, jejich popisy, kolekce a fotky na
stránky); web samotný (nastavení a to, co z obsahu vyrobí pipeline) je v **repu webu**, kód v tomto enginu. Obsahové
repo má vlastní README jen s tím, co je u autorky jinak (adresa webu, její kolekce, kontakty na správce).
V příkladech níže je `<adresa webu>` adresa konkrétního webu a `<obsahové repo>` jeho obsahové repo na GitHubu.

```
tvorba/zatisi-s-jablky.jpg          fotka obrazu bez kolekce (master)
tvorba/zatisi-s-jablky.yaml         popis obrazu
tvorba/2026-plener-sumava/          kolekce (složka), v ní její obrazy
  _index.yaml                       popis kolekce
  _cover.jpg                        úvodní fotka kolekce (nepovinné)
  tetrivci-slat.jpg + .yaml         obraz kolekce a jeho popis
  tetrivci-slat/                    detailní fotky obrazu (nepovinné)
fotky/portret.jpg + portret.yaml    fotky na stránky O mně a Kontakt
stranky/o-mne.yaml                  text stránky O mně (a popis pro vyhledávače)
stranky/kontakt.yaml                text stránky Kontakt (a popis pro vyhledávače)
stranky/404.yaml                    text stránky, která se ukáže na neexistující adrese
stranky/podminky-uziti.yaml         stránka Podmínky užití (co lidé smějí s tvými obrazy; odkaz v patičce za ©)
stranky/kurzy.yaml                  stránka Kurzy (/kurzy/), jen když ji založíš (nepovinné)
stranky/detail-dne.yaml             texty hry Detail dne a vlastního kvízu Můj Detail dne
roky/2026.yaml                      text o roce a úvodní obraz roku (nepovinné, na stránce roku)
roky/2026.jpg                       vlastní úvodní fotka roku (nepovinné)
_index.yaml                         úvodní stránka: text vedle velkého obrazu a úvodní obraz
_cover.jpg                          vlastní úvodní fotka úvodní stránky (nepovinné)
export/fler/<kolekce>/<obraz>/      fotky pro Fler s podpisem, složka pro každý obraz (vznikají automaticky)
export/instagram/<kolekce>/<obraz>/ fotky pro Instagram, složka pro každý obraz (vznikají automaticky)
export/draft/<kolekce>/<obraz>/     náhledy ořezu rozpracovaných obrazů (vznikají automaticky, po zveřejnění zmizí)
export/detail-dne/<kolekce>/<obraz>/ výřezy hry Detail dne v obraze a vynechaná místa (vznikají automaticky)
```

**Složka `export/` není ve větvi `main`**, ale ve větvi **`main_binary`** (a u každé jiné větve v `<větev>_binary`):
`<obsahové repo>` → větev `main_binary` → `export/`. Na GitHubu ji otevřeš
i přepnutím větve vlevo nahoře nad soubory. Tahle větev má vždy jen jeden commit s aktuálním stavem a každé
zpracování ji celou nahradí, takže se v repu nehromadí staré verze fotek. Nic v ní neukládej, přepíše se.

Soubory, které nejsou obrazy, mají dvě stálá jména s podtržítkem na začátku:
`_index.yaml` je popis místa, kde leží (v kořeni úvodní stránky, ve složce kolekce
kolekce), `_cover.jpg` je jeho vlastní úvodní fotka. Dřívější jména `_kolekce.yaml`,
`_uvod.jpg`, `uvod.yaml` a `uvod.jpg` zpracování odmítne s chybou, že je potřeba
soubor přejmenovat.

Toto repo je **soukromé**. Na web (veřejné repo webu) se z popisů dostanou
jen veřejné údaje. Soukromá poznámka a komentáře v yaml tu zůstanou.

## Stručně: nové obrazy krok za krokem

Všechno jde v prohlížeči, v editoru **github.dev**: na stránce tohoto repa stiskni klávesu
**`.`** (tečka), nebo otevři `https://github.dev/<obsahové repo>`. Změny v editoru
odcházejí najednou tlačítkem *Commit & Push* (vlevo ikona *Source Control*).

1. **Vlastní větev:** vlevo dole klikni na `main` → *Create new branch…*, pojmenuj ji
   třeba `nove-obrazy` (bez mezer a diakritiky).
2. **Fotky:** přetáhni je myší do `tvorba/` (nebo do složky kolekce, např.
   `tvorba/2026-plener-sumava/`). Pak *Source Control* → zpráva (např. „Nové obrazy“) →
   *Commit & Push*.
3. **Počkej na automatiku:** na github.com v záložce **Actions** poběží „Zpracování obsahu“
   (minuta či dvě). Ke každé nové fotce připraví popis (`.yaml`) a uloží ho do tvé větve.
4. **Stáhni popisy do editoru:** v *Source Control* klikni na `…` → **Přijmout změny**
   (anglicky *Pull*; *Načíst změny* = *Fetch* jen zjistí, že něco nového je, ale do editoru
   to nedá). Nebo zavři github.dev a otevři ho znovu ve své větvi.
5. **Doplň popisy:** v každém novém `.yaml` oprav hodnoty označené `DOPLNIT` (název,
   datum, rozměry, technika, stav, cena…), slovo `DOPLNIT` smaž, a až je obraz hotový,
   přepni `meta_draft: true` na `meta_draft: false`. Pak znovu *Commit & Push*.
6. **Kontrola:** automatika popisy znovu projde. Zelená fajfka v **Actions** = v pořádku,
   červený křížek = něco opravit (co, je napsané v běhu v části *Summary*, ne v detailu
   jobu). Jména souborů v souhrnu jsou odkazy: klikneš a otevře se ten soubor v té větvi, často rovnou na řádku
   s chybou. Souhrn je česky a chyby má úplně nahoře, seskupené po souborech: u každého
   souboru, co je špatně a jak to opravit. Pod nimi je „Ke kontrole“ (nic nezastaví, ale
   stojí za pohled; mimo jiné zakomentovaný údaj, který není nepovinný, např. `# id: TODO`:
   automatika ho nečte, takže nic neznamená, smaž ho, nebo ho odkomentuj), pak „Doporučení“ (nic nezastaví, jen by to web vylepšilo: obraz bez
   štítků, název s malým písmenem na začátku nebo s tečkou na konci, popis nebo popisek detailu
   s malým písmenem na začátku nebo bez tečky na konci, obraz na prodej bez mockupů; totéž u názvu
   a textu kolekce, u textu roku a úvodní stránky a u popisu a popisku fotek stránek; pod nimi sbalené
   „Zbývá doplnit“: u každého popisu, kterému ještě zůstalo `DOPLNIT` u komentáře, seznam těch atributů;
   péče o web: zveřejněný obraz bez rozměru nebo popisu, detailní fotka bez popisku, malá fotka obrazu (kratší strana
   pod 1350 px), rok nebo kolekce s žádným či jediným obrazem ve výběru autorky (úvodní obraz se nestřídá), obraz
   rozpracovaný déle než 30 dní a obraz s fotkami pro Instagram déle než 14 dní bez odkazu na příspěvek; pod „Štítky“
   jeden štítek ve dvou tvarech, např. „květina“ a „květiny“, dva štítky skoro vždy spolu a příliš mnoho
   štítků na víc než 2 řádky galerie), pak co automatika udělala a úplně dole kolik obrazů má který štítek. Opravíš v editoru a znovu *Commit & Push*.
7. **Zveřejnění:** na github.com se objeví žlutý pruh s tvou větví → *Compare & pull request*
   → *Create pull request*; až je u něj zelená fajfka, *Merge pull request* (a pak *Delete
   branch*).
8. **Hotovo, dál vše samo:** po sloučení automatika vyrobí fotky pro web, Fler a Instagram
   a web se aktualizuje sám (aktualizace se po kontrole sloučí automaticky). Nový obraz
   je na webu (`<adresa webu>`) zhruba do 10 minut. Když se něco
   zasekne, pondělní „Kontrola automatiky“ pošle správci webu e-mail.

Drobnou opravu jednoho popisu jde udělat i rovnou v `main` (tužkou na github.com nebo
v github.dev bez vlastní větve): po uložení se zveřejní sama, stejně jako v kroku 8.

Podrobnosti jsou níže (*Jak přidat obraz*, *Co se děje po nahrání*, *Nové obrazy ve vlastní větvi*).

> **Poznámka: žluté rámečky kolem českých písmen v github.dev** nejsou chyba v souborech.
> Editor běží v omezeném režimu (*Restricted Mode*) a zvýrazní každý znak mimo základní
> anglickou abecedu. Vypnutí: klikni na lištu *Restricted Mode* (nahoře nebo dole) a zvol
> *Trust* (důvěřovat), nebo v nastavení (`Cmd + ,`, na Windows `Ctrl + ,`) vyhledej
> `unicode highlight non basic ascii` a u *Editor › Unicode Highlight: Non Basic ASCII*
> nastav `false`.

## Jména souborů a složek

Všechno v `tvorba/`, `fotky/`, `roky/` a `stranky/` (fotky, popisy, kolekce i složky detailních fotek) se jmenuje
**jen malými písmeny bez diakritiky, číslicemi a pomlčkami**: `rano-u-rybnika.jpg`, `2026-plener-sumava`.
Jméno je zároveň adresa na webu a fotka i její popis se musí jmenovat stejně. Mezera, podtržítko, čárka, velké
písmeno (i v příponě: `.JPG`), háček, čárka nad písmenem, dvě pomlčky za sebou, pomlčka na začátku či konci nebo
přípona `.jpeg` (fotky jen `.jpg`) = chyba „přejmenuj soubor na …“ (s návrhem jména) a zpracování se zastaví,
dokud soubor nepřejmenuješ. Podtržítkem začínají jen `_index.yaml` a `_cover.jpg`.

## Jak přidat obraz

1. Fotku obrazu dej do složky `tvorba/`, nebo rovnou do složky kolekce, kam
   obraz patří (např. `tvorba/2026-plener-sumava/`, viz *Kolekce*). Složky
   podle roků nejsou: rok obrazu se bere z data v jeho popisu. Název souboru
   krátký, **jen malá písmena bez diakritiky, číslice a pomlčky místo mezer**:
   `rano-u-rybnika.jpg` (viz *Jména souborů a složek*).
2. Při zpracování vznikne vedle fotky popis `rano-u-rybnika.yaml`. Doplň v něm
   název, rozměry, techniku, stav, cenu a pár vět o obraze.
3. Až je popis hotový, přepni v něm `meta_draft: true` na `meta_draft: false`. Teprve pak se obraz
   objeví na webu. Do té doby zůstává jen tady: na web (ani do jeho veřejného repa) se
   nedostane popis ani fotka a nevzniknou mu ani exporty pro Instagram a Fler. Když
   zveřejněný obraz vrátíš na `meta_draft: true`, z webu i z exportů zmizí.

Řádek `id:` nech být. Je to trvalý kód obrazu, podle kterého web obraz pozná
i po přejmenování. Můžeš si ho napsat tužkou na zadní stranu obrazu. Na stránce obrazu je
v údajích jako poslední řádek „Kód“; vede na krátkou trvalou adresu `<adresa webu>/tvorba/<kód>/` a ikonka
vedle něj ho zkopíruje. Kód je i v `README.md` fotek pro Instagram a Fler a rozpracovaných obrazů v `export/draft/`
(u obrazu i v přehledu za názvem), takže
obraz podle něj dohledáš všude.

### Co automatika vyplní sama

Popisy (yaml) nemusíš psát od nuly. Automatika je založí při každém zpracování:
na `main` po nahrání, ve vlastní větvi taky (uloží je zpět do větve, viz
*Nové obrazy ve vlastní větvi*), u správce webu v počítači při `npm run images`.
Z obsahu fotky nic neodhaduje: vyplní jen výchozí hodnoty, které je potřeba
zkontrolovat a opravit.

**Nová fotka obrazu bez popisu** dostane vedle sebe `<název>.yaml`. Údaje v popisu jsou ve třech skupinách,
vždy v tomhle pořadí a uvnitř skupiny podle abecedy:

1. **`meta_…`** – pokyny pro zpracování, na web se nedostanou (`meta_corners`, `meta_draft`, `meta_edge`, `meta_fler`, `meta_game_skip`, `meta_instagram`, `meta_instagram_grid`, `meta_pinterest`, `meta_pinterest_version`).
2. **bez předpony** – údaje, které uvidí návštěvníci webu; první je vždy `id`.
3. **`private_…`** – soukromé, nikdy neopustí toto repo. Vlastní soukromý údaj si můžeš přidat kdykoli,
   stačí ho pojmenovat `private_…` (např. `private_kupec: teta Jana`); automatika ho nechá být.

| Údaj | Co tam automatika dá | Co s tím |
|---|---|---|
| `meta_corners` | rohy obrazu na fotce, doplní je automatika hned po popisu (bez `DOPLNIT`) | nechat; jen když ořez pozadí nesedí, upravit (viz *Ořez pozadí*) |
| `meta_draft` | `true` (bez `DOPLNIT`, výchozí hodnota platí) | přepnout na `false`, až je popis hotový (do té doby obraz na webu není) |
| `meta_edge` | `deckle` (bez `DOPLNIT`) | jak vypadá hrana obrazu ve scénách ateliéru pro Instagram: `deckle` papír s roztřepenou hranou, `cut` papír s čistou rovnou hranou, `canvas` plátno na rámu (olej, akryl): tlusté asi 2 cm s okrajem v barvách obrazu; plátno má i mockupy bez pasparty |
| `meta_fler` | `false` (bez `DOPLNIT`) | `true`, když chceš fotky pro Fler (jen u obrazu na prodej); po vložení odkazu `fler` zmizí, už nejsou potřeba |
| `meta_game_skip` | zakomentované `# meta_game_skip: [[1840, 0, 260, 3000]]` (`NEPOVINNÉ.`) | místa, ze kterých hra nesmí brát výřez (kroužková vazba, hřbet skicáku), nejlíp v editoru rohů, viz *Hra Detail dne* |
| `meta_instagram` | `false` (bez `DOPLNIT`) | `true`, když chceš fotky pro Instagram; po vložení odkazu `instagram` zmizí, už nejsou potřeba |
| `meta_instagram_grid` | zakomentované `# meta_instagram_grid: 3x3` (`NEPOVINNÉ.`) | odkomentovat jako sloupce x řádky, např. `3x3` (nebo `2x1`, `3x1`, `3x4`, od `1x1` do `5x5`) pro mřížku na profilu Instagramu, jen u výjimečného obrazu a spolu s `meta_instagram: true` (viz *Fotky pro Instagram a Fler*) |
| `meta_pinterest` | `false` (bez `DOPLNIT`) | `true`, když má obraz jít na Pinterest (viz *Pinterest*) |
| `meta_pinterest_version` | zakomentované `# meta_pinterest_version: 2` (`NEPOVINNÉ.`) | jen když chceš obraz na Pinterest připnout znovu: odkomentovat a zvýšit o 1 (viz *Pinterest*) |
| `id` | nový kód obrazu (bez `DOPLNIT`) | nechat, nikdy neměnit |
| `date` | den pořízení fotky (z jejích údajů EXIF), bez nich dnešek | zkontrolovat, opravit na den, kdy obraz vznikl (podle něj se obraz zařadí do roku) |
| `text` | `DOPLNIT popisek` pod `text: |` | napsat pár vět o obraze (viz *Jak psát texty*) |
| `description` | zakomentované `# description: …` (`NEPOVINNÉ.`) | jen když má Google ukazovat jiný popis než text (viz *Jak psát texty*) |
| `details` | se složkou detailních fotek vedle obrazu řádek pro každou fotku s „DOPLNIT popisek detailu“, jinak zakomentované `# details: { 1-mlha: Ranní mlha nad vodou }` (`NEPOVINNÉ.`) | popisky přepsat (viz *Detailní fotky obrazu*) |
| `featured` | `false` (bez `DOPLNIT`) | `true` = ve výběru autorky: má za názvem nenápadnou hvězdičku ★ (v galerii i na své stránce), návštěvníci ho najdou přepínačem „Doporučené“ v galerii a z 10 nejnovějších vybraných se náhodně střídá obraz nahoře na úvodní stránce, na stránce roku a na úvodu kolekce |
| `fler` | zakomentované `# fler: https://www.fler.cz/zbozi/…` (`NEPOVINNÉ.`) | odkomentovat a vložit odkaz na Fler, až bude (web ukáže „Koupit na Fleru“); fotky pro Fler pak zmizí |
| `game` | `true` (bez `DOPLNIT`) | `false` jen výjimečně: obraz do hry Detail dne nepatří (akt). Web ho pak ve hře nikdy neukáže a nedá se z něj udělat ani vlastní kvíz (viz *Hra Detail dne*) |
| `instagram` | zakomentované `# instagram: https://www.instagram.com/p/…` (`NEPOVINNÉ.`) | odkomentovat a vložit odkaz na příspěvek, až obraz zveřejníš na Instagramu (web ho u obrazu ukáže); fotky pro Instagram pak zmizí |
| `mockups` | `false` (bez `DOPLNIT`) | `true`, když chceš na webu obraz v rámu na zdi |
| `related` | zakomentované `# related: [k3f9a, chqmf]` (`NEPOVINNÉ.`) | odkomentovat a napsat kódy `id` souvisejících obrazů: stránka obrazu je ukáže dole pod „Související obrazy“, a to oběma směry (u druhého obrazu ho psát nemusíš). Rozpracovaný obraz se ukáže, až ho zveřejníš. Neznámý kód zpracování ohlásí jako chybu |
| `price` | zakomentované `# price: 2500` (`NEPOVINNÉ.`) | u `available` a `reserved` **odkomentovat a doplnit**, jinak chyba |
| `size_cm` | `[0, 0]`, v komentáři nejčastější rozměry papírů (Baohong, Khadi, Canson Montval A3/A4, Canson XL A3, Chamoix A3) | **doplnit** (šířka × výška v cm), bez toho po přepnutí na `meta_draft: false` zpracování ohlásí chybu |
| `status` | `not-for-sale` | změnit, pokud je na prodej (`available`) |
| `support` | zakomentované `# support: papír Canson XL Aquarelle (300 g), 100% celulóza` (`NEPOVINNÉ.`), v komentáři nejčastější papíry a karton Chamoix | odkomentovat a napsat podklad (třeba zkopírovat řádek z komentáře), když ho chceš na webu |
| `tags` | `[]` (bez `DOPLNIT`) | doplnit témata: podle nich se filtruje v galerii (návštěvník může vybrat víc najednou, každý výběr zúží) a vyhledávače je dostanou jako klíčová slova obrazu. Každý štítek je v galerii jeden čip, ať se všechny vejdou na 2 řádky: raději už použitý štítek ve stejném tvaru než nový (souhrn běhu radí pod „Štítky“) |
| `technique` | `DOPLNIT` | **doplnit**: nejčastější jsou v komentáři nad ním (akvarel, brush pen, tisk z výšky, kresba tužkou), stačí jednu zkopírovat; bez toho po přepnutí na `meta_draft: false` zpracování ohlásí chybu (podle ní vyhledávače poznají malbu, kresbu nebo grafiku); do 14 znaků se ve výběru Technika v galerii ukáže celá, delší souhrn běhu připomene |
| `title` | název podle jména souboru: `rano-u-rybnika.jpg` → „Rano u rybnika“, `Ráno u rybníka.jpg` → „Ráno u rybníka“ | opravit (hlavně diakritiku); do 40 znaků se celý vejde i do titulku ve výsledcích vyhledávání a v záložce prohlížeče, delší souhrn běhu připomene |
| `private_note` | zakomentované (`NEPOVINNÉ.`) | soukromá poznámka, odkomentovat, když chceš |

Kolekce v popisu není: obraz do ní patří tím, že leží v její složce (viz *Kolekce*).

Kontroly rozměrů, ceny a textů začínajících „DOPLNIT“ (název, popis, štítky, popisky detailů…)
platí až od `meta_draft: false`, takže rozpracovaný popis zpracování nezastaví.

**Popis napsaný ručně** (bez řádku `id:`) dostane kód a všechno ostatní, co
v něm chybí (viz *Popisy udržuje automatika*).

**Kolekce:** když v `tvorba/` vznikne nová složka (kolekce) bez popisu, vznikne
v ní `_index.yaml` s názvem podle složky (rok z předpony se přesune na konec:
`2026-plener-sumava` → „Plener sumava 2026“, diakritiku je potřeba doplnit)
s názvem podle souboru (bez diakritiky, opravit), textem `DOPLNIT popisek` připraveným pod `text: |` a zakomentovanými
nepovinnými `cover`, `aspect`, `focus` a `private_note`.

**Roky** (`roky/`): ke každému roku, ve kterém je nějaký obraz, vznikne `roky/<rok>.yaml`
s prázdným textem. Text je nepovinný (viz *Text o roce*); prázdný se na webu neukáže.

**Fotky na stránky** (`fotky/`): vznikne `<název>.yaml` s `alt` podle jména
souboru (opravit na popis toho, co je na fotce), zakomentovaným `caption` a
`focus: [50, 50]`.

Nové popisy jsou v souhrnu běhu v záložce **Actions** v části „Nové popisy
k doplnění“, přidělené kódy v „Přidělené kódy obrazů“, doplněné a srovnané
popisy v „Srovnané popisy“.

### Popisy udržuje automatika (DOPLNIT, NEZNÁMÝ)

Každý popis (obraz, kolekce, fotka) obsahuje **všechny údaje, které web umí**,
vždy ve stejném pořadí: nejdřív `meta_…`, pak údaje bez předpony (`id` první, dál podle
abecedy), nakonec `private_…` (viz tabulka výše). Nad každým údajem je komentář, co znamená a jaké hodnoty
má (ve všech souborech stejný, udržuje ho automatika). Mezi údaji je prázdný řádek.

- **`DOPLNIT`** na začátku komentáře znamená: tuhle hodnotu je potřeba zkontrolovat
  nebo vyplnit. V nové kostře je u všeho kromě `id`. Až je hodnota v pořádku,
  slovo `DOPLNIT` smaž (komentář nech). Automatika ho nikdy sama nesmaže.
  Zveřejněné obrazy (`meta_draft: false`), kterým `DOPLNIT` zůstal, vypíše souhrn
  každého zpracování v části „Zveřejněné obrazy, kterým zůstal DOPLNIT“
  (jen upozornění, obraz na webu zůstane).
- **Nový údaj:** když správce webu přidá webu něco nového (třeba „použité barvy“),
  automatika ho při dalším zpracování **doplní do všech popisů**, i do starých
  obrazů, s hodnotou, která na webu nic nezmění, a s `DOPLNIT`. Stačí pak
  hledat `DOPLNIT`.
- **Výchozí hodnota bez `DOPLNIT`:** `meta_draft`, `meta_edge`, `tags`, `meta_instagram`, `meta_pinterest`, `mockups` a `featured`
  dostanou hodnotu, která rovnou platí (`meta_draft: true`, `meta_edge: deckle`, `tags: []`, ostatní `false`), takže je
  není potřeba kontrolovat a `DOPLNIT` u nich není.
- **Zakomentovaný údaj** (řádek jako `# aspect: "3:2"` nebo `# price: 2500` pod popisem
  začínajícím `NEPOVINNÉ.`): nepovinný údaj, který je vypnutý. Takové jsou `support`,
  `details`, `price`, `fler`, `instagram` a `private_note` u obrazů, `cover`, `aspect`, `focus` a
  `private_note` u kolekcí, roků a úvodu a `caption` u fotek. Je v popisu jen proto, abys věděla, že existuje a jak se píše.
  Zapneš ho smazáním `# ` na začátku řádku (a případně změnou hodnoty). Když ho
  zase nechceš, stačí hodnotu smazat, automatika ho zakomentuje zpátky. `DOPLNIT`
  u něj nikdy není.
- **`NEZNÁMÝ`:** údaj, který web nezná (nejspíš překlep, např. `mockup:` místo
  `mockups:`), automatika nesmaže, jen ho dá na konec souboru a označí. Oprav
  jeho název, nebo ho smaž. Dokud v některém popisu je, pondělní kontrola
  automatiky pošle e-mail (issue) se seznamem. Vlastní údaj začínající `private_`
  neznámý není: automatika ho nechá mezi ostatními `private_…` a na web se nedostane.
- **Starý název údaje** (`draft` místo `meta_draft`):
  zpracování skončí chybou „přejmenováno na meta_draft, přejmenuj ho“ a popis nechá, jak je.
  Pozor na starý zápis `instagram: true`: dřív tak se jmenovalo dnešní `meta_instagram`, teď `instagram:`
  znamená odkaz na příspěvek, takže zpracování ohlásí „instagram musí být odkaz na příspěvek na Instagramu“.
  Stačí údaj přejmenovat, automatika to za tebe neudělá, aby se nic nezveřejnilo omylem.
- **Vlastní poznámka:** komentář napsaný nad údaj (nad ten automatický) zůstane.
  Komentář úplně nahoře v souboru zůstane nahoře.
- **Smazaný údaj:** stačí smazat údaj s hodnotou (třeba `meta_corners`), jeho automatický komentář můžeš
  nechat. Automatika ho uklidí, a když údaj znovu doplní, je komentář v souboru jen jednou. Kopii automatického
  komentáře nad jiným údajem nikdy nebere jako tvou poznámku; tvou poznámku pozná podle toho, že se od něj liší.
  Kolik takových komentářů uklidila, ukáže souhrn běhu u souboru („uklizené zbloudilé komentáře: 1“).
- **Zakomentovaný údaj:** smazáním `# ` se zapínají jen nepovinné údaje (s `NEPOVINNÉ.` v komentáři). Jiný
  zakomentovaný údaj (např. `# id: TODO`) automatika nečte a souhrn běhu ho ukáže v „Ke kontrole“.
- Hodnoty automatika nikdy nemění, jen přidává chybějící údaje a srovnává pořadí
  a komentáře. Stane se to při každém zpracování (i ve větvi) a změny uloží zpět.
  Když si pak v počítači popisy upravuješ, nejdřív si je stáhni (`git pull`).

### Co je v popisu

Začátek popisu obrazu (celý popis vytvoří automatika):

```yaml
# Popis obrazu – kostru vytvořila pipeline podle fotky.

# Rozpracovaný obraz, možnosti:
# - true - rozpracovaný, na webu se nezobrazí
# - false - zveřejnit
meta_draft: false

# Fotky pro Fler, možnosti:
# - true - připravit, dokud obraz nemá odkaz fler (export/fler: originál a mockupy s podpisem)
# - false - žádné (cena a stav prodeje na webu Fler nepotřebují, obraz se může prodávat i napřímo)
meta_fler: false

# Fotky pro Instagram, možnosti:
# - true - připravit, dokud obraz nemá odkaz instagram (export/instagram: s popiskem na 3 pozadích, ve 3 scénách ateliéru, panorama pro karusel, příběh, detailní fotky)
# - false - žádné
meta_instagram: false

# Trvalý kód obrazu: podle něj web pozná obraz i po přejmenování (krátká adresa /tvorba/<id>/).
# Generuje ho pipeline, NIKDY neměnit. Hodí se napsat tužkou na zadní stranu obrazu.
id: k3f9a

# malováno za úsvitu, datum je na zadní straně
# Den vzniku ve tvaru 2026-06-14. Rok z něj určuje rok obrazu na webu (stránka roku, adresa).
date: 2026-06-14

# DOPLNIT Pár vět o obraze, zobrazí se na jeho stránce.
# Piš ho pod „text: |“, každý řádek odsazený dvěma mezerami:
#   - …
text: |
  DOPLNIT popisek
```

**Text (`text`):** jak ho psát a formátovat, je v *Jak psát texty*. Když text začne na kraji místo pod `text: |`,
zpracování to pozná a napíše přesně, co opravit („text: text pod „text:“ musí být odsazený…“ s ukázkou).

Řádek „malováno za úsvitu…“ je vlastní poznámka, `DOPLNIT` u `text` znamená,
že text ještě není hotový. U údajů s pevnými možnostmi (`status`, `meta_draft`, `meta_instagram`,
`mockups`, `featured`) jsou možnosti v komentáři vypsané pod sebou, každá na svém řádku. Jiná hodnota
(třeba překlep `availble`) je chyba, i u rozpracovaného obrazu: souhrn běhu vypíše, které možnosti platí. Všechny údaje obrazu a co s nimi je v tabulce výše.

### Stav obrazu

| `status` | Na webu | Fotky pro Fler |
|---|---|---|
| `available` | K prodeji, s cenou a tlačítky | ano |
| `reserved` | Rezervováno | ano |
| `sold` | V soukromé sbírce, bez ceny | ne |
| `gifted` | V soukromé sbírce, bez ceny (web neprozradí, že byl darovaný) | ne |
| `not-for-sale` | nic, obraz je bez štítku | ne |

**Mockupy** (obraz v rámu na zdi) si zapínáš sama řádkem `mockups: true`, ať se
obraz prodává, nebo ne. Nový popis má `mockups: false`. U obrazu na prodej je nad
nimi „Jak by mohl vypadat u vás“, u ostatních „Jak by mohl vypadat na zdi“, pod nadpisem čára
s mockupy, každý s popiskem „<scéna> (vizualizace)“, a pod nimi drobná poznámka „Vizualizace – rám je
jen pro představu.“ Fotky pro Fler
dostanou mockupy jen u obrazu na prodej. Když `true` změníš na `false`, mockupy
zmizí.

Plátno (`meta_edge: canvas`) visí v mockupu vždy bez pasparty: podle scény v liště
přímo na plátně (obývák večer), ve stínovém rámu se spárou (ložnice a ostatní scény), nebo
úplně bez rámu jen se stínem na zdi (komoda).

Mockup ukazuje vždy jen samotný papír. Když správce webu fotku obrazu srovná
nástrojem (`npm run straighten`), je na fotce na webu kolem papíru úzký pruh
podlahy, aby byly vidět jeho okraje. V rámu na zdi ho pipeline sama ořízne.

Obraz `available` nebo `reserved` **musí mít cenu** (`price: 3200`; v popisu je zakomentovaná,
smaž `# ` na začátku řádku a napiš cenu). Bez ní
zpracování skončí chybou a napíše, u kterého obrazu cena chybí.

Prodaný obraz: změň `status` na `sold`. Fotky pro Fler se pak samy smažou,
mockupy zůstanou (když je nechceš, dej `mockups: false`) a obraz zůstane na webu
jako součást tvorby. Darovaný obraz: totéž se `status: gifted`.

Na webu jde filtrovat podle stavu: „na prodej“ (`available` a `reserved`, tedy co se
prodává a ještě neprodalo), „ještě mám“ (vše kromě prodaných a darovaných) a „už nemám“
(`sold` a `gifted`); volba, pod kterou zatím žádný obraz není nebo která ukáže všechny
obrazy stránky, se nenabízí (stejně přepínač „Výběr autorky“). Štítek stavu (K prodeji, Rezervováno, u prodaných i darovaných stejně „V soukromé sbírce“) je na kartě
v galerii i na stránce obrazu.

## Detailní fotky obrazu

Chceš u obrazu ukázat zajímavý detail? Vytvoř vedle fotky složku se stejným
názvem jako obraz a dej do ní detailní fotky:

```
tvorba/2026-plener-sumava/rano-u-rybnika.jpg
tvorba/2026-plener-sumava/rano-u-rybnika/1-mlha.jpg
tvorba/2026-plener-sumava/rano-u-rybnika/2-rakos.jpg
```

Na webu budou jako malé náhledy pod popisem obrazu, po kliknutí se zvětší. Popisky (`details:`) můžeš formátovat
stejně jako text (tučně, kurzívou, odkaz; viz *Jak psát texty*).
Pořadí je podle názvu souboru, proto pomůže číslo na začátku. Složka se musí
jmenovat přesně jako popis obrazu (bez `.yaml`), jinak zpracování ohlásí chybu.
Detailní fotky se připraví i pro Instagram, pokud má obraz `meta_instagram: true`.

**Popisky:** do popisu obrazu přidej `details:` a pod něj řádky
„název fotky bez přípony: popisek“ (odsazené dvěma mezerami):

```yaml
details:
  1-mlha: Mlha nad hladinou, mokré do mokrého
  2-rakos: Rákos na břehu, suchým štětcem
```

Když nahraješ složku s detaily spolu s novým obrazem, automatika `details:` v novém popisu
rovnou vyplní: u každé fotky „DOPLNIT popisek detailu“, stačí přepsat. Ke staršímu popisu
řádky nepřidá, ty dopiš ručně.

Fotka bez popisku se na webu jmenuje „detail 1“, „detail 2“… Popisek k fotce,
která ve složce není (třeba překlep v názvu), zpracování ohlásí jako chybu. Chybou je i popisek, který
pořád začíná „DOPLNIT“, když obraz zveřejňuješ (`meta_draft: false`): přepiš ho, nebo řádek smaž.
Stejně se hlídá každý text, který uvidí návštěvníci: u obrazu (název, popis, štítky…) od `meta_draft: false`,
u kolekce, roku, úvodní stránky a fotek stránek vždy (ty se zveřejňují hned).
Na GitHubu: otevři složku, kde je obraz, *Add file → Upload files* a přetáhni celou
složku `rano-u-rybnika` z počítače.

## Text o roce

Na stránce roku (např. `<adresa webu>/tvorba/2026/`) je
nahoře vlevo nadpis „Tvorba 2026“ a pod ním můžeš mít pár vět za sebe: jaký byl rok, co se
v tvorbě dělo. Vpravo se náhodně střídají obrazy z tvého výběru z toho roku (`featured: true`).

Text se píše do `roky/2026.yaml` (automatika ho k roku sama založí):

```yaml
text: |
  Rok plenérů: **Šumava** v září, zahrada v létě…
  Víc řádků pod sebou, odsazených dvěma mezerami.
```

Nový rok dostane v kostře vzorový text „Můj oblíbený rok, rok 2026.“ (s číslem toho roku), který se hned
ukáže na webu; přepiš ho (dokud tam je, připomene ho souhrn v Doporučení). Bez textu (`text: ""`) je na stránce jen nadpis a obraz.

Úvodní obraz roku si můžeš vybrat stejně jako u kolekce (viz *Úvodní obraz*): `cover:`
s kódem obrazu z toho roku, nebo vlastní fotka `roky/2026.jpg`.

## Úvodní stránka

Text vedle velkého obrazu na úvodní stránce je v `_index.yaml` (v kořeni repa, automatika ho
založí se současným textem). Jsou tam i velký nadpis (`heading`, každý řádek je řádek nadpisu), text tlačítka
(`button`), text druhého tlačítka vedle něj, které promítne obrazy z výběru autorky (`button_show`, ukáže se jen
s aspoň jedním obrazem `featured: true`; `button_show: ""` tlačítko schová; totéž promítání je v patičce každé stránky
jako „Výběr“ a na Kontaktu pod „Promítnout“ vedle „Obrazy na prodej“) a dvě věty, které se ukážou, dokud na webu není žádný obraz (`empty_text`, `empty_closing`):

```yaml
heading: |
  Barvy, voda
  a trochu náhody
text: |
  Maluji hlavně akvarelem …
button: Prohlédnout tvorbu
button_show: ▶ Moje nejmilejší
# cover: k3f9a
# aspect: "3:2"
# focus: [50, 50]
```

Velký obraz nahoře se vybírá stejně jako u kolekce a roku (viz *Úvodní obraz*): `cover:`
s kódem kteréhokoli obrazu, nebo vlastní fotka `_cover.jpg` vedle `_index.yaml`.

## Jak psát texty

Každý text, který je na webu vidět (obraz, kolekce, rok, úvodní stránka, Mimo kolekce, stránky ve `stranky/`), se píše
stejně, jako `text: |`:

```yaml
text: |
  První odstavec. Řádky můžeš zalamovat, kde chceš,
  na stránce z nich bude jeden odstavec.

  Prázdný řádek začne nový odstavec. Tady je **tučně**, *kurzívou*
  a [odkaz na moje obrazy](/tvorba/).
```

- Pod `text: |` (svislá čára je důležitá), každý řádek odsazený dvěma mezerami. Kostra to má připravené.
- Zalomení řádku je na webu jen mezera; prázdný řádek začne nový odstavec; `""` = bez textu.
- Moc dlouhé řádky automatika sama zalomí a jinak zapsaný text (na jednom řádku, v uvozovkách, `>`) převede
  na `|`. Text se tím nemění.
- Vedle `text` může být `description`: krátký popis jen pro Google a náhled odkazu (třeba ve WhatsAppu), na
  stránce se neukáže. Je nepovinný (zakomentovaný `# description: …`); bez něj se použije začátek textu. Nejvýš
  160 znaků, bez formátování. U obrazu ho dostane i pin na Pinterestu.

**Formátování** v textu:

| Napíšeš | Na webu |
|---|---|
| `**slovo**` | **tučně** |
| `*slovo*` | *kurzívou* |
| `[moje obrazy](/tvorba/)` | odkaz na stránku tohoto webu (adresa začíná `/`, např. `/tvorba/?featured=1` = výběr autorky) |
| `[Fler](https://www.fler.cz/…)` | odkaz na jiný web (celá adresa s `https://`) |
| `[napište mi](mailto:…)` | odkaz na e-mail |
| `[PF 2025](chqmf)` | odkaz na jiný obraz podle jeho kódu `id` (najdeš ho v jeho popisu); funguje i po přejmenování nebo přesunu obrazu, rozpracovaný obraz zůstane bez odkazu, dokud ho nezveřejníš |
| `[](chqmf)` | totéž, textem odkazu bude název obrazu (doplní ho automatika na webu, v souboru zůstane `[](chqmf)`; po přejmenování obrazu se změní sám) |

Odkaz s jinou adresou (třeba jen `www.fler.cz`) zpracování ohlásí chybou; doplň `https://`. Stejně se dají formátovat
popisky detailních fotek (`details`). Jak bude text vypadat, uvidíš ještě před zveřejněním v přehledu
`export/README.md` (viz *Přehled všech obrazů*), i ve větvi. Kde se text ukazuje jako
čistý (bublina nad obrazem, Instagram, Fler, karta kolekce v přehledu), formátování zmizí a z odkazu zůstane jeho text.

Web sám hlídá, aby se řádek nezalomil tam, kde se to v češtině nedělá: za jednopísmennou předložkou nebo spojkou
(k, s, v, z, o, u, a, i), mezi číslem a jednotkou (5 cm, 20 %, 2 500 Kč), kolem × v rozměru (30 × 40 cm) a za
zkratkou (např., tzv., sv.), uvnitř data (15. 11. 2026), za pořadovým číslem (1. místo), před pomlčkou ve větě
a uvnitř rozsahu let (2019–2024; i když napíšeš „2019 - 2024“). Tři tečky „...“ web ukáže jako výpustku „…“. Platí v textech, v názvech obrazů a kolekcí i v textu
příspěvku pro Instagram a popisu pro Fler, které kopíruješ z `export/`. Nic zvláštního kvůli tomu nepiš, stačí
obyčejná mezera.

Dřív byl viditelný text v `description`; v říjnu 2026 ho automatika všude přejmenovala na `text` a `description`
od té doby znamená jen popis pro Google. Kdybys někde napsala text na stránku do `description`, na stránce se
neukáže (dostane ho jen Google).

## Texty stránek

Texty stránek jsou ve složce `stranky/`, jméno souboru je adresa stránky. Upravíš je přes web GitHubu (ikonka
tužky), po uložení se samy dostanou na web:

- `stranky/o-mne.yaml`: stránka O mně,
- `stranky/kontakt.yaml`: stránka Kontakt, navíc `location_label` = popisek nad místem, kde autorka žije (`site.location`) („Žiji a maluji“),
- `stranky/404.yaml`: stránka, kterou návštěvník uvidí na adrese, která neexistuje; navíc `title` (titulek
  v záložce prohlížeče) a `heading` (velký nadpis),
- `stranky/podminky-uziti.yaml`: stránka Podmínky užití (`/podminky-uziti/`, odkaz „Podmínky užití“ v patičce za ©): co lidé
  smějí s tvými obrazy, fotkami a texty (všechna práva vyhrazena, sdílení odkazem vítané, jinak jen s tvým svolením);
  navíc `title` (nadpis) a anglická část pod českou: `title_en` (nadpis) a `text_en` (text, `""` = bez anglické
  části). Výchozí text je obecný, přepiš ho, jak chceš,
- `stranky/kurzy.yaml`: stránka Kurzy na adrese `/kurzy/` (nepovinné, viz níže),
- `stranky/detail-dne.yaml`: texty hry Detail dne a vlastního kvízu (Můj Detail dne). Atributy jsou seskupené podle stránky
  (začátek jména; komentář nad každým říká, kde se ukáže):
  - `description` = hra Detail dne: popis pro Google a náhled odkazu,
  - `editor_…` = editor kvízu (`/detail-dne/muj-kviz/`): `editor_title` (titulek v záložce a náhledu odkazu),
    `editor_description` (náhled odkazu), `editor_text` (text pod větou „Kvíz z obrazu …“), nadpisy kroků
    (`editor_level`, `editor_place`, `editor_look`, `editor_preview`), věty (`editor_place_note`, `editor_offer`), tlačítka
    (`editor_auto`, `editor_share`, `editor_play`) a hlášky (`editor_no_work`, `editor_blocked`, `editor_copied`,
    `editor_copy_by_hand`, `editor_load_failed`),
  - `quiz_…` = kvíz (`/detail-dne/muj/`): `quiz_description` (náhled odkazu, který si lidé posílají), `quiz_text` (návod,
    když se stránka otevře bez odkazu), `quiz_drops_text` (rámeček na konci kola), tlačítka (`quiz_copy`, `quiz_copied`,
    `quiz_make`) a hlášky (`quiz_broken`, `quiz_load_failed`),
  - `work_link` = odkaz pod „Sdílet“ na stránce obrazu, který otevře editor kvízu.

  Texty `editor_text`, `quiz_text` a `quiz_drops_text` jdou formátovat; ostatní krátké texty jsou na jeden řádek bez
  formátování a povinné (prázdný automatika ohlásí), náhledy odkazů nejvýš 160 znaků. Pravidla „Jak se hraje“, verdikty,
  nápovědy a hodnosti jsou v kódu webu, protože čísla v nich počítá hra; stejně texty, které kvíz sdílí s hrou (otázka,
  „Tentokrát ne“). Když změníš `work_link`, uprav i jeho název v `quiz_text`.

O mně, Kontakt, 404 a Detail dne založila automatika s dosavadními texty, Podmínky užití s výchozím textem.

`text` a `description` se píšou jako všude (viz *Jak psát texty*). Navíc je tu `closing`:

```yaml
closing: |
  Poslední odstavec menším a světlejším písmem.
```

- `closing` je nepovinný: když ho zakomentuješ (`# closing: …`), závěrečný odstavec zmizí.
- Nadpis, menu, kontakty (e-mail, Instagram, …), formulář a fotky (`fotky/`) se tu nemění.

**Fotka v textu stránky:** do `text` stránky můžeš mezi odstavce vložit fotku ze složky `fotky/`. Napiš ji jako
samostatný odstavec (prázdný řádek nad ní i pod ní), jméno fotky bez `.jpg` a stranu:

```yaml
text: |
  Tento odstavec je přes celou šířku.

  [fotka: portret, vlevo]

  Tento a další odstavce fotku obtékají zprava. Až fotka skončí, text zase běží přes celou šířku.
```

- `vlevo` = fotka vlevo, text vpravo od ní; `vpravo` = naopak; bez strany (`[fotka: portret]`) = vlevo.
- Fotku posuneš výš nebo níž tím, že značku přesuneš mezi jiné odstavce.
- Pod fotkou je její popisek (`caption` v jejím yaml), pro nevidomé a vyhledávače její `alt`.
- Na mobilu je fotka mezi odstavci a text ji neobtéká.
- Na stránce O mně: když je v textu fotka, sloupec s portrétem vpravo zmizí (portrét vlož do textu sama).
- Fotka jde jen do `text` stránek ve `stranky/`, ne do `closing`, popisu pro Google ani do textů obrazů, kolekcí
  a roků. Neznámou fotku, jinou stranu než vlevo/vpravo nebo značku uprostřed odstavce zpracování ohlásí jako chybu.
- Jiný soubor do `stranky/` nepatří (zpracování ho ohlásí jako chybu).

**Stránka Kurzy:** když vytvoříš `stranky/kurzy.yaml`, objeví se na webu stránka `/kurzy/`; když ho smažeš, zmizí.
V menu nahoře ji nebude, dokud ji tam nepřidá správce webu. Navíc má `title` = její nadpis:

```yaml
title: Kurzy
text: |
  …
```

## Úvodní obraz (kolekce, rok, úvodní stránka)

Všude platí stejné pravidlo:

- **Nic nevybereš** (`cover` zakomentovaný nebo prázdný a žádná vlastní fotka): při každé návštěvě se náhodně ukáže
  jeden z 10 nejnovějších obrazů z tvého výběru (`featured: true`), a když žádný vybraný není,
  nejnovější obraz. Kliknutím se otevře.
- **Vybereš konkrétní obraz:** `cover: vjr39` (kód obrazu), nebo jeho detailní fotku
  `cover: vjr39#1-kvety-nahore`. Kliknutím se otevře.
- **Vybereš vlastní fotku:** `_cover.jpg` ve složce kolekce, `roky/2026.jpg`, nebo `_cover.jpg`.
  Připrav ji rovnou v podobě, v jaké ji chceš mít. Nikam nevede.
- Obraz se ukáže **celý, tak jak je**. Vybraný obraz (`cover` i vlastní fotku) můžeš oříznout:
  - `aspect`: poměr stran šířka:výška v uvozovkách, třeba `aspect: "3:2"`, široký `"2:1"`,
    čtverec `"1:1"`; když ho nevyplníš a vyplníš `focus`, bude čtverec `"1:1"`,
  - `focus: [zleva, shora]` v procentech: co zůstane vidět, třeba `focus: [50, 30]`; když ho
    nevyplníš a vyplníš `aspect`, bude střed `[50, 50]`,
  - obojí prázdné = bez ořezu. Stejný výřez je i náhled, když někdo pošle odkaz (Facebook, WhatsApp…).
- Náhodný obraz se neořezává: `aspect` nebo `focus` bez `cover` a bez vlastní fotky zpracování
  ohlásí jako chybu. Stejně tak
  vlastní fotka a `cover` zároveň, obraz odjinud (u kolekce z jiné kolekce, u roku z jiného
  roku) nebo obraz s `meta_draft: true`.

## Kolekce

Kolekce seskupuje obrazy, třeba z jednoho plenéru, nebo i téma přes víc let.
Má na webu vlastní stránku s názvem, popisem a úvodní fotkou, všechny kolekce
jsou přehledně na `/tvorba/kolekce/` (jde je tam vybrat podle roku: kolekce patří
ke každému roku, ze kterého má aspoň jeden obraz, a ukáže se s počtem obrazů z toho roku) a v galerii jde podle kolekce filtrovat (volba „žádná“ ukáže obrazy, které v žádné kolekci nejsou). Kolekce s nejnovějším
obrazem je na přehledu první; přehled má hledání v názvech a popisech kolekcí a
až jich bude víc než 12, rozdělí se na stránky. V galerii (Tvorba, každý rok a kolekce) jde hledat v názvech a popisech
obrazů (i podle `id` obrazu, např. „jujn2“; pod polem se ukáže „Enter otevře obraz“ a po Enteru se rovnou otevře stránka obrazu), proto se vyplatí do popisu napsat i slova, podle kterých by obraz někdo hledal (místo, motiv). Obrazy bez kolekce
mají na konci přehledu kolekcí vlastní položku „Mimo kolekce“. Její text a úvodní obraz nastavíš stejně jako u kolekce,
jen v souboru `tvorba/_index.yaml` (kostru založí zpracování): `text:` s pár větami (bez něj se ukáže
„Obrazy, které nepatří do žádné kolekce.“), `cover:` s kódem obrazu, který v žádné kolekci není
(případně `aspect` a `focus`), nebo vlastní fotka `tvorba/_cover.jpg`. Bez nich se střídají obrazy z tvého výběru.

**Kolekce je složka v `tvorba/`** a obrazy do ní patří tím, že v ní leží. Obrazy
přímo v `tvorba/` v žádné kolekci nejsou. Obraz může být nejvýš v jedné kolekci.

1. V `tvorba/` založ složku kolekce a nahraj do ní obrazy. Doporučený název
   začíná rokem: `2026-plener-sumava`. Z názvu složky vznikne adresa kolekce na
   webu (`/tvorba/kolekce/2026-plener-sumava/`), proto jen malá písmena bez
   diakritiky, číslice a pomlčky (viz *Jména souborů a složek*). Na GitHubu: *Add file → Upload files* a přetáhni celou složku
   z počítače, nebo při nahrání napiš do názvu souboru `2026-plener-sumava/`.
2. Při zpracování vznikne ve složce `_index.yaml`. Doplň v něm hezký název
   (`title: Plenér Šumava 2026`) a popis (v kostře je vzorová věta „Toto je moje nejvíc nejoblíbenější kolekce.“
   pod `text: |`, ta je hned vidět na webu: přepiš ji a mezery na začátku řádku nech, dokud tam je,
   připomene ji souhrn v Doporučení; viz *Jak psát texty*). Název do 19 znaků se ve výběru Kolekce v galerii ukáže celý, delší se
   tam zkrátí „…“ (celý je vidět po rozbalení výběru) a souhrn běhu to připomene v Doporučení. Složka se nesmí
   jmenovat `none` (tu adresu web používá pro obrazy bez kolekce), zpracování by ohlásilo chybu.
3. Úvodní obrázek kolekce si můžeš vybrat jedním z těchto způsobů (nebo nic,
   pak se náhodně střídají obrazy z tvého výběru v kolekci, `featured: true`,
   a když žádný vybraný není, použije se nejnovější obraz z kolekce):
   - vlastní fotka: nahraj ji do složky kolekce jako `_cover.jpg`,
   - jeden z obrazů kolekce: do popisu kolekce napiš `cover:` a kód obrazu
     (`id` z jeho popisu), např. `cover: vjr39`; obraz už nesmí mít `meta_draft: true`,
   - detailní fotka obrazu: za kód přidej `#` a název detailní fotky (bez
     přípony, bez mezer kolem `#`), např. `cover: vjr39#1-kvety-nahore`.
   Vlastní fotka a `cover` zároveň nejde, zpracování by ohlásilo chybu.
4. Úvodní obrázek se ukáže celý. Když ho chceš oříznout (třeba je vysoký), napiš do
   popisu kolekce `aspect: "3:2"` (nebo jiný poměr) a případně `focus: [zleva, shora]`
   v procentech, třeba `focus: [50, 30]` (bez něj střed). Když ořez nestačí, připrav široký detail obrazu a použij ho
   jako `cover`. Stejný výřez se použije i jako náhled, když někdo pošle odkaz na kolekci
   (Facebook, WhatsApp…). Viz *Úvodní obraz*.
5. Obraz přesuneš do jiné kolekce (nebo ven z kolekce) přesunem jeho souborů
   do jiné složky. Jeho adresa na webu se tím nezmění.

Co nejde: kolekce v kolekci (složka uvnitř kolekce smí být jen s detailními
fotkami obrazu), a řádek `collection:` v popisu obrazu, ten už se nepoužívá.
Obojí zpracování ohlásí jako chybu.

## Soukromá poznámka

Do `private_note` si piš cokoli jen pro sebe (komu se obraz líbil, za kolik šel,
co bys příště udělala jinak). Zůstane jen v tomto soukromém repu, na web se
nikdy nedostane. Totéž platí pro komentáře za `#`. Kolekce, roky a úvod mají `private_note` taky.
V novém popisu je zakomentovaná (`# private_note: …`): smaž `# ` a napiš svou poznámku.

## Ořez pozadí

Fotka obrazu bývá trochu křivá a kolem obrazu je vidět pozadí: podlaha, světlá zeď nebo bílý podkladový papír.
Automatika proto u každého obrazu najde **čtyři rohy obrazu** a zapíše je do jeho popisu jako `meta_corners`.
Všechno mimo čtyřúhelník mezi rohy (pozadí) je pak na webu **průhledné**: obraz leží přímo na papíru stránky a jeho okraj se do něj na posledním
kousku plynule prolne. Okraj tak kopíruje skutečný papír, i když je list na fotce pootočený. Obrázek se navíc
zmenší těsně na list, takže průhledný okraj zbyde jen v rozích pootočeného listu.

```yaml
meta_corners:
  photo: [3673, 2785]    # rozměr fotky (šířka, výška), pro kterou rohy platí
  tl: [87, 41]           # levý horní roh: kolik bodů doprava a dolů od levého horního rohu fotky
  tr: [26, 54]           # pravý horní: doleva a dolů od pravého horního rohu
  br: [52, 39]           # pravý dolní: doleva a nahoru
  bl: [12, 29]           # levý dolní: doprava a nahoru
```

- Rohy najde automatika **jednou**, u nového i už zveřejněného obrazu; tvoje úpravy pak nechá být. V souhrnu běhu
  (záložka **Actions**) jsou v části „Nalezené rohy obrazu“; obraz, u kterého se v některém rohu ořízne víc než 5 %,
  je označený **⚠ PODEZŘELÝ ořez**: ten zkontroluj nejdřív.
- Čísla jsou body (pixely) fotky směrem do středu. Větší číslo = ořízne víc. Nuly = papír vyplňuje celou fotku.
- `meta_corners: false` = nic neořezávat (obraz zůstane celý, i s pozadím).
- **Na zdi nebo bílém podkladu:** automatika pozná i světlé pozadí, když je hrana obrazu rovná (plátno, deska,
  okraj papíru). Akvarel s bílým okrajem papíru vyfocený bez okolí nikdy neořízne. Pomůže, když je u hrany vidět
  stín (papír na zdi bývá skoro stejně světlý jako zeď); bez něj nemusí hranu najít a rohy zůstanou nulové. Pak
  rohy doplň ručně podle náhledu nebo `meta_corners` smaž a vyfoť obraz znovu.
- **Vyměníš fotku** za jinou velikost? Zpracování ohlásí chybu, protože rohy patří staré fotce. Smaž celý
  `meta_corners` (všech šest řádků) a automatika rohy najde znovu.
- Na Instagram jde obraz na papíru webu nebo do scény ateliéru, na Fler na bílém, v mockupu je vidět jen papír uvnitř rámu.

**Náhled ořezu:** u rozpracovaného obrazu (`meta_draft: true`) vyrobí každé zpracování náhledy, stejné jako
správce webu v počítači (viz README enginu): `-cut.jpg` (celá fotka s čarami a čísly ořezu), `-frames.jpg` (celá fotka
s rámečky čar a jejich vzdáleností od kraje), čtyři rohy zblízka `-frames-tl.jpg`, `-frames-tr.jpg`,
`-frames-br.jpg`, `-frames-bl.jpg` (200 × 200 bodů fotky zvětšených 2,5×, čáry po 5 bodech do 100 a po 10 do 130 od krajů rohu; v README obrazu jako
tabulka 2 × 2 nad celou fotkou, číslo u čáry, na které leží hrana obrazu, přepíšeš rovnou do `meta_corners`)
a `-backgrounds.jpg`: obraz bez pozadí
na světlém a na tmavém pozadí vedle sebe, s tenkou růžovou čárou podle nalezených rohů. U každého rohu je napsané,
odkud a kolik se tam ořízne, ve dvou řádcích, např. `zleva 2,5 % = 93 px` a `shora 1,7 % = 46 px` (procenta šířky,
resp. výšky fotky a body fotky, stejná čísla jako v `meta_corners`); **červený řádek** (víc než 5 %) je podezřelý, ten roh
zkontroluj nejdřív. Na světlém je vidět, jestli
nezůstala podlaha, na tmavém, jestli se neodřízlo moc papíru. Náhledy najdeš rovnou tady v repu ve složce
`export/draft/` (stejně jako v `tvorba/`, např. `export/draft/2026-plener-sumava/bobri-hraz/`): na GitHubu se pod
seznamem souborů ukážou všechny tři, přehled všech rozpracovaných obrazů je v `export/draft/README.md` a přehled
obrazů jedné kolekce v její složce (např. `export/draft/olejomalby/README.md`). Totéž platí pro `export/instagram/`
a `export/fler/`: celkový přehled nahoře a přehled každé kolekce v její složce. Nad náhledy je
**Text na webu** (text obrazu, popis pro Google a popisky detailů tak, jak budou vypadat na webu: tučně, kurzívou,
odkazy fungují) a **Stav popisu**: co o tomhle obraze říká souhrn posledního zpracování (chyby, ke kontrole, doporučení, co zbývá
doplnit), takže ho nemusíš hledat v souhrnu běhu. V přehledu jsou u každého obrazu jen počty, např. „✗ 1 · 💡 3“
(✗ chyby, ⚠ ke kontrole, 💡 doporučení, ✎ zbývá doplnit). Složku tu má každý rozpracovaný obraz a každý s fotkou
i všechny tři náhledy, i když se nic neořezává (`meta_corners: false` nebo samé nuly: pak je na nich celá fotka).
Jen obraz bez fotky má složku bez náhledů, se stavem popisu. Zapíše se i tehdy, když zpracování skončí chybou; obraz s vlastní
chybou si nechá staré náhledy (nové vzniknou po opravě). Jsou zmenšené
(delší strana 2000 px), na kontrolu ořezu stačí; v plné velikosti je umí vyrobit správce webu na počítači. Nové náhledy vzniknou jen při změně fotky nebo rohů; po zveřejnění
obrazu (`meta_draft: false`) složka sama zmizí. V souhrnu běhu je seznam náhledů. Když ořez nesedí, uprav čísla v `meta_corners` a ulož (ve větvi),
nové zpracování udělá nový náhled. (Správce webu si totéž umí vyrobit v počítači pro libovolné fotky, viz README enginu.)

## Fotky pro Instagram a Fler

Vznikají samy ve složce `export/` ve větvi `main_binary` (`<obsahové repo>` → větev `main_binary` → `export/`)
a nahráváš je ručně. Vznikají jen, **dokud obraz na Instagramu nebo Fleru ještě není**: až do popisu vložíš odkaz
(`instagram:` nebo `fler:`), jeho fotky při dalším zpracování zmizí (už jsou použité). Když odkaz zase smažeš, vzniknou znovu.

- **Instagram** (`export/instagram/`): jen obrazy, u kterých v popisu
  napíšeš `meta_instagram: true` (nový popis má `meta_instagram: false`). Každý obraz má svou složku
  na stejném místě jako v `tvorba/`: `tvorba/2026-plener-sumava/bobri-hraz.yaml` →
  `export/instagram/2026-plener-sumava/bobri-hraz/` (obraz bez kolekce: `export/instagram/<obraz>/`).
  Fotky jsou ve formátu 4:5, vybereš si, co zveřejníš:
  - **s popiskem** (`caption-papir.jpg`, `caption-pergamen.jpg`, `caption-noc.jpg`): obraz na papíru
    jedné ze tří barev webu, dole název, „technika · rozměr · rok“ a adresa webu,
  - **ve scéně ateliéru** (`scene-stul-tmavy.jpg`, `scene-stul-svetly.jpg`, `scene-stojan.jpg`): obraz
    položený na starém tmavém nebo světlém stole (natočený k divákovi, mimo štětce a knihy) a postavený
    na malířském stojanu, ve skutečné velikosti podle `size_cm` (bez `size_cm` scény nevzniknou); obraz je
    v perspektivě scény jako skutečný list papíru: s tloušťkou, mírně zvlněný, s lehce zvednutými okraji a stínem,
  - **panorama pro karusel** (`pano-1.jpg`, `pano-2.jpg`, případně `pano-3.jpg`): jen u širokého obrazu
    (na šířku aspoň zhruba 4:3, podle `size_cm`). Obraz je přes celou výšku dvou nebo tří snímků za sebou; když je
    dáš do příspěvku hned za fotku s popiskem a v tomhle pořadí, při listování obraz plynule ubíhá a je vidět
    mnohem větší (struktura papíru, tahy štětce). Čtvercové obrazy a obrazy na výšku panorama nemají,
  - **příběh** (`story.jpg`, 9:16): obraz s popiskem pro příběh (story). Pod popiskem je volné místo na nálepku
    „Odkaz“; adresu stránky obrazu najdeš v `README.md` v části „Příběh“ v bloku ke zkopírování (se značkami na
    konci, podle kterých Google Analytics pozná, že návštěva přišla z příběhu). Celou kolekci jako ochutnávku najdeš
    v přehledu `export/instagram/README.md` pod tabulkou kolekce („Příběh kolekce“): příběhy jejích obrazů v pořadí,
    odkaz pro každý snímek a odkaz na celou kolekci. Příběh zmizí po 24 hodinách, pokud ho
    neuložíš do Výběru (např. jeden Výběr pro každou kolekci),
  - **detaily** (`detail-….jpg`): každá detailní fotka. Dlouhá úzká (třeba matrice linorytu) se nevejde výřezem, takže
    dostane vlastní panorama `detail-<jméno>-pano-1.jpg`, `-pano-2.jpg` …, jiná nepravidelná leží celá na papíru.
  - **mřížka na profilu** (dlaždice `grid-<pořadí>-<řádek>_<sloupec>.jpg` a náhled `grid-preview.jpg`): jen když
    napíšeš `meta_instagram_grid: 3x3` (sloupce x řádky: `3x3` obraz na výšku, `2x1` dvojice vedle sebe, `3x1` hodně
    široký, `3x4` hodně vysoký; od `1x1` do `5x5`). Jméno dlaždice říká, kde na mřížce leží a kolikátá se zveřejňuje: `grid-01-3_3.jpg`
    (vpravo dole) jako první, `grid-09-1_1.jpg` (vlevo nahoře) jako poslední. Obraz se rozřeže na dlaždice, které na profilu dají dohromady jednu fotku. V `README.md` složky je náhled a pořadí
    zveřejnění s textem ke každé dlaždici: **pozpátku**, od pravé dolní, všechny za sebou. Na profilu pak drž počet
    příspěvků v násobcích tří, jinak se mřížka posune. Hodí se jen pro výjimečné obrazy a funguje jen v aplikaci na
    telefonu (3 sloupce): web Instagramu na počítači má 4 sloupce a mřížku rozhází.
  - **text příspěvku** (nahoře v `README.md`, tedy v náhledu složky na GitHubu): název, popis, „technika · rozměr · rok“, kolekce, u obrazu na prodej
    „Obraz je na prodej.“, adresa webu s `id` obrazu (`<adresa webu> · jujn2`: návštěvník ho vloží do pole `#`
    v horní liště webu, vlevo od „Tvorba“, a obraz se otevře; najde ho i hledáním v galerii) a hashtagy česky i anglicky (podle techniky, štítků a kolekce,
    např. `#plenersumava2026`). Stačí ho
    zkopírovat do příspěvku a případně upravit. Změníš-li popis nebo štítky, text se hned upraví. Když
    štítek nemá anglický hashtag, souhrn zpracování to ukáže v „Doporučení“ (překlad doplní správce webu).

  Do složky si klidně ulož i vlastní poznámky, zpracování maže jen své fotky a `README.md`. Přesuneš-li obraz
  do jiné kolekce, jeho složka se přesune s ním.

  Když se obraz do scény nevejde (na stole mimo štětce a knihy, na stojanu mimo sklenici nebo celý na fotku), fotka té
  scény nevznikne a souhrn zpracování to ukáže v části „Ke kontrole“; ostatní fotky obrazu vzniknou normálně. Malý úzký obraz (třeba linoryt 16,5 × 4 cm)
  scéna přiblíží víc, aby se v ní neztratil.

  Na Instagram se hodí příspěvek s víc fotkami (karusel): nejdřív obraz s popiskem (v mřížce profilu se ukazuje jen
  ten první, tak drž jednu barvu pozadí), pak panorama, scéna, detaily. Mockupy z webu na Instagram nejdou.
  Obraz je pro Instagram oříznutý o kousek (0,5 %) z každé strany, aby u okraje nezůstal proužek podlahy.
  Když změníš název, techniku, rozměr nebo datum, fotky se vyrobí znovu. Když `true` změníš zpátky
  na `false`, fotky pro Instagram zmizí.
- **Fler** (`export/fler/`): jen obrazy na prodej (`available`, `reserved`), u kterých v popisu napíšeš
  `meta_fler: true` (nový popis má `meta_fler: false`: cena na webu Fler nepotřebuje, obraz můžeš prodat i napřímo),
  každý ve své složce
  na stejném místě jako v `tvorba/` (např. `export/fler/2025-plener-steken/rybnik-u-stekne/`):
  `original.jpg` a mockupy `mockup-….jpg` (má-li je), všechno s podpisem v pravém dolním rohu (světlé písmo
  se stínem, čitelné na světlém i tmavém pozadí).

**Náhled na GitHubu:** otevři složku `export/instagram/` nebo `export/fler/` ve větvi `main_binary` na webu GitHubu. Pod seznamem souborů
se ukáže přehled všech obrazů s miniaturami, kliknutím se dostaneš do složky obrazu. Tam je pod soubory náhled
všech připravených fotek (kliknutím na fotku ji otevřeš v plné velikosti a stáhneš) a u Instagramu i text příspěvku,
který zkopíruješ tlačítkem vpravo nahoře u textu. U Fleru najdeš v náhledu cenu, rozměr, podklad a popis pro inzerát.
Přehled je rozdělený podle kolekcí a u každého obrazu ukazuje, jestli už je zveřejněný: „✓ na Instagramu“ / „✓ na Fleru“
s odkazem (obraz už nemá složku ani miniaturu), nebo „○ zatím nezveřejněno“ / „○ zatím nepřidáno“. Až obraz zveřejníš,
vlož odkaz do jeho popisu (`instagram:` nebo `fler:`) a při dalším zpracování se stav změní a fotky zmizí.
Náhled (`README.md`) vyrábí zpracování samo, needituj ho.

Když obraz smažeš nebo přejmenuješ, jeho staré fotky z `export/` zmizí samy.

## Pinterest

Na Pinterestu si lidé ukládají obrázky na své nástěnky a hledají v nich nápady; každý pin vede na stránku obrazu na
webu, a to i za roky. Web dává obrazy na Pinterest sám:

- **Obrázek pinu** (obraz s popiskem hned pod ním na papíru, na výšku 2:3) má každý zveřejněný obraz; nabízí ho
  odkaz „Uložit na Pinterest“ na jeho stránce.
- **Který obraz připneš sama:** napiš do popisu `meta_pinterest: true` (nový popis má `false`). Při dalším zpracování
  se obraz objeví v kanálu `https://<adresa webu>/pinterest.xml`.
- **Jeden obraz = jeden pin:** Pinterest pozná pin podle adresy obrázku, ta v kanálu u obrazu zůstává stejná, i když se
  změní fotka nebo název. Když chceš obraz připnout znovu (třeba po výměně fotky), napiš do popisu
  `meta_pinterest_version: 2` (příště 3…): kanál dostane novou adresu a Pinterest udělá nový pin. Starý pin pak na
  Pinterestu smaž ručně.
  Popis pinu = popis obrazu, „technika · rozměr · rok · id“ (podle `id` obraz najdeš hledáním v galerii) a klíčová slova z techniky a štítků česky i anglicky (podle nich
  lidé na Pinterestu obrazy najdou; anglická slova jsou z vlastního slovníku, obyčejná slova jako „plein air“). Když
  štítek nemá anglické slovo, souhrn zpracování to ukáže v „Doporučení“ (překlad doplní správce webu).
- **Jak se tam dostane:** Pinterest si kanál zhruba jednou denně přečte a z každého nového obrazu sám udělá pin na
  zvolené nástěnce. Nic se nenahrává ručně. Už připnutý obraz se znovu nepřipne a pozdější úprava popisu se do pinu
  nepřenese (na Pinterestu ho případně uprav ručně).
- **Jednou na začátku (správce webu):** firemní účet na Pinterestu (zdarma; osobní se dá přepnout v nastavení), ověřit web
  způsobem „Přidat tag HTML“ s adresou `https://<adresa webu>` (kód z něj je v `site.verification.pinterest`
  v `site.config.yaml` repa webu; potvrdit až po nasazení webu s ním), pak v nastavení
  „Hromadné vytváření pinů“ zapnout automatické publikování z RSS: adresa `https://<adresa webu>/pinterest.xml`
  a nástěnka (např. „Akvarely“).
- **Profil:** odkazy „Instagram“, „Pinterest“ a „Fler“ (obchůdek) jsou v patičce webu a na Kontaktu.
- **Sdílet:** každá stránka obrazu má řádek „Sdílet“ s ikonami. Ikonou Pinterestu si návštěvník obraz připne
  na svou nástěnku (vede zpět na web); dál Facebook, WhatsApp a odkaz. Web kvůli tomu nenačítá nic od těchto služeb.

## Fotky na web (O mně, Kontakt)

Do složky `fotky/` dej fotku s jedním z těchto názvů (přípona `.jpg`, ne `.jpeg`):

- `o-mne-uvod.jpg`: na stránce O mně nahoře, přes celou šířku (hodí se fotka na šířku),
- `portret.jpg`: na stránce O mně vedle textu, v užším sloupci (hodí se fotka na výšku),
- `kontakt.jpg`: na stránce Kontakt vedle kontaktů, oříznutá na šířku 3:2 (fotka v poměru 3:2 zůstane celá; hodí se fotka, na které se díváš do objektivu).

Vedle vznikne `portret.yaml`: do `alt` napiš, co je na fotce (třeba „Autorka
maluje v ateliéru“), do `caption` případně popisek pod fotku.

Úvodní fotka na O mně se ořízne na široký formát. Aby zůstalo vidět to
důležité, napiš do `focus`, kde to na fotce je: `[zleva, shora]` v procentech.
`[50, 50]` je střed, `[85, 60]` vpravo trochu pod středem.

## Barvy webu

Návštěvníci si můžou v patičce webu přepnout barvy: Papír (světlá), Pergamen (zažloutlý papír), Noc (tmavá)
nebo Automaticky (podle nastavení počítače či telefonu). Na obrazy ani popisy to nemá vliv, nic se nenastavuje.

## Vyzkoušení vzhledu (prototypy)

Jak přesně se obrazy na webu skládají, se dá vyzkoušet na **prototypech**: samostatných stránkách se skutečnými
obrazy, kde se posuvníky a tlačítky mění nastavení a hned je vidět, jak by web vypadal. Nic se tím na webu nezmění.

- **Zarovnání sloupců** (`zarovnani-sloupcu.html`): úvodní stránka „Nejnovější“ na počítači, tabletu i telefonu,
  ve velkých obrazech i dlaždicích; jak sloupce končí (mezery mezi obrazy, místo nahoře) a v jakém pořadí jdou.
- **Značky na dlaždicích** (`znacky-dlazdic.html`): hvězdička výběru autorky a košík u obrazů na prodej v malých,
  středních i velkých dlaždicích; ve kterém rohu, jak velké a jak výrazné, ve všech barvách webu.

Prototypy se nedají otevřít na GitHubu, vyrábí je správce webu na počítači (viz README enginu, *Lokální vyzkoušení*) vždy
z aktuálních obrazů. Když se ti nějaké nastavení zalíbí, pošli správci webu snímek obrazovky, hodnoty se pak přepíšou
do nastavení webu. Podrobnosti v README enginu, sekce
Prototypy.

## Zprávy z webu

Návštěvníci můžou napsat z formuláře na stránce Kontakt nebo z tlačítka „Napište mi“ vpravo dole na každé stránce
(u obrazu i „Zeptat se na obraz“). Zpráva přijde e-mailem (posílá ji služba Web3Forms):

- **Předmět** říká, o co jde: `[<značka webu>] Dotaz na obraz: Ovce (v39nd)`, `[<značka webu>] Zájem o koupi: …`, `[<značka webu>] Chyba na webu: …`,
  `[<značka webu>] Pozdrav nebo vzkaz` apod. V e-mailu je i odkaz na stránku, odkud návštěvník psal. Odesílatel je
  „Web <adresa webu>“, takže je ve schránce hned vidět, že zpráva přišla z webu.
- **Odpovídá se** normálně z pošty („Odpovědět“ jde na adresu návštěvníka, pokud ji vyplnil; u dotazu na obraz
  a zájmu o koupi je povinná).

## Hra Detail dne

Na webu je denní hra Detail dne (`/detail-dne/`) (v menu a na úvodní stránce pod úvodním obrazem):
každý den tři výřezy z tvých obrazů (Lehká, Střední, Těžká) a hráč hádá, ze kterého obrazu jsou. Nic se k ní nevyplňuje,
obrazy si bere sama ze zveřejněných děl a plán dnů na dva týdny dopředu chystá automatika (každé pondělí a s každým novým obrazem).
Náhled odkazu na hru (třeba na Facebooku) ukazuje tři výřezy z nejnovějších obrazů tvého výběru (`featured: true`).
Na konci kola jsou všechny náhledy odkazem na stránku svého obrazu.

**Můj Detail dne:** na stránce každého obrazu ve hře je pod „Sdílet“ vpravo odkaz *Udělat z obrazu Můj Detail dne* (u obrazu
s detaily v řádku nad nimi, vlevo nadpis *Detaily*). Návštěvník vybere
obtížnost, ťukne do obrazu, kam má výřez ukazovat (nebo *Vybrat místo za mě*), zvolí zkreslení (věta pod nadpisem říká, co s obrazem udělá) a pošle odkaz. Kdo ho otevře,
hádá stejně jako ve hře, jen jedno kolo a bez kapek. Celý kvíz je v odkazu, web nic neukládá. Obraz s `game: false` tam nikdy
není, a vynechaná místa (`meta_game_skip`) si nevybere ani návštěvník.

**Výřezy hry v obraze:** ve větvi `main_binary` je `export/detail-dne/README.md` se všemi obrazy ve hře a u každého
(ve složce jako v `tvorba/`) obrázek s výřezy, které z něj hra bere: čtverec s číslem, barva podle úrovně (zelená lehká,
modrá střední, červená těžká), a tabulka, kdy byl který výřez ve hře a kdy je naplánovaný. Nahoře a vlevo je měřítko
v pixelech fotky v `tvorba/` a obrázkem vede čárkovaná mřížka: z nich odečteš místo, které má hra vynechat. Kreslí se
jen u obrazu, kterému se něco změnilo.

**Co do hry nepatří** (v popisu obrazu):

```yaml
game: false                  # obraz do hry vůbec nepatří (ani jako hádanka, ani v nabídce obrazů), např. akt
```

```yaml
meta_game_skip:                   # nepovinné: místa, ze kterých hra nikdy nevezme výřez a kam se ani neoddálí
  - [1700, 0, 400, 1916]          # [zleva, shora, šířka, výška] v pixelech fotky, jako meta_corners
```

Hodí se pro kroužkovou vazbu skicáku, lepicí pásku, klip nebo dva listy vedle sebe: všechno, co hráči prozradí obraz
dřív, než ho pozná. Nejpohodlněji je naklikáš v editoru rohů (`npm run corners`, režim *Hra: vynechaná místa*).
Pixely jsou stejné jako u `meta_corners` (fotka v `tvorba/`); místo, které ořez pozadí odřízne,
nevadí. Vynechané místo je v `export/detail-dne/` šrafované a výřezy, které do něj zasahují, přeškrtnuté. Změna platí
od pozítří (dny do zítřka už jsou naplánované) a díky ní hra nikdy neoddálí pohled do vynechaného místa.
Chybný zápis (mimo fotku, špatný tvar) ohlásí souhrn běhu kódem `[spatne-vynechane-misto]`.

Vyzkoušení dřív, než to půjde do `main` (správce webu, v počítači): v enginu `npm run game-export` vykreslí jen
`export/detail-dne/` podle popisů tady (nic jiného nezmění, viz README enginu), `-- --out <složka>` jinam.


## Co se děje po nahrání

Nahrávat stačí přes web GitHubu (*Add file → Upload files* do správné složky,
popis upravíš ikonkou tužky). Po uložení v `tvorba/`, `fotky/`, `roky/`, `stranky/` nebo
`_index.yaml` / `_cover.jpg` se samo spustí „Zpracování obsahu“:

- k nové fotce připraví popis (yaml), přidělí obrazu kód a najde rohy listu (viz *Ořez pozadí*),
- k nové kolekci připraví její popis,
- vyrobí fotky pro Fler (jen `meta_fler: true`, s podpisem) a Instagram (jen `meta_instagram: true`) do složky `export/`
  ve větvi `main_binary`,
- připraví aktualizaci webu, která se po kontrole sama zveřejní (za pár minut).

Jak to dopadlo, uvidíš v záložce **Actions**: zelená fajfka = v pořádku,
červený křížek = v popisu je chyba (třeba datum není den jako `2026-06-14` nebo
název kolekce má velká písmena). Po kliknutí na běh je nahoře napsané, co
opravit. Dokud je chyba v popisu, na web se nic nedostane.

Každá hláška v souhrnu končí **kódem** v hranatých závorkách, např. `[bez-rozmeru]` nebo `[featured-bez-pinu]`.
Stejný problém má vždy stejný kód, takže když ho vyhledáš, najdeš všechny obrazy se stejnou věcí.

### Přehled všech obrazů (`export/README.md`)

Soubor `export/README.md` (na GitHubu otevři složku `export` ve větvi `main_binary`, GitHub ho ukáže pod seznamem souborů) je **všechno
o všech obrazech na jedné stránce**: rozdělené podle kolekcí (podle abecedy, „Mimo kolekce“ na konci), u každého
obrazu nadpis s názvem, kódem, ★ u výběru autorky, datem a rozměrem (např. „Ráno ★ · a1b2c @ 2026-09-27 [ 21 x 15 ]“),
odkazy na popis, fotku a stránku na webu, text obrazu (formátovaný tak, jak bude na webu: tučně, kurzívou, odkazy
fungují), vlastní popis pro Google jako „Google: …“, pod ním každá detailní fotka s popiskem na vlastním řádku,
zapnuté volby jedním slovem (`draft`, `instagram:` s odkazem
nebo `-`, když odkaz ještě chybí, `pinterest`, `mockups`), ostatní údaje z popisu (i soukromé; stav
`not-for-sale` se nepíše) a co o něm říká
poslední běh zpracování: chyby, „ke kontrole“, doporučení a co zbývá doplnit, každé s kódem.
Každá hláška má na začátku značku: `✗` chyba, `⚠` ke kontrole, `💡` doporučení, `✎` zbývá doplnit; obraz bez
hlášek má jen `✓`. Hledáním `✗` tak najdeš všechny obrazy s chybou. Nahoře je seznam všech kódů, které se teď vyskytují, s počtem obrazů.

Hledej v prohlížeči (**Ctrl+F**, na Macu **Cmd+F**): název, kód obrazu, štítek, místo z popisu, nebo kód hlášky.
Obrázky v něm nejsou, aby zůstal rychlý (fotku otevře odkaz „foto“). Píše ho automatika při každém běhu (i ve
větvi), ručně ho needituj.

Doporučení, která hlídají, jestli údaje obrazu sedí dohromady:

| Kód | Co znamená |
|---|---|
| `featured-bez-pinu` | obraz je ve výběru autorky, ale není v kanálu pro Pinterest (`meta_pinterest: true`) |
| `fler-neni-na-prodej` | obraz má odkaz na Fler, ale už není na prodej: nabídku na Fleru ukonči a odkaz smaž |
| `fler-bez-prodeje` | obraz má `meta_fler: true`, ale není na prodej: dej `meta_fler: false`, nebo změň stav |
| `prodej-bez-fleru` | zveřejněný obraz má fotky pro Fler (`meta_fler: true`), ale chybí odkaz na Fler |
| `cena-neprodava` | obraz má cenu, ale neprodává se (`not-for-sale`, `gifted`) |
| `mockupy-bez-rozmeru` | `mockups: true`, ale chybí rozměr (`size_cm`), mockupy nedrží skutečnou velikost |
| `mrizka-bez-instagramu` | mřížka pro Instagram (`meta_instagram_grid`) bez `meta_instagram: true`, mřížka nevznikne |
| `datum-v-budoucnu` | datum obrazu je až po dnešku |

V **Actions** uvidíš i „Kontrolu workflow“: ta běží, jen když správce webu mění samotnou
automatiku (složka `.github/workflows/`), a obrazů se netýká.

### Texty stránek (`export/stranky/README.md`)

Ve složce `export/stranky` (GitHub soubor ukáže pod seznamem souborů) jsou **texty úvodní stránky, stránek ze
`stranky/` (O mně, Kontakt, Podmínky užití, Kurzy, stránka 404) a roků tak, jak budou vypadat na webu**, ve třech částech oddělených
čarou (nahoře úvodní stránka, jejíž popis je `_index.yaml` v kořeni repa, pak Stránky, nakonec Roky): tučně, kurzívou a s
fungujícími odkazy, u každé odkaz na její popis (yaml) a na stránku na webu, nadpisy a další krátké texty („Nadpis:
…“, „Tlačítko: …“) a vlastní popis pro Google jako „Google: …“. Píše ho automatika při každém zpracování, i ve větvi,
takže úpravu textu vidíš ještě před zveřejněním.

### Nové obrazy ve vlastní větvi (doporučeno)

Když chceš nahrát víc obrazů najednou a popisy doplnit v klidu, dej je do
vlastní větve. Na web se nic nedostane, dokud větev nesloučíš.

1. Při nahrání fotek (*Add file → Upload files*) dole zvol **Create a new branch
   for this commit** a pojmenuj ji třeba `nove-obrazy`.
2. Automatika k fotkám během chvilky doplní popisy (yaml) s výchozími
   hodnotami, kódy obrazů a rohy listu a uloží je **do té samé větve**. V záložce
   **Actions** uvidíš „Připraveno k doplnění“, seznam popisů a dole na stránce běhu
   náhledy ořezu podlahy ve složce `export/draft/` té větve (viz *Ořez pozadí*).
3. Ve větvi otevři každý popis (ikonka tužky), doplň skutečné hodnoty (hledej
   `DOPLNIT`) a přepni `meta_draft: true` na `false`. Po každém uložení automatika popisy znovu zkontroluje
   (červený křížek = je co opravit).
4. Až je vše hotové, otevři **pull request** do `main` a slouč ho. Teprve
   pak vzniknou fotky pro web, Instagram a Fler a správce webu dostane aktualizaci
   webu ke schválení.

Celé to jde **jen přes web GitHubu**, nic se nestahuje: web ukazuje vždy
aktuální stav větve, i s popisy od automatiky. Jen po nahrání fotek počkej,
až automatika v **Actions** doběhne (zelená fajfka), a teprve pak popisy otevři.
Kdybys je upravovala dřív, GitHub by při uložení ohlásil, že se soubor mezitím
změnil.

Když pracuješ v počítači v terminálu (ne na webu), po kroku 2 si změny stáhni
(`git pull`), jinak se ti další nahrání nepovede.

## Vyhledávače a texty webu

- [docs/checklist.md](docs/checklist.md): co zbývá dokončit (commity a pořadí nasazení, vyhledávače,
  úklid staré struktury, rozšíření na později).
- [docs/github-nastaveni/](docs/github-nastaveni/): export nastavení obou rep na GitHubu (kontrolní seznam pro nové
  repo se stejným nastavením; obnovit `node scripts/repo-settings.mjs <repo> --out …` v enginu).
- Doba zpracování, limity GitHubu a co dělat, až se k nim web přiblíží: `docs/github-provoz.md` ve společném soukromém
  repu `web-tvorba-private` (pracovní dokument správce).

Text obrazu (`text`, případně `description`) se ukazuje i ve výsledcích hledání, proto ho stojí za to psát konkrétně:
kde a kdy obraz vznikl, co na něm je, na jakém papíře. Jeho začátek (asi 240 znaků) ukáže web i v bublině po najetí
myší na obraz v galerii a na úvodní obraz, spolu s názvem, technikou, rozměrem, rokem, papírem (`support`)
a stavem prodeje.

## Jen skutečné obrazy

Tohle repo je jen pro skutečnou tvorbu. Zkušební obrazy, na kterých správce webu
ladí web, jsou úplně jinde (v enginu) a sem se nesmí dostat. Kdyby se
sem přece jen dostal obraz nebo kolekce, jejichž jméno začíná `demo-`, nebo
soubor `demo-content.yaml`, zpracování skončí chybou a na web se nic nedostane.

Podrobný technický popis (pipeline, lokální vyzkoušení, adresy na webu) je
v README enginu.

