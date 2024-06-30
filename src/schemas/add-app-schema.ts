import { z } from "zod";

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 20; // 2MB
export const ACCEPTED_FILE_TYPES = ["pdf", "docx"];

export type addAppProps = {
  title: string;
  template: string;
  index: string;
  file: any;
};

export const addAppSchema = z.object({
  title: z.string(),
  template: z.string(),
  index: z.string(),
  file: z
    .any()
    // .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
    //   message: "Your file size must be less then 20MB",
    // })
    // .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
    //   message: "Only JPG, JPEG & PNG are accepted file formats",
    // }),
});
