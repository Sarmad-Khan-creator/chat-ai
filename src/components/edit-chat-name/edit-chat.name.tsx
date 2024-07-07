'use client';

import { editChatName } from '@/actions/chat.action';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  chatId: string;
  href: string;
  name: string;
};

const EditChatName = ({ chatId, href, name }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(name);
  const pathname = usePathname();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      try {
        const chat = await editChatName(chatId, value, href);
        setIsEditing(false);
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <div
      onDoubleClick={() => {
        setIsEditing(true);
      }}
      className='w-full'
    >
      {isEditing ? (
        <input
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="rename chat"
          className="border border-gray-400 px-2"
        />
      ) : (
        <Link
          href={href}
          className={cn(
            pathname.includes(chatId) && 'bg-gray-500 text-white',
            'p-1 rounded-sm w-full'
          )}
        >
          {name}
        </Link>
      )}
    </div>
  );
};

export default EditChatName;
