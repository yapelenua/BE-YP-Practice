import { z } from 'zod';

export const MetaSchema = z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    page: z.number(),
    totalPages: z.number()
  });

export type Meta = z.infer<typeof MetaSchema>
