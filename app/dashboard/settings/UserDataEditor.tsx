"use client";

import { Dispatch, useMemo, useState } from "react";

// Types
import { User } from "@prisma/client";
import { API } from "@/types/prisma";
import { Action, State } from "./types";

type UserDataEditorProps = {
  user: API<User>;
  type: keyof Pick<User, "image" | "username" | "name" | "nationality" | "bio">;
  value: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  state: State;
  dispatch: Dispatch<Action>;
};

export function UserDataEditor({
  user,
  type,
  value,
  setIsEditing,
  state,
  dispatch,
}: UserDataEditorProps) {
  const [newValue, setNewValue] = useState(getUserData() ?? "");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  console.log("newValue", newValue);

  function getType() {
    if (type && user) return type;
    return "";
  }

  function getUserData() {
    if (type && user) return user?.[type];
    return "";
  }

  function handleCancel() {
    setNewValue(value);
    setIsEditing(false);
  }

  async function updateUser() {
    const body = {
      [getType()]: newValue,
    };

    const users: User[] = await fetch("/api/users", {
      method: "GET",
    }).then((res) => res.json());

    const usernameCheck = type === "username" && users.some((user: any) => user.username === value);

    if (usernameCheck) {
      return setIsUsernameTaken(true);
    }

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    newValue && newValue !== value && res.json();

    setIsUsernameTaken(false);
    setIsEditing(false);

    dispatch({
      type,
      payload: newValue,
    });
  }

  const editor = useMemo(() => {
    switch (type) {
      case "bio":
        return (
          <textarea
            name={type}
            defaultValue={state.bio ?? ""}
            className="min-h-[150px] p-2 border-2 rounded-lg"
            onChange={(e) => setNewValue(e.target.value)}
          />
        );

      default:
        return (
          <input
            type="text"
            name={type}
            defaultValue={state[type]?.toLocaleString() ?? ""}
            max={type === "name" ? 30 : undefined}
            className="p-2 border-2 rounded-lg"
            onChange={(e) => setNewValue(e.target.value)}
          />
        );
    }
  }, [state, type]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {editor}

      {isUsernameTaken && (
        <p className="bg-red-300 py-1 px-2 rounded-lg">This username is already taken!</p>
      )}

      {(!value || (typeof newValue === "string" && newValue.length < 3)) && (
        <p className="bg-red-300 py-1 px-2 rounded-lg">You must enter at last 3 caracters!</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="bg-red-300 p-2 rounded-lg" onClick={() => handleCancel()}>
          Cancel
        </button>

        <button className="bg-green-300 p-2 rounded-lg" onClick={() => newValue && updateUser()}>
          Save
        </button>
      </div>
    </div>
  );
}
