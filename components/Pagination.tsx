"use client";

import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

// Props
import { GoToPageItemProps, PaginationProps } from "@/types/props";

export function Pagination({ data, state, dispatch }: PaginationProps) {
  function prevPage() {
    dispatch({ type: "page", payload: state.page === 1 ? data.totalPages : state.page - 1 });
  }

  function nextPage() {
    dispatch({ type: "page", payload: state.page === data.totalPages ? 1 : state.page + 1 });
  }

  function GoToPage({ direction, number }: { direction: string; number: number }) {
    return (
      <GoToPageItem
        data={data}
        state={state}
        dispatch={dispatch}
        direction={direction}
        number={number}
      />
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 bg-slate-200 p-2 rounded-xl">
      <button onClick={() => prevPage()}>
        <FaArrowCircleLeft size="1.5rem" />
      </button>

      <GoToPage direction={"first"} number={1} />

      <GoToPage direction={"prev"} number={-2} />
      <GoToPage direction={"prev"} number={-1} />

      <button className="flex items-center justify-center w-6 h-6 bg-slate-300 rounded-full ">
        {state.page}
      </button>

      <GoToPage direction={"next"} number={1} />
      <GoToPage direction={"next"} number={2} />

      <GoToPage direction={"last"} number={1} />

      <button onClick={() => nextPage()}>
        <FaArrowCircleRight size="1.5rem" />
      </button>
    </div>
  );
}

function GoToPageItem({ data, state, dispatch, direction, number }: GoToPageItemProps) {
  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const page = Number(e.currentTarget.textContent);
    dispatch({ type: "page", payload: page });
  }

  switch (direction) {
    case "prev":
      return state.page + number >= 1 ? (
        <button onClick={(e) => clickHandler(e)}>{state.page + number}</button>
      ) : null;

    case "next":
      return state.page + number <= data?.totalPages ? (
        <button onClick={(e) => clickHandler(e)}>{state.page + number}</button>
      ) : null;

    case "first":
      return state.page >= 4 ? (
        <>
          <button onClick={(e) => clickHandler(e)}>{number}</button>
          {"..."}
        </>
      ) : null;

    case "last":
      return state.page <= data?.totalPages - 3 ? (
        <>
          {"..."}
          <button onClick={(e) => clickHandler(e)}>{data?.totalPages}</button>
        </>
      ) : null;

    default:
      throw new Error(`GoToPageItem: direction is not defined or is not valid: ${direction}`);
  }
}
