import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  text: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Comment = z.infer<typeof CommentSchema>;