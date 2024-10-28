import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

// Components
import { FollowButton } from "./buttons/FollowBtn";
import { Follows } from "./Follows/Follows";

// Styles
import { styles } from "@/app/assets/styles/styles";

// Utils
import { authOptions } from "@/utils/authOptions";

// Commons
import { IMAGES, ROUTES } from "@/commons/commons";

type UserCardProps = {
  id: string;
  username: string;
  name: string | null;
  nationality: string | null;
  image: string | null;
};

export async function UserCard({ id, username, name, nationality, image }: UserCardProps) {
  const session = await getServerSession(authOptions);

  const currentUserId = await prisma.user
    .findUnique({ where: { email: session?.user?.email ?? "" } })
    .then((user) => user?.id ?? "");

  const isProfileMine = currentUserId === id;

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-[beige] p-4 border-2 rounded-lg shadow-xl">
      <h3 className="font-semibold text-xl">
        <Link href={isProfileMine ? ROUTES.DASHBOARD : ROUTES.USER(id)}>
          {name} {isProfileMine && "(You)"}
        </Link>
      </h3>

      <Link href={isProfileMine ? ROUTES.DASHBOARD : ROUTES.USER(id)}>@{username}</Link>

      <Image
        src={image ?? IMAGES.DEFAULT_PROFILE_IMAGE}
        alt={`${name}'s profile`}
        width={100}
        height={100}
        className={`${styles.imgSquareCropped} rounded-full`}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        {nationality && <p>{nationality}</p>}

        {/* @ts-expect-error Server Component */}
        {!isProfileMine && <FollowButton targetUserId={id} />}

        <Follows id={id} />

        <Link
          href={isProfileMine ? ROUTES.DASHBOARD : ROUTES.USER(id)}
          className="bg-green-500 py-1 px-2 rounded-lg duration-150 hover:bg-green-300"
        >
          {isProfileMine ? "Go to dashboard" : "Go to user page"}
        </Link>
      </div>
    </div>
  );
}
