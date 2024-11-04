"use client";

import Link from "next/link";

// Types
import { PrismaQuoteTranslation } from "@/types/prisma";

// Commons
import { ROUTES } from "@/commons/commons";

export type ContentProps = {
  translation: PrismaQuoteTranslation;
};

export function Content({ translation }: ContentProps) {
  return (
    <Link href={ROUTES.QUOTE(translation.id)} className="cursor-pointer hover:text-[#a3a3a3]">
      {`- "${translation.content}"`}
    </Link>
  );
}
