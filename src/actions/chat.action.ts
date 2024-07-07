'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { Chat } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export const getChat = async (appId: string) => {
  try {
    const chat = await client.chat.findFirst({
      where: {
        appId: appId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return chat;
  } catch (error) {
    console.log(error);
  }
};

export const getChatById = async (chatId: string) => {
  try {
    const chat = await client.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    return chat;
  } catch (error) {
    throw error;
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
        createdAt: 'desc',
      },
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
        slug: slugify(name, {
          replacement: '-',
          lower: true,
        }),
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

export const editChatName = async (
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
        name: name,
        slug: slugify(name, {
          replacement: '-',
          lower: true,
        }),
      },
    });

    revalidatePath(path, 'layout');

    return chat;
  } catch (error) {
    throw error;
  }
};

export const updateChatHistory = async (
  chatId: string,
  humanQuestion: string,
  AIAnswer: string
) => {
  const chat = await getChatById(chatId);
  try {
    const updatedChat = await client.chat.update({
      where: {
        id: chatId,
      },
      data: {
        history: [...chat?.history!, humanQuestion, AIAnswer],
      },
    });

    return updatedChat;
  } catch (error) {
    throw error;
  }
};
