# Finapso Legal

Statyczna, wielostronicowa witryna i centrum prawne aplikacji Finapso. Projekt
korzysta z Astro i generuje zwykłe pliki HTML działające bez routera klienckiego.

Publiczny adres po osobno autoryzowanej publikacji:
`https://bartmannn.github.io/finapso-legal/`.

## Wymagania

- Node.js `24.16.x` — dokładna wersja znajduje się w `.nvmrc`;
- npm `11.13.x`;
- zależności instalowane wyłącznie z zatwierdzonego `package-lock.json` przez
  `npm ci`.

Astro wymaga Node `22.12.0` lub nowszego. Projekt świadomie przypina bieżącą
wersję Node 24, aby środowisko lokalne i workflow używały tego samego runtime'u.
Telemetria CLI Astro jest wyłączona przez niesekretny plik
`config/astro.env` używany przez wszystkie skrypty npm.

## Praca lokalna

```text
npm ci
npm run check
npm run dev
```

Pozostałe polecenia:

```text
npm run build:preview
npm run build:production
npm run preview
```

`npm run build` jest aliasem bezpiecznego `build:preview`. Zapisuje statyczny
wynik w `dist/`, dodaje `build-meta.json` z pełnym SHA źródła i natychmiast
wykonuje deterministyczny audyt artefaktu. Podgląd używa tej samej bazy
`/finapso-legal/`, dlatego lokalny adres startowy jest wypisywany przez Astro i
zawiera ten prefiks. `build:production` dodatkowo odrzuca placeholdery na
stronach prawnych i przed ukończeniem ZAD7 ma kończyć się kontrolowanym błędem.

## Konfiguracja adresu

Domyślne wartości w `astro.config.mjs` to:

- origin: `https://bartmannn.github.io`;
- base: `/finapso-legal`;
- końcowy ukośnik: zawsze;
- output: statyczny HTML w formacie katalogowym.

Przyszłą własną domenę można sprawdzić bez zmiany treści, ustawiając podczas
builda `SITE_ORIGIN=https://example.com` oraz `SITE_BASE=/`. Nie dodawaj pliku
`CNAME` bez osobnej decyzji właściciela.

## Trasy serwisu

- `/finapso-legal/`;
- `/finapso-legal/features/`;
- `/finapso-legal/docs/`;
- `/finapso-legal/docs/getting-started/`;
- `/finapso-legal/docs/data-and-backups/`;
- `/finapso-legal/docs/receipts/`;
- `/finapso-legal/docs/notifications/`;
- `/finapso-legal/privacy/`;
- `/finapso-legal/privacy/archive/`;
- `/finapso-legal/terms/`;
- `/finapso-legal/support/`;
- `/finapso-legal/licenses/`;
- `/finapso-legal/docs/routing-check/`.

Build tworzy również `/finapso-legal/robots.txt`, `sitemap-index.xml`,
`sitemap-0.xml` oraz stronę błędu `404.html`. Sitemap nie wymienia szkiców ani
tras z `noindex`.

Strony produktowe i dokumentacja opisują aplikację w wersji `1.37.25`. Trasa
asystenta powiadomień ma status roboczy i `noindex, nofollow`, ponieważ funkcja
oczekuje na odbiór publikacyjny w repozytorium aplikacji. Techniczna trasa
`/docs/routing-check/` pozostaje nieindeksowanym fixture'em.

Całe centrum prawne pozostaje demonstracyjnym szkicem `DRAFT` z
`noindex, nofollow`. Polityka i warunki zawierają jawnie oznaczone lorem ipsum,
dlatego `/privacy/` nie może jeszcze zostać podpięte w Google Play Console.
Archiwum jest puste i nie tworzy fikcyjnych wcześniejszych rewizji.

## Treść

Pliki Markdown znajdują się w `src/content/docs/` i `src/content/legal/`.
Metadane oraz przypisanie plików do typowanych kolekcji są rejestrowane w
`src/content.config.ts`. Lokalny loader używa oficjalnego Content Loader API i
wbudowanego renderera Markdown Astro; dodanie dokumentu wymaga dodania pliku i
odpowiadającego mu wpisu metadanych.

Każdy artykuł użytkowy podaje rewizję, datę aktualizacji i wersję aplikacji.
Źródła twierdzeń oraz mapowanie trasa–odbiorca–pytanie–CTA są zapisane w
`docs/content/PRODUCT_CONTENT_MATRIX.md`. Przed zmianą opisu funkcji należy
ponownie sprawdzić aplikację i zaktualizować tę macierz.

Po zbudowaniu strony kontrolę tras, canonical, Open Graph, linków, statusu
indeksowania i braku wykonywalnego JavaScriptu uruchamia:

```text
npm run check:product-pages
npm run check:legal-center
```

Druga kontrola wymaga wcześniejszego `npm run build`. Sprawdza ochronę szkicu,
statusy i metadane dokumentów, kotwice, brak wykonywalnego JavaScriptu,
wewnętrzne linki oraz brak publicznego `security.txt`.

## Bramki jakości i wydania

Pełny kontrakt lokalny i CI uruchamia jedno polecenie:

```text
npm test
```

Obejmuje ono typy Astro, build preview, walidację HTML, wszystkie trasy, linki,
canonical, sitemap, originy zasobów, skan sekretów i prywatnych formatów,
budżety zasobów, Playwright, axe, klawiaturę, 320 px, cele 44 px, CLS oraz trzy
kontrolowane przypadki negatywne. Na końcu sprawdza również bieżący kontrakt
produkcji: przy szkicach oczekuje dokładnego błędu placeholderów, a po ich
zatwierdzeniu będzie wymagać przejścia builda produkcyjnego.

Węższe polecenia diagnostyczne:

```text
npm run test:preview
npm run test:production
npm run test:production-contract
npm run test:negative
npm run test:browser
npm run validate:html
```

Przed pierwszym lokalnym testem przeglądarkowym zainstaluj przypięte Chromium:

```text
npx playwright install chromium
```

Na Linuksie CI workflow wykonuje `npx playwright install --with-deps chromium`.
Raportowe pomiary strony głównej i polityki uruchamia `npm run
audit:lighthouse`; wyniki JSON trafiają do ignorowanego katalogu
`.artifacts/lighthouse/`. Wynik Lighthouse zależy od maszyny, dlatego nie jest
niestabilnym progiem blokującym CI. Krytyczne regresje wydajności blokują
powtarzalne budżety CSS, JavaScriptu, obrazów, całego artefaktu i test CLS.

Pełne mapowanie wymagania na test i komunikat błędu znajduje się w
[`docs/quality/QUALITY_GATE_MATRIX.md`](docs/quality/QUALITY_GATE_MATRIX.md).

## GitHub Actions i publikacja

Workflow `.github/workflows/build-pages.yml` instaluje zależności z lockfile,
instaluje Chromium, uruchamia dokładnie `npm test` i zapisuje sprawdzony artefakt
GitHub Pages. Wszystkie akcje są przypięte do pełnych SHA, token ma tylko
`contents: read`, a Dependabot proponuje małe aktualizacje npm i Actions raz w
tygodniu. Celowo nie ma joba `deploy`, uprawnienia `pages: write` ani
`id-token: write`, więc sam workflow nie publikuje witryny.

Publikacja, zmiana ustawień GitHub Pages oraz `push` są osobnym, autoryzowanym
etapem. Do tego czasu bieżąca strona publiczna może nadal wskazywać starszą albo
pustą zawartość.

## Granice prywatności strony

Strona nie używa analityki, reklam, trackerów, cookies, zewnętrznych fontów ani
formularzy sieciowych. Dokumenty `.txt` w katalogu głównym są materiałami do
późniejszego audytu i nie są automatycznie publikowane.

Kontakt bezpieczeństwa pozostaje odłożony. Niedeployowany plik
`docs/examples/security.txt.disabled.example` dokumentuje bezpieczny punkt
startowy, ale nie jest prawidłowym ani publicznym `security.txt`.

Szczegółowy zakres i bramki znajdują się w [`PLAN.md`](PLAN.md).
