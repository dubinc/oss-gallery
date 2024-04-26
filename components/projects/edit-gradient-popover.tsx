import { auth } from "@/auth";
import { EnrichedProjectProps } from "@/lib/types";
import { EditGradientPopoverClient } from "./edit-gradient-popover-client";

export default async function EditGradientPopover({
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
    return (
      <div className="absolute bottom-2 right-2 z-10">
        <EditGradientPopoverClient project={project} />
      </div>
    );
  }
}
