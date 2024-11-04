// Utils
import { initialState } from "../utils/initialState";

export type State = typeof initialState;

export type Action =
  | {
      type: "INITIATING";
      payload: {
        username: string;
        name: string;
        image: string;
        bio: string;
        nationality: string;
      };
    }
  | { type: keyof typeof initialState; payload: string };
