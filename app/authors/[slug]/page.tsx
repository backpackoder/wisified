import { prisma } from "@/lib/prisma";

// Components
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";
import { AuthorTemplate } from "@/components/authors/AuthorTemplate";
import { AuthorNotFound } from "@/components/authors/AuthorNotFound";

// Utils
import { slugWithSpacesHandle } from "@/utils/slugWithSpacesHandle";
import { getWikiData } from "@/utils/getWikiData";
import { PRISMA_CALLS } from "@/utils/prismaCalls";

// Types
import { API } from "@/types/prisma";
import { WikiAuthorDatas } from "./types";

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const slugWithSpaces = slugWithSpacesHandle(decodedSlug);

  const author = await prisma.author.findFirst({
    where: {
      englishName: slugWithSpaces,
    },

    include: PRISMA_CALLS.author.include,
  });

  const wikiData = author && (await getWikiData(author.englishName));

  const datas: API<WikiAuthorDatas> = wikiData && {
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
      {author && wikiData ? (
        <>
          {/* @ts-expect-error Async Server Component */}
          <AuthorTemplate author={author} wikiData={datas} />
        </>
      ) : (
        <AuthorNotFound authorName={slugWithSpaces} />
      )}
    </AuthorWrapper>
  );
}
