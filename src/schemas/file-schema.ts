import { z } from 'zod';

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 20 // 2MB
export const ACCEPTED_FILE_TYPES = ['pdf', 'docx']

export const fileSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'Your file size must be less then 20MB',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'Only JPG, JPEG & PNG are accepted file formats',
    }),
});
