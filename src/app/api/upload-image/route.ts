import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

export async function POST(req: NextRequest) {
  const user = await currentUser();
  const data = await req.formData();
  const file: File = data.get('file') as unknown as File;

  try {
    const updateUser = clerkClient.users.updateUserProfileImage(user?.id!, {
      file: file,
    });

    revalidatePath('/profile');
    return NextResponse.json({ user: updateUser });
  } catch (error) {
    throw error
  }
}
