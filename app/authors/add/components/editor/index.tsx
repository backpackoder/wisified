"use client";

import { useMemo } from "react";

// Components
import { Preview } from "../Preview";
import { AuthorSubmitted } from "../AuthorSubmitted";
import { AuthorExists } from "../AuthorExists";
import { FindAuthorOnWikipedia } from "../FindAuthorOnWikipedia";
import { AuthorNotFound } from "../AuthorNotFound";
import { AuthorFound } from "../AuthorFound";
import { SubmitBtn } from "@/components/SubmitBtn";

// Types
import { EditorProps } from "../../types";

export function Editor({
  state,
  dispatch,
  addAuthor,
}: EditorProps & { addAuthor: () => Promise<any> }) {
  const status = useMemo(() => {
    switch (state.status) {
      case "found":
        return (
          <>
            <AuthorFound />
          </>
        );

      case "not found":
        return <AuthorNotFound />;

      case "exists":
        return (
          <>
            <AuthorExists />
          </>
        );

      case "valid":
        return (
          <>
            <Preview state={state} />

            <SubmitBtn handleData={addAuthor} />
          </>
        );

      case "submitted":
        return <AuthorSubmitted state={state} dispatch={dispatch} />;

      default:
        return <FindAuthorOnWikipedia state={state} dispatch={dispatch} />;
    }
  }, [addAuthor, dispatch, state]);

  return <>{status}</>;
}
