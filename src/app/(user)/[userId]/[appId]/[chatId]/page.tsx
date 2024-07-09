import { getAppById } from '@/actions/app.action';
import { getChatById } from '@/actions/chat.action';
import ChatArea from '@/components/chat/chat';
import React from 'react';

type Props = {
  params: {
    userId: string;
    appId: string;
    chatId: string;
  };
};

const Chat = async ({ params: { userId, appId, chatId } }: Props) => {
  const app = await getAppById(appId);
  const chat = await getChatById(chatId);

  return <ChatArea app={app!} chat={chat!} />;
};

export default Chat;
