# Rejestr decyzji strony Finapso

Stan ZAD1: `COMPLETED` — decyzje wymagane do minimalnego MVP zostały
potwierdzone przez właściciela.

Data weryfikacji: 2026-08-22

## Jak czytać rejestr

- `CONFIRMED` — decyzja wynika z polecenia właściciela albo zaakceptowanego
  planu i może być użyta w kolejnych ZAD.
- `PENDING_OWNER` — istnieje bezpieczna propozycja, ale potrzebne jest jawne
  potwierdzenie właściciela.
- `REVIEW_REQUIRED` — materiał istnieje, lecz przed publikacją wymaga audytu
  technicznego lub prawnego wskazanego w planie.
- `DEFERRED` — element świadomie pozostaje poza MVP.

Rejestr nie zawiera adresów prywatnych, danych podatkowych, identyfikatorów kont,
sekretów ani Publisher ID.

## Decyzje

| ID | Decyzja | Właściciel | Status | Źródło | Następny przegląd |
| --- | --- | --- | --- | --- | --- |
| HOST-01 | Technicznym adresem kanonicznym MVP jest `https://bartmannn.github.io/finapso-legal/`; wszystkie zasoby respektują bazę `/finapso-legal/`. | właściciel produktu | `CONFIRMED` | polecenie właściciela, `PLAN.md`, Git remote `Bartmannn/finapso-legal` | przed ZAD8 lub zmianą hostingu |
| HOST-02 | Pozostajemy przy projektowej witrynie GitHub Pages. Własna domena nie należy do bieżącego MVP. | właściciel produktu | `CONFIRMED` | odpowiedź właściciela 2026-08-22 | przy przyszłej zmianie hostingu |
| HOST-03 | Namespace `Bartmannn` jest kontem osobistym właściciela. | właściciel repozytorium | `CONFIRMED` | odpowiedź właściciela 2026-08-22, `git remote -v` | przy zmianie właściciela repozytorium |
| HOST-04 | Pierwsza wersja aplikacji nie zawiera reklam. Domena dla reklam i `app-ads.txt` są odroczone do osobnej decyzji o monetyzacji. | właściciel produktu | `DEFERRED` | odpowiedź właściciela 2026-08-22 | przed rozpoczęciem prac nad reklamami |
| ID-01 | Publiczna nazwa produktu brzmi `Finapso`. | właściciel produktu | `CONFIRMED` | polecenia właściciela, oba README, oba dokumenty `.txt` | przy rebrandingu |
| ID-02 | Publiczną nazwą wydawcy i administratora jest `Bartosz Bohdziewicz`; właściciel potwierdził publiczność danych i własność kont produktowych. Spójność literalnego zapisu z listingiem sprawdza ponownie ZAD66/ZAD7. | właściciel wydawcy | `CONFIRMED` | odpowiedź właściciela 2026-08-22, oba dokumenty `.txt` | ZAD66 i przed ZAD7 |
| CONTACT-01 | Publiczny kontakt wsparcia to `finapso.support@gmail.com`. | właściciel wsparcia | `CONFIRMED` | odpowiedź właściciela 2026-08-22, oba dokumenty `.txt` | co 6 miesięcy i przed wydaniem |
| CONTACT-02 | Publiczny kontakt prywatności to również `finapso.support@gmail.com`; skuteczność procesu obsługi żądań sprawdzi ZAD66–ZAD68. | właściciel prywatności | `CONFIRMED` | odpowiedź właściciela 2026-08-22, polityka v1.0 | ZAD66–ZAD68 |
| CONTACT-03 | `security.txt` jest pominięty w MVP. Nie publikujemy fikcyjnego ani nieobsługiwanego kontaktu bezpieczeństwa. | właściciel bezpieczeństwa | `DEFERRED` | odpowiedź właściciela 2026-08-22 | przed przyszłym dodaniem `security.txt` |
| LANG-01 | MVP jest po polsku. | właściciel produktu | `CONFIRMED` | `PLAN.md`, polskie materiały źródłowe | przed dodaniem drugiego języka |
| LANG-02 | Przyszłe tłumaczenia otrzymają osobne ścieżki, np. `/en/`; bez geoblokady i automatycznych przekierowań. | właściciel produktu | `CONFIRMED` | `PLAN.md` | przy planowaniu tłumaczenia |
| DOCS-01 | Serwis pozostaje wielostronicowy. Minimalne MVP obejmuje `/`, `/privacy/`, `/terms/`, `/support/` oraz techniczne trasy publikacyjne. | właściciel produktu | `CONFIRMED` | odpowiedź właściciela 2026-08-22, `PLAN.md` | przed ZAD4/ZAD5 |
| DOCS-02 | Rozbudowane `/features/` i `/docs/*` nie blokują pierwszego testowego wydania w Google Play. Powstaną później jako osobny etap dokumentacyjny. | właściciel produktu | `DEFERRED` | odpowiedź właściciela 2026-08-22 | po uruchomieniu minimalnego centrum prawnego |
| MEDIA-01 | MVP jest tekstowe i nie wymaga zrzutów. Przyszłe zrzuty mogą używać wyłącznie danych demonstracyjnych, bez prawdziwych sald, paragonów, powiadomień ani danych kont. | właściciel produktu | `DEFERRED` | odpowiedź właściciela 2026-08-22, `AGENTS.md` | przed dodaniem pierwszego zrzutu |
| PRIV-01 | Stabilnym adresem bieżącej polityki będzie `https://bartmannn.github.io/finapso-legal/privacy/`. | właściciel produktu | `CONFIRMED` | polecenie właściciela, `PLAN.md`, `README.md` | przed ZAD7/ZAD8 |
| PRIV-02 | Strona nie używa analityki, trackerów, reklam, zewnętrznych fontów, formularzy sieciowych ani cookies bez osobno zatwierdzonego zakresu. | właściciel produktu | `CONFIRMED` | `AGENTS.md`, `PLAN.md` | przy każdej nowej integracji |
| LEGAL-01 | `Finapso_polityka_prywatności_v.1.0.txt` i `Finapso_regulamin_v.1.0.txt` są materiałami wejściowymi do wersji 1.0, a nie zatwierdzoną treścią produkcyjną. | właściciel dokumentów i prawnik | `REVIEW_REQUIRED` | polecenie właściciela, `AGENTS.md`, `PLAN.md` | ZAD65–ZAD68 i ZAD7 |
| LEGAL-02 | Deklarowana data obowiązywania obu materiałów to 19.08.2026. Data, status działalności nierejestrowanej i kompletność obowiązków prawnych wymagają potwierdzenia właściciela/prawnika; model nie rozstrzyga ich samodzielnie. | właściciel dokumentów i prawnik | `REVIEW_REQUIRED` | oba dokumenty `.txt` | przed ZAD7 |
| LEGAL-03 | Stare adresy `https://finapso.com/regulations` i `https://finapso.com/privacy-policy` nie są adresami bieżącego hostingu. Przed publikacją należy zastąpić je odpowiednio trasami `/terms/` i `/privacy/` pod adresem GitHub Pages albo zatwierdzoną domeną własną. | właściciel treści | `REVIEW_REQUIRED` | oba dokumenty `.txt`, `PLAN.md` | ZAD7 |
| LEGAL-04 | Regulamin wspomina kontakt telefoniczny i korespondencyjny, ale publikuje tylko e-mail. Nie prosimy o prywatne dane; przed ZAD7 prawnik/właściciel ma usunąć niespójne kanały albo świadomie wskazać publiczne dane poza repozytorium. | właściciel dokumentów i prawnik | `REVIEW_REQUIRED` | regulamin v1.0 | ZAD7 |
| RELEASE-01 | Pierwsza wersja nie zawiera reklam. Twierdzenia o Premium, asystencie powiadomień i innych funkcjach zależnych od wydania wolno publikować dopiero po potwierdzeniu ich obecności w produkcyjnym AAB. | właściciel wydania | `CONFIRMED` | odpowiedź właściciela 2026-08-22, `../Finapso/README.md`, statusy 31 i 64–72 | przed każdym wydaniem strony |
| BUSINESS-01 | Monetyzacja, reklamy i powiązana infrastruktura są odroczone do osobnej decyzji organizacyjno-prawnej. Repozytorium nie przechowuje prywatnych danych ani szczegółów tego procesu. | właściciel produktu | `DEFERRED` | odpowiedź właściciela 2026-08-22 | przed rozpoczęciem monetyzacji |

## Blokery ukończenia ZAD1

Brak. Właściciel potwierdził wszystkie decyzje wymagane do minimalnego MVP
2026-08-22. Elementy oznaczone `REVIEW_REQUIRED` są bramkami późniejszej
publikacji dokumentów, a nie brakującymi decyzjami ZAD1.

Otwarte audyty zadań 65–68 i konsultacja prawna nie blokują budowy szablonu w
ZAD2–ZAD6. Blokują natomiast uznanie dokumentów `.txt` za produkcyjne i użycie
adresu `/privacy/` w Play Console.
