import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  updatedAt: z.date(),
  createdAt: z.date(),
  commentsCount: z.number().optional()
});

export type Post = z.infer<typeof PostSchema>;