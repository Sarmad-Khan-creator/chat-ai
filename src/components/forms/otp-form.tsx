'use client';
import useSignup from '@/hoooks/use-signup';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from '../ui/use-toast';
import Spinner from '../loader/loader';

type otpProps = {
  otp: string;
};

const otpSchema = z.object({
  otp: z.string(),
});

const OTPForm = () => {
  const { handleVerification } = useSignup();
  const otpForm = useForm<otpProps>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (values: otpProps) => {
    try {
      handleVerification(values.otp);
      toast({
        title: '✅ Success',
        description:
          'Your account has been verified, you are being redirected to home page.',
        variant: 'success',
      });
    } catch (error) {}
  };

  const isSubmitting = otpForm.formState.isSubmitting;
  return (
    <>
      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#E0A75E] hover:bg-[#F9D689]"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OTPForm;
