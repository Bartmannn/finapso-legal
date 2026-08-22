## Status w wersji opisanej na stronie

Asystent powiadomień nie jest obecnie funkcją gotową do publicznego wydania.
Kod mechanizmu istnieje, ale odbiór pozostaje zablokowany do czasu ukończenia
audytów prywatności, publikacji zgodnej polityki, sprawdzenia deklaracji Google
Play i ręcznych testów urządzeniowych. Ta strona nie jest instrukcją aktywacji.

## Planowany cel funkcji

Po świadomym włączeniu asystent ma lokalnie sprawdzać standardowe pola tekstowe
powiadomień udostępnionych przez Androida. Gdy znajdzie dokładnie jedną dodatnią
kwotę PLN, ma pokazać cichy alert Finapso. Nie tworzy transakcji automatycznie —
użytkownik musi otworzyć i zatwierdzić zwykły formularz.

Asystent nie łączy się z bankiem, nie pobiera historii rachunku, nie rozpoznaje
sprzedawcy ani kategorii i nie obsługuje walut innych niż PLN w pierwszym
zakresie.

## Dlaczego dostęp wymaga szczególnej uwagi

Android przyznaje usłudze szeroki dostęp do standardowych tekstów powiadomień
udostępnionych listenerowi, nie tylko do komunikatów finansowych. Mogą to być
również wiadomości, kody, dane zdrowotne i inne treści. Dlatego przed otwarciem
ustawień systemowych wymagane jest osobne wyjaśnienie oraz świadoma zgoda.

Projekt zakłada analizę lokalną, brak zapisu pełnego tytułu i tekstu oraz
przechowywanie ograniczonych danych pochodnych. Szczegółowy alert z kwotą i
nazwą aplikacji może jednak pozostać w historii powiadomień Androida.

## Ograniczenia przygotowanego mechanizmu

- funkcja ma być domyślnie wyłączona i opcjonalna;
- kilka różnych kwot, brak waluty albo niejednoznaczna treść nie tworzą kandydata;
- funkcja może się pomylić i nie odczyta każdego alertu;
- użytkownik zawsze zatwierdza zapis w formularzu;
- odmowa lub błąd nie mogą ograniczać pozostałych funkcji Finapso;
- dostęp systemowy można cofnąć, a lokalne reguły usunąć w aplikacji.

## Co musi wydarzyć się przed publikacją

Wymagane są między innymi: zakończenie zadań aplikacji 64, 65–69 i 76,
publiczna polityka zgodna z rzeczywistym przepływem danych, ponowna deklaracja
Data safety oraz ręczny odbiór alertów, ekranu blokady, zgód i cofnięcia dostępu.

Do tego czasu nie należy zakładać dostępności asystenta w wydaniu ani opisywać go
na stronie Google Play jako gotowej funkcji.

## Następny krok

Korzystaj z [ręcznego dodawania transakcji](../getting-started/). Informacje o
bieżących funkcjach znajdziesz na stronie [Funkcje](../../features/), a stan
dokumentu prawnego pod adresem [polityki prywatności](../../privacy/).
