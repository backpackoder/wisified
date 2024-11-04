import { prisma } from "@/lib/prisma";

export function getFollows(id: string) {
  const followers = prisma.follow.count({
    where: {
      followingId: id,
    },
  });

  const following = prisma.follow.count({
    where: {
      followerId: id,
    },
  });

  return { followers, following };
}
