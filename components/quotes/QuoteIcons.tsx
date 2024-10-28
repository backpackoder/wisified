"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEdit, FaHeart } from "react-icons/fa";

// Components
import { HelpInHover } from "../HelpInHover";

// Commons
import { ROUTES } from "@/commons/commons";

// Types
import { Quote } from "@prisma/client";

export type QuoteIconsProps = {
  quote: Quote;
};

export function QuoteIcons({ quote }: QuoteIconsProps) {
  return (
    <div className="flex items-center justify-end gap-2 w-full">
      <EditIcon quote={quote} />
      <FavIcon />
    </div>
  );
}

function EditIcon({ quote }: QuoteIconsProps) {
  return (
    <Link href={ROUTES.QUOTE_EDIT(quote.id)} className="relative group">
      <FaEdit
        size="1.5rem"
        color="lightgrey"
        className="duration-150 cursor-pointer hover:scale-125"
      />

      <HelpInHover text="Edit" />
    </Link>
  );
}

function FavIcon() {
  const [isFav, setIsFav] = useState(false);

  function addedToFavs(e: React.MouseEvent<SVGElement, MouseEvent>) {
    e.stopPropagation();
    setIsFav((prev) => !prev);
  }

  return (
    <div className="relative group">
      <FaHeart
        size="1.5rem"
        color={isFav ? "red" : "lightgrey"}
        className="duration-150 cursor-pointer hover:scale-125"
        onClick={(e) => addedToFavs(e)}
      />

      <HelpInHover text="Add to favorites" />
    </div>
  );
}
