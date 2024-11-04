// Components
import { RandomQuote } from "@/components/quotes/RandomQuote";
import { DiscoverQuotesAndAuthors } from "@/components/DiscoverQuotesAndAuthors";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // const test = await fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/Napoleon").then(
  //   (res) => res.json()
  // );

  // await prisma.language.delete({
  //   where: {
  //     code: "de",
  //   },
  // });

  return (
    <main className="flex flex-col items-center justify-between min-h-screen4">
      <section className="flex flex-col items-center min-w-full p-0">
        {/* @ts-expect-error Async Server Component */}
        <RandomQuote />

        <DiscoverQuotesAndAuthors
          h2
          text={{
            catchphrase: { before: "Discover", after: "from our community" },
            link: { before: "I discover the", after: "" },
          }}
        />
      </section>
    </main>
  );
}
