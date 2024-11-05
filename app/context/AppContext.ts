import { createContext } from "react";

// Types
import { AppContextProps } from "@/types/context";

export const AppContext = createContext<AppContextProps>({
  // API
  user: null,
  language: null,
  appLanguages: null,

  // Functions
  updateUserSettings: () => {},
  changeLanguage: () => {},
});
