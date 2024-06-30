import { getChats } from "@/actions/chat.action";
import ChatSidebar from "@/components/sidebar/chat-sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    userId: string;
    appId: string;
    chatId: string;
  };
};

const UserLayout = async ({
  children,
  params: { userId, appId, chatId },
}: Props) => {
  const chats = await getChats(appId);
  return (
    <div className="flex h-screen gap-5">
      <ChatSidebar
        userId={userId}
        appId={appId}
        chatId={chatId}
        chats={chats!}
      />
      {children}
    </div>
  );
};

export default UserLayout;
