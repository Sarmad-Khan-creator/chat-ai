import { client } from '@/lib/prisma';
import { App } from '@prisma/client';
import React from 'react';
import DeleteApp from './delete-app';

type Props = {
  app: App;
};

const AppDetails = async ({ app }: Props) => {
  const chats = await client.chat.findMany({
    where: {
      appId: app.id,
    },
  });
  return (
    <div className="flex flex-row justify-between items-center w-auto h-[100px] rounded-md shadow-xl bg-gray-200 px-5">
      <div className="flex flex-col gap-5">
        <p className="font-semibold text-lg">{app.title}</p>
        <p>no of chats: {chats.length}</p>
      </div>
      <DeleteApp appId={app?.id} index={app?.index} />
    </div>
  );
};

export default AppDetails;
