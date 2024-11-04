import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Commons
import { FILTERS } from "@/commons/commons";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function GET(req: Request, { params }: { params: { queries: string[] } }) {
  function defaultChecker(value: string) {
    return value === FILTERS.DEFAULT ? "" : value;
  }

  const page = defaultChecker(params.queries[0]);
  const limit = defaultChecker(params.queries[1]);
  const sortBy = defaultChecker(params.queries[2]);
  const order = defaultChecker(params.queries[3]) as "asc" | "desc";
  // const language = defaultChecker(params.queries[4]);

  // const where = language
  //   ? {
  //       translations: {
  //         some: {
  //           language: {
  //             code: language,
  //           },
  //         },
  //       },
  //     }
  //   : undefined;

  try {
    const totalCount = await prisma.author.findMany({
      include: PRISMA_CALLS.author.include,
    });

    const authors = await prisma.author.findMany({
      include: PRISMA_CALLS.author.include,
      orderBy: sortBy === "quotes" ? { quotes: { _count: order } } : { [sortBy]: order },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const countOnActualPage = authors.length;

    const data = {
      totalCount: totalCount.length,
      countOnActualPage,
      totalPages: Math.ceil(totalCount.length / Number(limit)),
      data: authors,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching authors:", error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
