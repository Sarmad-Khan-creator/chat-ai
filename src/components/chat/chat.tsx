'use client';
import { retrieval } from '@/lib/retrieval';
import { App, Chat } from '@prisma/client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { updateChatHistory } from '@/actions/chat.action';
import { cn } from './../../lib/utils';

type Props = {
  app: App;
  chat: Chat;
};

const ChatArea = ({ app, chat }: Props) => {
  const [value, setValue] = useState<string>('');
  const [conversation, setConversation] = useState<string[]>(
    chat?.history || []
  );
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (value === '') {
        setError('Please enter a valid prompt');
        return;
      }
      setConversation((prev) => [...prev, value]);

      setTimeout(() => {
        setValue('');
      }, 100);
      setLoading(true);
      try {
        const response = await retrieval(
          app?.index!,
          app?.template,
          conversation,
          value
        );
        setConversation((prev) => [...prev, response!]);
        setLoading(false);

        if (value && response) {
          await updateChatHistory(chat.id, value, response!);
        }
      } catch (e) {
        console.log(e)
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-between h-screen max-h-screen">
      <div className="w-full max-h-[70vh] overflow-y-auto px-16 flex flex-col gap-4">
        {conversation.map((conv, index) => {
          return (
            <div
              key={index}
              className={cn(
                'max-w-[700px] w-fit p-2 rounded-md',
                index % 2 === 0 && 'self-end bg-gray-600 text-white',
                index % 2 !== 0 && 'self-start bg-gray-400 text-white'
              )}
            >
              {conv}
            </div>
          );
        })}
        {loading && (
          <div className="w-fit p-2 rounded-md bg-gray-400 text-white self-start">
            Loading....
          </div>
        )}
      </div>
      <div className="px-48 mb-2 sticky mt-3">
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <Input
          type="text"
          placeholder="Enter your prompt"
          className={`${
            error && 'border-red-500 border'
          } border border-gray-800`}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatArea;
