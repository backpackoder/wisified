import { getServerSession } from "next-auth";
import { FollowClient } from "./FollowClient";
import { prisma } from "@/lib/prisma";

// Utils
import { authOptions } from "@/utils/authOptions";

interface Props {
  targetUserId: string;
}

export async function FollowButton({ targetUserId }: Props) {
  const session = await getServerSession(authOptions);

  const currentUserId = await prisma.user
    .findUnique({ where: { email: session?.user?.email ?? "" } })
    .then((user) => user?.id ?? "");

  const isFollowing = await prisma.follow.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });

  return (
    <FollowClient
      currentUserId={currentUserId}
      targetUserId={targetUserId}
      isFollowing={!!isFollowing}
    />
  );
}
