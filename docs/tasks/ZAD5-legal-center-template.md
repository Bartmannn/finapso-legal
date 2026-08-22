# ZAD5 — szablon publicznego centrum prawnego

Status: `COMPLETED`

Zależności: ZAD3

Może być wykonywane równolegle z: ZAD4

Zalecany wykonawca: `GPT-5.6 Terra`, reasoning `high`

## Rezultat użytkowy

Powstaje kompletne, dostępne centrum prawne gotowe do późniejszego wypełnienia
zatwierdzonym tekstem. Osoba oglądająca podgląd nie może pomylić lorem ipsum z
obowiązującym dokumentem ani przypadkiem użyć jego adresu w Play Console.

## Kontekst obowiązkowy

Przeczytaj w kolejności:

1. `AGENTS.md`, `PLAN.md` i ten plik;
2. aktualny kod strony oraz `LegalLayout` po ZAD3;
3. wyniki ZAD1, jeśli istnieją, tylko dla publicznej nazwy i kontaktów;
4. `../Finapso/AGENTS.md`, `../Finapso/README.md` i sekcję prawną
   `../Finapso/UI.md`;
5. `../Finapso/docs/plans/68-privacy-policy-and-legal-notices.md`;
6. `../Finapso/docs/plans/69-public-legal-site-and-app-ads-hosting.md`.

Nie używaj planów 68–69 jako gotowej treści prawnej. Istniejące pliki `.txt`
możesz zinwentaryzować, ale nie kopiuj ich treści do szablonu i ich nie zmieniaj.

## Stan wejściowy i bramki

- ZAD3 musi być ukończone.
- ZAD1 nie musi być zamknięte, ponieważ szablon może używać jawnie oznaczonych
  pól demonstracyjnych.
- Każda strona prawna musi być szkicem i mieć techniczną blokadę indeksowania.
- Podgląd polityki powstaje pod pełnym adresem
  `https://bartmannn.github.io/finapso-legal/privacy/`, ale nie wolno jeszcze
  wpisywać go w Play Console.
- Nie twórz ani nie wdrażaj `/app-ads.txt` z przykładową zawartością.
- `security.txt` może być generowany dopiero po potwierdzeniu publicznego
  kontaktu; wcześniej przygotuj niedeployowany przykład lub konfigurację.

## Cel

Zbudować kompletne layouty i routing centrum prawnego, używając na tym etapie
wyłącznie jednoznacznie oznaczonego tekstu przykładowego.

## Trasy

- `/privacy/` — polityka prywatności;
- `/terms/` — warunki korzystania;
- `/support/` — wsparcie, prywatność i żądania dotyczące danych;
- `/licenses/` — informacje o licencjach;
- `/.well-known/security.txt` — kontakt bezpieczeństwa po potwierdzeniu aliasu;
- `/privacy/archive/` — indeks wcześniejszych zatwierdzonych rewizji, aktywny
  dopiero po powstaniu kolejnej wersji.

## Zakres

- Dodać tytuł dokumentu, nazwę Finapso, pakiet `app.finapso.android`, datę,
  rewizję, status i historię zmian.
- Przygotować spis treści z prawdziwymi kotwicami HTML.
- Zaplanować sekcje danych lokalnych, OCR, PIN-u, kopii, asystenta,
  dobrowolnych zgłoszeń, reklam/UMP, odbiorców, retencji, usuwania,
  zabezpieczeń i praw użytkownika.
- Dodać wsparcie wydruku bez nawigacji, CTA i dekoracji.
- Przygotować stabilne linkowanie do konkretnych nagłówków.
- Dodać stronę wsparcia z instrukcją usuwania danych lokalnych i kanałem
  żądania usunięcia danych dobrowolnie przesłanych do wsparcia.
- Wyjaśnić, że Finapso obecnie nie tworzy kont użytkowników.
- Dodać bezpieczny mechanizm archiwizacji rewizji bez zmiany bieżącego adresu
  `/privacy/`.

## Kolejność pracy

1. Sprawdź metadane i możliwości `LegalLayout`.
2. Zdefiniuj jeden typowany schemat dokumentu prawnego: status, rewizja, data,
   data obowiązywania, wersja aplikacji i historia zmian.
3. Utwórz szkice polityki oraz warunków z realistyczną hierarchią nagłówków i
   lorem ipsum wewnątrz sekcji.
4. Dodaj globalne, zawsze widoczne ostrzeżenie szkicu oraz `noindex, nofollow`.
5. Zbuduj support i licenses jako osobne strony, nie jako sekcje polityki.
6. Przygotuj mechanizm archiwum, ale nie twórz fikcyjnej poprzedniej rewizji.
7. Przygotuj niedeployowany `security.txt` lub warunkowe generowanie zależne od
   potwierdzonego kontaktu.
8. Sprawdź bezpośrednie wejście, kotwice, wydruk, klawiaturę i brak skryptów.
9. Wykonaj kontrolowany test, że każda demonstracyjna strona ma ostrzeżenie i
   blokadę indeksowania.

## Obowiązkowa ochrona szkicu

Każdy dokument z lorem ipsum pokazuje nad treścią:

> Wersja demonstracyjna — treść przykładowa, nie stanowi dokumentu prawnego i
> nie może zostać użyta w Google Play Console.

Szkic otrzymuje `noindex, nofollow`, status `DRAFT` i nie może wyglądać jak
zatwierdzona wersja. Istniejących plików `.txt` nie uznajemy automatycznie za
treść finalną.

## Poza zakresem

- finalna polityka lub porada prawna;
- publikacja przykładowego `app-ads.txt`;
- formularz sieciowy zbierający dane;
- integracja z Play Console;
- zmiana aplikacji Android.

## Oczekiwane pliki

- typowany schemat treści prawnej;
- treści lub strony dla `/privacy/`, `/terms/`, `/support/` i `/licenses/`;
- komponent ostrzeżenia szkicu;
- logika metadanych `robots` zależna od statusu dokumentu;
- pusty mechanizm `/privacy/archive/` bez fikcyjnych rewizji;
- niedeployowany przykład `security.txt` albo bezpieczna konfiguracja warunkowa;
- testy struktury nagłówków, metadanych szkicu i braku JavaScriptu, jeśli stos
  testowy już istnieje.

## Kryteria odbioru

- Wszystkie trasy działają bez JavaScriptu i logowania.
- Lorem ipsum jest jednoznacznie odseparowane od finalnej treści.
- Dokumenty są czytelne, drukowalne i mają stabilne kotwice.
- Publiczny użytkownik nie może edytować ani komentować treści.
- Nie opublikowano fikcyjnych danych wydawcy ani Publisher ID.
- Archiwum rewizji zachowuje jeden bieżący adres kanoniczny.

## Weryfikacja

- bezpośrednie wejście na każdą trasę przy wyłączonym JavaScripcie;
- kontrola `noindex`, ostrzeżenia i statusu szkicu;
- wydruk polityki i warunków;
- test linków do kotwic;
- `npm run build` i `git diff --check`.

## Commit

Po pełnym odbiorze wykonaj procedurę z `AGENTS.md`. Stage obejmuje wyłącznie
szablony centrum prawnego, mechanizm ochrony szkicu, testy, status ZAD5 i
odpowiadający wiersz w `PLAN.md`. Nie dodawaj istniejących dokumentów `.txt` ani
przykładowego `app-ads.txt`.

Sugerowany komunikat:

```text
feat(legal): add protected legal center templates
```

## Kiedy zapytać użytkownika

Nie pytaj o finalne brzmienie polityki, podstawy prawne ani dane wydawcy — to
zakres ZAD7 i wcześniejszych decyzji. Zapytaj tylko wtedy, gdy istniejący design
nie pozwala jednoznacznie odróżnić szkicu albo gdy właściciel chce publicznie
wdrożyć wersję demonstracyjną. W drugim przypadku wyjaśnij, że URL nie może być
jeszcze użyty w Play Console.

## Wynik realizacji

Data: 2026-08-22

Końcowy status: `COMPLETED`

Gotowy rezultat:

- utworzono chronione trasy `/privacy/`, `/terms/`, `/support/`, `/licenses/`
  i puste `/privacy/archive/`, respektujące bazę `/finapso-legal/`;
- wspólny typowany schemat dokumentu obejmuje status, rewizję, aktualizację,
  datę obowiązywania, pakiet Android, wersję aplikacji i historię zmian;
- polityka i warunki mają realistyczną hierarchię, automatyczny spis treści oraz
  stabilne kotwice, ale używają wyłącznie jawnie oznaczonego lorem ipsum;
- każdy ekran centrum prawnego pokazuje nad treścią dokładne ostrzeżenie wersji
  demonstracyjnej, widoczny status `DRAFT`, informację „Nie obowiązuje — szkic”
  i meta `noindex, nofollow` wyprowadzone ze statusu dokumentu;
- strona wsparcia rozdziela usuwanie danych lokalnych od żądania usunięcia
  dobrowolnie przesłanego zgłoszenia oraz wyjaśnia brak kont Finapso;
- archiwum nie zawiera fikcyjnych rewizji i zachowuje `/privacy/` jako stabilny
  bieżący adres; niedeployowany przykład `security.txt` nie zawiera aktywnego
  kontaktu i nie trafia do `public/`;
- stopka i sekcja centrum prawnego strony głównej prowadzą do nowych tras.

Weryfikacja:

- `npm run check`: 29 plików, 0 błędów, 0 ostrzeżeń i 0 podpowiedzi;
- `npm run build`: 13 statycznych stron, build zakończony poprawnie;
- `npm run check:legal-center`: 5 chronionych tras, poprawne ostrzeżenie,
  `DRAFT`, `noindex, nofollow`, canonical, kotwice, linki, brak skryptów,
  formularzy, edycji treści i publicznego `security.txt`;
- `npm run check:product-pages`: 7 wcześniejszych tras bez regresji;
- bezpośrednie żądania HTTP: wszystkie 5 tras zwraca `200 text/html`;
- odbiór Chrome przy szerokościach 320, 360, 768, 1024 i 1440 px: brak
  poziomego przewijania, brak celów interakcji poniżej 44 px, jeden `h1` i
  `main`, brak nienazwanych linków/przycisków; pierwszy Tab trafia na skip-link
  z obrysem 3 px;
- emulacja wydruku `/privacy/` i `/terms/`: nawigacja, stopka, okruszki i spis
  treści są ukryte, natomiast ostrzeżenie szkicu pozostaje widoczne;
- `git diff --check`: bez błędów; ostrzeżenia o konwersji LF/CRLF są zgodne z
  konfiguracją kopii roboczej i nie oznaczają błędów whitespace.

Celowo odłożono do ZAD7: finalne brzmienie polityki i warunków, zatwierdzone
podstawy prawne, retencję i terminy odpowiedzi, pełny wykaz licencji, pierwszą
obowiązującą rewizję archiwum oraz synchronizację dokumentów z aplikacją,
Google Play i produkcyjnym AAB. URL `/privacy/` nadal nie może zostać użyty w
Play Console. Formalne axe, Lighthouse i walidacja HTML należą do ZAD6.

## Prompt uruchomieniowy

```text
Zrealizuj ZAD5 opisane w docs/tasks/ZAD5-legal-center-template.md jako
pojedynczy GPT-5.6 Terra z reasoning high. Przeczytaj AGENTS.md, PLAN.md,
LegalLayout oraz wskazane plany aplikacji. Zbuduj wszystkie trasy centrum
prawnego z lorem ipsum wyłącznie jako jednoznacznie oznaczony szkic DRAFT z
noindex, nofollow. Nie kopiuj istniejących plików .txt, nie twórz finalnych
deklaracji prawnych, przykładowego app-ads.txt ani fikcyjnego archiwum. Udowodnij
działanie bez JavaScriptu, poprawny wydruk i ochronę szkicu, po czym uzupełnij
Wynik realizacji.
```
