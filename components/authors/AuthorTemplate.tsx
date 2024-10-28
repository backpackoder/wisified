import { getServerSession } from "next-auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Components
import { AuthorImg } from "../quotes/AuthorImg";
import { QuoteItem } from "../quotes/QuoteItem";

// Utils
import { authOptions } from "@/utils/authOptions";
import { getWikiData } from "@/utils/getWikiData";
import { languageIndexFinder } from "@/utils/languageIndexFinder";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { WikiAuthorDatas } from "@/app/authors/[slug]/page";
import { User } from "@prisma/client";
import { API, PrismaAuthor } from "@/types/prisma";

type AuthorTemplateProps = {
  slugWithSpaces: string;
  wikiData: WikiAuthorDatas;
};

export async function AuthorTemplate({ slugWithSpaces, wikiData }: AuthorTemplateProps) {
  const session = await getServerSession(authOptions);
  const dataFromWiki = await getWikiData(slugWithSpaces);

  const currentUserId = await prisma.user
    .findUnique({ where: { email: session?.user?.email ?? "" } })
    .then((user) => user?.id ?? "");

  const user: API<User> = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });

  const author = await prisma.author.findFirst({
    where: {
      englishName: slugWithSpaces,
    },

    include: {
      createdBy: true,
      quotes: {
        include: {
          createdBy: true,
          author: true,
          translations: true,
          tags: true,
        },
      },
      translations: {
        select: {
          name: true,
          description: true,
          bio: true,
          wikipediaLink: true,

          language: {
            select: {
              code: true,
            },
          },
        },
      },
    },
  });

  const findIndexLanguage =
    user && author
      ? languageIndexFinder({
          data: author.translations,
          values: ["language", "code"],
          search: user.language === "" ? "en" : user.language,
        })
      : 0;

  const name =
    findIndexLanguage === -1 ? author?.englishName : author?.translations[findIndexLanguage].name;
  const description =
    findIndexLanguage === -1 ? "" : author?.translations[findIndexLanguage].description;
  const bio = findIndexLanguage === -1 ? "" : author?.translations[findIndexLanguage].bio;
  const wikipediaLink =
    findIndexLanguage === -1 ? "" : author?.translations[findIndexLanguage].wikipediaLink;

  return (
    author && (
      <>
        <h2 className="text-5xl">{name}</h2>

        <AuthorImg authorName={slugWithSpaces} />

        <h3 className="text-lg">{dataFromWiki?.description}</h3>

        <p>
          {dataFromWiki?.extract}{" "}
          <a
            href={wikipediaLink ?? wikiData?.wikipediaLink?.desktop}
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
          >
            <small>Read more on Wikipedia</small>
          </a>
        </p>

        {/* <Link
          href={{
            pathname: ROUTES.AUTHOR_EDIT(slugWithSpaces),
            // query: `author=${author?.englishName}&id=${author?.id}`,
          }}
          className="bg-blue-500 text-white p-2 rounded-lg duration-300 hover:bg-blue-700"
        >
          Edit
        </Link> */}

        {
          <>
            {/* @ts-expect-error Async Server Component */}
            <QuotesOfTheAuthor author={author} authorName={name} user={user} />
          </>
        }
      </>
    )
  );
}

type QuotesOfTheAuthorProps = {
  author: API<PrismaAuthor>;
  authorName: string;
  user: API<User>;
};

async function QuotesOfTheAuthor({ author, authorName, user }: QuotesOfTheAuthorProps) {
  return (
    author && (
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

        {author.quotes.map((quote, index) => {
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
