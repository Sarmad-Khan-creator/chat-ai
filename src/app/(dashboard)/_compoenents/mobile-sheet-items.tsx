'use client';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { SidebarItemProps, sidebarItem } from '@/constants/sidebar';
import { useClerk } from '@clerk/nextjs';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {};

const MobileSheetItems = (props: Props) => {
  const { signOut } = useClerk();
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-5 items-start mt-14">
        {sidebarItem.map((item: SidebarItemProps) => {
          return (
            <SheetClose key={item.id} asChild>
              <Link
                href={item.href}
                className="flex flex-row items-center gap-2 rounded-sm pl-2 w-[220px] py-3 mx-auto bg-[#E0A75E] hover:bg-[#F9D689] text-white"
              >
                {item.icon}
                {item.title}
              </Link>
            </SheetClose>
          );
        })}
      </div>
      <div className="">
        <Button
          className="w-[220px] flex items-center mt-[300px] mx-auto justify-start gap-2 rounded-sm bg-transparent text-muted-foreground hover:bg-black/10"
          onClick={() => {
            signOut({ redirectUrl: '/' });
          }}
        >
          <LogOutIcon />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MobileSheetItems;
