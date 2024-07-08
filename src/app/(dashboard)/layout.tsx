import Infobar from '@/components/infobar/infobar';
import MobileNavbar from '@/components/mobile-navbar/mobile-navbar';
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
        <MobileNavbar />
        <Infobar pathName="Home" pathurl="/" />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
