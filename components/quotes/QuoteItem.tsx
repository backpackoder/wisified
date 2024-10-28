import Link from "next/link";
import { useEffect, useState } from "react";

// Components
import { QuoteContainer } from "./QuoteContainer";
import { QuoteIcons } from "./QuoteIcons";
import { AuthorImg } from "./AuthorImg";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { QuoteItemProps } from "@/types/props";

export function QuoteItem({ quote }: QuoteItemProps) {
  return quote ? (
    <QuoteContainer>
      <QuoteIcons quote={quote} />

      <Link href={ROUTES.QUOTE(quote.id)} className="cursor-pointer hover:text-[#a3a3a3]">
        {`- "${quote.translations[0].content}."`}
      </Link>

      <AuthorImg authorName={quote.author.englishName} image={{ width: 100 }} />

      <Link
        href={ROUTES.AUTHOR(quote.author.englishName)}
        className="cursor-pointer hover:text-[#a3a3a3]"
      >
        - {quote.author.englishName}
      </Link>

      <p>
        Added by{" "}
        <Link
          href={ROUTES.USER(quote?.createdById)}
          className="font-semibold italic duration-200 hover:text-gray-500"
        >
          {quote.createdBy.name ?? quote.createdBy.username}
        </Link>
      </p>

      <div className="flex flex-wrap gap-2">
        {quote.tags.map((tag) => {
          return (
            <Link
              key={tag.id}
              href={`${ROUTES.QUOTES}?tag=${tag.englishName}`}
              className="cursor-pointer bg-blue-200 p-2 rounded-md duration-200 hover:bg-blue-300"
            >
              {tag.englishName}
            </Link>
          );
        })}
      </div>
    </QuoteContainer>
  ) : null;
}
