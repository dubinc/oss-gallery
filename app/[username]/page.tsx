import prisma from "@/lib/prisma";
import { constructMetadata } from "@dub/utils";
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
      <h1>{user.name}</h1>
    </div>
  );
}
