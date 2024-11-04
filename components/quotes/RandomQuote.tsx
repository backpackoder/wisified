import { prisma } from "@/lib/prisma";

// Components
import { QuoteItem } from "./quote";
import { getMyUserData } from "@/utils/getPrismaDataFromServerSIde";

export async function getPrismaCalls() {
  const count = await prisma.quote.count();

  const randomIndex = Math.floor(Math.random() * count);

  const randomQuote = prisma.quote.findFirst({
    skip: randomIndex,
  });

  return await randomQuote;
}
// id: string;
// createdAt: Date;
// updatedAt: Date;
// code: string;
// englishName: string;
// nativeName: string;

export async function RandomQuote() {
  const user = await getMyUserData();

  const quotes = await prisma.quote.findMany({
    where: {
      translations: {
        some: {
          language: {
            code: user?.language,
          },
        },
      },
    },

    include: {
      createdBy: true,
      updatedBy: true,
      author: true,
      translations: {
        include: {
          language: true,
        },
      },
      tags: {
        include: {
          translations: {
            include: {
              language: true,
            },
          },
        },
      },
      favorites: true,
      favoritedBy: true,
      comments: true,
    },
  });

  console.log("quotes COUNT", quotes.length);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log("randomQuote", randomQuote);

  return randomQuote ? (
    <article className="flex items-center justify-center w-full p-4">
      {/* Le problème ci-dessous doit être réparé même si ça marche, car problème avec le TypeScript */}
      <QuoteItem quote={randomQuote} />
    </article>
  ) : null;
}
