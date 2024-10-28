export type State = {
  isActive: boolean;
  language: {
    code: string;
    name: string;
    flag: string;
  };
  hasActivated: boolean;
};

export type Action =
  | { type: "ACTIVE" }
  | {
      type: "SET_LANGUAGE";
      payload: {
        code: string;
        name: string;
        flag: string;
      };
    };

export type DispatchLanguageHandler = {
  type: string;
  payload: {
    code: string;
    name: string;
    flag: string;
  };
};
