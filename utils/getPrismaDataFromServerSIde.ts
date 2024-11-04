import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { prisma } from "@/lib/prisma";

export async function getMyUserData() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? "" } });

  return user;
}

export function getFollowersAndFollowing({ id }: { id: string }) {
  const followers = prisma.follows.count({
    where: {
      followingId: id,
    },
  });

  const following = prisma.follows.count({
    where: {
      followerId: id,
    },
  });

  return { followers, following };
}
