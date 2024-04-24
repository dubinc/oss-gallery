import { auth } from "@/auth";

export async function authUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You need to be logged in to perform this action.");
  }

  return session;
}

export async function authProject({ projectId }: { projectId: string }) {
  const session = await authUser();

  const userIsProjectMember = await prisma.projectUser.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: session.user.id,
      },
    },
  });

  if (!userIsProjectMember) {
    throw new Error("You need to be a member of this project to edit it");
  }
}
