# Historie změn

Přehled klíčových vlastností enginu (web, obrázková pipeline, automatika, struktura obsahu): co kdy přibylo a co se kdy
změnilo. Do 2026-11 vznikal jako jeden web (Pavla Kramolišová, pavla.kramolis.cz), proto starší záznamy mluví o jejím
webu: **web** = repo webu (kód webu a pipeline, do 2026-11 i engine), **obsah** = obsahové repo autorky (obrazy, popisy,
návody). Data jsou dny commitů; nasazení mohlo přijít o něco později. Nejnovější nahoře. Rutinní aktualizace obsahu
(„Content update“, „Pipeline: …“) a sloučení PR vynechány.

Značky: **Nové** = nová vlastnost, **Změna** = jinak než dřív, **Konec** = zrušeno nebo nahrazeno.

---

## 2026-11-21

- **Změna** Obrázky testovacích dat v repu `pavla` leží v `demo-content/` vedle popisů jako fotky obsahového repa:
  `npm run demo:images` je vyrobí z receptu `images.yaml` (jen chybějící, existující nikdy nepřepíše); v `pavla` mimo
  git, v enginu budou v gitu. `npm run demo` je tak o minutu rychlejší.
- **Nové** Obrázky obrazů nesou v metadatech odkaz na Podmínky užití (prohlášení o právech) a větu „Všechna práva
  vyhrazena. Podmínky užití: …“; odkaz na stránku obrazu zůstává. Příští zpracování proto vyrobí obrázky všech
  zveřejněných obrazů znovu (jednorázově, delší běh).
- **Nové** Zákaz učení umělé inteligence na obrazech, strojově čitelný podle směrnice EU: `robots.txt` zakazuje
  robotům, kteří sbírají data pro umělou inteligenci (GPTBot, ClaudeBot, Google-Extended, …), celý web, a každá stránka
  i soubor `/.well-known/tdmrep.json` vyhrazují vytěžování dat. Vyhledávače a Pinterest web dál vidí celý.
- **Nové** Podmínky užití mají pod českým textem i anglický (`title_en`, `text_en` v `stranky/podminky-uziti.yaml`).
- **Nové** Stránka Podmínky užití (`/podminky-uziti/`, odkaz v patičce za ©): obrazy, fotky a texty jsou autorská díla,
  všechna práva vyhrazena; sdílení odkazem vítané, stahovat, tisknout, upravovat, používat na výrobcích, v reklamě či
  k učení umělé inteligence jen se svolením. Text je v `stranky/podminky-uziti.yaml` (kostru s výchozím textem založí
  automatika).
- **Nové** Licence: kód v repu `pavla` pod FSL-1.1-MIT (smí se používat a upravovat k čemukoli kromě konkurenční
  komerční služby, po dvou letech MIT); obsah webu a obsahového repa pod ni nespadá, všechna práva vyhrazena.
- **Změna** Testovací data v repu `pavla` ve dvou složkách se strukturou skutečných rep: `demo/` (jako repo webu:
  nastavení, písma, scény, ikony; dřív `demo-content/site/`) a `demo-content/` (jako obsahové repo).
- **Změna** Kroky „Zpracování obsahu“ a „Kontroly automatiky“ jsou sdílená workflow v repu `pavla`
  (`process-content.yml`, `health-check.yml`); workflow obsahového repa jsou jen obálky (kdy běží, oprávnění, tokeny).
  Co dělají, se nemění.
- **Změna** Testovací web (`npm run demo` v repu `pavla`) má vymyšlenou autorku (Růženka Borůvková, Mýtinka) bez odkazů na
  Pavliny profily a bez jejích údajů (e-mail, měření, ověřovací kódy, klíč formuláře) a je skrytý vyhledávačům:
  `robots.txt` zakáže vše a každá stránka má `noindex, nofollow`. Pavlin web se nemění.
- **Nové** Předpona jmen, pod kterými si prohlížeč návštěvníka pamatuje oblíbené, barvy, postup ve hře a mezipaměti
  aplikace, je nastavení webu (`site.storagePrefix` v `site.config.yaml` repa `pavla`): u Pavly dál `pavla`, takže
  návštěvníci o nic nepřijdou; testovací web `demo`.
- **Nové** Týdenní kontrola umí zkontrolovat i nasazenou ukázku enginu stejně jako Pavlin web (`--demo-url`, hlášky
  „Ukázkový web: …“); zapne se, až bude ukázka nasazená.
- **Nové** Web může ležet v podsložce adresy (`site.url` s cestou): testovací web je připravený na adresu
  `https://shamoh.github.io/web-tvorba-engine/` (GitHub Pages enginu). Pavlin web na vlastní doméně se nemění.
- **Změna** Prototypy (`npm run prototypes`) a přehled hry pro autorku (`npm run game-overview`) používají předponu
  webu; u Pavly zůstávají jména `pavla.prototype.*`, uložené ladění i poznámky zůstávají. Přehled hry mluví obecně
  („Pro autorku“, „správce webu“), jméno autorky bere z nastavení webu. Díla vynechaná jako příklad vzhledu jsou
  nastavení webu `game.overviewSkip`; Barbora III už vynechaná není.
- **Změna** Příklad popisu fotky (`alt`) v komentáři popisů fotek: „Stůl s barvami a štětci v ateliéru“ místo
  „Pavla maluje v ateliéru“ (pipeline komentář srovná při dalším běhu).

## 2026-11-20

- **Nové** Kontrola dat webu (`npm run check:site` v repu `pavla`, i v „Kontrole kódu“): nastavení, ikony, písma
  a scény Pavlina webu, včetně velikostí děl, které se musí vejít na stoly ateliéru (`mustFitCm`). Testy kódu běží jen
  nad testovacím webem. „Zkušební běh zpracování“ pouští testovací obsah do složky testovacího webu, ne do Pavlina.
- **Změna** Co zadání generátoru chtělo po kameře scény ateliéru, je zapsané přímo u scény (`promptCamera`
  v `mockups/instagram/scenes.yaml` repa `pavla`), ne v testu; kontrola platí pro scény každého webu. Fotky pro
  Instagram se kvůli změně souboru scén jednou přegenerují (teď jen Jizerka).
- **Změna** Kód webu a pipeline čte všechno, co patří Pavlinu webu (nastavení, písma, scény mockupů, ikonu na plochu,
  obrázky a stav hry), z jedné „složky webu“ (dnes kořen repa `pavla`; ikona na plochu se přesunula ze `scripts/` vedle
  nastavení). Web vypadá a chová se stejně; další krok k tomu, aby stejný kód mohl stavět i jiný web.
- **Změna** Údaje o autorce, které byly dosud zapsané přímo v kódu webu, jsou v nastavení webu (`site.config.yaml` v repu
  `pavla`): popis autorky a její témata pro vyhledávače, popis stránky roku, značka v předmětu e-mailů z webu
  (`[pavla-web]`) a jméno repa webu pro týdenní kontrolu. Web vypadá a chová se stejně; je to první krok k tomu,
  aby stejný kód mohl jednou sloužit i dalšímu webu (plán ve společných soukromých dokumentech správce).
- **Změna** Statistiky promítání: zavření křížkem i klávesou Esc má jeden důvod „zavřeno“ a k němu, čím (křížek,
  klávesa, konec celé obrazovky); odchod na obraz nebo kolekci říká, jestli klikem, klávesou, nebo prstem. Nově se
  počítá, kolikrát návštěvník v promítání listoval prstem a kolikrát šipkami na klávesnici, a kolik tahů prstem obraz
  nepřepnulo (jestli je tah dost citlivý). Starší data mají místo „zavřeno“ dva důvody (button, esc).

## 2026-11-19

- **Nové** Každé promítání má v ovládání tlačítko „Seznam“ (i klávesa S, na telefonu sevření dvou prstů k sobě):
  vrátí se na výpis obrazů s jeho filtry. Statistiky rozliší návrat na výpis a odchod na „Můj výběr“ i to, jestli
  „Seznam“ spustilo tlačítko, klávesa, nebo gesto.
  Při promítání oblíbených otevře „Můj výběr“ se stejnými obrazy (odkaz jde poslat dál).
- **Nové** Web jako aplikace má zkratku „Oblíbené“ (dlouhý stisk ikony na Androidu): promítání vlastních oblíbených.
  Kdo žádné nemá, uvidí návod, jak si je přidat srdíčkem.
- **Změna** „Oblíbené“ v patičce pustí promítání oblíbených obrazů přes celou obrazovku (jako „Na prodej“ a „Výběr“),
  už neotevírá stránku „Můj výběr“; ta zůstává přes „♥ Moje oblíbené“ v galerii.
- **Změna** Oprava: úvodní stránka „Nejnovější“ zase reaguje na přepínač velké obrazy / dlaždice / − / + a skládá
  obrazy do sloupců (od oblíbených obrazů nefungovala); galerie se zase hned otevře v zapamatovaném zobrazení.
- **Nové** Kontrola postaveného webu hlídá i vložené skripty (zobrazení galerie a „Nejnovější“, náhodný úvodní obraz):
  každý musí najít svůj prvek a nastavení mřížky musí být v pořádku, jinak se pull request nesloučí. Totéž kontroluje
  každé pondělí „Kontrola automatiky“ na nasazeném webu.
- **Nové** Oblíbené obrazy: návštěvník si srdíčkem označí obrazy, které se mu líbí (jen v jeho prohlížeči, bez účtu).
  Srdce je vpravo nahoře na obrázcích v galerii i na úvodní stránce (při najetí myší, oblíbené vždy), pod hvězdičkou
  u názvu díla a v promítání (i klávesou L). V galerii vedle počtu děl „♥ Moje oblíbené (N)“ vede na stránku „Můj výběr“
  s odkazem, který jde poslat dál (nejvýš 100 obrazů, jinak „Zužte filtr“). Statistiky: přidání, odebrání a otevření
  výběru. Nejdřív odladěno v prototypu `oblibene.html`.
- **Nové** Galerie: zaškrtávátko před „♥ Moje oblíbené“ zúží obrazy jen na oblíbené (jako „Doporučené“, i nad 100 obrazů).
  V patičce první odkaz „Oblíbené“ na „Můj výběr“, jen když návštěvník nějaké oblíbené má.
- **Změna** Kratší odkazy v patičce: „Na prodej“, „Výběr“ (dřív Obrazy na prodej, Moje nejmilejší), „Napište mi“ (dřív
  Napsat k této stránce), „Nainstalovat“ (dřív Nainstalovat aplikaci).
- **Změna** Detail dne: strop archivu je 90 💧 za den místo 30, tedy tři archivní dny se všemi úrovněmi uhodnutými napoprvé
  (tolik, kolik dá jeden dokonalý den hry se sérií).

## 2026-11-18

- **Nové** Můj Detail dne: na stránce obrazu odkaz „Udělat z obrazu Můj Detail dne“ (vpravo pod „Sdílet“, u obrazu s detaily
  v řádku nad nimi s nadpisem „Detaily“). Návštěvník vybere obtížnost, ťukne, kam má výřez
  ukazovat (nebo „Vybrat místo za mě“), zvolí zkreslení (věta pod nadpisem říká, co vybrané zkreslení s obrazem udělá) a pošle odkaz; kdo ho otevře,
  hraje jedno kolo hry z toho obrazu (bez kapek). Změna obtížnosti nechá výřez na zvoleném místě. Celý kvíz je v odkazu, web nic
  neukládá; adresa se po otevření zkrátí, „Zkopírovat odkaz“ ji vrátí. Znovu otevřený odkaz začne nové kolo, obnovení stránky
  hraje rozehrané kolo dál. Výřez se ukáže hned, bez přiblížení z celého obrazu.
  Na telefonu se kvíz i jeho editor otevřou s nadpisem nahoře, na konci kola stránka sjede k výsledku a tlačítka nahoře se vejdou;
  obraz se zmenší tak, aby byly vidět i všechny obrazy k výběru (jako ve hře).
- **Nové** Přehled vzhledů hry má u každého zkreslení větu, co dělá s obrazem (stejnou jako editor vlastního kvízu).
- **Nové** `stranky/detail-dne.yaml`: texty hry Detail dne a vlastního kvízu (popis pro Google a náhled odkazu, odkaz na stránce
  obrazu, titulek a texty editoru, návod, rámeček na konci kola kvízu, tlačítka, nadpisy kroků a hlášky) se upravují tady.
  Atributy jsou seskupené podle stránky: `description` (hra), `editor_…`, `quiz_…`, `work_link`. Pravidla, verdikty, nápovědy
  a hodnosti zůstávají v kódu webu.
- **Změna** Na konci kola (Detail dne i vlastní kvíz) je všech 9 náhledů odkazem na stránku svého obrazu.
- **Změna** `meta_game` se jmenuje `game` a je veřejný: web díky němu takový obraz nenabídne ani ve vlastním kvízu.
  Staré jméno automatika odmítne. Vynechaná místa (`meta_game_skip`) zůstávají soukromá, web dostane jen jejich polohu v obrázku.
- **Nové: co do hry Detail dne nepatří** (v popisu obrazu): `game: false` = obraz ve hře vůbec není (akty),
  `meta_game_skip` = místa v pixelech fotky, ze kterých hra nevezme výřez a kam se ani neoddálí (kroužková vazba skicáku). Nastaveno
  u tří aktů (Figura z kurzu I–III) a u jedenácti skic s kroužkovou vazbou (Barbora II a III, Moldoveanu, Kladenský lesík…).
- **Nové: přehled výřezů hry** `export/detail-dne/` (ve větvi `main_binary`): u každého obrazu ve hře obrázek s očíslovanými
  výřezy podle úrovně, šrafovaná vynechaná místa, měřítko v pixelech fotky a tabulka, kdy byl který výřez ve hře.
  Vynechaný je i hřbet tří otevřených skicáků (Letná 3, Lom Kristýna, Z Podolí).
- **Nové: vynechaná místa hry v editoru rohů** (`npm run corners`, režim *Hra: vynechaná místa*): obdélníky se kreslí
  myší přes fotku a zapíšou do popisu; tam i zaškrtávátko „obraz patří do hry“.
- **Změna: Detail dne ukáže hráčovu hodnost i na úzkém telefonu.** V pravidlech „Jak se hraje“ (tam vede klepnutí na kapky)
  jsou u nadpisů hráčova čísla: „Kapky · máš 174“, „Série · máš 3“, „Hodnosti · máš #2 Mokrý štětec“ a kolik zbývá do další.
- **Změna: na stránce Detail dne jde napsat zprávu** odkazem „Napsat k této stránce“ v patičce; plovoucí „Napište mi“
  tam dál není, aby nezakrývalo hru.
- **Nové: web jako aplikace v telefonu.** V patičce je „Nainstalovat aplikaci“: na Androidu (a v Chrome či Edge na počítači)
  nabídne instalaci, na iPhonu ukáže návod (Sdílet → Přidat na plochu). Nainstalovaný web se otevírá bez lišty prohlížeče,
  v hlavičce má šipku „←“ zpět. Stránky a obrazy, které si návštěvník už prohlédl, se otevřou i bez internetu, jinak se
  ukáže stránka „Bez připojení“. Na iPhonu má aplikace vlastní paměť: postup ve hře Detail dne z prohlížeče se do ní nepřenese.
  Aplikace si každý den sama uloží dnešní i zítřejší Detail dne, takže jde dohrát i bez internetu. Na iPhonu a iPadu
  se spouští s úvodní obrazovkou (ikona a jméno, světlá i tmavá), Android při instalaci ukáže snímky webu. Statistiky
  rozliší návštěvy z aplikace a z prohlížeče.
  Snímky webu pro instalaci se obnovují samy jednou týdně při nasazení; týdenní kontrola hlídá i ikony a snímky aplikace.
- **Změna: nová ikona webu (favicon).** Místo dvou bledých teček malý akvarel na lístku papíru: obloha, kopce,
  pole a červený mák. Na ploše telefonu je tentýž obrázek přes celou ikonu, bez papírového okraje.
- **Nové: web jde přidat na plochu telefonu s Androidem** s vlastní ikonou a jménem „Pavla“ (manifest webu); dlouhý stisk
  ikony nabídne zkratky „Detail dne“, „Tvorba“ a „Promítat“ (promítání mých nejmilejších), každou s vlastní malou ikonou.
- **Nové: ikona v záložce v tmavém režimu** má tmavý lístek papíru, aby v tmavé liště nesvítil.
- **Konec: „Promítnout“ na Kontaktu.** Odkazy „Obrazy na prodej · Moje nejmilejší“ zmizely z řádku adres na stránce
  Kontakt, ta je jen pro spojení. Obě promítání zůstávají v patičce každé stránky.
- **Nové: hra Detail dne je veřejná.** Je v hlavním menu (Tvorba · Detail dne · O mně · Kontakt), vyhledávače ji najdou a odkaz
  na ni má vlastní náhled (tři výřezy z obrazů). Na úvodní stránce pod úvodním obrazem je sekce „Detail dne“ se třemi dnešními
  výřezy, kliknutím na výřez se otevře hra v té úrovni. Kdo už hrál, vidí u odehraných úrovní uhodnutý obraz se ✓ nebo ✗
  a svou sérii; po dohrání všech tří se sekce zúží na jeden řádek s výsledkem a odkazem do archivu. Diagnostika zůstává skrytá.

## 2026-11-17

- **Změna: Diagnostika hry Detail dne je skrytá.** Zapne (i vypne) ji napsané slovo „diag“ kdekoli na stránce, na telefonu
  pět rychlých ťuknutí na nadpis „Detail dne“. Prohlížeč si ji pamatuje, tester ji zapíná jen jednou.
- **Změna: hra Detail dne po každém kole nabídne, co dál.** Pod výsledkem je vždy žlutý box: zbývající obtížnosti dne jako
  odkazy (přepnou úroveň a posunou stránku nahoru ke hře), po celém dni odkaz do archivu. Přepnutí úrovně posune stránku
  tak, že nahoře je nadpis hry.
- **Nové: gratulace za dokonalý den v Detailu dne.** Kdo uhodne všechny tři obtížnosti dne napoprvé, dostane pod výsledkem
  „Všechny tři napoprvé! Gratuluji, ty jsi snad sama autorka, nebo výborný znalec jejího díla!“
- **Změna: sdílení výsledku Detailu dne má pár slov o tom, jak to šlo** („Hned napoprvé!“, „Na druhý pokus.“, „Tentokrát
  vyhrál obraz.“, za celý den napoprvé „Všechny tři obtížnosti napoprvé! 🎉“…).

- **Změna: nová stupnice hodností v Detailu dne.** 22 hodností místo 5; bezchybný hráč dostane první za den, pak po dnech,
  týdnech a měsících, nejdéle za půl roku; za poslední „Druhé oko autorky“ přibývají hvězdičky (★2, ★3…), takže nikdy nekončí.
- **Nové: strop archivu v Detailu dne.** Z archivu se za den započte nejvýš 30 💧 (jinak by nový hráč dohráním archivu
  přeskočil desítky hodností). Hráč vidí, kolik ještě zbývá, od poloviny žlutě, vyčerpaný strop červeně; obraz do sbírky
  přibude vždycky.
- **Nové: pravidla hry Detail dne.** Pod sbírkou sekce „Jak se hraje“ (kapky, série, archiv, hodnosti, sbírka; seznam
  hodností s vyznačenou hráčovou). Řádek s kapkami nahoře má pravidla v bublině a vede dolů na ně; hodnost v něm má číslo
  („Hodnost #2 Mokrý štětec · další za 60 💧“) a vždy se vejde vedle nadpisu, na telefonu aspoň číslo („💧 130 · Série 2 · #2“).
  Velká čísla kapek se píšou s mezerou („16 100 💧“).

## 2026-11-16

- **Nové: plán dnů hry Detail dne.** Automatika si v gitu vede plán hádanek: všechny odehrané dny a dva týdny dopředu.
  Odehraný den se už nikdy nezmění, ani když přibudou obrazy (dřív nový obraz přeskládal i dny v archivu). Nový obraz
  se do hry dostane do dvou dnů, víc nových jeden denně, týden je vždy mix nových, nedávných a starších. Každý obraz má
  očíslované detaily (místa k hádání), stejný obraz se vrací nejdřív zhruba po třech týdnech a detaily se střídají.
  „Zpracování obsahu“ běží kvůli tomu i každé pondělí samo. Na obrazech se hledá mnohem víc míst k hádání (bohatý obraz
  jich má desítky), takže se stejný detail opakuje zřídka. Na web jdou dny letošního a loňského roku, starší roky jsou
  samostatné soubory, které si hra stáhne, až hráč otevře jejich den. Týdenní kontrola hlásí, když plán na webu
  sahá méně než týden dopředu. Místa k hádání se smí trochu překrývat (ve všech úrovních), aby jich bylo na rok.
- **Změna: obrázky se pro hru Detail dne rozebírají jen jednou.** Rozbor každého obrazu se uloží s otiskem obrázku a znovu se
  dělá jen u nového nebo změněného obrazu; pokaždé se počítá jen, které obrazy si jsou podobné. Zpracování obsahu je kvůli hře
  asi o 11 s kratší, sestavení webu o 10 s. Týdenní kontrola hlásí jejich velikost (`[rozbory-hry-velke]` nad 25 MB).
  Při stovkách obrazů se podobnost počítá jen se 120 nejbližšími obrazy, aby zpracování nerostlo s druhou mocninou.
  Těžká úroveň bere do plánu i o něco méně matoucí detaily u okraje a lehká detaily o kus dál od středu obrazu, aby se
  do roka opakovaly méně (simulace: stejný detail do roka u 4 % hádanek).
- **Změna: Diagnostika ve hře Detail dne až na konci stránky** (pod sbírkou, dřív nad archivem).
- **Změna: dny hry Detail dne mají jméno podle roku.** Místo „Detail dne #16“ je „Detail dne 2026#320“ (rok a pořadí dne v roce);
  klíč dne `2026-320` je stejný v plánu dnů, v adrese dne archivu (`?den=2026-320`, staré odkazy už neplatí), ve statistikách
  a v Diagnostice (ta píše i den v týdnu a datum). Postup hráčů v prohlížeči se ukládá pod stejnými klíči; dosavadní postup
  z prvních dnů pilotu (kapky, série, sbírka) se tím jednou smazal. Technická jména úrovní jsou anglicky (`easy`, `medium`,
  `hard`; hráč dál vidí Lehká, Střední, Těžká), proto dny bez plánu vycházejí jinak než v prvních dnech pilotu. Stránka hry
  se otevře posunutá tak, že nahoře je nadpis. Otázka a nápověda jsou výraznější, nápověda „Po omylu přijde nápověda.“
- **Změna: prototyp hry Detail dne je tatáž hra jako na webu.** Stejný kód, vzhled i rozložení (archiv, sbírka, diagnostika),
  navíc jen ladění (libovolný den i dopředu, vzhled, paleta, simulace sbírky). Dřív měl vlastní kopii, která se od webu vzdalovala.
- **Změna: Moje sbírka bez počtu obrazů.** Hádají se detaily, ne obrazy, proto sbírka nepíše „N z 85 obrazů“.
- **Změna: Moje sbírka ve hře Detail dne.** Každý uhodnutý obraz má pod sebou tečky v barvách detailů, podle kterých se
  hádal (dřív byly barvy všech detailů v jedné společné řadě bez vazby na obraz). Nejnovější obrazy první, celá sbírka
  pod tlačítkem, pod nadpisem vysvětlení. Dosavadní postup hráčů zůstává.
- **Změna: stránky Tvorby se otevřou pod hlavičkou.** Galerie, roky, kolekce a stránky obrazů se otevřou
  posunuté tak, že nahoře je nadpis stránky (nebo „← Kolekce“), jméno a menu webu jsou o kus výš. Zpět a obnovení
  stránky nechají místo, kde návštěvník byl.
- **Změna: odkazy na stránky webu končí lomítkem.** Menu a úvodní stránka vedou rovnou na `/tvorba/`, `/o-mne/`,
  `/kontakt/` (dřív bez lomítka a GitHub je přesměroval). Odkazy v textech bez lomítka (`[text](/tvorba)`) ho dostanou
  samy a kontrola webu odkaz bez lomítka nepustí.
- **Změna: přepínač barev webu v patičce vlevo.** „Barvy“ s kroužky jsou teď vlevo vedle © a verze webu,
  vpravo zůstávají jen odkazy. Na telefonu je celá patička zarovnaná doleva pod sebou: ©, kroužky na vlastním řádku a pod tenkou čarou odkazy.
- **Změna: Detail dne nabízí obrazy i podle barev celého obrazu.** Kromě toho, jak moc výřez připomíná jiný obraz,
  hra teď bere v úvahu i barvy a náladu celých obrazů, takže nabízené obrazy jsou si barevně bližší. Které obrazy
  můžou být hádankou, se nemění; nové dny dostanou zčásti jiné nabízené obrazy.
- **Změna: podobné obrazy podle barev.** Ze všech obrazů, které odpovídají filtru „Podobné obrazy“, se na stránce obrazu
  ukáže šest nejpodobnějších: podle barev a jejich nálady (teplé, studené, světlé, tmavé), techniky a společných štítků.
- **Nové: filtr Barva v galerii.** V řádku filtrů je před „Doporučené“ výběr „Barva“ s kroužkem v odstínu vybrané barvy:
  ukáže obrazy, kterým daná barva tvoří aspoň 12 % malované plochy. Barvy na výběr jsou v nastavení webu.
- **Změna: filtry galerie.** Počet děl, „Zrušit filtry“ a „Promítat“ jsou za štítky vpravo (řádek výběrů se tak vejde
  i s Barvou), čipy štítků jsou úspornější a odkaz „Kolekce“ vedle roků je výraznější (písmo nadpisů).
- **Nové: barvy obrazů (příprava filtru „Barva“).** Automatika u každého obrazu jednou rozebere, jaké barvy na něm jsou
  (bez papíru a bez nádechu fotky), a uloží to k jeho obrázkům. Zatím se to na webu neukazuje; další krok je výběr
  „Barva“ v galerii. Barvy na výběr (jména, odstíny, počet) a nejmenší podíl barvy (12 %) jsou v nastavení webu
  a půjdou kdykoli změnit bez nového rozboru obrazů.
- **Nové: podobné obrazy.** Na stránce obrazu je dole (pod „Související obrazy“) sekce „Podobné obrazy“: odkaz do
  galerie s filtrem podle toho, co má obraz společné s ostatními (technika a štítky, ne kolekce: mají vést napříč
  celou tvorbou), a pod ním šest menších obrázků z něj v jedné řadě (na telefonu dvě řady po třech), s hvězdičkou
  výběru autorky a košíkem obrazu na prodej jako dlaždice v galerii. Google Analytics počítá kliky pod obrazem (souvisejícími i podobnými
  obrazy) událostí `more_click`.
- **Nové: výpustka.** Tři tečky „...“ v textech a názvech web ukáže jako jeden znak „…“ (i v textech pro Instagram
  a Fler); psát se dál může „...“.
- **Nové: obraz podle kódu.** V horní liště webu je vlevo od „Tvorba“ nenápadné `#`: rozbalí krátké pole, do kterého
  návštěvník vloží kód obrazu nebo celý řádek z příspěvku na Instagramu (`pavla.kramolis.cz · jujn2`) a obraz se
  otevře. Neznámý kód pole ohlásí. Pole rozbalí i klávesa `#`, na telefonu ho potvrdí „Přejít“ na klávesnici.
  Google Analytics počítá otevřené obrazy událostí `code_open` (parametr `method`: vložením nebo Enterem).
- **Nové: prolinky mezi obrazy.** Atribut `related: [k3f9a, chqmf]` v popisu obrazu ukáže na jeho stránce dole
  „Související obrazy“, a to oběma směry. V textech jde odkázat na obraz jeho kódem: `[PF 2025](chqmf)`; odkaz
  vede přímo na stránku obrazu i po přejmenování nebo přesunu. Neznámý kód zastaví zpracování, odkaz na rozpracovaný
  obraz je jen doporučení (na webu bude bez odkazu, dokud ho nezveřejníš).
- **Nové: odkaz s názvem obrazu.** `[](chqmf)` s prázdným textem ukáže na webu jako text odkazu název obrazu
  (i v textech pro Instagram a Fler); po přejmenování obrazu se změní sám.
- **Nové: související obrazy pro vyhledávače.** Stránka obrazu je ve strukturovaných datech popsaná jako stránka
  o obrazu s odkazy na související obrazy.

## 2026-11-15

- **Nové: tvrdé mezery.** Web sám hlídá, aby se řádek nezalomil tam, kde se to v češtině nedělá: za jednopísmennou
  předložkou nebo spojkou (k, s, v, z, o, u, a, i), mezi číslem a jednotkou (5 cm, 20 %, 2 500 Kč), kolem × v rozměru
  (30 × 40 cm), za zkratkou (např., tzv., sv.), uvnitř data (15. 11. 2026), za pořadovým číslem (1. místo), před
  pomlčkou ve větě a uvnitř rozsahu let (2019–2024; „2019 - 2024“ se zobrazí jako 2019–2024). Platí v textech stránek,
  obrazů, kolekcí a roků, v názvech obrazů, kolekcí a nadpisech i v textu příspěvků pro Instagram a popisu pro Fler.
  Psát se nic nemusí.
- **Nové: fotka v textu stránky.** V textu stránek ze `stranky/` (O mně, Kontakt, kurzy, 404) jde samostatným odstavcem
  `[fotka: portret, vlevo]` (nebo `vpravo`) vložit fotku ze složky `fotky/`: text nad ní je přes celou šířku, text pod ní
  ji obtéká a po jejím konci zase běží přes celou šířku; na mobilu je fotka mezi odstavci. Na O mně tím portrét
  přešel ze sloupce vpravo do textu vlevo, níž pod úvodní odstavce. Neznámá fotka nebo strana zastaví zpracování
  s hláškou.
- **Nové: hra Detail dne na webu, zkušebně.** Stránka `/detail-dne/` se třemi denními hádankami z obrazů. Zatím na ni nevede
  žádný odkaz a vyhledávače ji vynechají; nejdřív ji vyzkouší rodina. Kapky, série a sbírka se ukládají jen v prohlížeči
  hráče. Data hry se připraví při každém sestavení webu (build trvá asi o 12 s déle), nový obraz se do hry dostane sám.
- **Nové: archiv Detailu dne a statistiky hry.** Starší dny jdou dohrát za poloviční kapky (sekce „Archiv“, adresa `?den=3`),
  série se tím nemění. Rozehraný den si hráč pamatuje i s hádankou, takže ho nové obrazy nepřeskládají. Google Analytics
  dostává události `game_start`, `game_end` a sdílení výsledku (`share` se `source: game`); parametry je třeba jednou
  zaregistrovat v GA (README webu, *Návštěvnost*).
- **Změna: Detail dne přehledněji.** Archiv jako dlaždice dnů (datum, den v týdnu, puntík za každou úroveň), neodehrané úrovně
  dne světle žluté (nová barva palet `todo`), po dohraném dni odkaz „V archivu na tebe čeká ještě N dní ↓“, opravené puntíky
  pokusů, jemnější mozaika (50 kostek na šířku místo 33) a slabší mlha (rozostření 5 px místo 7 v okně počítače) ve všech úrovních; mlha a vlny jsou teď podíl okna, takže je hádanka na telefonu stejně těžká jako na počítači (dřív dvakrát těžší), archiv po měsících, jakmile dny sahají do dvou (starší měsíce sbalené, u každého kolik dní v něm čeká). Dočasně sekce „Diagnostika“ s parametry právě hrané
  hádanky a tlačítkem „Zkopírovat diagnostiku“, pro připomínky rodiny; před zveřejněním zmizí.

## 2026-11-04

- **Nové: prototyp hry Detail dne.** Denní hádanka „ze kterého obrazu je tento detail?“ ve třech obtížnostech, s kapkami, hodnostmi, sérií a sbírkou
  (`npm run prototypes`, `detail-dne.html`; ladění efektů `detail-efekty.html`, základ editoru kvízu `detail-kviz.html`). Každý den se losuje
  jeden z pěti pojmenovaných vzhledů úrovně (např. Ranní mlha, Za záclonou, Fata morgána), nikdy stejný dva dny po sobě; žádný pohled
  hádanky nesahá na okraj papíru ani k podpisu; vzhledy se ověřují na pevném vzorku 12 obrazů `detail-vzorek.html` (obraz jde ručně vyměnit);
  těžká úroveň dává i kresby a oleje; během hry nic neposkočí a na telefonu je výřez i všechny náhledy na jedné obrazovce. Na webu zatím není. Nápady a plán ve společných soukromých dokumentech správce.

## 2026-11-02

- **Změna: kontrola nastavení rep už nehlásí falešné změny.** Volby sloučení (např. automatické sloučení), které GitHub
  tokenu jen pro čtení jinak nevrací, čte jinudy, takže je hlídá dál. Co přečíst nejde, ohlásí jako „nejde přečíst“
  i s důvodem od GitHubu, ne jako změnu. Token `CHECK_TOKEN` potřebuje navíc oprávnění *Actions: Read-only*.
- **Konec: starý název tokenu `BILLING_TOKEN`** se už nečte, nikdy nebyl nastavený. Platí jen `CHECK_TOKEN`.
- **Nové: kontrola hlídá vypršení `CHECK_TOKEN`** 14 dní předem, stejně jako u `PAVLA_TOKEN`.
- **Nové: když GitHub token odmítne, hláška řekne, které oprávnění mu chybí** (např. „Plan: Read-only“).

## 2026-10-31

- **Nové: na úvodní stránce tlačítko „▶ Moje nejmilejší“** vedle „Prohlédnout tvorbu“: promítne obrazy z výběru
  autorky (`featured: true`) od náhodného přes celou obrazovku. Text tlačítka je v `_index.yaml` (`button_show`,
  `""` = bez tlačítka), ukáže se jen s aspoň jedním obrazem ve výběru. Totéž promítání má patička každé stránky
  jako odkaz „Moje nejmilejší“.
- **Změna: na Kontaktu jsou obě promítání pod jedním popiskem „Promítnout“**: „Obrazy na prodej · Moje nejmilejší“
  (dřív popisek „Obrazy na prodej“ a odkaz „Promítnout“).
- **Změna: Kontakt ukazuje Pinterest jako @pavlakramolisova** (dřív „Pavla na Pinterestu“), stejně jako Instagram;
  všechny odkazy na Kontaktu mají bublinu, kam vedou, a adresy jsou ve třech odstínech: jméno
  „pavla“ barvou textu, příjmení „kramolis(ova)“ modrozeleně, „@“, tečky a „.cz“ nejslaběji. Stejně barevné je
  jméno v patičce („© 2026 Pavla Kramolišová“).
- **Nové: v Google Analytics se počítá, odkud promítání začalo**: úvodní stránka, patička, Kontakt (`cinema_open`
  s `method` `home` / `footer` / `contact`).

## 2026-10-30

- **Změna: prohlížeč fotek díla ukazuje obrázky větší** (do 96 % šířky a 90 % výšky okna, dřív 92 % a 82 %)
  **a v barvách zvolené palety** (dřív vždy tmavý). **Nové:** klávesa F nebo tlačítko vedle × ho přepne do celé
  obrazovky s popiskem přes spodek obrázku.
- **Nové: šipky ← → na stránce obrazu** vedou na předchozí a další obraz (jako odkazy dole).
- **Změna: popisek v promítání ukazuje ★ u výběru autorky a malé „K PRODEJI“ (nebo „REZERVOVÁNO“) u obrazu na prodej;**
  u ostatních nic. Se skrytými popisky zmizí i tyto značky; s ovládáním (pohyb myši) je popisek vidět vždy.
- **Nové: v patičce a na Kontaktu odkaz „Obrazy na prodej“**, který rovnou promítá obrazy na prodej od náhodného.
  První promítání v kartě prohlížeče ukáže na 4 s nápovědu „← → listovat · ↓ obraz · ↑ kolekce“ (na telefonu tahy), otevřené odkazem i „klik nebo F = celá obrazovka“ (to pak při každém otevření odkazem). Klávesa F celou obrazovku zapne i vypne,
  promítání pak běží dál v okně (Esc ho jako dřív zavře). Nápovědu ukáže znovu klávesa ? nebo „?“ v ovládání (i na telefonu);
  v celé obrazovce radí „F = celá obrazovka / okno“. „▶ Promítat“ je odkaz,
  jde zkopírovat (`…&cinema=random`).
- **Změna: adresa promítání nese jen filtry, obraz a čas,** ne zobrazení galerie (dlaždice, počet na stránku): kdo
  odkaz dostane, uvidí po zavření galerii po svém.
- **Změna: kdo v promítání hýbe myší, ťukne nebo táhne prstem, tomu obraz hned neuteče:** zůstane ještě aspoň 5 s.
- **Nové: promítání má vlastní barvy** (výchozí Noc), tlačítko „Barvy“ je přepíná (Papír, Pergamen, Noc, podle
  systému) a pamatují se zvlášť od barev webu. **Na telefonu tah prstem nahoru otevře kolekci obrazu, dolů jeho stránku;**
  obraz mezitím jde s prstem jako náznak, kam tah vede.
- **Nové: promítání obrazů („▶ Promítat“).** V celé tvorbě, roku i kolekci (i s filtry) promítne web vybraná díla přes
  celou obrazovku v náhodném pořadí, s prolínáním, popiskem dole a ovládáním až po pohybu myši či ťuknutí (časy 5 s až
  3 min, pauza mezerníkem, popisky na chvíli / stále / skryté, odkaz na promítání, tlačítko „Celá obrazovka“). Adresa
  promítání jde poslat dál. Obrázky v AVIF (menší data na velkých obrazovkách).
- **Změna: prohlížeč fotek díla posouvá obrázek s prstem** a vedle něj ukazuje další detail nebo mockup (jako promítání).
- **Změna: oklikání rohů (`npm run corners`) otevírá „Rohy zblízka“ ve zvětšení 2×** (dřív 4×; 4× a 8× dál v nabídce
  a klávesou `Z`).

## 2026-10-29

- **Změna: větev s obrázky aktualizace po sloučení zmizí.** Nasazení webu po převzetí obrázků do `main_binary`
  smaže v repu `pavla` větev `obsah/aktualizace_binary` (jen když jsou její obrázky už převzaté), aby nestrašila v seznamu větví.
- **Nové: fotky pro Fler jen na vyžádání (`meta_fler`).** Cena na webu už neznamená fotky pro Fler: obraz se může
  prodávat i napřímo. Fotky pro Fler vzniknou jen u obrazu na prodej s `meta_fler: true` (výchozí `false`).
- **Změna: fotky pro Instagram a Fler jen do vložení odkazu.** Až má obraz odkaz `instagram:` / `fler:`, jeho fotky
  zmizí (už jsou použité); přehled ho ukáže s odkazem. Doporučení `odkaz-instagram-bez-exportu` zrušeno, nové
  `fler-bez-prodeje`, `prodej-bez-fleru` jen u obrazů s `meta_fler: true`.
- **Nové: export nastavení rep na GitHubu** ([docs/github-nastaveni/](github-nastaveni/)): kontrolní seznam
  všech nastavení obou rep (auto-merge, ruleset, Pages, Actions, secrets …) pro případné nové repo. Kontrola
  automatiky ho každé první pondělí v měsíci porovná se skutečností a rozdíl ohlásí (`[nastaveni-se-zmenilo]`).
  Pro ni i pro minuty Actions slouží jeden token jen pro čtení, secret `CHECK_TOKEN` (místo `BILLING_TOKEN`).
- **Změna: chybějící fotky pro Instagram nebo Fler se doplní samy**, bez nového zpracování celého obrazu.
- **Změna: vyrobené soubory mimo historii gitu** (po přechodu, viz [docs/github-provoz.md](github-provoz.md)):
  `export/` je ve větvi `main_binary` (a `<větev>_binary`), obrázky webu v repu `pavla` ve větvi `main_binary`.
  Každý běh tyto větve celé nahradí, takže se v repech nehromadí staré verze fotek.

- **Změna: zpracování ve větvi je rychlejší.** Náhledy ořezu rozpracovaných obrazů se kreslí jen u obrazu s novou
  nebo změněnou fotkou či rohy; dřív se při každém běhu kreslily všechny znovu (77 draftů = přes 4 minuty).
- **Změna: obrázky webu se vyrábějí rychleji.** AVIF s nižším úsilím kódování: stejná velikost, o třetinu kratší čas.
  Úprava scén mockupů přegeneruje jen obrazy s mockupy, ne všechny.
- **Nové: log zpracování ukazuje, co jak dlouho trvá** (u každého obrazu jeho kroky, na konci fáze běhu).
- **Změna: běh bez nových obrázků je rychlejší.** Umístění obrazu ve scénách ateliéru se počítá jen u obrazů pro
  Instagram a náhled pro sdílení úvodních obrazů se kreslí jen při změně (testovací data: z 32 s na 9 s).
- **Nové: kontrola automatiky hlídá minuty GitHub Actions** (s novým secretem `BILLING_TOKEN`): spotřebu soukromých rep
  za měsíc, tempo a jakoukoli platbu (`[dochazeji-minuty]`, `[placene-minuty]`).
- **Nové: kontrola automatiky hlídá velikost.** Každé pondělí vypíše velikost obou rep a nasazeného webu proti limitům
  GitHubu a od 70 % pošle e-mail (`[blizi-se-limit]`). Rozbor doby zpracování, odhad pro 500 obrazů a plány:
  [docs/github-provoz.md](github-provoz.md).

## 2026-10-26

- **Změna: týdenní kontrola už nehlásí falešné poplachy.** Rozpracovaný obraz s technikou `DOPLNIT` už nehlásí jako
  „novou techniku bez druhu díla“, a obrázek webu, který se při kontrole jednou nenačetl, zkusí ještě dvakrát, než
  ho ohlásí jako chybějící (u chybějícího napíše, co web vrátil, např. `HTTP 404`).
- **Nové: rohy obrazu se dají naklikat myší.** `npm run corners` v repu webu otevře v prohlížeči lokální stránku:
  seznam rozpracovaných obrazů, fotka, na které klik přesune nejbližší roh, každý roh zvětšený pro přesné umístění,
  lupa u kurzoru (držet `Ctrl`/`⌘`), barevné čáry z rohů pro pravoúhlý ořez (zelené = zarovnané, do červena = čím víc
  se liší, roh se k nim při tažení přichytí), hlídání překřížených rohů, přehled kláves na `?`, hotový blok
  `meta_corners` ke zkopírování a po potvrzení zápis rovnou do popisu obrazu.

## 2026-10-22

- **Nové: týdenní kontrola hlídá překlady štítků.** Kontrola automatiky (pondělí) ohlásí štítek nebo techniku
  kteréhokoli obrazu bez anglického překladu pro Instagram a Pinterest (`[preklad-chybi]`), dřív než obraz na
  Instagram nebo Pinterest půjde. Doplněny překlady motýl, pláž a plody.

- **Nové: statistika prohlížeče fotek.** Každý obrázek ukázaný ve zvětšení je v Google Analytics událost
  `image_view`: dílo, obrázek (`obraz`, `detail-…`, `mockup-…`), jeho druh a jak se na něj návštěvník dostal (klik,
  šipka, tah, klávesa, odkaz, Zpět). Dimenze v GA mají popisy (README webu, Návštěvnost).

- **Nové: plátno v mockupech bez pasparty.** Obraz s `meta_edge: canvas` visí v mockupu bez pasparty, v rámu
  podle scény: obývák večer lišta přímo na plátně, ložnice (a scény bez vlastního nastavení) tenký stínový rám se
  spárou, komoda bez rámu jen s hlubším stínem. Bez pasparty se vejde i do menších scén.

- **Změna: mockupy jako vizualizace.** Pod mockupem je „<scéna> (vizualizace)“ místo skutečné velikosti, pod všemi
  drobná poznámka „Vizualizace – rám je jen pro představu.“, ve zvětšení „<název> · <scéna> (vizualizace)“. Nadpis
  u obrazu, který se neprodává, je „Jak by mohl vypadat na zdi“ (dřív „Jak vypadá na zdi“).

- **Změna: ve zvětšení má obraz i svůj text.** Popisek je „<název> · <text>“ (dlouhý text zkrácený), jako
  u detailů „<název> · <popisek detailu>“.

- **Změna: listování tahem prstu ve zvětšení funguje i na telefonu.** Dřív si vodorovný tah přebral prohlížeč
  telefonu.

- **Změna: šipky ve zvětšení se schovávají.** Po otevření a po pohybu myši jsou vidět 3 sekundy, pak zmizí, aby
  nepřekážely obrazu; na telefonu je ukáže (nebo schová) klepnutí na obrázek.

- **Nové: zvětšený obrázek má vlastní adresu.** Klik na obraz, detail nebo mockup zapíše zobrazený obrázek do
  adresy (`…/orangutan-g4psg/#detail-oci`, `#obraz`, `#mockup-<scéna>`), takže jde poslat odkaz rovnou na něj;
  tlačítko Zpět prohlížeč zavře. Neznámý odkaz ukáže stránku obrazu a adresu opraví.

- **Změna: pořadí detailů podle popisků.** Detailní fotky se na stránce obrazu (náhledy i listování ve zvětšení)
  řadí podle pořadí v `details:`; fotky bez popisku následují podle názvu souboru. Dřív rozhodoval jen název souboru.

## 2026-10-19

- **Konec: náhledy ořezu v plné velikosti na stránce běhu.** Artefakt „nahledy-orezu“ zabíral přes 3 GB a úložiště
  GitHub Actions má zdarma 0,5 GB, proto ho zpracování ani zkušební běh už nenahrávají; náhledy zmenšené na 2000 px
  v `export/draft/` zůstávají. Artefakt nasazení webu drží jen 1 den.
- **Nové: náhled textů stránek.** `export/stranky/README.md` ukazuje texty úvodní stránky, stránek ze `stranky/`
  a roků tak, jak budou na webu (s odkazy na popis a na stránku); píše se při každém zpracování, i ve větvi.
- **Konec: přejmenování `description` → `text`.** Všechny popisy (main i větev `obrazy-posledni-rok`) jsou převedené,
  zpracování už nic nepřejmenovává: `description` je vždy jen popis pro Google.
- **Změna: `text` a `description` všude stejně.** Text na stránce je ve všech popisech (obraz, kolekce, rok, úvod,
  Mimo kolekce, stránky) `text`; `description` je jen nepovinný popis pro Google, náhled odkazu a pin (bez něj se
  použije začátek textu). Zpracování dosavadní `description` samo přejmenovalo na `text`, i ve větvích (u stránek ve
  `stranky/` je `description` teď také nepovinný).
- **Změna: texty vždy jako `|`.** Zpracování zapíše každý text jako `text: |` (dlouhé řádky zalomí, vlastní zalomení
  nechá), dřívější `>` a `>-` převede; zalomení řádku je na webu mezera, prázdný řádek nový odstavec. Technický
  komentář u `text` vysvětluje zápis i formátování po bodech.
- **Nové: formátování všude.** Tučně, kurzíva a odkazy fungují v textech obrazů, kolekcí, roků, úvodu i stránek;
  bublina, Instagram, Fler a karta kolekce dostanou čistý text.
- **Nové: formátování v popiscích detailů.** `details` obrazu umí tučně, kurzívu i odkazy; na webu je popisek pod
  náhledem mimo odkaz na zvětšení, takže odkaz v něm funguje.
- **Nové: náhled formátování v přehledu.** `export/README.md` ukazuje texty a popisky detailů formátované tak, jak
  budou na webu (odkazy na web s celou adresou), takže je Pavla vidí už ve větvi před zveřejněním. Stejně i `README.md`
  každého rozpracovaného obrazu v `export/draft/` (sekce „Text na webu“).
- **Změna: popis formátování u všech formátovaných údajů.** Technický komentář `closing`, `empty_closing` a `details`
  má celý seznam formátování jako `text` (dřív jen odkaz na něj).
- **Nové: texty prázdného webu a tlačítko v obsahu.** `button` („Prohlédnout tvorbu“), `empty_text` a `empty_closing`
  (věty, dokud na webu není žádný obraz) v `_index.yaml`.
- **Nové: texty stránek O mně a Kontakt v obsahu.** Text stránky a popis pro vyhledávače jsou teď v `stranky/o-mne.yaml`
  a `stranky/kontakt.yaml` (u O mně i tlumený závěrečný odstavec `closing`); upravují se přes GitHub jako ostatní popisy
  a jejich změna spustí „Zpracování obsahu“. Zpracování je založilo s dosavadními texty, web vypadá stejně. Prázdný
  nebo delší než 160 znaků popis pro vyhledávače zastaví zpracování; týdenní kontrola hlídá i neznámé atributy ve `stranky/`.
- **Nové: další texty v obsahu.** Nadpis úvodní stránky („Barvy, voda a trochu náhody“) je `heading` v `_index.yaml`,
  popisek „Žiji a maluji“ je `location_label` v `stranky/kontakt.yaml` a celý text stránky 404 (titulek, nadpis, text,
  odkazy) je v `stranky/404.yaml`. Web vypadá stejně.
- **Nové: formátování textů stránek.** V `text` a `closing` stránek ve `stranky/` funguje odkaz `[text](adresa)`,
  `**tučně**` a `*kurzíva*` (nikdy HTML); odkaz s adresou bez `https://`, `mailto:` nebo `/` zastaví zpracování.
- **Nové: stránka Kurzy připravená.** Soubor `stranky/kurzy.yaml` vytvoří stránku `/kurzy/` (i v mapě webu), jeho
  smazání ji odstraní; zatím neexistuje a v menu není.
- **Změna: týdenní kontrola** hlídá neznámé atributy i v `roky/`.

## 2026-10-18

- **Změna:** horní hrana lišty stojanu je přesnější: obraz na ní stojí o kus výš a kamera stojanu ji teď bere ze stejné
  čáry, takže spodní hrana obrazu leží na liště rovně (dřív pootočená o 1,4°).
- **Nové:** rekvizity i u stojanu (sklenice vlevo). Obraz na stojanu musí minout sklenici a být celý na fotce; když na
  ose ne, posune se po liště, nejvýš o 15 cm (Mariánská vyhlídka o 1 cm doleva, jinak by ji uřízl okraj fotky).
  Obrazy širší, než se na fotku stojanu vejdou (teď KZK snící a Orangutan, 70 × 50 cm), se ohlásí „Ke kontrole“:
  okraj fotky by je ořízl.
- **Změna:** když se obraz do některé ze tří scén ateliéru nevejde, fotka té scény se už nevyrobí (dřív vznikla
  s obrazem přes rekvizity nebo uříznutým); souhrn to dál ukáže v „Ke kontrole“, stará fotka se smaže.
- **Změna:** světlý stůl má kameru z hran desky napříč i podél (na sebe kolmých), obraz na něm tak leží rovnoběžně
  s oběma směry stolu. Prototyp kreslí i `center` (kam ideálně položit střed obrazu) se souřadnicemi.
- **Změna:** obraz na stole leží natočený k divákovi (na fotce vodorovně), ne rovnoběžně s hranami stolu; na tmavém
  stole je to asi 20°, na světlém 9° proti hranám. Mariánská vyhlídka se tak vejde i na tmavý stůl.
- **Nové:** `meta_edge` v popisu obrazu říká, jak vypadá jeho hrana ve scénách ateliéru: `deckle` papír s roztřepenou
  hranou (výchozí, jako dosud), `cut` papír s čistou rovnou hranou, `canvas` plátno na rámu tlusté asi 2 cm (olejomalby
  ho mají nastavené). Tloušťka obrazu už není bílý pruh: bok opakuje barvu okraje obrazu (u plátna rozostřenou malbu)
  a je osvětlený podle toho, jak je natočený ke světlu. Fotky scén se kvůli tomu u všech obrazů vyrobí znovu.
- **Změna:** Pinterest už nezdvojuje piny. Obraz má v kanálu stálou adresu obrázku (Pinterest pozná pin podle ní),
  i když se pin změní (fotka, název, rozměr). Nový pin jen s `meta_pinterest_version: 2` (3, …) v popisu obrazu.

## 2026-10-17

- **Nové: zadání, ze kterých generátor vyrobil scény ateliéru, jsou uložená u scén** (`mockups/instagram/README.md`
  v repu webu), i s porovnáním se spočítanou kamerou. Scény tak jdou vygenerovat znovu. Test hlídá, že kamera
  spočítaná z hran stolu a stojanu zůstane v rozsahu zadání (výška nad stolem, úhel pohledu, strana, pootočení listu).
  Prototyp „Kamera scén“ ukazuje výšku kamery nad stolem (u stojanu nad lištou), úhel pohledu a polohu vůči listu
  v cm a vedle toho, co chtělo zadání.
  U každé scény má vpravo nahoře vypínač pomocných čar (dílo ve scéně čistě, jak bude vypadat) a „Obnovit
  doporučené“, které vrátí kameru a hrany, se kterými dnes počítá automatika.
  Ukazuje i překážky: předměty před obrazem (paletka na stojanu, ta je i v prototypu před obrazem), rekvizity,
  které obraz nesmí zakrýt, a volnou část stolu.
  Obraz v prototypu leží přesně tam, kam ho dá automatika (posunutý mimo rekvizity), a bez pomocných čar je vidět
  i výřez výsledné fotky. Obrys plechové paletky na stojanu je přesnější (levá hrana a hrot víc vlevo,
  pravá část níž, takže obraz za ní už nevykukuje).
  Přepínač „jen díla, která se nevejdou“ nechá ve výběru obrazu jen ta, pro která se v některé scéně nenajde místo
  (u každého i se jmény těch scén), takže jdou problematické kombinace rychle projít.
  Nad fotkou scény ukazuje u kurzoru jeho polohu v bodech fotky, ve stejném tvaru jako `scenes.yaml`: obrysy paletky
  a předmětů na stole jde tak odečíst rovnou z prototypu. Kliknutím do scény se bod pod kurzorem zkopíruje jako
  `[x, y]`, kliknutí se Shiftem body skládá za sebe a do schránky jde celý obrys `[[x, y], [x, y], …]`.
  Každá scéna v prototypu má vlastní posuvník zvětšení (až 8×) na prohlížení detailů; nahradil společný výběr
  „Zvětšení“ v záhlaví. Zvětšovat jde i Cmd + kolečkem nebo sevřením prstů na touchpadu, kolem místa pod kurzorem.
  U bodů obrysů překážek (paletka, předměty na stole, volná část stolu) jsou v prototypu napsané jejich souřadnice,
  stejné jako ve `scenes.yaml`; stejně u obou bodů lišty stojanu a u středu držáku.

## 2026-10-16

- **Změna: obraz ve scénách ateliéru leží rovnoběžně s hranami stolu**, už se nahodile nepootáčí. Perspektivu
  scény teď určují skutečné hrany stolu a stojanu (zadní a přední hrana desky, spáry prken, deska a lišta stojanu):
  rovnoběžné hrany se na fotce sbíhají do jednoho bodu a kamera se nastaví tak, aby do něj mířily, nakreslený prázdný
  list už určuje jen místo a vzdálenost. Na stojanu tak spodní hrana obrazu leží rovně na liště. Fotky scén se při
  příštím běhu vyrobí znovu.
- **Nové: prototyp „Kamera scén“ pro ladění perspektivy scén ateliéru** (`npm run prototypes`, `kamera-scen.html`
  v repu webu). Tři scény s vybraným obrazem, posuvníky ohniska, zenitu, azimutu, natočení foťáku, vzdálenosti
  a středu listu, hrany stolu a stojanu i hrany obrazu protažené až za okraj fotky (rovnoběžné se sejdou v jednom
  bodě), úprava hran myší, mřížka v rovině stolu / stojanu, horizont, kroužky a lišta jako vodítka. Nalezenou kameru jde
  zapsat ke scéně jako `camera` a pipeline ji použije místo odhadu z nakresleného listu (ten mohl generátor nakreslit
  špatně).
- **Změna: obraz ve scénách ateliéru pro Instagram vypadá jako skutečný list papíru.** Perspektiva už se neodhaduje
  ručně: z rohů prázdného listu se spočítá kamera scény (ohnisko, odkud a pod jakým úhlem se dívá), u světlého stolu
  podle kroužků od hrnku na stole, protože list je tam nakreslený moc „zepředu“. Obraz má tloušťku papíru (hrana
  z několika vrstev, vidět jen ze strany ke kameře), leží kousek nad stolem, je mírně zvlněný, okraje má lehce
  zvednuté a pod nimi kontaktní stín. Scéna se kreslí rovnou ve velikosti fotky, takže je obraz ostrý i u přiblížení.
  Všechny fotky scén se při příštím běhu vyrobí znovu.

## 2026-10-15

- **Změna: hvězdička výběru autorky na stránce obrazu je vpravo** v úrovni prvního řádku názvu, ne hned za ním.
  U dlouhého názvu už nezůstane sama na novém řádku.
- **Nové: kontrola jmen souborů a složek.** Ve `tvorba/`, `fotky/` a `roky/` smí jméno obsahovat jen malá písmena
  bez diakritiky, číslice a pomlčky (výjimky `_index.yaml` a `_cover.*`), přípona jen malými písmeny a fotky `.jpg`
  (ne `.jpeg`). Mezera, podtržítko, čárka, velké písmeno, diakritika, `.jpeg` nebo neviditelný znak = chyba s návrhem nového jména a zpracování se zastaví dřív, než cokoli zapíše.
  Dřív k fotce `Instagram_surf.jpg` vznikl popis `instagram-surf.yaml` s jiným jménem.
- **Nové: technika na stránce obrazu je odkaz** na celou tvorbu s filtrem té techniky, stejně jako štítky pod obrazem.
- **Nové: bubliny nad odkazy na další obrazy** na stránce obrazu: technika, štítky, kolekce i navigace nahoře
  („← Tvorba“, rok) ukážou jednotně „Všechny obrazy …“ (s technikou, se štítkem, z kolekce, z roku).
- **Změna: technika obrazu se musí vybrat.** Kostra popisu nového obrazu už nemá výchozí `technique: akvarel`,
  ale `technique: DOPLNIT`; obraz se nezveřejní, dokud se technika nevyplní (nejčastější jsou v komentáři nad ní
  ke zkopírování). Dřív kresby a skici tiše zůstávaly jako „akvarel“.
- **Nové: překlady dalších štítků a technik** pro hashtagy na Instagramu a klíčová slova pinů: `akt`, `hudba`,
  `skica`, `kresba perem`, `kresba uhlem`.
- **Nové: značky přes obrazy v zobrazení „Dlaždice“.** V galerii, rocích a kolekcích má obraz z výběru autorky
  vlevo nahoře hvězdičku a obraz na prodej vpravo dole košík (na malých dlaždicích jen hvězdička); na úvodní
  stránce jen menší, průsvitnější hvězdička. U velkých obrazů zůstává hvězdička u názvu a štítek stavu. Nastavení
  webu (`site.config.yaml`) zvlášť pro galerii (`gallery.tileMarks`) a úvodní stránku (`home.tileMarks`).
- **Nové: prototypy vzhledu** (zarovnání sloupců, značky na dlaždicích): stránky se skutečnými obrazy, kde jde
  nastavení vyzkoušet posuvníky; vyrábí je správce webu na počítači (`npm run prototypes`), viz README „Vyzkoušení vzhledu“.
- **Změna: sloupce obrazů končí dole stejně** (úvodní stránka i galerie). Nižší sloupec nejdřív mírně rozšíří mezery
  mezi obrazy (nejvýš na dvojnásobek), zbytek místa rozdělí nad a pod sebe (nahoře nejvýš 12 px). Sloupce jsou
  seřazené podle počtu obrazů a plný a prázdný se střídají. Vše jde ladit v nastavení webu (`site.config.yaml`),
  zvlášť pro úvodní stránku (`home.columns`) a pro galerii, roky a kolekce (`gallery.columns`): `maxGap`, `maxTop`, `order`.
- **Nové: přepínání zobrazení na úvodní stránce.** „Nejnovější“ mají stejný přepínač jako galerie (velké obrazy /
  dlaždice, u dlaždic menší a větší). Výchozí jsou **střední dlaždice** (30 obrazů); velké obrazy ukážou 6, velké
  dlaždice 20, malé 63, aby zabraly zhruba stejnou výšku. Adresa úvodní stránky zůstává čistá, jiné zobrazení se
  do ní zapíše (`?view=grid`, `?tile=s`), takže jde poslat dál. Volba se pamatuje zvlášť od galerie.
- **Nové: na úvodní stránce končí sloupce obrazů skoro stejně vysoko.** Obrazy se do sloupců rozdělí podle své výšky,
  nejnovější zůstávají nahoře.
- **Nové: na telefonu ukazuje úvodní stránka méně obrazů** (velké obrazy 3, dlaždice 10 / 24 / 40). Počty pro počítač
  i telefon jsou v nastavení webu (`site.config.yaml`, `home.recent`).
- **Změna: zapamatované zobrazení úvodní stránky se ukáže hned**, bez probliknutí výchozích dlaždic.
- **Nové: sloupce stejné výšky i v galerii, na stránkách roků a kolekcí** (na každé stránce, po každém filtru).
- **Změna: zapamatované zobrazení galerie (dlaždice) se ukáže hned**, bez probliknutí velkých obrazů.
- **Nové: úvodní stránka má počty obrazů i pro tablet** (do 1100 px: velké obrazy 4, dlaždice 16 / 25 / 49),
  v nastavení `home.recent.tablet`.
- **Nové: přepnutí zobrazení (úvodní stránka i galerie) se počítá ve statistikách** (událost `view_change`; v Google
  Analytics je potřeba jednou zaregistrovat vlastní dimenze `listing` a `view`).

## 2026-10-14

- **Změna: štítky v bublině nad obrazem jsou na konci**, za popisem a oddělené prázdným řádkem.
- **Změna: v přehledu všech obrazů je ★ hned za názvem**, před kódem obrazu („KZK snící ★ · w299p @ …“).
- **Změna: obrázek pro Pinterest a náhled pro sdílení mají v názvu otisk obsahu** (`pin-1a2b3c4d.jpg`,
  `og-1a2b3c4d.jpg`). Po změně obrázku (lepší fotka, jiný ořez) má nový adresu, takže si Pinterest u nového pinu
  i sociální sítě u nového náhledu odkazu vezmou novou verzi. Už existující pin to nezmění, ten se musí opravit ručně
  na Pinterestu. Náhled roku, kolekce a úvodní stránky leží nově ve složce `_og/` stránky. Všechna díla se kvůli
  tomu jednou přegenerují (větší aktualizace webu při příštím zpracování obsahu).
- **Nové: zrušení všech filtrů jedním klikem.** Při zapnutém filtru je u počtu děl „12 z 58 děl × Zrušit filtry“,
  v liště po posunu „Zrušit vše“ (od dvou filtrů) a v panelu „Upravit“ tlačítko vedle „Hotovo“. Rok a kolekce
  vlastní stránky zůstanou, zobrazení i počet na stránku taky.
- **Změna: úspornější přehled všech obrazů.** Název, kód, ★, datum a rozměr jsou v nadpisu obrazu, popis na
  vlastním řádku, zapnuté volby jedním slovem (`draft`, `instagram:`, `pinterest`, `mockups`), vypnuté a rohy listu
  se nepíšou, stejně jako stav `not-for-sale`; detailní fotky s popisky každá na vlastním řádku pod popisem; místo
  „stav: OK“ je jen `✓` a každá hláška má značku úrovně (`✗`, `⚠`, `💡`, `✎`). Přehled je asi o čtvrtinu menší.
- **Nové: přehled všech obrazů v `export/README.md`.** Jedna stránka se vším o každém obrazu podle kolekcí: kód,
  odkazy na popis, fotku a web, všechny údaje z popisu (i soukromé) a hlášky posledního běhu; nahoře počty hlášek.
  Pro hledání v prohlížeči, bez obrázků, píše ho automatika při každém běhu.
- **Nové: kódy hlášek.** Každá chyba, věc ke kontrole a doporučení v souhrnu běhu končí kódem (např.
  `[bez-rozmeru]`), stejný problém má vždy stejný kód.
- **Nové: doporučení k nesouladu údajů obrazu.** Výběr autorky bez Pinterestu, odkaz na Instagram bez fotek pro
  Instagram, odkaz na Fler u neprodávaného obrazu, obraz na prodej bez odkazu na Fler, cena u neprodávaného obrazu,
  mockupy bez rozměru, mřížka pro Instagram bez fotek pro Instagram, datum v budoucnu.
- **Nové: hvězdička u výběru autorky.** Obraz s `featured: true` má za názvem nenápadnou ★ v galerii i na své
  stránce (tam za nadpisem, ne v něm).
- **Nové: dlaždice v galerii.** Vedle „Na stránku“ jde přepnout na malé obrazy hustě vedle sebe, s vlastními počty
  na stránku (36, 72, 144); volba je v adrese (`?view=tiles`) a prohlížeč si ji pamatuje.
- **Změna: kódy i v týdenní kontrole automatiky.** Každý problém „Kontroly automatiky“ končí kódem ze stejného
  seznamu jako hlášky zpracování (např. `[token-vyprsi]`, `[obrazky-chybi]`), kódy jsou i v titulku issue (a tedy
  v předmětu e-mailu), takže jdou e-maily filtrovat.
- **Nové: velikost dlaždic.** V dlaždicích jdou tlačítky − / + zvolit menší nebo větší dlaždice; volba je v adrese
  (`?tile=s` / `?tile=l`) a prohlížeč si ji pamatuje.
- **Nové: štítky v bublině nad obrazem.** Bublina po najetí myší ukáže i štítky obrazu.
- **Změna: víc rámečků v náhledu `-frames.jpg`.** K čarám 0,3 až 5 % od krajů fotky přibyly 6 až 15 % (po 1 %).

## 2026-10-13

- **Nové: rohy zblízka v náhledech ořezu.** Ke každému náhledu přibyly čtyři výřezy rohů fotky (200 × 200 bodů,
  zvětšené 2,5×) s čarami po 5 bodech do 100 a po 10 do 130 od krajů, čísla nad čarami; čáry teď střídají světlé
  a tmavé barvy (šest odstínů) i v celé fotce s rámečky; v README rozpracovaného obrazu jsou jako tabulka 2 × 2 nad
  celou fotkou.
- **Nové: odkazy v souhrnu běhu.** Jméno souboru v souhrnu je odkaz na ten soubor ve větvi běhu, když jde poznat
  řádek, tak rovnou na něj.
- **Nové: ořez pozadí i na světlé zdi.** Automatika najde rohy obrazu vyfoceného na bílé zdi nebo podkladovém
  papíře (dřív jen na podlaze): stačí rovná hrana plátna nebo papíru, u papíru pomůže stín. Bílý okraj papíru
  akvarelu vyfoceného bez okolí nikdy neořízne. „Ořez podlahy“ se teď jmenuje „Ořez pozadí“, komentář u
  `meta_corners` mluví o rozích obrazu a pozadí.
- **Nové: doporučení u vzorové věty z kostry.** Dokud má kolekce, rok nebo „Mimo kolekce“ pořád vzorovou větu
  z kostry, souhrn běhu v Doporučení připomene, že je vidět na webu a že ji má Pavla přepsat.
- **Změna: popis v nové kostře je připravený jako blok** `description: |` s odsazeným textem: u obrazu
  `DOPLNIT popisek`, u kolekce, roku a „Mimo kolekce“ vzorová věta (hned vidět na webu, přepsat). Komentář
  u `description` radí psát text pod `description: |`, každý řádek odsazený dvěma mezerami.
- **Nové: přesná hláška u neodsazeného textu.** Když text pod `description:` začne na kraji, zpracování místo
  „chybný zápis YAML“ napíše, jak ho správně odsadit, s ukázkou.
- **Opraveno: úklid README kolekcí** v `export/` ověřený testem: bez díla v kolekci README i složka zmizí.
- **Nové: přehled v každé složce kolekce** v `export/draft/`, `export/instagram/` i `export/fler/`
  (např. `export/draft/olejomalby/README.md`), s odkazem zpět na celý přehled.
- **Změna: přehled rozpracovaných obrazů se zapíše i po neúspěšném zpracování**, takže v něm nechybí nové náhledy
  (dřív zůstal starý, dokud zpracování neprošlo bez chyb).
- **Změna: náhledy v `export/draft/` má každý rozpracovaný obraz s fotkou**, i když se nic neořezává
  (`meta_corners: false` nebo samé nuly): celá fotka na papírech, aby všechny rozpracované obrazy vypadaly stejně.

## 2026-10-12

- **Nové: kód obrazu jde zkopírovat** ikonkou vedle něj na stránce obrazu, a je i v README fotek pro Instagram
  a Fler i rozpracovaných obrazů v `export/draft/` (u obrazu „Kód obrazu“, v přehledech za názvem).
- **Nové: kód obrazu na jeho stránce.** Poslední řádek údajů „Kód“ ukazuje trvalý kód obrazu (`id`) a vede na krátkou
  trvalou adresu `/tvorba/<kód>/`; bublina vysvětlí, že kód platí i po přejmenování.
- **Nové: přehled rozpracovaných obrazů se značkami stavu** („✗ 1 · 💡 3“) a složku v `export/draft/` má každý
  rozpracovaný obraz, i bez fotky nebo bez ořezu (jen se stavem popisu).
- **Nové: stav popisu u rozpracovaného obrazu.** `export/draft/…/README.md` ukazuje nad náhledy totéž, co o obraze
  říká souhrn běhu (chyby, ke kontrole, doporučení, co zbývá doplnit). Zapíše se a commitne i tehdy, když zpracování
  skončí chybou; obraz s vlastní chybou si nechá staré náhledy.
- **Nové: zakomentované údaje v „Ke kontrole“.** Řádek jako `# id: TODO` (zakomentovaný údaj, který není
  nepovinný) automatika nečte; souhrn běhu ho teď ukáže a poradí, jestli ho smazat, nebo odkomentovat.
- **Nové: souhrn běhu hlásí uklizené zbloudilé komentáře** u každého souboru („uklizené zbloudilé komentáře: 2“).
- **Změna: žádné zdvojené komentáře v popisech.** Když se smazal údaj (typicky `meta_corners`) a jeho komentář
  zůstal, automatika ho brala jako vlastní poznámku k dalšímu údaji a po znovudoplnění byl komentář v souboru
  dvakrát. Teď kopii automatického komentáře nad jiným údajem uklidí; vlastní poznámky zůstávají.
- **Nové: doporučení k péči o web.** Souhrn běhu upozorní na zveřejněný obraz bez rozměru nebo popisu, detailní
  fotku bez popisku, malou fotku obrazu, rok či kolekci, kde se úvodní obraz nestřídá (málo obrazů ve výběru
  autorky), obraz rozpracovaný déle než 30 dní a fotky pro Instagram déle než 14 dní bez odkazu na příspěvek.
- **Změna: popis nového obrazu** je v kostře prázdný (`description: ""`) místo vzorového textu „Pár vět o obraze.“.
- **Nové: souhrn běhu ukáže, co zbývá doplnit.** Pod „Doporučením“ je sbalený blok „Zbývá doplnit“: u každého popisu
  (rozpracovaný obraz, kolekce, rok, úvod, fotka), kterému zůstalo `DOPLNIT` u komentáře, seznam těch atributů.
  Zveřejněné obrazy s `DOPLNIT` zůstávají v „Ke kontrole“.
- **Nové: náhledy ořezu rozpracovaných obrazů v repu.** Ve složce `export/draft/` (stejně jako `tvorba/`) jsou
  u každého obrazu s `meta_draft: true` tři zmenšené náhledy ořezu podlahy s `README.md`, takže je vidět rovnou
  na GitHubu (i ve větvi); přehled v `export/draft/README.md`. Po zveřejnění obrazu složka zmizí. Zip „nahledy-orezu“
  s plnou velikostí na stránce běhu zůstává.
- **Změna: popis nové kolekce** je v kostře `_index.yaml` prázdný (`description: ""`) místo vzorového textu.
- **Nové: dlouhý popis se sám zalomí.** Popis (obrazu, kolekce, roku, úvodu i „Mimo kolekce“) napsaný na jeden řádek a delší než 140 znaků
  automatika přepíše na víc řádků (`description: >`); text na webu zůstane stejný.
- **Nové: id obrazu v textu příspěvku na Instagramu** za adresou webu (`pavla.kramolis.cz · jujn2`), **v popisu pinu
  na Pinterestu** za „technika · rozměr · rok“ a **hledání podle id** v galerii
  (napiš `jujn2` do pole hledání; u celého id se pod polem ukáže „Enter otevře obraz“
  a Enter rovnou otevře stránku obrazu).
- **Změna: kopie technického komentáře** nad atributem (zdvojený komentář u `meta_instagram_grid` po přechodu na
  zápis sloupce x řádky) zpracování samo smaže; dřív zůstávala v popisu napořád.
- **Změna: odkaz na Fler** v patičce a na Kontaktu je zatím skrytý (prázdné `site.fler`); tlačítka „Koupit na Fleru“
  u jednotlivých obrazů zůstávají.

## 2026-10-11

- **Změna: odkaz na Pinterest** v patičce a na Kontaktu vede rovnou na Pavliny vytvořené piny (`…/_created/`);
  v nastavení zůstává adresa profilu.
- **Změna: Kontakt.** Kontakty (e-mail, Instagram, Pinterest, Fler) jsou pod formulářem i fotkou v jednom řádku přes
  celou šířku stránky, „Žiji a maluji“ zvlášť vpravo.
- **Změna: zápis mřížky pro Instagram** je teď sloupce x řádky: `meta_instagram_grid: 3x3` (nebo `2x1`, `3x1`, `3x4`…,
  od `1x1` do `5x5`); starý zápis číslem ohlásí zpracování jako chybu.
- **Nové: detailní fotky pro Instagram podle tvaru.** Detail blízký 4:5 vyplní snímek jako dosud, dlouhý úzký (matrice
  linorytu) dostane vlastní panorama na víc snímků, jiný nepravidelný leží celý na papíru.
- **Změna: malé úzké obrazy ve scénách ateliéru** se přiblíží víc (linoryt Šumava 2026), ostatní obrazy beze změny.
  Fotky pro Instagram se při dalším zpracování vyrobí znovu.

## 2026-10-10

- **Nové: mřížka na profilu Instagramu.** Údaj `meta_instagram_grid: 9` (nebo `3`, `6`, `12`) u obrazu s
  `meta_instagram: true` rozřeže obraz na dlaždice 3:4, které na profilu dají dohromady jednu fotku (mezery mřížky jsou
  v obraze vynechané, takže dlaždice navazují). README složky ukáže náhled a pořadí zveřejnění s texty. Nový údaj se
  při dalším zpracování doplní do všech popisů zakomentovaný (nepovinný). Možnost `2` = dvojice vedle sebe. Mřížka funguje
  jen v aplikaci na telefonu (3 sloupce), web Instagramu na počítači ukazuje 4 sloupce. U Tetřevské slati jsme ji proto
  zatím zrušili.
- **Nové: příběh kolekce pro Instagram.** Přehled `export/instagram/README.md` má u každé kolekce „Příběh kolekce“:
  příběhy jejích obrazů v pořadí podle data, ke každému odkaz pro nálepku ke zkopírování a odkaz na celou kolekci.
  Odkazy z příběhů mají značky pro Google Analytics (zdroj „instagram“, kampaň „story“).
- **Změna: kompaktnější stránka obrazu.** Popis a štítky jsou pod obrazem, cena je na jednom řádku se stavem
  a krátkým tlačítkem „Zeptat se“. Místo odkazu „Uložit na Pinterest“ je řádek „Sdílet“ s ikonami Pinterestu,
  Facebooku, WhatsAppu a odkazu (na telefonu nabídka sdílení, na počítači zkopírování); odkaz na příspěvek na Instagramu
  („Na Instagramu“) je na stejném řádku. Klik měří Google Analytics jako událost `share` se způsobem sdílení.
- **Změna: nová fotka scény se stojanem pro Instagram** (od ChatGPT, navazuje na verzi s listem), obraz se na
  stojanu vystředí na desku.
- **Nové: Pinterest.** Každý obraz má obrázek pinu (obraz s popiskem hned pod ním, 2:3), obraz s `meta_pinterest: true`
  v popisu se navíc objeví v kanálu `pavla.kramolis.cz/pinterest.xml`, ze kterého si Pinterest sám dělá piny (po jednorázovém připojení firemního
  účtu, viz README „Pinterest“). Každá stránka obrazu má odkaz „Uložit na Pinterest“ pro návštěvníky (měří ho Google
  Analytics, `pinterest_click`). Popis pinu končí klíčovými slovy z techniky a štítků česky i anglicky (vlastní slovník
  obyčejných slov). Odkazy na Pavlin profil na Pinterestu a obchůdek na Fleru jsou v patičce a na Kontaktu. Obrázky
  všech obrazů na webu se při dalším zpracování jednou vyrobí znovu.
  Odkazy z kanálu nesou značky UTM, takže Google Analytics návštěvy z těchto pinů ukáže jako zdroj „pinterest“
  (kampaň „rss“), i když přijdou z aplikace. Nový údaj `meta_pinterest` se při dalším zpracování doplní do všech
  popisů jako `false`.
- **Nové: panorama pro karusel na Instagramu.** Široký obraz s `meta_instagram: true` dostane `pano-1.jpg`, `pano-2.jpg`
  (případně `pano-3.jpg`): obraz přes celou výšku několika snímků, které při listování příspěvkem plynule navazují.
- **Nové: příběh (story) pro Instagram.** Každý obraz s `meta_instagram: true` má `story.jpg` (9:16) s popiskem a volným
  místem na nálepku s odkazem; adresa pro nálepku je v `README.md` složky. Fotky pro Instagram se proto při dalším
  zpracování vyrobí znovu.
- **Nové: odkaz na Instagram u obrazu.** Nepovinný údaj `instagram:` v popisu obrazu = odkaz na příspěvek (jako `fler:`
  pro Fler). Web ho na stránce obrazu ukáže jako „Obraz na Instagramu“. Výrobu fotek pro Instagram dál řídí `meta_instagram`.
  Klik na odkaz měří Google Analytics (událost `instagram_click`, jako u Fleru) a odkazy na Instagram i Fler dostanou
  vyhledávače ve strukturovaných datech obrazu (tentýž obraz jinde).
- **Změna: podpis na fotkách pro Fler** je „Pavla Kramolišová, Roztoky“ (dřív jen jméno). Fotky obrazů na prodej se při
  dalším zpracování vyrobí znovu.
- **Nové: autorství v obrázcích.** Všechny obrázky obrazu na webu (i detaily, mockupy a náhled pro sdílení) nesou
  v sobě jméno autorky, název obrazu, „© rok Pavla Kramolišová“ a odkaz na stránku obrazu; vyhledávače je čtou
  i ze strukturovaných dat stránky. Při dalším zpracování se proto jednou vyrobí znovu obrázky všech obrazů.
- **Změna: přehled exportů podle kolekcí a se stavem.** `export/instagram/README.md` a `export/fler/README.md` jsou
  rozdělené pod nadpisy kolekcí a u každého obrazu ukazují, jestli už je na Instagramu / na Fleru (podle odkazu
  v popisu); totéž je nahoře v náhledu složky obrazu.

## 2026-10-09

- **Nové: náhled exportů na GitHubu.** Každá složka obrazu v `export/instagram/` a `export/fler/` má `README.md`, který
  GitHub ukáže pod soubory: náhledy všech fotek, u Instagramu text příspěvku ke zkopírování, u Fleru cena, rozměr,
  podklad a popis, u obou kolekce a odkaz na stránku obrazu na webu. `export/instagram/` a `export/fler/` mají přehled
  všech obrazů s miniaturami. Samostatný `post.txt` už není, text je v náhledu.
- **Změna: podpis na fotkách pro Fler.** Světlé písmo webu s měkkým tmavým stínem, čitelné na světlém papíře i na
  tmavém či pestrém pozadí mockupu (dřív se barva řídila rohem fotky a na pruhovaném pozadí zanikal). Fotky obrazů
  na prodej se při dalším zpracování vyrobí znovu.
- **Nové: fotky pro Instagram s popiskem a ve scénách ateliéru.** Obraz s `meta_instagram: true` dostane
  vlastní složku `export/instagram/<kolekce>/<obraz>/` (stejná cesta jako v `tvorba/`, dřív vše v jedné složce
  roku) a v ní místo dosavadního originálu na papíru (`-clean`) šest snímků 4:5: obraz s popiskem
  (název, technika · rozměr · rok, adresa webu) na papíru každé ze tří barev webu (Papír, Pergamen, Noc)
  a obraz ve třech stylizovaných scénách ateliéru: na starém tmavém a světlém stole (nahodile pootočený,
  na každém stole na opačnou stranu, mimo rekvizity) a na malířském stojanu (stojí na liště). Obraz je ve
  skutečné velikosti, převezme světlo scény a má jemně roztřepený okraj; malé obrazy se přiblíží. Detailní fotky
  zůstávají. Pro Instagram se obraz ořízne o 0,5 % z každé strany (proužek podlahy u nepřesných rohů).
  K tomu text příspěvku (v náhledu složky `README.md`): název, popis, technika · rozměr · rok, kolekce, „Obraz je na prodej.“, adresa
  webu a hashtagy česky i anglicky. Obraz, který se na stůl nevejde mimo rekvizity, ukáže souhrn zpracování
  v „Ke kontrole“, štítek bez anglického hashtagu v „Doporučení“. Kolekce je v textu i jako hashtag
  (např. `#plenersumava2026`).
- **Změna: fotky pro Fler ve složce obrazu.** `export/fler/` má stejnou strukturu jako `tvorba/`: každý obraz na prodej
  má složku `export/fler/<kolekce>/<obraz>/` s `original.jpg` a `mockup-….jpg` (dřív vše v jedné složce roku
  s dlouhými názvy). Při prvním zpracování se fotky obrazů na prodej vyrobí znovu do nových složek a staré zmizí.
  Pilotně zapnuto u Bobří hráze.

- **Změna: Technika v galerii podle abecedy.** Výběr Technika řadí techniky podle abecedy (dřív podle počtu děl).
- **Nové: kontrola barev v CSS.** Kontrola kódu odhalí použití barvy nebo jiné proměnné, která neexistuje (překlep
  v názvu, kvůli kterému nebylo vidět zvýraznění ve výběru Kolekce).
- **Změna: filtr Kolekce s psaním.** Ve výběru Kolekce v galerii jde psát a seznam kolekcí se zužuje (diakritika
  nevadí), kolekce jsou seřazené podle abecedy, kliknutí do pole označí celý text (psaní ho přepíše), smazané pole ukáže světlou nápovědu „vše“ a Enter ji
  vybere, položka vybraná šipkami je zvýrazněná a v rozbaleném seznamu jsou vidět celé názvy; ovládá se i klávesnicí.
- **Nové: hledání v názvech a popisech obrazů.** V galerii Tvorba (vpravo od nadpisu) i na stránce každého roku
  a kolekce (pod nadpisem) je pole „Hledat v názvech a popisech…“: filtruje už při psaní, diakritika a velká písmena
  nevadí, víc slov musí sedět všechna; dotaz je v adrese (`?q=`), jde poslat dál a kombinuje se se všemi filtry.
- **Nové: stránkování a hledání na přehledu kolekcí.** Přehled kolekcí se stránkuje jako galerie (počet na stránku
  si pamatuje zvlášť) a vpravo od nadpisu má hledání v názvech a popisech kolekcí.
  Kolekce s nejnovějším obrazem je první (nový obraz ji posune nahoru), „Mimo kolekce“ zůstává poslední.

## 2026-10-08

- **Konec: odkaz „O kolekci“ ve filtrech galerie.** Při vybrané kolekci už vedle výběru není odkaz na stránku kolekce;
  vede na ni přehled kolekcí a řádek „Kolekce“ u každého obrazu.
- **Změna: filtry se neschovávají, ale zašednou.** Filtr nebo štítek, který by výběr nezměnil (třeba všechny obrazy
  roku mají stejnou techniku), zůstane vidět zašedlý a ukáže společnou hodnotu, aby bylo vidět, že nechybí.
- **Změna: pořadí filtrů v galerii.** Nahoře je řádek výběrů (Technika, Rok, Kolekce, Stav, Doporučené a počet
  děl), pod ním čipy štítků.
- **Změna: zaškrtávátko v barvách webu.** „Doporučené“ v galerii už není bílé s modrým rámečkem prohlížeče,
  ale v barvách zvolené palety (Papír, Pergamen i Noc).
- **Nové: vlastní text a úvodní obraz „Mimo kolekce“.** V `tvorba/_index.yaml` jde napsat vlastní text
  (`description`, bez něj „Obrazy, které nepatří do žádné kolekce.“), vybrat obraz (`cover`, i s ořezem
  `aspect`/`focus`) nebo nahrát vlastní fotku `tvorba/_cover.jpg`, stejně jako u kolekce.
- **Nové: doporučení na délku názvu obrazu.** Souhrn běhu upozorní na název delší než 40 znaků: ve výsledcích
  vyhledávání a v záložce prohlížeče by se zkrátil.
- **Nové: „Mimo kolekce“ na přehledu kolekcí.** Obrazy, které nejsou v žádné kolekci, mají na konci přehledu
  vlastní položku; vede do galerie na volbu Kolekce „žádná“. Složku kolekce `none` zpracování odmítne.
- **Změna: filtry galerie na jeden řádek.** Na počítači se výběry vejdou vždy na jeden řádek: mají pevnou šířku
  a dlouhý název zkrátí „…“ (po rozbalení je celý), přepínač „Výběr autorky“ se jmenuje „Doporučené“ a „Na stránku“
  je dole pod obrazy vpravo vedle stránek. Souhrn běhu doporučí kratší název kolekce (nad 19 znaků) a techniku
  (nad 14 znaků).
- **Změna: „▴ méně“ v řádku let.** Tlačítko pro sbalení starších let je bez rámečku, se zvýrazněnou šipkou,
  stejně velkou jako šipka „▾“ pro rozbalení (jen otočenou).
- **Nové: filtr Kolekce „žádná“.** Ve výběru Kolekce v galerii je za „vše“ volba „žádná“: ukáže obrazy, které
  nepatří do žádné kolekce (`?collection=none`, v liště filtrů „bez kolekce“).
- **Nové: týdenní kontrola hlídá i texty pro vyhledávače.** „Kontrola automatiky“ ověří na nasazeném webu titulky,
  popisy a strukturovaná data stránek stejně jako kontrola před sloučením.
- **Nové: kontrola titulků, popisů a strukturovaných dat.** Před sloučením se ověří, že každá stránka webu má vlastní
  titulek a popis pro vyhledávače (žádné dva stejné, popis nejvýš 160 znaků) a platná strukturovaná data.
- **Změna: díla se stejným názvem nebo popisem.** Když se dvě díla jmenují stejně (např. „Tetřevská slať“ akvarel
  a tisk z výšky), titulek stránky ve vyhledávači a v záložce prohlížeče má v závorce techniku. Když mají stejný popis,
  popis pro vyhledávače doplní techniku, rozměr a rok. Název a text na stránce obrazu zůstávají, jak je Pavla napsala.
- **Nové: roky na jeden řádek.** Řádek roků nad galerií i roky na přehledu kolekcí zůstanou vždy na jednom řádku,
  od nejnovějšího. Starší roky, které se nevejdou (hlavně na mobilu), schová ovládací prvek „2017–2003 ▾“, který
  je na místě rozbalí. Na stránce staršího roku je řádek rovnou rozbalený.
- **Změna: štítky v galerii abecedně.** Čipy štítků jsou seřazené podle abecedy (dřív podle počtu obrazů), takže
  se známý štítek snadno najde a nový obraz pořadí nepřehází.
- **Nové: kontrola obrázků a mapy webu před sloučením.** „Kontrola kódu“ v repu `pavla` po stavbě webu ověří, že
  žádný obrázek nechybí a že je každá stránka v mapě webu pro vyhledávače; aktualizace obsahu s chybějícím obrázkem
  se nesloučí.
- **Nové: výběr více štítků v galerii.** Čipy štítků jde zapínat a vypínat; každý další štítek výběr zúží
  (obrazy, které mají všechny vybrané), „Vše“ výběr zruší. Zůstanou jen štítky, které výběr ještě zúží, s počty
  obrazů. V adrese je každý štítek zvlášť (`?tag=krajina&tag=voda`), staré odkazy s jedním štítkem fungují dál.
- **Změna: filtry galerie ukazují počty podle aktuálního výběru.** Technika, Rok, Kolekce, Stav i „Výběr autorky“
  mají u každé volby počet obrazů, které by ukázala spolu s ostatními filtry, a nabízí jen volby, které výběr zúží
  a nevyprázdní; filtr bez takové volby zmizí. Nejde tak vybrat kombinaci, která nic neukáže.
- **Nové: lišta filtrů v galerii.** Když návštěvník sjede pod filtry a pak posune stránku kousek nahoru, vysune se
  shora tenký řádek s vybranými filtry, počtem obrazů a tlačítkem „Upravit“, které otevře filtry (na mobilu zespodu).
  Každý vybraný filtr je v liště čip s „×“, kterým ho jde jedním klepnutím zrušit. Po změně filtru skočí na začátek
  výsledků. Posunem dolů lišta zmizí, obrazy tak dál mají celou obrazovku.
- **Nové: doporučení ke štítkům v souhrnu běhu.** Pod „Doporučení → Štítky“: jeden štítek ve dvou tvarech
  („květina“ / „květiny“, „plener“ / „plenér“), dva štítky skoro vždy spolu (jako filtr jeden nic nepřidá) a příliš
  mnoho štítků na víc než 2 řádky galerie, s návrhem, které sloučit nebo vynechat. Úplně dole v souhrnu je
  statistika, kolik obrazů má který štítek.

- **Nové: e-mail při selhání zpracování obsahu.** Když „Zpracování obsahu“ selže (i kvůli chybě v popisu),
  založí issue přidělené správci webu se souhrnem chyb, takže mu přijde e-mail, i když změnu nahrála Pavla.
  Další úspěšný běh issue zavře.
- **Nové: e-mail při selhání nasazení webu.** Když se web nepostaví nebo nenasadí, založí se v repu `pavla`
  (veřejné) issue „Nasazení webu selhalo“ přidělené správci; další úspěšné nasazení ho zavře.
- **Nové: e-mail při selhání kontroly kódu.** Selže-li „Kontrola kódu“ na `main` nebo u pull requestu s aktualizací
  obsahu (ten by se jinak jen tiše nesloučil), správci přijde e-mail přes issue v repu `pavla`.

- **Nové: filtr roku na přehledu kolekcí.** Na `/tvorba/kolekce/` jde vybrat rok: zůstanou kolekce, které mají
  z toho roku aspoň jeden obraz, u každé počet obrazů z toho roku („2 z 5 děl“) a odkaz na ni otevře její obrazy
  rovnou z toho roku. Rok je v adrese (`?year=2025`), odkaz jde poslat dál. Rok se všemi kolekcemi se nenabízí
  (ukázal by totéž co „Vše“). Odkaz „Kolekce“ na stránce roku vede na kolekce toho roku.
- **Změna: stránka kolekce.** Výběr „Rok“ nabízí jen roky jejích obrazů s počty (kolekce z jednoho roku ho nemá)
  a odkaz nahoře je „← Kolekce“ zpět na přehled, s rokem vybraným na přehledu, i když mezitím prošel obrazy (dřív „← Tvorba“).
- **Nové: návrat do výpisu.** Odkazy zpět („← Tvorba“, rok a kolekce na stránce obrazu, „← Kolekce“) vedou do
  galerie, roku či kolekce s filtry a stránkou, které tam návštěvník měl, a posunou se na obraz, ze kterého se
  vrací (z kolekce „← Kolekce“ na kolekci v přehledu). Pamatuje se jen v otevřené záložce a jen během prohlížení Tvorby: úvod, O mně nebo Kontakt paměť smažou.
  „Tvorba“ v hlavním menu vždy otevře galerii bez filtrů.

## 2026-10-07

- **Nové: stav „darováno“.** `status: gifted` = darovaný obraz, bez ceny a bez fotek pro Fler (jako prodaný).
- **Změna: filtr Stav.** Místo „k prodeji“ a „neprodané“ (při žádné rezervaci stejné) má volby „na prodej“
  (k prodeji i rezervované), „ještě mám“ (vše kromě prodaných a darovaných) a „už nemám“ (prodané a darované).
  Volba bez obrazů nebo se všemi obrazy stránky se nenabízí, stejně přepínač „Výběr autorky“. Staré odkazy s „k prodeji“ ukážou „na prodej“. Karta v galerii nově ukazuje i štítek „Rezervováno“.
- **Změna: „V soukromé sbírce“ místo „Prodáno“.** Prodané i darované obrazy mají na webu jeden společný štítek
  „V soukromé sbírce“, web je nerozlišuje.
- **Nové: doporučení v souhrnu běhu.** Pod „Ke kontrole“ je část „Doporučení“: obrazy bez štítků, název s malým
  písmenem nebo tečkou na konci, popis a popisky detailů s malým písmenem nebo bez tečky na konci a obrazy na prodej
  bez mockupů; název a text kolekce, text roku a úvodní stránky, popis (`alt`) a popisek (`caption`) fotek
  stránek s malým písmenem nebo bez tečky na konci.
  Nic nezastaví, jen radí.
- **Změna: nejčastější techniky v komentáři.** Komentář u `technique` vypisuje akvarel, brush pen, tisk z výšky
  a kresbu tužkou. Automatika komentáře v popisech sama přepíše.
- **Nové: bublina nad obrazem.** Po najetí myší na obraz v galerii nebo na úvodní obraz (úvod, rok, kolekce)
  ukáže web název, techniku, rozměr, rok, papír, stav prodeje a začátek popisu díla.
- **Změna: Chamoix v komentářích.** Komentář u `support` nabízí akvarelový karton Chamoix (220 g), u `size_cm`
  jeho rozměr `[43, 31]` (a Canson XL je upřesněný na A3). Automatika komentáře v popisech sama přepíše.
- **Změna: v komentářích obyčejná pomlčka.** Možnosti v komentářích (`status`, přepínače, papíry a rozměry)
  oddělují hodnotu od popisu obyčejnou pomlčkou `-`; v `size_cm` přibyl rozměr Canson XL `[41, 30]`.
  Automatika komentáře v popisech sama přepíše.
- **Změna: nejčastější papíry v komentářích.** Komentář u `support` vypisuje nejčastější papíry a u `size_cm`
  jejich obvyklé rozměry, ať jdou do popisu jen zkopírovat. Automatika komentáře v popisech sama přepíše.
- **Změna: možnosti údajů pod sebou.** Komentář u `status`, `meta_draft`, `meta_instagram`, `mockups`
  a `featured` vypisuje možnosti jako seznam, každou na řádku. Automatika komentáře v popisech sama přepíše.
- **Nové: kontrola možností.** Hodnota mimo možnosti (`status: availble`, `featured: ano`…) zastaví zpracování
  chybou, která vypíše platné možnosti. Platí i pro rozpracované obrazy.
- **Změna: souhrn běhu česky a s chybami nahoře.** Všechny chyby kontrol jsou srozumitelně česky (co je
  špatně a jak to opravit), seskupené po souborech a úplně nahoře v souhrnu běhu. Pod nimi je „Ke kontrole“
  (zbylé `DOPLNIT`, podezřelý ořez rohů) a dole, co automatika udělala.
- **Nové: popisky detailů v novém popisu.** Má-li nový obraz vedle sebe složku s detailními fotkami,
  kostra jeho popisu má rovnou `details:` s řádkem pro každou fotku („DOPLNIT popisek detailu“). Zveřejňovaný
  obraz, jehož text pro návštěvníky (název, popis, štítek, popisek detailu…) pořád začíná „DOPLNIT“,
  zpracování zastaví chybou, aby se na web nedostal. Totéž platí vždy pro texty kolekcí, roků, úvodní stránky
  a fotek stránek.
- **Změna: tagy na stránce obrazu pod popisem.** Odkazy na témata (`#krajina`…) jsou hned pod textem popisu,
  před detailními fotkami, ne až úplně dole pod mockupy.
- **Změna: datum nového obrazu z fotky.** Kostra popisu k nové fotce má `date` podle dne, kdy byla fotka
  pořízena (údaje EXIF z fotoaparátu nebo mobilu), ne podle dne zpracování. Fotka bez těchto údajů dostane
  dnešek jako dřív. Datum je dál potřeba zkontrolovat: fotka může vzniknout až po namalování.
- **Změna: v „nahledy-orezu“ všechny tři náhledy.** Zpracování na GitHubu u rozpracovaného obrazu vyrobí tytéž
  tři náhledy jako `npm run preview` v počítači (`-backgrounds.jpg`, `-cut.jpg`, `-frames.jpg`), ne jen náhled
  na pozadí. Souhrn běhu je všechny vyjmenuje.

## 2026-10-06

- **Nové: ořez podlahy.** Automatika u každého obrazu najde čtyři rohy listu na fotce a zapíše je do popisu
  (`meta_corners`, jde je ručně upravit, `false` = neořezávat). Podlaha mimo list je na webu průhledná a okraj
  papíru se plynule prolne s pozadím stránky v každé paletě. Na Instagram jde obraz na papírovém pozadí, na Fler
  na bílém, mockupy ukazují jen papír uvnitř rámu. Rohy se doplní i u už zveřejněných obrazů (jednou, při
  dalším zpracování); webové obrázky všech obrazů se proto jednou přegenerují.
- **Nové: náhledy ořezu rozpracovaných obrazů.** Každé zpracování (na `main` i ve větvi) vyrobí u obrazu
  s `meta_draft: true` náhled bez podlahy na světlém a tmavém pozadí. Je ke stažení na stránce běhu v záložce
  Actions jako „nahledy-orezu“ (14 dní), do gitu nejde.
- **Nové: obrázek oříznutý těsně na list.** Po zprůhlednění podlahy se obrázek zmenší na nejmenší obdélník s celým
  listem, průhledný okraj zbyde jen v rozích pootočeného listu. Webové obrázky všech děl se jednou přegenerují.
- **Nové: náhled ořezu v počítači.** `npm run preview -- <fotka | složka | kolekce>` v repu `pavla` vyrobí tytéž
  náhledy pro libovolné fotky (i zveřejněné) a nalezené rohy vypíše ve tvaru popisu ke zkopírování; obsah jen čte.
  S `--write` je rovnou zapíše do popisů zadaných fotek, které je ještě nemají.
- **Nové: velikost ořezu v náhledu.** Náhled i výpis ukazují u každého rohu, kolik se ořízne (v % fotky);
  víc než 5 % je červeně, aby bylo hned vidět, kde se odřízlo podezřele moc. Hranice jde změnit v nastavení webu
  (`images.edges.suspicious`) a výpis `npm run preview` končí souhrnem jen podezřelých fotek; `--only-suspicious`
  ukáže jen je. Souhrn běhu na GitHubu označí podezřelé nově nalezené rohy „⚠ PODEZŘELÝ ořez“.
- **Změna: náhledy ořezu podle účelu.** Každý náhled má v názvu příponu: `-backgrounds.jpg` (výsledek na světlém
  a tmavém pozadí, i náhledy draftů v „nahledy-orezu“) a `-cut.jpg` (dřív `-original.jpg`).
- **Změna: `-cut.jpg` s čarami a čísly místo šrafování.** Celá fotka bez šrafování, s tenkými čarami rohů,
  bezpečnostního odsazení (`inset`), konce prolnutí, plné barvy a hranice obrázku pro web. Na každé straně je u každé
  čáry její číslo (rohy, kolik se odstranilo celkem, inset, prolnutí), u rohů jejich hodnoty; panel uprostřed zůstává.
  Náhledy se vyrábějí několikrát rychleji (u velké fotky asi 4 s místo 15 s).
- **Změna: čitelnější čísla u rohů v náhledu na pozadí.** Místo dvou procent „2,5 % · 1,7 %“ má každý roh dva řádky,
  odkud a kolik se ořízne, v procentech i bodech fotky (`zleva 2,5 % = 93 px`, `shora 1,7 % = 46 px`). Červeně je jen
  řádek nad hranicí, ne celý roh. Platí i pro náhledy rozpracovaných obrazů v „nahledy-orezu“.
- **Konec: průhledný náhled `.png` s čarami 1, 3, 5 a 10 %.** Nahradil ho `-frames.jpg`: celá neoříznutá fotka
  v plné velikosti s rámečky čar od všech čtyř okrajů (0,3; 0,6; 1; 1,5; 2; 2,5; 3; 4 a 5 % šířky, resp. výšky,
  nastavení `images.edges.guides`); u každé čáry je její vzdálenost od kraje v pixelech, v jednotkách `meta_corners`.

## 2026-10-05

- **Nové: bílé okraje fotky na Kontaktu do barvy papíru.** Na světlé paletě (Papír, Pergamen) přejde bílý okraj
  fotky plynule do barvy pozadí stránky, takže na Pergamenu už nesvítí bílý obdélník; tělo fotky zůstává
  v původních barvách. Na Noci zůstává fotka beze změny.

## 2026-10-04

- **Změna: fotka na Kontaktu v poměru 3:2.** Stránka Kontakt ořezává fotku `kontakt` na 3:2 místo 4:3,
  takže fotka v poměru 3:2 se ukáže celá.
- **Nové: klíčová slova pro vyhledávače.** Ve strukturovaných datech má obraz klíčová slova ze svých štítků
  a druh díla (malba / kresba / grafika podle techniky). Výpisy (Tvorba, rok, kolekce) mají klíčová slova
  ze štítků svých obrazů. Záměrně bez `<meta name="keywords">`, protože ji vyhledávače ignorují, a bez anglických
  variant (pro angličtinu by byla potřeba anglická verze stránek).
  **Nové:** pondělní kontrola automatiky hlásí novou techniku, u které vyhledávače druh díla nepoznají.
- **Změna: odesílatel zpráv z webu** je „Web pavla.kramolis.cz“ místo „Pavla Kramolišová“ (zpráva nevypadá jako
  od Pavly).
- **Nové: barvy webu (palety).** V patičce volba Papír (světlá) / Pergamen (zažloutlý papír) / Noc (tmavá)
  / Automaticky (podle systému, výchozí). Volba se pamatuje v prohlížeči. Palety jsou jeden seznam v kódu, test
  hlídá čitelnost textu (kontrast WCAG AA). Stíny obrazů podle palety (v Noci silnější a s jemnou linkou kolem
  obrazu). Událost `palette_change` v Google Analytics.
  **Změna:** v Papíru nepatrně tmavší akcent a zelená „K prodeji“ (kvůli čitelnosti).
- **Nové: zprávy od návštěvníků (Web3Forms).** Formulář na Kontaktu, na ostatních stránkách štítek „Napište mi“
  vpravo dole s panelem (malý / velký / schovaný, rozepsaná zpráva přežije přechod na jinou stránku). Typy zpráv
  (pozdrav, dotaz na obraz, zájem o koupi, spolupráce, chyba na webu, jiné), souvislost se stránkou nebo obrazem
  v předmětu `[pavla-web] …`. Bez JavaScriptu odkaz v patičce a stránka `/kontakt/odeslano/`. Událost `message_sent`.
  Testovací web je vždy jen náhled, nic neodesílá.
  **Změna:** u obrazu „Zeptat se na obraz“ místo „Napsat autorce“ (`mailto:`, zůstává jen pro web bez formuláře).
  **Změna:** `email_click` měří jen odkazy `mailto:` (adresa na Kontaktu) a jejich předmět má také `[pavla-web]`.
  **Konec:** kopie hlášení chyb druhé adrese (nahrazeno filtrem v poště).
- **Nové: Roztoky.** Kontakt ukazuje „Žiji a maluji: Roztoky“ (`site.location`); místo i ve strukturovaných
  datech pro vyhledávače (`homeLocation`) a v popisech stránek O mně a Kontakt.
- **Nové: ikony webu pro starší prohlížeče a Apple** (`favicon.ico`, `apple-touch-icon.png`, `npm run favicons`
  je vyrobí z `favicon.svg`).
- Obsah: README s popisem zpráv z webu a barev webu.

## 2026-10-03

- **Změna: texty webu schválené a přenesené** (podtitulek „Akvarely pro radost“, e-mail v Kontaktu, O mně, Kontakt,
  404, popisy stránek pro vyhledávače, text úvodu a roku 2026). Schvalování v `docs/texty-webu.md`.
- **Nové: vyhledávače.** Každá stránka má vlastní popis a strukturovaná data schema.org (dílo, výpisy, autorka,
  web, O mně, Kontakt, drobečková navigace); obraz na prodej uvádí dostupnost, **nikdy cenu**. `robots.txt`,
  mapa webu `sitemap.xml` s datem poslední změny, ověřovací kódy (Seznam Webmaster). Stránka 404 ukazuje obrazy
  z výběru autorky a staré adresy přesměrovává podle id. Návod `docs/vyhledavace.md`.
- **Nové: kontrola obrázků webu** (`npm run check:images`, týdně i na nasazeném webu).
- **Nové: desetinná čárka** v rozměrech („29,5 × 29,5 cm“).
- **Změna: systémové soubory** jsou všude `_index.yaml` (popis místa) a `_cover.<ext>` (úvodní fotka).
  **Konec:** `_kolekce.yaml`, `_uvod.*`, `uvod.yaml`, `uvod.*` (pipeline je odmítne).
- **Změna: skupiny atributů podle předpony** `meta_*` (jen obsah, řídí zpracování), sdílené, `private_*`
  (jen obsah), `derived_*` (jen web). **Konec:** `draft` → `meta_draft`, `instagram` → `meta_instagram`
  (staré názvy pipeline odmítne). Rozpracovaná díla nikdy neopustí obsahové repo.
- **Změna: `content/` ve webu zrcadlí obsahové repo** (stejné složky a jména, jen veřejné atributy); `derived_modified`
  = den poslední změny díla. Obrázky leží ve složce své stránky (`public/tvorba/<rok>/<slug>-<id>/` …).
  **Konec:** staré složky obrázků (`public/works`, `public/photos`, `public/og` …).
- **Změna: testovací data** jsou `demo-content/` (vymyšlené obsahové repo, značka `demo-content.yaml`, díla
  a kolekce `demo-…`). **Konec:** atribut `demo` a složka `demo/`.
- Obsah: soukromý archiv ateliéru, otevřený checklist (`docs/checklist.md`), přejmenování děl Plenér Šumava 2026,
  první podklady (papíry) u obrazů, nové obrazy (Malý princ, Tetřevská slať – grafika).

## 2026-09-30

- **Nové: výběr autorky** (`featured: true`): filtr „Výběr autorky“ v galerii (`?featured=1`), úvodní obrazy
  bez vlastní volby se náhodně střídají z 10 nejnovějších vybraných.
- **Nové: texty roků** (`roky/<rok>.yaml`), zobrazené na stránce roku.
- **Nové: jedno pravidlo úvodních obrazů** pro kolekce, roky i úvodní stránku: vlastní fotka > zvolené dílo nebo
  detail (`cover`) > náhodně z výběru autorky. Ořez jen s `aspect` / `focus`.
- **Nové: popisy podle jednoho schématu.** Pipeline při každém běhu srovná všechny popisy: doplní chybějící
  atributy s `DOPLNIT`, srovná pořadí a komentáře, neznámé označí `NEZNÁMÝ`. Nepovinné atributy jsou v souboru
  zakomentované.
- **Nové: události v Google Analytics** – změna filtru galerie (`gallery_filter`), „Koupit na Fleru“
  (`fler_click`), „Napsat autorce“ (`email_click`).
- **Nové: automatické sloučení** pull requestu s obsahem do webu po projití kontroly.
- **Změna:** veřejné repo webu nejmenuje obsahové repo; osobní a provozní údaje jen v něm.
- Obsah: rychlý návod pro Pavlu, návod na nové obrazy ve větvi přes github.dev.

## 2026-09-29

- **Nové: Google Analytics 4** (jen produkční build skutečného webu).
- **Nové: verze buildu v patičce** (`vRR.MMDD.HHMM`, bublina s datem a commitem).
- **Nové: srovnání fotek obrazů** (`npm run straighten`: perspektiva, ořez s okrajem papíru, vyvážení bílé);
  mockupy pak ořezávají na holý papír.
- **Nové: týdenní zkušební běh** automatiky na testovacích datech a kontrola workflow (`actionlint`).
- **Změna: obsah bez složek roků** – rok díla podle `date`; každá složka v `tvorba/` je kolekce.
  **Konec:** `tvorba/<rok>/`, složka `kolekce/`.
- **Změna: mockupy jen na vyžádání** (`mockups: true`), nezávisle na prodeji.
- **Změna:** „Není na prodej“ se na webu nezobrazuje.
- **Změna:** kontrola kódu na GitHubu jen testy a build (testovací web se staví lokálně); Node.js 24.
- Obsah: první skutečná kolekce **Plenér Šumava 2026**, fotka na Kontakt.

## 2026-09-28

- **Nové: obrazy ve větvi.** Na jiné větvi než `main` automatika jen připraví kostry a id (`--prepare-only`),
  zveřejní se až po sloučení do `main`.
- **Změna: exporty pro Instagram jen na vyžádání** (`instagram: true`, dnes `meta_instagram`).

## 2026-09-27

- **Nové: oddělené obsahové repo** (toto) a automatika: po změně obsahu pipeline zpracuje obrázky a otevře pull
  request do webu.
- **Nové: trvalé id díla** (5 znaků) a adresy `/tvorba/<rok>/<slug>-<id>/`, krátký odkaz `/tvorba/<id>/`.
- **Nové: mockupy** v reálném měřítku ze scén interiérů a prohlížeč díla (klávesy, přejetí prstem).
- **Nové: kolekce, detailní fotky s popisky, stránkování** všech výpisů (12/24/48, „Zobrazit vše“, vše v adrese),
  filtr podle stavu prodeje a kolekce, obrázky pro sdílení odkazu.
- **Nové: kontrola automatiky** (týdně: token, selhané běhy, nasazení, čekající PR).
- **Nové: testovací data** odděleně od skutečných.

## 2026-09-26

- **Nové: web.** Astro web (úvod, galerie s filtry, detail díla, O mně, Kontakt), obrázková pipeline pro web,
  Instagram a Fler (vodoznak), nasazení na GitHub Pages s doménou pavla.kramolis.cz.
