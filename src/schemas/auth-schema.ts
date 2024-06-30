import { z } from 'zod';

export type AuthProps = {
  email: string;
  password: string;
};

export const AuthSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters' }),
});

export type ForgotPasswordEmailProps = {
  email: string;
};

export const ForgotPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export type ResetPasswordProps = {
  code: string;
  password: string;
};

export const ResetPasswordSchema = z.object({
  code: z.string(),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters' }),
});
