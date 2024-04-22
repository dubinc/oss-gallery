import prisma from "@/lib/prisma";
import { constructMetadata } from "@dub/utils";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return;
  }

  return constructMetadata({
    title: `${user.name}'s Profile`,
    description: `${user.name}'s profile page on OSS Gallery.`,
  });
}

export async function generateStaticParams() {
  const users = await prisma.user.findMany();
  return users.map(({ username }) => ({
    username,
  }));
}

export default async function Profile({
  params: { username },
}: {
  params: {
    username: string;
  };
}) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div>
      <div className="aspect-[4/1] w-full rounded-t-2xl bg-gradient-to-tr from-purple-100 via-violet-50 to-blue-100" />
      <div className="-mt-12 flex items-end justify-between pl-4">
        <Image
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          className="h-24 w-24 rounded-full bg-white p-2"
        />
      </div>
      <div className="max-w-lg p-4">
        <div className="flex items-center space-x-2">
          <h1 className="font-display text-3xl font-bold">{user.name}</h1>
          <BadgeCheck className="h-8 w-8 text-white" fill="#1c9bef" />
        </div>
      </div>
    </div>
  );
}
