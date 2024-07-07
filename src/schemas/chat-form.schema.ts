import { z } from 'zod';
export const chatFormSchema = z.object({
  question: z.string(),
});
