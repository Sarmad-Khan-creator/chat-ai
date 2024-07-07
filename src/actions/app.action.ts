'use server';

import { pc } from '@/lib/pinecone';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

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

export const getAppById = async (appId: string) => {
  try {
    const app = await client.app.findFirst({
      where: {
        id: appId,
      },
    });

    return app;
  } catch (error) {
    throw error;
  }
};

export const editApp = async (
  appId: string,
  name: string,
  template: string
) => {
  const clerkUser = await currentUser();

  if (!clerkUser) return;
  try {
    const user = await client.user.findFirst({
      where: {
        clerkId: clerkUser?.id,
      },
    });
    const app = await client.app.update({
      where: {
        id: appId,
      },
      data: {
        title: name,
        template,
      },
    });

    revalidatePath(`/${user?.id}/${appId}`);
    return app;
  } catch (error) {
    throw error;
  }
};

export const deleteApp = async (appId: string, index: string) => {
  try {
    const deletedApp = await client.app.delete({
      where: {
        id: appId,
      },
    });

    const removeIndex = pc.deleteIndex(index)

    revalidatePath('/profile');
    return deletedApp;
  } catch (error) {
    throw error;
  }
};
