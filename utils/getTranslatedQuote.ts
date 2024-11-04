import { API, PrismaQuoteTranslation } from "@/types/prisma";
import { Iso } from "./languages";

type GetTranslatedQuote = {
  actualLanguage: API<Iso>;
  translations: PrismaQuoteTranslation[];
};

export function getTranslatedQuote({ translations, actualLanguage }: GetTranslatedQuote) {
  const languages = {
    userLanguage: translations.find(
      (translation) => translation.language.code === actualLanguage && translation.content
    ),
    english: translations.find((content) => content.language.code === "en" && content.content),
    first: translations[0],
  };

  return languages.userLanguage ?? languages.english ?? languages.first;
}
