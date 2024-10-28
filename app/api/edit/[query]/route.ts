import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRISMA_CALLS } from "@/utils/prismaCalls";
import { UpdateAuthorClientSide } from "@/app/authors/add/types";

export async function GET(req: Request, params: { params: { query: string } }) {
  const authorName = params.params.query;

  const author = await prisma.author.findUnique({
    where: {
      englishName: authorName,
    },

    include: PRISMA_CALLS.authors.include,
  });

  return NextResponse.json(author);
}

export async function POST(req: Request, params: { params: { query: string } }) {
  const data: UpdateAuthorClientSide = await req.json();

  const authorName = params.params.query;

  const languages = data.translations.map((translation) => {
    return {
      where: {
        id: translation.translationId,
      },

      data: {
        name: !translation.name || translation.name === "" ? data.englishName : translation.name,
        description: translation.description,
        bio: translation.bio,
        isOriginal: translation.isOriginal,
      },
    };
  });

  const author = await prisma.author.update({
    where: {
      englishName: authorName,
    },

    data: {
      translations: {
        updateMany: languages,
      },
    },
  });

  return NextResponse.json(author);
}
