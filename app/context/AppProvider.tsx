"use client";

import { useContext, useEffect, useState } from "react";

// Components
import { AppContext } from "./AppContext";

// Types
import { ProviderProps } from "@/types/props";
import { Iso } from "@/utils/languages";
import { Language, User } from "@prisma/client";
import { API, ManyDataCountData } from "@/types/prisma";
import { UpdateUserSettings } from "@/types/context";

export function AppProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<API<User>>(null);
  const [language, setLanguage] = useState<API<Iso>>(null);
  const [appLanguages, setAppLanguages] = useState<API<ManyDataCountData<Language>>>(null);

  function changeLanguage(language: Iso) {
    updateUserSettings({ value: language, typeSettings: "language" });
    setLanguage(language);
  }

  async function updateUserSettings({ value, typeSettings }: UpdateUserSettings) {
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

    user && value !== user[typeSettings] && res.json();
  }

  useEffect(() => {
    async function getUserData() {
      const res = await fetch("/api/user", {
        method: "GET",
      });

      const user: API<User> = await res.json();

      setUser(user);
      user && setLanguage(user.language as API<Iso>);
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getAppLanguages() {
      const res = await fetch("/api/languages", {
        method: "GET",
      });

      const languages: API<ManyDataCountData<Language>> = await res.json();

      setAppLanguages(languages);
    }

    getAppLanguages();
  }, []);

  const contextValue = {
    // API
    user,
    language,
    appLanguages,

    // Functions
    updateUserSettings,
    changeLanguage,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
