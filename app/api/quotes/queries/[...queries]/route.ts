import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Commons
import { FILTERS } from "@/commons/commons";

export async function GET(req: Request, { params }: { params: { queries: string[] } }) {
  function defaultChecker(value: string) {
    return value === FILTERS.DEFAULT ? "" : value;
  }

  const page = defaultChecker(params.queries[0]);
  const limit = defaultChecker(params.queries[1]);
  const sortBy = defaultChecker(params.queries[2]);
  const order = defaultChecker(params.queries[3]);
  const language = defaultChecker(params.queries[4]);
  const tag = defaultChecker(params.queries[5]);
  const author = defaultChecker(params.queries[6]);

  const where = language
    ? {
        translations: {
          some: {
            language: {
              code: {
                startsWith: language,
                endsWith: language,
              },
            },
          },
        },

        tags:
          tag.length > 0
            ? {
                some: {
                  translations: {
                    some: {
                      name: {
                        startsWith: tag,
                        endsWith: tag,
                      },
                    },
                  },
                },
              }
            : undefined,

        author: {
          translations: {
            some: {
              name: {
                startsWith: author,
                endsWith: author,
              },
            },
          },
        },
      }
    : undefined;

  const include = {
    createdBy: true,
    translations: {
      where: {
        language: {
          code: {
            startsWith: language,
            endsWith: language,
          },
        },
      },
      include: {
        language: true,
      },
    },
    tags: {
      include: {
        translations: {
          where: {
            name: {
              startsWith: tag,
              endsWith: tag,
            },
          },
          include: {
            language: true,
          },
        },
      },
    },
    author: {
      include: {
        translations: true,
      },
    },
    comments: {
      include: {
        user: true,
        likes: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
                likes: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        replies: {
          include: {
            user: true,
            likes: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
  };

  const totalCount = await prisma.quote.findMany({
    where,

    include,
  });

  const quotes = await prisma.quote.findMany({
    where,

    include,

    orderBy: {
      [sortBy]: order,
    },

    skip: (Number(page) - 1) * Number(limit),

    take: Number(limit),
  });

  const countOnActualPage = quotes.length;

  const data = {
    totalCount: totalCount.length,
    countOnActualPage,
    totalPages: Math.ceil(totalCount.length / Number(limit)),
    data: quotes,
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
