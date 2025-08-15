import { z } from 'zod';

export const GetAllCommentsRespSchema = z.array(z.object({
    id: z.string(),
    postId: z.string(),
    text: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
  }));