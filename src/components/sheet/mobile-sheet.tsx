'use client';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogOutIcon, MenuIcon } from 'lucide-react';
import Sidebar from '../sidebar/sidebar';
import Image from 'next/image';
import { SidebarItemProps, sidebarItem } from '@/constants/sidebar';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useClerk } from '@clerk/nextjs';

const MobileSheet = ({ children }: { children: React.ReactNode }) => {
  const { signOut } = useClerk();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <div className="flex flex-row gap-3">
                <Image
                  src="/assets/logo.svg"
                  alt="logo"
                  width={40}
                  height={40}
                />
                <h2 className="text-xl text-primary-orange_main">CHAT-AI</h2>
              </div>
            </SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSheet;
