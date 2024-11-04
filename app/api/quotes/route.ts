import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request) {
  const quote = await prisma.quote.findMany({
    include: PRISMA_CALLS.quote.include,
  });

  const count = quote.length;

  const data = {
    count,
    data: quote,
  };

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const quote = await prisma.quote.create({
    data,
  });

  return NextResponse.json(quote);
}
