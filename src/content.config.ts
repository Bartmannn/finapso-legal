import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { localMarkdownLoader } from './loaders/localMarkdown';

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
      id: 'privacy-placeholder',
      file: 'src/content/legal/privacy-placeholder.md',
      data: {
        title: 'Polityka prywatności — szkielet',
        description: 'Techniczny wpis kontrolny dla przyszłej polityki prywatności Finapso.',
        updatedAt: '2026-08-22',
        revision: 'foundation',
        draft: true,
        appVersion: null,
      },
    },
  ]),
  schema: sharedMetadata,
});

export const collections = { docs, legal };
