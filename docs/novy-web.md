# Nový web na enginu (např. pro další autorku)

Co udělat jednou, aby nová autorka měla vlastní web na tomto enginu. Výsledek: tři repa vedle sebe, stejně jako u
prvního webu.

| Repo | Viditelnost | Co v něm je |
|---|---|---|
| `web-tvorba-engine` | veřejné | tento engine (kód, sdílená workflow), společný pro všechny weby |
| `<web>` (repo webu) | veřejné (GitHub Pages zdarma) | nastavení, písma, scény, ikony; data, která vyrobí pipeline |
| `<web>-content` (obsahové repo) | soukromé | originální fotky a popisy děl, texty stránek; workflow zpracování |

Jména rep jsou volná (`kacka`, `kacka-content`); níže `<vlastník>/<web>` a `<vlastník>/<web>-content`. Veřejná repa
(engine, repo webu) nikdy nejmenují soukromá (obsahové repo, soukromé dokumenty správce).

## 1. Repo webu

1. Nové **veřejné** repo `<web>`, obsah podle složky testovacího webu `demo/` tohoto enginu:
   - `site.config.yaml`: zkopírovat `demo/site.config.yaml` a přepsat identitu (`site.author`, `site.url` = adresa webu,
     `site.repository` = `<vlastník>/<web>`, `site.storagePrefix` = vlastní předpona, `site.email`, `site.location`,
     profily `instagram` / `pinterest` / `fler`, `messages.subjectTag`, `analytics.googleMeasurementId`,
     `messages.accessKey`); **smazat `demo: true`** (jinak je web skrytý vyhledávačům a nic neměří ani neodesílá);
   - `fonts/`, `mockups/` (scény a jejich kalibrace, `mockups/instagram/` ateliér), `home-screen-icon.svg`,
     `public/` (favicon, ikony, `CNAME` s doménou): z `demo/` nebo vlastní;
   - `.gitignore`: `dist/`, `.previews/`, `/mockups/export/`, `/public/tvorba/`, `/public/fotky/`, `/public/_cover/`,
     `/public/_og/`;
   - `LICENSE.md` (licence workflow a dokumentace repa) a v README sekce „Licence“: obsah webu © autorka, všechna práva
     vyhrazena;
   - `.github/workflows/check.yml` a `deploy.yml`: obálky sdílených workflow (níže), verze enginu v obou stejná.
2. Ověřit lokálně (engine vedle, v jeho `.env` `SITE_DIR=../<web>`): `npm run check:site`, `npm run build`
   (prázdný web bez obsahu se postaví taky).
3. Nastavení repa na GitHubu (kontrolní seznam: `node scripts/repo-settings.mjs <vlastník>/<web>` vypíše, co API řekne):
   - *Settings → General → Pull Requests*: **Allow auto-merge**, **Automatically delete head branches**;
   - *Settings → Pages → Source*: **GitHub Actions**; vlastní doména a po vydání certifikátu **Enforce HTTPS**;
     DNS u registrátora: CNAME `<subdoména>` → `<vlastník>.github.io.`;
   - *Settings → Rules → Rulesets*: na výchozí větev, pravidla *Restrict deletions*, *Block force pushes* a
     *Require status checks to pass* s kontrolou **`check / check`** (jméno kontroly sdíleného workflow = job obálky /
     job sdíleného workflow), výjimka (bypass) *Repository admin*;
   - prostředí `github-pages` (vznikne samo s Pages) jen pro větev `main`.

Obálky repa webu (verze enginu = tag za `@` i `engine-ref`, vždy stejné):

```yaml
# .github/workflows/check.yml
name: Kontrola kódu
on:
  push:
    branches: [main]
    paths-ignore: ['content/**', 'binary.lock', '**/*.md']
  pull_request:
  workflow_dispatch:
concurrency:
  group: check-${{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
  issues: write
jobs:
  check:
    uses: shamoh/web-tvorba-engine/.github/workflows/site-check.yml@v1
    with:
      engine-ref: v1
```

```yaml
# .github/workflows/deploy.yml
name: Deploy na GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: write
  pages: write
  id-token: write
  actions: read
  issues: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    uses: shamoh/web-tvorba-engine/.github/workflows/site-deploy.yml@v1
    with:
      engine-ref: v1
```

## 2. Obsahové repo

1. Nové **soukromé** repo `<web>-content`: složky `tvorba/`, `fotky/`, `roky/`, `stranky/` (stačí prázdné; kostry
   popisů, stránek a úvodu založí pipeline při prvním běhu), README pro autorku (jen co je u ní jinak, obecný návod je
   `docs/navod-pro-autorku.md` enginu), `LICENSE.md` (obsah © autorka, všechna práva vyhrazena), `.gitignore` s `export/`.
   **Nikdy testovací data** (pipeline odmítne obsah se značkou `demo-content.yaml` a díla či kolekce `demo-…`).
2. Token pro zpracování obsahu: fine-grained personal access token vlastníka, *Repository access* jen repo webu,
   oprávnění *Contents* a *Pull requests* **Read and write**; uložit jako secret obsahového repa (např. `<WEB>_TOKEN`).
   Token je vázaný na ID repa: nové nebo přejmenované repo = znovu ho vybrat v *Repository access*.
3. Nepovinný `CHECK_TOKEN` (jen čtení: minuty Actions, nastavení rep) jako druhý secret; v *Repository access*
   repo webu, obsahové repo a engine.
4. Obálky workflow obsahového repa (níže), `.github/workflows/check-workflows.yml` s `actionlint` podle prvního webu.

```yaml
# .github/workflows/publish.yml ("Zpracování obsahu")
name: Zpracování obsahu
on:
  push:
    branches: ['**']
    paths: ['tvorba/**', 'fotky/**', 'roky/**', 'stranky/**', '_index.yaml', '_cover.*']
  schedule:
    - cron: '30 3 * * 1'   # každé pondělí: plán hry Detail dne i bez změny obsahu
  workflow_dispatch:
concurrency:
  group: content-pipeline-${{ github.ref }}
  cancel-in-progress: false
permissions:
  contents: write
  issues: write
jobs:
  publish:
    uses: shamoh/web-tvorba-engine/.github/workflows/process-content.yml@v1
    with:
      site-repository: <vlastník>/<web>
      engine-ref: v1
    secrets:
      SITE_TOKEN: ${{ secrets.<WEB>_TOKEN }}
```

```yaml
# .github/workflows/health-check.yml ("Kontrola automatiky")
name: Kontrola automatiky
on:
  schedule:
    - cron: '17 6 * * 1'
  workflow_dispatch:
permissions:
  contents: read
  actions: read
  issues: write
jobs:
  check:
    uses: shamoh/web-tvorba-engine/.github/workflows/health-check.yml@v1
    with:
      site-repository: <vlastník>/<web>
      engine-ref: v1
    secrets:
      SITE_TOKEN: ${{ secrets.<WEB>_TOKEN }}
      CHECK_TOKEN: ${{ secrets.CHECK_TOKEN }}
```

## 3. První běh a ověření

1. Push repa webu: „Kontrola kódu“ a „Deploy na GitHub Pages“ projdou (prázdný web), web je na doméně.
2. Push obsahového repa s první fotkou v `tvorba/`: „Zpracování obsahu“ založí kostry popisů, pak (po doplnění a
   `meta_draft: false`) pull request `content/update` do repa webu, který se po kontrole sám sloučí a nasadí.
3. Ručně „Kontrola automatiky“ v obsahovém repu: vše ✓.
4. Vyhledávače: `docs/registrace-vyhledavace.md`. Google Analytics a Web3Forms: účty autorky, klíče do
   `site.config.yaml`.

## 4. Lokálně

Engine, repo webu a obsahové repo vedle sebe; v enginu `.env`:

```
SITE_DIR=../<web>
CONTENT_DIR=../<web>-content
```

Pak v enginu `npm run images` (pipeline), `npm run build`, `npm run dev`; víc webů = jiný `.env` (nebo `SITE_DIR=…` před
příkazem). Před lokálním plným `npm run images` musí být obsahové repo na `main` (jinak `--prepare-only`).

## 5. Nová verze enginu

Nová verze = tag enginu (`v2`). Web ji přijme změnou `@v1` a `engine-ref: v1` na `v2` ve všech čtyřech obálkách (dvě
v repu webu, dvě v obsahovém repu): v repu webu pull requestem (projde kontrolou s novou verzí), v obsahovém repu
commitem. Co verze mění a co musí web udělat, říká `CHANGELOG.md`.
