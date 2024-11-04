"use client";

import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { Preview } from "./components/Preview";
import { Editor } from "./components/Editor";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { Author, TagTranslation } from "@prisma/client";
import { API, FullLanguage, FullUser, ManyDataNavbarPages } from "@/types/prisma";
import { CreateQuoteClientSide } from "./types";
import { PickAuthor } from "./components/PickAuthor";
import { SubmitBtn } from "@/components/SubmitBtn";

const initialState = {
  language: "en",
  originalLanguage: null as string | null,
  contents: [] as ContentTranslation[],
  author: null as Author | null,
  tags: [] as TagTranslation[],
};

export type State = typeof initialState;
export type Action =
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_ORIGINAL_LANGUAGE"; payload: string }
  | { type: "SET_CONTENTS"; payload: ContentTranslation[] }
  | { type: "SET_AUTHOR"; payload: Author | null }
  | { type: "SET_TAGS"; payload: TagTranslation }
  | { type: "DELETE_TAG"; payload: string };
export type ContentTranslation = {
  code: string;
  content: string;
};

export default function AddQuote() {
  const router = useRouter();
  const [user, setUser] = useState<API<FullUser>>(null);
  const [translations, setTranslations] = useState<API<ManyDataNavbarPages<FullLanguage>>>(null);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_LANGUAGE":
        return { ...state, language: action.payload };
      case "SET_ORIGINAL_LANGUAGE":
        return { ...state, originalLanguage: action.payload };
      case "SET_CONTENTS":
        return { ...state, contents: action.payload };
      case "SET_AUTHOR":
        return { ...state, author: action.payload };
      case "SET_TAGS":
        return { ...state, tags: [...state.tags, action.payload] };
      case "DELETE_TAG":
        return { ...state, tags: state.tags.filter((tag) => tag.tagId !== action.payload) };
      default:
        return state;
    }
  }

  async function addQuote() {
    if (!user || !state.author) return;

    const removeEmptyTranslations = state.contents.filter((content) => content.content !== "");

    const body: CreateQuoteClientSide = {
      creatorId: user.id,
      authorId: state.author.id,
      translations: removeEmptyTranslations.map((content) => {
        return {
          language: content.code,
          isOriginal: state.originalLanguage === content.code,
          content: content.content,
        };
      }),
      tags: state.tags.map((tag) => {
        return tag.tagId;
      }),
    };

    await fetch(`api/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        router.push(ROUTES.QUOTE(data.id));
      })
      .catch((error) => console.error("Error: ", error));
  }

  useEffect(() => {
    async function fetchDatas() {
      const resUser = await fetch("/api/user", {
        method: "GET",
      });
      const resTranslations = await fetch("/api/languages", {
        method: "GET",
      });

      await resUser.json().then((data) => setUser(data));
      await resTranslations.json().then((data) => setTranslations(data));
    }

    fetchDatas();
  }, []);

  useEffect(() => {
    translations &&
      dispatch({
        type: "SET_CONTENTS",
        payload: translations.data.map((translation) => {
          return { code: translation.code, content: "" };
        }),
      });
  }, [translations]);

  return (
    user &&
    translations &&
    state.contents.length > 0 && (
      <AuthCheck>
        <section className="flex flex-col gap-4">
          {!state.author ? (
            <PickAuthor author={state.author} dispatch={dispatch} />
          ) : (
            <>
              <Preview
                author={state.author}
                username={user.username}
                state={state}
                translations={translations.data}
              />

              <button
                onClick={() => dispatch({ type: "SET_AUTHOR", payload: null })}
                className="flex items-center justify-center bg-yellow-500 p-2 rounded-sm"
              >
                Change author
              </button>

              <Editor translations={translations.data} state={state} dispatch={dispatch} />

              <SubmitBtn handleData={addQuote} />
            </>
          )}
        </section>
      </AuthCheck>
    )
  );
}
