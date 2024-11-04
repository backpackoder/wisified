"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Commons
import { ROUTES } from "@/commons/commons";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const {
    // data: session,
    status,
  } = useSession();

  // console.log("In AuthCheck", session, status);

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "unauthenticated") {
    redirect(ROUTES.SIGN_IN);
  }

  return <>{children}</>;
}
