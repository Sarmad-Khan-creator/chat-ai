import { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { toast } from '@/components/ui/use-toast';

interface ForgotPasswordHook {
  successfulCreation: boolean;
  error: string | undefined;
  create: (email: string) => Promise<void>;
  reset: (password: string, code: string) => Promise<void>;
}

export const useForgotPassword = () => {
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (isSignedIn) {
    router.push('/');
  }

  const create = async (email: string) => {
    if (!isLoaded) {
      return;
    }
    try {
      const response = await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      // .then((_) => {
      //   setSuccessfulCreation(true);
      //   setError('');
      // })

      setSuccessfulCreation(true);
      toast({
        title: '✅ Success',
        description:
          'Reset Password code sent successfully to your email address',
        variant: 'success',
      });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.error('error', error.errors[0].longMessage);
        toast({
          title: '❎ Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  const reset = async (code: string, password: string) => {
    if (!isLoaded) {
      return;
    }
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result?.status === 'complete') {
        setActive({ session: result?.createdSessionId });
        toast({
          title: '✅ Success',
          description: 'Password reset successfully',
          variant: 'success',
        });
      } else {
        console.log(result);
      }
      // .then((result) => {
      //   if (result.status === 'complete') {
      //     setActive({ session: result.createdSessionId });
      //     setError('');
      //   } else {
      //     console.log(result);
      //   }
      // })
      // .catch((err) => {
      //   console.error('error', err.errors[0].longMessage);
      //   setError(err.errors[0].longMessage);
      // });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.error('error', error.errors[0].longMessage);
        toast({
          title: '❎ Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  return {
    successfulCreation,
    create,
    reset,
  };
};
