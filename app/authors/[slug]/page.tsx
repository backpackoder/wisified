import { prisma } from "@/lib/prisma";

// Components
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";
import { AuthorTemplate } from "@/components/authors/AuthorTemplate";
import { AuthorNotFound } from "@/components/authors/AuthorNotFound";

// Utils
import { slugWithSpacesHandle } from "@/utils/slugWithSpacesHandle";

// Types
import { getWikiData } from "@/utils/getWikiData";

export type WikiAuthorDatas =
  | {
      name: string;
      description: string;
      bio: string;
      wikipediaLink: {
        desktop?: string;
        mobile?: string;
      };
      imageSrc?: string;
    }
  | null
  | undefined;

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const slugWithSpaces = slugWithSpacesHandle(decodedSlug);

  const author = await prisma.author.findFirst({
    where: {
      englishName: slugWithSpaces,
    },
    include: {
      translations: true,
      quotes: true,
    },
  });

  const wikiData = author && (await getWikiData(author.englishName));

  const datas: WikiAuthorDatas = wikiData && {
    name: wikiData.title,
    description: wikiData.description,
    bio: wikiData.extract,
    wikipediaLink: {
      desktop: wikiData.content_urls.desktop.page,
      mobile: wikiData.content_urls.mobile.page,
    },
    imageSrc: wikiData.originalimage.source,
  };

  return (
    <AuthorWrapper>
      {author ? (
        <>
          {/* @ts-expect-error Async Server Component */}
          <AuthorTemplate slugWithSpaces={slugWithSpaces} wikiData={datas} />
        </>
      ) : (
        <AuthorNotFound authorName={slugWithSpaces} />
      )}
    </AuthorWrapper>
  );
}
