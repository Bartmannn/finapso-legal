# Macierz bramek jakości Finapso Legal

Stan narzędzi i oficjalnej dokumentacji sprawdzono 2026-08-22. Jedno polecenie
`npm test` wykonuje lokalnie ten sam krytyczny kontrakt co workflow GitHub
Actions. Lighthouse pozostaje osobnym pomiarem podatnym na środowisko.

| Wymaganie | Test lub polecenie | Preview | Production | Komunikat błędu |
| --- | --- | --- | --- | --- |
| Typy Astro i TypeScript | `npm run check` | wymagane | wymagane | diagnostyka Astro |
| Statyczny build z lockfile | `npm ci`, `build-site.mjs` | wymagane | wymagane | kod builda Astro |
| Wymagane trasy i semantyka | `site-audit.mjs` | wymagane | wymagane | `[html-contract]` |
| Poprawny HTML | `html-validate dist` | wymagane | wymagane | reguła `html-validate` |
| Linki i kotwice | `site-audit.mjs` | wymagane | wymagane | `[internal-link]` |
| Canonical i `robots` | `site-audit.mjs` | wymagane | wymagane | `[canonical]`, `[robots]` |
| Sitemap tylko stron indeksowalnych | `@astrojs/sitemap`, `site-audit.mjs` | wymagane | wymagane | `[sitemap]` |
| Szkic ma ostrzeżenie i `noindex` | `assertPreviewLegal` | dozwolony warunkowo | niedozwolony | `[preview-draft]` |
| Brak placeholderów prawnych | `productionPlaceholderLabels` | raportowany i chroniony | wymagane | `[release-placeholder]` |
| Zero JS na stronach prawnych | audyt statyczny i projekt `legal-no-javascript` | wymagane | wymagane | `[legal-javascript]` lub Playwright |
| HTTP 200 i `text/html` | Playwright | wymagane | wymagane po zatwierdzeniu treści | asercja odpowiedzi |
| axe bez critical/serious | `@axe-core/playwright` | wymagane | wymagane | raport naruszenia axe |
| Klawiatura, skip link i fokus | Playwright | wymagane | wymagane | asercja fokusu |
| Mobilna nawigacja, 320 px i 44 px | Playwright | wymagane | wymagane | asercja wymiaru |
| Brak zewnętrznych żądań i fontów | audyt statyczny i Playwright | wymagane | wymagane | `[external-resource]` |
| Sekrety i prywatne formaty | `assertSourceSafety` | wymagane | wymagane | `[secret-scan]`, `[private-file]` |
| Minimalne uprawnienia publikacji Pages | `assertWorkflowSafety` | wymagane | wymagane | `[workflow-permissions]`, `[workflow-deploy-guard]` |
| CSS gzip ≤ 50 KiB, JS ≤ 10 KiB | `assertBudgets` | wymagane | wymagane | `[resource-budget]` |
| CLS < 0,1 | Playwright lokalnego artefaktu | wymagane | wymagane | asercja CLS |
| Wersja źródła w artefakcie | `build-meta.json` | wymagane | wymagane | `[build-meta]` |
| Skuteczność czterech krytycznych bramek | `npm run test:negative` | wymagane | wymagane | brak oczekiwanego błędu fixture |
| Lighthouse 95 / LCP < 2,5 s / CLS < 0,1 | `npm run audit:lighthouse` | raport | raport | `DO PRZEGLĄDU`, bez niestabilnego progu CI |

## Kontrolowane przypadki negatywne

Fixtures w `tests/fixtures/negative-gates.json` nigdy nie są kopiowane do
`dist/`. Udowadniają wykrycie lorem ipsum w produkcji, uszkodzonego linku
wewnętrznego, zewnętrznego skryptu oraz zbyt szerokich uprawnień workflow.
Test korzysta z tych samych funkcji co audyt prawdziwego artefaktu.

## Źródła narzędzi

- Astro Sitemap: <https://docs.astro.build/en/guides/integrations-guide/sitemap/>;
- Playwright web server, wyłączanie JavaScriptu i axe:
  <https://playwright.dev/docs/test-webserver>,
  <https://playwright.dev/docs/api/class-testoptions#test-options-java-script-enabled>,
  <https://playwright.dev/docs/accessibility-testing>;
- HTML Validate: <https://html-validate.org/usage/>;
- Lighthouse: <https://developer.chrome.com/docs/lighthouse/overview>;
- zabezpieczenia Actions: <https://docs.github.com/en/actions/reference/security/secure-use>;
- aktualizacje Actions przez Dependabot:
  <https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/auto-update-actions>.
