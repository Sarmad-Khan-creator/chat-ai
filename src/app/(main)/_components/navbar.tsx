'use client';
import { Button } from '@/components/ui/button';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="flex items-center justify-between py-5 px-3">
      <div className="flex items-center gap-1">
        <div className="relative w-[100px] h-[40px] max-sm:w-[40px]">
          <Image src="/assets/logo.svg" alt="logo" fill />
        </div>
        <h2 className="text-[#E0A75E] font-bold text-3xl max-sm:text-2xl">CHAT-AI</h2>
      </div>
      <div></div>
      <div>
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="bg-[#E0A75E] hover:bg-[#F9D689] py-3 px-7 text-white rounded-sm"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/auth/sign-in"
            className="bg-[#E0A75E] hover:bg-[#F9D689] py-3 px-7 text-white rounded-sm"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
