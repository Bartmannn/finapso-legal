# Regulamin Finapso MVP — decyzje i wydanie lokalne

Stan: `APPROVED` przez właściciela dla treści strony; lokalny pakiet produkcyjny,
bez `push` i bez zmian w Play Console.
Data weryfikacji: 2026-09-29.

## Źródło i zakres

- Kanoniczna treść strony: `src/content/legal/terms.md`, rewizja `1.0-MVP`,
  data obowiązywania `2026-09-29`, adres
  `https://bartmannn.github.io/finapso-legal/terms/` po wdrożeniu.
- Materiał porównawczy: lokalny `Finapso_regulamin_v.1.0.txt`. Nie jest
  zatwierdzoną rewizją i jest ignorowany przez Git. Zawiera prywatne dane
  kontaktowe oraz nieaktualne postanowienia o reklamach, Premium, formularzu
  i innej domenie; żadnej z tych informacji nie przeniesiono do strony.
- Fakty MVP: bez reklam, płatności, subskrypcji, konta i formularza zgłoszeń;
  pierwsze wydanie dla pełnoletnich osób w Polsce, kontakt e-mail. Przyjęto
  opis lokalnego zapisu, ręcznego eksportu, OCR i asystenta zgodny z
  `src/content/legal/privacy-mvp-review.md` i aplikacją `1.53.39`.
- Właściciel przeczytał i zatwierdził dokładną treść `DRAFT-MVP-1`; ta sama
  treść została oznaczona jako `1.0-MVP` bez zmian w tekście. `/terms/` jest
  dostępne w lokalnym pakiecie produkcyjnym bez `noindex` i jest połączone
  ze stroną główną oraz stopką.

## Decyzja o adresie i pozostałe ryzyko

Właściciel świadomie zatwierdził regulamin bez publicznego adresu
korespondencyjnego; adresu z pliku `.txt` nie wolno publikować. Nadal trzeba
ocenić, czy do sposobu udostępniania Finapso stosuje się ustawę o
   świadczeniu usług drogą elektroniczną. Jej art. 5 ust. 2 pkt 2 wymienia
   imię, nazwisko, miejsce zamieszkania i adres osoby fizycznej, a art. 8
   reguluje treść i udostępnienie regulaminu. Samo imię, nazwisko i e-mail
   nie są więc bezpieczną domyślną odpowiedzią, jeśli ustawa ma zastosowanie.
   Właściciel został poinformowany o tym ryzyku, lecz na ten moment nie chce
   udostępniać adresu. Nie zapisujemy fikcji, że wymóg jest nieznany albo
   na pewno nie ma zastosowania. Ustawa przewiduje w art. 23 grzywnę za brak,
   nieprawdziwość lub niepełność danych wskazanych w art. 5; wysokości ani
   prawdopodobieństwa takiego skutku nie można tu wiarygodnie oszacować.

Nie oznaczamy pełnego ZAD7 jako ukończonego. Przed wydaniem aplikacji należy
porównać treść z dokładnym podpisanym AAB i zapewnić odpowiednio wczesny
dostęp do regulaminu z aplikacji lub jej procesu udostępnienia. Nie wykonano
teraz testu urządzeniowego ani zmian Androida. To odrębne zadanie aplikacji.

## Źródła urzędowe

- [Ustawa o świadczeniu usług drogą elektroniczną, art. 5 i 8](https://eli.gov.pl/api/acts/DU/2024/1513/text.html).
- [UOKiK: prawo do informacji przy umowach na odległość](https://prawakonsumenta.uokik.gov.pl/prawo-do-informacji/sprzedaz-poza-lokalem-i-na-odleglosc/).
- [UOKiK: pytania o bezpłatne usługi bez logowania](https://prawakonsumenta.uokik.gov.pl/pytania-i-odpowiedzi/prawo-do-informacji/).

Wniosek o możliwym obowiązku adresowym jest ostrożną interpretacją źródła,
nie stwierdzeniem, że obecne udostępnianie aplikacji bezspornie podpada pod
każdy przepis tej ustawy.

## Kontrole lokalne

- `npm test`: PASS (kontrola Astro, build podglądu, HTML, centrum prawne,
  17 testów przeglądarkowych, bramki negatywne i kontrakt produkcyjny).
- `npm run test:production`: PASS (12 tras w pakiecie, w tym `/terms/`,
  oraz walidacja HTML; dwa szkice usunięte z pakietu).
- Produkcyjny pakiet zawiera `/privacy/`, `/terms/` i `/support/`; szkice
  `/licenses/` i `/privacy/archive/` pozostają pominięte.
- Nie wykonywano `push`, zmian w Play Console ani zmian aplikacji Android.
