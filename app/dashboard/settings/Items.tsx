"use client";

import { useState } from "react";
import { FaCamera } from "react-icons/fa";

// Components
import { UserDataEditor } from "../UserDataEditor";
import { ModifyButton } from "./ModifyBtn";

// Utils
import toCapitalize from "@/utils/toCapitalize";

// Types
import { UserItemProps, UserSettingsItemProps } from "@/types/props";
import { appLanguages } from "@/utils/languages";

export function ImageProfileItem({ type, user, handleModifiedData, Component }: UserItemProps) {
  const [isEditing, setIsEditing] = useState(false);

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

        {isEditing && (
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="font-semibold">Link:</p>
            <UserDataEditor
              type={type}
              user={user}
              setIsEditing={setIsEditing}
              handleModifiedData={handleModifiedData}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function UserItem({ type, user, Component, handleModifiedData }: UserItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col flex-wrap items-start gap-2 max-w-xs">
      <h3 className="font-semibold">{toCapitalize(type)}:</h3>

      <div className="py-2 px-4 rounded-lg border-2">
        {isEditing ? (
          <UserDataEditor
            type={type}
            user={user}
            setIsEditing={setIsEditing}
            handleModifiedData={handleModifiedData}
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
  async function updateUserSettings(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;

    const body = {
      [typeSettings]: value,
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    value !== user[typeSettings] && res.json();
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <p>Language</p>

      <select
        name={typeSettings}
        defaultValue={user.language.toLocaleString() ?? ""}
        className="p-2 border-2 rounded-lg"
        onChange={(e) => updateUserSettings(e)}
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
  async function updateUserSettings(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;

    const body = {
      [typeSettings]: value,
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    value !== user[typeSettings] && res.json();
  }

  return user ? (
    <div className="flex items-center justify-center gap-2">
      <p>Email updates</p>

      <input
        type="checkbox"
        name={typeSettings}
        defaultChecked={user.emailUpdates}
        className="p-2 border-2 rounded-lg"
        onChange={(e) => updateUserSettings(e)}
      />
    </div>
  ) : null;
}
