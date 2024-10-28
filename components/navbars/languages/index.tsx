"use client";

import Image from "next/image";
import { useEffect, useReducer, useState } from "react";

// Types
import { User } from "@prisma/client";
import { Action, State } from "@/types/NavbarMain";

// Utils
import { appLanguages } from "@/utils/languages";

export default function NavBarMainLanguages() {
  const [user, setUser] = useState<User | null | undefined>(null);
  console.log("user", user);

  const actualLanguageOfUser =
    user && Object.values(appLanguages).find((language) => language.code === user.language);

  const initialState: State = {
    isActive: false,
    language: {
      code: actualLanguageOfUser?.code ?? "en",
      name: actualLanguageOfUser?.nativeTitle ?? "English",
      flag: actualLanguageOfUser?.flag ?? "/flags/en.jpg",
    },
    hasActivated: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "ACTIVE":
        return { ...state, isActive: true };

      case "SET_LANGUAGE":
        return {
          ...state,
          isActive: false,
          language: {
            code: action.payload.code,
            name: action.payload.name,
            flag: action.payload.flag,
          },
          hasActivated: true,
        };

      default:
        return state;
    }
  }

  useEffect(() => {
    async function getUserData() {
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const user: User | null | undefined = await res.json();

      setUser(user);

      const actualLanguageOfUser =
        user && Object.values(appLanguages).find((language) => language.code === user.language);

      user &&
        dispatch({
          type: "SET_LANGUAGE",
          payload: {
            code: actualLanguageOfUser?.code ?? "en",
            name: actualLanguageOfUser?.nativeTitle ?? "English",
            flag: actualLanguageOfUser?.flag ?? "/flags/en.jpg",
          },
        });
    }

    getUserData();
  }, []);

  useEffect(() => {
    if (!state.hasActivated) return;

    async function updateUser() {
      const body = {
        language: state.language.code,
      };

      const res = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.json();
    }

    updateUser();
  }, [state.hasActivated, state.language.code]);

  return (
    <>
      <button onClick={() => dispatch({ type: "ACTIVE" })}>
        <Image src={state.language.flag} alt={state.language.name} width={240} height={240} />
      </button>

      <div
        className={`${
          state.isActive ? "" : "hidden"
        } absolute top-0 left-0 bg-blue-200 p-2 border rounded-sm`}
      >
        {Object.values(appLanguages).map((language) => {
          return (
            <button
              key={language.code}
              onClick={() =>
                dispatch({
                  type: "SET_LANGUAGE",
                  payload: {
                    code: language.code,
                    name: language.nativeTitle,
                    flag: language.flag,
                  },
                })
              }
            >
              <Image src={language.flag} alt={language.title} width={240} height={240} />
            </button>
          );
        })}
      </div>
    </>
  );
}
