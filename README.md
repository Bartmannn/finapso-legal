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

Na polecenie właściciela z 2026-10-12 w obu dokumentach wpisano datę
12 października 2026 r. i usunięto wzmianki o adresie korespondencyjnym
wydawcy. Dokumenty nadal opisują Premium, subskrypcje i reklamy, chociaż
bieżące MVP ich nie ma. Na stronie nie ma dodatkowych oznaczeń ani notatek;
podstrony mają techniczne `noindex, nofollow`.
Na polecenie właściciela z 2026-10-12 pola `[DATA]` i
`[ADRES KORESPONDENCYJNY]` nie blokują builda produkcyjnego ani publikacji
GitHub Pages. Pozostałe kontrole publikacji
(m.in. lorem ipsum, DRAFT, przykładowe kontakty, sekrety i zasoby zewnętrzne)
pozostają aktywne. Przejście builda jest weryfikacją techniczną, nie oceną treści
dokumentów.

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
