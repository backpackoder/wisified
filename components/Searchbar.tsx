"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";

// Components
import { NoResultsFound } from "./NoResultsFound";

// Types
import { SearchbarProps } from "@/types/searchbar";
import { DispatchQuotesAndAuthors } from "@/types/authors";
import { API, FullAuthor, FullQuote, ManyDataNavbarPages } from "@/types/prisma";

export function Searchbar({ type }: SearchbarProps) {
  const [searchQuote, setSearchQuote] = useState<API<ManyDataNavbarPages<FullQuote>> | null>(null);
  const [searchAuthor, setSearchAuthor] = useState<API<ManyDataNavbarPages<FullAuthor>> | null>(
    null
  );

  type InitialStateProps = {
    query: string;
  };

  const initialState: InitialStateProps = {
    query: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: InitialStateProps, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "query", payload: e.target.value });
  }

  useEffect(() => {
    if (state.query === "") return;

    async function fetchAuthors() {
      const data = await fetch(`/api/authors/names/${state.query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await data.json().then((data) => setSearchAuthor(data));
    }

    async function fetchQuotes() {
      const data = await fetch(`/api/quotes/contents/${state.query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await data.json().then((data) => setSearchQuote(data));
    }

    type === "authors" ? fetchAuthors() : fetchQuotes();
  }, [state, type]);

  return (
    <div className="relative flex flex-col items-center justify-between gap-2 p-2 z-10">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="William Shakespeare"
        autoComplete="off"
        value={state.query ?? ""}
        className=" max-h-12 p-2 border-2 border-black border-opacity-50 rounded-xl"
        onChange={(e) => handleInputChange(e)}
      />

      {state.query !== "" && (
        <div className="absolute top-full flex flex-col gap-2 bg-sky-200 p-2 w-full border-2">
          {searchAuthor && <SearchAuthor type={type} searchAuthor={searchAuthor} />}
          {searchQuote && <SearchQuote type={type} searchQuote={searchQuote} />}
        </div>
      )}
    </div>
  );
}

function SearchAuthor({
  type,
  searchAuthor,
}: {
  type: string;
  searchAuthor: ManyDataNavbarPages<FullAuthor>;
}) {
  return searchAuthor.data.length > 0 ? (
    <>
      {searchAuthor.data.map((author, index) => {
        const nbOfQuotes = author.quotes.length;

        return (
          <Link key={index} href={`/${type}/${author.englishName}`}>
            {author.englishName}{" "}
            <small>
              ({nbOfQuotes} {nbOfQuotes === 1 ? "quote" : "quotes"})
            </small>
          </Link>
        );
      })}
    </>
  ) : (
    <NoResultsFound type={type} />
  );
}

function SearchQuote({
  type,
  searchQuote,
}: {
  type: string;
  searchQuote: ManyDataNavbarPages<FullQuote>;
}) {
  return searchQuote.data.length > 0 ? (
    <>
      {searchQuote.data.map((quote, index) => {
        return (
          <div key={index}>
            <Link href={`/${type}/${quote.id}`}>{quote.translations[0].content} </Link>
            <Link href={`/authors/${quote.author.englishName}`}>
              <small>({quote.author.englishName})</small>
            </Link>
          </div>
        );
      })}
    </>
  ) : (
    <NoResultsFound type={type} />
  );
}
