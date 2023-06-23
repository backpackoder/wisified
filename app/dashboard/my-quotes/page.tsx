import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Utils
import { authOptions } from "@/utils/authOptions";

// Commons
import { ROUTES } from "@/commons/commons";

export default async function MyQuotes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.SIGN_IN);
  }

  return <div>MyQuotes page</div>;
}
