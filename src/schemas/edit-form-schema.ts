import { z } from 'zod';

export type EditFormProps = {
  name: string;
  template: string;
};

export const editFormSchema = z.object({
  name: z.string(),
  template: z.string(),
});
