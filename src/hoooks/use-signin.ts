'use client';

import { toast } from '@/components/ui/use-toast';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';

export const useSignin = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    if (!isLoaded) return;

    try {
      const signInComplete = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signInComplete.status === 'complete') {
        await setActive({ session: signInComplete.createdSessionId });
        toast({
          title: '✅ Success',
          description: 'You are successfully logged in',
          variant: 'success',
        });
        router.push('/');
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast({
          title: '❎ Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  return { handleSubmit };
};
