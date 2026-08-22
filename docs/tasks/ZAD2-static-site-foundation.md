# ZAD2 — fundament statycznego serwisu

Status: `COMPLETED`

Zależności: brak

Może być wykonywane równolegle z: ZAD1

Zalecany wykonawca: `GPT-5.6 Terra`, reasoning `high`

## Rezultat użytkowy

Repozytorium daje się zainstalować, sprawdzić, zbudować i uruchomić jednym
udokumentowanym zestawem poleceń. Każda trasa jest generowana jako rzeczywisty
HTML, a dalsze zadania mogą dodawać treść bez przebudowy fundamentu.

## Kontekst obowiązkowy

Przeczytaj w kolejności:

1. `AGENTS.md`;
2. `PLAN.md`;
3. ten plik;
4. `README.md`;
5. wynik ZAD1, jeśli już istnieje, tylko w zakresie nazwy, języka i adresu.

Przed wyborem wersji Astro, Node i oficjalnych akcji GitHub sprawdź ich aktualną
dokumentację. Nie kopiuj konfiguracji dla innego generatora ani starej wersji
Astro bez weryfikacji.

## Stan wejściowy i bramki

- Repozytorium może zawierać pusty `index.html`; zastąpienie go jest częścią
  zadania.
- Bieżący adres to `https://bartmannn.github.io/finapso-legal/`. Konfiguracja
  musi poprawnie uwzględniać origin `https://bartmannn.github.io` oraz bazę
  `/finapso-legal/`, a jednocześnie pozwalać później przejść na domenę własną
  bez przepisywania treści.
- Nie modyfikuj istniejących plików polityki i regulaminu `.txt`.
- Instalacja zależności i utworzenie workflow są w zakresie. Publikacja na
  zewnętrzny hosting nie jest w zakresie.

## Cel

Utworzyć minimalny, przewidywalny fundament Astro generujący prawdziwe strony
HTML dla GitHub Pages. Na tym etapie nie powstaje jeszcze docelowy wygląd ani
finalna treść prawna.

## Zakres

- Zainicjalizować Astro w trybie `output: static` z TypeScript strict.
- Włączyć końcowy ukośnik w trasach i uniknąć hash routingu.
- Dodać centralną konfigurację nazwy, adresu bazowego i metadanych serwisu.
- Przygotować katalogi `src/pages`, `src/layouts`, `src/components`,
  `src/content`, `src/styles` i `public`.
- Utworzyć typowane kolekcje treści dla dokumentacji i dokumentów prawnych.
- Dodać metadane: tytuł, opis, data aktualizacji, rewizja, status szkicu oraz
  wersja aplikacji.
- Przygotować lokalne polecenia `dev`, `check`, `build` i `preview`.
- Dodać lockfile i jednoznaczne wymaganie wersji Node.
- Dodać workflow budowania oraz technicznego podglądu GitHub Pages.
- Zapewnić poprawne budowanie zarówno pod adresem repozytorium, jak i pod
  przyszłą własną domeną.

## Kolejność pracy

1. Sprawdź status Git, dostępne runtime'y i brak istniejącej konfiguracji, której
   nie wolno nadpisać.
2. Zweryfikuj bieżące wymagania Astro, Node i GitHub Pages w źródłach
   oficjalnych.
3. Zainicjalizuj minimalny projekt bez przykładowego bloga i zbędnych integracji.
4. Dodaj centralną konfigurację serwisu oraz typowane schematy treści.
5. Utwórz minimalne strony testowe dla `/`, `/privacy/` i trasy zagnieżdżonej,
   aby udowodnić routing statyczny pod bazą `/finapso-legal/`.
6. Dodaj skrypty lokalne, lockfile i workflow budujący artefakt Pages.
7. Zbuduj projekt od czystej instalacji i sprawdź wynik w katalogu wyjściowym.
8. Zaktualizuj README rzeczywistymi poleceniami i ograniczeniami.

Nie dodawaj jeszcze pełnego design systemu, tekstów marketingowych ani polityki.
Minimalne strony testowe mają jasno informować, że są szkieletem.

## Zasady architektoniczne

- Wielostronicowy HTML jest wynikiem kompilacji; SPA nie jest dozwolone.
- Strony prawne nie otrzymują skryptów klienckich.
- Zależności dodajemy tylko dla konkretnej potrzeby.
- Wszystkie fonty i zasoby należą do repozytorium albo korzystają z bezpiecznego
  stosu systemowego.
- Brak analityki, reklam, formularzy sieciowych i mechanizmów zgody cookies.

## Artefakty

- `package.json` i lockfile wybranego menedżera pakietów;
- `astro.config.mjs`, `tsconfig.json` i plik wersji Node;
- `src/config/site.ts` albo równoważny jeden moduł konfiguracji;
- `src/content.config.ts` albo aktualny odpowiednik Astro;
- minimalne `src/pages/` i wymagane katalogi projektu;
- `.github/workflows/` z budowaniem artefaktu Pages bez produkcyjnej publikacji,
  jeśli zewnętrzne wdrożenie nie zostało autoryzowane;
- zaktualizowany `README.md`.

## Kryteria odbioru

- `npm ci`, sprawdzenie typów i build przechodzą w czystym środowisku.
- W artefakcie istnieje osobny plik HTML dla każdej trasy testowej.
- Bezpośrednie wejście na trasę nie wymaga klientowego routera.
- Strona testowa jest czytelna po wyłączeniu JavaScriptu.
- W kodzie nie ma zewnętrznych trackerów, fontów ani sekretów.
- README pozwala nowej osobie uruchomić projekt bez domysłów.

## Weryfikacja

- `npm ci`;
- `npm run check`;
- `npm run build`;
- `npm run preview` i ręczne wejście na trasę podrzędną;
- `git diff --check`.

Jeżeli projekt wybierze inny menedżer pakietów niż npm, użyj jego dokładnych
odpowiedników i zaktualizuj wszystkie przykłady w tym repozytorium spójnie.

## Commit

Po pełnym odbiorze wykonaj procedurę z `AGENTS.md`. Stage obejmuje fundament
Astro, workflow, README, aktualizację statusu ZAD2 i odpowiadający wiersz w
`PLAN.md`. Nie dodawaj istniejących dokumentów `.txt`.

Sugerowany komunikat:

```text
feat(site): scaffold static Astro website
```

## Kiedy zapytać użytkownika

Nie pytaj o zwykłe wybory implementacyjne, jeśli Astro ma jedno proste,
oficjalnie wspierane rozwiązanie. Zapytaj przed zmianą generatora, dodaniem
zewnętrznej usługi, opublikowaniem strony albo podjęciem decyzji, która wymaga
płatnego planu. Brak domeny rozwiąż konfiguracją tymczasową, nie pytaniem
blokującym.

## Wynik realizacji

Data: 2026-08-22

Status: `COMPLETED`

Zweryfikowane wersje:

- Node.js `24.16.0` przypięty w `.nvmrc` i `package.json`;
- npm `11.13.0` przypięty przez `packageManager` i zakres `engines`;
- Astro `7.2.4`;
- `@astrojs/check` `0.9.10`;
- TypeScript `6.0.3` oraz typy Node `24.13.3`;
- opcjonalny `sharp` `0.35.3`, przypięty do wersji bez znanej podatności
  wykrytej w starszym wariancie zależności.

Stan oficjalnych źródeł Astro, Vite, GitHub Pages i GitHub Actions sprawdzono
2026-08-22. Konfiguracja używa `site`, `base`, `trailingSlash: 'always'`,
`output: 'static'`, katalogowego formatu builda i aktualnych głównych wersji
oficjalnych akcji.

Utworzono fundament:

- `package.json`, `package-lock.json`, `.nvmrc`, `.gitignore`;
- `astro.config.mjs`, `tsconfig.json`, `config/astro.env`;
- `.github/workflows/build-pages.yml` bez joba publikacji i bez uprawnień
  zapisu Pages;
- centralną konfigurację `src/config/site.mjs`;
- typowane kolekcje w `src/content.config.ts` oraz lokalny loader Markdown w
  `src/loaders/localMarkdown.ts`;
- bazowy layout, minimalny styl systemowy i katalog komponentów;
- statyczne trasy kontrolne `/`, `/privacy/` i `/docs/routing-check/`;
- `public/.nojekyll`;
- zaktualizowany `README.md`.

Usunięto pusty, historyczny `index.html` z katalogu głównego; jego rolę przejęła
statycznie generowana strona `src/pages/index.astro`. Plików prawnych `.txt` nie
zmieniono i nie włączono do builda.

Wbudowany loader `glob()` w Astro 7.2.4/Vite 8 na tym środowisku Windows błędnie
wykonywał CommonJS `picomatch` w runnerze ESM (`require is not defined`). Nie
obniżono Astro do podatnej linii 6. Zastosowano oficjalny Content Loader API i
`renderMarkdown()` w małym lokalnym loaderze, dzięki czemu pozostają typowane
kolekcje i pliki Markdown bez łat doraźnych w `node_modules`.

Wyniki kontroli:

- `npm ci`: `PASS`, 272 pakiety, 0 znanych podatności;
- `npm run check`: `PASS`, 10 plików, 0 błędów, 0 ostrzeżeń i 0 podpowiedzi;
- `npm run build`: `PASS`, trzy osobne strony HTML w `dist/`;
- build dla `SITE_ORIGIN=https://example.com` i `SITE_BASE=/`: `PASS`, zero
  odwołań do `/finapso-legal/` i poprawne canonicale domeny własnej;
- `npm run preview -- --host 127.0.0.1`: `PASS`; `/finapso-legal/`,
  `/finapso-legal/privacy/` i `/finapso-legal/docs/routing-check/` zwróciły
  `HTTP 200`, `Content-Type: text/html` i nie zawierały tagów `<script>`;
- `npm run preview -- stop`: `PASS`;
- skan źródeł pod kątem skryptów klienckich, trackerów, zewnętrznych fontów,
  `deploy-pages` i uprawnień publikacji: brak trafień;
- `git diff --check`: wykonywany ponownie bezpośrednio przed stagingiem.

Niewykonane kontrole: brak. Publikacja i `push` są poza zakresem ZAD2.

## Prompt uruchomieniowy

```text
Zrealizuj ZAD2 opisane w docs/tasks/ZAD2-static-site-foundation.md jako
pojedynczy GPT-5.6 Terra z reasoning high. Przeczytaj AGENTS.md, PLAN.md i
wymagany kontekst. Zweryfikuj aktualne oficjalne wymagania Astro, Node i GitHub
Pages, a następnie zbuduj minimalny statyczny fundament bez SPA, trackerów i
zewnętrznych fontów. Nie publikuj strony i nie modyfikuj plików prawnych .txt.
Udowodnij osobne generowanie HTML dla tras, wykonaj pełną weryfikację z czystej
instalacji i uzupełnij Wynik realizacji.
```
