"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Dispatch, useEffect, useState } from "react";

// Utils
import { getWikiData, getWikiSearch } from "@/utils/getWikiData";

// Types
import { Action, State } from "../types";
import { wikiSummary } from "@/types/wikiResponse";
import Image from "next/image";
import { Author } from "@prisma/client";

type FindAuthorOnWikipediaProps = {
  state: State;
  dispatch: Dispatch<Action>;
};

type searchResult = {
  wikiData: wikiSummary;
  existsInDB: boolean;
  name: string;
  description: string;
  img: string;
};

export function FindAuthorOnWikipedia({ state, dispatch }: FindAuthorOnWikipediaProps) {
  const pathname = usePathname();
  const queryParams = useSearchParams().get("author");
  const router = useRouter();
  const [authorNameValue, setAuthorNameValue] = useState("");
  const [searchAuthor, setSearchAuthor] = useState(queryParams ?? "");
  const [wikiResults, setWikiResults] = useState<searchResult[]>([]);
  const [dbAuthors, setDbAuthors] = useState<Author[]>([]);

  useEffect(() => {
    async function fetchAuthorsFromDB() {
      const res = await fetch(`api/authors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      const authors: Author[] = data.data.map((author: Author) => author);
      setDbAuthors(authors);
    }

    fetchAuthorsFromDB();
  }, []);

  useEffect(() => {
    async function getWikiSearchData() {
      if (!searchAuthor || searchAuthor === "") {
        setWikiResults([]);
        return;
      }

      const searchResults = await getWikiSearch(searchAuthor);

      if (searchResults?.results) {
        const results = await Promise.all(
          searchResults.results.map(async (result) => {
            const wikiData = await getWikiData(result.title);

            if (wikiData && wikiData.originalimage?.source) {
              const dbAuthorsNames = dbAuthors.map((author) => author.englishName.toLowerCase());
              const existsInDB = dbAuthorsNames.includes(result.title.toLowerCase());

              return {
                wikiData,
                name: result.title,
                description: wikiData.description,
                img: wikiData.originalimage.source,
                existsInDB,
              };
            }
            return null;
          })
        );

        setWikiResults(results.filter((result) => result !== null) as searchResult[]);
      }
    }

    setWikiResults([]);
    getWikiSearchData();
  }, [searchAuthor, dbAuthors]);

  return (
    <div className="flex flex-col items-center gap-4 p-2 border-2 rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <h3>Find the author on Wikipedia</h3>

        <input
          type="text"
          className="p-2 border border-black rounded-xl"
          placeholder="Search for the author on Wikipedia"
          value={authorNameValue}
          maxLength={200}
          onChange={(e) => {
            setAuthorNameValue(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          className="p-2 border border-black rounded-xl"
          onClick={() => setSearchAuthor(authorNameValue)}
        >
          Find the author
        </button>

        {state.status === "found" && (
          <button
            type="button"
            className="p-2 border border-black rounded-xl"
            onClick={() => {
              authorNameValue && router.push(`${pathname}`);
              dispatch({
                type: "SET_STATUS",
                payload: "valid",
              });
            }}
          >
            Validate
          </button>
        )}
      </div>

      <p>
        To avoid duplicates, you have to search for the author on Wikipedia.
        <br />
        If the author already exists, you can{"'"}t add it again, but you can modify the existing.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        {wikiResults &&
          wikiResults.map((result) => {
            const { wikiData, existsInDB, name, description, img } = result;

            return (
              <div
                key={name}
                className={`flex flex-col items-center justify-between gap-2 ${
                  existsInDB ? "bg-green-200" : "bg-blue-200"
                } p-2 rounded-lg`}
              >
                <div
                  className={`flex flex-wrap flex-col items-center justify-between gap-2 h-full`}
                >
                  <p className="text-2xl">{name}</p>

                  <Image
                    src={img}
                    alt={name}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />

                  <p>{description}</p>
                </div>

                {existsInDB && (
                  <p className="text-xl font-bold text-red-500">Already in database</p>
                )}

                <Link
                  href={existsInDB ? `authors/${name}` : `${pathname}`}
                  type="button"
                  className="p-2 border border-black rounded-xl"
                  onClick={() => {
                    if (existsInDB) return;

                    dispatch({
                      type: "SET_WIKI_DATA",
                      payload: wikiData,
                    });

                    dispatch({
                      type: "SET_STATUS",
                      payload: "valid",
                    });
                  }}
                >
                  {existsInDB ? "View infos" : "Add"}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
