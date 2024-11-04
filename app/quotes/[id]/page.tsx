import { prisma } from "@/lib/prisma";

// Components
import { QuoteItem } from "@/components/quotes/quote";

// Utils
import { PRISMA_CALLS } from "@/utils/prismaCalls";

export default async function Quote({ params }: { params: { id: string } }) {
  const { id } = params;

  const quote = await prisma.quote.findUnique({
    where: {
      id,
    },

    include: PRISMA_CALLS.quotes.include,
  });
  console.log("SKBDI", quote);

  return (
    quote && (
      <section className="p-2 border-2">
        <QuoteItem quote={quote} />
      </section>
    )
  );
}
