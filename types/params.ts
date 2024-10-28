export type NavAuthorsParams = {
  language: string;
  maxLength?: number;
  minLength?: number;
  tag?: string;
  author?: string;

  limit?: number;

  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;

  query?: string | null;
};

export type NavAuthorsParamsKeys = keyof NavAuthorsParams;

export type NavQuotesParams = {
  language: string;
  maxLength?: number;
  minLength?: number;
  tag?: string;
  author?: string;

  limit?: number;

  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;

  query?: string | null;
};

export type NavQuotesParamsKeys = keyof NavQuotesParams;
