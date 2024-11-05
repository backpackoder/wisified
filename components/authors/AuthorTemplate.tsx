import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Components
import { AuthorImg } from "../quotes/quote/items/AuthorImg";
import { QuoteItem } from "../quotes/quote";

// Utils
import { getWikiData } from "@/utils/getWikiData";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { FullAuthor } from "@/types/prisma";
import { WikiAuthorDatas } from "@/app/authors/[slug]/types";
import { PRISMA_CALLS } from "@/utils/prismaCalls";

type AuthorTemplateProps = {
  author: FullAuthor;
  wikiData: WikiAuthorDatas;
};

export async function AuthorTemplate({ author, wikiData }: AuthorTemplateProps) {
  const dataFromWiki = await getWikiData(author.englishName);

  return (
    author && (
      <>
        <h2 className="text-5xl">{author.englishName}</h2>

        <AuthorImg picture={author.picture} authorName={author.englishName} />

        <h3 className="text-lg">{dataFromWiki?.description}</h3>

        <p>
          {dataFromWiki?.extract}{" "}
          <a
            href={wikiData?.wikipediaLink?.desktop}
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
          >
            <small>Read more on Wikipedia</small>
          </a>
        </p>

        <Link
          href={{
            pathname: ROUTES.AUTHOR_EDIT(author.englishName),
            // query: `author=${author?.englishName}&id=${author?.id}`,
          }}
          className="bg-blue-500 text-white p-2 rounded-lg duration-300 hover:bg-blue-700"
        >
          Edit
        </Link>

        {
          <>
            {/* @ts-expect-error Async Server Component */}
            <QuotesOfTheAuthor author={author} authorName={author.englishName} />
          </>
        }
      </>
    )
  );
}

type QuotesOfTheAuthorProps = {
  author: FullAuthor;
  authorName: string;
};

async function QuotesOfTheAuthor({ author, authorName }: QuotesOfTheAuthorProps) {
  const quotes = await prisma.quote.findMany({
    where: {
      authorId: author.id,
    },

    include: PRISMA_CALLS.quote.include,
  });

  return (
    author &&
    quotes && (
      <div className="flex flex-col items-start gap-4 w-full">
        <h3 className=" text-xl">
          {author.quotes.length > 0
            ? `${author.quotes.length} ${
                author.quotes.length === 1 ? "quote" : "quotes"
              } from ${authorName}:`
            : `No quotes found from ${authorName}`}
        </h3>

        <Link
          href={{
            pathname: ROUTES.QUOTE_ADD,
            query: { author: authorName },
          }}
          className="bg-blue-500 text-white p-2 rounded-lg duration-300 hover:bg-blue-700"
        >
          Add a quote
        </Link>

        {quotes.map((quote, index) => {
          return (
            <>
              <QuoteItem key={index} quote={quote} />
            </>
          );
        })}
      </div>
    )
  );
}
