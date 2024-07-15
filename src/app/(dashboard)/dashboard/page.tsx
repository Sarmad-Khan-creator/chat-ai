import { getAllApps } from "@/actions/app.action";
import { getChat } from "@/actions/chat.action";
import AddApp from "@/components/add-app/add-app";
import { client } from "@/lib/prisma";
import { App } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Dashboard = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/dashboard`, {
    method: "GET",
    next: {
      tags: ['allApps']
    }
  })

  const apps = await response.json();
  return (
    <main className="px-10 flex flex-row flex-wrap gap-x-4 gap-y-6 max-sm:flex-col max-sm:items-center">
      <AddApp />
      {apps.map(async (app: App) => {
        const user = await client.user.findFirst({
          where: {
            id: app.userId,
          },
        });

        const chat = await getChat(app.id);
        return (
          <Link
            href={`/${user?.id}/${app.id}/${chat?.id}`}
            key={app.id}
            className="w-[150px] h-[150px] rounded-md flex items-center justify-center font-bold text-black bg-gray-200 hover:bg-gray-300 max-sm:w-[250px] max-sm:h-[250px]"
          >
            {app.title}
          </Link>
        );
      })}
    </main>
  );
};

export default Dashboard;
