import { z } from 'zod';

export type EditUserDetails = {
  username: string;
  userBio: string;
};

export const editUserDetailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userBio: z
    .string()
    .max(150, { message: 'User bio should be at least 150 characters' }),
});
