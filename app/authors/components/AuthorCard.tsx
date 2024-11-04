"use client";

import Link from "next/link";

// Types
import { PrismaAuthor } from "@/types/prisma";

// Utils
import { languageIndexFinder } from "@/utils/languageIndexFinder";

// Commons
import { ROUTES } from "@/commons/commons";

// Components
import { AuthorImg } from "@/components/quotes/quote/items/AuthorImg";
import { useEffect, useState } from "react";
import { getWikiData } from "@/utils/getWikiData";

type AuthorCardProps = {
  author: PrismaAuthor;
  language: string;
};

export function AuthorCard({ author, language }: AuthorCardProps) {
  const englishName = author.englishName;
  const [description, setDescription] = useState<string>("");

  // const findLanguageIndex = languageIndexFinder({
  //   data: author.translations,
  //   values: ["language", "code"],
  //   search: language,
  // });

  // const name = findLanguageIndex === -1 ? englishName : author.translations[findLanguageIndex].name;

  useEffect(() => {
    async function getDescriptionFromWiki() {
      await getWikiData(englishName).then((data) => setDescription(data?.description ?? ""));
    }

    getDescriptionFromWiki();
  }, [englishName]);

  return (
    <div className="group flex flex-col items-center gap-1 max-w-[200px] bg-blue-200 px-2 py-4 text-center rounded-lg duration-300 hover:bg-blue-300">
      <Link href={ROUTES.AUTHOR(englishName)} className="text-2xl">
        {englishName}
      </Link>

      <small>
        ({author.quotes.length} {author.quotes.length === 1 ? "quote" : "quotes"})
      </small>

      <div className="flex items-center justify-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
        <AuthorImg authorName={englishName} />
      </div>

      <h3 className="leading-tight">
        <small>{description}</small>
      </h3>

      <Link
        href={ROUTES.AUTHOR(englishName)}
        className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
      >
        VIEW INFOS
      </Link>
    </div>
  );
}
