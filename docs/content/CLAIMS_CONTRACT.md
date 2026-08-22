# Kontrakt twierdzeń o Finapso

Data weryfikacji: 2026-08-22

## Cel

Każde twierdzenie publiczne musi mieć dowód w aktualnym wydaniu. Poniższe
sformułowania są granicami redakcyjnymi, a nie zgodą na publikowanie funkcji,
które są jeszcze zaplanowane albo zablokowane.

| Temat | Dozwolone sformułowanie | Wymagany dowód | Zakazane uproszczenie | Właściciel aktualizacji |
| --- | --- | --- | --- | --- |
| Nazwa | „Finapso” | nazwa aplikacji i listing Play | inna nazwa produktu lub wydawcy bez decyzji | właściciel produktu |
| Przeznaczenie | „Aplikacja Android do zarządzania finansami osobistymi” | `../Finapso/README.md` i produkcyjny listing | „bank”, „doradca finansowy”, „system księgowy” | właściciel produktu |
| Rdzeń lokalny | „Rdzeń finansowy działa lokalnie, a dane finansowe są domyślnie przechowywane na urządzeniu” | audyt ZAD65, kod/Room, produkcyjny AAB | „żadne dane nigdy nie opuszczają urządzenia”, „100% offline” | właściciel prywatności |
| Konta | „Finapso nie tworzy kont użytkowników” | audyt ZAD65 i aktualny przepływ aplikacji | „korzystanie nie wymaga żadnego konta” — instalacja, zakup lub opinia mogą wymagać konta Google | właściciel produktu/prywatności |
| Banki | „Brak integracji bankowej i backendu finansowego w MVP” | kod sieciowy i ZAD65 | „Finapso jest połączone z bankiem” albo „automatycznie pobiera transakcje” | właściciel produktu |
| Działanie offline | „Podstawowe funkcje finansowe działają bez stałego połączenia z internetem” | testy bieżącego wydania | „cała aplikacja zawsze działa bez internetu” | właściciel wydania |
| Zgłoszenia | „Użytkownik może świadomie wysłać zgłoszenie i wybrane dane diagnostyczne” | faktyczny formularz/przekaźnik, ZAD65 i ZAD67 | „administrator nigdy nie otrzymuje żadnych danych” | właściciel wsparcia/prywatności |
| Paragony i OCR | „Finapso może lokalnie odczytać paragon, a wynik można sprawdzić i poprawić” | `../Finapso/RECEIPT.md`, build i testy obsługiwanych formatów | „bezbłędne OCR”, „rozpoznaje każdy paragon”, „gwarantowana poprawność” | właściciel paragonów |
| Analizy | „Analizy i prognozy mają charakter informacyjny i orientacyjny” | logika aplikacji i regulamin po akceptacji | „gwarantuje oszczędności”, „zapewnia bezpieczeństwo finansowe”, „indywidualna porada” | właściciel produktu/prawnik |
| Porównania | „Wybrane porównania korzystają z opisanych danych referencyjnych” | źródło, metodologia, data i kod obliczeń | „wynik obiektywnie ocenia sytuację użytkownika” | właściciel analiz |
| Kopie | „Użytkownik może wyeksportować i później zaimportować wersjonowaną kopię danych” | test bieżącego formatu kopii i ZAD67 | „kopia jest automatycznie szyfrowana” albo „chmura bezpiecznie przechowuje dane”, jeśli nie ma takiej funkcji | właściciel danych |
| PIN | „Opcjonalny PIN ogranicza dostęp do aplikacji na urządzeniu” | kod i test UI | „PIN szyfruje bazę”, „ochrona nie do złamania” | właściciel bezpieczeństwa aplikacji |
| Bezpieczeństwo | „Stosujemy środki adekwatne do zweryfikowanego zakresu” tylko po ich udokumentowaniu | ZAD65–ZAD72 i przegląd prawny | „w pełni bezpieczne”, „niemożliwe do zhakowania”, „gwarancja ochrony” | właściciel bezpieczeństwa/prawnik |
| Reklamy | „Pierwsze wydanie Finapso nie wyświetla reklam” po potwierdzeniu produkcyjnego AAB | lista zależności, konfiguracja wariantu release, ruch sieciowy i ZAD65 | opisy AdMob, personalizacji albo reklam jako dostępnej funkcji w pierwszym wydaniu | właściciel wydania/prywatności |
| Przyszłe reklamy | Nie komunikować do czasu osobnego wznowienia zakresu. Po wznowieniu opis musi odpowiadać konfiguracji AdMob/UMP i decyzjom prawnym. | przyszłe zamknięcie odpowiednich zadań reklamowych i produkcyjny AAB | „anonimowe reklamy”, „reklamy niczego nie przetwarzają”, „brak transmisji danych” | właściciel reklam/prywatności |
| Analityka | „Finapso nie używa zewnętrznej analityki produktu” wyłącznie po audycie zależności i ruchu sieciowego wydania bez reklam | lista zależności, ruch sieciowy, ZAD65 | „nikt nie zbiera żadnych danych” | właściciel prywatności |
| Premium | Informować o Premium dopiero, gdy zakres, cena i zakup są dostępne w publikowanym wydaniu | produkcyjny Play Billing, listing i regulamin | „Premium jest dostępne” na podstawie samego projektu regulaminu | właściciel produktu/wydania |
| Asystent powiadomień | Opisywać dopiero po zakończeniu zadań 64, 65–69 i 76 oraz odbiorze urządzeniowym | status planów, build i prominent disclosure | „automatycznie kontroluje wszystkie wydatki”, „działa bez uprawnień” | właściciel funkcji/prywatności |
| Dostępność | „Projektujemy zgodnie z WCAG 2.2 AA” do czasu zakończenia testów; „spełnia” dopiero po udokumentowanym audycie | testy ZAD6 | bezwarunkowa deklaracja pełnej zgodności przed audytem | właściciel strony |

## Nazwy i kontakty

- Nazwa produktu zatwierdzona do użycia: `Finapso`.
- Publiczna nazwa wydawcy: `Bartosz Bohdziewicz`, potwierdzona przez
  właściciela; zapis trzeba porównać literalnie z Play Console przed publikacją.
- Publiczny kontakt wsparcia i prywatności: `finapso.support@gmail.com`.
- Nie publikujemy prywatnego adresu, numeru telefonu, danych podatkowych,
  identyfikatora konta ani Publisher ID w ramach ZAD1.

## Bramki redakcyjne

1. Czasowniki „jest”, „działa”, „obsługuje” oznaczają funkcję dostępną w
   produkcyjnym wydaniu, a nie pozycję planu.
2. „Może” w dokumencie prawnym nie zastępuje zgodności z rzeczywistą
   konfiguracją SDK i deklaracją Data safety.
3. Dane demonstracyjne muszą być jednoznacznie fikcyjne i nie mogą pochodzić z
   prawdziwych sald, paragonów lub powiadomień.
4. Każda zmiana SDK, formularza wsparcia, reklam, backupu, kont, płatności lub
   hostingu uruchamia przegląd odpowiednich twierdzeń i dokumentów prawnych.
5. W razie braku dowodu usuwamy twierdzenie z publikacji; nie osłabiamy go
   nieprecyzyjnym hasłem marketingowym.
