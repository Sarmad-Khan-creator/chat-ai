import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import MobileSheet from '../sheet/mobile-sheet';
import Link from 'next/link';

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row w-full justify-between px-5 py-5 shadow-md sm:hidden">
      <Link href="/" className="flex flex-row gap-2 items-center">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <h1 className="text-2xl font-bold text-primary-orange_main">Chat AI</h1>
      </Link>
      <MobileSheet>{children}</MobileSheet>
    </div>
  );
};

export default MobileNavbar;
