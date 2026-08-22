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
npm run build
npm run preview
```

`npm run build` zapisuje statyczny wynik w `dist/`. Podgląd używa tej samej bazy
`/finapso-legal/`, dlatego lokalny adres startowy jest wypisywany przez Astro i
zawiera ten prefiks.

## Konfiguracja adresu

Domyślne wartości w `astro.config.mjs` to:

- origin: `https://bartmannn.github.io`;
- base: `/finapso-legal`;
- końcowy ukośnik: zawsze;
- output: statyczny HTML w formacie katalogowym.

Przyszłą własną domenę można sprawdzić bez zmiany treści, ustawiając podczas
builda `SITE_ORIGIN=https://example.com` oraz `SITE_BASE=/`. Nie dodawaj pliku
`CNAME` bez osobnej decyzji właściciela.

## Trasy kontrolne ZAD2

- `/finapso-legal/`;
- `/finapso-legal/privacy/`;
- `/finapso-legal/docs/routing-check/`.

Są to szkielety techniczne, a nie finalna prezentacja ani dokumenty prawne.
Trasa `/privacy/` ma `noindex, nofollow` i nie może jeszcze zostać podpięta w
Google Play Console.

## Treść

Pliki Markdown znajdują się w `src/content/docs/` i `src/content/legal/`.
Metadane oraz przypisanie plików do typowanych kolekcji są rejestrowane w
`src/content.config.ts`. Lokalny loader używa oficjalnego Content Loader API i
wbudowanego renderera Markdown Astro; dodanie dokumentu wymaga dodania pliku i
odpowiadającego mu wpisu metadanych.

## GitHub Actions i publikacja

Workflow `.github/workflows/build-pages.yml` instaluje zależności, sprawdza typy,
buduje stronę i zapisuje techniczny artefakt GitHub Pages. Celowo nie ma joba
`deploy`, uprawnienia `pages: write` ani `id-token: write`, więc sam workflow nie
publikuje witryny.

Publikacja, zmiana ustawień GitHub Pages oraz `push` są osobnym, autoryzowanym
etapem. Do tego czasu bieżąca strona publiczna może nadal wskazywać starszą albo
pustą zawartość.

## Granice prywatności strony

Strona nie używa analityki, reklam, trackerów, cookies, zewnętrznych fontów ani
formularzy sieciowych. Dokumenty `.txt` w katalogu głównym są materiałami do
późniejszego audytu i nie są automatycznie publikowane.

Szczegółowy zakres i bramki znajdują się w [`PLAN.md`](PLAN.md).
