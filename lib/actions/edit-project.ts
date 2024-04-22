"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUrlFromString } from "@dub/utils";
import { editShortLink } from "../dub";
import { ProjectWithLinks } from "../types";

export async function editProject(
  prevState: {
    props: ProjectWithLinks;
    error: {
      github?: string;
      website?: string;
    } | null;
  },
  data: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You need to be logged in to submit a project" };
  }

  const userIsProjectMember = await prisma.projectUser.findUnique({
    where: {
      projectId_userId: {
        projectId: data.get("projectId") as string,
        userId: session.user.id,
      },
    },
  });

  if (!userIsProjectMember) {
    return { error: "You need to be a member of the project to edit it" };
  }

  let { props } = prevState;

  const github = getUrlFromString(data.get("github") as string);
  const website = getUrlFromString(data.get("website") as string);

  if (props.githubLink.url !== github) {
    props.githubLink = await editShortLink({
      link: props.githubLink,
      newUrl: github,
    });
  }

  if (props.websiteLink?.url !== website) {
    props.websiteLink = await editShortLink({
      link: props.websiteLink,
      newUrl: website,
    });
  }

  return {
    props,
    error: null,
  };
}
