'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LogOutIcon, Plus, Settings } from 'lucide-react';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import { Chat } from '@prisma/client';
import { createChat, updateChatName } from '@/actions/chat.action';
import EditChatName from '../edit-chat-name/edit-chat.name';

type Props = {
  userId: string;
  appId: string;
  chats: Chat[];
};

const ChatSidebar = ({ userId, appId, chats }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        const chat = await createChat(
          appId,
          inputValue,
          `/${userId}/${appId}`
        );
        setIsEditing(false);
      } catch (error) {
        throw error;
      }
    }
  };
  const { signOut } = useClerk();
  return (
    <section className="flex flex-col h-screen sticky justify-between px-3 py-5 shadow-lg">
      <div className="flex flex-col gap-16">
        <div className="flex items-center gap-1 w-[250px]">
          <div className="relative w-[100px] h-[40px]">
            <Image src="/assets/logo.svg" alt="logo" fill />
          </div>
          <h2 className="text-[#E0A75E] font-bold text-3xl">CHAT-AI</h2>
        </div>

        <div className="flex flex-col gap-5 px-3">
          <div className="w-full flex justify-between">
            <p className="font-semibold">New Chat</p>
            <Plus
              onClick={() => {
                setIsEditing(true);
              }}
              className="cursor-pointer"
            />
          </div>
          {isEditing && (
            <input
              type="text"
              value={inputValue}
              placeholder="chat name"
              className="border border-gray-400 px-2"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}
          <div className="overflow-y-auto h-[60vh] max-h-[60vh] w-full flex flex-col gap-2">
            {chats.map((chat) => {
              return (
                <EditChatName
                  key={chat.id}
                  chatId={chat.id}
                  name={chat.name}
                  href={`/${userId}/${appId}/${chat.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href={`/${userId}/${appId}/settings`}
          className="w-[200px] py-2 px-3 flex items-center justify-start gap-2 rounded-sm bg-transparent text-muted-foreground hover:bg-black/10"
        >
          <Settings />
          Settings
        </Link>
        <Button
          className="w-[200px] flex items-center justify-start gap-2 rounded-sm bg-transparent text-muted-foreground hover:bg-black/10"
          onClick={() => {
            signOut({ redirectUrl: '/' });
          }}
        >
          <LogOutIcon />
          Logout
        </Button>
      </div>
    </section>
  );
};

export default ChatSidebar;
