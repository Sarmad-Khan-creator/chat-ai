"use server";

import { client } from "@/lib/prisma";
import { createUserProps } from "@/lib/types";
import slugify from "slugify";

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
          replacement: "-",
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
          replacement: "-",
          lower: true,
          trim: true,
        }),
        fullname,
        imageUrl,
      },
    });

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
