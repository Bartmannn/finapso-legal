## Zakres polityki i kontakt

Ta polityka dotyczy aplikacji Android Finapso (`app.finapso.android`) oraz
zgłoszeń wysyłanych do jej wsparcia. Wydawcą i administratorem danych
otrzymywanych w związku ze zgłoszeniami jest Bartosz Bohdziewicz. W sprawach
prywatności i pomocy można napisać na
[finapso.support@gmail.com](mailto:finapso.support@gmail.com).

Finapso jest narzędziem do osobistej ewidencji finansów. Nie tworzy kont
użytkowników, nie łączy się z rachunkiem bankowym i w pierwszym wydaniu nie
oferuje reklam, zakupów ani subskrypcji. Pierwsze wydanie jest przeznaczone
dla osób pełnoletnich w Polsce.

## Dane zapisane na urządzeniu

W zależności od używanych funkcji aplikacja zapisuje lokalnie budżety, salda,
kwoty i daty transakcji, kategorie, notatki, reguły cykliczne, cele, analizy,
ustawienia oraz zdjęcia i dokumenty paragonów. Zapisuje również wynik
rozpoznawania tekstu paragonu (OCR) i poprawki użytkownika. Dane te służą
działaniu funkcji wybranych przez użytkownika. Nie są automatycznie wysyłane
wydawcy Finapso.

Blokada PIN chroni dostęp do interfejsu aplikacji. Finapso przechowuje sól i
skrót PIN-u, a nie sam jawny PIN. PIN nie szyfruje bazy ani pliku eksportu.
Niektóre robocze formularze mogą zostać odtworzone po ponownym otwarciu
ekranu; jawny PIN nie jest zapisywany w stanie odtwarzania ekranu.

## Paragony, aparat i Google ML Kit

Użytkownik może zrobić zdjęcie paragonu lub wybrać obraz albo PDF z urządzenia.
Rozpoznawanie tekstu odbywa się lokalnie za pomocą dołączonego modelu Google
ML Kit Text Recognition. Zgodnie z [informacją Google o danych ML Kit](https://developers.google.com/ml-kit/android-data-disclosure)
SDK może przesyłać przez HTTPS informacje techniczne: dane urządzenia i
aplikacji, identyfikator instalacji, parametry i czas działania funkcji,
rozmiar wejścia i wyniku oraz kody błędów. Google podaje, że obraz i
rozpoznany tekst nie są wysyłane do Google przez tę funkcję.

Wynik OCR może wymagać poprawy. Usunięcie samego pliku obrazu nie musi usuwać
powiązanych danych OCR, pozycji i metadanych z lokalnej bazy. Aby usunąć cały
stan kontrolowany przez Finapso, należy użyć pełnego czyszczenia danych.

## Kopie, eksport i import

Finapso jest skonfigurowane tak, aby wyłączyć nowe systemowe kopie Android
Cloud Backup i transfer urządzenie–urządzenie. Wcześniejsze kopie systemowe,
jeżeli powstały przed tą zmianą, pozostają pod kontrolą systemu i dostawcy.
Przeniesienie danych na inne urządzenie wymaga ręcznego eksportu i importu.

Plik `.finapso` tworzony na polecenie użytkownika może zawierać dane finansowe,
ustawienia, sól i skrót PIN-u, obrazy, dokumenty oraz OCR. Aplikacja sprawdza
integralność pliku, ale **nie szyfruje jego zawartości**. Miejsce zapisu
wybiera użytkownik; Finapso nie otrzymuje pliku. Trzeba przechowywać go w
bezpiecznym miejscu i samodzielnie usunąć, gdy nie jest potrzebny. Pełne
czyszczenie aplikacji nie usuwa ręcznych kopii zapisanych poza nią.

## Opcjonalny asystent powiadomień

Asystent jest domyślnie wyłączony. Jeśli użytkownik go włączy, po wyjaśnieniu
działania musi dodatkowo nadać systemowy dostęp do powiadomień. Uprawnienie to
technicznie obejmuje powiadomienia wszystkich aplikacji, także wiadomości i
inne treści niezwiązane z finansami. Finapso analizuje ograniczone pola
tekstowe lokalnie, szukając jednej kwoty w PLN i proponując transakcję; nie
zapisuje całej surowej treści powiadomienia ani nie wysyła jej wydawcy.

W osobnej lokalnej bazie mogą pozostać: pakiet i kanał aplikacji źródłowej,
czas, wykryta kwota, kandydat transakcji oraz reguły źródła i skróty HMAC.
Kandydat wygasa najpóźniej po 24 godzinach lub jest usuwany po działaniu
użytkownika albo wyłączeniu asystenta. Reguły nie mają automatycznego terminu
usunięcia; można je usunąć w ustawieniach asystenta albo pełnym resetem.
Historia powiadomień systemu Android pozostaje poza kontrolą Finapso.

## Dobrowolny kontakt e-mail

W pierwszym wydaniu formularz zgłoszeń w aplikacji jest wyłączony. Użytkownik
może dobrowolnie napisać na
[finapso.support@gmail.com](mailto:finapso.support@gmail.com), korzystając ze
swojej aplikacji pocztowej. Finapso nie dołącza automatycznie budżetu,
transakcji, paragonów ani danych OCR. Treść wiadomości i dobrowolne załączniki
wybiera sam użytkownik. Nie należy wysyłać informacji zbędnych do obsługi
sprawy, w szczególności pełnej kopii finansów lub PIN-u.

Wydawca otrzymuje adres nadawcy, treść wiadomości i ewentualne załączniki w
skrzynce Gmail. O usunięcie wiadomości można poprosić pod tym samym adresem,
podając orientacyjną datę i temat. Nie trzeba ponownie przesyłać materiałów,
które mają zostać usunięte.

## Cel, odbiorcy i podstawa przetwarzania zgłoszeń

Dane przekazane do wsparcia służą obsłudze pytania, zgłoszenia błędu lub
reklamacji oraz bezpieczeństwu aplikacji. Podstawą obsługi zwykłych zgłoszeń
jest prawnie uzasadniony interes wydawcy (art. 6 ust. 1 lit. f RODO). Jeżeli
wiadomość dotyczy wykonania umowy albo obowiązku prawnego, odpowiednią
podstawą może być art. 6 ust. 1 lit. b albo c RODO.

Korespondencja jest przechowywana w usłudze Gmail, a Google przetwarza też
opisane wyżej dane techniczne ML Kit. Stronę udostępnia GitHub Pages; według
[dokumentacji GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
GitHub zapisuje adres IP odwiedzającego dla celów bezpieczeństwa. Więcej o
zasadach Google i GitHub, w tym o możliwym przetwarzaniu poza Europejskim
Obszarem Gospodarczym, opisują ich
[polityka prywatności](https://policies.google.com/privacy),
[zasady transferów](https://policies.google.com/privacy/frameworks) i
[oświadczenie prywatności GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Przechowywanie i usuwanie

Dane lokalne pozostają w aplikacji do chwili ich zmiany, usunięcia albo pełnego
resetu. Część pojedynczych akcji archiwizuje lub ukrywa wpis zamiast usuwać
wszystkie powiązane dane. Pełny reset usuwa magazyny kontrolowane przez
Finapso, ale nie usuwa eksportów u dostawcy plików, systemowej historii
powiadomień, wcześniejszych kopii Androida ani wiadomości w Gmailu.

Wydawca raz w miesiącu przegląda korespondencję w Gmailu i ręcznie usuwa
zgłoszenia przy pierwszym przeglądzie po upływie 180 dni od otrzymania.
Jeżeli sprawa nadal trwa po tym okresie, wiadomość jest usuwana przy
najbliższym comiesięcznym przeglądzie po jej zakończeniu. Konkretny obowiązek
prawny albo potrzeba dochodzenia lub obrony roszczenia może uzasadniać dłuższe
zachowanie niezbędnych danych. Nie działa automatyczne usuwanie po 90/180 dniach.
Wydawca może odszukać wiadomość na żądanie w zakresie, w jakim pozwalają na
to dostępne informacje; może poprosić o dane potrzebne do jej identyfikacji.

## Prawa i bezpieczeństwo

W odniesieniu do danych otrzymanych przez wydawcę użytkownik może, zależnie od
okoliczności, żądać dostępu, sprostowania, usunięcia lub ograniczenia
przetwarzania, sprzeciwić się przetwarzaniu albo skorzystać z innych praw
przewidzianych przez RODO. Może też złożyć skargę do
[Prezesa Urzędu Ochrony Danych Osobowych](https://uodo.gov.pl/).
Kontakt: [finapso.support@gmail.com](mailto:finapso.support@gmail.com).
Wydawca nie ma zdalnego dostępu do danych przechowywanych tylko na urządzeniu
i nie może ich usunąć w imieniu użytkownika.

Finapso używa prywatnych katalogów aplikacji. Według Google połączenia
telemetrii ML Kit są szyfrowane za pomocą HTTPS; poczta jest wysyłana przez
klienta wybranego przez użytkownika, a nie przez formularz Finapso.
Nie gwarantuje jednak całkowitego bezpieczeństwa ani fizycznego wymazania
pamięci urządzenia. Użytkownik powinien chronić urządzenie i nieszyfrowany
plik eksportu. Strona Finapso nie dodaje analityki, reklam ani plików cookie
marketingowych.

## Zmiany polityki

Bieżąca rewizja jest dostępna pod stałym adresem
`https://bartmannn.github.io/finapso-legal/privacy/` oraz z aplikacji.
Zmiany dotyczące sposobu przetwarzania danych będą wymagały aktualizacji
polityki i informacji w Google Play.
