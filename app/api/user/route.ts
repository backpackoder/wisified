import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Utils
import { authOptions } from "@/utils/authOptions";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;

    const user = currentUserEmail
      ? await prisma.user.findUnique({
          where: { email: currentUserEmail },
        })
      : null;

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "Failed to fetch user data." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email;
    if (!currentUserEmail) throw new Error("User not authenticated");

    const data = await req.json();
    data.age = data.age && Number(data.age);

    const user = await prisma.user.update({
      where: { email: currentUserEmail },
      data,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json({ error: "Failed to update user data." }, { status: 500 });
  }
}
