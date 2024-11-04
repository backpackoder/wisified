"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { FaEdit, FaHeart } from "react-icons/fa";

// Components
import { HelpInHover } from "../../../HelpInHover";

// Commons
import { FLAGS, ROUTES } from "@/commons/commons";

// Types
import Image from "next/image";
import { Iso } from "@/utils/languages";
import { AppContext } from "@/app/context/AppContext";
import { FullQuote } from "@/types/prisma";

export type QuoteIconsProps = {
  quote: FullQuote;
  language: Iso;
  setLanguageQuote: Dispatch<SetStateAction<Iso>>;
};

export function Icons({ quote, language, setLanguageQuote }: QuoteIconsProps) {
  const { appLanguages } = useContext(AppContext);

  return appLanguages ? (
    <div className="flex items-center justify-between gap-2 w-full">
      <div className="flex flex-wrap gap-4">
        {appLanguages.data.map((appLanguage) => {
          const isQuoteInLanguage = quote.translations.some(
            (translation) => translation.language.code === appLanguage.code && translation.content
          );
          const isActivatedLanguage = language === appLanguage.code;

          return (
            <Image
              key={appLanguage.id}
              src={FLAGS.CHOOSE(appLanguage.code as Iso)}
              alt={appLanguage.englishName}
              width={30}
              height={30}
              className={`${
                isQuoteInLanguage
                  ? "opacity-100 hover:scale-125 hover:cursor-pointer"
                  : "opacity-25"
              } duration-300 ${isActivatedLanguage ? "scale-125 border-4 border-green-500" : ""}`}
              onClick={() =>
                isQuoteInLanguage &&
                !isActivatedLanguage &&
                setLanguageQuote(appLanguage.code as Iso)
              }
            />
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <EditIcon quote={quote} language={language} setLanguageQuote={setLanguageQuote} />
        <FavIcon />
      </div>
    </div>
  ) : null;
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
