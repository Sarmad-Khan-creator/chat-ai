'use client';
import Spinner from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/hoooks/use-forgot-password';
import {
  ForgotPasswordEmailProps,
  ForgotPasswordEmailSchema,
  ResetPasswordProps,
  ResetPasswordSchema,
} from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { successfulCreation, create, reset } = useForgotPassword();

  const forgotPasswordEmailForm = useForm<ForgotPasswordEmailProps>({
    resolver: zodResolver(ForgotPasswordEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const isEmailSubmitting = forgotPasswordEmailForm.formState.isSubmitting;

  const resetPasswordForm = useForm<ResetPasswordProps>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      code: '',
      password: '',
    },
  });

  const isResetPasswordSubmitting =
    forgotPasswordEmailForm.formState.isSubmitting;

  const handleForgotPasswordEmail = async (
    values: ForgotPasswordEmailProps
  ) => {
    await create(values.email);
  };

  const handleResetPassword = async (values: ResetPasswordProps) => {
    await reset(values.code, values.password);
    console.log(values.code);
    console.log(values.password);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-lg font-bold text-[#973131]">Forgot Password?</h1>
      </div>
      {!successfulCreation && (
        <>
          <Form {...forgotPasswordEmailForm}>
            <form
              onSubmit={forgotPasswordEmailForm.handleSubmit(
                handleForgotPasswordEmail
              )}
              className="flex flex-col gap-3 max-sm: mt-10 max-sm:px-7"
            >
              <FormField
                name="email"
                control={forgotPasswordEmailForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-5 w-full bg-[#E0A75E] hover:bg-[#F9D689]"
                disabled={isEmailSubmitting}
              >
                {isEmailSubmitting ? <Spinner /> : 'Continue'}
              </Button>
            </form>
          </Form>
        </>
      )}

      {successfulCreation && (
        <>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
              className="flex flex-col gap-3 max-sm: mt-10 max-sm:px-7"
            >
              <FormField
                name="code"
                control={resetPasswordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your code"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={resetPasswordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-5 w-full bg-[#E0A75E] hover:bg-[#F9D689]"
                disabled={isResetPasswordSubmitting}
              >
                {isResetPasswordSubmitting ? <Spinner /> : 'Continue'}
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
