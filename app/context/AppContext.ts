import { createContext } from "react";

// Types
import { AppContextProps } from "@/types/context";

export const AppContext = createContext<AppContextProps>({
  // API
  user: null,

  // States
  language: null,
  setLanguage: () => {},
  appLanguages: null,
  setAppLanguages: () => {},

  // Functions
  updateUserSettings: () => {},
  changeLanguage: () => {},
});
