import Link from "next/link";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { Action, State } from "../types";
import { Dispatch } from "react";

type AuthorSubmittedProps = {
  state: State;
  dispatch: Dispatch<Action>;
  text?: string;
};

export function AuthorSubmitted({ state, dispatch, text = "submitted" }: AuthorSubmittedProps) {
  return state?.wikiData ? (
    <div className="flex flex-col items-center justify-center gap-4">
      <p>
        The author {'"'}
        {state.wikiData.title}
        {'"'} has been {text} succesfully!
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href={ROUTES.AUTHOR_ADD}
          onClick={() => dispatch({ type: "RESET" })}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Add another author
        </Link>

        <Link href={ROUTES.QUOTE_ADD} className="bg-green-500 text-white p-2 rounded-md">
          Add the first {state.wikiData.title}
          {"'"}s quote
        </Link>

        <Link
          href={ROUTES.AUTHOR(state.wikiData.title)}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Go to {state.wikiData.title}
          {"'"}s page
        </Link>
      </div>
    </div>
  ) : null;
}
