// Types
import { AuthorKeyOf, Filter } from "@/types/getFilters";

export function getFilters() {
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

  const sortBy: Filter<AuthorKeyOf> = {
    title: "sortBy",
    label: "Sort by",
    values: {
      default: { value: "englishName", label: "name" },
      others: [
        { value: "createdAt", label: "date added" },
        { value: "updatedAt", label: "date modified" },
        { value: "englishName", label: "name" },
        { value: "quotes", label: "quotes" },
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

  // const language: Filter<Language["code"]> = {
  //   title: "language",
  //   label: "Language",
  //   values: {
  //     default: { value: "en", label: "English" },
  //     others: [
  //       ...LANGUAGES.map((language) => {
  //         return { value: language.code, label: language.nativeName };
  //       }),
  //     ],
  //   },
  // };

  const FILTERS = [limit, sortBy, order];

  return FILTERS;
}
