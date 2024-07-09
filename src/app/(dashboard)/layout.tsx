import Infobar from '@/components/infobar/infobar';
import MobileNavbar from '@/components/mobile-navbar/mobile-navbar';
import Sidebar from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { SidebarItemProps, sidebarItem } from '@/constants/sidebar';
import Link from 'next/link';
import React from 'react';
import MobileSheetItems from './_compoenents/mobile-sheet-items';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-row">
      <Sidebar className="max-sm:hidden" />
      <div className="flex flex-col gap-10 w-full">
        <MobileNavbar>
          <MobileSheetItems />
        </MobileNavbar>
        <Infobar pathName="Home" pathurl="/" />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
