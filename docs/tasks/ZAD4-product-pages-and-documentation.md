# ZAD4 — strony produktowe i dokumentacja użytkowa

Status: `COMPLETED`

Zależności: ZAD3

Może być wykonywane równolegle z: ZAD5

Zalecany wykonawca: `GPT-5.6 Terra`, reasoning `high`

## Rezultat użytkowy

Użytkownik rozumie, czym Finapso jest, czego nie robi oraz jak rozpocząć pracę,
zarządzać kopiami, paragonami i asystentem. Każde twierdzenie da się powiązać z
aktualnym kodem albo dokumentacją aplikacji.

## Kontekst obowiązkowy

Przeczytaj w kolejności:

1. `AGENTS.md`, `PLAN.md` i ten plik;
2. wynik ZAD1: `docs/decisions/SITE_DECISIONS.md`,
   `docs/content/CONTENT_SOURCE_MAP.md` oraz `docs/content/CLAIMS_CONTRACT.md`,
   jeśli istnieją;
3. aktualny kod i komponenty strony po ZAD3;
4. `../Finapso/AGENTS.md` i `../Finapso/README.md`;
5. `../Finapso/UI.md` dla przepływów użytkownika i słownictwa;
6. `../Finapso/RECEIPT.md` tylko dla artykułu o paragonach;
7. `../Finapso/NOTIFICATION_ASSISTANT.md` tylko dla artykułu o asystencie;
8. `../Finapso/ADVERTISING.md` tylko dla twierdzeń o reklamach i prywatności;
9. bieżący `versionName` z `../Finapso/app/build.gradle.kts`.

Jeśli dokumentacja i kod są sprzeczne, ustal stan z kodu oraz aktywnych planów i
zgłoś rozbieżność. Nie naprawiaj aplikacji w ramach ZAD4.

## Stan wejściowy i bramki

- ZAD3 musi być ukończone.
- ZAD1 może nadal oczekiwać na część decyzji. Wtedy buduj treści potwierdzone i
  pomiń CTA, kontakty lub nazwę wydawcy wymagające decyzji.
- Brak zatwierdzonych zrzutów nie blokuje struktury stron. Nie twórz fałszywych
  screenshotów; zastosuj neutralne miejsce albo usuń sekcję do czasu dostarczenia
  zasobów.
- Link Google Play pozostaje nieaktywny lub nieobecny do czasu prawdziwego URL.

## Cel

Przedstawić Finapso rzetelnie i zbudować użyteczną dokumentację opartą na
faktycznym zachowaniu aplikacji.

## Trasy

- `/` — strona główna;
- `/features/` — funkcje;
- `/docs/` — indeks dokumentacji;
- `/docs/getting-started/` — pierwsze kroki;
- `/docs/data-and-backups/` — dane i kopie;
- `/docs/receipts/` — paragony, OCR i korekta;
- `/docs/notifications/` — asystent powiadomień.

## Zakres

- Hero z krótką, konkretną obietnicą i bez przesadnych twierdzeń.
- Sekcje o budżetach, transakcjach, analizach, paragonach, kopiach i
  bezpieczeństwie.
- Sekcja prywatności rozróżniająca dane lokalne, świadome zgłoszenia i przyszłe
  działanie SDK reklamowego.
- CTA do dokumentacji; CTA do Google Play dopiero po uzyskaniu prawdziwego URL.
- Dokumentacja ze spisem treści, datą aktualizacji i wersją aplikacji.
- Zanonimizowane zrzuty wyłącznie z danych demonstracyjnych.
- Jawne ograniczenia OCR, parsera, prognoz i funkcji eksperymentalnych.
- Metadata Open Graph, canonical oraz strukturalne dane `SoftwareApplication`
  tylko dla potwierdzonych informacji.
- Wszystkie canonical, linki i zasoby muszą uwzględniać publiczną bazę
  `https://bartmannn.github.io/finapso-legal/` i nie mogą prowadzić omyłkowo do
  korzenia `bartmannn.github.io`.
- Przygotowanie na późniejsze tłumaczenia bez automatycznej geolokalizacji.

## Kolejność pracy

1. Zbuduj macierz `trasa → odbiorca → pytanie użytkownika → źródło → CTA`.
2. Zweryfikuj funkcje i wersję aplikacji w wymaganym kontekście.
3. Napisz stronę główną i stronę funkcji prostym, konkretnym językiem.
4. Zbuduj indeks dokumentacji i cztery artykuły, używając wspólnego schematu
   metadanych.
5. Dodaj cross-linki między artykułami oraz do centrum prawnego bez kopiowania
   treści prawnej.
6. Dodaj wyłącznie zatwierdzone obrazy demo i ich opisy; zoptymalizuj formaty i
   rozmiary.
7. Dodaj canonical, metadata społecznościowe i strukturalne dane tylko dla
   potwierdzonych pól.
8. Przejrzyj wszystkie zdania pod kątem zakazanych skrótów i wersji funkcji.
9. Wykonaj kontrolę wizualną, dostępności, linków i builda.

Każdy dłuższy artykuł ma odpowiadać na konkretne zadanie użytkownika, podawać
ograniczenia oraz kończyć się następnym sensownym krokiem.

## Niedozwolone skróty

- „Finapso jest bankiem” lub sugerowanie integracji bankowej.
- „OCR jest bezbłędny” albo „analizy są poradą finansową”.
- „Żadne dane nigdy nie opuszczają urządzenia”.
- Pokazywanie prywatnych paragonów, sald, powiadomień lub danych właściciela.
- Nieaktywne, pozorne przyciski pobierania aplikacji.

## Oczekiwane pliki

- strony Astro lub wpisy kolekcji dla wszystkich tras wskazanych w zadaniu;
- współdzielone komponenty produktowe tylko tam, gdzie są rzeczywiście
  powtarzalne;
- lokalne obrazy demo i ich udokumentowane źródło;
- testy albo fixtures metadanych potrzebne do późniejszej bramki ZAD6;
- aktualizacja README, jeśli zmienia się sposób dodawania dokumentacji.

## Kryteria odbioru

- Każda trasa istnieje jako samodzielny HTML.
- Każde twierdzenie produktowe ma wskazane źródło w dokumentacji aplikacji.
- Dokumentacja jest użyteczna na telefonie i z klawiaturą.
- Zrzuty nie zawierają danych prywatnych i mają właściwe opisy alternatywne.
- Linki do polityki, warunków i wsparcia są widoczne z każdej strony.
- Strona nie obiecuje funkcji niedostępnych w dystrybuowanej wersji.

## Weryfikacja

- przegląd merytoryczny względem `README.md`, `UI.md` i kodu aplikacji;
- kontrola linków, HTML, canonical i metadanych społecznościowych;
- test telefonu, klawiatury i czytnika ekranu;
- `npm run build` i `git diff --check`.

## Commit

Po pełnym odbiorze wykonaj procedurę z `AGENTS.md`. Stage obejmuje strony
produktowe, dokumentację, zatwierdzone zasoby demo, testy tych stron, status
ZAD4 i odpowiadający wiersz w `PLAN.md`.

Sugerowany komunikat:

```text
feat(site): add product pages and user documentation
```

## Kiedy zapytać użytkownika

Zapytaj, gdy brak zatwierdzonego sloganu, zrzutu lub linku Google Play prowadziłby
do opublikowania nieprawdy. Nie pytaj o zwykły układ strony, kolejność sekcji ani
redakcję zdań, jeśli można je rozstrzygnąć na podstawie źródeł i design systemu.
Nie twórz danych demo przypominających prawdziwe dane właściciela.

## Wynik realizacji

Data realizacji: 2026-08-22

Końcowy status: `COMPLETED`

Gotowe trasy:

- `/`;
- `/features/`;
- `/docs/`;
- `/docs/getting-started/`;
- `/docs/data-and-backups/`;
- `/docs/receipts/`;
- `/docs/notifications/`.

Źródła wykorzystane do potwierdzenia treści:

- decyzje i kontrakty ZAD1: `SITE_DECISIONS.md`, `CONTENT_SOURCE_MAP.md` i
  `CLAIMS_CONTRACT.md`;
- `../Finapso/README.md`, `../Finapso/UI.md`, `../Finapso/RECEIPT.md`,
  `../Finapso/NOTIFICATION_ASSISTANT.md` i `../Finapso/ADVERTISING.md`;
- `../Finapso/app/build.gradle.kts`, w tym `versionName = "1.37.25"` oraz
  zamknięta bramka reklamowa release;
- aktywny rejestr planów aplikacji i statusy `BLOCKED` zadań 64 oraz 76.

Macierz trasa–odbiorca–pytanie–źródło–CTA i rejestr dwunastu głównych twierdzeń
zapisano w `docs/content/PRODUCT_CONTENT_MATRIX.md`. W przypadku asystenta
powiadomień kod i dokumentacja funkcji wyprzedzają jej odbiór publikacyjny.
Dlatego trasa istnieje jako jawny materiał roboczy z `noindex, nofollow`, nie
zawiera instrukcji aktywacji i nie przedstawia funkcji jako dostępnej.

Zasoby graficzne:

- użyto wyłącznie zatwierdzonego znaku i grafiki Open Graph z ZAD3;
- nie dodano zrzutów ani makiet aplikacji, ponieważ właściciel nie dostarczył
  zatwierdzonych, zanonimizowanych ekranów. Brak zrzutów nie blokuje tekstowego
  zakresu ZAD4.

Weryfikacja:

- `npm run check`: 22 pliki, 0 błędów, ostrzeżeń i wskazówek;
- `npm run build`: 9 statycznych stron HTML, w tym wszystkie 7 tras ZAD4;
- `npm run check:product-pages`: 7/7 tras; sprawdzone title, description,
  canonical, Open Graph, linki i kotwice, indeksowanie, jeden `h1`, landmark
  `main`, brak lorem ipsum i brak wykonywalnego JavaScriptu;
- bezpośrednie żądania do wszystkich 7 tras: HTTP 200;
- Chrome Accessibility Tree: nazwane linki i przyciski, obecne landmarki
  `banner`, `navigation`, `main` i `contentinfo`, brak pominiętych poziomów
  nagłówków i obrazów bez `alt`;
- klawiatura: skip-link jest pierwszym elementem, kolejność fokusu jest logiczna,
  a widoczny obrys ma 3 px;
- kontrola responsywności i wizualna w jasnym i ciemnym motywie przy 320, 360,
  768, 1024 i 1440 px: brak poziomego przewijania oraz elementów interaktywnych
  mniejszych niż 44×44 CSS px; sprawdzono również `prefers-reduced-motion`;
- `git diff --check`: wynik poprawny przed stagingiem.

Znane luki przekazane dalej:

- brak prawdziwego adresu Google Play, więc nie ma przycisku pobierania;
- `/privacy/` nadal jest niepublikacyjnym szkieletem do ZAD5/ZAD7;
- osobne trasy `/terms/` i `/support/` należą do ZAD5. Do tego czasu wspólna
  stopka prowadzi odpowiednio do uczciwego statusu dokumentu na stronie głównej
  i potwierdzonego adresu e-mail wsparcia;
- formalne audyty axe, Lighthouse i walidator HTML pozostają pełnymi bramkami
  ZAD6; ZAD4 dostarcza fixture oraz lekki checker stron do ich integracji.

## Prompt uruchomieniowy

```text
Zrealizuj ZAD4 opisane w docs/tasks/ZAD4-product-pages-and-documentation.md jako
pojedynczy GPT-5.6 Terra z reasoning high. Przeczytaj AGENTS.md, PLAN.md, wyniki
wcześniejszych ZAD oraz dokładnie wskazane dokumenty aplikacji. Zbuduj wszystkie
trasy produktowe i dokumentacyjne jako statyczny HTML. Każde twierdzenie
potwierdź w źródle, nie twórz fałszywych screenshotów ani pozornych CTA i nie
zmieniaj aplikacji Android. Wykonaj przegląd merytoryczny, wizualny, linków,
dostępności i builda, a następnie uzupełnij Wynik realizacji.
```
