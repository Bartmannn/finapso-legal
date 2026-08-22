## Jak działa niezależna podstrona dokumentacji

Ta podstrona jest generowana podczas budowania jako osobny plik HTML. Nie używa
routera klienckiego ani JavaScriptu wymaganego do wyświetlenia treści. Pozwala
sprawdzić bezpośrednie wejście pod zagnieżdżony adres, nawigację klawiaturą oraz
zachowanie serwisu przy bazie `/finapso-legal/`.

## Bardzo długi nagłówek sprawdzający czytelność instrukcji na wąskim ekranie telefonu

Tekst testowy celowo zawiera długie polskie słowa i kilka zdań. Układ powinien
pozostać czytelny przy szerokości 320 pikseli, powiększeniu do 200% i większych
odstępach ustawionych przez użytkownika.

### Najważniejsze założenia techniczne

- treść jest dostępna jako semantyczny HTML;
- linki i obszary interakcji mają widoczny fokus;
- ustawienia systemowe sterują jasnym albo ciemnym motywem;
- ograniczenie animacji jest respektowane bez utraty informacji.

## Wydruk i dalsza rozbudowa

Arkusz wydruku usuwa nawigację oraz elementy dekoracyjne, zachowując treść,
nagłówki i ważne komunikaty. Docelowa dokumentacja zostanie uzupełniona w ZAD4.
