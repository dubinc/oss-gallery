import { auth } from "@/auth";
import { EditProjectButtonClient } from "./edit-project-button-client";

export default async function EditProjectButton({
  users,
}: {
  users: {
    id: string;
    userId: string;
    role: string;
    projectId: string;
  }[];
}) {
  const session = await auth();

  return (
    users.some((user) => user.userId === session?.user?.id) && (
      <EditProjectButtonClient />
    )
  );
}
