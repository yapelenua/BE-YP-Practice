import { z } from 'zod';
import { GetAllCommentsRespSchema } from '../comment/GetAllCommentsForPostRespSchema';

export const GetPostByIdWithCommentsRespSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().nullable(),
  updatedAt: z.date(),
  createdAt: z.date(),
  comments: GetAllCommentsRespSchema
});