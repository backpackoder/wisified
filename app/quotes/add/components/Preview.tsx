"use client";

// Components
import { PreviewWrapper } from "@/components/add/PreviewWrapper";
import { QuoteContainer } from "@/components/quotes/quote/QuoteContainer";
import { AuthorImg } from "@/components/quotes/quote/items/AuthorImg";
import { State } from "../page";
import { FullLanguage } from "@/types/prisma";
import { Author } from "@prisma/client";

export type PreviewProps = {
  author: Author;
  username: string;
  state: State;
  translations: FullLanguage[];
};

export function Preview({ author, username, state, translations }: PreviewProps) {
  const authorName = author && author?.englishName ? author.englishName : "Unknown author";

  const contentIndexFinder = translations?.findIndex(
    (translation) => translation.code === state.language
  );

  return (
    <PreviewWrapper>
      <QuoteContainer>
        <p>{`- "${state.contents[contentIndexFinder]?.content}."`}</p>

        <AuthorImg authorName={author.englishName} image={{ width: 100 }} />

        <p>- {authorName}</p>

        <p className="text-xs italic">
          Created by <span className="font-bold">@{username}</span>
        </p>
      </QuoteContainer>
    </PreviewWrapper>
  );
}
