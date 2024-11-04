// Types
import { Language, User } from "@prisma/client";
import { API, ManyDataCountData } from "./prisma";
import { Iso } from "@/utils/languages";
import { Dispatch, SetStateAction } from "react";

export type AppContextProps = {
  // API
  user: API<User>;

  // States
  language: API<Iso>;
  setLanguage: Dispatch<SetStateAction<API<Iso>>>;
  appLanguages: API<ManyDataCountData<Language>>;
  setAppLanguages: Dispatch<
    SetStateAction<
      API<
        ManyDataCountData<{
          id: string;
          createdAt: Date;
          updatedAt: Date;
          code: string;
          englishName: string;
          nativeName: string;
        }>
      >
    >
  >;

  // Functions
  updateUserSettings: ({ value, typeSettings }: UpdateUserSettings) => void;
  changeLanguage: (language: Iso) => void;
};

export type UpdateUserSettings = {
  value: string | boolean;
  typeSettings: keyof User;
};
