import { z } from 'zod';
import { MetaSchema } from 'src/types/Meta';

const PostItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    updatedAt: z.date(),
    createdAt: z.date(),
    commentsCount: z.number().optional()
  });
  
  export const GetAllPostsRespSchema = z.object({
    data: z.array(PostItemSchema),
    meta: MetaSchema
  });