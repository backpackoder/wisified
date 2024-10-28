import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";
import { ContentTranslation } from "../../../add/page";

export async function GET(req: Request, params: { params: { query: string[] } }) {
  const query = params.params.query;

  const quote = await prisma.quote.findFirst({
    where: {
      translations: {
        some: {
          content: {
            contains: query[0],
          },
        },
      },
    },
    include: PRISMA_CALLS.quotes.include,
  });

  return NextResponse.json(quote);
}

export async function POST(req: Request) {
  const data = await req.json();

  const author = await prisma.author.create({
    data,
  });

  return NextResponse.json(author);
}
