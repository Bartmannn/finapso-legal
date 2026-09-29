# Regulamin Finapso MVP — przegląd roboczy

Stan: `DRAFT`, bez publikacji i bez `push`.
Data weryfikacji: 2026-09-29.

## Źródło i zakres

- Robocza treść strony: `src/content/legal/terms.md`, rewizja `DRAFT-MVP-1`.
- Materiał porównawczy: lokalny `Finapso_regulamin_v.1.0.txt`. Nie jest
  zatwierdzoną rewizją i nie należy go dodawać do Git. Zawiera prywatne dane
  kontaktowe oraz nieaktualne postanowienia o reklamach, Premium, formularzu
  i innej domenie; żadnej z tych informacji nie przeniesiono do strony.
- Fakty MVP: bez reklam, płatności, subskrypcji, konta i formularza zgłoszeń;
  pierwsze wydanie dla pełnoletnich osób w Polsce, kontakt e-mail. Przyjęto
  opis lokalnego zapisu, ręcznego eksportu, OCR i asystenta zgodny z
  `src/content/legal/privacy-mvp-review.md` i aplikacją `1.53.39`.
- Lokalny podgląd `/terms/` pozostaje `DRAFT` z `noindex, nofollow`, widocznym
  ostrzeżeniem oraz bez daty obowiązywania. Produkcyjny build nadal wyklucza
  tę trasę. Polityka prywatności i kontakt pozostają osobnym MVP.

## Decyzje przed publikacją

1. Właściciel powinien przeczytać i zatwierdzić dokładną treść rewizji.
   Zdecydował, że regulamin ma zostać przygotowany bez publicznego adresu
   korespondencyjnego; adresu z pliku `.txt` nie wolno publikować. Akceptacja
   dokładnego tekstu pozostaje odrębnym krokiem.
2. Trzeba ocenić, czy do sposobu udostępniania Finapso stosuje się ustawę o
   świadczeniu usług drogą elektroniczną. Jej art. 5 ust. 2 pkt 2 wymienia
   imię, nazwisko, miejsce zamieszkania i adres osoby fizycznej, a art. 8
   reguluje treść i udostępnienie regulaminu. Samo imię, nazwisko i e-mail
   nie są więc bezpieczną domyślną odpowiedzią, jeśli ustawa ma zastosowanie.
   Właściciel został poinformowany o tym ryzyku, lecz na ten moment nie chce
   udostępniać adresu. Nie zapisujemy fikcji, że wymóg jest nieznany albo
   na pewno nie ma zastosowania. Ustawa przewiduje w art. 23 grzywnę za brak,
   nieprawdziwość lub niepełność danych wskazanych w art. 5; wysokości ani
   prawdopodobieństwa takiego skutku nie można tu wiarygodnie oszacować.
3. Przed zdjęciem `DRAFT` należy ponownie porównać tekst z dokładnym AAB,
   polityką prywatności, ekranem kontaktu, aktualnym adresem witryny oraz
   sposobem udostępnienia regulaminu użytkownikowi przed korzystaniem.
4. Dopiero po zatwierdzeniu dodać datę obowiązywania, zmienić metadane na
   `APPROVED`, włączyć `/terms/` do produkcyjnego buildu i jego kontroli oraz
   przygotować ewentualny link z aplikacji. Nie oznaczać pełnego ZAD7 jako
   ukończonego tylko z powodu przygotowania tego szkicu.

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
- Produkcyjny pakiet nadal zawiera tylko zatwierdzone strony prawne:
  `/privacy/` i `/support/`. Roboczy `/terms/` jest dostępny wyłącznie
  lokalnie w podglądzie.
- Nie wykonywano `push`, zmian w Play Console ani zmian aplikacji Android.
