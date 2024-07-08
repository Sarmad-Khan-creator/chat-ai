"use client";
import { SidebarItemProps, sidebarItem } from '@/constants/sidebar';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useClerk } from '@clerk/nextjs';

const Sidebar = () => {
  const { signOut } = useClerk()
  return (
    <section className="flex flex-col h-screen sticky gap-16 px-3 py-5 shadow-lg max-sm:hidden">
      <div className="flex items-center gap-1 w-[250px]">
        <div className="relative w-[100px] h-[40px]">
          <Image src="/assets/logo.svg" alt="logo" fill />
        </div>
        <h2 className="text-[#E0A75E] font-bold text-3xl">CHAT-AI</h2>
      </div>

      <div className="flex flex-col gap-5">
        {sidebarItem.map((item: SidebarItemProps) => {
          return (
            <Link
              href={item.href}
              key={item.id}
              className="flex flex-row items-center gap-2 rounded-sm pl-2 w-[200px] py-3 bg-[#E0A75E] hover:bg-[#F9D689] text-white"
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="justify-self-end">
        <Button className="w-[200px] flex items-center mt-[200px] justify-start gap-2 rounded-sm bg-transparent text-muted-foreground hover:bg-black/10" onClick={() => { signOut({ redirectUrl: "/" }) }}>
          <LogOutIcon />
          Logout
        </Button>
      </div>
    </section>
  );
};

export default Sidebar;
