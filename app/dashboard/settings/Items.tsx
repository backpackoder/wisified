"use client";

import Image from "next/image";
import { Dispatch, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";
import { AppContext } from "@/app/context/AppContext";

// Components
import { UserDataEditor } from "./UserDataEditor";
import { ModifyButton } from "./ModifyBtn";

// Utils
import toCapitalize from "@/utils/toCapitalize";
import { appLanguages, Iso } from "@/utils/languages";
import { getWikiData } from "@/utils/getWikiData";

// Types
import { UserItemProps, UserSettingsItemProps } from "@/types/props";
import { API, FullAuthor, ManyDataCountData } from "@/types/prisma";
import { Action } from "./types";

export function ImageProfileItem({
  type,
  state,
  dispatch,
  Component,
}: Omit<UserItemProps, "value">) {
  const session = useSession();
  const { user, updateUserSettings } = useContext(AppContext);
  const [authors, setAuthors] = useState<API<ManyDataCountData<FullAuthor>>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const actualProfileImage = session.data?.user?.image ?? user?.image ?? "";

  useEffect(() => {
    async function getAuthors() {
      const res = await fetch("/api/authors");
      const data: API<ManyDataCountData<FullAuthor>> = await res.json().then((data) => data);

      setAuthors(data);
    }

    getAuthors();
  }, []);

  return (
    <div className="flex flex-col flex-wrap gap-2">
      <h3 className="font-semibold">{toCapitalize(type)}:</h3>
      <div className="flex flex-col gap-4 py-2 px-4 border-2 rounded-lg">
        <div
          className={`group relative rounded-full ${isEditing ? "" : "hover:brightness-75"}`}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {Component}

          <FaCamera
            size={50}
            color="white"
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              isEditing ? "hidden" : ""
            } opacity-0 z-50 duration-150 group-hover:opacity-100`}
          />
        </div>

        {isEditing && session && (
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="font-semibold">Pick an avatar:</p>

            {/* <input
              type="text"
              name={type}
              defaultValue={user?.image ?? state.image}
              value={state.image}
              className="p-2 border-2 rounded-lg"
              onChange={(e) => dispatch({ type: "image", payload: e.target.value  })}
            /> */}

            <button
              className="bg-red-300 p-2 rounded-lg"
              onClick={() => {
                updateUserSettings({ value: state.image, typeSettings: "image" });
                setIsEditing(false);
              }}
            >
              Save
            </button>

            <div className="flex flex-wrap gap-2">
              <div className="w-24 h-24">
                <Image
                  src={actualProfileImage}
                  alt={`${actualProfileImage ?? "Your profile"}'s picture`}
                  width={50}
                  height={0}
                  className="w-full h-full object-cover hover:cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: "image",
                      payload: actualProfileImage,
                    })
                  }
                />
              </div>

              {authors?.data.map((author) => {
                return <AuthorPicture key={author.id} author={author} dispatch={dispatch} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AuthorPicture({ author, dispatch }: { author: FullAuthor; dispatch: Dispatch<Action> }) {
  const [authorPicture, setAuthorPicture] = useState<string | null>(null);

  useEffect(() => {
    if (!author) return;

    getWikiData(author.englishName).then((data) =>
      setAuthorPicture(data?.originalimage?.source ?? "")
    );
  }, [author]);

  return authorPicture ? (
    <div className="w-24 h-24">
      <Image
        src={authorPicture}
        alt={`${author.englishName}'s picture`}
        width={50}
        height={0}
        className="w-full h-full object-cover hover:cursor-pointer"
        onClick={() => dispatch({ type: "image", payload: authorPicture })}
      />
    </div>
  ) : null;
}

export function UserItem({ type, value, Component, state, dispatch, user }: UserItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col flex-wrap items-start gap-2 max-w-xs p-2 border-2 rounded-lg">
      <h3 className="font-semibold">{toCapitalize(type)}:</h3>

      <div className="py-2 px-4 rounded-lg border-2">
        {isEditing ? (
          <UserDataEditor
            type={type}
            value={value}
            setIsEditing={setIsEditing}
            state={state}
            dispatch={dispatch}
            user={user}
          />
        ) : (
          Component
        )}
      </div>

      {!isEditing && <ModifyButton setIsEditing={setIsEditing} />}
    </div>
  );
}

export function LanguageItem({ typeSettings, user }: Omit<UserSettingsItemProps, "Component">) {
  const { changeLanguage } = useContext(AppContext);

  return (
    <div className="flex items-center justify-center gap-2">
      <p>Language</p>

      <select
        name={typeSettings}
        defaultValue={user.language.toLocaleString() ?? ""}
        // value={state.language.toLocaleString() ?? ""}
        className="p-2 border-2 rounded-lg"
        onChange={(e) => changeLanguage(e.target.value as Iso)}
      >
        {Object.values(appLanguages).map((language, index) => {
          return (
            <option key={index} value={language.code}>
              {language.nativeTitle}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function EmailUpdatesItem({ typeSettings, user }: Omit<UserSettingsItemProps, "Component">) {
  const { updateUserSettings } = useContext(AppContext);

  return user ? (
    <div className="flex items-center justify-center gap-2">
      <p>Email updates</p>

      <input
        type="checkbox"
        name={typeSettings}
        defaultChecked={user.emailUpdates}
        className="p-2 border-2 rounded-lg"
        onChange={(e) => updateUserSettings({ value: e.target.checked, typeSettings })}
      />
    </div>
  ) : null;
}
