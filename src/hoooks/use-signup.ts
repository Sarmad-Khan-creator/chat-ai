import { toast } from '@/components/ui/use-toast';
import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useSignup = () => {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();

  const handleSubmit = async (email: string, password: string) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      toast({
        title: '✅ Sent',
        description:
          'OTP has been sent to your email address. Please check your email.',
        variant: 'success',
      });

      setVerifying(true);
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

  const handleVerification = async (code: string) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    verifying,
    handleSubmit,
    handleVerification,
  };
};

export default useSignup;
