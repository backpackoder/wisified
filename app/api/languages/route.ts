import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request) {
  const language = await prisma.language.findMany({
    include: PRISMA_CALLS.language.include,

    orderBy: {
      code: "asc",
    },
  });

  const count = language.length;

  const data = {
    count,
    data: language,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const language = await prisma.language.create({
    data,
  });

  return NextResponse.json(language);
}
