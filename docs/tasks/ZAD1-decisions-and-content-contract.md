# ZAD1 — decyzje właściciela i kontrakt treści

Status: `COMPLETED`

Zależności: brak

Zalecany wykonawca: `GPT-5.6 Terra`, reasoning `high`

## Rezultat użytkowy

Po zakończeniu właściciel ma jeden czytelny rejestr decyzji potrzebnych do
budowy strony oraz macierz źródeł treści. Model nie musi wracać z tymi samymi
pytaniami w kolejnych zadaniach i nie może uzupełniać braków fikcyjnymi danymi.

## Kontekst obowiązkowy

Przeczytaj w kolejności:

1. `AGENTS.md` w tym repozytorium;
2. `PLAN.md`;
3. ten plik;
4. `README.md` tego repozytorium;
5. `Finapso_polityka_prywatności_v.1.0.txt` i
   `Finapso_regulamin_v.1.0.txt` wyłącznie jako materiały wejściowe przekazane
   przez właściciela, bez uznawania ich za zatwierdzoną treść produkcyjną;
6. `../Finapso/AGENTS.md` i `../Finapso/README.md`;
7. `../Finapso/docs/plans/README.md`, wyłącznie w celu potwierdzenia stanu zadań
   65–72.

Nie czytaj pełnych dokumentów tematycznych aplikacji, dopóki konkretna decyzja
nie wymaga potwierdzenia. Nie przeglądaj prywatnych danych ani sekretów.

## Stan wejściowy i bramki

- Zadanie jest celowo interaktywne, ale najpierw należy ustalić wszystko, co
  wynika z repozytoriów.
- Brak domeny albo danych wydawcy nie blokuje utworzenia szablonu rejestru.
- Nie wolno oznaczyć ZAD1 jako `COMPLETED`, dopóki wymagane decyzje nie są
  potwierdzone. W takiej sytuacji przygotuj wszystkie artefakty i ustaw
  `BLOCKED` z krótką listą braków.
- Nie proś użytkownika o podawanie w czacie prywatnego adresu, dokumentów,
  danych podatkowych, identyfikatorów kont ani sekretów.

## Cel

Zamknąć decyzje, których nie można bezpiecznie wywnioskować z kodu, oraz
ustalić źródła prawdy dla treści strony. Zadanie nie publikuje strony i nie
tworzy finalnej polityki prywatności.

## Zakres

- Zapisać bieżący adres `https://bartmannn.github.io/finapso-legal/` jako
  techniczny adres kanoniczny oraz ustalić, czy własna domena jest planowana.
- Jeżeli własna domena jest planowana, ustalić wariant kanoniczny (`domena` albo
  `www`) i odpowiedzialność za odnowienie.
- Ustalić, czy repozytorium oraz domena należą do konta osobistego, czy
  organizacji.
- Potwierdzić publiczną nazwę Finapso, nazwę wydawcy i ich zgodność z przyszłym
  listingiem Google Play.
- Wyznaczyć publiczny kontakt wsparcia, kontakt prywatności i opcjonalny kontakt
  bezpieczeństwa.
- Potwierdzić język MVP oraz zasady ewentualnego tłumaczenia.
- Ustalić zakres pierwszej dokumentacji i dostępność zweryfikowanych zrzutów
  ekranu z danych demonstracyjnych.
- Zmapować każdą planowaną stronę do źródła prawdy w repozytorium aplikacji.
- Zapisać zakazane twierdzenia marketingowe, w szczególności bezwzględne
  obietnice typu „żadne dane nigdy nie opuszczają urządzenia”.

## Kolejność pracy

1. Sprawdź gałąź, status Git i aktualny status ZAD1 w dwóch plikach.
2. Zbuduj listę faktów potwierdzonych przez repozytoria.
3. Oddziel decyzje organizacyjne od pytań prawnych i technicznych.
4. Utwórz niesekretny rejestr decyzji z polami: decyzja, właściciel, status,
   źródło, data weryfikacji i następny przegląd.
5. Utwórz macierz źródeł dla każdej planowanej trasy.
6. Zapisz kontrakt twierdzeń: dozwolone sformułowanie, dowód, zakazane
   uproszczenie i właściciel aktualizacji.
7. Dopiero wtedy przedstaw właścicielowi jeden pogrupowany zestaw pytań, których
   nie da się rozstrzygnąć z dostępnych materiałów.
8. Po odpowiedzi zaktualizuj statusy. Jeżeli odpowiedzi nie ma, zakończ
   użytecznym wynikiem `BLOCKED`, a nie pustym raportem.

## Pytania do właściciela

1. Czy pozostajemy przy `bartmannn.github.io/finapso-legal/`, czy planujemy
   własną domenę przed produkcyjnym uruchomieniem reklam?
2. Jeżeli planujemy własną domenę: kto będzie jej właścicielem i odpowiada za
   odnowienie?
3. Jaka nazwa wydawcy pojawi się w aplikacji, Play Console i dokumentach?
4. Jakie aliasy e-mail będą publiczne?
5. Czy MVP ma być wyłącznie po polsku?
6. Czy dokumentacja MVP obejmie wszystkie przewidziane artykuły?
7. Czy są gotowe zrzuty aplikacji wykonane wyłącznie na danych demo?

## Artefakty

- `docs/decisions/SITE_DECISIONS.md` — niesekretny rejestr decyzji i statusów.
- `docs/content/CONTENT_SOURCE_MAP.md` — macierz
  `strona → właściciel treści → źródło prawdy → częstotliwość przeglądu`.
- `docs/content/CLAIMS_CONTRACT.md` — lista zatwierdzonych nazw, sformułowań,
  dowodów i zakazanych skrótów myślowych.
- Sekcja blokerów w `SITE_DECISIONS.md`.

Dane adresowe, podatkowe, identyfikatory kont i prywatne dokumenty pozostają
poza Git. Repozytorium przechowuje wyłącznie publiczne dane albo anonimowe
statusy decyzji.

## Kryteria odbioru

- Każda wymagana decyzja ma właściciela i status.
- Zapisano bieżący adres GitHub Pages i decyzję o ewentualnej własnej domenie.
- Nazwa wydawcy i kontakty są gotowe do późniejszego przeglądu prawnego.
- Każda strona MVP ma wskazane źródło treści.
- Nie zapisano sekretów ani niezweryfikowanych danych osobowych.
- Zakres nie koliduje ze ścieżką prywatności 65–72 w repozytorium aplikacji.

## Weryfikacja

- przegląd kompletności decyzji przez właściciela;
- sprawdzenie, że pliki śledzone przez Git nie zawierają sekretów;
- `git diff --check`.

## Commit

Po pełnym odbiorze wykonaj procedurę z `AGENTS.md`. Stage obejmuje wyłącznie
rejestry decyzji, mapy treści, aktualizację statusu ZAD1 i odpowiadający wiersz w
`PLAN.md`.

Sugerowany komunikat:

```text
docs(site): record website decisions and content contract
```

## Kiedy zapytać użytkownika

Zapytaj wyłącznie o decyzje właścicielskie, których nie ma w kodzie lub
dokumentacji: przyszłą domenę, publiczną nazwę wydawcy, aliasy kontaktowe, języki,
własność kont i zakres MVP. Jeżeli odpowiedź mogłaby mieć skutek prawny albo
podatkowy, zapisz potrzebę konsultacji zamiast proponować decyzję.

## Wynik realizacji

Data: 2026-08-22

Status: `COMPLETED`

Utworzono:

- `docs/decisions/SITE_DECISIONS.md`;
- `docs/content/CONTENT_SOURCE_MAP.md`;
- `docs/content/CLAIMS_CONTRACT.md`.

Zmieniono ten plik oraz odpowiadający wiersz w `PLAN.md`. Do obowiązkowego
kontekstu dodano oba dokumenty `.txt`, ponieważ właściciel wskazał je jako
materiały przeznaczone do późniejszego umieszczenia na stronie.

Potwierdzono między innymi techniczny adres GitHub Pages, bazę
`/finapso-legal/`, nazwę produktu, polski język MVP, wielostronicową
architekturę, stabilną trasę `/privacy/` oraz brak trackerów na stronie.

Właściciel potwierdził 2026-08-22:

- pozostanie przy projektowej witrynie GitHub Pages;
- osobistą własność konta `Bartmannn` i publiczną nazwę wydawcy
  `Bartosz Bohdziewicz`;
- wspólny kontakt wsparcia i prywatności `finapso.support@gmail.com`;
- pominięcie `security.txt`, zrzutów i rozbudowanej dokumentacji w minimalnym
  MVP;
- pierwsze wydanie bez reklam oraz odroczenie monetyzacji i `app-ads.txt` do
  osobnej decyzji organizacyjno-prawnej;
- tekstowy zakres MVP skupiony na stronie głównej, polityce, regulaminie,
  wsparciu i trasach technicznych.

Brakujące decyzje: brak w zakresie ZAD1. Audyty techniczne 65–68 i przegląd
prawny materiałów `.txt` pozostają bramką ZAD7, a nie blokerem tego zadania.

Kontrole wykonane:

- stan zadań aplikacji 65–72: wszystkie `PLANNED`;
- materiały `.txt`: zidentyfikowano nazwę/kontakt, datę 19.08.2026, stare URL-e
  `finapso.com` oraz twierdzenia wymagające audytu względem aplikacji;
- kontrola typowych wzorców sekretów w nowych artefaktach: brak trafień;
- `git diff --check` oraz kontrola whitespace nowych plików przez
  `git diff --no-index --check`: bez błędów po korekcie końcowych pustych linii.

Po potwierdzeniu decyzji powtórzono `git diff --check`, kontrolę whitespace
wszystkich pięciu plików ZAD1 oraz skan typowych wzorców sekretów: bez błędów i
bez trafień. Kontrola stagingu zostanie wykonana bezpośrednio przed lokalnym
commitem ukończeniowym. `Push` nie jest wykonywany.

## Prompt uruchomieniowy

```text
Zrealizuj ZAD1 opisane w
docs/tasks/ZAD1-decisions-and-content-contract.md. Pracuj jako pojedynczy
GPT-5.6 Terra z reasoning high. Najpierw przeczytaj AGENTS.md, PLAN.md i kontekst
wskazany w zadaniu. Ustal z repozytoriów wszystkie dostępne fakty, utwórz trzy
opisane artefakty i dopiero potem zadaj jeden pogrupowany zestaw niezbędnych
pytań właścicielskich. Nie proś o prywatne dane ani dokumenty i niczego nie
zmyślaj. Jeśli obowiązkowe decyzje pozostaną otwarte, ustaw status BLOCKED z
konkretną listą braków zamiast oznaczać zadanie jako ukończone.
```
