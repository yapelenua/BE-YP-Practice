import { z } from 'zod';

export const UpdatePostReqSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional().nullable()
});