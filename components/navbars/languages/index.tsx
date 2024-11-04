"use client";

import Image from "next/image";
import { useEffect, useReducer } from "react";

// Types
import { useAppContext } from "@/app/context/AppProvider";
import { Action, State } from "@/types/NavbarMain";

// Utils
import { appLanguages, Iso } from "@/utils/languages";

export default function NavBarMainLanguages() {
  const { user, language, changeLanguage, updateUserSettings } = useAppContext();

  const actualLanguageOfUser = Object.values(appLanguages).find(
    (appLanguage) => appLanguage.code === language
  );
  console.log("actualLanguageOfUser", actualLanguageOfUser);

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

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "ACTIVE":
        return { ...state, isActive: true };

      case "SET_LANGUAGE":
        changeLanguage(action.payload.code as Iso);

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
    if (!user || !language) return;

    const actualLanguageOfUser = Object.values(appLanguages).find(
      (appLanguage) => appLanguage.code === language
    );

    dispatch({
      type: "SET_LANGUAGE",
      payload: {
        code: actualLanguageOfUser?.code ?? "en",
        name: actualLanguageOfUser?.nativeTitle ?? "English",
        flag: actualLanguageOfUser?.flag ?? "/flags/en.jpg",
      },
    });

    updateUserSettings({ value: actualLanguageOfUser?.code ?? "en", typeSettings: "language" });
  }, [user, language, updateUserSettings]);

  return (
    <>
      <button onClick={() => dispatch({ type: "ACTIVE" })}>
        <Image src={state.language.flag} alt={state.language.name} width={50} height={0} />
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
              <Image src={language.flag} alt={language.title} width={50} height={0} />
            </button>
          );
        })}
      </div>
    </>
  );
}
