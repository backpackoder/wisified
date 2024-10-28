"use client";

import { useMemo, useState } from "react";

// Types
import { User } from "@prisma/client";

type UserDataEditorProps = {
  type?: keyof User;
  user?: User;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleModifiedData: () => void;
};

export function UserDataEditor({
  type,
  user,
  setIsEditing,
  handleModifiedData,
}: UserDataEditorProps) {
  function getType() {
    if (type && user) return type;
    return "";
  }

  function getUserData() {
    if (type && user) return user?.[type];
    return "";
  }
  const data = getUserData();
  const [value, setValue] = useState(data);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  function handleCancel() {
    setValue("");
    setIsEditing(false);
  }

  async function updateUser() {
    const body = {
      [getType()]: value,
    };

    const users: any = await fetch("/api/users", {
      method: "GET",
    }).then((res) => res.json());

    const usernameCheck = users.some((user: any) => user.username === value);

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

    if (value === "") return setIsEditing(false);

    value !== data && res.json().then(() => handleModifiedData());

    setIsUsernameTaken(false);
    setIsEditing(false);
  }

  const editor = useMemo(() => {
    switch (type) {
      case "bio":
        return (
          <textarea
            name={type}
            defaultValue={user?.[type] ?? ""}
            value={value?.toString() ?? ""}
            className="min-h-[150px] p-2 border-2 rounded-lg"
            onChange={(e) => setValue(e.target.value)}
          />
        );

      default:
        return (
          <input
            type="text"
            name={type}
            defaultValue={data?.toLocaleString() ?? ""}
            value={value?.toLocaleString() ?? ""}
            max={type === "name" ? 30 : undefined}
            className="p-2 border-2 rounded-lg"
            onChange={(e) => setValue(e.target.value)}
          />
        );
    }
  }, [data, type, user, value]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {editor}

      {isUsernameTaken && (
        <p className="bg-red-300 py-1 px-2 rounded-lg">This username is already taken!</p>
      )}

      {(!value || (typeof value === "string" && value.length < 3)) && (
        <p className="bg-red-300 py-1 px-2 rounded-lg">You must enter at last 3 caracters!</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="bg-red-300 p-2 rounded-lg" onClick={() => handleCancel()}>
          Cancel
        </button>

        <button className="bg-green-300 p-2 rounded-lg" onClick={() => value && updateUser()}>
          Save
        </button>
      </div>
    </div>
  );
}
