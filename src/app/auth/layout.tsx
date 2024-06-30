import { useAuth } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const AuthLayout = async ({ children }: Props) => {
  const { userId , redirectToSignIn } = auth()

  if (userId) return redirectToSignIn();
  return (
    <div className="flex flex-row w-full max-sm:flex-col-reverse">
      <div className="w-auto flex-1 h-screen flex items-center justify-center">
        <div className="w-[400px]">{children}</div>
      </div>
      <div className="w-auto flex-1 h-screen bg-[#F5E7B2] flex items-center justify-center max-sm:pt-7 max-sm:pb-3">
        <div className="flex flex-col items-start gap-5 w-[300px]">
          <div className="flex flex-row gap-3 items-center">
            <Image src="/assets/logo.svg" alt="logo" width={70} height={70} />
            <h2 className="text-[#E0A75E] font-bold text-3xl">CHAT-AI</h2>
          </div>
          <div>
            <p className="text-lg text-amber-600 max-sm:text-sm">
              Create your own chat bot based on the knowledge provided by you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
