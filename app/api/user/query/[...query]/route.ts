import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { query: string } }) {
  const userId = params.params.query;

  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
      })
    : null;

  return NextResponse.json(user);
}
