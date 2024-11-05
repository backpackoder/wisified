// Types
import { Language, User } from "@prisma/client";
import { API, ManyDataCountData } from "./prisma";
import { Iso } from "@/utils/languages";

export type AppContextProps = {
  // API
  user: API<User>;
  language: API<Iso>;
  appLanguages: API<ManyDataCountData<Language>>;

  // Functions
  updateUserSettings: ({ value, typeSettings }: UpdateUserSettings) => void;
  changeLanguage: (language: Iso) => void;
};

export type UpdateUserSettings = {
  value: string | boolean;
  typeSettings: keyof User;
};
