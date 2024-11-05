import { Dispatch } from "react";

// Types
import { API, FullLanguage } from "@/types/prisma";
import { wikiSummary } from "@/types/wikiResponse";

// Utils
import { initialState } from "../utils/initialState";

export type EditorProps = {
  translations: FullLanguage[];
  state: State;
  dispatch: Dispatch<Action>;
};
export type State = typeof initialState;
export type Action =
  | { type: "SEARCHING" }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_STATUS"; payload: Status }
  | { type: "SET_ORIGINAL_LANGUAGE"; payload: string | null }
  | { type: "SET_WIKI_DATA"; payload: API<wikiSummary> }
  | { type: "SET_NAMES"; payload: NameTranslation[] }
  | { type: "SET_DESCRIPTIONS"; payload: DescriptionTranslation[] }
  | { type: "SET_BIOS"; payload: BioTranslation[] }
  | { type: "RESET" };
export type NameTranslation = {
  code: string;
  name: string;
};
export type DescriptionTranslation = {
  code: string;
  description: string;
};
export type BioTranslation = {
  code: string;
  bio: string;
};
export type CreateAuthorClientSide = {
  creatorId: string;
  englishName: string;
  picture: string;
  translations: {
    language: string;
    isOriginal: boolean;
    name: string;
    description: string;
    bio: string;
  }[];
};
export type UpdateAuthorClientSide = {
  englishName: string;
  translations: {
    translationId: string;
    isOriginal: boolean;
    name: string;
    description: string;
    bio: string;
  }[];
};
export type Status = null | "searching" | "found" | "not found" | "exists" | "valid" | "submitted";
