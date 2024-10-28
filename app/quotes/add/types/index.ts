export type CreateQuoteClientSide = {
  creatorId: string;
  authorId: string;
  tags: string[];
  translations: {
    language: string;
    isOriginal: boolean;
    content: string;
  }[];
};

export type UpdateQuoteClientSide = {
  creatorId: string;
  authorId: string;
  tags: string[];
  translations: {
    language: string;
    isOriginal: boolean;
    content: string;
  }[];
};
