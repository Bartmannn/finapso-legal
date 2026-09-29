# Minimalne wydanie polityki prywatności Finapso

Stan lokalny: przygotowane do wdrożenia, bez `push` i bez zmian w Play Console.
Data: 2026-09-28.

## Zakres zaakceptowany przez właściciela

- Wydawca: Bartosz Bohdziewicz; kontakt: `finapso.support@gmail.com`.
- Pierwsze wydanie: Polska, 18+, bez reklam, płatności i formularza zgłoszeń.
- Kontakt z aplikacji otwiera klienta e-mail bez automatycznego dołączania danych.
- Korespondencja jest ręcznie przeglądana raz w miesiącu; zgłoszenie usuwa się
  przy pierwszym przeglądzie po upływie 180 dni od otrzymania. Sprawa nadal
  otwarta pozostaje do zamknięcia i następnego przeglądu, z wyjątkiem
  konkretnego obowiązku prawnego albo roszczenia.
- Właściciel zaakceptował treść polityki 2026-09-28 i zdecydował, że MVP
  publikuje politykę oraz kontakt przed regulaminem i pozostałymi szkicami.
- Właściciel potwierdził wykonanie pierwszego ręcznego przeglądu skrzynki
  2026-09-28. Kolejne przeglądy wymagają regularnego działania właściciela.

## Artefakt

- Kanoniczny adres: `https://bartmannn.github.io/finapso-legal/privacy/`.
- Rewizja strony: `1.0-MVP`, data obowiązywania `2026-09-28`, aplikacja
  `1.53.39`.
- Stan na 2026-09-28: pakiet zawierał `/privacy/` i `/support/` jako strony
  `APPROVED`, a `/terms/`, `/licenses/` i `/privacy/archive/` były pomijane.
  Aktualizacja 2026-09-29: zatwierdzono również `/terms/`; pozostałe dwa
  szkice nadal są pomijane z pakietu produkcyjnego.
- Strony prawne nie wymagają JavaScriptu. Nie ma formularza na stronie.
- Treść w `Finapso_polityka_prywatności_v.1.0.txt` pozostaje materiałem
  roboczym; dokładną rewizją do publikacji jest źródło Markdown strony.

## Kontrole lokalne

- `npm test`: PASS, 17 testów przeglądarkowych oraz kontrole negatywne.
- `npm run test:production`: PASS, 11 tras w pakiecie.
- Aplikacja: `testDebugUnitTest`, `assembleDebug`, `assembleDebugAndroidTest`,
  `verifyAndroidBackupMergedManifests`, `verifyRoomMigrationSafety`,
  `bundleRelease` i `verifyNoAdvertisingReleaseBundle`: PASS.
- Wygenerowany wariant release ma `FEEDBACK_FORM_ENABLED=false`, pusty adres
  relayu i `versionName=1.53.39`. Kontrola AAB nie wykryła reklamowych
  zależności ani komponentów manifestu.
- Test kliknięcia linku i treści offline został skompilowany, ale nie
  uruchomiony na emulatorze/urządzeniu w tym przebiegu.

## Przed publicznym użyciem adresu w Play Console

1. Utrzymać comiesięczny przegląd skrzynki; nie deklarować automatycznej
   retencji 90/180 dni. Pierwszy przegląd właściciel potwierdził.
2. Przy docelowym podpisaniu i ustawieniu `versionCode` ponownie sprawdzić
   dokładnie ten AAB, który trafi do Google Play, oraz zachowanie asystenta
   i ML Kit na urządzeniu. Lokalny wariant release i manifesty przeszły
   kontrole, ale nie zastępują odbioru publikowanego artefaktu.
3. Właściciel wykonuje `push` obu repozytoriów we właściwej kolejności i
   sprawdza publicznie HTTPS oraz treść `/privacy/` i `/support/`.
4. Dopiero wtedy podaje adres `/privacy/` w Google Play Console i porównuje
   odpowiedzi Data safety z finalnym AAB. Nie wpisuje adresu szkicu ani nie
   zakłada, że sama akceptacja w Google zastępuje zgodność z prawem.

Pełny ZAD7 pozostaje osobnym zadaniem dla końcowej synchronizacji, licencji,
archiwum i jego pozostałych bramek; minimalny wariant polityki i regulaminu
nie zamyka całego zadania.
