import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { localMarkdownLoader } from './loaders/localMarkdown';
import { legalDocumentSchema } from './content/legalSchema';

const sharedMetadata = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  updatedAt: z.coerce.date(),
  revision: z.string().min(1),
  draft: z.boolean(),
  appVersion: z.string().min(1).nullable(),
});

const docs = defineCollection({
  loader: localMarkdownLoader('docs', [
    {
      id: 'getting-started',
      file: 'src/content/docs/getting-started.md',
      data: {
        title: 'Pierwsze kroki',
        description: 'Utwórz budżet i zapisz pierwszą transakcję w Finapso.',
        updatedAt: '2026-08-22',
        revision: '1.0',
        draft: false,
        appVersion: '1.53.39',
      },
    },
    {
      id: 'data-and-backups',
      file: 'src/content/docs/data-and-backups.md',
      data: {
        title: 'Dane i kopie',
        description: 'Jak dane są przechowywane oraz jak eksportować i przywracać kopię Finapso.',
        updatedAt: '2026-09-28',
        revision: '1.0',
        draft: false,
        appVersion: '1.53.39',
      },
    },
    {
      id: 'receipts',
      file: 'src/content/docs/receipts.md',
      data: {
        title: 'Paragony i OCR',
        description: 'Importuj paragon, sprawdź lokalny odczyt i popraw wynik przed zapisem.',
        updatedAt: '2026-09-28',
        revision: '1.0',
        draft: false,
        appVersion: '1.53.39',
      },
    },
    {
      id: 'notifications',
      file: 'src/content/docs/notifications.md',
      data: {
        title: 'Asystent powiadomień — status funkcji',
        description: 'Roboczy opis przygotowanego asystenta i warunków wymaganych przed jego wydaniem.',
        updatedAt: '2026-08-22',
        revision: 'przed wydaniem',
        draft: true,
        appVersion: '1.53.39',
      },
    },
    {
      id: 'routing-check',
      file: 'src/content/docs/routing-check.md',
      data: {
        title: 'Kontrola routingu statycznego',
        description: 'Techniczna strona potwierdzająca generowanie zagnieżdżonego HTML.',
        updatedAt: '2026-08-22',
        revision: 'foundation',
        draft: true,
        appVersion: null,
      },
    },
  ]),
  schema: sharedMetadata,
});

const legal = defineCollection({
  loader: localMarkdownLoader('legal', [
    {
      id: 'privacy',
      file: 'src/content/legal/privacy-mvp-review.md',
      data: {
        title: 'Polityka prywatności Finapso',
        description: 'Zasady przetwarzania danych w aplikacji Finapso i korespondencji ze wsparciem.',
        productName: 'Finapso',
        packageName: 'app.finapso.android',
        status: 'APPROVED',
        updatedAt: '2026-09-28',
        effectiveAt: '2026-09-28',
        revision: '1.0-MVP',
        appVersion: '1.53.39',
        changeHistory: [
          {
            revision: '1.0-MVP',
            date: '2026-09-28',
            summary: 'Pierwsza rewizja dla MVP bez reklam i formularza zgłoszeń.',
          },
        ],
      },
    },
    {
      id: 'terms',
      file: 'src/content/legal/terms.md',
      data: {
        title: 'Regulamin korzystania z Finapso',
        description: 'Zasady korzystania z bezpłatnego pierwszego wydania aplikacji Finapso.',
        productName: 'Finapso',
        packageName: 'app.finapso.android',
        status: 'APPROVED',
        updatedAt: '2026-09-29',
        effectiveAt: '2026-09-29',
        revision: '1.0-MVP',
        appVersion: '1.53.39',
        changeHistory: [
          {
            revision: '1.0-MVP',
            date: '2026-09-29',
            summary: 'Pierwsza zatwierdzona rewizja dla bezpłatnego MVP bez reklam i formularza.',
          },
        ],
      },
    },
  ]),
  schema: legalDocumentSchema,
});

export const collections = { docs, legal };
