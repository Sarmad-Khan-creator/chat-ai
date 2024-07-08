import Infobar from '@/components/infobar/infobar';
import Sidebar from '@/components/sidebar/sidebar';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-row w-full justify-between px-5 py-3 shadow-md">
          <div className='flex flex-row gap-2 items-center'>
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
        <Infobar pathName="Home" pathurl="/" />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
