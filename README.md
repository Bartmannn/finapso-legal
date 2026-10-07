# Finapso — dokumenty

Minimalna witryna Astro na GitHub Pages. Ma tylko stronę wejściową oraz dwa
stabilne adresy HTML:

- `https://bartmannn.github.io/finapso-legal/privacy/` — polityka prywatności;
- `https://bartmannn.github.io/finapso-legal/terms/` — regulamin.

Treść stron pochodzi dosłownie z plików
`src/content/legal/FINAL_Polityka_prywatności_FINAPSO.md` i
`src/content/legal/FINAL_Regulamin_aplikacji_FINAPSO.md`. Witryna nie zmienia
ich brzmienia; składnia nagłówków Markdown jest tylko renderowana jako nagłówki HTML.
Dokumenty są zwykłym HTML, czytelnym bez JavaScriptu, a strona nie dodaje
analityki, reklam ani formularza.

## Status dokumentów

Oba przesłane pliki nadal zawierają `[DATA]` i `[ADRES KORESPONDENCYJNY]`.
Opisują też Premium, subskrypcje i reklamy, chociaż bieżące MVP ich nie ma.
Na prośbę właściciela treści nie zostały zmienione. W podglądzie strony nie ma
dodatkowych oznaczeń ani notatek; podstrony mają techniczne `noindex, nofollow`.
Produkcyjny build
i workflow GitHub Pages celowo zatrzymują publikację tych wersji. Nie należy
podawać obecnego podglądu w Google Play Console.

Zastąpienie placeholderów i rozstrzygnięcie zgodności opisów z aplikacją wymaga
osobnej decyzji właściciela. Nie wolno omijać tej bramki przez publikowanie
artefaktu `build:preview`.

## Lokalnie

Wymagane: Node.js z `.nvmrc` i npm zgodne z `package.json`.

```text
npm ci
npm run build:preview
npm test
```

Podgląd statycznego pakietu można uruchomić poleceniem `npm run preview`.
Adres bazowy pozostaje `/finapso-legal/`. Publikacja GitHub Pages wymaga
osobnego `push` po przejściu `npm run build:production`.
