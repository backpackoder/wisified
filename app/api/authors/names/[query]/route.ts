import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request, params: { params: { query: string } }) {
  const name = params.params.query;

  const authors = await prisma.author.findMany({
    where: {
      OR: [
        {
          englishName: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          translations: {
            some: {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },

    include: PRISMA_CALLS.author.include,
  });

  const count = authors.length;

  const data = {
    count,
    data: authors,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const author = await prisma.author.create({
    data,
  });

  return NextResponse.json(author);
}
