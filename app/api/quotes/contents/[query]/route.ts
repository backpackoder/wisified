import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request, params: { params: { query: string } }) {
  const count = await prisma.quote.count();

  const quotes = await prisma.quote.findMany({
    where: {
      translations: {
        some: {
          content: {
            contains: params.params.query,
            mode: "insensitive",
          },
        },
      },
    },
    include: PRISMA_CALLS.quotes.include,
  });

  const data = {
    count,
    data: quotes,
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
