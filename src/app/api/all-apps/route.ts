import { client } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    console.log("CLERK ID: ", userId);
    const loggedInUser = await client.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    const apps = await client.app.findMany({
      where: {
        userId: loggedInUser?.id,
      },
    });

    return NextResponse.json({ apps });
  } catch (error) {
    throw error;
  }
}
