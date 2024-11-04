import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dispatch, useEffect, useState } from "react";

// Types
import { Action } from "../page";
import { API, FullAuthor, ManyDataNavbarPages } from "@/types/prisma";
import { AuthorImg } from "@/components/quotes/quote/items/AuthorImg";
import { languageIndexFinder } from "@/utils/languageIndexFinder";
import { getWikiData } from "@/utils/getWikiData";
import Image from "next/image";
import { IMAGES, ROUTES } from "@/commons/commons";

type AuthorProps = {
  author: FullAuthor | null;
  dispatch: Dispatch<Action>;
};

export function PickAuthor({ author, dispatch }: AuthorProps) {
  const params = useSearchParams().get("author");
  const [authors, setAuthors] = useState<API<ManyDataNavbarPages<FullAuthor>>>(null);
  const [search, setSearch] = useState(params ?? "");

  useEffect(() => {
    async function fetchAuthors() {
      const res = await fetch("/api/authors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data) => setAuthors(data));
    }

    fetchAuthors();
  }, []);

  return authors ? (
    <>
      <div className="flex flex-col items-center justify-center gap-1">
        <label htmlFor="search">Who{"'"}s the author of the quote?</label>

        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Confucius"
          defaultValue={params ?? undefined}
          className="bg-slate-500 border-1 border-black"
        />

        <div className="flex flex-col items-center justify-center gap-1">
          <p>The author does{"'"}t exist yet?</p>
          <Link
            href={ROUTES.AUTHOR_ADD}
            className="bg-green-300 p-2 rounded-md duration-200 hover:bg-green-500"
          >
            Add new author
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="group flex flex-col items-center gap-1 max-w-[200px] bg-blue-200 px-2 py-4 text-center rounded-lg duration-300 hover:bg-blue-300">
          <h2 className="text-2xl">Unknown author</h2>

          <div className="flex items-center justify-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
            <Image
              src={IMAGES.DEFAULT_PROFILE_IMAGE}
              alt={`${author}'s profile image`}
              width={100}
              height={0}
              priority
              className="w-auto h-auto max-h-60 rounded-lg duration-300"
            />
          </div>

          <button
            onClick={() => dispatch({ type: "SET_AUTHOR", payload: null })}
            className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
          >
            SELECT
          </button>
        </div>

        {authors.data.map((author, index) => {
          // const authorOnList = author.translations.some((translation) =>
          //   translation.name.toLowerCase().includes(search.toLowerCase())
          // );

          const authorOnList = author.englishName.toLowerCase().includes(search.toLowerCase());

          return (
            authorOnList && (
              <AuthorCard key={index} author={author} language="" dispatch={dispatch} />
            )
          );
        })}
      </div>
    </>
  ) : null;
}

type AuthorCardProps = {
  author: FullAuthor;
  language: string;
  dispatch: Dispatch<Action>;
};

function AuthorCard({ author, language, dispatch }: AuthorCardProps) {
  const { englishName } = author;

  const [description, setDescription] = useState<string>("");

  const findLanguageIndex = languageIndexFinder({
    data: author.translations,
    values: ["language", "code"],
    search: language,
  });

  const name = findLanguageIndex === -1 ? englishName : author.translations[findLanguageIndex].name;

  useEffect(() => {
    async function getDescriptionFromWiki() {
      await getWikiData(englishName).then((data) => setDescription(data?.description ?? ""));
    }

    getDescriptionFromWiki();
  }, [englishName]);

  return (
    <>
      <div className="group flex flex-col items-center gap-1 max-w-[200px] bg-blue-200 px-2 py-4 text-center rounded-lg duration-300 hover:bg-blue-300">
        <h2 className="text-2xl">{name}</h2>

        <div className="flex items-center justify-center w-4/5 h-full rounded-lg overflow-hidden mt-2">
          <AuthorImg authorName={author.englishName} />
        </div>

        <h3 className="leading-tight">
          <small>{description}</small>
        </h3>

        <button
          onClick={() => dispatch({ type: "SET_AUTHOR", payload: author })}
          className="bg-[#5bff76] text-sm font-medium p-2 rounded duration-300 mt-2 group-hover:bg-[#21cf3e]"
        >
          SELECT
        </button>
      </div>
    </>
  );
}
