'use server';

import { client } from '@/lib/prisma';
import { createUserProps } from '@/lib/types';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export type userProps = {
  clerkId: string;
  email?: string;
  fullname: string;
  imageUrl: string;
};

export async function createUser({
  clerkId,
  email,
  fullname,
  imageUrl,
}: createUserProps) {
  try {
    const user = await client.user.create({
      data: {
        slug: slugify(fullname!, {
          replacement: '-',
          lower: true,
          trim: true,
        }),
        clerkId,
        email,
        fullname,
        imageUrl,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser({
  clerkId,
  fullname,
  imageUrl,
}: createUserProps) {
  try {
    const updatedUser = await client.user.update({
      where: {
        clerkId: clerkId as string,
      },
      data: {
        slug: slugify(fullname!, {
          replacement: '-',
          lower: true,
          trim: true,
        }),
        fullname,
        imageUrl,
      },
    });

    revalidatePath('/profile');
    return updateUser;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const deletedUser = await client.user.delete({
      where: {
        clerkId,
      },
    });

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

export const updateUserImage = async (imgUrl: string) => {
  try {
    const user = await currentUser();
    const updatedUser = await clerkClient.users.updateUser(user?.id!, {
      publicMetadata: {
        imageUrl: imgUrl,
      },
    });

    revalidatePath('/profile');
    return updateUser;
  } catch (error) {
    throw error;
  }
};

export const getUserByClerkId = async () => {
  try {
    const clerkUser = await currentUser();
    const user = await client.user.findUnique({
      where: {
        clerkId: clerkUser?.id as string,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserDetails = async (
  firstName: string,
  lastName: string,
  bio: string
) => {
  const clerkUser = await currentUser();
  const user = await getUserByClerkId();
  try {
    const updatedClerkUser = await clerkClient.users.updateUser(
      clerkUser?.id!,
      {
        firstName: firstName,
        lastName: lastName,
      }
    );

    const updatedUser = await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        bio,
      },
    });

    revalidatePath('/profile');

    return updatedUser;
  } catch (error) {}
};
