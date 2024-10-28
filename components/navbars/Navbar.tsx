"use client";

import { useEffect, useState } from "react";

// Components
import { Searchbar } from "../Searchbar";

// Types
import { NavbarProps } from "@/types/props";
import { API, ManyData, PrismaTag } from "@/types/prisma";
import { getFilters as getFiltersAuthors } from "@/app/authors/utils/getFilters";
import { getFilters as getFiltersQuotes } from "@/app/quotes/utils/getFilters";

export function Navbar({ type, data, dispatch, queryParamsTag }: NavbarProps) {
  const [tags, setTags] = useState<API<ManyData<PrismaTag>>>(null);

  const filtersAuthors = getFiltersAuthors();
  const filtersQuotes = tags && getFiltersQuotes({ tags: tags.data, queryParamsTag });
  const filters = type === "authors" ? filtersAuthors : filtersQuotes;

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>, title: string) {
    dispatch({ type: title, payload: e.target.value });
  }

  useEffect(() => {
    if (type === "authors") return;

    async function fetchData() {
      const data = await fetch("api/tags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await data.json().then((data) => setTags(data));
    }

    fetchData();
  }, [type]);

  return filters ? (
    <div className="flex flex-wrap justify-center gap-2 bg-sky-200 rounded-xl">
      <p className="flex items-center">
        {data.totalCount} {data.totalCount === 1 ? "result" : "results"}
      </p>

      {filters.map((filter, index) => {
        return (
          <div key={index} className="flex flex-col justify-between gap-2 p-2">
            <label htmlFor={filter.title} className="text-center">
              {filter.label}
            </label>

            <select
              name={filter.title}
              id={filter.title}
              onChange={(e) => handleSelectChange(e, filter.title)}
              defaultValue={filter.values.default.value}
              className="bg-transparent p-2 border-2 border-black border-opacity-50 rounded-xl"
            >
              {filter.values.others.map((value, index) => {
                return (
                  <option key={index} value={value.value}>
                    {value.label}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}

      <Searchbar type={type} />
    </div>
  ) : null;
}
