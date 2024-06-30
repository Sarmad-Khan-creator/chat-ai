import React from "react";

type Props = {
  params: {
    userId: string;
    appId: string;
    chatId: string;
  };
};

const Chat = async ({ params: { userId, appId, chatId } }: Props) => {
  return (
    <div>
      <h1>Chat Screen</h1>
    </div>
  );
};

export default Chat;
