# Mapa źródeł treści Finapso

Data weryfikacji: 2026-08-22

## Zasada źródła prawdy

Strona nie staje się źródłem prawdy o działaniu aplikacji. Opis funkcji musi być
odtworzony z repozytorium aplikacji i sprawdzony względem wersji faktycznie
dystrybuowanej. Dokumenty prawne powstają z materiałów właściciela dopiero po
audytach 65–68 i akceptacji w ZAD7.

Status `GATED` oznacza, że strukturę strony wolno zbudować wcześniej, ale
produkcji nie wolno wypełnić niezweryfikowanym twierdzeniem lub dokumentem.

## Minimalne MVP

Pierwsze wydanie strony koncentruje się na przejściu do kolejnego etapu testów
w Google Play: `/`, `/privacy/`, `/terms/`, `/support/`, `/robots.txt`,
`/sitemap.xml` i `/404.html`. Rozbudowana prezentacja oraz dokumentacja pozostają
w mapie, ale nie blokują tego wydania.

## Mapa tras

| Trasa | Właściciel treści | Źródło prawdy | Status wejścia | Przegląd |
| --- | --- | --- | --- | --- |
| `/` | właściciel produktu | `../Finapso/README.md`, aktualny produkcyjny zakres aplikacji, `docs/content/CLAIMS_CONTRACT.md` | `READY_WITH_GATES` | przy każdym wydaniu aplikacji |
| `/features/` | właściciel produktu | `../Finapso/README.md` oraz właściwe dokumenty `FINANCE.md`, `RECEIPT.md`, `UI.md` czytane tylko dla funkcji prezentowanych na stronie | `DEFERRED` — poza minimalnym MVP | przy zmianie funkcji lub wydaniu |
| `/docs/` | właściciel dokumentacji | indeks zatwierdzonych artykułów z `PLAN.md`; stan funkcji z `../Finapso/docs/plans/README.md` | `DEFERRED` — poza minimalnym MVP | przy wznowieniu etapu dokumentacji |
| `/docs/getting-started/` | właściciel produktu/UI | aktualna aplikacja, `../Finapso/UI.md`, teksty i nawigacja w kodzie UI | `DEFERRED` — poza minimalnym MVP | co zmiana onboardingu/nawigacji |
| `/docs/data-and-backups/` | właściciel danych | `../Finapso/README.md`, `../Finapso/FINANCE.md`, wynik ZAD65 i ZAD67 | `DEFERRED`; przed publikacją wymaga ZAD65/ZAD67 | przy zmianie formatu kopii, retencji lub czyszczenia |
| `/docs/receipts/` | właściciel paragonów | `../Finapso/README.md`, `../Finapso/RECEIPT.md`, bieżący kod importu/OCR i korekty | `DEFERRED` — poza minimalnym MVP | przy zmianie importu, OCR lub eksportu diagnostycznego |
| `/docs/notifications/` | właściciel asystenta powiadomień | plany aplikacji 59–64 i 76, aktualny kod oraz odbiór urządzeniowy | `DEFERRED`; przed publikacją wymaga zamknięcia 64/76 | po zamknięciu 64/76 i przy każdej zmianie uprawnień |
| `/privacy/` | właściciel prywatności i prawnik | `Finapso_polityka_prywatności_v.1.0.txt` jako materiał; wyniki ZAD65–ZAD68, produkcyjny AAB/SDK, Data safety i decyzje wydawcy jako dowód końcowy | `GATED` — materiał niezatwierdzony | przed każdym wydaniem i co 6 miesięcy |
| `/privacy/archive/` | właściciel prywatności | wyłącznie wcześniej opublikowane i zatwierdzone rewizje wraz z datami | `DEFERRED` — potrzebne od drugiej zatwierdzonej rewizji | przy każdej nowej rewizji |
| `/terms/` | właściciel dokumentów i prawnik | `Finapso_regulamin_v.1.0.txt` jako materiał; faktyczny model produktu, płatności i dystrybucji | `GATED` — materiał wymaga korekt i akceptacji | przed wydaniem i przy zmianie modelu usługi |
| `/support/` | właściciel wsparcia i prywatności | `finapso.support@gmail.com`, faktyczny przepływ zgłoszeń, wynik ZAD67 dotyczący retencji | `READY_WITH_GATES` — alias potwierdzony, retencję sprawdzi ZAD67 | co 6 miesięcy i przy zmianie dostawcy |
| `/licenses/` | właściciel techniczny | manifesty zależności, licencje bibliotek i zasobów użytych przez stronę/aplikację w zakresie prezentowanym publicznie | `DEFERRED` — sprawdzić z finalnymi zależnościami | przy aktualizacji zależności |
| `/.well-known/security.txt` | właściciel bezpieczeństwa | potwierdzony publiczny alias, zakres wsparcia i data wygaśnięcia pliku | `DEFERRED` — pominięty w MVP | przed pierwszą publikacją pliku |
| `/robots.txt` | właściciel techniczny | decyzje indeksowania wersji preview/production z ZAD5–ZAD6 | `PLANNED` | przy zmianie środowiska publikacji |
| `/sitemap.xml` | właściciel techniczny | kanoniczne trasy z bieżącego builda | `PLANNED` | automatycznie przy buildzie |
| `/404.html` | właściciel techniczny/UX | kanoniczna nawigacja i baza `/finapso-legal/` | `PLANNED` | przy zmianie nawigacji |
| root hosta: `/app-ads.txt` | właściciel AdMob i hostingu | przyszły prawdziwy wpis z konta AdMob i osobna decyzja hostingowa | `DEFERRED` — pierwsze wydanie nie zawiera reklam | przed przyszłą aktywacją reklam |

## Źródła przekrojowe i kolejność rozstrzygania konfliktów

1. Faktyczne zachowanie produkcyjnego AAB, jego manifest, zależności i
   konfiguracja SDK.
2. Wyniki technicznej ścieżki prywatności aplikacji 65–72.
3. Aktualne dokumenty tematyczne repozytorium aplikacji.
4. Zatwierdzone decyzje właściciela i prawnika.
5. Materiały `.txt` przekazane do przeglądu.
6. Treść marketingowa strony.

Jeżeli źródła są sprzeczne, nie wybieramy wygodniejszego opisu: oznaczamy treść
jako zablokowaną i aktualizujemy najpierw źródło wyższego rzędu albo dokument
prawny. Strona, Data safety, Play Console i aplikacja muszą opisywać ten sam
stan wydania.

## Materiały wizualne

Źródłem zrzutów może być wyłącznie zweryfikowany build aplikacji z lokalnie
wygenerowanymi danymi demonstracyjnymi. Przed dodaniem pliku należy sprawdzić
widoczne kwoty, nazwy, powiadomienia, metadane obrazu oraz brak prawdziwych
paragonów. Brak zrzutów nie blokuje tekstowego MVP; nie zastępujemy ich
fikcyjnymi makietami udającymi działającą funkcję.
