import { z } from 'zod';

export const DeletePostRespSchema = z.object({
    success: z.boolean()
});