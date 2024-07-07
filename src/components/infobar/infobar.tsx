import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import Spinner from '../loader/loader';
import { Loader2 } from 'lucide-react';

type Props = {
  pathName: string;
  pathurl: string
};

const Infobar = ({ pathName, pathurl }: Props) => {
  return (
    <div className="w-full py-5 px-7 flex justify-end items-center">
      <div className="flex flex-row items-center gap-3">
        <Link
          href={pathurl}
          className="bg-[#E0A75E] hover:bg-[#F9D689] py-3 px-7 text-white rounded-sm"
        >
          {pathName}
        </Link>
        <ClerkLoading>
          <Loader2 className="animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "bg-primary-orange_main h-10 w-10"
              }
            }}
            showName={true}
            signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Infobar;
