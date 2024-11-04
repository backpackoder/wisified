"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

// Components
import { NoResultsFound } from "@/components/NoResultsFound";
import { Navbar } from "@/components/navbars/Navbar";
import { Pagination } from "@/components/Pagination";
import { QuoteItem } from "@/components/quotes/quote";

// Commons
import { FILTERS } from "@/commons/commons";

// Types
import { NavQuotesParams } from "@/types/params";
import { API, FullQuote, ManyDataNavbarPages } from "@/types/prisma";
import { DispatchQuotesAndAuthors } from "@/types/authors";

export default function Quotes() {
  const queryParamsTag = useSearchParams().get("tag");

  const [quotes, setQuotes] = useState<API<ManyDataNavbarPages<FullQuote>>>(null);

  const initialState: NavQuotesParams = {
    page: 1,
    limit: 20,
    sortBy: FILTERS.CREATED_AT,
    order: "asc",
    language: "en",
    tag: queryParamsTag ?? FILTERS.DEFAULT,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: NavQuotesParams, action: DispatchQuotesAndAuthors) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  useEffect(() => {
    async function fetchQuotes() {
      const res = await fetch(`/api/quotes/queries/${Object.values(state).join("/")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json().then((data) => setQuotes(data));
    }

    fetchQuotes();
  }, [state]);

  return (
    quotes && (
      <section className="flex flex-col gap-2">
        <Navbar type="quotes" data={quotes} dispatch={dispatch} queryParamsTag={queryParamsTag} />

        {quotes.totalPages > 1 && <Pagination data={quotes} state={state} dispatch={dispatch} />}

        {quotes.data.length > 0 ? (
          <>
            <article className="flex flex-col gap-2">
              {quotes.data.map((quote, index) => {
                return (
                  <div key={index}>
                    <QuoteItem quote={quote} />
                  </div>
                );
              })}
            </article>
          </>
        ) : (
          <NoResultsFound type="quotes" />
        )}

        {quotes.totalPages > 1 && <Pagination data={quotes} state={state} dispatch={dispatch} />}
      </section>
    )
  );
}
