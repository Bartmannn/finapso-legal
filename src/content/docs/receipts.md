## Co można zaimportować

Finapso przyjmuje zdjęcie, wiele obrazów jednego papierowego paragonu lub plik
PDF. Dokument można także przekazać przez systemowe **Udostępnij**. Osobny
samouczek pomaga przygotować jeden pełny albo przewijany zrzut cyfrowego
paragonu.

Ręczne wprowadzanie transakcji jest podstawową, stabilną metodą. Skanowanie,
import, OCR i parser są oznaczone jako funkcje w trakcie rozwoju, ponieważ
wynik może być niepełny lub błędny.

## Zaimportuj dokument

1. Użyj akcji **Dodaj**.
2. Dla papierowego dokumentu wybierz aparat albo **Importuj plik paragonu**.
3. Dla cyfrowego dokumentu otwórz **Jak przygotować zrzut e-paragonu?** i
   przeczytaj instrukcję przed wyborem jednego obrazu.
4. Poczekaj na lokalne etapy wczytywania, OCR i analizy produktów.

Pliki są kopiowane do prywatnej przestrzeni aplikacji. OCR działa lokalnie z
modelem ML Kit dołączonym do aplikacji, bez generatywnego AI.

## Sprawdź wynik

Kompletny wynik otwiera formularz korekty. Wynik częściowy pozostawia brakujące
pole puste i pokazuje ostrzeżenie. Wynik nieużyteczny nie tworzy szkicu
finansowego — pozwala zobaczyć obraz, ponowić próbę albo wrócić.

Przed zapisaniem sprawdź co najmniej:

- sklep, datę i końcową kwotę;
- każdą pozycję, rabat i korektę;
- kategorie produktów;
- zgodność sumy pozycji i korekt z kwotą całego paragonu.

Zapis pozostaje zablokowany, jeśli kontrolna suma nie jest zgodna. Rozpoznane
kategorie są jedynie lokalną sugestią; użytkownik może je zmienić.

## Ograniczenia OCR i parsera

Jakość zależy od ostrości, kontrastu, kompletności obrazu i układu sklepu.
Finapso nie rozpoznaje każdego paragonu i nie gwarantuje poprawności OCR.
Obsługiwane profile nadal są strojone na nowych układach.

Dla cyfrowych paragonów samouczek potwierdza obecnie tylko format Biedronki.
Profile parsera obejmują także papierową Biedronkę i Lidl, lecz zmieniony układ
dokumentu może dać wynik częściowy albo nieużyteczny. Kilka zrzutów jednego
cyfrowego paragonu nie jest automatycznie sklejanych.

## Podgląd, eksport i zgłoszenie problemu

Zwykły podgląd pokazuje obrazy stron, nie surowy tekst OCR. Diagnostyczny eksport
OCR jest osobną, świadomą akcją w Ustawieniach i może zawierać tekst oraz obrazy
stron. Nie zawiera prywatnych ścieżek plików ani źródłowych URI.

W formularzu kontaktowym można zgłosić błąd bez paragonu. Dołączenie danych
testowych dokumentu wymaga wybrania go, podglądu stron, osobnego potwierdzenia i
jawnego naciśnięcia **Wyślij zgłoszenie**. Nie dołączaj dokumentu, jeżeli nie
jest potrzebny do rozwiązania problemu.

## Następny krok

Po zapisaniu dokumentu wykonaj [pełną kopię danych](../data-and-backups/).
Wróć do [indeksu dokumentacji](../), aby wybrać inną instrukcję.
