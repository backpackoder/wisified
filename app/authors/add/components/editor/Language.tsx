// Components
import { AddBtn } from "@/components/buttons/AddBtn";

// Types
import { EditorProps } from "../../types";

export function Language({ translations, state, dispatch }: EditorProps) {
  const { language, originalLanguage } = state;

  return (
    <div className="flex flex-col items-center h-full gap-2 shadow-md">
      <p>Select the language</p>

      <ul className="flex flex-wrap items-start justify-center gap-2">
        {translations.map((translation, index) => {
          return (
            <li key={index} className="flex flex-col items-center gap-1">
              <button
                type="button"
                className={`${
                  language === translation.code ? "bg-green-300" : ""
                } p-2 border border-black rounded-xl`}
                onClick={() => dispatch({ type: "SET_LANGUAGE", payload: translation.code })}
              >
                {translation.englishName}
              </button>

              <button
                className={`${
                  originalLanguage === translation.code ? "bg-yellow-300" : ""
                } text-xs italic py-1 px-2 rounded-md`}
                onClick={() =>
                  dispatch({
                    type: "SET_ORIGINAL_LANGUAGE",
                    payload: originalLanguage === translation.code ? null : translation.code,
                  })
                }
              >
                Original
              </button>
            </li>
          );
        })}

        <AddBtn
          text="Suggest a language"
          addFunction={() => console.log("Suggest a new language")}
        />
      </ul>
    </div>
  );
}
