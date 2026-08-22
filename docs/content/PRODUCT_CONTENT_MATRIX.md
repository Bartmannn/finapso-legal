# Macierz treści produktowych ZAD4

Data weryfikacji: 2026-08-22

Wersja aplikacji opisywana przez dokumentację: `1.37.25`

## Trasa, odbiorca i następny krok

| Trasa | Odbiorca | Pytanie użytkownika | Główne źródła | CTA |
| --- | --- | --- | --- | --- |
| `/` | osoba poznająca produkt | Czym jest Finapso i gdzie zacząć? | `../Finapso/README.md`, `../Finapso/UI.md`, `docs/content/CLAIMS_CONTRACT.md` | `/docs/getting-started/`, `/features/` |
| `/features/` | przyszły lub obecny użytkownik | Jakie potwierdzone funkcje są dostępne i jakie mają granice? | `../Finapso/README.md`, `../Finapso/UI.md`, `../Finapso/RECEIPT.md`, `../Finapso/ADVERTISING.md` | `/docs/getting-started/` |
| `/docs/` | użytkownik szukający instrukcji | Który artykuł odpowiada mojemu zadaniu? | indeks tras ZAD4, bieżące metadane kolekcji | cztery artykuły ZAD4, e-mail wsparcia |
| `/docs/getting-started/` | nowy użytkownik | Jak utworzyć budżet i zapisać pierwszy wpis? | `../Finapso/UI.md` — Nawigacja, Pulpit, Formularz transakcji, Ustawienia | dane i kopie, paragony, funkcje |
| `/docs/data-and-backups/` | użytkownik chroniący lub przenoszący dane | Co jest lokalne i jak wykonać pełną kopię? | `../Finapso/README.md` — Prywatność i bezpieczeństwo; `../Finapso/UI.md` — Ustawienia formatów i bezpieczeństwa | pierwsze kroki, paragony, prywatność |
| `/docs/receipts/` | użytkownik importujący dokument | Jak zaimportować paragon, sprawdzić OCR i poprawić wynik? | `../Finapso/RECEIPT.md`, `../Finapso/UI.md` — Paragony w UI | dane i kopie, indeks dokumentacji |
| `/docs/notifications/` | osoba pytająca o asystenta | Czy funkcja jest gotowa i jakie ma ograniczenia? | `../Finapso/NOTIFICATION_ASSISTANT.md`, aktywne plany 64 i 76, `docs/content/CLAIMS_CONTRACT.md` | ręczne dodawanie, funkcje, prywatność |

## Rejestr twierdzeń

| ID | Publiczne twierdzenie lub granica | Dowód | Sposób prezentacji |
| --- | --- | --- | --- |
| PROD-01 | Finapso jest aplikacją Android do finansów osobistych, nie bankiem. | `../Finapso/README.md`, `docs/content/CLAIMS_CONTRACT.md` | hero i nagłówek funkcji |
| PROD-02 | Rdzeń finansowy używa lokalnej bazy Room, bez backendu finansowego i integracji bankowej. | `../Finapso/README.md` — Główne założenia i Architektura | strona główna, funkcje, dane i kopie |
| PROD-03 | Aplikacja nie tworzy własnego konta użytkownika. | `../Finapso/README.md`, `docs/content/CLAIMS_CONTRACT.md` | doprecyzowanie „konta Finapso”, bez obietnic dotyczących konta Google |
| PROD-04 | Budżety, transakcje, kategorie, pulpit i analizy są dostępne. | `../Finapso/README.md` — Aktualny status; `../Finapso/UI.md` | strona główna, funkcje, pierwsze kroki |
| PROD-05 | Analizy i prognozy są informacyjne i orientacyjne. | `../Finapso/UI.md` — Analizy i runway; `docs/content/CLAIMS_CONTRACT.md` | funkcje i pierwsze kroki; bez obietnicy oszczędności |
| PROD-06 | Import paragonów obsługuje obrazy, wiele obrazów i PDF; OCR działa lokalnie. | `../Finapso/RECEIPT.md` — Status, Przepływ importu, OCR | funkcje i artykuł o paragonach |
| PROD-07 | OCR/parser mogą być niepełne lub błędne, a użytkownik poprawia wynik przed zapisem. | `../Finapso/RECEIPT.md`, `../Finapso/UI.md` — Paragony w UI | widoczne ograniczenia oraz kontrolna lista |
| PROD-08 | Pełna, wersjonowana kopia obejmuje Room, preferencje i prywatne pliki paragonów. | `../Finapso/README.md` — Prywatność i bezpieczeństwo; `../Finapso/UI.md` — Ustawienia | funkcje i dane/kopie |
| PROD-09 | PIN ogranicza dostęp do aplikacji, ale nie jest deklarowany jako szyfrowanie. | `../Finapso/UI.md`; `docs/content/CLAIMS_CONTRACT.md` | funkcje, pierwsze kroki, dane/kopie |
| PROD-10 | Zgłoszenie oraz dane diagnostyczne są przekazywane dopiero po jawnej akcji. | `../Finapso/README.md`, `../Finapso/UI.md`, `../Finapso/RECEIPT.md` | strona główna, funkcje, paragony |
| PROD-11 | Produkcyjny wariant pierwszego wydania ma reklamy wyłączone. | decyzja `HOST-04`; `../Finapso/app/build.gradle.kts` — `productionAdsApproved = false`; `../Finapso/ADVERTISING.md` | informacja o braku reklam, bez opisywania przyszłego SDK jako bieżącej funkcji |
| PROD-12 | Asystent powiadomień nie może być przedstawiony jako wydana funkcja. | `../Finapso/docs/plans/64-notification-settings-consent-and-release.md` i plan 76 — `BLOCKED`; `docs/content/CLAIMS_CONTRACT.md` | osobna trasa `DRAFT`, `noindex, nofollow`, bez instrukcji aktywacji |

## Kontrola wersji i rozbieżności

- `app/build.gradle.kts` w dniu weryfikacji zawiera `versionName = "1.37.25"`.
- Aktywny rejestr planów aplikacji oznacza zadania 64 i 76 jako `BLOCKED`.
  Dokumentacja nie uznaje więc asystenta za gotową funkcję wydania, mimo że kod
  części ścieżki już istnieje.
- Konfiguracja release ma zamkniętą bramkę reklam. Debug może używać oficjalnych
  identyfikatorów testowych, ale nie jest to podstawa do opisywania reklam jako
  funkcji pierwszego wydania.
- Zatwierdzone zrzuty ekranu nie zostały dostarczone. ZAD4 nie dodaje makiet ani
  obrazów imitujących aplikację; wykorzystuje wyłącznie istniejący znak marki z
  ZAD3.

Macierz jest dowodem redakcyjnym dla ZAD4. Przed kolejnym wydaniem należy
ponownie sprawdzić wersję aplikacji, aktywne bramki i każdą pozycję rejestru.
