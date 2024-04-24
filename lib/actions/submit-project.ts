"use server";

import { PROJECT_GRADIENTS } from "@/components/projects/project-constants";
import { shortenAndCreateLink } from "@/lib/dub";
import { getRepo } from "@/lib/github";
import prisma from "@/lib/prisma";
import { getUrlFromString, nanoid } from "@dub/utils";
import slugify from "@sindresorhus/slugify";
import { authUser } from "./auth";

export async function submitProject(_prevState: any, data: FormData) {
  const session = await authUser();

  const github = getUrlFromString(data.get("github") as string);

  if (!github) {
    return { error: "Please provide a GitHub repository" };
  }

  const githubExists = await prisma.link.findUnique({
    where: { url: github },
  });

  if (githubExists) {
    return { error: "This GitHub repository is already submitted" };
  }

  const githubData = await getRepo(github);

  if (!githubData.name) {
    return { error: "Invalid GitHub repository" };
  }

  const slugExists = await prisma.project.findUnique({
    where: { slug: slugify(githubData.name) },
  });

  const project = await prisma.project.create({
    data: {
      name: githubData.name,
      description: githubData.description,
      slug: slugExists
        ? `${slugify(githubData.name)}-${nanoid(3)}`
        : slugify(githubData.name),
      logo: githubData.logo,
      gradient:
        PROJECT_GRADIENTS[Math.floor(Math.random() * PROJECT_GRADIENTS.length)],
      stars: githubData.stars,
      verified: githubData.stars > 1000, // automatically verify projects with > 1000 stars
      users: {
        create: {
          userId: session.user.id,
          role: "Submitter",
        },
      },
    },
  });

  await Promise.all([
    shortenAndCreateLink({
      url: github,
      type: "GITHUB",
      projectId: project.id,
    }),
    githubData.homepage &&
      shortenAndCreateLink({
        url: githubData.homepage,
        type: "WEBSITE",
        projectId: project.id,
      }),
  ]);

  return { redirect: `/projects/${project.slug}` };
}
