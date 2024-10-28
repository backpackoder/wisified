import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateQuoteClientSide } from "../../add/types";

export async function POST(req: Request) {
  const data: CreateQuoteClientSide = await req.json();

  const languages = data.translations.map((translation) => {
    return {
      language: {
        connect: {
          code: translation.language,
        },
      },

      content: translation.content,
      isOriginal: translation.isOriginal,
    };
  });

  const tagIds = data.tags.map((tagId) => {
    return {
      id: tagId,
    };
  });

  const quote = await prisma.quote.create({
    data: {
      createdBy: { connect: { id: data.creatorId } },
      author: { connect: { id: data.authorId } },
      translations: {
        create: languages,
      },
      tags: {
        connect: tagIds,
      },
    },
  });

  return NextResponse.json(quote);
}
