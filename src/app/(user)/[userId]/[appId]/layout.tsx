import { getChats } from '@/actions/chat.action';
import Infobar from '@/components/infobar/infobar';
import ChatSidebar from '@/components/sidebar/chat-sidebar';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: {
    userId: string;
    appId: string;
  };
};

const UserLayout = async ({
  children,
  params: { userId, appId },
}: Props) => {
  const chats = await getChats(appId);
  return (
    <div className="flex h-screen gap-5">
      <ChatSidebar
        userId={userId}
        appId={appId}
        chats={chats!}
      />
      <div className="flex flex-col gap-10 w-full">
        <Infobar pathName="Dashboard" pathurl="/dashboard" />
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
