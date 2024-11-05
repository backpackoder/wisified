import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request, params: { params: { query: string } }) {
  const authorName = params.params.query;

  const author = await prisma.author.findFirst({
    where: {
      englishName: {
        equals: authorName,
      },
    },

    include: PRISMA_CALLS.author.include,
  });

  return NextResponse.json(author);
}

export async function POST(req: Request) {
  const data = await req.json();

  const authors = await prisma.author.create({
    data,
  });

  return NextResponse.json(authors);
}
