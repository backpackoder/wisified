"use client";

import { useEffect, useReducer, useState } from "react";

// Components
import { AuthorCard } from "./components/AuthorCard";
import { Navbar } from "@/components/navbars/Navbar";
import { Pagination } from "@/components/Pagination";

// Commons
import { FILTERS } from "@/commons/commons";

// Types
import { NavAuthorsParams } from "@/types/params";
import { API, ManyData, PrismaAuthor } from "@/types/prisma";
import { DispatchQuotesAndAuthors } from "@/types/authors";

export default function Authors() {
  const [authors, setAuthors] = useState<API<ManyData<PrismaAuthor>>>(null);

  const initialState: NavAuthorsParams = {
    page: 1,
    limit: 20,
    sortBy: FILTERS.NAME,
    order: "asc",
    language: "en",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: NavAuthorsParams, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  useEffect(() => {
    async function fetchAuthors() {
      const res = await fetch(`api/authors/queries/${Object.values(state).join("/")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data) => setAuthors(data));
    }

    fetchAuthors();
  }, [state]);

  return (
    authors && (
      <section className="flex flex-col gap-2">
        <Navbar type="authors" data={authors} dispatch={dispatch} />

        {authors.totalPages > 1 && <Pagination data={authors} state={state} dispatch={dispatch} />}
        <article className="flex flex-wrap justify-center gap-8">
          {authors.data.map((author, index) => {
            return <AuthorCard key={index} author={author} language={state.language} />;
          })}
        </article>
        {authors.totalPages > 1 && <Pagination data={authors} state={state} dispatch={dispatch} />}
      </section>
    )
  );
}
