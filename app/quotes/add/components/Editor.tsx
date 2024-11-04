"use client";

import { Dispatch } from "react";
import { FaTrash } from "react-icons/fa";

// Components
import { EditorWrapper } from "@/components/add/EditorWrapper";
import { EditorItemWrapper } from "@/components/add/EditorItemWrapper";
import { AddBtn } from "@/components/buttons/AddBtn";

// Types
import { Action, State } from "../page";
import { FullLanguage } from "@/types/prisma";

export type EditorProps = {
  translations: FullLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};

export function Editor({ translations, state, dispatch }: EditorProps) {
  const { language } = state;

  const contentIndexFinder = translations?.findIndex(
    (translation) => translation.code === language
  );
  const selectedLanguage =
    translations[translations?.findIndex((translation) => translation.code === language)];

  function handleContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (state.contents && contentIndexFinder !== undefined && contentIndexFinder > -1) {
      const updatedContents = [...state.contents];
      updatedContents[contentIndexFinder] = {
        ...updatedContents[contentIndexFinder],
        content: e.target.value,
      };

      dispatch({
        type: "SET_CONTENTS",
        payload: updatedContents,
      });
    }
  }

  return translations ? (
    <EditorWrapper>
      <Language
        translations={translations}
        state={state}
        dispatch={dispatch}
        selectedLanguage={selectedLanguage}
      />

      <Content
        state={state}
        contentIndexFinder={contentIndexFinder}
        selectedLanguage={selectedLanguage}
        handleContent={handleContent}
      />

      <Tags
        translations={translations}
        state={state}
        dispatch={dispatch}
        selectedLanguage={selectedLanguage}
      />
    </EditorWrapper>
  ) : null;
}

type LanguageProps = {
  translations: FullLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
  selectedLanguage: FullLanguage;
};

function Language({ translations, state, dispatch }: LanguageProps) {
  const { originalLanguage, language } = state;

  return (
    <EditorItemWrapper>
      <div className="flex flex-col items-center h-full gap-4">
        <p>Select the language</p>

        <ul className="flex flex-wrap justify-center gap-2">
          {translations.map((translation, index) => (
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
                  dispatch({ type: "SET_ORIGINAL_LANGUAGE", payload: translation.code })
                }
              >
                Original
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-center gap-2">
          <p>You need another language?</p>

          <AddBtn
            text="Suggest a language"
            addFunction={() => console.log("Suggest a new language")}
          />
        </div>
      </div>
    </EditorItemWrapper>
  );
}

type ContentProps = {
  state: State;
  contentIndexFinder: number;
  selectedLanguage: FullLanguage;
  handleContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function Content({ state, contentIndexFinder, selectedLanguage, handleContent }: ContentProps) {
  const { contents } = state;

  return (
    <EditorItemWrapper>
      <label htmlFor="content">
        Write your quote in{" "}
        <span className="font-semibold">{selectedLanguage.englishName.toLowerCase()}</span> here:
      </label>

      <textarea
        name="content"
        cols={30}
        rows={5}
        placeholder="Time is an illusion. Lunchtime doubly so..."
        value={contents[contentIndexFinder].content}
        className="w-full p-2 border border-black rounded-xl"
        onChange={(e) => handleContent(e)}
      ></textarea>
    </EditorItemWrapper>
  );
}

export type TagsProps = {
  translations: FullLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
  selectedLanguage: FullLanguage;
};

function Tags({ translations, state, dispatch, selectedLanguage }: TagsProps) {
  // const [tags, setTags] = useState<API<ManyData<PrismaTag>>>(null);
  // console.log("tags: ", tags);

  // useEffect(() => {
  //   async function getTags() {
  //     const res = await fetch("/api/tags", {
  //       method: "GET",
  //     });

  //     await res.json().then((res) => setTags(res));
  //   }

  //   getTags();
  // }, [dispatch, state.language, translations]);

  return (
    <EditorItemWrapper>
      <p>Select the tags</p>

      <AvailableTags state={state} dispatch={dispatch} selectedLanguage={selectedLanguage} />

      <SelectedTags state={state} dispatch={dispatch} selectedLanguage={selectedLanguage} />

      <p>{`You don't find the right one?`}</p>

      <AddBtn text="Suggest a tag" addFunction={() => console.log("Add tag")} />
    </EditorItemWrapper>
  );
}

type AvailableTagsProps = {
  state: State;
  dispatch: Dispatch<Action>;
  selectedLanguage: FullLanguage;
};

function AvailableTags({ state, dispatch, selectedLanguage }: AvailableTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {selectedLanguage.tags.map((tag, index) => {
        const tagAlreadySelected = state.tags.some(
          (selectedTag) => selectedTag.tagId === tag.tagId
        );

        return (
          !tagAlreadySelected && (
            <button
              key={index}
              className="flex flex-wrap items-center justify-center gap-2 py-1 px-2 border rounded-md duration-150 hover:scale-110 hover:bg-blue-100"
              onClick={() => dispatch({ type: "SET_TAGS", payload: tag })}
            >
              {tag?.name ?? ""}
            </button>
          )
        );
      })}
    </div>
  );
}

type SelectedTagsProps = {
  state: State;
  dispatch: Dispatch<Action>;
  selectedLanguage: FullLanguage;
};

function SelectedTags({ state, dispatch, selectedLanguage }: SelectedTagsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {selectedLanguage.tags.map((tag, index) => {
        const tagAlreadySelected = state.tags.some(
          (selectedTag) => selectedTag.tagId === tag.tagId
        );

        return (
          tagAlreadySelected && (
            <div
              key={index}
              className="flex flex-wrap items-center justify-center gap-2 bg-blue-100 py-1 px-2 border rounded-md"
            >
              <p key={index}>{tag.name}</p>

              <FaTrash
                size={16}
                color="red"
                className="cursor-pointer duration-150 hover:scale-110"
                onClick={() => dispatch({ type: "DELETE_TAG", payload: tag.tagId })}
              />
            </div>
          )
        );
      })}
    </div>
  );
}
