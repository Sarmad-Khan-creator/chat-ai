import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const MobileNavbar = () => {
  return (
    <div className="flex flex-row w-full justify-between px-5 py-5 shadow-md">
      <div className="flex flex-row gap-2 items-center">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <h1 className="text-2xl font-bold text-primary-orange_main">Chat AI</h1>
      </div>
      <MenuIcon className="hidden max-sm:block" />
    </div>
  );
};

export default MobileNavbar;
