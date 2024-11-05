"use client";

import Link from "next/link";

// Components
import { QuoteContainer } from "./QuoteContainer";
import { Icons } from "./items/Icons";
import { Content } from "./items/content";
import { AuthorImg } from "./items/AuthorImg";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { QuoteItemProps } from "@/types/props";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/context/AppContext";

// Utils
import { getTranslatedQuote } from "@/utils/getTranslatedQuote";
import { Iso } from "@/utils/languages";
import { API, FullAuthor } from "@/types/prisma";

export function QuoteItem({ quote }: QuoteItemProps) {
  const { language } = useContext(AppContext);
  const [languageQuote, setLanguageQuote] = useState(language ?? "en");
  const [authorPicture, setAuthorPicture] = useState<API<string>>(null);

  const translation = getTranslatedQuote({
    actualLanguage: languageQuote === language ? language : languageQuote,
    translations: quote.translations,
  });

  useEffect(() => {
    async function fetchAuthorPicture() {
      const res = await fetch(`/api/author/${quote.author.englishName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data: API<FullAuthor>) => setAuthorPicture(data?.picture));
    }

    fetchAuthorPicture();
  }, [quote.author]);

  return quote ? (
    <QuoteContainer>
      <Icons
        quote={quote}
        language={translation.language.code as Iso}
        setLanguageQuote={setLanguageQuote}
      />

      <Content translation={translation} />

      <AuthorImg
        picture={authorPicture}
        authorName={quote.author.englishName}
        image={{ width: 100 }}
      />

      <Link
        href={ROUTES.AUTHOR(quote.author.englishName)}
        className="cursor-pointer hover:text-[#a3a3a3]"
      >
        - {quote.author.englishName}
      </Link>

      <p>
        Added by{" "}
        {quote?.createdBy && quote?.createdById ? (
          <Link
            href={ROUTES.USER(quote?.createdById)}
            className="font-semibold italic duration-200 hover:text-gray-500"
          >
            {quote.createdBy.username}
          </Link>
        ) : (
          "Deleted account"
        )}
      </p>

      <div className="flex flex-wrap gap-2">
        {quote.tags.map((tag) => {
          return (
            <Link
              key={tag.id}
              href={`${ROUTES.QUOTES}?tag=${tag.englishName}`}
              className="cursor-pointer bg-blue-200 text-xs p-1 rounded-md duration-200 hover:bg-blue-300"
            >
              {tag.englishName}
            </Link>
          );
        })}
      </div>
    </QuoteContainer>
  ) : null;
}
