import { prisma } from "@/lib/prisma";

// Components
import { QuoteItem } from "./quote";
import { getMyUserData } from "@/utils/getPrismaDataFromServerSIde";
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export async function RandomQuote() {
  const user = await getMyUserData();
  const count = await prisma.quote.count();
  const randomIndex = Math.floor(Math.random() * count);

  const randomQuote = await prisma.quote.findFirst({
    where: {
      translations: {
        some: {
          language: {
            code: user?.language,
          },
        },
      },
    },

    include: PRISMA_CALLS.quote.include,

    skip: randomIndex,
  });

  return randomQuote ? (
    <article className="flex items-center justify-center w-full p-4">
      <QuoteItem quote={randomQuote} />
    </article>
  ) : null;
}
