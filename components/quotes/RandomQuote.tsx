import { prisma } from "@/lib/prisma";

// Components
import { QuoteItem } from "./QuoteItem";

export async function getPrismaCalls() {
  const count = await prisma.quote.count();

  const randomIndex = Math.floor(Math.random() * count);

  const randomQuote = prisma.quote.findFirst({
    skip: randomIndex,
  });

  return await randomQuote;
}

export async function RandomQuote() {
  const quotes = await prisma.quote.findMany({
    include: {
      createdBy: true,
      author: true,
      translations: true,
      tags: {
        include: {
          translations: {
            include: {
              language: true,
            },
          },
        },
      },
    },
  });

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return randomQuote ? (
    <article className="flex items-center justify-center w-full p-4">
      {/* Le problème ci-dessous doit être réparé même si ça marche, car problème avec le TypeScript */}
      <QuoteItem quote={randomQuote} />
    </article>
  ) : null;
}
