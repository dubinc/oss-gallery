import { auth } from "@/auth";
import { getProjectUser } from "@/lib/actions/get-project-user";
import { EditProjectButtonClient } from "./edit-project-button-client";

export default async function EditProjectButton({
  projectId,
}: {
  projectId: string;
}) {
  const session = await auth();
  const user = await getProjectUser({ projectId, userId: session?.user?.id });

  return user && <EditProjectButtonClient />;
}
