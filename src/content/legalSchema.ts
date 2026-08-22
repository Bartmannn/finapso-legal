import { z } from 'astro/zod';

export const legalDocumentStatusSchema = z.enum(['DRAFT', 'APPROVED', 'ARCHIVED']);

export const legalChangeSchema = z.object({
  revision: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1),
});

export const legalDocumentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  productName: z.literal('Finapso'),
  packageName: z.literal('app.finapso.android'),
  status: legalDocumentStatusSchema,
  revision: z.string().min(1),
  updatedAt: z.coerce.date(),
  effectiveAt: z.coerce.date().nullable(),
  appVersion: z.string().min(1).nullable(),
  changeHistory: z.array(legalChangeSchema).min(1),
});

export type LegalDocumentStatus = z.infer<typeof legalDocumentStatusSchema>;
export type LegalChange = z.infer<typeof legalChangeSchema>;
export type LegalDocument = z.infer<typeof legalDocumentSchema>;
