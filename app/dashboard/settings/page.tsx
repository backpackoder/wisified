"use client";

import Image from "next/image";
import { useEffect, useReducer } from "react";

// Components
import { AuthCheck } from "@/components/AuthCheck";
import { EmailUpdatesItem, ImageProfileItem, LanguageItem, UserItem } from "./Items";

// Assets
import NO_PROFILE_IMAGE from "@/app/assets/images/no-profile-image.jpg";

// Styles
import { styles } from "@/app/assets/styles/styles";

// Types
import { useAppContext } from "@/app/context/AppProvider";
import { Action, State } from "./types";

// Utils
import { initialState } from "./utils/initialState";

export default function Settings() {
  const { user } = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "INITIATING":
        return {
          ...state,
          username: action.payload.username,
          name: action.payload.name,
          image: action.payload.image,
          bio: action.payload.bio,
          nationality: action.payload.nationality,
        };

      case action.type:
        return { ...state, [action.type]: action.payload };

      default:
        return state;
    }
  }

  useEffect(() => {
    if (!user) return;
    dispatch({
      type: "INITIATING",
      payload: {
        username: user.username,
        name: user.name ?? "Unknown",
        image: user.image ?? NO_PROFILE_IMAGE.src,
        bio: user.bio ?? "",
        nationality: user.nationality ?? "Unknown",
      },
    });
  }, [user]);

  return (
    <AuthCheck>
      {user && (
        <section className="flex flex-col items-center justify-center gap-8">
          <h2 className="font-semibold text-4xl">⚙️ Settings</h2>

          <article className="flex flex-col items-center justify-center gap-8">
            <div className="max-w-500 duration-150">
              <ImageProfileItem
                type="image"
                state={state}
                dispatch={dispatch}
                user={user}
                Component={
                  <div className="rounded-full">
                    <Image
                      src={state.image}
                      alt={`${state.name}'s profile`}
                      width={300}
                      height={300}
                      className={`${styles.imgSquareCropped} rounded-full cursor-pointer`}
                    />
                  </div>
                }
              />
            </div>

            <div className="flex flex-wrap gap-4 max-w-500">
              <UserItem
                user={user}
                type="username"
                value={state.username}
                state={state}
                dispatch={dispatch}
                Component={<p className="text-center">{state.username}</p>}
              />

              <UserItem
                user={user}
                type="name"
                value={state.name}
                state={state}
                dispatch={dispatch}
                Component={<p className="text-center">{state.name}</p>}
              />

              <UserItem
                user={user}
                type="nationality"
                value={state.nationality}
                state={state}
                dispatch={dispatch}
                Component={<p className="text-center">{state.nationality}</p>}
              />

              <UserItem
                user={user}
                type="bio"
                value={state.bio}
                state={state}
                dispatch={dispatch}
                Component={<p>{state.bio}</p>}
              />

              <div className="flex flex-col items-center justify-evenly p-2 border-2 rounded-lg">
                <LanguageItem typeSettings="language" user={user} />

                <EmailUpdatesItem typeSettings="emailUpdates" user={user} />
              </div>
            </div>
          </article>
        </section>
      )}
    </AuthCheck>
  );
}
