import {
  FullAuthor,
  FullAuthorTranslation,
  FullQuote,
  FullQuoteTranslation,
  FullTag,
  FullTagTranslation,
} from "./prisma";

export type AuthorKeyOf = keyof FullAuthor;
export type AuthorTranslationKeyOf = keyof FullAuthorTranslation;
export type QuoteKeyOf = keyof FullQuote;
export type QuoteTranslationKeyOf = keyof FullQuoteTranslation;
export type TagKeyOf = keyof FullTag;
export type TagTranslationKeyOf = keyof FullTagTranslation;

export type Filter<T> = {
  title: string;
  label: string;
  values: {
    default: { value: T; label: string };
    others: { value: T; label: string }[];
  };
};
