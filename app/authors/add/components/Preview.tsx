// Components
import { PreviewWrapper } from "@/components/add/PreviewWrapper";
import { AuthorWrapper } from "@/components/authors/AuthorWrapper";

// Types
import { State } from "../types";
import { AuthorImg } from "@/components/quotes/AuthorImg";

type PreviewProps = {
  state: State;
};

export function Preview({ state }: PreviewProps) {
  const { wikiData } = state;

  const actualLanguage = state.names.findIndex((name) => name.code === state.language);

  return wikiData ? (
    <PreviewWrapper>
      <AuthorWrapper>
        <h2 className="text-5xl">{wikiData?.title}</h2>

        <AuthorImg authorName={wikiData?.title} />

        <h3 className="text-lg">{state.wikiData?.description}</h3>

        <p>
          {state.wikiData?.extract}
          <a
            href={wikiData?.content_urls.desktop.page}
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
          >
            <small>Read more on Wikipedia</small>
          </a>
        </p>
      </AuthorWrapper>
    </PreviewWrapper>
  ) : null;
}
