// Types
import { Filter, QuoteKeyOf, QuoteTranslationKeyOf } from "@/types/getFilters";
import { LANGUAGES } from "@/types/languages";
import { FullTag } from "@/types/prisma";
import { Language } from "@prisma/client";

type GetFiltersProps = {
  tags: FullTag[];
  queryParamsTag?: string | null;
};

export function getFilters({ tags, queryParamsTag }: GetFiltersProps) {
  const limit: Filter<number> = {
    title: "limit",
    label: "Results per page",
    values: {
      default: { value: 20, label: "20" },
      others: [
        { value: 10, label: "10" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: 40, label: "40" },
        { value: 50, label: "50" },
      ],
    },
  };

  const sortBy: Filter<QuoteKeyOf | QuoteTranslationKeyOf> = {
    title: "sortBy",
    label: "Sort by",
    values: {
      default: { value: "createdAt", label: "date added" },
      others: [
        { value: "createdAt", label: "date added" },
        { value: "updatedAt", label: "date modified" },
      ],
    },
  };

  const order: Filter<"asc" | "desc"> = {
    title: "order",
    label: "Order by",
    values: {
      default: { value: "asc", label: "ascending" },
      others: [
        { value: "asc", label: "ascending" },
        { value: "desc", label: "descending" },
      ],
    },
  };

  const tagsFilter: Filter<string> = {
    title: "tag",
    label: "Tags",
    values: {
      default: { value: queryParamsTag ?? "default", label: queryParamsTag ?? "all" },
      others: [
        { value: "default", label: "all" },
        ...tags.map((tag) => ({
          value: tag.englishName,
          label: tag.englishName,
        })),
      ],
    },
  };

  const language: Filter<Language["code"]> = {
    title: "language",
    label: "Language",
    values: {
      default: { value: "default", label: "All" },
      others: [
        { value: "default", label: "all" },
        ...LANGUAGES.map((language) => {
          return { value: language.code, label: language.nativeName };
        }),
      ],
    },
  };

  const FILTERS = [limit, sortBy, order, tagsFilter, language];

  return FILTERS;
}
