import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ success: false });
  }

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

    return NextResponse.json({ apps });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
