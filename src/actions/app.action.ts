"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getAllApps = async () => {
  const user = await currentUser();

  try {
    const loggedInUser = await client.user.findFirst({
      where: {
        clerkId: user?.id,
      },
    });

    const apps = await client.app.findMany({
      where: {
        userId: loggedInUser?.id,
      },
    });

    return apps;
  } catch (error) {
    throw error;
  }
};
