import { client } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = auth();

  try {
    const loggedInUser = await client.user.findFirst({
      where: {
        clerkId: user?.userId,
      },
    });

    const apps = await client.app.findMany({
      where: {
        userId: loggedInUser?.id,
      },
    });

    return NextResponse.json({ apps });
  } catch (error) {
    throw error
  }
}
