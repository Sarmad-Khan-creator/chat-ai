"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getChat = async (appId: string) => {
  try {
    const chat = await client.chat.findFirst({
      where: {
        appId,
      },
    });

    return chat;
  } catch (error) {
    console.log(error);
  }
};

export const getChats = async (appId: string) => {
  const user = await currentUser();
  if (!user) {
    return;
  }
  try {
    const chats = await client.chat.findMany({
      where: {
        appId,
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return chats;
  } catch (error) {
    throw error;
  }
};

export const createChat = async (appId: string, name: string, path: string) => {
  try {
    const chat = await client.chat.create({
      data: {
        appId,
        name,
      },
    });

    revalidatePath(path);

    return chat;
  } catch (error) {
    throw error;
  }
};

export const updateChatName = async (
  chatId: string,
  name: string,
  path: string
) => {
  try {
    const chat = await client.chat.update({
      where: {
        id: chatId,
      },
      data: {
        name,
      },
    });

    revalidatePath(path);

    return chat;
  } catch (error) {
    throw error;
  }
};
