# ZAD3 — design system i wspólne layouty

Status: `COMPLETED`

Zależności: ZAD2

Zalecany wykonawca: `GPT-5.6 Terra`, reasoning `high`

## Rezultat użytkowy

Powstaje kompletny zestaw współdzielonych layoutów i komponentów, na którym
ZAD4 oraz ZAD5 mogą niezależnie budować strony bez duplikowania nawigacji,
stylów i reguł dostępności.

## Kontekst obowiązkowy

Przeczytaj w kolejności:

1. `AGENTS.md`;
2. `PLAN.md`;
3. ten plik;
4. aktualny kod strony po ZAD2;
5. `../Finapso/AGENTS.md`;
6. `../Finapso/UI.md`, zwłaszcza motyw, kolory, typografię i dostępność;
7. `../Finapso/app/src/main/java/app/finapso/android/ui/theme/Theme.kt`;
8. zatwierdzone zasoby ikony aplikacji w `../Finapso/app/src/main/res/`.

Nie czytaj dokumentów finansowych ani prywatności aplikacji, jeśli nie są
potrzebne do konkretnego elementu wizualnego.

## Stan wejściowy i bramki

- ZAD2 musi mieć status `COMPLETED` i przechodzący build.
- Nie zmieniaj architektury Astro bez udowodnionej potrzeby.
- Nie generuj nowego logo ani konkurencyjnego znaku. Użyj zatwierdzonego zasobu
  albo neutralnego napisu „Finapso”, jeśli eksport logo nie jest jeszcze gotowy.
- Nie dodawaj biblioteki komponentów, frameworka CSS lub pakietu ikon bez
  porównania kosztu z prostym lokalnym CSS/SVG.

## Cel

Zbudować nowoczesny, spokojny i dostępny system wizualny będący rozszerzeniem
interfejsu aplikacji Finapso.

## Zakres

- Przenieść zatwierdzone kolory aplikacji do tokenów CSS:
  - marka `#1F6A49` / ciemny motyw `#8DBBA4`;
  - tło `#F4F6F4` / `#121613`;
  - tekst `#1D2420` / `#FFFFFF`;
  - karty `#FFFFFF` / `#181D1A`;
  - obramowanie `#D5DAD7` / `#68716C`.
- Ustalić system odstępów, promieni, typografii, kontenerów i stanów
  semantycznych.
- Zbudować `BaseLayout`, `DocsLayout` i `LegalLayout`.
- Zbudować nagłówek, responsywną nawigację, stopkę, breadcrumbs, spis treści,
  karty, przyciski, callouty i link „Pomiń do treści”.
- Dodać motyw zgodny z `prefers-color-scheme`; ręczny przełącznik jest
  opcjonalny i nie może być konieczny do odczytu.
- Dodać arkusz wydruku dla polityki, warunków i dokumentacji.
- Przygotować lokalne logo, favicon i obraz Open Graph na podstawie
  zatwierdzonych zasobów Finapso.
- Ustalić szerokość tekstu prawnego około 760 px i głównej siatki około 1120 px.
- Uwzględnić `prefers-reduced-motion` i brak animacji w treści prawnej.

## Kolejność pracy

1. Zinwentaryzuj istniejące style i komponenty po ZAD2.
2. Przenieś semantyczne kolory i skalę typografii do jednego zestawu tokenów.
3. Zbuduj bazowy dokument HTML z metadanymi, skip linkiem i landmarkami.
4. Zbuduj nagłówek, nawigację i stopkę w wariancie telefonu oraz desktopu.
5. Zbuduj osobno layout dokumentacji i layout prawny.
6. Dodaj komponenty treści tylko wtedy, gdy będą współdzielone przez co najmniej
   dwa obszary albo kod bez nich byłby nieczytelny.
7. Dodaj motyw systemowy, reduced motion oraz arkusz wydruku.
8. Wypełnij layouty realistycznym polskim tekstem testowym o długich nagłówkach.
9. Wykonaj wizualną kontrolę wszystkich wskazanych szerokości i stanów.

Preferuj CSS i małe komponenty Astro. Rozwiązanie ma być nowoczesne dzięki
hierarchii, typografii, odstępom i detalom, a nie ciężkim efektom albo animacjom.

## Dostępność

- Semantyczny HTML i logiczna kolejność nagłówków.
- Kontrast WCAG 2.2 AA.
- Widoczny fokus i pełna obsługa klawiaturą.
- Obszary interakcji co najmniej 44×44 CSS px.
- Brak przekazywania znaczenia wyłącznie kolorem.
- Czytelność przy 200% powiększeniu i zwiększonych odstępach tekstu.
- Brak poziomego przewijania od 320 px szerokości.

## Oczekiwane pliki

- `src/styles/tokens.css` i `src/styles/global.css`;
- `src/layouts/BaseLayout.astro`;
- `src/layouts/DocsLayout.astro`;
- `src/layouts/LegalLayout.astro`;
- współdzielone komponenty nawigacji, stopki, breadcrumbs, spisu treści,
  calloutów i przycisków;
- lokalne, zoptymalizowane zasoby marki w `public/`;
- strony lub fixtures demonstracyjne potrzebne do wizualnej kontroli.

## Kryteria odbioru

- Wszystkie layouty działają w jasnym i ciemnym motywie.
- Nawigacja działa klawiaturą oraz przy wyłączonym JavaScripcie.
- Legal layout ma spis treści, metadane rewizji i poprawny wydruk.
- Komponenty nie łamią się przy długim polskim tekście.
- Logo i ikony nie tworzą nowej, konkurencyjnej identyfikacji.
- Testy dostępności nie zgłaszają naruszeń krytycznych ani poważnych.

## Weryfikacja

- widoki 320, 360, 768, 1024 i 1440 px;
- jasny/ciemny motyw i reduced motion;
- klawiatura, 200% zoom i wydruk do PDF wyłącznie jako test layoutu;
- automatyczny audyt axe;
- `npm run build` i `git diff --check`.

Jeżeli axe lub testy przeglądarkowe nie są jeszcze częścią projektu, wykonaj
kontrolę dostępnymi narzędziami i zapisz dokładny brak jako wymaganie ZAD6. Nie
dodawaj rozbudowanego stosu testowego tylko po to, aby zamknąć ZAD3.

## Commit

Po pełnym odbiorze wykonaj procedurę z `AGENTS.md`. Stage obejmuje wyłącznie
tokeny, layouty, komponenty, zatwierdzone zasoby, fixtures wizualne, status ZAD3
i odpowiadający wiersz w `PLAN.md`.

Sugerowany komunikat:

```text
feat(site): add Finapso design system
```

## Kiedy zapytać użytkownika

Zapytaj tylko wtedy, gdy zatwierdzone zasoby marki są sprzeczne albo nie da się
ustalić, który wariant logo jest produkcyjny. Zwykłe decyzje o odstępach,
breakpointach i strukturze komponentów podejmij samodzielnie na podstawie
kontraktu oraz testów. Nie rozszerzaj identyfikacji marki o nowe kolory lub fonty
bez zgody.

## Wynik realizacji

Data: 2026-08-22

Status: `COMPLETED`

Utworzono system wizualny:

- tokeny kolorów, typografii, odstępów, promieni, kontenerów i stanów w
  `src/styles/tokens.css`;
- globalne reguły responsywności, fokusu, jasnego i ciemnego motywu,
  `prefers-reduced-motion` oraz wydruku A4 w `src/styles/global.css`;
- layouty `BaseLayout`, `DocsLayout` i `LegalLayout`;
- komponenty `SiteHeader`, `SiteFooter`, `Breadcrumbs`, `TableOfContents`,
  `Callout`, `ButtonLink` i `Card`;
- lokalną, niezmienioną ikonę launchera Finapso jako favicon/znak strony oraz
  lokalny obraz Open Graph oparty na zatwierdzonej palecie i ikonie;
- demonstracyjne warianty strony bazowej, dokumentacji i dokumentu prawnego z
  długimi polskimi nagłówkami, bez zatwierdzania treści prawnej lub produktowej.

Nie dodano biblioteki komponentów, frameworka CSS, pakietu ikon, zewnętrznego
fontu ani JavaScriptu klienckiego. Nawigacja pozostaje stale dostępna i
responsywna bez skryptów. Layout prawny ma spis treści, metadane rewizji,
kolumnę tekstu do `760 px` i widoczne ostrzeżenie dla szkicu.

Wyniki kontroli:

- `npm run check`: `PASS`, 19 plików, 0 błędów, 0 ostrzeżeń i 0 podpowiedzi;
- `npm run build`: `PASS`, trzy osobne strony HTML;
- podgląd tras `/`, `/privacy/` i `/docs/routing-check/`: `HTTP 200`,
  `Content-Type: text/html`, zero tagów `<script>`;
- Chrome DevTools Protocol: `PASS` dla 320, 360, 768, 1024 i 1440 px; brak
  poziomego przepełnienia i brak aktywnych obszarów mniejszych niż `44×44 px`;
- motywy: `PASS` dla wymuszonego jasnego i ciemnego wariantu;
- `prefers-reduced-motion: reduce`: `PASS` przy 1024 px;
- klawiatura: `PASS`; skip link jest pierwszy, kolejność fokusu jest logiczna,
  a każdy sprawdzony element ma widoczny obrys `3 px`;
- odpowiednik reflow przy powiększeniu 200%: `PASS` dla viewportu `720 CSS px`
  przy `devicePixelRatio: 2`, bez poziomego przepełnienia;
- kontrast podstawowych par tekst/tło: `PASS`, zakres `5,57:1–18,26:1`;
- kontrola struktury wygenerowanego HTML: po jednym `h1`, `lang="pl"`, landmark
  `main`, brak pustych linków i obrazów bez `alt` na każdej stronie;
- wydruk polityki przez headless Chrome: `PASS`, oznakowany PDF A4, jedna strona,
  bez JavaScriptu, nagłówka serwisu, nawigacji i stopki; render Poppler nie
  wykazał przycięć, nakładania ani nieczytelnych znaków;
- favicon WebP i obraz Open Graph SVG: `HTTP 200` z poprawnymi typami MIME;
- `git diff --check`: wykonywany ponownie bezpośrednio przed stagingiem.

Niewykonane kontrole przekazane do ZAD6:

- formalny automatyczny audyt axe, ponieważ projekt nie zawiera jeszcze axe ani
  stosu testów przeglądarkowych, a ZAD3 zabrania dodawania rozbudowanego stosu
  tylko dla zamknięcia zadania;
- pełny Lighthouse i walidator HTML, które należą do bramek jakości ZAD6.

Ręczna kontrola semantyki, kontrastu, klawiatury i renderów nie wykazała
naruszeń krytycznych ani poważnych. Pliki prawne `.txt`, aplikacja Android i
konfiguracja publikacji nie zostały zmienione.

## Prompt uruchomieniowy

```text
Zrealizuj ZAD3 opisane w docs/tasks/ZAD3-design-system-and-layouts.md jako
pojedynczy GPT-5.6 Terra z reasoning high. Przeczytaj wspólny kontrakt, plan,
bieżący kod strony oraz wskazany kontekst UI aplikacji. Zbuduj spokojny,
nowoczesny i dostępny design system bez nowego logo, zewnętrznych fontów,
ciężkich bibliotek i obowiązkowego JavaScriptu. Sprawdź layouty wizualnie na
telefonie i desktopie, jasny/ciemny motyw, zoom oraz wydruk. Nie wdrażaj jeszcze
stron produktowych ani finalnej treści prawnej. Uzupełnij Wynik realizacji.
```
