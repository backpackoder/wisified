// Types
import { Items } from "./navbar";
import { DispatchQuotesAndAuthors } from "./authors";
import { User } from "@prisma/client";
import { ManyData, PrismaAuthor, PrismaQuote } from "./prisma";
import { StaticImageData } from "next/image";
import { Dispatch } from "react";
import { Action, State } from "@/app/dashboard/settings/types";

// PROVIDER
export type ProviderProps = {
  children: React.ReactNode;
};

// LAYOUT
export type LayoutProps = {
  children: React.ReactNode;
};

// LOGO
export type LogoProps = {
  m?: string;
  width?: number;
  height?: number;
};

// DISCOVER QUOTES AND AUTHORS
export type DiscoverQuotesAndAuthorsProps = {
  h2?: boolean;
  text: {
    catchphrase: {
      before: string;
      after: string;
    };
    link: {
      before: string;
      after: string;
    };
  };
};
export type DiscoverQuotesAndAuthorsItemProps = DiscoverQuotesAndAuthorsProps & {
  theme: "Quotes" | "Authors";
};

// NAVBAR
export type NavbarProps = {
  type: string;
  data: ManyData<PrismaQuote | PrismaAuthor>;
  dispatch: React.Dispatch<DispatchQuotesAndAuthors>;
  queryParamsTag?: string | null;
};

export type NavbarItemsProps = {
  items: Items[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// NAVIGATION
export type PaginationProps = {
  data: ManyData<PrismaQuote | PrismaAuthor>;
  state: any;
  dispatch: React.Dispatch<any>;
};

export type GoToPageItemProps = {
  data: any;
  state: any;
  dispatch: React.Dispatch<any>;
  direction: string;
  number: number;
};

// AUTHORS
export type InputAuthorProps = {
  searchParamsState: any;
  searchParamsDispatch: React.Dispatch<React.SetStateAction<any>>;
};

export type AuthorImgProps = {
  authorName: string;
  image?: {
    width?: number;
    height?: number;
  };
};

// QUOTES
export type QuoteItemProps = {
  quote: PrismaQuote;
};

// USER PROFILE
export type UserProfilePartsProps = {
  data: {
    username: string;
    name: string;
    image: string | StaticImageData;
    bio: string;
    nationality: string;
    role: JSX.Element | null;
  };
};

// SETTINGS
export type UserItemProps = {
  type: keyof Pick<User, "image" | "username" | "name" | "nationality" | "bio">;
  value: string;
  state: State;
  dispatch: Dispatch<Action>;
  user: User;
  Component: JSX.Element;
};

export type UserSettingsItemProps = {
  user: User;
  typeSettings: keyof User;
  Component: JSX.Element;
};
