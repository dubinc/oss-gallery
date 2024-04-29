import { auth } from "@/auth";
import { EnrichedProjectProps } from "@/lib/types";
import { EditProjectButtonClient } from "./edit-project-button-client";

export default async function EditProjectButton({
  project,
}: {
  project: EnrichedProjectProps;
}) {
  const session = await auth();
  const { users } = project;

  if (!session) {
    return null;
  }

  if (
    session.user.id === process.env.ADMIN_ID ||
    users.some((user) => user.id === session.user.id)
  ) {
    return <EditProjectButtonClient />;
  }
}
