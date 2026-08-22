# ZAD6 — automatyczne bramki jakości i bezpieczeństwa publikacji

Status: `COMPLETED`

Zależności: ZAD4, ZAD5

Zalecany wykonawca: `GPT-5.6 Terra`, reasoning `high`

## Rezultat użytkowy

Jedno polecenie lokalne i ten sam workflow CI rozstrzygają, czy podgląd oraz
wydanie produkcyjne spełniają kontrakt. Przypadkowe opublikowanie szkicu,
trackera, niedziałającej trasy albo strony prawnej zależnej od JavaScriptu jest
automatycznie blokowane.

## Kontekst obowiązkowy

Przeczytaj w kolejności:

1. `AGENTS.md`, `PLAN.md` i ten plik;
2. cały kod strony po ZAD4 i ZAD5;
3. istniejące skrypty, workflow, `package.json` i lockfile;
4. sekcje weryfikacji w ZAD2–ZAD5 oraz ich wpisy `Wynik realizacji`;
5. aktualną oficjalną dokumentację wybranych narzędzi testowych i GitHub Pages.

Nie dodawaj kilku narzędzi rozwiązujących ten sam problem. Najpierw sprawdź, co
potrafią Astro, obecny test runner i małe deterministyczne skrypty projektu.

## Stan wejściowy i bramki

- ZAD4 i ZAD5 muszą mieć status `COMPLETED` albo jednoznacznie udokumentowane
  brakujące elementy, które ZAD6 ma objąć testem.
- Build podglądowy musi obecnie przechodzić z prawidłowo oznaczonym szkicem.
- Testy routingu muszą działać z bazą `/finapso-legal/`, aby nie ukryć błędów
  występujących dopiero na projektowej witrynie GitHub Pages.
- Build produkcyjny nie musi jeszcze przechodzić, ponieważ finalna polityka
  powstanie w ZAD7; musi jednak odrzucać dokładnie właściwe przyczyny.
- Nie publikuj workflow, nie zmieniaj ochrony gałęzi i nie uruchamiaj płatnych
  usług bez zgody użytkownika.

## Cel

Zapobiegać publikacji uszkodzonej, niedostępnej albo pozornie finalnej strony i
utrzymywać mierzalną jakość serwisu.

## Zakres automatyzacji

- Statyczne sprawdzanie Astro i produkcyjny build z lockfile.
- Walidacja HTML, linków, sitemap, canonical i wymaganych tras.
- Playwright z wyłączonym JavaScriptem dla stron prawnych.
- Automatyczny audyt axe dla stron kluczowych.
- Test klawiatury, skip linku, fokusu i menu mobilnego.
- Kontrola niedozwolonych zewnętrznych żądań, trackerów i fontów.
- Kontrola sekretów oraz prywatnych typów plików.
- Kontrola placeholderów: `lorem ipsum`, `DRAFT`, przykładowa domena, przykładowy
  kontakt i przykładowy Publisher ID.
- Dwa tryby kompilacji:
  - `preview` dopuszcza szkice, ale wymaga ostrzeżenia i `noindex`;
  - `production` odrzuca każdy placeholder na stronie prawnej.
- Kontrola nagłówków/meta, typu treści oraz braku skryptów na stronach prawnych.
- Budżet zasobów i obrazów oraz test przesunięć layoutu.

## Kolejność pracy

1. Utwórz macierz `wymaganie → test → tryb preview/production → komunikat błędu`.
2. Uporządkuj skrypty tak, aby lokalnie i w CI korzystały z tych samych poleceń.
3. Dodaj walidację statyczną: typy, build, HTML, wymagane trasy, linki,
   canonical, sitemap i zewnętrzne originy.
4. Dodaj testy przeglądarkowe dla stron kluczowych, w tym pełny przebieg z
   wyłączonym JavaScriptem.
5. Dodaj axe oraz minimalne testy klawiatury, fokusu i menu.
6. Dodaj skaner placeholderów ograniczony do wygenerowanej treści prawnej; nie
   może odrzucać dokumentacji zadań, która celowo opisuje `lorem ipsum`.
7. Dodaj osobne polecenia preview i production oraz czytelne komunikaty błędów.
8. Dodaj budżety zasobów i kontrolę nieoczekiwanych zewnętrznych żądań.
9. Wykonaj kontrolowane przypadki negatywne, a po każdym przywróć prawidłowy
   fixture przez edycję, nie destrukcyjny reset.
10. Udokumentuj dokładny zestaw poleceń i ograniczenia testów.

## Cele jakościowe

- Lighthouse co najmniej 95 dla Performance, Accessibility, Best Practices i
  SEO na stronie głównej i polityce.
- LCP poniżej 2,5 s i CLS poniżej 0,1 w przyjętym profilu mobilnym.
- CSS orientacyjnie poniżej 50 KB po kompresji.
- Zero JavaScriptu wysyłanego przez strony prawne.
- Zero naruszeń axe o wadze critical lub serious.

## Dodatkowe zabezpieczenia

- Workflow ma minimalne uprawnienia.
- Akcje GitHub są przypięte do kontrolowanych wersji.
- Dependabot lub równoważny proces aktualizuje zależności w małych zmianach.
- Wygenerowany artefakt jest wdrażany, a nie ręcznie modyfikowany na gałęzi.
- Build zapisuje wersję źródła potrzebną do późniejszego audytu.

## Oczekiwane pliki

- skrypty `check`, `test`, `test:preview` i `test:production` albo spójne
  odpowiedniki;
- konfiguracja testów przeglądarkowych i dostępności;
- małe skrypty kontroli tras, linków, placeholderów, originów i budżetów;
- fixtures pozytywne oraz negatywne, które nie trafiają do produkcyjnej treści;
- workflow CI z minimalnymi uprawnieniami;
- README z lokalnym uruchomieniem całej bramki.

## Kryteria odbioru

- Pull request nie może ominąć testów krytycznych.
- Celowo dodany placeholder zatrzymuje build produkcyjny.
- Celowo dodany tracker lub zewnętrzny font zostaje wykryty.
- Polityka przechodzi test bez JavaScriptu, linków i dostępności.
- Budżety wydajności są mierzone w sposób powtarzalny.
- Instrukcja lokalnego uruchomienia tych samych testów znajduje się w README.

## Weryfikacja

- uruchomienie pełnego CI lokalnie albo w kontrolowanym pull requeście;
- kontrolowane negatywne przypadki placeholdera, linku i zewnętrznego skryptu;
- Lighthouse i axe;
- `git diff --check`.

Raport ma rozróżnić testy deterministyczne od pomiarów podatnych na środowisko,
takich jak Lighthouse. Nie ustawiaj progów, których workflow nie potrafi
stabilnie egzekwować.

## Commit

Po pełnym odbiorze wykonaj procedurę z `AGENTS.md`. Stage obejmuje skrypty,
fixtures, konfigurację testów, workflow, README, status ZAD6 i odpowiadający
wiersz w `PLAN.md`.

Sugerowany komunikat:

```text
test(site): add preview and production release gates
```

## Kiedy zapytać użytkownika

Zapytaj przed dodaniem płatnej usługi, publikacją workflow lub zmianą wymagań
produktu. Nie pytaj o wybór między równoważnymi lokalnymi bibliotekami — wybierz
mniejszy, aktywnie utrzymywany zestaw po sprawdzeniu dokumentacji. Jeżeli cel 95
Lighthouse jest niestabilny w CI, zachowaj go jako raportowany cel i zaproponuj
deterministyczny budżet zamiast arbitralnego obniżenia jakości.

## Wynik realizacji

Data realizacji: 2026-08-22

Końcowy status: `COMPLETED`

Stan źródeł i narzędzi:

- oficjalną dokumentację Astro Sitemap, Playwright, axe, HTML Validate,
  Lighthouse i zabezpieczeń GitHub Actions sprawdzono 2026-08-22;
- przypięto `@astrojs/sitemap 3.7.3`, `@playwright/test 1.62.1`,
  `@axe-core/playwright 4.12.1`, `html-validate 11.6.2` i
  `lighthouse 13.4.1`;
- akcje `checkout v6`, `setup-node v6` i `upload-pages-artifact v5` wskazują
  pełne, zweryfikowane SHA, a workflow zachowuje wyłącznie `contents: read`;
- Dependabot sprawdza osobno npm i GitHub Actions co tydzień, z limitem pięciu
  otwartych PR dla każdego ekosystemu.

Macierz bramek została zapisana w
`docs/quality/QUALITY_GATE_MATRIX.md`. Nowe główne polecenia to:

- `npm test` — pełny kontrakt lokalny i CI;
- `npm run build:preview` / `npm run test:preview` — chroniony szkic;
- `npm run build:production` / `npm run test:production` — restrykcyjna
  produkcja;
- `npm run test:production-contract` — oczekuje blokady przy szkicach, a po
  ZAD7 będzie oczekiwał przejścia produkcji;
- `npm run validate:html`, `npm run test:browser`, `npm run test:negative` i
  `npm run audit:lighthouse` — węższe kontrole diagnostyczne.

Zaimplementowane bramki:

- jeden audyt statyczny wymaganych tras, semantyki, linków, kotwic, canonical,
  `robots.txt`, sitemap, statusu indeksowania, originów zasobów, braku JS na
  stronach prawnych, prywatnych formatów, wzorców sekretów i pełnego SHA
  workflow;
- `build-meta.json` z trybem builda, czasem i pełnym SHA źródła;
- sitemap pomijającą każdą bieżącą trasę `noindex`, stronę 404 i szkice;
- deterministyczne budżety: CSS gzip 50 KiB, JavaScript 10 KiB, pojedynczy
  obraz 200 KiB i cały artefakt 1 MiB;
- Playwright dla HTTP, nagłówka `text/html`, 320 px, celów 44 px, klawiatury,
  skip linku, widocznego fokusu, CLS i braku zewnętrznych żądań;
- osobny projekt Playwright z wyłączonym JavaScriptem dla pięciu tras centrum
  prawnego oraz test prawdziwych kotwic polityki i warunków;
- axe dla sześciu kluczowych tras, blokujący naruszenia `critical` i `serious`;
- offline `html-validate` oraz lokalny serwer fixture respektujący bazę
  `/finapso-legal/`;
- kontrolowane negatywne fixtures poza `dist/`, korzystające z tych samych
  funkcji audytu co prawdziwy artefakt.

Pełny pozytywny przebieg preview:

- `npm ci`: `PASS`, 386 pakietów, 0 znanych podatności;
- `npm test`: `PASS` po czystej instalacji;
- Astro check: 42 pliki, 0 błędów, 0 ostrzeżeń i 0 podpowiedzi;
- build: 14 stron HTML oraz `robots.txt`, `sitemap-index.xml` i
  `sitemap-0.xml`;
- audyt statyczny: 14/14 tras, CSS gzip 3393 B, JavaScript 0 B, artefakt
  113169 B;
- HTML Validate: `PASS`, 0 błędów i ostrzeżeń;
- wcześniejsze checkery ZAD4 i ZAD5: odpowiednio 7/7 oraz 5/5 tras;
- Playwright/axe: 17/17 testów; zero zewnętrznych żądań i zero naruszeń axe
  `critical` lub `serious`;
- build kontrolny dla `SITE_ORIGIN=https://example.com`, `SITE_BASE=/`:
  `PASS`; po nim przywrócono domyślny artefakt GitHub Pages.

Oczekiwany wynik produkcji przed ZAD7:

- `npm run build:production`: oczekiwany kod 1;
- raport wskazuje `/privacy/`: lorem ipsum i `DRAFT`, `/terms/`: lorem ipsum i
  `DRAFT`, a `/privacy/archive/`, `/support/` i `/licenses/`: `DRAFT`;
- `npm run test:production-contract`: `PASS`, ponieważ blokada odpowiada
  faktycznemu stanowi pięciu tras; skrypt następnie odbudowuje preview;
- adres `/privacy/` nadal nie może zostać użyty w Google Play Console.

Kontrolowane przypadki negatywne:

- placeholder w produkcyjnej polityce: `PASS`, błąd `[release-placeholder]`;
- brakujący link wewnętrzny: `PASS`, błąd `[internal-link]`;
- zewnętrzny skrypt trackera: `PASS`, błąd `[external-resource]`.

Pomiary środowiskowe Lighthouse w mobilnym profilu lokalnym:

- strona główna: Performance 100, Accessibility 100, Best Practices 100,
  SEO 100, LCP 960 ms, CLS 0;
- polityka: Performance 100, Accessibility 100, Best Practices 100, SEO 69,
  LCP 960 ms, CLS 0;
- SEO polityki jest celowo niższe, ponieważ ZAD5 wymaga `noindex, nofollow`
  aż do zatwierdzenia dokumentu w ZAD7. Nie obniżono celu 95 ani nie wyłączono
  ochrony szkicu;
- na tym środowisku Windows Lighthouse tworzy prawidłowe raporty JSON, ale
  jego proces pomocniczy zwraca błąd `EPERM` podczas usuwania tymczasowego
  profilu Chromium. Runner zachowuje i waliduje kompletny raport, jawnie
  zgłasza ograniczenie i kończy pomiar poprawnie. Lighthouse pozostaje raportem
  środowiskowym, a CI blokują powtarzalne budżety oraz test CLS.

Zmodyfikowano konfigurację Astro/npm, workflow i Dependabot, dodano konfigurację
HTML Validate/Playwright, skrypty builda i audytu, fixtures oraz testy
przeglądarkowe, trasy 404/robots, centralną listę `noindex`, dokumentację bramek
i README. Dodatkowo element grupujący indeks dokumentacji zmieniono z `div` na
semantyczne `section`, ponieważ formalny walidator poprawnie odrzucał
`aria-label` na niesemantycznym kontenerze.

Pliki realizacji ZAD6:

- konfiguracja i zależności: `.gitignore`, `.htmlvalidate.json`,
  `astro.config.mjs`, `package.json`, `package-lock.json` i
  `playwright.config.ts`;
- automatyzacja: `.github/workflows/build-pages.yml`,
  `.github/dependabot.yml`, `scripts/build-site.mjs`,
  `scripts/check-site.mjs`, `scripts/lib/site-audit.mjs`,
  `scripts/run-quality-gate.mjs`, `scripts/verify-production-contract.mjs`,
  `scripts/test-negative-gates.mjs`, `scripts/serve-dist.mjs` i
  `scripts/run-lighthouse.mjs`;
- testy: `tests/browser/browser-quality.spec.ts`,
  `tests/browser/legal-no-javascript.spec.ts`,
  `tests/fixtures/site-contract.json` i
  `tests/fixtures/negative-gates.json`;
- integracja witryny: `src/config/site.mjs`, `src/pages/404.astro`,
  `src/pages/robots.txt.ts` i `src/pages/docs/index.astro`;
- dokumentacja: `README.md`, `PLAN.md`,
  `docs/quality/QUALITY_GATE_MATRIX.md` i bieżący plik zadania.

Niewykonane operacje i ryzyka:

- workflow nie został opublikowany ani uruchomiony na zewnętrznym pull
  requeście; pełny odpowiednik wykonano lokalnie. Nie zmieniano ochrony gałęzi,
  więc oznaczenie joba jako wymaganego pozostaje ustawieniem repozytorium poza
  zakresem ZAD6;
- nie wykonano `push`, wdrożenia GitHub Pages ani testu publicznego hosta;
- po ZAD7 trzeba usunąć zatwierdzone trasy z `noIndexRoutes` razem ze zmianą
  ich statusu treści; produkcyjna bramka wymusi brak placeholderów, ale nie
  zastępuje przeglądu prawnego i zgodności z aplikacją.

## Prompt uruchomieniowy

```text
Zrealizuj ZAD6 opisane w
docs/tasks/ZAD6-quality-gates-and-release-safety.md jako pojedynczy GPT-5.6
Terra z reasoning high. Przeczytaj AGENTS.md, PLAN.md, cały aktualny kod strony
oraz wyniki ZAD2–ZAD5. Zbuduj jeden spójny zestaw lokalnych i CI bramek dla
preview oraz production. Produkcja ma odrzucać szkice, ale skaner nie może
fałszywie odrzucać dokumentacji planu. Dodaj testy bez JavaScriptu, dostępności,
tras, linków, originów i budżetów. Udowodnij skuteczność kontrolowanymi
przypadkami negatywnymi i uzupełnij Wynik realizacji.
```
