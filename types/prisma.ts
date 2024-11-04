// Types
import {
  Author,
  AuthorTranslation,
  Comment,
  CommentLike,
  Language,
  Prisma,
  Quote,
  QuoteTranslation,
  Tag,
  TagTranslation,
  User,
} from "@prisma/client";

export type API<T> = T | null | undefined;

export type Array<T> = T[];

export type ManyDataCountData<T> = {
  count: number;
  data: T[];
};

export type ManyDataNavbarPages<T> = {
  totalCount: number;
  countOnActualPage: number;
  totalPages: number;
  data: T[];
};

export type FullLanguage = Prisma.LanguageGetPayload<{
  include: {
    authors: true;
    quotes: true;
    tags: true;
  };
}>;

export type FullAuthor = Prisma.AuthorGetPayload<{
  include: {
    quotes: {
      include: {
        author: true;
        comments: true;
        createdBy: true;
        favoritedBy: true;
        favorites: true;
        tags: true;
        updatedBy: true;
        translations: {
          include: {
            language: true;
            quote: true;
          };
        };
      };
    };
    translations: true;
    createdBy: true;
    favoriteAuthors: true;
    favoritedBy: true;
    updatedBy: true;
  };
}>;

export type FullAuthorTranslation = Prisma.AuthorTranslationGetPayload<{
  include: {
    author: true;
    language: true;
  };
}>;

export type FullQuote = Prisma.QuoteGetPayload<{
  include: {
    author: true;
    comments: true;
    createdBy: true;
    favoritedBy: true;
    favorites: true;
    tags: true;
    translations: {
      include: {
        language: true;
        quote: true;
      };
    };
    updatedBy: true;
  };
}>;

export type FullQuoteTranslation = Prisma.QuoteTranslationGetPayload<{
  include: {
    language: true;
    quote: true;
  };
}>;

export type FullTag = Prisma.TagGetPayload<{
  include: {
    quotes: true;
    translations: true;
  };
}>;

export type FullTagTranslation = Prisma.TagTranslationGetPayload<{
  include: {
    language: true;
    tag: true;
  };
}>;

export type FullUser = Prisma.UserGetPayload<{
  include: {
    accounts: true;
    authors: true;
    commentLikes: true;
    commentReplies: true;
    commentReplyLike: true;
    comment: true;
    createdAuthors: true;
    createdQuotes: true;
    favoriteAuthors: true;
    favoriteQuotes: true;
    followedBy: true;
    following: true;
    quotes: true;
    sessions: true;
    updatedAuthors: true;
    updatedQuotes: true;
  };
}>;

export type FullAuthorAndQuote = Prisma.AuthorGetPayload<{
  include: {
    createdBy: true;
    favoriteAuthors: true;
    favoritedBy: true;
    quotes: {
      include: {
        author: true;
        comments: true;
        createdBy: true;
        favoritedBy: true;
        favorites: true;
        tags: true;
        translations: {
          include: {
            language: true;
            quote: true;
          };
        };
        updatedBy: true;
      };
    };
    translations: true;
    updatedBy: true;
  };
}>;

// OLD PRISMA CALLS

// export interface PrismaUser extends User {
//   quotes: Quote[];
//   // favorites: Favorite[];
//   comments: Comment[];
//   commentLikes: CommentLike[];
//   // commentReplies: commentReply[];
// }

// export interface PrismaAuthor extends Author {
//   translations: PrismaAuthorTranslation[];
//   quotes: Quote[];
// }

// export interface PrismaAuthorTranslation extends AuthorTranslation {
//   language: Language;
// }

// export interface PrismaQuote extends Quote {
//   createdBy: User;
//   updatedBy: User[];
//   translations: PrismaQuoteTranslation[];
//   author: Author & { translations: AuthorTranslation[] & { language: Language } };
//   tags: Tag[] & { translations: TagTranslation[] & { language: Language } };
// favorites: Favorite[];
// favoritedBy: User[];
// comments: Comment[] & {
//   user: User;
//   likes: CommentLike[] & { user: User };
// replies: commentReply[] & { user: User; likes: CommentLike[] }[];
//   };
// }

// export interface PrismaQuoteTranslation extends QuoteTranslation {
//   language: Language;
// }

// export interface PrismaTag extends Tag {
//   translations: PrismaTagTranslation[];
//   language: Language;
//   quotes: Quote[];
// }

// export interface PrismaTagTranslation extends TagTranslation {
//   language: Language;
// }

// export interface PrismaLanguage extends Language {
//   quotes: Quote[];
//   tags: TagTranslation[];
//   authors: Author[];
// }
