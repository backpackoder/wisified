"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { Editor } from "./components/editor";

// Utils
import { getWikiData } from "@/utils/getWikiData";
import { initialState } from "./utils/initialState";

// Types
import { API, ManyData, PrismaLanguage, PrismaUser } from "@/types/prisma";
import { wikiSummary } from "@/types/wikiResponse";
import { Action, CreateAuthorClientSide, State } from "./types";

// Commons
import { ROUTES } from "@/commons/commons";

export default function AddAuthor() {
  const router = useRouter();
  const queryParams = useSearchParams().get("author");

  const [user, setUser] = useState<API<PrismaUser>>(null);
  const [translations, setTranslations] = useState<API<ManyData<PrismaLanguage>>>(null);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SEARCHING":
        return { ...state, status: "searching" };

      case "SET_LANGUAGE":
        return { ...state, language: action.payload };

      case "SET_STATUS":
        return { ...state, status: action.payload };

      case "SET_ORIGINAL_LANGUAGE":
        return { ...state, originalLanguage: action.payload };

      case "SET_WIKI_DATA":
        return { ...state, wikiData: action.payload };

      case "SET_NAMES":
        return { ...state, names: action.payload };

      case "SET_DESCRIPTIONS":
        return { ...state, descriptions: action.payload };

      case "SET_BIOS":
        return { ...state, bio: action.payload };

      case "RESET":
        return initialState;

      default:
        return state;
    }
  }

  async function addAuthor() {
    if (!user || !state.wikiData) return;

    const body: CreateAuthorClientSide = {
      creatorId: user.id,
      englishName: state.wikiData.title,
      wikipediaLink: state.wikiData.content_urls.desktop.page,
      translations: [],
      // translations: state.names.map((name, index) => {
      //   return {
      //     language: name.code,
      //     isOriginal: state.originalLanguage === name.code,
      //     name:
      //       state.wikiData && name.code === "en" ? state.wikiData.title : state.names[index].name,
      //     description: state.descriptions[index].description,
      //     bio: state.bio[index].bio,
      //   };
      // }),
    };

    await fetch(`api/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        router.push(ROUTES.AUTHOR(data.englishName));
      })
      .catch((error) => console.error("Error: ", error));
  }

  const nameIndexFinder = state.names?.findIndex((name) => name.code === state.language);

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
        type: "SET_NAMES",
        payload: translations.data.map((translation) => {
          return { code: translation.code, name: "" };
        }),
      });
  }, [translations]);

  useEffect(() => {
    translations &&
      dispatch({
        type: "SET_DESCRIPTIONS",
        payload: translations.data.map((translation) => {
          return { code: translation.code, description: "" };
        }),
      });
  }, [translations]);

  useEffect(() => {
    translations &&
      dispatch({
        type: "SET_BIOS",
        payload: translations.data.map((translation) => {
          return { code: translation.code, bio: "" };
        }),
      });
  }, [translations]);

  useEffect(() => {
    function isOk(res: API<wikiSummary>) {
      const isResDefined = !!res;

      dispatch({
        type: "SET_WIKI_DATA",
        payload: isResDefined ? res : undefined,
      });
    }

    async function searchAuthor() {
      queryParams &&
        (await getWikiData(queryParams).then((res) => {
          isOk(res);
        }));
    }

    searchAuthor();
  }, [queryParams]);

  return (
    user &&
    translations &&
    state.names.length > 0 &&
    (nameIndexFinder || nameIndexFinder === 0) && (
      <AuthCheck>
        <section className="flex flex-col gap-4">
          <Editor
            translations={translations.data}
            state={state}
            dispatch={dispatch}
            addAuthor={addAuthor}
          />
        </section>
      </AuthCheck>
    )
  );
}
