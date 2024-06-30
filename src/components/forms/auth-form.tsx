import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import Spinner from '../loader/loader';
import { AuthProps, AuthSchema } from '@/schemas/auth-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import useOAuthSignin from '@/hoooks/use-oauth-signin';
import Image from 'next/image';
import googleLogo from '@/../public/assets/google.svg';

type Props = {
  handleSubmit: (email: string, password: string) => Promise<void>;
};

const AuthForm = ({ handleSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignIn } = useOAuthSignin();
  const pathname = usePathname();

  const signUpForm = useForm<AuthProps>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AuthProps) => {
    try {
      await handleSubmit(data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting = signUpForm.formState.isSubmitting;
  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 max-sm: mt-10 max-sm:px-7"
      >
        <div className="">
          <h2 className="font-bold text-2xl text-[#973131]">
            {pathname.includes('/auth/sign-up')
              ? 'Welcome to CHAT-AI. Sign Up to continue'
              : 'Welcome to CHAT-AI. Sign In to continue'}
          </h2>
        </div>
        <FormField
          name="email"
          control={signUpForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  className="rounded-sm border border-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={signUpForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="w-full flex flex-row items-center rounded-sm border border-gray-500">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    {...field}
                    className="border-none"
                  />
                  <div
                    className="h-full w-auto cursor-pointer mr-3"
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-5 w-full bg-[#E0A75E] hover:bg-[#F9D689]"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Continue'}
        </Button>
        <Button
          type="button"
          className="bg-transparent hover:bg-black/10 border border-gray-500 py-3"
          onClick={() => {
            handleSignIn('oauth_google');
          }}
        >
          <Image src={googleLogo} alt="google logo" />
        </Button>
        <div className="flex items-center justify-between">
          {pathname.includes('/auth/sign-up') ? (
            <p>
              Already account?{' '}
              <Link href="/auth/sign-in" className="hover:underline">
                Sign In
              </Link>
            </p>
          ) : (
            <p>
              No account?{' '}
              <Link href="/auth/sign-up" className="hover:underline">
                Sign Up
              </Link>
            </p>
          )}

          <Link href="/auth/forgot-password" className="hover:underline">
            Forgot Password
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
