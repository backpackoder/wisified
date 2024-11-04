import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateAuthorClientSide } from "../../add/types";

export async function POST(req: Request) {
  const data: CreateAuthorClientSide = await req.json();

  const languages = data.translations.map((translation) => {
    return {
      language: {
        connect: {
          code: translation.language,
        },
      },

      name: translation.name === "" ? data.englishName : translation.name,
      bio: translation.bio,
      description: translation.description,
      isOriginal: translation.isOriginal,
    };
  });

  const authors = await prisma.author.create({
    data: {
      createdBy: { connect: { id: data.creatorId } },
      englishName: data.englishName,
      translations: {
        create: languages,
      },
    },
  });

  return NextResponse.json(authors);
}
